# -*- coding: utf-8 -*-
"""Publish Europe BESS Market Guide 2026 to Supabase (REST-first, idempotent).
Reads anon key from .env.local. Uses curl with --ssl-no-revoke (schannel)."""
import json
import os
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import blog_europe_market_content as C

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_PATH = os.path.join(ROOT, ".env.local")
URL = "https://qujcrmbzuzlgjrexbzga.supabase.co/rest/v1"


def load_anon_key():
    with open(ENV_PATH, "r", encoding="utf-8") as f:
        for line in f:
            if line.startswith("NEXT_PUBLIC_SUPABASE_ANON_KEY="):
                return line.strip().split("=", 1)[1]
    raise RuntimeError("NEXT_PUBLIC_SUPABASE_ANON_KEY not found in .env.local")


def curl_json(method, path, key, payload=None, expect_representation=True):
    args = ["curl", "-s", "--ssl-no-revoke", "-X", method, URL + path,
            "-H", "apikey: " + key,
            "-H", "Authorization: Bearer " + key,
            "-H", "Content-Type: application/json"]
    if expect_representation:
        args += ["-H", "Prefer: return=representation"]
    if payload is not None:
        tmp = os.path.join(os.path.dirname(os.path.abspath(__file__)), "_payload_tmp.json")
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump(payload, f, ensure_ascii=False)
        args += ["-d", "@" + tmp]
        result = subprocess.run(args, capture_output=True, text=True, encoding="utf-8")
        os.remove(tmp)
    else:
        result = subprocess.run(args, capture_output=True, text=True, encoding="utf-8")
    out = result.stdout.strip()
    if not out:
        return []
    try:
        return json.loads(out)
    except json.JSONDecodeError:
        print("RAW STDOUT:", out[:500])
        print("STDERR:", result.stderr[:500])
        raise


def main():
    key = load_anon_key()

    # 1. Check existing article by slug
    existing = curl_json("GET", "/blog_articles?slug=eq." + C.SLUG + "&select=id,slug,date", key)
    article = None
    if existing:
        article = existing[0]
        print("Article exists: id=%s slug=%s date=%s" % (article["id"], article["slug"], article["date"]))
    else:
        payload = {"slug": C.SLUG, "date": C.DATE, "read_time": C.READ_TIME, "tags": C.TAGS}
        created = curl_json("POST", "/blog_articles", key, payload)
        if not created:
            raise RuntimeError("article insert returned empty body")
        article = created[0] if isinstance(created, list) else created
        print("Article created: id=%s" % article["id"])

    # 2. Check existing translations
    aid = article["id"]
    trans = curl_json("GET", "/blog_article_translations?article_id=eq.%s&select=locale,title" % aid, key)
    have = {t["locale"] for t in trans}
    print("Existing translations:", have or "none")

    if "en" not in have:
        payload = {"article_id": aid, "locale": "en", "category": C.EN_CATEGORY,
                   "title": C.EN_TITLE, "description": C.EN_DESCRIPTION, "body": C.EN_BODY}
        res = curl_json("POST", "/blog_article_translations", key, payload)
        print("EN insert:", "OK" if res else "EMPTY-BODY (check manually)")
    else:
        print("EN already present, skip")

    if "zh" not in have:
        payload = {"article_id": aid, "locale": "zh", "category": C.ZH_CATEGORY,
                   "title": C.ZH_TITLE, "description": C.ZH_DESCRIPTION, "body": C.ZH_BODY}
        res = curl_json("POST", "/blog_article_translations", key, payload)
        print("ZH insert:", "OK" if res else "EMPTY-BODY (check manually)")
    else:
        print("ZH already present, skip")

    # 3. Verify
    check = curl_json("GET", "/blog_article_translations?article_id=eq.%s&select=locale,category,title" % aid, key)
    for row in check:
        print("VERIFY %s | %s | %s" % (row["locale"], row["category"], row["title"][:80]))

    # 4. Doubled-quote artifact check (typo '' in body)
    bodies = curl_json("GET", "/blog_article_translations?article_id=eq.%s&select=locale,body" % aid, key)
    for b in bodies:
        n = b["body"].count("''")
        print("body %s: %d chars, doubled-quote artifacts: %d" % (b["locale"], len(b["body"]), n))

    # Word counts
    import re
    en_words = len(re.findall(r"[A-Za-z0-9'-]+", " ".join(
        seg for seg in C.EN_BODY.split("|"))))
    print("EN prose word count (approx):", en_words)
    print("ZH chars:", len(re.findall(r"[\u4e00-\u9fff]", C.ZH_BODY)))


if __name__ == "__main__":
    main()

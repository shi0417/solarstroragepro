# -*- coding: utf-8 -*-
"""Publish the BESS BMS architecture blog article to Supabase via REST (idempotent)."""
import json
import os
import re
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import blog_bms_content as C  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SUPA = "https://qujcrmbzuzlgjrexbzga.supabase.co"
TMP = os.path.join(ROOT, ".workbuddy", "output")


def anon_key():
    with open(os.path.join(ROOT, ".env.local"), encoding="utf-8") as f:
        for line in f:
            if line.startswith("NEXT_PUBLIC_SUPABASE_ANON_KEY="):
                return line.split("=", 1)[1].strip()
    raise SystemExit("anon key not found")


KEY = anon_key()
HEAD = ["-H", f"apikey: {KEY}", "-H", f"Authorization: Bearer {KEY}"]


def curl(args):
    cmd = ["curl", "-s", "--ssl-no-revoke", "--max-time", "60"] + args
    r = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8")
    if r.returncode != 0:
        raise SystemExit(f"curl failed rc={r.returncode}: {r.stderr[:300]}")
    return r.stdout.strip()


def get(path):
    out = curl(HEAD + [f"{SUPA}/rest/v1/{path}"])
    return json.loads(out) if out else []


def post(path, payload, represent=True):
    os.makedirs(TMP, exist_ok=True)
    fp = os.path.join(TMP, "_payload_bms.json")
    with open(fp, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False)
    hdr = HEAD + [
        "-H", "Content-Type: application/json",
        "-H", "Prefer: return=%s" % ("representation" if represent else "minimal"),
    ]
    out = curl(hdr + ["-X", "POST", f"{SUPA}/rest/v1/{path}", "-d", "@" + fp])
    if not out:
        return [] if represent else None
    try:
        return json.loads(out)
    except json.JSONDecodeError:
        raise SystemExit(f"bad json from POST {path}: {out[:400]}")


def main():
    existing = get(f"blog_articles?select=id,slug&slug=eq.{C.SLUG}")
    if existing:
        aid = existing[0]["id"]
        print(f"[skip] article exists id={aid}")
    else:
        rows = post("blog_articles", {
            "slug": C.SLUG,
            "date": C.DATE,
            "read_time": C.READ_TIME,
            "tags": C.TAGS,
        })
        if not rows:
            raise SystemExit("article insert returned empty")
        aid = rows[0]["id"]
        print(f"[ok] article inserted id={aid}")

    have = {r["locale"] for r in get(
        f"blog_article_translations?select=locale&article_id=eq.{aid}")}
    payloads = {
        "en": dict(category=C.CATEGORY_EN, title=C.TITLE_EN, description=C.DESC_EN, body=C.BODY_EN),
        "zh": dict(category=C.CATEGORY_ZH, title=C.TITLE_ZH, description=C.DESC_ZH, body=C.BODY_ZH),
    }
    for loc, p in payloads.items():
        if loc in have:
            print(f"[skip] {loc} translation exists")
            continue
        post("blog_article_translations", {
            "article_id": aid, "locale": loc,
            "category": p["category"], "title": p["title"],
            "description": p["description"], "body": p["body"],
        })
        print(f"[ok] {loc} translation inserted")

    check = get(f"blog_articles?select=id,slug,date&slug=eq.{C.SLUG}")
    trs = get(f"blog_article_translations?select=locale,title,category,body&article_id=eq.{aid}")
    print("VERIFY article:", check)
    for t in trs:
        body = t["body"]
        words = len(re.findall(r"[A-Za-z][A-Za-z'-]*", body))
        han = len(re.findall(r"[\u4e00-\u9fff]", body))
        print(f"  {t['locale']}: title={t['title'][:60]!r} chars={len(body)} words={words} han={han} "
              f"doubled_quotes={'YES' if chr(34)*2 in body else 'no'} headings={body.count(chr(35)*2+' ')} "
              f"tables={body.count('|---')}")


if __name__ == "__main__":
    main()

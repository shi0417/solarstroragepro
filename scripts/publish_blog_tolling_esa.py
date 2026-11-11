# -*- coding: utf-8 -*-
"""Publish the tolling/ESA blog post to Supabase via REST API (idempotent)."""
import json
import os
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import blog_tolling_esa_content as C

BASE = "https://qujcrmbzuzlgjrexbzga.supabase.co"
KEY = "sb_publishable_bBrZR2df4POLnM4sWI96xQ_xPvlD06k"
HDR = ["-H", "apikey: " + KEY, "-H", "Authorization: Bearer " + KEY]
TMP = os.path.join(os.path.dirname(os.path.abspath(__file__)), "_tmp_payload.json")


def curl(method, path, payload=None, prefer=None):
    cmd = ["curl", "-s", "--ssl-no-revoke", "--max-time", "60", "-X", method, BASE + path] + HDR
    cmd += ["-H", "Content-Type: application/json"]
    if prefer:
        cmd += ["-H", "Prefer: " + prefer]
    if payload is not None:
        with open(TMP, "w", encoding="utf-8") as f:
            json.dump(payload, f, ensure_ascii=False)
        cmd += ["--data-binary", "@" + TMP]
    p = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8")
    out = (p.stdout or "").strip()
    if not out:
        return None
    try:
        return json.loads(out)
    except json.JSONDecodeError:
        print("NON-JSON RESPONSE:", out[:600])
        return None


def main():
    existing = curl("GET", "/rest/v1/blog_articles?slug=eq." + C.SLUG + "&select=id,slug,date")
    if existing:
        print("ALREADY EXISTS:", existing[0])
        article_id = existing[0]["id"]
    else:
        row = curl(
            "POST",
            "/rest/v1/blog_articles",
            {"slug": C.SLUG, "date": C.DATE, "read_time": C.READ_TIME, "tags": C.TAGS},
            prefer="return=representation",
        )
        if not row:
            print("FAILED to insert article")
            return 1
        article_id = row[0]["id"]
        print("ARTICLE INSERTED:", article_id)

    have = curl(
        "GET",
        "/rest/v1/blog_article_translations?article_id=eq.%s&select=locale" % article_id,
    ) or []
    have_locales = {r["locale"] for r in have}
    print("existing locales:", have_locales)

    rows = [
        ("en", C.EN_CATEGORY, C.EN_TITLE, C.EN_DESC, C.EN_BODY),
        ("zh", C.ZH_CATEGORY, C.ZH_TITLE, C.ZH_DESC, C.ZH_BODY),
    ]
    for locale, cat, title, desc, body in rows:
        if locale in have_locales:
            print("skip", locale, "(exists)")
            continue
        res = curl(
            "POST",
            "/rest/v1/blog_article_translations",
            {
                "article_id": article_id,
                "locale": locale,
                "category": cat,
                "title": title,
                "description": desc,
                "body": body,
            },
            prefer="return=minimal",
        )
        print("insert", locale, "->", "OK" if res is None else res)

    verify = curl(
        "GET",
        "/rest/v1/blog_articles?slug=eq.%s&select=id,slug,date,read_time,tags,blog_article_translations(locale,title)" % C.SLUG,
    )
    print("VERIFY:", json.dumps(verify, ensure_ascii=False, indent=1)[:1200])
    return 0


if __name__ == "__main__":
    sys.exit(main())

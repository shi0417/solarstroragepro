# -*- coding: utf-8 -*-
"""Idempotent publisher for the duck-curve blog article via Supabase REST API."""
import json
import subprocess
import sys
import tempfile
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from blog_duck_curve_content import SLUG, DATE, READ_TIME, TAGS, EN, ZH

URL = "https://qujcrmbzuzlgjrexbzga.supabase.co/rest/v1"
KEY = None
with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".env.local"), encoding="utf-8") as f:
    for line in f:
        if line.startswith("NEXT_PUBLIC_SUPABASE_ANON_KEY="):
            KEY = line.strip().split("=", 1)[1]
assert KEY, "anon key not found"


def curl(method, path, payload=None):
    cmd = ["curl", "-s", "--ssl-no-revoke", "-X", method, URL + path,
           "-H", f"apikey: {KEY}", "-H", f"Authorization: Bearer {KEY}",
           "-H", "Content-Type: application/json"]
    if method == "POST":
        cmd += ["-H", "Prefer: return=representation"]
    if payload is not None:
        fd, tmp = tempfile.mkstemp(suffix=".json")
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            json.dump(payload, f, ensure_ascii=False)
        cmd += ["--data-binary", "@" + tmp]
        result = subprocess.run(cmd, capture_output=True, text=True)
        os.unlink(tmp)
    else:
        result = subprocess.run(cmd, capture_output=True, text=True)
    out = result.stdout.strip()
    if not out:
        return []
    return json.loads(out)


# 1. check existing article
existing = curl("GET", f"/blog_articles?slug=eq.{SLUG}&select=id,slug")
if existing:
    art_id = existing[0]["id"]
    print(f"article exists: {art_id}")
else:
    rows = curl("POST", "/blog_articles",
                {"slug": SLUG, "date": DATE, "read_time": READ_TIME, "tags": TAGS})
    art_id = rows[0]["id"]
    print(f"inserted article: {art_id}")

# 2. check existing translations, insert missing
have = curl("GET", f"/blog_article_translations?article_id=eq.{art_id}&select=locale")
have_locales = {r["locale"] for r in have}
print(f"existing locales: {have_locales}")

for tr in (EN, ZH):
    if tr["locale"] in have_locales:
        print(f"skip {tr['locale']} (already inserted)")
        continue
    payload = {"article_id": art_id, "locale": tr["locale"],
               "category": tr["category"], "title": tr["title"],
               "description": tr["description"], "body": tr["body"]}
    res = curl("POST", "/blog_article_translations", payload)
    ok = bool(res) and res[0].get("locale") == tr["locale"]
    print(f"inserted {tr['locale']}: {ok}, body chars={len(tr['body'])}")

# 3. verify
ver = curl("GET", f"/blog_articles?slug=eq.{SLUG}&select=id,slug,date,read_time,tags,blog_article_translations(locale,title)")
print(json.dumps(ver, ensure_ascii=False, indent=2)[:1500])

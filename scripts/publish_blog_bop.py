# -*- coding: utf-8 -*-
"""Idempotent publisher for the BESS BoP / MV interconnection article.

Tries Supabase REST first; falls back to the Management API SQL channel
(when *.supabase.co is TLS-reset from the local machine).
"""
import json
import os
import subprocess
import sys
import tempfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from blog_bop_content import SLUG, DATE, READ_TIME, TAGS, EN, ZH

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = "https://qujcrmbzuzlgjrexbzga.supabase.co/rest/v1"
KEY = None
with open(os.path.join(ROOT, ".env.local"), encoding="utf-8") as f:
    for line in f:
        if line.startswith("NEXT_PUBLIC_SUPABASE_ANON_KEY="):
            KEY = line.strip().split("=", 1)[1]
assert KEY, "anon key not found"


def curl(method, path, payload=None):
    cmd = ["curl", "-s", "--ssl-no-revoke", "--max-time", "45", "-X", method, URL + path,
           "-H", f"apikey: {KEY}", "-H", f"Authorization: Bearer {KEY}",
           "-H", "Content-Type: application/json"]
    if method == "POST":
        cmd += ["-H", "Prefer: return=representation"]
    if payload is not None:
        fd, tmp = tempfile.mkstemp(suffix=".json")
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            json.dump(payload, f, ensure_ascii=False)
        cmd += ["--data-binary", "@" + tmp]
        r = subprocess.run(cmd, capture_output=True, text=True)
        os.unlink(tmp)
    else:
        r = subprocess.run(cmd, capture_output=True, text=True)
    out = r.stdout.strip()
    if not out or out[0] not in "[{":
        return None  # transport failure -> caller falls back
    return json.loads(out)


def esc(s):
    return s.replace("'", "''")


def publish_via_sql():
    from _sb_mgmt import query
    rows = query(f"select id from blog_articles where slug = '{esc(SLUG)}'")
    if rows:
        art_id = rows[0]["id"]
        print(f"[sql] article exists: {art_id}")
    else:
        tags = ", ".join(f"'{esc(t)}'" for t in TAGS)
        rows = query(
            "insert into blog_articles (slug, date, read_time, tags) values "
            f"('{esc(SLUG)}', '{DATE}', {READ_TIME}, array[{tags}]) returning id"
        )
        art_id = rows[0]["id"]
        print(f"[sql] inserted article: {art_id}")

    have = {r["locale"] for r in query(
        f"select locale from blog_article_translations where article_id = '{art_id}'")}
    print(f"[sql] existing locales: {have}")

    for tr in (EN, ZH):
        loc = tr["locale"]
        if loc in have:
            print(f"[sql] skip {loc}")
            continue
        query(
            "insert into blog_article_translations "
            "(article_id, locale, category, title, description, body) values "
            f"('{art_id}', '{loc}', '{esc(tr['category'])}', '{esc(tr['title'])}', "
            f"'{esc(tr['description'])}', '{esc(tr['body'])}')"
        )
        print(f"[sql] inserted {loc}, body chars={len(tr['body'])}")

    ver = query(
        "select a.id, a.slug, a.date, a.read_time, a.tags, t.locale, "
        "length(t.body) as body_len from blog_articles a "
        "join blog_article_translations t on t.article_id = a.id "
        f"where a.slug = '{esc(SLUG)}' order by t.locale")
    return ver


def publish_via_rest():
    existing = curl("GET", f"/blog_articles?slug=eq.{SLUG}&select=id,slug")
    if existing is None:
        return None
    if existing:
        art_id = existing[0]["id"]
        print(f"[rest] article exists: {art_id}")
    else:
        rows = curl("POST", "/blog_articles",
                    {"slug": SLUG, "date": DATE, "read_time": READ_TIME, "tags": TAGS})
        if not rows:
            return None
        art_id = rows[0]["id"]
        print(f"[rest] inserted article: {art_id}")

    have = curl("GET", f"/blog_article_translations?article_id=eq.{art_id}&select=locale")
    if have is None:
        return None
    have_locales = {r["locale"] for r in have}
    print(f"[rest] existing locales: {have_locales}")

    for tr in (EN, ZH):
        if tr["locale"] in have_locales:
            print(f"[rest] skip {tr['locale']}")
            continue
        payload = {"article_id": art_id, "locale": tr["locale"],
                   "category": tr["category"], "title": tr["title"],
                   "description": tr["description"], "body": tr["body"]}
        res = curl("POST", "/blog_article_translations", payload)
        if res is None:
            return None
        print(f"[rest] inserted {tr['locale']}, body chars={len(tr['body'])}")

    return curl("GET", f"/blog_articles?slug=eq.{SLUG}"
                       "&select=id,slug,date,read_time,tags,blog_article_translations(locale,title)")


if __name__ == "__main__":
    result = publish_via_rest()
    if result is None:
        print("REST unavailable -> Management API SQL channel")
        result = publish_via_sql()
    print("\n=== VERIFY ===")
    print(json.dumps(result, ensure_ascii=False, indent=2))

# -*- coding: utf-8 -*-
"""Idempotent publisher for the BESS EMS selection article.

This run has broken local DNS: hosts are resolved via AliDNS JSON API
(https://223.5.5.5/resolve) and pinned with curl --resolve.
Tries Supabase REST (*.supabase.co) first, falls back to Management API SQL.
"""
import json
import os
import subprocess
import sys
import tempfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from blog_ems_selection_content import SLUG, DATE, READ_TIME, TAGS, EN_CATEGORY, EN_TITLE, EN_DESC, EN_BODY, ZH_CATEGORY, ZH_TITLE, ZH_DESC, ZH_BODY

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = "https://qujcrmbzuzlgjrexbzga.supabase.co"
HOST = "qujcrmbzuzlgjrexbzga.supabase.co"
MGMT = "https://api.supabase.com"
MGMT_HOST = "api.supabase.com"
REF = "qujcrmbzuzlgjrexbzga"

ANON = None
TOKEN = None
with open(os.path.join(ROOT, ".env.local"), encoding="utf-8") as f:
    for line in f:
        if line.startswith("NEXT_PUBLIC_SUPABASE_ANON_KEY="):
            ANON = line.strip().split("=", 1)[1]
        if line.startswith("SUPABASE_LOGIN_TOKEN="):
            TOKEN = line.strip().split("=", 1)[1]
assert ANON and TOKEN


def resolve(name):
    r = subprocess.run(["curl", "-s", "--ssl-no-revoke", "--max-time", "20",
                        f"https://223.5.5.5/resolve?name={name}&type=A"],
                       capture_output=True, text=True)
    try:
        return [a["data"] for a in json.loads(r.stdout)["Answer"] if a["type"] == 1]
    except Exception:
        return []


def curl_json(method, url, host, ip, headers, payload=None):
    cmd = ["curl", "-s", "--ssl-no-revoke", "--max-time", "60",
           "--resolve", f"{host}:443:{ip}", "-X", method, url] + headers
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
        return None
    return json.loads(out)


EN = {"locale": "en", "category": EN_CATEGORY, "title": EN_TITLE, "description": EN_DESC, "body": EN_BODY}
ZH = {"locale": "zh", "category": ZH_CATEGORY, "title": ZH_TITLE, "description": ZH_DESC, "body": ZH_BODY}


def esc(s):
    return s.replace("'", "''")


def publish_via_rest():
    for ip in resolve(HOST):
        rows = curl_json("GET", f"{URL}/rest/v1/blog_articles?slug=eq.{SLUG}&select=id,slug",
                         HOST, ip, ["-H", f"apikey: {ANON}", "-H", f"Authorization: Bearer {ANON}",
                                    "-H", "Content-Type: application/json"])
        if rows is not None:
            break
    else:
        return None

    if rows:
        art_id = rows[0]["id"]
        print(f"[rest] article exists: {art_id}")
    else:
        ins = curl_json("POST", f"{URL}/rest/v1/blog_articles", HOST, ip,
                        ["-H", f"apikey: {ANON}", "-H", f"Authorization: Bearer {ANON}",
                         "-H", "Content-Type: application/json", "-H", "Prefer: return=representation"],
                        {"slug": SLUG, "date": DATE, "read_time": READ_TIME, "tags": TAGS})
        if not ins:
            return None
        art_id = ins[0]["id"]
        print(f"[rest] inserted article: {art_id}")

    have = curl_json("GET", f"{URL}/rest/v1/blog_article_translations?article_id=eq.{art_id}&select=locale",
                     HOST, ip, ["-H", f"apikey: {ANON}", "-H", f"Authorization: Bearer {ANON}",
                                "-H", "Content-Type: application/json"])
    if have is None:
        return None
    have_locales = {r["locale"] for r in have}
    print(f"[rest] existing locales: {have_locales}")

    for tr in (EN, ZH):
        if tr["locale"] in have_locales:
            print(f"[rest] skip {tr['locale']}")
            continue
        res = curl_json("POST", f"{URL}/rest/v1/blog_article_translations", HOST, ip,
                        ["-H", f"apikey: {ANON}", "-H", f"Authorization: Bearer {ANON}",
                         "-H", "Content-Type: application/json"], dict(article_id=art_id, **tr))
        if res is None:
            return None
        print(f"[rest] inserted {tr['locale']}, body chars={len(tr['body'])}")

    return curl_json("GET", f"{URL}/rest/v1/blog_articles?slug=eq.{SLUG}"
                            "&select=id,slug,date,read_time,tags,blog_article_translations(locale,title)",
                     HOST, ip, ["-H", f"apikey: {ANON}", "-H", f"Authorization: Bearer {ANON}"])


def sql(q):
    fd, tmp = tempfile.mkstemp(suffix=".json")
    with os.fdopen(fd, "w", encoding="utf-8") as f:
        json.dump({"query": q}, f, ensure_ascii=False)
    last_err = None
    for ip in resolve(MGMT_HOST):
        cmd = ["curl", "-s", "--ssl-no-revoke", "--max-time", "90",
               "--resolve", f"{MGMT_HOST}:443:{ip}", "-X", "POST",
               f"{MGMT}/v1/projects/{REF}/database/query",
               "-H", f"Authorization: Bearer {TOKEN}", "-H", "Content-Type: application/json",
               "--data-binary", "@" + tmp]
        r = subprocess.run(cmd, capture_output=True, text=True)
        out = r.stdout.strip()
        try:
            return json.loads(out)
        except Exception as e:
            last_err = f"{ip}: {e}: {out[:200]}"
    os.unlink(tmp)
    raise RuntimeError(f"management api unavailable ({last_err})")


def publish_via_sql():
    rows = sql(f"select id from blog_articles where slug = '{esc(SLUG)}'")
    if rows:
        art_id = rows[0]["id"]
        print(f"[sql] article exists: {art_id}")
    else:
        tags = ", ".join(f"'{esc(t)}'" for t in TAGS)
        rows = sql("insert into blog_articles (slug, date, read_time, tags) values "
                   f"('{esc(SLUG)}', '{DATE}', {READ_TIME}, array[{tags}]) returning id")
        art_id = rows[0]["id"]
        print(f"[sql] inserted article: {art_id}")

    have = {r["locale"] for r in sql(
        f"select locale from blog_article_translations where article_id = '{art_id}'")}
    print(f"[sql] existing locales: {have}")

    for tr in (EN, ZH):
        loc = tr["locale"]
        if loc in have:
            print(f"[sql] skip {loc}")
            continue
        sql("insert into blog_article_translations "
            "(article_id, locale, category, title, description, body) values "
            f"('{art_id}', '{loc}', '{esc(tr['category'])}', '{esc(tr['title'])}', "
            f"'{esc(tr['description'])}', '{esc(tr['body'])}')")
        print(f"[sql] inserted {loc}, body chars={len(tr['body'])}")

    return sql("select a.id, a.slug, a.date, a.read_time, a.tags, t.locale, "
               "length(t.body) as body_len from blog_articles a "
               "join blog_article_translations t on t.article_id = a.id "
               f"where a.slug = '{esc(SLUG)}' order by t.locale")


if __name__ == "__main__":
    result = publish_via_rest()
    if result is None:
        print("REST unavailable -> Management API SQL channel")
        result = publish_via_sql()
    print("\n=== VERIFY ===")
    print(json.dumps(result, ensure_ascii=False, indent=2))

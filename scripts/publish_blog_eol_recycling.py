# -*- coding: utf-8 -*-
"""Idempotent publisher for the BESS end-of-life recycling article.

Uses Supabase REST API via curl (payloads written to temp JSON files so that
special characters and newlines survive).
"""
import json
import os
import subprocess
import sys
import tempfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import blog_eol_recycling_content as C

BASE = "https://qujcrmbzuzlgjrexbzga.supabase.co/rest/v1"
ENV = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env.local")


def anon_key():
    with open(ENV, "r", encoding="utf-8") as f:
        for line in f:
            if line.startswith("NEXT_PUBLIC_SUPABASE_ANON_KEY="):
                return line.split("=", 1)[1].strip()
    raise RuntimeError("anon key not found")


KEY = anon_key()


def curl(args, timeout=60):
    cmd = ["curl", "-s", "--ssl-no-revoke", "--max-time", str(timeout)] + args
    r = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8")
    if r.returncode != 0:
        raise RuntimeError("curl failed %s: %s" % (r.returncode, r.stderr[:300]))
    return r.stdout


def headers(extra=None):
    h = ["-H", "apikey: " + KEY, "-H", "Authorization: Bearer " + KEY]
    if extra:
        for e in extra:
            h += ["-H", e]
    return h


def post(table, payload, prefer="return=representation"):
    fd, path = tempfile.mkstemp(suffix=".json")
    os.close(fd)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False)
    try:
        out = curl(["-X", "POST", BASE + "/" + table] + headers(["Content-Type: application/json", "Prefer: " + prefer]) + ["-d", "@" + path])
    finally:
        os.remove(path)
    if not out.strip():
        return []
    try:
        data = json.loads(out)
    except Exception:
        raise RuntimeError("bad JSON from %s: %s" % (table, out[:400]))
    if isinstance(data, dict) and data.get("message"):
        raise RuntimeError("API error on %s: %s" % (table, data))
    return data


def get(path_qs):
    out = curl([BASE + path_qs] + headers())
    if not out.strip():
        return []
    return json.loads(out)


def main():
    slug = C.SLUG

    # 1. idempotency: existing article?
    existing = get("/blog_articles?slug=eq.%s&select=id,slug,date" % slug)
    if existing:
        aid = existing[0]["id"]
        print("article already exists:", aid, "-> updating translations only")
        post("/blog_articles?id=eq.%s" % aid, {
            "date": C.DATE, "read_time": C.READ_TIME, "tags": C.TAGS,
        }, prefer="return=minimal")
    else:
        rows = post("/blog_articles", {
            "slug": slug, "date": C.DATE, "read_time": C.READ_TIME, "tags": C.TAGS,
        })
        if not rows:
            raise RuntimeError("insert returned no rows")
        aid = rows[0]["id"]
        print("article inserted:", aid)

    # 2. translations: delete existing locale rows then insert (idempotent)
    for loc, payload in (("en", C.EN), ("zh", C.ZH)):
        curl(["-X", "DELETE", BASE + "/blog_article_translations?article_id=eq.%s&locale=eq.%s" % (aid, loc)] + headers(["Prefer: return=minimal"]))
        body = dict(payload)
        body["article_id"] = aid
        body["locale"] = loc
        rows = post("/blog_article_translations", body, prefer="return=minimal")
        print("  %s inserted (%d rows returned)" % (loc, len(rows)))

    # 3. verify
    v = get("/blog_article_translations?article_id=eq.%s&select=locale,title,body" % aid)
    for r in v:
        print("verified %s: title=%r body_chars=%d" % (r["locale"], r["title"], len(r["body"] or "")))
    m = get("/blog_articles?slug=eq.%s&select=id,slug,date,read_time,tags" % slug)
    print("main record:", json.dumps(m, ensure_ascii=False))


if __name__ == "__main__":
    main()

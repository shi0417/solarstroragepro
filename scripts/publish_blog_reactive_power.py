# -*- coding: utf-8 -*-
"""Publish the BESS reactive power / voltage support article to Supabase via REST (idempotent)."""
import json
import os
import ssl
import sys
import urllib.error
import urllib.request

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import blog_reactive_power_content as C

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://qujcrmbzuzlgjrexbzga.supabase.co/rest/v1"
CTX = ssl._create_unverified_context()


def anon_key():
    with open(os.path.join(ROOT, ".env.local"), "r", encoding="utf-8") as f:
        for line in f:
            if line.strip().startswith("NEXT_PUBLIC_SUPABASE_ANON_KEY="):
                return line.split("=", 1)[1].strip()
    raise RuntimeError("NEXT_PUBLIC_SUPABASE_ANON_KEY not found")


KEY = anon_key()
HEAD = {
    "apikey": KEY,
    "Authorization": "Bearer " + KEY,
    "Content-Type": "application/json",
}


def req(method, path, body=None, prefer=None):
    data = json.dumps(body).encode("utf-8") if body is not None else None
    r = urllib.request.Request(BASE + path, data=data, method=method, headers=dict(HEAD))
    if prefer:
        r.add_header("Prefer", prefer)
    try:
        with urllib.request.urlopen(r, context=CTX, timeout=90) as resp:
            raw = resp.read().decode("utf-8")
            return resp.status, (json.loads(raw) if raw.strip() else None)
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", "replace")


def main():
    # 1. existing article?
    st, rows = req("GET", "/blog_articles?slug=eq.%s&select=id,slug,date" % C.SLUG)
    if st != 200:
        raise SystemExit("slug query failed %s: %s" % (st, rows))

    if rows:
        aid = rows[0]["id"]
        print("article exists:", aid)
    else:
        st, rows = req(
            "POST",
            "/blog_articles",
            {"slug": C.SLUG, "date": C.DATE, "read_time": C.READ_TIME, "tags": C.TAGS},
            prefer="return=representation",
        )
        if st not in (200, 201) or not rows:
            raise SystemExit("article insert failed %s: %s" % (st, rows))
        aid = rows[0]["id"]
        print("article inserted:", aid, "| date", rows[0]["date"], "| tags", rows[0]["tags"])

    # 2. which locales already present?
    st, have = req("GET", "/blog_article_translations?article_id=eq.%s&select=locale" % aid)
    if st != 200:
        raise SystemExit("locale query failed %s: %s" % (st, have))
    done = {r["locale"] for r in have}
    print("existing locales:", sorted(done) or "none")

    for loc in ("en", "zh"):
        if loc in done:
            print("skip", loc, "(already present)")
            continue
        payload = dict(C.CONTENT[loc])
        payload["article_id"] = aid
        payload["locale"] = loc
        st, res = req(
            "POST", "/blog_article_translations", payload, prefer="return=representation"
        )
        if st not in (200, 201):
            raise SystemExit("%s insert failed %s: %s" % (loc, st, str(res)[:600]))
        print("inserted", loc, "| body chars:", len(payload["body"]))

    # 3. verify
    st, rows = req(
        "GET",
        "/blog_articles?slug=eq.%s&select=id,slug,date,read_time,tags,"
        "blog_article_translations(locale,category,title,body)" % C.SLUG,
    )
    print("\nVERIFY:", st)
    for a in rows or []:
        print("id", a["id"], "| slug", a["slug"], "| date", a["date"],
              "| read_time", a["read_time"], "| tags", a["tags"])
        for t in a.get("blog_article_translations", []):
            body = t["body"]
            print("  ", t["locale"], "|", t["category"], "|", len(body), "chars |",
                  t["title"])
            print("     doubled-quote artefacts:", body.count('""'),
                  "| h2:", body.count("\n## "), "| links:", body.count("](/"))


if __name__ == "__main__":
    main()

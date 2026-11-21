# -*- coding: utf-8 -*-
"""Idempotent publisher: REST-first, Management API SQL fallback."""
import json
import sys
import urllib.request
import urllib.error

sys.path.insert(0, "scripts")
from blog_southeast_asia_content import (SLUG, DATE, READ_TIME, TAGS,
                                         EN_CATEGORY, EN_TITLE, EN_DESCRIPTION, EN_BODY,
                                         ZH_CATEGORY, ZH_TITLE, ZH_DESCRIPTION, ZH_BODY)

REST = "https://qujcrmbzuzlgjrexbzga.supabase.co/rest/v1"
ANON = "sb_publishable_bBrZR2df4POLnM4sWI96xQ_xPvlD06k"
HDRS = {
    "apikey": ANON,
    "Authorization": f"Bearer {ANON}",
    "Content-Type": "application/json",
    "User-Agent": "solarstoragepro-blog/1.0",
}


def rest(method, path, payload=None, prefer=None):
    h = dict(HDRS)
    if prefer:
        h["Prefer"] = prefer
    data = json.dumps(payload).encode("utf-8") if payload is not None else None
    req = urllib.request.Request(f"{REST}/{path}", data=data, headers=h, method=method)
    with urllib.request.urlopen(req, timeout=60) as r:
        txt = r.read().decode("utf-8")
        return r.status, (json.loads(txt) if txt.strip() else [])


def rest_ok(method, path, payload=None, prefer=None):
    try:
        code, body = rest(method, path, payload, prefer)
        return 200 <= code < 300, body
    except Exception:
        return False, None


def main():
    use_rest = rest_ok("GET", "blog_articles?slug=eq." + SLUG + "&select=id")[0]
    print(f"REST channel: {'OK' if use_rest else 'DOWN'} -> {'pure REST' if use_rest else 'Management API SQL fallback'}")

    pairs = [
        ("en", EN_CATEGORY, EN_TITLE, EN_DESCRIPTION, EN_BODY),
        ("zh", ZH_CATEGORY, ZH_TITLE, ZH_DESCRIPTION, ZH_BODY),
    ]

    if use_rest:
        ok, body = rest_ok("GET", f"blog_articles?slug=eq.{SLUG}&select=id")
        if ok and isinstance(body, list) and body:
            art_id = body[0]["id"]
            print(f"article exists: {art_id}")
        else:
            ok, body = rest_ok("POST", "blog_articles",
                               {"slug": SLUG, "date": DATE, "read_time": READ_TIME, "tags": TAGS},
                               prefer="return=representation")
            if not (ok and isinstance(body, list) and body):
                raise SystemExit(f"article POST failed: {body}")
            art_id = body[0]["id"]
            print(f"article inserted: {art_id}")
        for locale, cat, ti, de, bo in pairs:
            ok, body = rest_ok("GET", f"blog_article_translations?article_id=eq.{art_id}&locale=eq.{locale}&select=id")
            if ok and isinstance(body, list) and body:
                print(f"{locale}: exists, skip")
                continue
            ok, body = rest_ok("POST", "blog_article_translations",
                               {"article_id": art_id, "locale": locale, "category": cat,
                                "title": ti, "description": de, "body": bo},
                               prefer="return=representation")
            print(f"{locale}: {'inserted' if ok else 'FAILED'} {len(bo)} chars -> {str(body)[:120]}")
    else:
        from _sb_mgmt import query, esc
        rows = query(f"select id from blog_articles where slug = '{SLUG}'")
        if rows:
            art_id = rows[0]["id"]
            print(f"article exists: {art_id}")
        else:
            tags_pg = "{" + ",".join(TAGS) + "}"
            rows = query(
                f"insert into blog_articles (slug, date, read_time, tags) values "
                f"('{SLUG}', '{DATE}', {READ_TIME}, '{tags_pg}') returning id")
            art_id = rows[0]["id"]
            print(f"article inserted: {art_id}")
        for locale, cat, ti, de, bo in pairs:
            rows = query(
                f"select id from blog_article_translations where article_id = '{art_id}' and locale = '{locale}'")
            if rows:
                print(f"{locale}: exists, skip")
                continue
            query(
                "insert into blog_article_translations "
                "(article_id, locale, category, title, description, body) values "
                f"('{art_id}', '{locale}', '{esc(cat)}', '{esc(ti)}', '{esc(de)}', '{esc(bo)}')")
            print(f"{locale}: inserted {len(bo)} chars")

    # verify
    from _sb_mgmt import query
    v = query("select a.slug, a.date, a.read_time, a.tags, t.locale, "
              "length(t.body) as body_len, t.title "
              "from blog_articles a join blog_article_translations t on t.article_id = a.id "
              f"where a.slug = '{SLUG}' order by t.locale")
    print("VERIFY:", json.dumps(v, ensure_ascii=False, indent=1))
    print("CHECK:", query(f"select count(*) as n from blog_articles where slug = '{SLUG}'"))


if __name__ == "__main__":
    main()

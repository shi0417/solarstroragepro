# -*- coding: utf-8 -*-
"""Idempotent publisher: REST-first, Management API SQL fallback."""
import json
import sys
import urllib.request
import urllib.error

sys.path.insert(0, "scripts")
from blog_gas_peaker_content import (SLUG, DATE, READ_TIME, TAGS,
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
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            txt = r.read().decode("utf-8")
            return r.status, (json.loads(txt) if txt.strip() else [])
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", "replace")[:300]
    except Exception as e:  # network failure -> signal caller to fall back
        raise


def rest_ok(method, path, payload=None, prefer=None):
    try:
        code, body = rest(method, path, payload, prefer)
        return 200 <= code < 300, body
    except Exception:
        return False, None


def rest_available():
    ok, body = rest_ok("GET", "blog_articles?slug=eq." + SLUG + "&select=id")
    return ok


def mgmt():
    from _sb_mgmt import query, esc
    return query, esc


def main():
    from blog_gas_peaker_content import SLUG as s  # noqa
    use_rest = rest_available()
    print(f"REST channel: {'OK' if use_rest else 'DOWN'} -> {'pure REST' if use_rest else 'Management API SQL fallback'}")

    if use_rest:
        # article row
        ok, body = rest_ok("GET", f"blog_articles?slug=eq.{SLUG}&select=id")
        if ok and isinstance(body, list) and body:
            art_id = body[0]["id"]
            print(f"article exists: {art_id}")
        else:
            ok, body = rest_ok("POST", "blog_articles",
                               {"slug": SLUG, "date": DATE, "read_time": READ_TIME, "tags": TAGS},
                               prefer="return=representation")
            assert ok, f"article POST failed: {body}"
            art_id = body[0]["id"]
            print(f"article inserted: {art_id}")
        for locale, cat, ti, de, bo in [
            ("en", EN_CATEGORY, EN_TITLE, EN_DESCRIPTION, EN_BODY),
            ("zh", ZH_CATEGORY, ZH_TITLE, ZH_DESCRIPTION, ZH_BODY),
        ]:
            ok, body = rest_ok("GET", f"blog_article_translations?article_id=eq.{art_id}&locale=eq.{locale}&select=id")
            if ok and isinstance(body, list) and body:
                print(f"{locale}: exists, skip")
                continue
            ok, body = rest_ok("POST", "blog_article_translations",
                               {"article_id": art_id, "locale": locale, "category": cat,
                                "title": ti, "description": de, "body": bo},
                               prefer="return=representation")
            assert ok, f"{locale} POST failed: {body}"
            print(f"{locale}: inserted {len(bo)} chars")
    else:
        query, esc = mgmt()
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
        for locale, cat, ti, de, bo in [
            ("en", EN_CATEGORY, EN_TITLE, EN_DESCRIPTION, EN_BODY),
            ("zh", ZH_CATEGORY, ZH_TITLE, ZH_DESCRIPTION, ZH_BODY),
        ]:
            rows = query(
                f"select id from blog_article_translations where article_id = '{art_id}' and locale = '{locale}'")
            if rows:
                print(f"{locale}: exists, skip")
                continue
            query(
                f"insert into blog_article_translations (article_id, locale, category, title, description, body) values "
                f"('{art_id}', '{locale}', '{esc(cat)}', '{esc(ti)}', '{esc(de)}', '{esc(bo)}')")
            print(f"{locale}: inserted {len(bo)} chars")

    # verify
    if use_rest:
        ok, body = rest_ok("GET", f"blog_articles?slug=eq.{SLUG}&select=id,slug,date,read_time,tags")
        print("VERIFY:", json.dumps(body, ensure_ascii=False))
        ok, body = rest_ok("GET",
                           f"blog_article_translations?article_id=eq.{art_id}&select=locale,length(body),title")
        print("VERIFY:", json.dumps(body, ensure_ascii=False))
    else:
        query, _ = mgmt()
        v = query(f"select a.slug, a.date, a.read_time, a.tags, t.locale, length(t.body) as body_len, t.title "
                  f"from blog_articles a join blog_article_translations t on t.article_id = a.id "
                  f"where a.slug = '{SLUG}'")
        print("VERIFY:", json.dumps(v, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()

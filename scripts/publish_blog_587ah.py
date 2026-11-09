# -*- coding: utf-8 -*-
"""Publish the 587Ah vs 314Ah article. Idempotent: re-runs update instead of duplicating."""
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from _sb_mgmt import query
import blog_587ah_content as c


def esc(s):
    return s.replace("'", "''")


def arr(tags):
    return "ARRAY[" + ",".join("'" + esc(t) + "'" for t in tags) + "]::text[]"


def main():
    # 1. upsert main record
    existing = query(f"select id from blog_articles where slug = '{esc(c.SLUG)}'")
    if existing:
        aid = existing[0]["id"]
        print(f"[=] article exists: {aid}")
        query(
            f"update blog_articles set date='{c.DATE}', read_time={c.READ_TIME}, "
            f"tags={arr(c.TAGS)}, updated_at=now() where id='{aid}' returning id"
        )
    else:
        rows = query(
            "insert into blog_articles (slug, date, read_time, tags) values "
            f"('{esc(c.SLUG)}', '{c.DATE}', {c.READ_TIME}, {arr(c.TAGS)}) returning id"
        )
        aid = rows[0]["id"]
        print(f"[+] article created: {aid}")

    # 2. translations (upsert per locale)
    payloads = [
        ("en", c.CATEGORY_EN, c.TITLE_EN, c.DESC_EN, c.BODY_EN),
        ("zh", c.CATEGORY_ZH, c.TITLE_ZH, c.DESC_ZH, c.BODY_ZH),
    ]
    for locale, cat, title, desc, body in payloads:
        have = query(
            f"select id from blog_article_translations where article_id='{aid}' and locale='{locale}'"
        )
        vals = (f"('{aid}', '{locale}', '{esc(cat)}', '{esc(title)}', "
                f"'{esc(desc)}', '{esc(body)}')")
        if have:
            query(
                f"update blog_article_translations set category='{esc(cat)}', title='{esc(title)}', "
                f"description='{esc(desc)}', body='{esc(body)}', updated_at=now() "
                f"where id='{have[0]['id']}' returning id"
            )
            print(f"[=] {locale} translation updated")
        else:
            query(
                "insert into blog_article_translations "
                "(article_id, locale, category, title, description, body) values " + vals + " returning id"
            )
            print(f"[+] {locale} translation inserted")

    # 3. verify via join
    chk = query(
        "select a.slug, a.date, a.read_time, a.tags, t.locale, length(t.body) as blen, t.title "
        "from blog_articles a join blog_article_translations t on t.article_id = a.id "
        f"where a.slug = '{esc(c.SLUG)}' order by t.locale"
    )
    print("\n--- VERIFY ---")
    for r in chk:
        print(f"{r['locale']}  {r['blen']} chars  |  {r['title']}")
    print(f"slug={chk[0]['slug']}  date={chk[0]['date']}  read_time={chk[0]['read_time']}  tags={chk[0]['tags']}")
    print(f"locales={sorted(r['locale'] for r in chk)}")


if __name__ == "__main__":
    main()

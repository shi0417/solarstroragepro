# -*- coding: utf-8 -*-
"""Publish the hot-climate BESS article to Supabase via Management API SQL (idempotent)."""
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from _sb_mgmt import query, esc  # noqa: E402
import blog_hot_climate_content as C  # noqa: E402

tags_literal = "{" + ",".join('"' + t + '"' for t in C.TAGS) + "}"

existing = query(f"select id from blog_articles where slug = '{esc(C.SLUG)}'")
if existing:
    article_id = existing[0]["id"]
    print("existing article", article_id)
    query(
        "update blog_articles set date = '{d}', read_time = {r}, tags = '{t}' where id = '{i}'".format(
            d=C.DATE, r=C.READ_TIME, t=tags_literal, i=article_id
        )
    )
else:
    rows = query(
        "insert into blog_articles (slug, date, read_time, tags) values "
        "('{s}', '{d}', {r}, '{t}') returning id".format(
            s=esc(C.SLUG), d=C.DATE, r=C.READ_TIME, t=tags_literal
        )
    )
    article_id = rows[0]["id"]
    print("inserted article", article_id)

for locale, payload in (("en", C.EN), ("zh", C.ZH)):
    found = query(
        f"select id from blog_article_translations where article_id = '{article_id}' and locale = '{locale}'"
    )
    cols = dict(
        article_id=article_id,
        locale=locale,
        category=esc(payload["category"]),
        title=esc(payload["title"]),
        description=esc(payload["description"]),
        body=esc(payload["body"]),
    )
    if found:
        query(
            "update blog_article_translations set category='{category}', title='{title}', "
            "description='{description}', body='{body}' where id='{tid}'".format(tid=found[0]["id"], **cols)
        )
        print(locale, "updated", len(payload["body"]))
    else:
        query(
            "insert into blog_article_translations (article_id, locale, category, title, description, body) "
            "values ('{article_id}','{locale}','{category}','{title}','{description}','{body}')".format(**cols)
        )
        print(locale, "inserted", len(payload["body"]))

check = query(
    "select a.slug, a.date, a.read_time, a.tags, t.locale, length(t.body) as body_len, t.title "
    "from blog_articles a join blog_article_translations t on t.article_id = a.id "
    f"where a.slug = '{esc(C.SLUG)}' order by t.locale"
)
for r in check:
    print(r)

print("ARTICLE_ID=", article_id)

# -*- coding: utf-8 -*-
"""Publish 2026-11-10 blog: US tariffs + FEOC sourcing guide. Idempotent upsert via Management API SQL."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _sb_mgmt import query, esc
from blog_tariffs_feoc_content import (SLUG, DATE, READ_TIME, TAGS,
                                       EN_TITLE, EN_CATEGORY, EN_DESCRIPTION, EN_BODY,
                                       ZH_TITLE, ZH_CATEGORY, ZH_DESCRIPTION, ZH_BODY)

# 0. idempotency: drop existing article + translations if slug already present
existing = query(f"select id from blog_articles where slug = '{esc(SLUG)}'")
if existing:
    art_id = existing[0]['id']
    query(f"delete from blog_article_translations where article_id = '{art_id}'")
    query(f"delete from blog_articles where id = '{art_id}'")
    print(f"Removed existing article {art_id} for re-insert")

# 1. insert article, return id
tags_pg = "{" + ",".join(TAGS) + "}"
res = query(
    f"insert into blog_articles (slug, date, read_time, tags) "
    f"values ('{esc(SLUG)}', '{DATE}', {READ_TIME}, '{esc(tags_pg)}') returning id"
)
art_id = res[0]['id']
print(f"Inserted article id: {art_id}")

# 2. insert translations
for locale, cat, title, desc, body in (
    ("en", EN_CATEGORY, EN_TITLE, EN_DESCRIPTION, EN_BODY),
    ("zh", ZH_CATEGORY, ZH_TITLE, ZH_DESCRIPTION, ZH_BODY),
):
    query(
        f"insert into blog_article_translations (article_id, locale, category, title, description, body) "
        f"values ('{art_id}', '{locale}', '{esc(cat)}', '{esc(title)}', '{esc(desc)}', '{esc(body)}')"
    )
    print(f"Inserted {locale} translation ({len(body)} chars)")

# 3. verify via join
check = query(
    f"select a.slug, a.date, a.read_time, a.tags, t.locale, length(t.body) as body_len, t.title "
    f"from blog_articles a join blog_article_translations t on t.article_id = a.id "
    f"where a.slug = '{esc(SLUG)}'"
)
for r in check:
    print(f"VERIFY: {r['locale']} | {r['body_len']} chars | {r['title'][:70]}")
print("DONE")

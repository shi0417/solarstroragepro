# -*- coding: utf-8 -*-
import sys, json
sys.path.insert(0, 'D:/project/solarstoragepro/scripts')
from _sb_sql import query
import blog_content_2026_10_27 as C

def esc(s):
    return s.replace("'", "''")

# 1) guard: slug must not exist
existing = query(f"select slug from blog_articles where slug = '{esc(C.SLUG)}';")
if existing:
    raise SystemExit('slug already exists, aborting')

# 2) main record
tags_sql = "array[" + ", ".join("'" + esc(t) + "'" for t in C.TAGS) + "]::text[]"
sql = (
    "insert into blog_articles (slug, date, read_time, tags) values ("
    f"'{esc(C.SLUG)}', '{C.DATE}', {C.READ_TIME}, {tags_sql}"
    ") returning id;"
)
res = query(sql)
aid = res[0]['id']
print('article id:', aid)

# 3) translations
for locale, cat, title, desc, body in [
    ('en', C.CATEGORY_EN, C.TITLE_EN, C.DESC_EN, C.BODY_EN),
    ('zh', C.CATEGORY_ZH, C.TITLE_ZH, C.DESC_ZH, C.BODY_ZH),
]:
    s = (
        "insert into blog_article_translations (article_id, locale, category, title, description, body) values ("
        f"'{aid}', '{locale}', '{esc(cat)}', '{esc(title)}', '{esc(desc)}', '{esc(body.strip())}'"
        ") returning id;"
    )
    r = query(s)
    print(locale, 'translation id:', r[0]['id'])

# 4) verify
v = query(
    "select a.slug, a.date, a.read_time, array_length(a.tags,1) as tag_count, "
    "count(t.id) as trans, min(length(t.body)) as min_body, max(length(t.body)) as max_body "
    "from blog_articles a left join blog_article_translations t on t.article_id = a.id "
    f"where a.slug = '{esc(C.SLUG)}' group by a.slug, a.date, a.read_time, a.tags;"
)
print('VERIFY:', json.dumps(v, ensure_ascii=False))
print('EN words:', len(C.BODY_EN.split()), '| ZH chars:', len(C.BODY_ZH))

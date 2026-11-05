# -*- coding: utf-8 -*-
"""Insert the port shore-power article via Supabase Management API SQL.
REST *.supabase.co is TLS-reset from this machine; api.supabase.com works.
"""
import json, subprocess, sys

ENV = 'D:/project/solarstoragepro/.env.local'
SRC = 'D:/project/solarstoragepro/scripts/insert_blog_port_shore_power.py'
API = 'https://api.supabase.com/v1/projects/qujcrmbzuzlgjrexbzga/database/query'


def read_env(key):
    for line in open(ENV, encoding='utf-8'):
        if line.startswith(key + '='):
            return line.split('=', 1)[1].strip()
    raise SystemExit('missing ' + key)


TOKEN = read_env('SUPABASE_LOGIN_TOKEN')


def query(sql):
    out = subprocess.run([
        'curl', '-sS', '-m', '90', '--ssl-no-revoke', '-X', 'POST', API,
        '-H', f'Authorization: Bearer {TOKEN}',
        '-H', 'Content-Type: application/json; charset=utf-8',
        '--data-binary', '@-',
    ], input=json.dumps({'query': sql}), capture_output=True, text=True, encoding='utf-8')
    txt = out.stdout.strip()
    if not txt:
        raise SystemExit('empty response: ' + out.stderr.strip())
    try:
        return json.loads(txt)
    except json.JSONDecodeError:
        raise SystemExit('bad json: ' + txt[:600])


def lit(s):
    return "'" + s.replace("'", "''") + "'"


# load content constants without executing the REST insert block
code = open(SRC, encoding='utf-8').read().split('# ============================ INSERT')[0]
ns = {}
exec(compile(code, SRC, 'exec'), ns)

SLUG = ns['SLUG']
DATE = ns['DATE']
READ_TIME = ns['READ_TIME']
TAGS = ns['TAGS']

tags_sql = "'{" + ",".join('"%s"' % t for t in TAGS) + "}'"

rows = query(f"select id, slug from blog_articles where slug = {lit(SLUG)}")
if rows:
    aid = rows[0]['id']
    print('exists, id =', aid)
else:
    rows = query(
        "insert into blog_articles (slug, date, read_time, tags) values ("
        f"{lit(SLUG)}, {lit(DATE)}::date, {READ_TIME}, {tags_sql}::text[]) "
        "returning id, slug"
    )
    aid = rows[0]['id']
    print('inserted, id =', aid)

have = {r['locale'] for r in query(
    f"select locale from blog_article_translations where article_id = {lit(aid)}")}
print('locales present:', have)

for loc, cat, title, desc, body in [
    ('en', ns['EN_CATEGORY'], ns['EN_TITLE'], ns['EN_DESCRIPTION'], ns['EN_BODY']),
    ('zh', ns['ZH_CATEGORY'], ns['ZH_TITLE'], ns['ZH_DESCRIPTION'], ns['ZH_BODY']),
]:
    if loc in have:
        print(loc, 'already present, skip')
        continue
    query(
        "insert into blog_article_translations "
        "(article_id, locale, category, title, description, body) values ("
        f"{lit(aid)}, {lit(loc)}, {lit(cat)}, {lit(title)}, {lit(desc)}, {lit(body)})"
    )
    print(loc, 'inserted, body chars =', len(body))

# verify
v = query(
    "select a.slug, a.date, a.read_time, t.locale, t.title, length(t.body) as body_len "
    "from blog_articles a join blog_article_translations t on t.article_id = a.id "
    f"where a.slug = {lit(SLUG)} order by t.locale"
)
for r in v:
    print(r)
print('EN words:', len(ns['EN_BODY'].split()), '| ZH chars:', len(ns['ZH_BODY']))

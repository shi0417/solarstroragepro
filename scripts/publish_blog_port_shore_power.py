# -*- coding: utf-8 -*-
"""Publish/refresh the port shore-power article content via Management API SQL."""
import json, subprocess, sys

ENV = 'D:/project/solarstoragepro/.env.local'
API = 'https://api.supabase.com/v1/projects/qujcrmbzuzlgjrexbzga/database/query'
sys.path.insert(0, 'D:/project/solarstoragepro/scripts')
import blog_port_shore_power_content as c  # noqa: E402


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


rows = query(f"select id from blog_articles where slug = {lit(c.SLUG)}")
if not rows:
    raise SystemExit('article missing, run insert script first')
aid = rows[0]['id']

tags_sql = "'{" + ",".join('"%s"' % t for t in c.TAGS) + "}'"
query(
    "update blog_articles set "
    f"date = {lit(c.DATE)}::date, read_time = {c.READ_TIME}, tags = {tags_sql}::text[] "
    f"where id = {lit(aid)}"
)
print('article row updated, id =', aid)

for loc, cat, title, desc, body in [
    ('en', c.EN_CATEGORY, c.EN_TITLE, c.EN_DESCRIPTION, c.EN_BODY),
    ('zh', c.ZH_CATEGORY, c.ZH_TITLE, c.ZH_DESCRIPTION, c.ZH_BODY),
]:
    query(
        "update blog_article_translations set "
        f"category = {lit(cat)}, title = {lit(title)}, description = {lit(desc)}, body = {lit(body)} "
        f"where article_id = {lit(aid)} and locale = {lit(loc)}"
    )
    print(loc, 'updated, chars =', len(body))

v = query(
    "select a.slug, a.date, a.read_time, a.tags, t.locale, t.category, t.title, length(t.body) as body_len "
    "from blog_articles a join blog_article_translations t on t.article_id = a.id "
    f"where a.slug = {lit(c.SLUG)} order by t.locale"
)
for r in v:
    print(r)

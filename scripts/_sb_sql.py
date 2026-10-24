import json, os, re, subprocess, sys

ENV = 'D:/project/solarstoragepro/.env.local'

def token():
    for line in open(ENV, encoding='utf-8'):
        if line.startswith('SUPABASE_LOGIN_TOKEN='):
            return line.split('=', 1)[1].strip()
    raise SystemExit('no token')

def query(sql):
    body = json.dumps({'query': sql})
    out = subprocess.run([
        'curl', '-sS', '-m', '60', '-X', 'POST',
        'https://api.supabase.com/v1/projects/qujcrmbzuzlgjrexbzga/database/query',
        '-H', f'Authorization: Bearer {token()}',
        '-H', 'Content-Type: application/json',
        '-d', body,
    ], capture_output=True, text=True)
    txt = out.stdout.strip()
    if not txt:
        raise SystemExit('empty response: ' + out.stderr)
    try:
        return json.loads(txt)
    except json.JSONDecodeError:
        raise SystemExit('bad json: ' + txt[:500])

if __name__ == '__main__':
    sql = "select slug, date from blog_articles order by slug;"
    rows = query(sql)
    print('COUNT', len(rows))
    for r in rows:
        print(r['date'], r['slug'])

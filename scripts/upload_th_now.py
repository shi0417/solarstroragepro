#!/usr/bin/env python3
"""Upload all available Thai body translations."""
import json, subprocess, os

from _supabase_auth import SUPABASE_LOGIN_TOKEN as TOKEN, API_BASE, MGMT_BASE
API_BASE = "https://api.supabase.com/v1/projects/qujcrmbzuzlgjrexbzga/database/query"
SCRIPTS = "D:/project/solarstoragepro/scripts"

def run_sql(sql):
    p = json.dumps({"query": sql})
    t = os.path.join(SCRIPTS, "tmp_sql.json")
    with open(t, 'w', encoding='utf-8') as f: f.write(p)
    cmd = ["curl", "-s", "-X", "POST", API_BASE,
            "-H", f"Authorization: Bearer {TOKEN}",
            "-H", "Content-Type: application/json", "-d", f"@{t}"]
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
    try: return json.loads(r.stdout)
    except: return None

def get_id(slug):
    r = run_sql(f"SELECT id FROM blog_articles WHERE slug = '{slug}';")
    return r[0]['id'] if r and isinstance(r, list) and r else None

def upload(aid, locale, fpath):
    with open(fpath, 'r', encoding='utf-8') as f: body = f.read()
    b = body.replace("'", "''")
    sql = f"UPDATE blog_article_translations SET body = '{b}' WHERE article_id = '{aid}' AND locale = '{locale}';"
    r = run_sql(sql)
    return isinstance(r, list)

mapping = [
    ("commercial-battery-storage-roi", "th_body_commercial_roi.txt"),
    ("lithium-battery-cabinet-vs-rack-mount", "th_body_cabinet_vs_rack.txt"),
    ("ci-solar-storage-installation-guide", "th_body_ci_install.txt"),
]

ok = 0
for slug, fname in mapping:
    fpath = os.path.join(SCRIPTS, fname)
    if not os.path.exists(fpath):
        print(f"  SKIP {slug}: file not found")
        continue
    aid = get_id(slug)
    if not aid:
        print(f"  SKIP {slug}: no ID")
        continue
    if upload(aid, "th", fpath):
        sz = os.path.getsize(fpath)
        print(f"  ✅ {slug} (th): {sz} bytes uploaded")
        ok += 1
    else:
        print(f"  ❌ {slug} (th): failed")

print(f"\nDone: {ok}/{len(mapping)} uploaded.")

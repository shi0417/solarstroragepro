#!/usr/bin/env python3
"""
Upload Thai titles and descriptions from th_titles_desc.json to Supabase.
"""
import json
import subprocess
import os

from _supabase_auth import SUPABASE_LOGIN_TOKEN as TOKEN, API_BASE, MGMT_BASE
API_BASE = "https://api.supabase.com/v1/projects/qujcrmbzuzlgjrexbzga/database/query"

SCRIPTS_DIR = "D:/project/solarstoragepro/scripts"

def escape_sql(text):
    return text.replace("\\", "\\\\").replace("'", "''")

def run_sql(sql):
    payload = json.dumps({"query": sql})
    tmp_file = os.path.join(SCRIPTS_DIR, "tmp_sql_payload.json")
    with open(tmp_file, 'w', encoding='utf-8') as f:
        f.write(payload)
    cmd = [
        "curl", "-s", "-X", "POST", API_BASE,
        "-H", f"Authorization: Bearer {TOKEN}",
        "-H", "Content-Type: application/json",
        "-d", f"@{tmp_file}"
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
    try:
        resp = json.loads(result.stdout)
        return isinstance(resp, list)
    except:
        print(f"  SQL failed: {result.stdout[:300]}")
        return False

# Load titles and descriptions
with open(os.path.join(SCRIPTS_DIR, "th_titles_desc.json"), 'r', encoding='utf-8') as f:
    items = json.load(f)

# Get article IDs
print("Fetching article IDs...")
sql = "SELECT slug, id FROM blog_articles ORDER BY slug;"
payload = json.dumps({"query": sql})
tmp_file = os.path.join(SCRIPTS_DIR, "tmp_query.json")
with open(tmp_file, 'w', encoding='utf-8') as f:
    f.write(payload)
cmd = ["curl", "-s", "-X", "POST", API_BASE,
        "-H", f"Authorization: Bearer {TOKEN}",
        "-H", "Content-Type: application/json",
        "-d", f"@{tmp_file}"]
result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
articles = {r['slug']: r['id'] for r in json.loads(result.stdout)}

print(f"Found {len(articles)} articles\n")

# Update title and description for each article (th)
success = 0
for item in items:
    slug = item['slug']
    aid = articles.get(slug)
    if not aid:
        print(f"  SKIP: {slug} — no article ID found")
        continue
    
    title_th = item['title_th']
    desc_th = item['desc_th']
    
    title_escaped = escape_sql(title_th)
    desc_escaped = escape_sql(desc_th)
    
    sql = (f"UPDATE blog_article_translations "
            f"SET title = '{title_escaped}', description = '{desc_escaped}' "
            f"WHERE article_id = '{aid}' AND locale = 'th';")
    
    ok = run_sql(sql)
    if ok:
        print(f"  ✅ {slug} (th): title+desc updated")
        success += 1
    else:
        print(f"  ❌ {slug} (th): update failed")

print(f"\nDone: {success}/{len(items)} updated successfully.")

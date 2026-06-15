#!/usr/bin/env python3
"""Upload a single Thai body translation."""
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

# Get article ID for commercial-battery-storage-roi
sql = "SELECT id FROM blog_articles WHERE slug = 'commercial-battery-storage-roi';"
payload = json.dumps({"query": sql})
tmp_file = os.path.join(SCRIPTS_DIR, "tmp_query.json")
with open(tmp_file, 'w', encoding='utf-8') as f:
    f.write(payload)
cmd = ["curl", "-s", "-X", "POST", API_BASE,
        "-H", f"Authorization: Bearer {TOKEN}",
        "-H", "Content-Type: application/json",
        "-d", f"@{tmp_file}"]
result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
articles = json.loads(result.stdout)
aid = articles[0]['id']
print(f"Article ID: {aid}")

# Read Thai body
with open(os.path.join(SCRIPTS_DIR, "th_body_commercial_roi.txt"), 'r', encoding='utf-8') as f:
    body = f.read()

body_escaped = escape_sql(body)
sql = f"UPDATE blog_article_translations SET body = '{body_escaped}' WHERE article_id = '{aid}' AND locale = 'th';"

ok = run_sql(sql)
if ok:
    print(f"✅ Uploaded th body for commercial-battery-storage-roi ({len(body)} chars)")
else:
    print(f"❌ Upload failed")

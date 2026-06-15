#!/usr/bin/env python3
"""
Fetch English blog bodies from Supabase using curl subprocess.
"""
import json
import subprocess
import time
import os

from _supabase_auth import SUPABASE_LOGIN_TOKEN as TOKEN, API_BASE, MGMT_BASE
PROJECT_REF = "qujcrmbzuzlgjrexbzga"
API_BASE = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"

def run_query(sql):
    """Run SQL query via curl subprocess."""
    payload = json.dumps({"query": sql})
    # Write payload to temp file to avoid shell escaping issues
    tmp_file = f"D:/project/solarstoragepro/scripts/tmp_query.json"
    with open(tmp_file, 'w', encoding='utf-8') as f:
        f.write(payload)
    
    cmd = [
        "curl", "-s", "-X", "POST", API_BASE,
        "-H", f"Authorization: Bearer {TOKEN}",
        "-H", "Content-Type: application/json",
        "-d", f"@{tmp_file}"
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
    try:
        return json.loads(result.stdout)
    except:
        print(f"  Failed to parse response: {result.stdout[:200]}")
        return None

# Get all articles with their IDs
articles_sql = """
SELECT a.id, a.slug
FROM blog_articles a
ORDER BY a.slug;
"""

print("Fetching article list...")
articles = run_query(articles_sql)
if not articles:
    print("Failed to fetch articles")
    exit(1)

print(f"Found {len(articles)} articles:")
for a in articles:
    print(f"  {a['slug']}: {a['id']}")

# For each article, get English body
scripts_dir = "D:/project/solarstoragepro/scripts"
print("\nFetching English bodies...")
for a in articles:
    slug = a['slug']
    aid = a['id']
    sql = f"SELECT body FROM blog_article_translations WHERE article_id = '{aid}' AND locale = 'en';"
    result = run_query(sql)
    if result and len(result) > 0:
        body = result[0]['body']
        safe_slug = slug.replace('-', '_')
        fname = f"{scripts_dir}/en_{safe_slug}.txt"
        with open(fname, 'w', encoding='utf-8') as f:
            f.write(body)
        print(f"  Saved: en_{safe_slug}.txt ({len(body)} chars)")
    else:
        print(f"  NO EN BODY for {slug}")
    time.sleep(0.3)

print("\nDone fetching all English bodies.")

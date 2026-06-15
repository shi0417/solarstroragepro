#!/usr/bin/env python3
"""Fetch English titles and descriptions for all 7 articles."""
import json
import subprocess

from _supabase_auth import SUPABASE_LOGIN_TOKEN as TOKEN, API_BASE, MGMT_BASE
API_BASE = "https://api.supabase.com/v1/projects/qujcrmbzuzlgjrexbzga/database/query"

def run_query(sql):
    payload = json.dumps({"query": sql})
    tmp_file = "D:/project/solarstoragepro/scripts/tmp_query.json"
    with open(tmp_file, 'w', encoding='utf-8') as f:
        f.write(payload)
    cmd = ["curl", "-s", "-X", "POST", API_BASE,
            "-H", f"Authorization: Bearer {TOKEN}",
            "-H", "Content-Type: application/json",
            "-d", f"@{tmp_file}"]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
    try:
        return json.loads(result.stdout)
    except:
        return None

sql = """
SELECT a.slug, t.title, t.description
FROM blog_articles a
JOIN blog_article_translations t ON a.id = t.article_id
WHERE t.locale = 'en'
ORDER BY a.slug;
"""

data = run_query(sql)
if data:
    with open("D:/project/solarstoragepro/scripts/en_titles_desc.json", 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Saved to en_titles_desc.json")
    for r in data:
        print(f"\n=== {r['slug']} ===")
        print(f"Title: {r['title']}")
        print(f"Desc: {r['description'][:120]}...")
else:
    print("Failed to fetch data")

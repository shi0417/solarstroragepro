#!/usr/bin/env python3
"""Update blog_article_translations body for locale='tr' via Supabase Management API."""
import json, os, sys, urllib.request, urllib.error

TOKEN = os.environ.get("SUPABASE_LOGIN_TOKEN", "")
if not TOKEN:
    print("ERROR: SUPABASE_LOGIN_TOKEN not set")
    sys.exit(1)

REF = "qujcrmbzuzlgjrexbzga"
BASE = f"https://api.supabase.com/v1/projects/{REF}/database/query"

with open("scripts/tr_blog_bodies.json", encoding="utf-8") as f:
    data = json.load(f)

# First, get the article_id for each slug using the REST API
anon_key = "sb_publishable_bBrZR2df4POLnM4sWI96xQ_xPvlD06k"
rest_url = "https://qujcrmbzuzlgjrexbzga.supabase.co/rest/v1/blog_articles?select=id,slug"

req = urllib.request.Request(rest_url, headers={
    "apikey": anon_key,
    "Authorization": f"Bearer {anon_key}"
})

with urllib.request.urlopen(req) as resp:
    articles = json.loads(resp.read().decode())

slug_to_id = {a["slug"]: a["id"] for a in articles}

for item in data:
    slug = item["slug"]
    body = item["tr_body"]
    article_id = slug_to_id.get(slug)
    if not article_id:
        print(f"SKIP: slug {slug} not found")
        continue

    # Escape single quotes for SQL
    safe_body = body.replace("'", "''")
    
    sql = f"UPDATE blog_article_translations SET body = '{safe_body}' WHERE article_id = '{article_id}' AND locale = 'tr';"
    
    mgmt_req = urllib.request.Request(BASE, data=json.dumps({"query": sql}).encode(), headers={
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type": "application/json"
    })
    
    try:
        with urllib.request.urlopen(mgmt_req) as resp:
            result = json.loads(resp.read().decode())
            print(f"OK: {slug} ({len(body)} chars)")
    except urllib.error.HTTPError as e:
        print(f"FAIL: {slug} - HTTP {e.code}: {e.read().decode()[:200]}")

print("\nAll done!")

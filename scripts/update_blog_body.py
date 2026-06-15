"""Update a single blog article body via Supabase Management API."""
import json
import urllib.request
import sys

SUPABASE_from _supabase_auth import SUPABASE_LOGIN_TOKEN as TOKEN, API_BASE, MGMT_BASE
API_URL = "https://api.supabase.com/v1/projects/qujcrmbzuzlgjrexbzga/database/query"

def update_body(article_id, locale, body_file):
    with open(body_file, "r", encoding="utf-8") as f:
        body = f.read()
    
    # Escape single quotes for SQL
    body_escaped = body.replace("'", "''")
    
    sql = f"""UPDATE blog_article_translations 
SET body = '{body_escaped}' 
WHERE article_id = '{article_id}' AND locale = '{locale}'"""
    
    payload = json.dumps({"query": sql}).encode("utf-8")
    req = urllib.request.Request(API_URL, data=payload, method="POST",
        headers={
            "Authorization": f"Bearer {SUPABASE_TOKEN}",
            "Content-Type": "application/json",
        })
    
    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read())
    
    print(f"Updated article_id={article_id}, locale={locale}, result={result}")


if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python update_blog_body.py <article_id> <locale> <body_file>")
        sys.exit(1)
    update_body(sys.argv[1], sys.argv[2], sys.argv[3])

"""Update blog body using Management API SQL UPDATE (properly escaped)."""
import json
import urllib.request
import sys

API_URL = "https://api.supabase.com/v1/projects/qujcrmbzuzlgjrexbzga/database/query"
from _supabase_auth import SUPABASE_LOGIN_TOKEN as TOKEN, API_BASE, MGMT_BASE

def update_body_mgmt(article_id, locale, body_file):
    with open(body_file, "r", encoding="utf-8") as f:
        body = f.read()
    
    # Escape for PostgreSQL SQL: double single quotes, escape backslashes
    body_escaped = body.replace("\\", "\\\\").replace("'", "''")
    
    sql = f"UPDATE blog_article_translations SET body = '{body_escaped}' WHERE article_id = '{article_id}' AND locale = '{locale}'"
    
    payload = json.dumps({"query": sql}).encode("utf-8")
    req = urllib.request.Request(API_URL, data=payload, method="POST",
        headers={
            "Authorization": f"Bearer {TOKEN}",
            "Content-Type": "application/json",
        })
    
    try:
        with urllib.request.urlopen(req) as resp:
            result = resp.read().decode("utf-8")
        print(f"OK: {article_id}/{locale}, body_len={len(body)}, resp={result[:100]}")
    except urllib.error.HTTPError as e:
        body_err = e.read().decode("utf-8", errors="replace")[:300]
        print(f"FAIL: {article_id}/{locale}, status={e.code}, err={body_err}")


if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python update_body_mgmt.py <article_id> <locale> <body_file>")
        sys.exit(1)
    update_body_mgmt(sys.argv[1], sys.argv[2], sys.argv[3])

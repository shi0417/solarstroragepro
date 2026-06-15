"""Upload blog body in chunks via Management API to avoid query size limits."""
import json
import urllib.request
import sys

API_URL = "https://api.supabase.com/v1/projects/qujcrmbzuzlgjrexbzga/database/query"
from _supabase_auth import SUPABASE_LOGIN_TOKEN as TOKEN, API_BASE, MGMT_BASE
CHUNK_SIZE = 800  # characters per chunk to stay under API limits

def run_sql(sql):
    payload = json.dumps({"query": sql}).encode("utf-8")
    req = urllib.request.Request(API_URL, data=payload, method="POST",
        headers={
            "Authorization": f"Bearer {TOKEN}",
            "Content-Type": "application/json",
        })
    try:
        with urllib.request.urlopen(req) as resp:
            result = resp.read().decode("utf-8")
        return result
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")[:300]
        raise Exception(f"SQL error {e.code}: {body}")


def upload_body_chunked(article_id, locale, body_file):
    with open(body_file, "r", encoding="utf-8") as f:
        body = f.read()
    
    body_escaped = body.replace("\\", "\\\\").replace("'", "''")
    
    print(f"Uploading body: {article_id}/{locale}, total_len={len(body)}, chunks={len(body_escaped)//CHUNK_SIZE + 1}")
    
    # Step 1: Clear the body
    sql = f"UPDATE blog_article_translations SET body = '' WHERE article_id = '{article_id}' AND locale = '{locale}'"
    run_sql(sql)
    print("  Cleared body")
    
    # Step 2: Append chunks
    for i in range(0, len(body_escaped), CHUNK_SIZE):
        chunk = body_escaped[i:i + CHUNK_SIZE]
        sql = f"UPDATE blog_article_translations SET body = body || '{chunk}' WHERE article_id = '{article_id}' AND locale = '{locale}'"
        try:
            run_sql(sql)
            progress = min(100, (i + CHUNK_SIZE) * 100 // len(body_escaped))
            print(f"  Chunk {i//CHUNK_SIZE + 1}: OK (progress: {progress}%)")
        except Exception as e:
            print(f"  Chunk {i//CHUNK_SIZE + 1} FAILED: {e}")
            sys.exit(1)
    
    print(f"  DONE: {article_id}/{locale}")


if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python update_body_chunked.py <article_id> <locale> <body_file>")
        sys.exit(1)
    upload_body_chunked(sys.argv[1], sys.argv[2], sys.argv[3])

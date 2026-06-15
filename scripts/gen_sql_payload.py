"""Generate Management API payload file from body translation."""
import json
import sys
import os

def main():
    article_id = sys.argv[1]
    locale = sys.argv[2]
    body_file = sys.argv[3]
    
    with open(body_file, "r", encoding="utf-8") as f:
        body = f.read()
    
    # Escape for PostgreSQL SQL string
    body_escaped = body.replace("\\", "\\\\").replace("'", "''")
    
    sql = f"UPDATE blog_article_translations SET body = '{body_escaped}' WHERE article_id = '{article_id}' AND locale = '{locale}'"
    
    payload = json.dumps({"query": sql}, ensure_ascii=False)
    
    out_file = "D:/project/solarstoragepro/scripts/tmp_sql_payload.json"
    with open(out_file, "w", encoding="utf-8") as f:
        f.write(payload)
    
    print(f"Payload: {len(payload)} bytes, body: {len(body)} chars")

if __name__ == "__main__":
    main()

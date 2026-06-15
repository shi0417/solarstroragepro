"""Batch upload all Japanese blog bodies using Management API via curl."""
import json
import subprocess
import sys

API_URL = "https://api.supabase.com/v1/projects/qujcrmbzuzlgjrexbzga/database/query"
from _supabase_auth import SUPABASE_LOGIN_TOKEN as TOKEN, API_BASE, MGMT_BASE

ARTICLES = [
    ("1883da43-1f06-4e92-b910-6da6f836480e", "ja", "grid frequency regulation"),
    ("f9c13832-8b11-4db4-9eb1-049c6fb91e98", "ja", "lfp vs nmc"),
    ("2fb3f6fc-1717-4131-add5-e2709857c3da", "ja", "commercial roi"),
    ("aa7c7fd8-8d65-4534-adab-2e86dfc2211c", "ja", "ci installation guide"),
    ("f94e0bb9-bfbb-45bd-a20a-db890785d90d", "ja", "cabinet vs rack"),
    ("04a5a326-abaa-49b2-b520-75975cc001b4", "ja", "certification guide"),
    ("852037bf-52b2-41fe-be11-d30766ab6a57", "ja", "supplier selection"),
]

BODY_FILES = [
    "D:/project/solarstoragepro/scripts/ja_body_1_translated.txt",
    "D:/project/solarstoragepro/scripts/ja_body_2_translated.txt",
    "D:/project/solarstoragepro/scripts/ja_body_3_translated.txt",
    "D:/project/solarstoragepro/scripts/ja_body_4_translated.txt",
    "D:/project/solarstoragepro/scripts/ja_body_5_translated.txt",
    "D:/project/solarstoragepro/scripts/ja_body_6_translated.txt",
    "D:/project/solarstoragepro/scripts/ja_body_7_translated.txt",
]


def upload_one(article_id, locale, body_file, label):
    with open(body_file, "r", encoding="utf-8") as f:
        body = f.read()
    
    body_escaped = body.replace("\\", "\\\\").replace("'", "''")
    sql = f"UPDATE blog_article_translations SET body = '{body_escaped}' WHERE article_id = '{article_id}' AND locale = '{locale}'"
    
    payload_file = f"D:/project/solarstoragepro/scripts/tmp_{article_id[:8]}.json"
    with open(payload_file, "w", encoding="utf-8") as f:
        json.dump({"query": sql}, f, ensure_ascii=False)
    
    # Use curl via subprocess
    result = subprocess.run(
        ["curl", "-s", "-X", "POST", API_URL,
         "-H", f"Authorization: Bearer {TOKEN}",
         "-H", "Content-Type: application/json",
         "-d", f"@{payload_file}"],
        capture_output=True, text=True, timeout=60
    )
    
    resp = result.stdout.strip()
    if result.returncode == 0:
        print(f"OK: [{label}] body_len={len(body)}")
    else:
        print(f"FAIL: [{label}] exit={result.returncode}, stderr={result.stderr[:100]}")
    
    return result.returncode == 0


def main():
    for (aid, loc, label), bf in zip(ARTICLES, BODY_FILES):
        ok = upload_one(aid, loc, bf, label)
        if not ok:
            print(f"ABORTING after failure on {label}")
            sys.exit(1)
    print("All 7 articles uploaded!")


if __name__ == "__main__":
    main()

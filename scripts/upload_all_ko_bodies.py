#!/usr/bin/env python3
"""
Upload all 5 remaining Korean blog body translations to Supabase via Management API.
"""
import json
import subprocess
import os

from _supabase_auth import SUPABASE_LOGIN_TOKEN as TOKEN, API_BASE, MGMT_BASE
API_BASE = "https://api.supabase.com/v1/projects/qujcrmbzuzlgjrexbzga/database/query"

SCRIPTS_DIR = "D:/project/solarstoragepro/scripts"

# Article mappings: (article_id, slug, ko_body_file)
articles = [
    ("aa7c7fd8-8d65-4534-adab-2e86dfc2211c", "ci-solar-storage-installation-guide", "ko_body_ci_install.txt"),
    ("852037bf-52b2-41fe-be11-d30766ab6a57", "how-to-choose-energy-storage-supplier", "ko_body_choose_supplier.txt"),
    ("f9c13832-8b11-4db4-9eb1-049c6fb91e98", "lfp-vs-nmc-battery-energy-storage", "ko_body_lfp_vs_nmc.txt"),
    ("f94e0bb9-bfbb-45bd-a20a-db890785d90d", "lithium-battery-cabinet-vs-rack-mount", "ko_body_cabinet_vs_rack.txt"),
    ("04a5a326-abaa-49b2-b520-75975cc001b4", "solar-storage-certification-guide", "ko_body_certification.txt"),
]

def escape_sql(text):
    return text.replace("\\", "\\\\").replace("'", "''")

def upload_body(article_id, locale, body_file):
    filepath = os.path.join(SCRIPTS_DIR, body_file)
    with open(filepath, 'r', encoding='utf-8') as f:
        body = f.read()
    
    body_escaped = escape_sql(body)
    
    # Generate SQL
    sql = f"UPDATE blog_article_translations SET body = '{body_escaped}' WHERE article_id = '{article_id}' AND locale = '{locale}';"
    
    # Write to temp JSON payload file
    payload = {"query": sql}
    payload_file = os.path.join(SCRIPTS_DIR, "tmp_sql_payload.json")
    with open(payload_file, 'w', encoding='utf-8') as f:
        json.dump(payload, f, ensure_ascii=False)
    
    # Upload via curl
    cmd = [
        "curl", "-s", "-X", "POST", API_BASE,
        "-H", f"Authorization: Bearer {TOKEN}",
        "-H", "Content-Type: application/json",
        "-d", f"@{payload_file}"
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
    response = result.stdout.strip()
    
    try:
        resp_json = json.loads(response)
        if isinstance(resp_json, list):
            print(f"  ✅ {article_id[:8]}... (ko): uploaded successfully")
            return True
        else:
            print(f"  ❌ {article_id[:8]}... (ko): {response[:200]}")
            return False
    except:
        print(f"  ❌ {article_id[:8]}... ({locale}): {response[:200]}")
        return False

print("Uploading 5 remaining Korean blog body translations...\n")

success_count = 0
for article_id, slug, body_file in articles:
    print(f"Uploading: {slug} (locale='ko')...")
    ok = upload_body(article_id, "ko", body_file)
    if ok:
        success_count += 1

print(f"\nDone: {success_count}/{len(articles)} uploaded successfully.")

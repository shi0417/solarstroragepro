#!/usr/bin/env python3
"""Upload all remaining Thai body translations."""
import json
import subprocess
import os

from _supabase_auth import SUPABASE_LOGIN_TOKEN as TOKEN, API_BASE, MGMT_BASE
API_BASE = "https://api.supabase.com/v1/projects/qujcrmbzuzlgjrexbzga/database/query"
SCRIPTS_DIR = "D:/project/solarstoragepro/scripts"

def run_sql(sql):
    payload = json.dumps({"query": sql})
    tmp = os.path.join(SCRIPTS_DIR, "tmp_sql_payload.json")
    with open(tmp, 'w', encoding='utf-8') as f:
        f.write(payload)
    cmd = ["curl", "-s", "-X", "POST", API_BASE,
            "-H", f"Authorization: Bearer {TOKEN}",
            "-H", "Content-Type: application/json",
            "-d", f"@{tmp}"]
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
    try:
        return json.loads(r.stdout)
    except:
        return {"error": r.stdout[:300]}

def get_id(slug):
    r = run_sql(f"SELECT id FROM blog_articles WHERE slug = '{slug}';")
    if r and isinstance(r, list) and len(r) > 0:
        return r[0]['id']
    return None

def upload_body(slug, locale, body_file):
    aid = get_id(slug)
    if not aid:
        print(f"  SKIP {slug}: no article ID")
        return False
    fpath = os.path.join(SCRIPTS_DIR, body_file)
    if not os.path.exists(fpath):
        print(f"  SKIP {slug}: file {body_file} not found")
        return False
    with open(fpath, 'r', encoding='utf-8') as f:
        body = f.read()
    # Escape single quotes for SQL
    body_sq = body.replace("'", "''")
    sql = (f"UPDATE blog_article_translations SET body = '{body_sq}' "
            f"WHERE article_id = '{aid}' AND locale = '{locale}';")
    resp = run_sql(sql)
    if resp and isinstance(resp, list):
        print(f"  ✅ {slug} ({locale}): {len(body)} chars uploaded")
        return True
    else:
        print(f"  ❌ {slug} ({locale}): {str(resp)[:200]}")
        return False

# Upload all Thai bodies
articles = [
    ("ci-solar-storage-installation-guide", "th", "th_body_ci_install.txt"),
    ("commercial-battery-storage-roi", "th", "th_body_commercial_roi.txt"),
    ("grid-frequency-regulation-bess-revenue", "th", "th_body_grid_revenue.txt"),
    ("how-to-choose-energy-storage-supplier", "th", "th_body_choose_supplier.txt"),
    ("lfp-vs-nmc-battery-energy-storage", "th", "th_body_lfp_vs_nmc.txt"),
    ("lithium-battery-cabinet-vs-rack-mount", "th", "th_body_cabinet_vs_rack.txt"),
    ("solar-storage-certification-guide", "th", "th_body_certification.txt"),
]

print("Uploading Thai body translations...\n")
ok = 0
for slug, locale, f in articles:
    if os.path.exists(os.path.join(SCRIPTS_DIR, f)):
        if upload_body(slug, locale, f):
            ok += 1
    else:
        print(f"  ⚠️  {slug}: file {f} not found, skipping")

print(f"\nDone: {ok}/{len(articles)} uploaded.")

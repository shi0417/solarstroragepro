"""Upload all 7 Arabic blog bodies to Supabase"""
import json, subprocess, os

from _supabase_auth import SUPABASE_LOGIN_TOKEN as TOKEN, API_BASE, MGMT_BASE
API_BASE = 'https://api.supabase.com/v1/projects/qujcrmbzuzlgjrexbzga/database/query'
SCRIPTS_DIR = 'D:/project/solarstoragepro/scripts'

ARTICLES = [
    ('commercial-battery-storage-roi', 'a6c56c37-aaca-4342-8504-a20781292e7f', 'ar_body_commercial_roi.txt'),
    ('lithium-battery-cabinet-vs-rack-mount', 'f94e0bb9-bfbb-45bd-a20a-db890785d90d', 'ar_body_cabinet_vs_rack.txt'),
    ('ci-solar-storage-installation-guide', 'aa7c7fd8-8d65-4534-adab-2e86dfc2211c', 'ar_body_ci_install.txt'),
    ('solar-storage-certification-guide', '04a5a326-abaa-49b2-b520-75975cc001b4', 'ar_body_certification.txt'),
    ('lfp-vs-nmc-battery-energy-storage', 'f9c13832-8b11-4db4-9eb1-049c6fb91e98', 'ar_body_lfp_vs_nmc.txt'),
    ('how-to-choose-energy-storage-supplier', '852037bf-52b2-41fe-be11-d30766ab6a57', 'ar_body_choose_supplier.txt'),
    ('grid-frequency-regulation-bess-revenue', '1883da43-1f06-4e92-b910-6da6f836480e', 'ar_body_grid_freq.txt'),
]

tmp_file = os.path.join(SCRIPTS_DIR, 'tmp_sql_ar.json')

for slug, aid, fname in ARTICLES:
    fpath = os.path.join(SCRIPTS_DIR, fname)
    if not os.path.exists(fpath):
        print(f'  ⚠️ {slug}: file not found, skip')
        continue
    
    with open(fpath, 'r', encoding='utf-8') as f:
        body = f.read()
    
    body_escaped = body.replace('\\', '\\\\').replace("'", "''")
    sql = f"UPDATE blog_article_translations SET body = '{body_escaped}' WHERE article_id = '{aid}' AND locale = 'ar';"
    
    with open(tmp_file, 'w', encoding='utf-8') as f:
        json.dump({'query': sql}, f, ensure_ascii=False)
    
    cmd = ['curl', '-s', '-X', 'POST', API_BASE,
           '-H', f'Authorization: Bearer {TOKEN}',
           '-H', 'Content-Type: application/json',
           '-d', f'@{tmp_file}']
    
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    resp = r.stdout.strip()
    
    if resp.startswith('['):
        print(f'  ✅ {slug} (len={len(body)})')
    else:
        print(f'  ❌ {slug}: {resp[:200]}')

print('\nAll Arabic bodies done!')

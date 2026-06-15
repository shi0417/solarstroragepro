import subprocess, json, os

from _supabase_auth import SUPABASE_LOGIN_TOKEN as TOKEN, API_BASE, MGMT_BASE
API_BASE = 'https://api.supabase.com/v1/projects/qujcrmbzuzlgjrexbzga/database/query'
SCRIPTS = 'D:/project/solarstoragepro/scripts'

# Hardcoded mapping: (slug, id, list of (locale, filename))
mappings = [
    ('commercial-battery-storage-roi', '2fb3f6fc-1717-4131-add5-e2709857c3da', [
        ('de', 'de_body_commercial_roi.txt'), ('fr', 'fr_body_commercial_roi.txt'),
        ('pt', 'pt_body_commercial_roi.txt'), ('id', 'id_body_commercial_roi.txt'),
    ]),
    ('lithium-battery-cabinet-vs-rack-mount', 'f94e0bb9-bfbb-45bd-a20a-db890785d90d', [
        ('de', 'de_body_cabinet_vs_rack.txt'), ('fr', 'fr_body_cabinet_vs_rack.txt'),
        ('pt', 'pt_body_cabinet_vs_rack.txt'), ('id', 'id_body_cabinet_vs_rack.txt'),
    ]),
    ('solar-storage-certification-guide', '04a5a326-abaa-49b2-b520-75975cc001b4', [
        ('de', 'de_body_solar_storage_certification_guide.txt'),
        ('fr', 'fr_body_solar_storage_certification_guide.txt'),
        ('pt', 'pt_body_solar_storage_certification_guide.txt'),
        ('id', 'id_body_solar_storage_certification_guide.txt'),
    ]),
    ('ci-solar-storage-installation-guide', 'aa7c7fd8-8d65-4534-adab-2e86dfc2211c', [
        ('de', 'de_body_ci_solar_storage_installation_guide.txt'),
        ('fr', 'fr_body_ci_solar_storage_installation_guide.txt'),
        ('pt', 'pt_body_ci_solar_storage_installation_guide.txt'),
        ('id', 'id_body_ci_solar_storage_installation_guide.txt'),
    ]),
]

uploaded = 0
for slug, aid, files in mappings:
    for loc, fname in files:
        fp = os.path.join(SCRIPTS, fname)
        if not os.path.exists(fp):
            print(f"  ⚠ {slug[:25]} ({loc}): FILE MISSING {fname}")
            continue
        with open(fp, 'r', encoding='utf-8') as f:
            body = f.read()
        body_escaped = body.replace('\\', '\\\\').replace("'", "''")
        sql = f"UPDATE blog_article_translations SET body = '{body_escaped}' WHERE article_id = '{aid}' AND locale = '{loc}';"
        payload = json.dumps({'query': sql})
        tmp = os.path.join(SCRIPTS, f'_up_{slug[:10]}_{loc}.json')
        with open(tmp, 'w', encoding='utf-8') as f:
            f.write(payload)
        cmd = ['curl', '-s', '-X', 'POST', API_BASE, '-H', f'Authorization: Bearer {TOKEN}', 
               '-H', 'Content-Type: application/json', '-d', f'@{tmp}']
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
        try:
            result = json.loads(r.stdout)
            if isinstance(result, list):
                print(f"  ✅ {slug[:25]} ({loc}): {len(body)} chars OK")
                uploaded += 1
            else:
                print(f"  ❌ {slug[:25]} ({loc}): {r.stdout[:150]}")
        except:
            print(f"  ❌ {slug[:25]} ({loc}): PARSE ERROR")

print(f"\nTotal uploaded: {uploaded}")

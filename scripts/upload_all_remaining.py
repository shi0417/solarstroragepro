import subprocess, json, os

from _supabase_auth import SUPABASE_LOGIN_TOKEN as TOKEN, API_BASE, MGMT_BASE
API_BASE = 'https://api.supabase.com/v1/projects/qujcrmbzuzlgjrexbzga/database/query'
SCRIPTS = 'D:/project/solarstoragepro/scripts'

articles = {
    'commercial-battery-storage-roi': '2fb3f6fc-1717-4131-add5-e2709857c3da',
    'lithium-battery-cabinet-vs-rack-mount': 'f94e0bb9-bfbb-45bd-a20a-db890785d90d',
    'solar-storage-certification-guide': '04a5a326-abaa-49b2-b520-75975cc001b4',
    'ci-solar-storage-installation-guide': 'aa7c7fd8-8d65-4534-adab-2e86dfc2211c',
    'lfp-vs-nmc-battery-energy-storage': 'f9c13832-8b11-4db4-9eb1-049c6fb91e98',
    'how-to-choose-energy-storage-supplier': '852037bf-52b2-41fe-be11-d30766ab6a57',
    'grid-frequency-regulation-bess-revenue': '1883da43-1f06-4e92-b910-6da6f836480e',
    'battery-energy-storage-system-sizing-guide': '6357fb11-4ac9-41ed-a42e-ae4971ef32c0',
}

locales = {
    'de': 'de_body',
    'fr': 'fr_body',
    'pt': 'pt_body',
    'id': 'id_body',
}

uploaded = 0
for article_slug, article_id in articles.items():
    safe_slug = article_slug.replace('-', '_')
    for loc_code, loc_prefix in locales.items():
        fname = f"{loc_code}_body_{safe_slug}.txt"
        filepath = os.path.join(SCRIPTS, fname)
        if not os.path.exists(filepath):
            continue
        with open(filepath, 'r', encoding='utf-8') as f:
            body = f.read()
        body_escaped = body.replace('\\', '\\\\').replace("'", "''")
        sql = f"UPDATE blog_article_translations SET body = '{body_escaped}' WHERE article_id = '{article_id}' AND locale = '{loc_code}';"
        payload = json.dumps({'query': sql})
        tmp_file = os.path.join(SCRIPTS, f'_up_{article_slug[:15]}_{loc_code}.json')
        with open(tmp_file, 'w', encoding='utf-8') as f:
            f.write(payload)
        cmd = ['curl', '-s', '-X', 'POST', API_BASE, '-H', f'Authorization: Bearer {TOKEN}', 
               '-H', 'Content-Type: application/json', '-d', f'@{tmp_file}']
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
        try:
            result = json.loads(r.stdout)
            if isinstance(result, list):
                print(f"  ✅ {article_slug[:25]} ({loc_code}): {len(body)} chars OK")
                uploaded += 1
            else:
                print(f"  ❌ {article_slug[:25]} ({loc_code}): {r.stdout[:150]}")
        except:
            print(f"  ❌ {article_slug[:25]} ({loc_code}): PARSE {r.stdout[:100]}")

print(f"\nTotal uploaded: {uploaded}")

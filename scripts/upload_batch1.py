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

def upload_body(slug, article_id, locale, filepath):
    if not os.path.exists(filepath):
        return False, f"File not found: {filepath}"
    with open(filepath, 'r', encoding='utf-8') as f:
        body = f.read()
    body_escaped = body.replace('\\', '\\\\').replace("'", "''")
    sql = f"UPDATE blog_article_translations SET body = '{body_escaped}' WHERE article_id = '{article_id}' AND locale = '{locale}';"
    payload = json.dumps({'query': sql})
    tmp_file = os.path.join(SCRIPTS, f'_upload_{slug}_{locale}.json')
    with open(tmp_file, 'w', encoding='utf-8') as f:
        f.write(payload)
    cmd = ['curl', '-s', '-X', 'POST', API_BASE, '-H', f'Authorization: Bearer {TOKEN}', 
           '-H', 'Content-Type: application/json', '-d', f'@{tmp_file}']
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
    try:
        result = json.loads(r.stdout)
        if isinstance(result, list):
            return True, f"{slug[:20]} ({locale}): {len(body)} chars OK"
        else:
            return False, f"{r.stdout[:200]}"
    except:
        return False, f"Parse error: {r.stdout[:200]}"

# Upload commercial-ROI for de/fr/pt/id
for locale_tag, fname in [('de','de_body_commercial_roi.txt'), ('fr','fr_body_commercial_roi.txt'), 
                           ('pt','pt_body_commercial_roi.txt'), ('id','id_body_commercial_roi.txt')]:
    fp = os.path.join(SCRIPTS, fname)
    aid = articles['commercial-battery-storage-roi']
    ok, msg = upload_body('commercial-roi', aid, locale_tag, fp)
    print(f"  {'✅' if ok else '❌'} {msg}")

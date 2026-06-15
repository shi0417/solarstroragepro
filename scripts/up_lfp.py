import subprocess, json, os

from _supabase_auth import SUPABASE_LOGIN_TOKEN as TOKEN, API_BASE, MGMT_BASE
BASE = 'https://api.supabase.com/v1/projects/qujcrmbzuzlgjrexbzga/database/query'
SCRIPTS = 'D:/project/solarstoragepro/scripts'

# Upload lfp-vs-nmc for de/fr/id/pt
files = [
    ('de', 'de_body_lfp_vs_nmc_battery_energy_storage.txt'),
    ('fr', 'fr_body_lfp_vs_nmc_battery_energy_storage.txt'),
    ('id', 'id_body_lfp_vs_nmc_battery_energy_storage.txt'),
    ('pt', 'pt_body_lfp_vs_nmc_battery_energy_storage.txt'),
]
aid = 'f9c13832-8b11-4db4-9eb1-049c6fb91e98'

for loc, fn in files:
    fp = os.path.join(SCRIPTS, fn)
    if not os.path.exists(fp):
        print(f'  MISSING {fn}')
        continue
    with open(fp, 'r', encoding='utf-8') as f:
        body = f.read()
    bs = body.replace('\\', '\\\\').replace("'", "''")
    sql = f"UPDATE blog_article_translations SET body = '{bs}' WHERE article_id = '{aid}' AND locale = '{loc}';"
    tmp = os.path.join(SCRIPTS, f'_lfp_{loc}.json')
    with open(tmp, 'w', encoding='utf-8') as f:
        f.write(json.dumps({'query': sql}))
    r = subprocess.run(['curl', '-s', '-X', 'POST', BASE, '-H', f'Authorization: Bearer {TOKEN}',
                        '-H', 'Content-Type: application/json', '-d', f'@{tmp}'],
                       capture_output=True, text=True, timeout=60)
    try:
        if isinstance(json.loads(r.stdout), list):
            print(f'  OK lfp ({loc}): {len(body)} chars')
        else:
            print(f'  FAIL lfp ({loc}): {r.stdout[:100]}')
    except:
        print(f'  PARSE lfp ({loc}): {r.stdout[:80]}')
print("Done lfp-vs-nmc")

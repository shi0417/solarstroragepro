"""Update Spanish blog bodies in Supabase via Management API"""
import json, subprocess, os

# Read environment variable for token
with open('.env.local', 'r') as f:
    env = {}
    for line in f:
        line = line.strip()
        if '=' in line and not line.startswith('#'):
            k, v = line.split('=', 1)
            env[k] = v

token = env.get('SUPABASE_LOGIN_TOKEN', '')
if not token:
    print("ERROR: SUPABASE_LOGIN_TOKEN not found in .env.local")
    exit(1)

mgmt_url = 'https://api.supabase.com/v1/projects/qujcrmbzuzlgjrexbzga/database/query'

with open('scripts/es_blog_bodies.json', 'r', encoding='utf-8') as f:
    bodies = json.load(f)

# Also need Spanish article_ids to update correct translation records
# First, fetch all Spanish translation IDs
import urllib.request

fetch_sql = "SELECT article_id, id FROM blog_article_translations WHERE locale = 'es';"
data = json.dumps({"query": fetch_sql}).encode('utf-8')
req = urllib.request.Request(mgmt_url, data=data, headers={
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json",
})
with urllib.request.urlopen(req) as resp:
    rows = json.loads(resp.read())

# Build article_id -> translation_id map
aid_to_tid = {r['article_id']: r['id'] for r in rows}
print(f"Found {len(aid_to_tid)} Spanish translation records")

def esc(s):
    return s.replace("'", "''")

success = 0
for i, (article_id, body) in enumerate(bodies.items()):
    if article_id not in aid_to_tid:
        print(f"SKIP {article_id[:8]}: no Spanish translation record found")
        continue
    
    tid = aid_to_tid[article_id]
    sql = f"UPDATE blog_article_translations SET body = '{esc(body)}' WHERE id = '{tid}';"
    
    payload = json.dumps({"query": sql}, ensure_ascii=False)
    tmpfile = f'tmp_es_update_{i}.json'
    with open(tmpfile, 'w', encoding='utf-8') as f:
        f.write(payload)
    
    result = subprocess.run([
        'curl', '-s', '-X', 'POST', mgmt_url,
        '-H', f'Authorization: Bearer {token}',
        '-H', 'Content-Type: application/json',
        '--data-binary', f'@{tmpfile}'
    ], capture_output=True, text=True)
    
    os.unlink(tmpfile)
    
    resp = result.stdout.strip()
    if resp.startswith('[') or resp == '':
        success += 1
        print(f'OK {success}/{len(bodies)}: {article_id[:8]}... ({len(body)} chars)')
    else:
        print(f'FAIL {article_id[:8]}: {resp[:150]}')

print(f'\nDone: {success}/{len(bodies)} updated')

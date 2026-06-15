import subprocess, json, os

from _supabase_auth import SUPABASE_LOGIN_TOKEN as TOKEN, API_BASE, MGMT_BASE
BASE = 'https://api.supabase.com/v1/projects/qujcrmbzuzlgjrexbzga/database/query'
SCRIPTS = os.path.dirname(os.path.abspath(__file__))

uploads = [
    # battery-sizing: de, fr, pt, id (never uploaded)
    ('6357fb11-4ac9-41ed-a42e-ae4971ef32c0', 'de', 'de_body_battery_energy_storage_system_sizing_guide.txt'),
    ('6357fb11-4ac9-41ed-a42e-ae4971ef32c0', 'fr', 'fr_body_battery_energy_storage_system_sizing_guide.txt'),
    ('6357fb11-4ac9-41ed-a42e-ae4971ef32c0', 'pt', 'pt_body_battery_energy_storage_system_sizing_guide.txt'),
    ('6357fb11-4ac9-41ed-a42e-ae4971ef32c0', 'id', 'id_body_battery_energy_storage_system_sizing_guide.txt'),
    # choose-supplier: de, fr, id (currently has English body)
    ('852037bf-52b2-41fe-be11-d30766ab6a57', 'de', 'de_body_how_to_choose_energy_storage_supplier.txt'),
    ('852037bf-52b2-41fe-be11-d30766ab6a57', 'fr', 'fr_body_how_to_choose_energy_storage_supplier.txt'),
    ('852037bf-52b2-41fe-be11-d30766ab6a57', 'id', 'id_body_how_to_choose_energy_storage_supplier.txt'),
    # grid-freq: de, fr, id (currently has English body)
    ('1883da43-1f06-4e92-b910-6da6f836480e', 'de', 'de_body_grid_frequency_regulation_bess_revenue.txt'),
    ('1883da43-1f06-4e92-b910-6da6f836480e', 'fr', 'fr_body_grid_frequency_regulation_bess_revenue.txt'),
    ('1883da43-1f06-4e92-b910-6da6f836480e', 'id', 'id_body_grid_frequency_regulation_bess_revenue.txt'),
]

results = []
for aid, loc, fn in uploads:
    fp = os.path.join(SCRIPTS, fn)
    with open(fp, 'r', encoding='utf-8') as f:
        body = f.read()
    
    # Escape for SQL
    bs = body.replace('\\', '\\\\').replace("'", "''")
    sql = f"UPDATE blog_article_translations SET body = '{bs}' WHERE article_id = '{aid}' AND locale = '{loc}';"
    
    r = subprocess.run(['curl', '-s', '-X', 'POST', BASE, '-H', f'Authorization: Bearer {TOKEN}',
                        '-H', 'Content-Type: application/json', '-d', json.dumps({'query': sql})],
                       capture_output=True, text=True, timeout=60)
    try:
        resp = json.loads(r.stdout)
        if isinstance(resp, list):
            results.append(f'  OK  {fn[:50]:50s} -> {loc} ({len(body)} chars)')
        else:
            results.append(f'  FAIL {fn[:50]:50s} -> {loc}: {str(resp)[:100]}')
    except:
        results.append(f'  ERR  {fn[:50]:50s} -> {loc}: {r.stdout[:100]}')

for r in results:
    print(r)
print(f'\nDone: {sum(1 for x in results if x.startswith("  OK"))}/{len(results)} succeeded')

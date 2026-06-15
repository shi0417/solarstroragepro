"""Fix remaining blog translation issues:
1. INSERT battery-sizing translations for de/fr/pt/id (rows don't exist)
2. UPDATE commercial-roi ar body (currently English)
"""
import subprocess, json, os

from _supabase_auth import SUPABASE_LOGIN_TOKEN as TOKEN, API_BASE, MGMT_BASE
BASE = 'https://api.supabase.com/v1/projects/qujcrmbzuzlgjrexbzga/database/query'
SCRIPTS = os.path.dirname(os.path.abspath(__file__))

def run_sql(sql, desc=""):
    r = subprocess.run(['curl', '-s', '-X', 'POST', BASE,
                        '-H', f'Authorization: Bearer {TOKEN}',
                        '-H', 'Content-Type: application/json',
                        '-d', json.dumps({'query': sql}, ensure_ascii=False)],
                       capture_output=True, text=True, timeout=60)
    try:
        resp = json.loads(r.stdout)
        if isinstance(resp, list):
            return True, f"OK ({desc})"
        else:
            return False, f"FAIL ({desc}): {str(resp)[:100]}"
    except:
        return False, f"ERR ({desc}): {r.stdout[:100]}"

def escape(s):
    return s.replace('\\', '\\\\').replace("'", "''")

BATTERY_ID = '6357fb11-4ac9-41ed-a42e-ae4971ef32c0'

translations = {
    'de': {
        'title': 'Batteriespeicher-Dimensionierung: Ein Praxisleitfaden f\u00fcr Gewerbliche und Netzgebundene Projekte',
        'desc': 'Schrittweise Methodik zur Dimensionierung von BESS f\u00fcr Spitzenlastkappung, Frequenzregulierung und Solar-plus-Speicher-Anwendungen, mit Formeln, Referenztabellen und Praxisbeispielen.',
        'category': 'Technischer Leitfaden',
        'body_file': 'de_body_battery_energy_storage_system_sizing_guide.txt',
    },
    'fr': {
        'title': 'Dimensionnement de Stockage par Batteries : Guide Pratique pour Projets Commerciaux et R\u00e9seau',
        'desc': 'M\u00e9thodologie \u00e9tape par \u00e9tape pour dimensionner les BESS pour \u00e9cr\u00eatement des pointes, r\u00e9gulation de fr\u00e9quence et applications solaire-plus-stockage, avec formules, tableaux et exemples concrets.',
        'category': 'Guide Technique',
        'body_file': 'fr_body_battery_energy_storage_system_sizing_guide.txt',
    },
    'pt': {
        'title': 'Dimensionamento de Armazenamento por Baterias: Guia Pr\u00e1tico para Projetos Comerciais e de Rede',
        'desc': 'Metodologia passo a passo para dimensionar BESS para peak shaving, regula\u00e7\u00e3o de frequ\u00eancia e aplica\u00e7\u00f5es solar-plus-armazenamento, com f\u00f3rmulas, tabelas e exemplos pr\u00e1ticos.',
        'category': 'Guia T\u00e9cnico',
        'body_file': 'pt_body_battery_energy_storage_system_sizing_guide.txt',
    },
    'id': {
        'title': 'Menentukan Ukuran Sistem Penyimpanan Baterai: Panduan Praktis untuk Proyek Komersial dan Skala Jaringan',
        'desc': 'Metodologi langkah demi langkah untuk menentukan ukuran BESS untuk peak shaving, regulasi frekuensi, dan aplikasi solar-plus-storage, dengan rumus, tabel referensi, dan contoh nyata.',
        'category': 'Panduan Teknis',
        'body_file': 'id_body_battery_energy_storage_system_sizing_guide.txt',
    },
}

results = []
for loc, data in translations.items():
    fp = os.path.join(SCRIPTS, data['body_file'])
    if not os.path.exists(fp):
        results.append(f'  SKIP battery-sizing {loc}: body file missing')
        continue
    with open(fp, 'r', encoding='utf-8') as f:
        body = f.read()
    
    t = escape(data['title'])
    d = escape(data['desc'])
    c = escape(data['category'])
    b = escape(body)
    
    sql = f"""INSERT INTO blog_article_translations (article_id, locale, title, description, category, body)
VALUES ('{BATTERY_ID}', '{loc}', '{t}', '{d}', '{c}', '{b}');"""
    ok, msg = run_sql(sql, f'battery-sizing INSERT {loc}')
    results.append(f'  {msg} ({len(body)} chars body)')

# Note: commercial-roi ar was already successfully UPDATED in the previous run
fp_ar_roi = os.path.join(SCRIPTS, 'ar_body_commercial_roi.txt')
if os.path.exists(fp_ar_roi):
    with open(fp_ar_roi, 'r', encoding='utf-8') as f:
        ar_body = f.read()
    results.append(f'  commercial-roi ar body (already done): {len(ar_body)} chars')

print('\n'.join(results))
print(f'\nDone: {sum(1 for r in results if "OK" in r)}/{len(results)} succeeded')

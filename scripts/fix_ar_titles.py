"""Fix ar title for commercial-roi and grid-freq articles"""
import json, subprocess, os

from _supabase_auth import SUPABASE_LOGIN_TOKEN as TOKEN, API_BASE, MGMT_BASE
API_BASE = 'https://api.supabase.com/v1/projects/qujcrmbzuzlgjrexbzga/database/query'

FIXES = [
    ('commercial-battery-storage-roi', 'a6c56c37-aaca-4342-8504-a20781292e7f',
     'تحليل عائد الاستثمار لتخزين البطاريات التجارية: دليل 2026',
     'تحليل مالي مفصل لعائد استثمار أنظمة تخزين البطاريات التجارية والصناعية. نمذجة الإيرادات من تقليص الذروة والمراجحة وتحويل الأحمال مع فترات استرداد حقيقية.'),
    ('grid-frequency-regulation-bess-revenue', '1883da43-1f06-4e92-b910-6da6f836480e',
     'إيرادات تنظيم تردد الشبكة الكهربائية لأنظمة BESS',
     'كيف تحقق أنظمة تخزين طاقة البطاريات إيرادات ممتازة من أسواق تنظيم التردد. تغطية شاملة لأسواق PJM وUK Dynamic Containment وأستراليا FCAS والصين AGC.'),
]

tmp_file = 'D:/project/solarstoragepro/scripts/tmp_ar_fix.json'

for slug, aid, title, desc in FIXES:
    title_esc = title.replace("'", "''")
    desc_esc = desc.replace("'", "''")
    sql = f"UPDATE blog_article_translations SET title = '{title_esc}', description = '{desc_esc}' WHERE article_id = '{aid}' AND locale = 'ar';"
    with open(tmp_file, 'w', encoding='utf-8') as f:
        json.dump({'query': sql}, f, ensure_ascii=False)
    cmd = ['curl', '-s', '-X', 'POST', API_BASE,
           '-H', f'Authorization: Bearer {TOKEN}',
           '-H', 'Content-Type: application/json',
           '-d', f'@{tmp_file}']
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
    resp = r.stdout.strip()
    print(f'  {"✅" if resp.startswith("[") else "❌"} {slug} title/desc fixed')

print('Done fixing Arabic titles.')

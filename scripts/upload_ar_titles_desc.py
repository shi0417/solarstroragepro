"""Upload Arabic titles + descriptions for all 7 blog articles"""
import json, subprocess, os

from _supabase_auth import SUPABASE_LOGIN_TOKEN as TOKEN, API_BASE, MGMT_BASE
API_BASE = 'https://api.supabase.com/v1/projects/qujcrmbzuzlgjrexbzga/database/query'

# Arabic translations for all 7 articles
AR_DATA = {
    'ci-solar-storage-installation-guide': {
        'title': 'دليل تركيب أنظمة الطاقة الشمسية والتخزين التجارية والصناعية',
        'description': 'دليل شامل خطوة بخطوة لتركيب أنظمة تخزين الطاقة الشمسية التجارية والصناعية، من تقييم الموقع إلى التشغيل. مثالي لمقاولي EPC ومتكاملي الأنظمة.',
        'aid': 'aa7c7fd8-8d65-4534-adab-2e86dfc2211c'
    },
    'commercial-battery-storage-roi': {
        'title': 'تحليل عائد الاستثمار لتخزين البطاريات التجارية: دليل 2026',
        'description': 'تحليل مالي مفصل لعائد استثمار أنظمة تخزين البطاريات التجارية والصناعية. نمذجة الإيرادات من تقليص الذروة والمراجحة وتحويل الأحمال مع فترات استرداد حقيقية.',
        'aid': 'a6c56c37-aaca-4342-8504-a20781292e7f'
    },
    'grid-frequency-regulation-bess-revenue': {
        'title': 'إيرادات تنظيم تردد الشبكة الكهربائية لأنظمة BESS',
        'description': 'كيف تحقق أنظمة تخزين طاقة البطاريات إيرادات ممتازة من أسواق تنظيم التردد. تغطية شاملة لأسواق PJM وUK Dynamic Containment وأستراليا FCAS والصين AGC.',
        'aid': '1883da43-1f06-4e92-b910-6da6f836480e'
    },
    'how-to-choose-energy-storage-supplier': {
        'title': 'كيفية اختيار مورد أنظمة تخزين الطاقة: إطار تقييم من 15 نقطة',
        'description': 'إطار تقييم شامل لمقارنة موردي BESS. يغطي القدرة التصنيعية والشهادات وكيمياء الخلايا والسلامة من الحرائق وشروط الضمان والاستقرار المالي.',
        'aid': '852037bf-52b2-41fe-be11-d30766ab6a57'
    },
    'lfp-vs-nmc-battery-energy-storage': {
        'title': 'مقارنة LFP مقابل NMC في تخزين طاقة البطاريات: أيهما تختار؟',
        'description': 'مقارنة مدعومة بالبيانات بين كيمياء بطاريات LFP وNMC لأنظمة التخزين الثابتة. السلامة وعمر الدورة والتكلفة وكثافة الطاقة — مع توصيات لكل تطبيق.',
        'aid': 'f9c13832-8b11-4db4-9eb1-049c6fb91e98'
    },
    'lithium-battery-cabinet-vs-rack-mount': {
        'title': 'خزانة بطارية الليثيوم مقابل التركيب على الرف: دليل 2026',
        'description': 'مقارنة بين خزائن البطاريات المدمجة وأنظمة التركيب على الرفوف المعيارية لتخزين الطاقة الشمسية. معايير الاختيار والتكلفة وقابلية التوسع وإيجابيات وسلبيات كل خيار.',
        'aid': 'f94e0bb9-bfbb-45bd-a20a-db890785d90d'
    },
    'solar-storage-certification-guide': {
        'title': 'دليل شهادات أنظمة تخزين الطاقة الشمسية: IEC, UL, CE والمزيد',
        'description': 'دليل كامل للشهادات الدولية لأنظمة BESS. متطلبات IEC 62619 وUL 9540A وUN38.3 وCE وGB/T، واستراتيجيات التصديق حسب المنطقة والجداول الزمنية والتكاليف.',
        'aid': '04a5a326-abaa-49b2-b520-75975cc001b4'
    }
}

tmp_file = 'D:/project/solarstoragepro/scripts/tmp_sql_ar_td.json'

for slug, data in AR_DATA.items():
    title = data['title'].replace('\\', '\\\\').replace("'", "''")
    desc = data['description'].replace('\\', '\\\\').replace("'", "''")
    aid = data['aid']
    
    sql = f"UPDATE blog_article_translations SET title = '{title}', description = '{desc}' WHERE article_id = '{aid}' AND locale = 'ar';"
    
    with open(tmp_file, 'w', encoding='utf-8') as f:
        json.dump({'query': sql}, f, ensure_ascii=False)
    
    cmd = ['curl', '-s', '-X', 'POST', API_BASE,
           '-H', f'Authorization: Bearer {TOKEN}',
           '-H', 'Content-Type: application/json',
           '-d', f'@{tmp_file}']
    
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
    resp = r.stdout.strip()
    
    if resp.startswith('['):
        print(f'  ✅ {slug} title+description uploaded')
    else:
        print(f'  ❌ {slug}: {resp[:200]}')

print('\nArabic titles+descriptions done!')

const fs = require('fs');
const path = require('path');

// 新key的翻译
const translations = {
  "zh": {
    "hero.productLabel": "储能集装箱",
    "hero.productSpec": "1MW / 2MWh",
    "hero.chartTitle": "频率响应 (Hz)",
    "hero.chartLive": "实时",
    "hero.responseTime": "<200ms",
    "hero.countries": "50+ 国家",
    "features.eyebrow": "为什么选择我们",
    "features.provenText": "50+ 项目验证",
    "products.eyebrow": "产品线",
    "products.learnMore": "了解更多"
  },
  "es": {
    "hero.productLabel": "Contenedor BESS",
    "hero.productSpec": "1MW / 2MWh",
    "hero.chartTitle": "Respuesta de Frecuencia (Hz)",
    "hero.chartLive": "En vivo",
    "hero.responseTime": "<200ms",
    "hero.countries": "50+ Países",
    "features.eyebrow": "Por Qué Elegirnos",
    "features.provenText": "Comprobado en 50+ implementaciones",
    "products.eyebrow": "Línea de Productos",
    "products.learnMore": "Saber más"
  },
  "tr": {
    "hero.productLabel": "BESS Konteyner",
    "hero.productSpec": "1MW / 2MWh",
    "hero.chartTitle": "Frekans Yanıtı (Hz)",
    "hero.chartLive": "Canlı",
    "hero.responseTime": "<200ms",
    "hero.countries": "50+ Ülke",
    "features.eyebrow": "Neden Bizi Seçmelisiniz",
    "features.provenText": "50+ kurulumda kanıtlandı",
    "products.eyebrow": "Ürün Serisi",
    "products.learnMore": "Daha fazla bilgi"
  },
  "pt": {
    "hero.productLabel": "Contêiner BESS",
    "hero.productSpec": "1MW / 2MWh",
    "hero.chartTitle": "Resposta de Frequência (Hz)",
    "hero.chartLive": "Ao vivo",
    "hero.responseTime": "<200ms",
    "hero.countries": "50+ Países",
    "features.eyebrow": "Por Que Nos Escolher",
    "features.provenText": "Comprovado em 50+ implantações",
    "products.eyebrow": "Linha de Produtos",
    "products.learnMore": "Saiba mais"
  },
  "de": {
    "hero.productLabel": "BESS Container",
    "hero.productSpec": "1MW / 2MWh",
    "hero.chartTitle": "Frequenzantwort (Hz)",
    "hero.chartLive": "Live",
    "hero.responseTime": "<200ms",
    "hero.countries": "50+ Länder",
    "features.eyebrow": "Warum Uns Wählen",
    "features.provenText": "Bewährt in 50+ Installationen",
    "products.eyebrow": "Produktlinie",
    "products.learnMore": "Mehr erfahren"
  },
  "fr": {
    "hero.productLabel": "Conteneur BESS",
    "hero.productSpec": "1MW / 2MWh",
    "hero.chartTitle": "Réponse en Fréquence (Hz)",
    "hero.chartLive": "En direct",
    "hero.responseTime": "<200ms",
    "hero.countries": "50+ Pays",
    "features.eyebrow": "Pourquoi Nous Choisir",
    "features.provenText": "Prouvé dans 50+ déploiements",
    "products.eyebrow": "Gamme de Produits",
    "products.learnMore": "En savoir plus"
  },
  "th": {
    "hero.productLabel": "ตู้คอนเทนเนอร์ BESS",
    "hero.productSpec": "1MW / 2MWh",
    "hero.chartTitle": "การตอบสนองความถี่ (Hz)",
    "hero.chartLive": "สด",
    "hero.responseTime": "<200ms",
    "hero.countries": "50+ ประเทศ",
    "features.eyebrow": "ทำไมต้องเลือกเรา",
    "features.provenText": "พิสูจน์แล้วใน 50+ การติดตั้ง",
    "products.eyebrow": "ไลน์ผลิตภัณฑ์",
    "products.learnMore": "เรียนรู้เพิ่มเติม"
  },
  "ar": {
    "hero.productLabel": "حاوية BESS",
    "hero.productSpec": "1MW / 2MWh",
    "hero.chartTitle": "استجابة التردد (Hz)",
    "hero.chartLive": "مباشر",
    "hero.responseTime": "<200ms",
    "hero.countries": "50+ دولة",
    "features.eyebrow": "لماذا تختارنا",
    "features.provenText": "مثبت في 50+ مشروع",
    "products.eyebrow": "خط المنتجات",
    "products.learnMore": "اعرف المزيد"
  },
  "ja": {
    "hero.productLabel": "BESSコンテナ",
    "hero.productSpec": "1MW / 2MWh",
    "hero.chartTitle": "周波数応答 (Hz)",
    "hero.chartLive": "ライブ",
    "hero.responseTime": "<200ms",
    "hero.countries": "50+ カ国",
    "features.eyebrow": "選ばれる理由",
    "features.provenText": "50+ の導入実績",
    "products.eyebrow": "製品ライン",
    "products.learnMore": "詳細を見る"
  },
  "ko": {
    "hero.productLabel": "BESS 컨테이너",
    "hero.productSpec": "1MW / 2MWh",
    "hero.chartTitle": "주파수 응답 (Hz)",
    "hero.chartLive": "실시간",
    "hero.responseTime": "<200ms",
    "hero.countries": "50+ 국가",
    "features.eyebrow": "선택해야 하는 이유",
    "features.provenText": "50+ 프로젝트에서 입증됨",
    "products.eyebrow": "제품 라인",
    "products.learnMore": "더 알아보기"
  },
  "id": {
    "hero.productLabel": "Kontainer BESS",
    "hero.productSpec": "1MW / 2MWh",
    "hero.chartTitle": "Respons Frekuensi (Hz)",
    "hero.chartLive": "Langsun",
    "hero.responseTime": "<200ms",
    "hero.countries": "50+ Negara",
    "features.eyebrow": "Mengapa Memilih Kami",
    "features.provenText": "Terbukti di 50+ instalasi",
    "products.eyebrow": "Lini Produk",
    "products.learnMore": "Pelajari lebih lanjut"
  }
};

// 设置嵌套key的值
function setNestedValue(obj, keyPath, value) {
  const keys = keyPath.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
}

// 处理每个语言
for (const [locale, keys] of Object.entries(translations)) {
  const filePath = path.join(__dirname, '..', 'src', 'messages', `${locale}.json`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`跳过 ${locale}: 文件不存在`);
    continue;
  }
  
  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  // 添加所有新key
  for (const [keyPath, value] of Object.entries(keys)) {
    setNestedValue(content, keyPath, value);
  }
  
  // 写回文件
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf-8');
  console.log(`✓ 已更新 ${locale}`);
}

console.log('\n完成！所有语言文件已更新。');

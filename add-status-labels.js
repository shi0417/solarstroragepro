// 为所有语言文件添加 hero.statusLabels 翻译
const fs = require('fs');
const path = require('path');

const locales = ['zh', 'es', 'tr', 'pt', 'de', 'fr', 'th', 'ar', 'ja', 'ko', 'id'];

// 各语言的 statusLabels 翻译
const statusLabelsMap = {
  zh: { response: "响应时间", output: "输出功率", soc: "电量" },
  es: { response: "Respuesta", output: "Salida", soc: "SOC" },
  tr: { response: "Yanıt", output: "Çıkış", soc: "SOC" },
  pt: { response: "Resposta", output: "Saída", soc: "SOC" },
  de: { response: "Antwortzeit", output: "Ausgang", soc: "SOC" },
  fr: { response: "Réponse", output: "Sortie", soc: "SOC" },
  th: { response: "การตอบสนอง", output: "ออกPower", soc: "SOC" },
  ar: { response: "الاستجابة", output: "المخرج", soc: "SOC" },
  ja: { response: "応答時間", output: "出力", soc: "SOC" },
  ko: { response: "응답 시간", output: "출력", soc: "SOC" },
  id: { response: "Respons", output: "Output", soc: "SOC" },
};

for (const locale of locales) {
  const filePath = path.join(__dirname, 'src/messages', `${locale}.json`);
  if (!fs.existsSync(filePath)) {
    console.log(`跳过 ${locale}: 文件不存在`);
    continue;
  }

  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  // 添加 statusLabels
  if (content.hero && !content.hero.statusLabels) {
    content.hero.statusLabels = statusLabelsMap[locale] || { 
      response: "Response", 
      output: "Output", 
      soc: "SOC" 
    };
    
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf-8');
    console.log(`✅ ${locale}: 已添加 statusLabels`);
  } else {
    console.log(`⚠️  ${locale}: statusLabels 已存在`);
  }
}

console.log('\n完成！');

# SolarStoragePro i18n 翻译工作流程

> 本文档记录将 SolarStoragePro 翻译成新语种的完整流程。
> 基于 2026-12-04 修复西班牙语页面的实战经验整理。

## 流程概览

```
1. 准备 locale JSON 文件
   ↓
2. 翻译所有英文字符串
   ↓
3. 为新页面组件添加翻译组（seed）
   ↓
4. 重写仍用 isZh 模式的组件
   ↓
5. 构建验证 + 提交
```

---

## Step 1: 准备 locale JSON 文件

每个语种的翻译存在 `src/messages/{locale}.json`。

如果目标语种的文件不存在，从 `en.json` 复制一份作为起点：

```bash
cd D:/project/solarstoragepro
node -e "
const fs=require('fs');
const en=JSON.parse(fs.readFileSync('./src/messages/en.json','utf8'));
fs.writeFileSync('./src/messages/{locale}.json', JSON.stringify(en,null,2)+'\n','utf8');
console.log('Created {locale}.json');
"
```

> **注意**：复制后所有值都是英文，需要在 Step 2 中翻译。

---

## Step 2: 翻译英文字符串

### 方法 A — 用自动翻译脚本（推荐）

脚本：`scripts/translate-{locale}.cjs`

工作原理：遍历目标 locale JSON，如果某个 key 的值和 `en.json` 中相同（说明未翻译），则替换为目标语种。

```bash
node scripts/translate-es.cjs   # 翻译 es.json
```

### 方法 B — 人工校对

自动翻译可能不完美，需人工校对。用以下命令找出所有未翻译字段：

```bash
node -e "
const es=require('./src/messages/es.json');
const en=require('./src/messages/en.json');
function findSame(oE,oN,p='',r=[]){
  if(typeof oE==='string'&&typeof oN==='string'&&oE===oN&&oE.length>15) r.push(p+': '+oE.substring(0,50));
  else if(Array.isArray(oE)&&Array.isArray(oN)) oE.forEach((v,i)=>findSame(v,oN[i]||'',p+'.'+i,r));
  else if(typeof oE==='object'&&oE&&oN) Object.keys(oE).forEach(k=>findSame(oE[k],oN[k],p?p+'.'+k:k,r));
  return r;
}
console.log('未翻译字段数:', findSame(es,en).length);
findSame(es,en).slice(0,20).forEach(r=>console.log(' ',(r)));
"
```

> **提示**：URL（`href`）、人名、纯数字/单位不需要翻译，可以在过滤条件中排除。

---

## Step 3: 为新页面添加翻译组（Seed）

当新增了页面组件，且组件使用 `messages.*` 读取翻译时，需要往**所有 12 个** locale JSON 文件里添加对应的翻译组。

### 脚本：`scripts/seed-solutions-messages.cjs`（参考用）

这个脚本展示了如何往所有 locale 文件统一添加翻译组。

核心逻辑：

```js
const fs = require('fs');
const path = require('path');

const locales = ['en','zh','es','tr','pt','de','fr','th','ar','ja','ko','id'];
const messages = {
  en: { newSection: { title: 'English title', ... } },
  zh: { newSection: { title: '中文标题', ... } },
  es: { newSection: { title: 'Título en español', ... } },
  // ... 其他语种可以用英文占位，后续翻译
};

locales.forEach(locale => {
  const file = path.join(__dirname, '..', 'src', 'messages', `${locale}.json`);
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  // 合并新翻译组（不覆盖已有值）
  json.newSection = { ...messages[locale]?.[locale === 'en' ? 'en' : 'en'], ...messages[locale] };
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n', 'utf8');
  console.log(`Updated ${locale}.json`);
});
```

> **关键**：所有 locale 文件必须包含相同的 key，只是 value 不同。

---

## Step 4: 重写使用 `isZh` 模式的组件

### 识别需要重写的组件

```bash
grep -rn "isZh" src/ --include="*.tsx" | cut -d: -f1 | sort | uniq -c | sort -rn
```

### 重写模式

**之前（`isZh` 模式 — 坏）**：
```tsx
const isZh = locale === "zh";
// ...
<h2>{isZh ? "优势标题" : "Advantages Title"}</h2>
<p>{isZh ? zhDesc : enDesc}</p>
```

**之后（`messages` 模式 — 好）**：
```tsx
const { locale, messages } = useLocaleContext();
const m = messages.solutionsGridLevelBess;
// ...
<h2>{m.advantagesTitle}</h2>
<p>{m.advantages[0].body}</p>
```

### 不能放进 JSON 的内容

React JSX（如 `<Zap className="..." />`）不能存入 JSON。解决方案：在组件文件中用**位置索引数组**存放：

```tsx
const advantageIcons = [
  <Zap key="0" className="h-5 w-5" />,
  <Sun key="1" className="h-5 w-5" />,
];
// 使用时：
{advantageIcons[i]}
```

### 纯技术数据表

如果数据表的内容是**语言无关的数字/代码**（如电压、型号），可以保留在组件文件内，不需要放进 JSON。

---

## Step 5: 构建验证 + 提交

```bash
npm run build   # 必须全部通过
git add -A
git commit -m "feat: 完成 {locale} 语种的 i18n 翻译"
git push origin main
```

---

## 已翻译语种情况

| 语种 | 状态 | 备注 |
|------|------|------|
| `en` | ✅ 完成 | 基准语种 |
| `zh` | ✅ 完成 | 基准语种 |
| `es` | 🔄 进行中 | 主要页面已完成，产品页待处理 |
| `tr`/`pt`/`de`/`fr`/`th`/`ar`/`ja`/`ko`/`id` | ⚠️ 英文占位 | 需要完整翻译 |

---

## 常见问题

### Q: 为什么不用 `isZh ? zh : en` 模式？

因为这种模式只支持中英双语。当增加第 3 种语言（如西班牙语）时，所有非中文语种都会 fallback 到英文，无法显示正确的翻译。

### Q: 博客文章和案例内容怎么处理？

当前博客文章数据在 `src/app/blog/blog-data.ts`，使用 `isZh ? zhContent : enContent` 模式。这意味着非中英语种会显示英文。

**长期方案**：将博客/案例内容也移入 locale JSON 文件，或创建按语种分文件的数据结构（`blog-data-es.ts` 等）。

### Q: 如何验证翻译完整？

运行以下命令，找出的就是 `es.json` 中所有仍然等于 `en.json` 的字段：

```bash
node -e "
const es=require('./src/messages/es.json');
const en=require('./src/messages/en.json');
function f(oE,oN,p,r=[]){
  if(typeof oE==='string'&&oE===oN&&oE.length>15) r.push(p);
  else if(Array.isArray(oE)&&Array.isArray(oN)) oE.forEach((v,i)=>f(v,oN[i]||'',p+'.'+i,r));
  else if(typeof oE==='object'&&oE&&oN) Object.keys(oE).forEach(k=>f(oE[k],oN[k],p?p+'.'+k:k,r));
  return r;
}
console.log('未翻译:', f(es,en).length, '个字段');
"
```

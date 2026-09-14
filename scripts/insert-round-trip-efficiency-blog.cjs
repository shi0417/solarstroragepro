// Insert "Battery Storage Round-Trip Efficiency" blog article into Supabase
// Date: 2026-09-11

const SUPABASE_URL = 'https://qujcrmbzuzlgjrexbzga.supabase.co';
const ANON_KEY = 'sb_publishable_bBrZR2df4POLnM4sWI96xQ_xPvlD06k';

const SLUG = 'battery-storage-round-trip-efficiency';
const DATE = '2026-09-11';
const READ_TIME = 9;
const TAGS = ['BESS', 'Energy Efficiency', 'Round-Trip Efficiency', 'PCS', 'LFP Battery'];

// ============== EN CONTENT ==============
const EN = {
  locale: 'en',
  category: 'Technology',
  title: 'Understanding Battery Storage Round-Trip Efficiency: What B2B Buyers Need to Know',
  description: 'Round-trip efficiency directly impacts BESS revenue and payback period. Learn how to evaluate, measure, and improve it during procurement.',
  body: `In the B2B energy storage market, **round-trip efficiency (RTE)** is one of the most consequential yet frequently misunderstood performance metrics. For grid operators, EPC contractors, and industrial energy managers, a single percentage-point improvement in RTE can translate into millions of dollars in additional revenue or cost savings over a project's lifetime.

This guide explains what round-trip efficiency means in real-world BESS deployments, how it is measured, what influences it, and how buyers should evaluate it during procurement.

## What Is Round-Trip Efficiency?

Round-trip efficiency measures how much electrical energy is recovered after a full charge-discharge cycle. It is expressed as a percentage:

| Parameter | Definition | Typical Range |
|-----------|------------|---------------|
| AC-to-AC RTE | Energy out (AC) / Energy in (AC) | 85% – 92% |
| DC-to-DC RTE | Energy out (DC) / Energy in (DC) | 94% – 97% |
| System RTE (full chain) | Includes PCS, HVAC, BMS losses | 82% – 89% |

**AC-to-AC RTE** is the figure that matters most to project finance models because it reflects the entire energy pathway from grid to battery and back.

## Why RTE Matters for Project Economics

Consider a 100 MW / 200 MWh grid-scale BESS operating in energy arbitrage:

1. At **85% RTE**, the system delivers 170 MWh of sellable energy per full cycle.
2. At **90% RTE**, it delivers 180 MWh — an additional 10 MWh per cycle.
3. At 250 cycles per year and a spread of $40/MWh, that 5-point gain equals **$100,000/year** in extra revenue.
4. Over 15 years, discounted, the net present value of that improvement exceeds **$1 million** for a single 100 MW project.

For C&I installations with peak-shaving or demand-response contracts, the impact is equally significant because every kilowatt-hour saved reduces utility charges directly.

## What Drives Round-Trip Efficiency?

RTE is not a single number. It is the product of multiple sub-system efficiencies multiplied together:

| Sub-System | Efficiency Contribution | Key Factors |
|------------|------------------------|-------------|
| Battery cells (LFP) | DC-DC round-trip ~95% | Temperature, C-rate, SOC window, calendar age |
| Power Conversion System (PCS) | AC-DC/DC-AC ~97–98% | Topology, switching losses, partial-load performance |
| HVAC / Thermal management | Parasitic load 1–4% | Ambient conditions, cooling design, set-points |
| BMS & Auxiliaries | Parasitic load 0.5–2% | Cell balancing strategy, monitoring granularity |
| Transformer & Switchgear | 0.5–1.5% losses | Load factor, conductor sizing |

**Lithium iron phosphate (LFP)** cells generally offer higher RTE than NMC at equivalent cycle life because of lower internal resistance and better thermal stability. This is one reason LFP has become the dominant chemistry for stationary storage.

## How Certification Data Relates to Real-World RTE

Buyers often rely on datasheet figures, but these are typically measured under ideal laboratory conditions (25°C, 0.5C, 100% depth of discharge). In the field:

- **High C-rates** (1C or above) increase I2R losses and reduce RTE by 2–4 points.
- **Low temperatures** raise internal resistance; operating below 10°C can cut RTE by 3–5%.
- **Narrow SOC windows** (e.g., 10–90% instead of 0–100%) improve cycle life but add overhead because a larger nominal capacity is required for the same usable energy.

When comparing vendor proposals, ask for **guaranteed RTE at specified operating conditions**, not just datasheet peaks. The IEC 62619 and GB/T 36276-2023 standards provide test methodologies, but guarantees should be contractually tied to ambient temperature ranges and C-rate profiles that match your actual use case.

## How to Evaluate RTE During Procurement

Use this checklist when reviewing BESS tenders:

1. **Demand AC-to-AC RTE** at the point of interconnection, not DC-only figures.
2. **Specify operating conditions**: temperature range, C-rate, SOC window, and duty cycle.
3. **Request degradation curves**: RTE declines with cycle count; a 90% Day-1 figure may drop to 86% by Year 10.
4. **Include penalty clauses**: tie liquidated damages to verified RTE shortfalls during commissioning.
5. **Review PCS topology**: two-level inverters are cheaper but less efficient at partial load than three-level or modular multilevel designs.
6. **Inspect thermal design**: liquid-cooled systems typically maintain tighter temperature uniformity and higher RTE than air-cooled cabinets in hot climates.

## How SolarStoragePro Optimizes RTE

Our [C&I battery cabinets](/products/ci-battery-cabinets) and [grid-scale BESS containers](/products/energy-storage-system) are engineered for industry-leading round-trip efficiency:

- **PCS efficiency**: ≥98.5% peak, ≥97% at 30% load
- **LFP cell technology**: ≤0.5% daily self-discharge, stable impedance across 6,000+ cycles
- **Liquid cooling**: ±2°C cell temperature uniformity, minimizing thermal-driven resistance variance
- **Smart BMS**: Model-predictive cell balancing reduces balancing losses by up to 40% compared to passive topologies
- **System AC-to-AC RTE**: ≥88% guaranteed under IEC 62619 reference conditions

Whether you are sizing a behind-the-meter peak-shaving system or a front-of-the-meter frequency-regulation asset, RTE should be a weighted criterion in your technology selection matrix — alongside CAPEX, warranty terms, and safety certifications.

## Ready to Spec Your Next BESS?

Contact our engineering team for a project-specific RTE analysis and total-cost-of-ownership model. We provide guaranteed performance figures backed by third-party test reports to IEC 62619, UN38.3, and GB/T 36276-2023.`,
};

// ============== ZH CONTENT ==============
const ZH = {
  locale: 'zh',
  category: '技术',
  title: '储能系统往返效率解析：B2B 采购必须关注的核心指标',
  description: '往返效率直接影响储能项目的收益和回收期。本文从定义、测试方法、影响因素到采购评估，为工商业和电网级买家提供实用指南。',
  body: `在 B2B 储能市场中，**往返效率（Round-Trip Efficiency, RTE）**是影响项目全生命周期经济性最关键、却也最容易被忽视的指标之一。对于电网运营商、EPC 总包商和工商业能源管理者而言，RTE 每提升一个百分点，在 10-15 年的项目周期内可能意味着数百万美元的额外收益或成本节约。

本文将系统性地解释往返效率的实际含义、测试与评估方法、关键影响因素，以及采购环节应如何将其纳入技术评标体系。

## 什么是往返效率？

往返效率衡量的是电能在一次完整的充放电循环后，能够被回收的比例，以百分比表示：

| 参数 | 定义 | 典型范围 |
|-----------|------------|---------------|
| 交流-交流 RTE | 交流输出 / 交流输入 | 85% – 92% |
| 直流-直流 RTE | 直流输出 / 直流输入 | 94% – 97% |
| 系统 RTE（全链路） | 含 PCS、温控、BMS 损耗 | 82% – 89% |

对项目财务模型而言，**交流-交流 RTE** 才是核心数据，因为它反映的是从电网到电池再回到电网的完整能量路径损耗。

## 为什么 RTE 决定项目经济模型？

以一座 100 MW / 200 MWh 的电网级 BESS 参与电力现货套利为例：

1. 在 **85% RTE** 下，每次满充满放可回收 170 MWh 可售电量；
2. 在 **90% RTE** 下，可回收 180 MWh，单次循环多出 10 MWh；
3. 按年 250 次循环、价差 $40/MWh 计算，5 个百分点效率提升每年增加 **$100,000** 收入；
4. 按 15 年周期折现，单座 100 MW 电站的净现值增益超过 **100 万美元**。

对参与削峰填谷或需求响应的工商业储能项目而言，影响同样显著——每多节省一度电，就直接降低一度电的电费支出。

## 哪些因素决定往返效率？

RTE 不是单一数字，而是多个子系统效率相乘的结果：

| 子系统 | 效率贡献 | 关键因素 |
|------------|------------------------|-------------|
| 电芯（LFP） | 直流往返 ~95% | 温度、充放电倍率、SOC 窗口、日历老化 |
| 储能变流器（PCS） | AC-DC/DC-AC ~97–98% | 拓扑结构、开关损耗、部分负载效率 |
| 温控系统 | 寄生功耗 1–4% | 环境温度、冷却设计、设定温度 |
| BMS 及辅电 | 寄生功耗 0.5–2% | 均衡策略、监控粒度 |
| 变压器及开关柜 | 损耗 0.5–1.5% | 负载率、导体截面 |

**磷酸铁锂（LFP）**电芯在同等循环寿命下通常比三元（NMC）具有更高的往返效率，这得益于更低的内阻和更好的热稳定性。这也是 LFP 成为大储和工商业储能主流化学体系的重要原因之一。

## 认证数据与现场 RTE 的差异

采购方通常依赖厂商数据手册中的 RTE 数值，但这些数据多在理想实验室条件下测得（25°C、0.5C、100% DOD）。在实际运行中：

- **高倍率运行**（1C 及以上）会显著增加 I2R 损耗，RTE 下降 2–4 个百分点；
- **低温环境**会提高电芯内阻，10°C 以下运行可能导致 RTE 降低 3–5%；
- **窄 SOC 窗口**（如 10–90%）虽能延长循环寿命，但需要更大名义容量来换取同等可用电量，增加了系统损耗占比。

在比较各厂商方案时，应要求对方提供**在指定运行工况下的 RTE 保证值**，而非仅看数据手册峰值。IEC 62619 和 GB/T 36276-2023 提供了标准测试方法，但保证值应在合同中与实际环境温度范围、充放电倍率曲线绑定。

## 采购环节 RTE 评估清单

在评审 BESS 技术标书时，建议按以下清单核查：

1. **要求交流-交流 RTE**，而非仅直流端数据；
2. **明确运行工况**：温度范围、充放电倍率、SOC 窗口、日循环次数；
3. **索取衰减曲线**：首日 90% 的 RTE 到第 10 年可能衰减至 86%，需纳入全周期模型；
4. **设置违约条款**：将实测 RTE 偏差与违约金或质保延长挂钩；
5. **审查 PCS 拓扑**：两电平逆变器成本低，但在部分负载下的效率通常低于三电平或模块化多电平设计；
6. **检查温控方案**：液冷系统在高温环境下通常能保持更均匀的电芯温度（±2°C），从而维持更高且更稳定的 RTE。

## SolarStoragePro 的 RTE 优化方案

我们的 [工商业储能柜](/products/ci-battery-cabinets) 和 [电网级 BESS 集装箱](/products/energy-storage-system) 在系统设计上针对往返效率进行了深度优化：

- **PCS 效率**：峰值 ≥98.5%，30% 负载下 ≥97%；
- **LFP 电芯技术**：日自放电 ≤0.5%，6000+ 次循环内阻抗保持稳定；
- **液冷系统**：电芯温差 ±2°C，最大限度抑制温度驱动型内阻波动；
- **智能 BMS**：基于模型的预测均衡策略，相比被动均衡可降低 40% 的均衡损耗；
- **系统交流-交流 RTE**：在 IEC 62619 参考工况下保证 ≥88%。

无论您正在规划一套表后削峰储能系统，还是一座表前调频电站，RTE 都应与初始投资、质保条款、安全认证一起，作为技术选型的加权评分项。

## 获取项目级 RTE 分析与 TCO 模型

联系我们的工程团队，获取针对您具体项目的往返效率分析和全生命周期成本模型。我们提供的性能保证均附有 IEC 62619、UN38.3 和 GB/T 36276-2023 第三方测试报告支撑。`,
};

// ============== STEP 5a: Insert main record ==============
async function step5a() {
  const mainPayload = {
    slug: SLUG,
    date: DATE,
    read_time: READ_TIME,
    tags: TAGS,
  };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_articles`, {
    method: 'POST',
    headers: {
      'apikey': ANON_KEY,
      'Authorization': `Bearer ${ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(mainPayload),
  });
  const text = await res.text();
  if (!res.ok) {
    console.error('Step 5a FAILED:', res.status, text);
    throw new Error('Main insert failed');
  }
  const data = JSON.parse(text);
  console.log('Step 5a OK — article_id:', data[0].id);
  return data[0].id;
}

// ============== STEP 5b/5c: Insert translations ==============
async function insertTranslation(articleId, content) {
  const payload = {
    article_id: articleId,
    locale: content.locale,
    category: content.category,
    title: content.title,
    description: content.description,
    body: content.body,
  };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_article_translations`, {
    method: 'POST',
    headers: {
      'apikey': ANON_KEY,
      'Authorization': `Bearer ${ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`Step 5${content.locale === 'en' ? 'b' : 'c'} FAILED:`, text);
    throw new Error(`Translation ${content.locale} failed`);
  }
  console.log(`Step 5${content.locale === 'en' ? 'b' : 'c'} OK — ${content.locale} translation inserted`);
}

// ============== STEP 6: Verify ==============
async function verify(slug) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_articles?slug=eq.${slug}&select=id,slug,date,read_time,tags`, {
    headers: {
      'apikey': ANON_KEY,
      'Authorization': `Bearer ${ANON_KEY}`,
    },
  });
  const data = await res.json();
  console.log('Step 6 verification:', JSON.stringify(data, null, 2));
  return data;
}

(async () => {
  try {
    const articleId = await step5a();
    await insertTranslation(articleId, EN);
    await insertTranslation(articleId, ZH);
    const verified = await verify(SLUG);
    console.log('\n=== SUMMARY ===');
    console.log('Slug:', SLUG);
    console.log('Article ID:', articleId);
    console.log('Date:', DATE);
    console.log('Tags:', TAGS.join(', '));
    console.log('Locales inserted: en, zh');
    console.log('Verified rows:', verified.length);
    process.exit(0);
  } catch (err) {
    console.error('FAILED:', err.message);
    process.exit(1);
  }
})();

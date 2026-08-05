const https = require('https');

const KEY = 'sb_publishable_bBrZR2df4POLnM4sWI96xQ_xPvlD06k';
const HOST = 'qujcrmbzuzlgjrexbzga.supabase.co';

function supabasePost(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const options = {
      hostname: HOST,
      path: path,
      method: 'POST',
      headers: {
        apikey: KEY,
        Authorization: 'Bearer ' + KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    const req = https.request(options, res => {
      let result = '';
      res.on('data', c => result += c);
      res.on('end', () => {
        try { resolve(JSON.parse(result)); }
        catch(e) { resolve(result); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function supabaseGet(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: HOST,
      path: path,
      headers: { apikey: KEY, Authorization: 'Bearer ' + KEY }
    };
    https.get(options, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch(e) { resolve(data); }
      });
    }).on('error', reject);
  });
}

const enBody = `## What Is Behind-the-Meter Battery Storage?

**Behind-the-meter (BTM) battery storage** refers to energy storage systems installed on the customer's side of the utility meter — meaning the battery charges from and discharges to the facility's internal electrical system, behind the point where the utility measures consumption. Unlike front-of-meter (FTM) systems that sell energy directly to the wholesale market, BTM systems are optimized to **reduce the customer's electricity bill** and provide **backup power**.

BTM storage is the fastest-growing segment of the global energy storage market. According to BloombergNEF, C&I behind-the-meter deployments reached **14.3 GWh in 2025**, growing 62% year-over-year, driven by rising demand charges, time-of-use rate spreads, and corporate decarbonization mandates.

### BTM vs FTM: Key Differences

| Parameter | Behind-the-Meter (BTM) | Front-of-Meter (FTM) |
|---|---|---|
| **Meter location** | Customer side | Utility/grid side |
| **Primary revenue** | Bill reduction (demand charge + energy arbitrage) | Wholesale market services |
| **Typical size** | 100 kWh – 5 MWh | 5 MW – 500 MW |
| **Permitting** | Local building/fire permits | Grid interconnection study required |
| **Payback period** | 3–6 years | 6–10 years |
| **Owner** | Facility owner / ESCO | IPP / utility |

## Five Revenue Streams for BTM Battery Storage

A well-designed BTM system doesn't just shave peaks — it **stacks multiple value streams** to maximize ROI:

1. **Demand charge reduction**: Shave the facility's peak kW demand to lower monthly demand charges. This is the #1 revenue driver in markets with high demand charges ($15–$35/kW-month in the US, ¥30–60/kW-month in parts of China).

2. **Time-of-use (TOU) arbitrage**: Charge during off-peak hours (low rate) and discharge during peak hours (high rate). Typical TOU spreads of $0.08–$0.25/kWh in California, ¥0.3–0.8/kWh in China create strong arbitrage margins.

3. **Demand response (DR) participation**: Enroll in utility or ISO DR programs and earn capacity payments for discharging during grid events. Programs like PJM ELRP and CAISO PDR can add **$50–$150/kW-year** in additional revenue.

4. **Backup power / resilience**: Provide seamless transition during outages, avoiding costly downtime. For data centers and manufacturing, a single outage can cost **$5,000–$50,000 per minute**.

5. **Solar self-consumption optimization**: When paired with rooftop solar, the battery stores excess daytime generation for evening use, reducing grid purchases and avoiding net-metering curtailment.

### Revenue Stacking Example: 500 kW / 1 MWh C&I System

| Revenue Stream | Annual Value | % of Total |
|---|---|---|
| Demand charge reduction | $85,000 | 42% |
| TOU arbitrage | $52,000 | 26% |
| Demand response | $38,000 | 19% |
| Backup power value | $18,000 | 9% |
| Solar self-consumption | $9,000 | 4% |
| **Total** | **$202,000** | **100%** |

*Based on a 500 kW / 1 MWh LFP system in California (PG&E territory), 2025 rate structure.*

## How to Size a BTM Battery System

Sizing a BTM battery requires analyzing **15-minute interval load data** over at least 12 months. The goal is to identify the facility's peak demand windows and calculate the minimum battery power and energy needed to clip those peaks.

### 4-Step Sizing Methodology

1. **Gather load data**: Obtain 15-minute interval data from your utility or smart meter. Minimum 12 months of data for seasonal accuracy.

2. **Identify peak demand periods**: Sort the data to find the top 20 peak demand days. Note the time of day, duration, and magnitude of peaks.

3. **Calculate required power and energy**:
   - **Power (kW)** = Peak demand − Target demand (the level you want to clip to)
   - **Energy (kWh)** = Power × Peak duration (typically 2–4 hours) × Safety factor (1.2)

4. **Adjust for degradation and DoD**: Size the battery 20–30% larger than the calculated energy to account for depth-of-discharge limits and end-of-life capacity fade.

### Sizing Example

| Parameter | Value |
|---|---|
| Facility peak demand | 850 kW |
| Target demand (after shaving) | 500 kW |
| Required battery power | 350 kW |
| Peak duration | 3 hours |
| Raw energy requirement | 1,050 kWh |
| DoD + EoL adjustment (×1.3) | 1,365 kWh |
| **Recommended system** | **350 kW / 1,400 kWh (LFP)** |

This sizing methodology applies directly to our [C&I battery storage cabinets](/products/ci-battery-cabinets), which are available in 100–500 kWh modular configurations that can be scaled to multi-MWh installations.

## Key Technical Considerations for BTM Deployment

### Chemistry Selection

**LFP (LiFePO₄) is the dominant choice for BTM applications** due to its superior safety, longer cycle life (6,000–10,000 cycles vs 2,000–3,500 for NMC), and better thermal stability. For indoor C&I installations, LFP's inherent resistance to thermal runaway at typical operating temperatures is a critical safety advantage.

### Grid Synchronization and PCS Integration

The **power conversion system (PCS)** is the brain of a BTM installation. It must:
- Detect grid outages and transition to island mode in <20 ms (for critical loads)
- Support both grid-following and grid-forming modes
- Provide reactive power support for local power quality correction
- Comply with IEEE 1547, GB/T 34120, and local interconnection standards

Our [grid-scale energy storage systems](/products/energy-storage-system) integrate UL/IEC-certified PCS units with seamless transfer capability for BTM applications.

### Fire Safety and Compliance

BTM systems installed in commercial buildings must comply with:

| Standard | Scope | Region |
|---|---|---|
| **NFPA 855** | Stationary BESS fire safety | US |
| **UL 9540A** | Thermal runaway propagation test | US |
| **IEC 62619** | Secondary lithium battery safety | International |
| **GB/T 36276-2023** | BESS system standard | China |
| **UN38.3** | Transport safety testing | Global |

For indoor installations, NFPA 855 requires a **minimum 3-foot clearance** from walls, **fire detection systems** at the battery level, and **thermal runaway mitigation** through aerosol suppression or gas detection + ventilation.

## Financial Modeling and ROI

### Typical BTM Project Economics (2026)

| Cost Component | Value ($/kWh) | Notes |
|---|---|---|
| Battery cells (LFP) | $80–110 | 50–55% of total system cost |
| PCS + BMS + integration | $40–60 | 20–25% of total |
| EPC + installation | $30–50 | 15–20% of total |
| **Total installed cost** | **$200–320/kWh** | 2026 market range |

### ROI Calculation Example

For a **500 kW / 1 MWh** system at **$280/kWh** installed:

| Metric | Value |
|---|---|
| Total system cost | $280,000 |
| Annual revenue (stacked) | $202,000 |
| Annual O&M cost | $8,000 |
| Net annual benefit | $194,000 |
| Simple payback | **1.4 years** |
| 10-year NPV (8% discount) | $967,000 |
| 10-year IRR | **38%** |

*Actual results vary by location, rate structure, and incentive availability. Conduct a site-specific feasibility study before investment.*

## Incentives and Financing Options

### US Market

- **IRA 48E Investment Tax Credit (ITC)**: 30% federal tax credit on battery storage ≥5 kWh, **even without solar pairing** (effective 2025)
- **SGIP (California)**: $0.15–0.35/Wh performance-based rebate
- **MACRS**: 5-year accelerated depreciation

### China Market

- **工商业储能补贴**: Multiple provinces offer ¥0.1–0.3/kWh discharge subsidies
- **需量电价优化**: Peak-valley spread widening to ¥0.7–1.2/kWh in Jiangsu, Zhejiang, Guangdong
- **虚拟电厂参与**: BTM systems can aggregate into VPPs for additional grid service revenue

### Financing Models

| Model | Description | Best For |
|---|---|---|
| **Direct purchase** | Owner buys system outright | Capital-rich facilities |
| **Energy Service Agreement (ESA)** | ESCO owns system, customer pays for savings | No-capex adoption |
| **Lease** | Monthly lease payments, customer owns savings | Tax-exempt entities |
| **PPA-style** | Pay per kWh discharged from battery | Low-risk preference |

## Implementation Roadmap

1. **Feasibility assessment** (4–6 weeks): Load profile analysis, rate structure review, site walkthrough, financial model
2. **System design and permitting** (8–12 weeks): Electrical design, fire safety compliance, building permits, utility interconnection application
3. **Procurement and manufacturing** (8–14 weeks): Battery cabinet production, PCS procurement, balance-of-system
4. **Installation and commissioning** (4–8 weeks): Physical installation, grid synchronization, performance testing, SAT
5. **Ongoing operation and optimization** (continuous): Performance monitoring, revenue verification, predictive maintenance

## Conclusion

Behind-the-meter battery storage is no longer a niche technology — it's a **mainstream energy management strategy** for commercial and industrial facilities. With payback periods of 1.5–4 years in favorable markets, stacked revenue opportunities, and declining LFP cell costs, BTM storage delivers compelling economics for B2B buyers.

The key to success is **accurate load profiling, proper system sizing, and choosing the right battery chemistry and PCS** for your specific application. Our [C&I battery storage cabinets](/products/ci-battery-cabinets) are engineered for exactly these BTM use cases, with modular 100–500 kWh configurations, LFP chemistry, and integrated fire safety systems certified to IEC 62619 and GB/T 36276-2023.

**Ready to explore your BTM storage project?** [Contact our engineering team](/contact) for a free feasibility assessment and system sizing analysis tailored to your facility's load profile and local rate structure.`;

const zhBody = `## 什么是用户侧储能？

**用户侧储能（Behind-the-Meter, BTM）**是指安装在用户电表负载侧的电池储能系统——即电池从用户内部电网充电和放电，在电力公司计量用电量之前完成能量调度。与表前侧（FTM）储能系统直接向电力批发市场售电不同，用户侧储能系统主要用于**降低用户电费**并提供**应急备电**。

用户侧储能是全球储能市场增长最快的细分领域。根据 BloombergNEF 数据，2025 年全球工商业用户侧储能装机量达到 **14.3 GWh**，同比增长 62%，主要驱动力包括需量电价上涨、峰谷价差扩大以及企业碳中和目标。

### 用户侧 vs 表前侧：核心差异

| 参数 | 用户侧（BTM） | 表前侧（FTM） |
|---|---|---|
| **电表位置** | 用户侧 | 电网侧 |
| **主要收益** | 电费削减（需量电费+峰谷套利） | 批发市场服务 |
| **典型规模** | 100 kWh – 5 MWh | 5 MW – 500 MW |
| **审批流程** | 地方消防/建筑许可 | 需电网接入审批 |
| **投资回收期** | 3–6 年 | 6–10 年 |
| **业主** | 用电企业 / 节能服务公司 | 独立发电商 / 电网公司 |

## 用户侧储能的五大收益来源

设计合理的用户侧储能系统不仅仅是削峰——它通过**多收益叠加**最大化投资回报：

1. **需量电费削减**：削低企业最大需量功率，降低每月需量电费。这是江苏、浙江、广东等高需量电价地区（¥30–60/kW·月）的首要收益来源。

2. **峰谷套利**：在谷电时段（低价）充电，在峰电时段（高价）放电。国内峰谷价差普遍达到 ¥0.7–1.2/kWh，部分省份两充两放可进一步提升收益。

3. **需求响应参与**：参与电网或省级需求响应项目，在电网事件期间放电获取容量补偿。江苏、上海等地需求响应补偿可达 ¥20–50/kW·次。

4. **应急备电**：电网中断时无缝切换至离网模式，避免生产中断。对制造业和数据中心而言，单次停电损失可达 **5,000–50,000 元/分钟**。

5. **光伏自消纳优化**：与屋顶光伏配套时，电池储存白天富余光伏电力供夜间使用，减少网购电量并避免限功率。

### 收益叠加示例：500 kW / 1 MWh 工商业系统

| 收益来源 | 年收益（元） | 占比 |
|---|---|---|
| 需量电费削减 | 595,000 | 42% |
| 峰谷套利 | 364,000 | 26% |
| 需求响应 | 266,000 | 19% |
| 应急备电价值 | 126,000 | 9% |
| 光伏自消纳 | 63,000 | 4% |
| **合计** | **1,414,000** | **100%** |

*基于江苏某 500 kW / 1 MWh LFP 系统，2025 年电价结构。*

## 如何确定用户侧储能系统容量

用户侧储能容量设计需要分析**至少 12 个月的 15 分钟负荷数据**，目标是识别企业用电高峰窗口，计算削峰所需的最小电池功率和能量。

### 四步容量设计法

1. **获取负荷数据**：从供电局或智能电表获取 15 分钟间隔数据，至少 12 个月以保证季节准确性。

2. **识别峰值时段**：对数据排序，找到前 20 个最大需量日，标注峰值的时段、持续时间和幅值。

3. **计算所需功率和能量**：
   - **功率（kW）**= 最大需量 − 目标需量（期望削减到的水平）
   - **能量（kWh）**= 功率 × 峰值持续时间（通常 2–4 小时）× 安全系数（1.2）

4. **考虑衰减和放电深度调整**：电池能量设计需在计算值基础上放大 20–30%，以补偿放电深度限制和寿命末期容量衰减。

### 容量设计示例

| 参数 | 数值 |
|---|---|
| 企业最大需量 | 850 kW |
| 目标需量（削峰后） | 500 kW |
| 所需电池功率 | 350 kW |
| 峰值持续时间 | 3 小时 |
| 原始能量需求 | 1,050 kWh |
| DoD + EoL 调整（×1.3） | 1,365 kWh |
| **推荐系统** | **350 kW / 1,400 kWh（LFP）** |

此设计方法直接适用于我们的 [工商业储能柜](/products/ci-battery-cabinets)，提供 100–500 kWh 模块化配置，可灵活扩展至多 MWh 级安装。

## 用户侧储能部署关键技术要点

### 电池选型

**LFP（磷酸铁锂）是用户侧储能的主导技术路线**，得益于其优异安全性、更长循环寿命（6,000–10,000 次循环 vs NMC 的 2,000–3,500 次）和更好的热稳定性。对于室内工商业安装场景，LFP 电池在常规工作温度下不易发生热失控，是关键的安全优势。

### 并网与 PCS 集成

**储能变流器（PCS）**是用户侧储能系统的大脑，需具备以下能力：
- 检测电网断电并在 <20 ms 内切换至离网模式（保障关键负载）
- 同时支持跟网型和构网型运行模式
- 提供无功功率支撑，改善本地电能质量
- 符合 GB/T 34120、IEEE 1547 等并网标准

我们的 [电网级储能系统](/products/energy-storage-system) 集成了通过 UL/IEC 认证的 PCS 设备，具备无缝切换能力，适用于用户侧应用场景。

### 消防安全与合规

安装在商业建筑内的用户侧储能系统需满足：

| 标准 | 适用范围 | 地区 |
|---|---|---|
| **GB/T 36276-2023** | 储能用锂电池系统标准 | 中国 |
| **IEC 62619** | 二次锂电池安全要求 | 国际 |
| **NFPA 855** | 固定式储能消防标准 | 美国 |
| **UL 9540A** | 热失控蔓延测试方法 | 美国 |
| **UN38.3** | 锂电池运输安全测试 | 全球 |

对于室内安装，NFPA 855 要求电池柜距墙面**至少 0.9 米间距**、电池层级**火灾探测系统**、以及通过气溶胶灭火或气体检测+通风实现**热失控抑制**。

## 财务建模与投资回报

### 典型项目经济性（2026）

| 成本构成 | 价格（元/kWh） | 说明 |
|---|---|---|
| 电池电芯（LFP） | ¥560–770 | 占系统总成本 50–55% |
| PCS + BMS + 集成 | ¥280–420 | 占总成本 20–25% |
| EPC + 安装施工 | ¥210–350 | 占总成本 15–20% |
| **总安装成本** | **¥1,400–2,240/kWh** | 2026 年市场区间 |

### 投资回报计算示例

以 **500 kW / 1 MWh** 系统、安装成本 **¥1,960/kWh** 计算：

| 指标 | 数值 |
|---|---|
| 系统总成本 | ¥1,960,000 |
| 年收益（叠加） | ¥1,414,000 |
| 年运维成本 | ¥56,000 |
| 年净收益 | ¥1,358,000 |
| 简单回收期 | **1.4 年** |
| 10 年 NPV（8% 贴现率） | ¥6,770,000 |
| 10 年 IRR | **38%** |

*实际结果因地区、电价结构和补贴政策而异。投资前请进行现场专项可行性评估。*

## 补贴政策与融资模式

### 中国市场

- **工商业储能补贴**：多省份提供 ¥0.1–0.3/kWh 放电补贴
- **需量电价优化**：江苏、浙江、广东峰谷价差扩大至 ¥0.7–1.2/kWh
- **虚拟电厂参与**：用户侧系统可聚合接入虚拟电厂获取额外电网服务收益

### 美国市场

- **IRA 48E 投资税收抵免（ITC）**：≥5 kWh 储能系统享 30% 联邦税收抵免，2025 年起**无需配建光伏**即可独立享受
- **SGIP（加州）**：$0.15–0.35/Wh 性能补贴
- **MACRS**：5 年加速折旧

### 融资模式对比

| 模式 | 描述 | 适用场景 |
|---|---|---|
| **直接采购** | 业主自购系统 | 资金充裕的企业 |
| **合同能源管理（EMC）** | 节能服务公司投资，用户按节能量分成 | 零资本支出需求 |
| **融资租赁** | 按月支付租金，用户享有节能收益 | 税收豁免机构 |
| **度电付费** | 按电池放电量计费 | 低风险偏好用户 |

## 项目实施路线图

1. **可行性评估**（4–6 周）：负荷曲线分析、电价结构审查、现场踏勘、财务建模
2. **系统设计与审批**（8–12 周）：电气设计、消防合规审批、施工许可、并网申请
3. **采购与生产**（8–14 周）：电池柜生产、PCS 采购、配套设备
4. **安装与调试**（4–8 周）：物理安装、并网调试、性能测试、SAT 验收
5. **持续运营优化**（长期）：性能监控、收益核验、预测性维护

## 总结

用户侧储能已不再是小众技术——它是工商业企业**主流的能源管理策略**。在峰谷价差持续扩大、LFP 电芯成本下降、补贴政策加码的多重利好下，用户侧储能在优质市场的投资回收期已缩短至 1.5–4 年，叠加收益模式使 IRR 普遍超过 30%。

成功的关键在于**精准的负荷分析、合理的系统容量设计、以及选择正确的电池化学体系和 PCS**。我们的 [工商业储能柜](/products/ci-battery-cabinets) 专为用户侧场景设计，提供 100–500 kWh 模块化配置，采用 LFP 电池，集成通过 IEC 62619 和 GB/T 36276-2023 认证的消防系统。

**准备启动您的用户侧储能项目？** [联系我们的工程团队](/contact)，获取免费的可行性评估和系统容量设计分析，量身定制适合您企业负荷特征和本地电价结构的储能方案。`;

async function main() {
  // Step 1: Insert article main record
  console.log('=== Step 1: Insert blog_articles ===');
  const article = {
    slug: 'behind-the-meter-battery-storage',
    date: '2026-08-06',
    read_time: 12,
    tags: ['Behind-the-Meter', 'BTM', 'Energy Storage', 'C&I Storage', 'Peak Shaving', 'LFP']
  };
  const artRes = await supabasePost('/rest/v1/blog_articles', article);
  console.log('Article result:', JSON.stringify(artRes));

  if (!Array.isArray(artRes) || artRes.length === 0) {
    console.error('ERROR: Failed to insert article');
    process.exit(1);
  }

  const articleId = artRes[0].id;
  console.log('Article ID:', articleId);

  // Step 2: Insert English translation
  console.log('\n=== Step 2: Insert EN translation ===');
  const enTrans = {
    article_id: articleId,
    locale: 'en',
    category: 'Cost Optimization',
    title: 'Behind the Meter Battery Storage: A Complete Guide to C&I Energy Storage Revenue Stacking (2026)',
    description: 'Learn how behind-the-meter (BTM) battery storage cuts demand charges, enables TOU arbitrage, and stacks five revenue streams for commercial and industrial facilities. Includes sizing methodology, financial modeling, and implementation roadmap.',
    body: enBody
  };
  const enRes = await supabasePost('/rest/v1/blog_article_translations', enTrans);
  console.log('EN translation result:', JSON.stringify(enRes).substring(0, 200));

  // Step 3: Insert Chinese translation
  console.log('\n=== Step 3: Insert ZH translation ===');
  const zhTrans = {
    article_id: articleId,
    locale: 'zh',
    category: '成本优化',
    title: '用户侧储能完全指南：工商业储能收益叠加与投资回报（2026）',
    description: '深入了解用户侧（BTM）电池储能如何通过需量电费削减、峰谷套利和五大收益叠加降低工商业用电成本。包含容量设计方法、财务建模和项目实施路线图。',
    body: zhBody
  };
  const zhRes = await supabasePost('/rest/v1/blog_article_translations', zhTrans);
  console.log('ZH translation result:', JSON.stringify(zhRes).substring(0, 200));

  // Step 4: Verify
  console.log('\n=== Step 4: Verify ===');
  const verify = await supabaseGet('/rest/v1/blog_articles?slug=eq.behind-the-meter-battery-storage&select=id,slug,date,read_time,tags');
  console.log('Verification:', JSON.stringify(verify, null, 2));

  const transCount = await supabaseGet('/rest/v1/blog_article_translations?article_id=eq.' + articleId + '&select=locale,category,title');
  console.log('Translations:', JSON.stringify(transCount, null, 2));

  console.log('\n=== DONE ===');
}

main().catch(e => { console.error(e); process.exit(1); });

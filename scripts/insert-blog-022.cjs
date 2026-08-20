const fs = require('fs');
const path = require('path');
const https = require('https');

const ENV_PATH = path.join(__dirname, '..', '.env.local');
const SUPABASE_URL = 'https://qujcrmbzuzlgjrexbzga.supabase.co';

function loadAnonKey() {
  const content = fs.readFileSync(ENV_PATH, 'utf-8');
  const match = content.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.+)/);
  if (!match) throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY not found in .env.local');
  return match[1].trim();
}

function supabaseRequest(method, endpoint, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, SUPABASE_URL);
    const data = body ? JSON.stringify(body) : null;
    const options = {
      method,
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: {
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`,
        'Content-Type': 'application/json',
      },
    };
    if (data) {
      options.headers['Content-Length'] = Buffer.byteLength(data);
      options.headers['Prefer'] = 'return=representation';
    }

    const req = https.request(options, (res) => {
      let chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const raw = Buffer.concat(chunks).toString('utf-8');
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(raw ? JSON.parse(raw) : null);
          } catch {
            resolve(raw);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${raw}`));
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

const ANON_KEY = loadAnonKey();

const SLUG = 'front-of-the-meter-energy-storage';
const DATE = '2026-08-20';
const READ_TIME = 11;
const TAGS = ["BESS", "Energy Storage", "Grid", "Utility-Scale", "Energy Storage Market"];

const EN = {
  category: "Market Intelligence",
  title: "Front of the Meter Energy Storage: A Complete Guide for Utility-Scale BESS Investors and Developers (2026)",
  description: "Learn how front-of-the-meter (FTM) battery storage works, its revenue streams, engineering architecture, and market outlook for utility-scale BESS projects in 2026.",
  body: `Front of the meter (FTM) energy storage — also known as grid-scale or utility-scale battery energy storage systems (BESS) — is transforming how electricity is generated, transmitted, and balanced. Unlike behind-the-meter (BTM) systems that sit on a customer's property, FTM BESS connects directly to the transmission or distribution network, providing services that benefit the entire grid.

## What Is Front of the Meter Energy Storage?

FTM energy storage refers to battery systems installed on the utility side of the electricity meter. These projects typically range from **10 MW to 500 MW** and are owned or contracted by independent power producers (IPPs), utilities, grid operators, and energy traders. Their primary purpose is to support grid stability, store renewable generation, and arbitrage power prices.

A typical FTM BESS project uses **lithium iron phosphate (LFP)** battery containers paired with power conversion systems (PCS), medium-voltage transformers, and an energy management system (EMS). The configuration is modular: each 20-foot or 40-foot container can deliver **2.5 MWh to 5 MWh** of energy capacity.

## FTM vs BTM: How They Compare

| Dimension | Front of the Meter (FTM) | Behind the Meter (BTM) |
|---|---|---|
| Connection point | Transmission / distribution grid | Customer premises |
| Typical scale | 10 MW – 500 MW+ | 100 kW – 10 MW |
| Primary revenue | Capacity markets, ancillary services, energy arbitrage | Demand charge reduction, backup power, solar self-consumption |
| Project owner | Utility, IPP, trader | Commercial / industrial user |
| Permit complexity | High (interconnection, ISO/RTO) | Medium (local AHJ, utility) |

FTM projects require deeper technical and regulatory expertise, but they unlock larger revenue pools and longer contract tenors.

## Why FTM BESS Is Growing Rapidly

Several market forces are driving record deployment of front-of-the-meter battery storage:

1. **Renewable intermittency**: Solar and wind penetration is rising. California's CAISO grid regularly sees solar ramps of over **10 GW in two hours**, requiring fast-ramping batteries to fill the gap.
2. **Aging thermal plants**: Coal and gas peakers are retiring due to emissions regulations and fuel cost volatility. BESS offers a zero-emission alternative.
3. **Falling battery prices**: LFP pack prices fell to roughly **$100–$115/kWh** at the cell level in 2026, making multi-hundred-megawatt projects economically viable.
4. **New market products**: Grid operators are creating faster, more valuable ancillary services such as **fast frequency response** and **synthetic inertia**.
5. **Policy support**: In the United States, the **IRA 48E investment tax credit** covers up to 30%–50% of project cost for standalone storage, depending on domestic content and labor rules.

## Revenue Streams for FTM Battery Storage

FTM BESS projects rarely rely on a single revenue stream. The most successful assets "stack" multiple value streams:

| Revenue stream | Description | Typical value ($/kW-year) |
|---|---|---|
| Energy arbitrage | Buy low, sell high across hours | $30 – $90 |
| Frequency regulation | Fast response to grid frequency deviations | $40 – $150 |
| Capacity markets | Provide reliable capacity during peak demand | $30 – $120 |
| Resource adequacy | Long-term reliability contracts | $20 – $80 |
| Black start / spinning reserves | Emergency grid restoration | $10 – $40 |

Combined, a well-located FTM asset in a liquid market can generate **$150–$350/kW-year**. In the UK, **grid-scale batteries** participating in Dynamic Containment have reported revenues exceeding **£100/kW-year**.

## Engineering Architecture of Utility-Scale BESS

A utility-scale BESS is more than a collection of battery racks. Key subsystems include:

1. **Battery containers**: LFP modules arranged in racks, with battery management systems (BMS) for cell-level monitoring.
2. **PCS and medium-voltage skid**: Converts DC battery power to AC grid power, typically at 34.5 kV.
3. **Energy management system (EMS)**: Optimizes dispatch across revenue streams and maintains grid compliance.
4. **Thermal management**: HVAC or liquid cooling maintains cells within **15°C–25°C** for optimal cycle life.
5. **Fire safety systems**: Aerosol, water mist, or hybrid suppression aligned with **NFPA 855** and **UL 9540A** testing.
6. **Interconnection infrastructure**: Switchgear, transformers, and SCADA integration with the local utility.

SolarStoragePro's [energy storage system](/products/energy-storage-system) portfolio includes containerized BESS solutions from **1 MW to 5 MW per unit**, designed for front-of-the-meter deployment with IEC 62619, UN38.3, GB/T 36276-2023, CE, and IEC 60730 certifications.

## Market Outlook: How Big Is FTM Energy Storage?

Global grid-scale BESS deployments are accelerating:

| Year | Annual additions (GWh) | Key drivers |
|---|---|---|
| 2024 | ~110 GWh | China + US market expansion |
| 2025 | ~160 GWh | IRA execution, EU Net Zero targets |
| 2026E | ~220 GWh | Merchant projects, longer-duration chemistries |
| 2028E | ~350 GWh | 4+ hour systems becoming standard |

China alone added approximately **60 GWh** of grid-scale BESS in 2025, driven by provincial renewable integration mandates. In the United States, FTM storage accounts for over **70% of total battery storage capacity**, with Texas and California leading deployment.

## Critical Success Factors for FTM Projects

Before committing capital to a front-of-the-meter BESS project, investors and developers should evaluate:

1. **Interconnection queue position**: Long queues in ISOs like **ERCOT, CAISO, and PJM** can delay project energization by 2–4 years.
2. **Revenue contract structure**: Merchant exposure creates upside but also volatility. Long-term tolling agreements or capacity contracts improve bankability.
3. **Technology selection**: LFP dominates for 2–4 hour duration due to cost and cycle life; emerging technologies like sodium-ion and flow batteries target longer durations.
4. **O&M strategy**: Remote monitoring, predictive maintenance, and guaranteed availability contracts are essential for 15–20 year asset life.
5. **Offtake counterparty**: Creditworthy utilities, load-serving entities, or virtual power plant aggregators reduce merchant risk.

## How SolarStoragePro Supports FTM Deployments

Whether you are developing a 50 MW merchant battery in Texas or a 200 MW renewable-plus-storage project in Asia, SolarStoragePro provides:

- **Containerized BESS** from 1 MW to 5 MW per unit, scalable to hundreds of megawatts
- **Integrated PCS and EMS** for grid-forming and grid-following operation
- **Multi-market dispatch optimization** for energy arbitrage, frequency regulation, and capacity services
- **Certified battery safety systems** meeting IEC 62619, UN38.3, GB/T 36276-2023, CE, and IEC 60730
- **Lifecycle services** including commissioning, O&M support, and performance guarantees

For smaller commercial projects, our [C&I battery cabinets](/products/ci-battery-cabinets) offer a flexible behind-the-meter option, while our utility-scale [energy storage system](/products/energy-storage-system) portfolio is built for grid-scale deployment.

## Conclusion

Front of the meter energy storage is the backbone of the clean energy transition. For developers, IPPs, and utilities, FTM BESS offers a proven path to monetize grid volatility, integrate renewables, and replace aging thermal assets. Success requires disciplined technology selection, robust offtake structuring, and a manufacturing partner that understands grid-scale requirements.

Ready to evaluate a front-of-the-meter BESS project? Contact the SolarStoragePro team today for a project-specific feasibility study, BOM optimization, and delivery timeline.`
};

const ZH = {
  category: "市场情报",
  title: "表前储能系统全解析：电网级BESS投资者与开发商实战指南（2026）",
  description: "了解表前储能（FTM）的工作原理、收益来源、工程架构和市场前景，掌握2026年电网级电池储能项目的投资与开发要点。",
  body: `表前储能（Front of the Meter，FTM），又称电网级或公用事业级电池储能系统（BESS），正在重塑电力的发、输、配、用平衡方式。与安装在用户侧的表后储能（BTM）不同，表前BESS直接接入输配电网络，为整个电网提供调频、调峰、备用和套利服务。

## 什么是表前储能？

表前储能是指安装在电表电网侧的电池储能项目，通常由独立发电商（IPP）、电网公司、电力交易商投资和运营。项目规模一般在 **10 MW 到 500 MW** 之间，单个储能电站可达数百兆瓦时。

典型的表前BESS采用 **磷酸铁锂（LFP）** 电池集装箱，配套储能变流器（PCS）、中压升压站和能量管理系统（EMS）。每个20尺或40尺集装箱可提供 **2.5 MWh 至 5 MWh** 的储能容量，通过模块化堆叠实现百兆瓦级部署。

## 表前 vs 表后：核心区别

| 维度 | 表前储能（FTM） | 表后储能（BTM） |
|---|---|---|
| 接入点 | 输配电网 | 用户侧 |
| 典型规模 | 10 MW – 500 MW+ | 100 kW – 10 MW |
| 主要收益 | 容量市场、辅助服务、电价套利 | 削峰填谷、需量管理、备电、光伏自消纳 |
| 项目业主 | 电网公司 / IPP / 电力交易商 | 工商业用户 |
| 审批复杂度 | 高（并网、ISO/RTO） | 中（地方消防、电网） |

表前项目技术门槛和合规要求更高，但对应更大的收益空间和更长的合同周期。

## 为什么表前储能正在爆发？

1. **新能源间歇性加剧**：光伏、风电渗透率持续提升。美国加州CAISO电网常在两小时内出现超过 **10 GW** 的太阳能出力波动，需要快速响应的电池储能填补缺口。
2. **老旧火电退役**：煤电、燃气调峰机组因排放和燃料成本问题逐步退出，BESS成为零碳替代方案。
3. **电池成本快速下降**：2026年LFP电芯价格已降至约 **100–115 美元/kWh**，百兆瓦级项目经济性显著改善。
4. **辅助服务产品升级**：各国电网推出 **快速频率响应**、**虚拟惯量** 等高价值品种，电池储能响应速度优势凸显。
5. **政策激励**：美国 **IRA 48E 投资税收抵免** 可为独立储能项目提供30%–50%的成本抵扣（视本土成分和劳工条款而定）。

## 表前储能的主要收益来源

表前BESS通常采用"收益叠加"策略，而非依赖单一收入：

| 收益来源 | 说明 | 典型收益（美元/kW·年） |
|---|---|---|
| 电价套利 | 低价充电、高价放电 | $30 – $90 |
| 调频服务 | 快速响应电网频率偏差 | $40 – $150 |
| 容量市场 | 高峰时段提供可靠容量 | $30 – $120 |
| 资源充裕性 | 长期可靠性合同 | $20 – $80 |
| 黑启动 / 旋转备用 | 电网故障恢复 | $10 – $40 |

在流动性强的电力市场中，优质表前资产年收益可达 **150–350 美元/kW·年**。英国参与动态遏制（Dynamic Containment）的电网级电池项目年收益可超过 **100 英镑/kW·年**。

## 电网级BESS的工程架构

电网级BESS远不止电池堆叠，关键子系统包括：

1. **电池集装箱**：LFP电池模块成簇布置，配备电芯级电池管理系统（BMS）。
2. **PCS及中压升压站**：将电池直流电转换为34.5 kV交流电并网。
3. **能量管理系统（EMS）**：跨收益源优化调度，确保满足电网合规要求。
4. **热管理系统**：风冷或液冷将电芯温度控制在 **15°C–25°C**，延长循环寿命。
5. **消防系统**：气溶胶、水雾或混合抑制方案，符合 **NFPA 855** 和 **UL 9540A** 测试要求。
6. **并网基础设施**：开关柜、变压器、SCADA与电网调度系统对接。

SolarStoragePro的 [电网级储能系统](/products/energy-storage-system) 产品系列涵盖 **1 MW 至 5 MW 单舱**，适用于表前部署，并通过IEC 62619、UN38.3、GB/T 36276-2023、CE、IEC 60730等认证。

## 市场前景：表前储能有多大？

全球电网级BESS装机持续高速增长：

| 年份 | 年新增装机（GWh） | 主要驱动因素 |
|---|---|---|
| 2024 | 约110 GWh | 中国 + 美国市场扩张 |
| 2025 | 约160 GWh | IRA落地、欧盟净零目标 |
| 2026E | 约220 GWh | 市场化项目、长时储能技术 |
| 2028E | 约350 GWh | 4小时以上系统成为标配 |

中国2025年新增电网级储能约 **60 GWh**，主要来自各省新能源配储强制要求。美国表前储能占电池储能总装机的 **70% 以上**，得州和加州领跑。

## 表前项目成功的关键因素

在投建表前BESS之前，投资者和开发商需重点评估：

1. **并网队列位置**：ERCOT、CAISO、PJM等电力市场并网排队周期可达 **2–4年**，直接影响项目并网时间。
2. **收益合同结构**：纯市场化项目收益波动大，长期容量合同或租赁协议可提升融资可得性。
3. **技术路线选择**：2–4小时时长项目LFP占主导；更长时长的项目可关注钠离子、液流电池等技术。
4. **运维策略**：远程监控、预测性维护和可利用率保障是15–20年资产寿命的关键。
5. **购电方/承租方资质**：电网公司、负荷服务商或虚拟电厂聚合商的信用评级直接影响项目融资。

## SolarStoragePro 表前储能解决方案

无论您是在得州开发50 MW市场化储能电站，还是在亚洲建设200 MW新能源配储项目，SolarStoragePro 都能提供：

- **集装箱式BESS**：单舱1 MW–5 MW，可扩展至百兆瓦级
- **集成PCS与EMS**：支持构网型与跟网型运行
- **多市场调度优化**：覆盖电价套利、调频、容量市场等服务
- **认证安全体系**：满足IEC 62619、UN38.3、GB/T 36276-2023、CE、IEC 60730
- **全生命周期服务**：并网调试、运维支持、性能保障

针对工商业场景，我们的 [C&I电池储能柜](/products/ci-battery-cabinets) 提供灵活的表后解决方案；面向电网级项目， [储能系统](/products/energy-storage-system) 产品线专为表前部署设计。

## 结语

表前储能是能源转型的核心基础设施。对开发商、独立发电商和电网公司而言，FTM BESS 是获取电网波动收益、消纳新能源、替代老旧火电的成熟路径。成功的关键在于严谨的技术选型、稳健的合同结构，以及深谙电网级要求的制造伙伴。

如需评估您的表前储能项目，请联系 SolarStoragePro 团队，获取项目可行性分析、BOM优化方案和交付排期。`
};

async function main() {
  // Check for duplicate slug
  const existing = await supabaseRequest('GET', `/rest/v1/blog_articles?slug=eq.${SLUG}&select=slug`);
  if (Array.isArray(existing) && existing.length > 0) {
    throw new Error(`Slug ${SLUG} already exists.`);
  }

  // Insert main article
  const article = await supabaseRequest('POST', '/rest/v1/blog_articles', {
    slug: SLUG,
    date: DATE,
    read_time: READ_TIME,
    tags: TAGS,
  });
  const articleId = article[0].id;
  console.log('Inserted article id:', articleId);

  // Insert EN translation
  await supabaseRequest('POST', '/rest/v1/blog_article_translations', {
    article_id: articleId,
    locale: 'en',
    category: EN.category,
    title: EN.title,
    description: EN.description,
    body: EN.body,
  });
  console.log('Inserted EN translation');

  // Insert ZH translation
  await supabaseRequest('POST', '/rest/v1/blog_article_translations', {
    article_id: articleId,
    locale: 'zh',
    category: ZH.category,
    title: ZH.title,
    description: ZH.description,
    body: ZH.body,
  });
  console.log('Inserted ZH translation');

  // Verify
  const verify = await supabaseRequest('GET', `/rest/v1/blog_articles?slug=eq.${SLUG}&select=id,slug,date`);
  console.log('Verification:', JSON.stringify(verify, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

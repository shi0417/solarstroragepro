const https = require('https');

const ANON_KEY = 'sb_publishable_bBrZR2df4POLnM4sWI96xQ_xPvlD06k';
const SUPABASE_URL = 'qujcrmbzuzlgjrexbzga.supabase.co';

const article = {
  slug: 'second-life-battery-energy-storage',
  date: '2026-08-19',
  read_time: 11,
  tags: ['BESS', 'Second Life Battery', 'EV Battery', 'Circular Economy', 'LFP', 'Sustainability'],
};

const enBody = `Second life battery energy storage is rapidly becoming one of the most compelling segments in the global BESS market. As millions of electric vehicle (EV) batteries reach the end of their automotive life, a growing number of energy storage developers, grid operators, and EPC contractors are exploring how to repurpose these retired lithium-ion packs into stationary battery energy storage systems (BESS). This guide examines the technical, financial, and regulatory dimensions of second life battery storage in 2026.

## What Is Second Life Battery Energy Storage?

A "second life" battery refers to a lithium-ion cell or module that has been retired from its original application — typically an electric vehicle — and repurposed for a less demanding secondary use, such as stationary energy storage. EV batteries are usually deemed "end-of-life" for automotive use when their state of health (SoH) drops to **70–80%** of original capacity. At this point, the battery can no longer deliver the range or power required for passenger or commercial vehicles, but it may still have thousands of cycles of useful life remaining in a stationary application where demands are lower.

The global stock of retired EV batteries is projected to exceed **2 million metric tons** by 2030, according to industry estimates. Without a second life pathway, most of these batteries would enter the recycling stream prematurely, wasting substantial remaining energy capacity and creating unnecessary environmental pressure.

## The Scale of Opportunity

| Metric | 2024 | 2026 (Est.) | 2030 (Proj.) |
|--------|------|-------------|--------------|
| Global EV battery retirements (GWh) | ~45 GWh | ~85 GWh | ~280 GWh |
| Addressable for 2nd life BESS (%) | 40–50% | 45–55% | 50–60% |
| Potential 2nd life BESS capacity (GWh) | ~20 GWh | ~42 GWh | ~155 GWh |
| Market value ($ billion) | $1.8B | $3.5B | $11B |

China dominates the supply of retired EV batteries, accounting for roughly **55%** of global volumes, followed by Europe (~25%) and North America (~15%). For B2B buyers in the energy storage sector, this represents a significant procurement opportunity: second life battery modules can often be sourced at **30–50%** of the cost of equivalent new LFP cells.

## From EV Pack to Stationary BESS: The Repurposing Process

Transforming a retired EV battery into a grid-ready BESS requires a structured, multi-step process:

1. **Collection and Sorting** — Batteries are collected from OEMs, leasing companies, or recycling partners. Initial screening sorts by chemistry (NMC vs LFP), module format, and SoH.

2. **State of Health (SoH) Assessment** — Each module undergoes electrical testing (capacity, internal resistance, voltage consistency) to determine remaining useful life (RUL).

3. **Reconfiguration and Rebalancing** — Modules with similar SoH are grouped into new strings. Balancing circuits and battery management systems (BMS) are replaced or upgraded for stationary duty cycles.

4. **Repackaging** — Modules are installed into new enclosures designed for stationary use, with appropriate thermal management, fire suppression, and electrical protection.

5. **System Integration and Testing** — The repurposed battery is integrated with a **PCS/ inverter** and **energy management system (EMS)**, followed by full-system testing against IEC 62619 and local grid codes.

SolarStoragePro's [**C&I Battery Cabinets**](/products/ci-battery-cabinets) and [**Grid-Scale Energy Storage Systems**](/products/energy-storage-system) are designed with modular architectures that support both new LFP and certified second life battery modules, giving integrators flexibility in procurement strategy.

## Technical Challenges and Solutions

Second life batteries present unique engineering challenges compared to new cells:

| Challenge | Impact | Mitigation Strategy |
|-----------|--------|---------------------|
| Cell-to-cell inconsistency | Accelerated degradation, thermal runaway risk | Strict SoH sorting (±3% capacity variance), active balancing BMS |
| Unknown cycling history | Difficult RUL prediction | Machine learning models trained on EV telematics data |
| NMC thermal sensitivity | Higher fire risk than LFP | Thermal runaway propagation testing (UL 9540A), liquid cooling |
| Warranty complexity | OEM warranties expire at automotive EOL | Third-party insurance, performance guarantees from repurposer |
| Supply inconsistency | Batch variability in availability | Multi-source procurement, standardized module interfaces |

The most successful second life projects today use **LFP batteries** from commercial EVs and buses, where cycle histories are more predictable and thermal profiles are safer than high-nickel NMC packs from passenger cars.

## Degradation Pathways and RUL Assessment

Understanding how batteries degrade is essential for estimating remaining useful life:

- **Cyclic degradation** — Loss of capacity due to charge/discharge cycles. Second life LFP cells typically retain **65–75%** of original capacity and can deliver **2,000–4,000 additional cycles** at 1C in stationary service.
- **Calendar aging** — Irreversible capacity loss due to time, temperature, and state of charge. Calendar aging continues even when the battery is idle.
- **Lithium plating** — Metallic lithium deposits on the anode, primarily caused by fast charging at low temperatures. This is more common in NMC than LFP.

Advanced RUL estimation combines:
- **Electrochemical impedance spectroscopy (EIS)** for internal resistance mapping
- **Incremental capacity analysis (ICA)** for electrode health diagnosis
- **Machine learning models** trained on millions of EV miles to predict fade rates

## Second Life BESS vs New LFP: A Financial Comparison

| Cost Component | New LFP BESS | Second Life BESS | Savings |
|----------------|--------------|------------------|---------|
| Battery module cost ($/kWh) | $120–160 | $50–80 | **45–60%** |
| BMS + integration ($/kWh) | $25–35 | $35–50 | -40 to -60% |
| Enclosure + thermal ($/kWh) | $30–45 | $30–45 | ~0% |
| Testing + certification ($/kWh) | $10–15 | $20–30 | -50 to -100% |
| **Total system cost ($/kWh)** | **$185–255** | **$135–205** | **20–30%** |
| Expected cycle life (cycles) | 6,000–10,000 | 2,000–4,000 | 50–70% lower |
| Levelized cost of storage ($/MWh) | $85–120 | $95–145 | Comparable |

While second life systems have a lower upfront CAPEX, their shorter cycle life means the **levelized cost of storage (LCOS)** is often comparable to — or slightly higher than — new LFP systems. The business case is strongest for applications with moderate daily cycling (1–1.5 cycles/day) such as **peak shaving**, **demand response**, and **renewable firming**, where 2,000–3,000 cycles over 10 years is sufficient.

## Real-World Projects and Case Studies

Several landmark projects demonstrate the commercial viability of second life BESS:

- **Sumitomo Osaka Cement / 4R Energy (Japan)** — 1.5 MWh second life BESS using retired Nissan LEAF batteries. Installed at a cement factory for peak shaving since 2020. Reported **15% lower LCOS** than equivalent new battery system.

- **BMW / Vattenfall (Germany)** — 2.8 MWh stationary storage at a wind farm using retired BMW i3 batteries. Provides frequency regulation and energy arbitrage. Operational since 2021 with >95% availability.

- **China Tower / Multiple OEMs (China)** — The world's largest second life battery deployment. Over **200,000 retired EV battery packs** repurposed for telecom base station backup power across China. Replacement rate reduced by **40%** compared to lead-acid systems.

- **Hyundai / Kepco (South Korea)** — 4 MWh BESS using retired Hyundai IONIQ batteries. Provides grid frequency regulation in the KEPCO market. Achieved **2-second response time** meeting strict grid code requirements.

## Safety Standards and Certification

Second life batteries must meet the same safety standards as new batteries, with additional testing for cell consistency and thermal propagation:

| Standard | Scope | Applicability to 2nd Life |
|----------|-------|---------------------------|
| **IEC 62619** | Safety requirements for secondary lithium cells in industrial apps | Mandatory — tests thermal stability, overcharge, external short |
| **UL 9540A** | Fire propagation test for BESS | Critical for 2nd life — tests thermal runaway propagation |
| **IEC 62933-5-2** | Safety requirements for electrochemical BESS | Guidance on system-level safety architecture |
| **UN38.3** | Transport safety for lithium batteries | Required for shipping retired modules |
| **GB/T 36276-2023** | Chinese safety standard for electrochemical energy storage | Mandatory for domestic Chinese projects |
| **NFPA 855** | Fire protection for energy storage systems | Applies to all BESS installations in the US |

SolarStoragePro's [**Energy Storage Systems**](/products/energy-storage-system) are certified to **IEC 62619, UN38.3, GB/T 36276-2023, and CE**, ensuring that both new and second life configurations meet the highest safety standards for grid and commercial deployment.

## Integration with SolarStoragePro BESS Solutions

For EPCs and project developers evaluating second life batteries, SolarStoragePro offers:

- **Modular C&I Battery Cabinets** (100–500 kWh) with hot-swappable modules supporting mixed new/second life configurations
- **Grid-Scale BESS Containers** (1–5 MW) with centralized BMS capable of managing heterogeneous cell populations
- **Integrated PCS solutions** with **IEC 60730** certified control systems for seamless grid interconnection
- **Remote monitoring and predictive maintenance** platforms to track RUL and optimize dispatch strategy

Our engineering team can evaluate your retired battery supply and design a repurposing strategy that maximizes remaining value while meeting all certification requirements.

## Conclusion: A Strategic Procurement Option

Second life battery energy storage is no longer an experimental niche — it is a maturing procurement option with proven projects across Asia, Europe, and North America. For B2B buyers with moderate cycling requirements and access to reliable retired battery supply, second life systems offer meaningful CAPEX savings and contribute to circular economy objectives.

However, success requires rigorous cell screening, upgraded BMS architecture, and compliance with the same safety standards as new batteries. Partnering with an experienced system integrator is essential to manage the technical complexity and mitigate performance risk.

**Ready to explore second life battery integration for your next BESS project? Contact the SolarStoragePro engineering team today for a technical assessment and custom system design.**`;

const zhBody = `梯次利用电池储能（Second Life Battery Energy Storage）正迅速成为全球BESS市场中最具吸引力的细分领域之一。随着数以百万计的电动汽车（EV）电池达到其汽车使用寿命，越来越多的储能开发商、电网运营商和EPC承包商正在探索如何将这些退役的锂离子电池重新用于 stationary battery energy storage systems（BESS）。本指南将深入分析2026年梯次利用电池储能的技术、财务和监管维度。

## 什么是梯次利用电池储能？

"梯次利用"电池指的是从原始应用场景（通常是电动汽车）退役后，被重新用于要求较低的二次应用的锂离子电池单体或模组。当电动汽车电池的健康状态（SoH）降至原始容量的**70-80%**时，通常被视为达到汽车使用寿命终点。此时，电池已无法满足乘用车或商用车的续航里程或功率需求，但在 stationary 应用场景中，由于使用强度更低，它可能仍具备数千次的可用循环寿命。

据行业估算，到2030年，全球退役电动汽车电池库存将超过**200万吨**。如果没有梯次利用路径，这些电池中的大部分将过早进入回收环节，浪费大量剩余储能容量，并造成不必要的环境压力。

## 市场机遇的规模

| 指标 | 2024年 | 2026年（预估） | 2030年（预测） |
|------|--------|----------------|----------------|
| 全球退役EV电池量（GWh） | ~45 GWh | ~85 GWh | ~280 GWh |
| 可用于梯次利用BESS的比例 | 40-50% | 45-55% | 50-60% |
| 梯次利用BESS潜在容量（GWh） | ~20 GWh | ~42 GWh | ~155 GWh |
| 市场价值（十亿美元） | $1.8B | $3.5B | $11B |

中国占据退役电动汽车电池供应的主导地位，约占全球总量的**55%**，其次是欧洲（约25%）和北美（约15%）。对于储能行业的B2B采购方而言，这代表着一个重要的采购机遇：梯次利用电池模组的采购成本通常仅为同等全新LFP电芯的**30-50%**。

## 从EV电池包到Stationary BESS：梯次利用流程

将退役电动汽车电池转化为电网级BESS需要结构化的多步骤流程：

1. **收集与分类** — 从整车厂、租赁公司或回收合作伙伴处收集电池。初步筛选按化学体系（NMC vs LFP）、模组格式和SoH进行分类。

2. **健康状态（SoH）评估** — 每个模组进行电气测试（容量、内阻、电压一致性），以确定剩余使用寿命（RUL）。

3. **重组与再均衡** — 将SoH相近的模组编组为新的电池串。更换或升级BMS均衡电路，以适应 stationary 工作循环。

4. **重新封装** — 将模组安装到专为 stationary 应用设计的新机箱中，配备适当的热管理、消防和电气保护。

5. **系统集成与测试** — 将梯次利用电池与**PCS/逆变器**和**能量管理系统（EMS）**集成，然后进行全系统测试，验证符合IEC 62619及当地电网规范。

SolarStoragePro的[**工商业电池储能柜**](/products/ci-battery-cabinets)和[**电网级储能系统**](/products/energy-storage-system)采用模块化架构设计，支持全新LFP电芯和经认证的梯次利用电池模组，为集成商提供灵活的采购策略选择。

## 技术挑战与解决方案

梯次利用电池相比全新电芯存在独特的工程挑战：

| 挑战 | 影响 | 缓解策略 |
|------|------|----------|
| 电芯间不一致性 | 加速衰减，热失控风险 | 严格SoH分选（±3%容量差异），主动均衡BMS |
| 未知循环历史 | RUL预测困难 | 基于EV远程信息数据的机器学习模型 |
| NMC热敏感性 | 火灾风险高于LFP | 热失控蔓延测试（UL 9540A），液冷系统 |
| 质保复杂性 | 整车厂质保在汽车EOL时终止 | 第三方保险，梯次利用商的性能保证 |
| 供应不一致 | 可用批次的差异性 | 多源采购，标准化模组接口 |

目前最成功的梯次利用项目使用来自商用电动车和公交车的**LFP电池**，其循环历史更可预测，热安全特性优于乘用车的高镍NMC电池包。

## 衰减路径与RUL评估

理解电池如何衰减对于估算剩余使用寿命至关重要：

- **循环衰减** — 由于充放电循环导致的容量损失。梯次利用LFP电芯通常保留原始容量的**65-75%**，在 stationary 1C工况下可提供**2,000-4,000次额外循环**。
- **日历老化** — 由于时间、温度和荷电状态导致的不可逆容量损失。即使电池闲置，日历老化仍在持续。
- **锂析出** — 金属锂在负极上的沉积，主要由低温快充引起。这在NMC中比LFP更常见。

先进的RUL估算结合：
- **电化学阻抗谱（EIS）**用于内阻映射
- **增量容量分析（ICA）**用于电极健康诊断
- **机器学习模型**基于数百万英里EV数据训练以预测衰减率

## 梯次利用BESS vs 全新LFP：财务对比

| 成本项目 | 全新LFP BESS | 梯次利用BESS | 节省 |
|----------|--------------|--------------|------|
| 电池模组成本（$/kWh） | $120-160 | $50-80 | **45-60%** |
| BMS + 集成（$/kWh） | $25-35 | $35-50 | -40至-60% |
| 机箱 + 热管理（$/kWh） | $30-45 | $30-45 | ~0% |
| 测试 + 认证（$/kWh） | $10-15 | $20-30 | -50至-100% |
| **系统总成本（$/kWh）** | **$185-255** | **$135-205** | **20-30%** |
| 预期循环寿命（次） | 6,000-10,000 | 2,000-4,000 | 低50-70% |
| 平准化储能成本（$/MWh） | $85-120 | $95-145 | 基本持平 |

虽然梯次利用系统的前期CAPEX更低，但其更短的循环寿命意味着**平准化储能成本（LCOS）**通常与全新LFP系统相当或略高。在**削峰填谷**、**需求响应**和**可再生能源调频**等中等日循环次数（1-1.5次/天）的应用场景中，梯次利用的经济性最佳——这些场景在10年内仅需2,000-3,000次循环。

## 实际项目与案例研究

多个标志性项目证明了梯次利用BESS的商业可行性：

- **住友大阪水泥 / 4R能源（日本）** — 1.5 MWh梯次利用BESS，使用退役日产LEAF电池。自2020年起安装于水泥厂用于削峰填谷。报告显示比同等全新电池系统LCOS**低15%**。

- **宝马 / 大瀑布电力（德国）** — 风电场2.8 MWh stationary储能，使用退役宝马i3电池。提供调频和电价套利服务。自2021年投运，可用率>95%。

- **中国铁塔 / 多家整车厂（中国）** — 全球最大的梯次利用电池部署项目。超过**20万个退役EV电池包**被重新用于电信基站备用电源。相比铅酸系统，更换率降低**40%**。

- **现代汽车 / 韩国电力（韩国）** — 4 MWh BESS，使用退役现代IONIQ电池。在KEPCO市场提供电网调频服务。实现**2秒响应时间**，满足严格电网规范要求。

## 安全标准与认证

梯次利用电池必须满足与全新电池相同的安全标准，并增加电芯一致性和热蔓延测试：

| 标准 | 范围 | 对梯次利用的适用性 |
|------|------|-------------------|
| **IEC 62619** | 工业用二次锂电池安全要求 | 强制 — 测试热稳定性、过充、外短路 |
| **UL 9540A** | BESS火灾蔓延测试 | 对梯次利用至关重要 — 测试热失控蔓延 |
| **IEC 62933-5-2** | 电化学BESS安全要求 | 系统级安全架构指导 |
| **UN38.3** | 锂电池运输安全 | 退役模组运输必需 |
| **GB/T 36276-2023** | 中国电化学储能安全标准 | 中国国内项目强制要求 |
| **NFPA 855** | 储能系统消防保护 | 适用于美国所有BESS安装 |

SolarStoragePro的[**储能系统**](/products/energy-storage-system)已通过**IEC 62619、UN38.3、GB/T 36276-2023和CE认证**，确保全新和梯次利用配置均满足电网和商业部署的最高安全标准。

## 与SolarStoragePro BESS解决方案的集成

对于正在评估梯次利用电池的EPC和项目开发商，SolarStoragePro提供：

- **模块化工商业电池储能柜**（100-500 kWh），支持热插拔模组，兼容全新/梯次利用混合配置
- **电网级BESS集装箱**（1-5 MW），配备集中式BMS，可管理异构电芯种群
- **集成PCS解决方案**，配备**IEC 60730**认证控制系统，实现无缝电网互联
- **远程监控和预测性维护**平台，跟踪RUL并优化调度策略

我们的工程团队可以评估您的退役电池供应，并设计梯次利用策略，在最大化剩余价值的同时满足所有认证要求。

## 结论：战略性采购选项

梯次利用电池储能已不再是实验性的小众市场——它正在成为一个成熟的采购选项，在亚洲、欧洲和北美均有已验证的项目落地。对于具有中等循环需求且能获得可靠退役电池供应的B2B采购方，梯次利用系统可提供有意义的CAPEX节约，并助力循环经济目标的实现。

然而，成功需要严格的电芯筛选、升级的BMS架构，以及与全新电池相同的安全标准合规。与经验丰富的系统集成商合作对于管理技术复杂性和降低性能风险至关重要。

**准备好探索将梯次利用电池集成到您的下一个BESS项目中了吗？立即联系SolarStoragePro工程团队，获取技术评估和定制系统设计方案。**`;

function supabaseRequest(path, method, data) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : null;
    const options = {
      hostname: SUPABASE_URL,
      path: '/rest/v1' + path,
      method: method,
      headers: {
        'apikey': ANON_KEY,
        'Authorization': 'Bearer ' + ANON_KEY,
        'Content-Type': 'application/json',
      },
    };
    if (method === 'POST' && data) {
      options.headers['Prefer'] = 'return=representation';
    }

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function main() {
  try {
    // Step 1: Insert main article
    console.log('Inserting article...');
    const articleRes = await supabaseRequest('/blog_articles', 'POST', article);
    if (articleRes.status < 200 || articleRes.status >= 300) {
      console.error('Article insert failed:', articleRes.status, articleRes.data);
      process.exit(1);
    }
    const articleId = articleRes.data[0].id;
    console.log('Article inserted, ID:', articleId);

    // Step 2: Insert EN translation
    console.log('Inserting EN translation...');
    const enRes = await supabaseRequest('/blog_article_translations', 'POST', {
      article_id: articleId,
      locale: 'en',
      category: 'Sustainability & Innovation',
      title: 'Second Life Battery Energy Storage: How Retired EV Batteries Are Powering the Grid (2026 Guide)',
      description: 'Explore how retired EV batteries are being repurposed into grid-scale and commercial BESS. Technical guide covering RUL assessment, financial modeling, safety standards (IEC 62619, UL 9540A), and real-world case studies.',
      body: enBody,
    });
    if (enRes.status < 200 || enRes.status >= 300) {
      console.error('EN translation insert failed:', enRes.status, enRes.data);
      process.exit(1);
    }
    console.log('EN translation inserted');

    // Step 3: Insert ZH translation
    console.log('Inserting ZH translation...');
    const zhRes = await supabaseRequest('/blog_article_translations', 'POST', {
      article_id: articleId,
      locale: 'zh',
      category: '可持续发展与创新',
      title: '梯次利用电池储能：退役动力电池如何重新为电网供电（2026指南）',
      description: '深入解析退役电动汽车电池如何梯次利用为电网级和工商业BESS。涵盖RUL评估、财务建模、安全标准（IEC 62619、UL 9540A）及实际案例研究的技术指南。',
      body: zhBody,
    });
    if (zhRes.status < 200 || zhRes.status >= 300) {
      console.error('ZH translation insert failed:', zhRes.status, zhRes.data);
      process.exit(1);
    }
    console.log('ZH translation inserted');

    // Step 4: Verify
    console.log('Verifying...');
    const verifyRes = await supabaseRequest(`/blog_articles?slug=eq.${article.slug}&select=id,slug,date`, 'GET');
    console.log('Verification:', verifyRes.status, JSON.stringify(verifyRes.data, null, 2));

    console.log('\nAll done! Article ID:', articleId);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();

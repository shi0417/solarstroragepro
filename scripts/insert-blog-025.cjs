const https = require('https');
const fs = require('fs');
const path = require('path');

const ANON_KEY = 'sb_publishable_bBrZR2df4POLnM4sWI96xQ_xPvlD06k';
const SUPABASE_URL = 'https://qujcrmbzuzlgjrexbzga.supabase.co';

const article = {
  slug: 'ac-vs-dc-coupled-solar-storage',
  date: '2026-08-28',
  read_time: 11,
  tags: ['Solar Plus Storage', 'Hybrid Inverter', 'BESS', 'AC Coupling', 'DC Coupling']
};

const enBody = `As solar-plus-storage moves from pilot projects to standard procurement packages, one architectural decision increasingly determines project economics: **AC coupling versus DC coupling**. For commercial & industrial (C&I) facility managers, EPC contractors, and utility-scale developers, the choice between these two topologies affects capital cost, round-trip efficiency, retrofit feasibility, and the number of revenue streams a battery can stack.

This guide breaks down how each architecture works, where each one wins, and how to size a **hybrid inverter** or dedicated storage inverter for your solar-plus-storage project in 2026.

## How AC-Coupled Solar Plus Storage Works

In an **AC-coupled** system, the PV array and the battery energy storage system (BESS) connect to the grid independently at the AC level.

A typical layout looks like this:

1. Solar panels → string or central inverter → AC bus.
2. Battery rack → bidirectional battery inverter → same AC bus.
3. AC bus → point of interconnection → utility grid.

The solar inverter and the battery inverter are separate units. They can be installed at different times, use different vendors, and operate on independent control loops. The battery inverter "sees" solar generation the same way the grid does: as AC power available for charging or export.

## How DC-Coupled Solar Plus Storage Works

In a **DC-coupled** system, the PV array and battery share a single DC bus before inversion.

A typical layout looks like this:

1. Solar panels → DC combiner → hybrid inverter.
2. Battery rack → directly connected to the DC input of the same hybrid inverter.
3. Hybrid inverter → single AC interconnection.

The **hybrid solar inverter** handles both PV Maximum Power Point Tracking (MPPT) and battery charge/discharge. Because solar energy can charge the battery without passing through a separate inverter stage, DC-coupled systems avoid one full AC/DC conversion.

## Head-to-Head Comparison

| Criteria | AC-Coupled | DC-Coupled |
|----------|-----------|------------|
| **Round-trip efficiency** | 82–88% (solar → AC → battery inverter → DC → battery) | 88–94% (solar → DC → battery directly) |
| **Retrofit friendliness** | Excellent: BESS added behind any existing solar inverter | Limited: usually requires new hybrid inverter or DC architecture redesign |
| **Component flexibility** | High: mix solar and battery vendors freely | Moderate: inverter must support battery chemistry and BMS protocol |
| **Grid services capability** | Strong: independent battery inverter sized for full reactive power and frequency response | Strong but constrained by hybrid inverter VA rating |
| **Upfront cost (greenfield)** | Higher: two inverters + switchgear | Lower: one hybrid inverter, fewer conversions |
| **O&M complexity** | Two warranties, two vendors, more coordination | Single inverter platform, simpler O&M |
| **Best fit** | Retrofits, large C&I, multi-asset sites | New solar-plus-storage, residential/small C&I, efficiency-first sites |

## When to Choose AC Coupling

AC coupling is usually the better choice when:

1. **You are retrofitting storage onto an existing solar plant.** The existing PV inverter stays untouched; the BESS connects at the AC bus or behind the meter.
2. **You want vendor flexibility.** Large C&I and utility projects often procure best-in-class solar inverters and best-in-class battery inverters separately.
3. **You need oversized inverter capacity for grid services.** A dedicated battery inverter can be rated higher than the solar array, enabling faster frequency response and voltage regulation.
4. **You plan to add multiple distributed assets later.** AC coupling makes it easier to co-locate EV chargers, backup generators, and additional BESS units.

For example, a 5 MW rooftop solar plant paired with a 2 MW / 4 MWh BESS for peak shaving and demand response is usually simpler to deliver AC-coupled, especially when the solar inverter is already commissioned.

## When to Choose DC Coupling

DC coupling is usually the better choice when:

1. **You are building greenfield solar-plus-storage.** A single hybrid inverter reduces Balance of Plant (BOP) cost and eliminates duplicated enclosures.
2. **Efficiency is the top priority.** Avoiding one AC/DC conversion saves 3–6 percentage points of round-trip efficiency, which compounds over 15–20 years.
3. **You want simpler controls.** One inverter means one control loop, one SCADA integration, and fewer vendor interfaces.
4. **Space or cable runs are constrained.** Fewer AC cables, combiner panels, and transformers reduce footprint and installation labor.

SolarStoragePro's **C&I battery cabinets** integrate seamlessly with both AC-coupled and DC-coupled architectures. For DC-coupled projects, explore our [energy storage system](/products/energy-storage-system) configurations that support direct DC coupling with major hybrid inverter protocols.

## Cost and Revenue Impact: A 1 MW / 2 MWh Example

Consider a C&I project in a region with time-of-use (TOU) rates and a demand-charge structure.

| Architecture | CAPEX (US$/kWh) | RTE | 20-Year Energy Throughput | Estimated Annual Savings |
|-------------|-----------------|-----|---------------------------|--------------------------|
| AC-coupled | $280–340 | 84% | 11,200 MWh | $145,000–180,000 |
| DC-coupled | $240–300 | 91% | 12,100 MWh | $165,000–205,000 |

Assumptions: 1 MW PV, 2 MWh LFP battery, 350 equivalent full cycles per year, TOU arbitrage + demand charge reduction.

The DC-coupled option saves roughly **$40/kWh upfront** and captures **$20,000–25,000/year more savings** from higher efficiency. However, if the site already has a solar inverter installed, the AC-coupled retrofit avoids replacing that asset and can still deliver attractive returns.

## Key Certifications and Standards

Regardless of topology, buyers should verify that inverters and batteries carry the right certifications:

- **IEC 62619** — safety requirements for lithium cells and batteries in industrial applications.
- **IEC 60730** — automatic electrical controls for inverter safety.
- **UN38.3** — lithium battery transport safety.
- **GB/T 36276-2023** — Chinese technical standard for electrochemical energy storage systems.
- **CE / UL 1741-SA** — European and North American grid-interconnection and rule-21 compliance.

SolarStoragePro's battery cabinets and PCS/inverter products are designed to meet IEC 62619, UN38.3, GB/T 36276-2023, and CE requirements, reducing certification risk for global deployments.

## Implementation Roadmap

A typical solar-plus-storage topology decision follows these five steps:

1. **Define the site constraints.** Is this greenfield or retrofit? What is the existing interconnection capacity?
2. **Model the revenue stack.** Will the project rely on TOU arbitrage, demand charge management, grid services, or solar self-consumption?
3. **Select the inverter topology.** Greenfield + efficiency-first → DC-coupled. Retrofit + flexibility-first → AC-coupled.
4. **Size the inverter and battery.** Match the inverter VA rating to the battery C-rate and the solar array's maximum DC output.
5. **Validate with production modeling.** Use PVsyst, SAM, or Helioscope to compare annual generation, clipping losses, and revenue under both topologies.

## Conclusion

There is no universal winner between AC and DC coupling. **AC coupling** wins on flexibility and retrofit economics. **DC coupling** wins on efficiency and greenfield simplicity. For most large C&I and utility developers, the decision comes down to whether the site already has solar inverters, how many revenue streams the project will stack, and which inverter vendors are already qualified.

If you are evaluating a solar-plus-storage project and need help selecting the right topology, inverter size, and battery configuration, contact SolarStoragePro. Our engineering team can model both architectures and recommend a solution that maximizes your project's lifetime returns.`;

const zhBody = `光储一体化正从示范阶段走向标准采购包，而其中一个越来越关键的技术决策是：**交流耦合还是直流耦合**。对于工商业业主、EPC 承包商以及电网级开发商而言，这两种拓扑结构的选择直接影响资本支出、往返效率、改造可行性，以及电池能够叠加的收益流数量。

本指南将详细解析两种架构的工作原理、适用场景，以及如何在 2026 年为光储项目选型合适的**混合逆变器**或独立储能逆变器。

## 交流耦合光储系统如何工作

在**交流耦合**系统中，光伏阵列和电池储能系统（BESS）在交流侧独立并网。

典型拓扑如下：

1. 光伏组件 → 组串式或集中式逆变器 → 交流母线。
2. 电池簇 → 双向储能逆变器 → 同一交流母线。
3. 交流母线 → 并网点 → 电网。

光伏逆变器和储能逆变器是独立的设备，可以分阶段安装、选择不同品牌，并采用独立的控制回路。储能逆变器看到的太阳能发电与电网相同：都是可用于充电或并网的交流电。

## 直流耦合光储系统如何工作

在**直流耦合**系统中，光伏阵列和电池共享同一条直流母线，然后再进行逆变。

典型拓扑如下：

1. 光伏组件 → 直流汇流箱 → 混合逆变器。
2. 电池簇 → 直接接入同一台混合逆变器的直流输入端。
3. 混合逆变器 → 单一交流并网接口。

**光储混合逆变器**同时负责光伏最大功率点跟踪（MPPT）和电池充放电管理。由于太阳能可以直接以直流形式给电池充电，直流耦合系统避免了一次完整的交直流转换。

## 交流耦合 vs 直流耦合对比

| 评估维度 | 交流耦合 | 直流耦合 |
|----------|---------|---------|
| **往返效率** | 82–88%（光伏 → 交流 → 储能逆变器 → 直流 → 电池） | 88–94%（光伏 → 直流 → 电池直接充电） |
| **改造友好度** | 优秀：可在任何现有光伏逆变器后加装 BESS | 有限：通常需要更换混合逆变器或重新设计直流架构 |
| **组件灵活性** | 高：可自由组合光伏与电池品牌 | 中等：逆变器必须兼容电池化学体系和 BMS 协议 |
| **电网服务能力** | 强：独立储能逆变器可按全额无功和调频能力选型 | 强，但受混合逆变器容量限制 |
| **新建项目初投资** | 较高：两台逆变器 + 配电设备 | 较低：一台混合逆变器，转换环节更少 |
| **运维复杂度** | 两个质保、两家供应商，协调更多 | 单一逆变器平台，运维更简单 |
| **最佳适用场景** | 改造、大型工商业、多资产并存的站点 | 新建光储项目、户用/小型工商业、效率优先场景 |

## 何时选择交流耦合

交流耦合通常在以下场景更优：

1. **在已有光伏电站上加配储能。** 现有光伏逆变器无需改动，BESS 直接在交流侧或表后接入。
2. **需要品牌灵活性。** 大型工商业和电网级项目通常分别采购最优的光伏逆变器和储能逆变器。
3. **需要为电网服务预留超额逆变容量。** 独立储能逆变器可以按高于光伏容量的规格选型，实现更快的调频和电压调节响应。
4. **计划后期增加多种分布式资产。** 交流耦合便于后续并入充电桩、备用发电机和新增 BESS 单元。

例如，一个 5 MW 屋顶光伏电站搭配 2 MW / 4 MWh BESS 用于削峰填谷和需求响应，若光伏逆变器已投运，采用交流耦合改造通常更简单。

## 何时选择直流耦合

直流耦合通常在以下场景更优：

1. **新建光储一体化项目。** 单台混合逆变器可降低系统平衡（BOP）成本，减少重复柜体。
2. **效率是首要目标。** 减少一次交直流转换可提升 3–6 个百分点的往返效率，在 15–20 年运行周期中持续复利。
3. **希望控制更简单。** 单台逆变器意味着单一控制回路、单一 SCADA 集成、更少的供应商接口。
4. **空间或线缆距离受限。** 更少的交流电缆、汇流柜和变压器可减少占地和安装人工。

SolarStoragePro 的**工商业电池储能柜**可无缝适配交流耦合与直流耦合架构。对于直流耦合项目，可了解我们的[储能系统](/products/energy-storage-system)配置，支持主流混合逆变器协议的直接直流接入。

## 成本与收益影响：1 MW / 2 MWh 案例

以一个实行分时电价和需量电费的工商业项目为例：

| 架构 | 单位成本（美元/kWh） | 往返效率 | 20 年总吞吐量 | 预计年节省电费 |
|------|---------------------|---------|--------------|----------------|
| 交流耦合 | $280–340 | 84% | 11,200 MWh | $145,000–180,000 |
| 直流耦合 | $240–300 | 91% | 12,100 MWh | $165,000–205,000 |

假设条件：1 MW 光伏、2 MWh 磷酸铁锂电池、每年约 350 次等效满充满放、分时电价套利 + 需量电费管理。

直流耦合方案可节省约 **40 美元/kWh 的初始投资**，并通过更高效率每年多获得 **2–2.5 万美元收益**。但如果现场已有光伏逆变器，交流耦合改造可避免更换原有设备，依然具备良好的投资回报。

## 关键认证与标准

无论选择哪种拓扑，采购方都应确认逆变器和电池具备以下认证：

- **IEC 62619** — 工业应用锂蓄电池安全要求。
- **IEC 60730** — 逆变器自动电气控制安全。
- **UN38.3** — 锂电池运输安全测试。
- **GB/T 36276-2023** — 中国电化学储能系统技术标准。
- **CE / UL 1741-SA** — 欧洲及北美并网与 Rule 21 合规。

SolarStoragePro 的电池储能柜与 PCS/逆变器产品均按 IEC 62619、UN38.3、GB/T 36276-2023 及 CE 要求设计，可降低全球部署的认证风险。

## 实施路线图

光储拓扑选型通常遵循以下五个步骤：

1. **明确场地约束。** 新建还是改造？现有并网容量是多少？
2. **建模收益叠加。** 项目主要依赖分时电价套利、需量电费管理、电网服务，还是光伏自发自用？
3. **选择逆变器拓扑。** 新建 + 效率优先 → 直流耦合；改造 + 灵活性优先 → 交流耦合。
4. **匹配逆变器与电池容量。** 逆变器容量需与电池充放电倍率（C-rate）及光伏阵列最大直流输出相匹配。
5. **用生产建模验证。** 使用 PVsyst、SAM 或 Helioscope 对比两种拓扑下的年发电量、弃光损失和收益。

## 结论

交流耦合与直流耦合没有绝对的优劣之分。**交流耦合**在灵活性和改造经济性上胜出；**直流耦合**在效率和新建项目简洁性上胜出。对于大多数大型工商业和电网级开发商而言，最终决策取决于现场是否已有光伏逆变器、项目将叠加多少收益流，以及哪些逆变器品牌已经通过资质认证。

如果您正在评估光储一体化项目，需要协助选择拓扑、逆变器容量和电池配置，请联系 SolarStoragePro。我们的工程团队可以为两种架构建模，并推荐能够最大化项目全生命周期收益的解决方案。`;

const translations = [
  {
    locale: 'en',
    category: 'Technical Guide',
    title: 'AC vs DC Coupled Solar Plus Storage: A B2B Guide to Hybrid Inverter Topology Selection (2026)',
    description: 'Compare AC-coupled and DC-coupled solar-plus-storage architectures for C&I and utility projects. Learn when each topology wins on cost, efficiency, flexibility, and revenue stacking.',
    body: enBody
  },
  {
    locale: 'zh',
    category: '技术指南',
    title: '交直流耦合光储系统对比：工商业与电网级混合逆变器选型指南（2026）',
    description: '对比工商业与电网级光储系统的交流耦合与直流耦合架构，分析成本、效率、灵活性与收益叠加场景下的选型策略。',
    body: zhBody
  }
];

function request(method, path, data) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, SUPABASE_URL);
    const options = {
      method,
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: {
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': method === 'POST' && path.includes('blog_articles') ? 'return=representation' : undefined
      }
    };
    if (!options.headers.Prefer) delete options.headers.Prefer;

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ status: res.statusCode, body: body ? JSON.parse(body) : null });
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

(async () => {
  try {
    console.log('Inserting article...');
    const articleRes = await request('POST', '/rest/v1/blog_articles', article);
    console.log('Article inserted:', articleRes.body);
    const articleId = articleRes.body[0].id;

    for (const t of translations) {
      const payload = { article_id: articleId, ...t };
      const res = await request('POST', '/rest/v1/blog_article_translations', payload);
      console.log(`Translation ${t.locale} inserted:`, res.body);
    }

    console.log('Verifying...');
    const verify = await request('GET', `/rest/v1/blog_articles?slug=eq.${article.slug}&select=id,slug,date`, null);
    console.log('Verification:', verify.body);

    console.log('Done.');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();

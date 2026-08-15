// Blog Article #019: Microgrid Battery Storage Design
// Run: node scripts/insert-blog-019.cjs

const https = require('https');

const ANON_KEY = 'sb_publishable_bBrZR2df4POLnM4sWI96xQ_xPvlD06k';
const BASE = 'qujcrmbzuzlgjrexbzga.supabase.co';

function post(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const options = {
      hostname: BASE,
      port: 443,
      path: path,
      method: 'POST',
      headers: {
        'apikey': ANON_KEY,
        'Authorization': 'Bearer ' + ANON_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'Prefer': 'return=representation'
      }
    };
    const req = https.request(options, (res) => {
      let result = '';
      res.on('data', chunk => result += chunk);
      res.on('end', () => {
        console.log(`POST ${path} -> ${res.statusCode}`);
        resolve({ status: res.statusCode, body: result });
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function get(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: BASE,
      port: 443,
      path: path,
      method: 'GET',
      headers: {
        'apikey': ANON_KEY,
        'Authorization': 'Bearer ' + ANON_KEY
      }
    };
    const req = https.request(options, (res) => {
      let result = '';
      res.on('data', chunk => result += chunk);
      res.on('end', () => {
        console.log(`GET ${path} -> ${res.statusCode}`);
        resolve({ status: res.statusCode, body: result });
      });
    });
    req.on('error', reject);
    req.end();
  });
}

// ── Article metadata ──
const slug = 'microgrid-battery-storage-design';
const date = '2026-08-16';
const read_time = 12;
const tags = ['Microgrid', 'Battery Storage', 'Hybrid Energy', 'Off-Grid', 'BESS Design', 'Renewable Integration'];

// ── English content ──
const enCategory = 'Technical Guide';
const enTitle = 'Microgrid Battery Storage Design: A Complete Engineering Guide for Hybrid Off-Grid and Island Energy Systems (2026)';
const enDescription = 'A practical engineering guide to microgrid battery storage design — covering load analysis, PV-wind-diesel-BESS sizing, grid-forming inverters, control strategies, and real-world project economics for islands, mining sites, and industrial campuses.';

const enBody = `Microgrids are no longer a niche concept. From remote island communities replacing diesel generators to mining operations seeking energy security, the global microgrid market is projected to grow from USD 28.6 billion in 2024 to over USD 87 billion by 2031 (CAGR 17.2%). At the heart of every modern microgrid lies the battery energy storage system (BESS) — the component that makes renewable integration, load balancing, and grid stability possible.

This guide walks B2B project developers, EPC contractors, and facility managers through the complete engineering process of designing a microgrid BESS, from load profiling to commissioning.

## Why BESS Is the Cornerstone of Microgrid Design

A microgrid without battery storage is just a backup generator with solar panels. The BESS provides four critical functions that no other component can deliver:

| Function | Description | Impact Without BESS |
|---|---|---|
| **Renewable Smoothing** | Absorbs PV/wind output fluctuations (seconds to minutes) | Diesel generators cycle constantly, increasing wear and fuel consumption |
| **Energy Time-Shifting** | Stores excess solar by day, discharges at night | 40-60% of solar generation curtailed or wasted |
| **Grid-Forming** | Establishes voltage and frequency reference for the island | No stable AC bus; inverters cannot synchronize |
| **Black Start** | Energizes the microgrid from cold start | Manual generator startup required; 15-45 min outage |

For a typical island microgrid serving 500 households, adding a properly sized BESS reduces diesel consumption by 55-70% and cuts CO₂ emissions by 1,200-1,800 tons per year.

## Step 1: Load Profile Analysis — The Foundation

Every microgrid BESS design starts with a high-resolution load profile. Hourly data is the minimum; 15-minute or 1-minute intervals are preferred for systems with high renewable penetration.

**Key load metrics to extract:**

1. **Peak demand (kW)** — determines minimum BESS power rating
2. **Daily energy consumption (kWh/day)** — drives BESS energy capacity
3. **Load factor** — ratio of average to peak demand; lower factor means larger BESS needed
4. **Critical load ratio** — percentage of load that must remain powered during outages
5. **Seasonal variation** — summer vs winter demand ratio for PV sizing

| Microgrid Type | Typical Peak | Daily Energy | Load Factor | Critical Load % |
|---|---|---|---|---|
| **Island community** | 200-800 kW | 2,000-8,000 kWh | 0.35-0.45 | 60-70% |
| **Mining camp** | 1-5 MW | 18,000-90,000 kWh | 0.55-0.70 | 80-90% |
| **Industrial park** | 2-10 MW | 30,000-150,000 kWh | 0.60-0.75 | 50-60% |
| **Military base** | 500 kW-3 MW | 6,000-36,000 kWh | 0.40-0.50 | 75-85% |
| **Remote telecom** | 10-50 kW | 150-800 kWh | 0.50-0.60 | 95-100% |

## Step 2: Renewable Generation Sizing

The BESS cannot be designed in isolation — it must be co-optimized with the PV (and/or wind) array. The **renewable fraction** (share of load served by renewables) directly determines BESS size.

**Sizing rule of thumb for PV:**

- **30-40% renewable fraction**: PV capacity = peak load × 1.2
- **50-60% renewable fraction**: PV capacity = peak load × 2.0-2.5
- **70-80% renewable fraction**: PV capacity = peak load × 3.5-4.5
- **90%+ renewable fraction**: PV capacity = peak load × 5.0-6.0 (requires significant BESS oversizing)

For a mining camp with 2 MW peak load targeting 65% renewable penetration, the PV array would be sized at approximately 4-5 MWp, paired with a 2-3 MWh BESS.

## Step 3: BESS Capacity and Power Sizing

The BESS energy capacity must satisfy two independent constraints — take the larger of the two:

### Constraint A: Energy Time-Shift (Nighttime Coverage)

**Formula:** E_BESS = (Daily Load × Nighttime Share) / (DoD × RTE × EoL_Factor)

Where:
- **DoD** = Depth of Discharge (80% for LFP)
- **RTE** = Round-Trip Efficiency (92-94% for LFP DC-coupled)
- **EoL_Factor** = End-of-life capacity retention factor (typically 0.80, meaning 20% degradation reserve)

### Constraint B: Transient Stability (Renewable Smoothing)

**Formula:** P_BESS ≥ PV_Peak × 30% (for PV-heavy microgrids without fast diesel backup)

**Example calculation for a 500 kW island microgrid:**
- Daily load: 4,500 kWh
- Nighttime share: 55% (solar only available 6-8 hours/day)
- Target DoD: 80%, RTE: 92%, EoL factor: 0.80

E_BESS = (4,500 × 0.55) / (0.80 × 0.92 × 0.80) = 2,475 / 0.589 = **4,200 kWh ≈ 4.2 MWh**

| Parameter | Value | Notes |
|---|---|---|
| PV array | 1.8 MWp | 3.6× peak load for 70% renewable fraction |
| BESS energy | 4.2 MWh | Covers 55% nighttime load with 20% degradation reserve |
| BESS power | 500 kW | Matches peak load; grid-forming inverter rated at 600 kVA |
| Diesel genset | 2 × 400 kW | Backup only; runs <800 hours/year |
| Expected diesel reduction | 65% | From 450,000 L/yr to ~158,000 L/yr |

## Step 4: Grid-Forming Inverter Selection

Unlike grid-tied BESS that follow the grid's voltage and frequency, microgrid BESS inverters must **establish** the grid. This is the single most critical component selection in microgrid design.

**Two inverter architectures:**

| Feature | Grid-Forming (V/f Source) | Grid-Following (PQ Source) |
|---|---|---|
| **Role in microgrid** | Sets voltage and frequency | Follows V/f established by grid-forming unit |
| **Response time** | < 5 ms | 20-100 ms |
| **Black start capable** | Yes | No |
| **Seamless transfer** | Yes (grid ↔ island) | Requires break-before-make |
| **Parallel operation** | Yes with droop control | Yes with current sharing |
| **Cost premium** | +15-25% over grid-following | Baseline |

**Recommendation:** Every microgrid BESS should include at least one grid-forming inverter. For systems above 1 MW, use droop-controlled parallel grid-forming inverters for redundancy. Our [grid-scale PCS and inverter solutions](/products/pcs) support both grid-forming and grid-following modes with seamless transfer.

## Step 5: Control Strategy and Energy Management System (EMS)

The microgrid controller (or EMS) is the brain that orchestrates PV, BESS, diesel, and loads. The control strategy determines how the BESS is dispatched throughout the day.

**Three dispatch strategies ranked by complexity:**

1. **Peak Shaving + Backup** (simplest) — BESS charges from excess PV, discharges during evening peak. Diesel starts only when BESS is depleted and PV is unavailable. Best for systems <500 kW.

2. **Renewable Maximization** (medium) — EMS prioritizes renewable energy at all times. BESS absorbs excess PV, discharges to cover load gaps. Diesel is last resort. Requires accurate solar forecasting (day-ahead + hour-ahead). Best for 500 kW-2 MW systems.

3. **Optimal Economic Dispatch** (advanced) — EMS uses real-time fuel prices, electricity tariffs, demand response signals, and weather forecasts to minimize Levelized Cost of Energy (LCOE). Includes battery degradation cost in the optimization objective. Best for systems >2 MW or multi-energy microgrids.

| Strategy | Diesel Reduction | BESS Cycles/Year | Implementation Cost |
|---|---|---|---|
| Peak Shaving + Backup | 30-40% | 200-300 | $15-25K |
| Renewable Maximization | 55-70% | 300-400 | $40-80K |
| Optimal Economic Dispatch | 65-80% | 350-500 | $80-200K |

## Step 6: Safety and Compliance

Microgrid BESS installations must comply with multiple safety standards depending on location and application:

- **IEC 62619**: Cell-level safety for industrial BESS
- **IEC 62933-5-2**: System-level safety for BESS installations
- **NFPA 855**: Fire code for stationary BESS (US market)
- **UL 9540 / 9540A**: Certification and fire propagation testing
- **GB/T 36276-2023**: Chinese national standard for Li-ion BESS
- **UN38.3**: Transport safety certification

For containerized BESS in remote locations, additional considerations include:
- Fire suppression system with remote monitoring (no fire department nearby)
- Physical security (fencing, CCTV, access control)
- Seismic design for earthquake-prone regions
- Corrosion protection for coastal/island environments (C5-M grade per ISO 12944)

## Step 7: Economics and ROI

**Typical project economics for a 500 kW / 4.2 MWh island microgrid:**

| Cost Component | Amount (USD) | % of Total |
|---|---|---|
| PV array (1.8 MWp) | 720,000 | 28% |
| BESS (4.2 MWh LFP) | 1,008,000 | 39% |
| PCS and grid-forming inverters | 210,000 | 8% |
| Microgrid controller and EMS | 120,000 | 5% |
| Civil works and installation | 280,000 | 11% |
| Engineering and commissioning | 150,000 | 6% |
| Contingency (10%) | 100,000 | 4% |
| **Total CAPEX** | **2,588,000** | **100%** |

**Annual savings:** $420,000 (diesel fuel reduction at $0.85/L, 292,000 L saved/year)
**Simple payback:** 6.2 years (excluding environmental credits)
**With carbon credits ($25/ton CO₂):** 5.8 years payback

For C&I and grid-scale microgrid BESS solutions, explore our [C&I battery storage cabinets](/products/ci-battery-cabinets) and [grid-scale energy storage systems](/products/energy-storage-system) — both certified to IEC 62619, UN38.3, and GB/T 36276-2023.

## Key Takeaways

1. **BESS is non-negotiable** for any microgrid with >30% renewable penetration
2. **Co-optimize PV and BESS sizing** — don't design them independently
3. **Grid-forming inverters are mandatory** for island-mode operation
4. **LFP chemistry is the standard choice** — 6,000+ cycles, superior safety, declining cost
5. **EMS dispatch strategy** can swing diesel reduction from 30% to 80%
6. **Safety compliance** is especially critical for remote installations with limited emergency response

## Next Steps

Designing a microgrid BESS requires site-specific load data, renewable resource assessment, and detailed engineering. Our team at SolarStoragePro provides turnkey microgrid design services — from feasibility study to commissioning.

**[Contact our engineering team](/contact)** to discuss your microgrid project, or explore our product range:
- [C&I Battery Storage Cabinets (100-500 kWh)](/products/ci-battery-cabinets)
- [Grid-Scale Energy Storage Systems (1-5 MW)](/products/energy-storage-system)
- [PCS and Inverters](/products/pcs)

*Ready to design your microgrid? Let's build it right the first time.*`;

// ── Chinese content ──
const zhCategory = '技术指南';
const zhTitle = '微电网电池储能系统设计：离网与海岛混合能源系统完整工程指南（2026）';
const zhDescription = '面向项目开发商、EPC 总包和设施管理者的微电网 BESS 工程设计指南，涵盖负荷分析、光风柴储容量配置、构网型逆变器选型、控制策略与实际项目经济性分析。';

const zhBody = `微电网已不再是小众概念。从替代柴油发电机的偏远海岛社区，到追求能源安全的矿山作业，全球微电网市场预计从 2024 年的 286 亿美元增长至 2031 年的 870 亿美元以上（年复合增长率 17.2%）。每一个现代微电网的核心都是电池储能系统（BESS）——它是实现可再生能源消纳、负荷平衡和电网稳定的关键组件。

本指南将带领 B2B 项目开发商、EPC 总包和设施管理者完成微电网 BESS 的完整工程设计流程，从负荷建模到调试投运。

## 为什么 BESS 是微电网设计的基石

没有电池储能的微电网只是一台带太阳能板的后备发电机。BESS 提供了其他组件无法替代的四大核心功能：

| 功能 | 说明 | 无 BESS 的影响 |
|---|---|---|
| **可再生能源平滑** | 吸收光伏/风电出力波动（秒级到分钟级） | 柴油发电机频繁启停，磨损加剧、油耗增加 |
| **能量时移** | 白天储存多余光伏电力，夜间释放 | 40-60% 光伏发电被弃光或浪费 |
| **构网** | 建立孤岛运行的电压和频率参考 | 无稳定交流母线，逆变器无法同步 |
| **黑启动** | 从冷态启动激活微电网 | 需手动启动发电机，停电 15-45 分钟 |

对于一个服务 500 户家庭的典型海岛微电网，合理配置的 BESS 可将柴油消耗降低 55-70%，每年减少 CO₂ 排放 1,200-1,800 吨。

## 第一步：负荷特性分析——设计基础

每个微电网 BESS 设计都始于高分辨率负荷曲线。小时级数据是最低要求；对于可再生能源渗透率较高的系统，建议使用 15 分钟或 1 分钟间隔数据。

**需提取的关键负荷指标：**

1. **峰值功率（kW）** — 决定 BESS 最小功率额定值
2. **日用电量（kWh/天）** — 驱动 BESS 能量容量设计
3. **负荷率** — 平均负荷与峰值之比；负荷率越低，所需 BESS 越大
4. **关键负荷比例** — 停电期间必须保持供电的负荷占比
5. **季节性变化** — 夏冬需求比，影响光伏容量配置

| 微电网类型 | 典型峰值 | 日用电量 | 负荷率 | 关键负荷占比 |
|---|---|---|---|---|
| **海岛社区** | 200-800 kW | 2,000-8,000 kWh | 0.35-0.45 | 60-70% |
| **矿山营地** | 1-5 MW | 18,000-90,000 kWh | 0.55-0.70 | 80-90% |
| **工业园区** | 2-10 MW | 30,000-150,000 kWh | 0.60-0.75 | 50-60% |
| **军事基地** | 500 kW-3 MW | 6,000-36,000 kWh | 0.40-0.50 | 75-85% |
| **偏远通信基站** | 10-50 kW | 150-800 kWh | 0.50-0.60 | 95-100% |

## 第二步：可再生能源发电容量配置

BESS 不能孤立设计——必须与光伏（和/或风电）阵列协同优化。**可再生能源渗透率**（可再生能源供电占负荷的比例）直接决定 BESS 规模。

**光伏容量配置经验法则：**

- **30-40% 渗透率**：光伏容量 = 峰值负荷 × 1.2
- **50-60% 渗透率**：光伏容量 = 峰值负荷 × 2.0-2.5
- **70-80% 渗透率**：光伏容量 = 峰值负荷 × 3.5-4.5
- **90%+ 渗透率**：光伏容量 = 峰值负荷 × 5.0-6.0（需大幅增加 BESS 配置）

对于一个峰值负荷 2 MW、目标可再生渗透率 65% 的矿山营地，光伏阵列配置约为 4-5 MWp，搭配 2-3 MWh BESS。

## 第三步：BESS 容量与功率配置

BESS 能量容量需同时满足两个独立约束条件——取两者中较大值：

### 约束 A：能量时移（夜间覆盖）

**公式：** E_BESS = (日用电量 × 夜间占比) / (DoD × RTE × EoL系数)

其中：
- **DoD** = 放电深度（LFP 为 80%）
- **RTE** = 充放电往返效率（LFP 直流耦合为 92-94%）
- **EoL系数** = 寿命末期容量保持系数（通常取 0.80，即预留 20% 衰减余量）

### 约束 B：暂态稳定（可再生能源平滑）

**公式：** P_BESS ≥ 光伏峰值 × 30%（适用于光伏占主导且无快速柴油备用的微电网）

**500 kW 海岛微电网算例：**
- 日用电量：4,500 kWh
- 夜间占比：55%（光伏每天仅 6-8 小时可用）
- 目标 DoD：80%，RTE：92%，EoL 系数：0.80

E_BESS = (4,500 × 0.55) / (0.80 × 0.92 × 0.80) = 2,475 / 0.589 = **4,200 kWh ≈ 4.2 MWh**

| 参数 | 数值 | 说明 |
|---|---|---|
| 光伏阵列 | 1.8 MWp | 峰值负荷的 3.6 倍，实现 70% 可再生渗透率 |
| BESS 能量 | 4.2 MWh | 覆盖 55% 夜间负荷，含 20% 衰减余量 |
| BESS 功率 | 500 kW | 匹配峰值负荷；构网型逆变器额定 600 kVA |
| 柴油发电机组 | 2 × 400 kW | 仅作备用；年运行 <800 小时 |
| 预期柴油削减率 | 65% | 从 45 万升/年降至约 15.8 万升/年 |

## 第四步：构网型逆变器选型

与跟踪电网电压频率的并网型 BESS 不同，微电网 BESS 逆变器必须**建立**电网。这是微电网设计中最为关键的设备选型环节。

**两种逆变器架构对比：**

| 特性 | 构网型（电压/频率源） | 跟网型（功率源） |
|---|---|---|
| **微电网角色** | 设定电压和频率 | 跟随构网单元建立的 V/f |
| **响应时间** | < 5 毫秒 | 20-100 毫秒 |
| **黑启动能力** | 是 | 否 |
| **无缝切换** | 是（并网↔孤岛） | 需断电切换 |
| **并联运行** | 支持下垂控制并联 | 支持电流共享并联 |
| **成本溢价** | 比跟网型高 15-25% | 基准价格 |

**建议：** 每个微电网 BESS 应至少配置一台构网型逆变器。对于 1 MW 以上系统，建议使用下垂控制的并联构网型逆变器以实现冗余。我们的 [电网级 PCS 和逆变器解决方案](/products/pcs) 同时支持构网和跟网模式，可实现无缝切换。

## 第五步：控制策略与能量管理系统（EMS）

微电网控制器（或 EMS）是协调光伏、BESS、柴油发电和负荷的大脑。控制策略决定了 BESS 在全天各时段的调度方式。

**三种调度策略（按复杂度排列）：**

1. **削峰填谷 + 备用**（最简单）— BESS 在光伏过剩时充电，在傍晚高峰放电。仅在 BESS 耗尽且光伏不可用时启动柴油发电机。适用于 500 kW 以下系统。

2. **可再生能源最大化**（中等）— EMS 始终优先使用可再生能源。BESS 吸收多余光伏电力，在负荷缺口时放电。柴油发电机作为最后手段。需要准确的太阳能预测（日前+小时级）。适用于 500 kW-2 MW 系统。

3. **最优经济调度**（高级）— EMS 利用实时油价、电价、需求响应信号和天气预报，最小化度电成本（LCOE）。将电池衰减成本纳入优化目标。适用于 2 MW 以上系统或多能源微电网。

| 策略 | 柴油削减率 | BESS 年循环次数 | 实施成本 |
|---|---|---|---|
| 削峰填谷 + 备用 | 30-40% | 200-300 | $15-25K |
| 可再生最大化 | 55-70% | 300-400 | $40-80K |
| 最优经济调度 | 65-80% | 350-500 | $80-200K |

## 第六步：安全与合规

微电网 BESS 安装需根据所在地区和应用场景满足多项安全标准：

- **IEC 62619**：工业 BESS 电芯级安全
- **IEC 62933-5-2**：BESS 系统级安装安全
- **NFPA 855**：美国固定式 BESS 消防规范
- **UL 9540 / 9540A**：认证与火灾蔓延测试
- **GB/T 36276-2023**：中国锂电池储能国家标准
- **UN38.3**：运输安全认证

对于偏远地区的集装箱式 BESS，还需额外考虑：
- 带远程监控的灭火系统（附近无消防队）
- 物理安全（围栏、监控、门禁）
- 地震区抗震设计
- 沿海/海岛环境防腐设计（ISO 12944 C5-M 等级）

## 第七步：经济性与投资回报

**500 kW / 4.2 MWh 海岛微电网典型项目经济性：**

| 成本项 | 金额（美元） | 占比 |
|---|---|---|
| 光伏阵列（1.8 MWp） | 720,000 | 28% |
| BESS（4.2 MWh LFP） | 1,008,000 | 39% |
| PCS 及构网型逆变器 | 210,000 | 8% |
| 微电网控制器及 EMS | 120,000 | 5% |
| 土建及安装工程 | 280,000 | 11% |
| 工程设计及调试 | 150,000 | 6% |
| 不可预见费（10%） | 100,000 | 4% |
| **总 CAPEX** | **2,588,000** | **100%** |

**年节约：** $420,000（柴油按 $0.85/升，年节省 292,000 升）
**静态投资回收期：** 6.2 年（不含环境权益）
**含碳收益（$25/吨 CO₂）：** 5.8 年回收

如需工商业及电网级微电网 BESS 解决方案，请了解我们的 [工商业电池储能柜](/products/ci-battery-cabinets) 和 [电网级储能系统](/products/energy-storage-system)——均通过 IEC 62619、UN38.3 和 GB/T 36276-2023 认证。

## 核心要点总结

1. **BESS 不可或缺**——任何可再生渗透率超过 30% 的微电网都必须配置储能
2. **光伏与 BESS 协同优化**——切勿独立设计
3. **构网型逆变器是孤岛运行的必备条件**
4. **LFP 是标准选择**——6000+ 循环、安全性能优异、成本持续下降
5. **EMS 调度策略**可将柴油削减率从 30% 提升至 80%
6. **安全合规**对偏远安装点尤为重要——应急响应能力有限

## 下一步

微电网 BESS 设计需要现场负荷数据、可再生资源评估和详细工程方案。SolarStoragePro 团队提供从可行性研究到调试投运的交钥匙微电网设计服务。

**[联系我们的工程团队](/contact)** 讨论您的微电网项目，或了解我们的产品系列：
- [工商业电池储能柜（100-500 kWh）](/products/ci-battery-cabinets)
- [电网级储能系统（1-5 MW）](/products/energy-storage-system)
- [PCS 及逆变器](/products/pcs)

*准备好设计您的微电网了吗？让我们一次做对。*`;

// ── Main execution ──
async function main() {
  // Article already inserted — use known ID
  const articleId = 'd127b2d9-b350-4e69-8475-38b570833acf';
  console.log('Article ID:', articleId);

  // Step 2: Insert English translation
  console.log('\n=== Step 2: Insert EN translation ===');
  const enRes = await post('/rest/v1/blog_article_translations', {
    article_id: articleId,
    locale: 'en',
    category: enCategory,
    title: enTitle,
    description: enDescription,
    body: enBody
  });
  console.log('EN response status:', enRes.status);
  console.log('EN response body:', enRes.body.substring(0, 300));

  // Step 3: Insert Chinese translation
  console.log('\n=== Step 3: Insert ZH translation ===');
  const zhRes = await post('/rest/v1/blog_article_translations', {
    article_id: articleId,
    locale: 'zh',
    category: zhCategory,
    title: zhTitle,
    description: zhDescription,
    body: zhBody
  });
  console.log('ZH response status:', zhRes.status);
  console.log('ZH response body:', zhRes.body.substring(0, 300));

  // Step 4: Verify
  console.log('\n=== Step 4: Verify ===');
  const verifyRes = await get(`/rest/v1/blog_articles?slug=eq.${slug}&select=id,slug,date,read_time,tags`);
  console.log('Verify:', verifyRes.body);

  // Also verify translations
  const transRes = await get(`/rest/v1/blog_article_translations?article_id=eq.${articleId}&select=locale,category,title`);
  console.log('Translations:', transRes.body);

  console.log('\n=== Done! ===');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

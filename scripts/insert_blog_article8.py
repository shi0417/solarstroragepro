import json
import urllib.request

SUPABASE_URL = "https://qujcrmbzuzlgjrexbzga.supabase.co"
ANON_KEY = "sb_publishable_bBrZR2df4POLnM4sWI96xQ_xPvlD06k"
ARTICLE_ID = "6357fb11-4ac9-41ed-a42e-ae4971ef32c0"

def supabase_insert(table, payload):
    url = f"{SUPABASE_URL}/rest/v1/{table}"
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, method="POST")
    req.add_header("apikey", ANON_KEY)
    req.add_header("Authorization", f"Bearer {ANON_KEY}")
    req.add_header("Content-Type", "application/json")
    req.add_header("Prefer", "return=representation")
    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read().decode("utf-8"))
        print(f"✅ Inserted into {table}: {json.dumps(result, ensure_ascii=False)[:200]}")
        return result

EN_BODY = """## Why Proper BESS Sizing Matters

Sizing a **battery energy storage system (BESS)** is the single most consequential decision in any storage project. Oversize, and you lock capital into idle capacity; undersize, and you miss revenue windows or fail to meet your load during outages. According to BloombergNEF, the average utility-scale BESS project in 2025 costs **$280–340/kWh**, meaning even a 10% sizing error on a 10 MWh project can translate to **$280K–340K** in wasted CAPEX or lost revenue.

This guide walks through a structured methodology for sizing BESS across three dominant applications: **commercial & industrial (C&I) peak shaving**, **grid-scale frequency regulation**, and **solar-plus-storage firming**.

---

## Step 1: Define Your Application and Revenue Stack

Before touching a calculator, clarify what your BESS must do. Most projects serve **multiple stacked revenue streams**:

| Application | Primary Value | Typical Duration | Target Market |
|---|---|---|---|
| Peak Shaving | Demand charge reduction | 2–4 hours | C&I, behind-the-meter |
| Frequency Regulation | Ancillary service revenue | 15–30 min | Grid, front-of-meter |
| Solar Time-Shifting | Energy arbitrage | 3–5 hours | Utility, C&I |
| Backup Power | Resilience / reliability | 4–8 hours | Critical facilities |
| Demand Response | Grid program payments | 2–4 hours | C&I, aggregator |

**Key rule**: Size for the **highest-priority application first**, then verify that secondary uses do not conflict. For example, a system sized for frequency regulation (short, frequent cycles) may degrade faster if also used for deep daily cycling in arbitrage.

---

## Step 2: Calculate Energy Capacity (kWh)

The energy capacity — how much energy the battery stores — is driven by your **load profile or revenue target**.

### For Peak Shaving (C&I)

1. **Obtain 15-minute interval load data** for at least 12 months.
2. **Identify the peak demand window** — typically the highest 15-minute average in the billing period.
3. **Set your target peak** — the demand level you want to shave down to.
4. **Calculate the energy above the target**: integrate the load above the target line over the discharge window.

**Example**: A factory has a 15-minute peak of **800 kW** and wants to cap demand at **500 kW**. The discharge window lasts 3 hours.

- Power needed: 800 − 500 = **300 kW**
- Energy needed: 300 kW × 3 h = **900 kWh**
- Add a 15% margin for degradation and round-trip losses: 900 × 1.15 ≈ **1,035 kWh**

### For Frequency Regulation (Grid-Scale)

Frequency regulation requires **high power, short duration**. Most markets mandate a minimum 15–30 minute sustained output.

- Power rating: based on your **market registration capacity** (e.g., 5 MW in PJM RegD)
- Energy: Power × required duration × safety margin
- Example: 5 MW × 0.5 h × 1.2 = **3 MWh**

### For Solar Time-Shifting

1. Profile your solar generation curve vs. load curve.
2. Calculate the **excess solar energy** (kWh) that must be stored during generation hours.
3. Subtract **round-trip efficiency losses** (typically 85–90% for LFP systems).

**Example**: A 2 MW solar array generates 6 MWh excess between 10:00–14:00. Storage needed: 6 MWh ÷ 0.88 ≈ **6.8 MWh**

---

## Step 3: Determine Power Rating (kW / MW)

Power rating is independent from energy capacity and is set by:

- **Maximum discharge rate** needed (for peak shaving or regulation)
- **Maximum charge rate** needed (for solar absorption or off-peak charging)
- **Inverter/PCS capacity** — your power electronics must match

| C&I System | Typical Power | Typical Energy | Duration |
|---|---|---|---|
| Small C&I | 100–250 kW | 200–500 kWh | 2 h |
| Medium C&I | 250–500 kW | 500–1,000 kWh | 2–4 h |
| Large C&I | 500 kW–2 MW | 1–4 MWh | 2–4 h |
| Grid-Scale | 2–10 MW | 4–40 MWh | 2–4 h |

For **C&I battery cabinets** like the [SolarStoragePro C&I series](/products/ci-battery-cabinets), each cabinet delivers **100–250 kW** with 200–500 kWh storage, making them ideal building blocks for modular sizing.

---

## Step 4: Account for Degradation and Usable Capacity

A common mistake is equating **nameplate capacity** with **usable capacity**. Real-world usable energy is always lower:

1. **Depth of Discharge (DoD)**: LFP cells typically allow 90–95% DoD, but cycling to 100% accelerates degradation. Best practice: plan for **80–90% DoD** over the warranty period.
2. **Round-trip efficiency (RTE)**: LFP systems achieve **87–92%** RTE including PCS and thermal management losses.
3. **End-of-life margin**: Size for **80% capacity retention** at year 10. A 1 MWh nameplate system delivers only **800 kWh** at end of warranty.

**Adjusted sizing formula**:

> Required nameplate = (Energy needed) ÷ (DoD) ÷ (RTE) ÷ (EoL factor)

**Example**: 1,000 kWh needed → 1,000 ÷ 0.90 ÷ 0.90 ÷ 0.80 = **1,543 kWh nameplate**

This is why oversizing by **40–60%** above the raw energy requirement is standard practice.

---

## Step 5: Select the Right Battery Chemistry

| Parameter | LFP (LiFePO4) | NMC (Ni-Mn-Co) |
|---|---|---|
| Cycle Life (80% SoH) | 6,000–10,000 | 2,000–4,000 |
| DoD for Optimal Life | 80–90% | 70–80% |
| RTE (system-level) | 87–92% | 85–90% |
| Safety (Thermal Runaway) | Excellent | Moderate |
| Cost ($/kWh, cell level, 2025) | $80–100 | $95–120 |
| Best For | Daily cycling, C&I, grid | Space-constrained, energy-dense |

For **stationary storage applications** with daily cycling, **LFP is the clear choice** — it offers 2–3× the cycle life at 15–25% lower cost per kWh-cycle. Read our [LFP vs NMC comparison](/blog/lfp-vs-nmc-battery-energy-storage) for a deeper analysis.

---

## Step 6: Thermal and Site Considerations

Sizing is not just electrical. Your site constraints often set the practical limits:

1. **Footprint**: A standard 20-foot BESS container (1–5 MWh) requires **15–25 m²** of level concrete pad, plus clearance for fire suppression access.
2. **Ambient temperature**: Above 35°C, battery derating reduces available power by **5–15%**. Plan for worst-case summer conditions.
3. **Altitude**: Above 2,000 m, air density reduction affects PCS cooling — derate by **1% per 100 m** above 2,000 m.
4. **Fire codes**: NFPA 855 (US), IEC 62619 (international), and GB/T 36276-2023 (China) all mandate **minimum separation distances**, fire detection, and suppression systems that affect layout.

---

## Step 7: Validate with Simulation

Before committing capital, run an **8,760-hour annual simulation** using:

- Actual load or market price data (not averages)
- Hourly solar irradiance profiles (for solar-plus-storage)
- Degradation modeling (capacity fade per cycle)
- Thermal derating curves

Tools like **HOMER Pro**, **PVsyst**, or open-source alternatives (PyPSA, SAM) can model revenue under varying scenarios. A well-calibrated simulation typically reveals **10–20% optimization** versus back-of-envelope calculations.

---

## Quick Sizing Reference Table

| Application | Power | Energy | Duration | Chemistry | Container Type |
|---|---|---|---|---|---|
| Small C&I Peak Shaving | 100–250 kW | 200–500 kWh | 2 h | LFP | Indoor cabinet |
| Large C&I Peak Shaving | 500 kW–2 MW | 1–4 MWh | 2–4 h | LFP | Outdoor cabinet cluster |
| Grid Frequency Regulation | 2–10 MW | 1–5 MWh | 0.25–0.5 h | LFP | 20ft container |
| Solar Time-Shifting | 1–5 MW | 4–20 MWh | 2–4 h | LFP | 20ft/40ft container |
| Data Center Backup | 1–10 MW | 4–40 MWh | 4–8 h | LFP | Multi-container |

---

## Get Expert Help with Your BESS Sizing

Correct sizing is the foundation of a profitable energy storage project. At **SolarStoragePro**, our engineering team provides **free preliminary sizing assessments** based on your load profile, revenue targets, and site conditions.

- **C&I Battery Cabinets** (100–500 kWh): [Explore our C&I lineup](/products/ci-battery-cabinets)
- **Grid-Scale BESS Containers** (1–5 MW): [Explore our BESS systems](/products/energy-storage-system)
- **PCS / Inverters**: [View our power conversion systems](/products/pcs)

**[Contact us today](/contact) for a complimentary sizing analysis — our engineers will model your project and recommend the optimal configuration within 48 hours.**"""

ZH_BODY = """## 为什么 BESS 正确选型至关重要

**电池储能系统（BESS）的容量选型**是任何储能项目中最关键的决策。选大了，大量资金沉淀在闲置容量中；选小了，要么错失收益窗口，要么在停电时无法满足负荷需求。根据 BloombergNEF 数据，2025 年全球公用事业级 BESS 项目平均成本为 **280–340 美元/kWh**，这意味着一个 10 MWh 项目即使出现 10% 的选型偏差，也可能导致 **28–34 万美元** 的资本浪费或收益损失。

本指南将系统性地介绍三大主流应用场景下的 BESS 选型方法：**工商业削峰填谷**、**电网级调频**和**光储融合消纳**。

---

## 第一步：明确应用场景与收益叠加

在开始计算之前，先明确你的 BESS 要实现什么目标。大多数项目会**叠加多种收益来源**：

| 应用场景 | 主要价值 | 典型时长 | 目标市场 |
|---|---|---|---|
| 削峰填谷 | 降低基本电费 | 2–4 小时 | 工商业，用户侧 |
| 调频服务 | 辅助服务收益 | 15–30 分钟 | 电网，电网侧 |
| 光伏消纳转移 | 峰谷套利 | 3–5 小时 | 电站、工商业 |
| 备用电源 | 供电可靠性 | 4–8 小时 | 关键设施 |
| 需求响应 | 电网补贴 | 2–4 小时 | 工商业、聚合商 |

**核心原则**：先按**最高优先级应用**选型，再验证次要用途是否冲突。例如，为调频设计的系统（短时高频循环）如果同时用于深度日循环套利，电池衰减将显著加快。

---

## 第二步：计算能量容量（kWh）

能量容量——即电池能存储多少电——由你的**负荷曲线或收益目标**决定。

### 工商业削峰填谷

1. **获取至少 12 个月的 15 分钟间隔负荷数据**。
2. **确定尖峰负荷窗口**——通常是计费周期内最高的 15 分钟平均功率。
3. **设定削峰目标**——你希望将需量控制在什么水平。
4. **计算目标线以上的能量**：对放电窗口内高于目标线的负荷进行积分。

**示例**：某工厂 15 分钟尖峰负荷为 **800 kW**，目标需量控制在 **500 kW**。放电窗口持续 3 小时。

- 所需功率：800 − 500 = **300 kW**
- 所需能量：300 kW × 3 h = **900 kWh**
- 加 15% 余量（考虑衰减和往返损耗）：900 × 1.15 ≈ **1,035 kWh**

### 电网调频（电网侧）

调频需要**高功率、短时长**。大多数市场要求最低 15–30 分钟持续输出。

- 功率额定值：基于**市场注册容量**（如 PJM RegD 注册 5 MW）
- 能量：功率 × 所需时长 × 安全系数
- 示例：5 MW × 0.5 h × 1.2 = **3 MWh**

### 光伏消纳转移

1. 分析光伏发电曲线与负荷曲线。
2. 计算**需要存储的富余光伏电量**（kWh）。
3. 扣除**往返效率损耗**（LFP 系统通常为 85–90%）。

**示例**：2 MW 光伏阵列在 10:00–14:00 期间产生 6 MWh 富余电量。所需储能：6 MWh ÷ 0.88 ≈ **6.8 MWh**

---

## 第三步：确定功率等级（kW / MW）

功率额定值与能量容量相互独立，由以下因素决定：

- **最大放电功率**需求（削峰或调频）
- **最大充电功率**需求（光伏消纳或谷时充电）
- **逆变器/PCS 容量**——电力电子设备必须匹配

| 工商业系统 | 典型功率 | 典型能量 | 时长 |
|---|---|---|---|
| 小型工商业 | 100–250 kW | 200–500 kWh | 2 h |
| 中型工商业 | 250–500 kW | 500–1,000 kWh | 2–4 h |
| 大型工商业 | 500 kW–2 MW | 1–4 MWh | 2–4 h |
| 电网级 | 2–10 MW | 4–40 MWh | 2–4 h |

[SolarStoragePro C&I 系列电池柜](/products/ci-battery-cabinets)单柜提供 **100–250 kW** 功率和 200–500 kWh 储能容量，是模块化选型的理想基础单元。

---

## 第四步：考虑衰减与可用容量

常见误区是将**标称容量**等同于**可用容量**。实际可用能量始终低于标称：

1. **放电深度（DoD）**：LFP 电芯通常允许 90–95% DoD，但满深度循环会加速衰减。最佳实践：质保期内按 **80–90% DoD** 规划。
2. **往返效率（RTE）**：含 PCS 和热管理损耗，LFP 系统可达 **87–92%**。
3. **寿命末期余量**：按第 10 年 **80% 容量保持率**选型。1 MWh 标称系统在质保期末仅输出 **800 kWh**。

**调整选型公式**：

> 所需标称容量 = (所需能量) ÷ (DoD) ÷ (RTE) ÷ (寿命末期系数)

**示例**：需要 1,000 kWh → 1,000 ÷ 0.90 ÷ 0.90 ÷ 0.80 = **1,543 kWh 标称容量**

这就是为什么在实际工程中，**超额配置 40–60%** 是标准做法。

---

## 第五步：选择正确的电池化学体系

| 参数 | LFP（磷酸铁锂） | NMC（镍锰钴） |
|---|---|---|
| 循环寿命（80% SoH） | 6,000–10,000 次 | 2,000–4,000 次 |
| 最佳寿命 DoD | 80–90% | 70–80% |
| 系统级 RTE | 87–92% | 85–90% |
| 安全性（热失控） | 优异 | 中等 |
| 成本（电芯级，2025年 $/kWh） | $80–100 | $95–120 |
| 最适用场景 | 日循环，工商业，电网 | 空间受限，能量密度优先 |

对于**日循环的固定式储能应用**，**LFP 是明确的首选**——其循环寿命是 NMC 的 2–3 倍，而每 kWh 每次循环成本低 15–25%。详细对比请阅读我们的 [LFP vs NMC 深度分析](/blog/lfp-vs-nmc-battery-energy-storage)。

---

## 第六步：热管理与场地条件

选型不仅是电气问题，场地条件往往决定了实际可部署的上限：

1. **占地面积**：标准 20 英尺 BESS 集装箱（1–5 MWh）需要 **15–25 m²** 水平混凝土基础，外加消防通道间距。
2. **环境温度**：35°C 以上，电池降额运行，可用功率降低 **5–15%**。必须按最不利夏季工况规划。
3. **海拔**：2,000 m 以上空气密度降低影响 PCS 散热——2,000 m 以上每升高 100 m 降额 **1%**。
4. **消防规范**：NFPA 855（美国）、IEC 62619（国际）、GB/T 36276-2023（中国）均规定了**最小安全间距**、火灾探测和灭火系统，直接影响布局设计。

---

## 第七步：用仿真验证

在投入资金之前，务必进行 **8,760 小时年度仿真**：

- 使用实际负荷或市场价格数据（非平均值）
- 逐时光伏辐照曲线（光储场景）
- 衰减建模（每次循环的容量衰减）
- 热降额曲线

HOMER Pro、PVsyst 或开源工具（PyPSA、SAM）可在不同场景下建模收益。经过校准的仿真通常能比经验估算**优化 10–20%**。

---

## 快速选型参考表

| 应用场景 | 功率 | 能量 | 时长 | 化学 | 形态 |
|---|---|---|---|---|---|
| 小型工商业削峰 | 100–250 kW | 200–500 kWh | 2 h | LFP | 室内机柜 |
| 大型工商业削峰 | 500 kW–2 MW | 1–4 MWh | 2–4 h | LFP | 户外柜群 |
| 电网调频 | 2–10 MW | 1–5 MWh | 0.25–0.5 h | LFP | 20尺集装箱 |
| 光伏消纳转移 | 1–5 MW | 4–20 MWh | 2–4 h | LFP | 20/40尺集装箱 |
| 数据中心备电 | 1–10 MW | 4–40 MWh | 4–8 h | LFP | 多集装箱阵列 |

---

## 获取专业 BESS 选型支持

正确的选型是储能项目盈利的基石。**SolarStoragePro** 工程团队提供基于负荷曲线、收益目标和场地条件的**免费初步选型评估**。

- **工商业电池柜**（100–500 kWh）：[了解 C&I 产品线](/products/ci-battery-cabinets)
- **电网级 BESS 集装箱**（1–5 MW）：[了解 BESS 系统](/products/energy-storage-system)
- **PCS/逆变器**：[查看功率转换系统](/products/pcs)

**[立即联系我们](/contact)，获取免费选型分析——工程师将在 48 小时内完成项目建模并推荐最优配置方案。**"""

# Insert EN translation
en_payload = {
    "article_id": ARTICLE_ID,
    "locale": "en",
    "category": "Technical Guide",
    "title": "How to Size a Battery Energy Storage System: A Practical Guide for Commercial and Grid-Scale Projects",
    "description": "Step-by-step methodology for sizing BESS across peak shaving, frequency regulation, and solar-plus-storage applications. Includes formulas, reference tables, and real-world examples for C&I and grid-scale projects.",
    "body": EN_BODY
}
supabase_insert("blog_article_translations", en_payload)

# Insert ZH translation
zh_payload = {
    "article_id": ARTICLE_ID,
    "locale": "zh",
    "category": "技术指南",
    "title": "电池储能系统选型指南：工商业与电网级项目实战方法论",
    "description": "系统化介绍削峰填谷、调频和光储融合场景下的 BESS 选型方法，包含公式推导、参考表格和实际案例，适用于工商业和电网级项目。",
    "body": ZH_BODY
}
supabase_insert("blog_article_translations", zh_payload)

print("\n✅ Both translations inserted successfully!")

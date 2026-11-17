# -*- coding: utf-8 -*-
"""Content for: BESS tender / RFP technical specification guide (2026-11-17)."""

SLUG = "bess-tender-rfp-technical-specification-guide"
DATE = "2026-11-17"
READ_TIME = 11
TAGS = ["BESS", "Procurement", "Tender Specification", "Performance Guarantee", "FAT/SAT", "Energy Storage"]

EN_CATEGORY = "Procurement"
EN_TITLE = "How to Write a BESS Tender Specification: Performance Guarantees That Actually Protect Your Project"
EN_DESC = "A practical guide to writing BESS tender and RFP technical specifications: measurement points, duty cycles, availability and degradation guarantees, FAT/SAT requirements, and liquidated damages that bite."

EN_BODY = """A battery energy storage system is contracted for 10 to 20 years, but most procurement failures are decided in the three weeks it takes to write the tender. A vague technical specification invites bidders to quote against different implicit requirements, which makes price comparison meaningless and rewards whoever under-specifies most aggressively. This guide sets out the clauses that separate a bankable BESS tender from an expensive lesson, based on current practice in utility-scale procurements across Asia, the Middle East and Europe.

## Why the Lowest Bid Is Often the Most Expensive

In price-driven tenders, the L1 (lowest) bidder wins by silently removing everything the specification failed to pin down. The consequences are visible in markets that have run at extreme price pressure: Indian standalone BESS tariffs have fallen to levels as low as INR 1.48 lakh per MW-month for 2-hour systems, and analysts estimate that roughly 75% of allocated 2-hour BESS capacity now sits in an at-risk viability category. With battery packs accounting for about 60% of project capex, bidders anchoring on aggressive future cost declines are betting project viability on a forecast rather than a contracted cost base.

The fix is not to pay more — it is to evaluate **total cost of ownership**, not capex per kWh. A system with 5% lower round-trip efficiency effectively costs 5% more in grid-charging expense or forgone arbitrage revenue **every year for 15 years**. Bid evaluation must score degradation curves, warranty replacement terms and local service capability alongside the headline price.

## Fix the Measurement Point and the Duty Cycle First

Two definitions determine whether every later guarantee is meaningful:

1. **Usable AC energy at the point of interconnection (POI)**, not nominal DC energy. The specification must state the measurement point, the SOC window, the reserve margin and whether auxiliary consumption (HVAC, PCS idle losses, controls) is included. Recent Indian EPC tenders require bidders to size nameplate capacity upward for transformer losses (1%) and line losses (0.25%), so that a plant delivering 1,000 MWh at the POI carries roughly 1,100 MWh of installed nameplate.
2. **The duty cycle**: cycles per day, annual throughput, depth of discharge, and site temperature profile. Never request a cycle-life guarantee without attaching the duty cycle — throughput drives thermal loading, degradation, augmentation needs and the supplier's warranty exposure, so no responsible bidder can price a guarantee against an undefined load profile.

## The Four Guarantees Every BESS Tender Needs

Benchmarked from published utility tenders (India APPCC and SECI, Sri Lanka CEB, NTPC):

| Guarantee | Market benchmark | Real tender reference |
| --- | --- | --- |
| System availability | 85%–98% per month/year | CEB 97% monthly; NTPC 98%; APPCC 95%; SECI 85% |
| Dispatchable capacity, Year 1 | 95%–97.5% of rated | CEB 97.5% at end of Year 1; NTPC 95% |
| Dispatchable capacity, end of term | 70% (10–12 yr) to 62.5% (15 yr) | CEB declines 2.5%/yr to 62.5% at Year 15; SECI 70% at Year 20 |
| AC-AC round-trip efficiency | 85% monthly (grid-scale) | CEB and APPCC ≥85%; NTPC ≥80% including auxiliaries |

Availability must be defined by formula: measurement interval, exclusions for planned maintenance, partial derating handling, and treatment of grid outages and restoration times. Without this, "97% availability" is marketing language, not a contractual obligation.

## Degradation Schedule and Augmentation Obligations

A warranty that says "6000 cycles" says nothing. Current tenders define a **year-by-year dispatchable capacity schedule** with liquidated damages for shortfall. Sri Lanka's CEB tender, for example, requires minimum dispatchable storage capacity of 97.5% at the end of Year 1 declining in 2.5% annual steps to 62.5% at Year 15, with the monthly capacity charge reduced proportionally if the tested capacity falls short. Chinese procurement documents are similarly explicit: typical specifications for liquid-cooled LFP cabinets call for 280Ah or 314Ah cells, 90% DOD, **≥6000 cycles** at 70% EOL, and a 15-year design life, with third-party type-test reports mandatory.

Critically, assign **augmentation responsibility**. If the degradation schedule must be met at Year 10 or Year 15, the tender should state who pays for adding modules or capacity to compensate for fade — in recent NTPC tenders, any augmentation required to meet the guarantee is explicitly included in the supplier's scope.

## FAT and SAT: Test Everything, Keep the Raw Data

Sampled factory acceptance tests or manufacturer-only certificates hide exactly the defects that erode project economics later. Contracts should mandate:

1. **100% FAT** — full charge/discharge cycling at rated power, cell-level voltage profiling, infrared thermal imaging under load, and 100% fire-suppression functional testing.
2. **Raw data access** — not just pass/fail certificates. Recent Chinese procurement tenders go as far as requiring fully open BMS data interfaces (alarms, historical curves) subject to third-party random audits.
3. **SAT at commissioning** — capacity demonstration against the Year 1 guarantee, grid-code testing, protection relay verification, and thermal-camera inspection of every busbar and connection.

## Safety and Certification Evidence

Require certificates for the **exact delivered model**, not the product family: IEC 62619 and IEC 62933 for grid-scale cells and systems, UL 9540/9540A where the market requires it, and GB/T 36276 for Chinese-standard projects. The evidence package should include a hazard analysis or FMEA, the fire and gas-detection design basis, container spacing and emergency-response recommendations, and type-test reports issued by accredited third-party laboratories (CNAS/CMA-accredited reports in China; nationally accredited labs elsewhere). If the AHJ in your jurisdiction has additional requirements, list them in the tender — compliance discovered after delivery is the buyer's cost.

## Liquidated Damages That Actually Bite

Quantified guarantees without penalty clauses are unenforceable. Published tenders show a workable structure:

| Shortfall | Typical LD treatment |
| --- | --- |
| Availability below guarantee | LD at 2x the capacity charge for the unavailable portion (APPCC, CEB) |
| RTE below guarantee | Damages priced at the power purchase cost for excess conversion losses; RTE below 70% for 3 consecutive months can constitute an event of default (APPCC) |
| Capacity below schedule | Proportional reduction of monthly capacity charge (CEB) |
| Commissioning delay | Pro-rata encashment of the performance guarantee, capped (typically 6 months) |

Values and liability caps must be agreed with the commercial and legal teams before issuing the tender — retrofitted penalty schedules are where disputes are born.

## Bid Evaluation: Score the Whole Contract

1. Require every bid to separate **guaranteed values** from **assumptions and exclusions**, item by item.
2. Evaluate on **15-year TCO**: efficiency losses, degradation, augmentation costs, warranty replacement terms and local after-sales infrastructure — not headline capex.
3. Bring **lenders and insurers in before vendor selection**; a vendor rejected at financial close can cost 3–6 months of restart, and bankability filters out pure price-chasing.
4. Verify scope completeness: PCS, MV transformer, switchgear, EMS/SCADA, civil and grid-compliance studies each need an owner. A container is not a power plant.

Whether you are procuring a 200 kWh C&I cabinet or a multi-container grid-scale plant, the specification discipline is identical. Our engineering team can review your draft specification against current market benchmarks, or supply complete technical documentation for our [C&I battery cabinets](/products/ci-battery-cabinets) and [grid-scale energy storage systems](/products/energy-storage-system). [Contact us](/contact) for a guaranteed-specification proposal — every assumption, exclusion and guaranteed value stated item by item."""

ZH_CATEGORY = "采购指南"
ZH_TITLE = "BESS 招标技术规范书怎么写：让性能保证条款真正保护你的项目"
ZH_DESC = "储能系统招标技术规范书撰写实操指南：计量点与运行工况定义、可用率与容量衰减保证、FAT/SAT 验收要求、违约金条款设计与评标方法。"

ZH_BODY = """一套储能系统要运行 10 到 20 年，但大多数采购失败的种子，是在撰写招标技术规范书的那三周里埋下的。规范书写得模糊，投标方就会按照各自默认的参数报价——比价失去意义，最终中标的往往是"悄悄降配最狠"的那一家。本文结合印度 APPCC/SECI、斯里兰卡 CEB、印度 NTPC 等近期公开招标文件和国内主流采购要求，梳理一套能让性能保证条款真正落地的规范书框架。

## 为什么最低价中标往往最贵

在纯价格导向的招标里，最低价投标人靠删掉规范书没写死的内容来压缩报价。这种后果在价格竞争极端激烈的市场已经显现：印度独立储能中标电价低至 2 小时系统约 14.8 万卢比/MW·月（约合 1750 美元），分析机构估计约 75% 的已分配 2 小时储能容量处于"可持续性存疑"区间。电池约占项目总投资的 60%，投标人押注未来成本继续下降，等于把项目可行性赌在一个预测值上。

解决方案不是多花钱，而是按**全生命周期成本（TCO）**评标，而不是只看每 kWh 造价。一套循环效率低 5% 的系统，意味着**未来 15 年每年**多付 5% 的充电电费或放弃同等比例的套利收益。评标必须把衰减曲线、质保更换条款、本地服务能力与报价放在一起打分。

## 先定义计量点和运行工况

两个定义决定了后面所有保证条款是否有意义：

1. **并网点（POI）可用交流容量**，而不是直流标称容量。规范书必须写明计量点、SOC 运行窗口、备用裕度，以及暖通空调、PCS 待机损耗等自用电是否计入。近期印度 EPC 招标已要求投标方按变压器损耗 1%、线路损耗 0.25% 向上放大标称容量——POI 侧交付 1000 MWh 的电站，需配置约 1100 MWh 标称容量。
2. **运行工况（Duty Cycle）**：每日循环次数、年吞吐量、放电深度、现场温度曲线。永远不要在未附运行工况的情况下要求循环寿命保证——吞吐量决定热负荷、衰减速度、增补需求和供应商的质保敞口，负责任的供应商无法对未定义的负荷曲线报出保证值。

## 每份储能招标必备的四项保证

综合近期公开招标文件的基准值：

| 保证项 | 市场基准 | 真实招标案例 |
| --- | --- | --- |
| 系统可用率 | 85%–98%（月度/年度） | CEB 97% 月度；NTPC 98%；APPCC 95%；SECI 85% |
| 第一年可调度容量 | 额定值的 95%–97.5% | CEB 第 1 年末 97.5%；NTPC 95% |
| 合同期末可调度容量 | 70%（10–12 年）至 62.5%（15 年） | CEB 按 2.5%/年递减至第 15 年 62.5%；SECI 第 20 年 70% |
| 交流侧循环效率 | 85%（月度，电网级） | CEB 与 APPCC ≥85%；NTPC 含自用电 ≥80% |

可用率必须以公式定义：计量周期、计划检修剔除规则、部分降额的处理方式、电网停电与恢复时间的归属。写不清楚，"97% 可用率"就只是宣传语，不是合同义务。

## 容量衰减表与增补责任

只写"循环 6000 次"的质保等于没写。现行招标普遍采用**逐年可调度容量表**并配套违约金。例如斯里兰卡 CEB 招标要求第 1 年末可调度容量不低于 97.5%，此后每年递减 2.5%，至第 15 年为 62.5%；实测容量低于表中数值时，按比例核减月度容量电费。国内招标文件同样直接：液冷磷酸铁锂储能柜典型要求为 280Ah/314Ah 电芯、DOD 90%、70% EOL 下**循环寿命 ≥6000 次**、设计寿命 15 年，并强制提供第三方型式试验报告。

更关键的是**增补（Augmentation）责任归属**。如果第 10 年、第 15 年仍要满足容量表，规范书应写明由谁出资加装模组补偿衰减——近期 NTPC 招标已明确：为满足保证值所需的任何增补，均包含在供应商供货范围内。

## FAT/SAT：全检并保留原始数据

抽检式出厂验收或仅凭厂家自检证书，恰恰会漏掉日后侵蚀项目收益的那些缺陷。合同应强制要求：

1. **100% FAT（出厂验收）**：额定功率满充放循环、电芯级电压曲线筛查、满负荷红外热成像、消防系统 100% 功能测试。
2. **原始数据开放**：不只给"合格/不合格"结论。国内部分招标已要求 BMS 数据接口全开放（运行数据、告警记录、历史曲线），并接受第三方随机抽查。
3. **SAT（现场验收）**：对照第一年保证值做容量实测、并网性能测试、保护定值校验，以及全部母排和接点的红外普查。

## 安全与认证证据

要求提供**实际交付型号**（而非产品系列）的证书：电网级电芯与系统按 IEC 62619、IEC 62933，北美市场按 UL 9540/9540A，国标项目按 GB/T 36276。证据包应包括危险分析或 FMEA、消防与可燃气体探测设计依据、集装箱间距与应急处置建议，以及具备资质（国内为 CNAS/CMA）的第三方实验室出具的型式试验报告。项目所在地消防主管部门若有额外要求，应直接写入招标文件——交付后才发现的合规缺口，成本由买方承担。

## 真正有约束力的违约金条款

没有罚则的保证条款等于没有保证。公开招标给出的可行结构如下：

| 违约情形 | 典型违约金处理 |
| --- | --- |
| 可用率低于保证值 | 按不可用部分容量电费的 2 倍计罚（APPCC、CEB） |
| 循环效率低于保证值 | 超额转换损耗按购电成本计罚；连续 3 个月低于 70% 可构成违约事件（APPCC） |
| 容量低于衰减表 | 按比例核减月度容量电费（CEB） |
| 投运延期 | 按比例没收履约保函，通常设 6 个月上限 |

违约金数值与责任上限必须在发标前与商务、法务团队敲定——事后补谈的罚则条款，是争议的高发区。

## 评标：把整份合同打分

1. 要求每份投标文件逐项区分**保证值**与**假设条件/免责事项**。
2. 按 **15 年 TCO** 评标：效率损失、容量衰减、增补成本、质保更换条款、本地售后网络——而非只看首期造价。
3. 在选定供应商**之前**引入贷款行与保险机构：财务关闭时才发现供应商不被认可，重启要付出 3–6 个月，而可融资性审查天然过滤掉纯低价投机者。
4. 核对供货范围完整性：PCS、升压变、中压开关柜、EMS/SCADA、土建与并网研究各有归属。一个集装箱不等于一座电站。

无论是采购 200 kWh 级的工商业储能柜，还是多集装箱的电网级电站，规范书的严谨逻辑完全一致。我们的工程团队可以对照现行市场基准审阅您的规范书草案，也可提供 [工商业电池储能柜](/products/ci-battery-cabinets) 与 [电网级储能系统](/products/energy-storage-system) 的完整技术文件。[联系我们](/contact)获取逐项列明保证值、假设与免责事项的规范级报价方案。"""

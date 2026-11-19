# -*- coding: utf-8 -*-
"""Blog content: BESS fire incident lessons (Moss Landing) - 2026-11-19"""

SLUG = "bess-fire-incident-lessons-moss-landing-design"
DATE = "2026-11-19"
READ_TIME = 11
TAGS = ["BESS", "Fire Safety", "Thermal Runaway", "Moss Landing", "LFP", "NFPA 855"]

EN_CATEGORY = "Safety"
EN_TITLE = "BESS Fire Incident Lessons: What Moss Landing Taught the Industry About Safe Battery Storage Design"
EN_DESCRIPTION = "A data-driven review of BESS fire incidents from Moss Landing to today: failure statistics, root-cause analysis, and seven design lessons every buyer should demand from suppliers in 2026."

EN_BODY = """Battery energy storage has never deployed faster than it is today. The United States alone passed 52 GW of installed utility-scale capacity in 2026, adding 8.3 GW in the first half of the year, and global grid-scale additions now top 200 GWh annually. With that scale comes a fair question from buyers, insurers, and host communities: **how safe are modern battery energy storage systems (BESS), really?**

The honest answer comes from data, not marketing. Largely thanks to the industry's transparent response to a small number of high-profile fires — above all the January 2025 **Moss Landing** incident in California — BESS now has one of the best-documented safety improvement records of any power technology. This article reviews the incident data, breaks down what actually failed at Moss Landing, and distills the engineering lessons that every procurement team should turn into supplier requirements.

## The Safety Record: Failure Rates Down 98% Since 2018

EPRI's BESS Failure Incident Database, launched in 2021 after clusters of fires in South Korea and the 2019 Surprise, Arizona explosion, now tracks 165 incidents worldwide (as of October 2026). Its headline finding is unambiguous:

| Metric | 2018 | 2025 | Source |
| --- | --- | --- | --- |
| Fires per GWh deployed | >1.0 | **0.03** | SEIA |
| Failure rate per cumulative deployed GWh | Baseline | **-98% to -99%** | EPRI |
| Incidents with reported injuries or fatalities | — | **7%** (93% none) | EPRI |
| BESS annual failure risk comparison | — | Comparable to oil-filled transformers (~0.1%/yr) | EPRI |

Two caveats matter. First, absolute incident counts rise as deployment explodes — even 0.03 fires per GWh means fires still happen somewhere. Second, EPRI notes that roughly **72% of failures occur within the first two years** of installation, and that most manufacturing defects surface at the **system integration level**, not at the cell chemistry level. Safety is a design and quality-management problem as much as an electrochemical one.

## Moss Landing: Anatomy of a Legacy-Design Failure

On January 16, 2025, a fire destroyed roughly 55% of the batteries in Vistra's 300 MW / 1,200 MWh Phase 1 plant at Moss Landing, California — at the time one of the world's largest BESS facilities. About 1,200–1,500 residents were evacuated, and soil sampling near the adjacent Elkhorn Slough estuary later found nickel, cobalt and manganese concentrations 100–1,000 times above normal. The site suffered re-ignition events in February 2025 and again in September 2026 from damaged debris during cleanup.

The WECC's December 2025 report (prepared with FERC, NERC and CAISO) documented the design context rather than a definitive root cause — Vistra maintains the ignition cause remains undetermined — but the risk factors are clear:

- **Indoor architecture**: NMC racks, double-stacked across two stories of a repurposed 1950s turbine hall, concentrating enormous energy in one enclosed volume.
- **Legacy chemistry**: NMC cells (manufactured by LG) become unstable around **160°C** and can burn as hot as 800°C in thermal runaway, versus roughly 230°C onset and 620°C peak for LFP.
- **Pre-NFPA 855 vintage**: the plant was commissioned in December 2020, before the first fire-safety standard for energy storage applied to its design.
- **Water-based suppression**: overhead sprinklers proved ineffective and were deactivated mid-fire; WECC cautions that water can damage energized equipment and worsen chemical fires.
- **High-SOC capacity test**: the alarm sounded at 2:48 p.m. while a capacity test was charging two arrays to maximum state of charge. In South Korea's pre-2019 fire record, 18 of 23 fires (78%) occurred above 95% SOC.

The counter-example sits on the same site. The outdoor part of Moss Landing uses 256 spaced, containerized **Tesla Megapacks with LFP cells**; when one unit caught fire there in 2022, the loss stopped at a single container. WECC's conclusion was blunt: warehouse-style installations like Moss 300 "are unlikely to be replicated."

## Root Causes: Where Systems Actually Fail

Working with TWAICE and PNNL, EPRI classifies every incident by root cause — **design, manufacturing, integration/assembly/construction, operation, or a combination** — and by failure location: cells and modules, controls, or balance-of-system equipment. The pattern across the database:

1. **Design defects** — indoor high-density layouts, inadequate off-gas management, missing deflagration venting (the 2019 Surprise, AZ explosion injured eight firefighters when accumulated flammable gases deflagrated).
2. **System-level integration errors** — not cell defects: connectors, controls, thermal management, and commissioning mistakes dominate early-life failures.
3. **Operational factors** — abnormal SOC management and uncontrolled capacity tests (Morris, Illinois 2021: a roof leak dripped rainwater onto stored lithium batteries, triggering the blaze).
4. **Aging-system risk** — early-vintage systems retrofitted with modern detection and protection show sharply lower risk, which is why EPRI urges safety reviews for pre-2018 fleets.

## Seven Design Lessons Buyers Should Demand

1. **Choose LFP chemistry** for stationary storage. Its ~70°C-higher thermal runaway onset and lower peak burn temperature materially change escalation dynamics; the industry has already migrated accordingly.
2. **Require outdoor, containerized modular architecture** with engineered spacing validated by propagation testing, so any incident is contained to one enclosure.
3. **Specify off-gas detection plus deflagration protection, not sprinklers**. Vent-gas sensors alarm hours before thermal runaway escalates; passive venting and barriering protect people and adjacent units.
4. **Enforce SOC discipline** — capped maximum SOC, limited and scheduled capacity tests, advance notification to the local fire department, and rehearsed failure scenarios.
5. **Demand cell-level QA transparency**: tier-1 cell sourcing, full production traceability, and sample-based destructive testing evidence.
6. **Audit system integration quality** — factory acceptance testing, third-party witness tests, and commissioning checklists targeting the first-two-years failure window.
7. **Plan the emergency response before COD** — pre-incident planning with local responders, monitored remotely 24/7 through performance analytics that flag cell-level anomalies early.

## What This Means for Procurement in 2026

Modern BESS is statistically among the safest grid assets deployed today, but the margin of safety is designed in — it can be value-engineered out. When evaluating suppliers, ask specifically for: chemistry and thermal runaway test reports, container-level propagation test evidence, detection and deflagration protection architecture, SOC operating limits, factory acceptance procedures, and post-commissioning monitoring commitments. Products built to IEC 62619, UL 9540A and GB/T 36276-2023 test regimes, with LFP cells in outdoor cabinets and containers, embody the lessons above — which is exactly how our [C&I battery cabinets](/products/ci-battery-cabinets) and [grid-scale energy storage systems](/products/energy-storage-system) are designed.

**Evaluating a storage project in 2026?** Send us your site and duty requirements — our engineering team will share safety design documentation, test reports, and a sizing proposal within 48 hours via the [contact form](/contact)."""

ZH_CATEGORY = "安全"
ZH_TITLE = "从 Moss Landing 大火复盘 BESS 安全设计：事故数据、根因分析与 7 条工程教训"
ZH_DESCRIPTION = "基于 EPRI 事故数据库与 WECC 报告的储能电站火灾复盘：失效率下降 98% 背后的设计演进、Moss Landing 事故根因，以及采购时应向供应商提出的 7 项安全要求。"

ZH_BODY = """2025 年 1 月 16 日，加州 Moss Landing 电站——当时全球最大的电网级储能电站之一（300MW/1200MWh）——发生大火，约 55% 的电池被烧毁，附近 1200 多名居民紧急疏散。事故后的一年多里，同一地点又先后发生两次复燃。这起事故成为全球储能行业安全设计的分水岭：**老一代设计的问题暴露得越彻底，新一代系统就进化得越快**。

本文基于 EPRI 事故数据库和 WECC 联合调查报告，复盘失效率数据、事故根因，并总结采购方应当向供应商提出的 7 条安全设计要求——无论是电网侧大储，还是工商业储能柜，这些要求同样适用。

## 先看数据：储能失效率六年下降 98%

EPRI 自 2021 年起持续追踪全球储能失效事故，截至 2026 年 10 月共收录 165 起。结论非常明确：

| 指标 | 2018 年 | 2025 年 | 来源 |
| --- | --- | --- | --- |
| 每 GWh 装机火灾数 | >1.0 | **0.03**（历史最低） | SEIA |
| 单位累计装机失效率 | 基线 | **下降 98%–99%** | EPRI |
| 造成人员伤亡的事故占比 | — | **仅 7%**（93% 无伤亡） | EPRI |
| 年度失效风险对标 | — | 与油浸式变压器相当（约 0.1%/年） | EPRI |

但有两个提醒：一是装机规模爆发式增长，绝对事故数仍会出现；二是 **约 72% 的失效发生在投运前两年**，且多数制造缺陷出现在**系统集成环节**而非电芯本身。安全不只是电芯化学的事，更是系统设计与质量管理的事。

## Moss Landing 事故：老设计的五个风险因素

WECC 于 2025 年 12 月发布的报告（联合 FERC、NERC、CAISO）未给出确定性起火原因（Vistra 坚持原因仍在调查中），但完整记录了事故的设计背景：

- **室内建筑布局**：NMC 电池架双层堆叠在由 1950 年代燃机厂房改造的室内，单个封闭空间内集中了巨量能量；
- **NMC 三元化学体系**：热失控触发温度约 **160℃**，燃烧峰值可达 800℃；而 LFP 磷酸铁锂触发温度约 230℃、峰值约 620℃；
- **早于 NFPA 855 标准**：项目 2020 年 12 月投运，早于首个储能消防安全标准；
- **水消防失效**：喷淋系统被证明无效并在火灾中被关闭——WECC 特别提示，喷水可能损坏带电设备并加剧化学品火；
- **高 SOC 容量测试**：报警发生在两组阵列充至最大 SOC 的容量测试期间。韩国 2019 年前的 23 起火灾中，18 起（78%）发生在 SOC 高于 95% 的状态。

同一个场站的对照组同样说明问题：户外部分是 256 台按间距布置的**磷酸铁锂 Tesla Megapack 集装箱**，2022 年其中一台起火，损失止步于单台设备，未蔓延。WECC 的结论直截了当：Moss 300 这种仓库式布置"不会再现"。

## 根因分类：系统到底在哪里失效

EPRI 与 TWAICE、PNNL 合作，将每起事故按根因分为**设计缺陷、制造缺陷、集成/安装/施工错误、运维失误或组合**，并按失效位置分为电芯/模组、控制系统、BOS 设备三类。数据库呈现的规律是：

1. **设计缺陷**——室内高密度布局、可燃气体（off-gas）管理缺失、泄爆设计不足。2019 年美国 Surprise 电站爆炸（8 名消防员受伤）正是积聚的可燃气体爆燃所致；
2. **系统集成质量问题**——而非电芯缺陷：连接器、控制、热管理和调试错误主导了早期失效；
3. **运维因素**——SOC 管控失当、无约束的容量测试（2021 年美国 Morris 仓库火灾：屋顶漏水，雨水滴到存放的锂电池上引发）；
4. **早期老系统风险**——加装现代探测与防护的旧系统风险显著下降，EPRI 因此呼吁对 2018 年前的存量系统做安全评估改造。

## 采购方应提出的 7 条安全设计要求

1. **坚持磷酸铁锂（LFP）电芯**：热失控触发温度高出约 70℃，燃烧峰值更低，显著改变事故演化路径，行业已全面迁移；
2. **要求户外集装箱式模块化架构**：间距设计经防蔓延测试验证，任何事故都应被限制在单一柜体/集装箱内；
3. **可燃气体探测 + 泄爆防护，而非喷淋**：排气口气体传感器可在热失控升级前数小时报警，配合泄爆板与防爆墙保护人员和相邻设备；
4. **严格 SOC 管控**：限制最大 SOC、容量测试纳入计划并提前通知属地消防、组织演练；
5. **电芯级质量追溯**：一线电芯品牌、全流程生产追溯、抽样式破坏性测试报告；
6. **系统集成质量审核**：出厂验收（FAT）、第三方见证测试、针对"投运前两年失效窗口"的调试检查表；
7. **投运前完成应急联动**：与属地消防部门建立预案，7×24 远程监控，通过数据分析平台提前识别电芯级异常。

国内监管同样在快速收紧：GB/T 36276-2023 新版对储能电池安全提出了更严苛的测试项，GB/T 42288《电化学储能电站安全规程》也已落地实施。工商业项目选型时，供应商能否提供完整的型式试验报告和安全设计文档，应当作为一票否决项。

## 2026 年项目选型的行动建议

现代 BESS 在统计上已是电网中最安全的资产类别之一，但这份安全裕度是**设计进去的**——也可能被成本优化"设计出去"。评估供应商时，请逐项索要：化学体系与热失控测试报告、柜体级防蔓延测试证据、探测与泄爆架构、SOC 运行限值、出厂验收流程和投运后监控承诺。我们所有产品——包括 [工商业电池储能柜](/products/ci-battery-cabinets) 和 [电网级储能系统](/products/energy-storage-system)——均采用 LFP 电芯 + 户外柜式/集装箱式架构，按 IEC 62619、GB/T 36276-2023 等标准设计制造，正是上述教训的落地实践。

**正在评估 2026 年储能项目？** 把您的场地条件和运行工况发给我们，工程团队将在 48 小时内提供安全设计文档、测试报告选编和容量配置方案——欢迎通过 [联系表单](/contact) 提交需求。"""

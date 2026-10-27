# BESS Capacity Market Accreditation: How ELCC Derating Decides What Your Battery Is Actually Worth

- **Slug**: `bess-capacity-market-accreditation-elcc`
- **Date**: 2026-10-27
- **Read time**: 11 min
- **Tags**: BESS, Capacity Market, ELCC, Resource Adequacy, Grid Storage
- **Category**: Market & Revenue / 市场与收益
- **Supabase article id**: 831508e8-7514-4571-9c36-77793affc63c

## EN title
BESS Capacity Market Accreditation: How ELCC Derating Decides What Your Battery Is Actually Worth

## ZH title
储能容量市场准入与 ELCC 折算：为什么 100MW 的电池只能卖 50MW 的容量

## EN description
A 100 MW battery rarely sells 100 MW of capacity. How ELCC class ratings, duration and degradation set your accredited MW in PJM, MISO, CAISO and Europe - and how to protect it.

## ZH description
同样一座 100MW 储能电站，在容量市场里可能只被承认 50MW。本文拆解 PJM、MISO、CAISO 与欧洲容量机制的折算法则，以及时长、衰减、可用率如何决定你的容量收入。

## Key data points cited
- PJM 2026/27 BRA cleared at FERC cap $329.17/MW-day (2025/26: $269.92); total capacity cost >$16.1B; IRM raised 17.8% -> 19.1%; forecast peak load +3.5%.
- PJM 2026/27 ELCC class ratings: 4h 50%, 6h 58%, 8h 62%, 10h 72%, fixed-tilt solar 8%, tracking solar 11%, onshore wind 41%, CT 60%, CC 74%, nuclear 95%.
- Capacity revenue math: 4h ~$60.1k/MW-yr; 8h ~$74.5k/MW-yr (+24% for ~2x energy capex).
- MISO: 95% administrative credit today -> DLOL from PY2028/29, expected 50-65%.
- CAISO: Slice-of-Day (2025) hour-by-hour RA framework.
- ERCOT: energy-only, zero capacity revenue.
- Germany: first centralised capacity market, 3 tranches from 2026, delivery from 2031. GB/Italy model 40-65% for 4h; Poland flat 13%.
- GB BESS frequency-response share: 87% (2020-22) -> 33% (2026), showing ancillary saturation.

## Internal links
- /products/ci-battery-cabinets
- /products/energy-storage-system
- /contact

---
## FULL BODY (EN)

Most battery storage business plans still model capacity revenue as nameplate megawatts multiplied by the clearing price. That assumption is now wrong in almost every market that matters, and the gap between the two numbers is where a surprising share of project returns quietly disappears.

A 100 MW / 400 MWh battery in PJM does not sell 100 MW of capacity. It sells roughly 50 MW. Understanding why - and what design decisions move that number - is now one of the highest-leverage skills in storage development.

## The Two Curves Moving in Opposite Directions

PJM's 2026/27 Base Residual Auction cleared at the FERC-approved cap of **$329.17/MW-day** across the entire RTO footprint, about 22% above the 2025/26 result of $269.92/MW-day and roughly ten times the 2024/25 level. Total capacity cost for the delivery year was estimated at over **$16.1 billion**.

At the same time, PJM's accreditation reform cut how much capacity a battery is credited with. Under marginal **ELCC (Effective Load Carrying Capability)** methodology, a 4-hour system fell another 5 percentage points year over year to a **50% class rating**.

So the price of an accredited megawatt is rising fast while the number of accredited megawatts per installed megawatt is falling. Projects underwritten on nameplate capacity are systematically overstating revenue.

## The ELCC Class Ratings That Set Your Revenue

PJM publishes a single class rating per technology, derived from how each resource class performs during the hours when the system is actually short. For the 2026/27 BRA:

| Resource class | ELCC class rating (2026/27 BRA) |
| --- | --- |
| 4-hour storage | 50% |
| 6-hour storage | 58% |
| 8-hour storage | 62% |
| 10-hour storage | 72% |
| Fixed-tilt solar | 8% |
| Tracking solar | 11% |
| Onshore wind | 41% |
| Combustion turbine (gas) | 60% |
| Combined cycle gas | 74% |
| Nuclear | 95% |

Three things stand out.

**First, a 4-hour battery is already credited more than a solar farm.** At 50% versus 8-11%, storage is the highest-value new-build resource per installed MW in the market. That is the strongest argument for pairing rather than pure solar.

**Second, the duration curve is not smooth.** Going from 4 to 6 hours buys 8 points (about 4 points per added hour). Going from 6 to 8 hours buys only 4 points (2 per hour). Going from 8 to 10 hours buys 10 points (5 per hour). The step-up at the long end reflects that PJM's risk hours in extreme weather extend well past eight hours - once you cover the first block, the marginal hour is worth more again, not less.

**Third, and least intuitive: capacity revenue per dollar of capex still favours shorter duration.** Run the arithmetic at the 2026/27 price:

- 4-hour: 0.50 x 365 x $329.17 = about **$60,100/MW-year**
- 8-hour: 0.62 x 365 x $329.17 = about **$74,500/MW-year**

Doubling the energy capacity raises capacity revenue by only ~24%, while the energy portion of capex roughly doubles. On capacity revenue alone, 8-hour does not pay for itself in PJM today. The 8-hour case rests on energy arbitrage over longer peak windows, on the trajectory of 4-hour ELCC as the fleet grows, and on markets where duration is a hard eligibility threshold rather than a multiplier.

## Four Market Designs, Four Different Risks

The same physics gets wrapped in very different rules. For a developer, the rulebook matters as much as the physics.

| Market | Mechanism | Storage accreditation | What it means for you |
| --- | --- | --- | --- |
| PJM | Centralised capacity auction (BRA), 3 years forward | Marginal ELCC class rating (50% at 4h) | Revenue is contractual and predictable, but you are paid on accredited MW, not nameplate |
| MISO | Seasonal Planning Resource Auction | 95% administrative credit for 4h today; **DLOL** method from 2028/29, expected 50-65% | A cliff is coming. Underwriting on 95% is dangerous beyond 2028 |
| CAISO | No central auction; bilateral Resource Adequacy with LSEs | **Slice-of-Day**: must cover gross load hour by hour on the worst day of each month | Duration is tested directly. You must also prove you can recharge in the preceding hours |
| ERCOT | Energy-only | No capacity payment at all | Entire case rests on energy and ancillary spreads; capacity revenue is zero |
| GB / Germany | Capacity Market auctions with derating factors | Technology-specific derating; Germany's first centralised CM runs three tranches from 2026, delivery from 2031 | Derating methodology is still being written - model 40-65% for 4h, or as low as 13% under Poland's flat approach |

The MISO case deserves emphasis because it is the clearest example of accreditation risk in the US market. A 4-hour system credited at 95% of nameplate today will, under the Direct Loss of Load method first used in planning year 2028/29, likely settle somewhere between 50% and 65%. That is a 30-45% revenue haircut on the capacity line item, arriving on a known schedule. If your financial model does not have that step-down built into it, it is not a model - it is a hope.

CAISO's Slice-of-Day framework is the most physically honest construct in the market, and the hardest to game. Instead of a single monthly number, each load-serving entity must demonstrate it can cover its own load profile in all 24 hours of the worst day of each month. For storage this tests two things simultaneously: can you discharge in the risk hours, and can you charge in the hours before them. A system that is fully cycled by 19:00 is worthless in the 21:00 hour no matter how many megawatt-hours it nominally holds.

## Where Accreditation Is Actually Lost

Between the class rating and the payment sits a set of engineering realities that erode accredited capacity faster than most owners expect. In rough order of impact:

1. **Duration versus risk-window mismatch.** A 2-hour system in a market whose stress events run six hours is not a 4-hour system with half the credit - it is a resource that runs out mid-event and exposes you to non-performance charges.
2. **Degradation versus a fixed rating.** Accreditations are typically reset annually, but many offtake and financing documents lock in a capacity figure at COD. If the augmentation plan lags the fade curve, you are contracted to deliver MW you no longer have.
3. **Round-trip efficiency and recharge feasibility.** AC-side round-trip efficiency sets how much energy you must buy to put back what you sold. At 85% AC-AC, every 4 MWh discharged needs ~4.7 MWh of charging, and the charging window has to physically exist.
4. **Forced outage rate.** Unforced capacity equals installed capacity adjusted for equivalent forced outage rate. Auxiliary systems - HVAC, fire suppression, MV transformers - drive this number more than cells do.
5. **Hybrid and co-located rules.** PJM assigns no class rating to Combination Resources; those get a resource-specific ELCC study. Co-locating with solar can be accretive or destructive depending on the DC/AC ratio and the shared interconnection limit.
6. **Telemetry and dispatch compliance.** A resource that cannot accept and confirm ISO setpoints within the required latency is a resource that will be assessed, not paid.

## Non-Performance Is the Other Half of the Trade

Capacity revenue is a two-sided contract. In PJM, Capacity Performance rules impose non-performance charges during Performance Assessment Hours. A 4-hour battery that has already committed its energy to the day-ahead market and is empty at hour four of a six-hour heat event pays the difference - at the same penalty rate that applies to a gas unit that failed to start.

The operational implication is straightforward and frequently ignored: **reserve state of charge is an asset with a price**. The optimal strategy is not to cycle to the floor every day. It is to hold a reserved SOC band through forecast stress windows and price that reservation into your day-ahead offers. This is a dispatch and EMS configuration question, not a market question, and it should be specified at procurement time.

## Procurement Decisions That Protect Accredited Capacity

Accreditation is set by rules you cannot control and earned by hardware you can. Six specification items do most of the work:

| Specification item | Why it drives accreditation | What to demand |
| --- | --- | --- |
| Sustained discharge test | Proves duration at rated AC power, not just energy content | Witnessed test at the point of connection, at least 2 full cycles, at design ambient temperature |
| AC-side round-trip efficiency | Determines recharge energy and window feasibility | Guaranteed AC-AC figure at the contracted C-rate, with the test protocol attached to the contract |
| Capacity retention curve | Sets year-N accredited MW | Annual retention table to year 15 or 20, with the augmentation trigger defined in MWh not percent |
| Augmentation terms | Restores lost accredited capacity | Pre-agreed capex formula, trigger at 80% of nameplate, lead time committed |
| Thermal derating data | High ambient hours coincide with high-value hours | Derating curve at 40C and 45C ambient, plus the HVAC redundancy configuration |
| Telemetry and control map | Enables compliant dispatch | IEEE 2030.5 or DNP3 point list, setpoint latency, and a documented fallback mode |

The thermal point is worth dwelling on. Stress events in most markets happen on the hottest days of the year. A container rated at 100% power at 25C that delivers 0.90 p.u. at 45C has an accredited value that is 10% lower than its datasheet suggests - and that is before any degradation is considered. Ask for the derating curve, not the headline number.

For distributed portfolios where capacity is aggregated rather than sold as a single grid-scale block, the same logic applies at smaller scale. Our [C&I battery cabinets](/products/ci-battery-cabinets) are specified with witnessed AC-side discharge tests and pre-agreed augmentation formulas precisely because aggregated capacity resources live or die on verifiable, repeatable performance at the point of connection.

For grid-scale blocks of 1-5 MW and above, the [grid-scale energy storage systems](/products/energy-storage-system) are configured with the thermal redundancy and telemetry point lists that ISO dispatch interfaces actually require - DNP3 and IEEE 2030.5 maps, setpoint latency under one second, and documented fallback behaviour.

## The Underwriting Discipline

Three numbers decide whether a storage project's capacity line is real:

- **The accreditation factor at your duration, under the methodology that applies in your delivery year** - not the methodology in force today.
- **The degradation curve between now and the end of the capacity contract** - and whether the augmentation schedule closes the gap.
- **The penalty exposure if you under-deliver during stress events** - which is a function of reserved SOC policy, not nameplate.

Get these three right and capacity revenue becomes the most bankable part of the stack, which is exactly why it supports better debt terms than merchant arbitrage. Get them wrong and you have under-written a project against a number that no market ever agreed to pay.

---

**Planning a capacity market or resource adequacy submission?** Our engineering team can model accredited capacity for your specific duration, market and ambient profile, and provide the witnessed test documentation that regulators and lenders require. [Talk to our BESS engineering team](/contact) or download the technical specification pack for our grid-scale and C&I platforms.

---
## FULL BODY (ZH)

在国内做储能项目，很多人算收益的时候习惯用"装机容量 × 容量补偿单价"。但在真正成熟的电力市场里，这个算法几乎一定是错的——一座 100MW 的电池电站，容量市场可能只承认它 50MW。

这个差额不是会计上的小调整，它往往是项目 IRR 从 9% 掉到 7% 的原因。理解折算规则怎么定、哪些设计决策能改变折算结果，是现在储能开发最值钱的一项能力。

## 两条方向相反的曲线

2026/27 交付年度，PJM 容量拍卖（BRA）在全区域统一出清在 FERC 批准的价格上限 **329.17 美元/MW-日**，比上一年度的 269.92 美元高出约 22%，是 2024/25 年度的近十倍。该交付年度的容量总成本估算超过 **161 亿美元**。

与此同时，PJM 的容量核定改革在削减电池的折算系数。在边际 **ELCC（有效载荷能力）** 方法下，4 小时储能系统的类别核定系数同比再降 5 个百分点，落到 **50%**。

一边是每 MW 容量的价格在快速上涨，一边是每 MW 装机能换到的核定容量在下降。用铭牌容量做财务模型的项目，收益被系统性高估了。

## 决定收入的 ELCC 类别系数

PJM 按技术类别发布统一核定系数，来源是各类资源在系统真正缺电的那些小时里的实际表现。2026/27 年度数据如下：

| 资源类别 | ELCC 类别核定系数（2026/27 BRA） |
| --- | --- |
| 4 小时储能 | 50% |
| 6 小时储能 | 58% |
| 8 小时储能 | 62% |
| 10 小时储能 | 72% |
| 固定支架光伏 | 8% |
| 跟踪支架光伏 | 11% |
| 陆上风电 | 41% |
| 燃气单循环 | 60% |
| 燃气联合循环 | 74% |
| 核电 | 95% |

三点值得注意。

**第一，4 小时电池的核定系数已经是光伏电站的 5 倍以上。** 50% 对 8%–11%，说明在新增装机里，储能的单位容量价值最高。这是"配储优于纯光伏"最硬的论据。

**第二，时长曲线并不平滑。** 4 小时到 6 小时，系数从 50% 升到 58%，每增加 1 小时值 4 个百分点；6 小时到 8 小时只升 4 个百分点，每小时只值 2 个百分点；而 8 小时到 10 小时又升 10 个百分点，每小时回到 5 个百分点。长端反弹的原因是，极端天气下的缺电时段会拖到 8 小时以后——把前一段覆盖掉之后，边际那一小时的定价权反而回升。

**第三，最反直觉的一点：按单位投资算，容量收入仍然偏向短时长。** 用上面的价格算一遍：

- 4 小时：0.50 × 365 × 329.17 ≈ **6.0 万美元/MW-年**
- 8 小时：0.62 × 365 × 329.17 ≈ **7.5 万美元/MW-年**

能量容量翻倍，容量收入只涨约 24%，而能量部分的投资接近翻倍。所以在 PJM 当下的价格水平上，光靠容量收入，8 小时算不过账。8 小时的真实理由在于：更长的峰段可以吃到更多现货价差；随着电池装机量上升，4 小时的 ELCC 会继续往下走；以及在部分市场里时长是"准入门槛"而不是"乘数"。

## 四种市场设计，四种不同的风险

同样的物理特性，被装进完全不同的规则里。对开发商来说，规则书和物理特性一样重要。

| 市场 | 机制 | 储能核定方式 | 对你的含义 |
| --- | --- | --- | --- |
| PJM | 集中容量拍卖，提前 3 年 | 边际 ELCC 类别系数（4 小时 50%） | 收入可预测、可融资，但按核定 MW 结算，不按铭牌 |
| MISO | 季节性资源充裕度拍卖 | 目前 4 小时给 95% 行政核定；2028/29 起改用 **DLOL** 方法，预期降到 50%–65% | 悬崖式下调已排上日程，按 95% 做 2028 年后的测算很危险 |
| CAISO | 无集中拍卖，负荷服务主体双边采购资源充裕度 | **Slice-of-Day**：须逐小时覆盖每月最差日的负荷曲线 | 时长被直接检验，还必须证明风险时段之前能充上电 |
| ERCOT | 纯能量市场 | 没有容量收入 | 收益全靠现货与辅助服务价差，容量收入为零 |
| 英国 / 德国 | 容量市场拍卖，按技术折减系数 | 分技术折减；德国 2026 年起分三批招标，2031 年起交付 | 折减方法仍在制定中，4 小时按 40%–65% 建模，最差情形参考波兰的 13% 统一值 |

MISO 的例子最值得反复看。今天 4 小时系统按铭牌 95% 核定，2028/29 规划年起改用直接失负荷（DLOL）方法后，业内普遍预期落在 50%–65%。这是容量收入项上一次 30%–45% 的削减，而且时间表是公开的。财务模型里如果没有这个台阶，那它不叫模型。

CAISO 的 Slice-of-Day 是这套体系里最"较真"的一种，也最难取巧。它不看你月度一个总数，而是要求每个负荷服务主体证明自己能在每月最差日的全部 24 小时里覆盖自身负荷曲线。对储能来说，这同时在考两件事：风险时段能不能放电，以及之前那几个小时能不能充上电。一个晚上 7 点就把电量放光的系统，无论标称多少 MWh，在 21 点那个小时的价值都是零。

## 核定容量到底丢在哪里

从类别系数到实际到账，中间隔着一串工程现实，它们的侵蚀速度通常比业主预期更快。按影响大小排序：

1. **时长与缺电窗口不匹配。** 在缺电事件持续 6 小时的市场里，2 小时系统不是"系数打对折的 4 小时系统"，而是一个会在事件中途没电、并因此触发考核的资源。
2. **衰减曲线与固定核定值脱节。** 核定系数每年重算，但很多购电协议和融资文件把容量数字锁定在投产时点。扩容计划如果跟不上衰减，你就是在按合同交付一个已经不存在的 MW 数。
3. **往返效率与充电可行性。** 交流侧往返效率决定你要买回多少电。交流侧 85% 意味着每放出 4 MWh 需要充入约 4.7 MWh，而且那个充电窗口必须真实存在。
4. **强迫停运率。** 非强迫容量要在装机容量上按等效强迫停运率扣减。真正拉低这个数字的往往不是电芯，而是暖通、消防和升压变压器这些辅助系统。
5. **混合与共址规则。** PJM 对组合资源不给类别系数，要做资源专项 ELCC 研究。和光伏共址可能是加分也可能是减分，取决于直流交流比和共享的并网点容量。
6. **通信与调度合规。** 不能在规定时延内接收并确认调度指令的资源，会被考核而不是被结算。

## 考核是这笔交易的另一半

容量收入是双向合同。在 PJM 的容量性能（Capacity Performance）规则下，考核时段未履约要付非履约费用。一块 4 小时电池如果已经把电量卖进了日前市场，在持续 6 小时的高温事件里到第 4 小时就空了，它要按燃气机组启动失败的同一费率赔钱。

运营含义很直接，也常被忽略：**预留的 SOC 是有价格的资产**。最优策略不是每天把电量打到下限，而是在预测的压力窗口内保留一段 SOC 储备，并把这段储备的代价打进日前报价里。这是 EMS 调度配置问题，不是市场问题，所以应该在采购阶段就写进技术规格。

## 能守住核定容量的采购决策

系数由你无法改变的规则决定，但履约能力由你能选的硬件决定。六个规格项承担了大部分工作：

| 规格项 | 为什么影响核定 | 应该怎么要求 |
| --- | --- | --- |
| 持续放电测试 | 证明额定交流功率下的时长，而不只是能量总量 | 并网点见证测试，至少 2 个完整循环，在设计环境温度下进行 |
| 交流侧往返效率 | 决定充电电量与窗口可行性 | 按合同倍率保证交流-交流数值，测试协议作为合同附件 |
| 容量保持曲线 | 决定第 N 年的核定 MW | 提供到第 15 或 20 年的逐年容量保持表，扩容触发条件用 MWh 而非百分比定义 |
| 扩容条款 | 恢复已损失的核定容量 | 预先约定单位造价公式，80% 铭牌触发，交付周期写入合同 |
| 高温降额数据 | 高价值时段往往就是高温时段 | 要求 40℃ 与 45℃ 环境温度下的降额曲线，以及暖通冗余配置 |
| 通信点表与调度接口 | 保证可合规调度 | IEEE 2030.5 或 DNP3 点表、设点响应时延、明确的后备运行模式 |

高温这一项值得多说一句。多数市场的缺电事件都发生在全年最热的那几天。一台在 25℃ 标称 100% 功率、在 45℃ 只能出 0.90 标幺的集装箱，其真实核定价值比数据手册低 10%——而这还没算衰减。所以要看降额曲线，不要只看标题参数。

对于以聚合方式参与容量市场、而不是作为单一电网级资产出售的分布式组合，这套逻辑在小尺度上同样成立。我们的 [工商业储能柜](/products/ci-battery-cabinets) 之所以把并网点见证放电测试和预设扩容公式写进标准配置，就是因为聚合型容量资源的成败完全取决于并网点上可验证、可复现的性能。

对于 1MW–5MW 及以上的电网级项目，[电网级储能系统](/products/energy-storage-system) 按调度接口的真实要求配置了暖通冗余和完整通信点表——DNP3 与 IEEE 2030.5 点表、亚秒级设点响应、以及有文档记录的后备行为。

## 三条必须钉死的测算纪律

判断一个项目的容量收入项是不是真的，只看三个数：

- **你的时长在"适用交付年度"方法学下的核定系数**——不是今天生效的那一版。
- **从现在到容量合同期末的衰减曲线**——以及扩容计划能否补上差额。
- **压力事件下未履约的考核敞口**——它取决于预留 SOC 策略，不取决于铭牌。

这三条算对了，容量收入会成为整个收益结构里最可融资的部分，融资条件也优于纯市场化套利。算错了，你就是按一个市场从未承诺过的数字给项目做了测算。

---

**正在准备容量市场或资源充裕度申报？** 我们的工程团队可以针对你的时长、目标市场和当地环境温度，测算核定容量，并提供监管机构与融资方要求的见证测试文件。[联系我们的储能工程团队](/contact)，或下载电网级与工商业平台的技术规格包。

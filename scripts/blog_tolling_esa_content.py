# -*- coding: utf-8 -*-
"""Content for: BESS tolling agreements / storage-as-a-service contract structures (2026-11-11)."""

SLUG = "bess-tolling-agreement-storage-as-a-service-models"
DATE = "2026-11-11"
READ_TIME = 11
TAGS = ["BESS", "Energy Storage", "PPA", "Project Finance", "Commercial Models"]

EN_CATEGORY = "Commercial & Contracts"
EN_TITLE = "BESS Tolling Agreements vs Storage-as-a-Service: Which Contract Structure Maximises Battery Project Value in 2026"
EN_DESC = (
    "Battery projects are priced by their contracts, not their containers. A practical comparison of tolling "
    "agreements, capacity PPAs, storage-as-a-service and shared-savings models, with 2026 pricing benchmarks "
    "from India, PJM, the UK and China, the seven clauses that decide bankability, and what lenders underwrite."
)

EN_BODY = r"""**A battery is a commodity in 2026. The contract around it is not.** A 100 MW / 200 MWh LFP system costs roughly half what it did in 2023, yet two identical assets on the same grid can deliver returns 15 percentage points apart. The gap is almost never the cells — it is who controls dispatch, who absorbs degradation, and how the revenue is nailed down on paper.

This guide compares the six commercial structures used to monetise BESS capacity, benchmarks what each actually pays in 2026, and lists the clauses that decide whether a project clears its debt.

## Six ways to monetise the same asset

| Structure | Who owns | Who dispatches | Degradation risk | Typical tenor | Price basis |
|---|---|---|---|---|---|
| Direct purchase | Buyer | Buyer | Buyer | — | Capex $/kWh |
| Capital or operating lease | Lessor | Buyer | Buyer (usually) | 5-10 yr | $/kW-month |
| Shared savings / ESCO | Developer | Developer | Developer | 8-15 yr | % of verified savings |
| Storage-as-a-service | Provider | Provider | Provider | 10-20 yr | $/kWh delivered |
| Tolling agreement | Owner keeps title | Offtaker | Owner, capped | 7-15 yr | $/MW-month |
| Capacity PPA / BESPA | Developer | Utility or offtaker | Developer | 10-15 yr | $/MW-month |

The dividing line is **dispatch control**. Whoever decides when the battery charges owns the market risk; whoever owns the asset carries the physical risk of wearing it out. Most disputes in this industry begin because a contract handed those two risks to different parties without saying so.

## How a toll is priced — and why it looks nothing like a solar PPA

A BESS toll has **no fuel leg**, so nearly all of its value sits in the fixed capacity payment, quoted in **$/kW-month**. That payment is benchmarked against what the asset could earn in the local capacity market, then adjusted for availability obligations.

Three clauses replace the heat-rate curve that governs a gas toll:

1. **Availability guarantee** — typically 98%+ of contracted hours, backed by liquidated damages.
2. **Annual cycle cap** — an offtaker chasing arbitrage will cycle harder than the owner's degradation model allows; the cap is the owner's only protection.
3. **Minimum state of health** — a guaranteed usable-capacity floor at each anniversary, often 70% at year 10.

In exchange, the offtaker keeps the revenue stack: arbitrage, ancillary services and capacity payments where storage qualifies. Some structures split that stack — the owner retains a share above an agreed threshold — but the baseline transfers both upside and downside.

## What the market actually pays in 2026

| Market / deal | Structure | Price | Tenor |
|---|---|---|---|
| India — MSEDCL, 500 MW/1,000 MWh | BESPA | INR 238,000/MW-month (~US$2,485) | 15 yr |
| India — MSEDCL, 400 MW/800 MWh | BESPA | INR 240,000/MW-month (~US$2,507) | 15 yr |
| PJM 2026/27 capacity auction | Reference ceiling | US$329.17/MW-day (~US$10,000/MW-month) | 1 yr |
| UK — Bramley, 100 MW/331 MWh | Tolling (Shell Energy Europe) | Undisclosed | 7 yr |
| Australia — Bairnsdale, 50 MW/200 MWh | Corporate toll (Amazon, Sep 2026) | Undisclosed | Multi-year |
| China — Jiangsu capacity leasing | Capacity lease | RMB 120-160/kW-year (~US$1.5-2/kW-month) | 3-5 yr |
| China — Ningxia capacity leasing | Capacity lease | ~RMB 60/kW-year | 1-2 yr |

Two lessons fall out of that table. First, **Indian BESPAs are now the clearest public benchmark for a bankable storage toll** — roughly double what a capacity-only PJM contract implies, because the Indian structure bundles availability with firm dispatch. Second, **capacity leasing alone has stopped being a business model in China**: after Document 136 ended mandatory storage co-location with renewables, Jiangsu lease rates fell from RMB 200-400 to RMB 120-160 per kW-year, and several provinces now sign one-year terms. Revenue there has migrated to spot arbitrage plus ancillary services.

## Seven clauses that decide bankability

1. **How availability is measured.** Hourly, 15-minute, or block-level? A 15-minute average can hide a two-hour outage that never trips the meter.
2. **Cycle counting method.** Full-equivalent cycles or throughput MWh? A 0.5-cycle definition can double allowable throughput on paper.
3. **SoH test protocol.** Who runs the capacity test, at what C-rate and temperature, and does the result bind the OEM warranty or the offtaker guarantee?
4. **Augmentation funding.** If the battery fades below the contracted floor in year 12, who pays — and does the owner get a rate adjustment?
5. **Charging energy and grid charges.** Whose account pays for charging electricity, transmission use and demand charges? This single line item can swing NPV by 10-20%.
6. **Change-in-law and tariff reform.** Spot price caps, capacity mechanism redesigns and subsidy phase-outs have repriced storage assets inside a single contract year in several markets.
7. **Termination value.** A toll that ends at year 7 against 15-year debt leaves a refinancing tail that lenders will price in.

## Behind the meter, the baseline is the deal

For C&I projects the vocabulary changes but the trap does not. **Shared savings and ESCO structures** typically hand the developer **20-40% of verified savings**, while storage-as-a-service and demand-charge PPAs instead charge **90-95% of realised savings** as a fixed monthly fee. Both depend entirely on the **baseline methodology** — CBL, IPMVP Option C regression, or a fixed kW ratchet.

Insist on three protections: a written baseline formula, an explicit treatment for tariff changes and load growth, and a measurement-and-verification clause with an independent reviewer. Without them, a site that adds a production line can be told it "saved" less than it did.

## What lenders and offtakers underwrite

| Revenue profile | Senior debt sizing | Equity IRR target |
|---|---|---|
| Long-term tolling agreement | 1.20x P90 DSCR | 9-11% |
| Capacity contract | 1.25x P90 DSCR | 11-13% |
| Hybrid toll with floor | 1.30x P50 / 1.10x P90 | 13-15% |
| Merchant only | 1.40x P50 DSCR | 15-18% |

The arithmetic is brutal and instructive. Take 100 MW at US$12,000/MW-month, US$2.4 million annual cash operating cost, a 1.50x DSCR and 7% debt over 15 years: CFADS is US$12.0 million, maximum annual debt service US$8.0 million, and debt capacity about **US$72.9 million**. Drop the toll to US$10,000/MW-month and debt capacity falls to roughly **US$58.3 million** — a 17% price cut costs 20% of the capital stack. Merchant-only projects generally need **300-500 basis points more equity return** to pass the same committee.

## What the hardware must prove to earn that contract

A toll or service contract converts an equipment specification into a contractual liability, so every guarantee you sign has to be backed by the system:

- **Availability** needs redundant auxiliary power, a spare-module strategy and remote diagnostics with a documented MTTR.
- **Round-trip efficiency** of 88-92% AC-to-AC is the realistic LFP band; quoting 95% invites a liquidated-damages claim.
- **Cycle life of 6,000+ cycles at 80% DoD** must be traceable to cell datasheets, not marketing decks.
- **Capacity verification** at commissioning per IEC 62933-2-1, repeated annually with the same protocol.
- **Certification** — IEC 62619, UN38.3, GB/T 36276-2023, IEC 60730, plus UL 9540 / 9540A for US-sited projects.

Our [C&I battery cabinets](/products/ci-battery-cabinets) and [MW-scale BESS containers](/products/energy-storage-system) ship with the factory test records, dispatch API and one-minute data logging that M&V reviewers ask for — which is what makes them financeable rather than merely cheap.

## Signing checklist

1. Confirm dispatch control, revenue ownership and degradation liability sit with the party able to manage them.
2. Benchmark your toll against both a capacity-market equivalent and a recent public tender in the same region.
3. Define availability at 15-minute granularity, with an explicit exclusion list.
4. Cap cycles per year and state the counting method.
5. Fix the SoH test protocol and tie it to the OEM warranty.
6. Fund augmentation explicitly — a reserve account or a rate step-up.
7. Allocate charging energy, grid charges and curtailment risk in writing.
8. Model the post-contract tail, not only the contracted years.

## The bottom line

Battery cost is no longer the constraint on project economics; contract design is. A well-drafted toll or service agreement can lift debt capacity by 20% on identical hardware, and a careless one can turn a 12% IRR into a dispute. Get the commercial architecture right before the argument about cell format starts.

Ready to structure a project? [Send our engineering team](/contact) your load profile or tender documents and we will return a sizing and dispatch study alongside the technical datasheets your offtaker and lender will ask for.
"""

ZH_CATEGORY = "商业模式与合同"
ZH_TITLE = "储能项目的钱不在电芯里而在合同里：2026 年六种商业模式与七个关键条款"
ZH_DESC = (
    "设备降价了，项目却更难算账——2026 年储能真正的变量在收入端的合同结构。本文对比直购、租赁、"
    "合同能源管理分成、储能即服务、容量租赁与容量采购协议（BESPA/容量 PPA）六种模式，"
    "给出印度 2485 美元/MW·月、PJM 329.17 美元/MW·日、江苏 120–160 元/kW·年等公开基准，"
    "并拆解决定项目能否过会的七个条款。"
)

ZH_BODY = r"""**2026 年，电芯已经是标准件，合同才是产品。** 同样一套 100MW/200MWh 的磷酸铁锂系统，造价只有 2023 年的一半左右；但把两台一模一样的设备放在同一个省份，全投资收益率能差出 15 个百分点。差距几乎从不在电芯上——而在于谁掌握充放电调度权、谁承担衰减、收益怎么写进合同。

本文对比储能项目六种主流商业模式，给出 2026 年可公开引用的价格基准，并拆解决定项目能否过会的七个条款。

## 同一套资产，六种变现方式

| 模式 | 资产归属 | 调度权 | 衰减风险 | 典型期限 | 计价方式 |
|---|---|---|---|---|---|
| 业主直购 | 业主 | 业主 | 业主 | — | 元/Wh（一次性） |
| 融资租赁／经营租赁 | 出租方 | 业主 | 业主（多数） | 5–10 年 | 元/kW·月 |
| 合同能源管理（EMC）分成 | 投资方 | 投资方 | 投资方 | 8–15 年 | 节省电费分成比例 |
| 储能即服务（SaaS/ESA） | 服务商 | 服务商 | 服务商 | 10–20 年 | 元/kWh 交付电量 |
| 容量租赁／共享储能 | 电站业主 | 承租方或电网 | 电站业主 | 1–5 年 | 元/kW·年 |
| 容量采购协议（BESPA） | 开发商 | 电网/购方 | 开发商 | 10–15 年 | 元/kW·月 |

分界线只有一条：**调度权归谁**。谁决定什么时候充、什么时候放，谁就承担市场风险；谁持有资产，谁就承担把设备"用旧"的物理风险。行业里绝大多数纠纷，都源于合同把这两种风险分给了两方，却没有写清楚边界。

## 国内的三条腿：容量租赁正在退潮

136 号文取消新能源强制配储之后，容量租赁从"保底收入"退化为"边际补充"。公开可查的变化很直接：

- **江苏**：成交价从 2024 年的 200–400 元/kW·年回落到当前主流的 **120–160 元/kW·年**，部分合同只签 3–5 年。
- **宁夏**：从 2022 年的 320 元/kW·年降至约 **60 元/kW·年**，租期缩短到 1–2 年。
- **山西**：分化极大，怀仁项目签约均价 485 元/kW·年、锁定三年；原平 2026 年指导价 310 元/kW·年，同比下调 8%。

容量电价这条腿同样要打折。114 号文建立的折算规则是"满功率连续放电时长 ÷ 全年最长净负荷高峰持续时长"，2 小时系统普遍只能拿到名义标准的三分之一。甘肃名义 330 元/kW·年、河北 100 元/kW·年（后上调至 150 元），折算后实际到手差距远小于名义差距。

于是一个 200MW/400MWh 项目的账就算得很清楚：容量租赁从 250 元/kW·年跌到 100 元，即便按七成出租率估算，**一年少收也在 2000 万元以上**；而碳酸锂从 15 万跌到 9 万省下的约 2600 万元，是一次性的。一次性红利撑不过一年半。真正决定收益的是现货价差（江苏峰谷价差普遍 0.7–1.1 元/kWh）与辅助服务，以及选址所在的机制环境。

## 海外的容量付费：tolling 与 BESPA 怎么定价

海外的 tolling agreement（代加工/容量收费协议）与国内的容量租赁逻辑相近，但有两个关键区别：一是**没有燃料腿**，因此价值几乎全部落在固定容量费 **（美元/MW·月）**；二是合同把**可用率**写成了硬指标。

| 市场／交易 | 结构 | 价格 | 期限 |
|---|---|---|---|
| 印度 MSEDCL 500MW/1000MWh | BESPA | 238,000 卢比/MW·月（约 US$2,485） | 15 年 |
| 印度 MSEDCL 400MW/800MWh | BESPA | 240,000 卢比/MW·月（约 US$2,507） | 15 年 |
| PJM 2026/27 容量拍卖 | 参考上限 | US$329.17/MW·日（约 US$10,000/MW·月） | 1 年 |
| 英国 Bramley 100MW/331MWh | Tolling（壳牌能源欧洲） | 未披露 | 7 年 |
| 澳洲 Bairnsdale 50MW/200MWh | 企业 tolling（亚马逊，2026 年 9 月） | 未披露 | 多年 |

结论很清晰：**印度的 BESPA 目前是公开市场中最可比的"可融资储能容量价"**，约为 PJM 纯容量合同隐含水平的两倍，因为它把可用率与刚性调度打包在一起。这也解释了为什么 2026 年亚马逊会用 tolling 而非直接购电的方式锁定 200MWh——它买的是调度权，不是设备。

## 决定项目能否过会的七个条款

1. **可用率的测量口径**。按小时、15 分钟还是按区块？15 分钟均值可以掩盖一次两小时、却始终没触发计量跳闸的停机。
2. **循环次数计算方式**。满等效循环还是吞吐电量（MWh）？把一次循环定义为 0.5 循环，纸面允许吞吐量能翻倍。
3. **SoH 测试协议**。谁来做容量测试、在什么倍率和温度下做、结果绑电芯厂质保还是绑购方保证？
4. **增容（augmentation）由谁出钱**。第 12 年低于合同下限时，业主加装还是投资方掏钱，费率是否随之上调？
5. **充电电量与电网费用**。充电电费、输配电价、需量电费记在谁账上？这一项就能让项目净现值上下浮动 10–20%。
6. **法律变更与电价机制调整**。现货限价、容量机制重构、补贴退坡，在多个市场已经在一个合同年度内就把储能资产重新定价。
7. **终止价值**。7 年期的 tolling 对应 15 年贷款，会留下再融资缺口，贷款方一定会把这个缺口算进价格。

## 工商业侧：基准线就是合同本身

国内的 EMC 分成与海外的 shared savings 是同一套逻辑：投资方通常拿走**经核实的节省电费的 20%–40%**；储能即服务与需量电费 PPA 则反向计价，按月收取**实际节省的 90%–95%** 作为固定服务费。两种结构都完全依赖**基准线方法**——固定基准、IPMVP Option C 回归，或按 kW 定额。

务必争取三条保护：写明基准线计算公式；明确电价调整与负荷增长的处理方式；写入由独立第三方复核的计量与验证（M&V）条款。否则一个新增了产线的工厂，很可能被告知"其实没省那么多"。

## 融资视角：合同直接决定贷款额度

| 收入结构 | 优先债规模 | 资本金 IRR 目标 |
|---|---|---|
| 长期 tolling 协议 | 1.20x P90 DSCR | 9–11% |
| 容量合同 | 1.25x P90 DSCR | 11–13% |
| 带保底的混合 tolling | 1.30x P50 / 1.10x P90 | 13–15% |
| 纯市场化（merchant） | 1.40x P50 DSCR | 15–18% |

算一遍很残酷也很有说服力。100MW、容量费 US$12,000/MW·月、年现金运营成本 US$240 万、1.50x DSCR、7% 利率、15 年摊销：CFADS 为 US$1,200 万，最大年还本付息额 US$800 万，可支撑债务约 **US$7,290 万**。容量费降到 US$10,000/MW·月，可支撑债务掉到约 **US$5,830 万**——价格降 17%，资本结构少 20%。纯市场化项目通常还要求**高出 300–500 个基点**的资本金回报，才能过同样的投委会。

## 设备端要能兑现合同

合同一旦签下，设备参数就变成了法律责任。可用率 98% 需要冗余辅助电源、备件模块化策略和带 MTTR 承诺的远程诊断；**交流侧往返效率 88%–92%** 是磷酸铁锂的现实区间，报 95% 等于主动招来违约金索赔；**80% 放电深度下 6000 次循环**必须能追溯到电芯规格书，而不是宣传册。投运容量测试建议按 IEC 62933-2-1 执行，并在后续年份用同一协议复测。

我们的 [工商业储能柜](/products/ci-battery-cabinets) 与 [MW 级储能集装箱](/products/energy-storage-system) 随机提供出厂测试记录、调度 API 与 1 分钟级数据日志，正是 M&V 与融资尽调要的那几份材料——这决定了系统是"能融资的资产"还是"便宜的设备"。

## 签约前清单

1. 确认调度权、收益归属与衰减责任落在真正能管理它的一方。
2. 用同一区域的容量市场等价价格 + 近期公开招标价双向校准你的容量费。
3. 可用率按 15 分钟粒度定义，并写明免责清单。
4. 设定年度循环上限，并确定计数方法。
5. 固定 SoH 测试协议，并与电芯厂质保挂钩。
6. 明确增容资金来源：准备金账户或费率阶梯上调。
7. 书面分配充电电费、电网费用与限电风险。
8. 测算合同期结束后的"尾巴"，而不只是合同期内。

## 结语

设备成本已经不是项目经济性的约束，合同架构才是。一份写得好的 tolling 或储能服务协议，能在同等硬件上把可支撑债务提高 20%；写得糟，则能把 12% 的 IRR 变成一场仲裁。在争论电芯规格之前，先把商业架构定下来。

准备启动项目？把你的负荷曲线或招标文件[发给我们的工程团队](/contact)，我们会连同你购方与贷款方都会索要的技术资料，一起给出容量配置与调度策略测算。
"""

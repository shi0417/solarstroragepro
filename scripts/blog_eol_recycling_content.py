# -*- coding: utf-8 -*-
"""Content module: BESS end-of-life recycling / EPR / decommissioning guide."""

SLUG = "bess-end-of-life-recycling-decommissioning-guide"
DATE = "2026-11-12"
READ_TIME = 11
TAGS = ["BESS", "Battery Recycling", "EU Battery Regulation", "EPR", "Decommissioning"]

EN = {
    "category": "Industry & Compliance",
    "title": "BESS End-of-Life: Recycling Economics, EPR Obligations and Decommissioning Costs",
    "description": (
        "EU 2023/1542 recycling targets, who legally counts as the producer, LFP black mass "
        "economics, and what decommissioning a container really costs per MWh."
    ),
    "body": """Most battery storage business cases end at year fifteen with a residual value line that reads "salvage: assumed zero." That assumption is no longer safe. Between European producer responsibility rules that came into force in 2025 and an LFP-dominated retirement wave arriving now, end of life has become a specification item rather than an accounting footnote.

## Why end-of-life moved from footnote to line item

Three things changed in 2025 and 2026. The EU Batteries Regulation (EU) 2023/1542 shifted from principle to enforcement: extended producer responsibility for industrial batteries has applied since 18 August 2025, stationary storage is explicitly named as an industrial battery category, and the first hard recycling-efficiency deadline for lithium-based batteries, **65% by 31 December 2025**, has already passed. Second, the first wave of grid-scale systems built between 2011 and 2016 is reaching end of warranty, and their owners are discovering that a 40-tonne container of LFP is not a scrap-metal transaction. Third, LFP now dominates retiring volume, roughly **69%** of batteries leaving service in China, and LFP is precisely the chemistry with the thinnest recycling margin.

## The regulatory clock for a stationary BESS

Stationary systems fall under the "industrial battery" category whenever they exceed 2 kWh, which is every commercial cabinet and container. Obligations phase in on a fixed calendar, not on a project schedule.

| Milestone | Date | What it means for a BESS owner |
|---|---|---|
| Safety requirements for stationary BESS (Art. 12) | 18 Aug 2024 | Thermal propagation, BMS and state-of-health access at point of sale |
| Extended producer responsibility (Ch. VIII) | 18 Aug 2025 | Producer must be registered in each Member State before market placement |
| Recycling efficiency, lithium-based: 65% | 31 Dec 2025 | Measured by average weight across recycler output |
| Carbon footprint declaration, rechargeable industrial | 18 Feb 2026 | Per battery model, per manufacturing plant |
| Digital battery passport | 18 Feb 2027 | QR-accessible record including dismantling and recycling data |
| Material recovery: Co/Cu/Pb/Ni 90%, Li 50% | 31 Dec 2027 | Recycler performance, verifiable by authorities |
| Recycled content documentation | 18 Aug 2028 | Share of recovered Co, Pb, Li, Ni must be documented |
| Minimum recycled content: Co 16%, Pb 85%, Li 6%, Ni 6% | 18 Aug 2031 | Constrains what cell makers can sell into the EU |
| Material recovery: Co/Cu/Pb/Ni 95%, Li 80% | 31 Dec 2031 | Second step-up |

Two details matter commercially. Delegated Regulation (EU) 2025/606, adopted on 4 July 2025, fixes how recycling efficiency and material recovery are calculated and verified; iron, phosphorus and graphite may be counted only optionally, and only until the end of 2029. That matters because LFP cathode mass is mostly iron and phosphorus, so the **calculation method**, not just the process, decides whether a recycler passes. Separately, Article 71(5) required the Commission to assess by 18 August 2026 whether the targets should be revised, with the review focused on lithium-based batteries. The direction of travel is upward.

## The producer question that catches EPCs off guard

The most common compliance failure in BESS projects is not technical. It is a misidentified producer. The producer is the economic operator that first places the battery on the market in a Member State, which can be the manufacturer, the importer, the distributor, or, increasingly, the party importing a container for its own use on a project. Registration is per Member State and cannot be shared across borders. An EPC that imports a container into Poland under a German registration has not complied.

The underlying obligation is not trivial: Article 49 requires producers of industrial batteries to take back waste batteries free of charge, with no requirement that the end user buy a replacement. Most producers discharge this through a collective producer responsibility organisation; Finland, for example, created a dedicated industrial-battery PRO in spring 2026. The fee is based on reported volume, and it is payable whether or not the project ever reaches end of life.

For a buyer the consequence is simple. The supply agreement must name who holds the registration, in which Member States, and who pays the annual fee. If the answer is "our European distributor," ask what happens in year nine when that distributor stops representing the brand.

## The mass balance inside one 20 ft container

Recycling value starts with what is physically in the box. Take a representative 20 ft liquid-cooled LFP container at 5 MWh nameplate, roughly 42 to 46 tonnes gross.

| Fraction | Share of mass | Route | Value driver |
|---|---|---|---|
| LFP cells and modules | 60-65% | Dismantle to black mass | Lithium content only |
| Steel enclosure, racks, frames | 15-20% | Ferrous scrap | Commodity |
| Copper busbars and cabling | 3-5% | Cu scrap | Commodity, high value |
| Aluminium heat exchangers and trays | 3-5% | Al scrap | Commodity |
| BMS, PCS, harness, electronics | 3-5% | WEEE / e-scrap | Small but non-zero |
| Coolant, plastics, insulation | 5-8% | Thermal treatment | Cost, not value |

Copper and aluminium are what make the first phone call to a scrapyard sound attractive. They are also the smallest part of the problem. The cells are 60 to 65% of the mass, and they carry the compliance risk, the transport restrictions and the only material that is genuinely hard to recover.

## Why LFP is the hard case

One tonne of retired LFP cells yields roughly **30 to 35 kg of lithium carbonate equivalent**. Through 2026 the lithium carbonate market ran from about RMB 65,000 per tonne in mid-2025, to a spike near RMB 200,000 per tonne in May 2026, back to roughly RMB 101,000 per tonne in October. At those prices the contained lithium is worth between RMB 3,000 and RMB 6,000 per tonne of cells. Hydrometallurgical regeneration of one tonne of lithium carbonate costs RMB 80,000 to 120,000, which puts the break-even for LFP processing at roughly **RMB 80,000 to 100,000 per tonne** of lithium carbonate. Below that line, recyclers are running a compliance service, not a business.

The gap is structural. Hydrometallurgical NMC recycling runs at about 10% gross margin; LFP cathode powder runs under 4%. Yet LFP is roughly 69% of retiring volume. That mismatch is why gate fees exist.

| Black mass grade (China, Nov 2026) | Price, RMB per tonne |
|---|---|
| LFP black mass, Li under 2.5% | 8,465 |
| LFP black mass, Li 3.8% and above | 15,580 |
| NMC black mass, Ni 15%+, Co 8%+ | 33,550 |
| NMC black mass, Ni 25%+, Co 8%+, Li 6.5%+ | 53,450 |
| LCO black mass, 50-55% Co | 100,700 |

Note the spread within LFP alone: high-lithium black mass is worth nearly twice low-lithium black mass. That is a design signal, not just a market quote.

## Design decisions that decide your salvage value

Four specification choices move the end-of-life number more than any negotiation at the scrapyard.

1. **State of charge at decommissioning.** Ship at 30% SOC or lower. Above that threshold, lithium cells fall into stricter dangerous-goods treatment and higher freight cost.
2. **Module-level disassembly.** Racks welded or potted into the enclosure cannot be economically separated, so the whole assembly is processed as mixed scrap at a fraction of the value.
3. **BMS data retention.** A state-of-health record with cycle history is the difference between a repurposing buyer and a shredder. The Regulation already requires state-of-health parameters to be readable from the BMS by the owner. Use them.
4. **Coolant and suppression chemistry.** Some agents and glycol mixes must be drained and disposed of as hazardous waste, which is a cost line per container, not per project.

## What decommissioning actually costs

Planning ranges for a containerised system in a mature market, per MWh of nameplate capacity, excluding residual credit. These are budget numbers, not quotes.

| Cost bucket | Range | Notes |
|---|---|---|
| Isolation, LOTO, HV disconnection | $1,500-4,000 per site | Licensed electrician, utility coordination |
| Mechanical dismantling and loading | $6,000-14,000 per MWh | Crane, rigging, module handling |
| Dangerous-goods transport | $3,000-9,000 per MWh | ADR class 9 and UN38.3 documentation |
| Recycling gate fee (LFP) | $0-12,000 per MWh | Can go negative in high-lithium-price years |
| EPR / PRO fee (EU) | about $1-3 per kWh placed, annual | Varies by Member State and PRO |
| Site reinstatement | $2,000-8,000 per MWh | Foundations, cabling, fencing, landscaping |
| Contingency | 15-25% | Failed modules, contaminated coolant, permit delay |

For a 20 MWh C&I installation that lands somewhere between **$300,000 and $700,000** over a two-to-four month campaign, a number that almost never appears in the original business case.

## Clauses to put in the supply agreement now

- Named producer of record per country, with registration numbers attached as an appendix.
- A stated end-of-life service: who dismantles, who transports, who pays the gate fee, and whether the price is fixed or indexed.
- A take-back price formula referenced to a published black mass index, not a verbal "we will handle it."
- State-of-health data export rights in a machine-readable format, for the full service life.
- A declaration of cell chemistry, lithium content per module, and expected mass at delivery, auditable against shipping documents.
- A repurposing option with the residual-value sharing mechanism spelled out.
- Governing law, plus a decommissioning bond or parent guarantee for projects above 10 MWh.

## The supplier test most buyers skip

Ask for the end-of-life package as a document, not a promise. A supplier that has done this before can produce three things within a week: a mass balance for the exact container model, the name and location of the recycler that will take the cells, and the producer registration numbers for each market you sell into.

That is the standard we hold our own equipment to. Our [C&I battery cabinets](/products/ci-battery-cabinets) ship with a per-model mass balance and a take-back annex, and our [grid-scale energy storage systems](/products/energy-storage-system) include a decommissioning plan with the recycler identified at bid stage rather than in year fifteen. If you are writing an end-of-life clause into a tender and want a second opinion on the numbers, [talk to our engineering team](/contact) and we will send the template we use.
""",
}

ZH = {
    "category": "行业与合规",
    "title": "储能系统退役全指南：回收经济性、EPR 责任与拆解成本",
    "description": (
        "从采购视角拆解储能系统退役：欧盟 2023/1542 回收指标时间表、谁才是法律意义上的生产者、"
        "磷酸铁锂黑粉的真实价格与盈亏平衡，以及每 MWh 拆解成本的实际区间。"
    ),
    "body": """大多数储能项目的财务模型，在第 15 年那一行只写四个字："残值按零"。这个假设现在站不住了。欧盟生产者责任规则已经在 2025 年落地执行，而以磷酸铁锂为主的退役潮正在到来——退役处理已经从会计脚注变成了技术规格的一部分。

## 为什么退役从脚注变成了成本项

2025 到 2026 年发生了三件事。第一，欧盟《电池法规》(EU) 2023/1542 从原则进入执行：工业电池的生产者责任延伸自 2025 年 8 月 18 日起适用，固定式储能被明确归入"工业电池"类别，而且锂基电池的第一个硬性回收效率指标——**2025 年 12 月 31 日前达到 65%**——已经过期考核。第二，2011 至 2016 年建成的第一批电网级项目陆续出保，业主发现一个 40 吨的磷酸铁锂集装箱根本不是废品收购站能处理的事。第三，退役电池的结构已经转向磷酸铁锂，国内退役量中 LFP 占比约 **69%**，而这恰好是回收毛利最薄的那一类化学体系。

## 固定式储能的合规时间表

超过 2 kWh 的固定式储能系统即属于"工业电池"类别，工商业柜和集装箱全部在内。义务按固定日历推进，不跟随项目节奏。

| 节点 | 时间 | 对储能业主的含义 |
|---|---|---|
| 固定式储能安全要求（第 12 条） | 2024-08-18 | 热失控防护、BMS 与健康状态可读取，销售时点生效 |
| 生产者责任延伸（第八章） | 2025-08-18 | 投放市场前须在每个成员国完成生产者注册 |
| 锂基电池回收效率 65% | 2025-12-31 | 按回收企业产出平均重量考核 |
| 可充电工业电池碳足迹声明 | 2026-02-18 | 按电池型号、按生产工厂分别申报 |
| 数字电池护照 | 2027-02-18 | 二维码可查，含拆解与回收数据 |
| 材料回收率：钴铜铅镍 90%、锂 50% | 2027-12-31 | 回收企业实际性能，监管可核查 |
| 再生材料含量文件 | 2028-08-18 | 须记录再生钴、铅、锂、镍比例 |
| 再生材料最低比例：钴 16%、铅 85%、锂 6%、镍 6% | 2031-08-18 | 约束电芯厂能向欧盟销售的产品 |
| 材料回收率：钴铜铅镍 95%、锂 80% | 2031-12-31 | 第二次上调 |

两个细节具有商业含义。2025 年 7 月 4 日通过的授权条例 (EU) 2025/606，规定了回收效率与材料回收率的计算与核查方法，其中铁、磷、石墨**仅在 2029 年底前可选择计入**。这一条很关键，因为 LFP 正极粉料的主要成分就是铁和磷——决定回收企业是否达标的，不只是工艺，还有**计算方法**。另外，法规第 71(5) 条要求欧盟委员会在 2026 年 8 月 18 日前评估是否修订上述指标，评估重点正是锂基电池，方向上只会收紧。

## 一个让 EPC 措手不及的问题：谁是"生产者"

储能项目最常见的合规失误不在技术层面，而在生产者的认定。法规下的生产者，是**在某一成员国首次将电池投放市场**的经济主体——可能是制造商、进口商、经销商，也可能是把集装箱进口用于自身项目的那个主体。注册按成员国逐一办理，不能跨国通用。用德国注册号把集装箱进口到波兰，等于没有注册。

义务本身不轻。第 49 条要求工业电池生产者**免费回收**废旧电池，且不得要求终端用户购买新电池作为前提。多数生产者通过集体生产者责任组织履约——芬兰在 2026 年春季专门成立了工业电池 PRO——但费用按申报投放量计收，无论项目最终是否真的走到退役。

对买方的结论很直接：供货合同必须写明谁持有注册、覆盖哪些成员国、谁承担年度费用。如果对方回答"由我们的欧洲经销商负责"，那就追问一句：第九年这家经销商不再代理这个品牌时怎么办。

## 一个 20 尺集装箱里的质量平衡

回收价值取决于箱子里究竟装了什么。以一台有代表性的 20 尺液冷磷酸铁锂集装箱为例，容量 5 MWh，整机毛重约 42 至 46 吨。

| 组成 | 质量占比 | 去向 | 价值来源 |
|---|---|---|---|
| 电芯与模组 | 60-65% | 拆解制黑粉 | 仅锂含量 |
| 钢制箱体、机架、骨架 | 15-20% | 废钢 | 大宗商品 |
| 铜排与线缆 | 3-5% | 废铜 | 大宗商品，价值高 |
| 铝制换热器、托盘 | 3-5% | 废铝 | 大宗商品 |
| BMS、PCS、线束、电子件 | 3-5% | 电子废弃物 | 金额小但非零 |
| 冷却液、塑料、保温材料 | 5-8% | 焚烧或填埋 | 是成本不是收入 |

铜和铝，是让业主觉得"打个电话给废品站就行"的原因；但它们恰好是问题里最小的那块。电芯占质量的六成以上，承担了全部合规风险、运输限制，以及唯一真正难回收的材料。

## 为什么磷酸铁锂是最难的一类

一吨退役磷酸铁锂电池大约可提取 **30 至 35 公斤碳酸锂当量**。2026 年碳酸锂价格剧烈摆动：2025 年年中约 6.5 万元/吨，2026 年 5 月一度回到 20 万元/吨，10 月又回落到约 10.1 万元/吨。按这个区间，这 30 至 35 公斤锂价值约 3,000 至 6,000 元。而湿法再生一吨碳酸锂的成本在 8 万至 12 万元之间，折算出磷酸铁锂回收的盈亏平衡点大致在**碳酸锂 8 万至 10 万元/吨**。价格击穿这条线时，回收企业做的不是生意，是合规服务。

差距是结构性的：三元电池湿法回收毛利率约 10%，磷酸铁锂正极粉料不足 4%，可退役量里 LFP 却占到近七成。这个错配，就是"处置费"存在的根本原因。

| 黑粉品类（中国，2026 年 11 月） | 价格（元/吨） |
|---|---|
| 磷酸铁锂黑粉，Li 低于 2.5% | 8,465 |
| 磷酸铁锂黑粉，Li 3.8% 以上 | 15,580 |
| 三元黑粉，Ni ≥15%、Co ≥8% | 33,550 |
| 三元黑粉，Ni ≥25%、Co ≥8%、Li ≥6.5% | 53,450 |
| 钴酸锂黑粉，Co 50-55% | 100,700 |

注意磷酸铁锂内部的价差：高锂黑粉的价格接近低锂黑粉的两倍。这不是市场报价问题，而是设计信号。

## 四个决定残值的选型动作

有四项规格决定，比在废品站谈价更能影响退役收益。

1. **退役时的荷电状态。** 运输时 SOC 控制在 30% 以下。高于该阈值，锂电池将适用更严格的危险货物运输规则和更高运费。
2. **模组级可拆性。** 机架如果焊接或灌封在箱体内，经济上无法分离，整机只能按混合废料处理，价值所剩无几。
3. **BMS 数据留存。** 带循环历史的健康状态记录，决定了这台设备是卖给梯次利用方还是直接进破碎机。法规已要求 BMS 中的健康状态参数对所有者可读——用起来。
4. **冷却液与消防药剂。** 部分灭火剂和乙二醇混合液必须按危废抽排处置，这是按台计的成本，不是按项目摊的费用。

## 拆解到底要花多少钱

以下为成熟市场集装箱式系统的预算区间，按铭牌容量每 MWh 计，不含残值抵扣。是预算数字，不是报价。

| 成本项 | 区间 | 说明 |
|---|---|---|
| 隔离、挂牌上锁、高压解列 | 每站点 1,500-4,000 美元 | 持证电工、电网协调 |
| 机械拆解与吊装 | 6,000-14,000 美元/MWh | 吊车、索具、模组转运 |
| 危险货物运输 | 3,000-9,000 美元/MWh | ADR 第 9 类、UN38.3 文件 |
| 回收处置费（LFP） | 0-12,000 美元/MWh | 锂价高位年份可能为负 |
| EPR / PRO 费用（欧盟） | 约 1-3 美元/kWh 投放量/年 | 因成员国与 PRO 而异 |
| 场地恢复 | 2,000-8,000 美元/MWh | 基础、电缆、围栏、绿化 |
| 不可预见费 | 15-25% | 模组失效、冷却液污染、审批延误 |

一个 20 MWh 的工商业项目，整场退役作业历时 2 至 4 个月，总成本落在 **30 万至 70 万美元**区间。这个数字，几乎从不出现在最初的可行性研究里。

## 现在就该写进供货合同的条款

- 逐国明确"登记生产者"，注册号作为合同附件。
- 明确退役服务边界：谁拆、谁运、谁付处置费，价格是固定价还是指数联动。
- 回收定价公式挂钩公开黑粉指数，而不是一句口头承诺"我们会处理"。
- 健康状态数据的可导出权利，格式机器可读，覆盖全生命周期。
- 电芯化学体系、单模组锂含量、交付时预期质量的书面声明，可与装箱单核对。
- 梯次利用选项，并写明残值分成机制。
- 适用法律；10 MWh 以上项目要求提供退役保证金或母公司担保。

## 大多数买方漏掉的那道供应商测试

把退役方案当作文件来要，而不是当作承诺来听。做过这件事的供应商，一周内能拿出三份东西：对应型号的质量平衡表、承接电芯的回收企业名称与地址、以及你目标市场的生产者注册号。

这也是我们对自己产品的要求。我们的[工商业储能柜](/products/ci-battery-cabinets)随机提供按型号的质量平衡表和回收承诺附件；我们的[电网级储能系统](/products/energy-storage-system)在投标阶段就明确退役方案与承接回收企业，而不是等到第十五年。如果你正在把退役条款写进招标文件，需要有人帮你核一遍这些数字，[联系我们的工程团队](/contact)，我们把这套模板发给你。
""",
}

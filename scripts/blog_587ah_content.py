# -*- coding: utf-8 -*-
"""Content for: 587Ah vs 314Ah large-format cells / 6.25MWh BESS platform shift."""

SLUG = "587ah-vs-314ah-cells-bess-6-25mwh-container"
DATE = "2026-11-09"
READ_TIME = 11
TAGS = ["BESS", "LFP Cells", "System Design", "587Ah", "Energy Storage"]

CATEGORY_EN = "Technology Deep Dive"
TITLE_EN = "587Ah vs 314Ah Cells: What the 6.25MWh Container Shift Really Changes in BESS Design"
DESC_EN = ("A engineering-level comparison of 314Ah and 587Ah LFP cells in utility BESS. Where the "
           "5MWh to 6.25MWh jump actually saves money, which costs it quietly adds, and how to "
           "specify the new platform without inheriting its failure modes.")

BODY_EN = """The 20-foot container has been the atomic unit of utility-scale storage for a decade. For most of that decade it held roughly 3.4 to 5 MWh. In 2026 the mainstream figure moved to **6.25 MWh**, and the change was not driven by better packaging — it was driven by a bigger cell.

Understanding what actually changed matters, because the marketing around large-format cells oversells the cost story and undersells the engineering consequences. A 6.25 MWh block is not a 5 MWh block with fewer parts. It is a different structural, thermal, and logistical object, and it behaves differently on site.

## Why the Container Grew: The Cell Math

A 314Ah LFP cell at 3.2V nominal stores about **1.00 kWh**. A 587Ah cell of the same chemistry stores about **1.88 kWh**. The energy per cell nearly doubled while the cell footprint grew by far less, because most of a prismatic cell's volume is active material and the casing, terminals, and busbar hardware do not scale linearly.

For a fixed 6.25 MWh of storage, that difference is stark:

| Parameter | 314Ah platform | 587Ah platform |
|---|---|---|
| Energy per cell | ~1.00 kWh | ~1.88 kWh |
| Cells per 6.25 MWh | ~6,220 | ~3,328 |
| Typical 20ft configuration | 12P x 416S class | 8P x 416S class |
| Nominal DC voltage | ~1,331 V | ~1,331 V |
| Strings per container | 12 | 8 |
| Cell-level interconnects | baseline | ~46% fewer |
| Container energy | ~5.0 MWh | ~6.25 MWh |

The DC bus voltage stayed at roughly 1,331 V nominal (1,164.8–1,497.6 V window) because the series count per string is unchanged at 416 cells. Only the parallel count dropped. This is an important detail: **the platform shift is a parallel-count reduction, not a voltage-class change**, which is why existing 1500V PCS topologies remain compatible.

## Where the Savings Actually Come From

The 587Ah cell carries a price premium — roughly **0.01 RMB/Wh** over 314Ah at the cell level, and a 6.25 MWh container costs about **2% more per Wh** than its 5 MWh equivalent, because thicker busbars, heavier framing, and more aggressive thermal hardware eat into the density gain. Anyone quoting "bigger cells = cheaper container" is wrong.

The savings are at the system level. Independent cost modelling on a 100MW/200MWh reference project found roughly **USD 825,000** in total system savings from the 6.25 MWh architecture:

1. **PCS and step-up stations.** 32 units at **USD 0.0242/W** instead of 40 units at USD 0.0266/W — a 9.1% reduction. This is the single largest driver.
2. **SCADA and monitoring.** Four-remote-signal points drop by about **46%**, which matters at portfolio scale: smaller servers, simpler point mapping, less commissioning labour.
3. **Civil works and land.** Fewer blocks means fewer foundations, shorter trench runs, and less fencing. Modelled indirect savings of USD 148,000–296,000 depending on site conditions.
4. **Installation labour.** Fewer lifts, fewer terminations, fewer torque checks.

And one widely repeated claim does not survive scrutiny: **DC cable cost goes up, not down**. There are roughly 20% fewer cable runs, but each carries higher current and needs a larger cross-section. Net cable cost rises slightly. Do not let a supplier put cable savings in their payback model.

## The Costs That Stay Off the Brochure

This is where the platform shift gets uncomfortable, and where a lot of 2026 tenders are already stumbling.

**Mass.** A 6.25 MWh 20ft container weighs **43–48 tonnes** depending on supplier and fire suppression scope. A 5 MWh unit is typically 36–40 tonnes. On a 6.06 x 2.44 m footprint that is a bearing pressure of roughly **3.0–3.3 t/m²** against 2.4–2.7 t/m² for the previous generation — around a 25% increase in foundation loading.

**Road transport.** 48 tonnes of cargo alone exceeds the 36.3 t (80,000 lb) US Interstate gross vehicle weight limit and the 40 t EU standard gross limit. Moving these blocks requires heavy-haul permits, route surveys for bridge and culvert capacity, and sometimes night convoys. On projects where the substation is 40 km from a port, transport can consume the entire container-level saving.

**Crane and rigging.** Lifting points, spreader beams, and crane capacity all step up a class. Sites that planned a 50 t mobile crane for 5 MWh blocks may need 80 t or larger, with correspondingly wider crane pads.

**Fire water demand.** Higher energy density per enclosure means a larger design fire, and NFPA 855 and UL 9540A evaluation depends on the specific cell and module. A 6.25 MWh unit cannot inherit the separation distances and water supply assumptions from a 5 MWh unit. Re-run the hazard analysis; do not copy the previous project's layout.

## Thermal Management Gets Tighter, Not Easier

Doubling cell capacity concentrates heat generation into fewer, larger bodies. Two consequences drive real design decisions:

- **Temperature uniformity becomes harder.** Good 6.25 MWh designs hold cell-to-cell delta within about **5°C**, and that requires CFD-optimised liquid cooling plates rather than an uprated version of the previous pack. Ask for the measured delta at 0.5C under 45°C ambient, not the datasheet claim at 25°C.
- **A single cell failure has more energy behind it.** Cell-level isolation, per-pack gas detection, and pack-level suppression stop being premium options and become the baseline. Three-level protection — pack, rack, enclosure — with pack-level perfluorohexanone and enclosure-level water is now the reference architecture for this format.

Round-trip efficiency at DC terminals for a well-engineered 6.25 MWh block sits around **94% at 0.5C, 25°C**. If a supplier quotes 96%+ for the whole system including auxiliaries, ask what ambient temperature and what auxiliary load that assumes.

## When 587Ah Is the Wrong Choice

Large-format cells are the right answer for utility-scale, 2-hour-plus, high-cycle assets. They are usually the wrong answer elsewhere:

- **C&I cabinets below 500 kWh.** Pack and rack flexibility matters more than density. 280Ah and 314Ah remain the sensible choice, and supply is deeper. A 314Ah C&I cabinet such as our [C&I battery cabinets](/products/ci-battery-cabinets) remains easier to site, cool, and service in a factory or retail environment.
- **Projects with constrained site access.** If the road cannot take 48 tonnes, a 5 MWh architecture is not a compromise — it is the correct engineering answer.
- **Weak local service capability.** Fewer strings means less redundancy. With 12 strings, losing one costs 8% of capacity; with 8 strings, losing one costs 12.5%. On remote sites, that difference changes the availability calculation.
- **Immature supply.** 587Ah-tier cells only reached meaningful volume in 2025–2026. Cumulative shipments of the leading 587Ah product passed 5 GWh by April 2026, and the first large reference projects — including a 300MW/1200MWh station in Ningxia — came online in mid-2026. That is credible, but it is not the decade of field data that 314Ah carries.

## Specification Checklist Before You Sign

If you are tendering a 6.25 MWh platform in 2026, put these in the technical schedule:

1. **Cell datasheet with batch traceability**, plus UN38.3 and IEC 62619 certificates naming the exact cell model — not the module or the system.
2. **UL 9540A cell-to-enclosure test report** for the specific configuration, if the project is in North America.
3. **Measured thermal delta at 0.5C and 40°C ambient**, from a factory witness test, not a simulation.
4. **Container weight and centre of gravity** as built, plus lifting lug certification.
5. **Degradation curve in writing**: capacity retention and round-trip efficiency at year 5, 10, and 15, with the throughput and temperature assumptions stated.
6. **Auxiliary load at rated power** — a 6.25 MWh block at high ambient can draw 3–5% of its own output for cooling.
7. **Augmentation plan compatibility** — can the DC architecture accept an additional string later, or is capacity fixed at commissioning?

Get those seven items and the platform decision becomes an engineering decision rather than a brochure decision.

## Choosing the Right Architecture for Your Project

Large-format cells are a genuine step forward for utility-scale storage — but only when transport, foundations, thermal design, and service strategy are designed around them from day one. Our engineering team sizes both 314Ah and 587Ah platforms for C&I and grid-scale projects, and we will tell you when the smaller cell is the better answer.

Explore our [grid-scale BESS container systems](/products/energy-storage-system) or [talk to our engineers](/contact) about your site conditions, interconnection limits, and cycle profile. Send us your single-line diagram and site plan, and we will return a container count, foundation loading, and a realistic transport assessment — usually within three working days.
"""

CATEGORY_ZH = "技术深度解析"
TITLE_ZH = "587Ah 与 314Ah 电芯对比:6.25MWh 储能平台转换对系统设计的真实影响"
DESC_ZH = ("从工程视角对比 314Ah 与 587Ah 磷酸铁锂电芯在大储项目中的差异:5MWh 到 6.25MWh 到底在哪里省钱、"
           "又悄悄增加了哪些成本,以及如何在招标中正确约束新平台而不继承它的失效模式。")

BODY_ZH = """20 尺集装箱在大型储能领域做了十年"最小单元"。这十年里,单箱容量大致停留在 3.4 到 5MWh。2026 年,行业主流数字跳到了 **6.25MWh**——推动这次变化的不是结构设计的进步,而是**电芯变大了**。

搞清楚究竟变了什么很重要。围绕大电芯的宣传普遍高估了成本收益,却低估了工程后果。一个 6.25MWh 的储能舱,并不是把 5MWh 舱的零件数量减少那么简单,它在结构、热管理和物流属性上完全是另一个东西,到现场后的表现也不一样。

## 集装箱为什么变大:电芯层面的算术

3.2V 标称电压下,一颗 314Ah 磷酸铁锂电芯约储存 **1.00kWh**;同样化学体系的 587Ah 电芯约储存 **1.88kWh**。单颗能量几乎翻倍,而电芯本身的占地远没有翻倍——因为方形电芯的体积大部分是活性物质,壳体、极柱和汇流排五金件并不随容量线性增长。

在同样的 6.25MWh 装机下,这个差别很直观:

| 参数 | 314Ah 平台 | 587Ah 平台 |
|---|---|---|
| 单颗电芯能量 | 约 1.00 kWh | 约 1.88 kWh |
| 6.25MWh 所需电芯数 | 约 6,220 颗 | 约 3,328 颗 |
| 20 尺典型成组 | 12P x 416S 级别 | 8P x 416S 级别 |
| 直流标称电压 | 约 1,331V | 约 1,331V |
| 单舱并联簇数 | 12 簇 | 8 簇 |
| 电芯级连接件 | 基准 | 减少约 46% |
| 单舱能量 | 约 5.0MWh | 约 6.25MWh |

注意直流母线电压仍然维持在约 1,331V 标称(1,164.8–1,497.6V 区间),因为每簇串联节数没变,仍是 416 串。**变的只有并联簇数。** 这个细节很关键:本轮平台升级本质是**并联数量减少,而非电压等级跃升**,所以现有的 1500V PCS 拓扑依然兼容,不需要更换技术路线。

## 省下的钱究竟从哪里来

587Ah 电芯是有溢价的——单颗层面大约比 314Ah 贵 **0.01 元/Wh**,而 6.25MWh 集装箱折算到每 Wh,比 5MWh 舱还要贵约 **2%**。原因是更粗的汇流排、更重的结构框架、更强的热管理硬件,把密度收益吃掉了一部分。任何说"电芯变大、单舱就更便宜"的说法都不成立。

真正的节省发生在系统层面。针对 100MW/200MWh 参考项目的独立成本建模显示,6.25MWh 架构合计可省约 **82.5 万美元**:

1. **PCS 与升压单元。** 6.25MW 方案单价 **0.0242 美元/W**,5MW 方案为 0.0266 美元/W,降幅 9.1%;数量从 40 台降到 32 台。这是最大的单项驱动。
2. **SCADA 与监控。** 四遥点位数量下降约 **46%**。在单体项目上不明显,但在资产组合层面意义很大:服务器规格更低、点表配置更简单、调试工时更少。
3. **土建与征地。** 舱数减少意味着基础数量、电缆沟长度、围栏长度同步下降。按场地条件不同,可再省 14.8 万–29.6 万美元。
4. **安装人工。** 吊装次数、接线端数量、力矩复核工作量全部减少。

而有一条被广泛复述的说法经不起推敲:**直流电缆成本是上升的,不是下降的**。电缆回路数确实少了约 20%,但每回承载电流更大、截面更粗,净结果是电缆成本小幅上升。如果你的供应商在收益模型里放了"电缆节省",把它划掉。

## 宣传册上不会提的成本

平台升级真正让人难受的地方在这里,而且 2026 年不少招标已经在这上面踩坑。

**重量。** 一台 6.25MWh 的 20 尺储能舱重达 **43–48 吨**(取决于供应商和消防配置范围),5MWh 机型通常在 36–40 吨。按 6.06 x 2.44m 的占地折算,基础承载约 **3.0–3.3 吨/平方米**,而上一代是 2.4–2.7 吨/平方米——荷载提高约 25%。

**公路运输。** 仅货物 48 吨就已超过美国州际公路 36.3 吨(80,000 磅)的总重限值,也超过欧盟 40 吨标准总重。运输这类储能舱需要超限运输许可、沿途桥涵承载勘察,部分路段只能夜间通行。如果项目地距港口 40 公里,运输环节完全可能把单舱省下来的钱全部吃掉。

**吊装。** 吊点、扁担梁、吊车吨位都要上一个等级。原计划用 50 吨汽车吊的场地,可能需要 80 吨以上,吊车支腿地基处理面积也随之扩大。

**消防水量。** 单舱能量密度提高意味着设计火灾规模更大。NFPA 855 与 UL 9540A 的评估结论取决于具体电芯与模组,6.25MWh 舱**不能直接沿用** 5MWh 舱的防火间距和消防水量假设。必须重做危险分析,不能照抄上一个项目的总平面。

## 热管理只会更紧,不会更松

单颗容量翻倍,等于把发热量集中到更少、更大的本体上,由此产生两个直接影响设计的后果:

- **温度均匀性更难做。** 优秀的 6.25MWh 设计把电芯间温差控制在 **5℃ 以内**,这需要 CFD 优化的液冷流道,而不是把上一代冷板"加大一号"。要索取 45℃ 环境、0.5C 工况下的实测温差,而不是 25℃ 下的手册值。
- **单点失效背后的能量更多。** 电芯级隔离、包级气体探测、包级灭火不再是选配,而是基线。电芯-PACK-舱三级防护、PACK 级全氟己酮加舱级水消防,已经是这一规格的参考架构。

设计良好的 6.25MWh 舱,直流侧往返效率在 0.5C、25℃ 下大约 **94%**。如果有供应商给出含辅电的系统效率 96% 以上,请追问:这是在什么环境温度、按多少辅电负载算的?

## 什么情况下不该选大电芯

大电芯适合电网侧、2 小时以上、高循环的资产。放到别的场景,通常就是错配:

- **500kWh 以下的工商业柜。** 这个场景里,成组灵活性比能量密度重要得多,280Ah 和 314Ah 仍是合理选择,而且供货更充足。我们的[工商业储能柜](/products/ci-battery-cabinets)在工厂、园区、商业综合体里更容易布置、散热和检修。
- **场地通行条件受限的项目。** 如果路进不来 48 吨,5MWh 架构不是"妥协方案",而是正确的工程结论。
- **本地运维能力薄弱。** 簇数减少意味着冗余度下降。12 簇时坏一簇损失 8% 容量,8 簇时坏一簇损失 12.5%。对偏远场站来说,这个差别会直接改变可用率测算。
- **供应链尚未成熟的市场。** 500Ah 以上电芯真正上量是 2025–2026 年的事。头部 587Ah 产品到 2026 年 4 月累计出货刚过 5GWh,首批大型实证项目(如宁夏宁东 300MW/1200MWh)2026 年中才并网。这个进展可信,但还远不是 314Ah 那种十年现场数据。

## 签约前的技术清单

如果你在 2026 年招标 6.25MWh 平台,把下面七条写进技术规范书:

1. **电芯规格书与批次可追溯性**,UN38.3 和 IEC 62619 证书必须标注**具体电芯型号**,而不是模组或系统型号。
2. 北美项目须提供针对**该具体配置**的 **UL 9540A 电芯到整舱测试报告**。
3. **0.5C、40℃ 环境下的实测温差数据**,来自工厂见证测试,不接受仿真值。
4. **实测整舱重量与重心位置**,以及吊耳强度认证。
5. **书面衰减曲线**:第 5、10、15 年的容量保持率与往返效率,并注明吞吐量和温度假设。
6. **额定功率下的辅电功耗**——6.25MWh 舱在高温环境下,冷却系统可占自身出力的 3–5%。
7. **增容方案兼容性**:后续能否加挂一簇?还是容量在并网时就已锁死?

拿到这七项,平台选型才会变成工程决策,而不是宣传册决策。

## 为你的项目选对架构

对电网侧储能而言,大电芯是实实在在的进步——但前提是运输、基础、热管理和运维策略从第一天起就围绕它设计。我们的工程团队同时为工商业和电网级项目配置 314Ah 与 587Ah 平台,如果小电芯更适合你的项目,我们会直接告诉你。

查看我们的[电网级 BESS 集装箱系统](/products/energy-storage-system),或者[联系我们的工程师](/contact),发送你的单线图与场地条件、并网容量和循环工况。我们通常可在三个工作日内返回舱数配置、基础荷载和一份务实的运输可行性评估。
"""

# -*- coding: utf-8 -*-
"""Content for: Middle East / GCC BESS market, procurement and compliance guide."""

SLUG = "middle-east-bess-market-procurement-compliance-guide"
DATE = "2026-11-18"
READ_TIME = 11
TAGS = ["BESS", "Middle East", "Saudi Arabia", "Grid-Scale Storage", "SASO Certification", "Procurement"]

EN_CATEGORY = "Market Access & Compliance"
EN_TITLE = "Middle East BESS Market 2026: Procurement and Compliance Guide for Saudi Arabia, UAE and Oman"
EN_DESC = ("Saudi Arabia, the UAE and Oman have over 30 GWh of utility-scale BESS in contract. What "
           "suppliers must know about BOO tenders, SASO SABER certification and 55C derating.")

EN_BODY = """The Gulf has gone from almost no grid-scale storage to the densest concentration of battery procurement on earth in under three years. Saudi Arabia, the UAE and Oman between them have put more than 30 GWh of utility-scale BESS into contract or construction, and the tender pipeline behind that figure is still widening. If you sell, integrate or specify storage, the region is no longer optional — and very little about winning work there resembles Europe or North America.

## The pipeline in numbers

In 2025 the world added roughly **108 GW** of battery storage, up about 40% year on year; around 87 GW of that was utility-scale and roughly **90% was LFP**. The Gulf absorbed a share of that growth far out of proportion to its population.

Saudi Arabia is the anchor. SPPC signed its first four independent storage projects on 20 August 2026 — 500 MW / 2,000 MWh each, **2 GW / 8 GWh** in total, SAR 4.35 billion (about USD 1.16 billion), all on a build-own-operate basis with 15-year storage services agreements. Three sites in Makkah and Hail went to a Saudi Energy Company / ACWA Power / Al Sharif consortium; Al-Khushaybi in Qassim went to ENGIE with Haji Abdullah Alireza. Round two — six projects, **3,000 MW / 12,000 MWh** — drew 27 prequalified developers in June 2026. Two rounds take the programme to 5 GW / 20 GWh before SEC's own procurement is counted at all.

SEC's parallel build-out is the one that made grid-forming a regional default: 2.5 GW across Riyadh, Rabigh, Dawadmi, Jouf and Qassim, more than 2,000 PCS units, with frequency and voltage regulation plus black start, and grid-tied charge/discharge tests reported for 27 May 2026.

The UAE went the other way and built a single flagship. Masdar and EWEC's round-the-clock project pairs 5.2 GW of PV with **19 GWh** of batteries to deliver 1 GW of firm power 24 hours a day — USD 6.1 billion total, USD 5.1 billion of debt from 13 banks against USD 1 billion of equity, financial close July 2026, COD 2027. That is 84% leverage, and at 1 GW firm it works out to roughly USD 6,100 per firm kW.

Oman is the third leg and the most accessible for new entrants. Nama PWP is procuring five standalone BESS sites totalling **950 MW / 3,800 MWh** — Sohar (500 MW / 2,000 MWh at 220 kV), Al-Mabellah and Ayjah (100 MW / 400 MWh each at 132 kV), Jalan Bani Bu Ali (150 MW / 600 MWh) and Sadah (100 MW / 400 MWh). Add the 1 GW Adam solar-plus-storage IPP and Sinaw, and the sultanate is chasing 30% renewables by 2030 from 4% in 2024, with demand forecast to double to about 10 TWh by 2031.

## Three procurement routes, three risk profiles

| Country | Buyer | Model | Typical block | What the supplier is really signing up for |
|---|---|---|---|---|
| Saudi Arabia | SPPC (NREP rounds) | BOO with 15-year SSA | 500 MW / 2,000 MWh | 15-year performance, not a delivery date |
| Saudi Arabia | SEC (direct) | EPC and framework supply | 2.5 GW cluster, 2,000+ PCS | Grid-forming type tests, FAT with raw data |
| UAE | EWEC / Masdar | IPP, project financed | GW-class round-the-clock | Bank-grade guarantees under 84% leverage |
| Oman | Nama PWP | IPP, five-site programme | 100–500 MW | Repeatable interfaces across five sites |
| Oman | Nama PWP | Solar-plus-storage IPP | 1 GW PV + BESS | Co-optimised PV/BESS ratio, not storage alone |

The consequence is uniform. Under a BOO with a 15-year SSA, the developer carries availability and round-trip efficiency obligations for longer than most standard product warranties run. Expect requests for 15-year performance guarantees with a staged augmentation schedule, parent company support, and a spares pool sized for a site 300 km from the nearest depot.

Note also that roughly 70% of Saudi capacity moves through the PIF ecosystem — ACWA Power, Badeel and Aramco's power arm — while about 30% runs through the NREP reverse auction with SPPC as single buyer. Two different sales motions, one market.

## Compliance is where timelines die

The most expensive mistake in this region is assuming CE or UL opens the door. It does not. CE is not recognised, UL 1973 helps only where a local regulator accepts it as an equivalent to IEC 62619, and no certificate transfers between GCC states.

Saudi Arabia runs SASO through SABER in two steps: a **Product Certificate (PC)** held against a specific importer, then a **Shipment Certificate (SC)** per consignment. Both are registered by the Saudi importer of record — so if the EPC rather than the developer imports, the PC must be re-issued in that importer's name, and that re-issuance has a lead time nobody puts in the schedule. SASO 2870 layers tropical-climate testing (50 °C, 95% RH) and Arabic marking on top of IEC 62619. SASO 1502:2025 adds a 55 °C high-temperature cycle test with **≤8% capacity fade over 100 cycles** — a design constraint, not a paperwork exercise.

The UAE routes through ECAS, issued by a MoIAT-notified body, with certificates scoped per model and per capacity; a generic manufacturer certificate is refused. DEWA adds an approved-vendor list and a requirement that batteries retain at least eight years of service life at 55 °C. Oman is lighter on product certification but strict on grid interface, with 220 kV and 132 kV connections and IEC 62933 as the working reference.

| Requirement | Saudi Arabia | UAE | Oman |
|---|---|---|---|
| Product certification | SASO IEC 62619 via SABER (PC + SC) | ECAS, via MoIAT-notified body | IEC 62619 / IEC 62933 evidence |
| High-temperature test | SASO 1502:2025, 55 °C / 100 cycles, ≤8% fade | DEWA: ≥8 years life at 55 °C | Site-specific, 50 °C design ambient |
| Fire and explosion | Civil Defense: suppression, thermal detection, venting | Civil Defence + NFPA-informed design | Authority-approved design |
| Localisation | LCGPA local content score | ICV programme | Omanisation / local value |
| Labelling | Arabic or bilingual | Arabic or bilingual | Arabic or bilingual |
| Realistic certification lead time | 4–8 months new entrant | 2–5 months with existing CB | 2–4 months |

Certification alone runs four to eight months for a new entrant. That single number decides bid or no-bid, and it is the reason prequalified suppliers keep winning.

## What 55 °C does to a datasheet — and to a penalty clause

A 5 MWh DC block rated at 25 °C is not a 5 MWh block in Riyadh in August. Ambient at 50 °C, container internal temperatures well above that, and continuous cooling load all move both available energy and round-trip efficiency. Two clause-level consequences matter more than the engineering:

1. Define guaranteed energy and RTE **at site design ambient**, with the auxiliary load boundary stated explicitly — cooling, fire-suppression standby and controls included.
2. Fix the derating curve as a contract appendix. Otherwise a hot afternoon becomes a performance claim you cannot defend.

Dust is the second half of the problem. IP65 is the regional floor and IP66 is increasingly specified; coastal sites at Rabigh, Jazan and Sohar need C5-M corrosion protection on enclosures, busbars and fasteners. Filter and dry-cooler cleaning intervals in a dust-laden desert are measured in weeks, not quarters — that maintenance load belongs in the O&M price, not in a footnote.

One regional subtlety outsiders miss: liquid cooling is thermally superior but consumes water in a region where water is desalinated. Air-cooled systems with disciplined airflow design still win some C&I tenders on total water and auxiliary energy, particularly at sites with no water infrastructure.

## Pricing: USD 73–75/kWh and the arithmetic behind it

Public bid numbers have fallen fast. A 4 GWh supply agreement between Hithium and Alfanar was reported at **USD 73–75/kWh**, and the SEC third-batch shortlist in September 2026 landed 11–14% below the April round on a per-GWh basis. Those are DC-block, ex-works figures. The gap between that and a delivered, commissioned, warranted system is where margin either exists or evaporates.

| Element | Usually in a quoted $/kWh | Usually excluded |
|---|---|---|
| DC blocks, racks, BMS | Yes | — |
| PCS and MV transformer | Rarely | Priced separately per MVA |
| EMS, SCADA, grid-forming controls | Rarely | Software licence and integration |
| Fire suppression, HVAC or liquid cooling | Sometimes | Often a cost-down target |
| Freight, port, inland haul to desert site | No | USD-denominated, volatile |
| SASO/ECAS certification amortisation | No | Absorbed or passed through |
| Commissioning, grid-code type tests | No | Separate scope |
| Spares, augmentation, 15-year O&M | No | Priced per kW-year |

When a competitor quotes USD 75/kWh and you quote USD 95/kWh, the difference is usually not the cells. It is which rows of that table are inside the number.

## Local content is a scoring line, not a footnote

LCGPA applies to government procurement above SAR 10 million, and the required local content share has been climbing; storage-specific localisation is reported at **33–35% today with 40% targeted for 2027 and 45–50% by 2028**. Enclosure fabrication, module assembly, harnesses and thermal skids are the usual candidates for localisation credit. The practical move is to identify a local assembly or enclosure partner before the RFP, not after award — retrofitting a local content story into a bid is not possible at the price levels this market now clears at.

## A bid-readiness checklist

1. Confirm the importer of record and open the SABER PC in that entity's name, not your distributor's.
2. Commission SASO 1502:2025 and SASO 2870 test evidence before you need it; slotting a 55 °C cycle test into a bid schedule never works.
3. Obtain the grid-forming type-test report, including black start, for any site above 50 MW.
4. Table guaranteed energy and RTE at site ambient with the auxiliary power boundary stated.
5. Match warranty tenor to the SSA — 15 years, or explicitly staged augmentation.
6. Quote landed cost to site, including inland transport to desert locations and heavy-haul permits.
7. Line up local content credit partners and document their contribution.
8. Provide FAT with raw data; Gulf utilities now ask for it as standard rather than as a concession.

## Where to start

For a Gulf project the two decisions that drive everything downstream are cooling architecture and grid-forming capability. Both are hard to retrofit and both are examined in type test, so get them right at the specification stage rather than the negotiation stage.

Our [containerised utility-scale systems](/products/energy-storage-system) and [C&I battery cabinets](/products/ci-battery-cabinets) are built to IEC 62619, UN38.3 and GB/T 36276-2023, with high-ambient derating curves and auxiliary load budgets supplied as bid documentation rather than marketing claims. [Talk to our engineering team](/contact) about the ambient, dust and grid-code envelope for your site before you fix the datasheet.
"""

ZH_CATEGORY = "市场准入与合规"
ZH_TITLE = "中东储能市场 2026：沙特、阿联酋、阿曼的投标与合规实战指南"
ZH_DESC = ("沙特、阿联酋、阿曼已签约在建电网级储能超 30GWh。本文拆解 BOO 招标结构、SASO/SABER 认证路径、"
           "55℃ 降额条款陷阱与 73–75 美元/kWh 报价背后的成本边界。")

ZH_BODY = """海湾地区在不到三年时间里，从几乎没有电网级储能，变成全球电池采购最密集的区域。沙特、阿联酋、阿曼三国合计已签约或在建的电网级储能超过 **30GWh**，而背后的招标管线还在继续放量。对做储能系统销售、集成或选型的人来说，中东已经不是"要不要做"的问题，而是"怎么做才不被条款和认证拖死"的问题——这里的规则和欧美几乎没有一条是相同的。

## 先用数字看清盘子

2025 年全球新增电池储能约 **108GW**，同比增长约 40%，其中约 87GW 是公用事业级，**LFP 路线占比约 90%**。海湾地区拿到的份额，与其人口规模完全不成比例。

沙特是压舱石。2026 年 8 月 20 日，沙特电力采购公司（SPPC）签署首批四个独立储能项目——单体 500MW/2000MWh，合计 **2GW/8GWh**，总投资 43.5 亿沙特里亚尔（约 11.6 亿美元），全部采用 **BOO（建设-拥有-运营）** 模式，配套 15 年储能服务协议（SSA）。麦加省的 Al-Muwyah、Haden 和哈伊勒省的 Al-Kahafa 授予沙特电力公司、ACWA Power 与 Al Sharif 组成的联合体；卡西姆省的 Al-Khushaybi 授予 ENGIE 与 Haji Abdullah Alireza 联合体。第二批六个项目、**3GW/12GWh**，2026 年 6 月 30 日公布 27 家入围企业。两批加起来 5GW/20GWh，这还没算沙特电力公司（SEC）自己的采购。

SEC 那条线才是把"构网型"变成区域默认配置的原因：2.5GW 分布在利雅得、拉比格、达瓦迪米、焦夫、卡西姆五个区域，**2000 多台 PCS**，具备调频、调压和黑启动能力，2026 年 5 月 27 日完成并网充放电测试。

阿联酋走的是另一条路——一个旗舰项目打穿天花板。Masdar 与 EWEC 的全天候（RTC）项目为 5.2GW 光伏配 **19GWh** 电池，目标是 24 小时连续输出 1GW 稳定电力：总投资 61 亿美元，13 家银行提供 51 亿美元债务，Masdar 出资 10 亿美元股权，**杠杆率约 84%**，2026 年 7 月完成融资关闭，2027 年投运。按 1GW 稳定出力折算，约合每千瓦稳定容量 6100 美元。

阿曼是第三条腿，也是新进入者最容易切入的市场。Nama PWP 正在采购五个独立储能站点，合计 **950MW/3800MWh**：Sohar（500MW/2000MWh，220kV 接入）、Al-Mabellah 与 Ayjah（各 100MW/400MWh，132kV）、Jalan Bani Bu Ali（150MW/600MWh）、Sadah（100MW/400MWh）。再加上 1GW 的 Adam 光储 IPP 和 500MW 的 Sinaw，阿曼的目标是 2030 年可再生能源占比达到 30%（2024 年仅 4%），而用电需求预计到 2031 年翻倍至约 10TWh。

## 三种采购路径，三种风险结构

| 国家 | 买方 | 模式 | 典型规模 | 供应商真正签下的是什么 |
|---|---|---|---|---|
| 沙特 | SPPC（NREP 招标） | BOO + 15 年 SSA | 500MW/2000MWh | 15 年性能，不是交货日期 |
| 沙特 | SEC（直接采购） | EPC 与框架供货 | 2.5GW 集群、2000+ PCS | 构网型型式试验、带原始数据的 FAT |
| 阿联酋 | EWEC / Masdar | IPP，项目融资 | 吉瓦级全天候 | 84% 杠杆下的银行级担保 |
| 阿曼 | Nama PWP | IPP，五站点打包 | 100–500MW | 跨站点可复制的接口标准 |
| 阿曼 | Nama PWP | 光储一体 IPP | 1GW 光伏 + 储能 | 光储容量比协同优化 |

结论对供应商是一致的：在 BOO + 15 年 SSA 结构下，开发商承担可用率和往返效率义务的年限，比大多数标准产品质保期都长。所以你会被要求提供 **15 年性能保证 + 分期增容（augmentation）计划**、母公司担保，以及按距离最近备件库 300 公里来配置的备件池。

还有一层容易被忽略：沙特大约 70% 的容量走 PIF 体系直接开发（ACWA Power、Badeel、阿美旗下电力公司），约 30% 走 NREP 反向拍卖、SPPC 单一买方。同一个市场，两套销售打法。

## 认证才是真正的时间杀手

这个区域最常见、也最贵的错误，是以为 CE 或 UL 能直接通行。不能。CE 不被承认，UL 1973 只在当地监管机构认可其等效于 IEC 62619 时才起作用，而且**任何证书都不会在 GCC 国家之间互认**。

沙特的 SASO 走 SABER 平台两步：先由**具体进口商**持有产品证书（PC），再按批次申请装运证书（SC）。两次注册都必须由沙特进口商完成——如果进口方是 EPC 而不是开发商，PC 就得改成 EPC 的名义重新签发，而这段重新签发的周期，投标进度表里从来没人给它留时间。SASO 2870 在 IEC 62619 之上叠加了热带气候测试（50℃、95% 相对湿度）和阿拉伯语标识要求；**SASO 1502:2025** 更进一步要求 55℃ 高温循环 **100 次容量衰减 ≤8%**——这是设计约束，不是补一份文件就能过的。

阿联酋走 ECAS，由 MoIAT 授权的合格评定机构签发，证书按**具体型号 + 具体容量**核发，制造商通用证书直接被退。DEWA 还叠加了设备准入清单，并要求电池在 55℃ 下使用寿命不低于 8 年。阿曼对产品认证相对宽松，但对并网接口要求严格，220kV/132kV 接入，以 IEC 62933 为技术基准。

| 要求项 | 沙特 | 阿联酋 | 阿曼 |
|---|---|---|---|
| 产品认证 | SASO IEC 62619，经 SABER（PC + SC） | ECAS，MoIAT 授权机构 | IEC 62619 / IEC 62933 证据 |
| 高温测试 | SASO 1502:2025，55℃/100 循环，衰减 ≤8% | DEWA：55℃ 下寿命 ≥8 年 | 按站点设计，50℃ 环境基准 |
| 消防与防爆 | 民防：灭火、感温探测、泄爆 | 民防 + 参照 NFPA 体系设计 | 主管机构批准的设计 |
| 本地化 | LCGPA 本地含量评分 | ICV 计划 | 阿曼化 / 本地增值 |
| 标识语言 | 阿拉伯语或阿英双语 | 阿拉伯语或双语 | 阿拉伯语或双语 |
| 认证周期（新进入者） | 4–8 个月 | 已有 CB 报告 2–5 个月 | 2–4 个月 |

单是认证，新进入者就要 4 到 8 个月。这一个数字基本决定了"投不投"，也解释了为什么入围名单总是那批老面孔。

## 55℃ 会同时对数据表和违约金条款动手

一个在 25℃ 下标称 5MWh 的直流舱，在 8 月的利雅得就不是 5MWh。50℃ 环境温度、远高于此的舱内温度、以及持续的冷却功耗，会同时压缩可用电量和往返效率。比起技术细节，更致命的是两个条款层面的问题：

1. 必须把**保证电量与保证 RTE 定义在站点设计环境温度下**，并明确写出辅助功耗边界——冷却、消防待机、控制系统全部计算在内。
2. 把降额曲线写进合同附件。否则一个酷热的下午就会变成一条性能索赔。

沙尘是另一半问题。IP65 是这个区域的底线，IP66 越来越常被指定；拉比格、吉赞、Sohar 这类沿海站点，机柜、母排、紧固件都要按 **C5-M** 做防腐。在含尘沙漠里，滤网和干冷器的清洗周期是按周算的，不是按季度——这部分运维负荷要进 O&M 报价，不能藏在脚注里。

还有一个外来者常忽略的细节：液冷散热性能更好，但这个区域的水是海水淡化的，耗水本身就是成本。在完全没有水资源的站点，风道设计扎实的风冷系统，仍然能在总耗水和辅助能耗上赢下一些工商业标段。

## 价格：73–75 美元/kWh，以及这个数字背后的算术

公开报价下探得很快。海辰储能与 Alfanar 的 4GWh 供货协议据报为 **73–75 美元/kWh**，SEC 第三批 6.8GWh 在 2026 年 9 月公布的短名单，单位 GWh 报价较 4 月批次下浮 11%–14%。这些是直流舱、出厂价口径。从出厂价到"交付、调试、带质保的系统"，中间那段就是利润存在或蒸发的地方。

| 成本项 | 通常含在 $/kWh 报价里 | 通常不含 |
|---|---|---|
| 直流舱、电池架、BMS | 是 | — |
| PCS 与中压变压器 | 很少 | 按 MVA 单独计价 |
| EMS、SCADA、构网型控制 | 很少 | 软件许可与集成另计 |
| 消防、空调或液冷 | 有时 | 常是降本目标 |
| 海运费、港口、内陆运输至沙漠站点 | 否 | 美元计价，波动大 |
| SASO/ECAS 认证摊销 | 否 | 自吸收或转嫁 |
| 调试、并网型式试验 | 否 | 独立工作包 |
| 备件、增容、15 年 O&M | 否 | 按 kW·年计价 |

当对手报 75 美元/kWh、你报 95 美元/kWh，差的一般不是电芯，而是上表里哪几行算在了数字之内。

## 本地含量是评分项，不是备注

LCGPA 适用于 1000 万沙特里亚尔以上的政府采购，本地含量比例要求在持续提高；储能相关的本地化比例据报目前为 **33%–35%，2027 年目标 40%，2028 年 45%–50%**。机柜钣金、模组装配、线束、热管理撬装是最常见的本地化得分项。实务动作是**在 RFP 之前就把本地装配或机柜合作伙伴定下来**，而不是中标后再补——以这个市场现在的成交价，事后补本地化故事是做不出来的。

## 投标就绪清单

1. 确认进口主体，用该主体名义开 SABER 的 PC，不要用你的经销商名义。
2. 提前完成 SASO 1502:2025 与 SASO 2870 的测试证据，把 55℃ 循环测试塞进投标周期从来不会按时完成。
3. 50MW 以上项目，必须拿到构网型型式试验报告，含黑启动。
4. 在表中写明站点环境温度下的保证电量与 RTE，并注明辅助功耗边界。
5. 质保年限对齐 SSA 期限——15 年，或明确的分期增容方案。
6. 报到站成本，含内陆运输至沙漠站点及超限运输许可。
7. 提前锁定本地含量得分伙伴，并留好其贡献的证明文件。
8. 提供带原始数据的 FAT；海湾电力公司现在把这条当标配，不再算让步。

## 从哪里入手

做海湾项目，真正决定下游一切的是两个决策：**冷却架构**和**构网能力**。这两个都极难事后改造，也都会在型式试验里被逐项核查，所以必须在选型阶段定死，而不是留到商务谈判。

我们的[集装箱式电网级储能系统](/products/energy-storage-system)与[工商业储能柜](/products/ci-battery-cabinets)按 IEC 62619、UN38.3、GB/T 36276-2023 设计与验证，高温降额曲线和辅助功耗预算会作为投标文件提供，而不是营销话术。[联系我们的工程团队](/contact)，在你锁定数据表之前，先把你站点的环境温度、沙尘与并网条款边界核清楚。
"""

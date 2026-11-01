# -*- coding: utf-8 -*-
"""Insert one new SEO blog article: string PCS vs central PCS in BESS."""
import sys, json
from _sb_sql import query

SLUG = "string-pcs-vs-central-pcs-bess"
DATE = "2026-10-30"
READ_TIME = 10
TAGS = ["BESS", "PCS", "System Design", "Engineering", "C&I Storage"]

CAT_EN = "Engineering"
TITLE_EN = "String PCS vs Central PCS in BESS: Which Topology Fits Your Project?"
DESC_EN = ("A practical engineering and commercial comparison of string (distributed) PCS and "
           "central PCS architectures in battery storage: part-load efficiency, failure blast radius, "
           "capex deltas, and an eight-question decision checklist.")

BODY_EN = r"""Choosing between a **string PCS** and a **central PCS** is the most consequential electrical decision in a battery energy storage system (BESS) design. It fixes the DC topology, the failure modes, the part-load efficiency curve, and roughly 3-6% of turnkey capital cost. Choose badly and the asset underperforms its financial model for fifteen years; choose well and nobody notices, which is the point.

This comparison focuses on the metrics that actually move project economics: efficiency at real dispatch points, availability, safety zoning, and installed cost per kWh.

## The short answer

| Project profile | Default choice | Reason |
| --- | --- | --- |
| C&I cabinet, 100-500 kWh | String | One PCS per cluster, no DC paralleling, simple O&M |
| C&I multi-cabinet, 1-10 MWh | String | Load-following accuracy, partial redundancy |
| Utility BESS, 20-200 MWh | String with cluster isolation | Availability and part-load efficiency dominate |
| Low-cycling peak shaving, tight budget | Central | Lowest $/kW on paper |
| Brownfield block already wired for central | Central | Retrofitting DC topology rarely pays back |

The industry has moved. Five years ago a 100 MW utility project would have been central by default. Today the majority of new 5 MWh container platforms ship with **cluster-level conversion**, because the commercial case for central PCS has narrowed to a specific set of low-utilisation projects.

## What the two architectures actually are

A **central PCS** is a single 1.5-4 MW bidirectional converter feeding a DC block of several battery clusters paralleled onto a common DC bus. Clusters are combined through fuses or breakers, then a single DC contactor and pre-charge circuit. DC voltage is fixed by the converter's operating window, so a cluster with a weaker cell string drags the whole bus down to its voltage.

A **string PCS** (also called distributed or cluster-level PCS) is a 100-215 kW converter serving one or two clusters, typically 200-500 kWh. Each cluster has its own **MPPT-style DC tracker**, so clusters never parallel on the DC side. There is no DC combiner, no string fusing, and one cluster's weak cells stay contained.

| Parameter | Central PCS | String PCS |
| --- | --- | --- |
| Unit rating | 1.5-4 MW | 100-215 kW |
| DC paralleling | Yes, 4-10 clusters per bus | No, 1-2 clusters per unit |
| MPPT granularity | Block level | Cluster level |
| Failure blast radius | Entire DC block | One cluster |
| DC protection hardware | Combiners, fuses, large contactors | None beyond the unit |
| Field replacement | Crane, 600+ kg, 2-4 weeks lead time | Rack-mount, 2-4 hours |
| Typical system RTE (incl. aux) | 85-88% | 88-90% |

## Part-load efficiency is where the money is

Datasheet efficiency is measured at rated load, and almost no BESS runs at rated load. Frequency regulation duty sits at 10-30% of rated power most of the day. Peak-shaving systems cycle in ramps. A 2-hour system running a 10-90% SOC window spends the majority of its operating hours below 70% load.

At low load the central PCS loses ground for three structural reasons: switching losses rise relative to transferred energy, the fixed auxiliary draw of cooling pumps and fans is spread over less throughput, and the transformer's no-load loss stays constant regardless of output.

| Load point | Central PCS | String PCS |
| --- | --- | --- |
| 100% | 98.5% | 98.6% |
| 75% | 98.0% | 98.4% |
| 50% | 97.0% | 98.0% |
| 25% | 94.5% | 96.8% |

These are typical vendor ranges, not guarantees. The important line is the bottom one: the gap widens from roughly 0.1 points at full load to more than 2 points at quarter load.

Translate that into revenue on a **100 MW / 200 MWh** project cycling twice a day for 340 days, with a net arbitrage spread of $55/MWh. Annual throughput is about 136,000 MWh. A 2-point efficiency gap is roughly 2,700 MWh of energy that never reaches the meter, worth about **$150,000 per year** and $2.2M undiscounted over fifteen years. On a project with a $70M capex, that is not a rounding error.

## Availability: the failure blast radius argument

Efficiency is the quiet cost. Reliability is the loud one.

In a central architecture, a PCS fault takes the whole DC block offline. A 2.5 MW unit down for two weeks inside a 100 MW plant removes about **0.84 GWh** of discharge capability, roughly $55,000 of arbitrage revenue at a $65/MWh spread, before any capacity performance penalty. Replacement usually needs lifting equipment and a factory lead time measured in weeks, not hours.

String PCS trades one big converter for many small ones. A single unit failure costs 0.2% of plant capacity, the module is field-swappable in hours, and a spare can sit in the warehouse for the price of one converter. Components still fail more often in absolute count, but the impact per failure is an order of magnitude smaller. Net availability on well-run utility sites typically lands 0.5-1.0 points higher with cluster-level conversion.

## Safety zoning and standards

Fire safety standards increasingly reward DC-side isolation. **UL 9540A** cell-to-cell propagation testing and **NFPA 855** installation rules push designers toward smaller hazardous volumes with independent isolation. **IEC 62933-5-2** treats the battery system and the converter as one safety-related assembly.

A central DC bus carries a high prospective short-circuit current from many parallel clusters, which raises interrupting ratings, fuse coordination effort, and arc-flash incident energy at the combiner. String architecture keeps prospective fault current to one cluster's worth, simplifies protection coordination, and lets a single cluster be electrically isolated for maintenance without de-energising neighbours.

## Where central PCS still wins

Central is not obsolete, it is just narrower:

1. **Low-cycling, cost-first peak shaving** where annual throughput is under 300 cycles and capex is the binding constraint.
2. **Brownfield retrofits** with existing combiner infrastructure and DC cabling sized for a central block.
3. **Footprint-starved electrical rooms** where the extra AC paralleling hardware of string design does not fit.
4. **Single-vendor large-module procurement** where a 4 MW unit wins on logistics and commissioning labour.

If your project cycles daily and participates in any paid availability market, the efficiency and reliability deltas usually repay the capex premium within three to five years.

## An eight-question decision checklist

1. What is the annual equivalent full-cycle count? Below 300, central becomes defensible.
2. Does your revenue depend on availability payments or capacity accreditation? If yes, favour string.
3. How many operating hours will be spent below 50% load? Above 40%, favour string.
4. What is the permitted hazardous-area volume per unit? Fire code may decide for you.
5. Can you lift 600 kg on site, and how fast can you get a spare converter?
6. What is the AC paralleling and harmonic plan? More units means more coordination.
7. Does the EMS need per-cluster SOC control for revenue stacking? That requires cluster-level conversion.
8. What is the total delta over fifteen years, efficiency plus availability, minus capex?

## Getting the topology right at the specification stage

Topology is cheap to change on a drawing and expensive to change in a container. Specify it early, tie it to the dispatch profile rather than to the datasheet, and make the supplier prove the part-load curve with a measured efficiency report, not a peak value.

SolarStoragePro builds both paths: our [C&I battery cabinets](/products/ci-battery-cabinets) from 100-500 kWh ship with cluster-level string conversion and per-cluster MPPT as standard, while our [containerised energy storage systems](/products/energy-storage-system) from 1 MW to 5 MW can be configured with either architecture depending on your cycle profile and market obligations. All platforms carry IEC 62619, UN38.3, GB/T 36276-2023 and CE certification.

Tell us your dispatch profile and annual cycle count, and we will run the efficiency and availability comparison on your own numbers before you commit to a topology."""

CAT_ZH = "工程技术"
TITLE_ZH = "组串式 PCS 与集中式 PCS 怎么选：储能系统拓扑的工程与经济性对比"
DESC_ZH = ("从满负荷与部分负荷效率、故障影响范围、安全分区、投资增量四个维度，对比组串式 PCS 与集中式 PCS "
           "在工商业储能和电网侧储能中的适用场景，并给出八条选型判断清单。")

BODY_ZH = r"""在储能系统设计中，**组串式 PCS** 还是 **集中式 PCS**，是最容易被低估、却影响最持久的一个电气决策。它决定了直流侧拓扑、故障模式、部分负荷效率曲线，以及约 3-6% 的初始投资。选错的代价不是调试时的一笔返工，而是十五年间持续少发的电量和停机的收入。

本文不谈参数表上的峰值效率，只谈真正影响项目收益的四件事：实际工况下的效率、故障影响范围、安全分区，以及投资增量。

## 先说结论

| 项目类型 | 建议方案 | 原因 |
| --- | --- | --- |
| 工商业单柜，100-500 kWh | 组串式 | 一簇一 PCS，直流侧不并联，运维简单 |
| 工商业多柜，1-10 MWh | 组串式 | 跟踪调度精度高，具备部分冗余 |
| 电网侧 / 独立储能，20-200 MWh | 组串式 + 簇级隔离 | 可用率和部分负荷效率是主导因素 |
| 年循环次数低、投资敏感 | 集中式 | 单位千瓦造价更低 |
| 存量电站改造、原有直流汇流已成型 | 集中式 | 改拓扑的回收期通常不成立 |

行业趋势已经很清楚：五年前 100MW 级项目默认集中式，如今主流 5MWh 液冷集装箱平台大多采用**簇级变换**。集中式并未消失，但它适用的项目类型正在快速收窄。

## 两种拓扑的本质区别

**集中式 PCS** 是一台 1.5-4MW 的双向变流器，服务于 4-10 个电池簇并联而成的直流母线。簇与簇之间通过熔断器或断路器汇流，共用一套直流接触器和预充回路。直流电压由变流器工作窗口决定，因此某一簇里存在弱电芯时，整条母线都会被拉到它的电压水平。

**组串式 PCS** 是 100-215kW 的变流器，带一到两个电池簇（约 200-500kWh），每簇配置独立的 **MPPT 式直流跟踪**，直流侧从不并联。没有汇流柜、没有簇级熔断器，弱簇的影响被限制在它自己身上。

| 对比项 | 集中式 PCS | 组串式 PCS |
| --- | --- | --- |
| 单机功率 | 1.5-4 MW | 100-215 kW |
| 直流并联 | 是，一个母线 4-10 簇 | 否，一机 1-2 簇 |
| MPPT 粒度 | 电池堆级 | 电池簇级 |
| 故障影响范围 | 整个直流单元 | 单个电池簇 |
| 直流侧保护器件 | 汇流柜、熔断器、大电流接触器 | 机内完成 |
| 现场更换 | 需吊装，600kg 以上，备件周期数周 | 机架式，2-4 小时 |
| 系统综合效率（含辅机） | 85-88% | 88-90% |

## 真正的差距在部分负荷效率

厂家标称效率是在额定负载下测的，而储能系统几乎不在额定负载下运行。调频工况大部分时间出力在额定的 10-30%，峰谷套利是斜坡式充放，2 小时系统在 10-90% SOC 窗口内运行，多数时间负荷率低于 70%。

低负荷时集中式劣势来自三处：开关损耗相对传输能量占比上升；冷却泵和风机的固定辅助功耗摊薄到更少的电量上；变压器空载损耗与出力无关，始终存在。

| 负荷率 | 集中式 PCS | 组串式 PCS |
| --- | --- | --- |
| 100% | 98.5% | 98.6% |
| 75% | 98.0% | 98.4% |
| 50% | 97.0% | 98.0% |
| 25% | 94.5% | 96.8% |

这是行业常见的选型区间，不是承诺值。关键在于最后一行：满负荷时差距只有 0.1 个百分点，25% 负荷时扩大到 2 个百分点以上。

换算成钱：一个 **100MW/200MWh** 项目，每天两充两放、年运行 340 天，峰谷净价差 55 元/MWh 量级。年吞吐电量约 13.6 万 MWh，2 个百分点的效率差意味着约 2700 MWh 永远送不到关口表，年损失约 **100 万元人民币**，十五年是 1500 万元。对总投资几亿元的项目，这不是小数目。

## 可用率：故障影响范围决定收入

效率是慢性损失，可靠性是急性损失。

集中式架构下，一台 PCS 故障就带走整个直流单元。100MW 电站里一台 2.5MW 机柜停运两周，损失约 **0.84GWh** 放电能力，按 0.45 元/kWh 价差计算约 38 万元，还不含容量考核罚款。更换通常要吊装设备，备件从工厂发出，周期以周计。

组串式用很多小变流器替代一台大机器。单机故障只损失 0.2% 的容量，机柜级热插拔几小时完成，一台备机的资金占用也只相当于一台小 PCS。器件数量增加意味着故障次数会多一些，但每次故障的代价小一个数量级。运行良好的电网侧项目，簇级方案的等效可用率通常高出 0.5-1.0 个百分点。

## 安全分区与标准要求

国内消防和设计规范正在向直流侧隔离能力倾斜。**GB 51048《电化学储能电站设计规范》** 对防火分区、可燃气体探测、消防联动提出了明确要求，**GB/T 36276-2023** 对电池本体安全提出更细的测试项，海外项目则要看 **UL 9540A** 的热失控蔓延测试和 **NFPA 855** 的安装间距规则。工程实践的共同指向是：危险体积越小、隔离越独立，越容易通过审查。

集中式直流母线汇集了多簇并联的短路电流，汇流柜处的预期短路电流大、熔断器配合复杂、弧闪能量高。组串式把预期故障电流限制在单簇水平，保护配合简化，且可以在不停邻簇的情况下电气隔离某一簇做检修。

## 集中式仍然成立的场景

集中式没有过时，只是边界更清晰了：

1. **年循环次数低（低于 300 次）的峰谷套利项目**，投资额是硬约束，效率损失被低吞吐量摊薄。
2. **存量电站改造**，原汇流柜和直流电缆按集中式设计，改拓扑的回收期通常不成立。
3. **配电间空间极度受限**，组串式增加的交流并联设备和桥架放不下。
4. **单一供应商大批量采购**，4MW 单机在物流和调试人工上更有优势。

如果项目每天循环且参与任何形式的容量补偿或可用率考核，效率与可靠性带来的增量，通常三到五年就能收回设备差价。

## 八条选型判断清单

1. 年等效满充放循环次数是多少？低于 300 次，集中式才有讨论空间。
2. 收入是否依赖容量补偿、可用率考核或辅助服务中标？是则优先组串式。
3. 有多少运行时间处于 50% 负荷以下？超过 40%，优先组串式。
4. 单个单元允许的危险区域体积是多少？消防审查可能直接替你决定。
5. 现场能否吊装 600kg 以上设备？备机到场需要几天？
6. 交流侧并联台数增加后，谐波和环流方案是否明确？
7. EMS 是否需要簇级 SOC 控制来做收益叠加？这必须依赖簇级变换。
8. 十五年的综合账（效率 + 可用率 - 投资增量）算过没有？

## 在方案阶段就把拓扑定下来

拓扑在图纸上改动很便宜，在集装箱里改动极其昂贵。建议在技术协议阶段就锁定，依据是自己的调度曲线而不是厂家样册，并要求供应商提供**实测部分负荷效率报告**而不是一个峰值数字。

SolarStoragePro 两条路线都能覆盖：[工商业电池储能柜](/products/ci-battery-cabinets) 100-500kWh 系列标配簇级组串式变换和簇级 MPPT，适合每日循环的峰谷套利与需量管理；[集装箱式储能系统](/products/energy-storage-system) 1MW-5MW 可根据循环工况和市场考核要求配置集中式或组串式架构。全线产品具备 IEC 62619、UN38.3、GB/T 36276-2023、CE 与 IEC 60730 认证。

把您的调度曲线和年循环次数发给我们，我们会在您自己的数据上跑一遍效率与可用率对比，再定拓扑。"""


def dq(tag, text):
    return f"${tag}${text}${tag}$"


def main():
    existing = query(f"select slug from blog_articles where slug = '{SLUG}';")
    if existing:
        print("ALREADY EXISTS", existing)
        sys.exit(1)

    rows = query(
        "insert into blog_articles (slug, date, read_time, tags) values ("
        f"'{SLUG}', '{DATE}', {READ_TIME}, "
        "array[" + ",".join("'" + t + "'" for t in TAGS) + "]"
        ") returning id;"
    )
    aid = rows[0]["id"]
    print("ARTICLE_ID", aid)

    for loc, cat, title, desc, body in (
        ("en", CAT_EN, TITLE_EN, DESC_EN, BODY_EN),
        ("zh", CAT_ZH, TITLE_ZH, DESC_ZH, BODY_ZH),
    ):
        r = query(
            "insert into blog_article_translations "
            "(article_id, locale, category, title, description, body) values ("
            f"'{aid}', '{loc}', {dq('c1', cat)}, {dq('c2', title)}, {dq('c3', desc)}, {dq('c4', body)}"
            ") returning id, locale;"
        )
        print("TRANSLATION", r)

    print("EN READ TIME", len(BODY_EN.split()), "words")


if __name__ == "__main__":
    main()

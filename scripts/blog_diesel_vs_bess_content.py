# -*- coding: utf-8 -*-
"""Battery storage vs diesel generator backup power — content module."""

SLUG = "battery-storage-vs-diesel-generator-backup-power"
DATE = "2026-11-23"
READ_TIME = 11
TAGS = ["BESS", "Diesel Generator", "Backup Power", "C&I Storage", "Microgrid", "Energy Storage"]

EN_CATEGORY = "C&I Energy Storage"
EN_TITLE = "Battery Storage vs Diesel Generator Backup: Where BESS Wins and Where You Still Need the Genset"
EN_DESCRIPTION = (
    "A cost-and-engineering comparison of battery storage and diesel generator backup for C&I sites: "
    "real fuel curves, ten-year cost per kWh, emissions permit limits, and the hybrid design most projects end up choosing."
)

EN_BODY = r"""For thirty years, a diesel genset was the only serious answer to "what happens when the grid goes down." That assumption is now costing commercial and industrial operators real money. The world average diesel price stood at **USD 1.60 per litre** in November 2026, and in several markets it is up close to 29% year on year. Remote or fuel-logistics-constrained sites pay well above the pump price once delivery, storage losses and theft are counted.

Fuel is only the visible cost. A standby set that spends its life at 20-30% load delivers a kilowatt-hour at **USD 0.30-0.65 all-in**, and closer to USD 0.79 when maintenance is charged by running hour rather than by energy delivered. A lithium BESS charged on a time-of-use tariff cycles that same kilowatt-hour for a fraction of the figure, silently, with no air permit attached.

The honest conclusion is not "replace every generator with a battery." It is: **identify which of three jobs your generator is actually doing**, then buy the cheapest asset that does that job.

## Three jobs, three different answers

Most "BESS vs diesel" comparisons fail before they start, because they treat a 500 kWh battery and a 500 kVA genset as substitutes. Backup power is three distinct duties with three different physics.

| Duty | Typical duration | What decides the design | Diesel | BESS |
|---|---|---|---|---|
| Bridging / ride-through | 2 ms - 60 s | Transfer time, inrush current | Cannot ride through; 10-30 s to stable voltage | Under 20 ms, seamless |
| Autonomy (outage coverage) | 30 min - 4 h | Energy, not power | Unlimited with fuel, if fuel is there | Sized in kWh; 4 h is the sweet spot |
| Daily cycling / peak shaving | 1-4 h/day, 250-350 days/yr | Cycle life, round-trip efficiency | Runs at poor load, wet-stacks | Core use case |

The first row is where batteries win outright, and where most retrofits begin. A diesel set takes **10-30 seconds** to reach stable voltage after a grid trip, and the load sees every millisecond. For a continuous casting line, an injection-moulding press mid-cycle, or a server room, that gap scraps work in progress. A BESS transfers in under 20 ms, often under 10 ms with a closed-transition static switch, and connected equipment never registers the event.

The second row is where diesel still wins on capital cost. The third row is where diesel loses badly, because a set idling 20 hours a day burns nearly the same fuel per kWh as one at full load, and it wears out by running hour regardless of what it delivers.

## The number that decides the case: litres per kWh, not litres per hour

Generator fuel consumption is close to linear with output:

**F (L/h) ≈ 0.08 × P_rated + 0.25 × P_output**

The first term is the no-load penalty: friction, pumping, cooling, excitation. The second is incremental fuel per kilowatt-hour. Efficiency collapses at light load, and the penalty is paid twice because maintenance is billed by the hour too.

| Load factor | Fuel per kWh | Conversion efficiency | Practical consequence |
|---|---|---|---|
| 100% | 0.26-0.29 L | ~30% | Design point |
| 75% | 0.27-0.30 L | ~29% | Efficient band |
| 50% | 0.30-0.35 L | ~24% | Acceptable |
| 25% | 0.40-0.57 L | ~18% | **Wet stacking risk** |

Below roughly 30% load, unburned fuel and carbon accumulate in the exhaust system. Caterpillar's own guidance is to hold standby and prime sets in the **50-85%** band, and to run at 30% or above for 30 minutes out of every four hours of light-load operation purely to keep the engine healthy. That is fuel burned to protect the machine, not to serve the load.

This is the most common design error in backup power: sizing the genset for an inrush peak it will see once a year, then running it at 15% load for the other 8,759 hours. **Oversizing does not add margin. It adds permanent fuel cost.**

## What the ten-year numbers actually look like

Take a 200 kW critical load with 4 hours of autonomy, so 800 kWh usable. Either one 250 kVA diesel set, or one 200 kW / 800 kWh lithium cabinet.

| Line item | Diesel (250 kVA) | BESS (200 kW / 800 kWh) |
|---|---|---|
| Installed capex | USD 35,000-60,000 | USD 240,000-480,000 (USD 300-600/kWh) |
| Fuel or charging energy | 0.30 L/kWh × USD 1.60 = USD 0.48/kWh | USD 0.06-0.15/kWh off-peak grid |
| Fixed O&M | ~USD 0.02/kW-rated per running hour (USD 5/h) | USD 2,000-4,000 per year |
| Major overhaul | Top end 10,000-15,000 h, major 30,000-60,000 h | Not applicable |
| Round-trip efficiency | n/a | 88-92% |
| Realistic service life | 15-30 years, measured by running hour | 10-15 years, 6,000-8,000 cycles |
| On-site emissions and permit | SCR + DPF, ULSD under 10 ppm for Stage V | None |

The capex range reflects 2026 C&I pricing: USD 300-600/kWh at 100-500 kWh, falling toward USD 150-250/kWh above 2 MWh.

Read the table honestly: if the site runs 60 hours of backup a year, diesel is cheaper over ten years, full stop. If the site runs 1,500 hours a year because the grid is weak, or if the set is cycling daily to cut demand charges, the BESS wins on total cost and pays back in **3-5 years** on avoided fuel alone.

## When you still need the generator

Any supplier claiming a battery replaces every genset is selling, not engineering. Keep the generator when:

1. **Outages exceed stored energy with no recharge path.** A battery is a tank; a generator is a pump. Multi-day outages without solar or reliable grid recharge still need liquid fuel.
2. **The load is legally required emergency power.** Under NFPA 110 and NEC Article 700, life-safety emergency systems need a listed power source with a defined 10-second startup and Class 2 or better autonomy. A UL 9540-listed BESS can qualify in many jurisdictions, but it needs the authority having jurisdiction to sign off and documented periodic testing. Do not assume it.
3. **Motor starting dominates the load.** Across-the-line starts of large chillers or crushers pull 5-6× running current for a second or more. A BESS can carry that, but only if the PCS is specified for it and the inrush was actually measured.
4. **Capital is scarcer than operating cost.** A genset is a small cheque. A BESS is not.

## Emissions and permits now decide more projects than fuel price

By 2026 the binding constraint on diesel backup is often the air permit, not the fuel bill. Stage V under Regulation (EU) 2016/1628 caps NOx at **0.40 g/kWh** and PM at **0.01 g/kWh**, and adds a particle-number limit of 1×10¹²/kWh that US Tier 4 Final does not have. Meeting it means DPF, SCR and DOC, and that aftertreatment only survives on **ultra-low-sulphur diesel below 10 ppm** — a fuel-supply commitment, not a purchase order. In the US, stationary generating sets sit under **40 CFR Part 60 Subpart IIII**, separately from the non-road rules, where the emergency-engine hour allowance disappears the moment the set is used for peak shaving, and federal certification is only a floor above which state air permits govern whether the unit may run. California's Tier 5 rulemaking targets roughly 90% below Tier 4 Final for NOx around 2027, and SB 978 has put diesel in hyperscale data centres under direct scrutiny. China applies GB 20891 National Stage IV with GB 36886-2018 for standby sets; India applies CPCB IV+ for 75-800 kW with BIS certification phasing in.

None of that applies to a battery. That is precisely the point.

## The hybrid usually wins, and usually beats both extremes

The middle path — battery-first, genset as backstop — is where most C&I retrofits land. You keep the existing set, run it in its efficient band, and cut its hours. Measured outcomes cluster tightly: **fuel down 20-40%, generator running hours down 60-80%.** One UK construction site reported by Atlas Copco had a generator averaging roughly 10% load; with storage added, engine load moved to 85%, fuel use fell about 75% and running hours about 90%.

| Site type | Base load | Typical fuel reduction | Generator hours avoided |
|---|---|---|---|
| Telecom tower | 3-8 kW | 30-45% | 60-75% |
| Remote village or community | 20-60 kW | 25-40% | 40-60% |
| Construction site | 30-120 kW | 10-20% | 15-30% |
| Mining camp | 150-400 kW | 15-25% | 20-35% |

The design rule that makes hybrids work: **size the genset to average load plus battery headroom, not to peak.** Then let the battery carry starts, transients and the overnight base load. A hybrid still sized for peak is just a diesel site with extra capex.

## A sizing method that holds up

1. **Log the load for two weeks at one-minute resolution.** The overnight curve, not the peak, sizes the battery.
2. **Split critical from sheddable.** Most plants can shed 40-60% of load without stopping production, which nearly halves the battery.
3. **Set autonomy from the outage-duration distribution, not from a wish.** Use the P95 outage length on your feeder rather than the worst event in ten years.
4. **Size the inverter for measured inrush, not nameplate.** Specify the overload envelope in seconds, not as a single kVA figure.
5. **Convert autonomy to nameplate.** Usable kWh = critical kW × hours ÷ depth of discharge ÷ round-trip efficiency. A 4-hour 200 kW duty at 90% DoD and 90% efficiency needs about 988 kWh installed, not 800.
6. **Confirm the recharge path.** If the only recharge is a 120 kW grid connection, refilling 800 kWh takes 6.7 hours — longer than many tariff windows allow.

## What to put in the specification

- **Safety and certification**: IEC 62933-5-2, UL 9540 for the system, UL 9540A cell-level propagation data, IEC 62619 and UN38.3 for cells and modules, GB/T 36276-2023 for China, CE for Europe.
- **Transfer and ride-through**: stated transfer time in milliseconds, closed-transition capability, and a commissioning test that actually drops the grid under load.
- **Generator interface**: reverse-power protection, minimum-load enforcement, start/stop sequencing with warm-up, and documented behaviour when the battery is empty and the genset fails to start.
- **Black start**: if the site must energise from darkness, specify grid-forming capability and prove it in an island test rather than a simulation.
- **Monitoring**: outage log with timestamps, delivered kWh per event, SOC at event start, and litres of fuel saved. You cannot defend the business case in year three without event-level data.

A cabinet in the 100-500 kWh range covers most of the profiles above; the [C&I battery cabinets](/products/ci-battery-cabinets) page lists enclosure, cooling and certification options. For sites that must parallel with an existing generator, the [energy storage system](/products/energy-storage-system) platform supports generator-following and reverse-power control as standard.

## The decision, in one paragraph

If your generator runs fewer than 200 hours a year and outages are short, keep it. If it runs more than 500 hours a year — because the grid is weak, because you cycle it for demand charges, or because you are on diesel around the clock — a battery-first design beats it on total cost within 3-5 years, and the emissions permit argument settles most remaining doubt. If the load is legally required life-safety emergency power, keep the generator and add the battery as the ride-through layer. That is the honest split, and it is what our engineers apply on every [C&I project enquiry](/contact) before quoting a cabinet.
"""

ZH_CATEGORY = "工商业储能"
ZH_TITLE = "储能电池 vs 柴油发电机备电：哪些场景电池完胜，哪些还必须留柴发"
ZH_DESCRIPTION = (
    "从油耗曲线、十年度电成本、排放许可限制三个维度对比储能电池与柴油发电机备电，"
    "并给出大多数工商业项目最终选择的「电池为主、柴发兜底」混合设计方案与选型步骤。"
)

ZH_BODY = r"""三十年来，"停电了怎么办"这个问题只有一个正经答案：柴油发电机。这个默认假设现在正在让工商业用户真金白银地多花钱。2026 年 11 月全球柴油均价约 **1.60 美元/升**，多个市场同比涨幅接近 29%；到了偏远地区或燃油物流受限的站点，把运输、储存损耗和失窃算进去，实际到手价远高于加油站挂牌价。

而燃油只是看得见的那部分。一台长期在 20-30% 负荷下运行的备用机组，把所有成本摊到度电上是 **0.30-0.65 美元/kWh**；如果维保按运行小时而不是按发电量计费，这个数字会逼近 0.79 美元/kWh。同样一度电，用谷段电充进锂电池再放出来，成本只有它的零头，而且没有噪音，不需要排烟许可。

但结论不是"把所有柴发都换成电池"。正确的做法是：**先分清你的柴发到底在干哪三件事中的哪一件**，然后买能干这件事的最便宜的那个设备。

## 三件事，三个不同答案

市面上大多数"储能 vs 柴发"的对比在起点就错了——它们拿 500kWh 的电池和 500kVA 的机组当替代品比。两者根本不是一回事。备用电源其实是三种物理性质完全不同的工况。

| 工况 | 典型持续时间 | 决定设计的因素 | 柴油发电机 | 储能电池 |
|---|---|---|---|---|
| 瞬态支撑（切换过渡） | 2ms - 60s | 切换时间、冲击电流 | 无法穿越；到稳定电压需 10-30 秒 | 20ms 以内，无感切换 |
| 自主供电（停电续航） | 30 分钟 - 4 小时 | 是能量，不是功率 | 有油就无限 | 按 kWh 配；4 小时是甜点区间 |
| 日内循环（削峰填谷） | 每天 1-4 小时，年 250-350 天 | 循环寿命、系统效率 | 低负荷运行、湿堆积 | 核心应用场景 |

第一行是电池完胜的地方，也是绝大多数改造项目的切入点。柴发从电网跳闸到输出稳定电压需要 **10-30 秒**，负载把这十秒一秒不落地全吃下来。对连铸线、注塑机中模、机房来说，这十秒就是整批报废。储能电池切换在 20ms 以内，用静态开关做闭路过渡时可以做到 10ms 以内，后端设备基本感知不到。

第二行是柴发在初始投资上仍然占优的地方。第三行则是柴发输得最惨的地方——一天空转 20 小时的机组，每度电的油耗和一个满负荷运行的机组差不多，而它的磨损是按运行小时算的，不管你发了多少电。

## 决定成败的数字：每度电耗多少油，而不是每小时耗多少油

柴油机的油耗随出力近似线性变化：

**油耗 F（L/h）≈ 0.08 × 额定功率 + 0.25 × 实际出力**

第一项是空载损耗：摩擦、泵送、冷却、励磁。第二项是每度电的增量油耗。轻载时效率断崖式下跌，而且这个代价是付两遍——维保同样按小时计费。

| 负荷率 | 每度电油耗 | 转换效率 | 实际后果 |
|---|---|---|---|
| 100% | 0.26-0.29 L | 约 30% | 设计工况点 |
| 75% | 0.27-0.30 L | 约 29% | 高效区间 |
| 50% | 0.30-0.35 L | 约 24% | 可接受 |
| 25% | 0.40-0.57 L | 约 18% | **湿堆积风险** |

负荷低于 30% 左右，未燃烧的燃油和碳颗粒会在排气系统里堆积，也就是"湿堆积"。卡特彼勒自己的建议是把备用和常用机组保持在 **50-85%** 负荷带内运行，并且每 4 小时轻载运行中至少要有 30 分钟拉到 30% 以上，纯粹为了让发动机保持健康。这部分油烧掉不是为了带负荷，是为了保护机器。

这是备用电源设计里最常见的一个错误：按一年才出现一次的启动冲击峰值选机组容量，然后在剩下的 8759 小时里让它跑在 15% 负荷上。**机组选大不会带来余量，只会带来永久的油耗成本。**

## 十年账本长什么样

假设 200kW 关键负荷、4 小时续航，即 800kWh 可用电量。方案 A 是一台 250kVA 柴油机组，方案 B 是一台 200kW/800kWh 锂电池柜。

| 成本项 | 柴油（250kVA） | 储能（200kW/800kWh） |
|---|---|---|
| 初始投资 | 3.5-6 万美元 | 24-48 万美元（300-600 美元/kWh） |
| 燃料或充电电费 | 0.30L/kWh × 1.60 = 0.48 美元/kWh | 谷段电价折合 0.06-0.15 美元/kWh |
| 固定维保 | 约 0.02 美元/额定 kW/运行小时（约 5 美元/小时） | 每年 2,000-4,000 美元 |
| 大修 | 1-1.5 万小时揭缸，3-6 万小时大修 | 不适用 |
| 系统效率 | 不适用 | 88-92% |
| 实际使用寿命 | 15-30 年（按运行小时折算） | 10-15 年，6,000-8,000 次循环 |
| 现场排放与许可 | SCR+DPF，欧V需硫含量低于 10ppm 的低硫柴油 | 无 |

初始投资区间对应 2026 年工商业真实报价：100-500kWh 系统 300-600 美元/kWh，2MWh 以上随固定成本摊薄降到 150-250 美元/kWh。国内报价会更低，但设备成本占比结构基本一致。

把这张表诚实读完，分界线很清楚。如果站点一年只备用 60 小时，十年下来柴发更便宜，没有争议。如果一年要跑 1500 小时（因为电网弱），或者机组每天循环用来削峰降需量，那储能在总成本上完胜，光靠省下的油钱就能在 **3-5 年**回本。

## 哪些场景必须保留柴发

任何声称"电池可以替代所有柴发"的供应商是在销售，不是在搞工程。以下情况请保留柴发：

1. **停电时长超过储能电量，且没有回充途径。** 电池是个水桶，柴发是台水泵。连续多天停电、又没有光伏或可靠电网回充时，仍然需要液体燃料。
2. **负荷属于法定应急电源。** 按 NFPA 110 和 NEC 700 条，生命安全类应急系统需要经过认证的电源，具备规定的 10 秒启动和 Class 2 以上续航。取得 UL 9540 认证的储能系统在很多地区可以满足，但需要当地主管部门（AHJ）认可，配套合规的切换方案，并提供定期测试记录。不要假设自动过关。国内项目则要看 GB 51348 和 GB 51048-2025 对消防应急电源的具体要求。
3. **电机启动冲击占主导。** 大型冷水机组或破碎机直接启动，冲击电流可达额定电流的 5-6 倍并持续一秒以上。储能可以扛，但前提是 PCS 按这个工况选型，而且冲击电流是实测出来的，不是从铭牌上抄的。
4. **资本比运营成本更稀缺。** 柴发是一张小额支票，储能不是。

## 2026 年，决定项目的往往是排放许可而不是油价

柴油备电在 2026 年越来越硬的约束是空气许可，不是油费账单。欧盟 Stage V（法规 (EU) 2016/1628）把 NOx 限值压到 **0.40 g/kWh**、颗粒物 **0.01 g/kWh**，还加了美国 Tier 4 Final 没有的颗粒数限值 1×10¹²/kWh。达标意味着 DPF+SCR+DOC 全套后处理，而这套后处理只能烧**硫含量低于 10ppm 的低硫柴油**——这是一份燃料供应链承诺，不是一张采购单。美国把固定式发电机组放在 **40 CFR Part 60 Subpart IIII** 下单独管，紧急机组的运行小时豁免一旦用于削峰就立刻失效，联邦认证只是底线，真正决定能不能开的是州和地方的空气许可。加州 Tier 5 立法把 NOx 目标定在比 Tier 4 Final 再低约 90%，落地时间约 2027 年，SB 978 已经把超大规模数据中心的柴油使用纳入直接审查。中国执行 GB 20891 国四非道路标准，备用机组另有 GB 36886-2018；印度对 75-800kW 执行 CPCB IV+，BIS 认证正在分批落地。

这些约束对电池一条都不适用。这正是问题的关键。

## 混合方案通常最优，而且往往比两个极端都便宜

中间路线——电池为主、柴发兜底——是绝大多数工商业改造最终落地的形态。你保留现有柴发，让它跑在高效区，同时砍掉它的运行小时。实测数据高度集中：**油耗下降 20-40%，机组运行小时下降 60-80%。** 阿特拉斯·科普柯报告过一个英国工地案例：原本平均负荷率约 10% 的机组，加上储能后负荷率提升到 85%，油耗下降约 75%，运行小时下降约 90%。

| 站点类型 | 基础负荷 | 典型节油率 | 减少的机组运行小时 |
|---|---|---|---|
| 通信基站 | 3-8 kW | 30-45% | 60-75% |
| 偏远村落/社区 | 20-60 kW | 25-40% | 40-60% |
| 施工工地 | 30-120 kW | 10-20% | 15-30% |
| 矿山营地 | 150-400 kW | 15-25% | 20-35% |

让混合系统成立的设计原则只有一条：**柴发按平均负荷加电池余量选型，不要按峰值选型。** 启动冲击、瞬态过程和夜间基础负荷交给电池。一个仍然按峰值选型的混合项目，本质上就是多花了一笔设备费的柴油站。

## 一套站得住脚的选型方法

1. **以 1 分钟颗粒度记录两周负荷曲线。** 决定电池容量的是夜间曲线，不是峰值。
2. **区分关键负荷和可切负荷。** 多数工厂可以在不停产的前提下切掉 40-60% 的负荷，电池容量直接接近减半。
3. **续航时间按停电时长分布定，不要按愿望定。** 用你这条馈线的 P95 停电时长，而不是十年一遇的最坏情况。
4. **逆变器按实测冲击电流选，不按铭牌。** 过载能力要用"多少秒"来约定，不是给一个 kVA 数字。
5. **把续航折算成铭牌容量。** 可用电量 = 关键负荷 kW × 小时数 ÷ 放电深度 ÷ 系统效率。4 小时 200kW、90% 放电深度、90% 效率，需要装约 988kWh，不是 800kWh。
6. **确认回充路径。** 如果唯一回充方式是 120kW 的电网容量，把 800kWh 充满需要 6.7 小时，比很多峰谷电价窗口都长。

## 采购技术协议里该写什么

- **安全与认证**：IEC 62933-5-2、系统级 UL 9540、电芯级 UL 9540A 热失控扩散数据、电芯与模组 IEC 62619 与 UN38.3；国内项目需 GB/T 36276-2023，欧洲需 CE。
- **切换与穿越**：明确到毫秒的切换时间、是否支持闭路过渡，以及带载真实拉闸的验收测试——不是模拟。
- **柴发接口**：防逆流保护、最小负荷约束、带预热的启停时序，以及"电池放空且柴发启动失败"时的明确定义动作。
- **黑启动**：如果站点需要从全黑状态恢复，要求构网型能力，并且必须做孤岛实测而不是仿真验证。
- **监控**：带时间戳的停电日志、每次事件的实际放电量、事件起始 SOC、累计节省的燃油升数。没有事件级数据，第三年你无法论证这个项目的投资回报。

100-500kWh 区间的储能柜可以覆盖上述大部分负荷画像，[工商业储能柜](/products/ci-battery-cabinets) 页面列出了防护等级、温控方式和认证选项。需要与既有柴发并联运行的站点，[储能系统](/products/energy-storage-system) 平台标配柴发跟随与防逆流控制。

## 一段话讲完这个决策

如果柴发一年只跑 200 小时以内、停电时间又短，保留它就好。如果一年要跑 500 小时以上——因为电网弱、因为每天循环降需量、或者干脆 24 小时靠柴油发电——那么电池优先的方案在 3-5 年内总成本就会反超，排放许可的问题还能顺手解决掉一大半。如果负荷属于法定生命安全应急电源，保留柴发，把电池作为瞬态过渡层加上去。这就是诚实的分界，也是我们的工程师在给出任何一份 [工商业项目报价](/contact) 之前，一定会先和你一起算清楚的那条线。
"""

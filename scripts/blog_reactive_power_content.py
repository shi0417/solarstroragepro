# -*- coding: utf-8 -*-
"""Content for: BESS reactive power and voltage support (PCS sizing, grid codes, cost)."""

SLUG = "bess-reactive-power-voltage-support-guide"
DATE = "2026-11-26"
READ_TIME = 11
TAGS = ["BESS", "Reactive Power", "Grid Code", "PCS", "Voltage Support", "Engineering Design"]

EN_CATEGORY = "Engineering Design"
EN_TITLE = "BESS Reactive Power and Voltage Support: PCS Sizing, Grid Codes and Real Cost"
EN_DESCRIPTION = (
    "Why reactive power, not energy, sets the MVA you must buy: IEEE 1547-2018 and GB/T 36547-2024 "
    "requirements, where VARs disappear between PCS terminals and the meter, a worked 100 MW sizing "
    "example, and what STATCOM alternatives actually cost."
)

EN_BODY = """Ask a developer how big their battery plant is and you get a number in MW. Ask the utility the same question and you get a number in MVA at the point of interconnection, plus a power factor the plant must hold across its entire active power range, in both directions, while charging and while discharging. Those two answers are not the same number, and the gap between them is where a surprising share of BESS projects lose money.

The physics is a right triangle. Apparent power is **S = square root of (P squared + Q squared)**. A converter with an apparent power rating exactly equal to its active power rating has nothing left over for reactive power. For a 50 MW plant held to 0.95 power factor, the reactive obligation is **16.4 MVAr, or 0.329 times rated active power**, and it applies in both lead and lag, at the lowest and the highest grid voltage the plant is expected to ride through.

## Reactive power is half the rating you buy

A PCS is sold in MVA, not MW, because it is a current-limited device. Its active power ceiling is S times power factor. A 3.6 MVA unit running at 0.95 delivers about **3.4 MW**. Procure 100 MW of PCS at unity power factor and you have bought a plant that must curtail real power every time the system operator asks for voltage support - exactly at the moment the grid needs both.

That is why a **100 MW / 0.95 pf** plant needs roughly **105 MVA at the point of interconnection** before any losses are considered. Between the converter terminals and the meter sit three deductions: transformer reactive consumption (a step-up transformer absorbs roughly its short-circuit impedance times the square of its loading, so a 6-8 percent impedance unit eats 6-8 percent of its rating in VARs at full load), collection cable charging, and auxiliary loads. All three are paid for in converter MVA before a single VAR reaches the grid - and contracts written at the PCS terminals but tested at the POI are how thin projects turn unprofitable.

There is a second squeeze that design reviews often miss: the capability circle shrinks with voltage. A converter is limited by current, not by volt-amperes, so at **0.95 per unit voltage it passes roughly 5 percent less apparent power** than at nominal - and that is precisely the low-voltage condition in which the grid code demands the most reactive current.

## What the grid codes actually require

Requirements differ by market, but the shape is similar: a power factor envelope at the POI, a response time, and a control mode that must work without a dispatch signal.

| Framework | Reactive capability at POI | Response / control | Notable extra |
|---|---|---|---|
| IEEE 1547-2018 (US DER) | 0.95 lead to 0.95 lag at rated P; Category B to 0.90 absorbing | Four modes: constant pf, volt-VAR, watt-VAR, constant Q; default is unity pf | Section 7.4 requires autonomous reactive injection during voltage excursions, without waiting for a utility signal |
| FERC Order 827 (US bulk system) | 0.95 lag to 0.95 lead at the high-side of the GSU | Dynamic, continuous | Applies to new large generators including storage |
| GB/T 36547-2024 (China, 10 kV and above) | 0.9 leading to 0.9 lagging, continuously adjustable; Q deviation within +/-3 percent of rated power | Must accept AVC commands; four-quadrant control; emergency power support within 200 ms | Dynamic reactive support coefficient K1 of 1.5-3; overload 110 percent for 10 min, 120 percent for 1 min |
| National European codes (EN 50549 family and country annexes) | Typically 0.90-0.95 at the connection point, defined by a P-Q diagram | Volt-VAR droop and fixed pf modes, set by the DSO | U-Q capability must be shown at minimum and maximum operating voltage, not just nominal |

Two clauses are worth reading twice. IEEE 1547-2018's default volt-VAR curve asks for **at least 0.44 per unit reactive power absorption at 1.05 pu voltage and the same injection at 0.95 pu**, linear in between, with roughly 5 percent tolerance - a droop shape, not a fixed setpoint. And the Chinese standard's K1 coefficient, between 1.5 and 3, ties reactive current to voltage deviation rather than to a power factor, which pushes designers toward converters with genuine current headroom rather than a nominally compliant nameplate.

## Worked example: 100 MW / 400 MWh

Take a plant with 100 MW at the POI, a 0.95 pf obligation, a 33/0.69 kV step-up transformer at 7 percent impedance, and auxiliary load of 1.5 percent.

1. **Reactive obligation at the POI:** 100 MW x tan(acos 0.95) = 32.9 MVAr in each direction.
2. **Transformer consumption:** roughly 7 percent of its throughput at full load, around 7 MVAr that the converters must supply before anything reaches the grid.
3. **Auxiliaries and cable losses:** about 1.5 MW of active power and 1-2 MVAr of reactive consumption.
4. **Converter MVA required:** the square root of (101.5 squared + 41.9 squared) is close to **110 MVA**, about 10 percent above the nameplate MW.

Ten percent of extra converter capacity is not a rounding error on a 100 MW project; it is the cheapest insurance in the plant. The alternative is permanent curtailment logic that surrenders active power whenever voltage support is called for.

## Overrated PCS, STATCOM, or capacitor banks?

Four technologies can meet a reactive obligation, and they are not interchangeable on cost or speed.

| Option | Typical cost | Response | Best fit |
|---|---|---|---|
| Switched capacitor banks | EUR 20-40 per kVAr installed | 40-200 ms | Steady-state voltage rise on a strong grid; no dynamic duty |
| Thyristor-switched capacitors | EUR 60-100 per kVAr | 5-20 ms | Flicker and step changes; harmonic-sensitive sites with detuned reactors |
| STATCOM (VSC or MMC) | MISO planning figure USD 226,000 per MVAr; EU turnkey EUR 80-120 per kVAr for 10-50 MVAr class | Under 5 ms | Weak grids, fast voltage recovery, sites with no energy throughput need |
| BESS PCS with MVA headroom | Incremental MVA on the PCS already being bought | Under 5 ms, limited by current | Plants already justified by energy arbitrage or capacity |

The comparison is not close once the battery is already paid for. Adding MVA headroom to a converter you are buying anyway costs a fraction of a standalone STATCOM, and it delivers the same sub-cycle response plus the ability to inject active power in the same instant. A standalone STATCOM at USD 226,000 per MVAr for 33 MVAr is roughly **USD 7.5 million of capital that produces no energy revenue**; the same capability bought as PCS headroom is typically a low single-digit percentage of EPC cost.

## The control modes are separate deliverables

A datasheet line reading "power factor 0.9 leading to 0.9 lagging" says nothing about how the plant behaves when voltage moves. Specify four things separately:

- **Constant power factor** - the default, and the mode most utilities actually enable. It provides no voltage regulation, only a fixed Q/P ratio.
- **Volt-VAR with a stated droop and deadband** - the mode that earns its keep on a weak feeder, and the one that must be witnessed at FAT, not promised in firmware.
- **Constant Q or AVC response** - the mode a transmission operator dispatches. China's GB/T 36547-2024 requires AVC command following explicitly.
- **Reactive priority during low voltage** - when current is limited, does the controller sacrifice active power or reactive current? Get this in writing with a curve, because the answer decides whether the plant trips or rides through.

Also confirm the measurement chain. A plant controller computing VARs from PCS-terminal CTs and one computing them at the POI meter will disagree by the transformer and auxiliary consumption - a compliance argument you do not want during energisation. California's Rule 21 practice (IEEE 2030.5 communications, one-second data logging retained 30 days) is a reasonable template for the evidence a utility will demand.

## Does voltage support pay?

Mostly not as a primary revenue line, and it is worth being honest about that. In Great Britain, NESO launched a long-term (Y-4) reactive power market and opened the mid-term (Y-1) market on 6 October 2026, with qualification windows and a design life to April 2032. Crucially, both pay only for capability **above** the Grid Code obligation, and the volumes are locational - South West England voltage support, for instance. Meanwhile the GB battery index sat at GBP 93,000 per MW per year in October 2026, of which wholesale arbitrage was GBP 55,000; reactive power does not appear as a material line item.

In China the picture is different in form but similar in weight: reactive power and AVC performance are assessed under the grid company's auxiliary service rules, with penalties for deviation and limited compensation for compliance. Reactive capability is therefore a **cost of entry and a source of penalties**, not a profit centre.

That framing changes the procurement question. You are not buying a revenue stream; you are buying the right to discharge at full active power while meeting the code, avoiding AVC penalty exposure, and staying connected in a voltage dip that would otherwise trip the plant. Priced that way, the MVA headroom almost always pays for itself within the first year of operation.

## What to put in the RFQ

1. **State the obligation at the POI**, not at the PCS terminals, and state it at minimum, nominal and maximum operating voltage.
2. **Require a measured P-Q capability diagram** at the site's maximum ambient temperature, not a nameplate circle at 25 degrees C.
3. **Ask for the low-voltage current priority curve** - active or reactive first, and at what per-unit voltage it changes.
4. **Specify the volt-VAR droop, deadband and response time** as numbers, with a FAT witness test.
5. **Name the control modes** required (constant pf, volt-VAR, constant Q, AVC) and confirm they ship in production firmware.
6. **Define where VARs are measured** - POI meter, plant controller, or PCS - and require the plant controller to compensate for transformer and auxiliary consumption.
7. **Require validated RMS and EMT models** matching the shipping firmware; interconnection studies are only as good as the model.
8. **Include the reactive capability in the capacity test**, so the guarantee covers MVA at the meter rather than MW at the skid.

Reactive power is the least glamorous number in a storage specification and one of the few that can invalidate a completed plant at energisation. Treat the MVA rating, the P-Q envelope and the control modes as three separate contractual deliverables, and the plant will pass its performance test the first time.

For containerised C&I and utility-scale platforms with specified reactive headroom, see our [C&I battery cabinets](/products/ci-battery-cabinets) and [grid-scale energy storage systems](/products/energy-storage-system), or [talk to our engineering team](/contact) with your interconnection power factor requirement and we will size the PCS MVA against it.
"""

ZH_CATEGORY = "工程设计"
ZH_TITLE = "储能电站无功与电压支撑:PCS 容量留多少、并网标准怎么卡、钱到底花在哪"
ZH_DESCRIPTION = (
    "储能项目最容易在并网验收时翻车的一项指标,往往不是能量,而是无功。本文拆解 IEEE 1547-2018 与 "
    "GB/T 36547-2024 的无功要求、从 PCS 端子到并网点的无功损耗去向、100MW/400MWh 项目的容量推算,"
    "以及 STATCOM 与 PCS 留容量的成本对比。"
)

ZH_BODY = """问开发商项目多大,回答是"100MW"。问电网同一个项目,回答是并网点 100MVA 以上的视在功率,加上一个贯穿全有功区间、充放电双向都要守住的功率因数。这两个数字不是同一个数字,中间的差额就是不少储能项目在并网前才发现已经亏掉的那部分钱。

底层是一道勾股定理:**视在功率 S = √(P² + Q²)**。一台视在容量正好等于有功容量的变流器,留给无功的余量是零。一个 50MW 项目按 0.95 功率因数考核,无功考核值是 **16.4Mvar,约为额定有功的 0.329 倍**,而且要超前、滞后双向都能给,在最低和最高运行电压下都要给得出来。

## 无功决定了你要买的 MVA,而不是电池

PCS 按 MVA 卖、不按 MW 卖,因为它是电流受限设备。有功上限等于视在容量乘以功率因数。一台 3.6MVA 的机器在 0.95 功率因数下只能出 **约 3.4MW**。如果按 1.0 功率因数去买 100MW 的 PCS,买到的是一个"调度一要电压支撑就得压有功"的电站——而这恰恰是电网既缺有功又缺无功的时刻。

所以 **100MW、0.95 功率因数**的项目,在并网点至少需要 **约 105MVA**,这还没算损耗。从 PCS 端子到计量点之间有三笔扣减:升压变本身吸收的无功(约等于短路阻抗标幺值乘以负载率的平方,一台 7% 阻抗的变压器满载时要吃掉自身容量 7% 左右的无功)、集电电缆的充电功率与压降、以及站用电。这些都要先用变流器的 MVA 垫付,才有一个 var 送到电网。合同按 PCS 端子写、验收按并网点测,是项目利润被吃掉的经典路径。

还有一处常被设计评审忽略的收紧:能力圆随电压塌缩。变流器受电流限制而不是受视在功率限制,因此在 **0.95 倍额定电压下可用的视在功率大约少 5%**——而这正是低电压、电网最需要无功电流的工况。

## 并网标准到底卡了什么

各国条款不同,但形状一致:并网点的功率因数包络、响应时间、以及一个不依赖调度信号的本地控制模式。

| 标准体系 | 并网点无功能力 | 响应与控制 | 附加要求 |
|---|---|---|---|
| IEEE 1547-2018(美国分布式电源) | 额定有功下 0.95 超前至 0.95 滞后;Category B 吸收侧可到 0.90 | 四种模式:恒功率因数、volt-VAR、watt-VAR、恒无功;默认单位功率因数 | 第 7.4 条要求在电压越限时自主注入无功,不等调度指令 |
| FERC Order 827(美国大电网) | 主变高压侧 0.95 滞后至 0.95 超前 | 动态、连续 | 适用于含储能在内的新建大机组 |
| GB/T 36547-2024(中国,10(6)kV 及以上) | 并网点功率因数 0.9(超前)至 0.9(滞后)连续可调;无功控制偏差不超过额定功率的 ±3% | 必须响应 AVC 指令;四象限功率控制;200ms 内达到最大可充/可放功率 | 动态无功支撑系数 K1 取 1.5~3;过载 110% 持续 10min、120% 持续 1min |
| 欧洲各国网码(EN 50549 系列及国别附录) | 接入点通常 0.90~0.95,以 P-Q 图定义 | 由配电网运营商设定 volt-VAR 下垂或恒功率因数 | 需给出最低与最高运行电压下的 U-Q 能力,不能只报额定点 |

两条值得反复读。IEEE 1547-2018 的默认 volt-VAR 曲线要求 **1.05 倍电压时至少吸收 0.44 倍无功、0.95 倍电压时至少注入 0.44 倍无功**,中间线性,容差约 5%——是一条下垂曲线,不是一个固定设定值。而国标 GB/T 36547-2024 的 K1 系数(1.5~3)把无功电流与电压偏差直接挂钩,而不是挂在功率因数上,这会逼着设计方去要真正有电流余量的变流器,而不是铭牌上"合规"的变流器。

另外别漏掉《锂离子电池储能电站设计规范》的口径:并网点电压升到 110%~130% 时,在满足动态无功支撑能力的前提下应保持故障前的有功;不参与系统无功调节时,并网点超前或滞后功率因数不小于 0.95。这两句合起来,等价于"你必须有功满发的同时还有无功余量"。

## 算一遍:100MW / 400MWh

假设并网点 100MW、考核 0.95 功率因数、33/0.69kV 升压变阻抗 7%、站用电 1.5%。

1. **并网点无功考核值:**100 × tan(arccos 0.95) ≈ **32.9Mvar**,超前滞后双向。
2. **升压变吸收:**满载约吞吐量的 7%,即 **约 7Mvar** 必须由变流器先垫付。
3. **站用电与集电线路:**约 1.5MW 有功、1~2Mvar 无功。
4. **变流器所需视在容量:**√(101.5² + 41.9²) ≈ **110MVA**,比铭牌有功高约 10%。

10% 的额外变流器容量,在一个 100MW 项目上不是四舍五入的误差,而是全站最便宜的一份保险:否则你换来的是一套永久的限功率逻辑——只要调度要电压支撑,就得交出一部分有功,而市场收入是按 MW 结算的,不是按 Mvar。

## 三条路线:PCS 留容量、STATCOM、还是电容器

同一份无功考核,有四种技术能满足,成本和速度完全不可互换。

| 方案 | 典型造价 | 响应 | 适用场景 |
|---|---|---|---|
| 机械投切电容器组 | 安装约 20~40 欧元/kvar | 40~200ms | 强电网的稳态电压偏高,无动态考核 |
| 晶闸管投切电容器 TSC | 约 60~100 欧元/kvar | 5~20ms | 闪变与阶跃负荷;需配 7% 或 14% 电抗器 |
| STATCOM(VSC 或 MMC) | MISO 规划单价约 22.6 万美元/MVAr;欧洲 10~50MVar 级整机 80~120 欧元/kvar | 5ms 以内 | 弱电网、故障后电压恢复,或完全不需要能量吞吐的站点 |
| BESS 的 PCS 留 MVA 余量 | 在已采购的 PCS 上加容量 | 5ms 以内,受电流限制 | 本来就靠能量套利或容量支撑立项的电站 |

一旦电池已经买了,这道比较几乎没有悬念。在本来就要买的变流器上加 MVA 余量,成本只是独立 STATCOM 的零头,却给出同样的亚周波响应,还能在同一时刻注入有功。33Mvar 的独立 STATCOM 按 22.6 万美元/MVAr 算,大约是 **750 万美元一笔不产生任何能量收入的资本开支**;同样能力以 PCS 余量形式买,通常是 EPC 成本的低个位数百分比。

## 四种控制模式是四份独立的交付物

铭牌上写"功率因数 0.9 超前至 0.9 滞后",完全没有说明电压变动时电站怎么动作。要分开写清四件事:

- **恒功率因数**——默认项,也是多数调度实际投运的模式。它不提供电压调节,只维持固定的 Q/P 比例。
- **带明确下垂率与死区的 volt-VAR**——弱馈线上真正起作用的那一项,也是必须在工厂验收试验(FAT)上被见证、而不是在固件路线图里被承诺的那一项。
- **恒无功或 AVC 响应**——输电网调度会下指令的模式。GB/T 36547-2024 明确要求响应 AVC。
- **低电压下的电流优先权**——电流被限住时,控制器是先牺牲有功还是先牺牲无功电流?要一条曲线写进合同,因为这个答案决定电站是穿越还是脱网。

还要确认测量链路。用 PCS 端子 CT 算无功的站控,和用并网点计量表算无功的站控,结果会差一整个变压器加站用电的量,这个差额在送电验收阶段就是一场合规争论。美国加州 Rule 21 的做法(基于 IEEE 2030.5 通信、1 秒粒度数据本地留存 30 天)是一个合理的参照,说明电网会拿什么当证据。

## 无功到底值不值钱?

作为主营收入,基本不值,这一点要诚实。英国 NESO 已上线长期(Y-4)无功市场,并于 2026 年 10 月 6 日开放中期(Y-1)市场,资格窗口滚动开放、机制设计寿命到 2032 年 4 月;但两者都只为**超出 Grid Code 义务之外**的能力付费,而且带地理位置属性(例如英格兰西南部的电压支撑)。同期英国电池储能指数约 9.3 万英镑/MW/年,其中现货套利 5.5 万英镑,无功根本进不了主要收入科目。

国内的形态不同、权重相似:无功和 AVC 合格率纳入电网辅助服务考核,偏差要罚,合规的补偿很有限。也就是说,无功能力是**准入门槛和罚款来源**,不是利润中心。

这个定性会改变采购提问的方式。你买的不是一条收入流,而是"满发有功的同时满足网码、不背 AVC 考核、在电压跌落时不脱网"的权利。按这个口径算账,PCS 的那点 MVA 余量通常在投运第一年就回本了。

## RFQ 里必须写死的八条

1. **把考核点写在并网点**,不是 PCS 端子;且要覆盖最低、额定、最高三种运行电压。
2. **要实测 P-Q 能力图**,按站址最高环境温度给,不要 25℃ 的铭牌圆。
3. **要低电压下的电流优先曲线**:先有功还是先无功,在哪个电压点切换。
4. **把 volt-VAR 下垂率、死区、响应时间写成数字**,并在 FAT 上见证。
5. **点名必须支持的控制模式**(恒功率因数、volt-VAR、恒无功、AVC),并确认量产固件即可交付。
6. **定义无功的测量位置**(并网点表计/站控/PCS),并要求站控补偿升压变与站用电消耗。
7. **要求与出货固件一致的 RMS 与 EMT 仿真模型**——并网计算的可信度不会超过模型本身。
8. **把无功能力纳入容量考核**,让保证值覆盖"表计处的 MVA",而不是"撬块处的 MW"。

无功是储能技术规范里最不起眼的一个数,却也是少数能让一座建成的电站在送电当天验收不通过的数。把 MVA 容量、P-Q 包络、控制模式当成三份独立的合同交付物去管,性能试验一次过是大概率事件。

需要预留无功余量的柜式工商业与电网级平台,可查看[工商业储能柜](/products/ci-battery-cabinets)与[电网级储能系统](/products/energy-storage-system),也可以把并网点的功率因数考核值发给我们,[由工程团队按此反推 PCS 的 MVA 容量](/contact)。
"""

CONTENT = {
    "en": {
        "category": EN_CATEGORY,
        "title": EN_TITLE,
        "description": EN_DESCRIPTION,
        "body": EN_BODY,
    },
    "zh": {
        "category": ZH_CATEGORY,
        "title": ZH_TITLE,
        "description": ZH_DESCRIPTION,
        "body": ZH_BODY,
    },
}

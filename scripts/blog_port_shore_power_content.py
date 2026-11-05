# -*- coding: utf-8 -*-
"""Final content for port shore-power BESS article (tightened to 800-1500 words)."""

SLUG = 'port-shore-power-battery-storage-cold-ironing'
DATE = '2026-11-05'
READ_TIME = 9
TAGS = ["BESS", "Port Electrification", "Shore Power", "Microgrid", "Marine"]

EN_CATEGORY = 'Applications'
EN_TITLE = 'Port Shore Power and Battery Storage: Engineering the Cold Ironing Grid'
EN_DESCRIPTION = (
    'Berthed ships arrive as multi-megawatt step loads that terminal feeders were never sized for. '
    'How to size a BESS for shore power buffering, crane regeneration capture and frequency conversion, '
    'what AFIR and CARB actually require, and the marine design details that keep the container alive in salt air.'
)

EN_BODY = """A berthed container ship does not behave like a building load. When it plugs in, three to five megawatts appear on the terminal feeder within seconds. A cruise vessel can hold **8 to 12 MW of hotel load** for a ten-hour call, and the largest berth connections reach **24 MW**. That is a step change, not a ramp — and it now arrives on a timetable set by regulators rather than by the utility that owns the feeder.

That collision is why **battery energy storage at ports** has moved from pilot to standard engineering scope. Here is the load problem, the regulatory clock, the three jobs a BESS does at a berth, how to size the buffer, and what changes once the enclosure has to survive salt air for a decade.

## Why a Berth Is the Hardest Load on the Grid

**Ship-to-shore (STS) cranes and rubber-tyred gantries (RTGs)** draw multi-megawatt pickups and drops in rapid cycles, around the clock. Lowering a loaded spreader turns the hoist motor into a generator, pushing energy back onto the DC bus — energy that, without storage, burns in braking resistors or exports as spiky, distorted power.

**Cold ironing** is the opposite shape: an almost instantaneous step to multi-megawatt continuous demand, held flat for the call, then gone. Port calls are also *coincident* — two vessels on the same tide can double berth demand in one minute.

The result is a load factor near 30% against a peak 3× to 5× the average. Utilities size and price for that peak, so terminals pay for capacity used a few hours a week — or wait years in an interconnection queue while their electrification plan stalls.

## The Regulatory Clock Is Already Running

Shore power is no longer a sustainability gesture. In the EU and California it is an obligation with dates attached.

| Jurisdiction | Instrument | Obligation | Deadline |
|---|---|---|---|
| EU | AFIR, Reg. (EU) 2023/1804, Art. 9 | TEN-T maritime ports must supply shore electricity for **90% of port calls** by container ships >5,000 GT (>100 calls/yr), ro-ro passenger and high-speed craft >5,000 GT (>40), other passenger ships >5,000 GT (>25) | 31 Dec 2029 |
| EU | FuelEU Maritime, Reg. (EU) 2023/1805 | Vessels must use on-shore power for their **entire electrical demand at berth** | 1 Jan 2030 |
| California | CARB At-Berth Regulation | Connect within **2 hours of arrival**, stay until 1 hour before the pilot boards | Container, reefer, cruise since 2023; ro-ro and LA/LB tankers since 2025; all remaining tankers 1 Jan 2027 |

One detail matters more than it looks: calls under two hours, zero-emission vessels, and cases of **exceptional risk to grid stability** are excluded from the 90% target. That exemption is an official admission that some berths cannot carry the load without reinforcement — and storage turns that structural problem into a controls problem, cheaper and much faster to deliver.

There is also a standards layer most suppliers miss. High-voltage shore connections follow **IEC/IEEE 80005-1**, low-voltage connections **IEC/IEEE 80005-3**, and both define voltage and frequency windows at the ship's terminal that a weak feeder struggles to hold when a 6 MW load switches on. The storage PCS is then not just a buffer but the stiff source keeping the berth supply inside that window.

## Three Jobs a Battery Does at a Port

**1. Berth buffer and transformer deferral.** The battery co-supplies the vessel connection so grid draw stays inside existing capacity. Value comes mostly from the *avoided* upgrade — new substation, feeder or transformer bay — which routinely costs more than the storage and takes far longer. Berth demand is also unusually predictable, following a schedule published weeks ahead. Forecast-driven peak shaving works best exactly where the peak is schedulable.

**2. Crane regeneration capture and flicker control.** Energy returned during load lowering is recovered into the battery and reused on the next lift. Terminals commonly see **double-digit percentage energy recovery** on crane duty, and with thousands of cycles a day the savings compound. The same buffer removes the flicker that rapid crane cycling injects into the feeder.

**3. Frequency conversion support and electrification headroom.** European and Asian grids run at 50 Hz; most ocean-going vessels are built for 60 Hz, so a shore connection needs a frequency converter. A battery on that converter's DC link smooths the transition and rides through faults — then gives the terminal headroom to electrify e-RTGs, reefer stacks and truck charging without another grid application.

## Sizing the Berth Buffer: A Worked Example

Take a terminal with four berths, an existing 8 MVA service (about 6.4 MW usable at 0.8 PF), 1.5 MW base load, and 5 MW vessel demand per berth at an average eight-hour stay.

Two ships at once means 11.5 MW against a 6.4 MW service — a 5.1 MW deficit. Full bridging for eight hours would need 40 MWh, which almost never pencils. What gets built is a shave to the service limit:

**Required usable energy = (vessel + base − grid limit) × hours shaved ÷ usable depth of discharge**

| Option | Power / Energy | Grid draw, 2 ships | Bridging | Typical use |
|---|---|---|---|---|
| Minimal shave | 2 MW / 4 MWh | 9.5 MW *(needs upgrade)* | — | Single-berth terminals |
| Standard buffer | 5 MW / 10 MWh | 6.5 MW | ~2 h at full shave | Two berths, scheduled calls |
| Islanding-capable | 5 MW / 15 MWh | 6.5 MW | ~3 h, plus berth black-start | Weak-grid, storm resilience |

Two rules from operating plants. Hold a **state-of-charge floor around 40%**, not 10%: the next vessel does not announce itself an hour ahead, and an empty battery at the wrong moment is a demurrage claim. And size the **PCS for the step**, not the average — it must accept a 5 MW pickup without tripping.

## Design Details That Decide Whether It Survives

A port is a **C5-M corrosivity environment** under ISO 12944, and a standard IP54 cabinet will not last there. What we specify:

- **Enclosure**: IP55 minimum, 316 stainless hardware, tinned copper busbars, conformal-coated BMS boards, salt fog tested to **IEC 60068-2-52**.
- **Thermal management**: closed-loop liquid cooling isolated from any seawater circuit, or filtered positive-pressure air. Size for 45–50°C ambient plus deck solar gain, and derate honestly — a cabinet rated at 25°C loses meaningful continuous power at 45°C. Add anti-condensation heaters with dew-point logic.
- **Power quality and protection**: THD and flicker limits at the point of common coupling, filtering designed against the vessel's converter load, arc-flash study, and earth-fault detection that tells a vessel isolation fault from a terminal fault.

## Safety and Certification Stack

Port authorities and insurers ask for a paper trail, not a datasheet claim.

| Standard | Covers |
|---|---|
| IEC 62619 / IEC 63056 | Industrial lithium cell and stationary battery safety |
| UN 38.3 | Transport of cells and modules |
| IEC 62933-5-2 | Grid-integrated EES systems — safety requirements |
| IEC 60730 | BMS functional safety (Class B controls) |
| NFPA 855 / UL 9540A | Installation safety and thermal runaway propagation testing |
| IEC 60092 / IEC 60332 | Marine electrical installations and cable flame propagation, where the asset sits on a barge or vessel |

## Where the Money Actually Comes From

Five lines stack at a berth, and the ranking surprises first-time developers:

1. **Avoided grid reinforcement** — the substation upgrade that no longer happens.
2. **Demand charge reduction** — monthly kW charges on a 30% load factor are brutal.
3. **Crane regeneration capture** — recovered energy plus less braking-resistor maintenance.
4. **Tariff arbitrage** — charge off-peak, discharge into the shore-power sale.
5. **Ancillary or capacity services** — real but constrained: berth load is intermittent.

A published optimisation study of the **Port of Ancona** in *Frontiers in Energy Research* gives an order of magnitude. Against 53.7 GWh of annual consumption, roughly 47% of it maritime, its low-intensity cold-ironing scenario paired **12.9 MWp of solar with a 12.4 MWh LFP battery and a 16 MW shore connection**, reporting a **56% cut in operational carbon, electricity at €0.267/kWh, a 32.5% IRR and a 3.1-year payback** — assuming a 25-year life, 5% discount rate and full battery replacement in year 12.

## Five Questions That Separate Real Suppliers

1. What is your continuous rating at 45°C ambient, derated honestly?
2. Show me a salt-fog test report for the actual enclosure, not the paint supplier's certificate.
3. How does the EMS ingest the vessel schedule, and what happens when a call arrives four hours early?
4. What is the PCS response to a 5 MW step, and will it ride through a berth-side fault without dropping the ship?
5. What is the augmentation plan at year 8 and year 12, and who pays for the crane lift?

## What We Build for Port Electrification

Our **C&I battery cabinets** in the 100–500 kWh class handle single-berth buffering, crane regeneration capture and terminal peak shaving, with IP55 enclosures, liquid cooling and the corrosion package above. Where a terminal must bridge several berths or a cruise connection, our **grid-scale BESS containers** scale from 1 MW to 5 MW per unit and pair with **PCS** sized for 50/60 Hz shore-power conversion.

Both lines ship with IEC 62619, UN 38.3, GB/T 36276-2023, CE and IEC 60730 documentation, plus the derating curves, salt-fog reports and protection coordination files a port engineer will ask for.

**[Send us your berth load profile and vessel schedule](/contact)** and we will return a sizing study — power, energy, SOC strategy and a demand-charge model — you can drop into your business case. Review the **[C&I battery cabinet](/products/ci-battery-cabinets)** and **[containerized BESS](/products/energy-storage-system)** specifications first if you prefer."""

ZH_CATEGORY = '应用方案'
ZH_TITLE = '港口岸电配储：冷熨烫（Cold Ironing）的电网工程解法'
ZH_DESCRIPTION = (
    '靠港船舶是典型的兆瓦级阶跃负荷，码头原有供电容量根本接不住。本文讲清岸电缓冲、吊机再生能量回收、'
    '变频支撑三类储能用法的容量测算方法，梳理欧盟 AFIR 与加州 CARB 的硬性时间表，'
    '以及决定储能柜能否在盐雾环境撑过十年的设计细节。'
)

ZH_BODY = """一艘靠港的集装箱船不是"一栋楼"那样的负荷。它插上岸电的瞬间，**3～5MW** 的功率在几秒内就压到码头馈线上。邮轮更极端，十小时停靠期内持续 **8～12MW** 的酒店负荷，最大的单泊位岸电容量已经做到 **24MW**。这是一次阶跃，不是一条斜坡——而它的到来节奏由法规决定，不由拥有这条馈线的供电公司决定。

这正是**港口储能**从试点项目变成标准设计内容的原因。下面讲清楚四件事：码头负荷为什么这么难带、法规时间表走到哪一步、储能在泊位上的三种用法、容量怎么算；最后说清楚，当柜子要在盐雾里活十年，设计上要变什么。

## 为什么泊位是电网上最难带的负荷

**岸桥（STS）与轮胎吊（RTG）**：兆瓦级功率快速起落，24 小时不停。吊具带载下降时起升电机变成发电机，能量回馈到直流母线——没有储能，这部分能量要么在制动电阻上烧掉，要么以尖峰和畸变的形式返送电网。

**岸电（冷熨烫）**形状完全相反：几秒内跳变到兆瓦级并持续整段靠泊时间，然后消失。而且靠泊是**同时发生**的——两条船赶同一个潮位进港，泊位需求可以在一分钟内翻倍。

结果是负荷率可能只有 30%，峰值却是平均值的 3～5 倍。供电公司按峰值定容和计价，码头于是为每周只用几小时的能力付钱，或者在接入排队里等上几年，让整个电气化计划卡住。

## 法规时间表已经在跑

岸电不再是"绿色形象工程"。欧盟和加州都已经是带日期的法定义务。

| 地区 | 法规 | 要求 | 时限 |
|---|---|---|---|
| 欧盟 | AFIR 法规 (EU) 2023/1804 第 9 条 | TEN-T 海运港口须为 **90% 靠泊艘次**提供岸电：5000 总吨以上集装箱船（年靠泊 >100 艘次）、5000 总吨以上滚装客船与高速客船（>40 艘次）、其他 5000 总吨以上客船（>25 艘次） | 2029 年 12 月 31 日 |
| 欧盟 | FuelEU Maritime 法规 (EU) 2023/1805 | 船舶在泊期间**全部用电需求**须使用岸电 | 2030 年 1 月 1 日 |
| 美国加州 | CARB 远洋船舶靠泊法规 | 抵港 **2 小时内**接入，直至引航员登船前 1 小时 | 集装箱/冷藏/邮轮 2023 年起；滚装及洛杉矶、长滩油轮 2025 年起；其余港口油轮 2027 年 1 月 1 日起 |

AFIR 里有一条细节比看上去更重要：**不足 2 小时的靠泊、零排放船舶、以及"对电网稳定构成特殊风险"的情形**不计入 90% 考核。这条豁免本质上是官方承认——有些泊位不加电网加强就是接不住。储能把这个结构性问题变成了控制问题，不但便宜，而且快得多。

还有一层标准很多供应商会漏掉。高压岸电按 **IEC/IEEE 80005-1**，低压岸电按 **IEC/IEEE 80005-3**，两者都规定了船舶接线端的电压与频率窗口。一条薄弱的码头馈线，在 6MW 负荷开关的瞬间很难守住这个窗口。此时储能不只是"缓冲"，它的 PCS 就是那个把岸电供电钉在窗口内的刚性电源。

## 储能在泊位上的三种用法

**一、泊位缓冲与变压器延期。** 电池与岸电共同出力，把电网侧取电压在既有容量之内。价值主要来自**被避免的电网加强**——新建变电站、新馈线、新变压器间隔，通常比储能本身更贵，交付周期也更长。而且泊位需求可预测性极好，跟着提前几周公布的船期走。预测驱动的削峰，最适合的就是"峰值可排期"的场合。

**二、吊机再生能量回收与闪变治理。** 吊具下降回馈的能量被电池吸收，下一次起升再用掉。码头吊运工况的能量回收率普遍能做到**两位数百分比**，一天循环几千次，收益是复利式的。同一个缓冲还顺手治掉了吊机快速循环注入馈线的闪变。

**三、变频支撑与电气化余量。** 欧洲和亚洲电网是 50Hz，绝大多数远洋船舶按 60Hz 建造，岸电必须配变频装置。电池接在变频器直流环节上，可以平滑切换过程、扛住变流器故障；同一套储能随后又给码头腾出继续电气化的余量——电动轮胎吊、冷箱堆场、集卡充电，不用再走一次并网申请。

## 容量怎么算：一个算例

假设码头 4 个泊位，既有 8MVA 报装容量（功率因数 0.8，可用约 6.4MW），基础负荷 1.5MW，单泊位船舶需求 5MW，平均靠泊 8 小时。

两条船同时在泊：10MW 船舶负荷加 1.5MW 基础负荷 = **11.5MW，可用容量只有 6.4MW**，缺口 5.1MW。若全程桥接 8 小时需要 40MWh，几乎不可能算得过账。实际工程做的是"削到报装容量为止"：

**所需可用电量 =（船舶负荷 + 基础负荷 − 电网限值）× 削峰时长 ÷ 可用放电深度**

| 方案 | 功率 / 电量 | 两船在泊时电网取电 | 桥接时长 | 适用场景 |
|---|---|---|---|---|
| 最小削峰 | 2MW / 4MWh | 9.5MW（仍需扩容） | — | 单泊位码头 |
| 标准缓冲 | 5MW / 10MWh | 6.5MW | 满功率削峰约 2 小时 | 双泊位、船期可排 |
| 可孤岛 | 5MW / 15MWh | 6.5MW | 约 3 小时，并可为泊位黑启动 | 弱电网、抗台风保供 |

运行项目的两条定容原则。第一，**SOC 下限按 40% 留，不要按 10% 留**：下一条船不会提前一小时通知你，在错误的时间点拿出一块空电池，就是一张滞期索赔单。第二，**PCS 按"阶跃"定容，不按平均功率定容**——变流器必须能接下 5MW 突加负荷而不跳机。

## 决定柜子能不能撑十年的设计细节

按 ISO 12944，港口属于 **C5-M 腐蚀等级**，常规 IP54 工业柜在这里撑不住。我们的配置是：

- **柜体**：不低于 IP55，外部 316 不锈钢紧固件，铜排镀锡，BMS 板三防漆涂覆，按 **IEC 60068-2-52** 做盐雾试验。
- **热管理**：与海水回路完全隔离的闭式液冷，或正压过滤风冷。按 45～50℃ 环温加甲板日照辐射选型，降额要老实标——25℃ 标的连续功率，到 45℃ 会掉一截。再加露点逻辑的防凝露加热器。
- **电能质量与保护**：公共连接点的 THD 与闪变限值，滤波器按船舶变流器负载设计；弧闪分析，以及能区分"船舶绝缘故障"和"码头故障"的接地故障检测。

## 安全与认证组合

港务局和再保人看的是证据链，不是参数页。

| 标准 | 覆盖内容 |
|---|---|
| IEC 62619 / IEC 63056 | 工业锂电池与固定式电池安全 |
| UN 38.3 | 电芯与模组运输 |
| IEC 62933-5-2 | 并网储能系统安全要求 |
| IEC 60730 | BMS 功能安全（B 类控制） |
| NFPA 855 / UL 9540A | 安装安全与热失控扩散测试 |
| IEC 60092 / IEC 60332 | 船舶电气装置与电缆阻燃（储能置于驳船或船舶时适用） |

## 钱到底从哪儿来

泊位上有五条收益线，排序常常出乎第一次做测算的开发方意料：

1. **避免的电网加强**——没建的那个变电站。
2. **需量电费下降**——负荷率 30% 的码头，按 kW 计的需量费非常疼。
3. **吊机再生能量回收**——回收电量，加上制动电阻维护量的下降。
4. **电价套利**——谷段充电，峰段向岸电售电。
5. **辅助服务或容量服务**——真实存在但受限，泊位负荷是间歇的。

《Frontiers in Energy Research》上一篇针对**意大利安科纳港**的优化研究给了一个可参考的量级。该港年用电 53.7GWh，约 47% 来自海事活动；研究中的低强度岸电场景配置了 **12.9MWp 光伏 + 12.4MWh 磷酸铁锂储能 + 16MW 岸电容量**，报告结果是**运营碳排放下降 56%、度电成本 €0.267/kWh、内部收益率 32.5%、投资回收期约 3.1 年**——前提是 25 年项目周期、5% 折现率、第 12 年整体更换电池。

## 五个能筛掉"只会卖柜子"的供应商的问题

1. 45℃ 环境温度下的连续功率是多少，降额曲线拿得出来吗？
2. 盐雾报告，是柜体的还是油漆供应商的？
3. EMS 怎么接入船期？船提前四小时到港，系统怎么响应？
4. PCS 对 5MW 阶跃的响应是多少？泊位侧故障时会不会脱网把船甩掉？
5. 第 8 年和第 12 年的扩容计划是什么，吊装费谁出？

## 我们为港口电气化提供的产品

**工商业储能柜**（100～500kWh）覆盖单泊位缓冲、吊机再生回收和码头削峰，IP55 柜体、液冷、含上述防腐配置。需要同时桥接多个泊位或带邮轮岸电的码头，**电网级 BESS 集装箱**单机 1～5MW 可并联扩容，配套 **PCS** 直接做 50/60Hz 岸电变频输出。

两条产品线均可提供 IEC 62619、UN 38.3、GB/T 36276-2023、CE、IEC 60730 的完整文件，以及降额曲线、盐雾报告和保护配合计算书——这些正是港口工程部真正会要的东西。

**[把泊位负荷曲线和船期发给我们](/contact)**，我们会返回一份定容报告，包含功率、电量、SOC 策略和需量电费模型，可以直接放进你的财务测算。也可以先看 **[工商业储能柜](/products/ci-battery-cabinets)** 与 **[集装箱式储能系统](/products/energy-storage-system)** 的技术参数。"""

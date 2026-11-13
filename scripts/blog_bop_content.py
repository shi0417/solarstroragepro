# -*- coding: utf-8 -*-
"""Content for: BESS electrical balance of plant / MV interconnection guide."""

SLUG = "bess-balance-of-plant-mv-interconnection-guide"
DATE = "2026-11-14"
READ_TIME = 11
TAGS = ["BESS", "Balance of Plant", "MV Interconnection", "Transformer", "EPC"]

EN = {
    "locale": "en",
    "category": "Engineering",
    "title": "BESS Balance of Plant: Scope Split, Transformer Sizing and MV Interconnection",
    "description": (
        "Where the battery supply scope ends and balance of plant begins, how to size the "
        "step-up transformer without overpaying for no-load loss, and the six protection "
        "checks that decide whether a BESS passes its interconnection audit."
    ),
    "body": """A 100 MW / 400 MWh battery plant puts roughly half its capital into cells and racks. It puts another **10-25% into the electrical balance of plant** — the step-up transformers, medium-voltage switchgear, cabling, protection and station service that turn a shipping container into a grid asset. That second block is where most schedules actually break, because nearly all of it sits outside the container and therefore outside the battery supplier's scope of supply.

This guide is for EPCs, integrators and owner-engineers who are about to split a BESS purchase order into "battery supply" and "balance of plant", and who need to know exactly where the seam runs, what to specify, and what to order first.

## Where the scope boundary actually falls

**Balance of plant (BoP)** covers everything between the PCS AC terminals and the point of interconnection (POI). In practice it splits into electrical BoP (eBoP) — transformer, MV switchgear, cables, relays, grounding, auxiliary power — and civil/mechanical BoP — pads, foundations, fencing, roads, fire water.

| Scope item | Battery supplier | EPC | Utility |
|---|---|---|---|
| Battery racks, modules, BMS | Yes | | |
| Container HVAC, fire detection and suppression | Yes | | |
| PCS / inverter (integrated or separate) | Yes | | |
| EMS / SCADA software licence | Yes | | |
| LV panel between PCS and transformer | Partial | Yes | |
| Step-up transformer(s) | | Yes | |
| MV switchgear and feeder protection relays | | Yes | |
| MV collection cable, trenching, termination | | Yes | |
| Station service / auxiliary transformer | | Yes | |
| Grounding grid and lightning protection | | Yes | |
| POI metering, RTU, telemetry | | | Yes |
| Interconnection substation upgrades | | | Yes |

The column that matters is the middle one. When a supplier quotes "**container + PCS + EMS**", the transformer, the MV switchgear and the auxiliary transformer are all still open — three long-lead items that together account for **55-70% of eBoP cost** and most of the procurement risk.

## Sizing the step-up transformer

Size on **apparent power at the PCS terminals**, never on MWh. For a 2.5 MW / 5 MWh block at 0.95 power factor:

1. S = P / pf = 2.5 / 0.95 = **2.63 MVA**
2. Add short-duration overload margin for frequency-response duty (typically 10-20%): 2.63 x 1.15 = 3.0 MVA
3. Add harmonic heating margin (5-10% for a modern PCS with THD below 5%)
4. Round to the nearest standard rating only after steps 1 to 3

Step 4 comes last for a reason. Rounding up reflexively is the most common transformer mistake in storage: **no-load loss runs 8,760 hours a year** whether the plant is charging, discharging or sitting at zero state of charge, while load loss only runs during 2,000-3,500 equivalent full-load hours. Oversizing by one step buys a permanent **15-25% increase in the loss that never switches off**.

| Rating | LV | MV | %Z | Vector group | Cooling |
|---|---|---|---|---|---|
| 2.5 MVA | 0.69 kV | 13.8 kV | 5.75 | Dyn11 | ONAN |
| 3.15 MVA | 0.69 kV | 33 kV | 6.0-6.5 | Dyn11 | ONAN |
| 5.0 MVA | 0.69 kV | 34.5 kV | 6.5-7.5 | Dyn11 | ONAN |
| 7.5 MVA | 0.80 kV | 34.5 kV | 7.0-8.0 | Dyn11 | ONAN / ONAF |

**Impedance holds the same trap in reverse.** It is tempting to push %Z up to "limit fault current" — but a grid-following PCS already limits its own fault contribution to roughly 1.1-1.2x rated current. The transformer is not the current limiter in this system. What higher impedance actually buys you is voltage drop and reactive consumption at full output. On a 5 MVA unit, moving from 5.75% to 7.5% costs about **1.5% additional regulation at rated current**, in exchange for a fault reduction the inverter was already providing.

Two PCS feeding one transformer? Specify a **dual-LV-winding unit (Dy11y11 or Dyn11yn11)**, one winding per PCS. A shared single LV winding invites circulating currents between inverters and couples their switching harmonics.

## Vector group, grounding and the LV current problem

**Dyn11 has become the industry default** for BESS: the delta LV winding traps triplen harmonics, and the earthed star MV winding provides a neutral for protection and ground-fault detection. Where the collection system requires a solidly earthed MV neutral, YNd11 is used instead.

At 690 V a 3,150 kVA unit carries about **2,890 A**; the same block at 34.5 kV carries about **58 A**. Conductor loss scales with current squared, which is exactly why the transformer exists — and exactly why the LV run between PCS and transformer must be as short as physically possible. Every extra metre of 690 V cable is a 50:1 penalty against the same power at MV.

Add an **electrostatic shield** between the HV and LV windings, and write a **K-factor rating** into the specification if dry-type units are used indoors. A standard K-1 dry-type carrying inverter harmonics runs hotter than nameplate predicts, and the factory temperature-rise test will not describe the unit in service.

## Protection coordination: the part that fails the audit

**IEEE 519-2022** caps voltage THD at the PCC at 5% for systems at or below 69 kV. **IEEE 1547-2018** requires ride-through instead of tripping. Both obligations land on the BoP designer, not the battery supplier. Six checks that catch most problems:

1. Coordinate transformer impedance with switchgear fault rating and relay settings — a mismatch here forces a switchgear upgrade that costs more than the transformer savings.
2. Match MV fuse versus breaker to the actual duty cycle; frequent energisation argues for a breaker with reclosing disabled.
3. Verify **inrush with all transformers energised together**, not one at a time — a station with eight units has eight inrush events.
4. Confirm the anti-islanding scheme and its trip time against the utility interconnection agreement, not the inverter datasheet default.
5. On the DC side, confirm grounded versus ungrounded architecture and the insulation monitoring device; an ungrounded system needs first-fault detection or a second fault becomes a short circuit.
6. Check arc-flash labels for both AC and DC equipment. DC arc flash is calculated differently and is routinely missing from BoP drawings.

## Auxiliary power is a real load, not a rounding error

Station service — HVAC, liquid-cooling pumps, fire panel, controls, comms, lighting — is normally fed from **its own MV/LV transformer**, not from the PCS. Expect **1-3% of rated capacity** for a liquid-cooled system on a temperate site; plan on **3-5%** at a 35 C ambient and **8-12%** for air-cooled systems at 40 C. A 10 MWh C&I cabinet at 3% draws 300 kWh of parasitic load per full cycle, roughly 12 kW continuous, and that number has to appear on the single-line diagram before the battery arrives on site.

Oversizing auxiliary power is cheap. Discovering at commissioning that the auxiliary transformer cannot carry simultaneous HVAC startup plus fire panel plus dehumidifiers is not.

## Lead times decide the construction sequence

| Equipment | Typical lead time (2026) | Critical-path risk |
|---|---|---|
| Step-up transformer | 20-40 weeks, 60+ in constrained markets | High |
| MV switchgear | 20-30 weeks | High |
| Protection relays | 8-16 weeks | Medium |
| LV distribution panel | 6-10 weeks | Low |
| MV cable, 630 mm2 aluminium | 4-8 weeks | Low |
| Grounding materials | 2-6 weeks | Low |

Because the transformer and switchgear sit on the critical path, procurement should be sequenced by **lead time, not by installation order**. Purchase orders for both are routinely issued before the site design is frozen, with performance-based specifications and named alternates to widen the supplier pool. Interconnection studies in most markets now also identify upgrades the developer must fund — budget **USD 80,000-240,000 per MW** above the pro-forma assumption and you will be closer to reality than most financial models.

## The RFQ checklist

Send this with the enquiry and you will receive comparable quotes instead of three incompatible ones:

1. Rated kVA and the PCS apparent-power basis behind it
2. LV and MV voltage, plus tap range (plus/minus 2 x 2.5% is standard)
3. Vector group and grounding arrangement, stated per winding
4. Impedance with tolerance, and the system study it came from
5. Harmonic spectrum and THD of the selected PCS
6. No-load and load loss limits in kW, with an evaluation penalty per kW
7. Cooling class, temperature rise and ambient design point
8. Electrostatic shield, K-factor, IP rating, corrosion category
9. Seismic and wind loading, plus foundation load schedule in t/m2
10. Interface documents: single-line diagram, protection settings, cable schedule, I/O point list

## Where our scope ends, and why we say so explicitly

SolarStoragePro supplies the **DC block**: LFP racks, BMS, thermal management, fire detection and suppression, and the enclosure — certified to **IEC 62619, UN38.3, GB/T 36276-2023 and CE**, with PCS integration available on the [C&I battery cabinet](/products/ci-battery-cabinets) and [containerised energy storage system](/products/energy-storage-system) platforms from 100 kWh to 5 MW.

We do not sell transformers or MV switchgear, and we will not pretend the seam does not exist. What we do provide is the interface documentation that lets your BoP designer close the loop on day one: DC and AC terminal data, PCS fault-current contribution, harmonic spectrum, thermal load, enclosure weight and centre of gravity, and the protection scheme inside the container.

**Planning a project and unsure where the boundary should fall?** [Send us the single-line diagram and the POI voltage](/contact) — we will mark up the split between battery supply and balance of plant, and flag the long-lead items before they become a schedule problem.""",
}

ZH = {
    "locale": "zh",
    "category": "工程技术",
    "title": "储能系统电气 BoP 边界划分、升压变压器选型与中压并网设计",
    "description": (
        "电池供货范围到哪里结束、BoP 从哪里开始；如何在不为空载损耗多付钱的前提下选定升压变压器容量；"
        "以及决定项目能否通过并网审查的六项保护配合检查。"
    ),
    "body": """一个 100MW/400MWh 的储能电站，大约一半投资在电芯和簇架，另有 **10-25% 在电气 BoP（balance of plant，配套设施）**——升压变压器、中压开关柜、电缆、保护与站用电。恰恰是这一块最容易拖垮工期，因为它几乎全部位于集装箱之外，也就是落在电池供应商的供货范围之外。

本文面向即将把储能采购拆成"电池供货"和"BoP"两张订单的 EPC、系统集成商和业主工程师，说明这条分界线该切在哪里、specification 该写什么、哪些东西必须先下单。

## 供货边界到底切在哪里

**BoP** 覆盖从 PCS 交流出线端子到并网点（POI）之间的全部内容。实务上分为电气 BoP（变压器、中压开关柜、电缆、保护、接地、站用电）和土建机械 BoP（基础、围栏、道路、消防水）。

| 范围项 | 电池供应商 | EPC | 电网 |
|---|---|---|---|
| 电池簇、模组、BMS | 是 | | |
| 集装箱空调、消防探测与灭火 | 是 | | |
| PCS / 逆变器（一体或分立） | 是 | | |
| EMS/SCADA 软件授权 | 是 | | |
| PCS 与变压器之间的低压柜 | 部分 | 是 | |
| 升压变压器 | | 是 | |
| 中压开关柜与馈线保护继电器 | | 是 | |
| 中压汇集电缆、开挖、终端制作 | | 是 | |
| 站用/辅助变压器 | | 是 | |
| 接地网与防雷 | | 是 | |
| 并网点计量、RTU、远动 | | | 是 |
| 接入变电站改造 | | | 是 |

真正要看的是中间那一列。当供应商报价写"**集装箱 + PCS + EMS**"时，变压器、中压开关柜、辅助变压器三样都还悬着——这三样合计占 **eBoP 成本的 55-70%**，也占掉了大部分采购风险。

## 升压变压器容量怎么定

按 **PCS 端子处的视在功率**定容，绝不能按 MWh 定。以 2.5MW/5MWh 单元、功率因数 0.95 为例：

1. S = P / pf = 2.5 / 0.95 = **2.63 MVA**
2. 叠加短时过载裕度（调频工况常用 10-20%）：2.63 x 1.15 = 3.0 MVA
3. 叠加谐波发热裕度（现代 PCS THD 低于 5% 时取 5-10%）
4. 前三步做完之后再往标准容量上靠

第 4 步之所以放最后：**无脑向上靠档是储能变压器最常见的错误**。空载损耗一年跑 8,760 小时，无论电站是在充电、放电还是躺在零 SOC 等价格信号；负载损耗只在 2,000-3,500 等效满载小时内发生。容量上一个档，等于永久买下 **15-25% 永远不会停下来的损耗增量**。

| 容量 | 低压侧 | 中压侧 | 阻抗 | 联结组 | 冷却 |
|---|---|---|---|---|---|
| 2.5 MVA | 0.69 kV | 13.8 kV | 5.75% | Dyn11 | ONAN |
| 3.15 MVA | 0.69 kV | 33 kV | 6.0-6.5% | Dyn11 | ONAN |
| 5.0 MVA | 0.69 kV | 34.5 kV | 6.5-7.5% | Dyn11 | ONAN |
| 7.5 MVA | 0.80 kV | 34.5 kV | 7.0-8.0% | Dyn11 | ONAN / ONAF |

**阻抗是反方向的同一个坑。** 很多人想把阻抗抬高来"限制短路电流"，但跟网型 PCS 自身的故障电流已被限制在额定电流的 1.1-1.2 倍，这台变压器本来就不是限流元件。阻抗调高真正带来的是满载压降和无功消耗：5MVA 机组从 5.75% 提到 7.5%，额定电流下大约多出 **1.5% 的电压调整率**，换来的却是逆变器早就已经提供的限流效果。

一台变压器带两台 PCS？请指定 **双低压绕组（Dy11y11 或 Dyn11yn11）**，每台 PCS 独立一组绕组。共用单一低压绕组会诱发逆变器之间的环流，并把两台的开关谐波耦合在一起。

## 联结组、接地与低压侧电流问题

**Dyn11 已是储能行业默认**：低压侧三角形绕组可抑制三次谐波，中压侧星形接地绕组为保护和接地故障检测提供中性点。若汇集系统要求中压中性点直接接地，则改用 YNd11。

690V 侧一台 3,150kVA 机组载流约 **2,890A**，同样容量在 34.5kV 侧只有约 **58A**。导体损耗随电流平方增长，这既是升压变压器存在的理由，也正是 PCS 到变压器的低压段必须尽可能短的原因——690V 电缆每多一米，等于同等功率下中压电缆的 50 倍代价。

高、低压绕组之间加 **静电屏蔽层**；室内干变还要把 **K 系数**写进规格书。标准 K-1 干变带逆变器谐波运行时比铭牌预测更热，出厂温升试验描述不了它在役状态。

## 保护配合：最容易在审查环节翻车的部分

**IEEE 519-2022** 要求 69kV 及以下系统并网点电压总谐波畸变不超过 5%；**IEEE 1547-2018** 要求故障穿越而非直接脱网。这两项义务落在 BoP 设计方身上，而不是电池供应商。以下六项检查能拦掉大部分问题：

1. 变压器阻抗必须与开关柜故障耐受水平和继电器定值联动核算——这里错配，逼出来的开关柜升级比变压器省下的钱贵得多。
2. 中压熔断器还是断路器要按实际操作频次选；频繁投切应选断路器并闭锁重合闸。
3. **多台变压器同时励磁时**校核励磁涌流，而不是逐台算——八台机组的站就有八次涌流。
4. 防孤岛方案及其动作时间要对齐电网的并网协议，而不是逆变器说明书的出厂默认值。
5. 直流侧确认接地还是不接地架构，以及绝缘监测装置是否配置；不接地系统必须有首故障检测，否则第二次接地就是短路。
6. 交流与直流设备的弧闪标签都要出。直流弧闪算法不同，BoP 图纸上十有八九是缺的。

## 站用电是真实负荷，不是四舍五入误差

站用电——空调、液冷泵、消防主机、控制、通信、照明——正常应由 **独立的站用变压器**供电，而不是从 PCS 取电。液冷系统在温带站点约为额定容量的 **1-3%**；35℃ 环境按 **3-5%** 规划；风冷系统在 40℃ 可达 **8-12%**。一台 10MWh 工商业柜按 3% 计，每个完整循环要消耗 300kWh 厂用电，折合约 12kW 连续负荷——这个数字必须在电池到场之前出现在单线图上。

站用电留裕度很便宜；调试时才发现站用变带不动空调同时启动加消防主机加除湿机，就不便宜了。

## 交期决定施工顺序

| 设备 | 2026 年典型交期 | 关键路径风险 |
|---|---|---|
| 升压变压器 | 20-40 周，供应紧张市场 60 周以上 | 高 |
| 中压开关柜 | 20-30 周 | 高 |
| 保护继电器 | 8-16 周 | 中 |
| 低压配电柜 | 6-10 周 | 低 |
| 中压电缆（630mm2 铝芯） | 4-8 周 | 低 |
| 接地材料 | 2-6 周 | 低 |

变压器和开关柜既然在关键路径上，采购就必须按 **交期排序，而不是按安装顺序排序**。这两张订单通常在设计冻结之前就已发出，配合性能化规格和备选品牌来扩大供应商池。另外，多数市场的接入系统研究都会提出业主必须承担的改造项——在财务模型里按 **每 MW 8-24 万美元**的超支预算，会比大多数可研假设更贴近真实。

## 询价清单

把下面十条随询价一起发出去，你收到的会是可比的报价，而不是三份互不通约的方案：

1. 额定容量 kVA，以及其后的 PCS 视在功率依据
2. 低压与中压电压，以及分接范围（±2 x 2.5% 为常规）
3. 联结组与接地方式，按每个绕组分别说明
4. 阻抗值及容差，以及出自哪份系统计算
5. 所选 PCS 的谐波频谱与 THD
6. 空载与负载损耗限值（kW），并附每 kW 的评标折算金额
7. 冷却方式、温升与设计环境温度
8. 静电屏蔽、K 系数、防护等级、防腐等级
9. 抗震与风载要求，以及基础荷载表（t/m2）
10. 接口文件：单线图、保护定值、电缆清册、I/O 点表

## 我们的范围到哪里结束，以及为什么要把话说清楚

SolarStoragePro 供应的是 **直流侧成套**：LFP 电池簇、BMS、热管理、消防探测与灭火、箱体——通过 **IEC 62619、UN38.3、GB/T 36276-2023 和 CE** 认证，并在 [工商业电池柜](/products/ci-battery-cabinets) 与 [集装箱式储能系统](/products/energy-storage-system) 两个平台上提供 100kWh 到 5MW 的 PCS 一体化配置。

我们不卖变压器，也不卖中压开关柜，更不会假装这条分界线不存在。我们能给的是让您的 BoP 设计方第一天就能闭环的接口资料：直流与交流端子参数、PCS 故障电流贡献、谐波频谱、热负荷、箱体重量与重心，以及箱内保护方案。

**项目在推进、但不确定边界该怎么切？** 把[单线图和并网电压发给我们](/contact)，我们会在图上标出电池供货与 BoP 的分界，并把长交期设备提前点出来，别让它变成工期问题。""",
}

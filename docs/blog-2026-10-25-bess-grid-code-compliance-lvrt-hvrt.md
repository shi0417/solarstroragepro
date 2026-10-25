# Blog Archive: bess-grid-code-compliance-lvrt-hvrt

- date: 2026-10-25 | read_time: 10 | article_id: 91337410-c7f0-4971-baf9-81f0962c74d4
- tags: BESS, Grid Code, LVRT, HVRT, Fault Ride-Through, Compliance

## EN
**Category**: Technology & Compliance
**Title**: BESS Grid Code Compliance Guide: LVRT, HVRT and Fault Ride-Through Explained
**Description**: Grid code compliance decides whether a battery energy storage system is allowed to connect at all. This guide explains LVRT, HVRT, fault ride-through, reactive current injection, and the certification path under EN 50549, IEEE 1547 and GB/T 36547.

A battery energy storage system can pass every factory acceptance test and still be refused at the point of interconnection. The reason is rarely the battery itself — it is **grid code compliance**. Grid operators increasingly treat BESS as a full grid citizen: an inverter-based resource that must ride through voltage dips, survive overvoltage events, and support the network exactly when the grid is least healthy. For project developers and EPCs, misunderstanding these requirements is one of the most expensive mistakes in the development cycle, because a failed energization study can push commercial operation back by a full quarter or more.

## Why Grid Codes Matter More for BESS Than for Traditional Generation

Conventional synchronous generators have physical inertia and can tolerate short grid disturbances without any active control. A BESS has neither: its behavior during a disturbance is entirely determined by the **power conversion system (PCS)** firmware and its control settings. That makes compliance a software-and-testing problem, not a hardware-strength problem.

Three consequences follow:

1. **Every jurisdiction writes its own curve.** Voltage ride-through envelopes, frequency trip settings, and reactive current priorities differ between EN 50549 (Europe), IEEE 1547 (North America), GB/T 36547 (China), and national annexes such as Germany's VDE-AR-N 4110/4120.
2. **Compliance is proven by test, not by datasheet.** Grid operators require type test reports from accredited labs, plus commissioning witnessed tests on site.
3. **Non-compliance is discovered late.** It usually surfaces during the interconnection study or energization review — after the equipment has been purchased and delivered.

## LVRT: Riding Through Voltage Sags

**Low Voltage Ride Through (LVRT)** requires the BESS to stay connected and keep operating when the grid voltage at the point of common coupling (PCC) dips — typically during a short circuit elsewhere on the network. A system that trips instantly on every sag would disconnect hundreds of megawatts during exactly the events when the grid needs support most.

Typical LVRT envelope thresholds look like this (actual values vary by jurisdiction and must be confirmed against the applicable code):

| Voltage at PCC | Typical minimum ride-through time | Required behavior |
| --- | --- | --- |
| 0.90 pu | Continuous | Normal operation, full active power |
| 0.50 pu | 0.5–1.0 s | Stay connected, reduce or maintain output |
| 0.20 pu | 150–500 ms | Stay connected, inject reactive current |
| Below 0.15 pu | Per local curve | May trip only outside the envelope |

The critical detail is that the BESS must **actively support** the voltage during the sag — usually by switching to reactive current priority — not merely avoid tripping. A PCS that "survives" a dip while doing nothing can still fail the compliance test.

## HVRT: Surviving Overvoltage Events

**High Voltage Ride Through (HVRT)** is the mirror requirement. After a nearby fault clears, line capacitance and unloaded transformer windings can push the voltage above nominal — commonly 1.10–1.30 pu. Typical requirements demand continuous operation at 1.10 pu for around 10 seconds, 1.20 pu for roughly 1 second, and tolerance of short excursions near 1.30 pu for 100–200 ms. Tripping on a temporary overvoltage that the code expects you to absorb is a compliance failure, even if the equipment protects itself correctly.

## Fault Ride-Through and Reactive Current Injection

During the deepest part of a voltage sag, most modern grid codes require **dynamic reactive current injection**. The PCS must increase its reactive output in proportion to the voltage deviation, typically with a gain of at least 2 pu of rated current per pu of voltage drop, and must prioritize this reactive response over active power delivery. This behavior is what turns a BESS from a passive load into a voltage-support asset — and it is exactly what grid operators verify during witnessed fault ride-through tests.

## Frequency Limits, Ramp Rates and the Rest of the Envelope

LVRT/HVRT is only part of the picture. A complete grid code package for a BESS also covers:

- **Over/under frequency ride-through** — defined trip boundaries and required frequency-watt response (droop), often with a deadband of ±0.036 Hz in North American settings.
- **Ramp rate control** — active power ramp limits (e.g., 10% of rated power per minute) so the BESS does not shock the network.
- **Reactive power capability at full output** — typically 0.95 leading/lagging power factor at the PCC, sometimes 0.90.
- **Harmonic distortion and flicker limits** per IEEE 519 or IEC 61000 series.
- **Protection coordination** — anti-islanding, reclose blocking, and trip settings coordinated with the utility's relays.

## Key Standards by Market

| Market | Primary grid code | Notes for BESS |
| --- | --- | --- |
| EU / most of Europe | EN 50549-1 (LV) / EN 50549-2 (MV) | National annexes add local curves |
| Germany | VDE-AR-N 4110 / 4120 | Among the strictest FRT requirements |
| UK | G99 / G100 | Engineering Recommendation, DNO approval |
| North America | IEEE 1547-2018 + UL 1741 SB | UL 1741 SB certification covers the PCS |
| China | GB/T 36547 + GB 38755 | Requires power quality and FRT test reports |
| Australia | AS/NZS 4777.2 (LV) | AEMO national electricity rules for larger plants |

## The Compliance Workflow in 7 Steps

1. **Obtain the applicable code version** from the network operator early — codes change, and annexes matter more than the base standard.
2. **Map every requirement to a PCS capability** (ride-through curves, droop settings, reactive ranges) before equipment selection.
3. **Request type test certificates** — UL 1741 SB, EN 50549, or GB/T 36547 reports from the PCS manufacturer, for the exact firmware version being delivered.
4. **Run a model-based interconnection study** (PSS/E, PSCAD, or PowerFactory) with validated PCS models.
5. **Configure and factory-verify settings** against the approved study, and lock the parameter set.
6. **Perform witnessed commissioning tests** on site: voltage dips (simulated per code), frequency ramps, and reactive capability verification.
7. **File the compliance dossier** and get written energization approval before commercial operation.

## What Non-Compliance Actually Costs

The direct costs are visible: retesting fees, PCS firmware upgrades, and months of schedule slip while the interconnection queue moves on. The indirect costs are worse — offtakers increasingly include grid code compliance milestones in **liquidated damages clauses**, so a missed energization date can trigger contract penalties. The cheapest insurance is choosing a PCS and BESS platform whose manufacturer holds current type certificates for your target market, rather than discovering at the study stage that "certification is in progress."

## How We Support Grid Code Compliance

At SolarStoragePro, our **grid-scale BESS containers (1–5 MW)** ship with PCS platforms carrying type certificates for the major international frameworks, and our engineering team provides ride-through curves, validated models, and witnessed-test support as part of every grid-side project. For **C&I battery cabinets (100–500 kWh)** connected behind the meter, we configure local-code-compliant settings as standard — see the [C&I Battery Cabinets](/products/ci-battery-cabinets) page or explore our full [Energy Storage System](/products/energy-storage-system) portfolio.

**Planning a utility-scale or C&I storage project?** Send us your target market and interconnection voltage — our engineers will map your grid code requirements against our certified PCS platforms and return a compliance checklist within two business days.

---

## ZH
**Category**: 技术合规
**Title**: BESS 并网导则合规指南：LVRT、HVRT 与故障穿越详解
**Description**: 并网导则合规决定了储能项目能否并网。本文详解低电压穿越（LVRT）、高电压穿越（HVRT）、故障穿越、无功电流注入，以及 EN 50549、IEEE 1547、GB/T 36547 等框架下的认证路径。

一套电池储能系统可以通过所有出厂验收测试，却在并网点被电网公司拒绝接入。原因很少出在电池本身——而是**并网导则合规**。电网公司越来越把储能当作完整的"电网公民"来对待：作为一种逆变型电源，BESS 必须在电压跌落时保持并网、在过电压事件中存活下来，并且恰恰在电网最脆弱的时刻提供支撑。对项目开发商和 EPC 来说，误解这些要求是开发周期中最昂贵的错误之一——一次并网调试不通过，可能让商业运营推迟整整一个季度以上。

## 为什么储能面临的并网导则比传统电源更严格

传统同步发电机拥有物理惯量，可以在短时电网扰动期间"靠惯性扛过去"。BESS 则完全不同：它在扰动期间的行为完全由 **PCS（变流器）固件**及其控制参数决定。这使得合规本质上是一个"软件+测试"问题，而不是硬件强度问题。

由此带来三个直接后果：

1. **每个地区的穿越曲线都不同。** 欧洲的 EN 50549、北美的 IEEE 1547、中国的 GB/T 36547，以及德国 VDE-AR-N 4110/4120 等国家标准附件，在电压穿越包络线、频率定值、无功优先级上都不一样。
2. **合规靠测试报告证明，而不是靠参数表。** 电网公司要求认可的第三方实验室出具型式试验报告，并在现场进行见证调试试验。
3. **不合规往往很晚才被发现。** 问题通常在并网研究或送电审查阶段才暴露——此时设备已经采购并交付到场。

## LVRT：电压跌落时的穿越能力

**低电压穿越（LVRT）**要求当并网点（PCC）电压跌落时——通常由电网其他位置短路引起——BESS 必须保持并网并继续运行。如果系统对每一次电压跌落都立即脱网，恰恰在电网最需要支撑的时刻，数百兆瓦的储能会同时离网。

典型的 LVRT 包络线阈值如下（具体数值因地区而异，务必对照适用的导则版本确认）：

| 并网点电压 | 典型最低穿越时间 | 要求的行为 |
| --- | --- | --- |
| 0.90 pu | 连续运行 | 正常运行，输出满功率 |
| 0.50 pu | 0.5–1.0 秒 | 保持并网，维持或调整输出 |
| 0.20 pu | 150–500 毫秒 | 保持并网，注入无功电流 |
| 低于 0.15 pu | 按当地曲线执行 | 仅在包络线外才允许脱网 |

关键细节在于：BESS 在电压跌落期间必须**主动支撑**电网电压——通常是切换到无功电流优先模式——而不仅仅是"不脱网"。一台在跌落期间无所作为、只是勉强存活的 PCS，仍然无法通过合规测试。

## HVRT：过电压事件的存活能力

**高电压穿越（HVRT）**是镜像要求。邻近故障切除后，线路电容和空载变压器绕组可能把电压推高到额定值以上——常见范围 1.10–1.30 pu。典型要求是：1.10 pu 下连续运行约 10 秒，1.20 pu 下维持约 1 秒，并耐受 100–200 毫秒内接近 1.30 pu 的短时偏移。如果设备在导则预期应吸收的暂态过电压上保护性脱网，即使保护动作本身是正确的，也会被判定为不合规。

## 故障穿越与无功电流注入

在电压跌落最深的阶段，大多数现行导则要求 PCS 进行**动态无功电流注入**：变流器必须按电压偏差成比例地增加无功输出，典型要求是每 1 pu 电压跌落至少注入 2 pu 额定电流的无功，并且无功响应优先于有功输出。正是这一行为把 BESS 从一个"被动负荷"变成了电压支撑资产——这也是电网公司在见证试验中重点核查的内容。

## 频率定值、爬坡率与导则的其他要求

LVRT/HVRT 只是合规包的一部分。一套完整的储能并网文件还包括：

- **高/低频穿越**——脱网边界和频响（下垂）特性要求，北美定值通常带 ±0.036 Hz 死区。
- **爬坡率控制**——有功爬坡限值（如每分钟 10% 额定功率），避免对电网造成冲击。
- **满输出时的无功范围**——并网点典型要求 0.95 感性/容性功率因数，部分地区要求 0.90。
- **谐波与闪变限值**——按 IEEE 519 或 IEC 61000 系列。
- **保护配合**——防孤岛、重合闸闭锁，以及与电网侧继电保护的定值配合。

## 主要市场的核心标准

| 市场 | 核心并网标准 | 储能注意事项 |
| --- | --- | --- |
| 欧盟/欧洲多数国家 | EN 50549-1（低压）/ EN 50549-2（中压） | 各国附件补充本地曲线 |
| 德国 | VDE-AR-N 4110 / 4120 | 故障穿越要求最严格之一 |
| 英国 | G99 / G100 | 需 DNO 审批 |
| 北美 | IEEE 1547-2018 + UL 1741 SB | UL 1741 SB 覆盖 PCS 认证 |
| 中国 | GB/T 36547 + GB 38755 | 要求电能质量与故障穿越试验报告 |
| 澳大利亚 | AS/NZS 4777.2（低压） | 大型电站按 AEMO 规则执行 |

## 合规工作流的七个步骤

1. **尽早向电网公司获取适用版本**——导则会更新，附件往往比标准正文更关键。
2. **把每项要求映射到 PCS 能力**（穿越曲线、下垂参数、无功范围），在设备选型之前完成。
3. **索取型式试验证书**——要求 PCS 厂商提供 UL 1741 SB、EN 50549 或 GB/T 36547 报告，且必须与实际交付的固件版本一致。
4. **开展基于模型的并网研究**（PSS/E、PSCAD 或 PowerFactory），使用经过验证的 PCS 模型。
5. **按研究结论整定并出厂核验参数**，并锁定参数组。
6. **现场开展见证调试试验**：按导则模拟电压跌落、频率爬坡，核验无功能力。
7. **提交合规档案**，在商业运营前取得书面送电批准。

## 不合规的真实代价

直接成本看得见：复测费用、PCS 固件升级，以及并网队列顺延带来的数月工期损失。间接成本更重——如今业主在购售电协议中越来越普遍地把并网合规设为里程碑条款并写入**违约金条款**，错过送电日期可能触发合同罚则。最便宜的保险是：选择 PCS 和 BESS 平台时，确认制造商持有目标市场的现行型式证书，而不是到研究阶段才发现"认证正在办理中"。

## 我们如何支持您的并网合规

SolarStoragePro 的**电网级 BESS 集装箱（1–5 MW）**搭载的 PCS 平台持有主要国际框架的型式证书，工程团队为每个电网侧项目提供穿越曲线、验证模型和见证试验支持。对于接在用户侧表后的**工商业电池柜（100–500 kWh）**，我们标配按当地导则整定的合规参数——详见 [C&I 电池储能柜](/products/ci-battery-cabinets) 产品页，或浏览我们的 [储能系统](/products/energy-storage-system) 全系列。

**正在规划电网侧或工商业储能项目？**把目标市场和并网电压等级发给我们，工程师将在两个工作日内对照我们的认证 PCS 平台，为您出具一份并网合规核查清单。
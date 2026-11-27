# -*- coding: utf-8 -*-
"""Content for: BESS seismic design / structural qualification guide (2026-11-27)."""

SLUG = "bess-seismic-design-structural-qualification-guide"
DATE = "2026-11-27"
READ_TIME = 11
TAGS = ["BESS", "Seismic Design", "Structural Engineering", "IEEE 693", "Anchorage", "Energy Storage"]

CATEGORY_EN = "Engineering Design"
TITLE_EN = "BESS Seismic Design: Structural Qualification, Anchorage and Rack Restraint"
DESC_EN = (
    "A practical guide to seismic design for battery storage: IEEE 693 and IEC 62271-207 "
    "qualification levels, regional code paths, the eight places containers fail, a worked "
    "anchorage check for a 5 MWh unit, and the RFQ clauses that avoid a retrofit."
)

CATEGORY_ZH = "工程设计"
TITLE_ZH = "储能电站抗震设计指南：鉴定等级、锚固与电池架约束"
DESC_ZH = (
    "从 IEEE 693 与 IEC 62271-207 抗震鉴定等级，到 GB 50011／GB 50260 的国内路径，"
    "梳理集装箱储能八处抗震薄弱点、5MWh 单元锚固算例与采购条款，避免事后返工。"
)

BODY_EN = """Most BESS procurement packages run forty pages on cell chemistry and two lines on structural loads: *"the equipment shall be suitable for site seismicity."* That sentence survives right up to the moment the project lands in a high-hazard region - Turkey, Chile, Indonesia, Japan, New Zealand, or a Chinese province at Seismic Intensity 7 - and the 5 MWh container that passed FAT in Jiangsu suddenly needs a shake-table report, cast-in anchors and a foundation 100 mm thicker.

The battery does not change. The steel, the concrete, the engineering hours and the schedule do. What follows is how the requirement is defined, what a supplier must actually prove, where containers fail, and which RFQ clauses avoid a retrofit.

## Seismic demand is a spectrum, not a single g value

Buyers habitually compress seismic risk into one number ("0.3 g site"), and suppliers happily answer with one number. Neither is useful: equipment responds to the frequency content around its own natural frequency, not to peak ground acceleration.

The standard framing, used by IEEE 693 and by IEC 62271-207 for medium-voltage switchgear, is built on three pieces:

- **ZPA (zero period acceleration)** - the acceleration at 33 Hz and above, i.e. the rigid-body acceleration that a stiff item actually feels. It is the anchor value for the whole qualification level.
- **RRS (required response spectrum)** - the demand curve applied to the equipment. It ramps up below about 1.1 Hz, holds a plateau between roughly 1.1 and 33 Hz, and rolls off above that.
- **Damping** - spectra are published at 2% or 5% damping. A bolted steel container skews toward 2-3%, so a 5%-damped curve understates demand unless corrected.

Two consequences matter commercially. First, a containerized BESS is a **rigid body** - its fundamental frequency usually sits between 5 and 15 Hz, squarely on the RRS plateau, so it experiences the full ZPA amplification. "It is a steel box bolted to a slab, it will be fine" is exactly the assumption that produces anchor pull-out. Second, IEEE 693 defines a **performance level** approach and a **design level** approach whose spectra sit at half the performance-level values; a supplier quoting "IEEE 693 qualified" without naming the level and the approach has told you nothing.

Equipment inside a building rather than on grade also sees floor amplification: IEEE 693 permits either a site-specific 2%-damped floor spectrum or a blanket factor of 2.5 on the RRS.

## The three qualification levels you will actually be asked for

IEEE Std 693-2018 sets a horizontal ZPA of 1.00 g for the high performance level, 0.50 g for moderate, and no ZPA for the low level (which simply assumes competent construction practice). IEC 62271-207:2023 uses the equivalent AG classification, and its vertical component is defined as 80% of the horizontal one.

| Qualification level | Horizontal ZPA | Peak spectral demand (5% damped) | Where it shows up | What it forces |
|---|---|---|---|---|
| High / AG10 | 1.00 g | approx. 3.0 g | Critical substations, utility specs in Japan, Chile, NZ, high-hazard Chinese sites | Shake-table or validated analysis, cast-in anchors, welded rack bracing |
| Moderate / AG5 | 0.50 g | approx. 1.5 g | Most Turkish, Italian, Greek, Indonesian and Intensity 8 sites | Engineered anchorage, rack lateral bracing, third-party review |
| AG2.5 | 0.25 g | approx. 0.75 g | Mid-hazard regions, many Indian and Middle East sites | Standard base plates, verified edge distances |
| Low | <= 0.10 g | not applicable | Northern Europe, GCC coastal, most of Brazil | Good practice only |

Note what is missing from that table: **IEC 62619, UL 1973, UN38.3 and CE marking tell you nothing about seismic capacity.** They are cell and system safety marks. A CE-marked cabinet is not a seismically qualified cabinet, and an EPC that assumes otherwise is buying the argument later.

## The regional code path decides who does what

Seismic is one of the few design inputs that is genuinely local: the qualification level is a supplier deliverable, the foundation and anchorage design is EPC scope, and the acceptance criterion is set by the authority having jurisdiction.

| Region | Governing structural code | Equipment qualification route | Practical note |
|---|---|---|---|
| United States | IBC + ASCE 7-22 (Ch. 13 components, Ch. 15 nonbuilding) | IEEE 693 level specified by the utility; S_DS from the ASCE hazard tool | Essential facilities (hospitals, data centres) may require special seismic certification |
| European Union | EN 1998-1 plus national annexes | IEC 62271-207 AG class for MV switchgear; IEEE 693 accepted by many utilities | CE marking does not imply seismic qualification |
| China | GB 50011 (buildings), GB 50260 (power facilities), zoning per GB 18306 | Manufacturer test report plus design review; large stations face a dedicated seismic review | Intensity 6-9 zones cover a very wide demand range |
| Turkey | TBDY 2018 with the AFAD hazard map | IEEE 693 moderate commonly specified | High-hazard provinces push toward AG5 |
| Chile / Peru | NCh 2369 / E.030 | IEEE 693 high is not unusual for substation-adjacent assets | Thin experience base among BESS suppliers |
| Indonesia | SNI 1726 | IEEE 693 moderate | Island grids with poor soil data need site-specific spectra |
| Australia / NZ | AS 1170.4 / NZS 1170.5 | Project-specific; NZ specs are severe | NZ projects often require full shake-table evidence |

The most common failure in the process is not engineering - it is **scope**. The supplier qualifies the cabinet to AG5; the EPC casts a 150 mm slab with post-installed M16 anchors at 80 mm edge distance; the authority rejects the anchorage because concrete breakout capacity was never checked. Nobody owned the interface.

## Where containerized systems actually fail

Field and test experience concentrates damage in eight places, and only two of them sit inside the battery rack:

1. **Anchor pull-out and concrete cone failure.** Post-installed anchors in a thin pad, short edge distances, or anchors loaded in combined tension and shear without a breakout check. The steel is rarely the weak link; the concrete is.
2. **Rack base welds and lateral bracing.** Static racks are designed for vertical stacking of 3-4 tiers. At 0.5 g lateral, the front-to-back bracing and the base connection carry the entire module mass as a bending moment.
3. **Module retention.** Many modules sit in a shelf pocket and rely on gravity plus a front lip. Under horizontal excitation they walk forward; front stops must be rated as a multiple of module mass, not as a shipping feature.
4. **Busbar and DC cabling.** Rigid inter-rack busbar has no compliance and tears at the terminal pad. Flexible braid or a service loop with 100-150 mm of slack absorbs the relative drift.
5. **PCS and transformer skids.** They sit on separate foundations with a different natural frequency from the DC block. The relative displacement shears the cable between them - a failure that appears in commissioning, not in the test report.
6. **HVAC, fire suppression piping and cable trays.** Unbraced 3-4 m risers and sprinkler drops need seismic bracing, or the first event punctures a suppression line inside a live DC compartment.
7. **Doors, panels and enclosures.** Latches that pop open expose live parts and, in a fire event, defeat the suppression envelope.
8. **The seismic-to-thermal-runaway interface.** A mechanically damaged but not yet failed module can develop an internal short hours later. Post-event inspection has to treat mechanical damage as a thermal risk, not a cosmetic one.

## A worked anchorage check: 5 MWh in a 20 ft container

Numbers settle arguments faster than adjectives. Take a 20 ft, 5 MWh liquid-cooled unit with an operating mass of 42 t (about 412 kN), centre of gravity 1.5 m above the pad, footprint 6.06 m x 2.44 m, twelve M20 anchor positions, steel-on-concrete friction coefficient 0.4.

Design base shear is taken as a fraction of weight equal to the ZPA multiplied by a response factor of roughly 0.9 (a conservative simplification for a rigid body, I = 1.0):

| Site demand | Base shear V | Friction resistance | Anchor shear demand | Verdict |
|---|---|---|---|---|
| Low, 0.10 g | 37 kN | 165 kN | 0 | Friction alone; anchors are detailing only |
| AG2.5, 0.25 g | 91 kN | 165 kN | 0 | Friction alone; check edge distance anyway |
| AG5, 0.50 g | 185 kN | 165 kN | approx. 20 kN total | Anchors govern; ~1.7 kN each, breakout check mandatory |
| AG10, 1.00 g | 371 kN | 33 kN (vertical 0.8 g unloads the pad) | approx. 338 kN total | ~28 kN each; cast-in anchors, thicker pad, uplift check |

Two lessons fall out of that table. Up to AG2.5 the connection is a **detailing** problem and the risk is purely edge distance and concrete strength. At AG5 the anchors start carrying real load, and at AG10 the vertical acceleration simultaneously unloads the friction that was doing the work - a compounding effect that static checks miss entirely. Overturning in this example stays comfortable (about 278 kNm demand against 503 kNm of resisting moment at 0.5 g), which is typical: **sliding and breakout govern long before the box tips over.**

## What to put in the specification

These eight clauses cost almost nothing at tender and save months after award:

1. Require a **qualification report, not a certificate**: standard, level, approach (performance or design), test laboratory, date, and the exact configuration tested - rack build, module type, number of tiers.
2. Ask for the **container's measured fundamental frequency**. Anything between 2 and 8 Hz needs a hard look at resonance with the RRS plateau.
3. Demand the **base plate interface data**: hole pattern, anchor diameter and minimum embedment, allowable tension and shear per anchor, and the assumed concrete grade.
4. Specify **module retention rating** as a multiple of module mass (state the multiple; 0.5x horizontal is a floor, not a target).
5. State the required **relative displacement capacity** between rack and PCS skid, and require flexible connections sized for it.
6. Put the **spectrum in the RFP** - S_DS or ZPA, damping, and whether the 2.5x building amplification applies. Suppliers cannot price a spectrum they have not been given.
7. Name the **review authority and the stamp**: local structural engineer, independent reviewer, or the utility's own qualification group.
8. Define the **post-event protocol** in advance: inspection items, acceptance criteria, who signs the return-to-service.

## Commissioning and post-event protocol

FAT does not cover seismic, and never will: a shake table is not a factory test. SAT is where the structural assumptions get verified in the field. Torque-check every anchor to the specified value (M20 grade 8.8 typically lands around 300-400 Nm depending on lubrication and preload target), confirm base plate grout or shim contact across the full footprint rather than at four corners, witness-mark rack bolts, and confirm that flexible connections carry no pre-load as installed.

After any event of consequence at site - a working threshold is 0.1 g measured or felt - isolate the DC blocks, inspect module retention and rack bracing for permanent set, re-torque a 10% anchor sample, thermographically scan joints for resistance heating, and re-test insulation resistance before re-energising. Visible rack deformation means de-racking, not "monitor and continue."

## What the premium actually is

For most projects the structural premium is **1-3% of capex** - extra concrete, cast-in instead of post-installed anchors, rack bracing, a structural report and a review cycle. At AG10 it can reach 5%. Against that, de-racking a 5 MWh container to replace anchors or a rack frame on an operating site costs multiples of the original delta, plus availability penalties where the unit is contracted.

The conclusion for buyers is unglamorous: **write the seismic requirement into the RFQ as a spectrum and a level, with a named owner for the anchorage interface.** Everything else is improvisation at construction stage.

If you are specifying storage for a moderate- or high-hazard site, our engineering team can supply the qualification documentation package, base plate interface drawings and rack restraint details alongside the [C&I battery cabinets](/products/ci-battery-cabinets) and [containerized energy storage systems](/products/energy-storage-system). Send the site coordinates, design spectrum and required qualification level through the [contact form](/contact) and we will return a seismic compliance matrix with the quotation - before the foundation is poured, not after.
"""

BODY_ZH = """大多数储能采购文件会用四十页写电芯化学体系，却只用两行写结构荷载：「设备应适应项目所在地的抗震条件」。这句话在日本、土耳其、智利、印尼、新西兰，以及国内抗震设防烈度 7 度区的项目上往往撑不过第一轮审查——在江苏顺利通过 FAT 的那台 5MWh 集装箱，到了工地就要多一份振动台报告、一批预埋锚栓和厚 100mm 的基础。

电芯没变，变的是钢结构、混凝土、设计工时和工期。本文讲清抗震需求到底如何定义、供应商真正需要证明什么、集装箱储能在哪些位置失效，以及采购条款里该怎么写才能避免两年后返工。

## 抗震需求是一条反应谱，不是一个 g 值

买家习惯把地震风险压缩成一个数字（「0.3g 场地」），供应商也乐于用一个数字回答。两边都没用——设备响应的是自身固有频率附近的频谱成分，而不是地面峰值加速度。

IEEE 693 以及中压开关设备用的 IEC 62271-207 都采用同一套框架，核心是三件事：

- **ZPA（零周期加速度）**：33Hz 及以上的加速度，也就是刚性设备真正感受到的加速度，是整个鉴定等级的基准值。
- **RRS（要求反应谱）**：施加于设备的谱曲线，约 1.1Hz 以下上升，1.1~33Hz 之间形成平台，其上衰减。
- **阻尼**：电气设备通常给出 2% 或 5% 阻尼谱。螺栓连接的钢制集装箱偏向 2%~3%，若直接套用 5% 阻尼曲线，需求会被低估。

两个结论直接影响造价。第一，集装箱储能是**刚性体**，一阶频率通常在 5~15Hz，正好落在 RRS 平台上，因此承受的是完整的 ZPA 放大，「钢箱子用螺栓固定在混凝土上不会有问题」这句话恰恰是锚栓被拔出的起点。第二，IEEE 693 区分**性能水平（performance level）**与**设计水平（design level）**两套方法，后者的谱值是前者的一半；供应商只说「通过 IEEE 693 鉴定」而不说明等级与方法，等于什么都没说。

设备安装在建筑内而非地面时，还要计入楼面放大：IEEE 693 允许采用场址专用的 2% 阻尼楼面谱，或对 RRS 统一乘 2.5。同一台集装箱放在厂房的夹层上，与放在独立基础上，是两个完全不同的结构问题。

## 你实际会遇到的三个鉴定等级

IEEE Std 693-2018 规定：高性能水平对应的水平向 ZPA 为 1.00g，中等性能水平为 0.50g，低性能水平不设 ZPA（仅以良好施工惯例为前提）。IEC 62271-207:2023 用 AG 分级表达同一含义，其竖向分量定义为水平向的 80%。

| 鉴定等级 | 水平 ZPA | 谱峰值需求（5% 阻尼） | 常见适用场景 | 带来的设计要求 |
|---|---|---|---|---|
| High / AG10 | 1.00 g | 约 3.0 g | 关键变电站、日本与智利、新西兰的电网规范、国内高烈度站点 | 振动台或经验证的仿真、预埋锚栓、电池架焊接支撑 |
| Moderate / AG5 | 0.50 g | 约 1.5 g | 土耳其、意大利、希腊、印尼多数项目、烈度 8 度区 | 锚固计算、电池架水平支撑、第三方复核 |
| AG2.5 | 0.25 g | 约 0.75 g | 中等危险性区域、印度与中东多数项目 | 标准底板、边距校核 |
| Low | ≤ 0.10 g | 不适用 | 北欧、海湾沿海、巴西大部分地区 | 良好施工惯例即可 |

要注意表里没有出现的东西：**IEC 62619、UL 1973、UN38.3、CE 标识都与抗震承载能力无关**。它们解决的是电芯与系统安全。带 CE 标不等于抗震合格，EPC 如果默认两者等价，后面必然要打一场官司。

## 区域规范路径决定谁做什么

抗震是少数真正本地化的设计输入。设备鉴定等级是供应商的交付物，基础与锚固设计通常属 EPC 范围，验收尺度由当地主管部门设定。

| 区域 | 主体结构规范 | 设备鉴定路径 | 实务要点 |
|---|---|---|---|
| 中国 | GB 50011（建筑）、GB 50260（电力设施），区划按 GB 18306 | 出厂试验报告 + 设计复核，大型电站需抗震专项审查 | 烈度 6~9 度覆盖的需求跨度极大 |
| 美国 | IBC + ASCE 7-22（第 13 章构件、第 15 章非建筑结构） | 由电网公司指定 IEEE 693 等级，S_DS 查 ASCE 危险工具 | 医院、数据中心等关键设施可能要求专项抗震认证 |
| 欧盟 | EN 1998-1 及各国附录 | 中压开关柜按 IEC 62271-207 的 AG 分级，多数电网接受 IEEE 693 | CE 标识不代表抗震鉴定 |
| 土耳其 | TBDY 2018 + AFAD 地震图 | 普遍指定 IEEE 693 moderate | 高危险省份实际接近 AG5 |
| 智利 / 秘鲁 | NCh 2369 / E.030 | 变电站相邻资产常要求 IEEE 693 high | 储能供应商经验普遍不足 |
| 印尼 | SNI 1726 | IEEE 693 moderate | 岛屿电网土质数据缺乏，需场址专用谱 |
| 澳洲 / 新西兰 | AS 1170.4 / NZS 1170.5 | 项目专用规范，新西兰要求最严 | 新西兰项目常要求完整振动台证据 |

流程中最常见的失误不在技术，而在**范围划分**：供应商把柜体鉴定到 AG5，EPC 打了 150mm 板、用 M16 后扩底锚栓、边距 80mm，审查方以「未做混凝土锥体承载力校核」退回。这个界面从来没人负责。

## 集装箱储能真正的失效位置

现场与试验的破坏集中在八处，其中只有两处在电池架内部：

1. **锚栓拔出与混凝土锥体破坏**。薄板上的后扩底锚栓、过小的边距、未做拉剪组合下的锥体校核。钢材很少是薄弱环节，混凝土才是。
2. **电池架底部焊缝与水平支撑**。静态货架按 3~4 层竖向堆叠设计，遇到 0.5g 水平激励时，前后向支撑与底部节点要以弯矩形式承受全部模组质量。
3. **模组限位**。许多模组只是放在托架上，靠自重加前挡边固定；水平激励下会向前位移。前挡件要按模组质量的倍数设计，而不是当作运输件。
4. **母线与直流电缆**。架间刚性母线没有变形能力，会在接线端子处撕裂；柔性编织带或 100~150mm 的服务弯才能吸收相对位移。
5. **PCS 与变压器撬装基础**。与直流侧基础分开、一阶频率不同，两者之间的相对位移会剪断电缆——这类问题通常在调试期暴露，不会出现在试验报告里。
6. **空调、消防管道与桥架**。3~4m 无支撑立管和喷淋支管需要抗震支撑，否则首次地震就会在带电直流舱内刺穿消防管路。
7. **柜门、面板与外壳**。锁扣弹开既暴露带电部件，也会在火灾工况下破坏抑制包络。
8. **抗震与热失控的耦合**。机械受损但尚未失效的模组，可能在数小时后才发生内短路。震后检查必须把机械损伤当作热风险处理，而不是外观瑕疵。

## 算例：20 尺 5MWh 单元的锚固校核

数字比形容词更能定案。取一台 20 尺 5MWh 液冷单元：运行质量 42t（约 412kN），重心距地面 1.5m，底面 6.06m × 2.44m，12 个 M20 锚栓位，钢-混凝土摩擦系数 0.4。

设计基底剪力按「ZPA × 约 0.9 的响应折减系数」估算（刚性体的保守简化，重要性系数取 1.0）：

| 场地需求 | 基底剪力 V | 摩擦力抵抗 | 锚栓剪力需求 | 结论 |
|---|---|---|---|---|
| 低，0.10g | 37 kN | 165 kN | 0 | 摩擦已足够，锚栓仅为构造 |
| AG2.5，0.25g | 91 kN | 165 kN | 0 | 摩擦足够，但仍需校核边距 |
| AG5，0.50g | 185 kN | 165 kN | 合计约 20 kN | 锚栓开始受力，约 1.7kN/根，锥体校核必做 |
| AG10，1.00g | 371 kN | 33 kN（竖向 0.8g 卸载） | 合计约 338 kN | 约 28kN/根，需预埋锚栓、加厚底板并验算上拔 |

这张表给出两个结论。到 AG2.5 之前，连接是**构造**问题，风险全在边距与混凝土强度；到 AG5 锚栓开始承担真实荷载；到 AG10 竖向加速度同时把原本起作用的摩擦力卸载——这种叠加效应静态校核完全看不出来。本例的抗倾覆反而宽裕（0.5g 时倾覆弯矩约 278kN·m，抗倾覆力矩约 503kN·m），这很典型：**滑移与锥体破坏远早于箱体倾覆成为控制工况。**

## 采购条款该写什么

以下八条在招标阶段几乎不增加成本，中标后却能省下几个月：

1. 要求**鉴定报告而非证书**：标准、等级、方法（性能水平或设计水平）、试验机构、日期，以及受试的确切配置（电池架层数、模组型号、层数）。
2. 要求提供**集装箱实测一阶频率**。落在 2~8Hz 时，必须专门评估与反应谱平台的共振。
3. 要求提供**底板接口数据**：孔位图、锚栓直径与最小锚固深度、单根允许拉力与剪力、假定的混凝土强度等级。
4. 把**模组限位能力**写成模组质量的倍数，并明确倍数（水平 0.5 倍是底线而非目标）。
5. 明确电池架与 PCS 撬之间的**相对位移能力**，并要求柔性连接按此选型。
6. 把**反应谱写进招标文件**：S_DS 或 ZPA、阻尼比、是否适用 2.5 倍楼面放大。供应商无法为一份没给谱的标报价。
7. 写明**复核方与签章方**：当地结构工程师、独立第三方，或电网公司自身的鉴定部门。
8. 事先定义**震后处置流程**：检查项、判定标准、谁签复工。

## 调试与震后处置

FAT 覆盖不了抗震，将来也不会——振动台不是工厂试验。结构假定是在 SAT 现场被验证的：按设计值逐根复核锚栓扭矩（M20 8.8 级视润滑与预紧目标通常在 300~400N·m），确认底板灌浆或垫片在整个底面接触而非四角点接触，对电池架螺栓做见证标记，确认柔性连接在安装状态下不承受预紧。

现场发生有感地震后（建议以 0.1g 作为启动阈值），应隔离直流舱、检查模组限位与架体支撑是否产生永久变形、抽检 10% 锚栓扭矩、对连接点做红外扫描排查电阻发热，并在重新送电前复测绝缘电阻。电池架出现可见变形时，正确做法是拆除重装，而不是「观察运行」。

## 抗震溢价到底多少

多数项目的结构溢价在 ** capex 的 1%~3%**：多出来的混凝土、预埋代替后扩底、电池架支撑、结构报告与一轮复核。AG10 场景可能到 5%。与之相对，在运行场上为更换锚栓或架体把 5MWh 集装箱拆架重装，成本是当初差额的若干倍，若已签订容量合同还要叠加可用率罚则。

对买家的结论并不光鲜：**抗震要求必须以「谱 + 等级」的形式写进询价文件，并为锚固界面指定责任人。** 其余都是施工阶段的临场发挥。

如果您正在为中高烈度场址选型，我们的工程团队可以在交付 [工商业储能柜](/products/ci-battery-cabinets) 与 [集装箱储能系统](/products/energy-storage-system) 的同时，提供抗震鉴定文件包、底板接口图与电池架约束详图。把场址坐标、设计反应谱与所需鉴定等级通过 [联系表单](/contact) 发给我们，我们会在报价阶段一并返回抗震符合性矩阵——在基础浇筑之前，而不是之后。
"""

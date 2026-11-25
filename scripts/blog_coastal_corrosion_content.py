# -*- coding: utf-8 -*-
"""Content for: coastal BESS salt fog / condensation / C5-M corrosion design guide."""

SLUG = "coastal-bess-salt-fog-corrosion-condensation-design"
DATE = "2026-11-25"
READ_TIME = 11
TAGS = ["BESS", "Corrosion Protection", "Coastal", "C5-M", "Condensation", "Engineering Design"]

EN_CATEGORY = "Engineering Design"
EN_TITLE = "Coastal BESS Design: Salt Fog, Condensation and C5-M Corrosion Control"
EN_DESCRIPTION = (
    "How to specify containerised battery storage for coastal and tropical sites: ISO 9223 site "
    "classification, C5-M coating systems, IP and breathing strategy, dew-point condensation control, "
    "pollution-degree electrical design and ocean-transit protection."
)

EN_BODY = """Almost every containerised BESS datasheet carries the same line: IP55, outdoor rated, -30 °C to +55 °C. That line is written for a substation in a temperate inland climate. It says nothing about the two variables that actually decide whether the asset survives ten years at a coastal industrial park or an island microgrid: how much chloride is landing on it, and how often its internal surfaces sit below the dew point.

The gap is not marginal. Under ISO 9223 and ISO 9224, first-year carbon steel loss runs **25-50 µm in a C3 inland-industrial atmosphere, 50-80 µm in C4, and 80-200 µm in C5 marine** - with offshore and surf zones above 200 µm. A 2 mm door skin does not fail from that rate in year one. It fails at a weld seam or an unsealed lap joint around year six, and by then the coating system cannot be recovered without taking the unit out of service.

Salt rarely stops a BESS by eating through steel. It stops it **electrically**: contact resistance creeping up at terminals, tracking across polluted insulation, insulation-resistance alarms that appear at dawn and clear by mid-morning, spurious BMS faults nobody can reproduce in the afternoon. Those failures land after the performance test and before the asset has returned its capital - the most expensive possible window.

## Classify the site before you specify the enclosure

ISO 9223 grades atmospheric corrosivity from three inputs: chloride deposition, sulphur dioxide deposition, and time of wetness. Chloride is the dominant term near the sea, and it is measured with a wet-candle collector (ASTM G140) over 30 days, not estimated from a map.

| Class | Typical environment | Chloride deposition (mg/m2/day) | 1st-year steel loss (µm) | Distance-to-coast proxy |
|---|---|---|---|---|
| C2 | Sheltered inland, low pollution | < 3 | 1.3-25 | > 25 km |
| C3 | Inland urban / industrial | 3-60 | 25-50 | > 5 km |
| C4 | Industrial coastal, moderate salt | 60-300 | 50-80 | 1-5 km |
| C5 | Direct coastal, high salt | 300-1,500 | 80-200 | 100 m-1 km |
| CX | Offshore, tropical surf | > 1,500 | > 200 | < 100 m |

Treat the distance column as a default, not a verdict. ISO 9223 combines deposition with time of wetness, so the classes in the table are indicative. Three factors routinely push a site one band higher than its distance suggests: **prevailing onshore wind** (a 3 km site in a steady sea-breeze corridor can out-rank a sheltered 500 m site), **topography** that funnels salt-laden air up a valley, and **low rainfall** - in dry coastal climates fine salt particles travel much further inland because nothing washes them off.

Then check the dew point, because on a tropical coast condensation is the default state, not an accident. Air at 32 °C and 85 % relative humidity has a dew point near **29 °C**. Any metal surface below 29 °C collects water. At night an enclosure skin radiating to a clear sky typically sits 4-6 K below ambient, so it is below dew point for hours - every night, for fifteen years. The interior of a "sealed" cabinet is a condensing surface by design unless something is done about it.

## The four failure modes that actually show up first

| Failure | Mechanism | First symptom | Design answer |
|---|---|---|---|
| Coating breakdown at welds and edges | Thin film on sharp edges, weld spatter, unsealed lap joints trap electrolyte | Rust bloom on door frames and AC cut-outs in year 2-3, blistering along seams | Stripe-coat edges, radius cut-outs, sealant on laps, post-weld touch-up |
| Terminal and busbar oxidation | Chloride plus humidity on bare copper / aluminium; galvanic couple at bimetal joints | Rising contact resistance, hot spots on IR scan, torque loss on DC lugs | Tin-plated busbars, bimetallic washers, sealed cable entries, terminal grease |
| Internal condensation on electronics | Surface temperature below dew point; vapour migrates in through breathing | Insulation-resistance and ground-fault alarms at dawn, comms dropouts, phantom BMS faults | Dew-point-based HVAC control, anti-condensation heaters, conformal coating, sealed electronics compartment |
| HVAC coil corrosion and filter blocking | Salt-laden air through the condenser; salt crystals bridge the filter media | Auxiliary consumption climbs, cell temperature spread widens, power derating | Epoxy-coated coils, differential-pressure monitoring, correctly sized filtration |

Note the third row. In our experience most "salt fog" warranty claims are not salt ingress at all - they are **condensation**. The salt was already inside the air, and the thermal cycle delivered it onto the PCB.

## Coating: specify a system, not a colour

ISO 12944 is the reference framework. The class you need is set by the site, and the durability band is set by how long you intend to leave it alone.

| Class | Total dry film thickness | Neutral salt spray (ISO 9227) | Cyclic / condensation | Durability band | Typical use |
|---|---|---|---|---|---|
| C3 | 200-250 µm | 480 h | - | Medium, 7-15 y | Inland outdoor |
| C4 | 240-320 µm | 720 h | 480 h condensation | High, 15-25 y | Industrial coastal |
| C5-M | >= 320-340 µm | 720-1,000 h | 480 h condensation | High, 15-25 y | Coastal / marine |
| C5-H | >= 320-400 µm | 1,440 h | Cyclic ageing 1,680 h | Very high, > 25 y | Chemical + coastal |

Three things matter more than the class label:

1. **Durability is not a warranty.** ISO 12944 durability bands are technical expectations under a defined maintenance regime. Ask separately for the commercial warranty, its exclusions, and what inspection frequency it assumes.
2. **Neutral salt spray is a screening test.** ISO 9227 runs flat panels at 35 °C with 5 % NaCl and never dries them out, so it cannot reproduce wet-dry cycling, UV, or stone damage. Cyclic salt mist under **IEC 60068-2-52 Test Kb** (2 h spray at 35 °C, then 22 h at 40 °C / 93 % RH, repeated) is a far better proxy for a coastal enclosure - method 2 for normally-enclosed equipment, methods 3-6 where wet and dry alternate frequently. Ask which method and how many cycles.
3. **Substrate beats paint.** The base frame, skid and structural steel should be **hot-dip galvanised to ISO 1461**, not painted cold-rolled sheet - that frame stands in standing water and mud. External fasteners should be A4/316 stainless; 304 pits in chloride. Isolate dissimilar metals at every joint, or the aluminium panel will sacrifice itself to the stainless bolt.

## Sealing, breathing and pressure equalisation

IP55 keeps out water jets. It does not keep out vapour. A 40-foot container breathing through its daily thermal cycle moves litres of humid air across gaskets, cable entries and door seals, and every one of those entries is a condensation source.

There are two coherent strategies, and they should not be mixed by accident:

- **Sealed**: IP65/IP66 enclosure with an air-to-air heat exchanger or air conditioner, desiccant, and a membrane pressure-equalisation breather. Efficient for the battery compartment; parasitic load is real, budget it.
- **Ventilated**: IP54 with filtered, slightly pressurised airflow. Cheaper to cool, but the filter regime must be honest - coastal salt crystals bridge standard louvre filters, and a clogged filter converts a thermal problem into a derating problem in weeks.

A hybrid layout usually wins: sealed battery compartment, ventilated PCS compartment, independent filtration. Whichever route is taken, condense control needs a dew-point target, not a temperature target. Hold interior relative humidity at 55-60 % and never cool a surface below the ambient dew point just to chase a cell temperature setpoint.

## Electrical details that fail in year three

Under **IEC 60664-1**, an outdoor enclosure where condensation occurs is pollution degree 3, not the degree 2 assumed by most indoor-derived designs. That changes creepage and clearance, and it means shrouded busbars, phase barriers and insulated links are not optional extras.

- **Tin-plated copper busbars** instead of bare copper; nickel-plated terminals for signal wiring; tinned lugs on all power cables.
- **Conformal coating** on BMS and EMS boards, potted sensors, and gel-filled or IP68-rated fans - fan bearings are a classic coastal seizure point.
- **Insulation monitoring tuned for wet conditions**: expect a lower baseline, trend it, and avoid a threshold so tight that the system trips on a humid morning.
- **Thermal derating at 50 °C ambient**, applied to contactors, breakers and fans rather than to cells only.

## The leg nobody specifies: ocean transit and site storage

A containerised BESS spends three to six weeks at sea before it is ever energised. Temperature swings across climate zones produce "container rain" - condensate forming on the underside of the roof and dripping onto racks - so a unit can arrive at the port with oxidised terminals and a wet BMS before commissioning begins.

Specify the transit protection explicitly: desiccant sized to container volume and voyage length, VCI film over exposed busbars, humidity indicator cards at 30/40/50 %, and a defined arrival protocol - open, photograph, read the cards, megger before energising, torque-check DC terminals, and run an infrared scan during the first full-power cycle. Cells ship at reduced state of charge under UN38.3 and IMDG rules, so plan the commissioning charge into the schedule.

## What to put in the RFQ

1. The site corrosivity class, **with its basis** - measured chloride deposition or an ISO 9223 reference map plus a wind-rose analysis.
2. The full coating schedule: substrate preparation, primer, intermediate, topcoat, DFT per coat and total, colour and UV stability.
3. Salt spray **and** cyclic test reports, with the standard, method and cycle count named.
4. Galvanising specification for frame, skid and structural steel (ISO 1461), and the fastener schedule by material grade.
5. IP rating **per compartment**, plus the pressure-equalisation method and the test report behind the claim.
6. Condensation control: heater sizing, RH setpoint, desiccant quantity, drain arrangement, floor slope.
7. Assumed pollution degree and the creepage measures taken against it.
8. Transit protection plan and the arrival inspection checklist.

A C5-M coating system is commonly quoted at a 10-15 % premium on the enclosure, which is a single-digit percentage on the whole system. Set that against a mid-life intervention - re-coating a container in the field, replacing a terminal set, or a ground-fault-driven outage during peak season - and the specification usually pays for itself before the first maintenance cycle ends.

For coastal industrial parks and islands, our [C&I battery cabinets](/products/ci-battery-cabinets) are built to a C5-M enclosure specification with sealed electronics compartments; for utility-scale coastal projects the [containerised energy storage system](/products/energy-storage-system) can be configured with hot-dip galvanised frames, 316 external hardware and dew-point-controlled HVAC. Send us the site coordinates, distance to the coast and the prevailing wind direction, and our engineering team will return a corrosion and condensation specification with the coating schedule attached - [contact us here](/contact)."""

ZH_CATEGORY = "工程设计"
ZH_TITLE = "沿海储能系统设计：盐雾、凝露与 C5-M 防腐体系怎么定"
ZH_DESCRIPTION = (
    "面向沿海、海岛与东南亚滨海厂区的储能系统设计指南：ISO 9223 腐蚀等级判定、C5-M 涂层体系、"
    "IP 与呼吸策略、露点控湿、污秽等级下的电气设计，以及海运与到场存放防护。"
)

ZH_BODY = """几乎所有集装箱储能的样本都写着同一句话：IP55、户外型、-30 ℃ 至 +55 ℃。这句话是按内陆温带变电站写的。它没有回答真正决定资产能不能在沿海厂区或海岛微电网撑过十年的两个变量：**有多少氯离子落在柜体上**，以及**柜内表面有多少时间低于露点**。

差距不是一点半点。按 ISO 9223 与 ISO 9224，碳钢第一年腐蚀深度在内陆工业环境 C3 为 **25-50 µm，C4 为 50-80 µm，海洋环境 C5 达 80-200 µm**，海上平台与拍岸浪区超过 200 µm。2 mm 的门板不会在第一年锈穿，但会在第六年前后从焊缝或未密封的搭接缝开始失效，而那时涂层体系已经没有不拆机就修复的可能。

盐雾真正搞垮储能的方式，通常不是把钢板锈穿，而是**电气失效**：端子接触电阻慢慢升高、污染后的绝缘发生爬电、绝缘电阻告警总在清晨出现而上午又消失、BMS 报出一堆下午无法复现的假故障。这些故障出现的时点，恰好是性能考核之后、投资回收之前——这是代价最高的窗口期。

## 先定场地腐蚀等级，再谈柜体选型

ISO 9223 用三个输入判定大气腐蚀性：氯离子沉降率、二氧化硫沉降率、表面润湿时间。近海场地由氯离子主导，而氯离子要用湿烛法（ASTM G140）实测 30 天，不能靠地图估算。

| 等级 | 典型环境 | 氯离子沉降 (mg/m2/天) | 碳钢首年腐蚀 (µm) | 离海距离参考 |
|---|---|---|---|---|
| C2 | 内陆遮蔽、低污染 | < 3 | 1.3-25 | > 25 km |
| C3 | 内陆城市 / 工业区 | 3-60 | 25-50 | > 5 km |
| C4 | 工业型沿海、中等盐雾 | 60-300 | 50-80 | 1-5 km |
| C5 | 直接沿海、高盐雾 | 300-1,500 | 80-200 | 100 m-1 km |
| CX | 海上平台、热带拍岸浪区 | > 1,500 | > 200 | < 100 m |

距离只能当默认值，不能当结论。ISO 9223 是把沉降率和润湿时间组合判级的，表中的对应关系只是参考。三种情况经常让实际等级比距离高一级：**主导向岸风**（离海 3 km 但正处稳定海风通道，可能比离海 500 m 的遮蔽场地更严酷）、**地形汇流**（山谷把含盐气流向上抽）、**降雨稀少**（干旱沿海没有雨水冲刷，细盐颗粒能飘到内陆很远）。

然后算露点，因为热带沿海的凝露是常态而不是意外。32 ℃、85 % RH 的空气，露点约 **29 ℃**。任何低于 29 ℃ 的金属表面都会结水。夜间柜体外壳向晴空辐射散热，通常比环境温度低 4-6 K，也就是每晚有数小时低于露点——十五年里每晚如此。所谓"密封柜"，如果不做针对性设计，内部本身就是个凝水面。

## 最先暴露的四种失效模式

| 失效现象 | 机理 | 早期征兆 | 设计对策 |
|---|---|---|---|
| 焊缝与棱边涂层先坏 | 锐边膜厚不足、焊渣残留、搭接缝积液形成缝隙腐蚀 | 第 2-3 年门框和空调开孔处起锈点、接缝起泡 | 棱边预涂（stripe coat）、开孔倒圆、搭接缝打胶、焊后修补 |
| 端子与铜排氧化 | 裸铜/铝表面附盐吸湿；铜铝过渡处电偶腐蚀 | 接触电阻上升、红外测温发现热点、直流端子扭矩衰减 | 铜排镀锡、双金属垫片、密封电缆入口、端子涂脂 |
| 柜内电子件凝露 | 表面温度低于露点；水汽随呼吸作用进入 | 清晨绝缘电阻/接地故障告警、通讯中断、BMS 假故障 | 按露点控温控湿、防凝露加热器、三防漆、电子仓独立密封 |
| 空调盘管腐蚀与滤网堵塞 | 含盐空气过冷凝器；盐结晶糊住滤材 | 辅助功耗上升、电芯温差变大、高温降额 | 盘管环氧涂层、滤网压差监测、按盐雾工况选型过滤 |

特别注意第三行。我们处理过的"盐雾"质保投诉里，多数并不是盐雾侵入，而是**凝露**——盐本来就随空气进来了，昼夜温差把它送到了电路板上。

## 防腐涂层：定体系，不是定颜色

ISO 12944 是通用框架：等级由场地定，耐久年限由"你打算多久不管它"定。

| 等级 | 总干膜厚度 | 中性盐雾 (ISO 9227) | 循环/冷凝试验 | 耐久性 | 典型用途 |
|---|---|---|---|---|---|
| C3 | 200-250 µm | 480 h | — | 中，7-15 年 | 内陆户外 |
| C4 | 240-320 µm | 720 h | 冷凝 480 h | 高，15-25 年 | 工业沿海 |
| C5-M | ≥ 320-340 µm | 720-1,000 h | 冷凝 480 h | 高，15-25 年 | 沿海 / 海洋 |
| C5-H | ≥ 320-400 µm | 1,440 h | 循环老化 1,680 h | 很高，> 25 年 | 化工 + 沿海 |

比等级标签更重要的有三点：

1. **耐久性 ≠ 质保**。ISO 12944 的耐久性分级是在既定维护制度下的技术预期。商业质保要单独谈，包括免责条款和它假设的巡检频次。
2. **中性盐雾只是筛选试验**。ISO 9227 是 35 ℃、5 % NaCl 连续喷雾、从不干燥，复现不了干湿交替、紫外老化和机械损伤。**IEC 60068-2-52 试验 Kb**（35 ℃ 喷 2 h，再 40 ℃/93 % RH 湿热 22 h，循环重复；国内对应 GB/T 2423.18-2021）才更接近沿海柜体的真实工况——长期通电、偶尔开箱的设备用方法 2，干湿频繁交替的用方法 3-6。采购时要问清用哪个方法、做多少个循环。
3. **基材比油漆重要**。底架、撬体和结构钢应做 **ISO 1461 热浸镀锌**，而不是拿冷轧板喷漆顶上——底架是长期泡在积水和泥里的。外露紧固件用 A4/316 不锈钢，304 在氯离子环境会点蚀。不同金属的接合面必须绝缘隔离，否则铝板会被不锈钢螺栓"献祭"掉。

## 密封、呼吸与压力平衡

IP55 挡得住喷水，挡不住水汽。40 尺箱体在昼夜热循环下每天要"呼吸"进出数升湿空气，经过密封条、电缆入口和门缝，每一个入口都是凝露源。

两条自洽的技术路线，别不小心混着用：

- **全密封**：IP65/IP66 柜体 + 空气-空气换热器或空调 + 干燥剂 + 膜式压力平衡呼吸阀。电池仓效率最高，但辅助功耗是真实的，必须计入能耗预算。
- **通风型**：IP54 + 过滤正压送风。散热便宜，但滤网维护必须诚实执行——盐结晶会糊死普通百叶滤网，滤网一堵，热问题几周内就变成降额问题。

工程上通常是混合方案更优：电池仓密封、PCS 仓通风、两套过滤独立。无论走哪条路线，控湿都要按**露点**设目标而不是按温度：柜内相对湿度控制在 55-60 %，并且不要为了追电芯温度设定值把某个表面冷到环境露点以下。

## 第三年才暴露的电气细节

按 **IEC 60664-1**，存在凝露的户外柜属于污秽等级 3（PD3），而多数从室内产品沿用过来的设计按 PD2 做。这会直接改变爬电距离和电气间隙，也意味着带绝缘护套的铜排、相间隔板、绝缘连接件不是"选配"。

- 铜排**镀锡**替代裸铜；信号线端子镀镍；动力电缆一律用镀锡铜鼻子。
- BMS、EMS 板做**三防漆**，传感器灌封，风扇选 IP68 或胶封型——风机轴承是沿海最经典的卡死点。
- **绝缘监测阈值要按潮湿工况整定**：接受更低的基线值、看趋势而不是看绝对值，否则系统会在潮湿的清晨频繁跳机。
- **50 ℃ 环境温度下的降额**要覆盖接触器、断路器和风扇，不能只算电芯。

## 最容易被漏掉的一环：海运与到场存放

集装箱储能在首次上电之前，通常已经在海上漂了三到六周。跨越气候带的温差会在箱顶内侧形成"集装箱雨"，冷凝水直接滴到电池架上——很多项目在调试开始前，端子已经氧化、BMS 已经受潮。

运输防护要写进合同：按箱体容积和航程配干燥剂、裸铜排覆 VCI 气相防锈膜、放 30/40/50 % 湿度指示卡，并约定到场开箱流程——开箱、拍照、读指示卡、上电前测绝缘、复紧直流端子扭矩、首次满功率循环做红外扫描。电芯按 UN38.3 与 IMDG 规则以低 SOC 出运，调试充电要排进工期。

## RFQ 里必须写清的八条

1. 场地腐蚀等级，**以及判定依据**——实测氯离子沉降率，或 ISO 9223 参考图 + 风玫瑰分析。
2. 完整涂层方案：前处理、底漆、中间漆、面漆、每道及总干膜厚度、颜色与耐紫外性能。
3. 盐雾**和**循环腐蚀试验报告，注明标准号、试验方法与循环次数。
4. 底架、撬体、结构钢的镀锌规范（ISO 1461），以及按材质牌号列出的紧固件清单。
5. **分仓**的 IP 等级，加上压力平衡方式和支撑该等级的报告。
6. 防凝露设计：加热器功率、湿度设定值、干燥剂用量、排水方式、地面坡度。
7. 设计假定的污秽等级，以及对应的爬电距离措施。
8. 运输防护方案与到场验收清单。

C5-M 体系在柜体成本上通常贵 10-15 %，折算到整个系统只是个数百分点。把它和全生命周期里的一次中途干预比——现场重新涂装、整组更换端子、或者在峰季因接地故障停机——通常在第一个维护周期结束前就已经回本。

面向沿海工业园区与海岛项目，我们的[工商业储能柜](/products/ci-battery-cabinets)按 C5-M 柜体规范制造，电子仓独立密封；公用事业级沿海项目可选配热浸镀锌底架、316 外露件与露点控制空调的[集装箱式储能系统](/products/energy-storage-system)。把项目坐标、离海距离和主导风向发给我们，工程团队会返回一份含涂层方案的防腐与防凝露技术规格书——[点此联系我们](/contact)。"""

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

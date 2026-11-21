# -*- coding: utf-8 -*-
"""Content for: Southeast Asia BESS market entry guide 2026."""

SLUG = "southeast-asia-bess-market-entry-guide-2026"
DATE = "2026-11-22"
READ_TIME = 11
TAGS = ["BESS", "Southeast Asia", "Vietnam", "Philippines", "Malaysia", "Energy Storage"]

EN_CATEGORY = "Market Guide"
EN_TITLE = "Southeast Asia BESS Market Entry Guide 2026: Vietnam, Philippines, Malaysia, Indonesia"
EN_DESCRIPTION = (
    "Five ASEAN markets moved battery storage from pilot to procurement in 2026, but each pays for it "
    "differently. A practical guide to Vietnam's 10-15% tariff premium, the Philippines' contracted "
    "reserve rates, Malaysia's mandatory LSS6 storage, Indonesia's TKDN gate, and what it changes in your spec."
)

EN_BODY = """Southeast Asia has stopped being a watch-list market for battery storage. In 2026 three of its five largest economies moved storage from demonstration to procurement: Vietnam issued a dedicated BESS decree, Malaysia made batteries a mandatory condition of its biggest solar auction, and the Philippines paid a battery owner a contracted reserve rate to keep the Visayas grid out of yellow alerts. Indonesia compressed a 100 GW solar programme from five years into three. Only Thailand is still waiting.

The complication is that these markets do not pay for storage the same way. A container sold into the wrong mechanism is an asset chasing a revenue line it was never eligible for. This guide maps the five procurement routes and what they change in a technical specification.

## Five markets, five different ways to get paid

| Market | Procurement mechanism | Storage sizing rule | How the battery earns | Status, November 2026 |
| --- | --- | --- | --- | --- |
| Vietnam | Revised PDP8; Decree 243/2026/ND-CP; EVN internal allocation | ≥10% of PV capacity, ≥2 h, ≥5% of annual output | 10–15% feed-in tariff premium; two-part capacity + energy tariff being drafted | 1.2 GW assigned to five EVN corporations; Hanoi 50 MW/100 MWh pilots energised July 2026 |
| Philippines | DOE GEA auctions (GEA-4, GEA-7); NGCP ASPA for reserves | ≥4 h, ≥85% round-trip efficiency | Contracted reserve payments (PhP5.28/kWh provisional) plus energy market | GEA-4 ~1.2 GW storage awarded; NGCP 850 MW Project Airbag rolling out |
| Malaysia | MyBeST standalone BOO; LSS6 hybrid auction; CRESS corporate PPA | 50% of solar capacity in LSS6 | Availability payment (MyBeST); cheaper access-charge band (CRESS) | MyBeST 400 MW/1,600 MWh contracted, COD 2027; LSS6 bids closed August 2026 |
| Indonesia | RUPTL 2025–2034; 100 GW solar quick-win; hybrid plant regulation | 1 MW PV to 4 MWh storage in the village microgrid blueprint | PLN direct selection inside a ministerial price band | 17 GWp + 39 GWh quick-win package; no standalone BESS tender yet |
| Thailand | EGAT enhanced single buyer; new direct PPA rules | No mandate | PPA energy tariff | Three co-located projects, 184 MW solar / 345 MWh storage; no standalone storage |

## Vietnam: a 16 GW target with only a tariff premium to monetise today

The revised PDP8 sets **10–16.3 GW of battery storage by 2030** and roughly 96 GW by 2050. So far the only bankable revenue is a **10–15% feed-in tariff premium**: under Decision 988/QD-BCT and Circular 09/2025/TT-BCT, a solar plant qualifies only if its battery is at least 10% of PV capacity, at least two hours long, and contributes at least 5% of annual grid-connected output. That three-part test disqualifies most proposals that were sized for arbitrage.

Decree 243/2026/ND-CP, issued 26 June 2026, finally gives storage a legal footing, including batteries paired with self-consumption rooftop solar. EVN has assigned **1.2 GW** of cumulative build to its five regional corporations for 2026 commissioning, and the Hanoi pilot portfolio of **50 MW/100 MWh** across five sites was fully energised on 5 July 2026. EVN's own modelling puts northern demand at 1.35–2.8 GW in 2026 rising to 1.7–6.5 GW by 2030 across load-growth scenarios from 8.5% to 14.1%.

Two caveats matter to a supplier. First, Vietnam still has **no complete technical standard for BESS inside or near 110 kV substations**, and fire safety rules are described by EVN itself as incomplete. Bankability therefore rests on your own IEC 62619 and UL 9540A file, not on local code. Second, at roughly 85% round-trip efficiency, storage directly worsens a utility's loss indicator — expect efficiency guarantees to be argued harder here than anywhere else in the region.

## Philippines: the fastest cash flow in ASEAN right now

The Visayas grid logged **123 yellow and red alerts between January and early September 2026**, and the firm reserve position explains why: only 40 MW of regulating and 67.3 MW of contingency reserve were under firm contract against requirements of 67 MW and 75 MW. The Department of Energy estimates that around **200 MW of batteries could halve the alert count**.

The Energy Regulatory Commission responded by moving in days, not quarters. On 9 October 2026 it granted provisional authority for the NGCP–East Asia Utilities agreement covering a **44.72 MW battery in Mactan**, delivering up to 13 MW of regulating and 13 MW of contingency reserve for five years at **PhP5.28/kWh** — against a Visayas reserve market averaging around PhP21/kWh. An auction programme runs alongside it: **GEA-4** awarded about 1.2 GW of integrated storage inside 10,195 MW across 123 projects, with commercial operation through 2029. GEA-7, announced in February 2026, adds 3.2 GW of solar-plus-storage.

Two requirements are hard gates rather than preferences: **minimum four hours of storage** and **minimum 85% round-trip efficiency**. Because reserves are contracted as firm, an unavailable battery is a penalised battery — the SoC floor and the augmentation schedule become contract terms, not engineering preferences.

## Malaysia: storage became a condition of entry, not an asset

LSS6 is the largest solar tender Malaysia has run: 2,500–2,650 MW of solar with **1,250 MW of mandatory storage** (5,000–6,000 MWh depending on the published version), split into a 2,200 MW open package, a 300 MW Bumiputera package, and a 150 MW package with no storage. Bids closed in August 2026 with commercial operation due by 31 December 2029. Storage is sized at **50% of solar capacity** — a qualifying condition, not a separately remunerated asset.

The commercial trap is that in LSS6 the battery has **no revenue line of its own**. It is a cost the solar tariff has to carry, so the winning specification optimises dollars per kilowatt-hour installed and availability, not cycles monetised. By contrast MyBeST, the standalone build-own-operate route, does pay for capacity: 400 MW/1,600 MWh tendered as four 100 MW/400 MWh projects, with the first BESS service agreement signed with TNB in June 2026 and financial close in September. CRESS, the corporate green PPA route, does not mandate storage but pays for it indirectly — on 18 September 2026 the access charge for firm green supply was cut to **14 sen/kWh from 20 sen**, conditional on a ten-year contract and operation by end-2028.

## Indonesia: local content is the gate, not the tariff

RUPTL 2025–2034 plans 69.5 GW of new capacity, 76% of it renewable plus storage, including roughly **6 GW of BESS** inside 10.3 GW of total storage. The 100 GW solar programme was compressed from five years to three in May 2026, and its quick-win package pairs **17 GWp of solar with 39 GWh of batteries**. A village microgrid blueprint implies 80 GW as 1 MW PV plus 4 MWh of storage across 80,000 villages — about 320 GWh of demand.

None of that volume is accessible without clearing **TKDN**. Local content for PV and battery projects steps from 50% in 2025 toward 80% by 2030, with a 20% floor already enforced on electricity infrastructure from 2026. PLN has publicly asked for a BESS relaxation while domestic manufacturing matures, and Presidential Regulation 10/2024 allows 100% foreign ownership in storage manufacturing — which is the realistic route: local rack and container assembly with imported cells, documented before bid submission. MEMR Regulation 19/2025, effective 29 December 2025, finally defines the hybrid plant model that most Indonesian projects will use.

## Thailand: the laggard that will be pulled by data centres

Thailand had three co-located solar-plus-storage projects totalling **184 MW of solar and 345 MWh of storage** at the end of 2024, and no standalone storage. EGAT remains the offtaker under the enhanced single buyer model, and new direct PPA rules are being written to let large users and generators connect directly — the demand driver being data centres rather than renewables integration. Treat Thailand as a 2027 specification market, not a 2026 one.

## What this means for your technical specification

1. **Standardise on a 20-ft, ~5 MWh liquid-cooled LFP DC block** so the same platform can present four hours at 1.25 MW in Manila and two hours at 2.5 MW in Vietnam without a new certification cycle.
2. **Guarantee 85% round-trip efficiency AC-to-AC with a third-party witnessed test**, because the Philippines treats it as an award gate and Vietnam as a loss-accounting liability.
3. **Carry IEC 62619, IEC 63056 and a UL 9540A cell-level test report** as standard documentation — in Vietnam and Indonesia these substitute for absent local BESS codes.
4. **Design the MV interface for 110 kV, 115 kV, 132 kV and 275 kV** substation practice in one engineering package; the interconnection study, not the battery, is the schedule risk.
5. **Build a TKDN worksheet before bidding in Indonesia** and a Bumiputera partnership structure before bidding in Malaysia — neither can be retrofitted after award.
6. **Commit to spares and field service inside 48 hours** from a regional hub; firm reserve and availability contracts convert downtime directly into penalties.

## Where to start

If the priority is cash flow within twelve months, the Philippines ancillary services market is the only ASEAN route already paying contracted rates. If it is volume on a standard product, Malaysia's LSS6 supply chain and its 2027 MyBeST follow-on round are the cleanest entry. If it is a policy tailwind with a premium, Vietnam's PV-plus-storage coupling is the cheapest qualification. If it is scale, Indonesia offers the largest pipeline and the highest compliance cost.

Whatever the route, the equipment question converges: grid-scale LFP DC blocks engineered for four-hour duty, documented to IEC and UL standards, and backed by a service footprint inside the region. Our [grid-scale BESS containers](/products/energy-storage-system) and [C&I battery cabinets](/products/ci-battery-cabinets) are built to that brief, with IEC 62619, UN38.3, GB/T 36276-2023 and CE documentation available for tender submission.

**Planning an ASEAN project?** Send us the market, the connection voltage and the reserve or tariff mechanism you are bidding into, and we will return a sized DC block layout, an efficiency guarantee position and a compliance document list within two working days — [talk to our engineering team](/contact).
"""

ZH_CATEGORY = "市场指南"
ZH_TITLE = "2026 东南亚储能市场进入指南：越南、菲律宾、马来西亚、印尼五国采购路径对比"
ZH_DESCRIPTION = (
    "2026 年东盟五大市场同时把储能从示范推向采购，但每个市场付钱的方式完全不同。本文拆解越南 10-15% 上网溢价、"
    "菲律宾备用容量合约电价、马来西亚 LSS6 强制配储、印尼 TKDN 本地含量门槛，以及对技术规格的实际影响。"
)

ZH_BODY = """东南亚已经不再是储能行业的"观察名单"市场。2026 年，五个最大经济体中有三个把储能从示范项目推进到了正式采购：越南出台了专门的储能法令，马来西亚把配储变成最大光伏招标的强制条件，菲律宾则用合约备用容量电价把电池业主拉进了缓解维萨亚斯电网黄红灯的名单。印尼把 100GW 光伏计划从五年压缩到三年。只有泰国还在观望。

问题在于，这五个市场付钱的方式完全不同。把同一个集装箱卖进错误的机制，就是让资产去追一条它本来没有资格拿的收益线。

## 五个市场，五条完全不同的收益路径

| 市场 | 采购机制 | 配储比例要求 | 电池如何赚钱 | 2026 年 11 月状态 |
| --- | --- | --- | --- | --- |
| 越南 | 修订版 PDP8；243/2026/ND-CP 号法令；EVN 内部指标分解 | ≥光伏装机 10%、≥2 小时、≥年发电量 5% | 10-15% 上网电价溢价；两部制容量+电量电价在制定中 | 1.2GW 已下达五大 EVN 区域公司；河内 50MW/100MWh 试点 7 月全投 |
| 菲律宾 | 能源部 GEA 招标（GEA-4、GEA-7）；NGCP 备用容量采购协议 ASPA | ≥4 小时、往返效率 ≥85% | 合约备用容量电费（临时核准 5.28 比索/kWh）+ 电量市场 | GEA-4 已授标约 1.2GW 配储；NGCP 850MW "安全气囊"计划推进中 |
| 马来西亚 | MyBeST 独立储能 BOO；LSS6 混合招标；CRESS 企业绿电直供 | LSS6 按光伏容量 50% 配储 | MyBeST 拿可用率容量费；CRESS 拿更低系统接入费档位 | MyBeST 400MW/1600MWh 已签约，2027 年投运；LSS6 2026 年 8 月截标 |
| 印尼 | RUPTL 2025-2034；100GW 光伏快赢包；混合式发电厂条例 | 村级微电网蓝图按 1MW 光伏配 4MWh 储能 | PLN 直接遴选，价格在部长基准区间内 | 17GWp + 39GWh 快赢包；尚无独立储能招标 |
| 泰国 | EGAT 强化单一买方；新增直供 PPA 规则 | 无强制要求 | PPA 电量电价 | 仅 3 个共址项目，184MW 光伏配 345MWh；无独立储能 |

## 越南：16GW 的目标，但眼下只有电价溢价能变现

修订版 PDP8 把 2030 年储能目标定在 **10-16.3GW**，2050 年约 96GW。但目前唯一可融资的收益是 **10-15% 的上网电价溢价**：按 988/QD-BCT 号决定和 09/2025/TT-BCT 号通知，光伏项目必须同时满足配储容量不低于装机 10%、时长不少于 2 小时、年上网电量贡献不低于 5% 三项条件才能拿到溢价。这三道门槛把大部分按峰谷套利思路做的方案直接筛掉了。

2026 年 6 月 26 日颁布的 **243/2026/ND-CP 号法令**终于给了储能法律依据，并明确覆盖"储能+自发自用屋顶光伏"的组合。EVN 已向五个区域电力总公司下达 1.2GW 累计建设指标，要求 2026 年内投运；河内五个试点站点合计 **50MW/100MWh** 已于 2026 年 7 月 5 日全部并网。EVN 自己的测算显示，北部 2026 年需求 1.35-2.8GW，2030 年在 8.5%-14.1% 四档负荷增速情景下升至 1.7-6.5GW。

对供应商有两个关键提醒。第一，越南**至今没有针对 110kV 变电站内或邻近区域储能的完整技术标准**，消防安全规定连 EVN 自己都承认不完善，因此可融资性取决于你手里的 IEC 62619 和 UL 9540A 文件，而不是当地规范。第二，往返效率约 85% 意味着储能会直接恶化电网企业的线损指标——越南对效率保证条款的盘问会比区域内任何市场都严。

## 菲律宾：目前东盟现金流最快的市场

维萨亚斯电网 2026 年 1 月至 9 月初累计出现 **123 次黄灯和红灯警报**，根因是备用容量严重不足：调节备用仅 40MW、事故备用 67.3MW 签了固定合约，而要求分别是 67MW 和 75MW。能源部测算，维萨亚斯投运约 **200MW 电池即可让警报次数减半**。

监管机构的反应是以天计的。2026 年 10 月 9 日，能源监管委员会对 NGCP 与 East Asia Utilities 的协议给出临时核准，马克坦 **44.72MW 电池**在五年期内提供最多 13MW 调节备用和 13MW 事故备用，核准电价 **5.28 比索/kWh**（约 0.084 美元），而维萨亚斯备用市场均价约 21 比索/kWh（约 0.335 美元）。同期还有 GEA 招标体系：**GEA-4** 在 123 个项目、10195MW 中授标约 1.2GW 配储，其中 20 个是"新能源+储能"一体化项目，2026-2029 年陆续投运；2026 年 2 月公布的 GEA-7 再追加 3.2GW 光储。

两个硬门槛不是偏好而是资格线：**储能时长不低于 4 小时**、**往返效率不低于 85%**。而且备用容量是"固定"合约——不可用就要罚款，所以 SOC 下限和增容计划是合同条款，不是工程选项。

## 马来西亚：配储变成了入场券，而不是资产

LSS6 是马来西亚史上最大的光伏招标：2500-2650MW 光伏，配套 **1250MW 强制储能**（按不同口径为 5000-6000MWh），拆成 2200MW 公开标段、300MW 土著企业标段和 150MW 不配储标段。2026 年 8 月截标，要求 2029 年 12 月 31 日前全容量投运。配储比例是**光伏容量的 50%**——这是资格条件，不是单独计价的资产。

商业上的陷阱在于：LSS6 项目里的电池**没有自己的收益线**。它是光伏电价必须承担的成本，所以中标的技术方案优化的是"每千瓦时装机成本+可用率"，而不是"套利循环收益"。相比之下，MyBeST 独立储能 BOO 路线是真付容量费：400MW/1600MWh 按四个 100MW/400MWh 项目招标，首个储能服务协议已于 2026 年 6 月与 TNB 签署、9 月完成融资关闭。CRESS 企业绿电直供路线不强制配储，但通过电价档位间接为储能付费——2026 年 9 月 18 日，稳定绿电供应的系统接入费从 20 仙/kWh 降至 **14 仙/kWh**，条件是十年以上合约且 2028 年底前投运。

## 印尼：真正的门槛是本地含量，不是电价

RUPTL 2025-2034 规划新增 69.5GW 装机，其中 76% 来自新能源和储能，含约 **6GW 电池储能**（总储能 10.3GW，含抽水蓄能）。100GW 光伏计划在 2026 年 5 月从五年压缩到三年，快赢包把 **17GWp 光伏与 39GWh 储能**打包招标。村级微电网蓝图按"1MW 光伏+4MWh 储能"覆盖 8 万个村庄，对应约 320GWh 储能需求。

但这些量在没有解决 **TKDN（本地含量）**之前一个都拿不到。光伏与电池项目的本地含量要求从 2025 年的 50% 逐步提升到 2030 年的 80%，电力基础设施项目自 2026 年起已执行不低于 20% 的下限。PLN 已公开申请在本地制造能力成熟前放宽储能 TKDN，而 2024 年第 10 号总统条例允许储能制造领域外资 100% 持股——这才是现实路径：进口电芯 + 本地机架/集装箱组装，并在投标前把 TKDN 计算书做出来。2025 年 12 月 29 日生效的能矿部第 19 号混合式发电厂条例，则终于把印尼大多数项目会采用的"新能源+储能同点接入"模式纳入规范。

## 泰国：落后一步，但会被数据中心拉起来

截至 2024 年底，泰国只有三个共址光储项目，合计 **184MW 光伏配 345MWh 储能**，没有独立储能。EGAT 在强化单一买方模式下仍是主要承购方，新的直供 PPA 规则正在制定，允许大型用户和发电方直接接网——真正的需求驱动是数据中心，而不是新能源消纳。把泰国当作 2027 年的规格市场，而不是 2026 年的订单市场。

## 对技术规格的六个直接影响

1. **统一到 20 尺、约 5MWh 液冷 LFP 直流舱平台**，让同一平台在马尼拉以 1.25MW/4 小时、在越南以 2.5MW/2 小时呈现，而不必重走认证流程。
2. **按交流侧 85% 往返效率做第三方见证测试并出具保证**，因为菲律宾把它当授标门槛、越南把它当线损责任。
3. **把 IEC 62619、IEC 63056 和 UL 9540A 电芯级报告作为标准随箱文件**，在越南和印尼它们替代了缺失的本地储能规范。
4. **一套工程包同时适配 110kV、115kV、132kV、275kV 变电站接口**，工期风险在接入系统研究，不在电池本身。
5. **印尼投标前完成 TKDN 计算书、马来西亚投标前确定土著企业合作结构**，两者都无法在中标后补救。
6. **承诺区域备件仓 48 小时到场**，因为固定备用和可用率合约会把停机直接换算成罚款。

## 从哪里切入

如果首要目标是一年内产生现金流，菲律宾的辅助服务市场是东盟唯一已经在按合约电价付钱的路子。如果是标准产品的批量出货，马来西亚 LSS6 的供应链及其 2027 年 MyBeST 后续轮次是最干净的入口。如果是政策红利加溢价，越南的光储耦合是门槛最低的资格。如果是规模，印尼的管道最大，合规成本也最高。

无论走哪条路，设备问题的答案都在收敛：为 4 小时工况设计的电网级 LFP 直流舱、按 IEC 与 UL 体系做完整取证、并在区域内具备服务覆盖。我们的[电网级储能集装箱](/products/energy-storage-system) 与 [工商业储能柜](/products/ci-battery-cabinets) 即按此思路设计，可提供 IEC 62619、UN38.3、GB/T 36276-2023 与 CE 全套投标文件。

**正在规划东盟项目？** 把目标市场、接入电压等级和你要投标的收益机制发给我们，我们会在两个工作日内返回直流舱配置方案、效率保证立场和合规文件清单——[联系我们的工程团队](/contact)。
"""

# -*- coding: utf-8 -*-
"""Content for blog post: duck-curve-battery-storage-evening-ramp-strategy (2026-11-13)"""

SLUG = "duck-curve-battery-storage-evening-ramp-strategy"
DATE = "2026-11-13"
READ_TIME = 11
TAGS = ["BESS", "Duck Curve", "Energy Arbitrage", "Solar+Storage", "CAISO"]

EN = {
    "locale": "en",
    "category": "Market Analysis",
    "title": "Duck Curve Battery Storage: Turning the Evening Ramp Into Revenue (2026 Guide)",
    "description": "The duck curve - cheap midday solar followed by a steep evening net-load ramp - now defines battery storage economics worldwide. 2026 data from CAISO, Germany and Australia, plus duration, dispatch and siting strategies for developers and C&I owners.",
    "body": """The **duck curve** is the shape of a grid's **net load** - total demand minus variable renewable output - across 24 hours. In solar-heavy grids, midday generation floods the system and pushes net load into a deep "belly." Around sunset, solar output collapses within roughly 90 minutes just as residential and commercial demand climbs, forming the steep "neck." CAISO first charted the phenomenon in 2013. What was a California curiosity is now a global operating condition: Germany, the Netherlands, Spain, Australia's National Electricity Market (NEM) and parts of India all show the same deep midday trough and violent evening ramp.

For anyone buying, building or operating a **battery energy storage system (BESS)**, the duck curve is no longer background context. It is the core business case - and, increasingly, the core risk.

## The duck curve in 2026, by the numbers

The curve has deepened measurably over the past twelve months. Three markets tell the story:

| Market | Metric | Latest reading | What it signals |
| --- | --- | --- | --- |
| CAISO | Day-ahead 2pm trough / 7pm peak (June 2026) | $7 / $35 per MWh (vs $16.55 / $52 in 2025) | Daily spread compressing ~30% |
| CAISO | Negative-price hours (June 2026) | 66 hours, tripled year-on-year | Midday charging is nearly free |
| CAISO | Spring 2026 solar curtailment | Record 4.8 GW average | Surplus midday energy is abundant |
| Germany | Intraday record low (May 2026) | -855 EUR/MWh, back to +245 EUR/MWh within hours | Extreme volatility in both directions |
| Germany | Negative-price hours (2024) | 457 hours | Structural, not exceptional |
| NEM (Australia) | NSW evening price peak (Q2) | Down ~two-thirds since 2023 | Batteries are flattening the neck |

In March 2026, CAISO's daily minimum net load reached **-2.2 GW** - the grid literally had more supply than demand at noon - compared with barely positive values a year earlier, while utility-scale solar averaged **17.8 GW** of midday output (+13% year-on-year). Germany's May 2026 intraday print of **-855 EUR/MWh**, rebounding to +245 EUR/MWh within hours, is the sharpest single-day swing ever recorded in a major European market.

## Why the evening ramp is the battery's core business case

A battery monetizes the difference between the belly and the neck: charge midday at zero or negative prices, discharge into the 6-9pm peak. This **energy arbitrage** is now the dominant revenue stream, not an add-on:

- **Day-ahead arbitrage delivered 72% of CAISO wholesale battery revenue in 2024** (Modo Energy), with ancillary services shrinking to a thin slice.
- **Australia's NEM, Q3 2026:** grid batteries earned A$88.8M net from arbitrage versus just A$2.1M from contingency FCAS. The average discharge price was **$98/MWh against a $32/MWh average charge price** - a $66/MWh gross spread created almost entirely by the duck curve.
- **The Hornsdale arc:** in its first five years the famous South Australian battery earned ~85% of revenue from frequency control and 15% from arbitrage. By 2025 that had inverted to 97% arbitrage. The revenue stack migrates toward the duck curve shape as ancillary markets saturate.

## Duration: why four hours became the standard

The evening neck lasts roughly three to four hours from late afternoon through the net peak. That physical reality, plus market design, has made **4-hour duration** the global default:

| Attribute | 2-hour BESS | 4-hour BESS |
| --- | --- | --- |
| Evening ramp capture | First 2 hours only | Full 6-9pm window |
| RA / capacity accreditation (CAISO) | Derated to 50% under 4-hour standard | Full nameplate credit |
| Slice of Day accreditation | Penalized at later slices | Rewarded for evening shape |
| Capital cost per kWh | Higher (fixed costs spread thin) | Lower marginal cost per added hour |
| Merchant revenue exposure | Higher per MW, fewer hours | Balanced energy + capacity |

CAISO's Resource Adequacy (RA) framework measures capacity over **four consecutive hours**, and the new **Slice of Day** accreditation aligns capacity value with the evening net-peak profile. The result: CAISO's fleet averaged **3.8 hours** of duration at the end of 2025, and in Q2 2026 **every financed 2-hour project Modo Energy tracked sat in ERCOT** - every financed project outside Texas was sized to four hours. For a [grid-scale BESS container](/products/energy-storage-system), duration is now a revenue-design decision, not just a cost decision.

## Saturation: batteries eating their own spread

Here is the uncomfortable part. Batteries flatten the very curve they profit from:

- **KfW Research** (panel of European bidding zones, 2023-2025) found each additional 1 MW of grid-scale battery per GW of peak load narrows the day-ahead spread by **0.52 EUR/MWh**. Applied to Germany's fleet growth, daily spreads are roughly **17-19% smaller** than they would otherwise be.
- **CAISO merchant battery revenue fell from ~$80/kW-yr (2023) to $51 (2024) to $40 (2025)**; June 2026 landed at $2.55/kW-month, down 17% year-on-year.
- **AEMO reported that in Q1 2026 batteries replaced hydro as the most frequent price-setting technology** on the NEM - and NSW's evening price peak has fallen by about two-thirds since 2023.

Notably, KfW found that **behind-the-meter storage shows no such compression effect** - BTM batteries charged for self-consumption rarely bid into wholesale markets. This asymmetry matters for where you deploy.

## Dispatch strategy: how winning projects position

1. **Contract the floor first.** CAISO bilateral RA contracts averaged $8.77/kW-month in H1 2025, lifting full-stack revenue to ~$178/kW-yr versus a $40/kW-yr wholesale-only benchmark. Merchant arbitrage is the upside; the contracted floor is what makes the project financeable.
2. **Dispatch against net load, not against price alone.** Studies on real PV-plus-storage assets (Applied Sciences, 2026) show that dispatch strategies minimizing the hour-to-hour **rate of change** in net load outperform naive flattening - the same battery, same SOC, materially different outcome.
3. **Respect the SOC window and degradation cost.** Aggressive daily cycling to catch every spread trades revenue for cycle life; a degradation-aware dispatch layer typically improves net margin even at slightly lower gross revenue.
4. **Exploit geographic spread.** EDAM (live May 2026 with PacifiCorp) opened cross-region day-ahead trading across the western US, and SP15 still trades spreads ~40% wider than NP15. Siting near solar-rich, congestion-bound nodes preserves spread longer.

## What the duck curve means for C&I owners

For industrial and commercial consumers, the duck curve arrives through the tariff, not the wholesale market:

- **California (NEM 3.0):** export value for midday solar was slashed by roughly 75%, effectively forcing new solar to pair with on-site storage so energy self-consumes through the 4-9pm TOU peak. With ITC (30-40%) plus SGIP rebates, commercial payback periods commonly land at **3.5-5.5 years**.
- **Europe:** negative-price hours exceeded 1,000 across Germany, the Netherlands, France and Spain in 2026, and exporting solar into negative-price windows can now incur direct penalties. A retrofit [C&I battery cabinet](/products/ci-battery-cabinets) inverts the equation: charge when prices are negative or zero, discharge through evening industrial peaks.
- **Australia:** AEMO metering data shows homes with batteries cut 4-9pm grid imports by **74%** versus solar-only homes; the same math applies to factories running evening shifts.

## The takeaway

The duck curve created the battery storage industry, and batteries are now reshaping the curve in return. For 2026-2027 projects, the winning posture is: size duration to the evening ramp (four hours for front-of-the-meter in most markets), secure a contracted revenue floor before betting on merchant spreads, dispatch against net-load forecasts with degradation awareness, and for behind-the-meter buyers, treat storage as the companion that makes solar valuable again.

Planning a project against a deepening duck curve? [Contact our engineering team](/contact) for sizing studies, duration optimization and quotation support for grid-scale BESS containers and C&I battery cabinets."""
}

ZH = {
    "locale": "zh",
    "category": "市场分析",
    "title": "鸭子曲线与电池储能：如何把光伏早晚爬坡变成收益（2026 实战指南）",
    "description": "鸭子曲线——中午光伏过剩、傍晚净负荷陡峭爬坡——已成为全球储能经济性的核心变量。本文用 2026 年 CAISO、德国、澳洲的最新数据，拆解时长选型、调度策略与工商业落地打法。",
    "body": """**鸭子曲线**是电网**净负荷**（总需求减去风光出力）在 24 小时内的形状：中午光伏大发把净负荷压出一个深"鸭腹"，日落前后光伏出力在约 90 分钟内坍塌、而用电需求正好爬升，形成陡峭的"鸭颈"。CAISO 在 2013 年首次画出这条曲线，如今它已是全球性运行工况——德国、荷兰、西班牙、澳大利亚 NEM 乃至印度部分电网，都呈现同样的"中午深谷 + 傍晚陡坡"形态。

对任何采购、投资或运营**电池储能系统（BESS）**的主体来说，鸭子曲线已不只是背景知识，它就是商业模式本身——也是最大的风险来源。

## 2026 年的鸭子曲线：数据说话

过去一年曲线明显加深，三个市场最有代表性：

| 市场 | 指标 | 最新读数 | 含义 |
| --- | --- | --- | --- |
| CAISO | 日前 14 点低谷 / 19 点峰值（2026 年 6 月） | 7 / 35 美元每 MWh（2025 年为 16.55 / 52） | 日内价差收窄约 30% |
| CAISO | 负电价小时数（2026 年 6 月） | 66 小时，同比翻了三倍 | 中午充电几乎免费 |
| CAISO | 2026 年春季光伏弃电 | 平均创纪录 4.8 GW | 中午过剩电力极度充裕 |
| 德国 | 日内历史最低价（2026 年 5 月） | -855 欧元/MWh，数小时内回到 +245 | 双向极端波动 |
| 德国 | 负电价小时数（2024 年） | 457 小时 | 结构性而非偶发 |
| 澳洲 NEM | 新南威尔士傍晚价格峰值（Q2） | 较 2023 年下降约三分之二 | 储能正在"压平"鸭颈 |

2026 年 3 月，CAISO 当日净负荷最低点到 **-2.2 GW**——中午电网供给真的多于需求——而一年前勉强为正；同期大型光伏中午平均出力 **17.8 GW**（同比 +13%）。德国 2026 年 5 月日内出现 **-855 欧元/MWh**、数小时内反弹至 +245 欧元/MWh，是欧洲主要市场有史以来最剧烈的单日摆动。

## 为什么傍晚爬坡是储能的核心收益来源

储能赚的就是"鸭腹"与"鸭颈"之间的差价：中午以零价或负价充电，在 18-21 点高峰放电。这种**能量套利**如今已是主导收益，而非附加项：

- **2024 年，日前能量套利占 CAISO 储能批发电价的 72%**（Modo Energy），辅助服务份额被压缩到很薄的一层。
- **澳洲 NEM 2026 年三季度：** 电网侧储能净套利收入 8880 万澳元，而应急 FCAS 只有 210 万澳元；平均放电价 **98 澳元/MWh，平均充电价 32 澳元/MWh**——66 澳元的毛价差几乎完全由鸭子曲线创造。
- **Hornsdale 电站的收入迁移：** 投运前五年约 85% 收入来自调频、15% 来自套利；到 2025 年已反转为 97% 套利。随着辅助服务市场饱和，收入结构正在向鸭子曲线的形状迁移。

## 时长选型：为什么 4 小时成了全球标准

傍晚爬坡从下午持续到净高峰，长约 3-4 小时。这一物理现实叠加市场规则，让 **4 小时时长**成为默认配置：

| 属性 | 2 小时 BESS | 4 小时 BESS |
| --- | --- | --- |
| 傍晚爬坡覆盖 | 只覆盖前 2 小时 | 完整覆盖 18-21 点 |
| RA/容量认证（CAISO） | 按 4 小时标准折减至 50% | 全额容量认证 |
| Slice of Day 分时段认证 | 后半段时段被惩罚 | 因契合傍晚形状而受益 |
| 单位千瓦时造价 | 固定成本摊薄不足，偏高 | 每新增一小时边际成本更低 |
| 市场化收入敞口 | 每 MW 收入高但小时数少 | 能量 + 容量收入均衡 |

CAISO 的资源充裕度（RA）框架要求按**连续 4 小时**计量容量，新的 **Slice of Day** 认证又把容量价值与傍晚净高峰形状对齐。结果是：CAISO 储能机队 2025 年底平均时长已达 **3.8 小时**；2026 年二季度 Modo Energy 追踪到的所有已融资 2 小时项目全部位于德州 ERCOT——德州以外所有已融资项目都按 4 小时配置。对 [电网级 BESS 集装箱](/products/energy-storage-system) 而言，时长已经是"收益设计"决策，而不只是"成本"决策。

## 饱和风险：储能正在吃掉自己的价差

不那么舒服的部分是：储能抹平了自己赖以盈利的曲线：

- **德国复兴信贷银行（KfW）研究**（2023-2025 年欧洲竞价区面板数据）发现：每 GW 峰荷每新增 1 MW 电网侧储能，日前价差收窄 **0.52 欧元/MWh**；按德国机队增速折算，实际价差比"无储能情形"**小约 17-19%**。
- **CAISO 储能市场化收入从 2023 年约 80 美元/kW·年降至 2024 年 51、2025 年 40 美元**；2026 年 6 月仅 2.55 美元/kW·月，同比再降 17%。
- **AEMO 报告 2026 年一季度储能已取代水电成为 NEM 最频繁的定价技术**——新州傍晚价格峰值较 2023 年下降约三分之二。

值得注意的是：KfW 发现**表后（BTM）储能没有这种压缩效应**——为自发自用而充电的表后电池几乎不参与批发市场竞价。这一不对称性直接决定你该把项目放在哪里。

## 调度策略：跑赢的 project 都这样做

1. **先锁定合同底价。** CAISO 双边 RA 合同 2025 年上半年均价 8.77 美元/kW·月，带动全栈收入约 178 美元/kW·年，而纯批发基准只有 40 美元。套利是向上弹性，合同底价才是可融资性的来源。
2. **盯净负荷，而不是只盯价格。** 对真实光储电站的研究（Applied Sciences，2026）表明：以最小化净负荷**逐小时变化率**为目标的调度策略优于简单"削平"——同一块电池、同一 SOC，结果截然不同。
3. **管好 SOC 窗口与衰减成本。** 为了吃下每一分价差而激进日充日放，本质是用循环寿命换收入；带衰减感知的调度层通常即使毛收入略低、净利率反而更高。
4. **利用地域价差。** 2026 年 5 月 EDAM 随 PacifiCorp 上线，打开美国西部跨区日前交易；SP15 价差仍比 NP15 宽约 40%。选址在光伏富集、有阻塞的节点，价差衰减更慢。

## 对工商业用户意味着什么

对工商业终端用户，鸭子曲线不通过批发市场传导，而是通过电价表传导：

- **加州（NEM 3.0）：** 中午光伏上网价值被砍掉约 75%，事实上迫使新建光伏必须配套储能，让电量在 16-21 点 TOU 峰段自发自用。叠加 ITC（30-40%）与 SGIP 补贴后，工商业项目回本周期普遍在 **3.5-5.5 年**。
- **欧洲：** 2026 年德荷法西负电价小时数合计超过 1,000 小时，且在负电价时段向电网送电可能被直接罚钱。加装一台 [工商业电池柜](/products/ci-battery-cabinets) 就能反转局面：负价/零价时段充电，傍晚工业高峰放电。
- **澳洲：** AEMO 抄表数据显示装了电池的家庭 16-21 点从电网购电量比纯光伏家庭低 **74%**——同样的算法也适用于晚班工厂。

## 结论

鸭子曲线催生了储能行业，而储能正在反过来重塑曲线本身。对 2026-2027 年的项目，制胜姿态是：时长按傍晚爬坡配置（海外表前市场基本是 4 小时）、先锁合同收入底价再博市场化价差、按净负荷预测带衰减感知地调度；表后用户则应把储能视为让光伏重新值钱的那块拼图。

正在规划应对鸭子曲线的储能项目？欢迎 [联系我们的工程团队](/contact)，获取电网级 BESS 集装箱与工商业电池柜的容量测算、时长优化与报价支持。"""
}

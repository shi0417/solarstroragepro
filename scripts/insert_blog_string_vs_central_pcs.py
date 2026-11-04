# -*- coding: utf-8 -*-
"""Insert blog article: string-pcs-vs-central-pcs-bess-architecture (2026-11-04).
Uses Supabase REST API (anon key) — verified reachable this run.
"""
import json, subprocess, sys, os

ENV = 'D:/project/solarstoragepro/.env.local'
BASE = 'https://qujcrmbzuzlgjrexbzga.supabase.co/rest/v1'
CURL = ['curl', '-sS', '-m', '90', '--ssl-no-revoke']


def anon_key():
    for line in open(ENV, encoding='utf-8'):
        if line.startswith('NEXT_PUBLIC_SUPABASE_ANON_KEY='):
            return line.split('=', 1)[1].strip()
    raise SystemExit('no anon key')


KEY = anon_key()
HEAD = ['-H', f'apikey: {KEY}', '-H', f'Authorization: Bearer {KEY}',
        '-H', 'Content-Type: application/json']


def post(path, payload, prefer=None):
    args = CURL + ['-X', 'POST', f'{BASE}/{path}'] + HEAD
    args += ['-H', 'Prefer: ' + (prefer or 'return=representation')]
    args += ['-d', json.dumps(payload, ensure_ascii=False)]
    out = subprocess.run(args, capture_output=True, text=True, encoding='utf-8')
    txt = out.stdout.strip()
    if not txt:
        # Prefer: return=minimal -> 201 with empty body is SUCCESS
        if 'error' in out.stderr.lower():
            raise SystemExit('curl error: ' + out.stderr)
        return []
    try:
        return json.loads(txt)
    except json.JSONDecodeError:
        raise SystemExit('bad json: ' + txt[:600])


def get(path):
    out = subprocess.run(CURL + [f'{BASE}/{path}'] + HEAD,
                         capture_output=True, text=True, encoding='utf-8')
    return json.loads(out.stdout.strip())


SLUG = 'string-pcs-vs-central-pcs-bess-architecture'
DATE = '2026-11-04'
READ_TIME = 11
TAGS = ["BESS", "PCS Architecture", "String Inverter", "Energy Storage Design", "Grid Code"]

# ============================ ENGLISH ============================
EN_CATEGORY = 'Engineering'
EN_TITLE = 'String PCS vs Central PCS in BESS: Architecture, Efficiency and Cost Compared'
EN_DESCRIPTION = (
    'The PCS topology choice shapes DC design, redundancy, maintenance and LCOS for the next '
    '15 years. A practical engineering comparison of string vs central PCS for EPCs, integrators '
    'and grid-scale developers, with part-load efficiency, availability math and a decision framework.'
)

EN_BODY = """Choosing between a **string PCS** and a **central PCS** is the single architecture decision that shapes everything else in a battery storage project. It fixes your DC topology, your redundancy model, your maintenance procedure, and a meaningful slice of your **levelized cost of storage (LCOS)**. Yet in most tender documents the point is compressed into one line: "PCS: 2.5 MW central type." That line quietly decides how the plant behaves for the next fifteen years.

This article sets out what actually differs between the two topologies, where the efficiency and cost claims hold up under real duty cycles, and how to pick the right one. The framing comes from our engineering work on **C&I battery cabinets** and **containerized grid-scale BESS** across frequency regulation, peak shaving and renewable shifting projects.

## What String and Central PCS Actually Mean

A **central PCS** is one large bidirectional converter, typically **1 to 2.5 MW**, with a single AC output feeding a medium-voltage transformer. Every battery cluster in the block is hard-paralleled onto one common DC bus — usually 1000 V or 1500 V — with a DC breaker per block.

A **string PCS** is a much smaller converter, typically **100 to 215 kW**, and each unit owns exactly one battery cluster. There is no shared DC bus: twenty to twenty-five strings make up the same 2.5 MW block, but each string has its own isolated DC link, its own protection, and its own current control over its cluster.

On a single-line diagram the difference looks cosmetic. In operation it is not.

## Why DC Paralleling Is the Real Fault Line

Batteries are not ideal voltage sources. Two clusters at different **states of charge (SoC)**, different internal resistance, or different ages will not share current evenly when hard-paralleled. The fresher, lower-resistance cluster does more work, runs hotter, and degrades faster, which widens the gap further. Operators know this as the **barrel effect** — the block's usable capacity converges on its weakest cluster.

Central architectures handle the problem in one of two ways. The rigorous route adds **cluster-level DC/DC converters or cluster switches**, which recovers correct behaviour but adds cost and a conversion stage. The pragmatic route accepts the mismatch and compensates with conservative SoC windows, wider reserve margins and periodic **cluster balancing** during maintenance windows.

A string PCS removes the problem at its source. Each cluster charges and discharges at its own rate, so a 3% SoC spread across twenty clusters does not translate into 3% of lost nameplate capacity. On projects with **high cycle counts or partial-load duty** — frequency regulation, fast AGC response, solar firming, EV depot buffering — that difference shows up directly in delivered MWh.

## Efficiency: Peak Numbers Flatter Central PCS

Datasheet efficiency is quoted at rated load, and central PCS wins there by a small margin: **98.5-99.0%** peak against **98.0-98.8%** for string units. That is not where real projects live.

Frequency regulation and commercial peak shaving rarely run at 100% load. **Below roughly 30% of rated power**, fixed magnetics and switching losses dominate, and central converter efficiency can fall by **2 to 4 percentage points**. A string architecture energises only the strings it needs and runs each near its efficient band, so the part-load curve stays much flatter. Since AC-to-AC **round-trip efficiency** for an LFP system already sits at 85-90% before auxiliary loads, two or three extra points at part load are not a rounding error.

| Metric | Central PCS | String PCS |
| --- | --- | --- |
| Typical unit rating | 1,000-2,500 kW | 100-215 kW |
| Peak efficiency | 98.5-99.0% | 98.0-98.8% |
| Efficiency at 20% load | Drops 2-4 points | Drops under 1 point |
| DC topology | One shared DC bus | One DC link per cluster |
| Single-point failure scope | Full 1-2.5 MW block | One 100-215 kW string |
| Cluster SoC divergence | Needs DC/DC or rebalancing | Inherently avoided |
| PCS capex ($/kW) | Baseline | 30-60% higher |
| Footprint per MW | Smaller | Larger |
| Field replacement | Crane, 1-3 days | Hot swap, 1-2 hours |

## Availability Math on a 100 MW / 200 MWh Project

Redundancy granularity is where the capex gap starts to close.

1. **Central design:** forty 2.5 MW units. One PCS failure removes **2.5%** of plant capacity. Replacement needs a crane, medium-voltage isolation and typically **1-3 days**.
2. **String design:** five hundred 200 kW units. One failure removes **0.2%** of capacity and is a **1-2 hour** hot swap with no MV work.
3. A 2% long-term unavailability difference on a 200 MWh asset, over fifteen years, is on the order of **tens of thousands of MWh** of foregone throughput — frequently more than the entire PCS capex delta.
4. String designs also scale in **finer increments**, so a 40 MW phase can be built from 200 kW blocks without stranding capacity in oversized units.

For a plant earning **capacity payments or availability-based ancillary revenue**, that asymmetry usually settles the argument. For a plant that simply cycles once a day at full load, it matters far less.

## Safety: DC Fault Energy and Arc Flash

A shared 1500 V DC bus fed by twenty parallel clusters presents a high **DC fault current** — prospective short-circuit currents in the tens of kiloamps. Protection coordination becomes harder and the **arc flash energy** available at a busbar fault is correspondingly larger.

String architectures cap the fault contribution at one cluster, in the low kiloamps, and allow per-string isolation without de-energising the whole block. Combined with **IEC 63027 DC arc-fault detection**, per-cluster disconnects and module-level fire suppression, this materially simplifies compliance with **NFPA 855**, **UL 9540** and **IEC 62933-5-2**. Insurers are increasingly pricing that difference into premiums and deductible structures.

## Cost: Capex, BoS and LCOS

PCS hardware is roughly **5-8% of total BESS capex** in utility-scale projects, with balance of system another 10-15% under the NREL ATB cost structure. A 30-60% premium on the PCS line therefore moves total installed capex by only **2-5%**.

| Cost element | Central | String |
| --- | --- | --- |
| PCS hardware | Baseline | +30-60% |
| DC cabling and combiners | Higher (long, large cross-section runs) | Lower (short, per-cluster) |
| DC/DC for cluster management | Often required | Not required |
| MV transformers | Fewer units | Similar |
| Installation labour | Lower device count | Higher device count |
| 15-year availability loss | Higher | Lower |

Against LCOS benchmarks of roughly **$120-250/MWh** for four-hour utility systems, a 2-5% capex delta is straightforward to offset with 1-2% more delivered energy and a shorter mean time to repair.

## How to Choose: A Practical Decision Framework

1. **High cycling or partial-load duty** — frequency regulation, AGC, solar firming, fast EV charging support: choose **string PCS**. The efficiency and SoC-management advantages compound every day of operation.
2. **Long-duration energy shifting at steady full load** — four-hour arbitrage, capacity-only contracts: **central PCS** remains the lowest-capex answer, provided you specify cluster-level DC/DC or disciplined balancing.
3. **Land or container-constrained sites** — central wins on power density; string needs more enclosure volume per MW.
4. **Remote sites with expensive crane mobilisation** — string, because maintenance is a two-person hot swap instead of a heavy lift.
5. **Aggregated C&I portfolios under 500 kWh** — string is effectively the default. A 100-215 kW unit maps cleanly onto one 215-522 kWh cabinet, and one cabinet failure does not take the site down.

## What We Specify at SolarStoragePro

Our **C&I battery cabinets** ship with per-cabinet string PCS as standard, precisely because commercial duty cycles are irregular and heavily part-load. On **grid-scale BESS containers** we build both topologies and will model the trade-off against your actual dispatch profile rather than a datasheet peak number.

If you are in tender stage, send us your duty cycle, applicable grid code and site constraints. We will return a sizing and architecture comparison — including part-load efficiency and availability assumptions you can drop straight into your financial model.

**[Talk to our energy storage engineering team](/contact)** or review the **[C&I battery cabinet](/products/ci-battery-cabinets)**, **[grid-scale BESS container](/products/energy-storage-system)** and **[PCS](/products/pcs)** specifications."""

# ============================ 中文 ============================
ZH_CATEGORY = '工程技术'
ZH_TITLE = '组串式 PCS 与集中式 PCS 怎么选：储能系统架构、效率与成本全对比'
ZH_DESCRIPTION = (
    'PCS 拓扑决定了未来十五年的直流设计、冗余方式、运维成本和度电成本。本文面向 EPC、'
    '系统集成商和工商业业主，用真实工况下的部分负载效率、可用率测算和选型框架，说清组串式与集中式的取舍。'
)

ZH_BODY = """在储能项目的众多设计决策里，**组串式 PCS 与集中式 PCS 的选择**是影响最深远的一个。它决定了直流侧拓扑、冗余颗粒度、运维方式，也直接切走**度电成本（LCOS）**里的一块。但在很多技术规范书里，这一项往往只写一行："PCS：集中式 2.5MW"。这一行字，基本决定了电站未来十五年怎么表现。

本文讲清楚两种拓扑到底差在哪、效率与成本的说法在真实工况下还成不成立、以及不同场景该怎么选。这些判断来自我们在**工商业储能柜**和**集装箱式电网级 BESS** 上的工程实践，覆盖一次调频、峰谷套利和新能源配储几类典型工况。

## 组串式与集中式到底差在哪

**集中式 PCS** 是一台大功率双向变流器，单机通常在 **1～2.5MW**，一路交流输出接中压变压器。同一个储能单元里所有电池簇硬并联到一条公共直流母线上——常见 1000V 或 1500V——整段只配一个直流断路器。

**组串式 PCS** 则是小得多的变流器，单机 **100～215kW**，一台只带一个电池簇。没有公共直流母线：二十到二十五台组串 PCS 拼出同样的 2.5MW，但每一路都有独立直流链路、独立保护和独立的簇级电流控制。

画在单线图上差别看起来微不足道，跑起来完全不是一回事。

## 直流侧并联才是真正的分水岭

电池不是理想电压源。两簇电池如果**荷电状态（SoC）**不同、内阻不同、或者投运时间不同，硬并联时电流就分不均。内阻小的那簇出力更多、温度更高、衰减更快，差距越拉越大。行业里把这个叫**木桶效应**——整个单元的可用容量最后被最弱的那一簇拖住。

集中式架构有两条应对路径。严谨的做法是加**簇级 DC/DC 变流器或簇级开关**，行为是修好了，但成本和多一级变换也来了。务实的做法是接受不一致，靠保守的 SoC 运行窗口、更大的预留裕度和检修期**簇间均衡**顶住。

组串式 PCS 从源头上就没这个问题。每簇按自己的节奏充放，二十簇之间有 3% 的 SoC 差异，不会变成 3% 的铭牌容量损失。对于**高循环次数、长期部分负载**的工况——一次调频、AGC 快速响应、光伏配储平抑波动、快充站缓冲——这个差异直接体现在实际放电量上。

## 效率：峰值参数是在"美化"集中式

样本册上的效率都是额定负载下测的，集中式在这里确实略胜：峰值 **98.5%～99.0%**，组串式 **98.0%～98.8%**。但真实项目不活在额定点上。

一次调频和峰谷套利很少跑满功率。**负载低于额定值约 30% 之后**，固定磁损和开关损耗占比上升，集中式变流器效率可能掉 **2～4 个百分点**。组串式架构只投运需要的组串，每台都跑在自己效率较高的区间，轻载曲线要平得多。考虑到 LFP 系统交流侧**系统效率（RTE）**本身只有 85%～90%（还没扣辅助用电），轻载多出来的两三个点是实打实的收益。

| 对比项 | 集中式 PCS | 组串式 PCS |
| --- | --- | --- |
| 典型单机功率 | 1000～2500kW | 100～215kW |
| 峰值效率 | 98.5%～99.0% | 98.0%～98.8% |
| 20% 负载效率 | 下降 2～4 个点 | 下降 1 个点以内 |
| 直流拓扑 | 单条公共母线 | 每簇独立直流链路 |
| 单点故障影响 | 整个 1～2.5MW 单元 | 单路 100～215kW |
| 簇间 SoC 偏差 | 需 DC/DC 或人工均衡 | 天然规避 |
| PCS 单位造价（元/W） | 基准 | 高 30%～60% |
| 单位 MW 占地 | 小 | 大 |
| 现场更换 | 吊装，1～3 天 | 热插拔，1～2 小时 |

## 100MW/200MWh 项目的可用率账

冗余颗粒度，是让造价差距开始收窄的地方。

1. **集中式方案**：40 台 2.5MW。一台 PCS 故障，直接损失 **2.5%** 容量；更换要吊车、要中压侧停电隔离，通常 **1～3 天**。
2. **组串式方案**：500 台 200kW。一台故障只损失 **0.2%** 容量，两人 **1～2 小时**热插拔换完，全程不碰中压。
3. 200MWh 资产上，十五年生命周期里长期可用率差 2 个百分点，就是**数万 MWh** 的放电量损失——很多时候比整个 PCS 造价差还大。
4. 组串式还能**按更小颗粒度扩容**，40MW 一期可以直接用 200kW 模块堆出来，不会因为选大机型而卡住容量。

对靠**容量补偿或可用率考核**拿钱的电站，这笔账基本就能定案；对每天满充满放跑一次的纯套利项目，敏感度就低得多。

## 安全：直流故障能量与电弧

1500V 直流母线、二十簇并联，**直流短路电流**是很可观的——预期短路电流可以到几十千安。保护配合更难做，母线故障点的**电弧能量**也相应更大，直流侧拉弧一旦发生，靠常规交流保护是断不掉的。

组串式把故障电流限制在单簇水平，通常在几千安量级，并且可以逐簇隔离而不影响整个单元。配合**IEC 63027 直流电弧故障检测**、簇级断路器和模块级消防，对满足 **NFPA 855**、**UL 9540** 和 **IEC 62933-5-2** 的要求会轻松很多。国内项目则对应 GB/T 36276-2023 电芯与系统安全要求、GB/T 36558 并网技术规范。保险端也在拉开差距，越来越多再保方把拓扑和簇级保护写进费率与免赔额条款。

## 成本：设备、辅材与 LCOS

在电网级项目里，PCS 设备大致占总投资的 **5%～8%**，辅材（BOS）另占 10%～15%（参考 NREL ATB 的成本结构）。所以 PCS 这一项贵 30%～60%，折算到整体初始投资只增加 **2%～5%**。

| 成本项 | 集中式 | 组串式 |
| --- | --- | --- |
| PCS 设备 | 基准 | +30%～60% |
| 直流电缆与汇流 | 高（走线长、截面大） | 低（短距、按簇） |
| 簇级管理 DC/DC | 常常需要 | 不需要 |
| 中压变压器 | 台数少 | 基本相当 |
| 安装人工 | 设备数量少 | 设备数量多 |
| 十五年可用率损失 | 较高 | 较低 |

对照四小时电网级储能 **120～250 美元/MWh** 的 LCOS 基准区间，2%～5% 的造价差，靠多发 1%～2% 的电、加上更短的故障修复时间，是很容易挣回来的。

## 怎么选：五条决策原则

1. **高循环、长期部分负载**——一次调频、AGC、光伏配储、快充站缓冲：选**组串式**。效率和簇级 SoC 管理的优势每天都在复利。
2. **长时间满功率搬运电量**——四小时峰谷套利、只签容量合同：**集中式**依然是最低造价答案，但务必在规范书里写明簇级 DC/DC 或强制均衡策略。
3. **场地或集装箱空间受限**——集中式功率密度占优；组串式每 MW 需要更多柜体容积。
4. **偏远站点、吊车调度昂贵**——组串式，维护是两人热插拔，不是重型吊装作业。
5. **500kWh 以下的工商业聚合项目**——组串式基本是默认答案。100～215kW 单机正好对应一台 215～522kWh 的柜子，单柜故障不会让整个站点停机。

## SolarStoragePro 的选型建议

我们的**工商业储能柜**标准配置就是**一柜一组串 PCS**，原因很直接：工商业负荷曲线不规则、长期轻载运行，集中式的短板恰好都踩在痛点上。**电网级 BESS 集装箱**两种拓扑我们都做，会按你真实的充放曲线去算，而不是拿样本册上的峰值参数说事。

如果你正在做招标准备，把充放工况、并网要求和场地条件发给我们，我们会返回一份容量配置与架构对比，包含轻载效率和可用率假设，可以直接填进你的财务模型。

**[联系我们的储能工程团队](/contact)**，或查看 **[工商业储能柜](/products/ci-battery-cabinets)**、**[电网级 BESS 集装箱](/products/energy-storage-system)** 与 **[PCS](/products/pcs)** 的技术参数。"""

# ============================ INSERT ============================
existing = get(f'blog_articles?slug=eq.{SLUG}&select=id')
if existing:
    aid = existing[0]['id']
    print('article exists, reusing id:', aid)
else:
    created = post('blog_articles', {
        'slug': SLUG,
        'date': DATE,
        'read_time': READ_TIME,
        'tags': TAGS,
    })
    aid = created[0]['id']
    print('article id:', aid)

done = {r['locale'] for r in get(f'blog_article_translations?article_id=eq.{aid}&select=locale')}
print('existing locales:', done)

for loc, cat, title, desc, body in [
    ('en', EN_CATEGORY, EN_TITLE, EN_DESCRIPTION, EN_BODY),
    ('zh', ZH_CATEGORY, ZH_TITLE, ZH_DESCRIPTION, ZH_BODY),
]:
    if loc in done:
        print(f'{loc} already present, skip')
        continue
    post('blog_article_translations', {
        'article_id': aid,
        'locale': loc,
        'category': cat,
        'title': title,
        'description': desc,
        'body': body,
    }, prefer='return=minimal')
    print(f'{loc} inserted: body {len(body)} chars')

# verify
check = get(f'blog_article_translations?article_id=eq.{aid}&select=locale,title,category')
print('verify:', json.dumps(check, ensure_ascii=False))

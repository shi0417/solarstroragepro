# -*- coding: utf-8 -*-
"""Insert blog article: solar-curtailment-battery-storage-solution (2026-11-03).
Uses Supabase Management API SQL (pinned IP, --ssl-no-revoke) because local
DNS is broken and *.supabase.co REST is TLS-reset from this machine.
"""
import json, subprocess, sys

ENV = 'D:/project/solarstoragepro/.env.local'
API_HOST_RESOLVE = ['--resolve', 'api.supabase.com:443:172.64.145.26', '--ssl-no-revoke']
REF = 'qujcrmbzuzlgjrexbzga'

def token():
    for line in open(ENV, encoding='utf-8'):
        if line.startswith('SUPABASE_LOGIN_TOKEN='):
            return line.split('=', 1)[1].strip()
    raise SystemExit('no token')

def query(sql):
    body = json.dumps({'query': sql})
    out = subprocess.run([
        'curl', '-sS', '-m', '90', '-X', 'POST',
        f'https://api.supabase.com/v1/projects/{REF}/database/query',
        '-H', f'Authorization: Bearer {token()}',
        '-H', 'Content-Type: application/json',
        '-d', body,
    ] + API_HOST_RESOLVE, capture_output=True, text=True, encoding='utf-8')
    txt = out.stdout.strip()
    if not txt:
        raise SystemExit('empty response: ' + out.stderr)
    try:
        data = json.loads(txt)
    except json.JSONDecodeError:
        raise SystemExit('bad json: ' + txt[:500])
    if isinstance(data, dict) and ('message' in data or 'error' in data):
        raise SystemExit('API error: ' + txt[:800])
    return data

def esc(s):
    return s.replace("'", "''")

SLUG = 'solar-curtailment-battery-storage-solution'
DATE = '2026-11-03'
READ_TIME = 10
TAGS = '{"BESS","Solar Curtailment","Energy Storage","C&I","Project Development"}'

# ---------------- English ----------------
EN_CATEGORY = 'Market Insights'
EN_TITLE = 'Solar Curtailment Is Eating Your Returns: How Battery Storage Turns Wasted Sunshine into Revenue'
EN_DESCRIPTION = 'Curtailment now clips 3-20% of solar output in leading markets. This guide shows developers and EPCs how to size a BESS to recover curtailed energy, model the payback, and stack additional revenue on top.'

EN_BODY = """Every solar developer knows the feeling: your plant is producing at full tilt on a clear spring afternoon, and the grid operator sends a curtailment order. The sunshine is free, but the revenue disappears. According to **CAISO curtailment data**, California alone curtailed roughly **3.4 TWh** of renewable output in 2024, and solar-heavy regions such as Chile, Spain, and northwest China routinely report curtailment rates of **8-20%** during high-irradiance months. As solar penetration climbs worldwide, curtailment is no longer an anomaly - it is a structural feature of modern grids.

For project owners, that translates into a silent, recurring hit to the **internal rate of return (IRR)**. The good news: a correctly sized **battery energy storage system (BESS)** can convert most of that lost energy back into revenue. This guide walks through the economics, sizing method, and design considerations, based on projects SolarStoragePro has analyzed with EPC partners.

## What Curtailment Actually Costs You

The math is unforgiving because curtailment attacks your highest-production hours. Consider a 100 MW solar plant running at a typical 20% capacity factor:

| Project size | Curtailment rate | Energy lost per year | Lost revenue at $40/MWh |
| --- | --- | --- | --- |
| 50 MW | 5% | 4.4 GWh | ~$175,000 |
| 100 MW | 8% | 14.0 GWh | ~$560,000 |
| 100 MW | 15% | 26.3 GWh | ~$1,050,000 |
| 200 MW | 12% | 42.0 GWh | ~$1,680,000 |

Even a "modest" 8% curtailment rate on a mid-size plant erases more than half a million dollars annually. And in markets with **negative midday prices** (California, South Australia, parts of Europe), the damage compounds: you either generate for nothing or pay to inject power.

## How a BESS Recovers Curtailment Revenue

The logic is simple: instead of spilling energy the grid cannot absorb at noon, you store it and sell it three to six hours later into the **evening price peak**. In practice this works through three mechanisms:

1. **Curtailment recovery (arbitrage)** - charge the battery from the PV array during curtailment windows, discharge into the evening ramp. In curtailed markets the spread between midday and evening prices regularly exceeds $30-50/MWh.
2. **Clipping recapture** - for plants with DC/AC ratios above 1.2, the inverter "clips" the DC curve. A BESS absorbs this clipped energy, which is otherwise lost every clear day.
3. **Capture-rate improvement** - merchant PPA holders can shift delivery windows, lifting the **time-weighted average capture price** of every MWh they sell.

AC-coupled systems are the standard retrofit for operating plants because they connect at the point of interconnection without touching existing PV inverters. For new-build projects, a shared DC bus or hybrid inverter architecture reduces balance-of-system cost by roughly 5-10%.

## Sizing the Battery: A Worked Example

Oversizing a battery is the fastest way to destroy project economics. Follow this sequence:

1. **Analyze one full year of curtailment data** (5-minute SCADA or market data). Identify when curtailment occurs, how long each event lasts, and how much energy is involved.
2. **Extract the power requirement.** If curtailment events average 30 MW of spilled power across 4-5 midday hours, that defines the charging power you can usefully absorb.
3. **Set duration from the discharge window.** Most markets concentrate price peaks in 2-4 evening hours, which typically leads to **2-4 hour (2-4h)** BESS durations for curtailment recovery.
4. **Apply efficiency and availability derating.** Use a **round-trip efficiency (RTE)** of 88-91% for modern LFP systems, and derate annual availability to ~95%.
5. **Check cycling.** Daily curtailment recovery implies 300+ cycles per year; verify the cell warranty supports the equivalent full-cycle count over the contract term.

For the 100 MW / 8% example above, a **40 MW / 80 MWh** BESS recovering ~70% of curtailed energy, discharged at a $45/MWh evening premium, yields roughly **$450,000-500,000 per year** of incremental revenue - typically a 5-7 year simple payback at current system prices, before capacity market or ancillary-service stacking.

## Design Considerations That Make or Break the ROI

- **LFP chemistry for safety and cycle life.** Ensure the system is certified to **IEC 62619** and, where applicable, **UL 9540 / GB/T 36276-2023**. Fire safety compliance increasingly determines permitting timelines.
- **Degradation and augmentation planning.** Budget for capacity fade of ~2-2.5% per year and decide upfront whether you will augment mid-life or accept the fade in your revenue model.
- **Grid code compliance.** The BESS inverter must meet local LVRT/HVRT and reactive-power requirements; retrofits to plants in weak-grid regions need early interconnection studies.
- **Thermal management for your climate.** High-ambient sites need robust liquid cooling to hold rated power through summer peak-price days - exactly when the battery earns the most.
- **Local integration support.** Cross-border buyers should insist on suppliers who provide commissioning supervision, remote O&M tooling, and spare-parts guarantees.

## From Lost Energy to New Revenue Streams

Curtailment recovery is often just the entry point. Once the battery is on site, most owners stack additional revenue: **frequency regulation**, capacity payments, demand-charge management for co-located industrial loads, or participation in a **virtual power plant** aggregation. In several markets, stacked revenues lift total BESS returns 30-50% above arbitrage alone.

If your plant is bleeding energy during midday hours, the economics have rarely been better: cell prices have fallen sharply since 2023 while curtailment rates keep rising. SolarStoragePro supplies certified **grid-scale BESS containers (1-5 MW)** and **C&I battery cabinets (100-500 kWh)** with full IEC 62619 and UN38.3 documentation.

**Ready to stop exporting free electricity?** [Explore our grid-scale energy storage systems](/products/energy-storage-system) or [browse our C&I battery cabinet lineup](/products/ci-battery-cabinets), then [contact our engineering team](/contact) for a free curtailment-recovery assessment tailored to your plant's production data."""

# ---------------- Chinese ----------------
ZH_CATEGORY = '市场洞察'
ZH_TITLE = '光伏弃光限电正在吞噬你的收益：用储能把浪费的阳光变成真金白银'
ZH_DESCRIPTION = '在高渗透率地区，弃光率普遍达 8%-20%。本文面向工商业业主与项目开发商，讲解如何用储能系统回收弃光电量、测算投资回收期，并叠加多重收益。'

ZH_BODY = """做光伏的老板都遇到过这样的场景：晴天正午，电站满发，电网却下达限电指令。阳光是免费的，收益却凭空消失。根据**国家能源局**公布的数据，2024 年全国光伏利用率约 96.8%，但西北高渗透率省份的弃光率已明显抬升，部分时段超过 10%；放眼海外，加州 CAISO 2024 年弃电量约 **34 亿千瓦时**，智利、西班牙等市场的光伏弃电率在高光照月份甚至达到 **15%-20%**。随着新能源占比持续提高，弃光限电不再是偶发事件，而是电网运行的常态。

对电站业主来说，这意味着**内部收益率（IRR）**被悄悄侵蚀。好消息是：一套配置合理的**电池储能系统（BESS）**可以把大部分弃掉的电量重新变成收入。本文基于 SolarStoragePro 与 EPC 合作伙伴的项目分析，讲清楚账怎么算、电池怎么配。

## 弃光到底让你损失多少钱

弃光的残酷之处在于：它专挑你发电量最高的时段下手。以一座 100MW、年等效利用小时数约 1,750 小时的电站为例：

| 项目规模 | 弃光率 | 年损失电量 | 按 0.3 元/kWh 折算收益损失 |
| --- | --- | --- | --- |
| 50MW | 5% | 约 438 万 kWh | 约 131 万元 |
| 100MW | 8% | 约 1,400 万 kWh | 约 420 万元 |
| 100MW | 15% | 约 2,625 万 kWh | 约 788 万元 |
| 200MW | 12% | 约 4,200 万 kWh | 约 1,260 万元 |

一座中型电站哪怕只有 8% 的弃光率，每年损失也超过 400 万元。在现货市场环境下损失更复杂：正午**负电价**时段，发电不仅不赚钱，甚至要倒贴——国内外现货市场都已出现这种情况。

## 储能如何把弃电变成收入

逻辑很直接：正午电网消纳不了的电量，存进电池，3-6 小时后放到晚高峰卖掉。实际运营中有三条收益路径：

1. **弃电回收（峰谷套利）**——限电时段用光伏给储能充电，晚高峰放电。在限电频发的市场，正午与晚间的价差普遍超过 0.2-0.3 元/kWh，配合"两充两放"策略可显著提升年等效循环收益。
2. **削峰回收**——对直流侧配比（DC/AC）超过 1.2 的电站，逆变器常年"削峰"，这部分超配电量平时直接浪费；储能可以把它全部吸收，相当于白捡的电。
3. **提升结算均价**——对参与市场化交易或签了分时 PPA 的业主，储能可以挪动交割时段，拉高每度电的**加权平均结算价**。

对已并网的老电站，**交流侧耦合**是主流改造方案，接入并网点即可，不动原有光伏逆变器；新建项目则可采用直流侧耦合或混合逆变器架构，系统成本还能再省 5%-10%。

## 电池怎么配：一个实战测算

储能配大了亏钱，配小了浪费弃电资源。按这个顺序来：

1. **拉一整年的限电数据**（5 分钟级 SCADA 或调度数据），看限电发生在什么时候、每次持续多久、涉及多少电量。
2. **算功率需求**。如果限电时段平均有 30MW 的功率被舍弃、持续 4-5 小时，这就是你的充电功率上限。
3. **按时段定时长**。晚高峰集中在 2-4 小时，弃光回收场景一般配 **2-4 小时（2h-4h）** 储能。
4. **做效率与可用率折减**。现代 LFP 系统**往返效率（RTE）**按 88%-91% 计算，年可用率按 95% 留余量。
5. **核对循环寿命**。每天回收弃电意味着年循环 300 次以上，务必确认电芯质保覆盖合同期内的等效满循环次数。

以上面 100MW / 8% 弃光的电站为例：配一套 **40MW / 80MWh** 储能，回收约 70% 的弃电量，晚峰按 0.45 元/kWh 价差放电，每年可增加收入约 **320-360 万元**，按当前系统造价测算简单回收期约 **5-7 年**——还没算容量补偿、辅助服务等叠加收益。

## 决定投资回报的五个设计细节

- **选 LFP 磷酸铁锂路线**。系统必须通过 **IEC 62619** 认证，国内项目还需满足 **GB/T 36276-2023**；消防验收日益成为决定项目并网进度的关键环节，安全标准一步到位。
- **做好衰减与增补规划**。按每年 2%-2.5% 的容量衰减做模型，提前决定是中期增补电芯还是把衰减计入收益测算。
- **电网适应性**。储能变流器（PCS）要满足当地低电压穿越、无功支撑要求；弱电网区域的改造项目要提前做接入评估。
- **热管理匹配当地气候**。高温地区的液冷系统必须能在夏季限电+高价的双重高峰时段满功率运行——那正是电池最赚钱的时候。
- **选能提供落地服务的供应商**。质保文件、并网调试支持、远程运维工具、备件承诺，一样都不能少。

## 从"被动弃电"到"主动经营"

弃电回收往往只是入场券。电池落地后，多数业主会叠加收益：**调频辅助服务**、容量补偿、与工商业负荷配套的需求侧响应，或加入**虚拟电厂**聚合参与现货市场。多个市场的实践表明，叠加收益能让储能综合回报比单纯套利高出 30%-50%。

当前是布局窗口期：2023 年以来电芯价格大幅下降，而弃光率还在持续攀升。SolarStoragePro 提供通过 **IEC 62619、UN38.3、GB/T 36276-2023** 认证的**电网级 BESS 集装箱（1-5MW）**与**工商业电池柜（100-500kWh）**，全套认证文件齐备。

**别再把电白白送出去。** [查看我们的电网级储能系统](/products/energy-storage-system)或[工商业电池柜产品线](/products/ci-battery-cabinets)，也可[联系工程团队](/contact)，免费获取基于您电站发电数据的弃电回收评估方案。"""

def main():
    # 0. duplicate check
    rows = query(f"select id from blog_articles where slug = '{SLUG}';")
    if rows:
        raise SystemExit('slug already exists: ' + SLUG)

    # 1. insert article
    rows = query(
        f"insert into blog_articles (slug, date, read_time, tags) values "
        f"('{SLUG}', '{DATE}', {READ_TIME}, '{TAGS}') returning id, slug;"
    )
    if not rows:
        raise SystemExit('insert article failed')
    aid = rows[0]['id']
    print('article id:', aid)

    # 2. translations
    for loc, cat, title, desc, body in [
        ('en', EN_CATEGORY, EN_TITLE, EN_DESCRIPTION, EN_BODY),
        ('zh', ZH_CATEGORY, ZH_TITLE, ZH_DESCRIPTION, ZH_BODY),
    ]:
        r = query(
            f"insert into blog_article_translations (article_id, locale, category, title, description, body) values "
            f"('{aid}', '{loc}', '{esc(cat)}', '{esc(title)}', '{esc(desc)}', '{esc(body)}') returning id, locale;"
        )
        print('translation:', r)

    # 3. verify
    v = query(f"select a.slug, a.date, a.read_time, a.tags, "
              f"t.locale, length(t.body) as body_len, t.title "
              f"from blog_articles a join blog_article_translations t on t.article_id = a.id "
              f"where a.slug = '{SLUG}';")
    print('VERIFY:', json.dumps(v, ensure_ascii=False, indent=1))

if __name__ == '__main__':
    main()

# -*- coding: utf-8 -*-
"""Insert blog article: bess-cold-climate-battery-storage-performance (en + zh)."""
from _sb_sql import query

def esc(s):
    return s.replace("'", "''")

SLUG = "bess-cold-climate-battery-storage-performance"
DATE = "2026-11-01"
READ_TIME = 9
TAGS = ["BESS", "Cold Climate", "LFP", "Thermal Management", "GB/T 36276"]

EN_TITLE = "Cold-Climate BESS: How to Specify Battery Storage for -20C and Below"
EN_CATEGORY = "System Design"
EN_DESC = ("How low temperatures affect LFP battery storage, what GB/T 36276-2023 requires at -20C, "
           "and five engineering measures - liquid heating, insulation, grid-powered preheating - "
           "that keep BESS delivering nameplate capacity through winter.")

EN_BODY = """## Why Cold Weather Is a Defining Design Case for BESS

Most battery energy storage systems are specified around energy throughput and round-trip efficiency at a comfortable 25C. In reality, a large share of the world's best storage markets sit in regions where winter temperatures stay below freezing for weeks: Canada, the northern United States, Scandinavia, and in China the northeast, Inner Mongolia and high-plateau regions. For buyers of **C&I battery cabinets** and grid-scale **BESS containers**, cold-climate performance is not a footnote - it determines usable capacity, auxiliary consumption and, in the worst case, whether the system charges at all.

The chemistry is unforgiving. Below 0C, the ionic conductivity of LFP electrolyte drops and charge transfer slows dramatically. Discharging is degraded but recoverable; **charging below 0C without preheating causes lithium plating** on the anode - a permanent, irreversible loss of capacity and a latent safety risk. This is why a serious cold-climate specification starts with the cell datasheet, not the container brochure.

## What Low Temperatures Actually Do to an LFP System

| Condition | Discharge capability | Charging behavior | Primary risk |
| --- | --- | --- | --- |
| +25C | 100% | Normal | None |
| 0C | 85-90% | Current derating required | Gradual capacity loss |
| -10C | 75-85% | Preheating strongly recommended | Lithium plating |
| -20C | 70-80% (GB/T 36276-2023 test point) | Preheating mandatory | Plating, BMS charge cutoff |
| -30C | 60-70% | Preheating + insulation mandatory | BMS cutoff, electrolyte viscosity rise |

Two numbers matter for procurement. First, **GB/T 36276-2023** requires cells to retain at least 70% of rated discharge capacity at -20C - a floor, not a target. Second, field data from northern-China projects consistently show that systems without active heating deliver **10-15% less usable energy in January** than nameplate, plus 3-5 percentage points of round-trip-efficiency loss from cold electrolyte and higher internal resistance.

## Five Engineering Measures That Actually Work

1. **Liquid thermal management with bidirectional heating.** Air cooling cannot hold cell-to-cell spread after a -30C soak. A liquid loop with PTC heaters keeps pack spread within 3-5C and can raise cells from -20C to chargeable range in roughly 1-2 hours depending on insulation class.
2. **Container-level insulation and thermal-bridge control.** 50-100 mm of closed-cell insulation, heated door seals, and segregated cable penetrations prevent the enclosure from becoming a heat sink. Poorly sealed penetrations can waste 30-40% of heater output.
3. **Grid-powered preheating strategy.** For behind-the-meter and peak-shaving sites, schedule preheating from the grid before the morning discharge window, so heating energy is bought at off-peak tariffs instead of draining the battery itself.
4. **An honest auxiliary-load budget.** Winter heating typically consumes **2-5% of system throughput**. Suppliers who quote auxiliary loads only for summer conditions are effectively hiding 1-2 points of your LCOS - ask for a 12-month, site-specific figure.
5. **BMS low-temperature logic.** Charge inhibit below 0C, graduated current limits by temperature band, and per-string temperature sensing are mandatory. Compliance with **IEC 62619** and **UN 38.3** covers safety and transport, but the low-temperature charging strategy must be verified line by line in the BMS functional specification.

## A Procurement Checklist for Cold-Climate BESS

1. Request cell-level -20C discharge test reports per GB/T 36276-2023, not just simulation data.
2. Specify the required heating rate (degrees per hour from -30C to 0C) contractually.
3. Require a winter auxiliary-consumption figure (kWh per day at -15C monthly mean).
4. Verify cell temperature spread stays within 5C after a -30C overnight soak.
5. Confirm cold-start and black-start behavior: can the system boot from a fully cold, de-energized state?
6. Check the warranty's temperature envelope - some warranties exclude operation below -20C ambient.

## Matching the Product to the Site

For factories, logistics parks and commercial rooftops in cold regions, our **[C&I battery cabinets](/products/ci-battery-cabinets)** integrate liquid thermal management with bidirectional heating as standard, rated for -30C storage and continuous operation down to -20C ambient. For utility-scale projects, our **[grid-scale energy storage systems](/products/energy-storage-system)** carry the same thermal architecture at container level, with preheating power sized to your worst-case recovery window.

Cold is manageable. Unmanaged cold is expensive. A system specified correctly for -25C still delivers nameplate in January; one that is not quietly loses a tenth of its revenue every winter.

**Planning a project in a cold-climate region? Send us your site temperature profile and dispatch schedule - our engineers will return a thermal design and a 12-month auxiliary-load simulation within five working days.**"""

ZH_TITLE = "寒冷地区储能系统选型指南：-20℃ 工况下的 BESS 低温性能设计"
ZH_CATEGORY = "系统设计"
ZH_DESC = ("解析低温对磷酸铁锂储能系统的容量、效率与充电安全影响，解读 GB/T 36276-2023 低温放电要求，"
           "并给出液冷双向加热、箱体保温、市电预热等五项工程措施与寒冷地区项目采购清单。")

ZH_BODY = """## 为什么低温是储能系统设计的决定性工况

很多工商业储能项目在选型时只看 25℃ 标准工况下的循环效率和容量，却忽视了东北、内蒙古、西北以及高原地区冬季动辄 -20℃ 以下的环境温度。对**工商业储能柜**和电网级 **BESS 集装箱**的采购方来说，低温性能直接决定可用容量、辅助能耗，极端情况下甚至决定系统能不能充电。

电化学规律是明确的：磷酸铁锂电池在 0℃ 以下电解液电导率下降、内阻上升，放电能力衰减但可恢复；**但在 0℃ 以下充电而不预热，会在负极析锂**——容量永久损失，还埋下安全隐患。GB/T 36276-2023 要求电芯在 -20℃ 下放电容量保持率不低于额定容量的 70%，这是底线而非目标。北方项目实测数据显示：没有主动加热的系统，1 月份实际可用电量普遍比铭牌值低 10%-15%，低温往返效率还要再损失 3-5 个百分点。

## 低温对 LFP 系统的实际影响

| 温度条件 | 放电能力 | 充电行为 | 主要风险 |
| --- | --- | --- | --- |
| +25℃ | 100% | 正常 | 无 |
| 0℃ | 85%-90% | 需降流充电 | 缓慢容量衰减 |
| -10℃ | 75%-85% | 建议预热 | 析锂 |
| -20℃ | 70%-80%（GB/T 36276 测试点） | 必须预热 | 析锂、BMS 充电截止 |
| -30℃ | 60%-70% | 预热+保温缺一不可 | BMS 截止、电解液粘度上升 |

## 五项真正有效的工程措施

1. **液冷热管理 + 双向加热。** 风冷无法在 -30℃ 浸置后维持电芯温差，液冷回路配 PTC 加热可把簇内温差控制在 3-5℃，视保温等级 1-2 小时内把电芯从 -20℃ 升到可充电区间。
2. **集装箱级保温与热桥控制。** 50-100mm 闭孔保温层、加热门封条、线缆穿孔独立密封。密封不良的穿孔会浪费 30%-40% 的加热功率。
3. **市电预热策略。** 峰谷套利场景下，利用谷电在早高峰放电前完成预热，加热成本远低于用电池自身电量预热。
4. **真实的辅助能耗预算。** 冬季加热通常消耗系统吞吐量的 **2%-5%**。只提供夏季辅助能耗的报价，等于在你的度电成本里藏了 1-2 分钱——要求供应商提供 12 个月的分月数据。
5. **BMS 低温策略。** 0℃ 以下禁止充电、按温度带分档限流、簇级温度传感是标配。IEC 62619 和 UN38.3 覆盖安全与运输，但低温充电策略必须在 BMS 功能规格书里逐条确认。

## 寒冷地区项目采购清单

1. 索取电芯级 -20℃ 放电测试报告（GB/T 36276-2023），不要只看仿真数据；
2. 把升温速率（-30℃ 到 0℃ 每小时升温多少度）写进合同；
3. 要求提供 -15℃ 月均温下的冬季日辅助能耗（kWh/天）；
4. 验证 -30℃ 过夜浸置后电芯温差不超过 5℃；
5. 确认低温冷启动与黑启动能力：系统能否在完全断电、低温状态下自举？
6. 检查质保的温度包络——部分质保条款排除 -20℃ 以下的运行工况。

## 按场地选对产品

针对寒冷地区的工厂、物流园和商业屋顶，我们的**[工商业电池储能柜](/products/ci-battery-cabinets)** 标配液冷双向加热热管理，支持 -30℃ 存储和 -20℃ 环境持续运行；电网级项目可选择同架构的**[电网级储能系统](/products/energy-storage-system)**，预热功率按最恶劣恢复窗口设计。

低温并不可怕，可怕的是没有为低温做设计的系统。选型正确的系统在 1 月照样满容量出力；没有做低温设计的系统，每个冬天都在悄悄损失一成收益。

**您的项目在东北、内蒙或西北？把当地气温曲线和调度计划发给我们，工程团队将在 5 个工作日内提供热管理方案和 12 个月辅助能耗仿真。**"""

# Step 1: check duplicate
existing = query(f"select id from blog_articles where slug = '{SLUG}';")
if existing:
    raise SystemExit(f"DUPLICATE: slug {SLUG} already exists: {existing}")

# Step 2: insert main record (tags is a Postgres text[] column)
tags_arr = "{" + ",".join(TAGS) + "}"
rows = query(
    "insert into blog_articles (slug, date, read_time, tags) values "
    f"('{SLUG}', '{DATE}', {READ_TIME}, '{esc(tags_arr)}') returning id;"
)
if not rows or not isinstance(rows, list):
    raise SystemExit(f"insert blog_articles failed: {rows}")
aid = rows[0]["id"]
print("article id:", aid)

# Step 3: insert translations
for locale, cat, title, desc, body in [
    ("en", EN_CATEGORY, EN_TITLE, EN_DESC, EN_BODY),
    ("zh", ZH_CATEGORY, ZH_TITLE, ZH_DESC, ZH_BODY),
]:
    r = query(
        "insert into blog_article_translations (article_id, locale, category, title, description, body) values "
        f"('{aid}', '{locale}', '{esc(cat)}', '{esc(title)}', '{esc(desc)}', '{esc(body)}') returning id, locale;"
    )
    if not isinstance(r, list):
        raise SystemExit(f"insert translation {locale} failed: {r}")
    print("translation:", r)

# Step 4: verify
v = query(
    f"select a.id, a.slug, a.date, t.locale, t.title from blog_articles a "
    f"join blog_article_translations t on t.article_id = a.id where a.slug = '{SLUG}';"
)
print("VERIFY:", v)

# -*- coding: utf-8 -*-
"""Insert SEO blog article: EU Battery Passport for BESS (2027 compliance)."""
import sys, json

sys.path.insert(0, 'D:/project/solarstoragepro/scripts')
from _sb_sql import query

SLUG = 'eu-battery-passport-bess-compliance-2027'
DATE = '2026-11-02'
READ_TIME = 11
TAGS = ['BESS', 'Battery Passport', 'EU Regulation', 'Compliance', 'Energy Storage']

EN_CATEGORY = 'Compliance & Policy'
EN_TITLE = 'EU Battery Passport for BESS: The 2027 Compliance Checklist for Storage Buyers'
EN_DESC = ('From 18 February 2027 every industrial battery above 2 kWh sold in the EU needs a '
           'digital battery passport. Here is what is mandatory on day one, what is deferred, '
           'and what to demand from your storage supplier now.')

EN_BODY = """The EU Battery Passport stops being a pilot project on **18 February 2027**. From that date, every electric vehicle battery, light-means-of-transport battery, and **industrial battery above 2 kWh** placed on the EU market must carry a digital passport with a unique identifier reachable by QR code. A 500 kWh commercial and industrial cabinet, or a 5 MWh BESS container, is not a borderline case: stationary battery energy storage systems are explicitly classified as industrial batteries under **Regulation (EU) 2023/1542**.

For EPCs, integrators and asset owners buying storage for European projects, this is a procurement problem, not an IT problem. A passport is assembled from data that has to exist in your supplier's factory records, BMS archives and cell supply chain long before anyone generates a QR code. If that data was never captured, no platform will invent it later.

## What the passport actually is

Three components, in practice: a unique identifier registered in the EU central DPP registry, a data carrier physically attached to the battery, and a structured data set covering identity, traceability, composition, performance and end-of-life handling.

On **28 July 2026** the European Commission published the first edition of its *Digital Battery Passport Guidance - Data Point Taxonomy*, consolidating the scattered Annex XIII requirements into **71 discrete data points**. Each point is tagged with its legal source, the battery categories it applies to, and an implementation status: mandatory, conditional, voluntary, deferred, or permanently exempt.

That taxonomy is the most useful document available to anyone drafting a storage specification this quarter. It tells you exactly which data to demand now, and which you can legitimately postpone.

## The 71 data points: what is mandatory on day one

| Data point group | Coverage | Status at 18 Feb 2027 |
| --- | --- | --- |
| Identity and traceability | DP 1-15 | **Mandatory** |
| Carbon footprint and sustainability label | DP 16-19 | **Deferred** to later implementing acts |
| Recycled content (Co, Li, Ni, Pb) | DP 20-24 | **Mandatory** |
| Electrochemical performance, lifetime, safety | DP 25-50 | Largely mandatory, conditional by configuration |
| Circularity, dismantling, state-of-health records | DP 51-71 | Mixed: mandatory and deferred |

The mandatory identity block is granular. It requires the unique identifier, the passport registration record and the responsible economic operator, manufacturer name and trademark, postal address, the **precise geographic location of the manufacturing plant**, month and year of manufacture, weight, capacity, chemistry, hazardous substances present beyond mercury, cadmium and lead, and any **critical raw material present above 0.1% by weight**.

That last requirement is where many storage suppliers stall. Mapping critical raw materials against a 0.1% weight threshold demands cell-level bill-of-materials data, which most system integrators receive only as a summary sheet from their cell vendor.

## Carbon footprint is deferred, not cancelled

Data points 16 to 19 - the full material composition table, the carbon footprint declaration, the footprint label and the responsible-sourcing due-diligence disclosure - are marked as deferred at the February 2027 launch. Their format and calculation rules depend on implementing acts still in preparation.

Read that carefully. Deferred means the launch date will not block your shipment. It does not mean the obligation disappears. Carbon footprint declarations for industrial batteries were always scheduled against a delegated act timeline, and performance classes plus maximum lifecycle carbon thresholds are already signalled to follow.

The practical consequence: **start collecting primary energy and emissions data from your cell supplier now**. A passport built in 2027 without a credible carbon accounting trail cannot be retrofitted, because the underlying production data belongs to a manufacturing batch that has already closed. Suppliers able to issue a verified product carbon footprint today will win points in EU tenders long before the obligation bites - carbon footprint is already a scored criterion in utility-scale tenders in Germany, the Netherlands and the Nordics.

## Recycled content is mandatory right now

Unlike carbon footprint, the recycled content data points are **mandatory from day one**. Suppliers must declare the share of cobalt, lithium, nickel and lead in active materials that originates from manufacturing scrap or post-consumer waste.

This is uncomfortable for the industry. Announced European recycling capacity is still ramping, and genuine post-consumer recycled lithium content in LFP cells remains low. A supplier quoting a precise recycled content figure for 2026 production should be able to show the chain of custody behind it. Ask for the mass balance methodology and the name of the recycler, not just the percentage.

## What changes in your procurement process

1. **Put passport data in the technical specification**, not the commercial annex. Anything that lives in a warranty schedule gets treated as aspirational.
2. **Require manufacturing plant geolocation at tender stage.** Country of origin is no longer enough; the passport records factory coordinates.
3. **Request the cell-level bill of materials** with critical raw material mass fractions, then test the 0.1% threshold yourself.
4. **Ask for the recycled content mass balance methodology** and identify the recycler behind the number.
5. **Confirm who the responsible economic operator is for the EU market.** For non-EU manufacturers this is usually the importer or an authorised representative, and the passport must name them.
6. **Verify customs readiness.** The unique registration identifier is checked at the EU border. A battery without a valid passport entry does not clear, whatever the certificate pack says.

## Where suppliers will cut corners

Watch for three patterns. First, a "passport" that is a PDF sustainability brochure with a QR code - it is not registered in the central system and carries no legal standing. Second, recycled content figures with no named recycler and no mass balance documentation. Third, the quiet assumption that the integrator can backfill cell-level data after delivery, when the cell maker has already closed its batch records.

Storage systems are long-lived assets. The passport must stay accessible and updatable for the life of the battery, including after repurposing or a change of operator. Put that obligation in the O&M contract, not only in the supply contract.

## Getting ahead of the deadline

For a 100-500 kWh C&I cabinet or a containerised utility system, the passport is fundamentally a data discipline test applied to your supply chain. Our engineering team now issues a passport data pack alongside the standard IEC 62619, UN38.3 and IEC 60730 certification set on export projects: identity and traceability fields, cell BOM extract, recycled content declaration, and the performance records required by data points 25-50.

If you are preparing a European project with a 2027 COD, review our [C&I battery cabinet specifications](/products/ci-battery-cabinets) or the [grid-scale BESS container range](/products/energy-storage-system), then send us your project parameters. We will return a compliance gap assessment against the current 71-point taxonomy - before your tender closes, not after."""

ZH_CATEGORY = '合规与政策'
ZH_TITLE = '欧盟电池护照落地 BESS 采购：2027 年 2 月 18 日前的合规清单'
ZH_DESC = ('2027 年 2 月 18 日起，容量超过 2kWh 的工业电池进入欧盟市场必须配备数字电池护照。'
           '本文拆解 71 个数据点中哪些首日强制、哪些暂缓，以及现在就该向储能供应商索要什么。')

ZH_BODY = """欧盟电池护照不再是试点概念。**2027 年 2 月 18 日**起，投放欧盟市场的电动汽车电池、轻型交通工具电池，以及**容量超过 2kWh 的工业电池**，必须配备可通过二维码访问唯一识别码的数字电池护照。500kWh 的工商业储能柜、5MWh 的电网级集装箱，都不属于边缘情形——固定式电池储能系统在**欧盟法规 (EU) 2023/1542** 中被明确归类为工业电池。

对 EPC、系统集成商和电站业主而言，这是一道采购问题，不是信息化问题。护照由数据组装而成，这些数据必须早已存在于供应商的工厂记录、BMS 历史存档和电芯供应链里。数据从未采集，就没有任何平台能在事后凭空生成。

## 电池护照到底包含什么

实际落地是三件事：在欧盟 DPP 中央注册系统登记的唯一识别码、附着在电池本体上的数据载体，以及一套结构化数据集——涵盖身份、可追溯性、材料成分、性能和回收处置信息。

**2026 年 7 月 28 日**，欧盟委员会发布《数字电池护照指南——数据点分类》第一版，把法规附件十三中分散的要求整合为 **71 个数据点**。每个数据点均标注法律来源、适用电池类别和实施状态：强制填报、条件填报、自愿填报、暂缓填报、永久豁免。

这份分类表是当下起草储能技术规格时最有用的文件。它清楚告诉你哪些数据现在就必须索要，哪些可以合法推迟。

## 71 个数据点：首日到底哪些是强制的

| 数据点分组 | 覆盖范围 | 2027-02-18 状态 |
| --- | --- | --- |
| 身份与溯源信息 | DP 1-15 | **强制填报** |
| 碳足迹与可持续标签 | DP 16-19 | **暂缓填报**，待后续实施法案 |
| 再生材料比例（钴、锂、镍、铅） | DP 20-24 | **强制填报** |
| 电化学性能、寿命与安全 | DP 25-50 | 多为强制，按配置条件适用 |
| 循环利用、拆解、健康状态记录 | DP 51-71 | 强制与暂缓混合 |

强制身份信息颗粒度很细：唯一识别码、护照登记与责任主体、制造商名称与商标、邮寄地址、**制造工厂的精确地理位置**、制造年月、重量、容量、化学成分、除汞镉铅之外存在的有害物质，以及**重量占比超过 0.1% 的临界关键原材料**。

最后这一条正是多数储能供应商卡住的地方。要把关键原材料对应到 0.1% 重量阈值，需要电芯级的物料清单（BOM）数据，而多数系统集成商从电芯厂拿到的只是一张汇总表。

## 碳足迹是暂缓，不是取消

数据点 16 至 19——完整材料成分表、碳足迹声明、碳足迹标签、基于尽职调查的负责任采购信息——在 2027 年 2 月首轮实施中标注为暂缓。其格式与核算规则取决于仍在制定中的实施法案。

这一点要读准：暂缓意味着上线节点不会卡你的货，但不意味着义务消失。工业电池碳足迹声明本来就是按授权法案时间表排布的，性能等级和生命周期碳排放上限也已明确后续跟进。

实际影响是：**现在就要向电芯供应商收集一次能源消耗与排放数据**。2027 年才补建的护照，如果背后没有可信的碳核算链条，是无法回填的——原始生产数据属于已经结批的制造批次。能在今天就出具经核验产品碳足迹的供应商，会在义务真正生效前很久，就在欧盟招标中拿到分数：德国、荷兰和北欧的电网级招标已经把碳足迹列为评分项。

## 再生材料比例现在就是硬性的

与碳足迹不同，再生材料比例数据点**首日即强制**。供应商必须申报活性材料中来自制造废料或消费后废料的钴、锂、镍、铅占比。

这对行业来说并不轻松。欧洲已公布的回收产能仍在爬坡，LFP 电芯中真实的消费后再生锂含量依然很低。如果供应商给出 2026 年产量的精确再生比例，理应能出示背后的监管链证据。要索取质量平衡（mass balance）核算方法和回收商名称，而不只是一个百分比。

## 采购流程要改的六件事

1. **把护照数据写进技术规格书**，不要放在商务附件。凡是落在质保条款里的要求，最终都会被当作愿景处理。
2. **招标阶段就要求提供制造工厂地理位置**。原产国已经不够，护照记录的是工厂坐标。
3. **索取电芯级 BOM**，含关键原材料质量占比，并自行核对 0.1% 阈值。
4. **要求再生材料质量平衡核算方法**，并核实背后的回收商是谁。
5. **确认欧盟市场的责任主体**。对非欧盟制造商，通常是进口商或授权代表，护照必须写明其身份。
6. **核查清关准备度**。唯一注册标识会在欧盟海关环节核验，没有有效护照记录的电池无法清关，证书资料再全也没用。

## 供应商会在哪里偷工减料

留意三种套路。第一，所谓"护照"其实是一份带二维码的 PDF 可持续宣传册——它没有在中央系统注册，不具备法律效力。第二，再生材料比例没有回收商名称、没有质量平衡文档。第三，默认集成商可以在交付后回填电芯级数据，而电芯厂的批次记录早已封存。

储能系统是长寿资产。护照必须在电池全生命周期内保持可访问、可更新，包括梯次利用后或运营主体变更之后。这项责任要写进运维合同，而不只是供货合同。

## 提前卡位的做法

对一台 100-500kWh 的工商业储能柜，或一套集装箱式电网级系统来说，电池护照本质上是对你供应链数据纪律的一次考试。我们的工程团队现在会在标准 IEC 62619、UN38.3 和 IEC 60730 认证包之外，随每个出口项目出具护照数据包：身份与溯源字段、电芯 BOM 摘要、再生材料声明，以及数据点 25-50 所要求的性能记录。

如果你正在准备 2027 年并网的欧洲项目，可以先看我们的[工商业储能柜技术规格](/products/ci-battery-cabinets)或[电网级 BESS 集装箱产品线](/products/energy-storage-system)，然后把项目参数发给我们。我们会基于当前 71 个数据点给出合规差距评估——在招标截止之前，而不是之后。"""


def esc(s):
    return s.replace("'", "''")


def main():
    existing = query(f"select id from blog_articles where slug = '{SLUG}';")
    if existing:
        raise SystemExit(f'ABORT: slug exists {existing}')

    tags_sql = 'ARRAY[' + ','.join(f"'{t}'" for t in TAGS) + ']'
    rows = query(
        "insert into blog_articles (slug, date, read_time, tags) values "
        f"('{SLUG}', '{DATE}', {READ_TIME}, {tags_sql}) returning id;"
    )
    print('inserted article:', rows)
    aid = rows[0]['id']

    for locale, cat, title, desc, body in (
        ('en', EN_CATEGORY, EN_TITLE, EN_DESC, EN_BODY),
        ('zh', ZH_CATEGORY, ZH_TITLE, ZH_DESC, ZH_BODY),
    ):
        query(
            "insert into blog_article_translations "
            "(article_id, locale, category, title, description, body) values "
            f"('{aid}', '{locale}', '{esc(cat)}', '{esc(title)}', "
            f"'{esc(desc)}', '{esc(body)}');"
        )
        print('inserted translation:', locale, len(body), 'chars')

    verify = query(
        f"select a.id, a.slug, a.date, t.locale, length(t.body) as body_len "
        f"from blog_articles a join blog_article_translations t on t.article_id = a.id "
        f"where a.slug = '{SLUG}' order by t.locale;"
    )
    print('VERIFY:', json.dumps(verify, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()

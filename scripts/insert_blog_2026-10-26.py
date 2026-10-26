# -*- coding: utf-8 -*-
"""Insert today's blog article via Supabase Management API SQL."""
import sys, json
sys.path.insert(0, 'D:/project/solarstoragepro/scripts')
from _sb_sql import query

SLUG = "bess-iso-prequalification-process"
DATE = "2026-10-26"
READ_TIME = 10
TAGS = ["BESS", "ISO Prequalification", "Grid Interconnection", "Frequency Regulation", "ERCOT", "CAISO"]

TITLE_EN = "BESS ISO Prequalification Guide: How Battery Storage Gets Approved to Bid in ERCOT, CAISO and PJM Markets"
DESC_EN = "A practical walkthrough of the ISO/RTO prequalification process for battery energy storage: resource registration, telemetered data requirements, commissioning tests, and the pitfalls that delay market participation."
BODY_EN = """Getting a battery energy storage system (BESS) energized is only half the battle. Until your project passes **Independent System Operator (ISO) prequalification**, it cannot bid into energy, capacity, or ancillary services markets — and every month of delay is lost revenue. This guide walks through how prequalification actually works in the three largest US markets, what data you must supply, and where most projects get stuck.

## Why Prequalification Matters More Than Interconnection

Developers often treat interconnection approval as the finish line. It is not. Interconnection gives you the physical right to connect; **market prequalification** gives you the commercial right to earn. A 100 MW BESS that is energized but not yet prequalified can sit idle for weeks or months while the revenue clock it was financed against keeps ticking. Lenders typically model **COD (commercial operation date)** as the prequalification date, not the energization date — so schedule slippage here hits PPA and capacity contract obligations directly.

## What the Process Involves

Although each market has its own forms and portals, the underlying workflow is similar:

1. **Resource registration** — Submit the generator/market resource application with site data, one-line diagrams, and the interconnection agreement number.
2. **Model submission** — Provide validated PSCAD/power flow models and dynamic parameters that match the as-built PCS and controller firmware versions.
3. **Telemetry setup** — Establish the SCADA link (typically DNP3 over the ISO's network) delivering MW, MWh, SOC, and status points at the required scan rates — often 2-4 second updates for ancillary participation.
4. **Commissioning and market tests** — Execute ISO-witnessed tests: ramp rate, frequency response, AGC signal following, and (in some markets) black-start or grid-forming capability demonstrations.
5. **Qualification decision** — The ISO reviews test results and either grants full market participation or issues deficiencies to remediate.

## Market-by-Market Differences

| Market | Key Program | Typical Test Focus | Notable Quirk |
| --- | --- | --- | --- |
| ERCOT (Texas) | RMSDS / EIP process | Primary frequency response, ramp tests | Fast-adjusting qualification for AS deployments |
| CAISO (California) | Full Network Model + RIG | AGC/regulation performance scoring | Sustained multi-hour testing during tight grid windows |
| PJM (Mid-Atlantic) | eDART + capacity performance | Regulation signal fidelity (RegA/RegD) | RegD resources face extended performance scoring |

**ERCOT** is generally the fastest route to market for storage; its energy-only market design and streamlined fast-adjusting resource qualification let projects begin offering ancillary services within weeks of commissioning. **CAISO** requires more extensive regulation testing, and because test windows must often be scheduled during periods of system stress, a missed window can add weeks. **PJM** imposes the most demanding ongoing performance obligation: RegD (fast) resources are scored continuously, and poor early performance can shrink future regulation assignments — making the quality of your PCS controller and dispatch algorithm a direct revenue variable.

## The Five Most Common Failure Points

From reviewing dozens of storage commissioning programs, these issues cause most prequalification delays:

1. **Model-as-built mismatch** — The PCS firmware was upgraded after model validation, so the ISO rejects the dynamic model. Freeze firmware versions before submitting models.
2. **Telemetry point mapping errors** — SOC reported where MWh is expected, or wrong scaling factors. Run a point-by-point reconciliation against the ISO's data dictionary before the first test.
3. **AGC signal-following failures** — Response latency or overshoot beyond tolerance. This usually traces to the plant controller's deadband and rate-limit settings, not the hardware.
4. **Missed witness-test windows** — ISO engineers must witness certain tests; calendar conflicts add weeks. Book these windows at project kickoff, not after energization.
5. **Inconsistent nameplate definitions** — Power (MW) vs energy (MWh) vs duration, and whether ratings are at beginning-of-life or warranted end-of-life. Regulators increasingly scrutinize this.

## Practical Checklist Before You Apply

- Confirm the PCS and plant controller firmware versions match the submitted models
- Verify all DNP3 points against the ISO's data dictionary, with correct scale and deadband values
- Schedule witnessed test windows 60-90 days in advance where required
- Pre-run mock AGC and frequency response tests with your own load bank or grid simulator
- Document nameplate ratings consistently across interconnection, market, and warranty documents

## What This Means for Equipment Selection

Prequalification failure is rarely a battery-cell problem — it is a **controls and integration** problem. PCS responsiveness, plant controller tuning, and vendor support during witnessed testing determine whether you qualify on the first attempt or burn months in remediation. When evaluating suppliers, ask specifically about their track record of first-pass ISO qualification in your target market, and whether their engineering team participates in commissioning tests remotely.

At **SolarStoragePro**, our grid-scale BESS containers (1-5 MW) and C&I battery cabinets ship with pre-validated dynamic models, DNP3 point maps pre-configured for major ISO data dictionaries, and remote engineering support throughout witnessed commissioning — built on PCS hardware certified to IEC 62619 and GB/T 36276-2023. [Explore our grid-scale BESS containers](/products/energy-storage-system) or [browse C&I battery cabinets](/products/ci-battery-cabinets) to see the qualification-ready difference. **Contact our team for a prequalification readiness review of your next project.**"""

TITLE_ZH = "BESS 参与电力市场准入（ISO 预认证）全流程指南：并网之后，离赚钱还差这一步"
DESC_ZH = "详解储能项目在电力市场准入预认证中的资源注册、模型提交、遥测接入与市场试验全流程，以及导致延误的五大常见问题与应对清单。"
BODY_ZH = """储能项目成功并网送电，只完成了工程意义上的一半。在通过电力交易机构的**市场准入预认证**之前，项目无法参与电能量、容量或辅助服务市场申报——而每拖延一个月，都是实打实的收益损失。本文梳理市场准入预认证的完整流程、需要提交的数据，以及大多数项目容易卡住的环节。

## 为什么预认证比并网更关键

很多开发商把并网批复当作终点，其实不是。并网解决的是"物理接入权"，预认证解决的是"商业收益权"。一个已送电但未完成准入的 100MW 储能电站，可能要闲置数周甚至数月，而融资模型中的收益时钟却在持续走动。金融机构通常把 **商业运营日（COD）** 定义为完成市场准入的日期，而非送电日期——这一环节的延期会直接影响容量合约和租赁协议的履约安排。

## 准入流程的五个环节

虽然各国、各省交易机构的表单和系统不同，但底层逻辑相似：

1. **资源注册**——提交市场主体注册申请，包括场址信息、一次接线图、并网协议编号等。
2. **模型提交**——提交与实际并网的 PCS 和控制系统固件版本一致的机电暂态/电磁暂态模型及参数。
3. **遥测接入**——建立与调度系统的 SCADA 链路（国内通常为 104 规约或调度数据网专线），按要求的采样率上传有功、电量、SOC 及状态量，参与辅助服务一般要求秒级刷新。
4. **并网检测与市场试验**——执行调度机构见证下的试验：爬坡速率、一次调频、AGC 信号跟随能力，部分地区还要求构网型/黑启动能力演示。
5. **准入批复**——交易与调度机构审核试验结果，通过后授予完整的市场申报资格，否则出具缺陷整改清单。

## 国内外的差异化要点

| 环节 | 国内（两个细则体系） | 美国市场（ERCOT/CAISO/PJM） |
| --- | --- | --- |
| 检测依据 | GB/T 36547、各省"两个细则" | 各 ISO 市场手册与可靠性标准 |
| 试验重点 | 一次调频、AGC、涉网保护 | 一次调频、RegD 信号保真度 |
| 收益挂钩 | 调峰/调频补偿与考核系数 | 实时市场报价 + AS 结算 |
| 典型难点 | 电化学储能并网检测排队周期 | 见证试验排期、模型版本管控 |

国内项目尤其要注意**并网检测机构的排队周期**——在装机高峰期，具备资质的检测机构排期常常是整个投产流程的最大瓶颈，建议在设备招标阶段就把检测排期写入商务条款。美国市场方面，ERCOT 准入速度最快，CAISO 的 AGC 调节试验更严格，PJM 对 RegD 快速资源的持续性能考核最苛刻——早期性能不佳会直接压缩后续的调频分配容量。

## 最常见的五类失败原因

1. **模型与现场不一致**——PCS 固件在模型提交后又升级，导致调度机构退回模型。务必在提交前冻结固件版本。
2. **遥测点表映射错误**——SOC 报错为电量、量纲系数不对。首次试验前逐点核对点表与数据字典。
3. **AGC 跟随试验不合格**——响应延时或超调超标，通常源于厂站控制系统的死区和限速参数设置，而非硬件问题。
4. **错过见证试验窗口**——调度/检测机构需见证试验，排期冲突动辄延误数周。应在项目启动时同步预订。
5. **铭牌口径不一致**——功率（MW）、容量（MWh）、时长在并网、市场、质保三份文件中的定义和考核口径（初始值还是质保期末值）必须统一。

## 设备选型的真正含义

预认证失败很少是电芯问题，几乎都是**控制与系统集成**问题：PCS 响应速度、厂站控制器参数整定、供应商在见证试验阶段的支持能力，决定了项目是一次通过还是陷入数月整改。因此评估供应商时，应直接追问其在目标市场的首次通过率记录，以及调试阶段是否提供远程工程支持。

**SolarStoragePro** 的电网级 BESS 集装箱（1-5MW）和工商业储能柜出厂即附带预验证的动态模型与点表，PCS 通过 IEC 62619、GB/T 36276-2023 认证，并在见证调试全程提供远程工程支持。欢迎[了解电网级储能集装箱](/products/energy-storage-system)与[工商业储能柜](/products/ci-battery-cabinets)，或**联系我们的团队为您的下一个项目做一次准入就绪度评估**。"""

def esc(s):
    return s.replace("'", "''")

# Insert main article
tags_sql = ','.join("'{}'".format(t) for t in TAGS)
sql1 = (
    f"insert into blog_articles (slug, date, read_time, tags) "
    f"values ('{SLUG}', '{DATE}', {READ_TIME}, array[{tags_sql}]::text[]) "
    f"returning id, slug;"
)
r1 = query(sql1)
print("STEP1:", json.dumps(r1, ensure_ascii=False))
if isinstance(r1, dict):
    print("ERROR", r1); sys.exit(1)
aid = r1[0]['id']

# Insert translations
sql2 = (
    f"insert into blog_article_translations (article_id, locale, category, title, description, body) values "
    f"('{aid}', 'en', 'Market Access', '{esc(TITLE_EN)}', '{esc(DESC_EN)}', '{esc(BODY_EN)}'), "
    f"('{aid}', 'zh', '市场准入', '{esc(TITLE_ZH)}', '{esc(DESC_ZH)}', '{esc(BODY_ZH)}') "
    f"returning id, locale;"
)
r2 = query(sql2)
print("STEP2:", json.dumps(r2, ensure_ascii=False))
if isinstance(r2, dict):
    print("ERROR", r2); sys.exit(1)

# Verify
r3 = query(f"select a.id, a.slug, a.date, count(t.id) as trans from blog_articles a left join blog_article_translations t on t.article_id=a.id where a.slug='{SLUG}' group by a.id;")
print("VERIFY:", json.dumps(r3, ensure_ascii=False))

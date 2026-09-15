// Insert blog article: battery-storage-warranty-terms-explained
// Usage: NODE_PATH not required. Run with: node scripts/insert-warranty-blog.cjs
const SUPABASE_URL = "https://qujcrmbzuzlgjrexbzga.supabase.co";
const ANON_KEY = "sb_publishable_bBrZR2df4POLnM4sWI96xQ_xPvlD06k";

const HEADERS = {
  apikey: ANON_KEY,
  Authorization: "Bearer " + ANON_KEY,
  "Content-Type": "application/json",
};

const enBody = `Signing a battery energy storage system (BESS) contract is one of the largest capital commitments an industrial energy buyer makes — and the warranty section is where most value is either protected or quietly lost. Unlike a product you simply "own," a BESS is a **degrading asset** whose future revenue depends on how well the warranty defines performance. This guide breaks down the warranty terms that EPCs, integrators, and C&I buyers should verify before signing, based on current industry practice for LFP-based commercial systems.

## The Three Warranty Layers in Every BESS Contract

A professional BESS warranty is not a single document. It is a stack of three distinct commitments, and each serves a different purpose:

1. **Product (defect) warranty** — covers material and workmanship defects in cells, modules, PCS, and enclosure components. Typical duration: **7–10 years** for C&I cabinets, 10–15 years for grid-scale containers.
2. **Performance (capacity) warranty** — guarantees the system still delivers a defined percentage of usable energy after a stated number of cycles or years. Industry standard for LFP: **70–80% remaining capacity after 6,000–10,000 cycles**.
3. **Availability warranty** — mostly used in utility-scale contracts: the system must be available for dispatch **97–99% of the time** during a contract year, excluding scheduled maintenance.

Buyers who only compare "warranty length" miss the point. A 15-year product warranty with no capacity guarantee is worth less than a 10-year contract that clearly defines end-of-life (EOL) criteria, remedies, and measurement methods.

## Key Terms Decoded: Cycles, DoD, EOL, and Measurement

Warranty documents are full of qualifiers that dramatically change real coverage. Four terms matter most:

- **Cycle definition.** A "cycle" should be defined as one full charge-discharge equivalent (100% DoD equivalent) based on **throughput energy**, not daily calendar events. If a vendor counts every partial discharge as a cycle, your 6,000-cycle warranty may be consumed in two years of peak-shaving duty.
- **Depth of discharge (DoD).** The capacity warranty typically assumes operation within a defined SoC window (e.g. 5–95%). Operating outside it can void coverage — make sure your EMS is configured to stay within the warranted window.
- **End-of-life (EOL) criterion.** Most LFP warranties specify EOL at **70% of nominal capacity**. Confirm whether EOL is measured at the cell, module, or system level, and whether temperature derating is included.
- **Capacity measurement method.** Reputable manufacturers specify an annual capacity test protocol — controlled temperature, defined C-rate, and full charge-discharge — so results are reproducible and not left to the vendor's discretion.

## Typical Warranty Numbers in 2026

The table below reflects prevailing commercial terms for LFP-based systems from established manufacturers:

| Segment | Product Warranty | Performance Warranty | Typical EOL Criterion |
| --- | --- | --- | --- |
| C&I battery cabinet (100–500 kWh) | 7–10 years | 6,000–8,000 cycles or 10 years to 70% capacity | 70% usable capacity |
| Grid-scale BESS container (1–5 MW) | 10–15 years | 8,000–10,000 cycles, 80% capacity | 70–80% capacity |
| Residential all-in-one ESS | 10 years | 6,000 cycles to 70% | 70% usable capacity |
| PCS / inverter | 5–10 years | Efficiency per datasheet | 97–98% peak efficiency |

Two observations: first, **calendar and cycle limits usually run in parallel** — whichever is exhausted first ends the warranty. Second, some vendors now offer **augmentation-friendly contracts** that accommodate mid-life capacity top-ups without resetting the warranty clock. If your revenue model depends on long-term arbitrage or frequency regulation, these clauses matter more than headline cycle counts.

## Five Red Flags Before You Sign

1. **No defined remedy path.** The warranty must state what happens on breach: module replacement, capacity make-up, or refund — with timelines. "Repair at manufacturer's discretion" is not a remedy.
2. **Auxiliary consumption excluded.** Systems consuming 1–2% of throughput on HVAC and controls erode real revenue. Contracts that exclude aux loads from performance math should be renegotiated.
3. **Round-trip efficiency (RTE) not warranted.** A drop from 94% to 88% RTE quietly cuts arbitrage revenue by ~6%. Leading vendors now warrant RTE within a band (e.g. ≥91% measured DC-to-AC) for the first years of operation.
4. **Warranty voided by third-party service.** Check whether the manufacturer permits qualified third-party O&M — a monopolized service clause often hides inflated post-warranty pricing.
5. **No capacity test protocol.** If the vendor controls how capacity is measured, disputes become unwinnable. Insist on a third-party-witnessable test procedure.

## How Certifications Strengthen Your Warranty Position

Independent certifications are the fastest way to filter serious manufacturers from resellers. **IEC 62619** (safety of industrial lithium cells and batteries), **IEC 60730** (automatic controls), **UN 38.3** (transport), **CE**, and **GB/T 36276-2023** (Chinese national standard for lithium ESS safety) demonstrate that the underlying cells and system architecture have passed independent abuse testing. A manufacturer whose warranty references certified, testable products — such as purpose-built [C&I battery cabinets](/products/ci-battery-cabinets) with certified BMS protection — is far more likely to honor claims than one selling re-labeled third-party packs.

## Practical Checklist for Buyers

Before signing, request and verify:

1. The full warranty document, not a marketing summary — including exclusions annexes.
2. A sample **annual capacity test report** from a comparable installed site.
3. The exact SoC window, temperature range, and C-rate the warranty assumes.
4. Spares availability commitment and lead times (critical for remote sites).
5. Whether the warranty is **bankable** — many lenders require assignment rights or an insurance wrap for project financing.

## Conclusion

A BESS warranty is a financial instrument as much as a technical document. The difference between a well-negotiated and a poorly-read warranty contract can easily exceed 10% of lifetime project revenue. Prioritize clarity on cycle definitions, capacity measurement, remedies, and certifications over headline numbers.

Ready to review warranty terms for your next C&I storage project? [Contact our engineering team](/contact) for a side-by-side warranty comparison of our [integrated energy storage systems](/products/energy-storage-system), including sample capacity test reports and bankability documentation.`;

const zhBody = `签订一套电池储能系统（BESS）合同，往往是工商业用户最大的一笔能源资产投资——而质保条款正是价值被保护或被悄悄流失的地方。储能电站不是"买完即拥有"的普通设备，而是一个**持续衰减的资产**，未来收益很大程度上取决于质保条款如何定义性能。本文基于 LFP 磷酸铁锂工商业储能的当前行业惯例，梳理 EPC、集成商和业主在签约前必须核验的质保条款。

## 一份 BESS 合同中的三层质保

专业的储能质保不是一纸文件，而是三层相互独立的承诺，各自对应不同的风险：

1. **产品（缺陷）质保**：覆盖电芯、模组、PCS、箱体等部件的材料与工艺缺陷。工商业储能柜通常为 **7–10 年**，电网级集装箱为 10–15 年。
2. **性能（容量）质保**：承诺系统在运行一定循环次数或年限后，仍能输出标称可用容量的百分比。LFP 行业标准通常为 **6,000–10,000 次循环后容量保持 70–80%**。
3. **可用性质保**：主要用于电网级项目，要求系统在合同年度内**97–99% 的时间可被调度**（计划检修除外）。

很多采购方只比较"质保年限"，这是最大的误区。一份没有容量保证的 15 年产品质保，价值远低于一份明确定义了寿命终止（EOL）标准、补救措施和测量方法的 10 年合同。

## 关键术语解析：循环、DoD、EOL 与测量方法

质保文件里的限定词会显著改变实际覆盖范围，以下四个术语最重要：

- **循环定义**：一次"循环"应基于**吞吐电量**折算的满充满放等效（100% DoD 等效），而不是按日历事件计次。如果厂商把每次部分放电都算一次循环，6,000 次循环的质保在峰谷套利场景下可能两年就被消耗完。
- **放电深度（DoD）**：容量质保通常假定系统运行在规定的 SoC 区间（如 5–95%）。超出区间运行可能导致质保失效——务必确认 EMS 被配置在质保区间内。
- **寿命终止（EOL）标准**：多数 LFP 质保以**标称容量的 70%** 为 EOL。需确认 EOL 是在电芯、模组还是系统级测量，以及是否包含温度降额。
- **容量测量方法**：靠谱的制造商会规定年度容量测试协议——控温、规定倍率、完整充放电——保证结果可复现，而不是由厂商说了算。

## 2026 年主流质保参数参考

下表反映了当前成熟制造商 LFP 系统的主流商务条款：

| 产品段 | 产品质保 | 性能质保 | 典型 EOL 标准 |
| --- | --- | --- | --- |
| 工商业储能柜（100–500 kWh） | 7–10 年 | 6,000–8,000 次循环或 10 年至 70% 容量 | 70% 可用容量 |
| 电网级 BESS 集装箱（1–5 MW） | 10–15 年 | 8,000–10,000 次循环，容量保持 80% | 70–80% 容量 |
| 户用一体化储能 | 10 年 | 6,000 次循环至 70% | 70% 可用容量 |
| PCS / 逆变器 | 5–10 年 | 按数据手册效率 | 97–98% 峰值效率 |

两点观察：第一，**年限与循环次数通常并行计算**，哪个先耗尽质保就在哪结束。第二，部分厂商已推出**支持增容（augmentation）的合同**，允许在寿命中期补充容量而不重置质保时钟。如果您的收益模型依赖长期套利或调频，这些条款比表面上的循环次数更重要。

## 签约前的五个危险信号

1. **没有明确的补救路径**：质保必须写明违约后果——模组更换、容量补足或退款，并附时限。"由厂家酌情维修"不是补救措施。
2. **辅助能耗被排除**：暖通与控制系统消耗 1–2% 的吞吐电量，会直接侵蚀实际收益。将辅载排除在性能计算之外的合同应重新谈判。
3. **系统往返效率（RTE）不在质保范围**：RTE 从 94% 降到 88%，套利收入会静默减少约 6%。头部厂商已开始对 RTE 做区间质保（如 DC-to-AC ≥91%）。
4. **第三方运维导致质保失效**：确认厂商是否允许有资质的第三方 O&M——被垄断的服务条款往往隐藏着高昂的保后服务报价。
5. **没有容量测试协议**：如果测量方法由厂商掌控，争议注定无解。务必要求提供可第三方见证的测试流程。

## 认证如何强化您的质保地位

独立认证是筛选"正经制造商"与"贴牌转售商"最快的方式。**IEC 62619**（工业锂电池安全）、**IEC 60730**（自动控制）、**UN 38.3**（运输安全）、**CE** 以及 **GB/T 36276-2023**（中国锂电储能安全国标）证明底层电芯和系统架构通过了独立的滥用测试。一家质保条款与已认证、可测试产品挂钩的制造商——例如配备认证 BMS 保护的专用[工商业电池柜](/products/ci-battery-cabinets)——兑现理赔的可能性远高于销售贴牌电池包的贸易商。

## 采购方实操清单

签约前请索取并核验：

1. 完整质保文件原件（而非营销摘要），含免责附件。
2. 同类型已投运项目的一份**年度容量测试报告**样本。
3. 质保假定的精确 SoC 区间、温度范围和充放电倍率。
4. 备件供应承诺与交付周期（偏远站点尤其关键）。
5. 质保是否**可融资（bankable）**——多数融资机构要求可转让权利或保险增信。

## 结语

储能质保既是技术文件，也是金融工具。一份读懂并谈妥的质保合同与一份没读透的合同，全生命周期收益差异轻松超过 10%。优先关注循环定义、容量测量、补救措施和认证资质，而不是表面的数字。

准备为您下一个工商业储能项目评估质保条款？[联系我们的工程团队](/contact)，获取[一体化储能系统](/products/energy-storage-system)的质保条款逐项对比，包括容量测试报告样本与可融资性文件。`;

async function post(path, body) {
  const res = await fetch(SUPABASE_URL + path, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error("HTTP " + res.status + ": " + text);
  return JSON.parse(text);
}

async function main() {
  // Step 1: insert main record
  const mainRows = await post("/rest/v1/blog_articles", {
    slug: "battery-storage-warranty-terms-explained",
    date: "2026-09-16",
    read_time: 10,
    tags: ["BESS", "Warranty", "Procurement", "LFP", "IEC 62619", "Energy Storage"],
  });
  const articleId = mainRows[0].id;
  console.log("Main record inserted, id =", articleId);

  // Step 2: insert EN translation
  await post("/rest/v1/blog_article_translations", {
    article_id: articleId,
    locale: "en",
    category: "Procurement Guide",
    title: "Battery Storage Warranty Terms Explained: What to Check Before Signing",
    description: "A practical guide to BESS warranty structures for EPCs and C&I buyers: product vs performance vs availability warranties, cycle and EOL definitions, capacity test protocols, and five red flags to avoid before signing.",
    body: enBody,
  });
  console.log("EN translation inserted");

  // Step 3: insert ZH translation
  await post("/rest/v1/blog_article_translations", {
    article_id: articleId,
    locale: "zh",
    category: "采购指南",
    title: "储能系统质保条款解析：签约前必须核验的关键内容",
    description: "面向 EPC 与工商业业主的 BESS 质保实务指南：产品/性能/可用性三层质保、循环与 EOL 定义、容量测试协议，以及签约前的五个危险信号。",
    body: zhBody,
  });
  console.log("ZH translation inserted");

  console.log("All done. article_id =", articleId);
}

main().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});

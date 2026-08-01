// Insert ZH translation for blog article #016 (article already exists)
const SUPABASE_URL = "https://qujcrmbzuzlgjrexbzga.supabase.co";
const ANON_KEY = "sb_publishable_bBrZR2df4POLnM4sWI96xQ_xPvlD06k";
const articleId = "2c65c38f-b730-490f-ae99-f68afb455e9f";

const zhCategory = "市场情报";
const zhTitle = "2026 年电池储能系统成本趋势：BNEF 数据、价格预测与 B2B 采购策略指南";
const zhDescription = "基于行业数据的 2026 年电池储能系统成本分析，涵盖 LFP 电芯价格下降、系统总成本拆解（元/kWh）、区域成本差异与 LCOS 预测，帮助工商业买家优化采购时机。";

const zhBody = `电池价格下降速度超出几乎所有机构的预测。BloombergNEF 年度电池价格调查数据显示，2024 年锂离子电池包均价降至 **$115/kWh**，同比降幅达 20%；2025 年中国 LFP 电芯价格在产能过剩周期中跌破 **$70/kWh**。对于评估电池储能系统（BESS）的 B2B 买家而言，问题已不再是"储能何时能负担得起"，而是"如何在波动的市场中锁定最优价格"。

本文将拆解 2026 年电池储能系统的**完整成本结构**，预测价格走势，并为采购团队提供一套采购时机判断框架。

## 一、2026 年 BESS 价格现状

B2B 买家最需要区分的是**电芯价格**与**系统价格**。媒体上低于 $70/kWh 的价格指的是工厂出厂的裸电芯。一套交钥匙的并网 BESS 包含远不止电芯。

| 成本组件 | 占比 | 2026 年均价（$/kWh） | 同比趋势 |
|---|---|---|---|
| LFP 电芯 | 50-55% | $75-95 | ↓ 15-20% |
| PCS / 逆变器 | 10-12% | $20-28 | ↓ 5-8% |
| BMS 与 EMS | 5-7% | $10-15 | → 持平 |
| 热管理 | 5-6% | $10-14 | ↓ 3-5% |
| 集装箱 / 外壳 | 4-6% | $8-13 | → 持平 |
| EPC 与安装 | 12-18% | $25-45 | ↓ 2-4% |
| **交钥匙系统总计** | **100%** | **$200-320/kWh** | **↓ 8-12%** |

**关键结论：** 工商业电池柜（100-500 kWh）安装后通常落在 **$300-450/kWh**，而电网级集装箱 BESS（1-5 MWh）在规模化条件下可达 **$200-280/kWh**。规模效应显著——5 MWh 项目的每 kWh 成本比 200 kWh 机柜低约 35%。

## 二、2024-2025 年价格暴跌的驱动因素

三大结构性力量推动价格下行：

1. **碳酸锂供给过剩。** 碳酸锂价格从 2022 年峰值 ¥60 万元/吨跌至 2025-2026 年的 ¥8-10 万元/吨，直接削减 LFP 正极材料成本 60% 以上。
2. **中国电芯产能大幅扩张。** 宁德时代、比亚迪、亿纬、瑞浦兰钧到 2025 年合计新增超过 2 TWh 电芯产能，引发激烈价格竞争。
3. **制造效率提升。** 新一代大容量 LFP 电芯（314 Ah、587 Ah）减少 Pack 级零部件数量，体积能量密度提升 15-20%。

## 三、区域成本差异：中国 vs 美国 vs 欧洲

由于制造临近度、关税、人工和审批等因素，储能系统成本在各地区差异显著。

| 地区 | 电网级 BESS（$/kWh） | 工商业机柜（$/kWh） | 关键因素 |
|---|---|---|---|
| 中国（本土） | $170-220 | $250-350 | 直接工厂采购，最低人工 |
| 东南亚 | $200-260 | $300-400 | 临近中国供应，关税适中 |
| 美国 | $280-380 | $400-550 | IRA 48E 抵免抵消约 30%；高 EPC 人工 |
| 欧洲 | $320-420 | $450-600 | 高人工，CBAM，本地电芯供应有限 |
| 中东 / 非洲 | $260-360 | $380-520 | 依赖进口，物流增加 8-12% |

**美国买家请注意：** 《通胀削减法》**第 48E 条投资税收抵免**为符合条件的独立储能项目提供最高 30%（加上额外加分最高 50%）的抵免，有效将电网级 BESS 净安装成本降至 **$196-266/kWh**。

## 四、储能度电成本（LCOS）：真正重要的指标

前期 $/kWh 只讲述故事的一部分。**储能度电成本（LCOS）**——系统全生命周期内每放电 kWh 的成本——才是 B2B 买家评估项目经济性的核心指标。

| 参数 | LFP BESS（2026） | NMC BESS（2026） |
|---|---|---|
| 安装成本（$/kWh） | $250 | $320 |
| 循环寿命（@ 80% DoD） | 6,000-10,000 | 2,000-3,500 |
| 循环效率 | 88-92% | 90-94% |
| 日历寿命 | 12-15 年 | 8-10 年 |
| 运维（$/kWh/年） | $8-12 | $10-15 |
| **LCOS（$/MWh）** | **$85-120** | **$130-180** |

LFP 更长的循环寿命和更低的前期成本使其在大多数固定储能应用中占据明确优势。NMC 仅在空间受限或对重量敏感的部署中保留优势。

## 五、成本预测：2026-2028 年展望

行业共识指向价格持续但**放缓**的下降趋势，因为供给过剩的修正效应正在显现。

| 年份 | LFP 电芯（$/kWh） | 电网 BESS 系统（$/kWh） | 工商业机柜（$/kWh） | 关键驱动 |
|---|---|---|---|---|
| 2024（实际） | $80-90 | $240-340 | $350-500 | 供给过剩高峰 |
| 2025（实际） | $65-75 | $210-300 | $320-460 | 持续下降 |
| 2026（当前） | $70-95 | $200-320 | $300-450 | 价格企稳开始 |
| 2027（预测） | $65-85 | $190-290 | $280-420 | 温和下降 |
| 2028（预测） | $60-80 | $180-270 | $270-400 | 降速趋缓 |

**关键洞察：** 价格不太可能继续以 2024-2025 年的速度下跌。锂价已企稳，电芯制造商因负利润正在削减扩产计划。等待再降 30% 的买家可能错过最佳采购窗口。

## 六、采购策略：如何优化 BESS 采购

对于计划在未来 12-18 个月内启动储能项目的 B2B 买家，建议遵循以下框架：

1. **分批下单锁定电芯价格。** 将订单拆分为 2-3 批，价格重置条款与碳酸锂指数挂钩，双向保护涨跌风险。
2. **除非空间极度受限，优先选择 LFP。** 在固定储能应用中，LFP 的 LCOS 优势已达 25-35%。
3. **要求提供完整 BOM 成本拆解。** 可信的制造商会提供成本明细（电芯、PCS、BMS、热管理、外壳）。报价将所有内容捆绑为一个不透明数字时需要警惕。
4. **评估全生命周期成本，而非仅看 CAPEX。** 一个便宜 $20/kWh 但只有 4,000 次循环的系统，每放电 kWh 成本反而高于 8,000 次循环的高端系统。
5. **叠加激励政策。** 在美国，将 IRA 48E 与州级 SGIP（加州）、SMART（马萨诸塞州）或电力公司需求响应补贴组合。在中国，申请削峰补贴和参与需求响应市场。

## 七、SolarStoragePro 如何帮助您应对成本波动

作为 [工商业电池储能柜](/products/ci-battery-cabinets) 和 [电网级 BESS 集装箱](/products/energy-storage-system) 的制造商，SolarStoragePro 提供：

- **透明定价** —— 提供详细 BOM 拆解，拒绝不透明捆绑
- **LFP 优先产品策略** —— 对齐最低 LCOS 化学体系
- **IEC 62619、UN38.3、GB/T 36276-2023、CE 认证** —— 满足全球部署要求
- **100 kWh 至 5 MW** 产品覆盖 —— 从工商业削峰到电网级服务
- **集成 PCS 与 EMS** —— 降低采购复杂度和接口风险

## 准备获取详细 BESS 报价？

当前市场处于供给修正收紧前的罕见低价窗口期。无论您需要 200 kWh 的削峰机柜还是 5 MW 的电网级集装箱，我们的工程团队将提供详细成本拆解、LCOS 分析和采购时间表。

**[立即联系我们的团队](/contact)**，获取项目专属报价及完整组件级定价。`;

async function main() {
  console.log("Inserting ZH translation for article:", articleId);
  const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_article_translations`, {
    method: "POST",
    headers: {
      "apikey": ANON_KEY,
      "Authorization": `Bearer ${ANON_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      article_id: articleId,
      locale: "zh",
      category: zhCategory,
      title: zhTitle,
      description: zhDescription,
      body: zhBody,
    }),
  });
  const text = await res.text();
  if (!res.ok) {
    console.error("ZH insert failed:", res.status, text);
    process.exit(1);
  }
  console.log("ZH translation inserted, status:", res.status);

  // Verify both translations exist
  console.log("\nVerifying translations...");
  const verifyRes = await fetch(
    `${SUPABASE_URL}/rest/v1/blog_article_translations?article_id=eq.${articleId}&select=locale,title`,
    { headers: { "apikey": ANON_KEY, "Authorization": `Bearer ${ANON_KEY}` } }
  );
  const verifyData = await verifyRes.json();
  console.log("Translations:", JSON.stringify(verifyData, null, 2));
}

main().catch(e => { console.error(e); process.exit(1); });

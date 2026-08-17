const SUPABASE_URL = "https://qujcrmbzuzlgjrexbzga.supabase.co";
const ANON_KEY = "sb_publishable_bBrZR2df4POLnM4sWI96xQ_xPvlD06k";

async function main() {
  // Step 1: Insert blog_articles
  const articleData = {
    slug: "energy-storage-system-commissioning-checklist",
    date: "2026-08-17",
    read_time: 11,
    tags: ["BESS", "Commissioning", "Energy Storage", "Testing", "IEC 62619", "Project Delivery"]
  };

  console.log("=== Step 1: Inserting blog_articles ===");
  const articleRes = await fetch(`${SUPABASE_URL}/rest/v1/blog_articles`, {
    method: "POST",
    headers: {
      "apikey": ANON_KEY,
      "Authorization": `Bearer ${ANON_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation"
    },
    body: JSON.stringify(articleData)
  });

  if (!articleRes.ok) {
    const errText = await articleRes.text();
    console.error("Article insert failed:", articleRes.status, errText);
    process.exit(1);
  }

  const articleRows = await articleRes.json();
  const articleId = articleRows[0].id;
  console.log("Article inserted. ID:", articleId);

  // Step 2: Insert English translation
  const enData = {
    article_id: articleId,
    locale: "en",
    category: "Technical Guide",
    title: "Energy Storage System Commissioning Checklist: A Step-by-Step Guide for BESS Project Delivery (2026)",
    description: "A comprehensive BESS commissioning checklist covering pre-energization inspection, cold commissioning, hot commissioning, grid-tie testing, and handover. Learn the 7-phase commissioning process, key acceptance tests, common failure modes, and documentation requirements for IEC 62619 and GB/T 36276-2023 compliant projects.",
    body: `Energy storage projects live or die at commissioning. A battery system that passes factory acceptance testing (FAT) can still fail in the field due to transport damage, installation errors, software misconfiguration, or grid interconnection issues. This checklist walks through the **complete BESS commissioning process** — from site readiness to handover — based on IEC 62933-5-2, IEEE 2030.2, and real-world project delivery experience across utility-scale and C&I installations.

## Why Commissioning Matters

Commissioning is not a formality. It is the **last line of defense** before a multi-million-dollar asset goes live. Industry data shows that **60–70% of BESS warranty claims** in the first year of operation trace back to commissioning deficiencies — undetected cell imbalance, loose busbar torque, protection relay mis-setpoints, or incomplete firmware integration.

A structured commissioning process delivers three outcomes:

| Outcome | Metric | Business Impact |
|---------|--------|-----------------|
| Safety verification | Zero thermal events at first charge | Prevents $5–50M incident liability |
| Performance validation | RTE ≥ 88%, capacity ≥ 98% of nameplate | Ensures revenue model accuracy |
| Warranty activation | Signed commissioning report | Starts 10-year warranty clock |

## The 7-Phase Commissioning Process

### Phase 1: Site Readiness Inspection (Day 1–2)

Before any equipment is energized, verify the **physical and environmental conditions**:

1. Foundation concrete strength ≥ C30, surface flatness ≤ 3 mm/m
2. Grounding resistance ≤ 4 Ω (per IEC 62305), equipotential bonding verified
3. Cable trenches drained, rodent-proofing installed, fire detection operational
4. HVAC or liquid cooling system commissioned and temperature-stable for 24 hours
5. Grid interconnection switchgear, protection relays, and metering CTs/PTs installed and tested
6. Site security (fencing, cameras, access control) operational
7. Fire suppression system pressure-tested, agent canisters weighed and logged

**Gate criterion:** All items must pass before proceeding. Any open item requires a documented deviation with mitigation plan.

### Phase 2: Pre-Energization Inspection (Day 2–3)

This phase covers **visual and mechanical verification** of the installed BESS:

| Inspection Item | Standard | Acceptance Criteria |
|-----------------|----------|-------------------|
| Cell/module visual | IEC 62619 | No swelling, leakage, deformation |
| Busbar connections | Manufacturer spec | Torque marked, 100% verified with calibrated wrench |
| DC cabling | IEC 62933-5-2 | Insulation resistance ≥ 1 MΩ, polarity correct |
| AC cabling | IEEE 837 | Phase rotation verified, lugged correctly |
| Container sealing | IP54+ | No water ingress paths, gasket intact |
| Communication wiring | Modbus/IEC 61850 | Shielded, grounded at one end, terminated per drawing |
| Battery management system (BMS) | — | Firmware version verified, no transport fault codes |

**Common pitfall:** Busbar torque is the #1 field finding. Thermal cycling loosens connections that were "tight enough" at installation but fail under sustained current. Every bolt must be torque-stamped with a paint dot.

### Phase 3: Cold Commissioning (Day 3–5)

**Cold commissioning** means testing all subsystems without DC bus voltage. The goal is to validate control logic, communication, and protection functions before energy is present.

1. **BMS self-test:** Verify cell voltage acquisition (±5 mV accuracy), temperature acquisition (±2 °C), and current sensor zero-point calibration
2. **PCS self-test:** Inverter internal diagnostics, IGBT health check, DC and AC contactor sequencing
3. **EMS communication:** End-to-end ping from cloud platform → EMS → PCS → BMS, latency < 200 ms
4. **Protection relay testing:** Overcurrent (50/51), overvoltage (59), undervoltage (27), frequency (81O/81U) — inject secondary test current and verify trip times
5. **SCADA tag mapping:** Every analog and discrete point reads correctly in the HMI

| Test Category | # of Tests | Typical Duration | Pass Rate (First Attempt) |
|---------------|-----------|-----------------|--------------------------|
| BMS acquisition | 12–48 (per rack) | 2–4 hours | 90–95% |
| PCS self-test | 8–15 | 1–2 hours | 95–98% |
| Protection relay | 6–12 | 3–6 hours | 85–90% |
| Communication | 20–50 | 4–8 hours | 80–85% |

### Phase 4: Hot Commissioning — First Charge (Day 5–7)

**This is the highest-risk phase.** The BESS is energized for the first time. Follow a conservative ramp protocol:

1. Pre-charge check: Confirm all breakers open, grounding removed, personnel cleared, fire watch posted
2. Close DC contactor, verify DC bus voltage rises to expected range (±2% of calculated string voltage)
3. **First charge at 0.1C rate** to 20% SoC, hold for 30 minutes, monitor cell temperatures (ΔT < 5 °C across pack)
4. Continue charge at 0.2C to 50% SoC, record cell voltage distribution (max deviation < 50 mV)
5. Hold at 50% SoC for 2 hours — this is the **thermal soak test** to identify any latent cell defects
6. If stable, continue to 90% SoC at 0.3C, then balance to 100%

**Abort criteria:** Any cell temperature > 55 °C, any cell voltage deviation > 100 mV, or any BMS fault code → immediately open DC contactor and investigate.

### Phase 5: Grid-Tie and Functional Testing (Day 7–10)

With the battery proven stable, test **grid interaction and dispatch functions**:

1. **Synchronization:** PCS synchronizes to grid within 1 cycle, no inrush events
2. **Power quality:** THD < 3% at rated power (IEEE 519), power factor > 0.99
3. **Charge/discharge cycles:** Run 3 full cycles (0–100% SoC) at 0.5C, verify RTE ≥ 88%
4. **Capacity test:** Discharge from 100% to 20% SoC at rated power, measured energy ≥ 98% of nameplate kWh
5. **Response time:** EMS command → full power output in < 2 seconds (for frequency regulation applications)
6. **Islanding test:** Disconnect grid, verify anti-islanding protection trips within 2 seconds (IEEE 1547)
7. **Black start:** If applicable, verify grid-forming capability and load pickup sequence

| Functional Test | Standard | Acceptance |
|-----------------|----------|-----------|
| RTE measurement | IEC 62933-2 | ≥ 88% (LFP system) |
| Capacity test | IEC 62933-2 | ≥ 98% of nameplate |
| Response time | Application-specific | < 2 s (regulation), < 5 s (peak shaving) |
| Power quality | IEEE 519 | THD < 3%, PF > 0.99 |
| Anti-islanding | IEEE 1547 / IEC 62116 | Trip < 2 s |

### Phase 6: Integrated System Test (Day 10–12)

Run the **complete system as it will operate in production** for 72 hours continuously:

1. Automated dispatch schedule executes without manual intervention
2. All revenue-stacking functions tested (peak shaving + frequency response + reserve)
3. Thermal management maintains cell temperature in 20–35 °C band under full cycling
4. No BMS or PCS fault codes persist for more than 5 minutes
5. Energy meter accuracy verified against revenue-grade meter (Class 0.2S)

**Gate criterion:** 72 hours of stable operation with ≥ 95% availability. Any forced outage resets the clock.

### Phase 7: Handover and Documentation (Day 12–14)

The commissioning is not complete until **documentation is delivered and accepted**:

1. **Commissioning report** signed by EPC, owner, and manufacturer representative — this is the **warranty start document**
2. **As-built drawings** reflecting actual field installation (not design drawings)
3. **Protection relay settings** file, HMI access credentials, and spare parts list
4. **O&M manual** with troubleshooting decision trees and emergency procedures
5. **Training certificate** — operations team completed minimum 16 hours of hands-on training
6. **Performance baseline** — recorded SoH, RTE, and capacity as the Year 0 reference for degradation tracking

## Common Commissioning Failures and How to Avoid Them

| Failure Mode | Root Cause | Prevention |
|-------------|-----------|------------|
| Cell imbalance at first charge | Transport vibration, prolonged storage at 0% SoC | Require ≤ 6-month storage, SoC 30–50% at delivery |
| Busbar overheating | Insufficient torque, mismatched contact surfaces | 100% torque verification with calibrated tool, thermal imaging during hot commissioning |
| BMS-EMS communication dropout | Grounding loops, shield termination errors | Single-point shield grounding, fiber optic backbone for long runs |
| Protection relay nuisance trip | CT polarity reversed, setpoint too sensitive | Secondary injection test before energization, coordinate setpoints with utility |
| RTE below guarantee | HVAC parasitic load underestimated, high standby consumption | Measure auxiliary load separately, include in RTE calculation per IEC 62933-2 |
| Capacity shortfall | Cell degradation during storage, BMS SoC calibration error | Factory capacity test before shipment, field recalibration after thermal soak |

## Standards Reference

| Standard | Scope |
|----------|-------|
| IEC 62933-5-2 | BESS commissioning and field acceptance testing |
| IEC 62619 | Cell and module safety requirements |
| IEC 62116 | Anti-islanding test procedure |
| IEEE 1547 | Grid interconnection requirements |
| IEEE 519 | Power quality harmonics |
| GB/T 36276-2023 | Chinese utility-scale BESS technical specification |
| UL 9540/9540A | North American system-level safety and fire testing |

## Conclusion

A disciplined **7-phase commissioning process** — from site readiness to 72-hour integrated test — is the difference between a BESS that performs to spec for 10+ years and one that generates warranty disputes from day one. Budget **12–14 days** for a typical 1–5 MWh system, staff it with qualified commissioning engineers (not just installation electricians), and never skip the thermal soak test at first charge.

If you are planning a C&I or grid-scale BESS project, our [C&I Battery Cabinets](/products/ci-battery-cabinets) and [Energy Storage Systems](/products/energy-storage-system) ship with full commissioning documentation and IEC 62619 / GB/T 36276-2023 compliance packages. [Contact our engineering team](/contact) to discuss your project timeline and commissioning requirements.`
  };

  console.log("=== Step 2: Inserting EN translation ===");
  const enRes = await fetch(`${SUPABASE_URL}/rest/v1/blog_article_translations`, {
    method: "POST",
    headers: {
      "apikey": ANON_KEY,
      "Authorization": `Bearer ${ANON_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(enData)
  });

  if (!enRes.ok) {
    const errText = await enRes.text();
    console.error("EN translation insert failed:", enRes.status, errText);
    process.exit(1);
  }
  console.log("EN translation inserted.");

  // Step 3: Insert Chinese translation
  const zhData = {
    article_id: articleId,
    locale: "zh",
    category: "技术指南",
    title: "储能系统调试清单：BESS 项目交付的分步指南（2026）",
    description: "一份全面的 BESS 调试清单，涵盖送电前检查、冷态调试、热态调试、并网测试和移交。了解七阶段调试流程、关键验收试验、常见故障模式，以及符合 IEC 62619 和 GB/T 36276-2023 的项目文档要求。",
    body: `储能项目的成败系于调试环节。一套通过了出厂验收测试（FAT）的电池系统，在现场仍可能因运输损伤、安装失误、软件配置错误或并网问题而无法正常运行。本清单基于 IEC 62933-5-2、IEEE 2030.2 标准及电网级与工商业项目交付经验，系统梳理 **BESS 调试全流程**——从现场就绪到最终移交。

## 调试为何至关重要

调试不是走形式，而是千万级资产投运前的**最后一道防线**。行业数据显示，BESS 投运首年 **60%–70% 的保修索赔**可追溯至调试缺陷——未发现的电芯不均衡、汇流排扭矩不足、保护定值设置错误、固件集成不完整等。

结构化的调试流程应实现三大目标：

| 目标 | 指标 | 商业价值 |
|------|------|----------|
| 安全验证 | 首次充电零热失控 | 避免 500 万–5000 万事故责任 |
| 性能验证 | RTE ≥ 88%，容量 ≥ 98% 铭牌值 | 确保收益模型准确 |
| 保修激活 | 签署调试报告 | 启动 10 年保修期 |

## 七阶段调试流程

### 阶段一：现场就绪检查（第 1–2 天）

在任何设备通电前，先验证**物理和环境条件**：

1. 基础混凝土强度 ≥ C30，表面平整度 ≤ 3 mm/m
2. 接地电阻 ≤ 4 Ω（按 IEC 62305），等电位连接已验证
3. 电缆沟排水通畅，防鼠措施到位，火灾探测系统运行正常
4. 空调或液冷系统已调试，温度稳定运行 24 小时
5. 并网开关柜、保护继电器、计量 CT/PT 已安装并测试
6. 现场安防（围栏、摄像头、门禁）投入运行
7. 消防灭火系统压力测试通过，灭火剂钢瓶称重并记录

**放行准则：** 所有项必须通过后方可继续。任何未闭环项须有书面偏差报告及缓解措施。

### 阶段二：送电前检查（第 2–3 天）

本阶段对已安装的 BESS 进行**目视和机械验证**：

| 检查项 | 标准 | 验收准则 |
|--------|------|----------|
| 电芯/模组外观 | IEC 62619 | 无膨胀、漏液、变形 |
| 汇流排连接 | 厂家规格 | 扭矩标记，100% 用校准扳手验证 |
| 直流电缆 | IEC 62933-5-2 | 绝缘电阻 ≥ 1 MΩ，极性正确 |
| 交流电缆 | IEEE 837 | 相序正确，端接规范 |
| 集装箱密封 | IP54+ | 无渗水路径，密封条完好 |
| 通信线缆 | Modbus/IEC 61850 | 屏蔽层单端接地，按图端接 |
| 电池管理系统（BMS） | — | 固件版本确认，无运输故障码 |

**常见陷阱：** 汇流排扭矩是现场发现率最高的问题。热循环会松动安装时"差不多紧"的连接，在持续电流下失效。每个螺栓必须用油漆点标记扭矩验证。

### 阶段三：冷态调试（第 3–5 天）

**冷态调试**指在无直流母线电压状态下测试所有子系统，目标是验证控制逻辑、通信和保护功能。

1. **BMS 自检：** 验证电芯电压采集精度（±5 mV）、温度采集精度（±2 °C）、电流传感器零点校准
2. **PCS 自检：** 逆变器内部诊断、IGBT 健康检查、直流和交流接触器时序
3. **EMS 通信：** 云平台→EMS→PCS→BMS 端到端 ping，延迟 < 200 ms
4. **保护继电器测试：** 过流（50/51）、过压（59）、欠压（27）、频率（81O/81U）——注入二次测试电流，验证跳闸时间
5. **SCADA 点表映射：** 每个模拟量和开关量在 HMI 中正确读取

| 测试类别 | 测试数量 | 典型耗时 | 首次通过率 |
|---------|---------|---------|-----------|
| BMS 采集 | 12–48（每机架） | 2–4 小时 | 90–95% |
| PCS 自检 | 8–15 | 1–2 小时 | 95–98% |
| 保护继电器 | 6–12 | 3–6 小时 | 85–90% |
| 通信 | 20–50 | 4–8 小时 | 80–85% |

### 阶段四：热态调试——首次充电（第 5–7 天）

**这是风险最高的阶段。** BESS 首次通电，须执行保守的功率爬坡协议：

1. 充电前检查：确认所有断路器断开、接地已拆除、人员已撤离、消防值守到位
2. 闭合直流接触器，验证直流母线电压升至预期范围（计算值的 ±2%）
3. **以 0.1C 倍率首次充电**至 20% SoC，保持 30 分钟，监控电芯温度（包内 ΔT < 5 °C）
4. 以 0.2C 继续充至 50% SoC，记录电芯电压分布（最大偏差 < 50 mV）
5. 50% SoC 保持 2 小时——这是**热浸泡试验**，用于识别潜在电芯缺陷
6. 如稳定，以 0.3C 继续充至 90% SoC，然后均衡至 100%

**中止准则：** 任何电芯温度 > 55 °C、任何电芯电压偏差 > 100 mV、或任何 BMS 故障码 → 立即断开直流接触器并排查。

### 阶段五：并网与功能测试（第 7–10 天）

电池稳定性验证通过后，测试**电网交互和调度功能**：

1. **同期并网：** PCS 在 1 个周期内同步至电网，无涌流事件
2. **电能质量：** 满载 THD < 3%（IEEE 519），功率因数 > 0.99
3. **充放电循环：** 以 0.5C 运行 3 次完整循环（0–100% SoC），验证 RTE ≥ 88%
4. **容量测试：** 从 100% 放电至 20% SoC 满功率运行，实测能量 ≥ 98% 铭牌 kWh
5. **响应时间：** EMS 指令→满功率输出 < 2 秒（调频应用场景）
6. **孤岛保护测试：** 断开电网，验证防孤岛保护 2 秒内跳闸（IEEE 1547）
7. **黑启动：** 如适用，验证构网能力和负载接入序列

| 功能测试 | 标准 | 验收 |
|---------|------|------|
| RTE 测量 | IEC 62933-2 | ≥ 88%（LFP 系统） |
| 容量测试 | IEC 62933-2 | ≥ 98% 铭牌值 |
| 响应时间 | 按应用场景 | < 2 s（调频），< 5 s（削峰） |
| 电能质量 | IEEE 519 | THD < 3%，PF > 0.99 |
| 防孤岛 | IEEE 1547 / IEC 62116 | 跳闸 < 2 s |

### 阶段六：系统集成测试（第 10–12 天）

以**生产运行模式**连续运行 72 小时：

1. 自动调度计划无需人工干预即可执行
2. 所有收益叠加功能已测试（削峰 + 调频 + 备用）
3. 满功率循环下，热管理维持电芯温度在 20–35 °C 范围
4. BMS 或 PCS 故障码持续不超过 5 分钟
5. 能量表精度与关口表（0.2S 级）比对验证

**放行准则：** 72 小时稳定运行，可用率 ≥ 95%。任何强迫停运重新计时。

### 阶段七：移交与文档（第 12–14 天）

**文档交付并验收后**调试才算完成：

1. **调试报告**由 EPC、业主、厂家代表签字——这是**保修起始文件**
2. **竣工图纸**反映实际安装（非设计图纸）
3. **保护定值文件**、HMI 访问凭据、备品备件清单
4. **运维手册**含故障诊断决策树和应急预案
5. **培训证书**——运维团队完成至少 16 小时实操培训
6. **性能基线**——记录 SoH、RTE、容量作为衰减跟踪的 Year 0 参考

## 常见调试故障及预防

| 故障模式 | 根因 | 预防措施 |
|---------|------|----------|
| 首次充电电芯不均衡 | 运输振动、长期 0% SoC 存储 | 要求存储 ≤ 6 个月，交付时 SoC 30–50% |
| 汇流排过热 | 扭矩不足、接触面不匹配 | 100% 校准工具扭矩验证，热态调试期间红外成像 |
| BMS-EMS 通信中断 | 接地环路、屏蔽端接错误 | 屏蔽层单点接地，长距离采用光纤骨干 |
| 保护继电器误跳闸 | CT 极性接反、定值过于灵敏 | 送电前二次注入测试，与电网公司协调定值 |
| RTE 低于保证值 | 辅助功耗低估、待机功耗偏高 | 单独测量辅助负载，按 IEC 62933-2 纳入 RTE 计算 |
| 容量不足 | 存储期电芯衰减、BMS SoC 校准误差 | 出厂前容量测试，热浸泡后现场重新校准 |

## 标准参考

| 标准 | 适用范围 |
|------|----------|
| IEC 62933-5-2 | BESS 调试与现场验收测试 |
| IEC 62619 | 电芯和模组安全要求 |
| IEC 62116 | 防孤岛测试规程 |
| IEEE 1547 | 并网技术要求 |
| IEEE 519 | 电能质量谐波 |
| GB/T 36276-2023 | 中国电力储能用锂离子电池 |
| UL 9540/9540A | 北美系统级安全与火灾测试 |

## 结语

从现场就绪到 72 小时集成测试的**七阶段调试流程**，是 BESS 能否按设计运行 10 年以上、还是从第一天起就陷入保修纠纷的分水岭。一套典型的 1–5 MWh 系统应预留 **12–14 天**调试周期，由有资质的调试工程师（而非仅安装电工）执行，且绝不能跳过首次充电的热浸泡试验。

如果您正在规划工商业或电网级 BESS 项目，我们的 [C&I 电池储能柜](/products/ci-battery-cabinets) 和 [储能系统](/products/energy-storage-system) 随机提供完整调试文档和 IEC 62619 / GB/T 36276-2023 合规包。[联系我们的工程团队](/contact)，了解您的项目时间线和调试需求。`
  };

  console.log("=== Step 3: Inserting ZH translation ===");
  const zhRes = await fetch(`${SUPABASE_URL}/rest/v1/blog_article_translations`, {
    method: "POST",
    headers: {
      "apikey": ANON_KEY,
      "Authorization": `Bearer ${ANON_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(zhData)
  });

  if (!zhRes.ok) {
    const errText = await zhRes.text();
    console.error("ZH translation insert failed:", zhRes.status, errText);
    process.exit(1);
  }
  console.log("ZH translation inserted.");

  // Step 4: Verify
  console.log("=== Step 4: Verifying ===");
  const verifyRes = await fetch(`${SUPABASE_URL}/rest/v1/blog_articles?slug=eq.energy-storage-system-commissioning-checklist&select=id,slug,date`, {
    headers: {
      "apikey": ANON_KEY,
      "Authorization": `Bearer ${ANON_KEY}`
    }
  });
  const verifyData = await verifyRes.json();
  console.log("Verification:", JSON.stringify(verifyData, null, 2));

  console.log("\\n=== DONE ===");
  console.log("Article ID:", articleId);
  console.log("URL: /blog/energy-storage-system-commissioning-checklist");
}

main().catch(e => { console.error(e); process.exit(1); });

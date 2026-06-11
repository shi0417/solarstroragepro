# SolarStoragePRO Facebook 广告策略方案

## 一、当前问题诊断（从截图发现）

| 问题 | 严重程度 | 描述 |
|------|---------|------|
| 主页身份错误 | 🔴 致命 | 广告绑定的 Facebook 主页是 "Lojinha Mágica"（葡萄牙语"魔法小店"），与储能调频业务完全无关 |
| 推荐设置 | 🟡 高风险 | 广告系列分数100分=全部使用Meta推荐设置，不适合B2B工业品 |
| 看不到受众 | 🟡 高风险 | 截图未展示受众定向，但"推荐设置"通常意味着受众过宽、定位不精准 |
| 看不到竞价 | 🟡 中风险 | 可能使用自动竞价（CPM），对高客单价B2B不适用 |

---

## 二、竞价策略选择（核心问题答案）

**不是简单的"用竞价策略"，而是三层漏斗，每层有不同的竞价目标：**

### 第一层：认知层 Awareness（预算 20%）
- **竞价策略**：最低每千次展示费用（Lowest Cost per 1000 Impressions）
- **优化目标**：覆盖电网/电力行业决策者
- **落地页**：/technology（技术平台页）、/lp/frequency-regulation（广告落地页）
- **核心 KPI**：CPM $8-15

### 第二层：兴趣层 Consideration（预算 30%）
- **竞价策略**：单次点击费用最低（Lowest Cost per Link Click）
- **优化目标**：引导访问技术页和案例页的用户
- **受众**：已访问网站的用户（再营销/Retargeting）
- **落地页**：/case-center（调频案例）、/technology（技术平台）
- **核心 KPI**：CPC $1.5-3

### 第三层：转化层 Conversion（预算 50%）
- **竞价策略**：单次转化费用最低（Cost per Result Goal）
- **优化目标**：WhatsApp 对话 / Email 询盘 / 表单提交
- **受众**：高意向互动用户（看过3+页面/视频>10秒/滚动>50%）
- **落地页**：/lp/frequency-regulation（带CTA的广告落地页）
- **核心 KPI**：CPL $30-80（单次线索成本）

---

## 三、详细受众定向设置

### 3.1 第一层：认知层受众

**地区（Location）**
- 澳大利亚（Australia）- 优先级最高
- 德国、荷兰、英国（欧洲电网调频市场）
- 菲律宾、泰国、越南（东南亚新兴市场）

**年龄（Age）**
- 30-65岁

**兴趣定向（Interests）**
- Energy Storage、Battery Energy Storage System (BESS)
- Grid Frequency Regulation、Ancillary Services
- Renewable Energy、Solar Power
- Power Systems Engineering
- National Grid / TSO (Transmission System Operator)
- 公司：Tesla Energy、Fluence、Wartsila、ABB

**职位（Job Titles - B2B定向关键）**
- Chief Technology Officer
- Head of Engineering
- Project Manager (Energy)
- Procurement Manager
- Grid Operations Manager
- Energy Storage Specialist

**排除受众**
- 已访问网站的用户（留给第二层和第三层）
- 18-29岁（非决策者年龄层）

### 3.2 第二层：兴趣层受众（再营销）

**自定义受众 Custom Audiences**
- 网站访客（过去30天）- Meta Pixel 追踪
- 排除：停留时间<10秒的用户（低质量流量）
- 包含：滚动深度>50%的用户

**落地页细分**
- 访问过 /technology 的用户 → 推 /case-center
- 访问过 /case-center 的用户 → 推 /lp/frequency-regulation（带CTA）

### 3.3 第三层：转化层受众（高意向）

**自定义受众**
- 过去7天访问过3+页面的用户
- 看过视频广告>10秒的用户
- 点击过 WhatsApp 按钮但未发起对话的用户
- 订阅过 Newsletter 的用户

**类似受众 Lookalike**
- 基于高意向用户创建 1%-3% 的类似受众

---

## 四、广告创意方案（A/B测试矩阵）

### 4.1 认知层创意（3组测试）

| 组别 | 标题 | 文案要点 | 素材类型 | 落地页 |
|------|------|---------|---------|--------|
| A1 | 50MW FCR Battery System Deployed | 真实项目数据，建立信任 | 案例照片+数据叠加 | /case-center |
| A2 | <200ms Grid Response Technology | 技术差异化，吸引工程师 | BESS系统拓扑图 | /technology |
| A3 | IEC62619 Certified BESS for Frequency Regulation | 认证背书，降低风险 | 认证徽章组合图 | /technology |

### 4.2 兴趣层创意（3组测试）

| 组别 | 标题 | 文案要点 | 素材类型 | 落地页 |
|------|------|---------|---------|--------|
| B1 | How 50MW BESS Stabilizes Grid Frequency | 教育型内容，技术深度 | 调频响应曲线动画 | /technology |
| B2 | Australian Grid Operator Chooses Our BESS | 社会证明，真实客户 | 项目现场照片 | /case-center |
| B3 | BMS Architecture: 3-Layer Safety Design | 技术细节，工程师偏好 | BMS架构图 | /technology |

### 4.3 转化层创意（3组测试）

| 组别 | 标题 | 文案要点 | 素材类型 | 落地页 |
|------|------|---------|---------|--------|
| C1 | Get BESS Quote for Your Grid Project | 直接CTA，推动行动 | 产品集装箱照片+价格引导 | /lp/frequency-regulation |
| C2 | Free Technical Consultation on Frequency Regulation | 免费咨询，降低门槛 | 工程师对话场景 | /lp/frequency-regulation |
| C3 | Compare Our BESS vs Competitors | 对比策略，理性决策 | 对比参数表格图 | /lp/frequency-regulation |

---

## 五、Meta Pixel 事件追踪配置

在你的网站上需要埋入以下事件代码：

```javascript
// 基础页面浏览
fbq('track', 'PageView');

// 技术页面深度阅读（滚动>50%触发）
fbq('track', 'ViewContent', {
  content_name: 'Technology Page Deep Read',
  content_category: 'B2B Content',
  value: 5.00,
  currency: 'USD'
});

// WhatsApp 按钮点击
fbq('track', 'Contact', {
  content_name: 'WhatsApp Click',
  value: 20.00,
  currency: 'USD'
});

// Email 点击
fbq('track', 'Contact', {
  content_name: 'Email Click',
  value: 20.00,
  currency: 'USD'
});

// 案例页面浏览
fbq('track', 'ViewContent', {
  content_name: 'Case Study View',
  content_category: 'Case Center',
  value: 10.00,
  currency: 'USD'
});

// 落地页表单提交（如果有表单）
fbq('track', 'Lead', {
  content_name: 'Landing Page Form',
  value: 50.00,
  currency: 'USD'
});
```

---

## 六、预算分配建议（月预算 $3000-5000）

| 层级 | 日预算 | 月预算 | 竞价方式 | 预期结果 |
|------|--------|--------|---------|---------|
| Awareness | $20/天 | $600 | CPM最低 | 75K展示/月 |
| Consideration | $30/天 | $900 | CPC最低 | 450点击/月 |
| Conversion | $50/天 | $1500 | CPL最低 | 20-30线索/月 |
| 总计 | $100/天 | $3000 | - | - |

如果月预算提升到 $5000：
- Awareness: $30/天
- Consideration: $50/天
- Conversion: $87/天（$2610/月）
- 预期线索：35-50条/月

---

## 七、分阶段执行时间表

### Week 1：基础设施
- [ ] 修正 Facebook 主页身份为 SolarStoragePRO
- [ ] 安装 Meta Pixel 到网站所有页面
- [ ] 配置网站事件（PageView、ViewContent、Contact、Lead）
- [ ] 创建3层漏斗的3个广告系列

### Week 2：测试启动
- [ ] 启动 Awareness 系列（A1/A2/A3 3组素材同时跑）
- [ ] 启动 Consideration 系列（再营销受众）
- [ ] 每日检查 CPM/CPC，淘汰表现最差的素材

### Week 3：优化调整
- [ ] 根据数据调整受众（缩小/扩大兴趣范围）
- [ ] 上线 Conversion 系列
- [ ] 创建 Lookalike 受众

### Week 4：规模化
- [ ] 把预算向表现最好的广告组倾斜
- [ ] 新增2-3组创意变体
- [ ] 评估首月 CPL 和 ROI

---

## 八、关键数据监控指标

| 指标 | 目标值 | 低于此值说明 |
|------|--------|------------|
| CPM | $8-15 | >$20 = 受众太窄或竞争激烈 |
| CTR | 1.5-3% | <1% = 创意不吸引人 |
| CPC | $1.5-3 | >$5 = 受众不精准 |
| 落地页转化率 | 3-8% | <2% = 落地页有问题 |
| CPL | $30-80 | >$120 = 需要优化漏斗 |
| ROAS | 300%+ | <200% = 预算结构需调整 |

---

## 九、重要注意事项

1. **主页身份**：必须换成 SolarStoragePRO 品牌主页，当前绑定的 "Lojinha Mágica" 会导致广告被拒或用户不信任
2. **B2B vs B2C**：不要用电商思维做B2B广告，不要追求"购买"转化，追求"对话"和"询盘"
3. **再营销优先**：B2B决策周期长，再营销的ROI通常是新客的5-10倍
4. **素材专业性**：不要用 stock photo，用你们 PPT 里的技术图、项目现场图、系统拓扑图
5. **落地页一致性**：广告说什么，落地页第一屏就要展示什么，不要让用户"找"
6. **WhatsApp 响应速度**：广告带来流量后，WhatsApp 必须在5分钟内响应，否则线索流失

---

## 十、广告投放后台操作步骤

### Step 1：创建广告系列（Campaign）
1. 打开 Facebook Ads Manager
2. 点击"创建"（Create）
3. 选择目标：
   - Awareness层 → "知名度"（Awareness）
   - Consideration层 → "流量"（Traffic）
   - Conversion层 → "潜在客户"（Leads）或"消息互动"（Messages）
4. 命名：`2026-06-SSPRO-Awareness-AU`
5. 预算类型：广告系列预算（CBO）或广告组预算（ABO）都行，新手建议 ABO

### Step 2：设置广告组（Ad Set）
1. 地区：Australia（初始测试市场）
2. 年龄：30-65
3. 语言：English
4. 详细定向：
   - 包含：Energy Storage、Battery Energy Storage、Grid Operations
   - 职位：Chief Technology Officer、Head of Engineering、Project Manager
5. 版位：只选 Facebook Feed 和 Instagram Feed（排除Audience Network和Messenger）
6. 竞价：根据层级选择（见第二节）

### Step 3：创建广告（Ad）
1. 身份：选择正确的 SolarStoragePRO 主页
2. 格式：单图或轮播（Carousel）
3. 文案：使用方案中的A/B测试文案
4. 行动号召按钮：
   - Awareness → "了解更多"（Learn More）
   - Consideration → "查看详情"（See More）
   - Conversion → "发消息"（Send Message）或"联系我们"（Contact Us）
5. 落地页 URL：对应层级的落地页

### Step 4：发布与监控
1. 检查所有设置 → 发布
2. 前24小时不调整（学习期）
3. 48小时后查看数据，CPC/CPM异常的组暂停
4. 每3天优化一次

---

*文档创建时间：2026年6月2日*
*适用对象：SolarStoragePRO B2B BESS储能调频业务*
*目标市场：澳大利亚、欧洲、东南亚电网运营商及集成商*

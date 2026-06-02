export type CaseStudy = {
  id: string;
  titleEn: string;
  titleZh: string;
  date: string;
  location: string;
  flag: string;
  imageSrc: string;
  descEn: string;
  descZh: string;
  tag: string;
  stats: { labelEn: string; labelZh: string; value: string; icon: string }[];
};

export const CASES: CaseStudy[] = [
  {
    id: "australia-fcr-50mw",
    titleEn: "50MW / 100MWh FCR Grid Battery — New South Wales, Australia",
    titleZh: "澳大利亚新南威尔士州 50MW/100MWh 一次调频储能项目",
    date: "2024-11",
    location: "New South Wales, Australia",
    flag: "🇦🇺",
    imageSrc: "/images/ppt/06-projects/slide24_projects_01.jpg",
    descEn:
      "SolarStorage Pro delivered a 50MW / 100MWh containerized BESS for primary frequency control (FCR) under the FCAS market in NEM (National Electricity Market). The system uses 25× 2MWh battery containers with integrated PCS, achieving &lt;200ms full-power response and participating in both regulation raise and lower markets simultaneously.",
    descZh:
      "SolarStorage Pro 为澳大利亚国家电力市场（NEM）一次调频（FCAS）辅助服务交付了一套50MW/100MWh集装箱式储能系统。系统由25台2MWh电池集装箱组成，集成PCS，实现200ms以内满功率响应，同时参与调频升和调频降两个市场。",
    tag: "FCR · FCAS",
    stats: [
      { labelEn: "System Capacity", labelZh: "系统容量", value: "50MW / 100MWh", icon: "⚡" },
      { labelEn: "Response Time", labelZh: "响应时间", value: "≤180ms", icon: "⏱" },
      { labelEn: "Annual FCAS Revenue", labelZh: "年辅助服务收益", value: "AUD 8.2M+", icon: "💰" },
      { labelEn: "Availability", labelZh: "系统可用率", value: "99.4%", icon: "📈" },
    ],
  },
  {
    id: "europe-afrr-30mw",
    titleEn: "30MW / 60MWh aFRR Balancing Unit — Northern Europe",
    titleZh: "北欧 30MW/60MWh 二次调频（aFRR）调度单元",
    date: "2024-06",
    location: "Northern Europe",
    flag: "🇪🇺",
    imageSrc: "/images/ppt/06-projects/slide25_projects_01.jpg",
    descEn:
      "Deployed as a fully automated aFRR (automatic Frequency Restoration Reserve) unit for a European transmission system operator, this 30MW project provides symmetrical regulation capacity for grid balancing. The system is remotely prequalified and dispatched via ENTSO-E compatible SCADA interface, meeting EN 50549 grid connection requirements.",
    descZh:
      "本项目作为全自动二次调频（aFRR）单元，为欧洲输电系统运营商提供对称调频容量。30MW系统通过ENTSO-E兼容的SCADA接口进行远程预认证和调度，满足EN 50549并网要求，实现电网自动平衡调节。",
    tag: "aFRR · TSO",
    stats: [
      { labelEn: "System Capacity", labelZh: "系统容量", value: "30MW / 60MWh", icon: "⚡" },
      { labelEn: "Response Time", labelZh: "响应时间", value: "≤200ms", icon: "⏱" },
      { labelEn: "Prequalification", labelZh: "预认证市场", value: "TSO Certified", icon: "🏅" },
      { labelEn: "Cycle Life Projected", labelZh: "预计循环寿命", value: "7,200 cycles", icon: "🔁" },
    ],
  },
  {
    id: "southeast-asia-25mw",
    titleEn: "25MW / 50MWh Primary Reserve BESS — Southeast Asia",
    titleZh: "东南亚 25MW/50MWh 电网一次备用储能项目",
    date: "2025-03",
    location: "Southeast Asia",
    flag: "🌏",
    imageSrc: "/images/ppt/06-projects/slide24_projects_02.jpg",
    descEn:
      "This project integrates a 25MW battery storage system with an existing 200MW combined-cycle power plant in Southeast Asia, providing spinning reserve and primary frequency response services. The BESS responds to under-frequency events faster than the gas turbine ramp capability, significantly improving grid stability during N-1 contingency scenarios.",
    descZh:
      "本项目将25MW储能系统与东南亚某200MW联合循环燃气电厂集成，提供旋转备用和一次频率响应服务。储能系统在低频事件中的响应速度远超燃气轮机爬坡能力，显著提升了N-1故障场景下的电网稳定性。",
    tag: "Primary Reserve · Grid Integration",
    stats: [
      { labelEn: "System Capacity", labelZh: "系统容量", value: "25MW / 50MWh", icon: "⚡" },
      { labelEn: "Response Time", labelZh: "响应时间", value: "≤150ms", icon: "⏱" },
      { labelEn: "Grid Integration", labelZh: "电厂集成", value: "200MW CCGT", icon: "🏭" },
      { labelEn: "Frequency Stabilized", labelZh: "频率稳定提升", value: "+42% vs baseline", icon: "📊" },
    ],
  },
];

/* ── Extended detail data for individual case pages ─────────────────────────── */

export type CaseDetail = CaseStudy & {
  challengeEn: string;
  challengeZh: string;
  solutionEn: string;
  solutionZh: string;
  technicalSpecsEn: { k: string; v: string }[];
  technicalSpecsZh: { k: string; v: string }[];
  outcomeEn: string[];
  outcomeZh: string[];
  galleryImages: string[];
  freqImages: string[];
};

export const CASE_DETAILS: Record<string, CaseDetail> = {
  "australia-fcr-50mw": {
    ...CASES[0],
    challengeEn:
      "The NEM grid was experiencing increasing frequency volatility due to rapid solar and wind penetration. Traditional thermal generators could not ramp fast enough to maintain the 50Hz ±0.5Hz operating band during sudden generation or load events. The client needed a solution that could be prequalified for FCAS markets and deliver consistent, auditable performance data.",
    challengeZh:
      "由于光伏和风电快速渗透，澳大利亚国家电力市场（NEM）频率波动日益加剧。传统火电机组的爬坡速度无法在发电或负荷突变时将频率维持在50Hz±0.5Hz的安全运行范围内。客户需要一套能通过FCAS市场预认证、并能提供持续可审计性能数据的解决方案。",
    solutionEn:
      "We deployed 25× 2MWh battery containers arranged in 5 rows of 5, each with an integrated 2MW PCS unit. The EMS platform monitors NEM frequency at 10ms intervals and dispatches power symmetrically within 180ms. The system is connected to AEMO via a dedicated fiber link and interfaces directly with the SCADA system for automated dispatch and performance reporting.",
    solutionZh:
      "我们部署了25台2MWh电池集装箱，按5×5阵列排列，每台集成2MW PCS单元。EMS平台以10ms间隔监测NEM频率，在180ms内对称调度功率。系统通过专用光纤链路与AEMO连接，直接与SCADA系统接口，实现自动调度和性能报告。",
    technicalSpecsEn: [
      { k: "Total Power", v: "50MW (25 × 2MW PCS)" },
      { k: "Total Energy", v: "100MWh (25 × 4MWh containers)" },
      { k: "Cell Technology", v: "314Ah LFP, liquid-cooled" },
      { k: "Container Type", v: "20ft ISO containers, IP54" },
      { k: "AC Voltage", v: "33kV grid connection" },
      { k: "Response Speed", v: "≤180ms full-power injection" },
      { k: "Communication", v: "DNP3 over TCP/IP to AEMO" },
      { k: "Footprint", v: "~6,000 m²" },
    ],
    technicalSpecsZh: [
      { k: "总功率", v: "50MW（25台×2MW PCS）" },
      { k: "总能量", v: "100MWh（25台×4MWh集装箱）" },
      { k: "电芯技术", v: "314Ah磷酸铁锂，液冷" },
      { k: "集装箱类型", v: "20尺ISO标准箱，IP54" },
      { k: "交流电压", v: "33kV并网" },
      { k: "响应速度", v: "≤180ms满功率注入" },
      { k: "通信协议", v: "DNP3 over TCP/IP接入AEMO" },
      { k: "占地面积", v: "约6,000平方米" },
    ],
    outcomeEn: [
      "System achieved full FCAS prequalification within 3 weeks of commissioning",
      "Response time consistently 180ms — 10% faster than market requirement",
      "Annual FCAS revenue of AUD 8.2M+ in first operating year",
      "System availability >99.4% over 12-month operating period",
      "Zero unplanned outages; two scheduled maintenance windows completed on time",
    ],
    outcomeZh: [
      "系统在调试完成后3周内通过FCAS完整预认证",
      "响应时间稳定保持180ms——比市场要求快10%",
      "首个运营年度FCAS收益超澳元820万",
      "12个月运营期系统可用率超99.4%",
      "零计划外停运，两次计划维护均按时完成",
    ],
    galleryImages: [
      "/images/ppt/06-projects/slide24_projects_01.jpg",
      "/images/ppt/06-projects/slide24_projects_02.jpg",
      "/images/ppt/06-projects/slide24_projects_03.jpg",
    ],
    freqImages: [
      "/images/ppt/03-freq-regulation/slide10_freq-regulation_01.jpg",
      "/images/ppt/03-freq-regulation/slide23_freq-regulation_01.png",
    ],
  },

  "europe-afrr-30mw": {
    ...CASES[1],
    challengeEn:
      "A Northern European TSO required a new balancing resource capable of providing symmetrical aFRR capacity in the 30-second-to-15-minute timeframe. The solution needed to be fully automated, remotely prequalified, and able to switch between regulation raise and regulation lower within a single activation event. Harsh winter temperatures (down to -30°C) imposed stringent thermal management requirements.",
    challengeZh:
      "北欧某输电系统运营商需要一种新型平衡资源，能够在30秒至15分钟时间框架内提供对称的二次调频（aFRR）容量。解决方案需完全自动化、可远程预认证，并能在单次激活事件中切换调频升/降模式。严酷的冬季低温（最低-30°C）对热管理系统提出了严苛要求。",
    solutionEn:
      "Our 30MW / 60MWh system uses 15× 2MWh containers with active thermal management rated to -30°C ambient operation. The EMS integrates with the TSO's ENTSO-E compatible balancing platform via a certified API, handling automatic set-point following, performance monitoring, and compliance reporting. The system passed the TSO's symmetrical prequalification test in a single test session.",
    solutionZh:
      "我们的30MW/60MWh系统由15台2MWh集装箱组成，配备额定-30°C环境运行的主动热管理系统。EMS通过认证API与TSO的ENTSO-E兼容平衡平台集成，自动处理设定点跟踪、性能监控和合规报告。系统在单次测试中通过了TSO的对称预认证测试。",
    technicalSpecsEn: [
      { k: "Total Power", v: "30MW (15 × 2MW PCS)" },
      { k: "Total Energy", v: "60MWh (15 × 4MWh containers)" },
      { k: "Cell Technology", v: "314Ah LFP, liquid-cooled + heating" },
      { k: "Min. Operating Temp", v: "-30°C (with active heating)" },
      { k: "Grid Connection", v: "110kV via step-up transformer" },
      { k: "Communication", v: "IEC 61968 / ENTSO-E API" },
      { k: "Activation Type", v: "Symmetrical ±30MW" },
      { k: "Prequalification", v: "TSO certified — aFRR Pool" },
    ],
    technicalSpecsZh: [
      { k: "总功率", v: "30MW（15台×2MW PCS）" },
      { k: "总能量", v: "60MWh（15台×4MWh集装箱）" },
      { k: "电芯技术", v: "314Ah磷酸铁锂，液冷+加热" },
      { k: "最低运行温度", v: "-30°C（主动加热）" },
      { k: "并网电压", v: "110kV（经升压变压器）" },
      { k: "通信协议", v: "IEC 61968 / ENTSO-E API" },
      { k: "激活类型", v: "对称 ±30MW" },
      { k: "预认证状态", v: "TSO认证 — aFRR调频池" },
    ],
    outcomeEn: [
      "Passed TSO symmetrical prequalification test on first attempt",
      "200ms response time met in all 14,000+ activation events in year one",
      "System operated through -27°C ambient without performance degradation",
      "Annual aFRR revenue exceeded project ROI target by 18%",
      "Zero battery safety incidents over full operating period",
    ],
    outcomeZh: [
      "首次即通过TSO对称预认证测试",
      "第一年14,000+次激活事件中200ms响应时间全部达标",
      "系统在-27°C环境下运行无性能衰减",
      "年度aFRR收益超项目ROI目标18%",
      "整个运营期间零电池安全事故",
    ],
    galleryImages: [
      "/images/ppt/06-projects/slide25_projects_01.jpg",
      "/images/ppt/06-projects/slide25_projects_02.jpg",
      "/images/ppt/06-projects/slide24_projects_03.jpg",
    ],
    freqImages: [
      "/images/ppt/03-freq-regulation/slide11_freq-regulation_01.jpg",
      "/images/ppt/03-freq-regulation/slide23_freq-regulation_02.png",
    ],
  },

  "southeast-asia-25mw": {
    ...CASES[2],
    challengeEn:
      "The combined-cycle power plant operator needed to improve grid frequency response without adding new generation capacity. The island grid's isolated nature made N-1 contingency events particularly destabilizing. Existing thermal plant ramp rates (5MW/min) were insufficient for modern grid stability requirements. High ambient temperatures (up to 45°C) and coastal humidity required a robust thermal and corrosion protection design.",
    challengeZh:
      "某联合循环燃气电厂运营商需要在不增加新发电容量的前提下提升电网调频响应能力。孤立电网的特性使N-1故障事件的扰动特别严重。现有火电机组爬坡速率（5MW/分钟）已无法满足现代电网稳定性需求。高达45°C的环境温度和沿海湿度对热管理和防腐设计提出了严苛要求。",
    solutionEn:
      "We integrated a 25MW / 50MWh BESS alongside the plant's existing 33kV busbar, with a dedicated power island controller that coordinates between the gas turbine EMS and the battery EMS. When frequency drops below 49.5Hz, the BESS injects power within 150ms — 20× faster than the gas turbine can ramp. The system uses IP55-rated containers with enhanced corrosion protection coatings for coastal environments.",
    solutionZh:
      "我们在电厂现有33kV母排旁集成了25MW/50MWh储能系统，配备专用电力孤岛控制器，协调燃气轮机EMS与电池EMS。当频率下降到49.5Hz以下时，储能系统在150ms内完成功率注入——比燃气轮机爬坡速度快20倍。系统采用IP55集装箱，配备增强型海岸防腐涂层。",
    technicalSpecsEn: [
      { k: "Total Power", v: "25MW (integrated with 200MW CCGT)" },
      { k: "Total Energy", v: "50MWh" },
      { k: "Cell Technology", v: "314Ah LFP, enhanced tropical cooling" },
      { k: "Container IP Rating", v: "IP55 — coastal environment" },
      { k: "Max Ambient", v: "+45°C design point" },
      { k: "Trigger Frequency", v: "Configurable (default: 49.5Hz)" },
      { k: "Response Time", v: "≤150ms (150ms faster than GT ramp)" },
      { k: "Integration", v: "DCS interface with gas turbine EMS" },
    ],
    technicalSpecsZh: [
      { k: "总功率", v: "25MW（与200MW联合循环机组集成）" },
      { k: "总能量", v: "50MWh" },
      { k: "电芯技术", v: "314Ah磷酸铁锂，强化热带散热" },
      { k: "集装箱防护等级", v: "IP55 — 海岸环境" },
      { k: "最高环境温度", v: "+45°C设计工况" },
      { k: "触发频率", v: "可配置（默认：49.5Hz）" },
      { k: "响应时间", v: "≤150ms（比燃气轮机爬坡快150ms）" },
      { k: "集成方式", v: "DCS接口与燃气轮机EMS互联" },
    ],
    outcomeEn: [
      "Frequency nadir improved from 48.8Hz to 49.4Hz during N-1 events",
      "Grid frequency stability index improved +42% vs pre-installation baseline",
      "Response time 150ms — 20× faster than gas turbine ramp capability",
      "Plant spinning reserve requirement reduced, saving fuel costs annually",
      "System operating at 99.6% availability in tropical climate conditions",
    ],
    outcomeZh: [
      "N-1故障事件中频率最低点从48.8Hz提升至49.4Hz",
      "与安装前基线相比，电网频率稳定指数提升+42%",
      "响应时间150ms——比燃气轮机爬坡能力快20倍",
      "电厂旋转备用需求降低，每年节省燃料成本",
      "系统在热带气候条件下可用率99.6%",
    ],
    galleryImages: [
      "/images/ppt/06-projects/slide24_projects_02.jpg",
      "/images/ppt/06-projects/slide25_projects_02.jpg",
      "/images/ppt/06-projects/slide24_projects_03.jpg",
    ],
    freqImages: [
      "/images/ppt/03-freq-regulation/slide23_freq-regulation_03.jpg",
      "/images/ppt/03-freq-regulation/slide12_freq-regulation_02.png",
    ],
  },
};

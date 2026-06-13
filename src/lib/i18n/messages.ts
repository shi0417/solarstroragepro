import type { Locale } from "@/lib/locale";
import type { NavItem } from "@/components/site/nav-config";

export type Messages = {
  meta: { title: string; description: string };
  header: {
    contactCta: string;
    tagline: string;
    mobileQuote: string;
    menuOpen: string;
    menuClose: string;
    overlayClose: string;
    navAria: string;
    viewAll: string;
  };
  nav: NavItem[];
  hero: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    subtitle: string;
    trustSignals: string[];
    ctaPrimary: string;
    ctaSecondary: string;
  };
  trustBar: {
    items: { label: string; icon: string }[];
  };
  painPoints: {
    heading: string;
    sub: string;
    items: { icon: string; title: string; body: string }[];
  };
  statsBar: {
    items: { value: string; label: string; desc: string }[];
  };
  products: {
    heading: string;
    sub: string;
    items: { name: string; desc: string; tag: string; href?: string }[];
  };
  features: {
    heading: string;
    sub: string;
    items: { icon: string; title: string; body: string }[];
  };
  testimonials: {
    heading: string;
    sub: string;
    items: { quote: string; name: string; role: string; project: string }[];
  };
  anchor: {
    caseCenterHeading: string;
    caseCenterSub: string;
    resourcesSub: string;
    companySub: string;
    serviceSub: string;
    companyStats: { k: string; v: string; d: string }[];
    postTeaser: string;
  };
  cta: {
    title: string;
    sub: string;
    whatsappBtn: string;
    emailBtn: string;
    response: string;
  };
  footer: {
    rights: string;
    stack: string;
  };
  sticky: {
    quickContact: string;
    aiTitle: string;
    aiClose: string;
    aiWelcome: string;
    aiFallback: string;
    aiNetworkError: string;
    aiThinking: string;
    aiPlaceholder: string;
    aiSend: string;
    aiCloseMobile: string;
  };
  wechat: {
    title: string;
    hint: string;
    missing: string;
  };
};

const en: Messages = {
  meta: {
    title: "SolarStorage Pro | Battery Energy Storage for Frequency Regulation & Grid Stability",
    description:
      "Leading BESS manufacturer specializing in grid frequency regulation, peak shaving, and energy arbitrage. IEC/CE certified, deployed in 50+ countries. Get a free proposal.",
  },
  header: {
    contactCta: "Get a Quote",
    tagline: "Battery Energy Storage · Grid Frequency Regulation · Global",
    mobileQuote: "Get a Quote",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    overlayClose: "Close menu overlay",
    navAria: "Mobile navigation",
    viewAll: "View all",
  },
  nav: [
    {
      label: "Products",
      href: "/#products",
      children: [
        { label: "Grid-Scale BESS Container", href: "/products/energy-storage-system" },
        { label: "C&I Battery Cabinets", href: "/products/ci-battery-cabinets" },
        { label: "Residential All-in-One ESS", href: "/products/residential-ess" },
        { label: "PCS / Inverter Substation", href: "/products/pcs" },
        { label: "Solar Panels", href: "/products/solar-panels" },
      ],
    },
    { label: "Technology", href: "/technology" },
    {
      label: "Solutions",
      href: "/#solutions",
      children: [
        {
          label: "Grid Frequency Regulation (FCR/aFRR)",
          href: "/solutions/grid-level-bess",
        },
        {
          label: "Data Center Energy Storage",
          href: "/solutions/data-center-energy-storage",
        },
      ],
    },
    { label: "Cases", href: "/case-center" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ],
  hero: {
    badge: "Frequency Regulation · BESS Specialist",
    titleLine1: "The Energy Storage Specialist for",
    titleHighlight: "Grid Frequency Regulation",
    subtitle:
      "We design, manufacture, and deploy battery energy storage systems engineered for fast-response frequency regulation — helping grid operators maintain stability and maximize renewable integration.",
    trustSignals: [
      "IEC / CE / UL Certified",
      "Deployed in 50+ Countries",
      "24-Hour Technical Response",
    ],
    ctaPrimary: "Get Free Proposal",
    ctaSecondary: "Download Datasheet",
  },
  trustBar: {
    items: [
      { label: "IEC Certified", icon: "shield" },
      { label: "CE Certified", icon: "award" },
      { label: "UL Listed", icon: "shield" },
      { label: "ISO 9001", icon: "factory" },
      { label: "50+ Countries", icon: "globe" },
    ],
  },
  painPoints: {
    heading: "Why Frequency Regulation Matters",
    sub: "Grid operators face real challenges. Our BESS solutions are purpose-built to solve them.",
    items: [
      {
        icon: "clock",
        title: "Sub-Second Response Required",
        body: "Grid frequency deviations must be corrected within milliseconds. Our systems respond in <200ms, exceeding regulatory requirements.",
      },
      {
        icon: "trending",
        title: "Renewable Integration",
        body: "Solar and wind introduce volatility. Our storage systems smooth output fluctuations, enabling higher renewable penetration.",
      },
      {
        icon: "alert",
        title: "Aging Grid Infrastructure",
        body: "Traditional generators can't ramp fast enough. Battery storage provides instant, precise power injection and absorption.",
      },
      {
        icon: "chart",
        title: "Revenue Optimization",
        body: "Maximize ancillary service revenue through intelligent dispatch — frequency regulation, peak shaving, and energy arbitrage from a single asset.",
      },
    ],
  },
  statsBar: {
    items: [
      { value: "500MWh+", label: "Deployed Capacity", desc: "Battery storage installed worldwide" },
      { value: "200ms", label: "Response Time", desc: "Fastest in class frequency response" },
      { value: "50+", label: "Countries Served", desc: "Global project delivery network" },
      { value: "10+", label: "Years Experience", desc: "BESS engineering & manufacturing" },
    ],
  },
  products: {
    heading: "Battery Energy Storage Products",
    sub: "From residential to grid-scale — purpose-built cabinets and containers for frequency regulation, peak shaving, and energy management.",
    items: [
      {
        name: "C&I Battery Cabinets",
        desc: "100–500kWh modular cabinets with 1C/2C rate, liquid cooling, and fire suppression — ideal for commercial peak shaving and frequency response.",
        tag: "C&I",
        href: "/products/ci-battery-cabinets",
      },
      {
        name: "Grid-Scale BESS Container",
        desc: "1MW/2MWh+ containerized systems with integrated PCS, BMS, and EMS. Designed for utility-grade frequency regulation and ancillary services.",
        tag: "Utility",
        href: "/products/energy-storage-system",
      },
      {
        name: "Residential ESS",
        desc: "5–20kWh all-in-one systems with built-in inverter, supporting self-consumption optimization and grid support.",
        tag: "Residential",
        href: "/products/residential-ess",
      },
      {
        name: "Solar + Storage Integration",
        desc: "High-efficiency PV modules paired with storage for hybrid installations — maximize self-use and grid stability revenue.",
        tag: "Hybrid",
        href: "/products/solar-panels",
      },
    ],
  },
  features: {
    heading: "Why SolarStorage Pro for Frequency Regulation",
    sub: "Our systems are engineered specifically for the demands of grid ancillary services.",
    items: [
      {
        icon: "zap",
        title: "Ultra-Fast Response",
        body: "Sub-200ms frequency detection and power injection — faster than regulatory requirements in most markets worldwide.",
      },
      {
        icon: "shield",
        title: "Certified Safety",
        body: "IEC 62619, UL 9540A, NFPA 855 compliant. Cell-level BMS with thermal runaway prevention and multi-layer fire suppression.",
      },
      {
        icon: "clock",
        title: "Long Cycle Life",
        body: "Premium LFP cells rated for 8,000+ cycles at 1C. Predictive degradation modeling and proactive warranty management.",
      },
      {
        icon: "settings",
        title: "Smart EMS Integration",
        body: "AGC/FCAS-ready controller with real-time frequency monitoring, auto-dispatch algorithms, and multi-market stacking capability.",
      },
    ],
  },
  testimonials: {
    heading: "Trusted by Grid Operators Worldwide",
    sub: "Real projects, real results — hear from our clients.",
    items: [
      {
        quote: "SolarStorage Pro delivered a 10MW/20MWh BESS for our frequency regulation program. Response time was consistently under 200ms, and the system has been operating flawlessly for 18 months.",
        name: "James Richardson",
        role: "VP of Grid Operations",
        project: "50MW Frequency Regulation Project · Europe",
      },
      {
        quote: "Their technical team understood our requirements immediately. The containerized BESS was delivered on time and integrated seamlessly with our existing SCADA system.",
        name: "Mohammed Al-Farsi",
        role: "Director of Power Systems",
        project: "20MWh Peak Shaving · Middle East",
      },
      {
        quote: "We evaluated 6 BESS suppliers. SolarStorage Pro offered the best combination of cycle life guarantee, response speed, and after-sales support. Highly recommended.",
        name: "Dr. Kenji Tanaka",
        role: "Chief Technology Officer",
        project: "Microgrid + Frequency Support · Japan",
      },
    ],
  },
  anchor: {
    caseCenterHeading: "Case Center",
    caseCenterSub:
      "Real-world BESS deployments for frequency regulation, peak shaving, and renewable integration across 50+ countries.",
    resourcesSub: "Datasheets, technical whitepapers, certification documents, and system design guides.",
    companySub: "10+ years of battery storage R&D and manufacturing — 3.7 GWh annual capacity with vertically integrated production.",
    serviceSub: "Presales engineering, commissioning support, remote monitoring, and 24/7 technical assistance.",
    companyStats: [
      { k: "Annual capacity", v: "3.7 GWh+", d: "Battery manufacturing" },
      { k: "R&D experience", v: "10+ yrs", d: "BESS engineering" },
      { k: "Markets", v: "50+", d: "Countries & regions" },
    ],
    postTeaser: "Detailed case study coming soon — contact us for project data.",
  },
  cta: {
    title: "Ready to Deploy BESS for Frequency Regulation?",
    sub: "Tell us about your grid requirements — our engineers will design a customized solution and deliver a proposal within 48 hours.",
    whatsappBtn: "Chat on WhatsApp",
    emailBtn: "Send Email",
    response: "Average response time: under 24 hours on business days.",
  },
  footer: {
    rights: "SolarStorage Energy Tech · All rights reserved",
    stack: "Professional BESS manufacturer since 2014.",
  },
  sticky: {
    quickContact: "Quick contact",
    aiTitle: "AI product assistant",
    aiClose: "Close AI chat",
    aiWelcome:
      "Hi — I can help with BESS sizing, frequency regulation specs, and system configuration. How can I assist you?",
    aiFallback: "Sorry, no answer right now. Try again or contact our team.",
    aiNetworkError: "Network error — check your connection and retry.",
    aiThinking: "Analyzing your query…",
    aiPlaceholder: "e.g. What response time do your BESS systems offer?",
    aiSend: "Send",
    aiCloseMobile: "Close",
  },
  wechat: {
    title: "WeChat",
    hint: "Save your enterprise WeChat QR as",
    missing: "Image not found. Save the QR as wechat-qr.png in the public folder and refresh.",
  },
};

const zh: Messages = {
  meta: {
    title: "SolarStorage Pro | 储能调频专家 — 电网频率调节解决方案",
    description:
      "专注储能调频、削峰填谷、峰谷套利的领先BESS制造商。IEC/CE/UL认证，服务50+国家。获取免费方案。",
  },
  header: {
    contactCta: "获取报价",
    tagline: "电池储能 · 调频储能 · 全球服务",
    mobileQuote: "获取报价",
    menuOpen: "打开菜单",
    menuClose: "关闭菜单",
    overlayClose: "关闭菜单遮罩",
    navAria: "移动端导航",
    viewAll: "查看全部",
  },
  nav: [
    {
      label: "产品",
      href: "/#products",
      children: [
        { label: "电网级储能集装箱", href: "/products/energy-storage-system" },
        { label: "工商业储能柜", href: "/products/ci-battery-cabinets" },
        { label: "户用光储一体机", href: "/products/residential-ess" },
        { label: "PCS / 逆变升压站", href: "/products/pcs" },
        { label: "太阳能组件", href: "/products/solar-panels" },
      ],
    },
    { label: "技术平台", href: "/technology" },
    {
      label: "解决方案",
      href: "/#solutions",
      children: [
        {
          label: "电网调频储能（FCR/aFRR）",
          href: "/solutions/grid-level-bess",
        },
        {
          label: "数据中心储能解决方案",
          href: "/solutions/data-center-energy-storage",
        },
      ],
    },
    { label: "调频案例", href: "/case-center" },
    { label: "技术博客", href: "/blog" },
    { label: "联系", href: "/#contact" },
  ],
  hero: {
    badge: "调频储能 · BESS 专家",
    titleLine1: "专注电网调频的",
    titleHighlight: "储能系统解决方案专家",
    subtitle:
      "我们设计、制造并部署专为快速响应频率调节而优化的电池储能系统——帮助电网运营商维持稳定性，最大化可再生能源并网比例。",
    trustSignals: [
      "IEC / CE / UL 认证",
      "服务 50+ 个国家",
      "24小时技术响应",
    ],
    ctaPrimary: "免费获取方案",
    ctaSecondary: "下载产品资料",
  },
  trustBar: {
    items: [
      { label: "IEC 认证", icon: "shield" },
      { label: "CE 认证", icon: "award" },
      { label: "UL 认证", icon: "shield" },
      { label: "ISO 9001", icon: "factory" },
      { label: "50+ 国家", icon: "globe" },
    ],
  },
  painPoints: {
    heading: "为什么调频储能至关重要",
    sub: "电网运营商面临真实的挑战，我们的 BESS 方案专为解决这些痛点而生。",
    items: [
      {
        icon: "clock",
        title: "毫秒级响应要求",
        body: "电网频率偏差必须在毫秒内纠正。我们的系统响应时间 <200ms，超过大多数市场的法规要求。",
      },
      {
        icon: "trending",
        title: "新能源消纳",
        body: "光伏和风电带来波动性，我们的储能系统平滑输出波动，提高可再生能源渗透率。",
      },
      {
        icon: "alert",
        title: "电网基础设施老化",
        body: "传统发电机无法快速调节，电池储能提供瞬时精确的功率注入和吸收能力。",
      },
      {
        icon: "chart",
        title: "收益最大化",
        body: "通过智能调度最大化辅助服务收益——调频、削峰填谷、峰谷套利一机多用。",
      },
    ],
  },
  statsBar: {
    items: [
      { value: "500MWh+", label: "累计部署容量", desc: "全球安装储能系统" },
      { value: "200ms", label: "响应时间", desc: "同类最快频率响应" },
      { value: "50+", label: "服务国家", desc: "全球项目交付网络" },
      { value: "10+", label: "年行业经验", desc: "BESS 研发与制造" },
    ],
  },
  products: {
    heading: "电池储能产品线",
    sub: "从户用到电网级——专为调频、削峰填谷和能量管理定制的储能柜和集装箱系统。",
    items: [
      {
        name: "工商业储能柜",
        desc: "100–500kWh 模块化储能柜，支持 1C/2C 倍率、液冷和消防系统——适合工商业削峰填谷和频率响应。",
        tag: "工商业",
        href: "/products/ci-battery-cabinets",
      },
      {
        name: "电网级 BESS 集装箱",
        desc: "1MW/2MWh+ 集装箱式系统，集成 PCS、BMS、EMS，专为电网级频率调节和辅助服务设计。",
        tag: "电网级",
        href: "/products/energy-storage-system",
      },
      {
        name: "户用储能系统",
        desc: "5–20kWh 一体化系统，内置逆变器，支持自发自用优化和电网支撑。",
        tag: "户用",
        href: "/products/residential-ess",
      },
      {
        name: "光储一体化",
        desc: "高效光伏组件搭配储能系统，实现混合安装——最大化自用率和电网稳定收益。",
        tag: "光储一体",
        href: "/products/solar-panels",
      },
    ],
  },
  features: {
    heading: "为什么选择 SolarStorage Pro 做调频",
    sub: "我们的系统专为电网辅助服务的高要求而设计。",
    items: [
      {
        icon: "zap",
        title: "超快响应速度",
        body: "亚 200ms 频率检测和功率注入——快于全球大多数市场的法规要求。",
      },
      {
        icon: "shield",
        title: "权威安全认证",
        body: "IEC 62619、UL 9540A、NFPA 855 合规。电芯级 BMS 配备热失控预防和多层消防系统。",
      },
      {
        icon: "clock",
        title: "超长循环寿命",
        body: "优质 LFP 电芯，1C 倍率下 8000+ 次循环。预测性衰减建模和主动质保管理。",
      },
      {
        icon: "settings",
        title: "智能 EMS 集成",
        body: "AGC/FCAS 就绪控制器，实时频率监测、自动调度算法和多市场叠加能力。",
      },
    ],
  },
  testimonials: {
    heading: "全球电网运营商的信赖之选",
    sub: "真实项目，真实效果——听听客户怎么说。",
    items: [
      {
        quote: "SolarStorage Pro 为我们的调频项目交付了 10MW/20MWh BESS 系统。响应时间始终低于 200ms，已无故障运行 18 个月。",
        name: "James Richardson",
        role: "电网运营副总裁",
        project: "50MW 调频项目 · 欧洲",
      },
      {
        quote: "他们的技术团队立刻理解了我们的需求。集装箱式 BESS 按时交付，与现有 SCADA 系统无缝集成。",
        name: "Mohammed Al-Farsi",
        role: "电力系统总监",
        project: "20MWh 削峰填谷 · 中东",
      },
      {
        quote: "我们评估了 6 家 BESS 供应商。SolarStorage Pro 在循环寿命保证、响应速度和售后支持方面表现最佳。强烈推荐。",
        name: "Dr. Kenji Tanaka",
        role: "首席技术官",
        project: "微电网+频率支撑 · 日本",
      },
    ],
  },
  anchor: {
    caseCenterHeading: "案例中心",
    caseCenterSub:
      "50+ 个国家的真实 BESS 部署案例，涵盖调频、削峰填谷和新能源并网。",
    resourcesSub: "产品规格书、技术白皮书、认证文件和系统设计指南。",
    companySub: "10+ 年储能研发制造经验——3.7 GWh 年产能，垂直一体化生产。",
    serviceSub: "售前工程支持、交付调试、远程监控和 24/7 技术协助。",
    companyStats: [
      { k: "年产能", v: "3.7 GWh+", d: "电池制造" },
      { k: "研发经验", v: "10+ 年", d: "BESS 工程" },
      { k: "市场覆盖", v: "50+", d: "国家与地区" },
    ],
    postTeaser: "详细案例即将发布——联系我们获取项目数据。",
  },
  cta: {
    title: "准备部署调频储能系统？",
    sub: "告诉我们您的电网需求——我们的工程师将设计定制方案并在 48 小时内交付提案。",
    whatsappBtn: "WhatsApp 咨询",
    emailBtn: "发送邮件",
    response: "工作日平均响应时间：24小时内。",
  },
  footer: {
    rights: "光储能源科技 · 保留所有权利",
    stack: "专业 BESS 制造商，始创于 2014 年。",
  },
  sticky: {
    quickContact: "快捷联系",
    aiTitle: "AI 产品顾问",
    aiClose: "关闭对话",
    aiWelcome:
      "您好，我是 AI 产品顾问。可咨询 BESS 选型、调频技术参数和系统配置等问题。",
    aiFallback: "抱歉，暂时无法生成回答，请稍后再试或联系人工。",
    aiNetworkError: "网络异常，请检查连接后重试。",
    aiThinking: "正在分析您的问题…",
    aiPlaceholder: "例如：你们的 BESS 响应时间是多少？",
    aiSend: "发送",
    aiCloseMobile: "关闭窗口",
  },
  wechat: {
    title: "微信咨询",
    hint: "请将企业微信二维码保存为项目根目录",
    missing:
      "未检测到图片。请将二维码命名为 wechat-qr.png 放入 public 文件夹后刷新页面。",
  },
};

const byLocale: Partial<Record<Locale, Messages>> = { en, zh };

export function getMessages(locale: Locale): Messages {
  return byLocale[locale] ?? en;
}

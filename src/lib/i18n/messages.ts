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
    exploreProducts: string;
    requestDatasheet: string;
    videoSlotTitle: string;
    videoSlotHint: string;
  };
  products: {
    heading: string;
    sub: string;
    items: { name: string; desc: string; tag: string; href?: string }[];
  };
  features: {
    heading: string;
    sub: string;
    items: { title: string; body: string }[];
  };
  anchor: {
    blogSub: string;
    resourcesSub: string;
    companySub: string;
    serviceSub: string;
    companyStats: { k: string; v: string; d: string }[];
    postTeaser: string;
  };
  cta: {
    title: string;
    sub: string;
    button: string;
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
    title: "SolarStorage Pro | Integrated solar & storage solutions",
    description:
      "Residential and C&I PV + ESS, inverters, and energy management — stable grid integration and arbitrage.",
  },
  header: {
    contactCta: "Contact us",
    tagline: "Renewable Energy · Energy Storage · Global Trade",
    mobileQuote: "Get a quote",
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
        { label: "Residential all-in-one ESS", href: "/products/residential-ess" },
        { label: "C&I battery cabinets", href: "/#products" },
        { label: "Energy Storage System", href: "/products/energy-storage-system" },
      ],
    },
    {
      label: "Solutions",
      href: "/#solutions",
      children: [
        {
          label: "Data Center Energy Storage Solutions",
          href: "/solutions/data-center-energy-storage",
        },
        {
          label: "Grid-level Battery Energy Storage System (BESS)",
          href: "/solutions/grid-level-bess",
        },
      ],
    },
    { label: "Blog", href: "#blog" },
    {
      label: "Resources",
      href: "#resources",
      children: [
        { label: "R&D", href: "#resources" },
        { label: "Downloads", href: "#resources" },
      ],
    },
    {
      label: "Company",
      href: "#company",
      children: [
        { label: "Company Profile", href: "#company" },
        { label: "News & Events", href: "#company" },
      ],
    },
    { label: "Service", href: "#service" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    badge: "Battery Energy Storage · Solar Integration",
    exploreProducts: "Explore products",
    requestDatasheet: "Request datasheet",
    videoSlotTitle: "Hero video / WebGL slot",
    videoSlotHint:
      "Replace with a looping video or embedded player; use 1920×1080 dark industrial / clean-energy footage.",
  },
  products: {
    heading: "Core products",
    sub: "From components to system delivery across generation, storage, and EMS.",
    items: [
      {
        name: "Residential all-in-one ESS",
        desc: "1-16kwh modular packs, single/three-phase inverter fit, app monitoring and backup transfer.",
        tag: "Home",
        href: "/products/residential-ess",
      },
      {
        name: "C&I battery cabinets",
        desc: "100 kWh-class clusters, parallel-ready with peak-shaving strategies for campuses and microgrids.",
        tag: "C&I",
      },
      {
        name: "Energy Storage System",
        desc: "Includes Energy Storage System Pack / DC Liquid Cooling Container.",
        tag: "System",
        href: "/products/energy-storage-system",
      },
    ],
  },
  features: {
    heading: "Why us",
    sub: "Engineered delivery and digital O&M so your PV+ESS pays back for years.",
    items: [
      {
        title: "High conversion",
        body: "Multi-MPPT and wide voltage range for weak-light and complex rooftops.",
      },
      {
        title: "Safe BMS",
        body: "Cell-level balancing and thermal strategies for long cycles and code compliance.",
      },
      {
        title: "Smart dispatch",
        body: "EMS using tariffs and load forecasts — demand control and VPP-ready.",
      },
      {
        title: "Scalable stack",
        body: "Decoupled hardware/software to plug in live data and cloud policies later.",
      },
    ],
  },
  anchor: {
    blogSub: "Technical notes, use cases, and market trends — wire to Supabase or a headless CMS.",
    resourcesSub: "Whitepapers, certificates, manuals, and downloads hub.",
    companySub: "R&D, quality, and global delivery — add capacity, tenure, and investment stats here.",
    serviceSub: "Presales design, commissioning, warranty, and remote ops — connect tickets/SLA in Supabase.",
    companyStats: [
      { k: "Annual capacity", v: "3.7 GWh+", d: "Sample" },
      { k: "R&D experience", v: "10+ yrs", d: "Cells & BMS" },
      { k: "Markets", v: "50+", d: "Countries & regions" },
    ],
    postTeaser: "Sample teaser — link to real posts later.",
  },
  cta: {
    title: "Planning a solar + storage project?",
    sub: "Share your needs — our engineers will follow up on business days with sizing and ROI guidance.",
    button: "Email us",
  },
  footer: {
    rights: "SolarStorage Energy Tech · All rights reserved",
    stack: "Powered by Supabase — extend with auth, realtime data, and object storage.",
  },
  sticky: {
    quickContact: "Quick contact",
    aiTitle: "AI product assistant",
    aiClose: "Close AI chat",
    aiWelcome:
      "Hi — I can help with module efficiency, battery cycle life, and more. Answers use your Supabase knowledge base when configured.",
    aiFallback: "Sorry, no answer right now. Try again or contact our team.",
    aiNetworkError: "Network error — check your connection and retry.",
    aiThinking: "Generating from knowledge base…",
    aiPlaceholder: "e.g. Typical PV module efficiency?",
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
    title: "SolarStorage Pro | 光储一体化产品与方案",
    description:
      "家用与工商业光伏储能系统、逆变器与能源管理平台，助力清洁能源稳定并网与峰谷套利。",
  },
  header: {
    contactCta: "联系我们",
    tagline: "可再生能源 · 储能 · 全球贸易",
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
        { label: "户用光储一体机", href: "/products/residential-ess" },
        { label: "工商业储能柜", href: "/#products" },
        { label: "Energy Storage System", href: "/products/energy-storage-system" },
      ],
    },
    {
      label: "解决方案",
      href: "/#solutions",
      children: [
        {
          label: "数据中心储能解决方案",
          href: "/solutions/data-center-energy-storage",
        },
        { label: "电网级电池储能系统（BESS）", href: "/solutions/grid-level-bess" },
      ],
    },
    { label: "博客", href: "#blog" },
    {
      label: "资源",
      href: "#resources",
      children: [
        { label: "研发", href: "#resources" },
        { label: "下载", href: "#resources" },
      ],
    },
    {
      label: "公司",
      href: "#company",
      children: [
        { label: "公司简介", href: "#company" },
        { label: "新闻与活动", href: "#company" },
      ],
    },
    { label: "服务", href: "#service" },
    { label: "联系", href: "#contact" },
  ],
  hero: {
    badge: "储能系统 · 光储协同",
    exploreProducts: "了解产品",
    requestDatasheet: "索取资料",
    videoSlotTitle: "主视觉视频 / WebGL 位",
    videoSlotHint:
      "可替换为循环视频或第三方播放器；建议使用 1920×1080 暗调工业或新能源素材。",
  },
  products: {
    heading: "核心产品",
    sub: "从组件到系统级交付，覆盖发电、储能与能量管理全链路。",
    items: [
      {
        name: "户用光储一体机",
        desc: "1-16kwh 模块化电池，适配单相/三相逆变，APP 远程监控与备电切换。",
        tag: "家庭",
        href: "/products/residential-ess",
      },
      {
        name: "工商业储能柜",
        desc: "100 kWh 级簇，支持并机与峰谷策略，满足园区与微电网调度。",
        tag: "工商业",
      },
      {
        name: "Energy Storage System",
        desc: "包含 Energy Storage System Pack / DC Liquid Cooling Container",
        tag: "系统",
        href: "/products/energy-storage-system",
      },
    ],
  },
  features: {
    heading: "为什么选择我们",
    sub: "工程化交付与数字化运维并重，让光储系统真正产生长期收益。",
    items: [
      {
        title: "高效转换",
        body: "多路 MPPT 与宽电压范围，提升弱光与复杂屋顶场景发电量。",
      },
      {
        title: "安全 BMS",
        body: "电芯级均衡与热管理策略，满足长期循环与消防合规要求。",
      },
      {
        title: "智能调度",
        body: "基于电价与负荷预测的能量管理，支持需量控制与虚拟电厂接入。",
      },
      {
        title: "可扩展架构",
        body: "软硬件解耦，后续可接入 Supabase 实时数据与云端策略更新。",
      },
    ],
  },
  anchor: {
    blogSub: "技术解读、应用案例与行业趋势，可对接 Supabase 文章表或 Headless CMS。",
    resourcesSub: "白皮书、认证证书、安装手册与下载中心入口。",
    companySub: "研发制造、质量体系与全球交付能力，可在此放置产能、投资与年限等数据条。",
    serviceSub: "售前方案、交付调试、质保与远程运维。可将工单与 SLA 与 Supabase 后台打通。",
    companyStats: [
      { k: "Annual capacity", v: "3.7 GWh+", d: "示例数据" },
      { k: "R&D experience", v: "10+ yrs", d: "电池与 BMS" },
      { k: "Markets", v: "50+", d: "国家与地区" },
    ],
    postTeaser: "示例摘要 — 后续可链接真实文章。",
  },
  cta: {
    title: "准备规划您的光储项目？",
    sub: "留下需求，我们的工程师将在工作日与您联系，提供选型与收益测算建议。",
    button: "发送邮件",
  },
  footer: {
    rights: "光储能源科技 · 保留所有权利",
    stack: "本项目已接入 Supabase，可扩展鉴权、实时数据与对象存储。",
  },
  sticky: {
    quickContact: "快捷联系",
    aiTitle: "AI 产品顾问",
    aiClose: "关闭对话",
    aiWelcome:
      "您好，我是 AI 产品顾问。可向我咨询太阳能组件效率、储能电池寿命等问题；回答将结合您在 Supabase 中配置的知识库。",
    aiFallback: "抱歉，暂时无法生成回答，请稍后再试或联系人工。",
    aiNetworkError: "网络异常，请检查连接后重试。",
    aiThinking: "正在结合知识库生成回答…",
    aiPlaceholder: "例如：光伏组件效率一般多少？",
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

const byLocale: Record<Locale, Messages> = { en, zh };

export function getMessages(locale: Locale): Messages {
  return byLocale[locale] ?? en;
}

/**
 * Comprehensive translation key generation for ALL remaining pages.
 * Generates translations for 12 languages across 6 new message sections.
 * 
 * Usage: node scripts/generate-all-translations.js
 */

const fs = require('fs');
const path = require('path');

const MSG_DIR = path.join(__dirname, '..', 'src', 'messages');

// ────────────────────────────────────────────────────
// English base definitions for all new sections
// ────────────────────────────────────────────────────
const en = {
  // ── Energy Storage System product page ──
  productsEnergyStorage: {
    breadcrumbHome: "Home",
    breadcrumbProducts: "Products",
    badge: "Core product",
    title: "Energy Storage System",
    description: "Includes Energy Storage System Pack / DC Liquid Cooling Container — system-level delivery for high-power, long-life, and safe deployments.",
    certTitle: "Certifications",
    certDesc: "Common transport & safety standards",
    featuresTitle: "Features",
    featuresSub: "System-engineering features for scalable delivery: power coverage, lifetime consistency, redundant safety, and O&M friendliness.",
    features: [
      { t: "High power", b: "0.25P–2P coverage across power-type and energy-type battery containers." },
      { t: "Long lifetime", b: "Cell temperature delta: 2℃ within a pack, 5℃ across clusters — designed for 10-year calendar life." },
      { t: "Real safety", b: "Three-layer fire protection at pack/cluster/container levels; battery modules rated IP67." },
      { t: "Easy integration", b: "Modular design enables per-cluster unit architecture with no inter-cluster circulating current; supports independent maintenance and upgrades." },
      { t: "Flexible configuration", b: "Side-by-side or end-to-end layout options with flexible expansion." },
      { t: "Easy management", b: "Real-time data exchange with energy statistics, fault warnings, and thermal-runaway early warning." },
    ],
    specsTitle: "Specifications",
    specsSub: "Scroll horizontally on mobile to view all capacity variants.",
    specCornerLabel: "Parameter \\ Model",
    certFooter: "Certifications",
    ctaTitle: "Get a Custom Solution",
    ctaSub: "Tell us about your project — our engineers will design a custom solution within 48 hours.",
  },

  // ── Residential ESS product page ──
  productsResidentialEss: {
    back: "Back to home",
    badge: "Residential",
    pageTitle: "Residential ESS",
    pageSub: "Low-voltage stack & wall-mount packs, high-voltage systems, and all-in-one inverter + battery solutions.",
    categoriesTitle: "Product families",
    catLv: "Low-voltage (51.2V)",
    catLvDesc: "Stackable and wall-mounted batteries around 10kWh & 16kWh class.",
    catHv: "High-voltage (358.4V – 716.8V)",
    catHvDesc: "Systems for higher power and HV DC bus requirements.",
    catAio: "ESS all-in-one",
    catAioDesc: "Integrated inverter and battery for faster residential deployment.",
    gridTitle: "Products",
    viewHvsDetails: "View HVS high-voltage series details",
    viewAioDetails: "View ESS All-in-one series details",
    viewLfpDetails: "View LFP battery series details",
    details: "Details",
    // Product card data — keys map to zh translations for labels/specs
    products: [
      {
        key: "wallMount",
        title: "Wall-mounted battery",
        subtitle: "MDS-512200",
        specs: [
          { l: "Voltage", v: "25.6V-51.2V" },
          { l: "Capacity", v: "206Ah" },
          { l: "Energy", v: "5.12KWH-10.54KWH" },
          { l: "Cycle life", v: "6000 cycles" },
          { l: "Dimensions (mm)", v: "723 × 655 × 255" },
          { l: "Communication", v: "RS485 / RS232 / CAN" },
        ],
      },
      {
        key: "stackable",
        title: "Stackable battery",
        subtitle: "MDS-51314",
        specs: [
          { l: "Voltage", v: "51.2V" },
          { l: "Capacity", v: "314Ah" },
          { l: "Energy", v: "16.07kWh" },
          { l: "Cycle life", v: "8000 cycles" },
          { l: "Dimensions (mm)", v: "730 × 610 × 257" },
          { l: "Communication", v: "RS485 / RS232 / CAN" },
        ],
      },
      {
        key: "hvSystem",
        title: "High voltage system",
        subtitle: "HVS Series",
        specs: [
          { l: "Voltage range", v: "358.4V – 716.8V" },
          { l: "Energy range", v: "14.33kWh – 100.35kWh (scalable)" },
          { l: "Cycle life", v: "8000 cycles" },
          { l: "Communication", v: "RS485 / RS232 / CAN" },
        ],
      },
      {
        key: "aio",
        title: "ESS all-in-one",
        subtitle: "All-in-one family",
        specs: [
          { l: "Voltage", v: "51.2V" },
          { l: "Capacity", v: "100Ah / 314Ah" },
          { l: "Energy", v: "5.12kWh – 16.07kWh" },
          { l: "Representative models", v: "M1200 (1), MB-1111, etc." },
          { l: "Communication", v: "RS485 / RS232 / CAN" },
        ],
      },
    ],
  },

  // ── PCS product page ──
  productsPcs: {
    back: "Back to home",
    badge: "PCS · Prefabricated",
    heroTitle: "SES4H-5160/6900-MV-EX Prefabricated Inverter Substation",
    heroSub: "Highly integrated prefabricated cabin combining inverter and step-up substation for utility-scale PV+storage and grid connection.",
    overviewTitle: "Product overview",
    overviewName: "Name",
    overviewNameVal: "SES4H-5160/6900-MV-EX Prefabricated Inverter Substation (PCS)",
    featuresTitle: "Key advantages",
    imageAlt: "SES4H-5160/6900-MV-EX prefabricated inverter substation product",
    specsTitle: "Technical specifications",
    specsHint: "Scroll horizontally on small screens.",
    colCat: "Category",
    colItem: "Parameter",
    colDetail: "Details",
    complianceTitle: "Compliance & certifications",
    complianceIntro: "Design and type testing comply with the following standards and grid codes (subject to delivery certificate).",
    ctaDatasheet: "Request datasheet",
    ctaContact: "Contact us",
    features: [
      { t: "Flexible config", b: "Integrated inverter and substation in a highly prefabricated design, improving space efficiency and simplifying installation." },
      { t: "Modular power", b: "Modular design allows configurable power rating to match project requirements." },
      { t: "High efficiency & stability", b: "1500V wide DC voltage range with multi-branch DC design to prevent battery circulating current." },
      { t: "Versatile use", b: "Supports VSG / PQ / VF modes with peak shaving and local autonomous operation." },
      { t: "Safe & compatible", b: "Supports HVRT/LVRT, four-quadrant active/reactive power regulation, fast power response (<20ms)." },
      { t: "Grid-friendly", b: "Rated AC power: N×215kW @45°C, N×129kW @50°C (N = 20~32 modules); THDi/THDu <3%." },
    ],
  },

  // ── Solar Panels product page ──
  productsSolarPanels: {
    back: "Back to home",
    badge: "Solar",
    pageTitle: "Solar Panels",
    pageSub: "High-efficiency ABC INFINITE modules with partial shading optimisation and industry-leading warranties.",
    gridTitle: "Product series",
    source: "Data source",
    sourceLink: "aikosolar.com",
  },

  // ── HVS details page ──
  productsHvs: {
    back: "Back to residential ESS",
    title: "High-Voltage System HVS Series",
    sub: "Rack-mount and cabinet-style high-voltage battery systems for higher power density and scalability.",
    secA: "Section A · Standard Rack (100Ah)",
    secB: "Section B · High-capacity Rack (280Ah)",
    secC: "Section C · Cabinet BESS (large capacity)",
    introA: "100Ah rack family: modular stackable design with IP65 protection, ideal for indoor/outdoor residential HV battery banks.",
    introB: "280Ah racks up to 35.84kWh per tower — designed for higher energy demands with the same footprint.",
    introC: "Cabinet BESS: pre-assembled high-voltage solution for residential and small commercial applications, scalable up to 100kWh.",
  },

  // ── LFP battery details page ──
  productsLfpBattery: {
    back: "Back to residential ESS",
    title: "LFP Battery Series",
    sub: "Ultra-slim wall-mount and floor-standing / mobile LFP battery solutions.",
    sec1: "Ultra-slim Wall-mount Group · M1200 / M2400",
    sec2: "Floor / Mobile Group · M-BXS / M-LFP",
    corner: "Parameter",
  },

  // ── All-in-one details page ──
  productsAllInOne: {
    back: "Back to residential ESS",
    title: "Wall-mounted / Floor-standing LFP Battery Comparison",
    sub: "Side-by-side specification comparison across 6 popular models in the LFP battery lineup.",
    section: "Parameter comparison (6 models)",
    corner: "Parameter",
  },

  // ── ESS All-in-one details page ──
  productsEssAllInOne: {
    back: "Back to residential ESS",
    pageTitle: "ESS All-in-one Series",
    pageSub: "Integrated inverter + battery systems for hassle-free residential energy storage deployment.",
  },

  // ── Stackable battery details page ──
  productsStackableBattery: {
    back: "Back to residential ESS",
    title: "Stackable / Floor-standing Battery (314Ah / 200Ah) Comparison",
    sub: "Side-by-side specification comparison across 7 popular models.",
    section: "Parameter comparison (7 models)",
    corner: "Parameter",
  },

  // ── Blog list page ──
  blog: {
    badge: "Knowledge Base",
    pageTitle: "Energy Storage Blog",
    pageSub: "Deep dives into battery storage technology, market trends, and best practices. From ROI analysis to installation guides, make informed decisions for your energy storage projects.",
    readMore: "Read Article",
    readTime: "min read",
    backToHome: "Back to Home",
    ctaTitle: "Need Expert Advice?",
    ctaSub: "Our engineering team can design a custom energy storage solution for your project.",
    ctaBtn: "Request a Proposal",
    categories: "Categories",
  },

  // ── Blog detail page ──
  blogDetail: {
    notFound: "Article Not Found",
    backToBlog: "Back to Blog",
    readTime: "min read",
    tableOfContents: "Table of Contents",
    ctaTitle: "Questions about this article?",
    ctaSub: "Contact our engineering team for a personalised consultation on your energy storage project.",
    relatedArticles: "Related Articles",
    readMore: "Read Article",
  },

  // ── Case center list page ──
  caseCenter: {
    badge: "Global Projects",
    pageTitle: "Frequency Regulation & Energy Storage Cases",
    pageSub: "Real-world deployments in grid frequency regulation, peak shaving, and renewable integration across 50+ countries.",
    readMore: "View Details",
    ctaTitle: "Need a similar solution?",
    ctaSub: "Our engineering team will design a custom frequency regulation and energy storage system for your grid requirements.",
    ctaBtn: "Request a Proposal",
    techLink: "Explore our technology platform",
  },

  // ── Case detail page ──
  caseDetail: {
    back: "Back to case center",
    location: "Location",
    date: "Implementation date",
    type: "Frequency regulation type",
    challengeTitle: "The Problem to Solve",
    solutionTitle: "Our Approach",
    specsTitle: "Technical Specifications",
    outcomesTitle: "Measurable Results",
    gallery: "Site photos",
    freqDiagram: "Frequency response diagram",
    cta: "Get a similar solution",
    ctaSub: "Tell us about your project requirements and our engineers will design a tailored solution.",
    ctaBtn: "WhatsApp Consultation",
    moreBtn: "View more cases",
    techPageBtn: "Explore technology platform",
  },
};

// ────────────────────────────────────────────────────
// Chinese translations (from existing isZh patterns)
// ────────────────────────────────────────────────────
const zh = {
  productsEnergyStorage: {
    breadcrumbHome: "首页",
    breadcrumbProducts: "产品",
    badge: "核心产品",
    title: "Energy Storage System",
    description: "包含 Energy Storage System Pack / DC Liquid Cooling Container，为工商业与电网侧应用提供高功率、长寿命与高安全的系统级储能交付。",
    certTitle: "认证与标准",
    certDesc: "满足主流运输与安全标准",
    featuresTitle: "产品核心优势",
    featuresSub: "面向规模化交付的系统工程能力：功率覆盖、寿命一致性、安全冗余与运维友好性。",
    features: [
      { t: "高功率", b: "满足0.25P~2P功率，功率型和能量型电池舱全覆盖" },
      { t: "长寿命", b: "PACK内电芯温差2℃，电池簇间电芯温差5℃，满足10年日历寿命" },
      { t: "真安全", b: "集成PACK级、簇级和舱级三重消防，电池模块具备IP67防护等级" },
      { t: "易集成", b: "电池模块化设计，可实现一簇一单元，无簇间环流，可单独维护升级；可配套顷刻能源全系列倍率型电芯产品" },
      { t: "易配置", b: "可肩并肩或手拉手布置，扩容灵活" },
      { t: "易管理", b: "数据实时交互，具备电量统计、故障预警、热失控预警等功能" },
    ],
    specsTitle: "技术参数",
    specsSub: "移动端支持横向滚动查看不同容量型号的完整参数。",
    specCornerLabel: "参数 \\ 型号",
    certFooter: "认证标准",
    ctaTitle: "获取定制方案",
    ctaSub: "告诉我们您的项目需求，工程师将在48小时内提供定制方案。",
  },

  productsResidentialEss: {
    back: "返回首页",
    badge: "户用产品",
    pageTitle: "户用光储一体机",
    pageSub: "涵盖低压堆叠/壁挂、高压大功率系统与集成逆变器的户用一体机，便于按需选型与扩展。",
    categoriesTitle: "产品分类概览",
    catLv: "低压系列（51.2V）",
    catLvDesc: "10kWh、16kWh 等容量的堆叠式 / 壁挂式电池。",
    catHv: "高压系列（358.4V – 716.8V）",
    catHvDesc: "面向大功率与高压直流母线需求的系统方案。",
    catAio: "户用一体机（ESS All-in-one）",
    catAioDesc: "逆变器与电池深度集成的即装即用方案。",
    gridTitle: "产品列表",
    viewHvsDetails: "查看高压 HVS 系列详情",
    viewAioDetails: "查看 ESS All-in-one 系列详情",
    viewLfpDetails: "查看 LFP 电池系列详情",
    details: "详情",
    products: [
      {
        key: "wallMount",
        title: "壁挂式电池",
        subtitle: "MDS-512200",
        specs: [
          { l: "电压", v: "25.6V-51.2V" },
          { l: "容量", v: "206Ah" },
          { l: "能量", v: "5.12KWH-10.54KWH" },
          { l: "循环寿命", v: "6000 次" },
          { l: "尺寸 (mm)", v: "723 × 655 × 255" },
          { l: "通讯", v: "RS485 / RS232 / CAN" },
        ],
      },
      {
        key: "stackable",
        title: "堆叠式电池",
        subtitle: "MDS-51314",
        specs: [
          { l: "电压", v: "51.2V" },
          { l: "容量", v: "314Ah" },
          { l: "能量", v: "16.07kWh" },
          { l: "循环寿命", v: "8000 次" },
          { l: "尺寸 (mm)", v: "730 × 610 × 257" },
          { l: "通讯", v: "RS485 / RS232 / CAN" },
        ],
      },
      {
        key: "hvSystem",
        title: "高压系统",
        subtitle: "HVS Series",
        specs: [
          { l: "电压范围", v: "358.4V – 716.8V" },
          { l: "能量范围", v: "14.33kWh – 100.35kWh（可扩展）" },
          { l: "循环寿命", v: "8000 次" },
          { l: "通讯", v: "RS485 / RS232 / CAN" },
        ],
      },
      {
        key: "aio",
        title: "户用一体机",
        subtitle: "ESS All-in-one 系列",
        specs: [
          { l: "电压", v: "51.2V" },
          { l: "容量", v: "100Ah / 314Ah" },
          { l: "能量", v: "5.12kWh – 16.07kWh" },
          { l: "包含型号", v: "M1200 (1)、MB-1111 等" },
          { l: "通讯", v: "RS485 / RS232 / CAN" },
        ],
      },
    ],
  },

  productsPcs: {
    back: "返回首页",
    badge: "PCS · 预制舱",
    heroTitle: "SES4H-5160/6900-MV-EX 预制舱式逆变升压站",
    heroSub: "集成逆变器与升压站的高度集成化预制舱方案，适用于大型光储与电网侧接入场景。",
    overviewTitle: "产品概述",
    overviewName: "名称",
    overviewNameVal: "SES4H-5160/6900-MV-EX 预制舱式逆变升压站（Prefabricated Inverter Substation）",
    featuresTitle: "核心优势",
    imageAlt: "SES4H-5160/6900-MV-EX 预制舱式逆变升压站产品图",
    specsTitle: "技术参数",
    specsHint: "表格支持横向滚动以查看完整内容。",
    colCat: "类别",
    colItem: "参数项目",
    colDetail: "规格详情",
    complianceTitle: "技术合规与认证",
    complianceIntro: "本产品设计与型式试验符合下列标准与并网规范（以交付批次证书为准）。",
    ctaDatasheet: "索取资料",
    ctaContact: "联系我们",
    features: [
      { t: "灵活配置", b: "集成逆变器与升压站，高度集成化设计，提升空间效率并简化安装流程。" },
      { t: "模块化功率", b: "采用模块化设计，功率可根据需求配置。" },
      { t: "高效率与稳定性", b: "1500V 宽电压直流范围，多支路直流设计防止电池环流。" },
      { t: "广泛用途", b: "支持 VSG / PQ / VF 模式，具备削峰填谷及本地自动化运行功能。" },
      { t: "安全兼容", b: "支持高/低电压穿越（HVRT/LVRT），四象限有功/无功调节，快速功率响应（<20ms）。" },
      { t: "电网友好", b: "额定交流功率：N×215kW @45°C，N×129kW @50°C（N 为模块数 20~32）；电流谐波 THDi/THDu <3%。" },
    ],
  },

  productsSolarPanels: {
    back: "返回首页",
    badge: "光伏产品",
    pageTitle: "太阳能组件",
    pageSub: "高效 ABC INFINITE 组件，具备局部遮挡优化和业界领先的质保方案。",
    gridTitle: "产品系列",
    source: "数据来源",
    sourceLink: "aikosolar.com",
  },

  productsHvs: {
    back: "返回户用光储列表",
    title: "高压系统 HVS 系列",
    sub: "机架式和柜式高压电池系统，提供更高功率密度和扩展能力。",
    secA: "区块 A · 标准机架式（100Ah）",
    secB: "区块 B · 大容量机架式（280Ah）",
    secC: "区块 C · 柜式储能系统（大容量）",
    introA: "100Ah 标准机架：模块化堆叠设计，具备 IP65 防护等级，适用于户内/户外高压电池组部署。",
    introB: "280Ah 大容量机架：每塔最高 35.84kWh，专为更高能量需求设计且占地面积不变。",
    introC: "柜式 BESS：预组装高压解决方案，适用于住宅与小型工商业应用，可扩展至 100kWh。",
  },

  productsLfpBattery: {
    back: "返回户用光储列表",
    title: "LFP 电池系列",
    sub: "超薄壁挂式与落地/移动式 LFP 电池解决方案。",
    sec1: "超薄壁挂组 · M1200 / M2400",
    sec2: "落地 / 移动组 · M-BXS / M-LFP",
    corner: "参数名称",
  },

  productsAllInOne: {
    back: "返回户用光储列表",
    title: "壁挂式 / 落地式 LFP 电池对比",
    sub: "LFP 电池系列 6 款热门型号的全参数横向对比。",
    section: "参数对比（6 个型号）",
    corner: "参数名称",
  },

  productsEssAllInOne: {
    back: "返回户用光储列表",
    pageTitle: "ESS All-in-one 系列",
    pageSub: "集成逆变器与电池的即装即用户用储能系统。",
  },

  productsStackableBattery: {
    back: "返回户用光储列表",
    title: "堆叠式 / 落地式电池（314Ah / 200Ah）对比",
    sub: "7 款热门型号的规格参数横向对比。",
    section: "参数对比（7 个型号）",
    corner: "参数名称",
  },

  blog: {
    badge: "知识库",
    pageTitle: "储能技术博客",
    pageSub: "深入解析电池储能技术、市场趋势和最佳实践。从投资回报分析到安装指南，助您做出明智决策。",
    readMore: "阅读全文",
    readTime: "分钟阅读",
    backToHome: "返回首页",
    ctaTitle: "需要专业建议？",
    ctaSub: "我们的工程师团队可为您提供定制化的储能解决方案。",
    ctaBtn: "获取方案报价",
    categories: "分类",
  },

  blogDetail: {
    notFound: "文章未找到",
    backToBlog: "返回博客",
    readTime: "分钟阅读",
    tableOfContents: "目录",
    ctaTitle: "对这篇文章有疑问？",
    ctaSub: "联系我们的工程师团队，为您的储能项目提供个性化咨询。",
    relatedArticles: "相关文章",
    readMore: "阅读全文",
  },

  caseCenter: {
    badge: "全球项目",
    pageTitle: "调频储能案例中心",
    pageSub: "覆盖 50+ 国家的电网调频、削峰填谷与新能源消纳真实部署案例。",
    readMore: "查看详情",
    ctaTitle: "需要类似方案？",
    ctaSub: "我们的工程师团队将根据您的电网需求，设计定制化的调频储能系统。",
    ctaBtn: "获取方案报价",
    techLink: "了解我们的技术平台",
  },

  caseDetail: {
    back: "返回案例中心",
    location: "项目地点",
    date: "实施时间",
    type: "调频类型",
    challengeTitle: "面临的挑战",
    solutionTitle: "我们的解决方案",
    specsTitle: "技术规格",
    outcomesTitle: "量化成果",
    gallery: "现场图片",
    freqDiagram: "频率响应图",
    cta: "获取类似方案",
    ctaSub: "告诉我们您的项目需求，工程师将为您量身定制解决方案。",
    ctaBtn: "WhatsApp 咨询",
    moreBtn: "查看更多案例",
    techPageBtn: "了解技术平台",
  },
};

// ────────────────────────────────────────────────────
// Translation maps for 12 languages
// ────────────────────────────────────────────────────
const localeNames = {
  en: "English",
  zh: "Chinese",
  es: "Spanish",
  tr: "Turkish",
  pt: "Portuguese",
  de: "German",
  fr: "French",
  th: "Thai",
  ar: "Arabic",
  ja: "Japanese",
  ko: "Korean",
  id: "Indonesian",
};

/**
 * Deep merge translations from a source object into the target.
 * Only updates keys that exist in the source, preserving existing data.
 * Handles nested objects, arrays of objects, and strings.
 */
function deepMerge(target, source, locale) {
  if (typeof source !== 'object' || source === null) return target;
  
  const result = JSON.parse(JSON.stringify(target)); // deep copy
  
  for (const key of Object.keys(source)) {
    if (!(key in result)) {
      result[key] = source[key];
      continue;
    }
    
    if (Array.isArray(source[key])) {
      // For arrays of objects (features, products, specs), merge by index
      if (source[key].length > 0 && typeof source[key][0] === 'object' && source[key][0] !== null && !Array.isArray(source[key][0])) {
        result[key] = source[key].map((item, i) => {
          if (i < result[key].length && typeof result[key][i] === 'object' && result[key][i] !== null) {
            return deepMerge(result[key][i], item, locale);
          }
          return item;
        });
      } else {
        result[key] = source[key];
      }
    } else if (typeof source[key] === 'object' && source[key] !== null) {
      if (typeof result[key] === 'object' && result[key] !== null) {
        result[key] = deepMerge(result[key], source[key], locale);
      } else {
        result[key] = source[key];
      }
    } else {
      result[key] = source[key];
    }
  }
  
  return result;
}

/**
 * Generate translations for non-English/non-Chinese locales
 * using a simplified mapping from English.
 * For production, replace with actual translation API or human translations.
 */
function translateToLocale(enObj, locale) {
  // Deep clone and apply locale-specific transformations
  const result = JSON.parse(JSON.stringify(enObj));
  
  // Since we can't call a translation API here, we'll generate
  // placeholder translations with locale markers.
  // The actual translations should be done via an API or human review.
  // For now, we use English as fallback for non-English/non-Chinese locales.
  
  // Map of common technical terms that should stay the same
  const noTranslateKeys = ['title', 'heroTitle', 'overviewNameVal'];
  
  function applyLocale(obj, path = []) {
    if (typeof obj === 'string') {
      const lastKey = path[path.length - 1] || '';
      // Keep technical names and URLs unchanged
      if (noTranslateKeys.includes(lastKey) || obj.startsWith('http') || obj.startsWith('/')) {
        return obj;
      }
      // For strings, we'll keep English as placeholder (would be translated via API in production)
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map((item, i) => applyLocale(item, [...path, String(i)]));
    }
    if (typeof obj === 'object' && obj !== null) {
      const newObj = {};
      for (const [k, v] of Object.entries(obj)) {
        newObj[k] = applyLocale(v, [...path, k]);
      }
      return newObj;
    }
    return obj;
  }
  
  return applyLocale(result);
}

// ────────────────────────────────────────────────────
// Main execution
// ────────────────────────────────────────────────────
function main() {
  console.log('=== Generating all translation keys ===\n');
  
  // Read all existing locale files
  const localeFiles = {};
  for (const loc of Object.keys(localeNames)) {
    const filePath = path.join(MSG_DIR, `${loc}.json`);
    if (fs.existsSync(filePath)) {
      localeFiles[loc] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  }
  
  // Merge English translations
  if (localeFiles.en) {
    localeFiles.en = deepMerge(localeFiles.en, en, 'en');
  }
  
  // Merge Chinese translations
  if (localeFiles.zh) {
    localeFiles.zh = deepMerge(localeFiles.zh, zh, 'zh');
  }
  
  // For other 10 locales, generate translations from English
  const otherLocales = Object.keys(localeNames).filter(l => l !== 'en' && l !== 'zh');
  for (const loc of otherLocales) {
    if (localeFiles[loc]) {
      // Start from English base for new sections
      const translated = translateToLocale(en, loc);
      localeFiles[loc] = deepMerge(localeFiles[loc], translated, loc);
    }
  }
  
  // Write back all locale files
  for (const [loc, data] of Object.entries(localeFiles)) {
    const filePath = path.join(MSG_DIR, `${loc}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
    console.log(`  ✓ ${loc}.json updated`);
  }
  
  // Count total new keys
  function countKeys(obj, prefix = '') {
    let count = 0;
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === 'string') count++;
      else if (Array.isArray(v)) {
        if (v.length > 0 && typeof v[0] === 'object' && v[0] !== null) {
          v.forEach((item, i) => { count += countKeys(item, `${prefix}.${k}[${i}]`); });
        } else {
          count++;
        }
      } else if (typeof v === 'object' && v !== null) {
        count += countKeys(v, `${prefix}.${k}`);
      }
    }
    return count;
  }
  
  console.log(`\nTotal keys in all sections: ~${countKeys(en)}`);
  console.log('Done! All 12 locale files updated.');
}

main();

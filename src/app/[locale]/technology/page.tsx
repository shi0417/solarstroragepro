"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Download,
  ExternalLink,
  Shield,
  Zap,
  Battery,
  Sun,
  Wind,
  Car,
  Activity,
} from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";

/* ─── copy ──────────────────────────────────────────────────────────────────── */

const COPY = {
  en: {
    back: "Back to home",
    badge: "Technology Platform",
    title: "Military-Grade BESS Technology",
    titleHighlight: "Built for the Grid",
    subtitle:
      "Every component — cell chemistry, BMS architecture, PCS topology, thermal management — is engineered for one purpose: delivering sub-200ms frequency regulation at grid scale, reliably, for 20+ years.",
    sections: [
      {
        id: "cell",
        eyebrow: "01 · Cell Platform",
        heading: "Prismatic LFP · 314Ah",
        body: "Our systems are built on 314Ah-class prismatic lithium iron phosphate cells — the gold standard for grid-scale energy storage. LFP chemistry delivers zero thermal runaway risk, 8,000+ cycle life at 1C, and exceptional calendar life exceeding 15 years.",
        specs: [
          { k: "Cell Chemistry", v: "LiFePO₄ (LFP)" },
          { k: "Nominal Capacity", v: "314 Ah" },
          { k: "Cycle Life", v: "8,000+ cycles @ 1C, 80% DoD" },
          { k: "Operating Temp", v: "-20°C to +55°C" },
          { k: "Safety Rating", v: "IEC 62619 · UL 1973" },
        ],
        images: [
          "/images/ppt/04-technology/slide19_technology_01.png",
          "/images/ppt/04-technology/slide19_technology_02.png",
        ],
      },
      {
        id: "bms",
        eyebrow: "02 · BMS Architecture",
        heading: "3-Layer Intelligent BMS",
        body: "Our proprietary battery management system operates across three tiers: cell-level voltage & temperature monitoring, module-level balancing and protection, and system-level dispatch optimization. Real-time SOC/SOH estimation enables predictive maintenance and degradation modeling.",
        specs: [
          { k: "Architecture", v: "3-tier (Cell / Module / System)" },
          { k: "Sampling Rate", v: "100ms full-stack scan" },
          { k: "Balancing", v: "Active balancing, ≤5mV cell spread" },
          { k: "Communication", v: "CAN / RS485 / Ethernet / Modbus" },
          { k: "SOC Accuracy", v: "±2% (calibrated)" },
        ],
        images: [
          "/images/ppt/04-technology/slide20_technology_01.png",
          "/images/ppt/04-technology/slide20_technology_03.png",
        ],
      },
      {
        id: "pcs",
        eyebrow: "03 · Power Conversion System",
        heading: "Bidirectional PCS · 500kW–2MW",
        body: "Our PCS units feature NPC/T-type three-level topology for high efficiency across the full power range. The control platform runs a sub-200ms AGC response loop, enabling participation in FCR, FFR, and aFRR markets simultaneously without hardware reconfiguration.",
        specs: [
          { k: "Topology", v: "3-level NPC/T-type IGBT" },
          { k: "Power Range", v: "500kW – 2MW per unit" },
          { k: "Grid Response", v: "≤200ms full-power dispatch" },
          { k: "Grid Codes", v: "EN 50549 / IEEE 1547 / AS 4777" },
          { k: "Efficiency", v: "≥97.5% peak conversion" },
        ],
        images: [
          "/images/ppt/04-technology/slide17_technology_05.png",
          "/images/ppt/04-technology/slide17_technology_06.png",
        ],
      },
      {
        id: "thermal",
        eyebrow: "04 · Thermal Management",
        heading: "Precision Liquid Cooling",
        body: "Liquid-cooled battery modules maintain cell temperature within ±2°C across all operating conditions. Direct-contact cold plates with glycol-water circulation ensure uniform heat distribution, maximizing cycle efficiency and extending calendar life significantly beyond air-cooled alternatives.",
        specs: [
          { k: "Cooling Method", v: "Liquid-cooled (glycol-water)" },
          { k: "Temperature Uniformity", v: "±2°C cell-to-cell" },
          { k: "Operating Range", v: "-30°C ambient (with heating)" },
          { k: "Fire Suppression", v: "Triple-layer: aerosol + FM200 + inert gas" },
          { k: "IP Rating", v: "IP54 outdoor / IP55 container" },
        ],
        images: [
          "/images/ppt/04-technology/slide18_technology_05.png",
          "/images/ppt/04-technology/slide20_technology_04.png",
        ],
      },
      {
        id: "freq",
        eyebrow: "05 · Frequency Regulation",
        heading: "FCR / FFR / aFRR Ready",
        body: "Our EMS control platform supports all major ancillary service market types — Primary Frequency Response (FCR), Fast Frequency Response (FFR), and Secondary Frequency Regulation (aFRR). The system monitors grid frequency at 10ms resolution and dispatches power within 200ms of a deviation event.",
        specs: [
          { k: "Frequency Detection", v: "10ms resolution (±0.01Hz)" },
          { k: "Response Time", v: "≤200ms full-power injection" },
          { k: "Supported Markets", v: "FCR · FFR · aFRR · FCAS" },
          { k: "Deadband", v: "Configurable ±10–50mHz" },
          { k: "Power Ramp Rate", v: "100% P in ≤1 second" },
        ],
        images: [
          "/images/ppt/03-freq-regulation/slide12_freq-regulation_02.png",
          "/images/ppt/03-freq-regulation/slide13_freq-regulation_01.png",
        ],
      },
    ],
    topology: {
      eyebrow: "06 · System Integration",
      title: "4 Proven System Topologies",
      subtitle:
        "From pure grid-scale frequency regulation to hybrid solar-storage-EV charging, our modular BESS platform adapts to every power scenario with a single, unified control architecture.",
      tabs: [
        {
          id: "storage",
          label: "Grid-Scale BESS",
          icon: Battery,
          heading: "Storage System — Grid-Connected BESS",
          desc: "The purest form of grid-scale energy storage. BESS + PCS connect directly to the AC grid via an AC cabinet and meter, with full EMS/SCADA/cloud monitoring. Ideal for frequency regulation, peak shaving, and grid stabilization.",
          image: "/images/ppt/08-system-topology/Storage System Solution.jpg",
          highlights: [
            "ESS → AC Cabinet → Grid topology",
            "EMS + SCADA + iSolarCloud remote monitoring",
            "Supports FCR / aFRR / peak shaving simultaneously",
            "Bidirectional power flow: charge from grid, discharge to grid",
          ],
          specs: [
            { k: "System Type", v: "AC-coupled BESS" },
            { k: "Grid Voltage", v: "400V–35kV (transformer adaptable)" },
            { k: "Response Time", v: "≤200ms" },
            { k: "Use Cases", v: "FCR, aFRR, Peak Shaving, Spinning Reserve" },
          ],
        },
        {
          id: "solar",
          label: "Solar Grid-Tie",
          icon: Sun,
          heading: "Solar System — PV Grid-Tie",
          desc: "Standard photovoltaic grid-tie configuration with string inverters and transformer step-up. Multiple PV strings feed into centralized inverters, with AC output transformed to grid voltage. Smart communication box enables remote monitoring via iSolarCloud and mobile APP.",
          image: "/images/ppt/08-system-topology/Solar System Solution.jpg",
          highlights: [
            "Multiple PV string arrays → String Inverters",
            "AC parallel output → Transformer → Grid",
            "Smart Communication Box for remote diagnostics",
            "iSolarCloud + APP real-time monitoring",
          ],
          specs: [
            { k: "System Type", v: "AC-coupled Solar" },
            { k: "Inverter Type", v: "String Inverter (multi-MPPT)" },
            { k: "Grid Voltage", v: "400V AC" },
            { k: "Use Cases", v: "Utility-scale solar, C&I rooftop" },
          ],
        },
        {
          id: "offgrid",
          label: "Solar + Storage Hybrid",
          icon: Wind,
          heading: "Off-Grid / Hybrid — PV + ESS + Grid",
          desc: "The most versatile topology: PV modules generate DC power through a combiner box and PV inverter, while the BESS stack with PCS provides energy storage and grid-forming capability. Both systems feed into a shared AC cabinet, enabling seamless grid-tie and island operation.",
          image: "/images/ppt/08-system-topology/Off-grid System Solution.jpg",
          highlights: [
            "PV system + BESS system share AC bus",
            "BESS stack + PCS for energy storage & grid forming",
            "EMS coordinates PV generation + BESS dispatch",
            "Supports grid-tie, island, and seamless transition modes",
          ],
          specs: [
            { k: "System Type", v: "AC/DC hybrid (PV + BESS)" },
            { k: "PV Input", v: "DC via Combiner → PV Inverter" },
            { k: "BESS Input", v: "DC via PCS bidirectional" },
            { k: "Use Cases", v: "Microgrid, C&I backup, renewable integration" },
          ],
        },
        {
          id: "ev",
          label: "PV-ESS-EV Charging",
          icon: Car,
          heading: "PV-ESS-EV — Integrated Charging Station",
          desc: "The future of sustainable transportation infrastructure. PV modules and ESS feed power to EV chargers via a shared inverter. 4G communication enables remote monitoring and load management. Third-party backend integration supports smart charging, V2G, and demand response programs.",
          image: "/images/ppt/08-system-topology/PV-ESS-EV Charging System Solution.png",
          highlights: [
            "PV + ESS → Shared Inverter → EV Chargers",
            "4G wireless communication for remote control",
            "Third-party backend integration (OCPP compatible)",
            "Communication base station for site networking",
          ],
          specs: [
            { k: "System Type", v: "AC-coupled PV-ESS-EV" },
            { k: "Charger Power", v: "60kW–350kW per dispenser" },
            { k: "Communication", v: "4G / RS485 / OCPP 2.0.1" },
            { k: "Use Cases", v: "EV charging station, fleet depot, highway rest area" },
          ],
        },
      ],
    },
    certTitle: "Certifications & Standards",
    certSub:
      "Every system ships with full certification documentation. Our quality management system is ISO 9001 certified, and our manufacturing facilities undergo regular third-party audits.",
    certList: [
      "IEC 62619 – Battery Safety",
      "IEC 62477 – PCS Safety",
      "UL 9540A – BESS Fire Test",
      "UL 1973 – Battery Systems",
      "CE Marking (EU)",
      "ISO 9001:2015 – QMS",
      "NFPA 855 – Fire Code",
      "AS 4777 – Grid Connection (AU)",
    ],
    ctaTitle: "Download Technical Datasheet",
    ctaSub: "Get full specifications, single-line diagrams, and integration guides for our BESS product line.",
    ctaBtn: "Request Datasheet",
    ctaWhatsapp: "Ask Technical Questions",
  },
  zh: {
    back: "返回首页",
    badge: "技术平台",
    title: "军工级储能技术",
    titleHighlight: "为电网而生",
    subtitle:
      "每一个核心组件——电芯化学体系、BMS架构、PCS拓扑、热管理系统——都为同一个目标而设计：在20年+寿命内持续提供亚200毫秒调频响应。",
    sections: [
      {
        id: "cell",
        eyebrow: "01 · 电芯平台",
        heading: "方形磷酸铁锂 · 314Ah",
        body: "我们的系统采用314Ah级方形磷酸铁锂电芯——电网级储能的黄金标准。磷酸铁锂化学体系具备零热失控风险，在1C充放电条件下循环寿命超8000次，日历寿命超过15年。",
        specs: [
          { k: "电芯化学体系", v: "LiFePO₄（磷酸铁锂）" },
          { k: "标称容量", v: "314 Ah" },
          { k: "循环寿命", v: "8000+ 次 @ 1C，80% DoD" },
          { k: "工作温度", v: "-20°C 至 +55°C" },
          { k: "安全认证", v: "IEC 62619 · UL 1973" },
        ],
        images: [
          "/images/ppt/04-technology/slide19_technology_01.png",
          "/images/ppt/04-technology/slide19_technology_02.png",
        ],
      },
      {
        id: "bms",
        eyebrow: "02 · 电池管理系统",
        heading: "三层智能BMS架构",
        body: "我们的专有电池管理系统采用三层架构：电芯级电压与温度监控、模组级均衡与保护、系统级调度优化。实时SOC/SOH估算支持预测性维护与衰减建模。",
        specs: [
          { k: "架构层级", v: "三层（电芯/模组/系统）" },
          { k: "采样频率", v: "100ms 全栈扫描" },
          { k: "均衡方式", v: "主动均衡，单体差值≤5mV" },
          { k: "通信接口", v: "CAN / RS485 / 以太网 / Modbus" },
          { k: "SOC精度", v: "±2%（校准后）" },
        ],
        images: [
          "/images/ppt/04-technology/slide20_technology_01.png",
          "/images/ppt/04-technology/slide20_technology_03.png",
        ],
      },
      {
        id: "pcs",
        eyebrow: "03 · 储能变流器",
        heading: "双向PCS · 500kW–2MW",
        body: "我们的PCS采用NPC/T型三电平拓扑，在全功率范围内保持高效率。控制平台运行亚200毫秒AGC响应环路，无需硬件重配置即可同时参与FCR、FFR和aFRR市场。",
        specs: [
          { k: "电路拓扑", v: "三电平NPC/T型IGBT" },
          { k: "功率范围", v: "500kW – 2MW 单台" },
          { k: "电网响应", v: "≤200ms 满功率调度" },
          { k: "电网规范", v: "EN 50549 / IEEE 1547 / AS 4777" },
          { k: "转换效率", v: "峰值 ≥97.5%" },
        ],
        images: [
          "/images/ppt/04-technology/slide17_technology_05.png",
          "/images/ppt/04-technology/slide17_technology_06.png",
        ],
      },
      {
        id: "thermal",
        eyebrow: "04 · 热管理系统",
        heading: "精密液冷系统",
        body: "液冷电池模组在全工况下将电芯温度控制在±2°C以内。直接接触式冷板配合乙二醇-水循环液，确保均匀散热，显著延长日历寿命，远超风冷方案。",
        specs: [
          { k: "冷却方式", v: "液冷（乙二醇-水）" },
          { k: "温度均匀性", v: "电芯间差值 ±2°C" },
          { k: "工作环境", v: "最低 -30°C（带加热）" },
          { k: "消防系统", v: "三重：气溶胶 + 七氟丙烷 + 惰性气体" },
          { k: "防护等级", v: "户外IP54 / 集装箱IP55" },
        ],
        images: [
          "/images/ppt/04-technology/slide18_technology_05.png",
          "/images/ppt/04-technology/slide20_technology_04.png",
        ],
      },
      {
        id: "freq",
        eyebrow: "05 · 调频控制",
        heading: "FCR / FFR / aFRR 全覆盖",
        body: "我们的EMS控制平台支持所有主流辅助服务市场类型——一次调频（FCR）、快速调频（FFR）和二次调频（aFRR）。系统以10ms分辨率监测电网频率，在偏差事件发生后200ms内完成功率调度。",
        specs: [
          { k: "频率检测", v: "10ms分辨率（±0.01Hz）" },
          { k: "响应时间", v: "≤200ms 满功率注入" },
          { k: "支持市场", v: "FCR · FFR · aFRR · FCAS" },
          { k: "死区设置", v: "可配置 ±10–50mHz" },
          { k: "功率爬坡", v: "1秒内达到100%额定功率" },
        ],
        images: [
          "/images/ppt/03-freq-regulation/slide12_freq-regulation_02.png",
          "/images/ppt/03-freq-regulation/slide13_freq-regulation_01.png",
        ],
      },
    ],
    topology: {
      eyebrow: "06 · 系统集成拓扑",
      title: "4 种成熟系统拓扑",
      subtitle:
        "从纯电网级调频储能到光储充一体化，我们的模块化BESS平台以单一、统一的控制架构适配每一种电力场景。",
      tabs: [
        {
          id: "storage",
          label: "电网级储能",
          icon: Battery,
          heading: "储能系统——并网型BESS",
          desc: "最纯粹的电网级储能形式。BESS + PCS 通过交流柜和电表直接接入交流电网，配备完整的EMS/SCADA/云端监控。适用于调频、削峰填谷和电网稳定。",
          image: "/images/ppt/08-system-topology/Storage System Solution.jpg",
          highlights: [
            "ESS → 交流柜 → 电网 拓扑结构",
            "EMS + SCADA + iSolarCloud 远程监控",
            "同时支持 FCR / aFRR / 削峰填谷",
            "双向功率流：从电网充电，向电网放电",
          ],
          specs: [
            { k: "系统类型", v: "交流耦合 BESS" },
            { k: "电网电压", v: "400V–35kV（变压器适配）" },
            { k: "响应时间", v: "≤200ms" },
            { k: "应用场景", v: "FCR、aFRR、削峰填谷、旋转备用" },
          ],
        },
        {
          id: "solar",
          label: "光伏并网",
          icon: Sun,
          heading: "光伏系统——并网发电",
          desc: "标准光伏并网配置，采用组串式逆变器和升压变压器。多路光伏组串接入集中式逆变器，交流输出经变压器升压至电网电压。智能通信盒支持通过iSolarCloud和APP远程监控。",
          image: "/images/ppt/08-system-topology/Solar System Solution.jpg",
          highlights: [
            "多路光伏组串阵列 → 组串式逆变器",
            "交流并联输出 → 变压器 → 电网",
            "智能通信盒实现远程诊断",
            "iSolarCloud + APP 实时监控",
          ],
          specs: [
            { k: "系统类型", v: "交流耦合光伏" },
            { k: "逆变器类型", v: "组串式逆变器（多路MPPT）" },
            { k: "电网电压", v: "400V 交流" },
            { k: "应用场景", v: "大型地面电站、工商业屋顶" },
          ],
        },
        {
          id: "offgrid",
          label: "光储混合",
          icon: Wind,
          heading: "离网/混合——光伏+储能+电网",
          desc: "最灵活的拓扑：光伏组件通过汇流箱和光伏逆变器产生直流电，BESS电池堆叠配合PCS提供储能和构网能力。两个系统接入共享交流柜，支持无缝并网和离网运行。",
          image: "/images/ppt/08-system-topology/Off-grid System Solution.jpg",
          highlights: [
            "光伏系统 + 储能系统共享交流母线",
            "BESS电池堆叠 + PCS 储能及构网",
            "EMS协调光伏发电与储能调度",
            "支持并网、离网及无缝切换模式",
          ],
          specs: [
            { k: "系统类型", v: "交直流混合（光伏+储能）" },
            { k: "光伏输入", v: "直流经汇流箱 → 光伏逆变器" },
            { k: "储能输入", v: "直流经PCS双向变流" },
            { k: "应用场景", v: "微电网、工商业备用、新能源消纳" },
          ],
        },
        {
          id: "ev",
          label: "光储充一体化",
          icon: Car,
          heading: "光伏-储能-充电——综合充电站",
          desc: "可持续交通基础设施的未来。光伏组件和储能系统通过共享逆变器为充电桩供电。4G通信支持远程监控和负荷管理。第三方后台集成支持智能充电、V2G和需求响应。",
          image: "/images/ppt/08-system-topology/PV-ESS-EV Charging System Solution.png",
          highlights: [
            "光伏 + 储能 → 共享逆变器 → 充电桩",
            "4G无线通信实现远程控制",
            "第三方后台集成（兼容OCPP）",
            "通信基站实现站点组网",
          ],
          specs: [
            { k: "系统类型", v: "交流耦合光储充" },
            { k: "充电功率", v: "单枪 60kW–350kW" },
            { k: "通信方式", v: "4G / RS485 / OCPP 2.0.1" },
            { k: "应用场景", v: "充电站、车队 depot、高速服务区" },
          ],
        },
      ],
    },
    certTitle: "认证与标准体系",
    certSub:
      "每套系统均附完整认证文件。我们的质量管理体系通过ISO 9001认证，生产设施定期接受第三方审计。",
    certList: [
      "IEC 62619 – 电池安全",
      "IEC 62477 – 储能变流器安全",
      "UL 9540A – 储能系统消防测试",
      "UL 1973 – 电池系统",
      "CE认证（欧盟）",
      "ISO 9001:2015 – 质量管理",
      "NFPA 855 – 消防规范",
      "AS 4777 – 并网标准（澳大利亚）",
    ],
    ctaTitle: "下载技术数据手册",
    ctaSub: "获取完整规格参数、单线图及储能系统集成指南。",
    ctaBtn: "申请资料",
    ctaWhatsapp: "技术问题咨询",
  },
};

/* ─── component ─────────────────────────────────────────────────────────────── */

export default function TechnologyPage() {
  const { locale, messages } = useLocaleContext();
  const copy = COPY[locale === "zh" ? "zh" : "en"];
  const t = messages.technology ?? {};
  const [activeTab, setActiveTab] = useState(0);
  const topo = copy.topology;
  const activeTopo = topo.tabs[activeTab];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_60%_at_60%_-10%,rgba(59,130,246,0.15),transparent)]" />
          <div className="pointer-events-none absolute inset-0 bg-grid-slate bg-[length:44px_44px] opacity-10" />

          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-400 transition hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              {copy.back}
            </Link>

            <div className="mt-8">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                <Zap className="h-3 w-3" aria-hidden />
                {copy.badge}
              </span>
            </div>

            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {copy.title}{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {copy.titleHighlight}
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              {copy.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {copy.sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-full border border-slate-700 bg-slate-800/50 px-4 py-1.5 text-sm text-slate-300 transition hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400"
                >
                  {s.eyebrow}
                </a>
              ))}
              <a
                href="#topology"
                className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-400 transition hover:bg-blue-500/20"
              >
                {topo.eyebrow}
              </a>
            </div>
          </div>
        </section>

        {/* ── Tech Sections ── */}
        {copy.sections.map((section, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <section
              key={section.id}
              id={section.id}
              className={`py-16 sm:py-20 ${isEven ? "bg-white" : "bg-slate-50"}`}
            >
              <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div
                  className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                    !isEven ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Text */}
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                      {section.eyebrow}
                    </span>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                      {section.heading}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-slate-600">
                      {section.body}
                    </p>

                    <div className="mt-6 divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white">
                      {section.specs.map((spec) => (
                        <div
                          key={spec.k}
                          className="flex items-center justify-between px-4 py-3"
                        >
                          <span className="text-sm text-slate-500">{spec.k}</span>
                          <span className="text-sm font-semibold text-slate-900">
                            {spec.v}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Images */}
                  <div className="grid grid-cols-2 gap-3">
                    {section.images.map((src, i) => (
                      <div
                        key={i}
                        className={`overflow-hidden rounded-xl border border-slate-200 bg-slate-50 ${
                          i === 0 ? "col-span-2" : ""
                        }`}
                      >
                        <img
                          src={src}
                          alt={`${section.heading} diagram ${i + 1}`}
                          className="h-auto w-full object-contain p-2"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* ── System Topology Section (NEW) ── */}
        <section id="topology" className="bg-slate-950 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {/* Header */}
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                {topo.eyebrow}
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {topo.title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
                {topo.subtitle}
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {topo.tabs.map((tab, i) => {
                const Icon = tab.icon;
                const isActive = i === activeTab;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(i)}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                        : "border border-slate-700 bg-slate-800/50 text-slate-400 hover:border-blue-500/50 hover:text-blue-400"
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Active Tab Content */}
            <div className="mt-10">
              <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
                {/* Left: Diagram */}
                <div className="lg:col-span-3">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-white p-2 shadow-2xl">
                    <img
                      src={activeTopo.image}
                      alt={activeTopo.heading}
                      className="h-auto w-full rounded-xl object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-3 text-center text-xs text-slate-500">
                    {t.diagramCaption}
                  </p>
                </div>

                {/* Right: Info */}
                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-bold text-white">
                    {activeTopo.heading}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-400">
                    {activeTopo.desc}
                  </p>

                  {/* Highlights */}
                  <div className="mt-6 space-y-3">
                    {activeTopo.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/5 px-4 py-3"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden />
                        <span className="text-sm text-slate-300">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Specs */}
                  <div className="mt-6 divide-y divide-white/5 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                    {activeTopo.specs.map((spec) => (
                      <div
                        key={spec.k}
                        className="flex items-center justify-between px-4 py-3"
                      >
                        <span className="text-sm text-slate-500">{spec.k}</span>
                        <span className="text-sm font-semibold text-slate-200">
                          {spec.v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Certifications ── */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                07 · Certifications
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {copy.certTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
                {copy.certSub}
              </p>
            </div>

            {/* Cert logos from PPT */}
            <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
              {[
                "/images/ppt/02-certifications/slide04_certifications_01.png",
                "/images/ppt/02-certifications/slide04_certifications_03.jpg",
                "/images/ppt/02-certifications/slide04_certifications_04.png",
                "/images/ppt/02-certifications/slide04_certifications_05.png",
                "/images/ppt/02-certifications/slide04_certifications_06.png",
                "/images/ppt/02-certifications/slide04_certifications_07.png",
                "/images/ppt/02-certifications/slide04_certifications_08.png",
                "/images/ppt/02-certifications/slide04_certifications_09.png",
                "/images/ppt/02-certifications/slide04_certifications_10.jpg",
                "/images/ppt/02-certifications/slide04_certifications_11.png",
              ].map((src, i) => (
                <div
                  key={i}
                  className="flex aspect-square items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-3"
                >
                  <img
                    src={src}
                    alt={`Certification ${i + 1}`}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Cert list */}
            <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {copy.certList.map((c) => (
                <div
                  key={c}
                  className="flex items-center gap-2 text-sm text-slate-700"
                >
                  <Shield className="h-4 w-4 shrink-0 text-blue-500" aria-hidden />
                  {c}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-blue-600 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <Download className="mx-auto h-10 w-10 text-white/70" aria-hidden />
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              {copy.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-blue-100">
              {copy.ctaSub}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/8613800000000?text=Hi%2C+I%27d+like+to+request+the+BESS+technical+datasheet."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-lg transition hover:bg-blue-50"
              >
                <Download className="h-4 w-4" aria-hidden />
                {copy.ctaBtn}
              </a>
              <a
                href="https://wa.me/8613800000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                {copy.ctaWhatsapp}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </section>

        {/* ── Nav between pages ── */}
        <section className="border-t border-slate-200 bg-white py-8">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6">
            <Link
              href="/case-center"
              className="group flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              <ExternalLink className="h-4 w-4" aria-hidden />
                            {t.viewCases}
              <ChevronRight
                className="h-4 w-4 transition group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <Link
              href="/solutions/grid-level-bess"
              className="group flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
            >
                            {t.gridBessLink}
              <ChevronRight
                className="h-4 w-4 transition group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  Activity,
  Award,
  Battery,
  Bolt,
  Flame,
  Layers,
  Puzzle,
  ShieldCheck,
  SlidersHorizontal,
  Thermometer,
} from "lucide-react";

import { ComparisonSpecTable } from "@/components/site/ComparisonSpecTable";
import { ContactForm } from "@/components/site/ContactForm";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";

type Feature = { title: string; body: string; icon: ReactNode };

const SPEC_HEADERS = ["100kWh", "200kWh", "250kWh", "500kWh"] as const;

const SPEC_ROWS_EN: { name: string; values: string[] }[] = [
  { name: "Charging/Discharging Rate (P)", values: ["1C", "1C", "1C/2C", "1C/2C"] },
  { name: "Battery Chemistry", values: ["LFP", "LFP", "LFP", "LFP"] },
  { name: "Nominal Voltage (V)", values: ["768", "768", "768", "1536"] },
  { name: "Voltage Range (VDC)", values: ["672~876", "672~876", "672~876", "1344~1752"] },
  { name: "Nominal Power (kW)", values: ["100", "200", "250/500", "500/1000"] },
  { name: "Nominal Energy (kWh)", values: ["100", "200", "250", "500"] },
  { name: "Cycle Life", values: ["8,000+", "8,000+", "8,000+", "8,000+"] },
  { name: "Cooling Mode", values: ["Liquid", "Liquid", "Liquid", "Liquid"] },
  { name: "Fire Suppression", values: ["Perfluoro + Aerosol", "Perfluoro + Aerosol", "Perfluoro + Aerosol", "Perfluoro + Aerosol"] },
  { name: "Protection Rating", values: ["IP55", "IP55", "IP55", "IP55"] },
  { name: "Dimension (mm) L×W×H", values: ["1200×980×2100", "2400×980×2100", "2400×980×2100", "6058×2438×2896"] },
  { name: "Weight (kg)", values: ["1,200", "2,300", "2,800", "12,000"] },
];

const SPEC_ROWS_ZH: { name: string; values: string[] }[] = [
  { name: "充放电倍率（P）", values: ["1C", "1C", "1C/2C", "1C/2C"] },
  { name: "电池化学体系", values: ["磷酸铁锂", "磷酸铁锂", "磷酸铁锂", "磷酸铁锂"] },
  { name: "额定电压（V）", values: ["768", "768", "768", "1536"] },
  { name: "电压范围（VDC）", values: ["672~876", "672~876", "672~876", "1344~1752"] },
  { name: "额定功率（kW）", values: ["100", "200", "250/500", "500/1000"] },
  { name: "额定电量（kWh）", values: ["100", "200", "250", "500"] },
  { name: "循环寿命", values: ["8,000+", "8,000+", "8,000+", "8,000+"] },
  { name: "冷却方式", values: ["液冷", "液冷", "液冷", "液冷"] },
  { name: "消防方式", values: ["全氟己酮+气溶胶", "全氟己酮+气溶胶", "全氟己酮+气溶胶", "全氟己酮+气溶胶"] },
  { name: "防护等级", values: ["IP55", "IP55", "IP55", "IP55"] },
  { name: "尺寸（mm）长×宽×高", values: ["1200×980×2100", "2400×980×2100", "2400×980×2100", "6058×2438×2896"] },
  { name: "重量（kg）", values: ["1,200", "2,300", "2,800", "12,000"] },
];

const CERTS = ["IEC 62619", "UN38.3", "CE", "UL 9540A", "GB/T 36276-2023"] as const;

export default function CiBatteryCabinetsPage() {
  const { locale } = useLocaleContext();
  const isZh = locale === "zh";

  const specRows = isZh ? SPEC_ROWS_ZH : SPEC_ROWS_EN;

  const features: Feature[] = isZh
    ? [
        {
          title: "1C/2C 高倍率",
          body: "支持1C和2C充放电倍率，满足频率调节快速响应需求，200ms内完成功率调节。",
          icon: <Bolt className="h-5 w-5" aria-hidden />,
        },
        {
          title: "液冷温控",
          body: "智能液冷系统精确控制电芯温度，PACK内温差≤2℃，延长电池寿命。",
          icon: <Thermometer className="h-5 w-5" aria-hidden />,
        },
        {
          title: "三重消防",
          body: "PACK级、簇级和柜级三重消防保护，全氟己酮+气溶胶+水消防多重安全冗余。",
          icon: <Flame className="h-5 w-5" aria-hidden />,
        },
        {
          title: "模块化设计",
          body: "标准机柜设计，支持灵活扩容，现场安装简便，运维成本低。",
          icon: <Puzzle className="h-5 w-5" aria-hidden />,
        },
        {
          title: "智能BMS",
          body: "电芯级监控，实时SOH估算、故障预警、热失控预警，远程运维支持。",
          icon: <Layers className="h-5 w-5" aria-hidden />,
        },
        {
          title: "灵活配置",
          body: "100~500kWh覆盖，支持削峰填谷、调频响应、需量管理等多场景应用。",
          icon: <SlidersHorizontal className="h-5 w-5" aria-hidden />,
        },
      ]
    : [
        {
          title: "1C/2C High Rate",
          body: "Supports 1C and 2C charging/discharging rates for fast frequency regulation response — power adjustment within 200ms.",
          icon: <Bolt className="h-5 w-5" aria-hidden />,
        },
        {
          title: "Liquid Cooling",
          body: "Intelligent liquid cooling system with precise cell temperature control — pack temperature delta ≤2°C for extended battery life.",
          icon: <Thermometer className="h-5 w-5" aria-hidden />,
        },
        {
          title: "Triple Fire Suppression",
          body: "Three-layer fire protection at pack, cluster, and cabinet levels — perfluoro, aerosol, and water spray redundant safety systems.",
          icon: <Flame className="h-5 w-5" aria-hidden />,
        },
        {
          title: "Modular Design",
          body: "Standard cabinet design with flexible expansion — simple on-site installation and low maintenance costs.",
          icon: <Puzzle className="h-5 w-5" aria-hidden />,
        },
        {
          title: "Smart BMS",
          body: "Cell-level monitoring with real-time SOH estimation, fault warning, thermal runaway early warning, and remote O&M support.",
          icon: <Layers className="h-5 w-5" aria-hidden />,
        },
        {
          title: "Flexible Configuration",
          body: "100–500kWh capacity coverage for peak shaving, frequency response, demand management, and more.",
          icon: <SlidersHorizontal className="h-5 w-5" aria-hidden />,
        },
      ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[var(--border)]">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900" />
          <div className="pointer-events-none absolute inset-0 bg-grid-slate bg-[length:44px_44px] opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-20%,rgba(245,158,11,0.14),transparent)]" />

          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
              <Link href="/" className="transition hover:text-solar-400">
                {isZh ? "首页" : "Home"}
              </Link>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">{isZh ? "产品" : "Products"}</span>
            </div>

            <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div>
                <p className="inline-flex rounded-full border border-[var(--border)] bg-[var(--accent-dim)] px-3 py-1 text-xs font-medium text-solar-400">
                  {isZh ? "工商业储能" : "Commercial & Industrial"}
                </p>
                <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  {isZh ? "工商业储能柜" : "C&I Battery Cabinets"}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
                  {isZh
                    ? "100–500kWh 模块化储能柜，支持 1C/2C 倍率放电、液冷温控和三重消防系统——专为工商业削峰填谷和电网频率响应优化。"
                    : "100–500kWh modular battery cabinets with 1C/2C rate, liquid cooling, and triple fire suppression — purpose-built for commercial peak shaving and grid frequency response."}
                </p>

                {/* Quick specs */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {[
                    isZh ? "1C/2C 倍率" : "1C/2C Rate",
                    isZh ? "液冷温控" : "Liquid Cooled",
                    isZh ? "8,000+ 循环" : "8,000+ Cycles",
                    isZh ? "IP55 防护" : "IP55 Rated",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-slate-950/30 px-3 py-1 text-xs font-medium text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Product image + certs */}
              <div className="grid gap-4">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/40 backdrop-blur">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.18),transparent_55%)]" />
                  <div className="relative flex items-center justify-center">
                    <div className="flex h-[320px] w-full items-center justify-center">
                      <Battery className="h-24 w-24 text-solar-400/60" aria-hidden />
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-solar-500/15 text-solar-400">
                      <Award className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {isZh ? "认证与标准" : "Certifications"}
                      </p>
                      <p className="text-xs text-slate-400">
                        {isZh ? "满足国际运输与安全标准" : "International transport & safety standards"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {CERTS.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-white/10 bg-slate-950/30 px-3 py-1 text-xs font-medium text-slate-200"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {isZh ? "产品核心优势" : "Key Advantages"}
            </h2>
            <p className="mt-3 max-w-3xl text-slate-400">
              {isZh
                ? "为工商业场景量身打造：高倍率放电、极致安全、模块化灵活部署。"
                : "Engineered for C&I applications: high-rate discharge, ultimate safety, and modular flexibility."}
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-[var(--border)] bg-slate-800/80 p-6 shadow-xl shadow-black/20 backdrop-blur transition hover:border-solar-500/40"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-solar-500/15 text-solar-400">
                      {f.icon}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-100 group-hover:text-white">{f.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Spec Table */}
        <section className="border-y border-[var(--border)] bg-slate-900/35 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {isZh ? "技术参数" : "Specifications"}
            </h2>
            <p className="mt-3 max-w-3xl text-slate-400">
              {isZh
                ? "移动端支持横向滚动查看不同容量型号的完整参数。"
                : "Scroll horizontally on mobile to view all capacity variants."}
            </p>

            <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--border)] bg-slate-800/80 shadow-2xl shadow-black/30">
              <div className="p-3 sm:p-4">
                <ComparisonSpecTable
                  headerRow={{
                    cornerLabel: isZh ? "参数 \\ 型号" : "Parameter \\ Model",
                    titles: [...SPEC_HEADERS],
                  }}
                  rows={specRows.map((row) => ({
                    label: row.name,
                    values: row.values,
                  }))}
                />
              </div>

              <div className="border-t border-[var(--border)] bg-slate-950/30 px-6 py-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold text-white">
                    {isZh ? "认证标准" : "Certifications"}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {CERTS.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Scenarios */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {isZh ? "应用场景" : "Application Scenarios"}
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(
                isZh
                  ? [
                      { icon: <Activity className="h-6 w-6" />, title: "电网频率调节", desc: "毫秒级响应，满足FCR/aFRR辅助服务要求" },
                      { icon: <Bolt className="h-6 w-6" />, title: "削峰填谷", desc: "降低用电峰值需量，节省电费支出" },
                      { icon: <ShieldCheck className="h-6 w-6" />, title: "备用电源", desc: "关键负荷不间断供电保障" },
                    ]
                  : [
                      { icon: <Activity className="h-6 w-6" />, title: "Grid Frequency Regulation", desc: "Millisecond response meeting FCR/aFRR ancillary service requirements" },
                      { icon: <Bolt className="h-6 w-6" />, title: "Peak Shaving", desc: "Reduce peak demand charges and optimize electricity costs" },
                      { icon: <ShieldCheck className="h-6 w-6" />, title: "Backup Power", desc: "Uninterruptible power supply for critical loads" },
                    ]
              ).map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[var(--border)] bg-slate-800/80 p-6 backdrop-blur"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-solar-500/15 text-solar-400">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form CTA */}
        <section className="border-t border-[var(--border)] bg-slate-900/50 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {isZh ? "获取定制方案" : "Get a Custom Solution"}
              </h2>
              <p className="mt-3 text-slate-400">
                {isZh
                  ? "告诉我们您的项目需求，工程师将在48小时内提供定制方案。"
                  : "Tell us about your project — our engineers will design a custom solution within 48 hours."}
              </p>
            </div>

            <div className="mt-10 rounded-2xl border border-[var(--border)] bg-slate-800/60 p-8 shadow-xl shadow-black/20 backdrop-blur">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

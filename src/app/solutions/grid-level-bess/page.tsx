"use client";

import Link from "next/link";
import {
  BatteryCharging,
  Factory,
  Flame,
  Gauge,
  Layers,
  Mountain,
  Sun,
  Zap,
} from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";

const TECH_HIGHLIGHTS_EN = [
  { k: "Response", v: "Millisecond-level control loop (application-dependent)" },
  { k: "Power capability", v: "Up to ~2P system power design envelope" },
  { k: "Cell platform", v: "1P 314Ah-class prismatic LFP for energy storage" },
  { k: "Safety architecture", v: "Triple fire suppression + modular system design" },
  { k: "Coverage", v: "Source, grid, and load-side application scenarios" },
];

const TECH_HIGHLIGHTS_ZH = [
  { k: "响应特性", v: "毫秒级调控能力（以具体项目与控制策略为准）" },
  { k: "功率能力", v: "系统功率设计可覆盖最高约 2P 倍率区间" },
  { k: "电芯平台", v: "储能专用 1P 314Ah 级方形磷酸铁锂电芯" },
  { k: "安全架构", v: "三重消防体系 + 模块化系统设计" },
  { k: "场景覆盖", v: "源、网、荷侧全链路应用" },
];

export default function GridLevelBessPage() {
  const { locale } = useLocaleContext();
  const isZh = locale === "zh";

  const copy = isZh
    ? {
        breadcrumbHome: "首页",
        breadcrumbSolutions: "解决方案",
        badge: "电网侧 · 大容量储能",
        title: "电网级电池储能系统（BESS）",
        subtitle: "大容量变电站与电网级储能整体方案，服务电力系统灵活性、辅助服务与新能源消纳。",
        advantagesTitle: "四大核心优势",
        advantages: [
          {
            n: "01",
            title: "一站式方案",
            body: "覆盖源、网、荷侧全场景应用，从方案设计到系统集成形成闭环交付能力。",
            icon: <Layers className="h-5 w-5" aria-hidden />,
          },
          {
            n: "02",
            title: "产业级产品平台",
            body: "基于储能专用 1P 314Ah 方形电芯等平台，面向长寿命与高一致性运行优化。",
            icon: <Factory className="h-5 w-5" aria-hidden />,
          },
          {
            n: "03",
            title: "毫秒级响应",
            body: "支持毫秒级功率响应与快速充放，系统功率设计可覆盖最高约 2P 需求（以工程边界为准）。",
            icon: <Gauge className="h-5 w-5" aria-hidden />,
          },
          {
            n: "04",
            title: "多重安全保障",
            body: "三重消防体系结合模块化结构，提升舱级/簇级/PACK 级协同防护与运维友好性。",
            icon: <Flame className="h-5 w-5" aria-hidden />,
          },
        ],
        appsIntroTitle: "细分应用场景",
        appsIntro:
          "面向电网级大型储能（BESS）的高功率供电应用正在重塑能源系统运行方式，为电网企业与大型用电主体提供可调度、可交易、可并网的灵活资源。系统可高效存储风电、光伏等新能源大发时段的富余电量，并在负荷高峰与电价高峰时段释放，提升资产利用率与电网稳定性。依托大功率变流与电池集成能力，BESS 可参与一次调频、电压支撑、备用与需求响应等辅助服务，在削峰填谷与峰谷套利场景下显著优化用能成本。",
        apps: [
          {
            title: "火电一次调频",
            body: "提供大功率储能系统，实现毫秒级一次调频响应，帮助火电机组提升调频速度与质量，在辅助服务市场中获取稳定收益。",
            icon: <Zap className="h-5 w-5" aria-hidden />,
          },
          {
            title: "光储充一体化",
            body: "大功率储能支撑充电场站与园区负荷的功率需求，通过削峰填谷降低用电成本与碳排放强度。",
            icon: <Sun className="h-5 w-5" aria-hidden />,
          },
          {
            title: "超快充配套储能",
            body: "作为容量支撑配置，满足超充桩群峰值功率需求，提升充电站运行效率与电网接入友好性。",
            icon: <BatteryCharging className="h-5 w-5" aria-hidden />,
          },
          {
            title: "矿山应急供电",
            body: "为井下等关键负荷提供重要供电保障；相较柴油发电方案，响应更快、效率更高，有助于缩短投资回收周期并改善电能质量。",
            icon: <Mountain className="h-5 w-5" aria-hidden />,
          },
        ],
        techTitle: "技术要点概览",
        techNote: "具体参数以项目型式试验、并网测试与合同技术附件为准。",
        relatedTitle: "相关储能产品",
        relatedBody: "查看集装箱式储能系统等产品页面，获取系统级方案与参数说明。",
        relatedCta: "Energy Storage System",
        contactCta: "联系工程团队",
      }
    : {
        breadcrumbHome: "Home",
        breadcrumbSolutions: "Solutions",
        badge: "Grid-side · Bulk storage",
        title: "Grid-level Battery Energy Storage System (BESS)",
        subtitle:
          "Grid-scale energy storage and bulk power substation solutions — flexibility, ancillary services, and renewable integration for utilities and large C&I.",
        advantagesTitle: "Top 4 advantages",
        advantages: [
          {
            n: "01",
            title: "One-stop solution",
            body: "Full application coverage across generation, grid, and demand-side use cases — from concept to integrated delivery.",
            icon: <Layers className="h-5 w-5" aria-hidden />,
          },
          {
            n: "02",
            title: "Industrial pioneer",
            body: "Energy-storage-oriented 1P 314Ah prismatic cell platforms engineered for long calendar life and tight consistency.",
            icon: <Factory className="h-5 w-5" aria-hidden />,
          },
          {
            n: "03",
            title: "Millisecond response",
            body: "Millisecond-class power response with system designs supporting up to ~2P power capability (project-dependent).",
            icon: <Gauge className="h-5 w-5" aria-hidden />,
          },
          {
            n: "04",
            title: "Multiple security measures",
            body: "Triple fire-suppression concepts paired with modular architecture for safer O&M at container, cluster, and pack levels.",
            icon: <Flame className="h-5 w-5" aria-hidden />,
          },
        ],
        appsIntroTitle: "Segmented applications",
        appsIntro:
          "High-power applications for grid-level BESS are transforming how utilities and large consumers operate. These systems store bulk energy from renewables such as solar and wind, shifting surplus generation to peak demand periods. With rapid charge and discharge capability, BESS supports grid stability through ancillary services including frequency regulation and voltage support, and enables demand-response participation — cutting costs by dispatching stored energy when the grid is most stressed.",
        apps: [
          {
            title: "Thermal power frequency regulation",
            body: "High-power storage delivers millisecond-class frequency response for thermal plants, improving regulation quality and capturing ancillary-service value.",
            icon: <Zap className="h-5 w-5" aria-hidden />,
          },
          {
            title: "PV + storage + charging",
            body: "High-power systems support charging loads and campus demand, reducing cost and emissions through peak shaving and valley filling.",
            icon: <Sun className="h-5 w-5" aria-hidden />,
          },
          {
            title: "Energy storage for fast chargers",
            body: "Capacity support for ultra-fast charging — meeting peak power requirements while improving station utilization and grid friendliness.",
            icon: <BatteryCharging className="h-5 w-5" aria-hidden />,
          },
          {
            title: "Emergency power for mines",
            body: "Critical backup for underground operations — faster and more efficient than diesel-only approaches, improving payback and power quality.",
            icon: <Mountain className="h-5 w-5" aria-hidden />,
          },
        ],
        techTitle: "Technical highlights",
        techNote: "Final figures are subject to project FAT/SAT, grid codes, and contract technical schedules.",
        relatedTitle: "Related energy storage products",
        relatedBody: "Explore containerized ESS and system-level documentation on our product page.",
        relatedCta: "Energy Storage System",
        contactCta: "Contact engineering",
      };

  const techRows = isZh ? TECH_HIGHLIGHTS_ZH : TECH_HIGHLIGHTS_EN;

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-[var(--border)]">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900" />
          <div className="pointer-events-none absolute inset-0 bg-grid-slate bg-[length:44px_44px] opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-20%,rgba(245,158,11,0.14),transparent)]" />

          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
              <Link href="/" className="transition hover:text-solar-400">
                {copy.breadcrumbHome}
              </Link>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">{copy.breadcrumbSolutions}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">{copy.title}</span>
            </div>

            <p className="mt-8 inline-flex rounded-full border border-[var(--border)] bg-[var(--accent-dim)] px-3 py-1 text-xs font-medium text-solar-400">
              {copy.badge}
            </p>
            <h1 className="mt-4 max-w-4xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">{copy.subtitle}</p>
            {!isZh ? (
              <p className="mt-4 max-w-3xl text-sm text-slate-500">
                BESS solution scope: grid-scale energy storage systems and bulk power substation integration — aligned with utility-grade deployment
                practices.
              </p>
            ) : (
              <p className="mt-4 max-w-3xl text-sm text-slate-500">
                方案定位涵盖：电网级大规模储能系统与大容量变电站侧集成，面向并网运行与电力市场规则工程化落地。
              </p>
            )}

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/products/energy-storage-system"
                className="inline-flex items-center justify-center rounded-full bg-solar-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-solar-500/30 transition hover:bg-solar-400"
              >
                {copy.relatedCta}
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
              >
                {copy.contactCta}
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{copy.advantagesTitle}</h2>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2">
              {copy.advantages.map((item) => (
                <li
                  key={item.n}
                  className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl shadow-black/20 backdrop-blur transition hover:border-solar-500/40"
                >
                  <span className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-solar-500/15 text-xs font-bold text-solar-400">
                    {item.n}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-solar-400">
                        {item.icon}
                      </span>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-y border-[var(--border)] bg-slate-900/35 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{copy.appsIntroTitle}</h2>
            <p className="mt-6 max-w-4xl text-sm leading-relaxed text-slate-300 sm:text-base">{copy.appsIntro}</p>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {copy.apps.map((app) => (
                <div
                  key={app.title}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7 shadow-xl shadow-black/25 backdrop-blur"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-solar-500/15 text-solar-400">
                      {app.icon}
                    </span>
                    <h3 className="text-lg font-semibold text-white">{app.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">{app.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{copy.techTitle}</h2>
            <p className="mt-3 text-sm text-slate-400">{copy.techNote}</p>

            <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-2xl shadow-black/30">
              <div className="divide-y divide-[var(--border)]">
                {techRows.map((row) => (
                  <div
                    key={row.k}
                    className="grid gap-2 px-5 py-4 sm:grid-cols-[minmax(0,220px)_1fr] sm:items-center"
                  >
                    <div className="text-sm font-semibold text-solar-400">{row.k}</div>
                    <div className="text-sm leading-relaxed text-slate-300">{row.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-slate-950/40 p-6">
              <div>
                <p className="text-sm font-semibold text-white">{copy.relatedTitle}</p>
                <p className="mt-1 text-sm text-slate-400">{copy.relatedBody}</p>
              </div>
              <Link
                href="/products/energy-storage-system"
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-solar-500 px-6 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-solar-400"
              >
                {copy.relatedCta}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

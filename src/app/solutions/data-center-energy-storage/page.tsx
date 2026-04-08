"use client";

import Link from "next/link";
import {
  Award,
  Cpu,
  DollarSign,
  Leaf,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";

const UPS_MODULE_ROWS = [
  {
    model: "40Ah",
    type: "1P16S",
    cellV: "3.2V",
    moduleV: "51.2V",
    cRate: "6C",
    backup: "10–30 min",
  },
  {
    model: "45Ah",
    type: "1P18S",
    cellV: "3.2V",
    moduleV: "57.6V",
    cRate: "10C",
    backup: "<6 min",
  },
  {
    model: "50Ah",
    type: "1P16S",
    cellV: "3.2V",
    moduleV: "51.2V",
    cRate: "6C",
    backup: "10–30 min",
  },
  {
    model: "100Ah",
    type: "1P18S",
    cellV: "3.2V",
    moduleV: "57.6V",
    cRate: "4C",
    backup: "15–30 min",
  },
  {
    model: "200Ah",
    type: "1P16S",
    cellV: "3.2V",
    moduleV: "51.2V",
    cRate: "2C",
    backup: "30 min",
  },
  {
    model: "314Ah",
    type: "1P20S",
    cellV: "3.2V",
    moduleV: "64V",
    cRate: "1C",
    backup: "60 min",
  },
] as const;

const UPS_SYSTEM_COLUMNS = [
  {
    tier: "Tier 1",
    backup: "<6 min",
    moduleV: "51.2V",
    cRate: "10C",
    power: "461–518 kW",
  },
  {
    tier: "Tier 2",
    backup: "10–30 min",
    moduleV: "57.6V",
    cRate: "6C",
    power: "241–346 kW",
  },
  {
    tier: "Tier 3",
    backup: "15–30 min",
    moduleV: "51.2V",
    cRate: "4C",
    power: "204–230 kW",
  },
  {
    tier: "Tier 4",
    backup: ">30 min",
    moduleV: "57.6V",
    cRate: "2C",
    power: "204 kW",
  },
  {
    tier: "Tier 5",
    backup: ">30 min",
    moduleV: "64V",
    cRate: "1C",
    power: "201 kW",
  },
] as const;

export default function DataCenterEnergyStoragePage() {
  const { locale } = useLocaleContext();
  const isZh = locale === "zh";

  const copy = isZh
    ? {
        breadcrumbHome: "首页",
        breadcrumbSolutions: "解决方案",
        badge: "AIDC · 备电与电能质量",
        title: "数据中心储能解决方案",
        lead:
          "面向智算与高密度算力场景的大倍率锂电备电方案，兼顾供电可靠性与电能质量，平滑 GPU 类负载的毫秒级波动。",
        painTitle: "行业痛点",
        painItems: [
          "数据中心用电快速增长，对电网供电能力与扩容节奏提出更高要求。",
          "GPU 负载瞬时波动大、峰值高，增加 IT 设备宕机与供电质量风险。",
          "PUE 与能效指标日趋严格，供电架构需向更高效方向演进。",
          "对电芯安全性要求极高，需满足无起火、无爆炸等严苛标准。",
        ],
        scenariosTitle: "应用场景",
        scenarioGrid: {
          title: "近电网侧 BESS",
          body: "在电网侧附近部署电池储能系统，平抑大规模 GPU 集群的负荷波动，并提供 UPS 级备电能力。",
        },
        scenarioLocal: {
          title: "近 GPU 本地储能",
          body: "在 GPU 近端部署储能，平滑毫秒级负载冲击，可按需配置备电时长，实现更贴近负载的功率支撑。",
        },
        provideTitle: "我们提供什么",
        provideBody: "从电芯、模组到系统的锂电 UPS 全链条产品供应，支持模块化并联与工程化交付。",
        advantagesTitle: "核心优势",
        advantages: [
          {
            title: "高安全",
            body: "温升可控；电芯通过针刺等严苛测试条件下无起火、无爆炸表现（以具体认证与报告为准）。",
          },
          {
            title: "长寿命",
            body: "10 年日历寿命设计取向，满足数据中心长期稳定运行需求。",
          },
          {
            title: "快响应",
            body: "毫秒级响应负载波动，可支撑最高约 300% 的峰值功率需求。",
          },
          {
            title: "更优成本",
            body: "单位功率成本较传统方案约低 20%；相较常规方案可减少 50% 以上 UPS 系统部署数量（视架构与负载而定）。",
          },
          {
            title: "权威认证",
            body: "独立专利与质量体系，适配头部企业供应链与合规要求。",
          },
          {
            title: "更绿色高效",
            body: "以更高直流母线电压等方式推动 AIDC 供电架构升级，助力降低 PUE。",
          },
        ],
        moduleTableTitle: "技术参数 · UPS 模组",
        moduleCols: ["模组", "类型", "电芯电压", "模组电压", "放电倍率 (C)", "备电时间"],
        systemTableTitle: "技术参数 · UPS 系统",
        systemCorner: "参数",
        systemRows: {
          backup: "备电时间",
          cellV: "电芯电压",
          moduleV: "模组电压",
          cRate: "放电倍率 (C)",
          power: "系统功率",
        },
        footnoteTitle: "设计与消防",
        footnote:
          "设计：模块化并联，安全可靠、灵活扩展、智能运维、极简运维。消防：气溶胶、全氟己酮等方案可选（以项目设计为准）。",
        relatedTitle: "相关储能产品",
        relatedCta: "查看 Energy Storage System",
        contactCta: "联系工程团队",
      }
    : {
        breadcrumbHome: "Home",
        breadcrumbSolutions: "Solutions",
        badge: "AIDC · Backup & power quality",
        title: "Data Center Energy Storage Solutions",
        lead:
          "High-power lithium backup for AIDC workloads — engineered for supply reliability and power quality, with millisecond response to GPU-scale load swings.",
        painTitle: "Industry pain points",
        painItems: [
          "Rapidly rising data center power demand challenges grid capacity and expansion timelines.",
          "GPU load swings create high peaks and increase IT downtime risk from power-quality events.",
          "PUE and efficiency requirements are becoming stricter across facilities.",
          "Battery safety expectations are extreme — no fire or explosion tolerance in mission-critical sites.",
        ],
        scenariosTitle: "Application scenarios",
        scenarioGrid: {
          title: "Grid-proximate BESS",
          body: "Battery energy storage near the grid stabilizes large-scale GPU cluster swings and provides UPS-class backup power.",
        },
        scenarioLocal: {
          title: "GPU-proximate energy storage",
          body: "Local storage near GPUs smooths millisecond-level transients with configurable backup duration and load-adjacent support.",
        },
        provideTitle: "What we provide",
        provideBody:
          "Full-chain lithium UPS products from cells and modules to systems — modular parallel designs for dependable delivery.",
        advantagesTitle: "Key features & advantages",
        advantages: [
          {
            title: "High safety",
            body: "Controlled temperature rise; cells demonstrate no fire or explosion under rigorous tests such as nail penetration (per applicable certifications and reports).",
          },
          {
            title: "Long lifespan",
            body: "10-year calendar life design orientation for long-run data center operations.",
          },
          {
            title: "Fast response",
            body: "Millisecond response to load swings with support for up to ~300% peak load scenarios.",
          },
          {
            title: "Cost friendly",
            body: "~20% lower unit power cost vs conventional approaches; 50%+ fewer UPS systems deployed in comparable architectures (project-dependent).",
          },
          {
            title: "Authoritative certification",
            body: "Independent IP and quality systems aligned with leading enterprise supply-chain requirements.",
          },
          {
            title: "Greener & more efficient",
            body: "Higher DC voltage architectures help evolve AIDC power design and reduce PUE.",
          },
        ],
        moduleTableTitle: "Technical specifications · UPS module",
        moduleCols: ["Module", "Type", "Cell voltage", "Module voltage", "Discharge C-rate", "Backup time"],
        systemTableTitle: "Technical specifications · UPS system",
        systemCorner: "Parameter",
        systemRows: {
          backup: "Backup time",
          cellV: "Cell voltage",
          moduleV: "Module voltage",
          cRate: "Discharge C-rate",
          power: "System power",
        },
        footnoteTitle: "Design & fire suppression",
        footnote:
          "Design: modular parallel topology — safe, reliable, flexible, intelligent, and streamlined O&M. Fire suppression: aerosol and perfluoro options (per project engineering).",
        relatedTitle: "Related energy storage product",
        relatedCta: "View Energy Storage System",
        contactCta: "Contact engineering",
      };

  const icons = [
    <ShieldCheck key="s" className="h-5 w-5" aria-hidden />,
    <Award key="a" className="h-5 w-5" aria-hidden />,
    <Zap key="z" className="h-5 w-5" aria-hidden />,
    <DollarSign key="d" className="h-5 w-5" aria-hidden />,
    <Cpu key="c" className="h-5 w-5" aria-hidden />,
    <Leaf key="l" className="h-5 w-5" aria-hidden />,
  ];

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
            <h1 className="mt-4 max-w-4xl text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">{copy.lead}</p>

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
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{copy.painTitle}</h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {copy.painItems.map((text, i) => (
                <li
                  key={i}
                  className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-lg shadow-black/20 backdrop-blur"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-solar-500/15 text-sm font-bold text-solar-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-slate-300">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-y border-[var(--border)] bg-slate-900/35 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{copy.scenariosTitle}</h2>
            <p className="mt-3 max-w-3xl text-slate-400">
              {isZh
                ? "面向未来数据中心分布式供电架构，储能在电网侧与负载侧均可发挥稳态与备电价值。"
                : "For future distributed data center power architectures, storage adds both stabilization and backup at grid- and load-side touchpoints."}
            </p>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-xl shadow-black/25 backdrop-blur">
                <h3 className="text-xl font-semibold text-white">{copy.scenarioGrid.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{copy.scenarioGrid.body}</p>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-xl shadow-black/25 backdrop-blur">
                <h3 className="text-xl font-semibold text-white">{copy.scenarioLocal.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{copy.scenarioLocal.body}</p>
              </div>
            </div>

            <div className="mt-12 rounded-3xl border border-solar-500/25 bg-gradient-to-br from-solar-500/10 to-transparent p-8 sm:p-10">
              <h3 className="text-xl font-semibold text-white">{copy.provideTitle}</h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">{copy.provideBody}</p>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{copy.advantagesTitle}</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {copy.advantages.map((item, i) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl shadow-black/20 backdrop-blur transition hover:border-solar-500/40"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-solar-500/15 text-solar-400">
                      {icons[i]}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-100 group-hover:text-white">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--border)] bg-slate-900/35 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{copy.moduleTableTitle}</h2>
            <p className="mt-3 text-slate-400">
              {isZh ? "表格可在小屏横向滚动查看。" : "Scroll horizontally on small screens to view all columns."}
            </p>

            <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-2xl shadow-black/30">
              <div className="overflow-x-auto">
                <table className="min-w-[720px] w-full border-separate border-spacing-0">
                  <thead>
                    <tr>
                      {copy.moduleCols.map((col) => (
                        <th
                          key={col}
                          className="border-b border-[var(--border)] bg-slate-950/50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-solar-400"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {UPS_MODULE_ROWS.map((row, idx) => (
                      <tr key={row.model} className={idx % 2 === 1 ? "bg-white/[0.02]" : ""}>
                        <td className="border-b border-[var(--border)] px-4 py-3 text-sm font-medium text-slate-200">
                          {row.model}
                        </td>
                        <td className="border-b border-[var(--border)] px-4 py-3 text-sm text-slate-300">{row.type}</td>
                        <td className="border-b border-[var(--border)] px-4 py-3 text-sm text-slate-300">{row.cellV}</td>
                        <td className="border-b border-[var(--border)] px-4 py-3 text-sm text-slate-300">
                          {row.moduleV}
                        </td>
                        <td className="border-b border-[var(--border)] px-4 py-3 text-sm text-slate-300">{row.cRate}</td>
                        <td className="border-b border-[var(--border)] px-4 py-3 text-sm text-slate-300">{row.backup}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <h2 className="mt-16 text-3xl font-bold tracking-tight text-white sm:text-4xl">{copy.systemTableTitle}</h2>
            <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-2xl shadow-black/30">
              <div className="overflow-x-auto">
                <table className="min-w-[640px] w-full border-separate border-spacing-0">
                  <thead>
                    <tr>
                      <th className="sticky left-0 z-10 w-44 border-b border-[var(--border)] bg-slate-950/60 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-solar-400 backdrop-blur">
                        {copy.systemCorner}
                      </th>
                      {UPS_SYSTEM_COLUMNS.map((col) => (
                        <th
                          key={col.tier}
                          className="border-b border-[var(--border)] bg-slate-950/40 px-4 py-3 text-left text-sm font-semibold text-slate-100"
                        >
                          {col.tier}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="sticky left-0 z-10 border-b border-[var(--border)] bg-slate-950/50 px-4 py-3 text-sm font-medium text-slate-200 backdrop-blur">
                        {copy.systemRows.backup}
                      </td>
                      {UPS_SYSTEM_COLUMNS.map((col) => (
                        <td key={col.tier} className="border-b border-[var(--border)] px-4 py-3 text-sm text-slate-300">
                          {col.backup}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-white/[0.02]">
                      <td className="sticky left-0 z-10 border-b border-[var(--border)] bg-slate-950/50 px-4 py-3 text-sm font-medium text-slate-200 backdrop-blur">
                        {copy.systemRows.cellV}
                      </td>
                      {UPS_SYSTEM_COLUMNS.map((col) => (
                        <td key={col.tier} className="border-b border-[var(--border)] px-4 py-3 text-sm text-slate-300">
                          3.2V
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="sticky left-0 z-10 border-b border-[var(--border)] bg-slate-950/50 px-4 py-3 text-sm font-medium text-slate-200 backdrop-blur">
                        {copy.systemRows.moduleV}
                      </td>
                      {UPS_SYSTEM_COLUMNS.map((col) => (
                        <td key={col.tier} className="border-b border-[var(--border)] px-4 py-3 text-sm text-slate-300">
                          {col.moduleV}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-white/[0.02]">
                      <td className="sticky left-0 z-10 border-b border-[var(--border)] bg-slate-950/50 px-4 py-3 text-sm font-medium text-slate-200 backdrop-blur">
                        {copy.systemRows.cRate}
                      </td>
                      {UPS_SYSTEM_COLUMNS.map((col) => (
                        <td key={col.tier} className="border-b border-[var(--border)] px-4 py-3 text-sm text-slate-300">
                          {col.cRate}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="sticky left-0 z-10 border-b border-[var(--border)] bg-slate-950/50 px-4 py-3 text-sm font-medium text-slate-200 backdrop-blur">
                        {copy.systemRows.power}
                      </td>
                      {UPS_SYSTEM_COLUMNS.map((col) => (
                        <td key={col.tier} className="border-b border-[var(--border)] px-4 py-3 text-sm text-slate-300">
                          {col.power}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-[var(--border)] bg-slate-950/40 p-6">
              <h3 className="text-sm font-semibold text-white">{copy.footnoteTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{copy.footnote}</p>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
              <div>
                <p className="text-sm font-semibold text-white">{copy.relatedTitle}</p>
                <p className="mt-1 text-sm text-slate-400">
                  {isZh ? "了解集装箱式储能系统与更多产品细节。" : "Explore containerized ESS and datasheet-ready details."}
                </p>
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

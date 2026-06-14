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

/* Technical-data tables – language-independent numbers & codes ────────────────── */
const UPS_MODULE_ROWS = [
  { model: "40Ah", type: "1P16S", cellV: "3.2V", moduleV: "51.2V", cRate: "6C", backup: "10–30 min" },
  { model: "45Ah", type: "1P18S", cellV: "3.2V", moduleV: "57.6V", cRate: "10C", backup: "<6 min" },
  { model: "50Ah", type: "1P16S", cellV: "3.2V", moduleV: "51.2V", cRate: "6C", backup: "10–30 min" },
  { model: "100Ah", type: "1P18S", cellV: "3.2V", moduleV: "57.6V", cRate: "4C", backup: "15–30 min" },
  { model: "200Ah", type: "1P16S", cellV: "3.2V", moduleV: "51.2V", cRate: "2C", backup: "30 min" },
  { model: "314Ah", type: "1P20S", cellV: "3.2V", moduleV: "64V", cRate: "1C", backup: "60 min" },
] as const;

const UPS_SYSTEM_COLUMNS = [
  { tier: "Tier 1", backup: "<6 min", moduleV: "51.2V", cRate: "10C", power: "461–518 kW" },
  { tier: "Tier 2", backup: "10–30 min", moduleV: "57.6V", cRate: "6C", power: "241–346 kW" },
  { tier: "Tier 3", backup: "15–30 min", moduleV: "51.2V", cRate: "4C", power: "204–230 kW" },
  { tier: "Tier 4", backup: ">30 min", moduleV: "57.6V", cRate: "2C", power: "204 kW" },
  { tier: "Tier 5", backup: ">30 min", moduleV: "64V", cRate: "1C", power: "201 kW" },
] as const;

/* Icon elements – cannot live in JSON, kept here and indexed by position ─── */
const icons = [
  <ShieldCheck key="0" className="h-5 w-5" aria-hidden />,
  <Award key="1" className="h-5 w-5" aria-hidden />,
  <Zap key="2" className="h-5 w-5" aria-hidden />,
  <DollarSign key="3" className="h-5 w-5" aria-hidden />,
  <Cpu key="4" className="h-5 w-5" aria-hidden />,
  <Leaf key="5" className="h-5 w-5" aria-hidden />,
];

export default function DataCenterEnergyStoragePage() {
  const { messages } = useLocaleContext();
  const m = messages.solutionsDataCenter;

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-[var(--border)]">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900" />
          <div className="pointer-events-none absolute inset-0 bg-grid-slate bg-[length:44px_44px] opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-20%,rgba(245,158,11,0.14),transparent)]" />

          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
              <Link href="/" className="transition hover:text-solar-400">
                {m.breadcrumbHome}
              </Link>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">{m.breadcrumbSolutions}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">{m.title}</span>
            </div>

            <p className="mt-8 inline-flex rounded-full border border-[var(--border)] bg-[var(--accent-dim)] px-3 py-1 text-xs font-medium text-solar-400">
              {m.badge}
            </p>
            <h1 className="mt-4 max-w-4xl text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {m.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">{m.lead}</p>

            <p className="mt-3 max-w-4xl text-sm text-slate-400">
              {m.scenariosParagraph}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/products/energy-storage-system"
                className="inline-flex items-center justify-center rounded-full bg-solar-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-solar-500/30 transition hover:bg-solar-400"
              >
                {m.relatedCta}
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
              >
                {m.contactCta}
              </Link>
            </div>
          </div>
        </section>

        {/* ── Pain points ─────────────────────────────────────────────────────────── */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{m.painTitle}</h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {(m.painItems as string[]).map((text, i) => (
                <li
                  key={i}
                  className="flex gap-4 rounded-2xl border border-[var(--border)] bg-slate-800/80 p-5 shadow-lg shadow-black/20 backdrop-blur"
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

        {/* ── Application scenarios ─────────────────────────────────────────────── */}
        <section className="border-y border-[var(--border)] bg-slate-900/35 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{m.scenariosTitle}</h2>
            <p className="mt-3 max-w-3xl text-slate-400">{m.scenariosParagraph}</p>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-[var(--border)] bg-slate-800/80 p-8 shadow-xl shadow-black/25 backdrop-blur">
                <h3 className="text-xl font-semibold text-white">{m.scenarioGridTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{m.scenarioGridBody}</p>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-slate-800/80 p-8 shadow-xl shadow-black/25 backdrop-blur">
                <h3 className="text-xl font-semibold text-white">{m.scenarioLocalTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{m.scenarioLocalBody}</p>
              </div>
            </div>

            <div className="mt-12 rounded-3xl border border-solar-500/25 bg-gradient-to-br from-solar-500/10 to-transparent p-8 sm:p-10">
              <h3 className="text-xl font-semibold text-white">{m.provideTitle}</h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">{m.provideBody}</p>
            </div>
          </div>
        </section>

        {/* ── Advantages ──────────────────────────────────────────────────────── */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{m.advantagesTitle}</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(m.advantages as Array<{ title: string; body: string }>).map((item, i) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-[var(--border)] bg-slate-800/80 p-6 shadow-xl shadow-black/20 backdrop-blur transition hover:border-solar-500/40"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-solar-500/15 text-solar-400">
                      {icons[i]}
                    </span>
                    <h3 className="text-lg font-semibold text-white group-hover:text-white">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── UPS Module table ────────────────────────────────────────────── */}
        <section className="border-t border-[var(--border)] bg-slate-900/35 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{m.moduleTableTitle}</h2>
            <p className="mt-3 text-slate-400">{m.tableNote}</p>

            <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--border)] bg-slate-800/80 shadow-2xl shadow-black/30">
              <div className="overflow-x-auto">
                <table className="min-w-[720px] w-full border-separate border-spacing-0">
                  <thead>
                    <tr>
                      {(m.moduleCols as string[]).map((col) => (
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
                        <td className="border-b border-[var(--border)] px-4 py-3 text-sm text-slate-300">{row.moduleV}</td>
                        <td className="border-b border-[var(--border)] px-4 py-3 text-sm text-slate-300">{row.cRate}</td>
                        <td className="border-b border-[var(--border)] px-4 py-3 text-sm text-slate-300">{row.backup}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── UPS System table ─────────────────────────────────────────── */}
            <h2 className="mt-16 text-3xl font-bold tracking-tight text-white sm:text-4xl">{m.systemTableTitle}</h2>
            <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--border)] bg-slate-800/80 shadow-2xl shadow-black/30">
              <div className="overflow-x-auto">
                <table className="min-w-[640px] w-full border-separate border-spacing-0">
                  <thead>
                    <tr>
                      <th className="sticky left-0 z-10 w-44 border-b border-[var(--border)] bg-slate-950/60 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-solar-400 backdrop-blur">
                        {m.systemCorner}
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
                        {(m.systemRows as Record<string,string>).backup}
                      </td>
                      {UPS_SYSTEM_COLUMNS.map((col) => (
                        <td key={col.tier} className="border-b border-[var(--border)] px-4 py-3 text-sm text-slate-300">
                          {col.backup}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-white/[0.02]">
                      <td className="sticky left-0 z-10 border-b border-[var(--border)] bg-slate-950/50 px-4 py-3 text-sm font-medium text-slate-200 backdrop-blur">
                        {(m.systemRows as Record<string,string>).cellV}
                      </td>
                      {UPS_SYSTEM_COLUMNS.map((col) => (
                        <td key={col.tier} className="border-b border-[var(--border)] px-4 py-3 text-sm text-slate-300">
                          3.2V
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="sticky left-0 z-10 border-b border-[var(--border)] bg-slate-950/50 px-4 py-3 text-sm font-medium text-slate-200 backdrop-blur">
                        {(m.systemRows as Record<string,string>).moduleV}
                      </td>
                      {UPS_SYSTEM_COLUMNS.map((col) => (
                        <td key={col.tier} className="border-b border-[var(--border)] px-4 py-3 text-sm text-slate-300">
                          {col.moduleV}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-white/[0.02]">
                      <td className="sticky left-0 z-10 border-b border-[var(--border)] bg-slate-950/50 px-4 py-3 text-sm font-medium text-slate-200 backdrop-blur">
                        {(m.systemRows as Record<string,string>).cRate}
                      </td>
                      {UPS_SYSTEM_COLUMNS.map((col) => (
                        <td key={col.tier} className="border-b border-[var(--border)] px-4 py-3 text-sm text-slate-300">
                          {col.cRate}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="sticky left-0 z-10 border-b border-[var(--border)] bg-slate-950/50 px-4 py-3 text-sm font-medium text-slate-200 backdrop-blur">
                        {(m.systemRows as Record<string,string>).power}
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
              <h3 className="text-sm font-semibold text-white">{m.footnoteTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{m.footnote}</p>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-slate-800/80 p-6">
              <div>
                <p className="text-sm font-semibold text-white">{m.relatedTitle}</p>
                <p className="mt-1 text-sm text-slate-400">{m.relatedBody}</p>
              </div>
              <Link
                href="/products/energy-storage-system"
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-solar-500 px-6 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-solar-400"
              >
                {m.relatedCta}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Activity,
  Award,
  Bolt,
  Layers,
  Puzzle,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

import { ComparisonSpecTable } from "@/components/site/ComparisonSpecTable";
import { ContactForm } from "@/components/site/ContactForm";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";

const SPEC_HEADERS = ["3.54MW/1.77MWh", "2.5MW/2.5MWh", "4MW/4MWh", "5MW/5MWh", "2.5MW/5MWh"] as const;

// ZH spec row names mapped to EN — used when locale != zh
const SPEC_NAME_EN: Record<string, string> = {
  "额定充放电倍率（P）": "Charging/Discharging Rate (P)",
  "电池簇数（个）": "Number of Racks",
  电池配置: "Battery Configuration",
  "额定电压（V）": "Nominal Voltage (V)",
  "电压范围（VDC）": "Voltage Range (VDC)",
  "额定功率（MW）": "Nominal Power (MW)",
  "额定电量（MWh）": "Nominal Energy (MWh)",
  "额定充放电电流（A）": "Nominal Charging/Discharging Current (A)",
  支路数: "Number of Branches",
  消防方式: "Fire Suppression System",
  冷却方式: "Cooling Mode",
  "尺寸（mm）": "Dimension (mm)",
  "重量（t）": "Weight (t)",
};

const SPEC_VALUE_EN: Record<string, string> = {
  "全氟己酮/气溶胶+水消防": "Perfluoro/Aerosol + Water spray",
  液冷液热: "Liquid cooling & heating",
};

const SPEC_ROWS: { name: string; values: string[] }[] = [
  { name: "额定充放电倍率（P）", values: ["2", "1", "1", "1", "0.5"] },
  { name: "电池簇数（个）", values: ["14", "10", "10", "12", "12"] },
  { name: "电池配置", values: ["14*1P396S", "10*1P392S", "10*1P400S", "12*1P420S", "12*1P416S"] },
  { name: "额定电压（V）", values: ["1267.2", "1254.4", "1280", "1344", "1331.2"] },
  {
    name: "电压范围（VDC）",
    values: ["1108.8~1425.6", "1094.6~1425.6", "1120~1440", "1176~1500", "1164.8~1497.6"],
  },
  { name: "额定功率（MW）", values: ["3.54", "2.5", "4", "5", "2.5"] },
  { name: "额定电量（MWh）", values: ["1.77", "2.5", "4.02", "5.06", "5.02"] },
  { name: "额定充放电电流（A）", values: ["2*1400", "2*1000", "2*1570", "2*1884", "1884"] },
  { name: "支路数", values: ["2", "2", "2", "2", "1"] },
  {
    name: "消防方式",
    values: [
      "全氟己酮/气溶胶+水消防",
      "全氟己酮/气溶胶+水消防",
      "全氟己酮/气溶胶+水消防",
      "全氟己酮/气溶胶+水消防",
      "全氟己酮/气溶胶+水消防",
    ],
  },
  { name: "冷却方式", values: ["液冷液热", "液冷液热", "液冷液热", "液冷液热", "液冷液热"] },
  {
    name: "尺寸（mm）",
    values: ["6350*2438*2896", "6058*2438*2896", "6058*2500*2896", "7000*2600*2896", "6058*2438*2896"],
  },
  { name: "重量（t）", values: ["35", "28", "41", "48", "41"] },
];

const CERTS = ["UN38.3", "GB/T 36276-2023", "GB/T 44240", "IEC62619", "IEC60730"] as const;

// Feature icons — ordered to match productsEnergyStorage.features array
const FEATURE_ICONS = [
  <Bolt key="bolt" className="h-5 w-5" aria-hidden />,
  <Activity key="activity" className="h-5 w-5" aria-hidden />,
  <ShieldCheck key="shield" className="h-5 w-5" aria-hidden />,
  <Puzzle key="puzzle" className="h-5 w-5" aria-hidden />,
  <SlidersHorizontal key="sliders" className="h-5 w-5" aria-hidden />,
  <Layers key="layers" className="h-5 w-5" aria-hidden />,
];

export default function EnergyStorageSystemPage() {
  const { locale, messages } = useLocaleContext();
  const p = messages.productsEnergyStorage ?? {};

  // Translate spec row labels for non-ZH locales
  const specRows = locale === "zh"
    ? SPEC_ROWS
    : SPEC_ROWS.map((row) => ({
        name: SPEC_NAME_EN[row.name] ?? row.name,
        values: row.values.map((v) => SPEC_VALUE_EN[v] ?? v),
      }));

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-[var(--border)]">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900" />
          <div className="pointer-events-none absolute inset-0 bg-grid-slate bg-[length:44px_44px] opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-20%,rgba(245,158,11,0.14),transparent)]" />

          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
              <Link href="/" className="transition hover:text-solar-400">
                {p.breadcrumbHome}
              </Link>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">{p.breadcrumbProducts}</span>
            </div>

            <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div>
                <p className="inline-flex rounded-full border border-[var(--border)] bg-[var(--accent-dim)] px-3 py-1 text-xs font-medium text-solar-400">
                  {p.badge}
                </p>
                <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  {p.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
                  {p.description}
                </p>
              </div>

              <div className="grid gap-4">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/40 backdrop-blur">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.18),transparent_55%)]" />
                  <div className="relative flex items-center justify-center">
                    <Image
                      src="/images/container-product.png"
                      alt="Energy Storage System container product"
                      width={900}
                      height={650}
                      priority
                      className="h-auto w-full max-w-[520px] object-contain"
                    />
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-solar-500/15 text-solar-400">
                      <Award className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{p.certTitle}</p>
                      <p className="text-xs text-slate-400">
                        {p.certDesc}
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

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {p.featuresTitle}
            </h2>
            <p className="mt-3 max-w-3xl text-slate-400">
              {p.featuresSub}
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(p.features as Array<{ t: string; b: string }> ?? []).map((f, i) => (
                <div
                  key={f.t}
                  className="group rounded-2xl border border-[var(--border)] bg-slate-800/80 p-6 shadow-xl shadow-black/20 backdrop-blur transition hover:border-solar-500/40"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-solar-500/15 text-solar-400">
                      {FEATURE_ICONS[i]}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-100 group-hover:text-white">{f.t}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--border)] bg-slate-900/35 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {p.specsTitle}
            </h2>
            <p className="mt-3 max-w-3xl text-slate-400">
              {p.specsSub}
            </p>

            <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--border)] bg-slate-800/80 shadow-2xl shadow-black/30">
              <div className="p-3 sm:p-4">
                <ComparisonSpecTable
                  headerRow={{
                    cornerLabel: p.specCornerLabel,
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
                    {p.certFooter}
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

        {/* Contact Form CTA */}
        <section id="contact" className="scroll-mt-20 border-t border-[var(--border)] bg-slate-900/50 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {p.ctaTitle}
              </h2>
              <p className="mt-3 text-slate-400">
                {p.ctaSub}
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


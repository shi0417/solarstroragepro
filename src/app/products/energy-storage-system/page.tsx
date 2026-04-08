"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
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
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";

type Feature = { title: string; body: string; icon: ReactNode };

const SPEC_HEADERS = ["3.54MW/1.77MWh", "2.5MW/2.5MWh", "4MW/4MWh", "5MW/5MWh", "2.5MW/5MWh"] as const;

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

export default function EnergyStorageSystemPage() {
  const { locale } = useLocaleContext();

  const isZh = locale === "zh";

  const specRows = isZh
    ? SPEC_ROWS
    : SPEC_ROWS.map((row) => ({
        name: SPEC_NAME_EN[row.name] ?? row.name,
        values: row.values.map((v) => SPEC_VALUE_EN[v] ?? v),
      }));

  const features: Feature[] = [
    {
      title: isZh ? "高功率" : "High power",
      body: isZh
        ? "满足0.25P~2P功率，功率型和能量型电池舱全覆盖"
        : "0.25P–2P coverage across power-type and energy-type battery containers.",
      icon: <Bolt className="h-5 w-5" aria-hidden />,
    },
    {
      title: isZh ? "长寿命" : "Long lifetime",
      body: isZh
        ? "PACK内电芯温差2℃，电池簇间电芯温差5℃，满足10年日历寿命"
        : "Cell temperature delta: 2℃ within a pack, 5℃ across clusters — designed for 10-year calendar life.",
      icon: <Activity className="h-5 w-5" aria-hidden />,
    },
    {
      title: isZh ? "真安全" : "Real safety",
      body: isZh
        ? "集成PACK级、簇级和舱级三重消防，电池模块具备IP67防护等级"
        : "Three-layer fire protection at pack/cluster/container levels; battery modules rated IP67.",
      icon: <ShieldCheck className="h-5 w-5" aria-hidden />,
    },
    {
      title: isZh ? "易集成" : "Easy integration",
      body: isZh
        ? "电池模块化设计，可实现一簇一单元，无簇间环流，可单独维护升级；可配套顷刻能源全系列倍率型电芯产品"
        : "Modular design enables per-cluster unit architecture with no inter-cluster circulating current; supports independent maintenance and upgrades.",
      icon: <Puzzle className="h-5 w-5" aria-hidden />,
    },
    {
      title: isZh ? "易配置" : "Flexible configuration",
      body: isZh ? "可肩并肩或手拉手布置，扩容灵活" : "Side-by-side or end-to-end layout options with flexible expansion.",
      icon: <SlidersHorizontal className="h-5 w-5" aria-hidden />,
    },
    {
      title: isZh ? "易管理" : "Easy management",
      body: isZh
        ? "数据实时交互，具备电量统计、故障预警、热失控预警等功能"
        : "Real-time data exchange with energy statistics, fault warnings, and thermal-runaway early warning.",
      icon: <Layers className="h-5 w-5" aria-hidden />,
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
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
                  {isZh ? "核心产品" : "Core product"}
                </p>
                <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  Energy Storage System
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
                  {isZh
                    ? "包含 Energy Storage System Pack / DC Liquid Cooling Container，为工商业与电网侧应用提供高功率、长寿命与高安全的系统级储能交付。"
                    : "Includes Energy Storage System Pack / DC Liquid Cooling Container — system-level delivery for high-power, long-life, and safe deployments."}
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
                      <p className="text-sm font-semibold text-white">{isZh ? "认证与标准" : "Certifications"}</p>
                      <p className="text-xs text-slate-400">
                        {isZh ? "满足主流运输与安全标准" : "Common transport & safety standards"}
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
              {isZh ? "产品核心优势" : "Features"}
            </h2>
            <p className="mt-3 max-w-3xl text-slate-400">
              {isZh
                ? "面向规模化交付的系统工程能力：功率覆盖、寿命一致性、安全冗余与运维友好性。"
                : "System-engineering features for scalable delivery: power coverage, lifetime consistency, redundant safety, and O&M friendliness."}
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl shadow-black/20 backdrop-blur transition hover:border-solar-500/40"
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

            <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-2xl shadow-black/30">
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
      </main>
      <Footer />
    </div>
  );
}


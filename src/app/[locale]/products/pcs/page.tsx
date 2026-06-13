"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Cpu,
  Gauge,
  Layers,
  Shield,
  Zap,
  LucideIcon,
} from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";

const PCS_PRODUCT_IMAGE = "/images/SES4H-5160-6900-MV-EX.png" as const;

const FEATURE_ICONS: LucideIcon[] = [Layers, Box, Zap, Cpu, Shield, Gauge];

type SpecRow = { category: string; item: string; detail: string };

export default function PcsProductPage() {
  const { locale, messages } = useLocaleContext();
  const isZh = locale === "zh";
  const m = messages.productsPcs ?? {};

  const CERTIFICATIONS = [
    "IEC62477",
    "IEC61000",
    "G99",
    "VDE4110",
    "VDE4120",
    "EN50549-2",
  ] as const;

  const specRows: SpecRow[] = isZh
    ? [
        {
          category: "交流与直流参数",
          item: "额定交流功率",
          detail: "N × 215kW @ 45°C；N × 129kW @ 50°C（N 为模块数，20~32）",
        },
        {
          category: "交流与直流参数",
          item: "最大交流功率",
          detail: "110% 额定功率，2 分钟（≤ 45°C）",
        },
        {
          category: "交流与直流参数",
          item: "交流电压 / 频率",
          detail: "10kV–33kV / 50Hz",
        },
        {
          category: "交流与直流参数",
          item: "直流电压范围",
          detail: "1000V–1500V（满载放电以 1070V 为参考下限）",
        },
        {
          category: "交流与直流参数",
          item: "THDi / THDu",
          detail: "< 3%",
        },
        {
          category: "交流与直流参数",
          item: "最大直流电流（每支路）",
          detail: "1612A / 201A",
        },
        {
          category: "低压与辅助设备",
          item: "辅助变压器",
          detail: "50kVA，690V / 400V",
        },
        {
          category: "低压与辅助设备",
          item: "UPS",
          detail: "2kVA（1h 标准）",
        },
        {
          category: "低压与辅助设备",
          item: "冷却方式",
          detail: "温控强制风冷",
        },
        {
          category: "变压器参数",
          item: "容量",
          detail: "5200kVA @ 45°C 或 6900kVA @ 45°C",
        },
        {
          category: "变压器参数",
          item: "联结组别",
          detail: "Dy11y11",
        },
        {
          category: "变压器参数",
          item: "类型 / 冷却",
          detail: "油浸式 / ONAN",
        },
        {
          category: "变压器参数",
          item: "效率",
          detail: "Tier 2（EU548）",
        },
        {
          category: "变压器参数",
          item: "本体保护",
          detail: "压力、温度（两级）、气体继电器",
        },
        {
          category: "开关柜与保护",
          item: "开关柜配置",
          detail: "DeV / CV / CCV / VMV（可定制）",
        },
        {
          category: "开关柜与保护",
          item: "中压开关与保护",
          detail: "真空断路器（VCB）、微机保护系统",
        },
        {
          category: "开关柜与保护",
          item: "直流侧保护",
          detail: "直流断路器 / 熔断器",
        },
        {
          category: "通用与环境参数",
          item: "集装箱尺寸（W×H×D）",
          detail: "40ft（12192×2896×2438 mm）或 45ft",
        },
        {
          category: "通用与环境参数",
          item: "总重",
          detail: "≤ 30t",
        },
        {
          category: "通用与环境参数",
          item: "防护等级",
          detail: "IP54（舱体整体）",
        },
        {
          category: "通用与环境参数",
          item: "工作温度",
          detail: "-25°C 至 60°C（45°C 以上降额）",
        },
        {
          category: "通用与环境参数",
          item: "防腐等级",
          detail: "C5（仅外部机械部件）",
        },
        {
          category: "通讯接口",
          item: "通讯方式",
          detail: "RS485, CAN, TCP/IP",
        },
      ]
    : [
        {
          category: "AC & DC parameters",
          item: "Rated AC power",
          detail: "N × 215 kW @ 45°C; N × 129 kW @ 50°C (N = 20–32)",
        },
        {
          category: "AC & DC parameters",
          item: "Max AC power",
          detail: "110% rated for 2 minutes (≤ 45°C)",
        },
        {
          category: "AC & DC parameters",
          item: "AC voltage / frequency",
          detail: "10 kV–33 kV / 50 Hz",
        },
        {
          category: "AC & DC parameters",
          item: "DC voltage range",
          detail: "1000 V–1500 V (1070 V reference at full-load discharge)",
        },
        {
          category: "AC & DC parameters",
          item: "THDi / THDu",
          detail: "< 3%",
        },
        {
          category: "AC & DC parameters",
          item: "Max DC current (per branch)",
          detail: "1612 A / 201 A",
        },
        {
          category: "LV & auxiliary equipment",
          item: "Auxiliary transformer",
          detail: "50 kVA, 690 V / 400 V",
        },
        {
          category: "LV & auxiliary equipment",
          item: "UPS",
          detail: "2 kVA (1 h standard)",
        },
        {
          category: "LV & auxiliary equipment",
          item: "Cooling",
          detail: "Temperature-controlled forced-air cooling",
        },
        {
          category: "Transformer",
          item: "Capacity",
          detail: "5200 kVA @ 45°C or 6900 kVA @ 45°C",
        },
        {
          category: "Transformer",
          item: "Vector group",
          detail: "Dy11y11",
        },
        {
          category: "Transformer",
          item: "Type / cooling",
          detail: "Oil-immersed / ONAN",
        },
        {
          category: "Transformer",
          item: "Efficiency",
          detail: "Tier 2 (EU548)",
        },
        {
          category: "Transformer",
          item: "Transformer protection",
          detail: "Pressure relay; two-stage temperature; gas (Buchholz) relay",
        },
        {
          category: "Switchgear & protection",
          item: "Switchgear configuration",
          detail: "DeV / CV / CCV / VMV (customized)",
        },
        {
          category: "Switchgear & protection",
          item: "MV switching & protection",
          detail: "Vacuum circuit breaker (VCB), microcomputer-based protection",
        },
        {
          category: "Switchgear & protection",
          item: "DC side protection",
          detail: "DC circuit breakers / fuses",
        },
        {
          category: "General & environment",
          item: "Enclosure size (W×H×D)",
          detail: "40 ft (12192×2896×2438 mm) or 45 ft",
        },
        {
          category: "General & environment",
          item: "Total weight",
          detail: "≤ 30 t",
        },
        {
          category: "General & environment",
          item: "Enclosure protection",
          detail: "IP54 (overall)",
        },
        {
          category: "General & environment",
          item: "Operating temperature",
          detail: "-25°C to 60°C (derate above 45°C)",
        },
        {
          category: "General & environment",
          item: "Corrosion prevention",
          detail: "C5 (external mechanical parts only)",
        },
        {
          category: "Communication",
          item: "Interfaces",
          detail: "RS485, CAN, TCP/IP",
        },
      ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-[var(--border)]">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900" />
          <div className="pointer-events-none absolute inset-0 bg-grid-slate bg-[length:44px_44px] opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-20%,rgba(245,158,11,0.12),transparent)]" />

          <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-solar-400"
            >
              ← {m.back}
            </Link>

            <p className="mt-8 inline-flex rounded-full border border-[var(--border)] bg-[var(--accent-dim)] px-3 py-1 text-xs font-medium text-solar-400">
              {m.badge}
            </p>
            <h1 className="mt-4 max-w-4xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {m.heroTitle}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300">{m.heroSub}</p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "sales@solarstoragepro.com"}?subject=${encodeURIComponent("PCS datasheet request")}`}
                className="inline-flex items-center justify-center rounded-full bg-solar-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-solar-500/30 transition hover:bg-solar-400"
              >
                {m.ctaDatasheet}
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
              >
                {m.ctaContact}
              </Link>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-6xl space-y-14 px-4 sm:px-6">
            <div className="rounded-2xl border border-[var(--border)] bg-slate-800/80 p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-8">
              <h2 className="text-xl font-bold text-white sm:text-2xl">{m.overviewTitle}</h2>
              <dl className="mt-4 space-y-2 text-sm text-slate-300">
                <div>
                  <dt className="font-semibold text-solar-400">{m.overviewName}</dt>
                  <dd className="mt-1 leading-relaxed">{m.overviewNameVal}</dd>
                </div>
              </dl>

              <div className="mt-8 overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900/40 p-4 sm:p-6">
                <Image
                  src={PCS_PRODUCT_IMAGE}
                  alt={m.imageAlt as string}
                  width={1600}
                  height={900}
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority
                  className="mx-auto h-auto w-full max-h-[min(70vh,520px)] object-contain"
                />
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div
                  className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-600 bg-slate-800/30 px-6 py-10 text-center"
                  data-placeholder="system-diagram"
                >
                  <span className="text-sm font-semibold text-solar-400">System single-line / topology diagram</span>
                  <span className="max-w-sm text-xs leading-relaxed text-slate-500">
                    Insert system diagram here — replace with next/image or &lt;img&gt;
                  </span>
                </div>
                <div
                  className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-600 bg-slate-800/30 px-6 py-10 text-center"
                  data-placeholder="transformer-switchgear"
                >
                  <span className="text-sm font-semibold text-solar-400">Transformer detail / switchgear photo</span>
                  <span className="max-w-sm text-xs leading-relaxed text-slate-500">
                    Insert transformer detail or switchgear photo here — replace with next/image or &lt;img&gt;
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white sm:text-2xl">{m.featuresTitle}</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {(m.features as Array<{t: string; b: string}>).map((f, i) => {
                  const Icon = FEATURE_ICONS[i] ?? FEATURE_ICONS[0];
                  return (
                    <div
                      key={f.t}
                      className="rounded-2xl border border-[var(--border)] bg-slate-800/80 p-6 shadow-lg shadow-black/20 backdrop-blur transition hover:border-solar-500/40"
                    >
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-solar-500/15 text-solar-400">
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <h3 className="text-lg font-semibold text-slate-100">{f.t}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.b}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-slate-800/80 p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-8">
              <h2 className="text-xl font-bold text-white sm:text-2xl">{m.specsTitle}</h2>
              <p className="mt-2 text-sm text-slate-500">{m.specsHint}</p>

              <div className="mt-6 overflow-x-auto rounded-xl border border-slate-700/80 bg-slate-900/40">
                <table className="min-w-[800px] w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-950/70">
                      <th className="px-4 py-3 font-bold text-solar-300">{m.colCat}</th>
                      <th className="px-4 py-3 font-bold text-solar-300">{m.colItem}</th>
                      <th className="px-4 py-3 font-bold text-slate-200">{m.colDetail}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specRows.map((row, i) => (
                      <tr
                        key={`${row.category}-${row.item}-${i}`}
                        className={i % 2 === 0 ? "bg-slate-800/20" : "bg-slate-800/10"}
                      >
                        <td className="border-t border-slate-700/80 px-4 py-3 font-medium text-slate-300">
                          {row.category}
                        </td>
                        <td className="border-t border-slate-700/80 px-4 py-3 text-slate-400">
                          {row.item}
                        </td>
                        <td className="border-t border-slate-700/80 px-4 py-3 text-slate-200">
                          {row.detail}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-slate-800/80 p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-8">
              <h2 className="text-xl font-bold text-white sm:text-2xl">{m.complianceTitle}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">{m.complianceIntro}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={m.complianceTitle as string}>
                {CERTIFICATIONS.map((code) => (
                  <li key={code}>
                    <span className="inline-flex rounded-lg border border-slate-600 bg-slate-900/60 px-3 py-1.5 font-mono text-xs font-medium text-slate-200">
                      {code}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap justify-center gap-4 rounded-2xl border border-solar-500/25 bg-gradient-to-br from-solar-500/10 to-transparent p-8">
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "sales@solarstoragepro.com"}?subject=${encodeURIComponent("PCS datasheet request")}`}
                className="inline-flex items-center justify-center rounded-full bg-solar-500 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-solar-400"
              >
                {m.ctaDatasheet}
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
              >
                {m.ctaContact}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

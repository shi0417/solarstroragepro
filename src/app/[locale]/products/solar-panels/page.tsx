"use client";

import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

import { ComparisonSpecTable } from "@/components/site/ComparisonSpecTable";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";

type DownloadLink = { text: string; url: string };

type SolarProduct = {
  title: string;
  imageSrc: string;
  /**
   * Per-locale translations for marketing copy.
   * Keys: "en" | "zh" | "es" | ... (12 locales)
   */
  t: Record<
    string,
    { series: string; desc: string }
  >;
  specs: { labelKey: string; value: string }[];
  downloads: DownloadLink[];
};

const PRODUCTS: SolarProduct[] = [
  {
    title: "NEOSTAR 3P+60 Dual-Glass 530W–550W",
    imageSrc:
      "https://aikosolar.com/wp-content/uploads/2026/03/neostar-3pplus60-dual-glass-detail-m.jpg",
    t: {
      en: {
        series: "NEOSTAR — Residential",
        desc: "3rd-generation ABC INFINITE module. Partial shading optimisation, better temperature coefficient (-0.26 %/°C), micro-crack resistance, 25-year product warranty and 30-year performance warranty. Efficiency up to 24.8 %. BloombergNEF Tier 1 Solar PV manufacturer.",
      },
      zh: {
        series: "NEOSTAR — 户用场景",
        desc: "第三代 ABC INFINITE 组件。局部遮挡优化、更优温度系数（−0.26 %/°C）、抗微裂纹，25 年产品质保及 30 年性能质保，效率高达 24.8%。彭博新能源财经 Tier 1 认证。",
      },
      es: {
        series: "NEOSTAR — Residencial",
        desc: "Módulo ABC INFINITE de tercera generación. Optimización de sombreado parcial, mejor coeficiente de temperatura (-0,26 %/°C), resistencia a microgrietas, 25 años de garantía de producto y 30 años de garantía de rendimiento. Eficiencia de hasta 24,8 %. Fabricante de paneles solares Tier 1 de BloombergNEF.",
      },
    },
    specs: [
      { labelKey: "powerRange", value: "530 W – 550 W" },
      { labelKey: "glassType", value: "Dual-Glass" },
      { labelKey: "generation", value: "3rd-generation" },
      { labelKey: "dimensions", value: "1954 × 1134 × 30" },
      { labelKey: "efficiency", value: "Up to 24.8 %" },
      { labelKey: "tempCoeff", value: "−0.26 %/°C" },
    ],
    downloads: [
      {
        text: "Datasheet (PDF)",
        url: "https://aikosolar.com/wp-content/uploads/2026/03/Neostar-3PPlus60_193-AIKO-A-MCE60Dw_530-550W-1954x1134x30mm_202602_V4.1_EN.pdf",
      },
      {
        text: "Warranty (PDF)",
        url: "https://aikosolar.com/wp-content/uploads/2025/11/Residential-Commercial-White%E2%80%91Backsheet-Module-Warranty-1.6-EN.pdf",
      },
    ],
  },
  {
    title: "NEOSTAR 3P60 Mono-Glass 530W–555W",
    imageSrc:
      "https://aikosolar.com/wp-content/uploads/2026/03/neostar-3p60-mono-glass-detail-m.jpg",
    t: {
      en: {
        series: "NEOSTAR — Residential",
        desc: "3rd-generation mono-glass residential module with infinite technology. Higher power output, lower BOS, and more aesthetic values.",
      },
      zh: {
        series: "NEOSTAR — 户用场景",
        desc: "第三代单玻户用组件 ，搭载 Infinite Technology，功率更高、BOS 成本更低、外观更美观。",
      },
      es: {
        series: "NEOSTAR — Residencial",
        desc: "Módulo residencial de vidrio simple de tercera generación con tecnología Infinite. Mayor potencia de salida, menor BOS y mayor valor estético.",
      },
    },
    specs: [
      { labelKey: "powerRange", value: "530 W – 555 W" },
      { labelKey: "glassType", value: "Mono-Glass" },
      { labelKey: "generation", value: "3rd-generation" },
      { labelKey: "dimensions", value: "1954 × 1134 × 30" },
    ],
    downloads: [
      {
        text: "Datasheet (PDF)",
        url: "https://aikosolar.com/static/pdfjs/web/viewer.html?file=/wp-content/uploads/2026/03/Neostar-3P60_193-AIKO-A-MCE60Mw_530-555W-1954x1134x30mm_202602_V4.1_EN-1.pdf",
      },
      {
        text: "Warranty (PDF)",
        url: "https://aikosolar.com/wp-content/uploads/2025/11/Residential-Commercial-White%E2%80%91Backsheet-Module-Warranty-1.6-EN.pdf",
      },
    ],
  },
  {
    title: "COMET 3N72 Mono-Glass 655W–690W",
    imageSrc:
      "https://aikosolar.com/wp-content/uploads/2024/06/Comet-3N72-Mono-Glass-655w-680w-detail-m.jpg",
    t: {
      en: {
        series: "COMET — C&I",
        desc: "Higher return rate in the same payback period. 3rd-generation N-type module for commercial & industrial applications with partial shading optimisation and micro-crack resistance.",
      },
      zh: {
        series: "COMET — 工商业场景",
        desc: "相同回收期内更高收益率 。第三代 N 型工商业组件，具备局部遮挡优化与抗微裂纹特性。",
      },
      es: {
        series: "COMET — C&I",
        desc: "Mayor tasa de retorno en el mismo período de recuperación. Módulo N-type de tercera generación para aplicaciones comerciales e industriales con optimización de sombreado parcial y resistencia a microgrietas.",
      },
    },
    specs: [
      { labelKey: "powerRange", value: "655 W – 690 W" },
      { labelKey: "glassType", value: "Mono-Glass" },
      { labelKey: "generation", value: "3rd-generation" },
      { labelKey: "dimensions", value: "2382 × 1134 × 30" },
    ],
    downloads: [
      {
        text: "Datasheet (PDF)",
        url: "https://aikosolar.com/static/pdfjs/web/viewer.html?file=/wp-content/uploads/2026/03/Comet-3N72-197-AIKO-A-MDE72Mw_655-690W-2382%C3%971134%C3%9730_202601_V1.1_EN.pdf",
      },
    ],
  },
  {
    title: "STELLAR 3N+72 Dual-Glass 655W–685W",
    imageSrc:
      "https://aikosolar.com/wp-content/uploads/2025/12/Stellar-3Nplus72-606-400.jpg",
    t: {
      en: {
        series: "STELLAR — Utility",
        desc: "Higher power output and lower LCOE for utility-scale solar projects. 3rd-generation dual-glass N-type module with infinite technology.",
      },
      zh: {
        series: "STELLAR — 地面电站场景",
        desc: "更高功率输出与更低度电成本 ，适用于大型地面电站。第三代双玻 N 型组件，搭载 Infinite Technology。",
      },
      es: {
        series: "STELLAR — Utilidad",
        desc: "Mayor potencia de salida y menor LCOE para proyectos solares a gran escala. Módulo N-type de doble vidrio de tercera generación con tecnología Infinite.",
      },
    },
    specs: [
      { labelKey: "powerRange", value: "655 W – 685 W" },
      { labelKey: "glassType", value: "Dual-Glass" },
      { labelKey: "generation", value: "3rd-generation" },
      { labelKey: "dimensions", value: "2382 × 1134 × 30" },
    ],
    downloads: [
      {
        text: "Datasheet (PDF)",
        url: "https://aikosolar.com/static/pdfjs/web/viewer.html?file=/wp-content/uploads/2026/03/Stellar-3NPlus72-AIKO-A-MDE72Dw_655-675W-2382x1134x30mm_202602_V4.1_EN.pdf",
      },
      {
        text: "Warranty (PDF)",
        url: "https://aikosolar.com/wp-content/uploads/2025/11/Utility%E2%80%91Scale-Module-Warranty-1.6-EN.pdf",
      },
    ],
  },
  {
    title: "STELLAR 2N+78 Dual-Glass 770W–805W",
    imageSrc:
      "https://aikosolar.com/wp-content/uploads/2024/03/Stellar-series-1Nplus_Polaris-detail-m.jpg",
    t: {
      en: {
        series: "STELLAR — Utility",
        desc: "Ultra-high power utility module. 2nd-generation dual-glass N-type with 770–805 W output and advanced thermal management.",
      },
      zh: {
        series: "STELLAR — 地面电站场景",
        desc: "超高功率地面电站组件 ，第二代双玻 N 型，功率 770–805 W，具备先进热管理设计。",
      },
      es: {
        series: "STELLAR — Utilidad",
        desc: "Módulo de alta potencia para servicios públicos. N-type de doble vidrio de segunda generación con potencia de 770–805 W y gestión térmica avanzada.",
      },
    },
    specs: [
      { labelKey: "powerRange", value: "770 W – 805 W" },
      { labelKey: "glassType", value: "Dual-Glass" },
      { labelKey: "generation", value: "2nd-generation" },
      { labelKey: "dimensions", value: "2465 × 1303 × 33" },
    ],
    downloads: [
      {
        text: "Datasheet (PDF)",
        url: "https://aikosolar.com/static/pdfjs/web/viewer.html?file=/wp-content/uploads/2025/12/Stellar-2Nplus78_AIKO-A-GRH78Dw-770-805W_2465x1303x33mm_202511_V5.1_DsDr_EN.pdf",
      },
      {
        text: "Warranty (PDF)",
        url: "https://aikosolar.com/static/pdfjs/web/viewer.html?file=/wp-content/uploads/2025/11/Utility%E2%80%91Scale-Module-Warranty-1.6-EN.pdf",
      },
    ],
  },
  {
    title: "NEBULAR 2P54 Mono-Facial 435W–450W",
    imageSrc:
      "https://aikosolar.com/wp-content/uploads/2024/03/Light-detail-m.jpg",
    t: {
      en: {
        series: "NEBULAR — Lightweight",
        desc: "Lightweight module for roofs with limited load-bearing capacity. Partial shading optimisation, micro-crack resistance, and more aesthetic values.",
      },
      zh: {
        series: "NEBULAR — 轻质组件",
        desc: "轻质组件 ，适用于承重有限的屋顶。具备局部遮挡优化、抗微裂纹特性及更美观外形。",
      },
      es: {
        series: "NEBULAR — Peso ligero",
        desc: "Módulo ligero para techos con capacidad de carga limitada. Optimización de sombreado parcial, resistencia a microgrietas y mayor valor estético.",
      },
    },
    specs: [
      { labelKey: "powerRange", value: "435 W – 450 W" },
      { labelKey: "glassType", value: "Mono-Facial" },
      { labelKey: "generation", value: "2nd-generation" },
      { labelKey: "dimensions", value: "1762 × 1134 × 30" },
    ],
    downloads: [
      {
        text: "Datasheet (PDF)",
        url: "https://aikosolar.com/static/pdfjs/web/viewer.html?file=/wp-content/uploads/2025/10/Nebular-2P_188-AIKO-A-MAH54Tm-435W-450W-1762x1134x30mm_V3.1_202501_DsDr_EN.pdf",
      },
      {
        text: "Warranty (PDF)",
        url: "https://aikosolar.com/wp-content/uploads/2025/11/Lightweight-Module-Warranty-1.5-EN.pdf",
      },
    ],
  },
];

/**
 * Spec label translations — shared across all products on this page.
 * Add more locales as needed; the component falls back to `en`.
 */
const SPEC_LABELS: Record<string, Record<string, string>> = {
  powerRange:  { en: "Power Range", zh: "功率范围", es: "Rango de potencia" },
  glassType:   { en: "Glass Type", zh: "玻璃类型", es: "Tipo de vidrio" },
  generation:  { en: "Generation", zh: "代次", es: "Generación" },
  dimensions:  { en: "Dimensions (mm)", zh: "尺寸 (mm)", es: "Dimensiones (mm)" },
  efficiency:  { en: "Efficiency", zh: "效率", es: "Eficiencia" },
  tempCoeff:   { en: "Temperature Coeff.", zh: "温度系数", es: "Coef. de temperatura" },
};

function getLabel(labelKey: string, locale: string): string {
  return SPEC_LABELS[labelKey]?.[locale] ?? SPEC_LABELS[labelKey]?.en ?? labelKey;
}

export default function SolarPanelsPage() {
  const { locale, messages } = useLocaleContext();
  const m = messages.productsSolarPanels ?? {};

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden border-b border-[var(--border)]">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900" />
          <div className="pointer-events-none absolute inset-0 bg-grid-slate bg-[length:44px_44px] opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-20%,rgba(245,158,11,0.12),transparent)]" />

          <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 shadow-sm transition hover:border-solar-500/40 hover:bg-solar-500/10 hover:text-solar-300"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
              {m.back}
            </Link>

            <p className="mt-8 inline-flex rounded-full border border-[var(--border)] bg-[var(--accent-dim)] px-3 py-1 text-xs font-medium text-solar-400">
              {m.badge}
            </p>
            <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {m.pageTitle}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">{m.pageSub}</p>
            <p className="mt-3 text-xs text-slate-500">
              {m.source}:{" "}
              <a
                href="https://aikosolar.com/en/products/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-solar-400"
              >
                {m.sourceLink}
              </a>
            </p>
          </div>
        </section>

        {/* ── Product Grid ── */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{m.gridTitle}</h2>

            <div className="mt-10 space-y-10">
              {PRODUCTS.map((p) => {
                const t = p.t[locale] ?? p.t.en;
                return (
                  <article
                    key={p.title}
                    className="overflow-hidden rounded-2xl border border-[var(--border)] bg-slate-800/80 shadow-xl shadow-black/20 backdrop-blur sm:flex"
                  >
                    <div className="relative flex min-h-[240px] w-full items-center justify-center bg-slate-900/80 p-6 sm:w-2/5 sm:min-h-[280px]">
                      <img
                        src={p.imageSrc}
                        alt={p.title}
                        loading="lazy"
                        decoding="async"
                        className="max-h-[240px] w-full max-w-full object-contain transition duration-300 hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between border-t border-[var(--border)] p-6 sm:border-l sm:border-t-0 sm:p-8">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-solar-500">
                          {t.series}
                        </p>
                        <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">{p.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-400">
                          {t.desc}
                        </p>

                        <div className="mt-6">
                          <ComparisonSpecTable
                            rows={p.specs.map((row) => ({
                              label: getLabel(row.labelKey, locale),
                              values: [row.value],
                            }))}
                          />
                        </div>
                      </div>

                      {p.downloads.length > 0 && (
                        <div className="mt-8 flex flex-wrap gap-3 border-t border-white/5 pt-6">
                          {p.downloads.map((dl) => (
                            <a
                              key={dl.url}
                              href={dl.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-solar-500/40 hover:bg-solar-500/10 hover:text-solar-300"
                            >
                              <Download className="h-4 w-4 shrink-0" aria-hidden />
                              {dl.text}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

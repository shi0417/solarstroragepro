"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { ComparisonSpecTable, type ComparisonSpecRow } from "@/components/site/ComparisonSpecTable";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";

export default function AllInOneDetailsPage() {
  const { locale } = useLocaleContext();
  const isZh = locale === "zh";

  const ui = isZh
    ? {
        back: "返回户用光储列表",
        title: "壁挂式 / 落地式 LFP 电池对比",
        sub: "采用“侧边表头”竖排对比：左侧为参数项，右侧每一列为一个具体型号。支持横向滚动查看全部型号。",
        section: "参数对比（6 个型号）",
        corner: "参数名称",
      }
    : {
        back: "Back to residential ESS",
        title: "Wall-mount / floor LFP battery comparison",
        sub: "Side-label comparison table: labels on the left, one column per model. Horizontal scroll enabled for 6 models.",
        section: "Comparison (6 models)",
        corner: "Parameter",
      };

  const titles = [
    "MDS-512100 (A)",
    "MDS-512100 (B)",
    "MDS-512100 (C)",
    "MDS-256200",
    "MDS-512206 (A)",
    "MDS-512206 (B)",
  ];

  const rows: ComparisonSpecRow[] = [
    {
      label: "Nominal Voltage",
      values: ["51.2V", "51.2V", "51.2V", "25.6V", "51.2V", "51.2V"],
    },
    {
      label: "Nominal Capacity",
      values: ["100Ah", "100Ah", "100Ah", "200Ah", "206Ah", "206Ah"],
    },
    {
      label: "Energy",
      values: ["5.12kWh", "5.12kWh", "5.12kWh", "5.12kWh", "10.54kWh", "10.54kWh"],
    },
    {
      label: "Cycle Life",
      values: ["6000 Times", "6000 Times", "6000 Times", "6000 Times", "6000 Times", "6000 Times"],
    },
    {
      label: "Dimension (mm)",
      values: ["410*145*660", "377*152*626", "400*150*600", "410*145*660", "800*139*660", "450*360*580"],
    },
    {
      label: "Communication",
      values: ["RS485/232/CAN", "RS485/232/CAN", "RS485/232/CAN", "RS485/232/CAN", "RS485/232/CAN", "RS485/232/CAN"],
    },
  ];

  const tableProps = {
    cellAlign: "center" as const,
    labelColumnStyle: "slate800" as const,
  };

  const imageCards = titles.map((t) => {
    const safe = t
      .replaceAll(" ", "")
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll(".", "")
      .replaceAll("/", "-");
    return { title: t, safe };
  });

  function buildCandidates(title: string, safe: string) {
    const noSpace = title.replaceAll(" ", "");
    const noSpaceNoParens = noSpace.replaceAll("(", "").replaceAll(")", "");
    const inImages = (name: string) => `/images/${name}.png`;
    const inRoot = (name: string) => `/${name}.png`;
    return [
      inImages(safe),
      inImages(noSpaceNoParens),
      inImages(noSpace),
      inImages(title),
      inRoot(safe),
      inRoot(noSpaceNoParens),
      inRoot(noSpace),
      inRoot(title),
    ];
  }

  function ModelImage({ title, safe }: { title: string; safe: string }) {
    const candidates = useMemo(() => buildCandidates(title, safe), [title, safe]);
    const [idx, setIdx] = useState(0);
    const src = candidates[Math.min(idx, candidates.length - 1)];

    return (
      <img
        src={src}
        alt={title}
        loading="lazy"
        decoding="async"
        className="max-h-[180px] w-full object-contain"
        onError={() => {
          setIdx((v) => (v + 1 < candidates.length ? v + 1 : v));
        }}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-[var(--border)]">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900" />
          <div className="pointer-events-none absolute inset-0 bg-grid-slate bg-[length:44px_44px] opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-20%,rgba(245,158,11,0.12),transparent)]" />

          <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
            <Link
              href="/products/residential-ess"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 shadow-sm transition hover:border-solar-500/40 hover:bg-solar-500/10 hover:text-solar-300"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
              {ui.back}
            </Link>

            <h1 className="mt-8 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {ui.title}
            </h1>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-300">{ui.sub}</p>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-8">
              <h2 className="text-xl font-bold text-solar-300 sm:text-2xl">{ui.section}</h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {imageCards.map((img) => (
                  <div
                    key={img.title}
                    className="flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-xl border border-slate-700/50 bg-slate-900/60 p-4"
                  >
                    <ModelImage title={img.title} safe={img.safe} />
                    <p className="w-full truncate text-center text-xs font-semibold text-slate-200">
                      {img.title}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <ComparisonSpecTable
                  headerRow={{ cornerLabel: ui.corner, titles }}
                  rows={rows}
                  {...tableProps}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


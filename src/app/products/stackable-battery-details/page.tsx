"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { ComparisonSpecTable, type ComparisonSpecRow } from "@/components/site/ComparisonSpecTable";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";

type Model = {
  label: string; // 用于表头展示（不含 MDS- 前缀的简写）
  full: string; // 用于图片与展示（含 MDS- 前缀）
};

const MODELS: Model[] = [
  { label: "512314(A)", full: "MDS-512314(A)" },
  { label: "512314(B)", full: "MDS-512314(B)" },
  { label: "256314", full: "MDS-256314" },
  { label: "512200(A)", full: "MDS-512200(A)" },
  { label: "512314(D)", full: "MDS-512314(D)" },
  { label: "512200(B)", full: "MDS-512200(B)" },
  { label: "512314(E)", full: "MDS-512314(E)" },
];

function buildCandidates(name: string) {
  const inImages = (n: string) => `/images/${n}.png`;
  const inRoot = (n: string) => `/${n}.png`;

  const noSpace = name.replaceAll(" ", "");
  const noSpaceNoParens = noSpace.replaceAll("(", "").replaceAll(")", "");
  const noMds = name.replace(/^MDS-/, "");
  const noMdsNoSpace = noMds.replaceAll(" ", "");
  const noMdsNoParens = noMdsNoSpace.replaceAll("(", "").replaceAll(")", "");

  return [
    inImages(name),
    inImages(noSpace),
    inImages(noSpaceNoParens),
    inImages(noMds),
    inImages(noMdsNoSpace),
    inImages(noMdsNoParens),
    inRoot(name),
    inRoot(noSpace),
    inRoot(noSpaceNoParens),
    inRoot(noMds),
    inRoot(noMdsNoSpace),
    inRoot(noMdsNoParens),
  ];
}

function ModelImage({ name }: { name: string }) {
  const candidates = useMemo(() => buildCandidates(name), [name]);
  const [idx, setIdx] = useState(0);
  const src = candidates[Math.min(idx, candidates.length - 1)];

  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      decoding="async"
      className="max-h-[170px] w-full object-contain"
      onError={() => setIdx((v) => (v + 1 < candidates.length ? v + 1 : v))}
    />
  );
}

export default function StackableBatteryDetailsPage() {
  const { locale } = useLocaleContext();
  const isZh = locale === "zh";

  const ui = isZh
    ? {
        back: "返回户用光储列表",
        title: "堆叠式 / 落地式电池（314Ah / 200Ah）对比",
        sub: "同系列 7 个型号参数对比：左侧为参数项，右侧每一列为一个具体型号。支持横向滚动查看。",
        section: "参数对比（7 个型号）",
        corner: "参数名称",
      }
    : {
        back: "Back to residential ESS",
        title: "Stackable / floor-standing battery comparison",
        sub: "Comparison for 7 variants in the same family: labels on the left, one column per model. Horizontal scroll enabled.",
        section: "Comparison (7 models)",
        corner: "Parameter",
      };

  const titles = MODELS.map((m) => m.full);

  const rows: ComparisonSpecRow[] = [
    {
      label: "Nominal Voltage",
      values: ["51.2V", "51.2V", "25.6V", "51.2V", "51.2V", "51.2V", "51.2V"],
    },
    {
      label: "Nominal Capacity",
      values: ["314Ah", "314Ah", "314Ah", "200Ah", "314Ah", "200Ah", "314Ah"],
    },
    {
      label: "Energy",
      values: ["16.07kWh", "16.07kWh", "8.03kWh", "10.24kWh", "16.07kWh", "10.24kWh", "16.07kWh"],
    },
    {
      label: "Cycle Life",
      values: ["8000 Times", "8000 Times", "8000 Times", "6000 Times", "8000 Times", "6000 Times", "8000 Times"],
    },
    {
      label: "Dimension (mm)",
      values: ["485*245*823", "553*256*845", "485*245*823", "428*366*708", "730*610*257", "428*366*708", "530*145*825"],
    },
    {
      label: "Communication",
      values: ["RS485/CAN", "RS485/CAN", "RS485/CAN", "RS485/CAN", "RS485/CAN", "RS485/CAN", "RS485/CAN"],
    },
  ];

  const tableProps = {
    cellAlign: "center" as const,
    labelColumnStyle: "slate900" as const,
  };

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

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {MODELS.map((m) => (
                  <div
                    key={m.full}
                    className="flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-xl border border-slate-700/50 bg-slate-900/60 p-4"
                  >
                    <ModelImage name={m.full} />
                    <p className="w-full truncate text-center text-xs font-semibold text-slate-200">
                      {m.full}
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


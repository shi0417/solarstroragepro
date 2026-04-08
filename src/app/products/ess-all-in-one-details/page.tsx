"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ComparisonSpecTable } from "@/components/site/ComparisonSpecTable";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";

type SpecRow = { label: string; value: string };

type SeriesBlock = {
  id: string;
  badge: string;
  title: string;
  model: string;
  imageSrc: string;
  specs: SpecRow[];
  note?: string;
};

export default function EssAllInOneDetailsPage() {
  const { locale } = useLocaleContext();
  const isZh = locale === "zh";

  const ui = isZh
    ? {
        back: "返回户用光储列表",
        pageTitle: "ESS All-in-one 系列",
        pageSub: "便携式储能（500W / 1000W）与模块化堆叠一体机，覆盖移动备电与家庭可扩展装机场景。",
      }
    : {
        back: "Back to residential ESS",
        pageTitle: "ESS All-in-one series",
        pageSub:
          "Portable power stations (500W / 1000W) plus a modular stacked all-in-one for mobile backup and scalable home energy.",
      };

  const series: SeriesBlock[] = isZh
    ? [
        {
          id: "portable-500",
          badge: "便携式 · 500W 级",
          title: "便携式储能系统",
          model: "MD-BXS500",
          imageSrc: "/images/MD-BXS500.png",
          specs: [
            { label: "型号", value: "MD-BXS500" },
            { label: "额定功率", value: "500W" },
            { label: "额定能量", value: "1004.8Wh" },
            { label: "电压", value: "3.2V" },
            { label: "容量", value: "314Ah" },
            { label: "AC 输出", value: "180–230VAC" },
            { label: "AC 输入", value: "90–280VAC" },
            { label: "尺寸 (mm)", value: "210 × 156 × 360" },
          ],
        },
        {
          id: "portable-1000",
          badge: "便携式 · 1000W 级",
          title: "便携式储能系统",
          model: "MD-BXS1000",
          imageSrc: "/images/MD-BXS1000.png",
          specs: [
            { label: "型号", value: "MD-BXS1000" },
            { label: "额定功率", value: "1000W" },
            { label: "额定能量", value: "2009.6Wh" },
            { label: "电压", value: "6.4V" },
            { label: "容量", value: "314Ah" },
            { label: "AC 输出", value: "185–230VAC" },
            { label: "AC 输入", value: "90–280VAC" },
            { label: "尺寸 (mm)", value: "240 × 225 × 360" },
          ],
        },
        {
          id: "modular",
          badge: "模块化一体机",
          title: "模块化一体机系统",
          model: "MD-BXS15360",
          imageSrc: "/images/MD-BXS15360.png",
          specs: [
            { label: "型号", value: "MD-BXS15360" },
            { label: "标称电压", value: "51.2V" },
            { label: "容量", value: "100Ah" },
            { label: "单模块能量", value: "5.12kWh" },
            { label: "扩展能力", value: "可堆叠扩容；三模块约 15.36kWh" },
            { label: "循环寿命", value: "6000 次" },
            { label: "通讯", value: "RS485 / RS232 / CAN" },
            { label: "尺寸 — 单层 (mm)", value: "550 × 495 × 195" },
            { label: "尺寸 — 三层 (mm)", value: "550 × 495 × 585" },
          ],
          note: "模块化设计：按负载与备电时长增加堆叠层数，工程接线与并网要求以当地规范与安装说明为准。",
        },
      ]
    : [
        {
          id: "portable-500",
          badge: "Portable · 500W class",
          title: "Portable energy storage",
          model: "MD-BXS500",
          imageSrc: "/images/MD-BXS500.png",
          specs: [
            { label: "Model", value: "MD-BXS500" },
            { label: "Rated power", value: "500W" },
            { label: "Rated energy", value: "1004.8Wh" },
            { label: "Voltage", value: "3.2V" },
            { label: "Capacity", value: "314Ah" },
            { label: "AC output", value: "180–230VAC" },
            { label: "AC input", value: "90–280VAC" },
            { label: "Dimensions (mm)", value: "210 × 156 × 360" },
          ],
        },
        {
          id: "portable-1000",
          badge: "Portable · 1000W class",
          title: "Portable energy storage",
          model: "MD-BXS1000",
          imageSrc: "/images/MD-BXS1000.png",
          specs: [
            { label: "Model", value: "MD-BXS1000" },
            { label: "Rated power", value: "1000W" },
            { label: "Rated energy", value: "2009.6Wh" },
            { label: "Voltage", value: "6.4V" },
            { label: "Capacity", value: "314Ah" },
            { label: "AC output", value: "185–230VAC" },
            { label: "AC input", value: "90–280VAC" },
            { label: "Dimensions (mm)", value: "240 × 225 × 360" },
          ],
        },
        {
          id: "modular",
          badge: "Modular all-in-one",
          title: "Modular ESS all-in-one",
          model: "MD-BXS15360",
          imageSrc: "/images/MD-BXS15360.png",
          specs: [
            { label: "Model", value: "MD-BXS15360" },
            { label: "Nominal voltage", value: "51.2V" },
            { label: "Capacity", value: "100Ah" },
            { label: "Energy per module", value: "5.12kWh" },
            { label: "Scalability", value: "Stackable expansion; ~15.36kWh with three modules" },
            { label: "Cycle life", value: "6000 cycles" },
            { label: "Communication", value: "RS485 / RS232 / CAN" },
            { label: "Dimensions — single tier (mm)", value: "550 × 495 × 195" },
            { label: "Dimensions — three tiers (mm)", value: "550 × 495 × 585" },
          ],
          note: "Modular stacking: scale tiers for load and backup duration; follow local codes and installation guides for wiring and grid connection.",
        },
      ];

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
              {ui.pageTitle}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">{ui.pageSub}</p>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-6xl space-y-16 px-4 sm:space-y-20 sm:px-6">
            {series.map((block) => (
              <article
                key={block.id}
                className="grid gap-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start"
              >
                <div className="flex flex-col items-center justify-center rounded-xl bg-slate-900/70 px-4 py-8 lg:min-h-[280px]">
                  <img
                    src={block.imageSrc}
                    alt={block.model}
                    loading="lazy"
                    decoding="async"
                    className="max-h-[240px] w-full max-w-sm object-contain sm:max-h-[280px]"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-solar-400">{block.badge}</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">{block.title}</h2>
                  <p className="mt-1 text-sm font-medium text-slate-400">{block.model}</p>

                  <div className="mt-6">
                    <ComparisonSpecTable
                      rows={block.specs.map((row) => ({
                        label: row.label,
                        values: [row.value],
                      }))}
                    />
                  </div>

                  {block.note ? (
                    <p className="mt-4 text-xs leading-relaxed text-slate-500">{block.note}</p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

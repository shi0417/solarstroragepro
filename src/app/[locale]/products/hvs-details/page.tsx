"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ComparisonSpecTable, type ComparisonSpecRow } from "@/components/site/ComparisonSpecTable";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";

export default function HvsDetailsPage() {
  const { locale, messages } = useLocaleContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const m = (messages as any).productsHvs ?? {};
  const isZh = locale === "zh";

  const rowsA: ComparisonSpecRow[] = isZh
    ? [
        { label: "型号", values: ["MDS-3584100", "MDS-5120100"] },
        { label: "标称电压", values: ["358.4V", "512V"] },
        { label: "容量", values: ["100Ah", "100Ah"] },
        { label: "能量配置", values: ["5.12kWh×7", "5.12kWh×10"] },
        { label: "循环寿命", values: ["6000 次", "6000 次"] },
        { label: "尺寸", values: ["440×442×133 mm×7", "440×442×133 mm×10"] },
        { label: "通讯", values: ["RS485/RS232/CAN", "RS485/RS232/CAN"] },
      ]
    : [
        { label: "Model", values: ["MDS-3584100", "MDS-5120100"] },
        { label: "Voltage", values: ["358.4V", "512V"] },
        { label: "Capacity", values: ["100Ah", "100Ah"] },
        { label: "Energy", values: ["5.12kWh × 7", "5.12kWh × 10"] },
        { label: "Cycle life", values: ["6000 cycles", "6000 cycles"] },
        { label: "Dimensions", values: ["440×442×133 mm × 7", "440×442×133 mm × 10"] },
        { label: "Comm.", values: ["RS485/RS232/CAN", "RS485/RS232/CAN"] },
      ];

  const rowsB: ComparisonSpecRow[] = isZh
    ? [
        { label: "型号", values: ["MDS-3584280 (A)", "MDS-5632280", "MDS-7168280 (A)"] },
        { label: "标称电压", values: ["358.4V", "563.2V", "716.8V"] },
        { label: "容量", values: ["280Ah", "280Ah", "280Ah"] },
        { label: "能量配置", values: ["14.336kWh×7", "14.336kWh×11", "14.336kWh×14"] },
        { label: "循环寿命", values: ["8000 次", "8000 次", "8000 次"] },
        { label: "单模块尺寸", values: ["483×792×245 mm", "483×792×245 mm", "483×792×245 mm"] },
        { label: "通讯", values: ["RS485/RS232/CAN", "RS485/RS232/CAN", "RS485/RS232/CAN"] },
      ]
    : [
        { label: "Model", values: ["MDS-3584280 (A)", "MDS-5632280", "MDS-7168280 (A)"] },
        { label: "Voltage", values: ["358.4V", "563.2V", "716.8V"] },
        { label: "Capacity", values: ["280Ah", "280Ah", "280Ah"] },
        { label: "Energy", values: ["14.336kWh × 7", "14.336kWh × 11", "14.336kWh × 14"] },
        { label: "Cycle life", values: ["8000 cycles", "8000 cycles", "8000 cycles"] },
        { label: "Module size", values: ["483×792×245 mm", "483×792×245 mm", "483×792×245 mm"] },
        { label: "Comm.", values: ["RS485/RS232/CAN", "RS485/RS232/CAN", "RS485/RS232/CAN"] },
      ];

  const rowsC: ComparisonSpecRow[] = isZh
    ? [
        { label: "型号", values: ["MDS-3584280 (B)", "MDS-7168280 (B)"] },
        { label: "标称电压", values: ["358.4V", "716.8V"] },
        { label: "能量总量", values: ["100.352kWh", "200.704kWh"] },
        { label: "循环寿命", values: ["8000 次", "8000 次"] },
        { label: "外形尺寸", values: ["1250×1245×2175 mm", "1626×1245×2175 mm"] },
        { label: "通讯", values: ["RS485/RS232/CAN", "RS485/RS232/CAN"] },
      ]
    : [
        { label: "Model", values: ["MDS-3584280 (B)", "MDS-7168280 (B)"] },
        { label: "Nominal voltage", values: ["358.4V", "716.8V"] },
        { label: "Total energy", values: ["100.352kWh", "200.704kWh"] },
        { label: "Cycle life", values: ["8000 cycles", "8000 cycles"] },
        { label: "Footprint", values: ["1250×1245×2175 mm", "1626×1245×2175 mm"] },
        { label: "Comm.", values: ["RS485/RS232/CAN", "RS485/RS232/CAN"] },
      ];

  const blocks: {
    id: string;
    heading: string;
    imageSrc: string;
    imageAlt: string;
    intro: string;
    rows: ComparisonSpecRow[];
  }[] = [
    {
      id: "100ah",
      heading: m.secA,
      imageSrc: "/images/HVS-100Ah.png",
      imageAlt: "HVS 100Ah rack-mount",
      intro: m.introA,
      rows: rowsA,
    },
    {
      id: "280ah",
      heading: m.secB,
      imageSrc: "/images/HVS-280Ah.png",
      imageAlt: "HVS 280Ah rack-mount",
      intro: m.introB,
      rows: rowsB,
    },
    {
      id: "cabinet",
      heading: m.secC,
      imageSrc: "/images/HVS-Cabinet.png",
      imageAlt: "HVS cabinet BESS",
      intro: m.introC,
      rows: rowsC,
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
              href="/products/residential-ess"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 shadow-sm transition hover:border-solar-500/40 hover:bg-solar-500/10 hover:text-solar-300"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
              {m.back}
            </Link>

            <h1 className="mt-8 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {m.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">{m.sub}</p>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-6xl space-y-20 px-4 sm:px-6">
            {blocks.map((block) => (
              <article
                key={block.id}
                className="grid gap-8 rounded-2xl border border-[var(--border)] bg-slate-800/80 p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start"
              >
                <div className="flex flex-col items-center justify-center rounded-xl bg-slate-900/70 px-4 py-8 lg:min-h-[260px]">
                  <img
                    src={block.imageSrc}
                    alt={block.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="max-h-[220px] w-full max-w-md object-contain sm:max-h-[260px]"
                  />
                </div>

                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-solar-300 sm:text-2xl">{block.heading}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{block.intro}</p>
                  <div className="mt-6">
                    <ComparisonSpecTable rows={block.rows} />
                  </div>
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

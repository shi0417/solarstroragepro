"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ComparisonSpecTable, type ComparisonSpecRow } from "@/components/site/ComparisonSpecTable";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";

export default function HvsDetailsPage() {
  const { locale } = useLocaleContext();
  const isZh = locale === "zh";

  const ui = isZh
    ? {
        back: "返回户用光储列表",
        title: "高压系统 HVS 系列",
        sub: "标准机架式（100Ah / 280Ah）与柜式大容量 BESS，覆盖 358.4V–716.8V 直流母线与百 kWh 级能量配置。",
        secA: "区块 A · 标准机架式（100Ah）",
        secB: "区块 B · 大容量机架式（280Ah）",
        secC: "区块 C · 柜式储能系统（大容量）",
      }
    : {
        back: "Back to residential ESS",
        title: "HVS high-voltage series",
        sub: "Rack-mount 100Ah / 280Ah platforms plus cabinet-class BESS from 358.4V–716.8V DC up to 200+kWh-class energy.",
        secA: "Section A · Standard rack-mount (100Ah)",
        secB: "Section B · High-capacity rack-mount (280Ah)",
        secC: "Section C · Cabinet BESS (bulk energy)",
      };

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
      heading: ui.secA,
      imageSrc: "/images/HVS-100Ah.png",
      imageAlt: "HVS 100Ah rack-mount",
      intro: isZh
        ? "100Ah 标准机架：左侧为参数项，右侧各列对应不同型号，便于逐项对比电压、能量与尺寸。"
        : "100Ah rack family: parameter labels on the left, one column per model for quick side-by-side review.",
      rows: rowsA,
    },
    {
      id: "280ah",
      heading: ui.secB,
      imageSrc: "/images/HVS-280Ah.png",
      imageAlt: "HVS 280Ah rack-mount",
      intro: isZh
        ? "280Ah 大容量机架：最高 716.8V，14.336kWh 单模块按 7 / 11 / 14 组扩展，8000 次循环。"
        : "280Ah racks up to 716.8V with 14.336kWh modules in 7 / 11 / 14 stacks and 8000-cycle life.",
      rows: rowsB,
    },
    {
      id: "cabinet",
      heading: ui.secC,
      imageSrc: "/images/HVS-Cabinet.png",
      imageAlt: "HVS cabinet BESS",
      intro: isZh
        ? "柜式 BESS：百 kWh 级与两百 kWh 级并排对比，工业级外形尺寸一目了然。"
        : "Cabinet BESS: ~100kWh vs ~200kWh columns with industrial footprints side by side.",
      rows: rowsC,
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
              {ui.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">{ui.sub}</p>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-6xl space-y-20 px-4 sm:px-6">
            {blocks.map((block) => (
              <article
                key={block.id}
                className="grid gap-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start"
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

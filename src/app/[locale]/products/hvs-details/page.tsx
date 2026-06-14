"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ComparisonSpecTable, type ComparisonSpecRow } from "@/components/site/ComparisonSpecTable";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";

/**
 * Spec label keys used in the HVS comparison tables.
 * Translations live in messages.productsHvs.specLabels.
 */
const SPEC_LABELS = {
  model: "model",
  voltage: "voltage",
  capacity: "capacity",
  energy: "energy",
  cycleLife: "cycleLife",
  dimensions: "dimensions",
  comm: "comm",
  moduleSize: "moduleSize",
  totalEnergy: "totalEnergy",
  footprint: "footprint",
} as const;

type SpecRowKey = keyof typeof SPEC_LABELS;

function buildRows(
  labelKeys: SpecRowKey[],
  valuesList: string[][],
  locale: string,
  specLabels: Record<string, Record<string, string>>,
): ComparisonSpecRow[] {
  return labelKeys.map((key, i) => ({
    label: specLabels[key]?.[locale] ?? specLabels[key]?.en ?? key,
    values: valuesList[i],
  }));
}

export default function HvsDetailsPage() {
  const { locale, messages } = useLocaleContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const m = (messages as any).productsHvs ?? {};
  const specLabels: Record<string, Record<string, string>> = m.specLabels ?? {};

  // Universal spec data — values are the same across all languages
  const rowsAData: { keys: SpecRowKey[]; values: string[][] } = {
    keys: ["model", "voltage", "capacity", "energy", "cycleLife", "dimensions", "comm"],
    values: [
      ["MDS-3584100", "MDS-5120100"],
      ["358.4V", "512V"],
      ["100Ah", "100Ah"],
      ["5.12kWh×7", "5.12kWh×10"],
      ["6000 次", "6000 次"],
      ["440×442×133 mm×7", "440×442×133 mm×10"],
      ["RS485/RS232/CAN", "RS485/RS232/CAN"],
    ],
  };

  const rowsBData: { keys: SpecRowKey[]; values: string[][] } = {
    keys: ["model", "voltage", "capacity", "energy", "cycleLife", "moduleSize", "comm"],
    values: [
      ["MDS-3584280 (A)", "MDS-5632280", "MDS-7168280 (A)"],
      ["358.4V", "563.2V", "716.8V"],
      ["280Ah", "280Ah", "280Ah"],
      ["14.336kWh×7", "14.336kWh×11", "14.336kWh×14"],
      ["8000 次", "8000 次", "8000 次"],
      ["483×792×245 mm", "483×792×245 mm", "483×792×245 mm"],
      ["RS485/RS232/CAN", "RS485/RS232/CAN", "RS485/RS232/CAN"],
    ],
  };

  const rowsCData: { keys: SpecRowKey[]; values: string[][] } = {
    keys: ["model", "voltage", "totalEnergy", "cycleLife", "footprint", "comm"],
    values: [
      ["MDS-3584280 (B)", "MDS-7168280 (B)"],
      ["358.4V", "716.8V"],
      ["100.352kWh", "200.704kWh"],
      ["8000 次", "8000 次"],
      ["1250×1245×2175 mm", "1626×1245×2175 mm"],
      ["RS485/RS232/CAN", "RS485/RS232/CAN"],
    ],
  };

  const rowsA = buildRows(rowsAData.keys, rowsAData.values, locale, specLabels);
  const rowsB = buildRows(rowsBData.keys, rowsBData.values, locale, specLabels);
  const rowsC = buildRows(rowsCData.keys, rowsCData.values, locale, specLabels);

  const blocks = [
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

"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ComparisonSpecTable, type ComparisonSpecRow } from "@/components/site/ComparisonSpecTable";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";

export default function LfpBatteryDetailsPage() {
  const { locale } = useLocaleContext();
  const isZh = locale === "zh";

  const ui = isZh
    ? {
        back: "返回户用光储列表",
        title: "LFP 电池系列",
        sub: "壁挂 / 超薄与落地、移动式磷酸铁锂产品对比。左侧为参数项，右侧各列为具体型号。",
        sec1: "超薄壁挂组 · M1200 / M2400",
        sec2: "落地 / 移动组 · M-BXS / M-LFP",
      }
    : {
        back: "Back to residential ESS",
        title: "LFP battery series",
        sub: "Wall-mount / slim and floor / portable LFP packs — parameter labels on the left, one column per model.",
        sec1: "Slim wall-mount · M1200 / M2400",
        sec2: "Floor / portable · M-BXS / M-LFP",
      };

  const corner = isZh ? "参数名称" : "Parameter";

  const rows1: ComparisonSpecRow[] = isZh
    ? [
        { label: "标称电压", values: ["51.2V", "51.2V", "51.2V"] },
        { label: "标称容量", values: ["100Ah", "200Ah", "314Ah"] },
        { label: "能量", values: ["5.12kWh", "10.24kWh", "16.0768kWh"] },
        { label: "循环寿命", values: ["6000 次", "8000 次", "8000 次"] },
        { label: "尺寸 (L×W×H)", values: ["410×145×660 mm", "530×145×825 mm", "485×245×823 mm"] },
        { label: "通讯方式", values: ["RS485/RS232/CAN", "RS232/RS485/CAN", "RS485/RS232/CAN"] },
      ]
    : [
        { label: "Nominal voltage", values: ["51.2V", "51.2V", "51.2V"] },
        { label: "Nominal capacity", values: ["100Ah", "200Ah", "314Ah"] },
        { label: "Energy", values: ["5.12kWh", "10.24kWh", "16.0768kWh"] },
        { label: "Cycle life", values: ["6000 cycles", "8000 cycles", "8000 cycles"] },
        { label: "Dimensions (L×W×H)", values: ["410×145×660 mm", "530×145×825 mm", "485×245×823 mm"] },
        { label: "Communication", values: ["RS485/RS232/CAN", "RS232/RS485/CAN", "RS485/RS232/CAN"] },
      ];

  const rows2: ComparisonSpecRow[] = isZh
    ? [
        { label: "标称电压", values: ["25.6V", "51.2V"] },
        { label: "标称容量", values: ["314Ah", "200Ah"] },
        { label: "能量", values: ["8.0384kWh", "10.24kWh"] },
        { label: "循环寿命", values: ["8000 次", "6000 次"] },
        { label: "尺寸 (L×W×H)", values: ["420×240×465 mm", "553×256×845 mm"] },
        { label: "通讯方式", values: ["RS485/RS232/CAN", "RS232/RS485/CAN"] },
      ]
    : [
        { label: "Nominal voltage", values: ["25.6V", "51.2V"] },
        { label: "Nominal capacity", values: ["314Ah", "200Ah"] },
        { label: "Energy", values: ["8.0384kWh", "10.24kWh"] },
        { label: "Cycle life", values: ["8000 cycles", "6000 cycles"] },
        { label: "Dimensions (L×W×H)", values: ["420×240×465 mm", "553×256×845 mm"] },
        { label: "Communication", values: ["RS485/RS232/CAN", "RS232/RS485/CAN"] },
      ];

  const tableProps = {
    cellAlign: "center" as const,
    labelColumnStyle: "slate800" as const,
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
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">{ui.sub}</p>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-6xl space-y-20 px-4 sm:px-6">
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-8">
              <h2 className="text-xl font-bold text-solar-300 sm:text-2xl">{ui.sec1}</h2>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { src: "/images/LFP-M1200-1.png", alt: "M1200 (1)" },
                  { src: "/images/LFP-M1200-2.png", alt: "M1200 (2)" },
                  { src: "/images/LFP-M2400.png", alt: "M2400" },
                ].map((img) => (
                  <div
                    key={img.alt}
                    className="flex min-h-[160px] items-center justify-center rounded-xl border border-slate-700/50 bg-slate-900/60 p-4"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      className="max-h-[180px] w-full object-contain"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <ComparisonSpecTable
                  headerRow={{
                    cornerLabel: corner,
                    titles: ["M1200 (1)", "M1200 (2)", "M2400"],
                  }}
                  rows={rows1}
                  {...tableProps}
                />
              </div>
            </article>

            <article className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-8">
              <h2 className="text-xl font-bold text-solar-300 sm:text-2xl">{ui.sec2}</h2>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { src: "/images/LFP-M-BXS200.png", alt: "M-BXS200" },
                  { src: "/images/LFP-M-LFP51200.png", alt: "M-LFP51200" },
                ].map((img) => (
                  <div
                    key={img.alt}
                    className="flex min-h-[180px] items-center justify-center rounded-xl border border-slate-700/50 bg-slate-900/60 p-4"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      className="max-h-[200px] w-full object-contain"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <ComparisonSpecTable
                  headerRow={{
                    cornerLabel: corner,
                    titles: ["M-BXS200", "M-LFP51200"],
                  }}
                  rows={rows2}
                  {...tableProps}
                />
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

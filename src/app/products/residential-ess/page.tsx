"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ComparisonSpecTable } from "@/components/site/ComparisonSpecTable";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";

type SpecRow = { label: string; value: string };

type ProductCard = {
  categoryKey: "lv" | "hv" | "aio";
  imageSrc: string;
  title: string;
  subtitle: string;
  specs: SpecRow[];
  /** 点击图片进入的详情页（如 LFP 系列） */
  imageDetailHref?: string;
};

const COMM_EN = "RS485 / RS232 / CAN";
const COMM_ZH = "RS485 / RS232 / CAN";

export default function ResidentialEssPage() {
  const { locale } = useLocaleContext();
  const isZh = locale === "zh";

  const ui = isZh
    ? {
        back: "返回首页",
        pageTitle: "户用光储一体机",
        pageSub:
          "涵盖低压堆叠/壁挂、高压大功率系统与集成逆变器的户用一体机，便于按需选型与扩展。",
        categoriesTitle: "产品分类概览",
        catLv: "低压系列（51.2V）",
        catLvDesc: "10kWh、16kWh 等容量的堆叠式 / 壁挂式电池。",
        catHv: "高压系列（358.4V – 716.8V）",
        catHvDesc: "面向大功率与高压直流母线需求的系统方案。",
        catAio: "户用一体机（ESS All-in-one）",
        catAioDesc: "逆变器与电池深度集成的即装即用方案。",
        gridTitle: "产品列表",
      }
    : {
        back: "Back to home",
        pageTitle: "Residential ESS",
        pageSub:
          "Low-voltage stack & wall-mount packs, high-voltage systems, and all-in-one inverter + battery solutions.",
        categoriesTitle: "Product families",
        catLv: "Low-voltage (51.2V)",
        catLvDesc: "Stackable and wall-mounted batteries around 10kWh & 16kWh class.",
        catHv: "High-voltage (358.4V – 716.8V)",
        catHvDesc: "Systems for higher power and HV DC bus requirements.",
        catAio: "ESS all-in-one",
        catAioDesc: "Integrated inverter and battery for faster residential deployment.",
        gridTitle: "Products",
      };

  const products: ProductCard[] = isZh
    ? [
        {
          categoryKey: "lv",
          imageSrc: "/images/MDS-512200.png",
          title: "壁挂式电池",
          subtitle: "MDS-512200",
          imageDetailHref: "/products/all-in-one-details",
          specs: [
            { label: "电压", value: "25.6V-51.2V" },
            { label: "容量", value: "206Ah" },
            { label: "能量", value: "5.12KWH-10.54KWH" },
            { label: "循环寿命", value: "6000 次" },
            { label: "尺寸 (mm)", value: "723 × 655 × 255" },
            { label: "通讯", value: COMM_ZH },
          ],
        },
        {
          categoryKey: "lv",
          imageSrc: "/images/MDS-51314.png",
          title: "堆叠式电池",
          subtitle: "MDS-51314",
          imageDetailHref: "/products/stackable-battery-details",
          specs: [
            { label: "电压", value: "51.2V" },
            { label: "容量", value: "314Ah" },
            { label: "能量", value: "16.07kWh" },
            { label: "循环寿命", value: "8000 次" },
            { label: "尺寸 (mm)", value: "730 × 610 × 257" },
            { label: "通讯", value: COMM_ZH },
          ],
        },
        {
          categoryKey: "hv",
          imageSrc: "/images/HVS-Series.png",
          title: "高压系统",
          subtitle: "HVS Series",
          specs: [
            { label: "电压范围", value: "358.4V – 716.8V" },
            { label: "能量范围", value: "14.33kWh – 100.35kWh（可扩展）" },
            { label: "循环寿命", value: "8000 次" },
            { label: "通讯", value: COMM_ZH },
          ],
        },
        {
          categoryKey: "aio",
          imageSrc: "/images/ESS-All-in-one.png",
          title: "户用一体机",
          subtitle: "ESS All-in-one 系列",
          specs: [
            { label: "电压", value: "51.2V" },
            { label: "容量", value: "100Ah / 314Ah" },
            { label: "能量", value: "5.12kWh – 16.07kWh" },
            { label: "包含型号", value: "M1200 (1)、MB-1111 等" },
            { label: "通讯", value: COMM_ZH },
          ],
        },
      ]
    : [
        {
          categoryKey: "lv",
          imageSrc: "/images/MDS-512200.png",
          title: "Wall-mounted battery",
          subtitle: "MDS-512200",
          imageDetailHref: "/products/all-in-one-details",
          specs: [
            { label: "Voltage", value: "25.6V-51.2V" },
            { label: "Capacity", value: "206Ah" },
            { label: "Energy", value: "5.12KWH-10.54KWH" },
            { label: "Cycle life", value: "6000 cycles" },
            { label: "Dimensions (mm)", value: "723 × 655 × 255" },
            { label: "Communication", value: COMM_EN },
          ],
        },
        {
          categoryKey: "lv",
          imageSrc: "/images/MDS-51314.png",
          title: "Stackable battery",
          subtitle: "MDS-51314",
          imageDetailHref: "/products/stackable-battery-details",
          specs: [
            { label: "Voltage", value: "51.2V" },
            { label: "Capacity", value: "314Ah" },
            { label: "Energy", value: "16.07kWh" },
            { label: "Cycle life", value: "8000 cycles" },
            { label: "Dimensions (mm)", value: "730 × 610 × 257" },
            { label: "Communication", value: COMM_EN },
          ],
        },
        {
          categoryKey: "hv",
          imageSrc: "/images/HVS-Series.png",
          title: "High voltage system",
          subtitle: "HVS Series",
          specs: [
            { label: "Voltage range", value: "358.4V – 716.8V" },
            { label: "Energy range", value: "14.33kWh – 100.35kWh (scalable)" },
            { label: "Cycle life", value: "8000 cycles" },
            { label: "Communication", value: COMM_EN },
          ],
        },
        {
          categoryKey: "aio",
          imageSrc: "/images/ESS-All-in-one.png",
          title: "ESS all-in-one",
          subtitle: "All-in-one family",
          specs: [
            { label: "Voltage", value: "51.2V" },
            { label: "Capacity", value: "100Ah / 314Ah" },
            { label: "Energy", value: "5.12kWh – 16.07kWh" },
            { label: "Representative models", value: "M1200 (1), MB-1111, etc." },
            { label: "Communication", value: COMM_EN },
          ],
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
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 shadow-sm transition hover:border-solar-500/40 hover:bg-solar-500/10 hover:text-solar-300"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
              {ui.back}
            </Link>

            <p className="mt-8 inline-flex rounded-full border border-[var(--border)] bg-[var(--accent-dim)] px-3 py-1 text-xs font-medium text-solar-400">
              {isZh ? "户用产品" : "Residential"}
            </p>
            <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {ui.pageTitle}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">{ui.pageSub}</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-wide text-solar-400">{ui.catLv}</p>
                <p className="mt-2 text-sm text-slate-400">{ui.catLvDesc}</p>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-wide text-solar-400">{ui.catHv}</p>
                <p className="mt-2 text-sm text-slate-400">{ui.catHvDesc}</p>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-wide text-solar-400">{ui.catAio}</p>
                <p className="mt-2 text-sm text-slate-400">{ui.catAioDesc}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{ui.gridTitle}</h2>

            <ul className="mt-10 grid gap-8 sm:grid-cols-2">
              {products.map((p) => (
                <li
                  key={p.subtitle}
                  className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xl shadow-black/25 backdrop-blur transition duration-300 hover:scale-[1.02] hover:border-solar-500/45 hover:shadow-lg hover:shadow-solar-500/15"
                >
                  {p.categoryKey === "hv" ? (
                    <Link
                      href="/products/hvs-details"
                      className="block outline-none ring-solar-500/0 transition hover:ring-2 hover:ring-inset hover:ring-solar-500/30 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-solar-500"
                      aria-label={
                        isZh ? "查看高压 HVS 系列详情" : "View HVS high-voltage series details"
                      }
                    >
                      <div className="relative flex min-h-[200px] w-full items-center justify-center bg-slate-900/80 px-4 py-6 sm:min-h-[240px]">
                        <img
                          src={p.imageSrc}
                          alt={p.subtitle}
                          loading="lazy"
                          decoding="async"
                          className="max-h-[200px] w-full max-w-full object-contain transition duration-300 group-hover:scale-[1.03] sm:max-h-[220px]"
                        />
                        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-solar-500/30 bg-slate-950/80 px-2 py-0.5 text-[10px] font-medium text-solar-400 opacity-0 transition group-hover:opacity-100">
                          {isZh ? "详情" : "Details"}
                        </span>
                      </div>
                      <div className="border-t border-[var(--border)] p-5 sm:p-6">
                        <p className="text-xs font-medium uppercase tracking-wide text-solar-500">{ui.catHv}</p>
                        <h3 className="mt-2 text-xl font-semibold text-white">{p.title}</h3>
                        <p className="text-sm text-slate-400">{p.subtitle}</p>

                        <div className="mt-5">
                          <ComparisonSpecTable
                            rows={p.specs.map((row) => ({
                              label: row.label,
                              values: [row.value],
                            }))}
                          />
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <>
                      {p.categoryKey === "aio" ? (
                        <Link
                          href="/products/ess-all-in-one-details"
                          className="relative flex min-h-[200px] w-full cursor-pointer items-center justify-center bg-slate-900/80 px-4 py-6 outline-none ring-solar-500/0 transition hover:ring-2 hover:ring-solar-500/40 focus-visible:ring-2 focus-visible:ring-solar-500 sm:min-h-[240px]"
                          aria-label={
                            isZh
                              ? "查看 ESS All-in-one 系列详情"
                              : "View ESS All-in-one series details"
                          }
                        >
                          <img
                            src={p.imageSrc}
                            alt={p.subtitle}
                            loading="lazy"
                            decoding="async"
                            className="max-h-[200px] w-full max-w-full object-contain transition duration-300 group-hover:scale-[1.03] sm:max-h-[220px]"
                          />
                          <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-solar-500/30 bg-slate-950/80 px-2 py-0.5 text-[10px] font-medium text-solar-400 opacity-0 transition group-hover:opacity-100">
                            {isZh ? "详情" : "Details"}
                          </span>
                        </Link>
                      ) : p.imageDetailHref ? (
                        <Link
                          href={p.imageDetailHref}
                          className="relative flex min-h-[200px] w-full cursor-pointer items-center justify-center bg-slate-900/80 px-4 py-6 outline-none ring-solar-500/0 transition hover:ring-2 hover:ring-solar-500/40 focus-visible:ring-2 focus-visible:ring-solar-500 sm:min-h-[240px]"
                          aria-label={
                            isZh ? "查看 LFP 电池系列详情" : "View LFP battery series details"
                          }
                        >
                          <img
                            src={p.imageSrc}
                            alt={p.subtitle}
                            loading="lazy"
                            decoding="async"
                            className="max-h-[200px] w-full max-w-full object-contain transition duration-300 group-hover:scale-[1.03] sm:max-h-[220px]"
                          />
                          <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-solar-500/30 bg-slate-950/80 px-2 py-0.5 text-[10px] font-medium text-solar-400 opacity-0 transition group-hover:opacity-100">
                            {isZh ? "详情" : "Details"}
                          </span>
                        </Link>
                      ) : (
                        <div className="flex min-h-[200px] w-full items-center justify-center bg-slate-900/80 px-4 py-6 sm:min-h-[240px]">
                          <img
                            src={p.imageSrc}
                            alt={p.subtitle}
                            loading="lazy"
                            decoding="async"
                            className="max-h-[200px] w-full max-w-full object-contain transition duration-300 group-hover:scale-[1.03] sm:max-h-[220px]"
                          />
                        </div>
                      )}
                      <div className="border-t border-[var(--border)] p-5 sm:p-6">
                        <p className="text-xs font-medium uppercase tracking-wide text-solar-500">
                          {p.categoryKey === "lv"
                            ? ui.catLv
                            : p.categoryKey === "hv"
                              ? ui.catHv
                              : ui.catAio}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold text-white">{p.title}</h3>
                        <p className="text-sm text-slate-400">{p.subtitle}</p>

                        <div className="mt-5">
                          <ComparisonSpecTable
                            rows={p.specs.map((row) => ({
                              label: row.label,
                              values: [row.value],
                            }))}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

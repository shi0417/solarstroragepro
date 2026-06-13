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
  imageDetailHref?: string;
};

function badgeForLvOrAio(
  key: Extract<ProductCard["categoryKey"], "lv" | "aio">,
  labels: { catLv: string; catAio: string },
): string {
  return key === "lv" ? labels.catLv : labels.catAio;
}

// Static product data — images and URLs that don't change by language
const PRODUCT_STATIC = [
  { key: "wallMount", categoryKey: "lv" as const, imageSrc: "/images/MDS-512200.png", imageDetailHref: "/products/all-in-one-details" },
  { key: "stackable", categoryKey: "lv" as const, imageSrc: "/images/MDS-51314.png", imageDetailHref: "/products/stackable-battery-details" },
  { key: "hvSystem", categoryKey: "hv" as const, imageSrc: "/images/HVS-Series.png" },
  { key: "aio", categoryKey: "aio" as const, imageSrc: "/images/ESS-All-in-one.png" },
];

export default function ResidentialEssPage() {
  const { messages } = useLocaleContext();
  const m = messages.productsResidentialEss ?? {};

  // Merge static data with translated product data
  const products: ProductCard[] = Array.isArray(m.products)
    ? (m.products as Array<{ key?: string; title?: string; subtitle?: string; specs?: Array<{ l: string; v: string }> }>).map((tp, i) => {
        const s = PRODUCT_STATIC[i] ?? { key: "", categoryKey: "lv" as const, imageSrc: "" };
        return {
          categoryKey: s.categoryKey,
          imageSrc: s.imageSrc,
          imageDetailHref: s.imageDetailHref,
          title: tp.title ?? "",
          subtitle: tp.subtitle ?? "",
          specs: Array.isArray(tp.specs) ? tp.specs.map((spec) => ({ label: spec.l ?? "", value: spec.v ?? "" })) : [],
        };
      })
    : [];

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

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[var(--border)] bg-slate-800/80 p-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-wide text-solar-400">{m.catLv}</p>
                <p className="mt-2 text-sm text-slate-400">{m.catLvDesc}</p>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-slate-800/80 p-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-wide text-solar-400">{m.catHv}</p>
                <p className="mt-2 text-sm text-slate-400">{m.catHvDesc}</p>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-slate-800/80 p-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-wide text-solar-400">{m.catAio}</p>
                <p className="mt-2 text-sm text-slate-400">{m.catAioDesc}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{m.gridTitle}</h2>

            <ul className="mt-10 grid gap-8 sm:grid-cols-2">
              {products.map((p) => (
                <li
                  key={p.subtitle}
                  className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-slate-800/80 shadow-xl shadow-black/25 backdrop-blur transition duration-300 hover:scale-[1.02] hover:border-solar-500/45 hover:shadow-lg hover:shadow-solar-500/15"
                >
                  {p.categoryKey === "hv" ? (
                    <Link
                      href="/products/hvs-details"
                      className="block outline-none ring-solar-500/0 transition hover:ring-2 hover:ring-inset hover:ring-solar-500/30 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-solar-500"
                      aria-label={m.viewHvsDetails}
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
                          {m.details}
                        </span>
                      </div>
                      <div className="border-t border-[var(--border)] p-5 sm:p-6">
                        <p className="text-xs font-medium uppercase tracking-wide text-solar-500">{m.catHv}</p>
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
                          aria-label={m.viewAioDetails}
                        >
                          <img
                            src={p.imageSrc}
                            alt={p.subtitle}
                            loading="lazy"
                            decoding="async"
                            className="max-h-[200px] w-full max-w-full object-contain transition duration-300 group-hover:scale-[1.03] sm:max-h-[220px]"
                          />
                          <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-solar-500/30 bg-slate-950/80 px-2 py-0.5 text-[10px] font-medium text-solar-400 opacity-0 transition group-hover:opacity-100">
                            {m.details}
                          </span>
                        </Link>
                      ) : p.imageDetailHref ? (
                        <Link
                          href={p.imageDetailHref}
                          className="relative flex min-h-[200px] w-full cursor-pointer items-center justify-center bg-slate-900/80 px-4 py-6 outline-none ring-solar-500/0 transition hover:ring-2 hover:ring-solar-500/40 focus-visible:ring-2 focus-visible:ring-solar-500 sm:min-h-[240px]"
                          aria-label={m.viewLfpDetails}
                        >
                          <img
                            src={p.imageSrc}
                            alt={p.subtitle}
                            loading="lazy"
                            decoding="async"
                            className="max-h-[200px] w-full max-w-full object-contain transition duration-300 group-hover:scale-[1.03] sm:max-h-[220px]"
                          />
                          <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-solar-500/30 bg-slate-950/80 px-2 py-0.5 text-[10px] font-medium text-solar-400 opacity-0 transition group-hover:opacity-100">
                            {m.details}
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
                          {badgeForLvOrAio(p.categoryKey, m)}
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

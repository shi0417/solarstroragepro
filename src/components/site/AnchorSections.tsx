"use client";

import { ArrowRight, Building2, FileDown, Newspaper } from "lucide-react";

import { useLocaleContext } from "./LocaleProvider";

/** 为顶部导航提供锚点区块，内容可后续接 CMS / Supabase */
export function AnchorSections() {
  const { messages } = useLocaleContext();
  const a = messages.anchor;
  const viewAll = messages.header.viewAll;

  return (
    <>
      <section id="blog" className="scroll-mt-20 border-b border-[var(--border)] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-white sm:text-3xl">
                <Newspaper className="h-7 w-7 text-solar-500" aria-hidden />
                Blog
              </h2>
              <p className="mt-2 max-w-2xl text-slate-400">{a.blogSub}</p>
            </div>
            <a
              href="#blog"
              className="inline-flex items-center gap-1 text-sm font-medium text-solar-400 hover:text-solar-300"
            >
              {viewAll}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Long cycle life vs. energy density in LFP packs",
              "Cold-weather performance tips for LiFePO₄",
              "BESS sizing for C&I peak shaving",
            ].map((title) => (
              <li
                key={title}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 backdrop-blur"
              >
                <p className="text-sm font-medium text-slate-100">{title}</p>
                <p className="mt-2 text-xs text-slate-500">{a.postTeaser}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="resources" className="scroll-mt-20 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-white sm:text-3xl">
            <FileDown className="h-7 w-7 text-solar-500" aria-hidden />
            Resources
          </h2>
          <p className="mt-2 max-w-2xl text-slate-400">{a.resourcesSub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Datasheets", "Certificates", "Installation guides", "3D models"].map((label) => (
              <span
                key={label}
                className="rounded-full border border-[var(--border)] bg-slate-900/60 px-4 py-2 text-sm text-slate-300"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        id="company"
        className="scroll-mt-20 border-y border-[var(--border)] bg-slate-900/35 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-white sm:text-3xl">
            <Building2 className="h-7 w-7 text-solar-500" aria-hidden />
            Company
          </h2>
          <p className="mt-2 max-w-2xl text-slate-400">{a.companySub}</p>
          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            {a.companyStats.map((row) => (
              <div
                key={row.k}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 text-center backdrop-blur"
              >
                <dt className="text-xs uppercase tracking-wide text-slate-500">{row.k}</dt>
                <dd className="mt-2 text-3xl font-bold text-solar-400">{row.v}</dd>
                <p className="mt-1 text-xs text-slate-500">{row.d}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="service" className="scroll-mt-20 py-16 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Service</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-400">{a.serviceSub}</p>
        </div>
      </section>
    </>
  );
}

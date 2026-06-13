"use client";

import Link from "next/link";
import { ArrowRight, Building2, FileDown, LayoutGrid, Wrench, Headphones, Truck } from "lucide-react";

import { useLocaleContext } from "./LocaleProvider";

export function AnchorSections() {
  const { messages, localizePath } = useLocaleContext();
  const a = messages.anchor;
  const viewAll = messages.header.viewAll;

  return (
    <>
      {/* Case Center */}
      <section id="case-center" className="scroll-mt-20 section-padding-sm bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="section-eyebrow">
                <LayoutGrid className="h-4 w-4" aria-hidden />
                Projects
              </span>
              <h2 className="section-heading mt-3">
                {a.caseCenterHeading}
              </h2>
              <p className="section-desc mt-3">{a.caseCenterSub}</p>
            </div>
            <Link
              href={localizePath("/case-center")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50/50"
            >
              {viewAll}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Long cycle life vs. energy density in LFP packs",
                tag: "Technical",
                color: "bg-brand-50 text-brand-700",
              },
              {
                title: "Cold-weather performance tips for LiFePO\u2084",
                tag: "Guide",
                color: "bg-emerald-50 text-emerald-700",
              },
              {
                title: "BESS sizing for C&I peak shaving",
                tag: "Application",
                color: "bg-amber-50 text-amber-700",
              },
            ].map((card) => (
              <li
                key={card.title}
                className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-brand-200 hover:shadow-md hover:-translate-y-0.5"
              >
                <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${card.color}`}>
                  {card.tag}
                </span>
                <p className="mt-3 text-sm font-semibold text-slate-800">{card.title}</p>
                <p className="mt-2 text-xs text-slate-400">{a.postTeaser}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="scroll-mt-20 section-padding-sm bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <span className="section-eyebrow">
            <FileDown className="h-4 w-4" aria-hidden />
            Downloads
          </span>
          <h2 className="section-heading mt-3">Resources</h2>
          <p className="section-desc mt-3">{a.resourcesSub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { label: "Datasheets", icon: <FileDown className="h-4 w-4" /> },
              { label: "Certificates", icon: <Wrench className="h-4 w-4" /> },
              { label: "Installation Guides", icon: <Truck className="h-4 w-4" /> },
              { label: "3D Models", icon: <Building2 className="h-4 w-4" /> },
            ].map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm transition-all hover:border-brand-300 hover:text-brand-600 hover:shadow-md cursor-default"
              >
                {item.icon}
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Company */}
      <section id="company" className="scroll-mt-20 section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-eyebrow">
              <Building2 className="h-4 w-4" aria-hidden />
              About Us
            </span>
            <h2 className="section-heading mt-3">Company</h2>
            <p className="section-desc mx-auto mt-3">{a.companySub}</p>
          </div>
          <dl className="mt-12 grid gap-6 sm:grid-cols-3">
            {a.companyStats.map((row: { k: string; v: string; d: string }) => (
              <div
                key={row.k}
                className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all hover:border-brand-200 hover:shadow-md"
              >
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {row.k}
                </dt>
                <dd className="mt-3 text-4xl font-extrabold text-brand-600" style={{ letterSpacing: "-0.02em" }}>
                  {row.v}
                </dd>
                <p className="mt-1 text-sm text-slate-400">{row.d}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Service */}
      <section id="service" className="scroll-mt-20 section-padding-sm bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-eyebrow">
              <Headphones className="h-4 w-4" aria-hidden />
              Support
            </span>
            <h2 className="section-heading mt-3">Service</h2>
            <p className="section-desc mx-auto mt-3">{a.serviceSub}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { title: "Presales Engineering", desc: "Custom system design and feasibility studies", icon: <Wrench className="h-5 w-5" /> },
              { title: "Commissioning Support", desc: "On-site setup, testing, and grid integration", icon: <Truck className="h-5 w-5" /> },
              { title: "24/7 Monitoring", desc: "Remote diagnostics and real-time performance tracking", icon: <Headphones className="h-5 w-5" /> },
            ].map((s) => (
              <div
                key={s.title}
                className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-brand-200 hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100">
                  {s.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">{s.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

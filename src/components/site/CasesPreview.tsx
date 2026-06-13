"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { useLocaleContext } from "@/components/site/LocaleProvider";
import { CASES } from "@/app/[locale]/case-center/case-data";

export function CasesPreview() {
  const { messages, localizePath } = useLocaleContext();
  const cp = messages.casesPreview;

  return (
    <section className="py-16 sm:py-20 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              {cp.eyebrow}
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {cp.heading}
            </h2>
            <p className="mt-3 max-w-xl text-base text-slate-400">{cp.sub}</p>
          </div>
          <Link
            href={localizePath("/case-center")}
            className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-500/20"
          >
            {cp.viewAll}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CASES.map((c) => (
            <Link
              key={c.id}
              href={`/case-center/${c.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-800/60 backdrop-blur transition-all hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                <img
                  src={c.imageSrc}
                  alt={c.titleEn}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="rounded-full bg-blue-600/90 px-2.5 py-0.5 text-xs font-semibold text-white">
                    {c.tag}
                  </span>
                  <span className="text-lg">{c.flag}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white">
                  {c.titleEn}
                </h3>

                {/* Key stats */}
                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/5 pt-4">
                  {c.stats.slice(0, 2).map((stat) => (
                    <div key={stat.labelEn} className="rounded-lg bg-white/5 px-3 py-2">
                      <p className="text-sm font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-slate-500">{stat.labelEn}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 transition group-hover:gap-2.5">
                    {cp.readMore}
                    <ArrowRight className="h-3 w-3" aria-hidden />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

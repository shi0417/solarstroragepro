"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, Zap } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { CASES } from "./case-data";

export default function CaseCenterPage() {
  const { locale, messages } = useLocaleContext();
  const isZh = locale === "zh";

  const cc = messages.caseCenter ?? {};

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* ── Page Header ── */}
        <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-10%,rgba(59,130,246,0.15),transparent)]" />
          <div className="pointer-events-none absolute inset-0 bg-grid-slate bg-[length:44px_44px] opacity-10" />

          <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
              <Zap className="h-3 w-3" aria-hidden />
              {cc.badge}
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {cc.pageTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">{cc.pageSub}</p>

            <div className="mt-6">
              <Link
                href="/technology"
                className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-blue-400"
              >
                {cc.techLink}
                <ChevronRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Cases Grid ── */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {CASES.map((c) => (
                <article
                  key={c.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                    <img
                      src={c.imageSrc}
                      alt={isZh ? c.titleZh : c.titleEn}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="rounded-full bg-blue-600/90 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur">
                        {c.tag}
                      </span>
                    </div>
                    <div className="absolute right-3 top-3 text-xl">{c.flag}</div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <time className="text-xs font-medium text-slate-400" dateTime={c.date}>
                      {c.date}
                    </time>
                    <h3 className="mt-1 line-clamp-2 text-base font-bold leading-snug text-slate-900">
                      {isZh ? c.titleZh : c.titleEn}
                    </h3>

                    {/* Stats */}
                    <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
                      {c.stats.slice(0, 2).map((stat) => (
                        <div key={stat.labelEn} className="rounded-lg bg-slate-50 px-3 py-2">
                          <p className="text-sm font-bold text-slate-900">{stat.value}</p>
                          <p className="text-xs text-slate-500">
                            {isZh ? stat.labelZh : stat.labelEn}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-auto pt-4">
                      <Link
                        href={`/case-center/${c.id}`}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                      >
                        {cc.readMore}
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="border-t border-slate-100 bg-slate-50 py-14 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">{cc.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-600">{cc.ctaSub}</p>
            <div className="mt-6">
              <a
                href="https://wa.me/8613800000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
              >
                {cc.ctaBtn}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

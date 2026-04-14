"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";

import { CASES } from "./case-data";

export default function CaseCenterPage() {
  const { locale } = useLocaleContext();
  const isZh = locale === "zh";

  const ui = isZh
    ? {
        back: "返回首页",
        pageTitle: "案例中心",
        pageSub:
          "AIKO 已在全球 70 多个国家和地区完成项目，利用高效组件推动各行各业的绿色能源发展。数据来源：爱旭太阳能（AIKO Solar）。",
        source: "数据来源",
        sourceLink: "aikosolar.com",
        readMore: "查看详情",
      }
    : {
        back: "Back to home",
        pageTitle: "Case Center",
        pageSub:
          "AIKO has completed projects across more than 70 countries and regions worldwide, using high-efficiency modules to drive green energy across various industries. Data sourced from AIKO Solar.",
        source: "Data source",
        sourceLink: "aikosolar.com",
        readMore: "Read more",
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
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 shadow-sm transition hover:border-solar-500/40 hover:bg-solar-500/10 hover:text-solar-300"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
              {ui.back}
            </Link>

            <p className="mt-8 inline-flex rounded-full border border-[var(--border)] bg-[var(--accent-dim)] px-3 py-1 text-xs font-medium text-solar-400">
              {isZh ? "全球项目" : "Global Projects"}
            </p>
            <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {ui.pageTitle}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">{ui.pageSub}</p>
            <p className="mt-3 text-xs text-slate-500">
              {ui.source}:{" "}
              <a
                href="https://aikosolar.com/en/case-center/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-solar-400"
              >
                {ui.sourceLink}
              </a>
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {CASES.map((c) => (
                <article
                  key={c.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xl shadow-black/20 backdrop-blur transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-solar-500/10"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                    <img
                      src={c.imageSrc}
                      alt={isZh ? c.titleZh : c.titleEn}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <time className="text-xs font-medium text-solar-400" dateTime={c.date}>
                        {c.date}
                      </time>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="line-clamp-2 text-xl font-bold leading-tight text-white">
                      {isZh ? c.titleZh : c.titleEn}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">
                      {isZh ? c.descZh : c.descEn}
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-3 border-t border-white/5 pt-6">
                      {c.stats.map((stat) => (
                        <div
                          key={`${c.id}-${stat.labelEn}`}
                          className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2"
                        >
                          <span className="flex items-center gap-2 text-xs text-slate-400">
                            <span aria-hidden>{stat.icon}</span>
                            {isZh ? stat.labelZh : stat.labelEn}
                          </span>
                          <span className="text-sm font-semibold text-white">{stat.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-6">
                      <Link
                        href={`/case-center/${c.id}`}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-solar-500/10 px-4 py-2.5 text-sm font-medium text-solar-400 transition hover:bg-solar-500/20 hover:text-solar-300"
                      >
                        {ui.readMore}
                        <ExternalLink className="h-4 w-4" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Tag,
  Zap,
} from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { CASE_DETAILS } from "@/app/[locale]/case-center/case-data";

export default function CaseDetailPage() {
  const params = useParams();
  const rawId = params?.id;
  const id = typeof rawId === "string" ? rawId : Array.isArray(rawId) ? rawId[0] : undefined;

  const { locale } = useLocaleContext();
  const isZh = locale === "zh";

  const c = id ? CASE_DETAILS[id] : undefined;
  if (!c) notFound();

  const ui = isZh
    ? {
        back: "返回案例中心",
        location: "项目地点",
        date: "实施时间",
        type: "调频类型",
        challenge: "项目挑战",
        solution: "技术方案",
        specs: "技术规格",
        outcomes: "项目成果",
        gallery: "现场图片",
        freqDiagram: "频率响应图",
        cta: "获取类似方案",
        ctaSub: "您的项目规模与场景是否与此案例类似？我们可为您定制专属方案。",
        ctaBtn: "WhatsApp 咨询",
        moreBtn: "查看更多案例",
        techPageBtn: "了解技术平台",
      }
    : {
        back: "Back to Cases",
        location: "Location",
        date: "Completion",
        type: "Service Type",
        challenge: "Challenge",
        solution: "Solution",
        specs: "Technical Specifications",
        outcomes: "Project Outcomes",
        gallery: "Project Gallery",
        freqDiagram: "Frequency Response",
        cta: "Get a Similar Solution",
        ctaSub:
          "Does your project have similar requirements? We can design a custom BESS solution for your grid.",
        ctaBtn: "WhatsApp Us Now",
        moreBtn: "View More Cases",
        techPageBtn: "Our Technology",
      };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* ── Hero Banner ── */}
        <section className="relative h-[45vh] min-h-[320px] overflow-hidden bg-slate-950 sm:h-[55vh]">
          <img
            src={c.galleryImages[0]}
            alt={isZh ? c.titleZh : c.titleEn}
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/30" />

          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-5xl px-4 pb-10 sm:px-6">
              <Link
                href="/case-center"
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-blue-400/30 hover:text-blue-400"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
                {ui.back}
              </Link>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-lg">{c.flag}</span>
                <span className="rounded-full bg-blue-500/20 px-3 py-0.5 text-xs font-semibold text-blue-400">
                  {c.tag}
                </span>
              </div>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                {isZh ? c.titleZh : c.titleEn}
              </h1>
            </div>
          </div>
        </section>

        {/* ── Meta strip ── */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-4 py-5 sm:grid-cols-4 sm:px-6">
            {[
              { icon: <MapPin className="h-4 w-4" />, label: ui.location, value: c.location },
              { icon: <Calendar className="h-4 w-4" />, label: ui.date, value: c.date },
              { icon: <Tag className="h-4 w-4" />, label: ui.type, value: c.tag },
              { icon: <Zap className="h-4 w-4" />, label: "Capacity", value: c.stats[0].value },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-blue-500">{item.icon}</span>
                <div>
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <p className="text-sm font-semibold text-slate-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Stats bar ── */}
        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px bg-slate-100 sm:grid-cols-4">
            {c.stats.map((stat) => (
              <div key={stat.labelEn} className="bg-white px-6 py-5 text-center">
                <span className="text-2xl">{stat.icon}</span>
                <p className="mt-1 text-xl font-bold text-slate-900">{stat.value}</p>
                <p className="mt-0.5 text-xs text-slate-500">{isZh ? stat.labelZh : stat.labelEn}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Challenge + Solution ── */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-red-500">
                  {ui.challenge}
                </span>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {isZh ? "面临的挑战" : "The Problem to Solve"}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  {isZh ? c.challengeZh : c.challengeEn}
                </p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                  {ui.solution}
                </span>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {isZh ? "我们的解决方案" : "Our Approach"}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  {isZh ? c.solutionZh : c.solutionEn}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Technical Specs ── */}
        <section className="bg-slate-50 py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {ui.specs}
            </h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {(isZh ? c.technicalSpecsZh : c.technicalSpecsEn).map((spec) => (
                  <div key={spec.k} className="flex items-start justify-between gap-4 px-5 py-3.5">
                    <span className="text-sm text-slate-500">{spec.k}</span>
                    <span className="text-right text-sm font-semibold text-slate-900">{spec.v}</span>
                  </div>
                ))}
              </div>

              {/* Frequency response images */}
              <div className="space-y-3">
                {c.freqImages.map((src, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2"
                  >
                    <img
                      src={src}
                      alt={`Frequency response diagram ${i + 1}`}
                      className="w-full rounded-xl object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Outcomes ── */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-green-600">
                  <BarChart3 className="h-4 w-4" aria-hidden />
                  {ui.outcomes}
                </span>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {isZh ? "量化成果" : "Measurable Results"}
                </h2>
                <ul className="mt-6 space-y-3">
                  {(isZh ? c.outcomeZh : c.outcomeEn).map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-green-500"
                        aria-hidden
                      />
                      <span className="text-sm leading-relaxed text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gallery */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  {ui.gallery}
                </span>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {c.galleryImages.slice(0, 4).map((src, i) => (
                    <div
                      key={i}
                      className={`overflow-hidden rounded-xl border border-slate-200 bg-slate-100 ${
                        i === 0 ? "col-span-2" : ""
                      }`}
                    >
                      <img
                        src={src}
                        alt={`Project photo ${i + 1}`}
                        className="h-full w-full object-cover"
                        loading={i === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-slate-950 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{ui.cta}</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">{ui.ctaSub}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/8613800000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-400"
              >
                {ui.ctaBtn}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <Link
                href="/case-center"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10"
              >
                {ui.moreBtn}
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <div className="mt-6">
              <Link
                href="/technology"
                className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition hover:text-blue-400"
              >
                {ui.techPageBtn}
                <ChevronRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

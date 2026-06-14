"use client";

import Link from "next/link";
import {
  BatteryCharging,
  Factory,
  Flame,
  Gauge,
  Layers,
  Mountain,
  Sun,
  Zap,
} from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";

export default function GridLevelBessPage() {
  const { locale, messages } = useLocaleContext();
  const m = messages.solutionsGridLevelBess;

  const advantageIcons = [
    <Layers key="0" className="h-5 w-5" aria-hidden />,
    <Factory key="1" className="h-5 w-5" aria-hidden />,
    <Gauge key="2" className="h-5 w-5" aria-hidden />,
    <Flame key="3" className="h-5 w-5" aria-hidden />,
  ];

  const appIcons = [
    <Zap key="0" className="h-5 w-5" aria-hidden />,
    <Sun key="1" className="h-5 w-5" aria-hidden />,
    <BatteryCharging key="2" className="h-5 w-5" aria-hidden />,
    <Mountain key="3" className="h-5 w-5" aria-hidden />,
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-[var(--border)]">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900" />
          <div className="pointer-events-none absolute inset-0 bg-grid-slate bg-[length:44px_44px] opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-20%,rgba(245,158,11,0.14),transparent)]" />

          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
              <Link href="/" className="transition hover:text-solar-400">
                {m.breadcrumbHome}
              </Link>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">{m.breadcrumbSolutions}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">{m.title}</span>
            </div>

            <p className="mt-8 inline-flex rounded-full border border-[var(--border)] bg-[var(--accent-dim)] px-3 py-1 text-xs font-medium text-solar-400">
              {m.badge}
            </p>
            <h1 className="mt-4 max-w-4xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {m.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">{m.subtitle}</p>
            <p className="mt-4 max-w-3xl text-sm text-slate-500">
              {m.paragraphText}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/products/energy-storage-system"
                className="inline-flex items-center justify-center rounded-full bg-solar-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-solar-500/30 transition hover:bg-solar-400"
              >
                {m.relatedCta}
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
              >
                {m.contactCta}
              </Link>
            </div>
          </div>
        </section>

        {/* ── Advantages ─────────────────────────────────────── */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{m.advantagesTitle}</h2>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2">
              {(m.advantages as Array<{ n: string; title: string; body: string }>).map((item, i) => (
                <li
                  key={item.n}
                  className="flex gap-4 rounded-2xl border border-[var(--border)] bg-slate-800/80 p-6 shadow-xl shadow-black/20 backdrop-blur transition hover:border-solar-500/40"
                >
                  <span className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-solar-500/15 text-xs font-bold text-solar-400">
                    {item.n}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-solar-400">
                        {advantageIcons[i]}
                      </span>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Applications ─────────────────────────────────── */}
        <section className="border-y border-[var(--border)] bg-slate-900/35 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{m.appsIntroTitle}</h2>
            <p className="mt-6 max-w-4xl text-sm leading-relaxed text-slate-300 sm:text-base">{m.appsIntro}</p>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {(m.apps as Array<{ title: string; body: string }>).map((app, i) => (
                <div
                  key={app.title}
                  className="rounded-2xl border border-[var(--border)] bg-slate-800/80 p-7 shadow-xl shadow-black/25 backdrop-blur"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-solar-500/15 text-solar-400">
                      {appIcons[i]}
                    </span>
                    <h3 className="text-lg font-semibold text-white">{app.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">{app.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tech Highlights ─────────────────────────────── */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{m.techTitle}</h2>
            <p className="mt-3 text-sm text-slate-400">{m.techNote}</p>

            <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--border)] bg-slate-800/80 shadow-2xl shadow-black/30">
              <div className="divide-y divide-[var(--border)]">
                {(m.techHighlights as Array<{ k: string; v: string }>).map((row) => (
                  <div
                    key={row.k}
                    className="grid gap-2 px-5 py-4 sm:grid-cols-[minmax(0,220px)_1fr] sm:items-center"
                  >
                    <div className="text-sm font-semibold text-solar-400">{row.k}</div>
                    <div className="text-sm leading-relaxed text-slate-300">{row.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-slate-950/40 p-6">
              <div>
                <p className="text-sm font-semibold text-white">{m.relatedTitle}</p>
                <p className="mt-1 text-sm text-slate-400">{m.relatedBody}</p>
              </div>
              <Link
                href="/products/energy-storage-system"
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-solar-500 px-6 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-solar-400"
              >
                {m.relatedCta}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

"use client";

import { Play } from "lucide-react";

import { useLocaleContext } from "./LocaleProvider";

/** 科技感背景图：可替换为 Pexels / Pixabay 工业或新能源素材 */
const HERO_BG =
  "https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=1920";

export function Hero() {
  const { messages } = useLocaleContext();
  const h = messages.hero;

  return (
    <section className="relative min-h-[72vh] overflow-hidden border-b border-[var(--border)]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BG})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/65" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-slate-950/40" />
      <div className="pointer-events-none absolute inset-0 bg-grid-slate bg-[length:40px_40px] opacity-25" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-[var(--border)] bg-[var(--accent-dim)] px-3 py-1 text-xs font-medium text-solar-400">
            {h.badge}
          </p>
          <h1 className="max-w-xl text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            High-performance {" "}
            <span className="bg-gradient-to-r from-solar-400 to-amber-300 bg-clip-text text-transparent">
            Solar Panels,ESS & Battery Cells
            </span>{" "}
            for global projects
          </h1>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#products"
              className="inline-flex items-center justify-center rounded-full bg-solar-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-solar-500/30 transition hover:bg-solar-400"
            >
              {h.exploreProducts}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
            >
              {h.requestDatasheet}
            </a>
          </div>
        </div>

        <div className="relative lg:justify-self-end">
          <div className="relative aspect-video w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-2xl shadow-black/50 backdrop-blur-sm">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{ backgroundImage: `url(${HERO_BG})` }}
              aria-hidden
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950/50 p-6 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-solar-500/40 bg-solar-500/10 text-solar-400">
                <Play className="h-7 w-7" fill="currentColor" aria-hidden />
              </span>
              <p className="text-sm font-medium text-slate-200">{h.videoSlotTitle}</p>
              <p className="max-w-xs text-xs text-slate-500">{h.videoSlotHint}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

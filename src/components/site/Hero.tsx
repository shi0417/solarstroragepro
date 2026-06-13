"use client";

import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Battery,
  Activity,
  Play,
} from "lucide-react";

import { siteContact, whatsappUrl } from "@/lib/site-config";
import { trackEmailClick, trackWhatsAppClick } from "@/lib/tracking";

import { useLocaleContext } from "./LocaleProvider";

export function Hero() {
  const { messages } = useLocaleContext();
  const h = messages.hero;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--hero-from)] via-[var(--hero-via)] to-[var(--hero-to)]">
      {/* Dot grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Glow accents */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-brand-400/15 blur-[150px]" />
      <div className="pointer-events-none absolute left-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-sky-300/8 blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-[300px] w-[300px] rounded-full bg-emerald-400/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Text content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-brand-200 backdrop-blur-sm">
              <Zap className="h-4 w-4 text-emerald-400" aria-hidden />
              {h.badge}
            </span>

            {/* Main heading */}
            <h1
              className="text-balance font-extrabold leading-[1.1] tracking-tight text-white"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
            >
              {h.titleLine1}
              <br />
              <span className="bg-gradient-to-r from-sky-300 via-brand-200 to-sky-400 bg-clip-text text-transparent">
                {h.titleHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300/90 sm:text-xl"
              style={{ lineHeight: 1.75 }}
            >
              {h.subtitle}
            </p>

            {/* Trust signals */}
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-sky-100/80">
              {h.trustSignals.map((s, i) => (
                <span key={i} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden />
                  {s}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-white text-brand-900 shadow-xl shadow-black/10 hover:bg-sky-50 hover:shadow-2xl"
                onClick={() => trackWhatsAppClick("Hero")}
              >
                {h.ctaPrimary}
                <ArrowRight className="h-5 w-5" aria-hidden />
              </a>
              <a
                href={`mailto:${siteContact.email}`}
                className="btn-secondary border-white/20 bg-white/[0.06] text-white backdrop-blur-sm hover:bg-white/15 hover:border-white/30"
                onClick={() => trackEmailClick("Hero")}
              >
                {h.ctaSecondary}
              </a>
            </div>
          </div>

          {/* Right — Product visual / illustration */}
          <div className="relative hidden lg:block">
            <div className="animate-float relative">
              {/* Main product card */}
              <div className="relative rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
                    <Battery className="h-5 w-5 text-emerald-400" aria-hidden />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">BESS Container</div>
                    <div className="text-xs text-slate-400">1MW / 2MWh</div>
                  </div>
                </div>

                {/* Frequency response chart mock */}
                <div className="h-48 rounded-xl bg-white/[0.04] p-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span>Frequency Response (Hz)</span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Activity className="h-3 w-3" />
                      Live
                    </span>
                  </div>
                  {/* Chart bars */}
                  <div className="flex items-end gap-1 h-32">
                    {[40, 65, 35, 80, 55, 90, 45, 75, 60, 85, 50, 70, 55, 95, 40, 80, 60, 75, 50, 85, 65, 45, 70, 55].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-gradient-to-t from-brand-500/60 to-brand-400/80 transition-all duration-500"
                        style={{ height: `${h}%`, animationDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Status indicators */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { label: "Response", value: "186ms", color: "text-emerald-400" },
                    { label: "Output", value: "0.92MW", color: "text-brand-300" },
                    { label: "SOC", value: "67%", color: "text-sky-300" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-lg bg-white/[0.04] p-2.5 text-center">
                      <div className={`text-sm font-bold ${s.color}`}>{s.value}</div>
                      <div className="text-[10px] text-slate-500">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 rounded-xl border border-white/10 bg-emerald-500/90 px-3 py-2 text-xs font-bold text-white shadow-lg">
                &lt;200ms ✓
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-xl border border-white/10 bg-brand-600/90 px-3 py-2 text-xs font-bold text-white shadow-lg">
                50+ Countries
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L60 52C120 44 240 28 360 22C480 16 600 20 720 28C840 36 960 48 1080 50C1200 52 1320 44 1380 40L1440 36V60H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

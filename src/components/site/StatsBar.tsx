"use client";

import { Zap, Clock, Globe, TrendingUp } from "lucide-react";
import { useLocaleContext } from "./LocaleProvider";

export function StatsBar() {
  const { messages } = useLocaleContext();
  const s = messages.statsBar;

  const iconMap = [
    <Zap key="zap" className="h-6 w-6" aria-hidden />,
    <Clock key="clock" className="h-6 w-6" aria-hidden />,
    <Globe key="globe" className="h-6 w-6" aria-hidden />,
    <TrendingUp key="trend" className="h-6 w-6" aria-hidden />,
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950 py-16 sm:py-20 dark-section-overlay">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-brand-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[300px] w-[300px] rounded-full bg-sky-300/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {s.items.map((item, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 text-center backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/[0.06]"
            >
              {/* Icon */}
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/20 text-brand-300 transition-colors group-hover:bg-brand-500/30">
                {iconMap[i]}
              </div>

              {/* Value */}
              <div
                className="font-extrabold text-white"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
              >
                {item.value}
              </div>

              {/* Label */}
              <div className="mt-2 text-sm font-semibold text-brand-200">
                {item.label}
              </div>

              {/* Description */}
              <div className="mt-1 text-xs text-brand-400/60">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

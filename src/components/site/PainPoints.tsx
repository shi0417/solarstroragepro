"use client";

import { Clock, TrendingDown, AlertTriangle, BarChart3 } from "lucide-react";
import { useLocaleContext } from "./LocaleProvider";

export function PainPoints() {
  const { messages } = useLocaleContext();
  const p = messages.painPoints;

  const iconMap: Record<string, React.ReactNode> = {
    clock: <Clock className="h-6 w-6" aria-hidden />,
    trending: <TrendingDown className="h-6 w-6" aria-hidden />,
    alert: <AlertTriangle className="h-6 w-6" aria-hidden />,
    chart: <BarChart3 className="h-6 w-6" aria-hidden />,
  };

  return (
    <section className="section-padding bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow">
            <AlertTriangle className="h-4 w-4" aria-hidden />
            Industry Challenges
          </span>
          <h2 className="section-heading mt-4">
            {p.heading}
          </h2>
          <p className="section-desc mx-auto mt-4">
            {p.sub}
          </p>
        </div>

        {/* Pain point cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {p.items.map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/5 hover:-translate-y-1"
            >
              {/* Number badge */}
              <div className="absolute right-6 top-6 text-6xl font-black text-slate-100 leading-none select-none">
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Icon */}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 text-red-500 shadow-sm transition-shadow group-hover:shadow-md">
                {iconMap[item.icon] ?? <AlertTriangle className="h-6 w-6" />}
              </div>

              <h3 className="relative mt-5 text-xl font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-slate-500">
                {item.body}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-brand-500 to-sky-400 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

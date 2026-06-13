"use client";

import { Zap, ShieldCheck, Clock, Settings2, Check } from "lucide-react";
import { useLocaleContext } from "./LocaleProvider";

export function Features() {
  const { messages } = useLocaleContext();
  const f = messages.features;

  const iconMap: Record<string, React.ReactNode> = {
    zap: <Zap className="h-6 w-6" aria-hidden />,
    shield: <ShieldCheck className="h-6 w-6" aria-hidden />,
    clock: <Clock className="h-6 w-6" aria-hidden />,
    settings: <Settings2 className="h-6 w-6" aria-hidden />,
  };

  const bgMap: Record<string, string> = {
    zap: "from-brand-500 to-sky-500",
    shield: "from-emerald-500 to-teal-500",
    clock: "from-amber-500 to-orange-500",
    settings: "from-violet-500 to-purple-500",
  };

  return (
    <section id="solutions" className="scroll-mt-20 section-padding bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow">
            <Zap className="h-4 w-4" aria-hidden />
            Why Choose Us
          </span>
          <h2 className="section-heading mt-4">
            {f.heading}
          </h2>
          <p className="section-desc mx-auto mt-4">
            {f.sub}
          </p>
        </div>

        {/* Feature grid — 2x2 with asymmetric sizing */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {f.items.map((item: { icon: string; title: string; body: string }, i: number) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/5 hover:-translate-y-0.5 ${i === 0 ? "lg:row-span-1" : ""}`}
            >
              {/* Background gradient accent */}
              <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${bgMap[item.icon] ?? "from-brand-500 to-sky-500"} opacity-[0.06] blur-2xl transition-opacity group-hover:opacity-[0.1]`} />

              <div className="relative flex gap-5">
                {/* Icon */}
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${bgMap[item.icon] ?? "from-brand-500 to-sky-500"} text-white shadow-lg transition-shadow group-hover:shadow-xl`}>
                  {iconMap[item.icon] ?? <Zap className="h-6 w-6" />}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">
                    {item.body}
                  </p>

                  {/* Key points */}
                  <ul className="mt-4 space-y-2">
                    {item.body.split("—")[0].slice(0, 60).length > 10 && (
                      <li className="flex items-center gap-2 text-xs text-slate-400">
                        <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden />
                        Proven in 50+ deployments
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { Shield, Award, Globe, Factory, ChevronRight } from "lucide-react";
import { useLocaleContext } from "./LocaleProvider";

export function TrustBar() {
  const { messages } = useLocaleContext();
  const t = messages.trustBar;

  const iconMap: Record<string, React.ReactNode> = {
    shield: <Shield className="h-5 w-5" aria-hidden />,
    award: <Award className="h-5 w-5" aria-hidden />,
    globe: <Globe className="h-5 w-5" aria-hidden />,
    factory: <Factory className="h-5 w-5" aria-hidden />,
  };

  return (
    <section className="border-b border-slate-100 bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          {/* Left label */}
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
            Certified & Trusted
          </p>

          {/* Certifications */}
          <div className="flex flex-wrap items-center justify-center gap-1">
            {t.items.map((item, i) => (
              <div key={item.label} className="flex items-center">
                {i > 0 && (
                  <ChevronRight className="mx-2 h-3.5 w-3.5 text-slate-200 hidden sm:block" aria-hidden />
                )}
                <div className="group flex items-center gap-2.5 rounded-full border border-slate-150 bg-slate-50/80 px-4 py-2.5 transition-all hover:border-brand-200 hover:bg-brand-50/50">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm transition-shadow group-hover:shadow-md">
                    {iconMap[item.icon] ?? <Shield className="h-5 w-5" />}
                  </div>
                  <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

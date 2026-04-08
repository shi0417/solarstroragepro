"use client";

import { useLocaleContext } from "./LocaleProvider";

export function Features() {
  const { messages } = useLocaleContext();
  const f = messages.features;

  return (
    <section
      id="solutions"
      className="scroll-mt-20 border-y border-[var(--border)] bg-slate-900/40 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{f.heading}</h2>
        <p className="mt-3 max-w-2xl text-slate-400">{f.sub}</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {f.items.map((item) => (
            <div key={item.title} className="flex gap-4">
              <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-solar-500/20 text-solar-400">
                ✓
              </span>
              <div>
                <h3 className="font-semibold text-slate-100">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { siteContact } from "@/lib/site-config";

import { useLocaleContext } from "./LocaleProvider";

export function Cta() {
  const { messages } = useLocaleContext();
  const c = messages.cta;

  return (
    <section id="contact" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-slate-800/80 to-slate-900 p-8 sm:p-12 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">{c.title}</h2>
            <p className="mt-2 max-w-xl text-slate-400">{c.sub}</p>
          </div>
          <a
            href={`mailto:${siteContact.email}`}
            className="mt-6 inline-flex shrink-0 items-center justify-center rounded-full bg-solar-500 px-8 py-3 font-semibold text-slate-950 shadow-lg shadow-solar-500/25 transition hover:bg-solar-400 md:mt-0"
          >
            {c.button}
          </a>
        </div>
      </div>
    </section>
  );
}

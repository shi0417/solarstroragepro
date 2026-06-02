"use client";

import { ArrowRight, MessageCircle, Clock } from "lucide-react";

import { siteContact, whatsappUrl } from "@/lib/site-config";

import { useLocaleContext } from "./LocaleProvider";

export function Cta() {
  const { messages } = useLocaleContext();
  const c = messages.cta;

  return (
    <section id="contact" className="scroll-mt-20 relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950 dark-section-overlay">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-brand-400/10 blur-[150px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-emerald-400/5 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24">
        {/* Response time badge */}
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
          <Clock className="h-4 w-4" aria-hidden />
          {c.response}
        </div>

        <h2
          className="font-extrabold tracking-tight text-white"
          style={{ fontSize: "clamp(1.875rem, 3.5vw, 3rem)" }}
        >
          {c.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-brand-200/80" style={{ lineHeight: 1.7 }}>
          {c.sub}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary bg-emerald-500 text-white shadow-xl shadow-emerald-600/30 hover:bg-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/30"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            {c.whatsappBtn}
          </a>
          <a
            href={`mailto:${siteContact.email}`}
            className="btn-secondary border-white/15 bg-white/[0.06] text-white backdrop-blur-sm hover:bg-white/15 hover:border-white/25"
          >
            {c.emailBtn}
            <ArrowRight className="h-5 w-5" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

"use client";

import { ArrowRight, MessageCircle, Clock } from "lucide-react";

import { siteContact, whatsappUrl } from "@/lib/site-config";
import { trackEmailClick, trackWhatsAppClick } from "@/lib/tracking";

import { ContactForm } from "./ContactForm";
import { ResourceDownload } from "./ResourceDownload";
import { useLocaleContext } from "./LocaleProvider";

export function Cta() {
  const { messages } = useLocaleContext();
  const c = messages.cta;

  return (
    <section id="contact" className="scroll-mt-20 relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950 dark-section-overlay">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-brand-400/10 blur-[150px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-emerald-400/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        {/* Response time badge */}
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
          <Clock className="h-4 w-4" aria-hidden />
          {c.response}
        </div>

        <h2
          className="text-center font-extrabold tracking-tight text-white"
          style={{ fontSize: "clamp(1.875rem, 3.5vw, 3rem)" }}
        >
          {c.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-brand-200/80" style={{ lineHeight: 1.7 }}>
          {c.sub}
        </p>

        {/* Contact Form + Quick Contact Buttons */}
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* Left: Contact Form */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-xl backdrop-blur sm:p-8">
            <h3 className="mb-6 text-lg font-bold text-white">
              {c.inquiryTitle}
            </h3>
            <ContactForm compact />
          </div>

          {/* Right: Quick contact buttons */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">
                {c.orReachUs}
              </h3>
              <div className="flex flex-col gap-3">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("CTA Section")}
                  className="inline-flex items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-4 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/20 hover:border-emerald-400/30"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden />
                  {c.whatsappBtn}
                </a>
                <a
                  href={`mailto:${siteContact.email}`}
                  onClick={() => trackEmailClick("CTA Section")}
                  className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.06] px-5 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 hover:border-white/25"
                >
                  {c.emailBtn}
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </a>
              </div>
            </div>

            {/* 24/7 Support badge */}
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
              <p className="text-sm font-semibold text-white">
                {c.supportTitle}
              </p>
              <p className="mt-1 text-xs text-brand-300/60">
                {c.supportSub}
              </p>
            </div>
          </div>
        </div>

        {/* Resource Download Section */}
        <div className="mt-16">
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              {c.resourceTitle}
            </h3>
            <p className="mt-2 text-brand-200/70">
              {c.resourceSub}
            </p>
          </div>
          <div className="mx-auto max-w-4xl">
            <ResourceDownload />
          </div>
        </div>
      </div>
    </section>
  );
}

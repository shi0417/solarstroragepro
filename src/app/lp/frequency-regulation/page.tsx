import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Shield,
  Zap,
  Clock,
  BarChart3,
  Globe,
  Battery,
} from "lucide-react";
import { siteContact, whatsappUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "BESS for Frequency Regulation — Get a Free Proposal | SolarStorage Pro",
  description:
    "Sub-200ms response BESS systems for grid frequency regulation. IEC/CE/UL certified. Deployed in 50+ countries. Chat with our engineers now.",
};

export default function FrequencyRegulationLandingPage() {
  return (
    <>
      {/* No Header — prevent visitors from navigating away */}

      <main>
        {/* Hero — full-width, impactful */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800">
          {/* Dot pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-brand-400/15 blur-[150px]" />

          <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:py-36">
            {/* Badge */}
            <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-brand-200 backdrop-blur-sm">
              <Zap className="h-4 w-4 text-emerald-400" aria-hidden />
              BESS Frequency Regulation Specialist
            </span>

            <h1
              className="font-extrabold leading-[1.1] tracking-tight text-white"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
            >
              Grid Frequency Regulation
              <br />
              <span className="bg-gradient-to-r from-sky-300 via-brand-200 to-emerald-300 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>

            <p
              className="mx-auto mt-6 max-w-2xl text-lg text-slate-300/90"
              style={{ lineHeight: 1.75 }}
            >
              Deploy proven BESS systems that respond in under 200ms. We handle
              design, manufacturing, delivery, and commissioning — worldwide.
            </p>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                "IEC 62619 Certified",
                "Sub-200ms Response",
                "50+ Countries",
                "24h Tech Support",
              ].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden />
                  {t}
                </span>
              ))}
            </div>

            {/* Primary CTA */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-emerald-500 text-white text-lg px-10 py-4 shadow-xl shadow-emerald-500/30 hover:bg-emerald-400 hover:shadow-2xl"
              >
                <MessageCircle className="h-6 w-6" aria-hidden />
                Chat with Our Engineers
              </a>
              <a
                href={`mailto:${siteContact.email}`}
                className="btn-secondary border-white/15 bg-white/[0.06] text-white backdrop-blur-sm hover:bg-white/15 hover:border-white/25"
              >
                Send Email
                <ArrowRight className="h-5 w-5" aria-hidden />
              </a>
            </div>
          </div>

          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" className="w-full">
              <path
                d="M0 60L60 52C120 44 240 28 360 22C480 16 600 20 720 28C840 36 960 48 1080 50C1200 52 1320 44 1380 40L1440 36V60H0Z"
                fill="white"
              />
            </svg>
          </div>
        </section>

        {/* Key specs */}
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="section-eyebrow">
                <Battery className="h-4 w-4" aria-hidden />
                Technical Specs
              </span>
              <h2 className="section-heading mt-3">
                Built for Frequency Regulation Demands
              </h2>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: <Zap className="h-7 w-7" aria-hidden />,
                  title: "Sub-200ms",
                  desc: "Response time faster than market requirements",
                  color: "from-brand-500 to-sky-500",
                },
                {
                  icon: <Shield className="h-7 w-7" aria-hidden />,
                  title: "IEC/CE/UL",
                  desc: "Multi-certified for global deployment",
                  color: "from-emerald-500 to-teal-500",
                },
                {
                  icon: <Clock className="h-7 w-7" aria-hidden />,
                  title: "8,000+ Cycles",
                  desc: "Premium LFP cells with long life guarantee",
                  color: "from-amber-500 to-orange-500",
                },
                {
                  icon: <BarChart3 className="h-7 w-7" aria-hidden />,
                  title: "Smart EMS",
                  desc: "AGC/FCAS-ready with auto-dispatch",
                  color: "from-violet-500 to-purple-500",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group text-center transition-all hover:-translate-y-1"
                >
                  <div
                    className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg transition-shadow group-hover:shadow-xl`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product range */}
        <section className="section-padding bg-slate-50/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="section-heading">Product Range</h2>
              <p className="section-desc mx-auto mt-3">
                From 100kWh cabinets to 10MWh+ containerized systems
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {[
                {
                  title: "C&I Battery Cabinets",
                  range: "100 – 500 kWh",
                  desc: "Modular cabinets with 1C/2C rate, liquid cooling",
                  icon: <Battery className="h-5 w-5" />,
                  gradient: "from-brand-500 to-brand-600",
                },
                {
                  title: "Grid-Scale BESS",
                  range: "1MW – 10MW+",
                  desc: "Containerized systems with integrated PCS & EMS",
                  icon: <Globe className="h-5 w-5" />,
                  gradient: "from-emerald-500 to-emerald-600",
                },
                {
                  title: "Residential ESS",
                  range: "5 – 20 kWh",
                  desc: "All-in-one systems with built-in inverter",
                  icon: <Zap className="h-5 w-5" />,
                  gradient: "from-amber-500 to-amber-600",
                },
              ].map((p) => (
                <div
                  key={p.title}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div className={`flex items-center gap-3 bg-gradient-to-r ${p.gradient} px-5 py-4 text-white`}>
                    {p.icon}
                    <div>
                      <div className="text-sm font-bold">{p.title}</div>
                      <div className="text-xs text-white/80">{p.range}</div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-slate-600">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950 dark-section-overlay">
          <div className="pointer-events-none absolute -left-32 -top-32 h-[400px] w-[400px] rounded-full bg-emerald-400/5 blur-[120px]" />
          <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20">
            <h2
              className="font-extrabold tracking-tight text-white"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Get Your Free Proposal in 48 Hours
            </h2>
            <p className="mt-4 text-lg text-brand-200/80" style={{ lineHeight: 1.7 }}>
              Share your grid requirements and our engineers will design a
              customized BESS solution — no commitment, no pressure.
            </p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8 bg-emerald-500 text-white text-lg px-10 py-4 shadow-xl shadow-emerald-500/30 hover:bg-emerald-400 hover:shadow-2xl"
            >
              <MessageCircle className="h-6 w-6" aria-hidden />
              Start Chat on WhatsApp
            </a>
            <p className="mt-6 text-sm text-brand-400/60">
              Available 24/7 &middot; Average response: under 2 hours
            </p>
          </div>
        </section>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-brand-800 bg-brand-950 py-6 text-center text-xs text-brand-500/60">
        &copy; {new Date().getFullYear()} SolarStorage Energy Tech &middot; All
        rights reserved
      </footer>
    </>
  );
}

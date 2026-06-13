"use client";

import Image from "next/image";
import Link from "next/link";
import React, { type ReactNode } from "react";
import {
  Activity,
  Award,
  Battery,
  Bolt,
  Flame,
  Layers,
  Play,
  Puzzle,
  ShieldCheck,
  SlidersHorizontal,
  Thermometer,
} from "lucide-react";

import { ComparisonSpecTable } from "@/components/site/ComparisonSpecTable";
import { ContactForm } from "@/components/site/ContactForm";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";

/* ── Product Showcase: image first, fallback to video with click-to-play, fallback to icon ── */
function ProductShowcase({
  imageSrc,
  videoSrc,
  alt,
  playLabel,
  fallbackLabel,
}: {
  imageSrc: string;
  videoSrc: string;
  alt: string;
  playLabel: string;
  fallbackLabel: string;
}) {
  const [mode, setMode] = React.useState<"image" | "video" | "icon">("image");
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  };

  return (
    <div className="relative flex h-[320px] w-full items-center justify-center">
      {/* Image mode */}
      {mode === "image" && (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="rounded-2xl object-contain"
          onError={() => {
            if (videoSrc) setMode("video");
            else setMode("icon");
          }}
          priority
        />
      )}

      {/* Video mode */}
      {mode === "video" && (
        <div className="relative h-full w-full">
          <video
            ref={videoRef}
            src={videoSrc}
            className="h-full w-full rounded-2xl object-contain"
            muted
            loop
            playsInline
            onError={() => setMode("icon")}
            onEnded={() => setIsPlaying(false)}
            preload="metadata"
          />

          {/* Play button overlay */}
          {!isPlaying && (
            <button
              onClick={handlePlay}
              className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/30 transition hover:bg-black/40"
              aria-label={playLabel}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition hover:scale-105 hover:bg-white">
                <Play className="ml-1 h-7 w-7 text-slate-800" fill="currentColor" />
              </div>
            </button>
          )}
        </div>
      )}

      {/* Icon fallback */}
      {mode === "icon" && (
        <div className="flex flex-col items-center gap-3">
          <Battery className="h-24 w-24 text-solar-400/60" aria-hidden />
          <p className="text-xs text-slate-500">
            {fallbackLabel}
          </p>
        </div>
      )}
    </div>
  );
}

const SPEC_HEADERS = ["100kWh", "200kWh", "250kWh", "500kWh"] as const;

const SPEC_ROWS_EN: { name: string; values: string[] }[] = [
  { name: "Charging/Discharging Rate (P)", values: ["1C", "1C", "1C/2C", "1C/2C"] },
  { name: "Battery Chemistry", values: ["LFP", "LFP", "LFP", "LFP"] },
  { name: "Nominal Voltage (V)", values: ["768", "768", "768", "1536"] },
  { name: "Voltage Range (VDC)", values: ["672~876", "672~876", "672~876", "1344~1752"] },
  { name: "Nominal Power (kW)", values: ["100", "200", "250/500", "500/1000"] },
  { name: "Nominal Energy (kWh)", values: ["100", "200", "250", "500"] },
  { name: "Cycle Life", values: ["8,000+", "8,000+", "8,000+", "8,000+"] },
  { name: "Cooling Mode", values: ["Liquid", "Liquid", "Liquid", "Liquid"] },
  { name: "Fire Suppression", values: ["Perfluoro + Aerosol", "Perfluoro + Aerosol", "Perfluoro + Aerosol", "Perfluoro + Aerosol"] },
  { name: "Protection Rating", values: ["IP55", "IP55", "IP55", "IP55"] },
  { name: "Dimension (mm) L×W×H", values: ["1200×980×2100", "2400×980×2100", "2400×980×2100", "6058×2438×2896"] },
  { name: "Weight (kg)", values: ["1,200", "2,300", "2,800", "12,000"] },
];

const CERTS = ["IEC 62619", "UN38.3", "CE", "UL 9540A", "GB/T 36276-2023"] as const;

export default function CiBatteryCabinetsPage() {
  const { messages, localizePath } = useLocaleContext();
  const p = messages.productsCiBattery;
  const features = (p.features as { t: string; b: string }[]).map((f) => ({
    title: f.t,
    body: f.b,
  }));
  const apps = (p.apps as { t: string; d: string }[]);

  const appIcons: ReactNode[] = [
    <Activity key="activity" className="h-6 w-6" />,
    <Bolt key="bolt" className="h-6 w-6" />,
    <ShieldCheck key="shield" className="h-6 w-6" />,
  ];

  const featIcons: ReactNode[] = [
    <Bolt key="bolt" className="h-5 w-5" aria-hidden />,
    <Thermometer key="thermometer" className="h-5 w-5" aria-hidden />,
    <Flame key="flame" className="h-5 w-5" aria-hidden />,
    <Puzzle key="puzzle" className="h-5 w-5" aria-hidden />,
    <Layers key="layers" className="h-5 w-5" aria-hidden />,
    <SlidersHorizontal key="sliders" className="h-5 w-5" aria-hidden />,
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[var(--border)]">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900" />
          <div className="pointer-events-none absolute inset-0 bg-grid-slate bg-[length:44px_44px] opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-20%,rgba(245,158,11,0.14),transparent)]" />

          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
              <Link href={localizePath("/")} className="transition hover:text-solar-400">
                {p.breadcrumbHome}
              </Link>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">{p.breadcrumbProducts}</span>
            </div>

            <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div>
                <p className="inline-flex rounded-full border border-[var(--border)] bg-[var(--accent-dim)] px-3 py-1 text-xs font-medium text-solar-400">
                  {p.badge}
                </p>
                <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  {p.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
                  {p.desc}
                </p>

                {/* Quick specs */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {[p.tagRate, p.tagCooling, p.tagCycles, p.tagIp55].map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-slate-950/30 px-3 py-1 text-xs font-medium text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Product image + certs */}
              <div className="grid gap-4">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/40 backdrop-blur">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.18),transparent_55%)]" />
                  <div className="relative flex items-center justify-center">
                    <ProductShowcase
                      imageSrc="/images/products/ci-battery-cabinets.jpg"
                      videoSrc="/videos/ci-product.mp4"
                      alt={p.altText}
                      playLabel={p.playVideo}
                      fallbackLabel={p.fallbackText}
                    />
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-solar-500/15 text-solar-400">
                      <Award className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {p.certTitle}
                      </p>
                      <p className="text-xs text-slate-400">
                        {p.certSub}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {CERTS.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-white/10 bg-slate-950/30 px-3 py-1 text-xs font-medium text-slate-200"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {p.featHeading}
            </h2>
            <p className="mt-3 max-w-3xl text-slate-400">
              {p.featSub}
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-[var(--border)] bg-slate-800/80 p-6 shadow-xl shadow-black/20 backdrop-blur transition hover:border-solar-500/40"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-solar-500/15 text-solar-400">
                      {featIcons[i]}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-100 group-hover:text-white">{f.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Spec Table */}
        <section className="border-y border-[var(--border)] bg-slate-900/35 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {p.specTitle}
            </h2>
            <p className="mt-3 max-w-3xl text-slate-400">
              {p.specSub}
            </p>

            <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--border)] bg-slate-800/80 shadow-2xl shadow-black/30">
              <div className="p-3 sm:p-4">
                <ComparisonSpecTable
                  headerRow={{
                    cornerLabel: p.specCorner,
                    titles: [...SPEC_HEADERS],
                  }}
                  rows={SPEC_ROWS_EN.map((row) => ({
                    label: row.name,
                    values: row.values,
                  }))}
                />
              </div>

              <div className="border-t border-[var(--border)] bg-slate-950/30 px-6 py-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold text-white">
                    {p.certTitle}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {CERTS.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Scenarios */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {p.appTitle}
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {apps.map((item, i) => (
                <div
                  key={item.t}
                  className="rounded-2xl border border-[var(--border)] bg-slate-800/80 p-6 backdrop-blur"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-solar-500/15 text-solar-400">
                    {appIcons[i]}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{item.t}</h3>
                  <p className="mt-2 text-sm text-slate-400">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form CTA */}
        <section id="contact" className="scroll-mt-20 border-t border-[var(--border)] bg-slate-900/50 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {p.ctaTitle}
              </h2>
              <p className="mt-3 text-slate-400">
                {p.ctaSub}
              </p>
            </div>

            <div className="mt-10 rounded-2xl border border-[var(--border)] bg-slate-800/60 p-8 shadow-xl shadow-black/20 backdrop-blur">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

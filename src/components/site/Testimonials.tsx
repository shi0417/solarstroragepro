"use client";

import { Star, Quote, MapPin } from "lucide-react";
import { useLocaleContext } from "./LocaleProvider";

export function Testimonials() {
  const { messages } = useLocaleContext();
  const t = messages.testimonials;

  return (
    <section className="section-padding bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow">
            <Star className="h-4 w-4 fill-brand-500 text-brand-500" aria-hidden />
            Client Testimonials
          </span>
          <h2 className="section-heading mt-4">
            {t.heading}
          </h2>
          <p className="section-desc mx-auto mt-4">
            {t.sub}
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {t.items.map((item: { quote: string; name: string; role: string; company: string; project: string }, i: number) => (
            <div
              key={i}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/5 hover:-translate-y-1"
            >
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-brand-500 to-sky-400" />

              <div className="flex flex-1 flex-col p-8">
                {/* Quote icon */}
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                  <Quote className="h-5 w-5" aria-hidden />
                </div>

                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                      aria-hidden
                    />
                  ))}
                </div>

                {/* Quote text */}
                <p className="mt-5 flex-1 text-sm leading-[1.8] text-slate-600 italic">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Divider */}
                <div className="my-6 border-t border-slate-100" />

                {/* Author info */}
                <div className="flex items-center gap-4">
                  {/* Avatar placeholder */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-100 to-brand-200 text-sm font-bold text-brand-700">
                    {item.name.split(" ").map((n: string) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{item.name}</div>
                    <div className="mt-0.5 text-xs text-slate-400">{item.role}</div>
                    <div className="mt-1 flex items-center gap-1 text-xs font-medium text-brand-600">
                      <MapPin className="h-3 w-3" aria-hidden />
                      {item.project}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

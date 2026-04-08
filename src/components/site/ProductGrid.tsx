"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { useLocaleContext } from "./LocaleProvider";

export function ProductGrid() {
  const { messages } = useLocaleContext();
  const p = messages.products;

  return (
    <section id="products" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{p.heading}</h2>
        <p className="mt-3 max-w-2xl text-slate-400">{p.sub}</p>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {p.items.map((item) => (
            <li
              key={item.name}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xl shadow-black/20 backdrop-blur transition hover:border-solar-500/40"
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className="block rounded-2xl p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solar-500"
                  aria-label={`${item.name} details`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-block rounded-md bg-slate-800 px-2 py-0.5 text-xs font-medium text-solar-400">
                      {item.tag}
                    </span>
                    <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-200 opacity-0 transition group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-slate-100 group-hover:text-white">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.desc}</p>
                </Link>
              ) : (
                <div className="p-6">
                  <span className="inline-block rounded-md bg-slate-800 px-2 py-0.5 text-xs font-medium text-solar-400">
                    {item.tag}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-slate-100 group-hover:text-white">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.desc}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

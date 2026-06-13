"use client";

import Link from "next/link";
import { ArrowUpRight, Battery, Container, Home, Sun } from "lucide-react";

import { useLocaleContext } from "./LocaleProvider";

export function ProductGrid() {
  const { messages } = useLocaleContext();
  const p = messages.products;

  const iconMap: Record<string, React.ReactNode> = {
    "C&I": <Battery className="h-6 w-6" aria-hidden />,
    Utility: <Container className="h-6 w-6" aria-hidden />,
    Residential: <Home className="h-6 w-6" aria-hidden />,
    Hybrid: <Sun className="h-6 w-6" aria-hidden />,
    "工商业": <Battery className="h-6 w-6" aria-hidden />,
    "电网级": <Container className="h-6 w-6" aria-hidden />,
    "户用": <Home className="h-6 w-6" aria-hidden />,
    "光储一体": <Sun className="h-6 w-6" aria-hidden />,
  };

  const colorMap: Record<string, string> = {
    "C&I": "from-brand-500 to-brand-600",
    Utility: "from-emerald-500 to-emerald-600",
    Residential: "from-amber-500 to-amber-600",
    Hybrid: "from-violet-500 to-violet-600",
    "工商业": "from-brand-500 to-brand-600",
    "电网级": "from-emerald-500 to-emerald-600",
    "户用": "from-amber-500 to-amber-600",
    "光储一体": "from-violet-500 to-violet-600",
  };

  return (
    <section id="products" className="scroll-mt-20 section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow">
            <Battery className="h-4 w-4" aria-hidden />
            Product Line
          </span>
          <h2 className="section-heading mt-4">
            {p.heading}
          </h2>
          <p className="section-desc mx-auto mt-4">
            {p.sub}
          </p>
        </div>

        {/* Product cards */}
        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {p.items.map((item: { name: string; href?: string; image: string; tag: string; desc: string; specs: Array<{ label: string; value: string }> }) => (
            <li
              key={item.name}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/5 hover:-translate-y-1"
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className="flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                  aria-label={`${item.name} details`}
                >
                  <ProductCardContent
                    item={item}
                    icon={iconMap[item.tag] ?? <Battery className="h-6 w-6" />}
                    gradient={colorMap[item.tag] ?? "from-brand-500 to-brand-600"}
                  />
                </Link>
              ) : (
                <div className="flex h-full flex-col">
                  <ProductCardContent
                    item={item}
                    icon={iconMap[item.tag] ?? <Battery className="h-6 w-6" />}
                    gradient={colorMap[item.tag] ?? "from-brand-500 to-brand-600"}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProductCardContent({
  item,
  icon,
  gradient,
}: {
  item: { name: string; desc: string; tag: string };
  icon: React.ReactNode;
  gradient: string;
}) {
  return (
    <>
      {/* Image placeholder area */}
      <div className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${gradient} overflow-hidden`}>
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative text-white/90">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
            {icon}
          </div>
        </div>
        {/* Tag */}
        <span className="absolute right-3 top-3 rounded-lg bg-white/20 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
          {item.tag}
        </span>
        {/* Hover arrow */}
        <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:-translate-y-0 translate-x-1 translate-y-1">
          <ArrowUpRight className="h-4 w-4 text-white" aria-hidden />
        </span>
      </div>

      {/* Text content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-brand-700">
          {item.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
          {item.desc}
        </p>
        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
          Learn more
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </div>
      </div>
    </>
  );
}

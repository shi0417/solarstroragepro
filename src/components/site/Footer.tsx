"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

import { siteContact } from "@/lib/site-config";

import { useLocaleContext } from "./LocaleProvider";

export function Footer() {
  const { messages } = useLocaleContext();
  const f = messages.footer;

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-black text-white">
                SS
              </span>
              <span className="text-lg font-bold text-white">
                Solar<span className="text-brand-400">Storage</span> Pro
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              Professional BESS manufacturer specializing in grid frequency regulation, peak shaving, and energy storage solutions.
            </p>
            <p className="mt-6 text-xs text-slate-600">
              {f.stack}
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Products
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                { label: "C&I Battery Cabinets", href: "/products/ci-battery-cabinets" },
                { label: "Grid-Scale BESS", href: "/products/energy-storage-system" },
                { label: "Residential ESS", href: "/products/residential-ess" },
                { label: "Solar + Storage", href: "/products/solar-panels" },
                { label: "PCS Systems", href: "/products/pcs" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 text-sm transition-colors hover:text-brand-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Solutions
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Frequency Regulation", href: "#solutions" },
                { label: "Peak Shaving", href: "#solutions" },
                { label: "Data Center Storage", href: "/solutions/data-center-energy-storage" },
                { label: "Grid-Level BESS", href: "/solutions/grid-level-bess" },
                { label: "Case Studies", href: "/case-center" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 text-sm transition-colors hover:text-brand-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${siteContact.email}`}
                  className="inline-flex items-center gap-2 text-sm transition-colors hover:text-brand-400"
                >
                  <Mail className="h-4 w-4 text-brand-500" aria-hidden />
                  {siteContact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteContact.phoneTel}`}
                  className="inline-flex items-center gap-2 text-sm transition-colors hover:text-brand-400"
                >
                  <Phone className="h-4 w-4 text-brand-500" aria-hidden />
                  {siteContact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden />
                Taizhou, Zhejiang, China
              </li>
            </ul>

            {/* Quick CTA */}
            <div className="mt-6">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-700 hover:shadow-md hover:shadow-brand-600/20"
              >
                Get a Quote
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} {f.rights}
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-600">
            <span>IEC 62619</span>
            <span className="text-slate-700">|</span>
            <span>CE Certified</span>
            <span className="text-slate-700">|</span>
            <span>UL 9540A</span>
            <span className="text-slate-700">|</span>
            <span>ISO 9001</span>
            <span className="text-slate-700">|</span>
            <span>24/7 Technical Support Across Time Zones</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

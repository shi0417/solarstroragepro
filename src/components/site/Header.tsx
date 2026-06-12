import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { siteContact } from "@/lib/site-config";

import { HeaderChrome } from "@/components/site/HeaderChrome";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { MainNavigation } from "@/components/site/MainNavigation";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-white/95 backdrop-blur-xl transition-all duration-300">
      {/* Top bar — compact, high info density */}
      <div className="border-b border-slate-100 bg-slate-50/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 sm:px-6">
          <div className="hidden items-center gap-5 text-xs text-slate-500 sm:flex">
            <a
              href={`tel:${siteContact.phoneTel}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-600"
            >
              <Phone className="h-3 w-3 text-brand-500" aria-hidden />
              <span className="font-medium text-slate-700">{siteContact.phoneDisplay}</span>
            </a>
            <span className="text-slate-200">|</span>
            <a
              href={`mailto:${siteContact.email}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-600"
            >
              <Mail className="h-3 w-3 text-brand-500" aria-hidden />
              {siteContact.email}
            </a>
          </div>
          <div className="flex w-full items-center justify-between sm:w-auto sm:justify-end sm:gap-4">
            <HeaderChrome
              field="tagline"
              className="hidden text-[10px] font-medium uppercase tracking-[0.15em] text-slate-400 lg:block"
            />
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main nav bar — clean, spacious */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-black tracking-tight text-white shadow-md shadow-brand-600/20 transition-shadow group-hover:shadow-lg group-hover:shadow-brand-600/30">
            SS
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Solar<span className="text-brand-600">Storage</span>{" "}
            <span className="font-semibold text-slate-400">Pro</span>
          </span>
        </Link>

        {/* Center navigation */}
        <div className="hidden flex-1 items-center justify-center lg:flex">
          <MainNavigation />
        </div>

        {/* Right CTA + mobile menu */}
        <div className="flex items-center gap-3">
          <HeaderChrome
            as="a"
            href="/#contact"
            className="hidden shrink-0 items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-700 hover:shadow-md hover:shadow-brand-600/20 active:scale-[0.97] lg:inline-flex"
            field="contactCta"
          />
          <div className="lg:hidden">
            <MainNavigation />
          </div>
        </div>
      </div>
    </header>
  );
}

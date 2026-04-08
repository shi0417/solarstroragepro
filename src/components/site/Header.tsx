import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { siteContact } from "@/lib/site-config";

import { HeaderChrome } from "@/components/site/HeaderChrome";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { MainNavigation } from "@/components/site/MainNavigation";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md">
      <div className="border-b border-[var(--border)] bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2 text-xs text-slate-400 sm:px-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <a
              href={`tel:${siteContact.phoneTel}`}
              className="inline-flex items-center gap-1.5 transition hover:text-solar-400"
            >
              <Phone className="h-3.5 w-3.5 shrink-0 text-solar-500" aria-hidden />
              <span className="font-medium text-slate-200">{siteContact.phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${siteContact.email}`}
              className="inline-flex items-center gap-1.5 break-all transition hover:text-solar-400"
            >
              <Mail className="h-3.5 w-3.5 shrink-0 text-solar-500" aria-hidden />
              {siteContact.email}
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
            <HeaderChrome
              field="tagline"
              className="hidden text-[11px] uppercase tracking-wider text-slate-500 lg:block"
            />
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-solar-500 to-amber-600 text-sm font-bold text-slate-950 shadow-lg shadow-solar-500/20">
            SS
          </span>
          <span className="truncate text-lg font-semibold tracking-tight text-slate-50">
            SolarStorage <span className="text-solar-500">Pro</span>
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-4 lg:justify-center">
          <MainNavigation />
        </div>

        <HeaderChrome
          as="a"
          href="#contact"
          className="hidden shrink-0 rounded-full bg-solar-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-md shadow-solar-500/25 transition hover:bg-solar-400 lg:inline-flex"
          field="contactCta"
        />
      </div>
    </header>
  );
}

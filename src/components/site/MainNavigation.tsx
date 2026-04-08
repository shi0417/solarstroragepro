"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

import type { NavItem } from "./nav-config";

import { useLocaleContext } from "./LocaleProvider";

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

function isInternalAppRoute(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

function NavDropdownChild({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  if (isInternalAppRoute(href)) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

function DesktopDropdown({ item, viewAll }: { item: NavItem; viewAll: string }) {
  if (!item.children?.length) {
    return (
      <NavDropdownChild
        href={item.href}
        className="text-sm font-medium text-slate-200 transition hover:text-white"
      >
        {item.label}
      </NavDropdownChild>
    );
  }

  return (
    <div className="group relative">
      <button
        type="button"
        className="inline-flex items-center gap-1 text-sm font-medium text-slate-200 transition hover:text-white"
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown className="h-4 w-4 opacity-70 transition group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-0 top-full z-50 min-w-[220px] pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
        <div className="rounded-xl border border-[var(--border)] bg-slate-950/95 py-2 shadow-xl backdrop-blur-md">
          <NavDropdownChild
            href={item.href}
            className="block px-4 py-2 text-xs font-semibold uppercase tracking-wide text-solar-400 hover:bg-white/5"
          >
            {viewAll}
          </NavDropdownChild>
          {item.children.map((c) => (
            <NavDropdownChild
              key={c.label}
              href={c.href}
              className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
            >
              {c.label}
            </NavDropdownChild>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MainNavigation() {
  const [open, setOpen] = useState(false);
  const { messages } = useLocaleContext();
  const nav = messages.nav;
  const h = messages.header;

  return (
    <>
      <div className="hidden items-center gap-8 lg:flex">
        {nav.map((item) => (
          <DesktopDropdown key={item.label} item={item} viewAll={h.viewAll} />
        ))}
      </div>

      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--border)] text-slate-200 lg:hidden"
        aria-label={open ? h.menuClose : h.menuOpen}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open ? (
        <div className="fixed inset-0 z-[55] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label={h.overlayClose}
            onClick={() => setOpen(false)}
          />
          <nav
            className="absolute right-0 top-0 flex h-full w-[min(100vw-3rem,320px)] flex-col gap-1 border-l border-[var(--border)] bg-slate-950 p-4 pt-20 shadow-2xl"
            aria-label={h.navAria}
          >
            {nav.map((item) => (
              <div key={item.label} className="border-b border-[var(--border)] py-2">
                <NavDropdownChild
                  href={item.href}
                  className="block py-2 text-base font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavDropdownChild>
                {item.children?.map((c) => (
                  <NavDropdownChild
                    key={c.label}
                    href={c.href}
                    className="block py-1.5 pl-2 text-sm text-slate-400 hover:text-solar-400"
                    onClick={() => setOpen(false)}
                  >
                    {c.label}
                  </NavDropdownChild>
                ))}
              </div>
            ))}
            <Link
              href="#contact"
              className="mt-4 rounded-full bg-solar-500 py-3 text-center text-sm font-semibold text-slate-950"
              onClick={() => setOpen(false)}
            >
              {h.mobileQuote}
            </Link>
          </nav>
        </div>
      ) : null}
    </>
  );
}

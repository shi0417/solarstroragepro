"use client";

import { useState, useRef, useEffect } from "react";
import { useLocaleContext } from "./LocaleProvider";
import { LOCALES, type Locale } from "@/lib/locale";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocaleContext();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 点击外部关闭
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const current = LOCALES.find((l) => l.code === locale) || LOCALES[0];

  return (
    <div ref={ref} className="relative" role="group" aria-label="Language">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={
          "inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-medium transition " +
          (open
            ? "border-brand-500/60 bg-solar-500/10 text-brand-300"
            : "border-slate-700/80 bg-slate-900/60 text-slate-300 hover:border-slate-600 hover:text-white")
        }
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span>🌐</span>
        <span>{current.native}</span>
        <svg
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 下拉菜单 */}
      {open && (
        <div
          role="listbox"
          className="absolute right-0 z-50 mt-1 max-h-[320px] overflow-y-auto rounded-lg border border-slate-700/80 bg-slate-900 py-1 shadow-xl shadow-black/40"
          style={{ minWidth: "140px" }}
        >
          {LOCALES.map(({ code, label, native }) => (
            <button
              key={code}
              type="button"
              role="option"
              aria-selected={locale === code}
              onClick={() => {
                setLocale(code as Locale);
                setOpen(false);
              }}
              className={
                "flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs transition " +
                (locale === code
                  ? "bg-solar-500/15 font-semibold text-brand-300"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white")
              }
            >
              <span className="w-8 shrink-0 text-right font-medium tabular-nums">
                {label}
              </span>
              <span className="truncate">{native}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

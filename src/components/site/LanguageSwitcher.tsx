"use client";

import { useLocaleContext } from "./LocaleProvider";
import type { Locale } from "@/lib/locale";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocaleContext();

  const pill = (code: Locale, label: string) => (
    <button
      type="button"
      onClick={() => setLocale(code)}
      className={
        locale === code
          ? "rounded-md bg-solar-500/20 px-2 py-0.5 font-semibold text-solar-400"
          : "rounded-md px-2 py-0.5 text-slate-500 transition hover:text-slate-300"
      }
      aria-pressed={locale === code}
    >
      {label}
    </button>
  );

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-lg border border-slate-700/80 bg-slate-900/60 px-1 py-0.5 text-[11px] tracking-wide"
      role="group"
      aria-label="Language"
    >
      {pill("zh", "中文")}
      <span className="text-slate-600" aria-hidden>
        |
      </span>
      {pill("en", "EN")}
    </div>
  );
}

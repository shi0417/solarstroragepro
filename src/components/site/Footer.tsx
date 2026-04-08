"use client";

import { useLocaleContext } from "./LocaleProvider";

export function Footer() {
  const { messages } = useLocaleContext();
  const f = messages.footer;

  return (
    <footer className="border-t border-[var(--border)] bg-slate-950/50 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-semibold text-slate-100">SolarStorage Pro</p>
          <p className="mt-1 text-sm text-slate-500">
            © {new Date().getFullYear()} {f.rights}
          </p>
        </div>
        <p className="text-sm text-slate-500">{f.stack}</p>
      </div>
    </footer>
  );
}

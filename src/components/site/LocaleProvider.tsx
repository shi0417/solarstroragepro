"use client";

import { createContext, useContext, type ReactNode, useMemo } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Messages = Record<string, any>;

type Ctx = {
  locale: string;
  messages: Messages;
  setLocale: (next: string) => void;
  localizePath: (path: string) => string;
};

const LocaleContext = createContext<Ctx | null>(null);

export function LocaleProvider({
  locale,
  messages,
  children,
}: {
  locale: string;
  messages: Messages;
  children: ReactNode;
}) {
  const value = useMemo(() => {
    const setLocale = (next: string) => {
      if (typeof document !== "undefined") {
        const pathname = window.location.pathname;
        const newPath = pathname.replace(/^\/[^/]+/, `/${next}`);
        document.cookie = `locale=${next}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`;
        window.location.href = newPath;
      }
    };
    const localizePath = (path: string): string => {
      if (/^https?:\/\//i.test(path)) return path;
      if (path === "/") return `/${locale}`;
      if (path.startsWith("/#")) return `/${locale}${path}`;
      if (path.startsWith("/")) return `/${locale}${path}`;
      return path;
    };
    return { locale, messages, setLocale, localizePath };
  }, [locale, messages]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocaleContext(): Ctx {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocaleContext must be used within LocaleProvider");
  }
  return ctx;
}

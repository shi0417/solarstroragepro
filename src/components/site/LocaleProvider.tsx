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
      if (typeof window !== "undefined") {
        const pathname = window.location.pathname;
        let newPath: string;
        
        // 根路径：直接跳转到 /{next}
        if (pathname === "/") {
          newPath = `/${next}`;
        } else {
          // 替换第一个路径段（locale）
          const match = pathname.match(/^\/([^/]+)/);
          if (match && ["en","zh","es","tr","pt","de","fr","th","ar","ja","ko","id","uk"].includes(match[1])) {
            // 有有效的 locale 前缀，替换它
            newPath = `/${next}${pathname.slice(match[0].length)}`;
          } else {
            // 没有 locale 前缀，添加它
            newPath = `/${next}${pathname}`;
          }
        }
        
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

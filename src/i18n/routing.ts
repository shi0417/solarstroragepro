import { defineRouting } from "next-intl/routing";

export const locales = ["en", "zh", "es", "tr", "pt", "de", "fr", "th", "ar", "ja", "ko", "id", "uk"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = "en";

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Force locale prefix for ALL locales (including default)
  // This makes SEO and ad campaigns much easier
  localePrefix: "always",
});

export const LOCALE_COOKIE = "SSP_LOCALE";
export const LOCALE_HEADER = "x-ssp-locale";

// ── 全量语言列表（按展示顺序）───────────────────────────────
export type Locale =
  | "en" | "zh" | "es" | "tr" | "pt" | "de" | "fr"
  | "th" | "ar" | "ja" | "ko" | "id" | "uk";

/** 语言显示标签（用于切换器 UI） */
export const LOCALES: readonly { code: Locale; label: string; native: string }[] = [
  { code: "en", label: "EN",       native: "English" },
  { code: "zh", label: "中文",     native: "中文" },
  { code: "es", label: "ES",       native: "Español" },
  { code: "tr", label: "TR",       native: "Türkçe" },
  { code: "pt", label: "PT",       native: "Português" },
  { code: "de", label: "DE",       native: "Deutsch" },
  { code: "fr", label: "FR",       native: "Français" },
  { code: "th", label: "TH",       native: "ภาษาไทย" },
  { code: "ar", label: "AR",       native: "العربية" },
  { code: "ja", label: "日本語",   native: "日本語" },
  { code: "ko", label: "한국어",    native: "한국어" },
  { code: "id", label: "ID",       native: "Bahasa" },
  { code: "uk", label: "UK",       native: "Українська" },
];

export const LOCALE_CODES: readonly Locale[] = LOCALES.map((l) => l.code);

export function isLocale(v: string | undefined | null): v is Locale {
  return (LOCALE_CODES as readonly string[]).includes(v ?? "");
}

/** Vercel / Cloudflare / common reverse-proxy geo headers */
export function detectLocaleFromRequest(request: {
  cookies: { get: (name: string) => { value: string } | undefined };
  headers: Headers;
}): Locale {
  const country =
    request.headers.get("x-vercel-ip-country")?.toUpperCase() ||
    request.headers.get("cf-ipcountry")?.toUpperCase() ||
    request.headers.get("x-appengine-country")?.toUpperCase() ||
    "";

  if (country && country !== "XX" && country !== "T1") {
    // 国家→语言映射
    const map: Record<string, Locale> = {
      CN: "zh", TW: "zh", HK: "zh",
      ES: "es", MX: "es", AR: "es", CO: "es", PE: "es",
      TR: "tr",
      BR: "pt", PT: "pt",
      DE: "de", AT: "de",
      FR: "fr", BE: "fr", CH: "fr", CA: "fr",
      TH: "th",
      SA: "ar", AE: "ar", EG: "ar", QA: "ar", KW: "ar", OM: "ar",
      JA: "ja", JP: "ja",
      KO: "ko", KR: "ko",
      ID: "id",
      UA: "uk",
    };
    return map[country] || "en";
  }

  const accept = request.headers.get("accept-language") || "";
  if (/^zh\b|,\s*zh\b|;q=[0-9.]+,\s*zh\b/i.test(accept) || /zh-cn|zh-hans|zh-hant/i.test(accept)) {
    return "zh";
  }
  if (/^es\b/i.test(accept)) return "es";
  if (/^tr\b/i.test(accept)) return "tr";
  if (/^pt\b/i.test(accept)) return "pt";
  if (/^de\b/i.test(accept)) return "de";
  if (/^fr\b/i.test(accept)) return "fr";
  if (/^th\b/i.test(accept)) return "th";
  if (/^ar\b/i.test(accept)) return "ar";
  if (/^ja\b/i.test(accept)) return "ja";
  if (/^ko\b/i.test(accept)) return "ko";
  if (/^id\b/i.test(accept)) return "id";
  if (/^uk\b/i.test(accept)) return "uk";

  return "en";
}

export const LOCALE_COOKIE = "SSP_LOCALE";
export const LOCALE_HEADER = "x-ssp-locale";

export type Locale = "en" | "zh";

export function isLocale(v: string | undefined | null): v is Locale {
  return v === "en" || v === "zh";
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
    return country === "CN" ? "zh" : "en";
  }

  const accept = request.headers.get("accept-language") || "";
  if (/^zh\b|,\s*zh\b|;q=[0-9.]+,\s*zh\b/i.test(accept) || /zh-cn|zh-hans|zh-hant/i.test(accept)) {
    return "zh";
  }

  return "en";
}

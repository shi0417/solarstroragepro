import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Add locale prefix to an internal path. External URLs are returned as-is. */
export function localizeHref(locale: string, path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  if (path === "/") return `/${locale}`;
  if (path.startsWith("/#")) return `/${locale}${path}`;
  if (path.startsWith("/")) return `/${locale}${path}`;
  return path;
}

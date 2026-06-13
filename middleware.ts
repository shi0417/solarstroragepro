import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "zh", "es", "tr", "pt", "de", "fr"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. 根路径 "/" → 重定向到 "/en"
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.redirect(url);
  }

  // 2. 检查是否已有语言前缀
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (!hasLocale) {
    // 没有语言前缀 → 加到路径前面，默认 en
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

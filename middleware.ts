import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "zh", "es", "tr", "pt", "de", "fr"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 跳过 API 路由、Next.js 内部路径、静态文件
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 根路径 "/" → 重定向到 "/en"
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.redirect(url);
  }

  // 检查是否已有语言前缀
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (!hasLocale) {
    // 没有语言前缀 → 加默认 en 前缀
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

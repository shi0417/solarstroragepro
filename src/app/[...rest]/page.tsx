import { redirect } from "next/navigation";

const LOCALES = ["en", "zh", "es", "tr", "pt", "de", "fr", "th", "ar", "ja", "ko", "id"];

type Params = Promise<{ rest: string[] }>;

/**
 * Catch-all route: 将无语言前缀的 URL 重定向到 /en/... 前缀版本
 * 例如: /products/energy-storage-system → /en/products/energy-storage-system
 */
export default async function CatchAllPage({ params }: { params: Params }) {
  const { rest } = await params;

  // 如果第一段已是有效 locale，直接放行（通常已由 [locale] 路由处理）
  if (LOCALES.includes(rest[0])) {
    redirect(`/${rest.join("/")}`);
  }

  redirect(`/en/${rest.join("/")}`);
}

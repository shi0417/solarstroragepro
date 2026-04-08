export type SupabaseEnv = {
  url: string;
  publishableKey: string;
};

/**
 * 统一的 Supabase 环境变量读取。
 *
 * - 在本地开发/部署环境变量缺失时，返回 null（不让应用在构建/启动阶段直接崩溃）
 * - 由调用方决定降级策略（跳过 Supabase、返回 503 等）
 */
export function getSupabaseEnv(): SupabaseEnv | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) return null;
  return { url, publishableKey };
}


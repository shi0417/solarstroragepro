import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseEnv } from "./env";

export function createClient() {
  const env = getSupabaseEnv();
  if (!env) {
    if (typeof window !== "undefined") {
      console.error(
        "[Supabase] Missing env: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"
      );
    }
    return null;
  }

  return createBrowserClient(env.url, env.publishableKey);
}

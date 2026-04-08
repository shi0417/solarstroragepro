import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

import { getSupabaseEnv } from "./env";

export async function createClient() {
  const cookieStore = await cookies();

  const env = getSupabaseEnv();
  if (!env) return null;

  return createServerClient(
    env.url,
    env.publishableKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: { name: string; value: string; options: CookieOptions }[]
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component; middleware can refresh sessions.
          }
        },
      },
    }
  );
}

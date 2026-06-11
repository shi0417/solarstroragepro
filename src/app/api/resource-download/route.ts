import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getSupabaseEnv } from "@/lib/supabase/env";

type DownloadBody = {
  email: string;
  name?: string;
  company?: string;
  resourceSlug: string;
  resourceName: string;
};

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const b = body as Record<string, unknown>;

  if (!b.email || typeof b.email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test((b.email as string).trim())) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }
  if (!b.resourceSlug || typeof b.resourceSlug !== "string") {
    return NextResponse.json({ error: "Resource slug is required" }, { status: 400 });
  }

  const data: DownloadBody = {
    email: (b.email as string).trim(),
    name: typeof b.name === "string" ? b.name.trim() : "",
    company: typeof b.company === "string" ? b.company.trim() : "",
    resourceSlug: (b.resourceSlug as string).trim(),
    resourceName: typeof b.resourceName === "string" ? b.resourceName.trim() : "",
  };

  const env = getSupabaseEnv();
  if (!env) {
    console.log("[Resource Download] Supabase not configured. Submission:", JSON.stringify(data, null, 2));
    return NextResponse.json({
      success: true,
      note: "Supabase not configured — submission logged to server console.",
    });
  }

  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(env.url, env.publishableKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: { name: string; value: string; options: CookieOptions }[],
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            /* Server Component boundary */
          }
        },
      },
    });

    const { error: dbError } = await supabase.from("resource_downloads").insert([
      {
        email: data.email,
        name: data.name || null,
        company: data.company || null,
        resource_slug: data.resourceSlug,
        resource_name: data.resourceName || null,
        source: "website",
        locale: request.headers.get("x-locale") || "en",
      },
    ]);

    if (dbError) {
      console.error("[Resource Download] Supabase insert error:", dbError.message);
      return NextResponse.json(
        { error: "Failed to save submission. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Resource Download] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

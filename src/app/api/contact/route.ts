import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getSupabaseEnv } from "@/lib/supabase/env";

type ContactBody = {
  name: string;
  company: string;
  email: string;
  projectType?: string;
  message?: string;
};

function validateBody(body: unknown): { valid: boolean; error?: string; data?: ContactBody } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const b = body as Record<string, unknown>;

  if (!b.name || typeof b.name !== "string" || b.name.trim().length < 1) {
    return { valid: false, error: "Name is required" };
  }
  if (!b.company || typeof b.company !== "string" || b.company.trim().length < 1) {
    return { valid: false, error: "Company name is required" };
  }
  if (!b.email || typeof b.email !== "string") {
    return { valid: false, error: "Email is required" };
  }
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(b.email.trim())) {
    return { valid: false, error: "Invalid email format" };
  }

  return {
    valid: true,
    data: {
      name: b.name.trim(),
      company: b.company.trim(),
      email: b.email.trim(),
      projectType: typeof b.projectType === "string" ? b.projectType.trim() : "",
      message: typeof b.message === "string" ? b.message.trim() : "",
    },
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { valid, error, data } = validateBody(body);
  if (!valid || !data) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const env = getSupabaseEnv();
  if (!env) {
    // Fallback: log to console and return success (graceful degradation)
    console.log("[Contact Form] Supabase not configured. Submission:", JSON.stringify(data, null, 2));
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

    const { error: dbError } = await supabase.from("contact_submissions").insert([
      {
        name: data.name,
        company: data.company,
        email: data.email,
        project_type: data.projectType || null,
        message: data.message || null,
        source: "website",
        locale: request.headers.get("x-locale") || "en",
      },
    ]);

    if (dbError) {
      console.error("[Contact Form] Supabase insert error:", dbError.message);
      return NextResponse.json(
        { error: "Failed to save submission. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact Form] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

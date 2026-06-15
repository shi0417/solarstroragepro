import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Resend } from "resend";

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

    // Send email notification — must AWAIT in serverless (fire-and-forget gets killed by Vercel)
    const locale = request.headers.get("x-locale") || "en";
    try {
      await notifySalesTeam(data, locale);
    } catch {
      // Email failure is non-blocking: form was still saved to Supabase
      console.warn("[Contact Form] Email notification failed (form saved OK)");
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

/**
 * Send email notification to the sales team when a new form submission arrives.
 * Uses Resend (https://resend.com) — configure RESEND_API_KEY in .env.local.
 * Non-blocking: fires in the background, failures are logged but don't affect the user.
 */
async function notifySalesTeam(data: ContactBody, locale: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY not set");
  }

  const resend = new Resend(apiKey);
  const localeLabel = locale.toUpperCase();

  console.log(`[Contact Form] Sending email notification for ${data.name} <${data.email}>`);

  const { data: emailData, error } = await resend.emails.send({
      from: "SolarStoragePro <noreply@solarstoragepro.com>",
      to: ["sales@solarstoragepro.com"],
      subject: `[新询盘] ${data.name} — ${data.company} (${localeLabel})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b;">新客户询盘通知</h2>
          <p>收到一条来自网站的新潜在客户提交：</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">姓名</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${data.name}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">公司</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${data.company}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">邮箱</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">语言</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${localeLabel}</td></tr>
            ${data.projectType ? `<tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">项目类型</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${data.projectType}</td></tr>` : ""}
            ${data.message ? `<tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">消息</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${data.message}</td></tr>` : ""}
          </table>
          <p style="color: #6b7280; font-size: 14px;">此邮件由 SolarStoragePro 网站自动发送。</p>
        </div>
      `,
    });

  if (error) {
    console.error("[Contact Form] Resend API error:", JSON.stringify(error));
    throw new Error(error.message || "Resend API error");
  }

  console.log(`[Contact Form] ✅ Email sent! ID: ${emailData?.id}`);
}

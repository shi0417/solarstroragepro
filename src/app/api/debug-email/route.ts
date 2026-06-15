import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * 🔍 Diagnostic endpoint: test the email sending pipeline end-to-end.
 *
 * GET /api/debug-email — check RESEND_API_KEY presence, send a test email,
 *   and return the full Resend API response (including errors).
 *
 * This endpoint is read-only in production intent — it's just for diagnostics.
 * Remove after confirming email delivery works.
 */
export async function GET() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        status: "error",
        step: "env_var_check",
        message: "RESEND_API_KEY 未设置！请在 Vercel 环境变量中添加 RESEND_API_KEY。",
        help: "Vercel Dashboard → Settings → Environment Variables → 添加 Key: RESEND_API_KEY",
      },
      { status: 500 },
    );
  }

  // Mask the key for logging
  const maskedKey = apiKey.slice(0, 4) + "***" + apiKey.slice(-4);

  try {
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: "SolarStoragePro <noreply@solarstoragepro.com>",
      to: ["sales@solarstoragepro.com"],
      subject: "[调试] SolarStoragePro 邮件系统测试",
      html: `<p>这是一封来自 SolarStoragePro 的调试邮件。</p><p>时间：${new Date().toISOString()}</p><p>如果你收到这封邮件，说明邮件系统工作正常。</p>`,
    });

    if (error) {
      return NextResponse.json(
        {
          status: "error",
          step: "resend_api_call",
          api_key_masked: maskedKey,
          resend_error: error,
          message: "Resend API 返回错误（API Key 有效但发送失败）",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      status: "success",
      step: "completed",
      api_key_masked: maskedKey,
      email_id: data?.id,
      message: "✅ 邮件发送成功！请检查 sales@solarstoragepro.com 的收件箱和垃圾邮件箱。",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : undefined;

    return NextResponse.json(
      {
        status: "error",
        step: "exception",
        api_key_masked: maskedKey,
        error_message: message,
        error_stack: stack?.split("\n").slice(0, 3),
        message: "发送过程中抛出异常",
      },
      { status: 500 },
    );
  }
}

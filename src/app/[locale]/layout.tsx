import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { loadMessages } from "@/lib/load-messages";
import ClientLayout from "./ClientLayout";

const LOCALES = ["en", "zh", "es", "tr", "pt", "de", "fr", "th", "ar", "ja", "ko", "id"];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 无效 locale → 重定向到 /en/{path}
  if (!LOCALES.includes(locale)) {
    redirect(`/en/${locale}`);
  }

  const messages = loadMessages(locale);

  return (
    <ClientLayout locale={locale} messages={messages}>
      {children}
    </ClientLayout>
  );
}

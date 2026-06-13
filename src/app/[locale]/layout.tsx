import type { ReactNode } from "react";
import { loadMessages } from "@/lib/load-messages";
import ClientLayout from "./ClientLayout";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = loadMessages(locale);

  return (
    <ClientLayout locale={locale} messages={messages}>
      {children}
    </ClientLayout>
  );
}

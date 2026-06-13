"use client";

import type { ReactNode } from "react";
import { LocaleProvider } from "@/components/site/LocaleProvider";
import { MetaPixel } from "@/components/site/MetaPixel";
import { MetaPixelEvents } from "@/components/site/MetaPixelEvents";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { StickySiteTools } from "@/components/site/StickySiteTools";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Messages = Record<string, any>;

export default function ClientLayout({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: string;
  messages: Messages;
}) {
  return (
    <LocaleProvider locale={locale} messages={messages}>
      <MetaPixel />
      <MetaPixelEvents />
      {children}
      <WhatsAppFloat />
      <StickySiteTools />
    </LocaleProvider>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";

import { LocaleProvider } from "@/components/site/LocaleProvider";
import { StickySiteTools } from "@/components/site/StickySiteTools";
import { MetaPixel } from "@/components/site/MetaPixel";
import { MetaPixelEvents } from "@/components/site/MetaPixelEvents";
import { getMessages } from "@/lib/i18n/messages";
import { isLocale, LOCALE_HEADER, type Locale } from "@/lib/locale";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

async function resolveLocale(): Promise<Locale> {
  const h = await headers();
  const raw = h.get(LOCALE_HEADER);
  return isLocale(raw) ? raw : "en";
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale();
  const m = getMessages(locale);
  return {
    title: m.meta.title,
    description: m.meta.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await resolveLocale();

  return (
    <html lang={locale === "zh" ? "zh-CN" : "en"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {/* Google Ads Global Site Tag - AW-18235093488 */}
        <Script
          strategy="beforeInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18235093488"
        />
        <Script id="google-ads-gtag-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18235093488');
          `}
        </Script>
        {/* Google Ads Conversion Tracking — unified handler for form, WhatsApp, Email */}
        <Script id="google-ads-conversion" strategy="beforeInteractive">
          {`
            function gtag_report_conversion(event_label) {
              var label = typeof event_label === 'string' ? event_label : 'form_submit';
              var value = label === 'form_submit' ? 5.0 : 2.0;
              gtag('event', 'conversion', {
                  'send_to': 'AW-18235093488/jw1ICOmCj74cEPDjlfdD',
                  'value': value,
                  'currency': 'HKD',
                  'event_label': label
              });
              return false;
            }
          `}
        </Script>
        <MetaPixel />
        <MetaPixelEvents />
        <LocaleProvider initialLocale={locale}>
          {children}
          <StickySiteTools />
        </LocaleProvider>
      </body>
    </html>
  );
}

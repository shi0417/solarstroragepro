import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SolarStoragePro - Battery Energy Storage Solutions",
  description:
    "Industrial & commercial battery energy storage systems. Reliable, safe, locally supported.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Google Ads Global Site Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18235093488"
          strategy="beforeInteractive"
        />
        <Script id="gtag-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18235093488');
          `}
        </Script>
        {/* Google Ads Conversion */}
        <Script id="gtag-conversion" strategy="beforeInteractive">
          {`
            window.gtag_report_conversion = function(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                'send_to': 'AW-18235093488/jw1ICOmCj74cEPDjlfdD',
                'event_callback': callback
              });
              return false;
            }
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

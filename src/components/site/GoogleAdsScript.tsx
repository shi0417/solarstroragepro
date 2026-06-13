"use client";

import Script from "next/script";

export function GoogleAdsScript() {
  return (
    <>
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
      {/* Google Ads Conversion Tracking */}
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
    </>
  );
}

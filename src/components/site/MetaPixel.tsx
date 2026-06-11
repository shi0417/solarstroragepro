"use client";

import Script from "next/script";
import { useEffect, useCallback } from "react";

/**
 * Meta Pixel loader for SolarStoragePRO.
 *
 * Usage:
 *  1. Add NEXT_PUBLIC_META_PIXEL_ID=123456789 to .env.local
 *  2. <MetaPixel /> in layout.tsx (root <body>)
 *
 * Events are exposed globally via `window.fbTrack(event, params?)`.
 * Call it from any component: `window.fbTrack("ViewContent", { ... })`
 */
export function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  /* ── global event helper ── */
  useEffect(() => {
    if (!pixelId) return;

    (window as unknown as Record<string, unknown>).__fbq = (
      window as unknown as Record<string, unknown>
    ).fbq;

    // Expose fbTrack on window so any component can fire events
    (window as unknown as Record<string, (event: string, params?: Record<string, unknown>) => void>).fbTrack = (
      event: string,
      params?: Record<string, unknown>,
    ) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      if (typeof w.fbq === "function") {
        w.fbq("track", event, params);
      }
    };

    // PageView is auto-fired by the base pixel script
  }, [pixelId]);

  if (!pixelId) return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}

/* ── React hook version for components ── */
export function useMetaPixel() {
  const track = useCallback(
    (event: string, params?: Record<string, unknown>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      if (typeof w.fbq === "function") {
        w.fbq("track", event, params);
      }
    },
    [],
  );

  return { track };
}

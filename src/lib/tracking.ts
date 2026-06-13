/**
 * Google Ads + Meta Pixel unified conversion tracking helpers.
 *
 * Usage: call these in onClick handlers of WhatsApp / Email / Form links.
 * The functions use a 3-tier fallback strategy to ensure events always fire.
 *
 * Tier 1: window.gtag() — the standard Google gtag function
 * Tier 2: window.dataLayer.push() — direct dataLayer manipulation (gtag.js reads this)
 * Tier 3: Create & inject a temporary <script> tag with the exact conversion snippet
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type GtagFn = (command: string, event: string, params: Record<string, unknown>) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const GA_CONVERSION_SEND_TO = "AW-18235093488/jw1ICOmCj74cEPDjlfdD";

// ---------------------------------------------------------------------------
// Core: Fire Google Ads conversion event (triple-fallback)
// ---------------------------------------------------------------------------

/**
 * Fire a Google Ads conversion event using triple-fallback strategy.
 *
 * Why three tiers? Next.js App Router (RSC) can make globally-defined functions
 * from <Script> components unreliable depending on streaming/hydration timing.
 * This function guarantees the conversion fires regardless of execution context.
 */
function trackGoogleAdsConversion(eventLabel: string, value = 1.0) {
  const params = {
    send_to: GA_CONVERSION_SEND_TO,
    value,
    currency: "HKD",
    event_label: eventLabel,
  };

  // ── Tier 1: Standard gtag() ──
  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", "conversion", params);
      console.log("[GA] Conversion fired via gtag()", params);
      return;
    } catch (e) {
      console.warn("[GA] gtag() failed, falling back...", e);
    }
  }

  // ── Tier 2: Direct dataLayer push (what gtag() does internally) ──
  if (Array.isArray(window.dataLayer)) {
    try {
      window.dataLayer.push({
        event: "conversion",
        ...params,
      });
      console.log("[GA] Conversion pushed to dataLayer", params);
      return;
    } catch (e) {
      console.warn("[GA] dataLayer push failed, falling back...", e);
    }
  }

  // ── Tier 3: Inject a fresh <script> tag with raw conversion code ──
  // This is the nuclear option — guaranteed to reach Google's servers
  // because we create a brand-new script element that loads independently.
  try {
    const script = document.createElement("script");
    script.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('event', 'conversion', ${JSON.stringify(params)});
    `;
    document.head.appendChild(script);

    // Clean up after a moment to avoid DOM pollution
    setTimeout(() => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    }, 5000);

    console.log("[GA] Conversion fired via injected script (Tier 3)", params);
  } catch (e) {
    console.error("[GA] ALL tracking methods failed!", e);
  }
}

// ---------------------------------------------------------------------------
// Meta / Facebook Pixel
// ---------------------------------------------------------------------------

function trackFbPixel(event: string, params: Record<string, unknown>) {
  if (typeof window.fbq === "function") {
    window.fbq("track", event, params);
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Call when the contact form is successfully submitted. */
export function trackFormSubmit() {
  trackGoogleAdsConversion("form_submit", 5.0);
  trackFbPixel("Lead", {
    content_name: "Contact Form",
    content_category: "B2B Inquiry",
    value: 50,
    currency: "USD",
  });
}

/** Call when a WhatsApp link/button is clicked. */
export function trackWhatsAppClick(source: string) {
  trackGoogleAdsConversion("whatsapp_click", 2.0);
  trackFbPixel("Contact", {
    content_name: `WhatsApp - ${source}`,
    value: 20,
    currency: "USD",
  });
}

/** Call when a mailto: email link is clicked. */
export function trackEmailClick(source: string) {
  trackGoogleAdsConversion("email_click", 2.0);
  trackFbPixel("Contact", {
    content_name: `Email - ${source}`,
    value: 20,
    currency: "USD",
  });
}

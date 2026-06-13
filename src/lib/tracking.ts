/**
 * Google Ads + Meta Pixel unified conversion tracking helpers.
 *
 * Usage: call these in onClick handlers of WhatsApp / Email / Form links.
 * The functions guard against missing globals so they are safe to call
 * before third-party scripts have loaded.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type GtagFn = (command: string, event: string, params: Record<string, unknown>) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    gtag_report_conversion?: (eventLabel?: string) => boolean;
    fbq?: (...args: unknown[]) => void;
  }
}

// ---------------------------------------------------------------------------
// Google Ads conversion label (form submit)
// ---------------------------------------------------------------------------

const GA_CONVERSION_SEND_TO = "AW-18235093488/jw1ICOmCj74cEPDjlfdD";

// ---------------------------------------------------------------------------
// Google Ads
// ---------------------------------------------------------------------------

/**
 * Fire a Google Ads conversion event.
 *
 * @param eventLabel - Human-readable label to distinguish event type in reports.
 *                     Examples: "form_submit", "whatsapp_click", "email_click"
 * @param value       - Monetary value in the configured currency (HKD).
 */
function trackGoogleAdsConversion(eventLabel: string, value = 1.0) {
  const w = window;

  // Prefer the dedicated function added via layout Script
  if (typeof w.gtag_report_conversion === "function") {
    w.gtag_report_conversion(eventLabel);
    return;
  }

  // Fallback: fire directly via gtag if available
  if (typeof w.gtag === "function") {
    w.gtag("event", "conversion", {
      send_to: GA_CONVERSION_SEND_TO,
      value,
      currency: "HKD",
      event_label: eventLabel,
    });
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

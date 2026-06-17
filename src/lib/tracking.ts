/**
 * Conversion tracking helpers — dataLayer + Meta Pixel.
 *
 * All Google-related tracking now pushes custom events to window.dataLayer,
 * which Google Tag Manager (GTM-MKHQ69MQ) listens for and fires the actual
 * Google Ads / GA conversion tags.
 *
 * Meta (Facebook) Pixel calls remain direct since they are not GTM-managed.
 *
 * GTM custom events (configure in GTM dashboard):
 *   - ssp_form_submit     → trigger: Google Ads conversion (AW-18235093488)
 *   - ssp_whatsapp_click  → trigger: Google Ads conversion (lower value)
 *   - ssp_email_click     → trigger: Google Ads conversion (lower value)
 *   - ssp_thank_you_view  → trigger: Google Ads conversion (thank-you page)
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Push a custom event to GTM dataLayer. */
function pushToDataLayer(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  console.log(`[GTM] dataLayer push: ${event}`, params);
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

/** Call when the contact form is successfully submitted (before redirect). */
export function trackFormSubmit() {
  pushToDataLayer("ssp_form_submit", { value: 5.0, currency: "HKD" });
  trackFbPixel("Lead", {
    content_name: "Contact Form",
    content_category: "B2B Inquiry",
    value: 50,
    currency: "USD",
  });
}

/** Call when the thank-you page loads (GTM fires conversion here). */
export function trackThankYouView() {
  pushToDataLayer("ssp_thank_you_view", { value: 5.0, currency: "HKD" });
  trackFbPixel("Lead", {
    content_name: "Contact Form - Thank You Page",
    content_category: "B2B Inquiry",
    value: 50,
    currency: "USD",
  });
}

/** Call when a WhatsApp link/button is clicked. */
export function trackWhatsAppClick(source: string) {
  pushToDataLayer("ssp_whatsapp_click", { source, value: 2.0, currency: "HKD" });
  trackFbPixel("Contact", {
    content_name: `WhatsApp - ${source}`,
    value: 20,
    currency: "USD",
  });
}

/** Call when a mailto: email link is clicked. */
export function trackEmailClick(source: string) {
  pushToDataLayer("ssp_email_click", { source, value: 2.0, currency: "HKD" });
  trackFbPixel("Contact", {
    content_name: `Email - ${source}`,
    value: 20,
    currency: "USD",
  });
}
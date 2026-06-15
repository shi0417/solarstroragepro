/**
 * Enhanced Conversions — Google Ads first-party data matching.
 *
 * Per Google's requirements:
 * - Data must be SHA-256 hashed, lowercased, and trimmed before hashing.
 * - Pass hashed values in gtag('event','conversion',{...}) via email / first_name / last_name.
 * - sessionStorage is used to bridge ContactForm → thank-you page (two separate routes).
 *
 * Ref: https://support.google.com/google-ads/answer/9888656
 */

const SESSION_KEY = "ssp_ec";

export interface EnhancedData {
  /** SHA-256 hex of lowercased+trimmed email */
  email_hashed: string;
  /** SHA-256 hex of lowercased+trimmed first name */
  first_name_hashed?: string;
  /** SHA-256 hex of lowercased+trimmed last name */
  last_name_hashed?: string;
}

/**
 * Hash a string with SHA-256 (Web Crypto API).
 * Input is lowercased and trimmed before hashing per Google's spec.
 */
async function sha256Hex(input: string): Promise<string> {
  const normalized = input.trim().toLowerCase();
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Split a full name into first/last name (best-effort).
 * e.g. "John Smith" → { first: "john", last: "smith" }
 */
function splitName(fullName: string): { first: string; last: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { first: parts[0], last: parts[0] };
  return { first: parts[0], last: parts[parts.length - 1] };
}

/**
 * Hash user data and store in sessionStorage for the thank-you page to consume.
 * Call this BEFORE router.push("/thank-you").
 */
export async function storeEnhancedData(email: string, fullName: string): Promise<void> {
  try {
    const { first, last } = splitName(fullName);
    const [email_hashed, first_name_hashed, last_name_hashed] = await Promise.all([
      sha256Hex(email),
      sha256Hex(first),
      sha256Hex(last),
    ]);

    const data: EnhancedData = { email_hashed, first_name_hashed, last_name_hashed };

    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
    }
  } catch (e) {
    // Non-critical — silently degrade if crypto API is unavailable
    console.warn("[EC] Failed to store enhanced conversion data:", e);
  }
}

/**
 * Read enhanced conversion data from sessionStorage and remove it.
 * Call this in the thank-you page useEffect.
 * Returns null if no data is available.
 */
export function getEnhancedData(): EnhancedData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    // Read once, then clear
    sessionStorage.removeItem(SESSION_KEY);
    return JSON.parse(raw) as EnhancedData;
  } catch {
    return null;
  }
}

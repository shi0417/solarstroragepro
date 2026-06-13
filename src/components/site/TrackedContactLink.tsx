"use client";

import type { ReactNode, AnchorHTMLAttributes } from "react";
import { trackEmailClick, trackWhatsAppClick } from "@/lib/tracking";

type ContactType = "email" | "whatsapp";

type TrackedContactLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Which contact channel to track. */
  type: ContactType;
  /** Human-readable label for the source (e.g. "Header", "Footer"). */
  source: string;
  children: ReactNode;
};

/**
 * Drop-in replacement for `<a>` that fires Google Ads + Meta Pixel
 * conversion events before navigating.
 */
export function TrackedContactLink({
  type,
  source,
  children,
  onClick,
  ...rest
}: TrackedContactLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (type === "email") {
      trackEmailClick(source);
    } else {
      trackWhatsAppClick(source);
    }
    // Preserve any existing onClick handler
    onClick?.(e);
  };

  return (
    <a {...rest} onClick={handleClick}>
      {children}
    </a>
  );
}

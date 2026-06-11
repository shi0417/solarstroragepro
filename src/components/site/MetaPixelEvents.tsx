"use client";

import { useEffect, useRef } from "react";

/**
 * Automatically tracks deep engagement events for Meta Pixel.
 *
 * Events fired:
 *  - ViewContent (deep read)  — fires when user scrolls past 50%
 *  - ViewContent (long stay)  — fires after 30s on the page
 *
 * Add <MetaPixelEvents /> once inside layout.tsx <body>.
 * Duplicate events are suppressed per-page-session.
 */
export function MetaPixelEvents() {
  const deepReadFired = useRef(false);
  const longStayFired = useRef(false);

  useEffect(() => {
    // Deep read: scroll > 50%
    const onScroll = () => {
      if (deepReadFired.current) return;
      const scrolled =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrolled >= 0.5) {
        deepReadFired.current = true;
        fire("ViewContent", {
          content_name: "Deep Read",
          content_category: "engagement",
          value: 5,
          currency: "USD",
        });
      }
    };

    // Long stay: 30 seconds
    const timer = setTimeout(() => {
      longStayFired.current = true;
      fire("ViewContent", {
        content_name: "Long Stay",
        content_category: "engagement",
        value: 3,
        currency: "USD",
      });
    }, 30_000);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  return null;
}

function fire(event: string, params: Record<string, unknown>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (typeof w.fbq === "function") {
    w.fbq("track", event, params);
  }
}

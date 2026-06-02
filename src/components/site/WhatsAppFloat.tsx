"use client";

import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site-config";

/**
 * Fixed WhatsApp floating button — right-bottom corner.
 * Uses pulse ring animation to draw attention without being intrusive.
 */
export function WhatsAppFloat() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Pulse ring */}
      <span className="absolute inset-0 flex h-14 w-14 items-center justify-center">
        <span className="absolute h-full w-full rounded-full bg-emerald-500/30 animate-pulse-ring" />
      </span>

      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:bg-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/40 hover:scale-110 active:scale-95"
      >
        <MessageCircle className="h-6 w-6" aria-hidden />
      </a>
    </div>
  );
}

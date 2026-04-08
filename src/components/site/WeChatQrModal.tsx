"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { useLocaleContext } from "./LocaleProvider";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function WeChatQrModal({ open, onClose }: Props) {
  const { messages } = useLocaleContext();
  const w = messages.wechat;
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    if (open) setImgFailed(false);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wechat-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl border border-[var(--border)] bg-slate-950 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-3 top-3 rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
          aria-label="Close"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
        <h2 id="wechat-modal-title" className="pr-10 text-lg font-semibold text-white">
          {w.title}
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          {w.hint}{" "}
          <span className="font-mono text-solar-400">public/wechat-qr.png</span>
        </p>
        <div className="relative mx-auto mt-6 flex h-56 w-56 items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-slate-900">
          {!imgFailed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/wechat-qr.png"
              alt="WeChat QR code"
              className="h-full w-full object-contain"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div className="px-4 text-center text-xs leading-relaxed text-slate-500">{w.missing}</div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bot,
  Headphones,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  X,
} from "lucide-react";

import { siteContact, skypeChatUrl, whatsappUrl } from "@/lib/site-config";

import { useLocaleContext } from "./LocaleProvider";
import { WeChatQrModal } from "./WeChatQrModal";

const btnClass =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-l-xl border border-slate-200 bg-white text-slate-600 shadow-lg shadow-slate-200/60 backdrop-blur-md transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 md:h-11 md:w-11";

export function StickySiteTools() {
  const { locale, messages: siteMessages } = useLocaleContext();
  const s = siteMessages.sticky;
  const [wechatOpen, setWechatOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setWechatOpen(false);
      setChatOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <>
      <aside
        className="fixed right-0 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-2 max-md:bottom-[max(0.75rem,env(safe-area-inset-bottom))] max-md:right-2 max-md:top-auto max-md:translate-y-0 max-md:flex-row max-md:flex-nowrap max-md:gap-2 max-md:overflow-x-auto max-md:pb-1 max-md:pt-1"
        aria-label={s.quickContact}
      >
        <a
          href={skypeChatUrl()}
          className={`${btnClass} max-md:rounded-xl max-md:rounded-l-xl`}
          title="Skype"
          aria-label="Skype"
        >
          <Headphones className="h-5 w-5" aria-hidden />
        </a>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnClass} text-emerald-600 hover:!text-emerald-500 hover:!border-emerald-300 hover:!bg-emerald-50 max-md:rounded-xl`}
          title="WhatsApp"
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
        </a>
        <a
          href={`mailto:${siteContact.email}`}
          className={`${btnClass} max-md:rounded-xl`}
          title="Email"
          aria-label="Email"
        >
          <Mail className="h-5 w-5" aria-hidden />
        </a>
        <a
          href={`tel:${siteContact.phoneTel}`}
          className={`${btnClass} max-md:rounded-xl`}
          title="Phone"
          aria-label="Phone"
        >
          <Phone className="h-5 w-5" aria-hidden />
        </a>
        <button
          type="button"
          className={`${btnClass} max-md:rounded-xl`}
          title="WeChat"
          aria-label="WeChat"
          onClick={() => setWechatOpen(true)}
        >
          <MessageSquare className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          className={`${btnClass} border-brand-200 text-brand-600 hover:!border-brand-400 hover:!text-brand-700 hover:!bg-brand-100 max-md:rounded-xl max-md:rounded-r-xl max-md:rounded-l-xl`}
          title="AI Chat"
          aria-label="AI Chat"
          onClick={() => setChatOpen((v) => !v)}
        >
          <Bot className="h-5 w-5" aria-hidden />
        </button>
      </aside>

      <WeChatQrModal open={wechatOpen} onClose={() => setWechatOpen(false)} />

      {chatOpen ? (
        <div
          className="fixed bottom-0 left-0 right-0 z-[60] flex max-h-[min(92vh,560px)] flex-col rounded-t-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/40 backdrop-blur-md md:bottom-6 md:left-auto md:right-[4.25rem] md:max-h-[520px] md:w-[min(100vw-2rem,400px)] md:rounded-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-chat-title"
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <h2 id="ai-chat-title" className="text-sm font-semibold text-slate-900">
              {s.aiTitle}
            </h2>
            <button
              type="button"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label={s.aiClose}
              onClick={() => setChatOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <AiChatPanel key={locale} onClose={() => setChatOpen(false)} />
        </div>
      ) : null}
    </>
  );
}

function AiChatPanel({ onClose }: { onClose: () => void }) {
  const { messages: siteMessages } = useLocaleContext();
  const s = siteMessages.sticky;
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "assistant"; text: string }[]>(
    () => [{ role: "assistant", text: s.aiWelcome }]
  );
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [chatMessages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setChatMessages((m) => [...m, { role: "user", text }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      const reply = data.reply ?? data.error ?? s.aiFallback;
      setChatMessages((m) => [...m, { role: "assistant", text: reply }]);
    } catch {
      setChatMessages((m) => [...m, { role: "assistant", text: s.aiNetworkError }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        ref={listRef}
        className="flex flex-1 flex-col gap-3 overflow-y-auto bg-slate-50 px-4 py-3 text-sm"
      >
        {chatMessages.map((msg, i) => (
          <div
            key={i}
            className={
              msg.role === "user"
                ? "ml-8 rounded-xl bg-brand-600 px-3 py-2 text-white"
                : "mr-4 rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700"
            }
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="mr-4 text-xs text-slate-400">{s.aiThinking}</div>}
      </div>
      <form
        className="flex gap-2 border-t border-slate-200 bg-white p-3"
        onSubmit={(e) => {
          e.preventDefault();
          void send();
        }}
      >
        <input
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-400 focus:outline-none"
          placeholder={s.aiPlaceholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Message"
        />
        <button
          type="submit"
          disabled={loading}
          className="shrink-0 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-50"
        >
          {s.aiSend}
        </button>
      </form>
      <button
        type="button"
        className="border-t border-slate-200 bg-white py-2 text-center text-xs text-slate-400 hover:text-slate-600 md:hidden"
        onClick={onClose}
      >
        {s.aiCloseMobile}
      </button>
    </>
  );
}

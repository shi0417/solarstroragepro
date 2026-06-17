"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Send, Loader2 } from "lucide-react";

import { useLocaleContext } from "./LocaleProvider";

type FormData = {
  name: string;
  company: string;
  email: string;
  projectType: string;
  message: string;
};

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const { messages, localizePath } = useLocaleContext();
  const cf = messages.contactForm;

  const [form, setForm] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed");
      }

      setForm({ name: "", company: "", email: "", projectType: "", message: "" });
      // Redirect to thank-you page — GTM fires conversion via dataLayer event
      router.push(localizePath("/thank-you"));
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
    }
  }

  const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5";
  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-4" : "space-y-5"}>
      <div className={compact ? "space-y-4" : "grid gap-5 sm:grid-cols-2"}>
        {/* Name */}
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            {cf.nameLabel} <span className="text-red-500">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder={cf.namePlaceholder}
            className={inputClass}
          />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="cf-company" className={labelClass}>
            {cf.companyLabel} <span className="text-red-500">*</span>
          </label>
          <input
            id="cf-company"
            name="company"
            type="text"
            required
            value={form.company}
            onChange={handleChange}
            placeholder={cf.companyPlaceholder}
            className={inputClass}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="cf-email" className={labelClass}>
            {cf.emailLabel} <span className="text-red-500">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder={cf.emailPlaceholder}
            className={inputClass}
          />
        </div>

        {/* Project Type */}
        <div>
          <label htmlFor="cf-project" className={labelClass}>
            {cf.projectTypeLabel}
          </label>
          <select
            id="cf-project"
            name="projectType"
            value={form.projectType}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">
              {cf.projectTypePlaceholder}
            </option>
            {(cf.projectOptions as string[]).map((opt: string) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="cf-message" className={labelClass}>
          {cf.messageLabel}
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={compact ? 3 : 4}
          value={form.message}
          onChange={handleChange}
          placeholder={cf.messagePlaceholder}
          className={inputClass + " resize-none"}
        />
      </div>

      {/* Error message */}
      {status === "error" && (
        <p className="text-sm text-red-600">
          {cf.errorPrefix}
          {errorMsg}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            {cf.submittingText}
          </>
        ) : (
          <>
            <Send className="h-5 w-5" aria-hidden />
            {cf.submitText}
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-400">
        {cf.privacyNote}
      </p>
    </form>
  );
}

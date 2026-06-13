"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

import { useLocaleContext } from "./LocaleProvider";

type FormData = {
  name: string;
  company: string;
  email: string;
  projectType: string;
  message: string;
};

const PROJECT_OPTIONS_EN = [
  "Grid Frequency Regulation",
  "Peak Shaving",
  "Renewable Integration",
  "Data Center Storage",
  "Industrial & Commercial",
  "Residential ESS",
  "Other",
];

const PROJECT_OPTIONS_ZH = [
  "电网调频",
  "削峰填谷",
  "新能源消纳",
  "数据中心储能",
  "工商业储能",
  "户用储能",
  "其他",
];

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const { locale } = useLocaleContext();
  const isZh = locale === "zh";

  const [form, setForm] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const projectOptions = isZh ? PROJECT_OPTIONS_ZH : PROJECT_OPTIONS_EN;

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

      setStatus("success");
      setForm({ name: "", company: "", email: "", projectType: "", message: "" });

      // Track with Google Ads conversion
      const gw = window as unknown as {
        gtag_report_conversion?: (url?: string) => boolean;
      };
      if (typeof gw.gtag_report_conversion === "function") {
        gw.gtag_report_conversion();
      }

      // Track with FB Pixel
      const w = window as unknown as { fbq?: (...args: unknown[]) => void };
      if (typeof w.fbq === "function") {
        w.fbq("track", "Lead", {
          content_name: "Contact Form",
          content_category: "B2B Inquiry",
          value: 50,
          currency: "USD",
        });
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-500" aria-hidden />
        <h3 className="text-lg font-bold text-emerald-800">
          {isZh ? "提交成功！" : "Thank you!"}
        </h3>
        <p className="text-sm text-emerald-600">
          {isZh
            ? "我们的工程师将在24小时内与您联系。"
            : "Our engineers will contact you within 24 hours."}
        </p>
      </div>
    );
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
            {isZh ? "姓名" : "Full Name"} <span className="text-red-500">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder={isZh ? "您的姓名" : "Your full name"}
            className={inputClass}
          />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="cf-company" className={labelClass}>
            {isZh ? "公司名称" : "Company Name"} <span className="text-red-500">*</span>
          </label>
          <input
            id="cf-company"
            name="company"
            type="text"
            required
            value={form.company}
            onChange={handleChange}
            placeholder={isZh ? "您的公司" : "Your company"}
            className={inputClass}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="cf-email" className={labelClass}>
            {isZh ? "工作邮箱" : "Business Email"} <span className="text-red-500">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder={isZh ? "name@company.com" : "name@company.com"}
            className={inputClass}
          />
        </div>

        {/* Project Type */}
        <div>
          <label htmlFor="cf-project" className={labelClass}>
            {isZh ? "项目类型" : "Project Type"}
          </label>
          <select
            id="cf-project"
            name="projectType"
            value={form.projectType}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">
              {isZh ? "-- 选择项目类型 --" : "-- Select project type --"}
            </option>
            {projectOptions.map((opt) => (
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
          {isZh ? "项目需求简述" : "Project Requirements"}
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={compact ? 3 : 4}
          value={form.message}
          onChange={handleChange}
          placeholder={
            isZh
              ? "请简要描述您的项目需求、容量要求等..."
              : "Briefly describe your project needs, capacity requirements, etc."
          }
          className={inputClass + " resize-none"}
        />
      </div>

      {/* Error message */}
      {status === "error" && (
        <p className="text-sm text-red-600">
          {isZh ? "提交失败：" : "Submission failed: "}
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
            {isZh ? "提交中..." : "Submitting..."}
          </>
        ) : (
          <>
            <Send className="h-5 w-5" aria-hidden />
            {isZh ? "提交询盘" : "Submit Inquiry"}
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-400">
        {isZh
          ? "我们承诺保护您的信息安全，不会分享给第三方。"
          : "Your information is secure and will never be shared with third parties."}
      </p>
    </form>
  );
}

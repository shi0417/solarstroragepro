"use client";

import { useState, type FormEvent } from "react";
import {
  FileText,
  Download,
  CheckCircle2,
  Loader2,
  BookOpen,
  ClipboardList,
} from "lucide-react";

import { useLocaleContext } from "./LocaleProvider";

type Resource = {
  slug: string;
  titleEn: string;
  titleZh: string;
  descEn: string;
  descZh: string;
  icon: React.ReactNode;
  fileName: string;
};

const RESOURCES: Resource[] = [
  {
    slug: "frequency-regulation-whitepaper",
    titleEn: "Frequency Regulation BESS Whitepaper",
    titleZh: "调频储能技术白皮书",
    descEn: "Technical deep-dive into grid frequency regulation with BESS systems",
    descZh: "调频储能系统技术深度解析",
    icon: <BookOpen className="h-6 w-6" aria-hidden />,
    fileName: "SolarStoragePro-Frequency-Regulation-Whitepaper.pdf",
  },
  {
    slug: "bess-selection-guide",
    titleEn: "BESS Selection Guide",
    titleZh: "储能柜选型手册",
    descEn: "Complete parameter comparison and sizing guide for all product lines",
    descZh: "全产品线参数对比与选型指南",
    icon: <ClipboardList className="h-6 w-6" aria-hidden />,
    fileName: "SolarStoragePro-BESS-Selection-Guide.pdf",
  },
  {
    slug: "certification-guide",
    titleEn: "Global Certification Guide",
    titleZh: "全球认证准入指南",
    descEn: "UL 9540 / IEC 62619 / CE certification requirements by market",
    descZh: "UL 9540 / IEC 62619 / CE 各市场认证要求",
    icon: <FileText className="h-6 w-6" aria-hidden />,
    fileName: "SolarStoragePro-Certification-Guide.pdf",
  },
];

export function ResourceDownload() {
  const { locale } = useLocaleContext();
  const isZh = locale === "zh";

  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!selectedResource) return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/resource-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          company,
          resourceSlug: selectedResource.slug,
          resourceName: isZh ? selectedResource.titleZh : selectedResource.titleEn,
        }),
      });

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");

      // Track with FB Pixel
      const w = window as unknown as { fbq?: (...args: unknown[]) => void };
      if (typeof w.fbq === "function") {
        w.fbq("track", "ViewContent", {
          content_name: selectedResource.slug,
          content_type: "resource_download",
          value: 10,
          currency: "USD",
        });
      }

      // Trigger download
      const link = document.createElement("a");
      link.href = `/resources/${selectedResource.fileName}`;
      link.download = selectedResource.fileName;
      link.click();
    } catch {
      setStatus("error");
    }
  }

  // Success state
  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-500" aria-hidden />
        <h3 className="text-lg font-bold text-emerald-800">
          {isZh ? "下载已开始！" : "Download started!"}
        </h3>
        <p className="text-sm text-emerald-600">
          {isZh
            ? "文件正在下载，我们的团队也会通过邮件与您联系。"
            : "Your file is downloading. Our team will also reach out via email."}
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setSelectedResource(null);
            setEmail("");
            setName("");
            setCompany("");
          }}
          className="mt-2 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          {isZh ? "下载更多资料" : "Download more resources"}
        </button>
      </div>
    );
  }

  // Resource selection
  if (!selectedResource) {
    return (
      <div>
        <div className="grid gap-4 sm:grid-cols-3">
          {RESOURCES.map((r) => (
            <button
              key={r.slug}
              type="button"
              onClick={() => setSelectedResource(r)}
              className="group rounded-2xl border border-slate-200 bg-white p-6 text-left transition-all hover:border-brand-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-100">
                {r.icon}
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">
                {isZh ? r.titleZh : r.titleEn}
              </h3>
              <p className="mt-1.5 text-sm text-slate-500">
                {isZh ? r.descZh : r.descEn}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                <Download className="h-4 w-4" aria-hidden />
                {isZh ? "免费下载" : "Free Download"}
              </div>
            </button>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-slate-400">
          {isZh
            ? "* 点击资料即进入下载流程，需填写邮箱"
            : "* Click a resource to start the download — email required"}
        </p>
      </div>
    );
  }

  // Email gate form
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          {selectedResource.icon}
        </div>
        <div>
          <h3 className="font-bold text-slate-900">
            {isZh ? selectedResource.titleZh : selectedResource.titleEn}
          </h3>
          <p className="text-sm text-slate-500">
            {isZh ? selectedResource.descZh : selectedResource.descEn}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="rd-email" className="block text-sm font-semibold text-slate-700 mb-1.5">
            {isZh ? "工作邮箱" : "Business Email"} <span className="text-red-500">*</span>
          </label>
          <input
            id="rd-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="rd-name" className="block text-sm font-semibold text-slate-700 mb-1.5">
              {isZh ? "姓名" : "Full Name"}
            </label>
            <input
              id="rd-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isZh ? "您的姓名" : "Your name"}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
          <div>
            <label htmlFor="rd-company" className="block text-sm font-semibold text-slate-700 mb-1.5">
              {isZh ? "公司" : "Company"}
            </label>
            <input
              id="rd-company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder={isZh ? "您的公司" : "Your company"}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>

        {status === "error" && (
          <p className="text-sm text-red-600">
            {isZh ? "提交失败，请重试" : "Submission failed. Please try again."}
          </p>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-primary flex-1 bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-60"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                {isZh ? "处理中..." : "Processing..."}
              </>
            ) : (
              <>
                <Download className="h-5 w-5" aria-hidden />
                {isZh ? "下载资料" : "Download Now"}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedResource(null);
              setStatus("idle");
            }}
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            {isZh ? "返回" : "Back"}
          </button>
        </div>
      </form>
    </div>
  );
}

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
  titleKey: number; // index into resourceDownload.resources[].title
  descKey: number;  // index into resourceDownload.resources[].desc
  icon: React.ReactNode;
  fileName: string;
};

const RESOURCES: Resource[] = [
  {
    slug: "frequency-regulation-whitepaper",
    titleKey: 0,
    descKey: 0,
    icon: <BookOpen className="h-6 w-6" aria-hidden />,
    fileName: "SolarStoragePro-Frequency-Regulation-Whitepaper.pdf",
  },
  {
    slug: "bess-selection-guide",
    titleKey: 1,
    descKey: 1,
    icon: <ClipboardList className="h-6 w-6" aria-hidden />,
    fileName: "SolarStoragePro-BESS-Selection-Guide.pdf",
  },
  {
    slug: "certification-guide",
    titleKey: 2,
    descKey: 2,
    icon: <FileText className="h-6 w-6" aria-hidden />,
    fileName: "SolarStoragePro-Certification-Guide.pdf",
  },
];

export function ResourceDownload() {
  const { messages } = useLocaleContext();
  const rd = messages.resourceDownload;
  const resources = rd.resources as { title: string; desc: string }[];

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
          resourceName: resources[selectedResource.titleKey]?.title ?? selectedResource.slug,
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
          {rd.downloadStarted}
        </h3>
        <p className="text-sm text-emerald-600">
          {rd.downloadMessage}
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
          {rd.downloadMore}
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
                {resources[r.titleKey]?.title}
              </h3>
              <p className="mt-1.5 text-sm text-slate-500">
                {resources[r.descKey]?.desc}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                <Download className="h-4 w-4" aria-hidden />
                {rd.freeDownload}
              </div>
            </button>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-slate-400">
          {rd.clickNote}
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
            {resources[selectedResource.titleKey]?.title}
          </h3>
          <p className="text-sm text-slate-500">
            {resources[selectedResource.descKey]?.desc}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="rd-email" className="block text-sm font-semibold text-slate-700 mb-1.5">
            {rd.businessEmail} <span className="text-red-500">*</span>
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
              {rd.fullName}
            </label>
            <input
              id="rd-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={rd.namePlaceholder}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
          <div>
            <label htmlFor="rd-company" className="block text-sm font-semibold text-slate-700 mb-1.5">
              {rd.companyName}
            </label>
            <input
              id="rd-company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder={rd.companyPlaceholder}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>

        {status === "error" && (
          <p className="text-sm text-red-600">
            {rd.submissionFailed}
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
                {rd.processing}
              </>
            ) : (
              <>
                <Download className="h-5 w-5" aria-hidden />
                {rd.downloadNow}
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
            {rd.backBtn}
          </button>
        </div>
      </form>
    </div>
  );
}

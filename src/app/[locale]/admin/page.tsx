"use client";

import { useState, useEffect, useCallback } from "react";
import {
  LogIn,
  LogOut,
  Users,
  Download,
  Search,
  RefreshCw,
  Mail,
  Building2,
  MessageSquare,
  Clock,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Submission {
  id: number;
  name: string;
  company: string;
  email: string;
  project_type: string | null;
  message: string | null;
  source: string;
  locale: string;
  created_at: string;
}

interface Download {
  id: number;
  email: string;
  name: string | null;
  company: string | null;
  resource_slug: string;
  resource_name: string;
  source: string;
  locale: string;
  created_at: string;
}

type Tab = "submissions" | "downloads";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function getAuthHeader(user: string, pass: string) {
  return "Basic " + Buffer.from(`${user}:${pass}`).toString("base64");
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function fmtProjectType(t: string | null) {
  if (!t) return "-";
  const map: Record<string, string> = {
    "frequency-regulation": "调频",
    "peak-shaving": "削峰填谷",
    "solar-storage": "光储一体",
    "microgrid": "微电网",
    other: "其他",
    削峰填谷: "削峰填谷",
  };
  return map[t] || t;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function AdminPage() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authHeader, setAuthHeader] = useState("");
  const [tab, setTab] = useState<Tab>("submissions");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [totalSub, setTotalSub] = useState(0);
  const [totalDl, setTotalDl] = useState(0);
  const [pageSub, setPageSub] = useState(1);
  const [pageDl, setPageDl] = useState(1);
  const [searchSub, setSearchSub] = useState("");
  const [searchDl, setSearchDl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---- Persist login in sessionStorage ---- */
  useEffect(() => {
    const saved = sessionStorage.getItem("admin_auth");
    if (saved) {
      setAuthHeader(saved);
      setAuthed(true);
    }
  }, []);

  /* ---- Fetch ---- */
  const fetchSubmissions = useCallback(
    async (p = 1, s = "") => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: String(p), limit: "50", search: s });
        const res = await fetch(`/api/admin/submissions?${params}`, {
          headers: { Authorization: authHeader },
        });
        if (res.status === 401) {
          setAuthed(false);
          sessionStorage.removeItem("admin_auth");
          return;
        }
        const json = await res.json();
        setSubmissions(json.data || []);
        setTotalSub(json.total || 0);
        setPageSub(p);
      } catch {
        setError("获取数据失败");
      } finally {
        setLoading(false);
      }
    },
    [authHeader]
  );

  const fetchDownloads = useCallback(
    async (p = 1, s = "") => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: String(p), limit: "50", search: s });
        const res = await fetch(`/api/admin/downloads?${params}`, {
          headers: { Authorization: authHeader },
        });
        if (res.status === 401) {
          setAuthed(false);
          sessionStorage.removeItem("admin_auth");
          return;
        }
        const json = await res.json();
        setDownloads(json.data || []);
        setTotalDl(json.total || 0);
        setPageDl(p);
      } catch {
        setError("获取数据失败");
      } finally {
        setLoading(false);
      }
    },
    [authHeader]
  );

  useEffect(() => {
    if (authed) {
      if (tab === "submissions") fetchSubmissions(pageSub, searchSub);
      else fetchDownloads(pageDl, searchDl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, authed]);

  /* ---- Handlers ---- */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const header = getAuthHeader(user, pass);
    // Quick auth check by attempting a fetch
    fetch("/api/admin/submissions?limit=1", {
      headers: { Authorization: header },
    })
      .then((res) => {
        if (res.ok) {
          setAuthHeader(header);
          setAuthed(true);
          sessionStorage.setItem("admin_auth", header);
          setError("");
        } else {
          setError("用户名或密码错误");
        }
      })
      .catch(() => setError("连接失败"));
  };

  const handleLogout = () => {
    setAuthed(false);
    setAuthHeader("");
    sessionStorage.removeItem("admin_auth");
  };

  const handleSearch = () => {
    if (tab === "submissions") fetchSubmissions(1, searchSub);
    else fetchDownloads(1, searchDl);
  };

  const handleRefresh = () => {
    if (tab === "submissions") fetchSubmissions(pageSub, searchSub);
    else fetchDownloads(pageDl, searchDl);
  };

  const totalPages = (total: number) => Math.max(1, Math.ceil(total / 50));

  /* ---- Render: Login ---- */
  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-brand-100">
              <LogIn className="h-7 w-7 text-brand-600" />
            </div>
            <h1 className="text-xl font-bold text-slate-800">
              SolarStoragePro 后台
            </h1>
            <p className="mt-1 text-sm text-slate-500">请登录以查看客户数据</p>
          </div>
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                用户名
              </label>
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                placeholder="请输入用户名"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                密码
              </label>
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                placeholder="请输入密码"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              登录
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ---- Render: Dashboard ---- */
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">
                SolarStoragePro 后台
              </h1>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-100"
          >
            <LogOut className="h-4 w-4" />
            退出
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Stats cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">客户询盘</p>
                <p className="text-2xl font-bold text-slate-800">{totalSub}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <Download className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">资料下载</p>
                <p className="text-2xl font-bold text-slate-800">{totalDl}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4 flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 shadow-sm w-fit">
          <button
            onClick={() => setTab("submissions")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              tab === "submissions"
                ? "bg-brand-600 text-white shadow"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Users className="mr-1.5 inline h-4 w-4" />
            客户询盘
          </button>
          <button
            onClick={() => setTab("downloads")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              tab === "downloads"
                ? "bg-brand-600 text-white shadow"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Download className="mr-1.5 inline h-4 w-4" />
            资料下载
          </button>
        </div>

        {/* Search + Refresh */}
        <div className="mb-4 flex items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={tab === "submissions" ? searchSub : searchDl}
              onChange={(e) =>
                tab === "submissions"
                  ? setSearchSub(e.target.value)
                  : setSearchDl(e.target.value)
              }
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="搜索姓名、公司、邮箱..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
          <button
            onClick={handleSearch}
            className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
          >
            搜索
          </button>
          <button
            onClick={handleRefresh}
            className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-100"
            title="刷新"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* Table: Submissions */}
        {tab === "submissions" && (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-slate-600">
                      <Clock className="mr-1 inline h-3.5 w-3.5" />
                      时间
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-slate-600">
                      姓名
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-slate-600">
                      <Building2 className="mr-1 inline h-3.5 w-3.5" />
                      公司
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-slate-600">
                      <Mail className="mr-1 inline h-3.5 w-3.5" />
                      邮箱
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-slate-600">
                      项目类型
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-slate-600">
                      <MessageSquare className="mr-1 inline h-3.5 w-3.5" />
                      留言
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-slate-600">
                      语言
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {submissions.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-12 text-center text-slate-400"
                      >
                        暂无数据
                      </td>
                    </tr>
                  )}
                  {submissions.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/50">
                      <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                        {fmtDate(s.created_at)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-800">
                        {s.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                        {s.company}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <a
                          href={`mailto:${s.email}`}
                          className="text-brand-600 hover:underline"
                        >
                          {s.email}
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span className="inline-flex rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-700">
                          {fmtProjectType(s.project_type)}
                        </span>
                      </td>
                      <td className="max-w-xs truncate px-4 py-3 text-slate-600">
                        {s.message || "-"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-400">
                        {s.locale?.toUpperCase()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
              <p className="text-sm text-slate-500">
                共 {totalSub} 条，第 {pageSub}/{totalPages(totalSub)} 页
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchSubmissions(pageSub - 1, searchSub)}
                  disabled={pageSub <= 1}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                  上一页
                </button>
                <button
                  onClick={() => fetchSubmissions(pageSub + 1, searchSub)}
                  disabled={pageSub >= totalPages(totalSub)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white"
                >
                  下一页
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table: Downloads */}
        {tab === "downloads" && (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-slate-600">
                      <Clock className="mr-1 inline h-3.5 w-3.5" />
                      时间
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-slate-600">
                      <Mail className="mr-1 inline h-3.5 w-3.5" />
                      邮箱
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-slate-600">
                      姓名
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-slate-600">
                      公司
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-slate-600">
                      <Download className="mr-1 inline h-3.5 w-3.5" />
                      下载资料
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-slate-600">
                      语言
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {downloads.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-12 text-center text-slate-400"
                      >
                        暂无数据
                      </td>
                    </tr>
                  )}
                  {downloads.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/50">
                      <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                        {fmtDate(d.created_at)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <a
                          href={`mailto:${d.email}`}
                          className="text-brand-600 hover:underline"
                        >
                          {d.email}
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                        {d.name || "-"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                        {d.company || "-"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                          {d.resource_name}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-400">
                        {d.locale?.toUpperCase()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
              <p className="text-sm text-slate-500">
                共 {totalDl} 条，第 {pageDl}/{totalPages(totalDl)} 页
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchDownloads(pageDl - 1, searchDl)}
                  disabled={pageDl <= 1}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                  上一页
                </button>
                <button
                  onClick={() => fetchDownloads(pageDl + 1, searchDl)}
                  disabled={pageDl >= totalPages(totalDl)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white"
                >
                  下一页
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

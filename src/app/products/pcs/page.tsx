"use client";

import Link from "next/link";
import {
  Box,
  Cpu,
  Gauge,
  Layers,
  Shield,
  Zap,
} from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";

type SpecRow = { category: string; item: string; detail: string };

export default function PcsProductPage() {
  const { locale } = useLocaleContext();
  const isZh = locale === "zh";

  const ui = isZh
    ? {
        back: "返回首页",
        badge: "PCS · 预制舱",
        heroTitle: "SES4H-5160/6900-MV-EX 预制舱式逆变升压站",
        heroSub:
          "集成逆变器与升压站的高度集成化预制舱方案，适用于大型光储与电网侧接入场景。",
        overviewTitle: "产品概述",
        overviewName: "名称",
        overviewNameVal: "SES4H-5160/6900-MV-EX 预制舱式逆变升压站（Prefabricated Inverter Substation）",
        featuresTitle: "核心优势",
        placeholderTitle: "PCS 产品图",
        placeholder: "请将图片放入 public/images/ 并在下方替换为 <img> 或 next/image",
        specsTitle: "技术参数",
        specsHint: "表格支持横向滚动以查看完整内容。",
        colCat: "类别",
        colItem: "参数项目",
        colDetail: "规格详情",
        ctaDatasheet: "索取资料",
        ctaContact: "联系我们",
        features: [
          {
            title: "灵活配置",
            body: "集成逆变器与升压站，高度集成化设计，提升空间效率并简化安装流程。",
            icon: <Layers className="h-5 w-5" aria-hidden />,
          },
          {
            title: "模块化功率",
            body: "采用模块化设计，功率可根据需求配置。",
            icon: <Box className="h-5 w-5" aria-hidden />,
          },
          {
            title: "高效率与稳定性",
            body: "1500V 宽电压直流范围，多支路直流设计防止电池环流。",
            icon: <Zap className="h-5 w-5" aria-hidden />,
          },
          {
            title: "广泛用途",
            body: "支持 VSG / PQ / VF 模式，具备削峰填谷及本地自动化运行功能。",
            icon: <Cpu className="h-5 w-5" aria-hidden />,
          },
          {
            title: "安全兼容",
            body: "支持高/低电压穿越（HVRT/LVRT），四象限有功/无功调节，快速功率响应（<20ms）。",
            icon: <Shield className="h-5 w-5" aria-hidden />,
          },
          {
            title: "电网友好",
            body: "额定交流功率按模块数 N 可配置（典型 N×215kW @45°C，N 为模块数 20~32）。",
            icon: <Gauge className="h-5 w-5" aria-hidden />,
          },
        ],
      }
    : {
        back: "Back to home",
        badge: "PCS · Prefabricated",
        heroTitle: "SES4H-5160/6900-MV-EX Prefabricated Inverter Substation",
        heroSub:
          "Highly integrated prefabricated cabin combining inverter and step-up substation for utility-scale PV+storage and grid connection.",
        overviewTitle: "Product overview",
        overviewName: "Name",
        overviewNameVal:
          "SES4H-5160/6900-MV-EX Prefabricated Inverter Substation (PCS)",
        featuresTitle: "Key advantages",
        placeholderTitle: "PCS Product Image",
        placeholder:
          "Add your asset under public/images/ and replace this block with <img> or next/image",
        specsTitle: "Technical specifications",
        specsHint: "Scroll horizontally on small screens.",
        colCat: "Category",
        colItem: "Parameter",
        colDetail: "Specification",
        ctaDatasheet: "Request datasheet",
        ctaContact: "Contact us",
        features: [
          {
            title: "Flexible configuration",
            body: "Integrated inverter and step-up substation for higher space efficiency and simpler installation.",
            icon: <Layers className="h-5 w-5" aria-hidden />,
          },
          {
            title: "Modular power",
            body: "Modular architecture; power scales with the number of modules.",
            icon: <Box className="h-5 w-5" aria-hidden />,
          },
          {
            title: "High efficiency & stability",
            body: "1500V-class wide DC voltage range; multi-branch DC design to avoid circulating current.",
            icon: <Zap className="h-5 w-5" aria-hidden />,
          },
          {
            title: "Versatile operation",
            body: "Supports VSG / PQ / VF modes with peak shaving and local automated operation.",
            icon: <Cpu className="h-5 w-5" aria-hidden />,
          },
          {
            title: "Grid-safe",
            body: "HVRT/LVRT; four-quadrant P/Q control; fast power response (<20ms).",
            icon: <Shield className="h-5 w-5" aria-hidden />,
          },
          {
            title: "Rated AC power",
            body: "N × 215 kW @ 45°C (N = number of modules, typically 20–32).",
            icon: <Gauge className="h-5 w-5" aria-hidden />,
          },
        ],
      };

  const specRows: SpecRow[] = isZh
    ? [
        {
          category: "交流与直流参数",
          item: "额定交流功率",
          detail: "N × 215kW @ 45°C（N 为模块数，20~32）",
        },
        {
          category: "交流与直流参数",
          item: "最大交流功率",
          detail: "110% 额定功率，2 分钟（≤ 45°C）",
        },
        {
          category: "交流与直流参数",
          item: "交流电压 / 频率",
          detail: "10kV–33kV / 50Hz",
        },
        {
          category: "交流与直流参数",
          item: "直流电压范围",
          detail: "1000V–1500V（满载放电 1070V–1500V）",
        },
        {
          category: "交流与直流参数",
          item: "最大直流电流（每支路）",
          detail: "1612A / 201A",
        },
        {
          category: "变压器参数",
          item: "容量",
          detail: "5200kVA @ 45°C 或 6900kVA @ 45°C",
        },
        {
          category: "变压器参数",
          item: "类型 / 冷却方式",
          detail: "油浸式变压器 / ONAN",
        },
        {
          category: "变压器参数",
          item: "效率",
          detail: "Tier 2（符合 EU548）",
        },
        {
          category: "通用参数",
          item: "尺寸（W×H×D）",
          detail: "40ft（12192×2896×2438 mm）/ 45ft",
        },
        {
          category: "通用参数",
          item: "重量 / 防护等级",
          detail: "≤ 30t / IP54（整体）",
        },
        {
          category: "通用参数",
          item: "工作温度",
          detail: "-25°C 至 60°C（45°C 以上降额）",
        },
        {
          category: "通用参数",
          item: "防腐等级",
          detail: "C5（仅外部机械部件）",
        },
        {
          category: "保护与合规",
          item: "通讯方式",
          detail: "RS485, CAN, TCP/IP",
        },
        {
          category: "保护与合规",
          item: "认证",
          detail: "IEC62477, IEC61000, G99, VDE4110, VDE4120, EN50549-2",
        },
      ]
    : [
        {
          category: "AC & DC",
          item: "Rated AC power",
          detail: "N × 215 kW @ 45°C (N = modules, 20–32)",
        },
        {
          category: "AC & DC",
          item: "Max AC power",
          detail: "110% rated for 2 minutes (≤ 45°C)",
        },
        {
          category: "AC & DC",
          item: "AC voltage / frequency",
          detail: "10 kV–33 kV / 50 Hz",
        },
        {
          category: "AC & DC",
          item: "DC voltage range",
          detail: "1000 V–1500 V (full-load discharge 1070 V–1500 V)",
        },
        {
          category: "AC & DC",
          item: "Max DC current (per branch)",
          detail: "1612 A / 201 A",
        },
        {
          category: "Transformer",
          item: "Capacity",
          detail: "5200 kVA @ 45°C or 6900 kVA @ 45°C",
        },
        {
          category: "Transformer",
          item: "Type / cooling",
          detail: "Oil-immersed / ONAN",
        },
        {
          category: "Transformer",
          item: "Efficiency",
          detail: "Tier 2 (EU548)",
        },
        {
          category: "General",
          item: "Dimensions (W×H×D)",
          detail: "40 ft (12192×2896×2438 mm) / 45 ft",
        },
        {
          category: "General",
          item: "Weight / protection",
          detail: "≤ 30 t / IP54 (enclosure)",
        },
        {
          category: "General",
          item: "Operating temperature",
          detail: "-25°C to 60°C (derate above 45°C)",
        },
        {
          category: "General",
          item: "Corrosion class",
          detail: "C5 (external mechanical parts only)",
        },
        {
          category: "Protection & compliance",
          item: "Communication",
          detail: "RS485, CAN, TCP/IP",
        },
        {
          category: "Protection & compliance",
          item: "Certifications",
          detail: "IEC62477, IEC61000, G99, VDE4110, VDE4120, EN50549-2",
        },
      ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-[var(--border)]">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900" />
          <div className="pointer-events-none absolute inset-0 bg-grid-slate bg-[length:44px_44px] opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-20%,rgba(245,158,11,0.12),transparent)]" />

          <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-solar-400"
            >
              ← {ui.back}
            </Link>

            <p className="mt-8 inline-flex rounded-full border border-[var(--border)] bg-[var(--accent-dim)] px-3 py-1 text-xs font-medium text-solar-400">
              {ui.badge}
            </p>
            <h1 className="mt-4 max-w-4xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {ui.heroTitle}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300">{ui.heroSub}</p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "sales@solarstoragepro.com"}?subject=${encodeURIComponent("PCS datasheet request")}`}
                className="inline-flex items-center justify-center rounded-full bg-solar-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-solar-500/30 transition hover:bg-solar-400"
              >
                {ui.ctaDatasheet}
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
              >
                {ui.ctaContact}
              </Link>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-6xl space-y-14 px-4 sm:px-6">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-8">
              <h2 className="text-xl font-bold text-white sm:text-2xl">{ui.overviewTitle}</h2>
              <dl className="mt-4 space-y-2 text-sm text-slate-300">
                <div>
                  <dt className="font-semibold text-solar-400">{ui.overviewName}</dt>
                  <dd className="mt-1 leading-relaxed">{ui.overviewNameVal}</dd>
                </div>
              </dl>

              <div
                className="mt-8 flex min-h-[240px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-600 bg-slate-800/40 px-6 py-12 text-center text-sm text-slate-500"
                aria-label="PCS product image placeholder"
              >
                <span className="text-base font-semibold text-slate-400">{ui.placeholderTitle}</span>
                <span className="max-w-md leading-relaxed">{ui.placeholder}</span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white sm:text-2xl">{ui.featuresTitle}</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {ui.features.map((f) => (
                  <div
                    key={f.title}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-lg shadow-black/20 backdrop-blur transition hover:border-solar-500/40"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-solar-500/15 text-solar-400">
                        {f.icon}
                      </span>
                      <h3 className="text-lg font-semibold text-slate-100">{f.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-8">
              <h2 className="text-xl font-bold text-white sm:text-2xl">{ui.specsTitle}</h2>
              <p className="mt-2 text-sm text-slate-500">{ui.specsHint}</p>

              <div className="mt-6 overflow-x-auto rounded-xl border border-slate-700/80 bg-slate-900/40">
                <table className="min-w-[800px] w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-950/70">
                      <th className="px-4 py-3 font-bold text-solar-300">{ui.colCat}</th>
                      <th className="px-4 py-3 font-bold text-solar-300">{ui.colItem}</th>
                      <th className="px-4 py-3 font-bold text-slate-200">{ui.colDetail}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specRows.map((row, i) => (
                      <tr
                        key={`${row.category}-${row.item}-${i}`}
                        className={i % 2 === 0 ? "bg-slate-800/20" : "bg-slate-800/10"}
                      >
                        <td className="border-t border-slate-700/80 px-4 py-3 font-medium text-slate-300">
                          {row.category}
                        </td>
                        <td className="border-t border-slate-700/80 px-4 py-3 text-slate-400">
                          {row.item}
                        </td>
                        <td className="border-t border-slate-700/80 px-4 py-3 text-slate-200">
                          {row.detail}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 rounded-2xl border border-solar-500/25 bg-gradient-to-br from-solar-500/10 to-transparent p-8">
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "sales@solarstoragepro.com"}?subject=${encodeURIComponent("PCS datasheet request")}`}
                className="inline-flex items-center justify-center rounded-full bg-solar-500 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-solar-400"
              >
                {ui.ctaDatasheet}
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
              >
                {ui.ctaContact}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

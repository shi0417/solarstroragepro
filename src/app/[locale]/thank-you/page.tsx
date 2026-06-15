"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useLocaleContext } from "@/components/site/LocaleProvider";
import { getEnhancedData, type EnhancedData } from "@/lib/enhanced-conversions";

const BUTTON_LABELS: Record<string, { backHome: string; browseProducts: string; contactTeam: string }> = {
  en: { backHome: "Back to Home", browseProducts: "Browse Products", contactTeam: "Contact Our Team" },
  zh: { backHome: "返回首页", browseProducts: "浏览产品", contactTeam: "联系我们的团队" },
  es: { backHome: "Volver al inicio", browseProducts: "Ver productos", contactTeam: "Contactar al equipo" },
  tr: { backHome: "Ana Sayfaya Dön", browseProducts: "Ürünleri İnceleyin", contactTeam: "Ekibimizle İletişime Geçin" },
  pt: { backHome: "Voltar ao Início", browseProducts: "Ver Produtos", contactTeam: "Contactar a Equipa" },
  de: { backHome: "Zurück zur Startseite", browseProducts: "Produkte ansehen", contactTeam: "Team kontaktieren" },
  fr: { backHome: "Retour à l'accueil", browseProducts: "Voir les produits", contactTeam: "Contacter l'équipe" },
  th: { backHome: "กลับสู่หน้าแรก", browseProducts: "ดูผลิตภัณฑ์", contactTeam: "ติดต่อทีมงาน" },
  ar: { backHome: "العودة إلى الصفحة الرئيسية", browseProducts: "تصفح المنتجات", contactTeam: "اتصل بفريقنا" },
  ja: { backHome: "ホームに戻る", browseProducts: "製品を見る", contactTeam: "チームに問い合わせる" },
  ko: { backHome: "홈으로 돌아가기", browseProducts: "제품 보기", contactTeam: "팀에 문의하기" },
  id: { backHome: "Kembali ke Beranda", browseProducts: "Lihat Produk", contactTeam: "Hubungi Tim Kami" },
  uk: { backHome: "Повернутися на головну", browseProducts: "Переглянути продукти", contactTeam: "Зв'язатися з командою" },
};

export default function ThankYouPage() {
  const { locale, messages, localizePath } = useLocaleContext();
  const cf = messages.contactForm;
  const labels = BUTTON_LABELS[locale] || BUTTON_LABELS.en;

  // ── Fire Google Ads conversion ONLY on this page (not globally) ──
  useEffect(() => {
    // SSR safety: only run on client
    if (typeof window === "undefined") return;

    // Read Enhanced Conversions data from sessionStorage (stored by ContactForm)
    const ecData: EnhancedData | null = getEnhancedData();

    // Google Ads conversion
    if (typeof window.gtag === "function") {
      const transactionId = "ssp_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
      const params: Record<string, unknown> = {
        send_to: "AW-18235093488/jw1ICOmCj74cEPDjlfdD",
        value: 5.0,
        currency: "HKD",
        transaction_id: transactionId,
      };
      // Enhanced Conversions: SHA-256 hashed first-party data
      if (ecData) {
        params.email = ecData.email_hashed;
        params.first_name = ecData.first_name_hashed;
        params.last_name = ecData.last_name_hashed;
      }
      window.gtag("event", "conversion", params);
      console.log("[GA] Thank-you page conversion fired", { transactionId, ec: !!ecData });
    }

    // Meta Pixel Lead event
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead", {
        content_name: "Contact Form - Thank You Page",
        content_category: "B2B Inquiry",
        value: 50,
        currency: "USD",
      });
      console.log("[FB] Thank-you page Lead event fired");
    }
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-lg text-center">
        {/* Success icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 ring-4 ring-emerald-500/30">
          <CheckCircle2 className="h-10 w-10 text-emerald-400" aria-hidden />
        </div>

        {/* Thank-you message */}
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {cf.successTitle}
        </h1>
        <p className="mb-10 text-lg leading-relaxed text-slate-400">
          {cf.successMessage}
        </p>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={localizePath("/")}
            className="inline-flex items-center justify-center rounded-xl bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700 hover:text-white"
          >
            {labels.backHome}
          </Link>
          <Link
            href={localizePath("/products/energy-storage-system")}
            className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-500"
          >
            {labels.browseProducts}
          </Link>
        </div>

        {/* Secondary contact CTA */}
        <p className="mt-10 text-sm text-slate-500">
          {labels.contactTeam}:{" "}
          <a href="mailto:info@solarstoragepro.com" className="text-brand-400 underline hover:text-brand-300">
            info@solarstoragepro.com
          </a>
        </p>
      </div>
    </main>
  );
}

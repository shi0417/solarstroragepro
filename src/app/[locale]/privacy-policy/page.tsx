"use client";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useLocaleContext } from "@/components/site/LocaleProvider";

const COPY: Record<string, {
  badge: string;
  title: string;
  lastUpdated: string;
  sections: { heading: string; body: string }[];
}> = {
  en: {
    badge: "Legal",
    title: "Privacy Policy",
    lastUpdated: "Last updated: July 2, 2026",
    sections: [
      {
        heading: "1. Introduction",
        body: "SolarStoragePro (\"we\", \"us\", or \"our\") is a battery energy storage system manufacturer headquartered in Taizhou, Zhejiang, China. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and protect your personal information when you visit our website solarstoragepro.com (the \"Site\").",
      },
      {
        heading: "2. Data We Collect",
        body: "We collect the following types of personal data:\n\n• Contact information: name, company name, email address, phone number, and project details you provide via our contact forms.\n• Resource download data: email address and company information submitted to download technical documents.\n• Usage data: IP address, browser type, device information, pages visited, time spent on pages, and referral URLs collected through Google Tag Manager and Meta (Facebook) Pixel.\n• Cookie data: language preference cookies and analytics cookies.",
      },
      {
        heading: "3. How We Use Your Data",
        body: "We process your personal data for the following purposes:\n\n• Responding to your inquiries and providing product information.\n• Sending technical documents and resources you request.\n• Improving our website content, user experience, and marketing effectiveness.\n• Analyzing website traffic and user behavior through third-party analytics tools.\n• Running remarketing and advertising campaigns via Google Ads and Meta Ads.\n• Fulfilling legal obligations and protecting against fraud.",
      },
      {
        heading: "4. Legal Basis for Processing (GDPR)",
        body: "For users in the European Economic Area (EEA), we process your personal data based on:\n\n• Consent: You voluntarily provide your information through our contact forms and accept tracking technologies.\n• Contractual necessity: Processing is necessary to respond to your inquiry and provide requested services.\n• Legitimate interests: We process data for website security, fraud prevention, and business improvement.",
      },
      {
        heading: "5. Third-Party Services",
        body: "We use the following third-party services that may process your personal data:\n\n• Google Tag Manager (GTM) and Google Analytics: Website analytics and conversion tracking.\n• Google Ads: Remarketing and advertising campaign measurement.\n• Meta (Facebook) Pixel: Social media advertising analytics.\n• Supabase: Database hosting for storing form submission data.\n\nThese third parties process data in accordance with their own privacy policies. We do not sell your personal data to any third party.",
      },
      {
        heading: "6. Data Storage and Security",
        body: "Your personal data is stored in Supabase-hosted databases (PostgreSQL, hosted in the United States). We implement appropriate technical and organizational measures to protect your data, including encrypted connections (HTTPS), access controls, and regular security reviews. Form submission data is retained for up to 24 months unless you request earlier deletion.",
      },
      {
        heading: "7. Data Retention",
        body: "We retain personal data only as long as necessary for the purposes described in this policy:\n\n• Contact form submissions: up to 24 months.\n• Resource download records: up to 12 months.\n• Analytics data: as determined by third-party service provider retention policies.\n• Cookie data: up to 12 months (language preference cookie).",
      },
      {
        heading: "8. Your Rights",
        body: "Under GDPR and other applicable privacy laws, you have the following rights:\n\n• Right of access: Request a copy of your personal data.\n• Right to rectification: Request correction of inaccurate data.\n• Right to erasure: Request deletion of your personal data.\n• Right to restrict processing: Request limitation of data processing.\n• Right to data portability: Receive your data in a structured format.\n• Right to object: Object to processing based on legitimate interests.\n• Right to withdraw consent: Withdraw consent at any time.\n\nTo exercise these rights, contact us at sales@solarstoragepro.com.",
      },
      {
        heading: "9. International Data Transfers",
        body: "Your data may be transferred to and processed in countries outside your country of residence, including China and the United States. We ensure appropriate safeguards are in place for such transfers, including standard contractual clauses where applicable.",
      },
      {
        heading: "10. Children's Privacy",
        body: "Our website is intended for business-to-business (B2B) purposes and is not directed at individuals under 18. We do not knowingly collect personal data from minors. If you believe we have collected data from a minor, please contact us immediately.",
      },
      {
        heading: "11. Changes to This Policy",
        body: "We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on this page and updating the \"Last updated\" date. We encourage you to review this policy periodically.",
      },
      {
        heading: "12. Contact Us",
        body: "If you have questions about this Privacy Policy or our data practices, please contact:\n\nSolarStoragePro\nEmail: sales@solarstoragepro.com\nPhone: +86 13967483968\nAddress: Taizhou, Zhejiang, China",
      },
    ],
  },
  zh: {
    badge: "法律信息",
    title: "隐私政策",
    lastUpdated: "最后更新：2026年7月2日",
    sections: [
      {
        heading: "1. 引言",
        body: "SolarStoragePro（“我们”）是一家总部位于中国浙江台州的电池储能系统制造商。我们尊重您的隐私，致力于保护您的个人数据。本隐私政策说明了当您访问我们的网站 solarstoragepro.com（“本站”）时，我们如何收集、使用、存储和保护您的个人信息。",
      },
      {
        heading: "2. 我们收集的数据",
        body: "我们收集以下类型的个人数据：\n\n• 联系信息：您通过我们的联系表单提供的姓名、公司名称、邮箱地址、电话号码和项目详情。\n• 资料下载数据：为下载技术文档而提交的邮箱地址和公司信息。\n• 使用数据：通过 Google Tag Manager 和 Meta（Facebook）Pixel 收集的 IP 地址、浏览器类型、设备信息、访问页面、停留时间和来源 URL。\n• Cookie 数据：语言偏好 Cookie 和分析 Cookie。",
      },
      {
        heading: "3. 我们如何使用您的数据",
        body: "我们处理您的个人数据用于以下目的：\n\n• 回复您的询盘并提供产品信息。\n• 发送您要求的技术文档和资料。\n• 改善网站内容和用户体验及营销效果。\n• 通过第三方分析工具分析网站流量和用户行为。\n• 通过 Google Ads 和 Meta Ads 运行再营销和广告活动。\n• 履行法律义务并防范欺诈。",
      },
      {
        heading: "4. 数据处理的法律依据（GDPR）",
        body: "对于欧洲经济区（EEA）用户，我们基于以下依据处理您的个人数据：\n\n• 同意：您自愿通过联系表单提供信息并接受追踪技术。\n• 合同必要性：处理是回复询盘和提供所要求服务所必需的。\n• 合法利益：我们为网站安全、防欺诈和业务改进处理数据。",
      },
      {
        heading: "5. 第三方服务",
        body: "我们使用以下可能处理您个人数据的第三方服务：\n\n• Google Tag Manager (GTM) 和 Google Analytics：网站分析和转化追踪。\n• Google Ads：再营销和广告活动衡量。\n• Meta（Facebook）Pixel：社交媒体广告分析。\n• Supabase：用于存储表单提交数据的数据库托管。\n\n这些第三方根据其自身的隐私政策处理数据。我们不会向任何第三方出售您的个人数据。",
      },
      {
        heading: "6. 数据存储和安全",
        body: "您的个人数据存储在 Supabase 托管的数据库中（PostgreSQL，托管于美国）。我们采取适当的技术和组织措施来保护您的数据，包括加密连接（HTTPS）、访问控制和定期安全审查。表单提交数据保留最多 24 个月，除非您要求提前删除。",
      },
      {
        heading: "7. 数据保留",
        body: "我们仅在实现本政策所述目的所需时间内保留个人数据：\n\n• 联系表单提交：最多 24 个月。\n• 资料下载记录：最多 12 个月。\n• 分析数据：由第三方服务提供商的保留策略决定。\n• Cookie 数据：最多 12 个月（语言偏好 Cookie）。",
      },
      {
        heading: "8. 您的权利",
        body: "根据 GDPR 和其他适用的隐私法律，您享有以下权利：\n\n• 访问权：请求获取您的个人数据副本。\n• 更正权：请求更正不准确的数据。\n• 删除权：请求删除您的个人数据。\n• 限制处理权：请求限制数据处理。\n• 数据可携带权：以结构化格式接收您的数据。\n• 反对权：反对基于合法利益的处理。\n• 撤回同意权：随时撤回同意。\n\n如需行使这些权利，请通过 sales@solarstoragepro.com 联系我们。",
      },
      {
        heading: "9. 国际数据传输",
        body: "您的数据可能被传输至您居住国以外的国家进行处理，包括中国和美国。我们确保此类传输具有适当的保障措施，包括适用的标准合同条款。",
      },
      {
        heading: "10. 儿童隐私",
        body: "我们的网站面向企业对企业（B2B）用途，不针对 18 岁以下的个人。我们不会故意收集未成年人的个人数据。如果您认为我们收集了未成年人的数据，请立即联系我们。",
      },
      {
        heading: "11. 政策变更",
        body: "我们可能会不时更新本隐私政策。如有重大变更，我们将在本页面发布更新后的政策并更新“最后更新”日期。我们建议您定期查阅本政策。",
      },
      {
        heading: "12. 联系我们",
        body: "如果您对本隐私政策或我们的数据处理方式有任何疑问，请联系：\n\nSolarStoragePro\n邮箱：sales@solarstoragepro.com\n电话：+86 13967483968\n地址：中国浙江省台州市",
      },
    ],
  },
};

export default function PrivacyPolicyPage() {
  const { locale } = useLocaleContext();
  const copy = COPY[locale] || COPY.en;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Hero */}
        <div className="bg-slate-900 py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <span className="inline-block rounded-full bg-brand-600/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-400">
              {copy.badge}
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-3 text-sm text-slate-400">{copy.lastUpdated}</p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <div className="space-y-8">
            {copy.sections.map((section, i) => (
              <section key={i}>
                <h2 className="mb-3 text-xl font-bold text-slate-900">
                  {section.heading}
                </h2>
                <div className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

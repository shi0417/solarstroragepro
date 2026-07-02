"use client";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useLocaleContext } from "@/components/site/LocaleProvider";

const COPY: Record<string, {
  badge: string;
  title: string;
  lastUpdated: string;
  intro: string;
  tableHeaders: { type: string; name: string; purpose: string; duration: string };
  tableRows: { type: string; name: string; purpose: string; duration: string }[];
  sections: { heading: string; body: string }[];
}> = {
  en: {
    badge: "Legal",
    title: "Cookie Policy",
    lastUpdated: "Last updated: July 2, 2026",
    intro: "This Cookie Policy explains how SolarStoragePro uses cookies and similar tracking technologies on solarstoragepro.com. Cookies are small text files placed on your device when you visit a website. They help us provide a better user experience, analyze site traffic, and deliver relevant advertising.",
    tableHeaders: { type: "Type", name: "Cookie / Technology", purpose: "Purpose", duration: "Duration" },
    tableRows: [
      { type: "Essential", name: "SSP_LOCALE", purpose: "Stores your language preference", duration: "12 months" },
      { type: "Analytics", name: "Google Tag Manager (_ga, _gid)", purpose: "Tracks page views and user sessions for analytics", duration: "24 months / 24 hours" },
      { type: "Advertising", name: "Google Ads (_gcl_au)", purpose: "Remarketing and conversion tracking for Google Ads", duration: "90 days" },
      { type: "Advertising", name: "Meta Pixel (_fbp)", purpose: "Facebook/Meta advertising analytics and conversion tracking", duration: "90 days" },
      { type: "Analytics", name: "GTM dataLayer", purpose: "Container for firing analytics and ad tags via Google Tag Manager", duration: "Session" },
    ],
    sections: [
      {
        heading: "1. Types of Cookies We Use",
        body: "We use the following categories of cookies:\n\n• Essential cookies: Required for the basic functionality of the website, such as remembering your language preference. These cannot be disabled.\n• Analytics cookies: Help us understand how visitors interact with our website by collecting and reporting information anonymously.\n• Advertising cookies: Used by Google Ads and Meta (Facebook) to deliver relevant ads and measure the effectiveness of advertising campaigns.",
      },
      {
        heading: "2. Google Tag Manager",
        body: "We use Google Tag Manager (GTM) to manage and deploy tracking tags on our website. GTM itself does not store personal data but acts as a container that loads tags for Google Analytics, Google Ads, and Meta Pixel. The GTM container ID is GTM-MKHQ69MQ.",
      },
      {
        heading: "3. Managing Cookies",
        body: "You can control and delete cookies through your browser settings. Most browsers allow you to:\n\n• View all cookies stored on your device.\n• Block all cookies or only third-party cookies.\n• Delete existing cookies.\n• Set preferences for specific websites.\n\nNote that blocking essential cookies may affect the functionality of our website. Blocking analytics and advertising cookies will not affect your ability to use the Site but will limit our ability to analyze usage and deliver relevant content.",
      },
      {
        heading: "4. Browser-Specific Instructions",
        body: "To manage cookies in your specific browser, refer to the following links:\n\n• Google Chrome: Settings > Privacy and security > Cookies and other site data\n• Mozilla Firefox: Settings > Privacy & Security > Cookies and Site Data\n• Safari: Preferences > Privacy > Cookies and website data\n• Microsoft Edge: Settings > Cookies and site permissions\n• iOS Safari: Settings > Safari > Block All Cookies\n• Android Chrome: Settings > Site settings > Cookies",
      },
      {
        heading: "5. Third-Party Cookie Policies",
        body: "The third-party services we use have their own cookie and privacy policies:\n\n• Google Privacy & Terms: https://policies.google.com/technologies/cookies\n• Meta Cookie Policy: https://www.facebook.com/policies/cookies\n\nWe encourage you to review these policies for detailed information about how these services use cookies.",
      },
      {
        heading: "6. Do Not Track Signals",
        body: "Some browsers offer a \"Do Not Track\" (DNT) feature. Our Site does not currently respond to DNT signals. However, you can manage cookies through your browser settings as described above.",
      },
      {
        heading: "7. Updates to This Policy",
        body: "We may update this Cookie Policy as we change our cookie usage or as required by applicable laws. We will post the updated policy on this page with a revised \"Last updated\" date.",
      },
      {
        heading: "8. Contact Us",
        body: "If you have questions about our use of cookies, please contact:\n\nSolarStoragePro\nEmail: sales@solarstoragepro.com\nPhone: +86 13967483968\nAddress: Taizhou, Zhejiang, China",
      },
    ],
  },
  zh: {
    badge: "法律信息",
    title: "Cookie 政策",
    lastUpdated: "最后更新：2026年7月2日",
    intro: "本 Cookie 政策说明了 SolarStoragePro 如何在 solarstoragepro.com 上使用 Cookie 和类似追踪技术。Cookie 是您访问网站时放置在您设备上的小型文本文件。它们帮助我们提供更好的用户体验、分析网站流量并投放相关广告。",
    tableHeaders: { type: "类型", name: "Cookie / 技术", purpose: "用途", duration: "存续期" },
    tableRows: [
      { type: "必要", name: "SSP_LOCALE", purpose: "存储您的语言偏好", duration: "12 个月" },
      { type: "分析", name: "Google Tag Manager (_ga, _gid)", purpose: "追踪页面浏览和用户会话以进行分析", duration: "24 个月 / 24 小时" },
      { type: "广告", name: "Google Ads (_gcl_au)", purpose: "Google Ads 再营销和转化追踪", duration: "90 天" },
      { type: "广告", name: "Meta Pixel (_fbp)", purpose: "Facebook/Meta 广告分析和转化追踪", duration: "90 天" },
      { type: "分析", name: "GTM dataLayer", purpose: "通过 Google Tag Manager 触发分析和广告标签的容器", duration: "会话" },
    ],
    sections: [
      {
        heading: "1. 我们使用的 Cookie 类型",
        body: "我们使用以下类别的 Cookie：\n\n• 必要 Cookie：网站基本功能所需，例如记住您的语言偏好。这些 Cookie 无法禁用。\n• 分析 Cookie：通过匿名收集和报告信息帮助我们了解访客如何与网站交互。\n• 广告 Cookie：由 Google Ads 和 Meta（Facebook）用于投放相关广告并衡量广告活动效果。",
      },
      {
        heading: "2. Google Tag Manager",
        body: "我们使用 Google Tag Manager (GTM) 来管理和部署网站上的追踪标签。GTM 本身不存储个人数据，但充当加载 Google Analytics、Google Ads 和 Meta Pixel 标签的容器。GTM 容器 ID 为 GTM-MKHQ69MQ。",
      },
      {
        heading: "3. 管理 Cookie",
        body: "您可以通过浏览器设置控制和删除 Cookie。大多数浏览器允许您：\n\n• 查看存储在您设备上的所有 Cookie。\n• 阻止所有 Cookie 或仅阻止第三方 Cookie。\n• 删除现有 Cookie。\n• 为特定网站设置偏好。\n\n请注意，阻止必要 Cookie 可能会影响我们网站的功能。阻止分析和广告 Cookie 不会影响您使用本站的能力，但会限制我们分析使用情况和投放相关内容的能力。",
      },
      {
        heading: "4. 浏览器特定说明",
        body: "要在您的特定浏览器中管理 Cookie，请参考以下链接：\n\n• Google Chrome：设置 > 隐私和安全 > Cookie 及其他网站数据\n• Mozilla Firefox：设置 > 隐私与安全 > Cookie 和网站数据\n• Safari：偏好设置 > 隐私 > Cookie 和网站数据\n• Microsoft Edge：设置 > Cookie 和网站权限\n• iOS Safari：设置 > Safari > 阻止所有 Cookie\n• Android Chrome：设置 > 网站设置 > Cookie",
      },
      {
        heading: "5. 第三方 Cookie 政策",
        body: "我们使用的第三方服务有其自己的 Cookie 和隐私政策：\n\n• Google 隐私与条款：https://policies.google.com/technologies/cookies\n• Meta Cookie 政策：https://www.facebook.com/policies/cookies\n\n我们建议您查阅这些政策以获取有关这些服务如何使用 Cookie 的详细信息。",
      },
      {
        heading: "6. 请勿追踪信号",
        body: "某些浏览器提供“请勿追踪”(DNT) 功能。本站目前不响应 DNT 信号。但是，您可以如上所述通过浏览器设置管理 Cookie。",
      },
      {
        heading: "7. 政策更新",
        body: "随着我们改变 Cookie 使用方式或适用法律的要求，我们可能会更新本 Cookie 政策。我们将在本页面发布更新后的政策，并修订“最后更新”日期。",
      },
      {
        heading: "8. 联系我们",
        body: "如果您对我们的 Cookie 使用有任何疑问，请联系：\n\nSolarStoragePro\n邮箱：sales@solarstoragepro.com\n电话：+86 13967483968\n地址：中国浙江省台州市",
      },
    ],
  },
};

export default function CookiePolicyPage() {
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
          {/* Intro */}
          <p className="mb-8 text-sm leading-relaxed text-slate-600">
            {copy.intro}
          </p>

          {/* Cookie table */}
          <div className="mb-10 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-xs uppercase tracking-wider text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">{copy.tableHeaders.type}</th>
                  <th className="px-4 py-3 font-semibold">{copy.tableHeaders.name}</th>
                  <th className="px-4 py-3 font-semibold">{copy.tableHeaders.purpose}</th>
                  <th className="px-4 py-3 font-semibold">{copy.tableHeaders.duration}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {copy.tableRows.map((row, i) => (
                  <tr key={i} className="bg-white">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.type}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-700">{row.name}</td>
                    <td className="px-4 py-3 text-slate-600">{row.purpose}</td>
                    <td className="px-4 py-3 text-slate-600">{row.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sections */}
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

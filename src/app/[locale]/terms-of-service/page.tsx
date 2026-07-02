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
    title: "Terms of Service",
    lastUpdated: "Last updated: July 2, 2026",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        body: "By accessing and using solarstoragepro.com (the \"Site\"), you agree to be bound by these Terms of Service (\"Terms\"). If you do not agree with any part of these Terms, please do not use our Site. These Terms constitute a legally binding agreement between you and SolarStoragePro (\"we\", \"us\", or \"our\").",
      },
      {
        heading: "2. Company Information",
        body: "SolarStoragePro is a battery energy storage system manufacturer based in Taizhou, Zhejiang, China. For detailed company information, please refer to our Imprint / Legal Notice page.",
      },
      {
        heading: "3. Use of the Site",
        body: "You may use our Site for lawful purposes only. You agree not to:\n\n• Use the Site in any way that violates applicable laws or regulations.\n• Attempt to gain unauthorized access to our systems, databases, or data.\n• Interfere with or disrupt the Site's operation, including introducing viruses or malicious code.\n• Scrape, copy, or republish Site content without our written permission.\n• Use automated tools (bots, crawlers) to extract data without authorization.\n• Misrepresent your identity or affiliation with any person or entity.",
      },
      {
        heading: "4. Product Information Disclaimer",
        body: "All product specifications, technical data, performance metrics, and pricing information displayed on this Site are provided for informational purposes only and do not constitute a binding offer or contract. Product specifications may change without prior notice due to continuous product improvement. For binding specifications, please request a formal quotation. Images shown may differ from actual products. Availability is subject to confirmation at the time of order.",
      },
      {
        heading: "5. Intellectual Property",
        body: "All content on this Site, including but not limited to text, graphics, logos, product designs, technical documents, and software, is the property of SolarStoragePro or its content suppliers and is protected by international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without our express written consent.",
      },
      {
        heading: "6. Trademarks",
        body: "The SolarStoragePro name, logo, and all related marks are trademarks of SolarStoragePro. All other trademarks, service marks, and trade names referenced on this Site are the property of their respective owners. Nothing on this Site grants any license or right to use any trademark without prior written permission.",
      },
      {
        heading: "7. Third-Party Links",
        body: "Our Site may contain links to third-party websites that are not owned or controlled by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites. You acknowledge and agree that we are not liable for any damage or loss caused by your use of any third-party website.",
      },
      {
        heading: "8. Limitation of Liability",
        body: "To the maximum extent permitted by applicable law, SolarStoragePro and its suppliers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, business opportunities, or goodwill, arising out of or related to your use of or inability to use the Site. The Site is provided on an \"as is\" and \"as available\" basis without warranties of any kind.",
      },
      {
        heading: "9. No Warranty",
        body: "We do not warrant that the Site will be uninterrupted, error-free, or free of harmful components. We make no representations or warranties regarding the accuracy, completeness, or reliability of any information on the Site. Any reliance on such information is at your own risk.",
      },
      {
        heading: "10. Indemnification",
        body: "You agree to indemnify and hold harmless SolarStoragePro, its officers, directors, employees, and agents from any claims, damages, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of your use of the Site or your violation of these Terms.",
      },
      {
        heading: "11. Governing Law and Dispute Resolution",
        body: "These Terms shall be governed by and construed in accordance with the laws of the People's Republic of China, without regard to its conflict of law provisions. Any dispute arising out of or relating to these Terms or the use of the Site shall first be resolved through good-faith negotiation. If the dispute cannot be resolved through negotiation within 60 days, it shall be submitted to arbitration under the China International Economic and Trade Arbitration Commission (CIETAC) rules in Shanghai, China.",
      },
      {
        heading: "12. Changes to Terms",
        body: "We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of the Site after any changes constitutes acceptance of the revised Terms. We encourage you to review these Terms periodically.",
      },
      {
        heading: "13. Contact Us",
        body: "If you have questions about these Terms of Service, please contact:\n\nSolarStoragePro\nEmail: sales@solarstoragepro.com\nPhone: +86 13967483968\nAddress: Taizhou, Zhejiang, China",
      },
    ],
  },
  zh: {
    badge: "法律信息",
    title: "使用条款",
    lastUpdated: "最后更新：2026年7月2日",
    sections: [
      {
        heading: "1. 条款接受",
        body: "访问和使用 solarstoragepro.com（“本站”）即表示您同意受本使用条款（“条款”）约束。如果您不同意本条款的任何部分，请不要使用本站。本条款构成您与 SolarStoragePro（“我们”）之间具有法律约束力的协议。",
      },
      {
        heading: "2. 公司信息",
        body: "SolarStoragePro 是一家总部位于中国浙江台州的电池储能系统制造商。有关详细的公司信息，请参阅我们的法律声明页面。",
      },
      {
        heading: "3. 网站使用",
        body: "您只能出于合法目的使用本站。您同意不会：\n\n• 以违反适用法律或法规的方式使用本站。\n• 尝试未经授权访问我们的系统、数据库或数据。\n• 干扰或破坏本站的运营，包括引入病毒或恶意代码。\n• 未经我们书面许可抓取、复制或重新发布本站内容。\n• 未经授权使用自动化工具（机器人、爬虫）提取数据。\n• 虚假陈述您的身份或与任何个人或实体的关联关系。",
      },
      {
        heading: "4. 产品信息免责声明",
        body: "本站显示的所有产品规格、技术数据、性能指标和价格信息仅供参考，不构成具有约束力的要约或合同。由于产品的持续改进，产品规格可能随时更改，恕不另行通知。如需具有约束力的规格，请索取正式报价单。所显示的图片可能与实际产品有所不同。产品供应以订单确认时为准。",
      },
      {
        heading: "5. 知识产权",
        body: "本站上的所有内容，包括但不限于文本、图形、徽标、产品设计、技术文档和软件，均为 SolarStoragePro 或其内容供应商的财产，受国际版权、商标和其他知识产权法保护。未经我们明确书面同意，您不得复制、分发或创作我们内容的衍生作品。",
      },
      {
        heading: "6. 商标",
        body: "SolarStoragePro 名称、徽标和所有相关标记均为 SolarStoragePro 的商标。本站引用的所有其他商标、服务标记和商号均为其各自所有者的财产。本站上的任何内容均不授予未经事先书面许可使用任何商标的许可或权利。",
      },
      {
        heading: "7. 第三方链接",
        body: "本站可能包含指向非我们拥有或控制的第三方网站的链接。我们无法控制且不对任何第三方网站的内容、隐私政策或操作实践承担责任。您承认并同意，对于因您使用任何第三方网站而造成的任何损害或损失，我们不承担责任。",
      },
      {
        heading: "8. 责任限制",
        body: "在适用法律允许的最大范围内，SolarStoragePro 及其供应商对因您使用或无法使用本站而产生的任何间接、附带、特殊、后果性或惩罚性损害不承担责任，包括但不限于利润损失、数据丢失、商业机会损失或商誉损失。本站以“原样”和“可用”基础提供，不提供任何形式的保证。",
      },
      {
        heading: "9. 不保证",
        body: "我们不保证本站不会中断、没有错误或不含 harmful 组件。我们不对本站任何信息的准确性、完整性或可靠性作出任何声明或保证。任何对此类信息的信赖均由您自行承担风险。",
      },
      {
        heading: "10. 赔偿",
        body: "您同意赔偿并使 SolarStoragePro 及其高管、董事、员工和代理人免受因您使用本站或违反本条款而产生的任何索赔、损害、责任、费用和开支（包括合理的律师费）的损害。",
      },
      {
        heading: "11. 适用法律和争议解决",
        body: "本条款受中华人民共和国法律管辖并据其解释，不涉及其法律冲突条款。因本条款或本站使用引起的或与之相关的任何争议，应首先通过善意协商解决。如争议在 60 天内无法通过协商解决，应提交中国国际经济贸易仲裁委员会（CIETAC）在上海按其规则进行仲裁。",
      },
      {
        heading: "12. 条款变更",
        body: "我们保留随时修改本条款的权利。变更将在本页面发布后立即生效。您在任何变更后继续使用本站即表示接受修订后的条款。我们建议您定期查阅本条款。",
      },
      {
        heading: "13. 联系我们",
        body: "如果您对本使用条款有任何疑问，请联系：\n\nSolarStoragePro\n邮箱：sales@solarstoragepro.com\n电话：+86 13967483968\n地址：中国浙江省台州市",
      },
    ],
  },
};

export default function TermsOfServicePage() {
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

"use client";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useLocaleContext } from "@/components/site/LocaleProvider";
import { siteContact } from "@/lib/site-config";

const COPY: Record<string, {
  badge: string;
  title: string;
  lastUpdated: string;
  intro: string;
  sections: { heading: string; body: string }[];
}> = {
  en: {
    badge: "Legal",
    title: "Imprint / Legal Notice",
    lastUpdated: "Last updated: July 2, 2026",
    intro: "This legal notice (Imprint) is provided in accordance with applicable commercial and consumer protection laws, including the German Telemedia Act (TMG) and the EU Services Directive.",
    sections: [
      {
        heading: "1. Company Information",
        body: "SolarStoragePro\nBattery Energy Storage System Manufacturer\n\nAddress: Taizhou, Zhejiang Province, China\nPhone: +86 13967483968\nEmail: sales@solarstoragepro.com\nWebsite: solarstoragepro.com",
      },
      {
        heading: "2. Business Registration",
        body: "SolarStoragePro operates as a battery energy storage system manufacturer and exporter. The company is registered in the People's Republic of China and complies with Chinese commercial registration requirements. Business registration details are available upon request.",
      },
      {
        heading: "3. Authorized Representative",
        body: "For inquiries regarding business partnerships, product orders, or legal matters, please contact:\n\nEmail: sales@solarstoragepro.com\nPhone: +86 13967483968\nBusiness hours: Monday to Friday, 9:00 AM - 6:00 PM (GMT+8, China Standard Time)",
      },
      {
        heading: "4. VAT / Tax Information",
        body: "Applicable tax registration numbers and VAT identification numbers will be provided on formal quotations and commercial invoices. For EU customers requiring a VAT identification number for reverse-charge arrangements, please specify this requirement in your inquiry.",
      },
      {
        heading: "5. Product Liability and Regulatory Compliance",
        body: "Our battery energy storage products comply with the following international standards and certifications:\n\n• IEC 62619: Safety requirements for secondary lithium cells and batteries\n• UN38.3: Transport safety testing for lithium batteries\n• GB/T 36276-2023: Chinese national standard for lithium-ion battery energy storage\n• CE: European conformity marking\n• IEC 60730: Automatic electrical controls for household and similar use\n\nProduct certification documents are available upon request for verified customers.",
      },
      {
        heading: "6. Dispute Resolution",
        body: "The European Commission provides a platform for online dispute resolution (ODR), which is available at https://ec.europa.eu/consumers/odr/. We are not obligated or willing to participate in dispute resolution proceedings before a consumer arbitration body. Commercial disputes shall be resolved in accordance with the dispute resolution clause in our Terms of Service.",
      },
      {
        heading: "7. Responsible for Content",
        body: "Responsible for the content of this website:\n\nSolarStoragePro Marketing Department\nEmail: sales@solarstoragepro.com\nPhone: +86 13967483968",
      },
      {
        heading: "8. Copyright and Trademark Notice",
        body: "All content on this website, including text, images, graphics, logos, and technical documents, is protected by copyright. Any reproduction, distribution, or other use without the express written consent of SolarStoragePro is prohibited. \"SolarStoragePro\" and the SolarStoragePro logo are trademarks of SolarStoragePro.",
      },
      {
        heading: "9. Liability for Links",
        body: "Our website may contain links to external websites. We have no influence on the content of these external websites and therefore cannot guarantee their correctness or completeness. The respective provider or operator of the linked pages is always responsible for their content.",
      },
      {
        heading: "10. Applicable Law",
        body: "The laws of the People's Republic of China apply to this legal notice and all legal relationships between SolarStoragePro and users of this website. For cross-border commercial transactions, the applicable law shall be specified in the respective commercial agreement.",
      },
    ],
  },
  zh: {
    badge: "法律信息",
    title: "法律声明 / Imprint",
    lastUpdated: "最后更新：2026年7月2日",
    intro: "本法律声明（Impressum）根据适用的商业和消费者保护法律法规提供，包括德国《电信媒体法》（TMG）和欧盟服务指令的要求。",
    sections: [
      {
        heading: "1. 公司信息",
        body: "SolarStoragePro\n电池储能系统制造商\n\n地址：中国浙江省台州市\n电话：+86 13967483968\n邮箱：sales@solarstoragepro.com\n网站：solarstoragepro.com",
      },
      {
        heading: "2. 营业登记",
        body: "SolarStoragePro 作为电池储能系统制造商和出口商运营。公司在中国人民共和国注册，符合中国商业登记要求。营业登记详情可应要求提供。",
      },
      {
        heading: "3. 授权代表",
        body: "有关商业合作、产品订单或法律事务的咨询，请联系：\n\n邮箱：sales@solarstoragepro.com\n电话：+86 13967483968\n营业时间：周一至周五，上午 9:00 - 下午 6:00（GMT+8，中国标准时间）",
      },
      {
        heading: "4. 增值税 / 税务信息",
        body: "适用的税务登记号和增值税识别号将在正式报价单和商业发票上提供。对于需要增值税识别号以适用逆向征税安排的欧盟客户，请在询盘中注明此要求。",
      },
      {
        heading: "5. 产品责任和法规合规",
        body: "我们的电池储能产品符合以下国际标准和认证：\n\n• IEC 62619：二次锂电芯和电池安全要求\n• UN38.3：锂电池运输安全测试\n• GB/T 36276-2023：中国锂离子电池储能国家标准\n• CE：欧洲合格评定标志\n• IEC 60730：家用和类似用途自动电气控制\n\n经验证客户可应要求提供产品认证文件。",
      },
      {
        heading: "6. 争议解决",
        body: "欧盟委员会提供在线争议解决平台（ODR），可访问 https://ec.europa.eu/consumers/odr/。我们无义务也不愿意参与消费者仲裁机构的争议解决程序。商业争议应根据使用条款中的争议解决条款解决。",
      },
      {
        heading: "7. 内容负责人",
        body: "本网站内容负责人：\n\nSolarStoragePro 市场部\n邮箱：sales@solarstoragepro.com\n电话：+86 13967483968",
      },
      {
        heading: "8. 版权和商标声明",
        body: "本网站的所有内容，包括文本、图片、图形、徽标和技术文档，均受版权保护。未经 SolarStoragePro 明确书面同意，不得复制、分发或以其他方式使用。“SolarStoragePro” 和 SolarStoragePro 徽标是 SolarStoragePro 的商标。",
      },
      {
        heading: "9. 链接责任",
        body: "本网站可能包含指向外部网站的链接。我们无法影响这些外部网站的内容，因此不能保证其正确性或完整性。链接页面的各自提供商或运营商始终对其内容负责。",
      },
      {
        heading: "10. 适用法律",
        body: "中华人民共和国法律适用于本法律声明以及 SolarStoragePro 与本网站用户之间的所有法律关系。对于跨境商业交易，适用法律应在相应的商业协议中明确规定。",
      },
    ],
  },
};

export default function ImprintPage() {
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

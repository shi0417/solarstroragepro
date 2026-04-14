"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Zap } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";

type CaseDetail = {
  titleEn: string;
  titleZh: string;
  locationEn: string;
  locationZh: string;
  date: string;
  capacity: string;
  imageSrc: string;
  contentEn: [string, string, string];
  contentZh: [string, string, string];
  testimonialEn?: string;
  testimonialZh?: string;
  author?: string;
};

const CASE_DETAILS: Record<string, CaseDetail> = {
  "australia-nsw-macquarie-park": {
    titleEn: "AIKO ABC High-Efficiency Technology Empowers Rooftop Canopies",
    titleZh: "AIKO ABC 高效技术赋能屋顶光伏车棚",
    locationEn: "Macquarie Park, NSW, Australia",
    locationZh: "澳大利亚新南威尔士州麦考瑞公园",
    date: "2026-03-24",
    capacity: "300 kW",
    imageSrc: "/images/cases/case-australia-macquarie-park.webp",
    contentEn: [
      "Smart Commercial Energy and Canyon Solar installed 300kW of high-efficiency AIKO Neostar solar panels across a modular prefabricated canopy at AstraZeneca's Macquarie Park campus, unlocking significant additional on-site energy generation when roof space was fully exhausted.",
      "The challenge was to deliver significant energy output within the existing campus footprint while installing it fast, safely, and with minimal disruption to staff parking.",
      "The innovative prefab design enabled installation in just 5 weeks, more than 3X faster than traditional in-situ methods, while delivering an extra 20kWp of capacity (7% additional output) compared to standard bi-facial panels.",
    ],
    contentZh: [
      "Smart Commercial Energy 和 Canyon Solar 在阿斯利康麦考瑞公园园区的模块化预制车棚上安装了 300kW 高效 AIKO Neostar 太阳能组件，在屋顶空间耗尽的情况下，释放了大量额外的现场能源发电能力。",
      "项目面临的挑战是在现有园区占地面积内提供显著的能源输出，同时安装速度快、安全，且对员工停车的干扰降至最低。",
      "创新的预制设计使安装仅需 5 周，比传统的现场施工方法快 3 倍以上，同时与标准双面组件相比，额外提供了 20kWp 的容量（增加 7% 的输出）。",
    ],
    testimonialEn:
      "Awesome to get some AIKO panels installed! An extra 20kWp of capacity or 7% just by upgrading the panel from the standard bi-facial panel.",
    testimonialZh:
      "安装 AIKO 组件太棒了！仅仅通过将标准双面组件升级，就获得了额外的 20kWp 容量或 7% 的提升。",
    author: "Will Beaumont, Canyon Solar",
  },
  "datang-guangxi": {
    titleEn: "Datang Guangxi Guiguan Rongan Matian 100MW PV Project",
    titleZh: "大唐广西桂冠融安马田 100MW 光伏项目",
    locationEn: "Rongan, Guangxi, China",
    locationZh: "中国广西融安",
    date: "2026-02-02",
    capacity: "100 MW",
    imageSrc: "/images/cases/case-datang-guangxi.webp",
    contentEn: [
      "As a traditional agricultural county, Rongan in Guangxi urgently needed a new engine for economic growth. This PV project was positioned as a core initiative of the 'Agrarian-to-Industrial' strategy.",
      "Mountainous PV construction must address specific challenges, including difficult terrain, land-use efficiency, policy requirements, and grid absorption pressures. Irregular and limited usable land in mountains requires higher installed capacity within a smaller footprint.",
      "The project installed 158,460 units of AIKO Stellar Series N-type 72-cell ABC Dual-Glass modules, reaching a total capacity of 100MW. In challenging mountainous environments, AIKO ABC modules stand out as the premium performance benchmark.",
    ],
    contentZh: [
      "作为传统的农业县，广西融安急需新的经济增长引擎。该光伏项目被定位为“农业向工业转型”战略的核心举措。",
      "山区光伏建设必须应对特定的挑战，包括复杂的地形、土地利用效率、政策要求和电网消纳压力。山区不规则且有限的可用土地要求在更小的占地面积内实现更高的装机容量。",
      "该项目安装了 158,460 块 AIKO Stellar 系列 N 型 72 版型 ABC 双玻组件，总容量达到 100MW。在充满挑战的山区环境中，AIKO ABC 组件脱颖而出，成为卓越性能的标杆。",
    ],
  },
  "intermarche-beja": {
    titleEn: "How Intermarché Beja Maximized Solar Output in Portugal's Sunniest Region",
    titleZh: "葡萄牙 Intermarché Beja 超市如何最大化太阳能输出",
    locationEn: "Beja, Portugal",
    locationZh: "葡萄牙贝雅",
    date: "2026-03-17",
    capacity: "296.45 kWp",
    imageSrc: "/images/cases/case-intermarche-beja.webp",
    contentEn: [
      "In one of Portugal's hottest regions, the Intermarché supermarket in Beja has successfully transformed its rooftop into a high performance solar plant. Facing intense solar irradiation and high daily electricity demands, the facility required a solution that could maximize energy production while withstanding extreme ambient temperatures.",
      "The primary challenge for Intermarché Beja was the combination of limited rooftop space and the extreme summer heat typical of the Alentejo region. Traditional modules often suffer from significant power drops as temperatures rise.",
      "The supermarket installed a 296.45 kWp system utilizing AIKO's high efficiency N type ABC modules. These modules were selected for their superior temperature coefficient, which allows them to maintain higher output during peak heat compared to conventional technologies.",
    ],
    contentZh: [
      "在葡萄牙最炎热的地区之一，贝雅的 Intermarché 超市成功地将其屋顶改造成了高性能的太阳能电站。面对强烈的太阳辐射和高昂的日常用电需求，该设施需要一种能够在承受极端环境温度的同时最大化能源生产的解决方案。",
      "Intermarché Beja 面临的主要挑战是有限的屋顶空间和阿连特茹地区典型的极端夏季高温的结合。随着温度升高，传统组件通常会遭受显著的功率下降。",
      "该超市安装了 296.45 kWp 的系统，采用了 AIKO 的高效 N 型 ABC 组件。选择这些组件是因为它们具有卓越的温度系数，这使得它们在高温高峰期能够比传统技术保持更高的输出。",
    ],
    testimonialEn:
      "AIKO's modules offer exceptional output, and because they produce their own photovoltaic cells, we have full confidence in the quality. I am producing more energy than I expected. Without a doubt, a premium solution worth the investment.",
    testimonialZh:
      "AIKO 的组件提供了卓越的输出，而且因为他们自己生产光伏电池，我们对质量充满信心。我产生的能量比我预期的要多。毫无疑问，这是一个值得投资的优质解决方案。",
    author: "José Eduardo, CEO of SEM IR, Lda & Mário Nunes, Manager of Intermarché Beja",
  },
  "japan-photovoltaic-power-station": {
    titleEn: "PV power station in Tochigi Prefecture, Japan",
    titleZh: "\u65E5\u672C\u6803\u6728\u53BF\u5149\u4F0F\u7535\u7AD9",
    locationEn: "Tochigi Prefecture, Japan",
    locationZh: "\u65E5\u672C\u6803\u6728\u53BF",
    date: "2024-12-19",
    capacity: "2.1 MW",
    imageSrc: "/images/cases/case-japan-tochigi.webp",
    contentEn: [
      "Located in a valley in Tochigi Prefecture, Japan, this project covers an area of 9,000 square meters and has an installed capacity of 2.1 MW. It is AIKO's first utility power station in Japan, as well as a customized solution for the valley environment.",
      "The surrounding mountainous environment has an impact on the power generation of the power station.",
      "The project utilizes the N-type ABC 610W modules from AIKO, with an installed capacity of 2.1 MW. With their unique superior partial shading optimization function, the ABC modules effectively reduce the impact of the surrounding mountainous environment on the power station, significantly boost power generation, and effectively reduce the cost per watt and O&M input.",
    ],
    contentZh: [
      "\u8BE5\u9879\u76EE\u4F4D\u4E8E\u65E5\u672C\u6803\u6728\u53BF\u7684\u4E00\u4E2A\u5C71\u8C37\u4E2D\uFF0C\u5360\u5730 9,000 \u5E73\u65B9\u7C73\uFF0C\u88C5\u673A\u5BB9\u91CF\u4E3A 2.1 MW\u3002\u8FD9\u662F AIKO \u5728\u65E5\u672C\u7684\u9996\u4E2A\u5730\u9762\u7535\u7AD9\uFF0C\u4E5F\u662F\u9488\u5BF9\u5C71\u8C37\u73AF\u5883\u7684\u5B9A\u5236\u89E3\u51B3\u65B9\u6848\u3002",
      "周围的山区环境对电站的发电量有影响。",
      "该项目采用了 AIKO 的 N 型 ABC 610W 组件，装机容量为 2.1 MW。凭借其独特的卓越局部阴影优化功能，ABC 组件有效降低了周围山区环境对电站的影响，显著提升了发电量，并有效降低了单瓦成本和运维投入。",
    ],
  },
  serfontana: {
    titleEn: "Serfontana Shopping Center Cuts Grid Reliance with 100% Solar Self Consumption",
    titleZh: "Serfontana 购物中心通过 100% 太阳能自发自用减少电网依赖",
    locationEn: "Morbio Inferiore, Switzerland",
    locationZh: "瑞士莫尔比奥因费廖雷",
    date: "2026-03-17",
    capacity: "93.1 kWp",
    imageSrc: "/images/cases/case-serfontana.webp",
    contentEn: [
      "The Serfontana Shopping Center in Morbio Inferiore, Switzerland, has been a retail landmark for over five decades. To secure its energy future, the center commissioned a 93.1 kWp rooftop PV system using AIKO high efficiency Neostar 2P 470 W modules.",
      "Like many busy commercial hubs, Serfontana faces peak electricity demand during the day when retail operations are at their height. However, rooftop space is limited and the site layout presents shading challenges that can hinder traditional solar performance.",
      "The project team selected AIKO N type ABC technology. By switching to AIKO Neostar modules, the team was able to achieve a higher wattage and superior efficiency compared to the original specification. These modules were chosen for their ability to maintain stable performance during summer heat and their increased resistance to partial shading.",
    ],
    contentZh: [
      "位于瑞士莫尔比奥因费廖雷的 Serfontana 购物中心五十多年来一直是零售地标。为了保障其能源未来，该中心委托安装了一个 93.1 kWp 的屋顶光伏系统，使用了 AIKO 高效 Neostar 2P 470 W 组件。",
      "像许多繁忙的商业中心一样，Serfontana 在白天零售业务高峰期面临用电高峰需求。然而，屋顶空间有限，场地布局带来了阴影挑战，这可能会阻碍传统太阳能的性能。",
      "项目团队选择了 AIKO N 型 ABC 技术。通过改用 AIKO Neostar 组件，团队能够实现比原始规格更高的瓦数和卓越的效率。选择这些组件是因为它们能够在夏季高温期间保持稳定的性能，并增强了对局部阴影的抵抗力。",
    ],
    testimonialEn:
      "The choice of the AIKO product was due to the fact that it provided the highest power per square meter on the market at the time of the offer. Another contributing factor was that these modules come with 25 year product warranty and 30 year performance warranties.",
    testimonialZh:
      "选择 AIKO 产品是因为在报价时它提供了市场上每平方米最高的功率。另一个促成因素是这些组件提供 25 年产品保修和 30 年性能保修。",
    author: "Gionata Mongodi, Project Manager of Ecosinergie Tienergy SA",
  },
  "germany-forest-villa": {
    titleEn: "Photovoltaic power generation project for a forest villa in Germany",
    titleZh: "德国森林别墅光伏发电项目",
    locationEn: "Ratingen, Germany",
    locationZh: "德国拉廷根",
    date: "2024-12-19",
    capacity: "9.79 kW",
    imageSrc: "/images/cases/case-germany-forest-villa.webp",
    contentEn: [
      "Located in a distant, forested suburb of Ratingen, Germany, this project has an installed capacity of 9.79 kW and utilizes AIKO's N-type ABC modules to supply self-generated power to the residence and reduce carbon emissions, facilitating the owner's green living.",
      "The rooftop area is limited, and the client requests as much power generation as possible. The installation location is the rooftop of a villa, which requires the aesthetics of the modules. The villa is surrounded by vegetation, resulting in sunlight shading.",
      "The project utilizes the N-type ABC dual-glass Neostar 1S+445W modules from AIKO. With their unique superior partial shading optimization function, the ABC modules minimize the impact of sunlight shading from the dense woods on the power generation by the modules.",
    ],
    contentZh: [
      "该项目位于德国拉廷根一个偏远的森林郊区，装机容量为 9.79 kW，利用 AIKO 的 N 型 ABC 组件为住宅提供自发电力并减少碳排放，促进业主的绿色生活。",
      "屋顶面积有限，客户要求尽可能多的发电量。安装位置是别墅的屋顶，这要求组件具有美观性。别墅周围被植被环绕，导致阳光遮挡。",
      "该项目采用了 AIKO 的 N 型 ABC 双玻 Neostar 1S+445W 组件。凭借其独特的卓越局部阴影优化功能，ABC 组件将茂密树林对组件发电的阳光遮挡影响降至最低。",
    ],
    testimonialEn:
      "Due to the limited roof space available to us, we chose to use the most efficient modules on the market, which happen to be AIKO's. It was crucial for both my wife and me to have sleek modules that blend seamlessly into the roof.",
    testimonialZh:
      "由于我们可用的屋顶空间有限，我们选择使用市场上最高效的组件，碰巧就是 AIKO 的。对我妻子和我来说，拥有能够无缝融入屋顶的时尚组件至关重要。",
    author: "Alexander Meyer, House owner",
  },
};

export default function CaseDetailPage() {
  const params = useParams();
  const rawId = params?.id;
  const id = typeof rawId === "string" ? rawId : Array.isArray(rawId) ? rawId[0] : undefined;

  const { locale } = useLocaleContext();
  const isZh = locale === "zh";

  const caseData = id ? CASE_DETAILS[id] : undefined;

  if (!caseData) {
    notFound();
  }

  const ui = isZh
    ? {
        back: "返回案例列表",
        location: "项目地点",
        capacity: "装机容量",
        date: "并网时间",
        challenge: "项目挑战",
        solution: "解决方案",
        testimonial: "客户评价",
      }
    : {
        back: "Back to cases",
        location: "Location",
        capacity: "Capacity",
        date: "Grid Connection",
        challenge: "Challenge",
        solution: "Solution",
        testimonial: "Testimonial",
      };

  const content = isZh ? caseData.contentZh : caseData.contentEn;

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main className="pb-20">
        <div className="relative h-[40vh] min-h-[300px] w-full sm:h-[50vh]">
          <Image
            src={caseData.imageSrc}
            alt={isZh ? caseData.titleZh : caseData.titleEn}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0">
            <div className="mx-auto max-w-4xl px-4 pb-10 sm:px-6">
              <Link
                href="/case-center"
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-solar-400"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                {ui.back}
              </Link>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                {isZh ? caseData.titleZh : caseData.titleEn}
              </h1>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6">
          <div className="mb-12 grid grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-solar-500/20 text-solar-400">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">{ui.location}</p>
                <p className="text-sm font-medium text-white">
                  {isZh ? caseData.locationZh : caseData.locationEn}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-solar-500/20 text-solar-400">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">{ui.capacity}</p>
                <p className="text-sm font-medium text-white">{caseData.capacity}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-solar-500/20 text-solar-400">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">{ui.date}</p>
                <p className="text-sm font-medium text-white">{caseData.date}</p>
              </div>
            </div>
          </div>

          <article className="max-w-none space-y-4 text-slate-300">
            <p className="text-lg leading-relaxed text-slate-200">{content[0]}</p>

            <h3 className="mt-10 text-xl font-semibold text-white">{ui.challenge}</h3>
            <p className="leading-relaxed">{content[1]}</p>

            <h3 className="mt-10 text-xl font-semibold text-white">{ui.solution}</h3>
            <p className="leading-relaxed">{content[2]}</p>

            {caseData.testimonialEn && caseData.testimonialZh && caseData.author ? (
              <div className="mt-12 rounded-2xl border-l-4 border-solar-500 bg-solar-500/5 p-6 sm:p-8">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-solar-400">
                  {ui.testimonial}
                </h3>
                <blockquote className="border-none pl-0 text-lg italic text-slate-200">
                  {isZh ? caseData.testimonialZh : caseData.testimonialEn}
                </blockquote>
                <p className="mt-4 text-sm font-medium text-slate-400">— {caseData.author}</p>
              </div>
            ) : null}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}

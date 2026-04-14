export type CaseStudy = {
  id: string;
  titleEn: string;
  titleZh: string;
  date: string;
  imageSrc: string;
  descEn: string;
  descZh: string;
  stats: { labelEn: string; labelZh: string; value: string; icon: string }[];
};

export const CASES: CaseStudy[] = [
  {
    id: "australia-nsw-macquarie-park",
    titleEn: "AIKO ABC High-Efficiency Technology Empowers Rooftop Canopies",
    titleZh: "AIKO ABC 高效技术赋能屋顶光伏车棚",
    date: "2026-03-24",
    imageSrc: "/images/cases/case-australia-macquarie-park.webp",
    descEn:
      "Smart Commercial Energy and Canyon Solar installed 300kW of high-efficiency AIKO Neostar solar panels across a modular prefabricated canopy at AstraZeneca's Macquarie Park campus, unlocking significant additional on-site energy generation when roof space was fully exhausted.",
    descZh:
      "Smart Commercial Energy 和 Canyon Solar 在阿斯利康麦考瑞公园园区的模块化预制车棚上安装了 300kW 高效 AIKO Neostar 太阳能组件，在屋顶空间耗尽的情况下，释放了大量额外的现场能源发电能力。",
    stats: [
      { labelEn: "Annual Power Generation", labelZh: "年发电量", value: "358,670 kWh", icon: "\u26A1" },
      { labelEn: "Annual CO\u2082 Reduction", labelZh: "年减排二氧化碳", value: "165 tons", icon: "\uD83C\uDF31" },
      { labelEn: "Annual Savings", labelZh: "年节省电费", value: "35,867 AUD", icon: "\uD83D\uDCB0" },
    ],
  },
  {
    id: "datang-guangxi",
    titleEn: "Datang Guangxi Guiguan Rongan Matian 100MW PV Project",
    titleZh: "大唐广西桂冠融安马田 100MW 光伏项目",
    date: "2026-02-02",
    imageSrc: "/images/cases/case-datang-guangxi.webp",
    descEn:
      "The project installed 158,460 units of AIKO Stellar Series N-type 72-cell ABC Dual-Glass modules, reaching a total capacity of 100MW. In challenging mountainous environments, AIKO ABC modules stand out as the premium performance benchmark.",
    descZh:
      "该项目安装了 158,460 块 AIKO Stellar 系列 N 型 72 版型 ABC 双玻组件，总容量达到 100MW。在充满挑战的山区环境中，AIKO ABC 组件脱颖而出，成为卓越性能的标杆。",
    stats: [
      { labelEn: "Annual Power Generation", labelZh: "年发电量", value: "100 million kWh", icon: "\u26A1" },
      { labelEn: "Annual CO\u2082 Reduction", labelZh: "年减排二氧化碳", value: "53,660 tons", icon: "\uD83C\uDF31" },
      {
        labelEn: "Equivalent to Tree Planting",
        labelZh: "等效植树",
        value: "158,417 trees",
        icon: "\uD83C\uDF33",
      },
    ],
  },
  {
    id: "intermarche-beja",
    titleEn: "How Intermarch\u00E9 Beja Maximized Solar Output in Portugal's Sunniest Region",
    titleZh: "葡萄牙 Intermarch\u00E9 Beja 超市如何最大化太阳能输出",
    date: "2026-03-17",
    imageSrc: "/images/cases/case-intermarche-beja.webp",
    descEn:
      "The move to AIKO ABC technology delivered measurable performance gains and financial security over standard TOPCon alternatives. The project achieved 12.25 kWp more capacity within the same rooftop area compared to TOPCon modules.",
    descZh:
      "\u91C7\u7528 AIKO ABC \u6280\u672F\u5E26\u6765\u4E86\u6BD4\u6807\u51C6 TOPCon \u66FF\u4EE3\u65B9\u6848\u66F4\u663E\u8457\u7684\u6027\u80FD\u63D0\u5347\u548C\u8D22\u52A1\u4FDD\u969C\u3002\u4E0E TOPCon \u7EC4\u4EF6\u76F8\u6BD4\uFF0C\u8BE5\u9879\u76EE\u5728\u76F8\u540C\u7684\u5C4B\u9876\u9762\u79EF\u5185\u5B9E\u73B0\u4E86 12.25 kWp \u7684\u989D\u5916\u5BB9\u91CF\u3002",
    stats: [
      { labelEn: "Annual Power Generation", labelZh: "\u5E74\u53D1\u7535\u91CF", value: "515.8 MWh", icon: "\u26A1" },
      { labelEn: "Annual CO\u2082 Reduction", labelZh: "\u5E74\u51CF\u6392\u4E8C\u6C27\u5316\u78B3", value: "277 tons", icon: "\uD83C\uDF31" },
      { labelEn: "Equivalent to Tree Planting", labelZh: "\u7B49\u6548\u690D\u6811", value: "818 trees", icon: "\uD83C\uDF33" },
    ],
  },
  {
    id: "japan-photovoltaic-power-station",
    titleEn: "PV power station in Tochigi Prefecture, Japan",
    titleZh: "\u65E5\u672C\u6803\u6728\u53BF\u5149\u4F0F\u7535\u7AD9",
    date: "2024-12-19",
    imageSrc: "/images/cases/case-japan-tochigi.webp",
    descEn:
      "Located in a valley in Tochigi Prefecture, Japan, this project covers an area of 9,000 square meters and has an installed capacity of 2.1 MW. It is AIKO's first utility power station in Japan, as well as a customized solution for the valley environment.",
    descZh:
      "\u8BE5\u9879\u76EE\u4F4D\u4E8E\u65E5\u672C\u6803\u6728\u53BF\u7684\u4E00\u4E2A\u5C71\u8C37\u4E2D\uFF0C\u5360\u5730 9,000 \u5E73\u65B9\u7C73\uFF0C\u88C5\u673A\u5BB9\u91CF\u4E3A 2.1 MW\u3002\u8FD9\u662F AIKO \u5728\u65E5\u672C\u7684\u9996\u4E2A\u5730\u9762\u7535\u7AD9\uFF0C\u4E5F\u662F\u9488\u5BF9\u5C71\u8C37\u73AF\u5883\u7684\u5B9A\u5236\u89E3\u51B3\u65B9\u6848\u3002",
    stats: [
      { labelEn: "Installed Capacity", labelZh: "\u88C5\u673A\u5BB9\u91CF", value: "2.1 MW", icon: "\u26A1" },
      { labelEn: "BOS Cost Reduction", labelZh: "BOS \u6210\u672C\u964D\u4F4E", value: "7%", icon: "\uD83D\uDCB0" },
      { labelEn: "Power Generation Increase", labelZh: "\u53D1\u7535\u91CF\u63D0\u5347", value: "10%", icon: "\uD83D\uDCC8" },
    ],
  },
  {
    id: "serfontana",
    titleEn: "Serfontana Shopping Center Cuts Grid Reliance with 100% Solar Self Consumption",
    titleZh: "Serfontana \u8D2D\u7269\u4E2D\u5FC3\u901A\u8FC7 100% \u592A\u9633\u80FD\u81EA\u53D1\u81EA\u7528\u51CF\u5C11\u7535\u7F51\u4F9D\u8D56",
    date: "2026-03-17",
    imageSrc: "/images/cases/case-serfontana.webp",
    descEn:
      "The adoption of AIKO ABC modules delivered significant technical and financial improvements over conventional TOPCon alternatives. The system generated +9.2% more energy in its first year and is expected to produce 9.9% more lifetime energy over 30 years.",
    descZh:
      "\u91C7\u7528 AIKO ABC \u7EC4\u4EF6\u5E26\u6765\u4E86\u6BD4\u4F20\u7EDF TOPCon \u66FF\u4EE3\u65B9\u6848\u66F4\u663E\u8457\u7684\u6280\u672F\u548C\u8D22\u52A1\u6539\u5584\u3002\u8BE5\u7CFB\u7EDF\u5728\u7B2C\u4E00\u5E74\u591A\u4EA7\u751F\u4E86 9.2% \u7684\u80FD\u91CF\uFF0C\u9884\u8BA1\u5728 30 \u5E74\u5185\u5C06\u591A\u4EA7\u751F 9.9% \u7684\u7EC8\u8EAB\u80FD\u91CF\u3002",
    stats: [
      { labelEn: "Installed Capacity", labelZh: "\u88C5\u673A\u5BB9\u91CF", value: "93.1 kWp", icon: "\u26A1" },
      { labelEn: "Energy Yield Increase", labelZh: "\u53D1\u7535\u91CF\u63D0\u5347", value: "+9.2%", icon: "\uD83D\uDCC8" },
      { labelEn: "ROI", labelZh: "\u6295\u8D44\u56DE\u62A5\u7387", value: "900%", icon: "\uD83D\uDCB0" },
    ],
  },
  {
    id: "germany-forest-villa",
    titleEn: "Photovoltaic power generation project for a forest villa in Germany",
    titleZh: "\u5FB7\u56FD\u68EE\u6797\u522B\u5885\u5149\u4F0F\u53D1\u7535\u9879\u76EE",
    date: "2024-12-19",
    imageSrc: "/images/cases/case-germany-forest-villa.webp",
    descEn:
      "Due to the limited roof space available to us, we chose to use the most efficient modules on the market, which happen to be AIKO's. Specifically, we consciously selected AIKO's N-Type ABC Dual Glass Modules, because of their notably increased efficiency ensuring high yields for 20 or even 30 years.",
    descZh:
      "\u7531\u4E8E\u6211\u4EEC\u53EF\u7528\u7684\u5C4B\u9876\u7A7A\u95F4\u6709\u9650\uFF0C\u6211\u4EEC\u9009\u62E9\u4F7F\u7528\u5E02\u573A\u4E0A\u6700\u9AD8\u6548\u7684\u7EC4\u4EF6\uFF0C\u5076\u5DE7\u5C31\u662F AIKO \u7684\u3002\u5177\u4F53\u6765\u8BF4\uFF0C\u6211\u4EEC\u6709\u610F\u8BC6\u5730\u9009\u62E9\u4E86 AIKO \u7684 N \u578B ABC \u53CC\u73BB\u7EC4\u4EF6\uFF0C\u56E0\u4E3A\u5B83\u4EEC\u663E\u8457\u63D0\u9AD8\u4E86\u6548\u7387\uFF0C\u786E\u4FDD\u4E86 20 \u751A\u81F3 30 \u5E74\u7684\u9AD8\u6536\u76CA\u3002",
    stats: [
      {
        labelEn: "Increased Power Generation",
        labelZh: "\u589E\u52A0\u53D1\u7535\u91CF",
        value: "1,048 kWh/year",
        icon: "\u26A1",
      },
      {
        labelEn: "Total CO\u2082 Reduction",
        labelZh: "\u603B\u51CF\u6392\u4E8C\u6C27\u5316\u78B3",
        value: "1,376 kg/year",
        icon: "\uD83C\uDF31",
      },
      {
        labelEn: "Equivalent Car Mileage",
        labelZh: "\u7B49\u6548\u6C7D\u8F66\u91CC\u7A0B",
        value: "3,882 km",
        icon: "\uD83D\uDE97",
      },
    ],
  },
];

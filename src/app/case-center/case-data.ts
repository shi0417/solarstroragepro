export type CaseStudy = {
  titleEn: string;
  titleZh: string;
  date: string;
  imageSrc: string;
  descEn: string;
  descZh: string;
  stats: { labelEn: string; labelZh: string; value: string; icon: string }[];
  sourceUrl: string;
};

export const CASES: CaseStudy[] = [
  {
    titleEn: "AIKO ABC High-Efficiency Technology Empowers Rooftop Canopies",
    titleZh: "AIKO ABC 高效技术赋能屋顶光伏车棚",
    date: "2026-03-24",
    imageSrc:
      "https://aikosolar.com/wp-content/uploads/2026/03/australia-nsw-macquarie-park-banner.jpg",
    descEn:
      "Smart Commercial Energy and Canyon Solar installed 300kW of high-efficiency AIKO Neostar solar panels across a modular prefabricated canopy at AstraZeneca's Macquarie Park campus, unlocking significant additional on-site energy generation when roof space was fully exhausted.",
    descZh:
      "Smart Commercial Energy 和 Canyon Solar 在阿斯利康麦考瑞公园园区的模块化预制车棚上安装了 300kW 高效 AIKO Neostar 太阳能组件，在屋顶空间耗尽的情况下，释放了大量额外的现场能源发电能力。",
    stats: [
      { labelEn: "Annual Power Generation", labelZh: "年发电量", value: "358,670 kWh", icon: "\u26A1" },
      { labelEn: "Annual CO\u2082 Reduction", labelZh: "年减排二氧化碳", value: "165 tons", icon: "\uD83C\uDF31" },
      { labelEn: "Annual Savings", labelZh: "年节省电费", value: "35,867 AUD", icon: "\uD83D\uDCB0" },
    ],
    sourceUrl: "https://aikosolar.com/en/case-australia-nsw-macquarie-park/",
  },
  {
    titleEn: "Datang Guangxi Guiguan Rongan Matian 100MW PV Project",
    titleZh: "大唐广西桂冠融安马田 100MW 光伏项目",
    date: "2026-02-02",
    imageSrc: "https://aikosolar.com/wp-content/uploads/2026/02/case-datang-guangxi-banner.jpg",
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
    sourceUrl: "https://aikosolar.com/en/case-datang-guangxi/",
  },
  {
    titleEn: "How Intermarché Beja Maximized Solar Output in Portugal's Sunniest Region",
    titleZh: "葡萄牙 Intermarché Beja 超市如何最大化太阳能输出",
    date: "2026-03-17",
    imageSrc: "https://aikosolar.com/wp-content/uploads/2024/11/case-italy-dierre-profile.jpg",
    descEn:
      "The move to AIKO ABC technology delivered measurable performance gains and financial security over standard TOPCon alternatives. The project achieved 12.25 kWp more capacity within the same rooftop area compared to TOPCon modules.",
    descZh:
      "采用 AIKO ABC 技术带来了比标准 TOPCon 替代方案更显著的性能提升和财务保障。与 TOPCon 组件相比，该项目在相同的屋顶面积内实现了 12.25 kWp 的额外容量。",
    stats: [
      { labelEn: "Annual Power Generation", labelZh: "年发电量", value: "515.8 MWh", icon: "\u26A1" },
      { labelEn: "Annual CO\u2082 Reduction", labelZh: "年减排二氧化碳", value: "277 tons", icon: "\uD83C\uDF31" },
      { labelEn: "Equivalent to Tree Planting", labelZh: "等效植树", value: "818 trees", icon: "\uD83C\uDF33" },
    ],
    sourceUrl: "https://aikosolar.com/en/case-intermarche-beja/",
  },
  {
    titleEn: "PV power station in Tochigi Prefecture, Japan",
    titleZh: "日本\u6803\u6728\u53bf光伏电站",
    date: "2024-12-19",
    imageSrc:
      "https://aikosolar.com/wp-content/uploads/2024/11/case-japan-photovoltaic-power-station-banner.jpg",
    descEn:
      "Located in a valley in Tochigi Prefecture, Japan, this project covers an area of 9,000 square meters and has an installed capacity of 2.1 MW. It is AIKO's first utility power station in Japan, as well as a customized solution for the valley environment.",
    descZh:
      "该项目位于日本\u6803\u6728\u53bf的一个山谷中，占地 9,000 平方米，装机容量为 2.1 MW。这是 AIKO 在日本的首个地面电站，也是针对山谷环境的定制解决方案。",
    stats: [
      { labelEn: "Installed Capacity", labelZh: "装机容量", value: "2.1 MW", icon: "\u26A1" },
      { labelEn: "BOS Cost Reduction", labelZh: "BOS 成本降低", value: "7%", icon: "\uD83D\uDCB0" },
      { labelEn: "Power Generation Increase", labelZh: "发电量提升", value: "10%", icon: "\uD83D\uDCC8" },
    ],
    sourceUrl: "https://aikosolar.com/en/case-japan-photovoltaic-power-station/",
  },
  {
    titleEn: "Serfontana Shopping Center Cuts Grid Reliance with 100% Solar Self Consumption",
    titleZh: "Serfontana 购物中心通过 100% 太阳能自发自用减少电网依赖",
    date: "2026-03-17",
    imageSrc: "https://aikosolar.com/wp-content/uploads/2024/11/case-italy-dierre-profile.jpg",
    descEn:
      "The adoption of AIKO ABC modules delivered significant technical and financial improvements over conventional TOPCon alternatives. The system generated +9.2% more energy in its first year and is expected to produce 9.9% more lifetime energy over 30 years.",
    descZh:
      "采用 AIKO ABC 组件带来了比传统 TOPCon 替代方案更显著的技术和财务改善。该系统在第一年多产生了 9.2% 的能量，预计在 30 年内将多产生 9.9% 的终身能量。",
    stats: [
      { labelEn: "Installed Capacity", labelZh: "装机容量", value: "93.1 kWp", icon: "\u26A1" },
      { labelEn: "Energy Yield Increase", labelZh: "发电量提升", value: "+9.2%", icon: "\uD83D\uDCC8" },
      { labelEn: "ROI", labelZh: "投资回报率", value: "900%", icon: "\uD83D\uDCB0" },
    ],
    sourceUrl: "https://aikosolar.com/en/case-serfontana/",
  },
  {
    titleEn: "Photovoltaic power generation project for a forest villa in Germany",
    titleZh: "德国森林别墅光伏发电项目",
    date: "2024-12-19",
    imageSrc: "https://aikosolar.com/wp-content/uploads/2024/11/case-germany-forest-villa-profile.jpg",
    descEn:
      "Due to the limited roof space available to us, we chose to use the most efficient modules on the market, which happen to be AIKO's. Specifically, we consciously selected AIKO's N-Type ABC Dual Glass Modules, because of their notably increased efficiency ensuring high yields for 20 or even 30 years.",
    descZh:
      "由于我们可用的屋顶空间有限，我们选择使用市场上最高效的组件，碰巧就是 AIKO 的。具体来说，我们有意识地选择了 AIKO 的 N 型 ABC 双玻组件，因为它们显著提高了效率，确保了 20 甚至 30 年的高收益。",
    stats: [
      {
        labelEn: "Increased Power Generation",
        labelZh: "增加发电量",
        value: "1,048 kWh/year",
        icon: "\u26A1",
      },
      {
        labelEn: "Total CO\u2082 Reduction",
        labelZh: "总减排二氧化碳",
        value: "1,376 kg/year",
        icon: "\uD83C\uDF31",
      },
      {
        labelEn: "Equivalent Car Mileage",
        labelZh: "等效汽车里程",
        value: "3,882 km",
        icon: "\uD83D\uDE97",
      },
    ],
    sourceUrl: "https://aikosolar.com/en/case-germany-forest-villa/",
  },
];

/**
 * seed-solutions-messages.cjs
 *
 * Adds solutionsGridLevelBess and solutionsDataCenter translation groups
 * to ALL locale JSON files.
 *
 * Usage: node scripts/seed-solutions-messages.cjs
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'src', 'messages');

// ---------- Grid-Level BESS (English base) ----------
const GRID_EN = {
  "breadcrumbHome": "Home",
  "breadcrumbSolutions": "Solutions",
  "badge": "Grid-side · Bulk storage",
  "title": "Grid-level Battery Energy Storage System (BESS)",
  "subtitle": "Grid-scale energy storage and bulk power substation solutions — flexibility, ancillary services, and renewable integration for utilities and large C&I.",
  "paragraphText": "BESS solution scope: grid-scale energy storage systems and bulk power substation integration — aligned with utility-grade deployment practices.",
  "advantagesTitle": "Top 4 advantages",
  "advantages": [
    { "n": "01", "title": "One-stop solution", "body": "Full application coverage across generation, grid, and demand-side use cases — from concept to integrated delivery." },
    { "n": "02", "title": "Industrial pioneer", "body": "Energy-storage-oriented 1P 314Ah prismatic cell platforms engineered for long calendar life and tight consistency." },
    { "n": "03", "title": "Millisecond response", "body": "Millisecond-class power response with system designs supporting up to ~2P power capability (project-dependent)." },
    { "n": "04", "title": "Multiple security measures", "body": "Triple fire-suppression concepts paired with modular architecture for safer O&M at container, cluster, and pack levels." }
  ],
  "appsIntroTitle": "Segmented applications",
  "appsIntro": "High-power applications for grid-level BESS are transforming how utilities and large consumers operate. These systems store bulk energy from renewables such as solar and wind, shifting surplus generation to peak demand periods. With rapid charge and discharge capability, BESS supports grid stability through ancillary services including frequency regulation and voltage support, and enables demand-response participation — cutting costs by dispatching stored energy when the grid is most stressed.",
  "apps": [
    { "title": "Thermal power frequency regulation", "body": "High-power storage delivers millisecond-class frequency response for thermal plants, improving regulation quality and capturing ancillary-service value." },
    { "title": "PV + storage + charging", "body": "High-power systems support charging loads and campus demand, reducing cost and emissions through peak shaving and valley filling." },
    { "title": "Energy storage for fast chargers", "body": "Capacity support for ultra-fast charging — meeting peak power requirements while improving station utilization and grid friendliness." },
    { "title": "Emergency power for mines", "body": "Critical backup for underground operations — faster and more efficient than diesel-only approaches, improving payback and power quality." }
  ],
  "techTitle": "Technical highlights",
  "techNote": "Final figures are subject to project FAT/SAT, grid codes, and contract technical schedules.",
  "techHighlights": [
    { "k": "Response", "v": "Millisecond-level control loop (application-dependent)" },
    { "k": "Power capability", "v": "Up to ~2P system power design envelope" },
    { "k": "Cell platform", "v": "1P 314Ah-class prismatic LFP for energy storage" },
    { "k": "Safety architecture", "v": "Triple fire suppression + modular system design" },
    { "k": "Coverage", "v": "Source, grid, and load-side application scenarios" }
  ],
  "relatedTitle": "Related energy storage products",
  "relatedBody": "Explore containerized ESS and system-level documentation on our product page.",
  "relatedCta": "Energy Storage System",
  "contactCta": "Contact engineering"
};

// ---------- Grid-Level BESS (Chinese) ----------
const GRID_ZH = {
  "breadcrumbHome": "首页",
  "breadcrumbSolutions": "解决方案",
  "badge": "电网侧 · 大容量储能",
  "title": "电网级电池储能系统（BESS）",
  "subtitle": "大容量变电站与电网级储能整体方案，服务电力系统灵活性、辅助服务与新能源消纳。",
  "paragraphText": "方案定位涵盖：电网级大规模储能系统与大容量变电站侧集成，面向并网运行与电力市场规则工程化落地。",
  "advantagesTitle": "四大核心优势",
  "advantages": [
    { "n": "01", "title": "一站式方案", "body": "覆盖源、网、荷侧全场景应用，从方案设计到系统集成形成闭环交付能力。" },
    { "n": "02", "title": "产业级产品平台", "body": "基于储能专用 1P 314Ah 方形电芯等平台，面向长寿命与高一致性运行优化。" },
    { "n": "03", "title": "毫秒级响应", "body": "支持毫秒级功率响应与快速充放，系统功率设计可覆盖最高约 2P 需求（以工程边界为准）。" },
    { "n": "04", "title": "多重安全保障", "body": "三重消防体系结合模块化结构，提升舱级/簇级/包级协同防护与运维友好性。" }
  ],
  "appsIntroTitle": "细分应用场景",
  "appsIntro": "面向电网级大型储能（BESS）的高功率供电应用正在重塑能源系统运行方式，为电网企业与大型用电主体提供可调度、可交易、可并网的灵活资源。系统可高效存储风电、光伏等新能源大发时段的富余电量，并在负荷高峰与电价高峰时段释放，提升资产利用率与电网稳定性。依托大功率变流与电池集成能力，BESS 可参与一次调频、电压支撑、备用与需求响应等辅助服务，在削峰填谷与峰谷套利场景下显著优化用能成本。",
  "apps": [
    { "title": "火电一次调频", "body": "提供大功率储能系统，实现毫秒级一次调频响应，帮助火电机组提升调频速度与质量，在辅助服务市场中获取稳定收益。" },
    { "title": "光储充一体化", "body": "大功率储能支撑充电场站与园区负荷的功率需求，通过削峰填谷降低用电成本与碳排放强度。" },
    { "title": "超快充配套储能", "body": "作为容量支撑配置，满足超充桩群峰值功率需求，提升充电站运行效率与电网接入友好性。" },
    { "title": "矿山应急供电", "body": "为井下等关键负荷提供重要供电保障；相较柴油发电方案，响应更快、效率更高，有助于缩短投资回收周期并改善电能质量。" }
  ],
  "techTitle": "技术要点概览",
  "techNote": "具体参数以项目型式试验、并网测试与合同技术附件为准。",
  "techHighlights": [
    { "k": "响应特性", "v": "毫秒级调控能力（以具体项目与控制策略为准）" },
    { "k": "功率能力", "v": "系统功率设计可覆盖最高约 2P 倍率区间" },
    { "k": "电芯平台", "v": "储能专用 1P 314Ah 级方形磷酸铁锂电芯" },
    { "k": "安全架构", "v": "三重消防体系 + 模块化系统设计" },
    { "k": "场景覆盖", "v": "源、网、荷侧全链路应用" }
  ],
  "relatedTitle": "相关储能产品",
  "relatedBody": "查看集装箱式储能系统等产品页面，获取系统级方案与参数说明。",
  "relatedCta": "Energy Storage System",
  "contactCta": "联系工程团队"
};

// ---------- Grid-Level BESS (Spanish) ----------
const GRID_ES = {
  "breadcrumbHome": "Inicio",
  "breadcrumbSolutions": "Soluciones",
  "badge": "Lado de red · Almacenamiento masivo",
  "title": "Sistema de Almacenamiento de Energía con Baterías de Nivel de Red (BESS)",
  "subtitle": "Soluciones de almacenamiento de energía a escala de red y subestaciones de potencia masiva — flexibilidad, servicios auxiliares e integración de renovables para utilidades y grandes clientes C&I.",
  "paragraphText": "Alcance de la solución BESS: sistemas de almacenamiento de energía a escala de red e integración de subestaciones de potencia masiva — alineado con prácticas de despliegue de grado utilidad.",
  "advantagesTitle": "4 ventajas principales",
  "advantages": [
    { "n": "01", "title": "Solución integral", "body": "Cobertura completa de aplicaciones en generación, red y lado de la demanda — desde el concepto hasta la entrega integrada." },
    { "n": "02", "title": "Pionero industrial", "body": "Plataformas de celdas prismáticas LFP de 314Ah orientadas al almacenamiento de energía, diseñadas para vida útil de calendario prolongada y consistencia estrecha." },
    { "n": "03", "title": "Respuesta de milisegundo", "body": "Respuesta de potencia de clase milisegundo con diseños de sistema que soportan hasta ~2P de capacidad de potencia (depende del proyecto)." },
    { "n": "04", "title": "Medidas de seguridad múltiples", "body": "Conceptos de supresión de incendios triple combinados con arquitectura modular para O&M más seguro a nivel de contenedor, clúster y paquetes." }
  ],
  "appsIntroTitle": "Aplicaciones segmentadas",
  "appsIntro": "Las aplicaciones de alta potencia para BESS de nivel de red están transformando la forma en que las utilidades y los grandes consumidores operan. Estos sistemas almacenan energía masiva de renovables como solar y eólica, desplazando la generación excedente a períodos de demanda pico. Con capacidad de carga y descarga rápida, el BESS soporta la estabilidad de la red mediante servicios auxiliares que incluyen regulación de frecuencia y soporte de tensión, y habilita la participación en respuesta de la demanda — reduciendo costos mediante el despacho de energía almacenada cuando la red está más estresada.",
  "apps": [
    { "title": "Regulación de frecuencia en termoeléctricas", "body": "El almacenamiento de alta potencia entrega respuesta de frecuencia de clase milisegundo para plantas térmicas, mejorando la calidad de regulación y capturando valor de servicio auxiliar." },
    { "title": "PV + almacenamiento + carga", "body": "Sistemas de alta potencia que soportan cargas de carga y demanda de campus, reduciendo costo y emisiones mediante recorte de picos y llenado de valles." },
    { "title": "Almacenamiento para cargadores rápidos", "body": "Soporte de capacidad para carga ultrarrápida — cumpliendo requisitos de potencia pico mientras se mejora la utilización de la estación y la compatibilidad con la red." },
    { "title": "Suministro de emergencia para minas", "body": "Respaldo crítico para operaciones subterráneas — más rápido y eficiente que los enfoques solo diésel, mejorando el retorno de inversión y la calidad de la energía." }
  ],
  "techTitle": "Destacados técnicos",
  "techNote": "Las cifras finales están sujetas a pruebas FAT/SAT del proyecto, códigos de red y cronogramas técnicas contractuales.",
  "techHighlights": [
    { "k": "Respuesta", "v": "Bucle de control de nivel de milisegundo (depende de la aplicación)" },
    { "k": "Capacidad de potencia", "v": "Sobre todo el sobre de diseño de potencia del sistema de ~2P" },
    { "k": "Plataforma de celdas", "v": "Celdas LFP prismáticas de clase 314Ah 1P para almacenamiento de energía" },
    { "k": "Arquitectura de seguridad", "v": "Supresión de incendios triple + diseño de sistema modular" },
    { "k": "Cobertura", "v": "Escenarios de aplicación del lado de la fuente, red y carga" }
  ],
  "relatedTitle": "Productos relacionados de almacenamiento de energía",
  "relatedBody": "Explora la documentación de ESS containerizado y a nivel de sistema en nuestra página de productos.",
  "relatedCta": "Energy Storage System",
  "contactCta": "Contactar a ingeniería"
};

// ---------- Data Center (English base) ----------
const DC_EN = {
  "breadcrumbHome": "Home",
  "breadcrumbSolutions": "Solutions",
  "badge": "AIDC · Backup & power quality",
  "title": "Data Center Energy Storage Solutions",
  "lead": "High-power lithium backup for AIDC workloads — engineered for supply reliability and power quality, with millisecond response to GPU-scale load swings.",
  "painTitle": "Industry pain points",
  "painItems": [
    "Rapidly rising data center power demand challenges grid capacity and expansion timelines.",
    "GPU load swings create high peaks and increase IT downtime risk from power-quality events.",
    "PUE and efficiency requirements are becoming stricter across facilities.",
    "Battery safety expectations are extreme — no fire or explosion tolerance in mission-critical sites."
  ],
  "scenariosTitle": "Application scenarios",
  "scenarioGridTitle": "Grid-proximate BESS",
  "scenarioGridBody": "Battery energy storage near the grid stabilizes large-scale GPU cluster swings and provides UPS-class backup power.",
  "scenarioLocalTitle": "GPU-proximate energy storage",
  "scenarioLocalBody": "Local storage near GPUs smooths millisecond-level transients with configurable backup duration and load-adjacent support.",
  "provideTitle": "What we provide",
  "provideBody": "Full-chain lithium UPS products from cells and modules to systems — modular parallel designs for dependable delivery.",
  "advantagesTitle": "Key features & advantages",
  "advantages": [
    { "title": "High safety", "body": "Controlled temperature rise; cells demonstrate no fire or explosion under rigorous tests such as nail penetration (per applicable certifications and reports)." },
    { "title": "Long lifespan", "body": "10-year calendar life design orientation for long-run data center operations." },
    { "title": "Fast response", "body": "Millisecond response to load swings with support for up to ~300% peak load scenarios." },
    { "title": "Cost friendly", "body": "~20% lower unit power cost vs conventional approaches; 50%+ fewer UPS systems deployed in comparable architectures (project-dependent)." },
    { "title": "Authoritative certification", "body": "Independent IP and quality systems aligned with leading enterprise supply-chain requirements." },
    { "title": "Greener & more efficient", "body": "Higher DC voltage architectures help evolve AIDC power design and reduce PUE." }
  ],
  "moduleTableTitle": "Technical specifications · UPS module",
  "moduleCols": ["Module", "Type", "Cell voltage", "Module voltage", "Discharge C-rate", "Backup time"],
  "systemTableTitle": "Technical specifications · UPS system",
  "systemRows": { "backup": "Backup time", "cellV": "Cell voltage", "moduleV": "Module voltage", "cRate": "Discharge C-rate", "power": "System power" },
  "footnoteTitle": "Design & fire suppression",
  "footnote": "Design: modular parallel topology — safe, reliable, flexible, intelligent, and streamlined O&M. Fire suppression: aerosol and perfluoro options (per project engineering).",
  "scenariosParagraphEn": "For future distributed data center power architectures, storage adds both stabilization and backup at grid- and load-side touchpoints.",
  "scenariosParagraphZh": "面向未来数据中心分布式供电架构，储能在电网侧与负载侧均可发挥稳态与备电价值。",
  "tableNoteEn": "Scroll horizontally on small screens to view all columns.",
  "tableNoteZh": "表格可在小屏横向滚动查看。",
  "relatedTitle": "Related energy storage product",
  "relatedBody": "Explore containerized ESS and datasheet-ready details.",
  "relatedCta": "View Energy Storage System",
  "contactCta": "Contact engineering"
};

// ---------- Data Center (Chinese) ----------
const DC_ZH = {
  "breadcrumbHome": "首页",
  "breadcrumbSolutions": "解决方案",
  "badge": "AIDC · 备电与电能质量",
  "title": "数据中心储能解决方案",
  "lead": "面向智算与高密度算力场景的大倍率锂电备电方案，兼顾供电可靠性与电能质量，平滑 GPU 类负载的毫秒级波动。",
  "painTitle": "行业痛点",
  "painItems": [
    "数据中心用电快速增长，对电网供电能力与扩容节奏提出更高要求。",
    "GPU 负载瞬时波动大、峰值高，增加 IT 设备宕机与供电质量风险。",
    "PUE 与能效指标日趋严格，供电架构需向更高效方向演进。",
    "对电芯安全性要求极高，需满足无起火、无爆炸等严苛标准。"
  ],
  "scenariosTitle": "应用场景",
  "scenarioGridTitle": "近电网侧 BESS",
  "scenarioGridBody": "在电网侧附近部署电池储能系统，平抑大规模 GPU 集群的负荷波动，并提供 UPS 级备电能力。",
  "scenarioLocalTitle": "近 GPU 本地储能",
  "scenarioLocalBody": "在 GPU 近端部署储能，平滑毫秒级负载冲击，可按需配置备电时长，实现更贴近负载的功率支撑。",
  "provideTitle": "我们提供什么",
  "provideBody": "从电芯、模组到系统的锂电 UPS 全链条产品供应，支持模块化并联与工程化交付。",
  "advantagesTitle": "核心优势",
  "advantages": [
    { "title": "高安全", "body": "温升可控；电芯通过针刺等严苛测试条件下无起火、无爆炸表现（以具体认证与报告为准）。" },
    { "title": "长寿命", "body": "10 年日历寿命设计取向，满足数据中心长期稳定运行需求。" },
    { "title": "快响应", "body": "毫秒级响应负载波动，可支撑最高约 300% 的峰值功率需求。" },
    { "title": "更优成本", "body": "单位功率成本较传统方案约低 20%；相较常规方案可减少 50% 以上 UPS 系统部署数量（视架构与负载而定）。" },
    { "title": "权威认证", "body": "独立专利与质量体系，适配头部企业供应链与合规要求。" },
    { "title": "更绿色高效", "body": "以更高直流母线电压等方式推动 AIDC 供电架构升级，助力降低 PUE。" }
  ],
  "moduleTableTitle": "技术参数 · UPS 模组",
  "moduleCols": ["模组", "类型", "电芯电压", "模组电压", "放电倍率 (C)", "备电时间"],
  "systemTableTitle": "技术参数 · UPS 系统",
  "systemRows": { "backup": "备电时间", "cellV": "电芯电压", "moduleV": "模组电压", "cRate": "放电倍率 (C)", "power": "系统功率" },
  "footnoteTitle": "设计与消防",
  "footnote": "设计：模块化并联，安全可靠、灵活扩展、智能运维、极简运维。消防：气溶胶、全氟己酮等方案可选（以项目设计为准）。",
  "scenariosParagraphEn": "For future distributed data center power architectures, storage adds both stabilization and backup at grid- and load-side touchpoints.",
  "scenariosParagraphZh": "面向未来数据中心分布式供电架构，储能在电网侧与负载侧均可发挥稳态与备电价值。",
  "tableNoteEn": "Scroll horizontally on small screens to view all columns.",
  "tableNoteZh": "表格可在小屏横向滚动查看。",
  "relatedTitle": "相关储能产品",
  "relatedBody": "了解集装箱式储能系统与更多产品细节。",
  "relatedCta": "查看 Energy Storage System",
  "contactCta": "联系工程团队"
};

// ---------- Data Center (Spanish) ----------
const DC_ES = {
  "breadcrumbHome": "Inicio",
  "breadcrumbSolutions": "Soluciones",
  "badge": "AIDC · Respaldo y calidad de energía",
  "title": "Soluciones de Almacenamiento de Energía para Centros de Datos",
  "lead": "Respaldo de litio de alta potencia para cargas de trabajo AIDC — diseñado para confiabilidad de suministro y calidad de energía, con respuesta de milisegundo a las oscilaciones de carga a escala de GPU.",
  "painTitle": "Puntos críticos de la industria",
  "painItems": [
    "La rápida creciente demanda de energía de los centros de datos desafía la capacidad de la red y los cronogramas de expansión.",
    "Las oscilaciones de carga de GPU crean picos altos y aumentan el riesgo de tiempo de inactividad de TI por eventos de calidad de energía.",
    "Los requisitos de PUE y eficiencia se están volviendo más estrictos en todas las instalaciones.",
    "Las expectativas de seguridad de baterías son extremas — tolerancia cero a incendios o explosiones en sitios de misión crítica."
  ],
  "scenariosTitle": "Escenarios de aplicación",
  "scenarioGridTitle": "BESS cerca de la red",
  "scenarioGridBody": "El almacenamiento de energía con baterías cerca de la red estabiliza las oscilaciones de clústeres GPU de gran escala y proporciona energía de respaldo de clase UPS.",
  "scenarioLocalTitle": "Almacenamiento de energía cerca de GPU",
  "scenarioLocalBody": "Almacenamiento local cerca de las GPU suaviza las transitorios de nivel de milisegundo con duración de respaldo configurable y soporte adyacente a la carga.",
  "provideTitle": "Qué proporcionamos",
  "provideBody": "Productos de UPS de litio de cadena completa, desde celdas y módulos hasta sistemas — diseños modulares en paralelo para una entrega confiable.",
  "advantagesTitle": "Características y ventajas clave",
  "advantages": [
    { "title": "Alta seguridad", "body": "Aumento de temperatura controlado; las celdas no presentan incendios ni explosiones bajo pruebas rigurosas como la penetración con clavo (según certificaciones e informes aplicables)." },
    { "title": "Larga vida útil", "body": "Orientación de diseño para vida útil de calendario de 10 años para operaciones de centros de datos de larga duración." },
    { "title": "Respuesta rápida", "body": "Respuesta de milisegundo a las oscilaciones de carga con soporte para escenarios de carga pico de hasta ~300%." },
    { "title": "Costo accesible", "body": "Costo de potencia unitaria ~20% menor frente a enfoques convencionales; 50%+ menos sistemas UPS despleados en arquitecturas comparables (depende del proyecto)." },
    { "title": "Certificación autorizada", "body": "Sistemas de calidad e IP independiente alineados con los requisitos de cadena de suministro de empresas líderes." },
    { "title": "Más verde y eficiente", "body": "Las arquitecturas de mayor tensión de CC ayudan a evolucionar el diseño de energía AIDC y reducir el PUE." }
  ],
  "moduleTableTitle": "Especificaciones técnicas · Módulo UPS",
  "moduleCols": ["Módulo", "Tipo", "Tensión de celda", "Tensión de módulo", "Tasa de descarga C", "Tiempo de respaldo"],
  "systemTableTitle": "Especificaciones técnicas · Sistema UPS",
  "systemRows": { "backup": "Tiempo de respaldo", "cellV": "Tensión de celda", "moduleV": "Tensión de módulo", "cRate": "Tasa de descarga C", "power": "Potencia del sistema" },
  "footnoteTitle": "Diseño y supresión de incendios",
  "footnote": "Diseño: topología modular en paralelo — seguro, confiable, flexible, inteligente y O&M simplificado. Supresión de incendios: opciones de aerosol y perfluoro (según ingeniería del proyecto).",
  "scenariosParagraphEn": "For future distributed data center power architectures, storage adds both stabilization and backup at grid- and load-side touchpoints.",
  "scenariosParagraphZh": "面向未来数据中心分布式供电架构，储能在电网侧与负载侧均可发挥稳态与备电价值。",
  "tableNoteEn": "Scroll horizontally on small screens to view all columns.",
  "tableNoteZh": "表格可在小屏横向滚动查看。",
  "relatedTitle": "Producto de almacenamiento de energía relacionado",
  "relatedBody": "Explora ESS containerizado y detalles listos para fichas técnicas.",
  "relatedCta": "Ver Energy Storage System",
  "contactCta": "Contactar a ingeniería"
};

// ---------- Write to all locale files ----------
const LOCALES = ['en', 'zh', 'es', 'tr', 'pt', 'de', 'fr', 'th', 'ar', 'ja', 'ko', 'id'];

for (const locale of LOCALES) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`Skipping missing file: ${filePath}`);
    continue;
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (locale === 'en') {
    data.solutionsGridLevelBess = GRID_EN;
    data.solutionsDataCenter = DC_EN;
  } else if (locale === 'zh') {
    data.solutionsGridLevelBess = GRID_ZH;
    data.solutionsDataCenter = DC_ZH;
  } else if (locale === 'es') {
    data.solutionsGridLevelBess = GRID_ES;
    data.solutionsDataCenter = DC_ES;
  } else {
    // Other locales: use English as placeholder
    data.solutionsGridLevelBess = GRID_EN;
    data.solutionsDataCenter = DC_EN;
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`✅ Updated ${locale}.json`);
}

console.log('\n✅ All locale files updated with solutions translation groups.');

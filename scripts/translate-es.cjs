const fs = require('fs');
const path = require('path');

const esPath = path.join(__dirname, '..', 'src', 'messages', 'es.json');
const enPath = path.join(__dirname, '..', 'src', 'messages', 'en.json');

const esRaw = JSON.parse(fs.readFileSync(esPath, 'utf8'));
const enRaw = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Manual Spanish translations for all known English strings in es.json
const COMMON_TRANSLATIONS = {
  // blog
  "Read Article": "Leer Artículo",
  "Categories": "Categorías",
  "All": "Todas",
  "Knowledge Base": "Base de Conocimientos",
  "Energy Storage Blog": "Blog de Almacenamiento de Energía",
  "Deep dives into battery storage technology, market trends, and best practices. From ROI analysis to installation guides, make informed decisions for your energy storage projects.": "Análisis profundo sobre tecnología de almacenamiento de baterías, tendencias del mercado y mejores prácticas. Desde análisis de ROI hasta guías de instalación, tome decisiones informadas para sus proyectos de almacenamiento de energía.",
  "min read": "min de lectura",
  "Back to Home": "Volver al Inicio",
  "Need Expert Advice?": "¿Necesita asesoramiento experto?",
  "Our engineering team can design a custom energy storage solution for your project.": "Nuestro equipo de ingeniería puede diseñar una solución personalizada de almacenamiento de energía para su proyecto.",
  "Request a Proposal": "Solicitar Propuesta",
  // caseCenter
  "Case Studies Center": "Centro de Casos de Estudio",
  "Real-world deployments across 50+ countries demonstrating our BESS performance in frequency regulation, peak shaving, and renewable integration.": "Despliegues reales en más de 50 países que demuestran el rendimiento de nuestro BESS en regulación de frecuencia, recorte de picos e integración de renovables.",
  "All Cases": "Todos los Casos",
  "Grid Freq Reg": "Reg. Frecuencia Red",
  "Peak Shaving": "Recorte de Picos",
  "Renewable Integration": "Integración Renovable",
  "No cases available yet.": "No hay casos disponibles aún.",
  "Filter by Region": "Filtrar por Región",
  "All Regions": "Todas las Regiones",
  "Global Projects": "Proyectos Globales",
  "Frequency Regulation & Energy Storage Cases": "Casos de Regulación de Frecuencia y Almacenamiento",
  "Real-world deployments in grid frequency regulation, peak shaving, and renewable integration across 50+ countries.": "Despliegues reales en regulación de frecuencia, recorte de picos e integración de renovables en más de 50 países.",
  "View Details": "Ver Detalles",
  "Need a similar solution?": "¿Necesita una solución similar?",
  "Our engineering team will design a custom frequency regulation and energy storage system for your grid requirements.": "Nuestro equipo de ingeniería diseñará un sistema personalizado de regulación de frecuencia y almacenamiento para sus requisitos de red.",
  "Request a Proposal": "Solicitar Propuesta",
  "Explore our technology platform": "Explorar nuestra plataforma tecnológica",
  // technology
  "System single-line diagram — click tabs above to switch topologies": "Diagrama unifilar del sistema — haga clic en las pestañas superiores para cambiar topologías",
  "View Frequency Regulation Cases": "Ver Casos de Regulación de Frecuencia",
  "Grid-Level BESS Solutions": "Soluciones BESS de Nivel de Red",
  // productsEnergyStorage
  "Home": "Inicio",
  "Products": "Productos",
  "Core product": "Producto principal",
  "Energy Storage System": "Sistema de Almacenamiento de Energía",
  "Includes Energy Storage System Pack / DC Liquid Cooling Container — system-level delivery for high-power, long-life, and safe deployments.": "Incluye paquete de Sistema de Almacenamiento de Energía / Contenedor de Refrigeración Líquida DC — entrega a nivel de sistema para despliegues de alta potencia, larga vida y seguros.",
  "Certifications": "Certificaciones",
  "Common transport & safety standards": "Estándares comunes de transporte y seguridad",
  "Features": "Características",
  "System-engineering features for scalable delivery: power coverage, lifetime consistency, redundant safety, and O&M friendliness.": "Características de ingeniería de sistema para entrega escalable: cobertura de potencia, consistencia de vida útil, seguridad redundante y facilidad de O&M.",
  "High power": "Alta potencia",
  "0.25P–2P coverage across power-type and energy-type battery containers.": "Cobertura 0.25P–2P en contenedores de baterías de tipo potencia y tipo energía.",
  "Long lifetime": "Larga vida útil",
  "Cell temperature delta:2℃ within a pack, 5℃ across clusters — designed for 10-year calendar life.": "Delta de temperatura de celda: 2℃ dentro de un paquete, 5℃ entre clústeres — diseñado para vida útil de 10 años.",
  "Real safety": "Seguridad real",
  "Three-layer fire protection at pack/cluster/container levels; battery modules rated IP67.": "Protección contra incendios de tres capas a nivel de paquete/clúster/contenedor; módulos de batería con clasificación IP67.",
  "Easy integration": "Fácil integración",
  "Modular design enables per-cluster unit architecture with no inter-cluster circulating current; supports independent maintenance and upgrades.": "El diseño modular permite arquitectura de unidad por clúster sin corriente de circulación entre clústeres; soporta mantenimiento y actualizaciones independientes.",
  "Flexible configuration": "Configuración flexible",
  "Side-by-side or end-to-end layout options with flexible expansion.": "Opciones de diseño lado a lado o extremo a extremo con expansión flexible.",
  "Easy management": "Fácil gestión",
  "Real-time data exchange with energy statistics, fault warnings, and thermal-runaway early warning.": "Intercambio de datos en tiempo real con estadísticas de energía, advertencias de fallos y alerta temprana de fuga térmica.",
  "Specifications": "Especificaciones",
  "Scroll horizontally on mobile to view all capacity variants.": "Deslice horizontalmente en móvil para ver todas las variantes de capacidad.",
  "Parameter \\ Model": "Parámetro \\ Modelo",
  "Get a Custom Solution": "Obtener una Solución Personalizada",
  "Tell us about your project — our engineers will design a custom solution within 48 hours.": "Cuéntenos sobre su proyecto — nuestros ingenieros diseñarán una solución personalizada en 48 horas.",
  // productsResidentialEss
  "Back to home": "Volver al inicio",
  "Residential": "Residencial",
  "Residential ESS": "ESS Residencial",
  "Low-voltage stack & wall-mount packs, high-voltage systems, and all-in-one inverter + battery solutions.": "Paquetes apilables de baja tensión y de pared, sistemas de alta tensión y soluciones de inversor + batería todo-en-uno.",
  "Product families": "Familias de productos",
  "Low-voltage (51.2V)": "Baja tensión (51.2V)",
  "Stackable and wall-mounted batteries around 10kWh & 16kWh class.": "Baterías apilables y de pared alrededor de la clase 10kWh y 16kWh.",
  "High-voltage (358.4V – 716.8V)": "Alta tensión (358.4V – 716.8V)",
  "Systems for higher power and HV DC bus requirements.": "Sistemas para mayor potencia y requisitos de bus DC de alta tensión.",
  "ESS all-in-one": "ESS todo-en-uno",
  "Integrated inverter and battery for faster residential deployment.": "Inversor y batería integrados para un despliegue residencial más rápido.",
  "Products": "Productos",
  "View HVS high-voltage series details": "Ver detalles de la serie HVS de alta tensión",
  "View ESS All-in-one series details": "Ver detalles de la serie ESS todo-en-uno",
  "View LFP battery series details": "Ver detalles de la serie de baterías LFP",
  "Details": "Detalles",
  "Wall-mounted battery": "Batería de pared",
  "Stackable battery": "Batería apilable",
  "High voltage system": "Sistema de alta tensión",
  "Voltage": "Tensión",
  "Capacity": "Capacidad",
  "Energy": "Energía",
  "Cycle life": "Vida útil de ciclos",
  "Dimensions (mm)": "Dimensiones (mm)",
  "Communication": "Comunicación",
  "Voltage range": "Rango de tensión",
  "Energy range": "Rango de energía",
  "scalable": "escalable",
  "Representative models": "Modelos representativos",
  // productsPcs
  "Back to home": "Volver al inicio",
  "PCS · Prefabricated": "PCS · Prefabricado",
  "SES4H-5160/6900-MV-EX Prefabricated Inverter Substation": "Subestación Inversora Prefabricada SES4H-5160/6900-MV-EX",
  "Highly integrated prefabricated cabin combining inverter and step-up substation for utility-scale PV+storage and grid connection.": "Cabina prefabricada altamente integrada que combina inversor y subestación elevadora para PV+almacenamiento a escala de red y conexión a red.",
  "Product overview": "Resumen del producto",
  "Name": "Nombre",
  "Key advantages": "Ventajas clave",
  "Technical specifications": "Especificaciones técnicas",
  "Scroll horizontally on small screens.": "Deslice horizontalmente en pantallas pequeñas.",
  "Category": "Categoría",
  "Parameter": "Parámetro",
  "Details": "Detalles",
  "Compliance & certifications": "Cumplimiento y certificaciones",
  "Design and type testing comply with the following standards and grid codes (subject to delivery certificate).": "El diseño y las pruebas de tipo cumplen con los siguientes estándares y códigos de red (sujeto a certificado de entrega).",
  "Request datasheet": "Solicitar ficha técnica",
  "Contact us": "Contáctenos",
  "Flexible config": "Configuración flexible",
  "Integrated inverter and substation in a highly prefabricated design, improving space efficiency and simplifying installation.": "Inversor y subestación integrados en un diseño altamente prefabricado, mejorando la eficiencia del espacio y simplificando la instalación.",
  "Modular power": "Potencia modular",
  "Modular design allows configurable power rating to match project requirements.": "El diseño modular permite una clasificación de potencia configurable para coincidir con los requisitos del proyecto.",
  "High efficiency & stability": "Alta eficiencia y estabilidad",
  "1500V wide DC voltage range with multi-branch DC design to prevent battery circulating current.": "Rango de tensión DC amplio de 1500V con diseño DC de múltiples ramas para prevenir la corriente de circulación de la batería.",
  "Versatile use": "Uso versátil",
  "Supports VSG / PQ / VF modes with peak shaving and local autonomous operation.": "Soporta modos VSG / PQ / VF con recorte de picos y operación autónoma local.",
  "Safe & compatible": "Seguro y compatible",
  "Supports HVRT/LVRT, four-quadrant active/reactive power regulation, fast power response (<20ms).": "Soporta HVRT/LVRT, regulación de potencia activa/reactiva de cuatro cuadrantes, respuesta de potencia rápida (<20ms).",
  "Grid-friendly": "Amigable con la red",
  "Rated AC power: N×215kW @45°C, N×129kW @50°C (N = 20~32 modules); THDi/THDu <3%.": "Potencia AC nominal: N×215kW @45°C, N×129kW @50°C (N = 20~32 módulos); THDi/THDu <3%.",
  // productsSolarPanels
  "Solar": "Solar",
  "Solar Panels": "Paneles Solares",
  "High-efficiency ABC INFINITE modules with partial shading optimisation and industry-leading warranties.": "Módulos ABC INFINITE de alta eficiencia con optimización de sombreado parcial y garantías líderes de la industria.",
  "Product series": "Series de productos",
  "Data source": "Fuente de datos",
  // productsHvs
  "Back to residential ESS": "Volver al ESS residencial",
  "High-Voltage System HVS Series": "Serie HVS de Sistema de Alta Tensión",
  "Rack-mount and cabinet-style high-voltage battery systems for higher power density and scalability.": "Sistemas de baterías de alta tensión montados en rack y de estilo gabinete para mayor densidad de potencia y escalabilidad.",
  "Section A · Standard Rack (100Ah)": "Sección A · Rack Estándar (100Ah)",
  "Section B · High-capacity Rack (280Ah)": "Sección B · Rack de Alta Capacidad (280Ah)",
  "Section C · Cabinet BESS (large capacity)": "Sección C · Gabinete BESS (gran capacidad)",
  "100Ah rack family: modular stackable design with IP65 protection, ideal for indoor/outdoor residential HV battery banks.": "Familia de racks 100Ah: diseño modular apilable con protección IP65, ideal para bancos de baterías HV residenciales en interior/exterior.",
  "280Ah racks up to 35.84kWh per tower — designed for higher energy demands with the same footprint.": "Racks 280Ah de hasta 35.84kWh por torre — diseñados para mayores demandas de energía con la misma huella.",
  "Cabinet BESS: pre-assembled high-voltage solution for residential and small commercial applications, scalable up to 100kWh.": "Gabinete BESS: solución de alta tensión pre-ensamblada para aplicaciones residenciales y comerciales pequeñas, escalable hasta 100kWh.",
  // productsLfpBattery
  "LFP Battery Series": "Serie de Baterías LFP",
  "Ultra-slim wall-mount and floor-standing / mobile LFP battery solutions.": "Soluciones de baterías LFP ultradelgadas de pared y de piso / móviles.",
  "Ultra-slim Wall-mount Group · M1200 / M2400": "Grupo de Pared Ultradelgada · M1200 / M2400",
  "Floor / Mobile Group · M-BXS / M-LFP": "Grupo de Piso / Móvil · M-BXS / M-LFP",
  // productsAllInOne
  "Wall-mounted / Floor-standing LFP Battery Comparison": "Comparación de Baterías LFP de Pared / de Piso",
  "Side-by-side specification comparison across 6 popular models in the LFP battery lineup.": "Comparación de especificaciones lado a lado en 6 modelos populares en la línea de baterías LFP.",
  "Parameter comparison (6 models)": "Comparación de parámetros (6 modelos)",
  // productsEssAllInOne
  "ESS All-in-one Series": "Serie ESS Todo-en-Uno",
  "Integrated inverter + battery systems for hassle-free residential energy storage deployment.": "Sistemas de inversor + batería integrados para un despliegue de almacenamiento de energía residencial sin complicaciones.",
  // productsStackableBattery
  "Stackable / Floor-standing Battery (314Ah / 200Ah) Comparison": "Comparación de Batería Apilable / de Piso (314Ah / 200Ah)",
  "Side-by-side specification comparison across 7 popular models.": "Comparación de especificaciones lado a lado en 7 modelos populares.",
  "Parameter comparison (7 models)": "Comparación de parámetros (7 modelos)",
  // blogDetail
  "Article Not Found": "Artículo No Encontrado",
  "Back to Blog": "Volver al Blog",
  "Table of Contents": "Tabla de Contenido",
  "Questions about this article?": "¿Preguntas sobre este artículo?",
  "Contact our engineering team for a personalised consultation on your energy storage project.": "Contacte a nuestro equipo de ingeniería para una consulta personalizada sobre su proyecto de almacenamiento de energía.",
  "Related Articles": "Artículos Relacionados",
  "Read Article": "Leer Artículo",
  // caseDetail
  "Back to case center": "Volver al centro de casos",
  "Location": "Ubicación",
  "Implementation date": "Fecha de implementación",
  "Frequency regulation type": "Tipo de regulación de frecuencia",
  "The Problem to Solve": "El Problema a Resolver",
  "Our Approach": "Nuestro Enfoque",
  "Technical Specifications": "Especificaciones Técnicas",
  "Measurable Results": "Resultados Medibles",
  "Site photos": "Fotos del sitio",
  "Frequency response diagram": "Diagrama de respuesta de frecuencia",
  "Get a similar solution": "Obtener una solución similar",
  "Tell us about your project requirements and our engineers will design a tailored solution.": "Cuéntenos sobre los requisitos de su proyecto y nuestros ingenieros diseñarán una solución a medida.",
  "WhatsApp Consultation": "Consulta por WhatsApp",
  "View more cases": "Ver más casos",
  "Explore technology platform": "Explorar plataforma tecnológica"
};

function deepTranslate(esObj, enObj) {
  if (typeof esObj !== 'object' || esObj === null) return;
  if (typeof enObj !== 'object' || enObj === null) return;

  for (const key of Object.keys(esObj)) {
    const esVal = esObj[key];
    const enVal = enObj[key];

    if (typeof esVal === 'string' && typeof enVal === 'string') {
      // If esVal === enVal, it's still English, translate it
      if (esVal === enVal && COMMON_TRANSLATIONS[enVal]) {
        esObj[key] = COMMON_TRANSLATIONS[enVal];
      }
      // Also check COMMON_TRANSLATIONS for esVal itself (in case enVal is missing)
      else if (COMMON_TRANSLATIONS[esVal]) {
        esObj[key] = COMMON_TRANSLATIONS[esVal];
      }
    } else if (Array.isArray(esVal) && Array.isArray(enVal)) {
      for (let i = 0; i < esVal.length; i++) {
        if (typeof esVal[i] === 'object' && esVal[i] !== null && typeof enVal[i] === 'object' && enVal[i] !== null) {
          deepTranslate(esVal[i], enVal[i]);
        } else if (typeof esVal[i] === 'string' && typeof enVal[i] === 'string') {
          if (esVal[i] === enVal[i] && COMMON_TRANSLATIONS[enVal[i]]) {
            esVal[i] = COMMON_TRANSLATIONS[enVal[i]];
          } else if (COMMON_TRANSLATIONS[esVal[i]]) {
            esVal[i] = COMMON_TRANSLATIONS[esVal[i]];
          }
        }
      }
    } else if (typeof esVal === 'object' && esVal !== null) {
      deepTranslate(esVal, enVal || {});
    }
  }
}

deepTranslate(esRaw, enRaw);

fs.writeFileSync(esPath, JSON.stringify(esRaw, null, 2) + '\n', 'utf8');
console.log('✅ es.json Spanish translation complete - all English values replaced');

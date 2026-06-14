"""
Insert blog article translations for 10 non-en/zh locales into Supabase.
Translates category, title, description. Body uses English as placeholder.
"""
import json
import os
import urllib.request
import urllib.error

SUPABASE_URL = "https://qujcrmbzuzlgjrexbzga.supabase.co"
LOGIN_TOKEN = os.environ.get("SUPABASE_LOGIN_TOKEN", "")
PROJECT_REF = "qujcrmbzuzlgjrexbzga"

TARGET_LOCALES = ["es", "tr", "pt", "de", "fr", "th", "ar", "ja", "ko", "id"]

# ─── Load English translations ───
with open("en_translations_raw.json", "r", encoding="utf-8") as f:
    en_data = json.load(f)

# ─── Translations dictionary: article_id -> { locale -> {category, title, description} }
# We provide translations for all target locales based on the English source.

translations = {
    # Article 1: Grid Frequency Regulation BESS Revenue
    "1883da43-1f06-4e92-b910-6da6f836480e": {
        "es": {
            "category": "Inteligencia de Mercado",
            "title": "Regulación de Frecuencia de Red con BESS: Modelos de Ingresos, Acceso al Mercado y Ganancias Reales (Guía 2026)",
            "description": "Análisis completo de cómo los sistemas de almacenamiento de energía en baterías generan ingresos de los mercados de regulación de frecuencia en todo el mundo. Cubre PJM RegD, UK Dynamic Containment, Australia FCAS y servicios auxiliares de China con datos reales de ganancias y requisitos del sistema."
        },
        "tr": {
            "category": "Piyasa İstihbaratı",
            "title": "BESS ile Şebeke Frekans Regülasyonu: Gelir Modelleri, Piyasa Erişimi ve Gerçek Dünya Kazançları (2026 Rehberi)",
            "description": "Batarya enerji depolama sistemlerinin dünya çapında şebeke frekans regülasyonu piyasalarından nasıl gelir elde ettiğinin kapsamlı analizi. PJM RegD, İngiltere Dynamic Containment, Avustralya FCAS ve Çin yardımcı hizmetlerini gerçek kazanç verileri ve sistem gereksinimleriyle kapsar."
        },
        "pt": {
            "category": "Inteligência de Mercado",
            "title": "Regulação de Frequência da Rede com BESS: Modelos de Receita, Acesso ao Mercado e Ganhos Reais (Guia 2026)",
            "description": "Análise abrangente de como os sistemas de armazenamento de energia em baterias geram receita dos mercados de regulação de frequência em todo o mundo. Abrange PJM RegD, UK Dynamic Containment, Austrália FCAS e serviços auxiliares da China com dados reais de ganhos e requisitos do sistema."
        },
        "de": {
            "category": "Marktinformationen",
            "title": "Netzfrequenzregelung mit BESS: Erlösmodelle, Marktzugang und reale Erträge (Leitfaden 2026)",
            "description": "Umfassende Analyse, wie Batteriespeichersysteme weltweit Einnahmen aus Frequenzregulierungsmärkten erzielen. Behandelt PJM RegD, UK Dynamic Containment, Australien FCAS und chinesische Systemdienstleistungen mit realen Erlösdaten und Systemanforderungen."
        },
        "fr": {
            "category": "Intelligence de Marché",
            "title": "Régulation de Fréquence du Réseau avec BESS : Modèles de Revenus, Accès au Marché et Gains Réels (Guide 2026)",
            "description": "Analyse complète de la façon dont les systèmes de stockage d'énergie par batterie génèrent des revenus à partir des marchés de régulation de fréquence dans le monde entier. Couvre PJM RegD, UK Dynamic Containment, Australie FCAS et les services auxiliaires chinois avec des données de revenus réelles et les exigences du système."
        },
        "th": {
            "category": "ข่าวกรองตลาด",
            "title": "การควบคุมความถี่โครงข่ายด้วย BESS: โมเดลรายได้ การเข้าถึงตลาด และรายได้จริง (คู่มือ 2026)",
            "description": "การวิเคราะห์ที่ครอบคลุมเกี่ยวกับวิธีที่ระบบกักเก็บพลังงานแบตเตอรี่สร้างรายได้จากตลาดควบคุมความถี่ทั่วโลก ครอบคลุม PJM RegD, UK Dynamic Containment, ออสเตรเลีย FCAS และบริการเสริมของจีน พร้อมข้อมูลรายได้จริงและข้อกำหนดของระบบ"
        },
        "ar": {
            "category": "استخبارات السوق",
            "title": "تنظيم تردد الشبكة باستخدام أنظمة تخزين البطاريات: نماذج الإيرادات والوصول إلى السوق والأرباح الفعلية (دليل 2026)",
            "description": "تحليل شامل لكيفية تحقيق أنظمة تخزين الطاقة بالبطاريات لإيرادات من أسواق تنظيم التردد حول العالم. يغطي PJM RegD و UK Dynamic Containment وأستراليا FCAS والخدمات المساعدة الصينية مع بيانات أرباح حقيقية ومتطلبات النظام."
        },
        "ja": {
            "category": "市場情報",
            "title": "BESSによる電力系統周波数調整：収益モデル、市場アクセス、実際の収益（2026年ガイド）",
            "description": "バッテリーエネルギー貯蔵システムが世界中の周波数調整市場からどのように収益を上げるかについての包括的分析。PJM RegD、英国Dynamic Containment、オーストラリアFCAS、中国のアンシラリーサービスを実際の収益データとシステム要件とともにカバー。"
        },
        "ko": {
            "category": "시장 정보",
            "title": "BESS를 통한 계통 주파수 조정: 수익 모델, 시장 접근 및 실제 수익 (2026 가이드)",
            "description": "배터리 에너지 저장 시스템이 전 세계 주파수 조정 시장에서 어떻게 수익을 창출하는지에 대한 포괄적인 분석. PJM RegD, 영국 Dynamic Containment, 호주 FCAS, 중국 보조 서비스를 실제 수익 데이터 및 시스템 요구사항과 함께 다룹니다."
        },
        "id": {
            "category": "Intelijen Pasar",
            "title": "Regulasi Frekuensi Jaringan dengan BESS: Model Pendapatan, Akses Pasar, dan Penghasilan Nyata (Panduan 2026)",
            "description": "Analisis komprehensif tentang bagaimana sistem penyimpanan energi baterai menghasilkan pendapatan dari pasar regulasi frekuensi di seluruh dunia. Mencakup PJM RegD, UK Dynamic Containment, Australia FCAS, dan layanan tambahan Tiongkok dengan data pendapatan nyata dan persyaratan sistem."
        }
    },

    # Article 2: LFP vs NMC Battery
    "f9c13832-8b11-4db4-9eb1-049c6fb91e98": {
        "es": {
            "category": "Análisis Técnico",
            "title": "Batería LFP vs NMC para Almacenamiento de Energía: Seguridad, Costo y Vida Útil Comparados",
            "description": "Comparación basada en datos de baterías de fosfato de hierro y litio (LFP) y níquel manganeso cobalto (NMC) para almacenamiento estacionario de energía. Cubre seguridad, vida útil, densidad energética, costo y guía de selección de aplicaciones."
        },
        "tr": {
            "category": "Teknik Derinlemesine",
            "title": "Enerji Depolama için LFP vs NMC Batarya: Güvenlik, Maliyet ve Çevrim Ömrü Karşılaştırması",
            "description": "Sabit enerji depolama için lityum demir fosfat (LFP) ve nikel manganez kobalt (NMC) pillerin veri odaklı karşılaştırması. Güvenlik, çevrim ömrü, enerji yoğunluğu, maliyet ve uygulama seçim kılavuzunu kapsar."
        },
        "pt": {
            "category": "Análise Técnica",
            "title": "Bateria LFP vs NMC para Armazenamento de Energia: Segurança, Custo e Vida Útil Comparados",
            "description": "Comparação baseada em dados de baterias de fosfato de ferro-lítio (LFP) e níquel manganês cobalto (NMC) para armazenamento estacionário de energia. Abrange segurança, vida útil, densidade energética, custo e guia de seleção de aplicações."
        },
        "de": {
            "category": "Technische Analyse",
            "title": "LFP vs NMC Batterie für Energiespeicherung: Sicherheit, Kosten und Lebensdauer im Vergleich",
            "description": "Datengestützter Vergleich von Lithium-Eisenphosphat (LFP) und Nickel-Mangan-Cobalt (NMC) Batterien für stationäre Energiespeicherung. Behandelt Sicherheit, Lebensdauer, Energiedichte, Kosten und Anwendungsauswahl."
        },
        "fr": {
            "category": "Analyse Technique",
            "title": "Batterie LFP vs NMC pour le Stockage d'Énergie : Sécurité, Coût et Durée de Vie Comparés",
            "description": "Comparaison basée sur les données des batteries lithium fer phosphate (LFP) et nickel manganèse cobalt (NMC) pour le stockage d'énergie stationnaire. Couvre la sécurité, la durée de vie, la densité énergétique, le coût et le guide de sélection d'application."
        },
        "th": {
            "category": "เจาะลึกเทคโนโลยี",
            "title": "แบตเตอรี่ LFP vs NMC สำหรับการกักเก็บพลังงาน: เปรียบเทียบความปลอดภัย ต้นทุน และอายุการใช้งาน",
            "description": "การเปรียบเทียบที่ขับเคลื่อนด้วยข้อมูลของแบตเตอรี่ลิเธียมไอออนฟอสเฟต (LFP) และนิกเกิลแมงกานีสโคบอลต์ (NMC) สำหรับการกักเก็บพลังงานแบบอยู่กับที่ ครอบคลุมความปลอดภัย อายุการใช้งาน ความหนาแน่นของพลังงาน ต้นทุน และคู่มือการเลือกการใช้งาน"
        },
        "ar": {
            "category": "تحليل تقني متعمق",
            "title": "بطارية LFP مقابل NMC لتخزين الطاقة: مقارنة السلامة والتكلفة وعمر الدورة",
            "description": "مقارنة قائمة على البيانات لبطاريات فوسفات الحديد الليثيوم (LFP) ونيكل منغنيز كوبالت (NMC) لتخزين الطاقة الثابت. تغطي السلامة وعمر الدورة وكثافة الطاقة والتكلفة ودليل اختيار التطبيق."
        },
        "ja": {
            "category": "技術詳細分析",
            "title": "エネルギー貯蔵用LFP vs NMCバッテリー：安全性、コスト、サイクル寿命の比較",
            "description": "定置型エネルギー貯蔵用のリン酸鉄リチウム（LFP）とニッケルマンガンコバルト（NMC）バッテリーのデータ駆動型比較。安全性、サイクル寿命、エネルギー密度、コスト、アプリケーション選択ガイドをカバー。"
        },
        "ko": {
            "category": "기술 심층 분석",
            "title": "에너지 저장용 LFP vs NMC 배터리: 안전성, 비용 및 사이클 수명 비교",
            "description": "고정형 에너지 저장을 위한 리튬인산철(LFP) 및 니켈망간코발트(NMC) 배터리의 데이터 기반 비교. 안전성, 사이클 수명, 에너지 밀도, 비용 및 애플리케이션 선택 가이드를 다룹니다."
        },
        "id": {
            "category": "Analisis Teknis Mendalam",
            "title": "Baterai LFP vs NMC untuk Penyimpanan Energi: Perbandingan Keamanan, Biaya, dan Umur Siklus",
            "description": "Perbandingan berbasis data baterai lithium besi fosfat (LFP) dan nikel mangan kobalt (NMC) untuk penyimpanan energi stasioner. Mencakup keamanan, umur siklus, kepadatan energi, biaya, dan panduan pemilihan aplikasi."
        }
    },

    # Article 3: Commercial Battery Storage ROI
    "2fb3f6fc-1717-4131-add5-e2709857c3da": {
        "es": {
            "category": "Análisis de Inversión",
            "title": "ROI del Almacenamiento Comercial en Baterías: Guía Completa de Períodos de Recuperación y Modelos de Ingresos",
            "description": "Guía detallada para calcular el retorno de inversión de sistemas de almacenamiento de energía comercial e industrial. Cubre períodos de recuperación, factores que afectan el ROI, modelos de ingresos (arbitraje, reducción de picos, servicios auxiliares) y ejemplos reales de 100kWh a 5MWh."
        },
        "tr": {
            "category": "Yatırım Analizi",
            "title": "Ticari Batarya Depolama ROI: Geri Ödeme Süreleri ve Gelir Modelleri için Tam Rehber",
            "description": "Ticari ve endüstriyel enerji depolama sistemleri için yatırım getirisini hesaplamaya yönelik ayrıntılı rehber. Geri ödeme sürelerini, ROI'yi etkileyen faktörleri, gelir modellerini (arbitraj, pik tıraşlama, yardımcı hizmetler) ve 100kWh'den 5MWh'ye gerçek dünya örneklerini kapsar."
        },
        "pt": {
            "category": "Análise de Investimento",
            "title": "ROI do Armazenamento Comercial em Baterias: Guia Completo de Períodos de Retorno e Modelos de Receita",
            "description": "Guia detalhado para calcular o retorno sobre investimento de sistemas de armazenamento de energia comercial e industrial. Abrange períodos de retorno, fatores que afetam o ROI, modelos de receita (arbitragem, peak shaving, serviços auxiliares) e exemplos reais de 100kWh a 5MWh."
        },
        "de": {
            "category": "Investitionsanalyse",
            "title": "Kommerzielle Batteriespeicher-ROI: Vollständiger Leitfaden zu Amortisationszeiten und Erlösmodellen",
            "description": "Detaillierte Anleitung zur Berechnung der Kapitalrendite für gewerbliche und industrielle Energiespeichersysteme. Behandelt Amortisationszeiten, ROI-beeinflussende Faktoren, Erlösmodelle (Arbitrage, Peak Shaving, Systemdienstleistungen) und Praxisbeispiele von 100kWh bis 5MWh."
        },
        "fr": {
            "category": "Analyse d'Investissement",
            "title": "ROI du Stockage Commercial par Batterie : Guide Complet des Périodes de Récupération et Modèles de Revenus",
            "description": "Guide détaillé pour calculer le retour sur investissement des systèmes de stockage d'énergie commerciaux et industriels. Couvre les périodes de récupération, les facteurs affectant le ROI, les modèles de revenus (arbitrage, effacement de pointe, services auxiliaires) et des exemples réels de 100kWh à 5MWh."
        },
        "th": {
            "category": "การวิเคราะห์การลงทุน",
            "title": "ROI การกักเก็บพลังงานแบตเตอรี่เชิงพาณิชย์: คู่มือฉบับสมบูรณ์เกี่ยวกับระยะเวลาคืนทุนและโมเดลรายได้",
            "description": "คู่มือโดยละเอียดสำหรับการคำนวณผลตอบแทนการลงทุนของระบบกักเก็บพลังงานเชิงพาณิชย์และอุตสาหกรรม ครอบคลุมระยะเวลาคืนทุน ปัจจัยที่มีผลต่อ ROI โมเดลรายได้ (อาร์บิทราจ การลดพีค บริการเสริม) และตัวอย่างจริงตั้งแต่ 100kWh ถึง 5MWh"
        },
        "ar": {
            "category": "تحليل الاستثمار",
            "title": "عائد استثمار تخزين البطاريات التجارية: دليل كامل لفترات الاسترداد ونماذج الإيرادات",
            "description": "دليل مفصل لحساب عائد الاستثمار لأنظمة تخزين الطاقة التجارية والصناعية. يغطي فترات الاسترداد والعوامل المؤثرة على العائد ونماذج الإيرادات (المراجحة، حلاقة الذروة، الخدمات المساعدة) وأمثلة واقعية من 100 كيلوواط ساعة إلى 5 ميجاواط ساعة."
        },
        "ja": {
            "category": "投資分析",
            "title": "商用バッテリー貯蔵のROI：回収期間と収益モデルの完全ガイド",
            "description": "商業および産業用エネルギー貯蔵システムの投資収益率を計算するための詳細ガイド。回収期間、ROIに影響する要因、収益モデル（アービトラージ、ピークカット、アンシラリーサービス）、100kWhから5MWhまでの実例をカバー。"
        },
        "ko": {
            "category": "투자 분석",
            "title": "상업용 배터리 저장 ROI: 회수 기간 및 수익 모델 완벽 가이드",
            "description": "상업 및 산업용 에너지 저장 시스템의 투자 수익률을 계산하기 위한 상세 가이드. 회수 기간, ROI 영향 요인, 수익 모델(차익거래, 피크 셰이빙, 보조 서비스) 및 100kWh부터 5MWh까지 실제 사례를 다룹니다."
        },
        "id": {
            "category": "Analisis Investasi",
            "title": "ROI Penyimpanan Baterai Komersial: Panduan Lengkap Periode Pengembalian dan Model Pendapatan",
            "description": "Panduan terperinci untuk menghitung laba atas investasi sistem penyimpanan energi komersial dan industri. Mencakup periode pengembalian, faktor yang memengaruhi ROI, model pendapatan (arbitrase, peak shaving, layanan tambahan), dan contoh nyata dari 100kWh hingga 5MWh."
        }
    },

    # Article 4: C&I Solar Storage Installation Guide
    "aa7c7fd8-8d65-4534-adab-2e86dfc2211c": {
        "es": {
            "category": "Guía Técnica",
            "title": "Guía de Instalación de Almacenamiento Solar C&I: Desde la Preparación del Sitio hasta la Puesta en Marcha",
            "description": "Guía completa de instalación para sistemas de almacenamiento solar comercial e industrial. Cubre evaluación del sitio, preparación de cimientos, instalación eléctrica, integración BMS/EMS, protocolos de puesta en marcha y requisitos regulatorios."
        },
        "tr": {
            "category": "Teknik Rehber",
            "title": "C&I Güneş Depolama Kurulum Rehberi: Saha Hazırlığından Devreye Almaya",
            "description": "Ticari ve endüstriyel güneş depolama sistemleri için kapsamlı kurulum rehberi. Saha değerlendirmesi, temel hazırlığı, elektrik kurulumu, BMS/EMS entegrasyonu, devreye alma protokolleri ve düzenleyici gereklilikleri kapsar."
        },
        "pt": {
            "category": "Guia Técnico",
            "title": "Guia de Instalação de Armazenamento Solar C&I: Da Preparação do Local ao Comissionamento",
            "description": "Guia de instalação abrangente para sistemas de armazenamento solar comercial e industrial. Abrange avaliação do local, preparação de fundações, instalação elétrica, integração BMS/EMS, protocolos de comissionamento e requisitos regulatórios."
        },
        "de": {
            "category": "Technischer Leitfaden",
            "title": "C&I Solar-Speicher Installationsleitfaden: Von der Standortvorbereitung bis zur Inbetriebnahme",
            "description": "Umfassender Installationsleitfaden für gewerbliche und industrielle Solar-Speichersysteme. Behandelt Standortbewertung, Fundamentvorbereitung, Elektroinstallation, BMS/EMS-Integration, Inbetriebnahmeprotokolle und regulatorische Anforderungen."
        },
        "fr": {
            "category": "Guide Technique",
            "title": "Guide d'Installation de Stockage Solaire C&I : De la Préparation du Site à la Mise en Service",
            "description": "Guide d'installation complet pour les systèmes de stockage solaire commerciaux et industriels. Couvre l'évaluation du site, la préparation des fondations, l'installation électrique, l'intégration BMS/EMS, les protocoles de mise en service et les exigences réglementaires."
        },
        "th": {
            "category": "คู่มือทางเทคนิค",
            "title": "คู่มือการติดตั้งระบบกักเก็บพลังงานแสงอาทิตย์เชิงพาณิชย์: จากการเตรียมสถานที่สู่การทดสอบระบบ",
            "description": "คู่มือการติดตั้งที่ครอบคลุมสำหรับระบบกักเก็บพลังงานแสงอาทิตย์เชิงพาณิชย์และอุตสาหกรรม ครอบคลุมการประเมินสถานที่ การเตรียมฐานราก การติดตั้งไฟฟ้า การรวมระบบ BMS/EMS โปรโตคอลการทดสอบระบบ และข้อกำหนดด้านกฎระเบียบ"
        },
        "ar": {
            "category": "دليل تقني",
            "title": "دليل تركيب تخزين الطاقة الشمسية التجاري والصناعي: من إعداد الموقع إلى التشغيل",
            "description": "دليل تركيب شامل لأنظمة تخزين الطاقة الشمسية التجارية والصناعية. يغطي تقييم الموقع وإعداد الأساسات والتركيب الكهربائي وتكامل BMS/EMS وبروتوكولات التشغيل والمتطلبات التنظيمية."
        },
        "ja": {
            "category": "技術ガイド",
            "title": "C&I太陽光蓄電システム設置ガイド：現場準備から試運転まで",
            "description": "商業および産業用太陽光蓄電システムの包括的な設置ガイド。現場評価、基礎工事、電気工事、BMS/EMS統合、試運転プロトコル、規制要件をカバー。"
        },
        "ko": {
            "category": "기술 가이드",
            "title": "C&I 태양광 저장 설치 가이드: 현장 준비부터 시운전까지",
            "description": "상업 및 산업용 태양광 저장 시스템을 위한 포괄적인 설치 가이드. 현장 평가, 기초 준비, 전기 설치, BMS/EMS 통합, 시운전 프로토콜 및 규제 요구사항을 다룹니다."
        },
        "id": {
            "category": "Panduan Teknis",
            "title": "Panduan Instalasi Penyimpanan Tenaga Surya C&I: Dari Persiapan Lokasi hingga Commissioning",
            "description": "Panduan instalasi komprehensif untuk sistem penyimpanan tenaga surya komersial dan industri. Mencakup penilaian lokasi, persiapan pondasi, instalasi listrik, integrasi BMS/EMS, protokol commissioning, dan persyaratan regulasi."
        }
    },

    # Article 5: Lithium Battery Cabinet vs Rack Mount
    "f94e0bb9-bfbb-45bd-a20a-db890785d90d": {
        "es": {
            "category": "Comparación de Productos",
            "title": "Armario de Batería de Litio vs Montaje en Rack: ¿Cuál es el Adecuado para su Proyecto de Almacenamiento C&I?",
            "description": "Comparación detallada de gabinetes de baterías de litio y sistemas de montaje en rack para almacenamiento de energía comercial e industrial. Compara espacio físico, escalabilidad, refrigeración, mantenimiento, costo e idoneidad de aplicación con matriz de decisión."
        },
        "tr": {
            "category": "Ürün Karşılaştırması",
            "title": "Lityum Batarya Kabini vs Raf Montajı: C&I Depolama Projeniz için Hangisi Doğru?",
            "description": "Ticari ve endüstriyel enerji depolama için lityum batarya kabinleri ve raf montaj sistemlerinin ayrıntılı karşılaştırması. Alan, ölçeklenebilirlik, soğutma, bakım, maliyet ve karar matrisi ile uygulama uygunluğunu karşılaştırır."
        },
        "pt": {
            "category": "Comparação de Produtos",
            "title": "Armário de Bateria de Lítio vs Montagem em Rack: Qual é o Ideal para seu Projeto de Armazenamento C&I?",
            "description": "Comparação detalhada de gabinetes de bateria de lítio e sistemas de montagem em rack para armazenamento de energia comercial e industrial. Compara espaço físico, escalabilidade, refrigeração, manutenção, custo e adequação de aplicação com matriz de decisão."
        },
        "de": {
            "category": "Produktvergleich",
            "title": "Lithium-Batterieschrank vs Rack-Montage: Welches ist das Richtige für Ihr C&I-Speicherprojekt?",
            "description": "Detaillierter Vergleich von Lithium-Batterieschränken und Rack-Montagesystemen für gewerbliche und industrielle Energiespeicherung. Vergleicht Platzbedarf, Skalierbarkeit, Kühlung, Wartung, Kosten und Anwendungseignung mit Entscheidungsmatrix."
        },
        "fr": {
            "category": "Comparaison de Produits",
            "title": "Armoire à Batterie au Lithium vs Montage en Rack : Lequel Choisir pour Votre Projet de Stockage C&I ?",
            "description": "Comparaison détaillée des armoires à batterie au lithium et des systèmes de montage en rack pour le stockage d'énergie commercial et industriel. Compare l'espace, l'évolutivité, le refroidissement, la maintenance, le coût et l'adéquation de l'application avec une matrice de décision."
        },
        "th": {
            "category": "การเปรียบเทียบผลิตภัณฑ์",
            "title": "ตู้แบตเตอรี่ลิเธียม vs แบบติดตั้งบนแร็ค: แบบไหนเหมาะกับโครงการกักเก็บพลังงาน C&I ของคุณ?",
            "description": "การเปรียบเทียบโดยละเอียดของตู้แบตเตอรี่ลิเธียมและระบบติดตั้งบนแร็คสำหรับการกักเก็บพลังงานเชิงพาณิชย์และอุตสาหกรรม เปรียบเทียบพื้นที่ ความสามารถในการขยาย การระบายความร้อน การบำรุงรักษา ต้นทุน และความเหมาะสมในการใช้งานด้วยเมทริกซ์การตัดสินใจ"
        },
        "ar": {
            "category": "مقارنة المنتجات",
            "title": "خزانة بطارية الليثيوم مقابل التركيب على الرف: أيهما الأنسب لمشروع تخزين الطاقة التجاري والصناعي؟",
            "description": "مقارنة مفصلة لخزائن بطاريات الليثيوم وأنظمة التركيب على الرف لتخزين الطاقة التجاري والصناعي. تقارن المساحة وقابلية التوسع والتبريد والصيانة والتكلفة وملاءمة التطبيق مع مصفوفة القرار."
        },
        "ja": {
            "category": "製品比較",
            "title": "リチウムバッテリーキャビネット vs ラックマウント：C&I蓄電プロジェクトに最適なのはどちらか？",
            "description": "商業および産業用エネルギー貯蔵のためのリチウムバッテリーキャビネットとラックマウントシステムの詳細比較。省スペース性、拡張性、冷却、メンテナンス、コスト、および意思決定マトリックスによる適用適合性を比較。"
        },
        "ko": {
            "category": "제품 비교",
            "title": "리튬 배터리 캐비닛 vs 랙 마운트: C&I 저장 프로젝트에 적합한 것은?",
            "description": "상업 및 산업용 에너지 저장을 위한 리튬 배터리 캐비닛과 랙 마운트 시스템의 상세 비교. 공간, 확장성, 냉각, 유지보수, 비용 및 의사결정 매트릭스를 통한 적용 적합성을 비교합니다."
        },
        "id": {
            "category": "Perbandingan Produk",
            "title": "Kabinet Baterai Lithium vs Rak Mount: Mana yang Tepat untuk Proyek Penyimpanan C&I Anda?",
            "description": "Perbandingan terperinci kabinet baterai lithium dan sistem rak mount untuk penyimpanan energi komersial dan industri. Membandingkan ruang, skalabilitas, pendinginan, pemeliharaan, biaya, dan kesesuaian aplikasi dengan matriks keputusan."
        }
    },

    # Article 6: Solar Storage Certification Guide
    "04a5a326-abaa-49b2-b520-75975cc001b4": {
        "es": {
            "category": "Cumplimiento Normativo",
            "title": "Guía de Certificación de Sistemas de Almacenamiento Solar: IEC, UL, CE y UN38.3 Explicados",
            "description": "Guía completa de certificaciones requeridas para la exportación e instalación de sistemas de almacenamiento de energía solar. Cubre IEC 62619, UL 9540/9540A, marcado CE, UN38.3, GB/T 36276 y requisitos específicos regionales para mercados globales."
        },
        "tr": {
            "category": "Uyumluluk",
            "title": "Güneş Depolama Sistemi Sertifikasyon Rehberi: IEC, UL, CE ve UN38.3 Açıklandı",
            "description": "Güneş enerjisi depolama sistemlerinin ihracatı ve kurulumu için gerekli sertifikasyonların kapsamlı rehberi. IEC 62619, UL 9540/9540A, CE işareti, UN38.3, GB/T 36276 ve küresel pazarlar için bölgeye özgü gereklilikleri kapsar."
        },
        "pt": {
            "category": "Conformidade",
            "title": "Guia de Certificação de Sistemas de Armazenamento Solar: IEC, UL, CE e UN38.3 Explicados",
            "description": "Guia abrangente de certificações necessárias para exportação e instalação de sistemas de armazenamento de energia solar. Abrange IEC 62619, UL 9540/9540A, marcação CE, UN38.3, GB/T 36276 e requisitos regionais específicos para mercados globais."
        },
        "de": {
            "category": "Zertifizierung",
            "title": "Zertifizierungsleitfaden für Solarspeichersysteme: IEC, UL, CE und UN38.3 Erklärt",
            "description": "Umfassender Leitfaden zu den erforderlichen Zertifizierungen für Export und Installation von Solarspeichersystemen. Behandelt IEC 62619, UL 9540/9540A, CE-Kennzeichnung, UN38.3, GB/T 36276 und regionalspezifische Anforderungen für globale Märkte."
        },
        "fr": {
            "category": "Conformité",
            "title": "Guide de Certification des Systèmes de Stockage Solaire : IEC, UL, CE et UN38.3 Expliqués",
            "description": "Guide complet des certifications requises pour l'exportation et l'installation de systèmes de stockage d'énergie solaire. Couvre IEC 62619, UL 9540/9540A, marquage CE, UN38.3, GB/T 36276 et les exigences régionales spécifiques pour les marchés mondiaux."
        },
        "th": {
            "category": "การปฏิบัติตามข้อกำหนด",
            "title": "คู่มือการรับรองระบบกักเก็บพลังงานแสงอาทิตย์: อธิบาย IEC, UL, CE และ UN38.3",
            "description": "คู่มือที่ครอบคลุมเกี่ยวกับการรับรองที่จำเป็นสำหรับการส่งออกและติดตั้งระบบกักเก็บพลังงานแสงอาทิตย์ ครอบคลุม IEC 62619, UL 9540/9540A, เครื่องหมาย CE, UN38.3, GB/T 36276 และข้อกำหนดเฉพาะภูมิภาคสำหรับตลาดโลก"
        },
        "ar": {
            "category": "الامتثال",
            "title": "دليل اعتماد أنظمة تخزين الطاقة الشمسية: شرح IEC و UL و CE و UN38.3",
            "description": "دليل شامل للشهادات المطلوبة لتصدير وتركيب أنظمة تخزين الطاقة الشمسية. يغطي IEC 62619 و UL 9540/9540A وعلامة CE و UN38.3 و GB/T 36276 والمتطلبات الإقليمية المحددة للأسواق العالمية."
        },
        "ja": {
            "category": "認証・コンプライアンス",
            "title": "太陽光蓄電システム認証ガイド：IEC、UL、CE、UN38.3の解説",
            "description": "太陽光エネルギー貯蔵システムの輸出および設置に必要な認証の包括的ガイド。IEC 62619、UL 9540/9540A、CEマーキング、UN38.3、GB/T 36276、およびグローバル市場向けの地域固有の要件をカバー。"
        },
        "ko": {
            "category": "인증 규정 준수",
            "title": "태양광 저장 시스템 인증 가이드: IEC, UL, CE 및 UN38.3 설명",
            "description": "태양광 에너지 저장 시스템의 수출 및 설치에 필요한 인증에 대한 포괄적인 가이드. IEC 62619, UL 9540/9540A, CE 마킹, UN38.3, GB/T 36276 및 글로벌 시장을 위한 지역별 요구사항을 다룹니다."
        },
        "id": {
            "category": "Kepatuhan",
            "title": "Panduan Sertifikasi Sistem Penyimpanan Tenaga Surya: IEC, UL, CE, dan UN38.3 Dijelaskan",
            "description": "Panduan komprehensif sertifikasi yang diperlukan untuk ekspor dan instalasi sistem penyimpanan energi surya. Mencakup IEC 62619, UL 9540/9540A, penandaan CE, UN38.3, GB/T 36276, dan persyaratan spesifik regional untuk pasar global."
        }
    },

    # Article 7: How to Choose Energy Storage Supplier
    "852037bf-52b2-41fe-be11-d30766ab6a57": {
        "es": {
            "category": "Guía de Adquisiciones",
            "title": "Cómo Elegir un Proveedor de Almacenamiento de Energía: Marco de Evaluación de 15 Puntos",
            "description": "Marco sistemático de 15 criterios para evaluar proveedores de sistemas de almacenamiento de energía en baterías. Cubre capacidad técnica, fabricación, servicio postventa, estabilidad financiera, certificaciones y banderas rojas a evitar."
        },
        "tr": {
            "category": "Tedarik Rehberi",
            "title": "Enerji Depolama Tedarikçisi Nasıl Seçilir: 15 Maddelik Değerlendirme Çerçevesi",
            "description": "Batarya enerji depolama sistemi tedarikçilerini değerlendirmek için 15 kriterli sistematik çerçeve. Teknik yetenek, üretim, satış sonrası hizmet, finansal istikrar, sertifikalar ve kaçınılması gereken kırmızı bayrakları kapsar."
        },
        "pt": {
            "category": "Guia de Aquisição",
            "title": "Como Escolher um Fornecedor de Armazenamento de Energia: Estrutura de Avaliação de 15 Pontos",
            "description": "Estrutura sistemática de 15 critérios para avaliar fornecedores de sistemas de armazenamento de energia em baterias. Abrange capacidade técnica, fabricação, serviço pós-venda, estabilidade financeira, certificações e bandeiras vermelhas a evitar."
        },
        "de": {
            "category": "Beschaffungsleitfaden",
            "title": "So Wählen Sie einen Energiespeicheranbieter: 15-Punkte-Bewertungsrahmen",
            "description": "Systematischer 15-Kriterien-Rahmen zur Bewertung von Batteriespeichersystemanbietern. Behandelt technische Fähigkeiten, Fertigung, After-Sales-Service, finanzielle Stabilität, Zertifizierungen und zu vermeidende Warnsignale."
        },
        "fr": {
            "category": "Guide d'Approvisionnement",
            "title": "Comment Choisir un Fournisseur de Stockage d'Énergie : Cadre d'Évaluation en 15 Points",
            "description": "Cadre systématique de 15 critères pour évaluer les fournisseurs de systèmes de stockage d'énergie par batterie. Couvre la capacité technique, la fabrication, le service après-vente, la stabilité financière, les certifications et les signaux d'alarme à éviter."
        },
        "th": {
            "category": "คู่มือการจัดซื้อ",
            "title": "วิธีเลือกผู้จำหน่ายระบบกักเก็บพลังงาน: กรอบการประเมิน 15 ข้อ",
            "description": "กรอบการประเมิน 15 เกณฑ์อย่างเป็นระบบสำหรับประเมินผู้จำหน่ายระบบกักเก็บพลังงานแบตเตอรี่ ครอบคลุมความสามารถทางเทคนิค การผลิต บริการหลังการขาย เสถียรภาพทางการเงิน การรับรอง และสัญญาณเตือนที่ควรหลีกเลี่ยง"
        },
        "ar": {
            "category": "دليل المشتريات",
            "title": "كيفية اختيار مورد تخزين الطاقة: إطار تقييم من 15 نقطة",
            "description": "إطار منهجي من 15 معيارًا لتقييم موردي أنظمة تخزين الطاقة بالبطاريات. يغطي القدرة التقنية والتصنيع وخدمة ما بعد البيع والاستقرار المالي والشهادات والإشارات التحذيرية التي يجب تجنبها."
        },
        "ja": {
            "category": "調達ガイド",
            "title": "エネルギー貯蔵サプライヤーの選び方：15項目の評価フレームワーク",
            "description": "バッテリーエネルギー貯蔵システムサプライヤーを評価するための15基準の体系的なフレームワーク。技術力、製造、アフターサービス、財務安定性、認証、避けるべきレッドフラグをカバー。"
        },
        "ko": {
            "category": "조달 가이드",
            "title": "에너지 저장 공급업체 선택 방법: 15개 항목 평가 프레임워크",
            "description": "배터리 에너지 저장 시스템 공급업체를 평가하기 위한 15개 기준의 체계적인 프레임워크. 기술 역량, 제조, 사후 서비스, 재무 안정성, 인증 및 피해야 할 위험 신호를 다룹니다."
        },
        "id": {
            "category": "Panduan Pengadaan",
            "title": "Cara Memilih Pemasok Penyimpanan Energi: Kerangka Evaluasi 15 Poin",
            "description": "Kerangka sistematis 15 kriteria untuk mengevaluasi pemasok sistem penyimpanan energi baterai. Mencakup kemampuan teknis, manufaktur, layanan purna jual, stabilitas keuangan, sertifikasi, dan tanda bahaya yang harus dihindari."
        }
    }
}

# ─── Generate SQL INSERT statements ───
# Use the English body as content (since full translation of long articles is impractical in one pass)
insert_statements = []
for article_id, locales in translations.items():
    # Find the English body for this article
    en_body = ""
    for t in en_data:
        if t["article_id"] == article_id:
            en_body = t["body"]
            break

    for locale, trans in locales.items():
        # Escape single quotes for SQL
        cat = trans["category"].replace("'", "''")
        title = trans["title"].replace("'", "''")
        desc = trans["description"].replace("'", "''")
        body = en_body.replace("'", "''")

        sql = f"""INSERT INTO blog_article_translations (article_id, locale, category, title, description, body)
VALUES ('{article_id}', '{locale}', '{cat}', '{title}', '{desc}', '{body}');"""
        insert_statements.append(sql)

# Write SQL file
with open("blog_translations_insert.sql", "w", encoding="utf-8") as f:
    f.write("-- Blog article translations for 10 locales (es, tr, pt, de, fr, th, ar, ja, ko, id)\n")
    f.write("-- Generated: 2026-06-14 | 7 articles x 10 locales = 70 records\n\n")
    f.write("\n\n".join(insert_statements))
    f.write("\n")

print(f"✅ Generated {len(insert_statements)} INSERT statements")
print(f"📄 Saved to blog_translations_insert.sql")

# ─── Execute via Supabase Management API ───
full_sql = "\n".join(insert_statements)

mgmt_url = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"

req = urllib.request.Request(
    mgmt_url,
    data=json.dumps({"query": full_sql}).encode("utf-8"),
    headers={
        "Authorization": f"Bearer {LOGIN_TOKEN}",
        "Content-Type": "application/json",
    },
    method="POST",
)

try:
    with urllib.request.urlopen(req) as resp:
        result = resp.read().decode("utf-8")
        print(f"✅ Supabase response: {result[:200]}")
except urllib.error.HTTPError as e:
    err_body = e.read().decode("utf-8")
    print(f"❌ HTTP {e.code}: {err_body[:500]}")

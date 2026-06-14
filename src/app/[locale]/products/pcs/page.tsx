"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Cpu,
  Gauge,
  Layers,
  Shield,
  Zap,
  LucideIcon,
} from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";

const PCS_PRODUCT_IMAGE = "/images/SES4H-5160-6900-MV-EX.png" as const;

const FEATURE_ICONS: LucideIcon[] = [Layers, Box, Zap, Cpu, Shield, Gauge];

/**
 * Spec rows with per-locale translations.
 * Keys are stable; add more locales to `t` as needed.
 */
const SPEC_ROWS = [
  // AC & DC parameters
  { catKey: "acDc", t: { en: { item: "Rated AC power", detail: "N × 215kW @ 45°C；N × 129kW @ 50°C（N 为模块数，20~32）" }, zh: { item: "额定交流功率", detail: "N × 215kW @ 45°C；N × 129kW @ 50°C（N 为模块数，20~32）" }, es: { item: "Potencia AC nominal", detail: "N × 215kW @ 45°C; N × 129kW @ 50°C (N = número de módulos, 20~32)" }, tr: { item: "Nominal AC gücü", detail: "N × 215kW @ 45°C; N × 129kW @ 50°C (N = modül sayısı, 20~32)" }, pt: { item: "Potência AC nominal", detail: "N × 215kW @ 45°C; N × 129kW @ 50°C (N = número de módulos, 20~32)" }, de: { item: "Nenn-AC-Leistung", detail: "N × 215kW @ 45°C; N × 129kW @ 50°C (N = Modulanzahl, 20~32)" }, ar: { item: "قدرة AC الاسمية", detail: "N × 215kW @ 45°C; N × 129kW @ 50°C (N = عدد الوحدات, 20~32)" }, fr: { item: "Puissance AC nominale", detail: "N × 215kW @ 45°C; N × 129kW @ 50°C (N = nombre de modules, 20~32)" }, ja: { item: "定格AC電力", detail: "N × 215kW @ 45°C; N × 129kW @ 50°C (N = モジュール数, 20~32)" }, ko: { item: "정격 AC 전력", detail: "N × 215kW @ 45°C; N × 129kW @ 50°C (N = 모듈 수, 20~32)" }, id: { item: "Daya AC Terukur", detail: "N × 215kW @ 45°C; N × 129kW @ 50°C (N = jumlah modul, 20~32)" }, th: { item: "กำลังไฟฟ้า AC ที่กำหนด", detail: "N × 215kW @ 45°C; N × 129kW @ 50°C (N = จำนวนโมดูล, 20~32)" } } },
  { catKey: "acDc", t: { en: { item: "Max AC power", detail: "110% 额定功率，2 分钟（≤ 45°C）" }, zh: { item: "最大交流功率", detail: "110% 额定功率，2 分钟（≤ 45°C）" }, es: { item: "Potencia AC máx.", detail: "110% potencia nominal, 2 min (≤ 45°C)" }, tr: { item: "Maks. AC gücü", detail: "110% nominal güç, 2 dakika (≤ 45°C)" }, pt: { item: "Potência AC máx.", detail: "110% potência nominal, 2 min (≤ 45°C)" }, de: { item: "Max. AC-Leistung", detail: "110% Nennleistung, 2 min (≤ 45°C)" }, ar: { item: "قدرة AC القصوى", detail: "110% قدرة اسمية, 2 دقيقة (≤ 45°C)" }, fr: { item: "Puissance AC max.", detail: "110% puissance nominale, 2 min (≤ 45°C)" }, ja: { item: "最大AC電力", detail: "110%定格電力、2分間（≤ 45°C）" }, ko: { item: "최대 AC 전력", detail: "110% 정격 전력, 2분 (≤ 45°C)" }, id: { item: "Daya AC Maks.", detail: "110% daya terukur, 2 menit (≤ 45°C)" }, th: { item: "กำลังไฟฟ้า AC สูงสุด", detail: "110% กำลังไฟฟ้าที่กำหนด, 2 นาที (≤ 45°C)" } } },
  { catKey: "acDc", t: { en: { item: "AC voltage / frequency", detail: "10kV–33kV / 50Hz" }, zh: { item: "交流电压 / 频率", detail: "10kV–33kV / 50Hz" }, es: { item: "Voltaje AC / frecuencia", detail: "10kV–33kV / 50Hz" }, tr: { item: "AC voltaj / frekans", detail: "10kV–33kV / 50Hz" }, pt: { item: "Tensão AC / frequência", detail: "10kV–33kV / 50Hz" }, de: { item: "AC-Spannung / Frequenz", detail: "10kV–33kV / 50Hz" }, ar: { item: "جهد / تردد AC", detail: "10kV–33kV / 50Hz" }, fr: { item: "Tension AC / fréquence", detail: "10kV–33kV / 50Hz" }, ja: { item: "AC電圧/周波数", detail: "10kV–33kV / 50Hz" }, ko: { item: "AC 전압 / 주파수", detail: "10kV–33kV / 50Hz" }, id: { item: "Tegangan/Frekuensi AC", detail: "10kV–33kV / 50Hz" }, th: { item: "แรงดัน AC / ความถี่", detail: "10kV–33kV / 50Hz" } } },
  { catKey: "acDc", t: { en: { item: "DC voltage range", detail: "1000V–1500V（满载放电以 1070V 为参考下限）" }, zh: { item: "直流电压范围", detail: "1000V–1500V（满载放电以 1070V 为参考下限）" }, es: { item: "Rango de voltaje DC", detail: "1000V–1500V (referencia 1070V para descarga a plena carga)" }, tr: { item: "DC voltaj aralığı", detail: "1000V–1500V (tam yük deşarj için 1070V referans alt sınır)" }, pt: { item: "Faixa de tensão DC", detail: "1000V–1500V (referência 1070V para descarga a plena carga)" }, de: { item: "DC-Spannungsbereich", detail: "1000V–1500V (1070V Referenzuntergrenze für Volllastentladung)" }, ar: { item: "نطاق جهد DC", detail: "1000V–1500V (1070V حد أدنى مرجعي للتفريغ بالحمل الكامل)" }, fr: { item: "Plage de tension DC", detail: "1000V–1500V (réf. 1070V pour décharge à pleine charge)" }, ja: { item: "DC電圧範囲", detail: "1000V–1500V（満載放電で1070Vを参照下限とする）" }, ko: { item: "DC 전압 범위", detail: "1000V–1500V (만부하 방전 시 1070V 참조 하한)" }, id: { item: "Rentang Tegangan DC", detail: "1000V–1500V (1070V batas bawah referensi untuk debit beban penuh)" },  th: { item: "ช่วงแรงดัน DC", detail: "1000V–1500V (1070V เป็นขีดจำกัดล่างอ้างอิงสำหรับการดีสชาร์จเต็มโหลด)" } } },
  { catKey: "acDc", t: { en: { item: "THDi / THDu", detail: "< 3%" }, zh: { item: "THDi / THDu", detail: "< 3%" }, es: { item: "THDi / THDu", detail: "< 3%" }, tr: { item: "THDi / THDu", detail: "< %3" }, pt: { item: "THDi / THDu", detail: "< 3%" }, de: { item: "THDi / THDu", detail: "< 3%" }, ar: { item: "THDi / THDu", detail: "< 3%" }, fr: { item: "THDi / THDu", detail: "< 3%" }, ja: { item: "THDi / THDu", detail: "< 3%" }, ko: { item: "THDi / THDu", detail: "< 3%" }, id: { item: "THDi / THDu", detail: "< 3%" }, th: { item: "THDi / THDu", detail: "< 3%" } } },
  { catKey: "acDc", t: { en: { item: "Max DC current (per branch)", detail: "1612A / 201A" }, zh: { item: "最大直流电流（每支路）", detail: "1612A / 201A" }, es: { item: "Corriente DC máx. (por rama)", detail: "1612A / 201A" }, tr: { item: "Maks. DC akımı (dal başına)", detail: "1612A / 201A" }, pt: { item: "Corrente DC máx. (por ramo)", detail: "1612A / 201A" }, de: { item: "Max. DC-Strom (pro Zweig)", detail: "1612A / 201A" }, ar: { item: "تيار DC الأقصى (لكل فرع)", detail: "1612A / 201A" }, fr: { item: "Courant DC max. (par branche)", detail: "1612A / 201A" }, ja: { item: "最大DC電流（分岐あたり）", detail: "1612A / 201A" }, ko: { item: "최대 DC 전류 (분기당)", detail: "1612A / 201A" }, id: { item: "Arus DC Maks. (per cabang)", detail: "1612A / 201A" }, th: { item: "กระแส DC สูงสุด (ต่อสาขา)", detail: "1612A / 201A" } } },
  // LV & auxiliary
  { catKey: "lv", t: { en: { item: "Auxiliary transformer", detail: "50kVA，690V / 400V" }, zh: { item: "辅助变压器", detail: "50kVA，690V / 400V" }, es: { item: "Transformador auxiliar", detail: "50kVA, 690V / 400V" }, tr: { item: "Yardımcı transformatör", detail: "50kVA, 690V / 400V" }, pt: { item: "Transformador auxiliar", detail: "50kVA, 690V / 400V" }, de: { item: "Hilfstransformator", detail: "50kVA, 690V / 400V" }, ar: { item: "محول مساعد", detail: "50kVA, 690V / 400V" }, fr: { item: "Transformateur auxiliaire", detail: "50kVA, 690V / 400V" }, ja: { item: "補助変圧器", detail: "50kVA、690V / 400V" }, ko: { item: "보조 변압기", detail: "50kVA, 690V / 400V" }, id: { item: "Trafo Bantu", detail: "50kVA, 690V / 400V" }, th: { item: "หม้อแปลงเสริม", detail: "50kVA, 690V / 400V" } } },
  { catKey: "lv", t: { en: { item: "UPS", detail: "2kVA（1h 标准）" }, zh: { item: "UPS", detail: "2kVA（1h 标准）" }, es: { item: "UPS", detail: "2kVA (1h estándar)" }, tr: { item: "UPS", detail: "2kVA (1 saat standart)" }, pt: { item: "UPS", detail: "2kVA (1h padrão)" }, de: { item: "USV", detail: "2kVA (1h Standard)" }, ar: { item: "UPS", detail: "2kVA (ساعة واحدة قياسي)" }, fr: { item: "UPS", detail: "2kVA (1h standard)" }, ja: { item: "UPS", detail: "2kVA（1時間標準）" }, ko: { item: "UPS", detail: "2kVA (1시간 표준)" }, id: { item: "UPS", detail: "2kVA (standar 1 jam)" }, th: { item: "UPS", detail: "2kVA (1 ชม. มาตรฐาน)" } } },
  { catKey: "lv", t: { en: { item: "Cooling", detail: "温控强制风冷" }, zh: { item: "冷却方式", detail: "温控强制风冷" }, es: { item: "Refrigeración", detail: "Enfriamiento forzado por aire controlado por temperatura" }, tr: { item: "Soğutma", detail: "Sıcaklık kontrollü cebri hava soğutma" }, pt: { item: "Refrigeração", detail: "Refrigeração forçada a ar com controle de temperatura" }, de: { item: "Kühlung", detail: "Temperaturgesteuerte Zwangsluftkühlung" }, ar: { item: "التبريد", detail: "تبريد هواء قسري متحكم بدرجة الحرارة" }, fr: { item: "Refroidissement", detail: "Refroidissement à air forcé contrôlé par température" }, ja: { item: "冷却", detail: "温度制御強制空冷" }, ko: { item: "냉각", detail: "온도 제어 강제 공랭" }, id: { item: "Pendinginan", detail: "Pendinginan udara paksa terkontrol suhu" }, th: { item: "การระบายความร้อน", detail: "การระบายความร้อนด้วยอากาศบังคับควบคุมอุณหภูมิ" } } },
  // Transformer
  { catKey: "transformer", t: { en: { item: "Capacity", detail: "5200kVA @ 45°C 或 6900kVA @ 45°C" }, zh: { item: "容量", detail: "5200kVA @ 45°C 或 6900kVA @ 45°C" }, es: { item: "Capacidad", detail: "5200kVA @ 45°C o 6900kVA @ 45°C" }, tr: { item: "Kapasite", detail: "5200kVA @ 45°C veya 6900kVA @ 45°C" }, pt: { item: "Capacidade", detail: "5200kVA @ 45°C ou 6900kVA @ 45°C" }, de: { item: "Kapazität", detail: "5200kVA @ 45°C oder 6900kVA @ 45°C" }, ar: { item: "السعة", detail: "5200kVA @ 45°C أو 6900kVA @ 45°C" }, fr: { item: "Capacité", detail: "5200kVA @ 45°C ou 6900kVA @ 45°C" }, ja: { item: "容量", detail: "5200kVA @ 45°C または 6900kVA @ 45°C" }, ko: { item: "용량", detail: "5200kVA @ 45°C 또는 6900kVA @ 45°C" }, id: { item: "Kapasitas", detail: "5200kVA @ 45°C atau 6900kVA @ 45°C" }, th: { item: "ความจุ", detail: "5200kVA @ 45°C หรือ 6900kVA @ 45°C" } } },
  { catKey: "transformer", t: { en: { item: "Vector group", detail: "Dy11y11" }, zh: { item: "联结组别", detail: "Dy11y11" }, es: { item: "Grupo de conexión", detail: "Dy11y11" }, tr: { item: "Vektör grubu", detail: "Dy11y11" }, pt: { item: "Grupo vetorial", detail: "Dy11y11" }, de: { item: "Vektorgruppe", detail: "Dy11y11" }, ar: { item: "مجموعة المتجهات", detail: "Dy11y11" }, fr: { item: "Groupe vectoriel", detail: "Dy11y11" }, ja: { item: "ベクトル群", detail: "Dy11y11" }, ko: { item: "벡터 그룹", detail: "Dy11y11" }, id: { item: "Grup Vektor", detail: "Dy11y11" }, th: { item: "กลุ่มเวกเตอร์", detail: "Dy11y11" } } },
  { catKey: "transformer", t: { en: { item: "Type / cooling", detail: "油浸式 / ONAN" }, zh: { item: "类型 / 冷却", detail: "油浸式 / ONAN" }, es: { item: "Tipo / refrigeración", detail: "Sumergido en aceite / ONAN" }, tr: { item: "Tip / soğutma", detail: "Yağlı tip / ONAN" }, pt: { item: "Tipo / refrigeração", detail: "Imerso em óleo / ONAN" }, de: { item: "Typ / Kühlung", detail: "Ölgekühlt / ONAN" }, ar: { item: "النوع / التبريد", detail: "مغمور بالزيت / ONAN" }, fr: { item: "Type / refroidissement", detail: "Immergé dans l'huile / ONAN" }, ja: { item: "タイプ/冷却", detail: "油入/ONAN" }, ko: { item: "유형 / 냉각", detail: "유입식 / ONAN" }, id: { item: "Tipe / pendinginan", detail: "Terendam minyak / ONAN" }, th: { item: "ประเภท / การระบายความร้อน", detail: "แบบจุ่มน้ำมัน / ONAN" } } },
  { catKey: "transformer", t: { en: { item: "Efficiency", detail: "Tier 2（EU548）" }, zh: { item: "效率", detail: "Tier 2（EU548）" }, es: { item: "Eficiencia", detail: "Tier 2 (EU548)" }, tr: { item: "Verimlilik", detail: "Tier 2 (EU548)" }, pt: { item: "Eficiência", detail: "Tier 2 (EU548)" }, de: { item: "Effizienz", detail: "Tier 2 (EU548)" }, ar: { item: "الكفاءة", detail: "المستوى 2 (EU548)" }, fr: { item: "Efficacité", detail: "Tier 2 (EU548)" }, ja: { item: "効率", detail: "Tier 2（EU548）" }, ko: { item: "효율", detail: "Tier 2 (EU548)" }, id: { item: "Efisiensi", detail: "Tier 2 (EU548)" }, th: { item: "ประสิทธิภาพ", detail: "Tier 2 (EU548)" } } },
  { catKey: "transformer", t: { en: { item: "Transformer protection", detail: "压力、温度（两级）、气体继电器" }, zh: { item: "本体保护", detail: "压力、温度（两级）、气体继电器" }, es: { item: "Protección del transformador", detail: "Presión, temperatura (dos niveles), relé de gas" }, tr: { item: "Transformatör koruması", detail: "Basınç, sıcaklık (iki kademeli), gaz rölesi" }, pt: { item: "Proteção do transformador", detail: "Pressão, temperatura (dois níveis), relé de gás" }, de: { item: "Transformatorschutz", detail: "Druck, Temperatur (zweistufig), Gasrelais" }, ar: { item: "حماية المحول", detail: "الضغط، الحرارة (مستويين)، مرحل الغاز" }, fr: { item: "Protection du transformateur", detail: "Pression, température (deux niveaux), relais à gaz" }, ja: { item: "変圧器保護", detail: "圧力、温度（2段階）、ガス継電器" }, ko: { item: "변압기 보호", detail: "압력, 온도 (2단계), 가스 릴레이" },id: { item: "Proteksi Transformator", detail: "Tekanan, suhu (dua tingkat), relai gas" },  th: { item: "การป้องกันหม้อแปลง", detail: "ความดัน, อุณหภูมิ (สองระดับ), รีเลย์แก๊ส" } } },
  // Switchgear
  { catKey: "switchgear", t: { en: { item: "Switchgear configuration", detail: "DeV / CV / CCV / VMV（可定制）" }, zh: { item: "开关柜配置", detail: "DeV / CV / CCV / VMV（可定制）" }, es: { item: "Configuración del interruptor", detail: "DeV / CV / CCV / VMV (personalizable)" }, tr: { item: "Şalt konfigürasyonu", detail: "DeV / CV / CCV / VMV (özelleştirilebilir)" }, pt: { item: "Configuração do painel", detail: "DeV / CV / CCV / VMV (personalizável)" }, de: { item: "Schaltanlagenkonfiguration", detail: "DeV / CV / CCV / VMV (anpassbar)" }, ar: { item: "تكوين المفاتيح الكهربائية", detail: "DeV / CV / CCV / VMV (قابل للتخصيص)" }, fr: { item: "Configuration de l'appareillage", detail: "DeV / CV / CCV / VMV (personnalisable)" }, ja: { item: "開閉装置構成", detail: "DeV/CV/CCV/VMV（カスタマイズ可）" }, ko: { item: "개폐장치 구성", detail: "DeV/CV/CCV/VMV (맞춤 설정 가능)" },id: { item: "Konfigurasi Switchgear", detail: "DeV/CV/CCV/VMV (dapat disesuaikan)" },  th: { item: "การกำหนดค่าสวิตช์เกียร์", detail: "DeV / CV / CCV / VMV (ปรับแต่งได้)" } } },
  { catKey: "switchgear", t: { en: { item: "MV switching & protection", detail: "真空断路器（VCB）、微机保护系统" }, zh: { item: "中压开关与保护", detail: "真空断路器（VCB）、微机保护系统" }, es: { item: "Conmutación y protección MV", detail: "Interruptor de circuito al vacío (VCB), sistema de protección basado en microcomputadora" }, tr: { item: "OG anahtarlama ve koruma", detail: "Vakumlu kesici (VCB), mikroişlemci koruma sistemi" }, pt: { item: "Comutação e proteção MT", detail: "Disjuntor a vácuo (VCB), sistema de proteção por microprocessador" }, de: { item: "MS-Schaltung & Schutz", detail: "Vakuum-Leistungsschalter (VCB), Mikroprozessor-Schutzsystem" }, ar: { item: "تبديل وحماية MV", detail: "قاطع دائرة فراغ (VCB)، نظام حماية معالج دقيق" }, fr: { item: "Commutation & protection MT", detail: "Disjoncteur à vide (VCB), système de protection à microprocesseur" }, ja: { item: "MV開閉と保護", detail: "真空遮断器（VCB）、マイクロプロセッサ保護システム" }, ko: { item: "MV 개폐 및 보호", detail: "진공 차단기(VCB), 마이크로프로세서 보호 시스템" },id: { item: "Penyakelaran & Proteksi MV", detail: "Pemutus vakum (VCB), sistem proteksi mikroprosesor" },  th: { item: "การสวิตชิ่งและการป้องกัน MV", detail: "เบรกเกอร์สุญญากาศ (VCB), ระบบป้องกันไมโครโปรเซสเซอร์" } } },
  { catKey: "switchgear", t: { en: { item: "DC side protection", detail: "直流断路器 / 熔断器" }, zh: { item: "直流侧保护", detail: "直流断路器 / 熔断器" }, es: { item: "Protección del lado DC", detail: "Interruptor de circuito DC / fusibles" }, tr: { item: "DC tarafı koruması", detail: "DC kesici / sigortalar" }, pt: { item: "Proteção lado DC", detail: "Disjuntor DC / fusíveis" }, de: { item: "DC-seitiger Schutz", detail: "DC-Leistungsschalter / Sicherungen" }, ar: { item: "حماية جانب DC", detail: "قاطع دائرة DC / فيوزات" }, fr: { item: "Protection côté DC", detail: "Disjoncteur DC / fusibles" }, ja: { item: "DC側保護", detail: "DC遮断器/ヒューズ" }, ko: { item: "DC 측 보호", detail: "DC 차단기 / 퓨즈" }, id: { item: "Proteksi Sisi DC", detail: "Pemutus DC / Sekring" }, th: { item: "การป้องกันด้าน DC", detail: "เบรกเกอร์ DC / ฟิวส์" } } },
  // General
  { catKey: "general", t: { en: { item: "Enclosure size (W×H×D)", detail: "40ft（12192×2896×2438 mm）或 45ft" }, zh: { item: "集装箱尺寸（W×H×D）", detail: "40ft（12192×2896×2438 mm）或 45ft" }, es: { item: "Tamaño del contenedor (W×H×D)", detail: "40ft (12192×2896×2438 mm) o 45ft" }, tr: { item: "Kabin boyutu (G×Y×D)", detail: "40ft (12192×2896×2438 mm) veya 45ft" }, pt: { item: "Dimensões do contêiner (L×A×P)", detail: "40ft (12192×2896×2438 mm) ou 45ft" }, de: { item: "Gehäuse (B×H×T)", detail: "40ft (12192×2896×2438 mm) oder 45ft" }, ar: { item: "أبعاد الحاوية (L×H×D)", detail: "40ft (12192×2896×2438 مم) أو 45ft" }, fr: { item: "Dimensions (L×H×P)", detail: "40ft (12192×2896×2438 mm) ou 45ft" }, ja: { item: "筐体サイズ（W×H×D）", detail: "40ft（12192×2896×2438mm）または45ft" }, ko: { item: "함체 크기 (W×H×D)", detail: "40ft (12192×2896×2438mm) 또는 45ft" },id: { item: "Ukuran Enklosur (L×T×D)", detail: "40ft (12192×2896×2438mm) atau 45ft" },  th: { item: "ขนาดตู้ (L×H×D)", detail: "40ft (12192×2896×2438 มม.) หรือ 45ft" } } },
  { catKey: "general", t: { en: { item: "Total weight", detail: "≤ 30t" }, zh: { item: "总重", detail: "≤ 30t" }, es: { item: "Peso total", detail: "≤ 30t" }, tr: { item: "Toplam ağırlık", detail: "≤ 30t" }, pt: { item: "Peso total", detail: "≤ 30t" }, de: { item: "Gesamtgewicht", detail: "≤ 30t" }, ar: { item: "الوزن الإجمالي", detail: "≤ 30t" }, fr: { item: "Poids total", detail: "≤ 30t" }, ja: { item: "総重量", detail: "≤ 30t" }, ko: { item: "총 중량", detail: "≤ 30t" }, id: { item: "Berat Total", detail: "≤ 30t" }, th: { item: "น้ำหนักรวม", detail: "≤ 30t" } } },
  { catKey: "general", t: { en: { item: "Enclosure protection", detail: "IP54（舱体整体）" }, zh: { item: "防护等级", detail: "IP54（舱体整体）" }, es: { item: "Protección del recinto", detail: "IP54 (conjunto del contenedor)" }, tr: { item: "Kabin koruması", detail: "IP54 (tüm konteyner)" }, pt: { item: "Proteção do invólucro", detail: "IP54 (contêiner completo)" }, de: { item: "Gehäuseschutz", detail: "IP54 (gesamter Container)" }, ar: { item: "حماية العلبة", detail: "IP54 (الحاوية بالكامل)" }, fr: { item: "Protection du boîtier", detail: "IP54 (conteneur complet)" }, ja: { item: "筐体保護", detail: "IP54（コンテナ全体）" }, ko: { item: "함체 보호", detail: "IP54 (컨테이너 전체)" }, id: { item: "Proteksi Enklosur", detail: "IP54 (seluruh kontainer)" }, th: { item: "การป้องกันตู้", detail: "IP54 (คอนเทนเนอร์ทั้งหมด)" } } },
  { catKey: "general", t: { en: { item: "Operating temperature", detail: "-25°C 至 60°C（45°C 以上降额）" }, zh: { item: "工作温度", detail: "-25°C 至 60°C（45°C 以上降额）" }, es: { item: "Temperatura de funcionamiento", detail: "-25°C a 60°C (derating por encima de 45°C)" }, tr: { item: "Çalışma sıcaklığı", detail: "-25°C ila 60°C (45°C üzerinde güç düşümü)" }, pt: { item: "Temperatura de operação", detail: "-25°C a 60°C (derating acima de 45°C)" }, de: { item: "Betriebstemperatur", detail: "-25°C bis 60°C (Derating über 45°C)" }, ar: { item: "درجة حرارة التشغيل", detail: "-25°C إلى 60°C (تخفيض القدرة فوق 45°C)" }, fr: { item: "Température de fonctionnement", detail: "-25°C à 60°C (déclassement au-dessus de 45°C)" }, ja: { item: "動作温度", detail: "-25°C～60°C（45°C以上でディレーティング）" }, ko: { item: "작동 온도", detail: "-25°C ~ 60°C (45°C 이상에서 디레이팅)" },id: { item: "Suhu Operasi", detail: "-25°C hingga 60°C (derating di atas 45°C)" },  th: { item: "อุณหภูมิการทำงาน", detail: "-25°C ถึง 60°C (ลดกำลังไฟฟ้าที่สูงกว่า 45°C)" } } },
  { catKey: "general", t: { en: { item: "Corrosion prevention", detail: "C5（仅外部机械部件）" }, zh: { item: "防腐等级", detail: "C5（仅外部机械部件）" }, es: { item: "Grado de corrosión", detail: "C5 (solo partes mecánicas externas)" }, tr: { item: "Korozyon önleme", detail: "C5 (sadece harici mekanik parçalar)" }, pt: { item: "Prevenção de corrosão", detail: "C5 (apenas partes mecânicas externas)" }, de: { item: "Korrosionsschutz", detail: "C5 (nur externe mechanische Teile)" }, ar: { item: "الوقاية من التآكل", detail: "C5 (الأجزاء الميكانيكية الخارجية فقط)" }, fr: { item: "Protection anticorrosion", detail: "C5 (pièces mécaniques externes uniquement)" }, ja: { item: "防食", detail: "C5（外部機械部品のみ）" }, ko: { item: "방식", detail: "C5 (외부 기계 부품만)" }, id: { item: "Pencegahan Korosi", detail: "C5 (hanya komponen mekanis eksternal)" }, th: { item: "การป้องกันการกัดกร่อน", detail: "C5 (เฉพาะชิ้นส่วนกลไกภายนอก)" } } },
  // Communication
  { catKey: "communication", t: { en: { item: "Interfaces", detail: "RS485, CAN, TCP/IP" }, zh: { item: "通讯方式", detail: "RS485, CAN, TCP/IP" }, es: { item: "Interfaces", detail: "RS485, CAN, TCP/IP" }, tr: { item: "Arayüzler", detail: "RS485, CAN, TCP/IP" }, pt: { item: "Interfaces", detail: "RS485, CAN, TCP/IP" }, de: { item: "Schnittstellen", detail: "RS485, CAN, TCP/IP" }, ar: { item: "الواجهات", detail: "RS485, CAN, TCP/IP" }, fr: { item: "Interfaces", detail: "RS485, CAN, TCP/IP" }, ja: { item: "インターフェース", detail: "RS485, CAN, TCP/IP" }, ko: { item: "인터페이스", detail: "RS485, CAN, TCP/IP" }, id: { item: "Antarmuka", detail: "RS485, CAN, TCP/IP" }, th: { item: "อินเตอร์เฟซ", detail: "RS485, CAN, TCP/IP" } } },
];

/** Category label translations */
const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  acDc:          { en: "AC & DC parameters", zh: "交流与直流参数", es: "Parámetros AC y DC", tr: "AC ve DC parametreleri", pt: "Parâmetros AC e DC", de: "AC- & DC-Parameter", fr: "Paramètres AC et DC", ar: "معلمات AC و DC", ja: "AC・DCパラメータ", ko: "AC 및 DC 매개변수", id: "Parameter AC & DC", th: "พารามิเตอร์ AC และ DC" },
  lv:            { en: "LV & auxiliary equipment", zh: "低压与辅助设备", es: "Equipo LV y auxiliar", tr: "AG ve yardımcı ekipman", pt: "Equipamentos BT e auxiliares", de: "NS- & Hilfsausrüstung", fr: "Équipement BT et auxiliaire", ar: "معدات الجهد المنخفض والمساعدة", ja: "低圧・補助機器", ko: "저압 및 보조 장비", id: "Peralatan BT & bantu", th: "อุปกรณ์ LV และอุปกรณ์เสริม" },
  transformer:   { en: "Transformer", zh: "变压器参数", es: "Transformador", tr: "Transformatör", pt: "Transformador", de: "Transformator", fr: "Transformateur", ar: "المحول", ja: "変圧器", ko: "변압기", id: "Transformator", th: "หม้อแปลง" },
  switchgear:    { en: "Switchgear & protection", zh: "开关柜与保护", es: "Interruptores y protección", tr: "Şalt ve koruma", pt: "Painéis e proteção", de: "Schaltanlagen & Schutz", fr: "Appareillage & protection", ar: "المفاتيح والحماية", ja: "開閉装置と保護", ko: "개폐 장치 및 보호", id: "Switchgear & proteksi", th: "สวิตช์เกียร์และการป้องกัน" },
  general:       { en: "General & environment", zh: "通用与环境参数", es: "General y entorno", tr: "Genel ve çevre", pt: "Geral e ambiente", de: "Allgemein & Umgebung", fr: "Général & environnement", ar: "عام والبيئة", ja: "一般・環境", ko: "일반 및 환경", id: "Umum & lingkungan", th: "ทั่วไปและสภาพแวดล้อม" },
  communication: { en: "Communication", zh: "通讯接口", es: "Comunicación", tr: "İletişim", pt: "Comunicação", de: "Kommunikation", fr: "Communication", ar: "الاتصال", ja: "通信", ko: "통신", id: "Komunikasi", th: "การสื่อสาร" },
};

export default function PcsProductPage() {
  const { locale, messages } = useLocaleContext();
  const m = messages.productsPcs ?? {};

  const CERTIFICATIONS = [
    "IEC62477",
    "IEC61000",
    "G99",
    "VDE4110",
    "VDE4120",
    "EN50549-2",
  ] as const;

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden border-b border-[var(--border)]">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900" />
          <div className="pointer-events-none absolute inset-0 bg-grid-slate bg-[length:44px_44px] opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-20%,rgba(245,158,11,0.12),transparent)]" />

          <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-solar-400"
            >
              ← {m.back}
            </Link>

            <p className="mt-8 inline-flex rounded-full border border-[var(--border)] bg-[var(--accent-dim)] px-3 py-1 text-xs font-medium text-solar-400">
              {m.badge}
            </p>
            <h1 className="mt-4 max-w-4xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {m.heroTitle}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300">{m.heroSub}</p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "sales@solarstoragepro.com"}?subject=${encodeURIComponent("PCS datasheet request")}`}
                className="inline-flex items-center justify-center rounded-full bg-solar-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-solar-500/30 transition hover:bg-solar-400"
              >
                {m.ctaDatasheet}
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
              >
                {m.ctaContact}
              </Link>
            </div>
          </div>
        </section>

        {/* ── Overview + Image ── */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-6xl space-y-14 px-4 sm:px-6">
            <div className="rounded-2xl border border-[var(--border)] bg-slate-800/80 p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-8">
              <h2 className="text-xl font-bold text-white sm:text-2xl">{m.overviewTitle}</h2>
              <dl className="mt-4 space-y-2 text-sm text-slate-300">
                <div>
                  <dt className="font-semibold text-solar-400">{m.overviewName}</dt>
                  <dd className="mt-1 leading-relaxed">{m.overviewNameVal}</dd>
                </div>
              </dl>

              <div className="mt-8 overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900/40 p-4 sm:p-6">
                <Image
                  src={PCS_PRODUCT_IMAGE}
                  alt={m.imageAlt as string}
                  width={1600}
                  height={900}
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority
                  className="mx-auto h-auto w-full max-h-[min(70vh,520px)] object-contain"
                />
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div
                  className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-600 bg-slate-800/30 px-6 py-10 text-center"
                  data-placeholder="system-diagram"
                >
                  <span className="text-sm font-semibold text-solar-400">System single-line / topology diagram</span>
                  <span className="max-w-sm text-xs leading-relaxed text-slate-500">
                    Insert system diagram here — replace with next/image or &lt;img&gt;
                  </span>
                </div>
                <div
                  className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-600 bg-slate-800/30 px-6 py-10 text-center"
                  data-placeholder="transformer-switchgear"
                >
                  <span className="text-sm font-semibold text-solar-400">Transformer detail / switchgear photo</span>
                  <span className="max-w-sm text-xs leading-relaxed text-slate-500">
                    Insert transformer detail or switchgear photo here — replace with next/image or &lt;img&gt;
                  </span>
                </div>
              </div>
            </div>

            {/* ── Features ── */}
            <div>
              <h2 className="text-xl font-bold text-white sm:text-2xl">{m.featuresTitle}</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {(m.features as Array<{t: string; b: string}>).map((f, i) => {
                  const Icon = FEATURE_ICONS[i] ?? FEATURE_ICONS[0];
                  return (
                    <div
                      key={f.t}
                      className="rounded-2xl border border-[var(--border)] bg-slate-800/80 p-6 shadow-lg shadow-black/20 backdrop-blur transition hover:border-solar-500/40"
                    >
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-solar-500/15 text-solar-400">
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <h3 className="text-lg font-semibold text-slate-100">{f.t}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.b}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Spec Table ── */}
            <div className="rounded-2xl border border-[var(--border)] bg-slate-800/80 p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-8">
              <h2 className="text-xl font-bold text-white sm:text-2xl">{m.specsTitle}</h2>
              <p className="mt-2 text-sm text-slate-500">{m.specsHint}</p>

              <div className="mt-6 overflow-x-auto rounded-xl border border-slate-700/80 bg-slate-900/40">
                <table className="min-w-[800px] w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-950/70">
                      <th className="px-4 py-3 font-bold text-solar-300">{m.colCat}</th>
                      <th className="px-4 py-3 font-bold text-solar-300">{m.colItem}</th>
                      <th className="px-4 py-3 font-bold text-slate-200">{m.colDetail}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SPEC_ROWS.map((row, i) => {
                      const t = row.t[locale as keyof typeof row.t] ?? row.t.en;
                      const catLabel = CATEGORY_LABELS[row.catKey]?.[locale] ?? CATEGORY_LABELS[row.catKey]?.en ?? row.catKey;
                      return (
                        <tr
                          key={`${row.catKey}-${i}`}
                          className={i % 2 === 0 ? "bg-slate-800/20" : "bg-slate-800/10"}
                        >
                          <td className="border-t border-slate-700/80 px-4 py-3 font-medium text-slate-300">
                            {catLabel}
                          </td>
                          <td className="border-t border-slate-700/80 px-4 py-3 text-slate-400">
                            {t.item}
                          </td>
                          <td className="border-t border-slate-700/80 px-4 py-3 text-slate-200">
                            {t.detail}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Certifications ── */}
            <div className="rounded-2xl border border-[var(--border)] bg-slate-800/80 p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-8">
              <h2 className="text-xl font-bold text-white sm:text-2xl">{m.complianceTitle}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">{m.complianceIntro}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={m.complianceTitle as string}>
                {CERTIFICATIONS.map((code) => (
                  <li key={code}>
                    <span className="inline-flex rounded-lg border border-slate-600 bg-slate-900/60 px-3 py-1.5 font-mono text-xs font-medium text-slate-200">
                      {code}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── CTA ── */}
            <div className="flex flex-wrap justify-center gap-4 rounded-2xl border border-solar-500/25 bg-gradient-to-br from-solar-500/10 to-transparent p-8">
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "sales@solarstoragepro.com"}?subject=${encodeURIComponent("PCS datasheet request")}`}
                className="inline-flex items-center justify-center rounded-full bg-solar-500 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-solar-400"
              >
                {m.ctaDatasheet}
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
              >
                {m.ctaContact}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

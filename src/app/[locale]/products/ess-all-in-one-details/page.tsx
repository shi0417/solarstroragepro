"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ComparisonSpecTable } from "@/components/site/ComparisonSpecTable";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";

type SpecRow = { labelKey: string; value: string };

type SeriesBlock = {
  id: string;
  imageSrc: string;
  /**
   * Per-locale translations for marketing copy.
   */
  t: Record<string, { badge: string; title: string; note: string }>;
  specs: SpecRow[];
};

const SERIES: SeriesBlock[] = [
  {
    id: "portable-500",
    imageSrc: "/images/MD-BXS500.png",
    t: {
      en: { badge: "Portable · 500W class", title: "Portable energy storage", note: "" },
      zh: { badge: "便携式 · 500W 级", title: "便携式储能系统", note: "" },
      es: { badge: "Portátil · 500W", title: "Almacenamiento de energía portátil", note: "" },
      tr: { badge: "Duvar Serisi", title: "Duvara Monte Hepsi Bir Arada ESS", note: "5-15 kWh depolama gerektiren konut kurulumları için idealdir. Kompakt tasarım, kolay kurulum." },
      pt: { badge: "Portátil · 500W", title: "Armazenamento portátil de energia", note: "" },
      de: { badge: "Tragbar · 500W", title: "Tragbarer Energiespeicher", note: "" },
      fr: { badge: "Portable · 500W", title: "Stockage d'énergie portable", note: "" },
    },
    specs: [
      { labelKey: "model", value: "MD-BXS500" },
      { labelKey: "ratedPower", value: "500W" },
      { labelKey: "ratedEnergy", value: "1004.8Wh" },
      { labelKey: "voltage", value: "3.2V" },
      { labelKey: "capacity", value: "314Ah" },
      { labelKey: "acOutput", value: "180–230VAC" },
      { labelKey: "acInput", value: "90–280VAC" },
      { labelKey: "dimensions", value: "210 × 156 × 360" },
    ],
  },
  {
    id: "portable-1000",
    imageSrc: "/images/MD-BXS1000.png",
    t: {
      en: { badge: "Portable · 1000W class", title: "Portable energy storage", note: "" },
      zh: { badge: "便携式 · 1000W 级", title: "便携式储能系统", note: "" },
      es: { badge: "Portátil · 1000W", title: "Almacenamiento de energía portátil", note: "" },
      tr: { badge: "Zemin Serisi", title: "Zeminde Duran Hepsi Bir Arada ESS", note: "15-30 kWh ihtiyaç duyan evler için yüksek kapasiteli çözüm. İstiflenebilir modüller, esnek genişletme." },
      pt: { badge: "Portátil · 1000W", title: "Armazenamento portátil de energia", note: "" },
      de: { badge: "Tragbar · 1.000W", title: "Tragbarer Energiespeicher", note: "" },
      fr: { badge: "Portable · 1.000W", title: "Stockage d'énergie portable", note: "" },
    },
    specs: [
      { labelKey: "model", value: "MD-BXS1000" },
      { labelKey: "ratedPower", value: "1000W" },
      { labelKey: "ratedEnergy", value: "2009.6Wh" },
      { labelKey: "voltage", value: "6.4V" },
      { labelKey: "capacity", value: "314Ah" },
      { labelKey: "acOutput", value: "185–230VAC" },
      { labelKey: "acInput", value: "90–280VAC" },
      { labelKey: "dimensions", value: "240 × 225 × 360" },
    ],
  },
  {
    id: "modular",
    imageSrc: "/images/MD-BXS15360.png",
    t: {
      en: {
        badge: "Modular all-in-one",
        title: "Modular ESS all-in-one",
        note: "Modular stacking: scale tiers for load and backup duration; follow local codes and installation guides for wiring and grid connection.",
      },
      zh: {
        badge: "模块化一体机",
        title: "模块化一体机系统",
        note: "模块化设计：按负载与备电时长增加堆叠层数，工程接线与并网要求以当地规范与安装说明为准。",
      },
      es: {
        badge: "Todo en uno modular",
        title: "Sistema ESS modular todo en uno",
        note: "Apilado modular: escale los niveles según la carga y la duración de la copia de seguridad; siga las normas locales y las guías de instalación para el cableado y la conexión a la red.",
      },
      tr: {
        badge: "İstiflenebilir Seri",
        title: "İstiflenebilir Hepsi Bir Arada ESS",
        note: "30 kWh üzeri ticari kurulumlar için modüler istiflenebilir tasarım. Hızlı dağıtım için önceden yapılandırılmış.",
      },
      pt: {
        badge: "Tudo-em-um modular",
        title: "Sistema ESS modular tudo-em-um",
        note: "Empilhamento modular: dimensione os níveis de acordo com a carga e duração do backup; siga as normas locais e guias de instalação para cabeamento e conexão à rede.",
      },
      de: {
        badge: "Modular All-in-One",
        title: "Modulares ESS All-in-One",
        note: "Modulare Stapelung: Skalieren Sie die Stufen je nach Last und Backup-Dauer; folgen Sie den örtlichen Vorschriften und Installationsanleitungen für Verkabelung und Netzanschluss.",
      },
      fr: {
        badge: "Tout-en-un modulaire",
        title: "Système ESS modulaire tout-en-un",
        note: "Empilage modulaire : dimensionnez les niveaux selon la charge et la durée de secours ; suivez les normes locales et les guides d'installation pour le câblage et le raccordement au réseau.",
      },
    },
    specs: [
      { labelKey: "model", value: "MD-BXS15360" },
      { labelKey: "nominalVoltage", value: "51.2V" },
      { labelKey: "capacity", value: "100Ah" },
      { labelKey: "energyPerModule", value: "5.12kWh" },
      { labelKey: "scalability", value: "可堆叠扩容；三模块约 15.36kWh" },
      { labelKey: "cycleLife", value: "6000 次" },
      { labelKey: "communication", value: "RS485 / RS232 / CAN" },
      { labelKey: "dimSingle", value: "550 × 495 × 195" },
      { labelKey: "dimThree", value: "550 × 495 × 585" },
    ],
  },
];

const SPEC_LABELS: Record<string, Record<string, string>> = {
  model:            { en: "Model", zh: "型号", es: "Modelo", tr: "Model", pt: "Modelo", de: "Modell", fr: "Modèle" },
  ratedPower:       { en: "Rated power", zh: "额定功率", es: "Potencia nominal", tr: "Nominal Güç", pt: "Potência nominal", de: "Nennleistung", fr: "Puissance nominale" },
  ratedEnergy:      { en: "Rated energy", zh: "额定能量", es: "Energía nominal", tr: "Nominal Enerji", pt: "Energia nominal", de: "Nennenergie", fr: "Énergie nominale" },
  voltage:          { en: "Voltage", zh: "电压", es: "Voltaje", tr: "Voltaj", pt: "Tensão", de: "Spannung", fr: "Tension" },
  nominalVoltage:   { en: "Nominal voltage", zh: "标称电压", es: "Voltaje nominal", tr: "Nominal Voltaj", pt: "Tensão nominal", de: "Nennspannung", fr: "Tension nominale" },
  capacity:         { en: "Capacity", zh: "容量", es: "Capacidad", tr: "Kapasite", pt: "Capacidade", de: "Kapazität", fr: "Capacité" },
  acOutput:         { en: "AC output", zh: "AC 输出", es: "Salida AC", tr: "AC Çıkış", pt: "Saída AC", de: "AC-Ausgang", fr: "Sortie AC" },
  acInput:          { en: "AC input", zh: "AC 输入", es: "Entrada AC", tr: "AC Giriş", pt: "Entrada AC", de: "AC-Eingang", fr: "Entrée AC" },
  dimensions:       { en: "Dimensions (mm)", zh: "尺寸 (mm)", es: "Dimensiones (mm)", tr: "Boyutlar (G×Y×D)", pt: "Dimensões", de: "Abmessungen (mm)", fr: "Dimensions (mm)" },
  energyPerModule:  { en: "Energy per module", zh: "单模块能量", es: "Energía por módulo", tr: "Modül Başına Enerji", pt: "Energia por módulo", de: "Energie pro Modul", fr: "Énergie par module" },
  scalability:      { en: "Scalability", zh: "扩展能力", es: "Escalabilidad", tr: "Ölçeklenebilirlik", pt: "Escalabilidade", de: "Skalierbarkeit", fr: "Évolutivité" },
  cycleLife:        { en: "Cycle life", zh: "循环寿命", es: "Vida útil (ciclos)", tr: "Çevrim Ömrü", pt: "Vida útil (ciclos)", de: "Lebensdauer (Zyklen)", fr: "Durée de vie (cycles)" },
  communication:    { en: "Communication", zh: "通讯", es: "Comunicación", tr: "İletişim", pt: "Comunicação", de: "Kommunikation", fr: "Communication" },
  dimSingle:        { en: "Dimensions — single tier (mm)", zh: "尺寸 — 单层 (mm)", es: "Dimensiones — un nivel (mm)", tr: "Boyutlar — Tek Katman (mm)", pt: "Dimensões — um nível (mm)", de: "Abmessungen — einstufig (mm)", fr: "Dimensions — un niveau (mm)" },
  dimThree:         { en: "Dimensions — three tiers (mm)", zh: "尺寸 — 三层 (mm)", es: "Dimensiones — tres niveles (mm)", tr: "Boyutlar — Üç Katman (mm)", pt: "Dimensões — três níveis (mm)", de: "Abmessungen — dreistufig (mm)", fr: "Dimensions — trois niveaux (mm)" },
};

function getLabel(key: string, locale: string): string {
  return SPEC_LABELS[key]?.[locale] ?? SPEC_LABELS[key]?.en ?? key;
}

export default function EssAllInOneDetailsPage() {
  const { locale, messages } = useLocaleContext();
  const m = messages.productsEssAllInOne ?? {};

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
              href="/products/residential-ess"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 shadow-sm transition hover:border-solar-500/40 hover:bg-solar-500/10 hover:text-solar-300"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
              {m.back}
            </Link>

            <h1 className="mt-8 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {m.pageTitle}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">{m.pageSub}</p>
          </div>
        </section>

        {/* ── Series Blocks ── */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-6xl space-y-16 px-4 sm:space-y-20 sm:px-6">
            {SERIES.map((block) => {
              const t = block.t[locale] ?? block.t.en;
              return (
                <article
                  key={block.id}
                  className="grid gap-8 rounded-2xl border border-[var(--border)] bg-slate-800/80 p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start"
                >
                  <div className="flex flex-col items-center justify-center rounded-xl bg-slate-900/70 px-4 py-8 lg:min-h-[280px]">
                    <img
                      src={block.imageSrc}
                      alt={block.t.en.title}
                      loading="lazy"
                      decoding="async"
                      className="max-h-[240px] w-full max-w-sm object-contain sm:max-h-[280px]"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-solar-400">{t.badge}</p>
                    <h2 className="mt-2 text-2xl font-bold text-white">{t.title}</h2>

                    <div className="mt-6">
                      <ComparisonSpecTable
                        rows={block.specs.map((row) => ({
                          label: getLabel(row.labelKey, locale),
                          values: [row.value],
                        }))}
                      />
                    </div>

                    {t.note ? (
                      <p className="mt-4 text-xs leading-relaxed text-slate-500">{t.note}</p>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

const fs = require('fs');
const path = require('path');

const trPath = path.join(__dirname, '..', 'src', 'messages', 'tr.json');
const tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));

// ─── Pattern B: specLabels Turkish translations ───

// productsHvs.specLabels
const hvsSpecLabels = tr.productsHvs.specLabels;
hvsSpecLabels.model.tr = "Model";
hvsSpecLabels.voltage.tr = "Voltaj";
hvsSpecLabels.capacity.tr = "Kapasite";
hvsSpecLabels.energy.tr = "Enerji";
hvsSpecLabels.cycleLife.tr = "Çevrim ömrü";
hvsSpecLabels.dimensions.tr = "Boyutlar";
hvsSpecLabels.comm.tr = "İletişim";
hvsSpecLabels.moduleSize.tr = "Modül boyutu";
hvsSpecLabels.totalEnergy.tr = "Toplam enerji";
hvsSpecLabels.footprint.tr = "Ayak izi";
hvsSpecLabels.nominalVoltage.tr = "Nominal voltaj";

// productsLfpBattery.specLabels
const lfpSpecLabels = tr.productsLfpBattery.specLabels;
lfpSpecLabels.nominalVoltage.tr = "Nominal voltaj";
lfpSpecLabels.nominalCapacity.tr = "Nominal kapasite";
lfpSpecLabels.energy.tr = "Enerji";
lfpSpecLabels.cycleLife.tr = "Çevrim ömrü";
lfpSpecLabels.dimensions.tr = "Boyutlar (U×G×Y)";
lfpSpecLabels.communication.tr = "İletişim";

// ─── Fix remaining English entries in tr.json ───

// blog section
tr.blog.readMore = "Makaleyi Oku";
tr.blog.categories = "Kategoriler";
tr.blog.allCategories = "Tümü";
tr.blog.badge = "Bilgi Bankası";
tr.blog.pageTitle = "Enerji Depolama Blogu";
tr.blog.pageSub = "Batarya depolama teknolojisi, pazar trendleri ve en iyi uygulamalar hakkında derinlemesine analizler. ROI analizinden kurulum kılavuzlarına, enerji depolama projeleriniz için bilinçli kararlar alın.";
tr.blog.readTime = "dk okuma";
tr.blog.backToHome = "Ana Sayfaya Dön";
tr.blog.ctaTitle = "Uzman Tavsiyesine mi İhtiyacınız Var?";
tr.blog.ctaSub = "Mühendislik ekibimiz projeniz için özel bir enerji depolama çözümü tasarlayabilir.";
tr.blog.ctaBtn = "Teklif Talep Et";

// caseCenter section
tr.caseCenter.badge = "Küresel Projeler";
tr.caseCenter.pageTitle = "Frekans Regülasyonu ve Enerji Depolama Vakaları";
tr.caseCenter.pageSub = "50'den fazla ülkede şebeke frekans regülasyonu, puant yük yönetimi ve yenilenebilir entegrasyonunda gerçek dağıtımlar.";
tr.caseCenter.readMore = "Detayları Gör";
tr.caseCenter.ctaTitle = "Benzer bir çözüme mi ihtiyacınız var?";
tr.caseCenter.ctaSub = "Mühendislik ekibimiz, şebeke gereksinimleriniz için özel bir frekans regülasyonu ve enerji depolama sistemi tasarlayacaktır.";
tr.caseCenter.ctaBtn = "Teklif Talep Et";
tr.caseCenter.techLink = "Teknoloji platformumuzu keşfedin";

// technology section
tr.technology.diagramCaption = "Sistem tek hat şeması — topolojileri değiştirmek için yukarıdaki sekmelere tıklayın";
tr.technology.viewCases = "Frekans Regülasyonu Vakalarını Gör";
tr.technology.gridBessLink = "Şebeke Ölçekli BESS Çözümleri";

// productsEnergyStorage section
tr.productsEnergyStorage.breadcrumbHome = "Ana Sayfa";
tr.productsEnergyStorage.breadcrumbProducts = "Ürünler";
tr.productsEnergyStorage.badge = "Temel ürün";
tr.productsEnergyStorage.title = "Enerji Depolama Sistemi";
tr.productsEnergyStorage.description = "Enerji Depolama Sistemi Paketi / DC Sıvı Soğutma Konteyneri — yüksek güçlü, uzun ömürlü ve güvenli dağıtımlar için sistem seviyesinde teslimat.";
tr.productsEnergyStorage.certTitle = "Sertifikalar";
tr.productsEnergyStorage.certDesc = "Ortak taşıma ve güvenlik standartları";
tr.productsEnergyStorage.featuresTitle = "Özellikler";
tr.productsEnergyStorage.featuresSub = "Ölçeklenebilir teslimat için sistem mühendisliği özellikleri: güç kapsamı, ömür tutarlılığı, yedekli güvenlik ve O&M kolaylığı.";
tr.productsEnergyStorage.features = [
  { t: "Yüksek güç", b: "Güç tipi ve enerji tipi batarya konteynerlerinde 0.25P–2P kapsamı." },
  { t: "Uzun ömür", b: "Hücre sıcaklık farkı: paket içinde 2°C, kümeler arasında 5°C — 10 yıllık takvim ömrü için tasarlanmıştır." },
  { t: "Gerçek güvenlik", b: "Paket/küme/konteyner seviyelerinde üç katmanlı yangın koruması; IP67 sınıfı batarya modülleri." },
  { t: "Kolay entegrasyon", b: "Modüler tasarım, küme içi dolaşım akımı olmadan küme başına birim mimarisi sağlar; bağımsız bakım ve yükseltmeleri destekler." },
  { t: "Esnek yapılandırma", b: "Esnek genişletme ile yan yana veya uçtan uca yerleşim seçenekleri." },
  { t: "Kolay yönetim", b: "Enerji istatistikleri, arıza uyarıları ve termal kaçış erken uyarısı ile gerçek zamanlı veri alışverişi." }
];
tr.productsEnergyStorage.specsTitle = "Teknik Özellikler";
tr.productsEnergyStorage.specsSub = "Tüm kapasite varyantlarını görmek için mobilde yatay kaydırın.";
tr.productsEnergyStorage.specCornerLabel = "Parametre \\ Model";
tr.productsEnergyStorage.certFooter = "Sertifikalar";
tr.productsEnergyStorage.ctaTitle = "Özel Çözüm Alın";
tr.productsEnergyStorage.ctaSub = "Projenizi bize anlatın — mühendislerimiz 48 saat içinde özel bir çözüm tasarlayacak.";

// productsResidentialEss section
tr.productsResidentialEss.back = "Ana sayfaya dön";
tr.productsResidentialEss.badge = "Konut";
tr.productsResidentialEss.pageTitle = "Konut ESS";
tr.productsResidentialEss.pageSub = "Alçak gerilim istifli ve duvar montajlı paketler, yüksek gerilim sistemleri ve hepsi bir arada invertör + batarya çözümleri.";
tr.productsResidentialEss.categoriesTitle = "Ürün aileleri";
tr.productsResidentialEss.catLv = "Alçak gerilim (51.2V)";
tr.productsResidentialEss.catLvDesc = "10kWh ve 16kWh sınıfında istiflenebilir ve duvara monte bataryalar.";
tr.productsResidentialEss.catHv = "Yüksek gerilim (358.4V – 716.8V)";
tr.productsResidentialEss.catHvDesc = "Daha yüksek güç ve YG DC bara gereksinimleri için sistemler.";
tr.productsResidentialEss.catAio = "Hepsi bir arada ESS";
tr.productsResidentialEss.catAioDesc = "Daha hızlı konut dağıtımı için entegre invertör ve batarya.";
tr.productsResidentialEss.gridTitle = "Ürünler";
tr.productsResidentialEss.viewHvsDetails = "HVS yüksek gerilim serisi detaylarını gör";
tr.productsResidentialEss.viewAioDetails = "ESS Hepsi bir arada serisi detaylarını gör";
tr.productsResidentialEss.viewLfpDetails = "LFP batarya serisi detaylarını gör";
tr.productsResidentialEss.details = "Detaylar";
tr.productsResidentialEss.products = [
  {
    key: "wallMount",
    title: "Duvara monte batarya",
    subtitle: "MDS-512200",
    specs: [
      { l: "Voltaj", v: "25.6V-51.2V" },
      { l: "Kapasite", v: "206Ah" },
      { l: "Enerji", v: "5.12KWH-10.54KWH" },
      { l: "Çevrim ömrü", v: "6000 çevrim" },
      { l: "Boyutlar (mm)", v: "723 × 655 × 255" },
      { l: "İletişim", v: "RS485 / RS232 / CAN" }
    ]
  },
  {
    key: "stackable",
    title: "İstiflenebilir batarya",
    subtitle: "MDS-51314",
    specs: [
      { l: "Voltaj", v: "51.2V" },
      { l: "Kapasite", v: "314Ah" },
      { l: "Enerji", v: "16.07kWh" },
      { l: "Çevrim ömrü", v: "8000 çevrim" },
      { l: "Boyutlar (mm)", v: "730 × 610 × 257" },
      { l: "İletişim", v: "RS485 / RS232 / CAN" }
    ]
  },
  {
    key: "hvSystem",
    title: "Yüksek gerilim sistemi",
    subtitle: "HVS Serisi",
    specs: [
      { l: "Voltaj aralığı", v: "358.4V – 716.8V" },
      { l: "Enerji aralığı", v: "14.33kWh – 100.35kWh (ölçeklenebilir)" },
      { l: "Çevrim ömrü", v: "8000 çevrim" },
      { l: "İletişim", v: "RS485 / RS232 / CAN" }
    ]
  },
  {
    key: "aio",
    title: "Hepsi bir arada ESS",
    subtitle: "Hepsi bir arada ailesi",
    specs: [
      { l: "Voltaj", v: "51.2V" },
      { l: "Kapasite", v: "100Ah / 314Ah" },
      { l: "Enerji", v: "5.12kWh – 16.07kWh" },
      { l: "Temsili modeller", v: "M1200 (1), MB-1111, vb." },
      { l: "İletişim", v: "RS485 / RS232 / CAN" }
    ]
  }
];

// productsPcs section
tr.productsPcs.back = "Ana sayfaya dön";
tr.productsPcs.badge = "PCS · Prefabrik";
tr.productsPcs.heroTitle = "SES4H-5160/6900-MV-EX Prefabrik İnvertör Trafo Merkezi";
tr.productsPcs.heroSub = "Şebeke ölçekli PV+depolama ve şebeke bağlantısı için invertör ve yükseltici trafo merkezini birleştiren yüksek entegre prefabrik kabin.";
tr.productsPcs.overviewTitle = "Ürün genel bakışı";
tr.productsPcs.overviewName = "Ad";
tr.productsPcs.overviewNameVal = "SES4H-5160/6900-MV-EX Prefabrik İnvertör Trafo Merkezi (PCS)";
tr.productsPcs.featuresTitle = "Temel avantajlar";
tr.productsPcs.imageAlt = "SES4H-5160/6900-MV-EX prefabrik invertör trafo merkezi ürünü";
tr.productsPcs.specsTitle = "Teknik özellikler";
tr.productsPcs.specsHint = "Küçük ekranlarda yatay kaydırın.";
tr.productsPcs.colCat = "Kategori";
tr.productsPcs.colItem = "Parametre";
tr.productsPcs.colDetail = "Detaylar";
tr.productsPcs.complianceTitle = "Uyumluluk ve sertifikalar";
tr.productsPcs.complianceIntro = "Tasarım ve tip testi aşağıdaki standartlara ve şebeke kodlarına uygundur (teslimat sertifikasına tabidir).";
tr.productsPcs.ctaDatasheet = "Veri sayfası talep et";
tr.productsPcs.ctaContact = "Bize ulaşın";
tr.productsPcs.features = [
  { t: "Esnek yapılandırma", b: "Yüksek prefabrik tasarımda entegre invertör ve trafo merkezi, alan verimliliğini artırır ve kurulumu basitleştirir." },
  { t: "Modüler güç", b: "Modüler tasarım, proje gereksinimlerine uygun yapılandırılabilir güç değeri sağlar." },
  { t: "Yüksek verimlilik ve kararlılık", b: "Batarya dolaşım akımını önleyen çok dallı DC tasarımı ile 1500V geniş DC voltaj aralığı." },
  { t: "Çok yönlü kullanım", b: "Puanti yük yönetimi ve yerel otonom çalışma ile VSG / PQ / VF modlarını destekler." },
  { t: "Güvenli ve uyumlu", b: "HVRT/LVRT, dört kadran aktif/reaktif güç regülasyonu, hızlı güç yanıtı (<20ms) destekler." },
  { t: "Şebeke dostu", b: "Nominal AC güç: N×215kW @45°C, N×129kW @50°C (N = 20~32 modül); THDi/THDu <3%." }
];

// productsSolarPanels section
tr.productsSolarPanels.back = "Ana sayfaya dön";
tr.productsSolarPanels.badge = "Güneş";
tr.productsSolarPanels.pageTitle = "Güneş Panelleri";
tr.productsSolarPanels.pageSub = "Kısmi gölgeleme optimizasyonu ve sektör lideri garantilerle yüksek verimli ABC INFINITE modüller.";
tr.productsSolarPanels.gridTitle = "Ürün serisi";
tr.productsSolarPanels.source = "Veri kaynağı";
tr.productsSolarPanels.sourceLink = "aikosolar.com";

// productsHvs section
tr.productsHvs.back = "Konut ESS'ye dön";
tr.productsHvs.title = "Yüksek Gerilim Sistemi HVS Serisi";
tr.productsHvs.sub = "Daha yüksek güç yoğunluğu ve ölçeklenebilirlik için raf montajlı ve kabin tipi yüksek gerilim batarya sistemleri.";
tr.productsHvs.secA = "Bölüm A · Standart Raf (100Ah)";
tr.productsHvs.secB = "Bölüm B · Yüksek Kapasiteli Raf (280Ah)";
tr.productsHvs.secC = "Bölüm C · Kabin BESS (büyük kapasite)";
tr.productsHvs.introA = "100Ah raf ailesi: IP65 korumalı modüler istiflenebilir tasarım, iç/dış mekan konut YG batarya bankaları için ideal.";
tr.productsHvs.introB = "Kule başına 35.84kWh'ye kadar 280Ah raflar — aynı ayak iziyle daha yüksek enerji talepleri için tasarlanmıştır.";
tr.productsHvs.introC = "Kabin BESS: konut ve küçük ticari uygulamalar için önceden monte edilmiş yüksek gerilim çözümü, 100kWh'ye kadar ölçeklenebilir.";

// productsLfpBattery section
tr.productsLfpBattery.back = "Konut ESS'ye dön";
tr.productsLfpBattery.title = "LFP Batarya Serisi";
tr.productsLfpBattery.sub = "Ultra ince duvar montajlı ve zeminde duran / mobil LFP batarya çözümleri.";
tr.productsLfpBattery.sec1 = "Ultra İnce Duvar Montajlı Grup · M1200 / M2400";
tr.productsLfpBattery.sec2 = "Zemin / Mobil Grup · M-BXS / M-LFP";
tr.productsLfpBattery.corner = "Parametre";

// productsAllInOne section
tr.productsAllInOne.back = "Konut ESS'ye dön";
tr.productsAllInOne.title = "Duvara Monte / Zeminde Duran LFP Batarya Karşılaştırması";
tr.productsAllInOne.sub = "LFP batarya serisindeki 6 popüler modelin yan yana teknik özellik karşılaştırması.";
tr.productsAllInOne.section = "Parametre karşılaştırması (6 model)";
tr.productsAllInOne.corner = "Parametre";

// productsEssAllInOne section
tr.productsEssAllInOne.back = "Konut ESS'ye dön";
tr.productsEssAllInOne.pageTitle = "Hepsi Bir Arada ESS Serisi";
tr.productsEssAllInOne.pageSub = "Sorunsuz konut enerji depolama dağıtımı için entegre invertör + batarya sistemleri.";

// productsStackableBattery section
tr.productsStackableBattery.back = "Konut ESS'ye dön";
tr.productsStackableBattery.title = "İstiflenebilir / Zeminde Duran Batarya (314Ah / 200Ah) Karşılaştırması";
tr.productsStackableBattery.sub = "İstiflenebilir ve zeminde duran LFP serisindeki modellerin yan yana karşılaştırması.";
tr.productsStackableBattery.corner = "Parametre";

// solutions section
if (tr.solutions) {
  tr.solutions.gridLevelBess = tr.solutions.gridLevelBess || {};
  tr.solutions.gridLevelBess.back = "Çözümlere dön";
  tr.solutions.gridLevelBess.badge = "Şebeke Ölçekli Çözümler";
  tr.solutions.gridLevelBess.title = "Şebeke Düzeyinde BESS (Frekans Regülasyonu)";
  tr.solutions.gridLevelBess.sub = "Şebeke frekans regülasyonu, puant yük yönetimi ve enerji arbitrajı için optimize edilmiş 1–20MW konteyner BESS.";
  tr.solutions.gridLevelBess.painTitle = "Neden Frekans Regülasyonu?";
  tr.solutions.gridLevelBess.painSub = "Şebeke operatörleri, geleneksel depolama ile çözülemeyen kritik frekans kararlılığı sorunlarıyla karşı karşıyadır.";
  tr.solutions.gridLevelBess.painItems = [
    { label: "Frekans sapması yenilenebilir enerji penetrasyonuyla artıyor" },
    { label: "Geleneksel jeneratörler milisaniye yanıtı sağlayamaz" },
    { label: "Düzenleyici cezalar ve şebeke istikrarsızlığı maliyetleri" }
  ];
  if (tr.solutions.dataCenterEnergyStorage) {
    tr.solutions.dataCenterEnergyStorage.back = "Çözümlere dön";
    tr.solutions.dataCenterEnergyStorage.badge = "Veri Merkezi Çözümleri";
    tr.solutions.dataCenterEnergyStorage.title = "Veri Merkezi Enerji Depolama";
    tr.solutions.dataCenterEnergyStorage.sub = "Veri merkezleri için yüksek güvenilirlikli batarya depolama — UPS entegrasyonu, puant yük yönetimi ve şebeke hizmetleri.";
  }
}

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2) + '\n');
console.log('✅ tr.json updated with Turkish translations');
console.log('   - specLabels: productsHvs + productsLfpBattery');
console.log('   - blog, caseCenter, technology sections');
console.log('   - productsEnergyStorage, productsResidentialEss, productsPcs');
console.log('   - productsSolarPanels, productsHvs, productsLfpBattery');
console.log('   - productsAllInOne, productsEssAllInOne, productsStackableBattery');
console.log('   - solutions sections');

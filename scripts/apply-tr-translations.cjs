/**
 * Apply Turkish translations to tr.json specLabels.
 * Replaces English placeholder values with proper Turkish translations.
 */
const fs = require("fs");
const path = require("path");

const trPath = path.join(__dirname, "..", "src", "messages", "tr.json");
const data = JSON.parse(fs.readFileSync(trPath, "utf-8"));

// ─── productsHvs.specLabels translations ───
const hvsLabels = {
  model: "Model",
  voltage: "Voltaj",
  capacity: "Kapasite",
  energy: "Enerji",
  cycleLife: "Döngü ömrü",
  dimensions: "Boyutlar",
  comm: "İletişim",
  moduleSize: "Modül boyutu",
  totalEnergy: "Toplam enerji",
  footprint: "Kaplama alanı",
  nominalVoltage: "Nominal voltaj",
};

// ─── productsLfpBattery.specLabels translations ───
const lfpLabels = {
  nominalVoltage: "Nominal voltaj",
  nominalCapacity: "Nominal kapasite",
  energy: "Enerji",
  cycleLife: "Döngü ömrü",
  dimensions: "Boyutlar (U×G×Y)",
  communication: "İletişim",
};

// Apply HVS translations
if (data.productsHvs?.specLabels) {
  for (const [key, trValue] of Object.entries(hvsLabels)) {
    if (data.productsHvs.specLabels[key]) {
      data.productsHvs.specLabels[key].tr = trValue;
      console.log(`  productsHvs.specLabels.${key}.tr → "${trValue}"`);
    }
  }
}

// Apply LFP translations
if (data.productsLfpBattery?.specLabels) {
  for (const [key, trValue] of Object.entries(lfpLabels)) {
    if (data.productsLfpBattery.specLabels[key]) {
      data.productsLfpBattery.specLabels[key].tr = trValue;
      console.log(`  productsLfpBattery.specLabels.${key}.tr → "${trValue}"`);
    }
  }
}

fs.writeFileSync(trPath, JSON.stringify(data, null, 2) + "\n", "utf-8");
console.log("\n✅ tr.json updated successfully!");

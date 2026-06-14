#!/usr/bin/env python3
"""Add Portuguese translations to inline t-dicts in product pages and case data."""
import re

# =============================================================================
# 1. pcs/page.tsx - SPEC_ROWS
# =============================================================================
pcs_spec_rows_pt = {
    # AC & DC parameters
    "Rated AC power": ("Potência AC nominal", "N × 215kW @ 45°C; N × 129kW @ 50°C (N = número de módulos, 20~32)"),
    "Max AC power": ("Potência AC máx.", "110% potência nominal, 2 min (≤ 45°C)"),
    "AC voltage / frequency": ("Tensão AC / frequência", "10kV–33kV / 50Hz"),
    "DC voltage range": ("Faixa de tensão DC", "1000V–1500V (referência 1070V para descarga a plena carga)"),
    "THDi / THDu": ("THDi / THDu", "< 3%"),
    "Max DC current (per branch)": ("Corrente DC máx. (por ramo)", "1612A / 201A"),
    # LV & auxiliary
    "Auxiliary transformer": ("Transformador auxiliar", "50kVA, 690V / 400V"),
    "UPS": ("UPS", "2kVA (1h padrão)"),
    "Cooling": ("Refrigeração", "Refrigeração forçada a ar com controle de temperatura"),
    # Transformer
    "Capacity": ("Capacidade", "5200kVA @ 45°C ou 6900kVA @ 45°C"),
    "Vector group": ("Grupo vetorial", "Dy11y11"),
    "Type / cooling": ("Tipo / refrigeração", "Imerso em óleo / ONAN"),
    "Efficiency": ("Eficiência", "Tier 2 (EU548)"),
    "Transformer protection": ("Proteção do transformador", "Pressão, temperatura (dois níveis), relé de gás"),
    # Switchgear
    "Switchgear configuration": ("Configuração do painel", "DeV / CV / CCV / VMV (personalizável)"),
    "MV switching & protection": ("Comutação e proteção MT", "Disjuntor a vácuo (VCB), sistema de proteção por microprocessador"),
    "DC side protection": ("Proteção lado DC", "Disjuntor DC / fusíveis"),
    # General
    "Enclosure size (W×H×D)": ("Dimensões do contêiner (L×A×P)", "40ft (12192×2896×2438 mm) ou 45ft"),
    "Total weight": ("Peso total", "≤ 30t"),
    "Enclosure protection": ("Proteção do invólucro", "IP54 (contêiner completo)"),
    "Operating temperature": ("Temperatura de operação", "-25°C a 60°C (derating acima de 45°C)"),
    "Corrosion prevention": ("Prevenção de corrosão", "C5 (apenas partes mecânicas externas)"),
    # Communication
    "Interfaces": ("Interfaces", "RS485, CAN, TCP/IP"),
}

pcs_cat_labels_pt = {
    "acDc": "Parâmetros AC e DC",
    "lv": "Equipamentos BT e auxiliares",
    "transformer": "Transformador",
    "switchgear": "Painéis e proteção",
    "general": "Geral e ambiente",
    "communication": "Comunicação",
}

# =============================================================================
# 2. solar-panels/page.tsx - PRODUCTS
# =============================================================================
solar_products_pt = {
    "N-Type ABC INFINITE Module · 54-Cell": (
        "Módulo ABC INFINITE Tipo N · 54 Células",
        "Módulo compacto de 54 células com tecnologia ABC INFINITE — otimizado para telhados residenciais e instalações de pequeno porte."
    ),
    "N-Type ABC INFINITE Module · 60-Cell": (
        "Módulo ABC INFINITE Tipo N · 60 Células",
        "Módulo padrão de 60 células com excelente desempenho em baixa luminosidade — ideal para instalações C&I em telhados."
    ),
    "N-Type ABC INFINITE Module · 66-Cell": (
        "Módulo ABC INFINITE Tipo N · 66 Células",
        "Formato de 66 células equilibrando tamanho e potência — projetado para projetos comerciais com espaço limitado."
    ),
    "N-Type ABC INFINITE Module · 72-Cell": (
        "Módulo ABC INFINITE Tipo N · 72 Células",
        "Módulo de 72 células de alta potência para instalações C&I de maior porte e parques solares de média escala."
    ),
    "N-Type ABC INFINITE Module · 78-Cell": (
        "Módulo ABC INFINITE Tipo N · 78 Células",
        "Formato de 78 células para máxima densidade de potência — construído para projetos solares em escala de utility."
    ),
    "N-Type ABC INFINITE Module · Dual-Glass": (
        "Módulo ABC INFINITE Tipo N · Vidro Duplo",
        "Construção de vidro duplo para máxima durabilidade — resistência superior à umidade, névoa salina e estresse mecânico."
    ),
}

solar_spec_labels_pt = {
    "powerRange": "Faixa de Potência",
    "cellType": "Tipo de Célula",
    "efficiency": "Eficiência",
    "warranty": "Garantia",
    "weight": "Peso",
    "dimensions": "Dimensões",
}

# =============================================================================
# 3. ess-all-in-one-details/page.tsx - SERIES
# =============================================================================
ess_series_pt = {
    "S1 Series": ("Série S1", "Compacta", "Solução compacta tudo-em-um para necessidades residenciais essenciais de backup."),
    "M1 Series": ("Série M1", "Alta Potência", "Sistema de alta potência para residências maiores com demandas de energia elevadas."),
    "L1 Series": ("Série L1", "Grande Capacidade", "Máxima capacidade de armazenamento para autonomia energética de longa duração."),
}

ess_spec_labels_pt_full = {
    "model": "Modelo",
    "nominalPower": "Potência Nominal",
    "batteryCapacity": "Capacidade da Bateria",
    "batteryType": "Tipo de Bateria",
    "maxEfficiency": "Eficiência Máx.",
    "acOutput": "Saída AC",
    "backupPower": "Potência de Backup",
    "switchTime": "Tempo de Comutação",
    "dimensions": "Dimensões",
    "weight": "Peso",
    "warranty": "Garantia",
    "protection": "Proteção",
    "communication": "Comunicação",
}

# =============================================================================
# Apply changes
# =============================================================================

# --- PCS page ---
pcs_path = "src/app/[locale]/products/pcs/page.tsx"
with open(pcs_path, "r", encoding="utf-8") as f:
    pcs_content = f.read()

# Add pt to each SPEC_ROWS t dict
for en_item, (pt_item, pt_detail) in pcs_spec_rows_pt.items():
    # Find the pattern: }, tr: { item: "...", detail: "..." } } },
    # and add pt before the closing } of t object
    # The pattern after tr is: , tr: { item: "...", detail: "..." } } },
    # We want: , tr: { item: "...", detail: "..." }, pt: { item: "...", detail: "..." } } },
    
    # Match the tr entry for this specific en item
    pattern = rf'(t: \{{[^}}]*en: \{{ item: "{re.escape(en_item)}"[^}}]*\}}[^}}]*tr: \{{[^}}]*\}})'
    replacement = rf'\1, pt: {{ item: "{pt_item}", detail: "{pt_detail}" }}'
    pcs_content = re.sub(pattern, replacement, pcs_content)

# Add pt to CATEGORY_LABELS
for cat_key, pt_label in pcs_cat_labels_pt.items():
    pattern = rf'({re.escape(cat_key)}:\s*\{{[^}}]*tr: "[^"]*")'
    replacement = rf'\1, pt: "{pt_label}"'
    pcs_content = re.sub(pattern, replacement, pcs_content)

with open(pcs_path, "w", encoding="utf-8") as f:
    f.write(pcs_content)
print("Updated pcs/page.tsx")

# --- Solar Panels page ---
solar_path = "src/app/[locale]/products/solar-panels/page.tsx"
with open(solar_path, "r", encoding="utf-8") as f:
    solar_content = f.read()

# Add pt to PRODUCTS t dicts
for en_series, (pt_series, pt_desc) in solar_products_pt.items():
    pattern = rf'(series: "{re.escape(en_series)}"[^}}]*tr: \{{[^}}]*\}})'
    replacement = rf'\1, pt: {{ series: "{pt_series}", desc: "{pt_desc}" }}'
    solar_content = re.sub(pattern, replacement, solar_content)

# Add pt to SPEC_LABELS
for label_key, pt_label in solar_spec_labels_pt.items():
    pattern = rf'({re.escape(label_key)}:\s*\{{[^}}]*tr: "[^"]*")'
    replacement = rf'\1, pt: "{pt_label}"'
    solar_content = re.sub(pattern, replacement, solar_content)

with open(solar_path, "w", encoding="utf-8") as f:
    f.write(solar_content)
print("Updated solar-panels/page.tsx")

# --- ESS All-in-one details page ---
ess_path = "src/app/[locale]/products/ess-all-in-one-details/page.tsx"
with open(ess_path, "r", encoding="utf-8") as f:
    ess_content = f.read()

# Add pt to SERIES t dicts
for en_title, (pt_badge, pt_title, pt_note) in ess_series_pt.items():
    pattern = rf'(title: "{re.escape(en_title)}"[^}}]*tr: \{{[^}}]*\}})'
    replacement = rf'\1, pt: {{ badge: "{pt_badge}", title: "{pt_title}", note: "{pt_note}" }}'
    ess_content = re.sub(pattern, replacement, ess_content)

# Add pt to SPEC_LABELS
for label_key, pt_label in ess_spec_labels_pt_full.items():
    pattern = rf'({re.escape(label_key)}:\s*\{{[^}}]*tr: "[^"]*")'
    replacement = rf'\1, pt: "{pt_label}"'
    ess_content = re.sub(pattern, replacement, ess_content)

with open(ess_path, "w", encoding="utf-8") as f:
    f.write(ess_content)
print("Updated ess-all-in-one-details/page.tsx")

print("\nAll product page translations applied!")

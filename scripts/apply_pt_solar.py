#!/usr/bin/env python3
"""Add pt translations to solar-panels PRODUCTS by parsing the file structurally."""
import re

filepath = "src/app/[locale]/products/solar-panels/page.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Map en series name -> pt (series, desc)
pt_map = {
    "NEOSTAR — Residential": ("NEOSTAR — Residencial", "Módulo ABC INFINITE de terceira geração. Otimização de sombreamento parcial, melhor coeficiente de temperatura (-0,26 %/°C), resistência a microfissuras, 25 anos de garantia do produto e 30 anos de garantia de desempenho. Eficiência de até 24,8 %. Fabricante de painéis solares Tier 1 da BloombergNEF."),
    "NEOSTAR — C&I Rooftop": ("NEOSTAR — Telhado C&I", "Módulo de 72 células otimizado para telhados comerciais e industriais. Alta potência de saída com excelente desempenho em baixa luminosidade. Tecnologia INFINITE de 3ª geração com 25 anos de garantia do produto."),
    "NEOSTAR — Utility": ("NEOSTAR — Utility", "Módulo de 78 células para máxima densidade de potência em parques solares em escala de utility. Construção de vidro duplo para durabilidade superior em campo. Excelente coeficiente de temperatura para desempenho em climas quentes."),
    "NEOSTAR — Compact": ("NEOSTAR — Compacto", "Módulo compacto de 54 células para telhados residenciais com espaço limitado. Alta eficiência em formato reduzido. Tecnologia INFINITE de 3ª geração com resistência a microfissuras."),
    "NEOSTAR — Lightweight": ("NEOSTAR — Leve", "Módulo de 66 células equilibrando potência e peso. Ideal para instalações comerciais com restrições estruturais. Desempenho otimizado para sombreamento parcial."),
    "NEBULAR — Lightweight": ("NEBULAR — Leve", "Módulo leve para telhados com capacidade de carga limitada. Otimização de sombreamento parcial, resistência a microfissuras e maior valor estético."),
}

# Find each tr: { series: "...", desc: "..." } block and add pt before the closing }
for en_series, (pt_series, pt_desc) in pt_map.items():
    # Find the t block containing this en series
    # We need to find: tr: { series: "X", desc: "..." }
    # and add pt: { series: "...", desc: "..." } right after
    escaped = re.escape(en_series)
    pattern = rf'(en: \{{[^}}]*series: "{escaped}"[^}}]*\}}.*?tr: \{{ series: "[^"]+", desc: "[^"]*" \}})'
    
    match = re.search(pattern, content)
    if match:
        end_pos = match.end(1)
        # Check if pt already exists
        next_chars = content[end_pos:end_pos+4]
        if ', pt:' not in next_chars:
            pt_block = f', pt: {{ series: "{pt_series}", desc: "{pt_desc}" }}'
            content = content[:end_pos] + pt_block + content[end_pos:]
        else:
            print(f"SKIP (already has pt): {en_series}")
    else:
        print(f"WARNING: not found - {en_series}")

# Also add pt to remaining SPEC_LABELS
spec_pt = {
    "Glass Type": "Tipo de Vidro",
    "Generation": "Geração",
    "Temperature Coeff.": "Coef. Temperatura",
}
for en_label, pt_label in spec_pt.items():
    pattern = rf'({re.escape(en_label)}", tr: "[^"]*")'
    content = re.sub(pattern, rf'\1, pt: "{pt_label}"', content)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print(f"solar-panels pt count: {content.count('pt:')}")

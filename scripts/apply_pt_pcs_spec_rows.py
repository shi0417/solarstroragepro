#!/usr/bin/env python3
"""Add pt translations to SPEC_ROWS in pcs/page.tsx using more robust matching."""
import re

pcs_path = "src/app/[locale]/products/pcs/page.tsx"
with open(pcs_path, "r", encoding="utf-8") as f:
    content = f.read()

# The SPEC_ROWS entries each have a t dict like:
# t: { en: { item: "...", detail: "..." }, zh: { item: "...", detail: "..." }, es: { item: "...", detail: "..." }, tr: { item: "...", detail: "..." } }
# We need to add pt: { item: "...", detail: "..." } after the tr entry

pt_translations = {
    "Rated AC power": ("Potência AC nominal", "N × 215kW @ 45°C; N × 129kW @ 50°C (N = número de módulos, 20~32)"),
    "Max AC power": ("Potência AC máx.", "110% potência nominal, 2 min (≤ 45°C)"),
    "AC voltage / frequency": ("Tensão AC / frequência", "10kV–33kV / 50Hz"),
    "DC voltage range": ("Faixa de tensão DC", "1000V–1500V (referência 1070V para descarga a plena carga)"),
    "THDi / THDu": ("THDi / THDu", "< 3%"),
    "Max DC current (per branch)": ("Corrente DC máx. (por ramo)", "1612A / 201A"),
    "Auxiliary transformer": ("Transformador auxiliar", "50kVA, 690V / 400V"),
    "UPS": ("UPS", "2kVA (1h padrão)"),
    "Cooling": ("Refrigeração", "Refrigeração forçada a ar com controle de temperatura"),
    "Capacity": ("Capacidade", "5200kVA @ 45°C ou 6900kVA @ 45°C"),
    "Vector group": ("Grupo vetorial", "Dy11y11"),
    "Type / cooling": ("Tipo / refrigeração", "Imerso em óleo / ONAN"),
    "Efficiency": ("Eficiência", "Tier 2 (EU548)"),
    "Transformer protection": ("Proteção do transformador", "Pressão, temperatura (dois níveis), relé de gás"),
    "Switchgear configuration": ("Configuração do painel", "DeV / CV / CCV / VMV (personalizável)"),
    "MV switching & protection": ("Comutação e proteção MT", "Disjuntor a vácuo (VCB), sistema de proteção por microprocessador"),
    "DC side protection": ("Proteção lado DC", "Disjuntor DC / fusíveis"),
    "Enclosure size (W×H×D)": ("Dimensões do contêiner (L×A×P)", "40ft (12192×2896×2438 mm) ou 45ft"),
    "Total weight": ("Peso total", "≤ 30t"),
    "Enclosure protection": ("Proteção do invólucro", "IP54 (contêiner completo)"),
    "Operating temperature": ("Temperatura de operação", "-25°C a 60°C (derating acima de 45°C)"),
    "Corrosion prevention": ("Prevenção de corrosão", "C5 (apenas partes mecânicas externas)"),
    "Interfaces": ("Interfaces", "RS485, CAN, TCP/IP"),
}

# For each entry, find the line containing the en item key and the tr key,
# then add pt after the tr closing brace
for en_item, (pt_item, pt_detail) in pt_translations.items():
    # Find the tr entry pattern: tr: { item: "...", detail: "..." }
    # The line containing the en item
    # We'll look for: tr: { item: "anything", detail: "anything" }
    # and insert pt: { item: "...", detail: "..." } right after the } of tr
    
    # Use a simpler regex: match from tr: to the closing } of the tr object,
    # then insert pt
    pattern = r'(tr: \{ item: "[^"]+", detail: "[^"]*" \})'
    
    # Find the specific line with the en_item
    lines = content.split('\n')
    target_line = None
    for i, line in enumerate(lines):
        if f'en: {{ item: "{en_item}"' in line:
            target_line = i
            break
    
    if target_line is not None and 'pt:' not in lines[target_line]:
        # Replace in that specific line: add pt after tr
        match = re.search(pattern, lines[target_line])
        if match:
            new_line = lines[target_line][:match.end()] + f', pt: {{ item: "{pt_item}", detail: "{pt_detail}" }}' + lines[target_line][match.end():]
            lines[target_line] = new_line
        else:
            print(f"WARNING: Could not find tr pattern for {en_item}")
    elif target_line is not None:
        print(f"SKIP (already has pt): {en_item}")
    else:
        print(f"WARNING: Could not find line with en item: {en_item}")

content = '\n'.join(lines)

with open(pcs_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated pcs/page.tsx SPEC_ROWS")

# Verify
with open(pcs_path, "r", encoding="utf-8") as f:
    count = f.read().count('"pt":')
print(f"Total pt entries in pcs/page.tsx: {count}")

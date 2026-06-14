#!/usr/bin/env python3
"""Fix remaining duplicates: keep first, remove second for same indentations."""
import re
from collections import Counter

with open("src/app/[locale]/case-center/case-data.ts", "r", encoding="utf-8") as f:
    c = f.read()

entries = list(re.finditer(r'(\n)(\s+)([a-z]{2}): \{', c))

case_starts = []
for marker in ['australia-fcr', 'europe-afrr', 'southeast-asia']:
    idx = c.find(marker)
    if idx > 0: case_starts.append(idx)

to_remove = []

for i in range(3):
    cs = case_starts[i]
    ce = case_starts[i+1] if i < 2 else len(c)
    locale_map = {}
    for m in entries:
        pos = m.start()
        if cs < pos < ce:
            loc = m.group(3)
            indent_len = len(m.group(2))
            if loc not in locale_map:
                locale_map[loc] = []
            locale_map[loc].append((pos, indent_len))
    
    for loc, positions in locale_map.items():
        if len(positions) > 1:
            # Keep only the first occurrence
            for pos, indent_len in positions[1:]:
                sub = c[pos:]
                depth = 0; started = False; end = 0
                for j, ch in enumerate(sub):
                    if ch == '{': depth += 1; started = True
                    elif ch == '}':
                        depth -= 1
                        if started and depth == 0:
                            end = j + 1
                            while end < len(sub) and sub[end] in ',\n\r ':
                                end += 1
                            break
                to_remove.append((pos - 1, pos + end, f'Case {i+1} remove 2nd {loc}'))

to_remove.sort(key=lambda x: -x[0])
for start, end, desc in to_remove:
    print(f"Removing: {desc} ({end-start} chars)")
    c = c[:start] + c[end:]

with open("src/app/[locale]/case-center/case-data.ts", "w", encoding="utf-8") as f:
    f.write(c)

# Verify
blocks = re.split(r'\n  \{\n    id:', c)
all_ok = True
for i, b in enumerate(blocks):
    if i == 0: continue
    locales = re.findall(r'(?:^|\n)\s{2,}([a-z]{2}): \{', b)
    counts = Counter(locales)
    dups = {k:v for k,v in counts.items() if v > 1}
    if dups:
        print(f'Case {i}: STILL DUPLICATES: {dups}')
        all_ok = False
    else:
        print(f'Case {i}: OK — {len(counts)} locales ({sorted(counts.keys())})')

if all_ok: print("\n=== ALL CLEAN! ===")

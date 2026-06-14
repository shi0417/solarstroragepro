#!/usr/bin/env python3
"""Nuclear fix: find duplicate locale entries in case-data.ts and remove the ones with wrong indentation."""
import re

with open("src/app/[locale]/case-center/case-data.ts", "r", encoding="utf-8") as f:
    c = f.read()

# Find all locale entry start positions with their indentation
entries = list(re.finditer(r'(\n)(\s+)([a-z]{2}): \{', c))

# Group by approximate position (which case they belong to)
# Cases: 0=case1, 1=case2, 2=case3
case_starts = []
for marker in ['australia-fcr', 'europe-afrr', 'southeast-asia']:
    idx = c.find(marker)
    if idx > 0: case_starts.append(idx)

# For each case, find duplicated locales and remove the ones with wrong indentation
to_remove = []
locales_by_case = {}

for i, (case_start_idx, _) in enumerate([(case_starts[0], 'australia'), (case_starts[1], 'europe'), (case_starts[2], 'seasia')]):
    case_end = case_starts[i+1] if i < 2 else len(c)
    locale_map = {}
    for m in entries:
        pos = m.start()
        if case_start_idx < pos < case_end:
            loc = m.group(3)
            indent = m.group(2)
            if loc not in locale_map:
                locale_map[loc] = []
            locale_map[loc].append((pos, indent))
    
    for loc, positions in locale_map.items():
        if len(positions) > 1:
            # Find the standard indentation (6 spaces: "      ")
            standard = [p for p in positions if len(p[1]) == 6]
            non_standard = [p for p in positions if len(p[1]) != 6]
            
            if standard and non_standard:
                # Remove non-standard ones
                for pos, indent in non_standard:
                    # Find end of this block
                    sub = c[pos:]
                    depth = 0; started = False
                    end = 0
                    for j, ch in enumerate(sub):
                        if ch == '{': depth += 1; started = True
                        elif ch == '}':
                            depth -= 1
                            if started and depth == 0:
                                end = j + 1
                                while end < len(sub) and sub[end] in ',\n\r ':
                                    end += 1
                                break
                    to_remove.append((pos - 1, pos + end, f'Case {i+1} duplicate {loc} (indent={len(indent)})'))
            elif len(standard) > 1:
                # Two with same indentation — keep first, remove rest
                for pos, indent in standard[1:]:
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
                    to_remove.append((pos - 1, pos + end, f'Case {i+1} duplicate {loc} (standard 2nd)'))

# Remove from end to start
to_remove.sort(key=lambda x: -x[0])
for start, end, desc in to_remove:
    print(f"Removing: {desc} ({end-start} chars)")
    c = c[:start] + c[end:]

with open("src/app/[locale]/case-center/case-data.ts", "w", encoding="utf-8") as f:
    f.write(c)

# Verify
from collections import Counter
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

if all_ok:
    print("\n=== All duplicates removed! ===")

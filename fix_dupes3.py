#!/usr/bin/env python3
"""Remove exact duplicate locale blocks from case-data.ts."""
with open("src/app/[locale]/case-center/case-data.ts", "r", encoding="utf-8") as f:
    c = f.read()

removals = []

# Case 2: find the second ja entry (should be at line ~583)
# Strategy: find "ja: {" after the first ja in case 2
first_ja2 = c.find('europe-afrr-30mw')
if first_ja2 > 0:
    # Find first ja in case 2
    section = c[first_ja2:first_ja2+12000]
    ja1 = section.find('\n            ja: {')
    if ja1 > 0:
        # Find second ja after first
        ja2 = section.find('\n      ja: {', ja1 + 10)
        if ja2 > 0:
            # This is the duplicate — find its end (matching })
            sub = section[ja2:]
            depth = 0
            start_counting = False
            for i, ch in enumerate(sub):
                if ch == '{': 
                    depth += 1
                    start_counting = True
                elif ch == '}':
                    depth -= 1
                    if start_counting and depth == 0:
                        # Include trailing ,\n
                        end = i
                        while end < len(sub) and sub[end] in ',\n\r ':
                            end += 1
                        block = sub[:end+1]
                        global_start = first_ja2 + ja2
                        global_end = first_ja2 + ja2 + end + 1
                        # Check it's really a locale entry
                        if global_end > global_start and global_end < len(c):
                            removals.append((global_start, global_end, f"Case 2 duplicate ja ({global_start}-{global_end})"))
                        break

# Case 3: find second ar and second ja
cs3 = c.find('southeast-asia-25mw')
if cs3 > 0:
    section3 = c[cs3:cs3+15000]
    
    # Find first ar
    ar1 = section3.find('\n      ar: {')
    # Find second ar after first
    if ar1 > 0:
        ar2 = section3.find('\n            ar: {', ar1 + 10)
        if ar2 < 0:
            ar2 = section3.find('\n      ar: {', ar1 + 10)
        if ar2 > 0 and ar2 != ar1:
            sub = section3[ar2:]
            depth = 0; start_counting = False
            for i, ch in enumerate(sub):
                if ch == '{': depth += 1; start_counting = True
                elif ch == '}':
                    depth -= 1
                    if start_counting and depth == 0:
                        end = i
                        while end < len(sub) and sub[end] in ',\n\r ':
                            end += 1
                        global_start = cs3 + ar2
                        global_end = cs3 + ar2 + end + 1
                        if global_end > global_start and global_end < len(c):
                            removals.append((global_start, global_end, f"Case 3 duplicate ar ({global_start}-{global_end})"))
                        break
    
    # Find first ja in case 3
    ja1_3 = section3.find('\n      ja: {')
    # Find second ja after first
    if ja1_3 > 0:
        ja2_3 = section3.find('\n      ja: {', ja1_3 + 10)
        if ja2_3 > 0 and ja2_3 != ja1_3:
            sub = section3[ja2_3:]
            depth = 0; start_counting = False
            for i, ch in enumerate(sub):
                if ch == '{': depth += 1; start_counting = True
                elif ch == '}':
                    depth -= 1
                    if start_counting and depth == 0:
                        end = i
                        while end < len(sub) and sub[end] in ',\n\r ':
                            end += 1
                        global_start = cs3 + ja2_3
                        global_end = cs3 + ja2_3 + end + 1
                        if global_end > global_start and global_end < len(c):
                            removals.append((global_start, global_end, f"Case 3 duplicate ja ({global_start}-{global_end})"))
                        break

# Remove from end to start
removals.sort(key=lambda x: -x[0])
for start, end, desc in removals:
    print(f"Removing: {desc}")
    c = c[:start] + c[end:]

with open("src/app/[locale]/case-center/case-data.ts", "w", encoding="utf-8") as f:
    f.write(c)

# Verify
from collections import Counter
import re
blocks = re.split(r'\n  \{\n    id:', c)
for i, b in enumerate(blocks):
    if i == 0: continue
    locales = re.findall(r'(?:^|\n)\s{2,}([a-z]{2}): \{', b)
    counts = Counter(locales)
    dups = {k:v for k,v in counts.items() if v > 1}
    if dups:
        print(f'Case {i}: STILL DUPLICATES: {dups}')
    else:
        print(f'Case {i}: OK — {len(counts)} locales')

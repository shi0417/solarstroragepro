#!/usr/bin/env python3
"""Completely deduplicate case-data.ts by keeping only first occurrence of each locale per case."""
import re

with open("src/app/[locale]/case-center/case-data.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Find each case's t block: t: { ... specs:
# Strategy: find all t: { ... } blocks and deduplicate entries within each

def dedup_t_block(match):
    """Deduplicate locale entries within a t: { ... } block."""
    block = match.group(0)
    
    # Find all locale entries: each starts with whitespace + 2-letter code + ": {"
    # Entries can be like: "      en: {" or "            ar: {" (inconsistent indentation)
    entries = list(re.finditer(r'(\s+)([a-z]{2}): \{', block))
    
    if len(entries) <= 1:
        return block
    
    # Find which locales are duplicated
    locale_positions = {}
    for m in entries:
        loc = m.group(2)
        if loc not in locale_positions:
            locale_positions[loc] = []
        locale_positions[loc].append(m)
    
    # For each duplicated locale, keep only the first occurrence
    to_remove = []
    for loc, positions in locale_positions.items():
        if len(positions) > 1:
            # Keep first, remove rest
            for pos in positions[1:]:
                # Find the end of this entry (matching })
                start = pos.start()
                # Count braces to find matching end
                depth = 0
                i = start
                found_start = False
                while i < len(block):
                    if block[i] == '{':
                        depth += 1
                        found_start = True
                    elif block[i] == '}':
                        depth -= 1
                        if found_start and depth == 0:
                            # This is the closing brace
                            # Include trailing comma and newline
                            end = i + 1
                            while end < len(block) and block[end] in ',\n\r ':
                                end += 1
                            to_remove.append((start - len(pos.group(1)), end))
                            break
                    i += 1
    
    # Remove from end to start to preserve positions
    to_remove.sort(key=lambda x: -x[0])
    for start, end in to_remove:
        block = block[:start] + block[end:]
    
    return block

# Find t: { ... } blocks that precede specs:
result = re.sub(r't: \{.*?\n    \},\n    specs:', dedup_t_block, content, flags=re.DOTALL)

with open("src/app/[locale]/case-center/case-data.ts", "w", encoding="utf-8") as f:
    f.write(result)

# Verify
from collections import Counter
blocks = re.split(r'\n  \{\n    id:', result)
for i, b in enumerate(blocks):
    if i == 0: continue
    locales = re.findall(r'(?:^|\n)\s{2,}([a-z]{2}): \{', b)
    counts = Counter(locales)
    dups = {k:v for k,v in counts.items() if v > 1}
    unique = sorted(counts.keys())
    if dups:
        print(f'Case {i}: STILL DUPLICATES: {dups}')
    else:
        print(f'Case {i}: OK — {len(unique)} locales ({unique})')

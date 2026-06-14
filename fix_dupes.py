#!/usr/bin/env python3
"""Remove duplicate locale entries from case-data.ts."""
import re

with open("src/app/[locale]/case-center/case-data.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Strategy: for each case, parse the t: { ... } block, deduplicate entries, rebuild
# Cases are separated by: \n  {\n    id: "xxx"

# Split into segments
parts = re.split(r'(\n  \{\n    id: "[^"]+")', content)
# parts[0] = header, parts[1] = "{\n    id: xxx", parts[2] = content...

header = parts[0]
cases = []
for i in range(1, len(parts), 2):
    case_start = parts[i]
    case_body = parts[i+1] if i+1 < len(parts) else ""
    cases.append((case_start, case_body))

# For each case body, find the t: { ... } block and deduplicate
fixed_cases = []
for case_start, case_body in cases:
    # Find t: { ... } block
    t_match = re.search(r't: \{(.*?)\n    \},\n    specs:', case_body, re.DOTALL)
    if not t_match:
        fixed_cases.append(case_start + case_body)
        continue
    
    t_block = t_match.group(1)
    before_t = case_body[:t_match.start()]
    after_t = case_body[t_match.end():]
    
    # Split into locale entries
    # Each entry starts with "      xx: {" or similar
    entries = re.split(r'(\n      [a-z]{2}: \{)', t_block)
    # entries[0] is empty or whitespace, entries[1] = "\n      en: {", entries[2] = content, etc.
    
    locale_entries = {}
    order = []
    i = 1
    while i < len(entries):
        key_part = entries[i].strip()  # "en: {"
        locale = key_part.split(':')[0]  # "en"
        value = entries[i+1] if i+1 < len(entries) else ""
        # Find the end of this entry (matching closing brace)
        # The value ends with "      },\n" or "      }\n"
        locale_entries[locale] = value
        if locale not in order:
            order.append(locale)
        i += 2
    
    # Rebuild with deduplicated entries
    rebuilt_entries = ""
    seen = set()
    for loc in order:
        if loc in seen:
            continue
        seen.add(loc)
        entry_end = locale_entries[loc].rstrip()
        if not entry_end.endswith('},'):
            entry_end += ','
        rebuilt_entries += f"\n      {loc}: {{{entry_end}\n"
    
    new_body = before_t + "t: {" + rebuilt_entries + "\n    },\n    specs:" + after_t
    fixed_cases.append(case_start + new_body)

result = header + "".join(fixed_cases)

with open("src/app/[locale]/case-center/case-data.ts", "w", encoding="utf-8") as f:
    f.write(result)

# Verify
with open("src/app/[locale]/case-center/case-data.ts", "r", encoding="utf-8") as f:
    c = f.read()
from collections import Counter
blocks = re.split(r'\n  \{\n    id:', c)
for i, b in enumerate(blocks):
    if i == 0: continue
    locales = re.findall(r'      (en|zh|es|tr|pt|de|fr|ar|th|ja|ko|id):', b)
    counts = Counter(locales)
    dups = {k:v for k,v in counts.items() if v > 1}
    unique = sorted(counts.keys())
    if dups:
        print(f'Case {i}: STILL DUPLICATES: {dups}')
    else:
        print(f'Case {i}: OK — {len(unique)} locales ({unique})')

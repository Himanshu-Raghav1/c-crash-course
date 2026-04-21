import re

# Read the file
with open('src/data/assignmentData.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove problematic entries: A19 and A20 which have malformed multi-line strings
# Match from 'A19': { to the closing } before 'A20' or 'A21'
content = re.sub(r"\s*'A19':\s*\{[^}]*?code:\s*`[^`]*`[^}]*?\},\n", "", content, flags=re.DOTALL)
content = re.sub(r"\s*'A20':\s*\{[^}]*?code:\s*`[^`]*`[^}]*?\},\n", "", content, flags=re.DOTALL)

# Write back
with open('src/data/assignmentData.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed assignment data file")

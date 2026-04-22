import re

file_path = "src/data/assignmentData.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# I will re-inject A10, A11, A12, A13, A20, A21 if they are broken
# But actually, I'll just look for the corrupted junctions and fix them with regex.

# Fix A10/A11 junction
content = re.sub(r'case \'!\': printf\("%lld", fact\(a\)\); break;\s+Dcube -->', r'case \'!\': printf("%lld", fact(a)); break;\n    }\n}\n` \n  },\n  \'A11\': {\n    id: \'A11\', \n    title: \'Assignment 11\',\n    flowchart: `graph TD\n    Start([Start]) --> In[/Accept n/]\n    In --> Dsqrt[/Display sqrt n/]\n    Dsqrt --> Dsq[/Display n^2/]\n    Dsq --> Dcube[/Display n^3/]\n    Dcube -->', content)

# Fix A20/A21 junction
content = re.sub(r'swappoint\(&a, &b\);\s+io: { input: "", output: "" },', r'swappoint(&a, &b);\n}\n` \n  },\n  \'A21\': {\n    id: \'A21\', \n    title: \'Assignment 21\',\n    ps: "Write a program in C to copy contents of one file to another using file handling.",\n    objective: `• To understand the concept of file handling in the C programming language. • To learn how to read data from a file and write data into another file. • To implement file copy operation using standard file handling functions.`,\n    algorithm: [],\n    io: { input: "", output: "" },', content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

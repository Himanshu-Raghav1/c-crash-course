import re

def convert_pdf_to_tsx(input_path, output_path):
    with open(input_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove the page headers to clean up the text
    content = re.sub(r'\\n--- PAGE \d+ ---\\n', '\n', content)

    # Split by "Assignment X"
    parts = re.split(r'Assignment\s+(\d+)', content)
    
    assignments = []
    
    for i in range(1, len(parts), 2):
        a_id = f"A{parts[i].strip()}"
        text = parts[i+1]
        
        # We need flexible extractors because PDF text extraction is messy
        def extract(start_key, end_keys):
            # Find the start_key (handling multiple possible spaces between words)
            regex_start_key = start_key.replace(" ", r"\s+")
            start_match = re.search(r'\b' + regex_start_key + r'\s*:', text, re.IGNORECASE)
            if not start_match:
                return ""
            
            start_pos = start_match.end()
            
            # Find the earliest end_key after start_pos
            min_end_pos = len(text)
            for e_key in end_keys:
                regex_e_key = e_key.replace(" ", r"\s+")
                e_match = re.search(r'\b' + regex_e_key + r'\s*:', text[start_pos:], re.IGNORECASE)
                if e_match:
                    pos = start_pos + e_match.start()
                    if pos < min_end_pos:
                        min_end_pos = pos
                        
            return text[start_pos:min_end_pos].strip()

        all_headers = ["PROBLEM STATEMENT", "OBJECTIVE", "OBJECTIVES", "THEORY", "ALGORITHM", "FLOWCHART", "PLATFORM", "CODE", "INPUT", "OUTPUT", "CONCLUSION"]
        
        ps = extract("PROBLEM STATEMENT", all_headers)
        obs = extract("OBJECTIVE", all_headers) or extract("OBJECTIVES", all_headers)
        algo_text = extract("ALGORITHM", all_headers)
        code = extract("CODE", all_headers)
        inp = extract("INPUT", all_headers)
        outp = extract("OUTPUT", all_headers)
        conc = extract("CONCLUSION", all_headers)
        
        # Clean algorithm steps
        algos = []
        for line in algo_text.split('\n'):
            line = line.strip()
            if line.lower().startswith('step') or bool(re.match(r'^\d+\.', line)):
                # Keep it but remove the "Step X:" if present to fit our UI
                cleaned = re.sub(r'^(Step\s*\d+:?|\d+\.)\s*', '', line, flags=re.IGNORECASE).strip()
                if cleaned:
                    algos.append(cleaned)
                    
        # Fallback if no steps found
        if not algos and algo_text:
            algos = [line.strip() for line in algo_text.split('\n') if line.strip()]

        # Clean code (escape backticks and variables for JS template literals)
        code = code.replace('`', '\\`').replace('$', '\\$').strip()
        ps = ps.replace('`', '\\`').replace('"', '\\"')
        obs = obs.replace('`', '\\`').replace('"', '\\"')
        conc = conc.replace('`', '\\`').replace('"', '\\"')
        inp = inp.replace('`', '\\`').replace('"', '\\"')
        outp = outp.replace('`', '\\`').replace('"', '\\"')
        
        algos_str = ",\n      ".join([f'"{a.replace("`", "\\\\`").replace("\"", "\\\"")}"' for a in algos])

        assignment_obj = f"""
  '{a_id}': {{
    id: '{a_id}',
    title: 'Assignment {parts[i].strip()}',
    ps: "{ps.replace('\\n', ' ')}",
    objective: "{obs.replace('\\n', ' ')}",
    algorithm: [
      {algos_str}
    ],
    io: {{ input: "{inp.replace('\\n', ' ')}", output: "{outp.replace('\\n', ' ')}" }},
    conclusion: "{conc.replace('\\n', ' ')}",
    code: `{code}`
  }}"""
        assignments.append((int(parts[i].strip()), assignment_obj))

    # Sort assignments by ID 
    assignments.sort(key=lambda x: x[0])
    
    # Generate full TSX
    tsx_content = f"""import React from 'react';
import {{ LeapYearSim }} from '../components/LeapYearSim';
import {{ CalculatorSim }} from '../components/CalculatorSim';
import {{ TableSim }} from '../components/TableSim';
import {{ SalarySim }} from '../components/SalarySim';

export interface Assignment {{
  id: string;
  title: string;
  ps: string;
  objective: string;
  algorithm: string[];
  io: {{ input: string; output: string }};
  conclusion: string;
  code: string;
  sim?: React.ReactNode;
}}

export const assignmentsOverview = [
{",\\n".join([f"  {{ id: 'A{x[0]}', title: 'Assignment {x[0]}' }}" for x in assignments])}
];

export const assignmentData: Record<string, Assignment> = {{
{",".join([x[1] for x in assignments])}
}};

// Attach simulations back to the first 4 if they exist
if (assignmentData['A1']) assignmentData['A1'].sim = <LeapYearSim />;
if (assignmentData['A2']) assignmentData['A2'].sim = <CalculatorSim />;
if (assignmentData['A3']) assignmentData['A3'].sim = <TableSim />;
if (assignmentData['A4']) assignmentData['A4'].sim = <SalarySim />;
"""

    with open(output_path, 'w', encoding='utf-8') as out:
        out.write(tsx_content)

if __name__ == "__main__":
    convert_pdf_to_tsx('assignments_extracted.txt', 'src/data/assignmentData.tsx')

import json
import re

def parse_extracted_txt(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by "Assignment X"
    parts = re.split(r'Assignment\s+(\d+)', content)
    
    assignments = {}
    
    for i in range(1, len(parts), 2):
        a_id = f"A{parts[i]}"
        text = parts[i+1]
        
        # Regex extractors
        def extract(section_name, next_sections):
            pattern = f"{section_name}:\s*(.*?)(?={'|'.join([s + ':' for s in next_sections])}|$)"
            match = re.search(pattern, text, re.DOTALL | re.IGNORECASE)
            if match:
                return match.group(1).strip()
            return ""

        all_headers = ["PROBLEM STATEMENT", "OBJECTIVE", "OBJECTIVES", "THEORY", "ALGORITHM", "FLOWCHART", "PLATFORM", "CODE", "INPUT", "OUTPUT", "CONCLUSION"]
        
        ps = extract("PROBLEM STATEMENT", all_headers)
        # Objectives could be OBJECTIVE or OBJECTIVES
        obs = extract("OBJECTIVE", all_headers)
        if not obs:
            obs = extract("OBJECTIVES", all_headers)
            
        algo_text = extract("ALGORITHM", all_headers)
        code = extract("CODE", all_headers)
        inp = extract("INPUT", all_headers)
        outp = extract("OUTPUT", all_headers)
        conc = extract("CONCLUSION", all_headers)
        
        # Clean algo text to array
        algos = []
        for line in algo_text.split('\\n'):
            line = line.strip()
            if line.lower().startswith('step'):
                algos.append(line)
                
        if not algos:
            algos = [line.strip() for line in algo_text.split('\\n') if line.strip()]
            
        assignments[a_id] = {
            "id": a_id,
            "title": f"Assignment {parts[i]}",
            "ps": ps,
            "objective": obs,
            "algorithm": algos,
            "io": { "input": inp, "output": outp },
            "conclusion": conc,
            "code": code
        }
        
    with open('parsed_assignments.json', 'w', encoding='utf-8') as out:
        json.dump(assignments, out, indent=2)

if __name__ == "__main__":
    parse_extracted_txt('assignments_extracted.txt')

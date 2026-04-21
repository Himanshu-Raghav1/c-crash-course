import PyPDF2
import sys

def extract_text(pdf_path, text_output_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page_num in range(len(reader.pages)):
            text += f"\\n--- PAGE {page_num + 1} ---\\n"
            text += reader.pages[page_num].extract_text()
            text += "\\n"
        
        with open(text_output_path, 'w', encoding='utf-8') as out_file:
            out_file.write(text)

if __name__ == "__main__":
    pdf_file = "FOP_Assignments(1-22).pdf"
    output_file = "assignments_extracted.txt"
    extract_text(pdf_file, output_file)
    print("Done extracting.")

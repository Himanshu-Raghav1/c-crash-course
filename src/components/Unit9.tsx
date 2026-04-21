import React, { useState } from 'react';
import { ArrowLeft, Copy, CheckCircle2, HardDrive, FileEdit, Database } from 'lucide-react';
import { FileBufferSimulator } from './FileBufferSimulator';

interface UnitProps {
  onBack: () => void;
}

export const Unit9: React.FC<UnitProps> = ({ onBack }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const fileWriteCode = `#include <stdio.h>

int main() {
    // 1. Declare a file pointer
    FILE *filePointer;
    
    // 2. Open file in "w" (write) mode. Creates file if it doesn't exist.
    filePointer = fopen("data.txt", "w");
    
    if (filePointer == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }
    
    // 3. Write data to the file using fprintf (like printf, but for files)
    fprintf(filePointer, "Hello from C!\\n");
    fprintf(filePointer, "Score: %d\\n", 100);
    
    // 4. Close the file to free memory and unlock it
    fclose(filePointer);
    
    printf("File written successfully.\\n");
    return 0;
}`;

  const fileReadCode = `#include <stdio.h>

int main() {
    FILE *filePointer;
    char buffer[100];
    
    // Open file in "r" (read) mode.
    filePointer = fopen("data.txt", "r");
    
    if (filePointer == NULL) {
        printf("File not found!\\n");
        return 1;
    }
    
    // Read the file line by line using fgets
    // fgets(buffer, size, file_pointer)
    while (fgets(buffer, sizeof(buffer), filePointer) != NULL) {
        // We print the buffer. We don't need \\n because fgets keeps newlines.
        printf("Read: %s", buffer);
    }
    
    fclose(filePointer);
    return 0;
}`;

  return (
    <div className="animate-fade-in pb-20 max-w-4xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center space-x-2 text-neon-cyan hover:text-white transition-colors mb-6 font-bold"
      >
        <ArrowLeft size={18} /> <span>Back to Dashboard</span>
      </button>

      <h2 className="text-4xl font-bold text-white mb-2">Unit 9: File Handling</h2>
      <p className="text-gray-400 mb-8 pb-4 border-b border-dark-700">Persist your data! Learn how to read from and write to the hard drive.</p>

      {/* Section 1: Buffer Simulator */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-orange mb-4 flex items-center">
          <Database className="mr-3" size={20} /> The File Stream
        </h3>
        <p className="text-gray-300 mb-4">
          C views a file as a continuous stream of bytes. To interact with it, we use a <strong>File Pointer</strong> (<code>FILE *</code>). Because disk I/O is slow, C buffers text in RAM before writing it out.
        </p>
        <FileBufferSimulator />
      </section>

      {/* Section 2: Modes */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-cyan mb-4 flex items-center">
          <FileEdit className="mr-3" size={20} /> File Operational Modes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-dark-900 p-4 rounded border border-dark-700">
            <strong className="text-neon-cyan mb-1 flex">"r" (Read)</strong>
            <p className="text-sm text-gray-400">Opens file for reading. File MUST exist, or it returns NULL.</p>
          </div>
          <div className="bg-dark-900 p-4 rounded border border-dark-700">
            <strong className="text-neon-purple mb-1 flex">"w" (Write)</strong>
            <p className="text-sm text-gray-400">Opens file for writing. Overwrites existing contents or creates a new file.</p>
          </div>
          <div className="bg-dark-900 p-4 rounded border border-dark-700">
            <strong className="text-neon-orange mb-1 flex">"a" (Append)</strong>
            <p className="text-sm text-gray-400">Opens file for writing at the end. Preserves existing contents.</p>
          </div>
        </div>
      </section>

      {/* Section 3: Writing Files */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-purple mb-4 flex items-center">
          <HardDrive className="mr-3" size={20} /> Writing Files
        </h3>
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden mb-4">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">write_file.c</span>
            <button 
              onClick={() => handleCopy(fileWriteCode, 'write')}
              className="flex items-center space-x-1 text-xs font-bold text-neon-purple hover:text-white transition-colors"
            >
              {copied === 'write' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'write' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
            <code>{fileWriteCode}</code>
          </pre>
        </div>
      </section>
      
      {/* Section 4: Reading Files */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center">
          <HardDrive className="mr-3" size={20} /> Reading Files
        </h3>
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden mb-4">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">read_file.c</span>
            <button 
              onClick={() => handleCopy(fileReadCode, 'read')}
              className="flex items-center space-x-1 text-xs font-bold text-green-400 hover:text-white transition-colors"
            >
              {copied === 'read' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'read' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
            <code>{fileReadCode}</code>
          </pre>
        </div>
      </section>

    </div>
  );
};

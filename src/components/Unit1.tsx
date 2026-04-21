import React, { useState } from 'react';
import { ArrowLeft, Copy, CheckCircle2, History, Zap, Code2, Cpu } from 'lucide-react';
import { CompilationVisualizer } from './CompilationVisualizer';

interface UnitProps {
  onBack: () => void;
}

export const Unit1: React.FC<UnitProps> = ({ onBack }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const helloWorldCode = `#include <stdio.h>  // Preprocessor Directive: Includes standard I/O library

int main() {         // The main() function: Execution starts here
    
    // printf() displays text to the screen
    printf("Hello, World!\\n"); 
    
    return 0;        // Returns 0 to the OS indicating success
}`;

  return (
    <div className="animate-fade-in pb-20 max-w-4xl mx-auto">
      {/* Navigation */}
      <button 
        onClick={onBack}
        className="flex items-center space-x-2 text-neon-cyan hover:text-white transition-colors mb-6 font-bold"
      >
        <ArrowLeft size={18} /> <span>Back to Dashboard</span>
      </button>

      <h2 className="text-4xl font-bold text-white mb-2">Unit 1: Introduction to C</h2>
      <p className="text-gray-400 mb-8 pb-4 border-b border-dark-700">The mother of all modern programming languages. Master this, and you can learn anything.</p>

      {/* Section 1: What is C? */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-cyan mb-4 flex items-center">
          <History className="mr-3" size={20} /> What is C? & History
        </h3>
        <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 text-gray-300">
          <p className="mb-4">
            C is a general-purpose, procedural computer programming language. It is incredibly fast and gives you direct access to system memory.
          </p>
          <ul className="space-y-3 list-none">
            <li className="flex items-start"><span className="text-neon-cyan mr-2">▹</span> Created by <strong>Dennis Ritchie</strong> in 1972 at Bell Laboratories.</li>
            <li className="flex items-start"><span className="text-neon-cyan mr-2">▹</span> Originally invented to write the UNIX operating system.</li>
            <li className="flex items-start"><span className="text-neon-cyan mr-2">▹</span> The predecessor to C++, Java, and Python.</li>
          </ul>
        </div>
      </section>

      {/* Section 2: Features */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-purple mb-4 flex items-center">
          <Zap className="mr-3" size={20} /> Key Features of C
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-dark-800 p-4 rounded border border-dark-700 border-l-2 border-l-neon-purple">
            <strong className="text-white block mb-1">Simple & Fast</strong>
            <p className="text-sm text-gray-400">Compiles down to raw machine code, making it blazing fast.</p>
          </div>
          <div className="bg-dark-800 p-4 rounded border border-dark-700 border-l-2 border-l-neon-purple">
            <strong className="text-white block mb-1">Portability</strong>
            <p className="text-sm text-gray-400">Can be compiled and run on different machines easily.</p>
          </div>
          <div className="bg-dark-800 p-4 rounded border border-dark-700 border-l-2 border-l-neon-purple">
            <strong className="text-white block mb-1">Mid-Level Language</strong>
            <p className="text-sm text-gray-400">Combines assembly language power with high-level syntax.</p>
          </div>
          <div className="bg-dark-800 p-4 rounded border border-dark-700 border-l-2 border-l-neon-purple">
            <strong className="text-white block mb-1">Rich Library</strong>
            <p className="text-sm text-gray-400">Provides a massive set of built-in functions via header files.</p>
          </div>
        </div>
      </section>

      {/* Section 3: Structure */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-orange mb-4 flex items-center">
          <Code2 className="mr-3" size={20} /> Structure of a C Program
        </h3>
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden mb-4">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">hello_world.c</span>
            <button 
              onClick={() => handleCopy(helloWorldCode, 'hw')}
              className="flex items-center space-x-1 text-xs font-bold text-neon-orange hover:text-white transition-colors"
            >
              {copied === 'hw' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'hw' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
            <code>{helloWorldCode}</code>
          </pre>
        </div>
      </section>

      {/* Section 4: Compilation Process + Interactive Widget */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center">
          <Cpu className="mr-3" size={20} /> The Compilation Pipeline
        </h3>
        <p className="text-gray-300 mb-2">
          Click through the stages below to see exactly how your C code translates into machine code.
        </p>
        <CompilationVisualizer />
      </section>
    </div>
  );
};

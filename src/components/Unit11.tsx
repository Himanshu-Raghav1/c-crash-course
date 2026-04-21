import React, { useState } from 'react';
import { ArrowLeft, Copy, CheckCircle2, Cpu, Settings, Layers, Terminal, Braces, Binary, Zap } from 'lucide-react';
import { CompilationVisualizer } from './CompilationVisualizer';
import { BitwiseVisualizer } from './BitwiseVisualizer';
import { CallStackVisualizer } from './CallStackVisualizer';

interface UnitProps {
  onBack: () => void;
}

export const Unit11: React.FC<UnitProps> = ({ onBack }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const preprocessorCode = `// Preprocessor Directives
#include <stdio.h>    // Standard Header
#include "my_header.h" // Local Header

#define PI 3.14159     // Macro Constant
#define SQUARE(x) ((x)*(x)) // Macro Function

int main() {
    printf("PI is %f\\n", PI);
    printf("Square of 5 is %d\\n", SQUARE(5));
    return 0;
}`;

  const cliArgsCode = `// Command Line Arguments
#include <stdio.h>

int main(int argc, char *argv[]) {
    printf("Program Name: %s\\n", argv[0]);
    printf("Number of arguments: %d\\n", argc - 1);
    
    if (argc > 1) {
        for (int i = 1; i < argc; i++) {
            printf("Argument %d: %s\\n", i, argv[i]);
        }
    }
    return 0;
}`;

  const bitManipulationCode = `// Bit Manipulation
#include <stdio.h>

int main() {
    unsigned char a = 5;  // 00000101
    unsigned char b = 9;  // 00001001

    printf("AND: %d\\n", a & b); // 00000001 (1)
    printf("OR:  %d\\n", a | b); // 00001101 (13)
    printf("XOR: %d\\n", a ^ b); // 00001100 (12)
    printf("NOT a: %d\\n", (unsigned char)~a);
    printf("Left Shift a by 1: %d\\n", a << 1); // 00001010 (10)
    
    return 0;
}`;

  const typedefEnumCode = `// typedef and enum
#include <stdio.h>

// enum: set of named constants
typedef enum {
    LOW,
    MEDIUM,
    HIGH
} Priority;

// typedef: type alias
typedef unsigned long ulong;

int main() {
    Priority p = MEDIUM;
    ulong hugeNumber = 1000000;
    
    if (p == MEDIUM) {
        printf("Priority is Medium\\n");
    }
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

      <h2 className="text-4xl font-bold text-white mb-2 underline decoration-neon-purple/50 decoration-4 underline-offset-8">Unit 11: Advanced Topics</h2>
      <p className="text-gray-400 mb-8 pb-4 border-b border-dark-700">Wrapping up the journey. Master the tools that separate beginners from pros.</p>

      {/* 1. Preprocessor & Headers */}
      <section className="mb-14">
        <h3 className="text-2xl font-bold text-neon-cyan mb-4 flex items-center">
          <Settings className="mr-3" size={24} /> 1. Preprocessor & Header Files
        </h3>
        <p className="text-gray-300 mb-6">
          Before your code is compiled, the <strong>Preprocessor</strong> processes all lines starting with <code>#</code>. It expands your headers (<code>#include</code>) and replaces your macros (<code>#define</code>).
        </p>
        <div className="bg-dark-900 rounded-xl border border-dark-700 overflow-hidden mb-6">
          <div className="p-4 border-b border-dark-700 bg-dark-800 flex justify-between items-center">
            <span className="text-sm font-bold text-gray-300">Compilation & Preprocessing Simulator</span>
          </div>
          <CompilationVisualizer />
        </div>
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">preprocessor.c</span>
            <button onClick={() => handleCopy(preprocessorCode, 'pre')} className="text-xs font-bold text-neon-cyan hover:text-white flex items-center space-x-1">
              {copied === 'pre' ? <CheckCircle2 size={14} /> : <Copy size={14} />}
              <span>{copied === 'pre' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto"><code>{preprocessorCode}</code></pre>
        </div>
      </section>

      {/* 2. Bit Manipulation */}
      <section className="mb-14">
        <h3 className="text-2xl font-bold text-neon-orange mb-4 flex items-center">
          <Binary className="mr-3" size={24} /> 2. Bit Manipulation
        </h3>
        <p className="text-gray-300 mb-6">
          C allows you to work directly with bits. This is extremely fast and essential for low-level systems programming and hardware interaction.
        </p>
        <BitwiseVisualizer />
        <div className="mt-6 bg-dark-800 rounded-lg border border-dark-700 overflow-hidden">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">bitwise.c</span>
            <button onClick={() => handleCopy(bitManipulationCode, 'bit')} className="text-xs font-bold text-neon-orange hover:text-white flex items-center space-x-1">
              {copied === 'bit' ? <CheckCircle2 size={14} /> : <Copy size={14} />}
              <span>{copied === 'bit' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto"><code>{bitManipulationCode}</code></pre>
        </div>
      </section>

      {/* 3. The Hard Topic: Recursion */}
      <section className="mb-14">
        <h3 className="text-2xl font-bold text-neon-purple mb-4 flex items-center">
          <Layers className="mr-3" size={24} /> 3. Recursion & The Call Stack
        </h3>
        <p className="text-gray-300 mb-6">
          A function calling itself. It sounds simple, but visualizing the <strong>Call Stack</strong> is key to understanding how variables are stored during each call.
        </p>
        <CallStackVisualizer />
      </section>

      {/* 4. CLI Arguments */}
      <section className="mb-14">
        <h3 className="text-2xl font-bold text-gray-200 mb-4 flex items-center">
          <Terminal className="mr-3" size={24} /> 4. Command Line Arguments
        </h3>
        <p className="text-gray-300 mb-6">
          Ever wonder how <code>gcc file.c</code> works? Applications receive data via <code>argc</code> (number of words) and <code>argv</code> (the actual words) in the <code>main</code> function.
        </p>
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">cli_args.c</span>
            <button onClick={() => handleCopy(cliArgsCode, 'cli')} className="text-xs font-bold text-gray-300 hover:text-white flex items-center space-x-1">
              {copied === 'cli' ? <CheckCircle2 size={14} /> : <Copy size={14} />}
              <span>{copied === 'cli' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto"><code>{cliArgsCode}</code></pre>
        </div>
      </section>

      {/* 5. Typedef & Enum */}
      <section className="mb-10">
        <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center">
          <Braces className="mr-3" size={24} /> 5. Typedef & Enumerations
        </h3>
        <p className="text-gray-300 mb-6">
          Make your code readable and structured using aliases and named constant sets.
        </p>
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">typedef_enum.c</span>
            <button onClick={() => handleCopy(typedefEnumCode, 'type')} className="text-xs font-bold text-green-400 hover:text-white flex items-center space-x-1">
              {copied === 'type' ? <CheckCircle2 size={14} /> : <Copy size={14} />}
              <span>{copied === 'type' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto"><code>{typedefEnumCode}</code></pre>
        </div>
      </section>

      {/* Final Encouragement */}
      <div className="bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 p-8 rounded-2xl border border-white/10 text-center">
          <Zap className="mx-auto text-neon-cyan mb-4" size={48} />
          <h2 className="text-2xl font-bold text-white mb-2">You've Finished the Course!</h2>
          <p className="text-gray-400">You now have a solid foundation in C. From variables to dynamic memory and bit manipulation, you're ready for the exam (and the real world).</p>
      </div>

    </div>
  );
};

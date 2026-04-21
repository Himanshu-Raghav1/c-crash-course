import React, { useState } from 'react';
import { ArrowLeft, Copy, CheckCircle2, TextSelect, Terminal, Info, LayoutGrid } from 'lucide-react';
import { DataTypeVisualizer } from './DataTypeVisualizer';

interface UnitProps {
  onBack: () => void;
}

export const Unit2: React.FC<UnitProps> = ({ onBack }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const tokensCode = `#include <stdio.h> // '#include' and '<stdio.h>' are tokens

int main() {       // 'int', 'main', '(', ')', '{' are all distinct tokens
    int x = 10;    // 'int' (keyword), 'x' (identifier), '=' (operator), '10' (constant)
    return 0;      // 'return' (keyword), '0' (constant), ';' (symbol)
}                  // '}' (symbol)`;

  const variablesCode = `#include <stdio.h>

int main() {
    // 1. VARIABLE: Can be changed later
    // Syntax: type variable_name = value;
    int score = 100;
    
    // Changing the variable's value
    score = 150; 
    
    // 2. CONSTANT: Cannot be changed once defined
    // We use the 'const' keyword
    const float PI = 3.14159;
    
    // PI = 3.14; // ERROR: Assignment of read-only variable
    
    printf("Score is %d, and PI is %f\\n", score, PI);
    return 0;
}`;

  const ioCode = `#include <stdio.h>

int main() {
    int age;
    float height;
    
    // printf() sends formatted output to the screen
    printf("Enter your age: ");
    
    // scanf() reads formatted input from the user/keyboard
    // '&age' gives scanf the MEMORY ADDRESS of 'age' so it can store the value there
    scanf("%d", &age);
    
    printf("Enter your height in meters (e.g. 1.75): ");
    // We use %f for floats in scanf
    scanf("%f", &height);
    
    // We use %d for integers, %f for floats.
    // %.2f restricts the float output to 2 decimal places.
    printf("You are %d years old and %.2f meters tall.\\n", age, height);
    
    return 0;
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

      <h2 className="text-4xl font-bold text-white mb-2">Unit 2: Basic Syntax & First Program</h2>
      <p className="text-gray-400 mb-8 pb-4 border-b border-dark-700">Understanding the building blocks of C code: Tokens, Types, Variables, and I/O.</p>

      {/* Section 1: Tokens */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-purple mb-4 flex items-center">
          <TextSelect className="mr-3" size={20} /> C Tokens
        </h3>
        <p className="text-gray-300 mb-4">
          A C program consists of various tokens. A token is the smallest individual unit in a program. They include:{" "}
          <strong>Keywords, Identifiers, Constants, Strings, Special Symbols, and Operators</strong>.
        </p>
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden mb-4">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">tokens_example.c</span>
            <button 
              onClick={() => handleCopy(tokensCode, 'tokens')}
              className="flex items-center space-x-1 text-xs font-bold text-neon-purple hover:text-white transition-colors"
            >
              {copied === 'tokens' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'tokens' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
            <code>{tokensCode}</code>
          </pre>
        </div>
      </section>

      {/* Section 2: Data Types */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-cyan mb-4 flex items-center">
          <LayoutGrid className="mr-3" size={20} /> Data Types
        </h3>
        <p className="text-gray-300 mb-4">
          Data types specify how we enter data into our programs and what type of data we enter. 
          C has a rich set of data types that determine the size and layout of a variable's memory.
        </p>
        <DataTypeVisualizer />
      </section>

      {/* Section 3: Variables & Constants */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-orange mb-4 flex items-center">
          <Info className="mr-3" size={20} /> Variables & Constants
        </h3>
        <p className="text-gray-300 mb-4">
          A <strong>variable</strong> is a name given to a memory location indicating where data is stored. 
          A <strong>constant</strong> is a variable whose value cannot be changed once it is defined.
        </p>
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden mb-4">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">variables.c</span>
            <button 
              onClick={() => handleCopy(variablesCode, 'vars')}
              className="flex items-center space-x-1 text-xs font-bold text-neon-orange hover:text-white transition-colors"
            >
              {copied === 'vars' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'vars' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
            <code>{variablesCode}</code>
          </pre>
        </div>
      </section>

      {/* Section 4: Input / Output */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center">
          <Terminal className="mr-3" size={20} /> Input & Output (printf / scanf)
        </h3>
        <p className="text-gray-300 mb-4">
          C provides built-in functions via the <code>&lt;stdio.h&gt;</code> library to perform Input and Output operations.
          We use <strong>printf()</strong> to print to the screen and <strong>scanf()</strong> to read from the keyboard.
        </p>
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden mb-4">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">io_example.c</span>
            <button 
              onClick={() => handleCopy(ioCode, 'io')}
              className="flex items-center space-x-1 text-xs font-bold text-green-400 hover:text-white transition-colors"
            >
              {copied === 'io' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'io' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
            <code>{ioCode}</code>
          </pre>
        </div>
      </section>
    </div>
  );
};

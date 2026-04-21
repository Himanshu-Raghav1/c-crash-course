import React, { useState } from 'react';
import { ArrowLeft, Copy, CheckCircle2, BoxSelect, BringToFront, Network, Database } from 'lucide-react';
import { CallStackVisualizer } from './CallStackVisualizer';

interface UnitProps {
  onBack: () => void;
}

export const Unit5: React.FC<UnitProps> = ({ onBack }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const basicsCode = `#include <stdio.h>

// 1. Function Declaration (Prototype): 
// Tells the compiler the function exists before it's called
int addNumbers(int a, int b); 

int main() {
    int sum = addNumbers(5, 10); // Function Call
    printf("Sum is: %d\\n", sum);
    return 0;
}

// 2. Function Definition: The actual logic
int addNumbers(int a, int b) {
    int result = a + b;
    return result; // Returning the value
}`;

  const recursionCode = `#include <stdio.h>

// A recursive function calls itself
int factorial(int n) {
    // 1. Base Case: The condition that stops the recursion
    if (n == 0 || n == 1) {
        return 1;
    }
    // 2. Recursive Case: Calls itself with a smaller input
    else {
        return n * factorial(n - 1);
    }
}

int main() {
    int result = factorial(5); // 5 * 4 * 3 * 2 * 1
    printf("Factorial of 5 is %d\\n", result);
    return 0;
}`;

  const storageCode = `#include <stdio.h>

void counterFunction() {
    // 'auto' is the default for local variables. Disappears after function ends.
    int autoVar = 0; 
    
    // 'static' remembers its value across function calls. Initialized only once.
    static int staticVar = 0; 
    
    autoVar++;
    staticVar++;
    
    printf("Auto: %d, Static: %d\\n", autoVar, staticVar);
}

int main() {
    counterFunction(); // Prints: Auto: 1, Static: 1
    counterFunction(); // Prints: Auto: 1, Static: 2
    counterFunction(); // Prints: Auto: 1, Static: 3
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

      <h2 className="text-4xl font-bold text-white mb-2">Unit 5: Functions</h2>
      <p className="text-gray-400 mb-8 pb-4 border-b border-dark-700">Break your code into reusable, modular blocks.</p>

      {/* Section 1: Function Basics */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-cyan mb-4 flex items-center">
          <BoxSelect className="mr-3" size={20} /> Function Basics
        </h3>
        <p className="text-gray-300 mb-4">
          A function is a block of code that performs a specific task. By using functions, you follow the <strong>DRY (Don't Repeat Yourself)</strong> principle.
          Every C program has at least one function: <code>main()</code>.
        </p>
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden mb-4">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">basics.c</span>
            <button 
              onClick={() => handleCopy(basicsCode, 'basics')}
              className="flex items-center space-x-1 text-xs font-bold text-neon-cyan hover:text-white transition-colors"
            >
              {copied === 'basics' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'basics' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
            <code>{basicsCode}</code>
          </pre>
        </div>
      </section>

      {/* Section 2: Call Stack & Recursion Visualizer */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-purple mb-4 flex items-center">
          <Network className="mr-3" size={20} /> Recursion & The Call Stack
        </h3>
        <p className="text-gray-300 mb-4">
          A function can call itself! This is called <strong>Recursion</strong>. However, every time a function is called, the computer allocates memory on the <strong>Call Stack</strong>. Use the interactive step-through below to see how a recursive <code>factorial(3)</code> builds memory upwards before evaluating back down.
        </p>
        <div className="mb-6">
           <CallStackVisualizer />
        </div>
        
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden mb-4 mt-6">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">recursion.c</span>
            <button 
              onClick={() => handleCopy(recursionCode, 'recursion')}
              className="flex items-center space-x-1 text-xs font-bold text-neon-purple hover:text-white transition-colors"
            >
              {copied === 'recursion' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'recursion' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
            <code>{recursionCode}</code>
          </pre>
        </div>
      </section>

      {/* Section 3: Parameters */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-orange mb-4 flex items-center">
          <BringToFront className="mr-3" size={20} /> Function Arguments (Pass by Value)
        </h3>
        <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 text-gray-300">
          <p className="mb-4">
            In C, arguments are passed <strong>by value</strong>. This means when you pass a variable to a function, C creates a <em>copy</em> of that variable. Changing the parameter inside the function <em>will not</em> affect the original variable in <code>main()</code>. 
          </p>
          <p className="text-sm bg-dark-900 border-l-4 border-neon-orange p-3 rounded">
            <em>Note: If you want to modify the original variable, you must use Pointers (Pass by Reference). We will cover this in Unit 7!</em>
          </p>
        </div>
      </section>

      {/* Section 4: Storage Classes */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center">
          <Database className="mr-3" size={20} /> Storage Classes
        </h3>
        <p className="text-gray-300 mb-4">
          Storage classes define the scope (visibility) and lifetime of variables.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-dark-900 p-4 rounded border border-dark-700">
            <strong className="text-neon-cyan mb-1 flex"><span className="mr-2">1.</span> auto</strong>
            <p className="text-sm text-gray-400 text-indent">The default for local variables. Exists only within the block it is defined.</p>
          </div>
          <div className="bg-dark-900 p-4 rounded border border-dark-700">
            <strong className="text-neon-purple mb-1 flex"><span className="mr-2">2.</span> static</strong>
            <p className="text-sm text-gray-400">Retains its value between multiple function calls. Very useful for counters!</p>
          </div>
          <div className="bg-dark-900 p-4 rounded border border-dark-700">
            <strong className="text-neon-orange mb-1 flex"><span className="mr-2">3.</span> extern</strong>
            <p className="text-sm text-gray-400">Tells the compiler that a variable is defined in another file.</p>
          </div>
          <div className="bg-dark-900 p-4 rounded border border-dark-700">
            <strong className="text-green-400 mb-1 flex"><span className="mr-2">4.</span> register</strong>
            <p className="text-sm text-gray-400">Suggests storing the variable in a CPU register instead of RAM for speed.</p>
          </div>
        </div>

        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden mb-4">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">storage.c</span>
            <button 
              onClick={() => handleCopy(storageCode, 'storage')}
              className="flex items-center space-x-1 text-xs font-bold text-green-400 hover:text-white transition-colors"
            >
              {copied === 'storage' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'storage' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
            <code>{storageCode}</code>
          </pre>
        </div>
      </section>
    </div>
  );
};

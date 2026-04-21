import React, { useState } from 'react';
import { ArrowLeft, Copy, CheckCircle2, Target, MoveRight, Layers, BoxSelect, Cpu } from 'lucide-react';
import { PointerVisualizer } from './PointerVisualizer';

interface UnitProps {
  onBack: () => void;
}

export const Unit7: React.FC<UnitProps> = ({ onBack }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const basicPointerCode = `#include <stdio.h>

int main() {
    int age = 25;
    
    // Declare a pointer to an integer.
    // We use & to get the memory address of 'age'
    int *ptr = &age;
    
    printf("Value of age: %d\\n", age);         // Output: 25
    printf("Address of age (&age): %p\\n", &age); // E.g. 0x7ffd737a2b9c
    
    printf("Value of ptr: %p\\n", ptr);         // Same address as &age
    
    // Dereferencing: Use * to get the value AT the address
    printf("Value AT ptr (*ptr): %d\\n", *ptr);  // Output: 25
    
    // Modifying via pointer
    *ptr = 30;
    printf("New value of age: %d\\n", age);      // Output: 30
    
    return 0;
}`;

  const pointerArrayCode = `#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40};
    
    // Array name 'arr' decays into a pointer to its first element!
    int *ptr = arr; // Same as: int *ptr = &arr[0];
    
    // Pointer Arithmetic: adding 1 moves the pointer ahead 
    // by sizeof(int) bytes
    printf("ptr points to: %d\\n", *ptr);       // 10
    
    ptr++; // Move to next memory location
    printf("ptr now points to: %d\\n", *ptr);   // 20
    
    // Accessing array using pointer arithmetic
    printf("3rd element: %d\\n", *(arr + 2));   // 30
    
    return 0;
}`;

  const pointerFuncCode = `#include <stdio.h>

// Pass by reference using pointers!
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 5, y = 10;
    
    printf("Before: x=%d, y=%d\\n", x, y);
    
    // We pass addresses instead of values
    swap(&x, &y);
    
    printf("After: x=%d, y=%d\\n", x, y); // x=10, y=5
    
    return 0;
}`;

  const doublePointerCode = `#include <stdio.h>

int main() {
    int value = 100;
    int *ptr = &value;
    
    // Double pointer: A pointer that stores the address of another pointer
    int **dp = &ptr;
    
    printf("Value: %d\\n", value);       // 100
    printf("*ptr: %d\\n", *ptr);         // 100
    printf("**dp: %d\\n", **dp);         // 100
    
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

      <h2 className="text-4xl font-bold text-white mb-2">Unit 7: Pointers</h2>
      <p className="text-gray-400 mb-8 pb-4 border-b border-dark-700">The most powerful and feared feature of C. Manipulate raw memory directly.</p>

      {/* Section 1: Intro */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-orange mb-4 flex items-center">
          <Target className="mr-3" size={20} /> Introduction to Pointers
        </h3>
        <p className="text-gray-300 mb-4">
          A pointer is simply a variable that stores the <strong>memory address</strong> of another variable. Instead of holding a value like <code>10</code> or <code>'A'</code>, it holds a coordinate in RAM like <code>0x7FFD</code>.
        </p>
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden mb-8">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">pointers.c</span>
            <button 
              onClick={() => handleCopy(basicPointerCode, 'ptr')}
              className="flex items-center space-x-1 text-xs font-bold text-neon-orange hover:text-white transition-colors"
            >
              {copied === 'ptr' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'ptr' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
            <code>{basicPointerCode}</code>
          </pre>
        </div>
        
        {/* Interactive Visualizer */}
        <PointerVisualizer />
      </section>

      {/* Section 2: Pointers and Arrays */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-cyan mb-4 flex items-center">
          <MoveRight className="mr-3" size={20} /> Pointer Arithmetic & Arrays
        </h3>
        <p className="text-gray-300 mb-4">
          Arrays and pointers are tightly integrated. The name of an array is actually just a pointer to its first element! Because of this, you can use math (like <code>ptr++</code>) to walk through an array.
        </p>
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden mb-4">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">ptr_array.c</span>
            <button 
              onClick={() => handleCopy(pointerArrayCode, 'ptrArr')}
              className="flex items-center space-x-1 text-xs font-bold text-neon-cyan hover:text-white transition-colors"
            >
              {copied === 'ptrArr' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'ptrArr' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
            <code>{pointerArrayCode}</code>
          </pre>
        </div>
      </section>

      {/* Section 3: Pointers and Functions */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-purple mb-4 flex items-center">
          <BoxSelect className="mr-3" size={20} /> Pointers and Functions (Pass by Reference)
        </h3>
        <p className="text-gray-300 mb-4">
          In Unit 5, we learned that functions get a "copy" of variables (Pass by Value). By passing <em>pointers</em> to functions, we let the function modify the original variable directly!
        </p>
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden mb-4">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">swap.c</span>
            <button 
              onClick={() => handleCopy(pointerFuncCode, 'swap')}
              className="flex items-center space-x-1 text-xs font-bold text-neon-purple hover:text-white transition-colors"
            >
              {copied === 'swap' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'swap' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
            <code>{pointerFuncCode}</code>
          </pre>
        </div>
      </section>

      {/* Section 4: Double Pointers */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center">
          <Layers className="mr-3" size={20} /> Double Pointers
        </h3>
        <p className="text-gray-300 mb-4">
          A double pointer (<code>int **</code>) is simply a pointer that points to another pointer. This is extremely common when dealing with multi-dimensional arrays or modifying pointers dynamically inside functions.
        </p>
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden mb-4">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">double_ptr.c</span>
            <button 
              onClick={() => handleCopy(doublePointerCode, 'double')}
              className="flex items-center space-x-1 text-xs font-bold text-green-400 hover:text-white transition-colors"
            >
              {copied === 'double' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'double' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
            <code>{doublePointerCode}</code>
          </pre>
        </div>
      </section>
    </div>
  );
};

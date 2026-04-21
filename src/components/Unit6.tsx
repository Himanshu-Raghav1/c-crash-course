import React, { useState } from 'react';
import { ArrowLeft, Copy, CheckCircle2, Grid3X3, Grid, Type, Scissors } from 'lucide-react';
import { ArrayMemoryVisualizer } from './ArrayMemoryVisualizer';

interface UnitProps {
  onBack: () => void;
}

export const Unit6: React.FC<UnitProps> = ({ onBack }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const arrayBasicCode = `#include <stdio.h>

int main() {
    // 1. Array Declaration and Initialization
    int numbers[5] = {10, 20, 30, 40, 50};
    
    // 2. Accessing elements (0-indexed)
    printf("First element: %d\\n", numbers[0]); // 10
    printf("Last element: %d\\n", numbers[4]);  // 50
    
    // 3. Modifying an element
    numbers[1] = 99;
    
    // 4. Iterating through an array
    for(int i = 0; i < 5; i++) {
        printf("%d ", numbers[i]);
    }
    // Output: 10 99 30 40 50
    printf("\\n");
    
    return 0;
}`;

  const multiArrayCode = `#include <stdio.h>

int main() {
    // A 2D array: 2 rows, 3 columns
    int matrix[2][3] = {
        {1, 2, 3}, // Row 0
        {4, 5, 6}  // Row 1
    };
    
    // Accessing elements: matrix[row][col]
    printf("Element at row 1, col 2 is: %d\\n", matrix[1][2]); // 6
    
    // Nested loops are used to iterate over 2D arrays
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\\n");
    }
    
    return 0;
}`;

  const stringLibraryCode = `#include <stdio.h>
#include <string.h> // Library for string functions

int main() {
    char str1[20] = "Hello";
    char str2[] = "World";
    
    // 1. strlen() - Returns length of string (excluding \\0)
    printf("Length of str1: %lu\\n", strlen(str1)); // 5
    
    // 2. strcat() - Concatenates (appends) str2 to str1
    strcat(str1, " ");
    strcat(str1, str2);
    printf("Combined: %s\\n", str1); // "Hello World"
    
    // 3. strcpy() - Copies a string
    char dest[20];
    strcpy(dest, str1);
    printf("Copied string: %s\\n", dest);
    
    // 4. strcmp() - Compares strings (returns 0 if identical)
    int result = strcmp("Apple", "Apple");
    if (result == 0) {
        printf("Strings are purely identical!\\n");
    }
    
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

      <h2 className="text-4xl font-bold text-white mb-2">Unit 6: Arrays & Strings</h2>
      <p className="text-gray-400 mb-8 pb-4 border-b border-dark-700">Group multiple variables into contiguous lists and learn how C handles text.</p>

      {/* Section 1: Intro to Arrays */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-cyan mb-4 flex items-center">
          <Grid className="mr-3" size={20} /> 1-Dimensional Arrays
        </h3>
        <p className="text-gray-300 mb-4">
          An array is a collection of items of the <strong>same data type</strong> stored at contiguous memory locations. Arrays are zero-indexed, meaning the first element is at index <code>0</code>.
        </p>
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden mb-4">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">array_basic.c</span>
            <button 
              onClick={() => handleCopy(arrayBasicCode, 'arr1')}
              className="flex items-center space-x-1 text-xs font-bold text-neon-cyan hover:text-white transition-colors"
            >
              {copied === 'arr1' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'arr1' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
            <code>{arrayBasicCode}</code>
          </pre>
        </div>
      </section>

      {/* Section 2: Memory Visualizer */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-orange mb-4 flex items-center">
          <Type className="mr-3" size={20} /> Memory Layout & Strings
        </h3>
        <p className="text-gray-300 mb-4">
          C does not have a distinct "String" object like Python or Java. Instead, strings are simply <strong>arrays of characters</strong> terminated by a special null character (<code>\0</code>).
        </p>
        <ArrayMemoryVisualizer />
      </section>

      {/* Section 3: Multi-Dimensional Arrays */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-purple mb-4 flex items-center">
          <Grid3X3 className="mr-3" size={20} /> Multi-Dimensional Arrays
        </h3>
        <p className="text-gray-300 mb-4">
          You can create arrays of arrays! A 2D array is essentially a matrix or a table with rows and columns.
        </p>
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden mb-4">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">matrix.c</span>
            <button 
              onClick={() => handleCopy(multiArrayCode, 'multi')}
              className="flex items-center space-x-1 text-xs font-bold text-neon-purple hover:text-white transition-colors"
            >
              {copied === 'multi' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'multi' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
            <code>{multiArrayCode}</code>
          </pre>
        </div>
      </section>

      {/* Section 4: String Handling */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center">
          <Scissors className="mr-3" size={20} /> Standard String Library
        </h3>
        <p className="text-gray-300 mb-4">
          Because strings are just raw arrays, you can't easily concatenate them with a <code>+</code> sign. Instead, you include <code>&lt;string.h&gt;</code> to use specialized functions.
        </p>
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden mb-4">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">string_funcs.c</span>
            <button 
              onClick={() => handleCopy(stringLibraryCode, 'strfunc')}
              className="flex items-center space-x-1 text-xs font-bold text-green-400 hover:text-white transition-colors"
            >
              {copied === 'strfunc' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'strfunc' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
            <code>{stringLibraryCode}</code>
          </pre>
        </div>
      </section>
    </div>
  );
};

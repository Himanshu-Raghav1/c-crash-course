import React, { useState } from 'react';
import { ArrowLeft, Copy, CheckCircle2, Box, Database, Trash2, RotateCcw } from 'lucide-react';
import { HeapVisualizer } from './HeapVisualizer';

interface UnitProps {
  onBack: () => void;
}

export const Unit10: React.FC<UnitProps> = ({ onBack }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const mallocCode = `// malloc: Allocate n bytes of uninitialized memory
#include <stdlib.h>
#include <stdio.h>

int main() {
    int *ptr;
    int n = 5;

    // Allocate memory for 5 integers
    ptr = (int*)malloc(n * sizeof(int));

    if (ptr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    // Use memory...
    for(int i = 0; i < n; i++) ptr[i] = i + 1;

    // IMPORTANT: Always free when done!
    free(ptr);
    return 0;
}`;

  const callocCode = `// calloc: Allocate n blocks of size s and INITIALIZE to 0
#include <stdlib.h>
#include <stdio.h>

int main() {
    int *ptr;
    int n = 5;

    // Allocate and zero-initialize memory
    ptr = (int*)calloc(n, sizeof(int));

    if (ptr == NULL) return 1;

    // ptr[0]...ptr[4] are all guaranteed to be 0
    printf("First element: %d\\n", ptr[0]);

    free(ptr);
    return 0;
}`;

  const reallocCode = `// realloc: Resize previously allocated memory
#include <stdlib.h>
#include <stdio.h>

int main() {
    int *ptr = (int*)malloc(2 * sizeof(int));
    ptr[0] = 10; ptr[1] = 20;

    // Expand to hold 4 integers
    int *new_ptr = (int*)realloc(ptr, 4 * sizeof(int));

    if (new_ptr != NULL) {
        ptr = new_ptr; // Success
        ptr[2] = 30; ptr[3] = 40;
    }

    free(ptr);
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

      <h2 className="text-4xl font-bold text-white mb-2">Unit 10: Dynamic Memory Allocation</h2>
      <p className="text-gray-400 mb-8 pb-4 border-b border-dark-700">Master the Heap. Learn how to request memory from the OS at runtime.</p>

      {/* Intro Section */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-cyan mb-4 flex items-center">
          <Database className="mr-3" size={20} /> Static vs Dynamic
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-dark-900 p-5 rounded-lg border border-dark-700">
            <h4 className="text-white font-bold mb-2 flex items-center">
              <span className="w-2 h-2 rounded-full bg-gray-500 mr-2"></span> Static (Stack)
            </h4>
            <p className="text-sm text-gray-400">Memory is allocated at compile time. Size must be known beforehand. Automatic cleanup when function ends.</p>
            <code className="block mt-3 text-xs text-neon-cyan">int arr[10]; // Fixed size</code>
          </div>
          <div className="bg-dark-900 p-5 rounded-lg border border-dark-700">
            <h4 className="text-neon-cyan font-bold mb-2 flex items-center">
              <span className="w-2 h-2 rounded-full bg-neon-cyan mr-2 animate-pulse"></span> Dynamic (Heap)
            </h4>
            <p className="text-sm text-gray-400">Memory is allocated during execution. Size can be determined by user input. Manual cleanup required!</p>
            <code className="block mt-3 text-xs text-neon-cyan">ptr = malloc(n * sizeof(int));</code>
          </div>
        </div>
      </section>

      {/* Visualizer Section */}
      <section className="mb-12">
        <h3 className="text-xl font-bold text-neon-purple mb-4 flex items-center">
          <Box className="mr-3" size={20} /> Heap Visualization
        </h3>
        <p className="text-gray-300 mb-6">
          Interact with the memory pool below. Try to allocate different sized blocks and see how they occupy space. Don't forget to free them to avoid leaks!
        </p>
        <HeapVisualizer />
      </section>

      {/* Functions Grid */}
      <div className="grid grid-cols-1 gap-10">
        {/* malloc */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-neon-cyan flex items-center">
              <Box className="mr-3" size={20} /> 1. malloc()
            </h3>
            <button 
              onClick={() => handleCopy(mallocCode, 'malloc')}
              className="flex items-center space-x-1 text-xs font-bold text-neon-cyan hover:text-white transition-colors"
            >
              {copied === 'malloc' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'malloc' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden">
            <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
              <code>{mallocCode}</code>
            </pre>
          </div>
          <p className="mt-3 text-sm text-gray-400">Allocates <strong>uninitialized</strong> memory. Content will be garbage values.</p>
        </section>

        {/* calloc */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-neon-purple flex items-center">
              <div className="mr-3 bg-neon-purple/20 p-1 rounded"><RotateCcw size={16} /></div> 2. calloc()
            </h3>
            <button 
              onClick={() => handleCopy(callocCode, 'calloc')}
              className="flex items-center space-x-1 text-xs font-bold text-neon-purple hover:text-white transition-colors"
            >
              {copied === 'calloc' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'calloc' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden">
            <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
              <code>{callocCode}</code>
            </pre>
          </div>
          <p className="mt-3 text-sm text-gray-400">Allocates memory and <strong>initializes everything to zero</strong>. Slightly slower than malloc.</p>
        </section>

        {/* realloc */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-neon-orange flex items-center">
              <div className="mr-3 bg-neon-orange/20 p-1 rounded"><Box size={16} /></div> 3. realloc()
            </h3>
            <button 
              onClick={() => handleCopy(reallocCode, 'realloc')}
              className="flex items-center space-x-1 text-xs font-bold text-neon-orange hover:text-white transition-colors"
            >
              {copied === 'realloc' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'realloc' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden">
            <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
              <code>{reallocCode}</code>
            </pre>
          </div>
          <p className="mt-3 text-sm text-gray-400">Resizes an existing memory block. May move the block to a new location if needed.</p>
        </section>

        {/* free & leaks */}
        <section className="bg-dark-900/50 p-6 rounded-xl border border-neon-orange/20">
          <h3 className="text-xl font-bold text-neon-orange mb-4 flex items-center">
            <Trash2 className="mr-3" size={20} /> The Golden Rule: free()
          </h3>
          <p className="text-gray-300 mb-4">
            Every <code>malloc</code>, <code>calloc</code>, or <code>realloc</code> MUST be paired with a <code>free</code>. If you lose the pointer before freeing it, you have a <strong>Memory Leak</strong>!
          </p>
          <div className="bg-dark-950 p-4 rounded text-xs font-mono text-red-400 border border-red-900/30">
            // DANGER: Memory Leak<br/>
            void leak() &#123;<br/>
            &nbsp;&nbsp;int *p = malloc(100);<br/>
            &nbsp;&nbsp;return; // p is lost, but 100 bytes are still occupied!<br/>
            &#125;
          </div>
        </section>
      </div>
    </div>
  );
};

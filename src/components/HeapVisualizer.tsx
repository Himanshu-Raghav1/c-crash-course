import React, { useState } from 'react';
import { Database, PlusSquare, MinusSquare, ArrowUpRight } from 'lucide-react';

export const HeapVisualizer: React.FC = () => {
  // Heap representation: size 16. null = free, 'A' = alloc A, 'B' = alloc B
  const [heap, setHeap] = useState<(string | null)[]>(Array(16).fill(null));
  
  const handleMalloc = (id: string, size: number) => {
     let freeIndex = -1;
     let consecutive = 0;
     
     // Find contiguous free blocks
     for (let i = 0; i < heap.length; i++) {
        if (heap[i] === null) {
           if (consecutive === 0) freeIndex = i;
           consecutive++;
           if (consecutive === size) break;
        } else {
           consecutive = 0;
        }
     }
     
     if (consecutive === size) {
        const newHeap = [...heap];
        for (let i = freeIndex; i < freeIndex + size; i++) {
           newHeap[i] = id;
        }
        setHeap(newHeap);
     } else {
        alert("Out of Memory! No contiguous block found.");
     }
  };

  const handleFree = (id: string) => {
     const newHeap = heap.map(block => block === id ? null : block);
     setHeap(newHeap);
  };
  
  const isAllocated = (id: string) => heap.includes(id);

  return (
    <div className="bg-dark-900 rounded-lg border border-dark-700 overflow-hidden text-gray-300 font-sans">
      <div className="p-4 border-b border-dark-700 bg-dark-800 flex items-center">
        <Database size={18} className="mr-2 text-neon-cyan" />
        <h4 className="font-bold text-white">Heap Memory Simulator</h4>
      </div>

      <div className="p-6">
         <p className="text-sm text-gray-400 mb-6 font-mono">
           The <strong>Heap</strong> is a large pool of memory used for dynamic allocation. Use <code>malloc()</code> to ask the OS for a contiguous block of bytes, and <code>free()</code> to give it back. Warning: Forgetting to <code>free()</code> causes memory leaks!
         </p>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Visualizer */}
            <div className="flex flex-col items-center">
               <span className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-2 border-b border-dark-700 w-full text-center pb-2">Heap Blocks</span>
               <div className="grid grid-cols-4 gap-2 w-full mt-2">
                 {heap.map((block, idx) => (
                    <div 
                      key={idx} 
                      className={`h-12 border rounded flex items-center justify-center font-mono font-bold transition-all ${
                        block === 'A' ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan shadow-[0_0_8px_rgba(0,255,255,0.2)]' :
                        block === 'B' ? 'bg-neon-purple/20 border-neon-purple text-neon-purple shadow-[0_0_8px_rgba(188,0,255,0.2)]' :
                        block === 'C' ? 'bg-neon-orange/20 border-neon-orange text-neon-orange shadow-[0_0_8px_rgba(255,107,0,0.2)]' :
                        'bg-dark-800 border-dark-700 text-dark-500' // Free
                      }`}
                    >
                      {block ? `${block}` : idx}
                    </div>
                 ))}
               </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col space-y-4 justify-center">
               
               {/* Block A */}
               <div className="border border-dark-700 bg-dark-800 p-4 rounded flex flex-col">
                  <span className="text-neon-cyan font-mono text-sm mb-2">int *ptrA;</span>
                  <div className="flex space-x-2">
                     <button 
                       disabled={isAllocated('A')}
                       onClick={() => handleMalloc('A', 3)}
                       className="flex-1 bg-neon-cyan/10 border border-neon-cyan text-neon-cyan text-xs py-1 rounded hover:bg-neon-cyan hover:text-dark-900 transition-colors disabled:opacity-30 flex items-center justify-center"
                     ><PlusSquare size={14} className="mr-1"/> malloc(3)</button>
                     <button 
                       disabled={!isAllocated('A')}
                       onClick={() => handleFree('A')}
                       className="flex-1 border border-dark-600 text-gray-400 text-xs py-1 rounded hover:bg-dark-700 hover:text-white transition-colors disabled:opacity-30 flex items-center justify-center"
                     ><MinusSquare size={14} className="mr-1"/> free()</button>
                  </div>
               </div>

               {/* Block B */}
               <div className="border border-dark-700 bg-dark-800 p-4 rounded flex flex-col">
                  <span className="text-neon-purple font-mono text-sm mb-2">int *ptrB;</span>
                  <div className="flex space-x-2">
                     <button 
                       disabled={isAllocated('B')}
                       onClick={() => handleMalloc('B', 4)}
                       className="flex-1 bg-neon-purple/10 border border-neon-purple text-neon-purple text-xs py-1 rounded hover:bg-neon-purple hover:text-dark-900 transition-colors disabled:opacity-30 flex items-center justify-center"
                     ><PlusSquare size={14} className="mr-1"/> malloc(4)</button>
                     <button 
                       disabled={!isAllocated('B')}
                       onClick={() => handleFree('B')}
                       className="flex-1 border border-dark-600 text-gray-400 text-xs py-1 rounded hover:bg-dark-700 hover:text-white transition-colors disabled:opacity-30 flex items-center justify-center"
                     ><MinusSquare size={14} className="mr-1"/> free()</button>
                  </div>
               </div>

               {/* Block C */}
               <div className="border border-dark-700 bg-dark-800 p-4 rounded flex flex-col">
                  <span className="text-neon-orange font-mono text-sm mb-2">int *ptrC;</span>
                  <div className="flex space-x-2">
                     <button 
                       disabled={isAllocated('C')}
                       onClick={() => handleMalloc('C', 5)}
                       className="flex-1 bg-neon-orange/10 border border-neon-orange text-neon-orange text-xs py-1 rounded hover:bg-neon-orange hover:text-dark-900 transition-colors disabled:opacity-30 flex items-center justify-center"
                     ><PlusSquare size={14} className="mr-1"/> malloc(5)</button>
                     <button 
                       disabled={!isAllocated('C')}
                       onClick={() => handleFree('C')}
                       className="flex-1 border border-dark-600 text-gray-400 text-xs py-1 rounded hover:bg-dark-700 hover:text-white transition-colors disabled:opacity-30 flex items-center justify-center"
                     ><MinusSquare size={14} className="mr-1"/> free()</button>
                  </div>
               </div>

            </div>
         </div>
         
         {/* Warning Tip */}
         <div className="bg-dark-950 p-4 rounded border-l-4 border-l-neon-orange text-sm text-gray-400">
           <strong>Memory Fragmentation:</strong> Try allocating A, B, and C. Then free B. Notice how there is a gap? If you try to allocate a large array now, it might fail even if the <em>total</em> free space is enough, because it isn't <em>contiguous</em>!
         </div>
      </div>
    </div>
  );
};

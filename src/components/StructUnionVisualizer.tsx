import React, { useState } from 'react';
import { Layers, Database, ArrowRight } from 'lucide-react';

type Mode = 'struct' | 'union';

export const StructUnionVisualizer: React.FC = () => {
  const [mode, setMode] = useState<Mode>('struct');

  // Assume char uses 1 block, int uses 4 blocks, float uses 4 blocks.
  const fields = [
    { type: 'char', name: 'id', size: 1, color: 'bg-neon-orange', text: 'text-dark-900' },
    { type: 'int', name: 'age', size: 4, color: 'bg-neon-purple', text: 'text-white' },
    { type: 'float', name: 'salary', size: 4, color: 'bg-neon-cyan', text: 'text-dark-900' }
  ];

  const totalStructSize = fields.reduce((acc, curr) => acc + curr.size, 0); // 9 bytes (ignoring typical padding for simplicity)
  const maxUnionSize = Math.max(...fields.map(f => f.size)); // 4 bytes

  return (
    <div className="bg-dark-900 rounded-lg border border-dark-700 overflow-hidden text-gray-300 font-sans">
      <div className="p-4 border-b border-dark-700 bg-dark-800 flex items-center justify-between">
        <h4 className="font-bold text-white flex items-center">
          <Database size={18} className="mr-2 text-neon-purple" />
          Structures vs Unions Memory Layout
        </h4>
        <div className="flex space-x-2 bg-dark-900 rounded p-1 border border-dark-700">
           <button
             onClick={() => setMode('struct')}
             className={`px-3 py-1 rounded text-xs px-4 font-bold transition-all ${
               mode === 'struct' ? 'bg-neon-purple text-white' : 'text-gray-400 hover:text-white'
             }`}
           >
             struct
           </button>
           <button
             onClick={() => setMode('union')}
             className={`px-3 py-1 rounded text-xs px-4 font-bold transition-all ${
               mode === 'union' ? 'bg-neon-cyan text-dark-900' : 'text-gray-400 hover:text-white'
             }`}
           >
             union
           </button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Code Definition */}
        <div className="bg-dark-950 p-4 border border-dark-700 rounded flex flex-col justify-center">
          <pre className="font-mono text-sm leading-loose">
            <span className={mode === 'struct' ? 'text-neon-purple' : 'text-neon-cyan'}>{mode}</span> Employee {'{\n'}
            <div className="pl-4">
              {fields.map((f, i) => (
                <div key={i} className="flex space-x-2 items-center mb-1">
                   <div className={`w-3 h-3 rounded-full ${f.color} shadow-[0_0_8px_rgba(255,255,255,0.2)]`}></div>
                   <span><span className="text-gray-500">{f.type}</span> {f.name}; <span className="text-dark-500">// {f.size} byte{f.size > 1 ? 's' : ''}</span></span>
                </div>
              ))}
            </div>
            {'}'};
          </pre>
          <div className="mt-6 pt-4 border-t border-dark-700 flex justify-between font-bold">
            <span className="text-gray-400">Total Memory Allocated:</span>
            <span className={mode === 'struct' ? 'text-neon-purple text-xl' : 'text-neon-cyan text-xl'}>
              {mode === 'struct' ? totalStructSize : maxUnionSize} bytes
            </span>
          </div>
        </div>

        {/* Visual Memory Blocks */}
        <div className="flex flex-col items-center justify-center">
           <div className="text-sm text-gray-500 uppercase font-mono tracking-widest mb-6 border-b border-dark-700 pb-2">RAM Visualization</div>
           
           {mode === 'struct' ? (
             // Struct blocks lie back-to-back
             <div className="w-full flex space-x-[2px] items-end justify-center">
               {fields.map((f, i) => (
                  <div key={i} className="flex space-x-[2px]">
                    {Array.from({ length: f.size }).map((_, j) => (
                       <div key={j} className={`w-8 h-16 ${f.color} opacity-80 border border-dark-900 flex items-center justify-center`}>
                          {j === 0 && <span className={`${f.text} text-[10px] font-bold origin-left -rotate-90 whitespace-nowrap opacity-50`}>{f.name}</span>}
                       </div>
                    ))}
                  </div>
               ))}
             </div>
           ) : (
             // Union blocks overlap in same space
             <div className="relative w-full flex justify-center h-32 items-end">
               <div className="absolute top-0 text-center w-full text-xs text-neon-orange bg-dark-900 rounded py-1 px-2 border border-dark-700">
                  ⚠️ All variables share the EXACT same memory blocks! Changing one corrupts the others.
               </div>
               <div className="flex space-x-[2px] mt-10">
                 {Array.from({ length: maxUnionSize }).map((_, i) => (
                    <div key={i} className="w-16 h-20 bg-dark-700 relative overflow-hidden border border-dark-900">
                        {/* Render stripes to simulate overlapping colors */}
                        <div className="absolute inset-0 flex flex-col">
                           <div className={`h-1/3 w-full bg-neon-orange ${i < 1 ? 'opacity-80' : 'opacity-0'}`}></div>
                           <div className={`h-1/3 w-full bg-neon-purple opacity-80`}></div>
                           <div className={`h-1/3 w-full bg-neon-cyan opacity-80`}></div>
                        </div>
                    </div>
                 ))}
               </div>
             </div>
           )}

           <div className="mt-8 text-sm text-gray-400 text-center px-4">
             {mode === 'struct' ? (
                <>Structs allocate separate memory for <strong>each</strong> member. Adding them sequentially uses more memory, but allows you to store all variables safely at once.</>
             ) : (
                <>Unions allocate memory only for the <strong>largest</strong> member. Memory is highly optimized, but you can only safely store and access <strong>one variable at a time</strong>.</>
             )}
           </div>
        </div>

      </div>
    </div>
  );
};

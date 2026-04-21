import React, { useState } from 'react';
import { Cpu, ArrowRight } from 'lucide-react';

export const MemoryVisualizer = () => {
  // Simulating variables in memory
  const [x, setX] = useState(10);
  const [y, setY] = useState(20);
  
  // Simulating a pointer. It holds the "address" (string name) of either x or y
  const [pointerTarget, setPointerTarget] = useState<'x' | 'y'>('x');

  // Simulated memory addresses
  const addressX = "0x1000";
  const addressY = "0x1004";
  const addressP = "0x2008";

  // Actions
  const handleIncrementX = () => setX(prev => prev + 1);
  const handleIncrementY = () => setY(prev => prev + 1);
  
  // This is the magic of *p (dereferencing)
  const handleDereferenceIncrement = () => {
    if (pointerTarget === 'x') setX(prev => prev + 1);
    if (pointerTarget === 'y') setY(prev => prev + 1);
  };

  return (
    <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 font-mono mt-6">
      <h3 className="text-xl font-bold text-neon-purple mb-4 flex items-center">
        <Cpu className="mr-3" size={20} /> Interactive RAM Visualizer
      </h3>
      <p className="text-gray-400 text-sm mb-6 font-sans">
        Click the commands to execute C code. Watch how the pointer <span className="text-neon-cyan">p</span> interacts directly with the memory addresses of <span className="text-green-400">x</span> and <span className="text-orange-400">y</span>.
      </p>

      {/* The Execution Controls */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button onClick={handleIncrementX} className="bg-dark-900 border border-green-500/50 text-green-400 px-4 py-2 rounded hover:bg-green-500/20 transition">
          x++
        </button>
        <button onClick={handleIncrementY} className="bg-dark-900 border border-orange-500/50 text-orange-400 px-4 py-2 rounded hover:bg-orange-500/20 transition">
          y++
        </button>
        <button onClick={() => setPointerTarget('x')} className="bg-dark-900 border border-gray-600 text-gray-300 px-4 py-2 rounded hover:bg-gray-700 transition">
          p = &x
        </button>
        <button onClick={() => setPointerTarget('y')} className="bg-dark-900 border border-gray-600 text-gray-300 px-4 py-2 rounded hover:bg-gray-700 transition">
          p = &y
        </button>
        <button onClick={handleDereferenceIncrement} className="bg-neon-purple/20 border border-neon-purple text-neon-purple font-bold px-4 py-2 rounded hover:bg-neon-purple/40 transition shadow-[0_0_10px_rgba(176,38,255,0.2)]">
          (*p)++
        </button>
      </div>

      {/* The Memory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Variable X */}
        <div className={`p-4 rounded border ${pointerTarget === 'x' ? 'border-neon-purple bg-neon-purple/5' : 'border-dark-700 bg-dark-900'}`}>
          <div className="text-xs text-gray-500 mb-1">Address: {addressX}</div>
          <div className="text-lg text-green-400 font-bold mb-2">int x;</div>
          <div className="text-3xl text-white">{x}</div>
        </div>

        {/* Variable Y */}
        <div className={`p-4 rounded border ${pointerTarget === 'y' ? 'border-neon-purple bg-neon-purple/5' : 'border-dark-700 bg-dark-900'}`}>
          <div className="text-xs text-gray-500 mb-1">Address: {addressY}</div>
          <div className="text-lg text-orange-400 font-bold mb-2">int y;</div>
          <div className="text-3xl text-white">{y}</div>
        </div>

        {/* Pointer P */}
        <div className="p-4 rounded border border-neon-cyan bg-dark-900 relative">
          <div className="text-xs text-gray-500 mb-1">Address: {addressP}</div>
          <div className="text-lg text-neon-cyan font-bold mb-2">int *p;</div>
          <div className="text-xl text-gray-300">
            {pointerTarget === 'x' ? addressX : addressY}
          </div>
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 text-neon-purple">
            <ArrowRight size={24} className="animate-pulse" />
          </div>
        </div>

      </div>
    </div>
  );
};
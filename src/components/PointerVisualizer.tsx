import React, { useState } from 'react';
import { Target, ArrowRight, MousePointerClick } from 'lucide-react';

export const PointerVisualizer: React.FC = () => {
  const [varValue, setVarValue] = useState<number>(10);
  const [ptrAssigned, setPtrAssigned] = useState<boolean>(false);

  const varAddress = '0xAFF0';
  const ptrAddress = '0xBEEF';

  return (
    <div className="bg-dark-900 rounded-lg border border-dark-700 overflow-hidden text-gray-300 font-sans">
      <div className="p-4 border-b border-dark-700 bg-dark-800 flex items-center">
        <Target size={18} className="mr-2 text-neon-orange" />
        <h4 className="font-bold text-white">Pointer & Address Visualizer</h4>
      </div>

      <div className="p-6">
        <p className="text-sm text-gray-400 mb-8 max-w-2xl">
          Click the actions below to see how a pointer connects to a variable in memory. Notice the difference between changing the completely separate pointer's <em>value</em> vs dereferencing it (using <code>*</code>) to change the <em>target's</em> value.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-16 mb-12">
          
          {/* Regular Variable */}
          <div className="flex flex-col items-center">
             <div className="text-sm font-mono text-neon-cyan mb-2">int val = {varValue};</div>
             <div className={`w-32 h-32 rounded border-2 shadow-lg flex flex-col items-center justify-center transition-all ${ptrAssigned ? 'bg-dark-800 border-neon-cyan/50 shadow-[0_0_15px_rgba(0,255,255,0.2)]' : 'bg-dark-800 border-dark-600'}`}>
                <span className="text-4xl text-white font-bold">{varValue}</span>
             </div>
             <div className="mt-3 flex items-center bg-dark-950 px-3 py-1 rounded border border-dark-700">
               <span className="text-gray-500 font-mono text-xs mr-2 whitespace-nowrap">&val (address):</span>
               <span className="text-neon-cyan font-mono text-sm">{varAddress}</span>
             </div>
          </div>

          {/* Connection */}
          <div className="h-16 w-1 border-l-2 border-dashed md:h-1 md:w-16 md:border-t-2 md:border-l-0 border-dark-600 relative">
             {ptrAssigned && (
               <div className="absolute inset-0 border-neon-orange/50 shadow-[0_0_8px_rgba(255,107,0,0.5)] md:border-t-2 md:border-l-0 border-l-2 border-dashed animate-pulse">
                  <ArrowRight size={24} className="text-neon-orange absolute -top-3 -right-3 hidden md:block" />
               </div>
             )}
          </div>

          {/* Pointer Variable */}
          <div className="flex flex-col items-center">
             <div className="text-sm font-mono text-neon-orange mb-2">int *ptr;</div>
             <div className={`w-32 h-32 rounded border-2 shadow-lg flex flex-col items-center justify-center transition-all ${ptrAssigned ? 'bg-dark-800 border-neon-orange/50 shadow-[0_0_15px_rgba(255,107,0,0.2)]' : 'bg-dark-800 border-dark-600'}`}>
                <span className="text-lg text-white font-mono break-all px-2 text-center">
                  {ptrAssigned ? varAddress : '??? (Garbage)'}
                </span>
             </div>
             <div className="mt-3 flex items-center bg-dark-950 px-3 py-1 rounded border border-dark-700">
               <span className="text-gray-500 font-mono text-xs mr-2 whitespace-nowrap">&ptr (address):</span>
               <span className="text-neon-orange font-mono text-sm">{ptrAddress}</span>
             </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
           {/* Step 1 */}
           <button 
             onClick={() => setPtrAssigned(true)}
             disabled={ptrAssigned}
             className={`flex items-center px-4 py-2 rounded font-mono text-sm transition-all focus:outline-none ${ptrAssigned ? 'bg-dark-800 border border-dark-600 text-gray-500 cursor-not-allowed' : 'bg-neon-orange/20 border border-neon-orange text-white hover:bg-neon-orange hover:text-dark-900 shadow-[0_0_10px_rgba(255,107,0,0.3)]'}`}
           >
             <MousePointerClick size={16} className="mr-2" /> ptr = &val;
           </button>

           {/* Step 2 */}
           <button 
             onClick={() => setVarValue(99)}
             disabled={!ptrAssigned || varValue === 99}
             className={`flex items-center px-4 py-2 rounded font-mono text-sm transition-all focus:outline-none ${!ptrAssigned || varValue === 99 ? 'bg-dark-800 border border-dark-600 text-gray-500 cursor-not-allowed' : 'bg-neon-cyan/20 border border-neon-cyan text-white hover:bg-neon-cyan hover:text-dark-900 shadow-[0_0_10px_rgba(0,255,255,0.3)]'}`}
           >
             <MousePointerClick size={16} className="mr-2" /> *ptr = 99;
           </button>

           {/* Reset */}
           <button 
             onClick={() => { setPtrAssigned(false); setVarValue(10); }}
             className="flex items-center px-4 py-2 rounded font-mono text-sm transition-all focus:outline-none bg-dark-800 border border-dark-600 text-gray-400 hover:text-white hover:border-gray-400 ml-4"
           >
             Reset Simulation
           </button>
        </div>

        {/* Explain Box */}
        <div className="mt-8 bg-dark-950 p-4 rounded border-l-4 border-l-neon-purple text-sm text-gray-400 leading-relaxed font-sans">
          <strong>The "Ah-ha" Moment:</strong> We are changing <code>val</code> to 99, but we never explicitly touch the <code>val</code> variable. We use <code>*ptr = 99;</code> which means: "Go to the address stored inside <code>ptr</code>, and drop the number 99 in there."
        </div>

      </div>
    </div>
  );
};

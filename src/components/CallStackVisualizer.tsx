import React, { useState } from 'react';
import { Layers, ArrowDown, ArrowUp, RefreshCcw } from 'lucide-react';

type StackFrame = {
  id: string;
  func: string;
  args: string;
  status: 'active' | 'waiting' | 'returning' | 'returned';
  returnValue?: number;
};

export const CallStackVisualizer: React.FC = () => {
  const [step, setStep] = useState(0);
  
  // Step definitions for factorial(3)
  const steps: { frames: StackFrame[], desc: string }[] = [
    {
      frames: [
        { id: 'main', func: 'main()', args: '', status: 'active' }
      ],
      desc: "Execution starts in main(). We are about to call factorial(3)."
    },
    {
      frames: [
        { id: 'fact3', func: 'factorial', args: 'n = 3', status: 'active' },
        { id: 'main', func: 'main()', args: '', status: 'waiting' }
      ],
      desc: "main() calls factorial(3). It pushes a new frame onto the stack. Since n (3) > 1, it calls factorial(2)."
    },
    {
      frames: [
        { id: 'fact2', func: 'factorial', args: 'n = 2', status: 'active' },
        { id: 'fact3', func: 'factorial', args: 'n = 3', status: 'waiting' },
        { id: 'main', func: 'main()', args: '', status: 'waiting' }
      ],
      desc: "factorial(2) is pushed. It runs until it has to return 2 * factorial(1)."
    },
    {
      frames: [
        { id: 'fact1', func: 'factorial', args: 'n = 1', status: 'active' },
        { id: 'fact2', func: 'factorial', args: 'n = 2', status: 'waiting' },
        { id: 'fact3', func: 'factorial', args: 'n = 3', status: 'waiting' },
        { id: 'main', func: 'main()', args: '', status: 'waiting' }
      ],
      desc: "factorial(1) is pushed. BASE CASE HIT! n is 1, so it returns 1 without making another call."
    },
    {
      frames: [
        { id: 'fact1', func: 'factorial', args: 'n = 1', status: 'returning', returnValue: 1 },
        { id: 'fact2', func: 'factorial', args: 'n = 2', status: 'waiting' },
        { id: 'fact3', func: 'factorial', args: 'n = 3', status: 'waiting' },
        { id: 'main', func: 'main()', args: '', status: 'waiting' }
      ],
      desc: "factorial(1) prepares to POP off the stack entirely and hand the value '1' back down to whoever called it."
    },
    {
      frames: [
        { id: 'fact2', func: 'factorial', args: 'n = 2', status: 'returning', returnValue: 2 },
        { id: 'fact3', func: 'factorial', args: 'n = 3', status: 'waiting' },
        { id: 'main', func: 'main()', args: '', status: 'waiting' }
      ],
      desc: "factorial(2) receives the 1. Computes 2 * 1 = 2. It now POPs and returns 2."
    },
    {
      frames: [
        { id: 'fact3', func: 'factorial', args: 'n = 3', status: 'returning', returnValue: 6 },
        { id: 'main', func: 'main()', args: '', status: 'waiting' }
      ],
      desc: "factorial(3) receives the 2. Computes 3 * 2 = 6. It now POPs and returns 6."
    },
    {
      frames: [
        { id: 'main', func: 'main()', args: 'result = 6', status: 'active' }
      ],
      desc: "main() receives the final answer (6) and resumes execution. The call stack is back to its original state."
    }
  ];

  const currentStatus = steps[step];

  return (
    <div className="bg-dark-900 rounded-lg border border-dark-700 overflow-hidden text-gray-300 font-sans">
      <div className="p-4 border-b border-dark-700 bg-dark-800 flex items-center justify-between">
        <h4 className="font-bold text-white flex items-center">
          <Layers size={18} className="mr-2 text-neon-purple" />
          Call Stack & Recursion Visualizer
        </h4>
        <div className="text-xs text-gray-400 font-mono bg-dark-900 px-3 py-1 rounded">
          int factorial(int n)
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Visual Stack Representation */}
        <div className="flex flex-col items-center justify-end h-72 w-full bg-dark-950 p-4 border border-dark-700 rounded relative overflow-hidden">
          {/* Top to Bottom mapping to simulate physical stack building UPWARDS */}
          {currentStatus.frames.map((frame, idx) => {
             const isTop = idx === 0;
             let bgColor = 'bg-dark-800 border-dark-700';
             let txtColor = 'text-gray-400';
             
             if (frame.status === 'active') {
                bgColor = 'bg-neon-purple/20 border-neon-purple shadow-[0_0_10px_rgba(188,0,255,0.2)]';
                txtColor = 'text-white';
             } else if (frame.status === 'returning') {
                bgColor = 'bg-neon-orange/20 border-neon-orange shadow-[0_0_10px_rgba(255,107,0,0.2)]';
                txtColor = 'text-neon-orange font-bold';
             }

             return (
               <div 
                 key={frame.id}
                 className={`w-4/5 py-3 px-4 border rounded mb-2 transition-all flex justify-between items-center ${bgColor} ${txtColor}`}
                 style={{ zIndex: 10 - idx }}
               >
                 <span className="font-mono text-sm">{frame.func}({frame.args})</span>
                 {frame.returnValue !== undefined && (
                   <span className="text-xs flex items-center bg-dark-900 px-2 rounded">
                     <ArrowDown size={12} className="mr-1" /> return {frame.returnValue}
                   </span>
                 )}
               </div>
             )
          })}
          <div className="absolute top-2 right-2 flex space-x-2 text-dark-600">
             <ArrowUp size={24} className="opacity-50" />
             <span className="font-mono text-xs rotate-90 transform origin-left whitespace-nowrap mt-4">Stack Grows Up</span>
          </div>
        </div>

        {/* Info & Controls */}
        <div className="flex flex-col justify-center">
          <div className="bg-dark-800 p-4 rounded border border-dark-700 mb-6 h-32 flex items-center shadow-inner">
            <p className="text-gray-300 text-sm leading-relaxed">
              {currentStatus.desc}
            </p>
          </div>
          
          <div className="flex justify-between items-center mt-auto">
            <span className="text-xs text-gray-500 font-mono">Step {step + 1} of {steps.length}</span>
            <div className="space-x-3">
              <button 
                onClick={() => setStep(0)}
                className="p-2 rounded bg-dark-800 hover:bg-dark-700 text-gray-400 hover:text-white transition-colors"
                title="Restart"
              >
                <RefreshCcw size={18} />
              </button>
              <button
                onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
                disabled={step === steps.length - 1}
                className="px-6 py-2 bg-neon-purple text-dark-900 font-bold rounded hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase text-sm"
              >
                Next Step
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

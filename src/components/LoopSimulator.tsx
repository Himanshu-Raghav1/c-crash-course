import React, { useState } from 'react';
import { PlayCircle, SkipForward, RotateCcw, Activity } from 'lucide-react';

type LoopType = 'for' | 'while' | 'do-while';
type StepState = 'init' | 'condition' | 'body' | 'increment' | 'end';

export const LoopSimulator: React.FC = () => {
  const [loopType, setLoopType] = useState<LoopType>('for');
  const [i, setI] = useState<number | null>(null);
  const [step, setStep] = useState<StepState>('init');
  const [output, setOutput] = useState<number[]>([]);
  
  const reset = () => {
    setI(null);
    setStep('init');
    setOutput([]);
  };

  const handleModeSwitch = (mode: LoopType) => {
    setLoopType(mode);
    reset();
  };

  const stepForward = () => {
    if (step === 'end') return;

    if (loopType === 'for' || loopType === 'while') {
      if (step === 'init') {
        setI(0);
        setStep('condition');
      } else if (step === 'condition') {
        if (i !== null && i < 3) {
          setStep('body');
        } else {
          setStep('end');
        }
      } else if (step === 'body') {
        if (i !== null) setOutput([...output, i]);
        setStep('increment');
      } else if (step === 'increment') {
        setI((prev) => (prev !== null ? prev + 1 : null));
        setStep('condition');
      }
    } else if (loopType === 'do-while') {
      if (step === 'init') {
        setI(0);
        setStep('body');
      } else if (step === 'body') {
        if (i !== null) setOutput([...output, i]);
        setStep('increment');
      } else if (step === 'increment') {
        setI((prev) => (prev !== null ? prev + 1 : null));
        setStep('condition');
      } else if (step === 'condition') {
        if (i !== null && i < 3) {
          setStep('body');
        } else {
          setStep('end');
        }
      }
    }
  };

  const renderCode = () => {
    if (loopType === 'for') {
      return (
        <pre className="font-mono text-sm space-y-1">
          <div className={step === 'init' ? 'bg-neon-purple/20 text-neon-purple border-l-2 border-neon-purple pl-2' : 'text-gray-400 pl-2'}>
            <span className="text-neon-cyan">for</span> (<span className={step === 'init' ? 'text-white' : ''}>int i = 0</span>; <span className={step === 'condition' ? 'bg-neon-orange/20 text-neon-orange rounded px-1' : ''}>i &lt; 3</span>; <span className={step === 'increment' ? 'bg-green-400/20 text-green-400 rounded px-1' : ''}>i++</span>) {'{'}
          </div>
          <div className={step === 'body' ? 'bg-neon-cyan/20 text-white border-l-2 border-neon-cyan pl-6' : 'text-gray-400 pl-6'}>
            printf(<span className="text-green-300">"%d\\n"</span>, i);
          </div>
          <div className="text-gray-400 pl-2">{'}'}</div>
        </pre>
      );
    } else if (loopType === 'while') {
      return (
        <pre className="font-mono text-sm space-y-1">
          <div className={step === 'init' ? 'bg-neon-purple/20 text-neon-purple border-l-2 border-neon-purple pl-2' : 'text-gray-400 pl-2'}>
            int i = 0;
          </div>
          <div className={step === 'condition' ? 'bg-neon-orange/20 text-neon-orange border-l-2 border-neon-orange pl-2' : 'text-gray-400 pl-2'}>
            <span className="text-neon-cyan">while</span> (i &lt; 3) {'{'}
          </div>
          <div className={step === 'body' ? 'bg-neon-cyan/20 text-white border-l-2 border-neon-cyan pl-6' : 'text-gray-400 pl-6'}>
            printf(<span className="text-green-300">"%d\\n"</span>, i);
          </div>
          <div className={step === 'increment' ? 'bg-green-400/20 text-green-400 border-l-2 border-green-400 pl-6' : 'text-gray-400 pl-6'}>
            i++;
          </div>
          <div className="text-gray-400 pl-2">{'}'}</div>
        </pre>
      );
    } else {
      return (
        <pre className="font-mono text-sm space-y-1">
          <div className={step === 'init' ? 'bg-neon-purple/20 text-neon-purple border-l-2 border-neon-purple pl-2' : 'text-gray-400 pl-2'}>
            int i = 0;
          </div>
          <div className="text-neon-cyan pl-2">do {'{'}</div>
          <div className={step === 'body' ? 'bg-neon-cyan/20 text-white border-l-2 border-neon-cyan pl-6' : 'text-gray-400 pl-6'}>
            printf(<span className="text-green-300">"%d\\n"</span>, i);
          </div>
          <div className={step === 'increment' ? 'bg-green-400/20 text-green-400 border-l-2 border-green-400 pl-6' : 'text-gray-400 pl-6'}>
            i++;
          </div>
          <div className={step === 'condition' ? 'bg-neon-orange/20 text-neon-orange border-l-2 border-neon-orange pl-2' : 'text-gray-400 pl-2'}>
            {'}'} <span className="text-neon-cyan">while</span> (i &lt; 3);
          </div>
        </pre>
      );
    }
  };

  return (
    <div className="bg-dark-900 rounded-lg border border-dark-700 overflow-hidden text-gray-300 font-mono">
      <div className="p-4 border-b border-dark-700 bg-dark-800 flex items-center justify-between">
        <h4 className="font-bold text-white flex items-center">
          <Activity size={18} className="mr-2 text-neon-cyan" />
          Interactive Loop Tracker
        </h4>
        <div className="flex space-x-2">
          {['for', 'while', 'do-while'].map((op) => (
            <button
              key={op}
              onClick={() => handleModeSwitch(op as LoopType)}
              className={`px-3 py-1 rounded text-xs transition-colors ${
                loopType === op 
                  ? 'bg-neon-purple text-white font-bold' 
                  : 'bg-dark-900 border border-dark-700 hover:border-neon-purple text-gray-400'
              }`}
            >
              {op} loop
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Code View */}
        <div className="bg-dark-950 p-4 rounded border border-dark-700 h-64 flex flex-col justify-center">
          {renderCode()}
        </div>

        {/* State View */}
        <div className="bg-dark-800 p-4 rounded border border-dark-700 h-64 flex flex-col relative">
          
          <div className="flex mb-4">
            <div className="bg-dark-900 border border-dark-700 px-4 py-2 rounded flex-1 text-center mr-2">
              <span className="block text-xs text-gray-500 uppercase">Variable i</span>
              <span className="text-2xl font-bold text-neon-orange">{i !== null ? i : '?'}</span>
            </div>
            <div className="bg-dark-900 border border-dark-700 px-4 py-2 rounded flex-1 text-center ml-2">
               <span className="block text-xs text-gray-500 uppercase">Current Step</span>
               <span className="text-sm font-bold text-white mt-2 block capitalize">
                 {step === 'end' ? 'Finished ✓' : step}
               </span>
            </div>
          </div>

          <div className="flex-1 bg-black rounded p-3 font-mono text-green-400 text-sm overflow-y-auto mb-16 border border-dark-700">
             <div className="text-gray-600 mb-1">Terminal Output:</div>
             {output.map((val, idx) => <div key={idx}>{val}</div>)}
             {step === 'end' && <div className="text-gray-500 mt-2">Program exited with code 0</div>}
          </div>

          {/* Controls */}
          <div className="absolute bottom-4 inset-x-4 flex space-x-2">
            <button 
              onClick={stepForward}
              disabled={step === 'end'}
              className="flex-1 bg-neon-cyan text-dark-900 font-bold py-2 rounded flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SkipForward size={16} className="mr-2" /> Step
            </button>
            <button 
              onClick={reset}
              className="bg-dark-700 text-white font-bold px-4 py-2 rounded flex items-center justify-center hover:bg-dark-600 transition-colors"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

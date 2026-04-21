import React, { useState } from 'react';
import { Cpu, Zap, ArrowRight } from 'lucide-react';

type Operation = 'AND' | 'OR' | 'XOR' | 'LSHIFT' | 'RSHIFT';

export const BitwiseVisualizer: React.FC = () => {
  const [valA, setValA] = useState<number>(12); // 00001100
  const [valB, setValB] = useState<number>(10); // 00001010
  const [operation, setOperation] = useState<Operation>('AND');
  const [shiftAmount, setShiftAmount] = useState<number>(1);

  // Convert number to 8-bit array
  const toBits = (num: number) => {
    return num.toString(2).padStart(8, '0').split('').map(Number);
  };

  const bitsA = toBits(valA);
  const bitsB = toBits(valB);

  const toggleBit = (isA: boolean, index: number) => {
    if (isA) {
      const newBits = [...bitsA];
      newBits[index] = newBits[index] === 1 ? 0 : 1;
      setValA(parseInt(newBits.join(''), 2));
    } else {
      const newBits = [...bitsB];
      newBits[index] = newBits[index] === 1 ? 0 : 1;
      setValB(parseInt(newBits.join(''), 2));
    }
  };

  const getResult = () => {
    switch (operation) {
      case 'AND': return valA & valB;
      case 'OR': return valA | valB;
      case 'XOR': return valA ^ valB;
      case 'LSHIFT': return (valA << shiftAmount) & 255; // restrict to 8 bits
      case 'RSHIFT': return valA >> shiftAmount;
      default: return 0;
    }
  };

  const resultVal = getResult();
  const resultBits = toBits(resultVal);

  const getSymbol = () => {
    switch (operation) {
      case 'AND': return '&';
      case 'OR': return '|';
      case 'XOR': return '^';
      case 'LSHIFT': return '<<';
      case 'RSHIFT': return '>>';
    }
  };

  return (
    <div className="bg-dark-900 rounded-lg border border-dark-700 overflow-hidden text-gray-300 font-mono">
      <div className="p-4 border-b border-dark-700 bg-dark-800 flex items-center justify-between">
        <h4 className="font-bold text-white flex items-center">
          <Cpu size={18} className="mr-2 text-neon-cyan" />
          Bitwise Simulator (8-bit)
        </h4>
        <div className="flex space-x-2">
          {['AND', 'OR', 'XOR', 'LSHIFT', 'RSHIFT'].map((op) => (
            <button
              key={op}
              onClick={() => setOperation(op as Operation)}
              className={`px-3 py-1 rounded text-xs transition-colors ${
                operation === op 
                  ? 'bg-neon-cyan text-dark-900 font-bold' 
                  : 'bg-dark-900 border border-dark-700 hover:border-neon-cyan'
              }`}
            >
              {op}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm text-gray-400 mb-6 font-sans">
          Click the bits in the rows below to toggle them between 1 and 0. Watch how the result changes based on the selected bitwise operation.
        </p>

        {/* Value A */}
        <div className="flex items-center mb-4">
          <div className="w-16 text-right mr-4 text-neon-orange">valA:</div>
          <div className="flex space-x-2">
            {bitsA.map((bit, i) => (
              <button
                key={`a-${i}`}
                onClick={() => toggleBit(true, i)}
                className={`w-10 h-10 flex items-center justify-center rounded border transition-colors ${
                  bit ? 'bg-neon-orange/20 border-neon-orange text-neon-orange shadow-[0_0_8px_rgba(255,107,0,0.4)]' : 'bg-dark-800 border-dark-700 text-gray-600'
                }`}
              >
                {bit}
              </button>
            ))}
          </div>
          <div className="ml-4 text-gray-500 w-12">= {valA}</div>
        </div>

        {/* Operation Symbol and Value B (or shift amount) */}
        <div className="flex items-center mb-6">
          <div className="w-16 text-right mr-4 text-white text-xl font-bold">
            {getSymbol()}
          </div>
          
          {(operation === 'LSHIFT' || operation === 'RSHIFT') ? (
            <div className="flex items-center">
              <input
                type="range"
                min="0"
                max="7"
                value={shiftAmount}
                onChange={(e) => setShiftAmount(parseInt(e.target.value))}
                className="w-48 appearance-auto mr-4 cursor-pointer"
              />
              <span className="bg-dark-800 px-3 py-1 rounded border border-dark-700">
                {shiftAmount} bits
              </span>
            </div>
          ) : (
            <div className="flex space-x-2">
              {bitsB.map((bit, i) => (
                <button
                  key={`b-${i}`}
                  onClick={() => toggleBit(false, i)}
                  className={`w-10 h-10 flex items-center justify-center rounded border transition-colors ${
                    bit ? 'bg-neon-purple/20 border-neon-purple text-neon-purple shadow-[0_0_8px_rgba(188,0,255,0.4)]' : 'bg-dark-800 border-dark-700 text-gray-600'
                  }`}
                >
                  {bit}
                </button>
              ))}
              <div className="ml-4 text-gray-500 w-12 flex items-center">= {valB}</div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-dark-700 w-full mb-6 relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 transform text-dark-500 bg-dark-900 px-2 font-black">RESULT</div>
        </div>

        {/* Result */}
        <div className="flex items-center">
          <div className="w-16 text-right mr-4 text-neon-cyan">result:</div>
          <div className="flex space-x-2">
            {resultBits.map((bit, i) => (
              <div
                key={`r-${i}`}
                className={`w-10 h-10 flex items-center justify-center rounded border ${
                  bit ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan shadow-[0_0_12px_rgba(0,255,255,0.4)]' : 'bg-dark-800 border-dark-700 text-gray-500'
                }`}
              >
                {bit}
              </div>
            ))}
          </div>
          <div className="ml-4 text-neon-cyan font-bold w-12 flex items-center">= {resultVal}</div>
        </div>

      </div>
    </div>
  );
};

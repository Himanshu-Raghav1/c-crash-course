import React, { useState } from 'react';
import { Calculator, Play, Forward } from 'lucide-react';

export const CalculatorSim: React.FC = () => {
  const [num1, setNum1] = useState<number>(10);
  const [num2, setNum2] = useState<number>(5);
  const [operator, setOperator] = useState<string>('+');
  const [result, setResult] = useState<number | string | null>(null);
  const [activeCase, setActiveCase] = useState<string | null>(null);

  const handleSimulate = () => {
    setActiveCase(operator);
    setTimeout(() => {
      switch (operator) {
        case '+': setResult(num1 + num2); break;
        case '-': setResult(num1 - num2); break;
        case '*': setResult(num1 * num2); break;
        case '/': setResult(num2 !== 0 ? num1 / num2 : 'Error: Div by 0'); break;
        default: setResult('Invalid'); setActiveCase('default');
      }
    }, 600); // Small delay to simulate evaluation and make UI reactive
  };

  const getCaseStyle = (caseOp: string) => {
      if (activeCase === caseOp) {
          return "bg-neon-purple/20 border-neon-purple text-white shadow-[0_0_15px_rgba(157,78,221,0.3)] scale-[1.02] transition-all duration-300 z-10 relative";
      }
      return "bg-dark-800 border-dark-600 text-gray-500 opacity-50";
  };

  return (
    <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 font-mono text-sm max-w-3xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <Calculator className="text-neon-cyan" />
        <h3 className="text-xl font-bold text-gray-200">Switch-Case Calculator Flow</h3>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1 bg-dark-900 border border-dark-700 p-4 rounded-lg">
          <label className="block text-gray-400 mb-4 font-bold">Input Variables:</label>
          <div className="space-y-3">
             <div className="flex justify-between items-center">
                 <span className="text-neon-cyan">float a =</span>
                 <input type="number" value={num1} onChange={(e) => setNum1(Number(e.target.value))} className="w-24 bg-dark-800 border border-dark-600 text-white px-2 py-1 rounded text-right" />
             </div>
             <div className="flex justify-between items-center">
                 <span className="text-neon-cyan">char op =</span>
                 <select value={operator} onChange={(e) => {setOperator(e.target.value); setResult(null); setActiveCase(null);}} className="w-24 bg-dark-800 border border-dark-600 text-white px-2 py-1 rounded text-center appearance-none">
                     <option value="+">+</option>
                     <option value="-">-</option>
                     <option value="*">*</option>
                     <option value="/">/</option>
                     <option value="%">%</option>
                 </select>
             </div>
             <div className="flex justify-between items-center">
                 <span className="text-neon-cyan">float b =</span>
                 <input type="number" value={num2} onChange={(e) => setNum2(Number(e.target.value))} className="w-24 bg-dark-800 border border-dark-600 text-white px-2 py-1 rounded text-right" />
             </div>
          </div>
          
          <button 
            onClick={handleSimulate}
            className="w-full mt-4 bg-neon-purple/20 text-neon-purple border border-neon-purple/50 px-4 py-2 rounded hover:bg-neon-purple hover:text-white transition-colors flex items-center justify-center space-x-2"
          >
            <Play size={16} /> <span>Execute Switch</span>
          </button>
        </div>

        <div className="flex-1 bg-dark-900 border border-dark-700 p-4 rounded-lg flex flex-col justify-center items-center">
          <span className="text-gray-400 mb-2">Console Output:</span>
          <div className="w-full h-24 bg-black border border-dark-600 rounded flex items-center justify-center p-4">
             {result !== null ? (
               <span className="text-2xl font-bold text-green-400">{result}</span>
             ) : (
               <span className="text-gray-600 animate-pulse">_</span>
             )}
          </div>
        </div>
      </div>

      <div className="bg-dark-900 border border-dark-700 p-6 rounded-lg relative">
         <div className="flex items-center text-neon-cyan mb-4 font-bold border-b border-dark-600 pb-2">
            <span>switch({`'${operator}'`})</span>
            <Forward size={16} className="ml-2 animate-bounce-x" />
         </div>
         
         <div className="space-y-3 relative z-10 pl-4 border-l-2 border-dark-600 ml-2">
            <div className={`p-3 rounded border flex justify-between items-center ${getCaseStyle('+')}`}>
               <span className="font-bold">case '+':</span>
               <span className="font-mono text-xs bg-black/30 px-2 py-1 rounded">print(a + b); break;</span>
            </div>
            
            <div className={`p-3 rounded border flex justify-between items-center ${getCaseStyle('-')}`}>
               <span className="font-bold">case '-':</span>
               <span className="font-mono text-xs bg-black/30 px-2 py-1 rounded">print(a - b); break;</span>
            </div>

            <div className={`p-3 rounded border flex justify-between items-center ${getCaseStyle('*')}`}>
               <span className="font-bold">case '*':</span>
               <span className="font-mono text-xs bg-black/30 px-2 py-1 rounded">print(a * b); break;</span>
            </div>

            <div className={`p-3 rounded border flex justify-between items-center ${getCaseStyle('/')}`}>
               <span className="font-bold">case '/':</span>
               <span className="font-mono text-xs bg-black/30 px-2 py-1 rounded">print(a / b); break;</span>
            </div>

            <div className={`p-3 rounded border flex justify-between items-center ${getCaseStyle('default')}`}>
               <span className="font-bold">default:</span>
               <span className="font-mono text-xs bg-black/30 px-2 py-1 rounded">print("Invalid");</span>
            </div>
         </div>
      </div>
    </div>
  );
};

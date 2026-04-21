import React, { useState, useEffect } from 'react';
import { ListOrdered, Play, RotateCcw } from 'lucide-react';

export const TableSim: React.FC = () => {
  const [num, setNum] = useState<number>(5);
  const [rows, setRows] = useState<{ i: number, res: number }[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentI, setCurrentI] = useState<number>(1);

  const handleStart = () => {
    setRows([]);
    setCurrentI(1);
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setRows([]);
    setCurrentI(1);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isRunning && currentI <= 10) { // Limit to 10 for better UI visualization instead of 20
      timer = setTimeout(() => {
        setRows(prev => [...prev, { i: currentI, res: num * currentI }]);
        setCurrentI(prev => prev + 1);
      }, 300);
    } else if (currentI > 10) {
      setIsRunning(false);
    }
    return () => clearTimeout(timer);
  }, [isRunning, currentI, num]);

  return (
    <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 font-mono text-sm max-w-3xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <ListOrdered className="text-neon-cyan" />
        <h3 className="text-xl font-bold text-gray-200">For Loop Iterator Visualization</h3>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1 bg-dark-900 border border-dark-700 p-4 rounded-lg">
          <label className="block text-gray-400 mb-2 font-bold">Base Number (n):</label>
          <div className="flex flex-col space-y-4">
            <input 
              type="number" 
              value={num}
              onChange={(e) => setNum(Number(e.target.value))}
              disabled={isRunning || rows.length > 0}
              className="bg-dark-800 border border-dark-600 text-neon-cyan px-3 py-2 rounded focus:outline-none focus:border-neon-cyan w-full disabled:opacity-50"
            />
            <div className="flex space-x-2">
                <button 
                  onClick={handleStart}
                  disabled={isRunning || rows.length > 0}
                  className="flex-1 bg-neon-purple/20 text-neon-purple border border-neon-purple/50 px-4 py-2 rounded hover:bg-neon-purple hover:text-white transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play size={16} /> <span>Generate</span>
                </button>
                <button 
                  onClick={handleReset}
                  className="bg-dark-800 text-gray-400 border border-dark-600 px-4 py-2 rounded hover:text-white transition-colors flex items-center justify-center space-x-2"
                >
                  <RotateCcw size={16} />
                </button>
            </div>
            
            <div className="mt-4 p-3 bg-dark-800 border border-dark-600 rounded">
                <div className="text-gray-400 text-xs mb-1">State:</div>
                <div className="flex justify-between font-bold">
                    <span className="text-neon-cyan">i = {currentI <= 10 ? currentI : 10}</span>
                    <span className="text-gray-300">Condition: {currentI <= 10 ? 'true' : 'false'}</span>
                </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-dark-900 border border-dark-700 p-4 rounded-lg flex flex-col items-center overflow-hidden h-64 relative">
          <span className="text-gray-400 mb-2 w-full text-left">Console Output:</span>
          
          <div className="w-full h-full overflow-y-auto space-y-2 pr-2 scrollbar-hide">
             {rows.map((row, index) => (
                <div 
                    key={index} 
                    className="flex justify-between items-center p-2 rounded bg-black/40 border border-dark-600 text-gray-300 animate-slide-up"
                    style={{ animationDelay: '0s' }}
                >
                   <span>{num} x {row.i}</span>
                   <span>=</span>
                   <span className="text-green-400 font-bold">{row.res}</span>
                </div>
             ))}
             {isRunning && (
                 <div className="flex justify-between items-center p-2 rounded bg-black/40 border border-neon-purple text-gray-300 opacity-50 animate-pulse">
                   <span>{num} x {currentI}</span>
                   <span>=</span>
                   <span className="text-neon-purple">?</span>
                </div>
             )}
          </div>
          {/* Fade out bottom edge */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none"></div>
        </div>
      </div>

      <div className="bg-dark-900 border border-dark-700 p-6 rounded-lg relative overflow-hidden">
         <div className="flex items-center text-neon-cyan mb-4 font-bold border-b border-dark-600 pb-2">
            <span>for (int i = 1; i &lt;= 10; i++)</span>
         </div>
         
         <div className="relative">
             <div className="flex items-center justify-between">
                <div className={`p-2 rounded text-center transition-colors duration-300 ${isRunning ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/50' : 'text-gray-500'}`}>
                    1. Init:<br/>int i = 1
                </div>
                <div className={`w-8 h-[2px] ${isRunning ? 'bg-neon-purple' : 'bg-dark-600'}`}></div>
                <div className={`p-2 rounded text-center transition-colors duration-300 ${isRunning ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/50' : 'text-gray-500'}`}>
                    2. Check:<br/>i &lt;= 10
                </div>
                <div className={`w-8 h-[2px] ${isRunning ? 'bg-neon-purple' : 'bg-dark-600'}`}></div>
                <div className={`p-2 rounded text-center transition-colors duration-300 ${isRunning ? 'bg-green-900/20 text-green-400 border border-green-500/50' : 'text-gray-500'}`}>
                    3. Body:<br/>print(n*i)
                </div>
                <div className={`w-8 h-[2px] ${isRunning ? 'bg-neon-purple' : 'bg-dark-600'}`}></div>
                <div className={`p-2 rounded text-center transition-colors duration-300 ${isRunning ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50' : 'text-gray-500'}`}>
                    4. Step:<br/>i++
                </div>
             </div>
             
             {/* Loopback Arrow */}
             {isRunning && (
                 <svg className="absolute w-full h-8 top-full mt-1 text-neon-cyan animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 400 20">
                    <path d="M 350 0 Q 350 20 200 20 Q 150 20 150 0" strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke"/>
                     <polygon points="146,5 150,0 154,5" fill="currentColor"/>
                 </svg>
             )}
         </div>
      </div>
    </div>
  );
};

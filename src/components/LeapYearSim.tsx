import React, { useState } from 'react';
import { Calendar, Play, CheckCircle2, XCircle } from 'lucide-react';

export const LeapYearSim: React.FC = () => {
  const [year, setYear] = useState<number>(2024);
  const [result, setResult] = useState<boolean | null>(null);

  const isLeap = (y: number) => {
    return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
  };

  const handleSimulate = () => {
    setResult(isLeap(year));
  };

  // Logic evaluations for visual feedback
  const divBy4 = year % 4 === 0;
  const divBy100 = year % 100 === 0;
  const notDivBy100 = !divBy100;
  const divBy400 = year % 400 === 0;
  const condition1 = divBy4 && notDivBy100;
  const condition2 = divBy400;

  return (
    <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 font-mono text-sm max-w-3xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <Calendar className="text-neon-cyan" />
        <h3 className="text-xl font-bold text-gray-200">Leap Year Logic Simulator</h3>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1 bg-dark-900 border border-dark-700 p-4 rounded-lg">
          <label className="block text-gray-400 mb-2 font-bold">Input Year:</label>
          <div className="flex space-x-2">
            <input 
              type="number" 
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="bg-dark-800 border border-dark-600 text-neon-cyan px-3 py-2 rounded focus:outline-none focus:border-neon-cyan flex-wrap w-32"
            />
            <button 
              onClick={handleSimulate}
              className="bg-neon-purple/20 text-neon-purple border border-neon-purple/50 px-4 py-2 rounded hover:bg-neon-purple hover:text-white transition-colors flex items-center space-x-2"
            >
              <Play size={16} /> <span>Evaluate</span>
            </button>
          </div>
        </div>

        <div className="flex-1 bg-dark-900 border border-dark-700 p-4 rounded-lg flex flex-col justify-center items-center">
          <span className="text-gray-400 mb-2">Final Output:</span>
          {result !== null ? (
            <div className={`text-xl font-bold flex items-center space-x-2 ${result ? 'text-green-400' : 'text-red-400'}`}>
              {result ? <CheckCircle2 /> : <XCircle />}
              <span>{result ? 'Leap Year' : 'Not a Leap Year'}</span>
            </div>
          ) : (
             <span className="text-gray-600">Run evaluation...</span>
          )}
        </div>
      </div>

      <div className="bg-dark-900 border border-dark-700 p-6 rounded-lg relative overflow-hidden">
         <h4 className="text-neon-cyan mb-4 font-bold border-b border-dark-600 pb-2">Logic Evaluation Flow</h4>
         
         <div className="space-y-4 relative z-10">
            {/* Divisible by 4 */}
            <div className="flex items-center justify-between p-3 rounded bg-dark-800 border border-dark-600">
               <span className="text-gray-300">year % 4 === 0</span>
               <div className="flex items-center space-x-2 text-gray-500">
                  <span>{year} % 4 = {year % 4}</span>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${divBy4 ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                    {divBy4 ? 'TRUE' : 'FALSE'}
                  </span>
               </div>
            </div>

            {/* Divisible by 100 */}
            <div className="flex items-center justify-between p-3 rounded bg-dark-800 border border-dark-600">
               <span className="text-gray-300">year % 100 !== 0</span>
               <div className="flex items-center space-x-2 text-gray-500">
                  <span>{year} % 100 = {year % 100}</span>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${notDivBy100 ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                     {notDivBy100 ? 'TRUE' : 'FALSE'}
                  </span>
               </div>
            </div>

            {/* Condition 1 */}
            <div className="flex items-center justify-between p-3 rounded bg-dark-800 border border-dark-600 ml-6 border-l-4 border-l-neon-purple">
                <span className="text-gray-400 italic">Condition 1: (Div By 4 AND Not Div By 100)</span>
                <span className={`px-2 py-1 rounded text-xs font-bold ${condition1 ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                    {condition1 ? 'TRUE' : 'FALSE'}
                </span>
            </div>

            <div className="text-center text-gray-500 font-bold text-xs py-1">OR</div>

            {/* Divisible by 400 */}
            <div className="flex items-center justify-between p-3 rounded bg-dark-800 border border-dark-600">
               <span className="text-gray-300">year % 400 === 0</span>
               <div className="flex items-center space-x-2 text-gray-500">
                  <span>{year} % 400 = {year % 400}</span>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${divBy400 ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                     {divBy400 ? 'TRUE' : 'FALSE'}
                  </span>
               </div>
            </div>
            
            {/* Condition 2 */}
             <div className="flex items-center justify-between p-3 rounded bg-dark-800 border border-dark-600 ml-6 border-l-4 border-l-neon-purple">
                <span className="text-gray-400 italic">Condition 2: (Div By 400)</span>
                <span className={`px-2 py-1 rounded text-xs font-bold ${condition2 ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                    {condition2 ? 'TRUE' : 'FALSE'}
                </span>
            </div>

            <div className={`mt-4 p-4 rounded text-center font-bold text-lg border ${result === true ? 'bg-green-900/20 border-green-500/50 text-green-400' : result === false ? 'bg-red-900/20 border-red-500/50 text-red-400' : 'bg-dark-800 border-dark-600 text-gray-600'}`}>
              {(condition1 || condition2) ? "CONDITION 1 OR CONDITION 2 = TRUE" : "CONDITION 1 OR CONDITION 2 = FALSE"}
            </div>
         </div>
      </div>
    </div>
  );
};

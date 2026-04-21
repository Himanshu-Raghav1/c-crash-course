import React, { useState } from 'react';
import { DollarSign, Percent, PlusCircle, MinusCircle, Equal } from 'lucide-react';

export const SalarySim: React.FC = () => {
  const [basicPay, setBasicPay] = useState<number>(10000);

  // Constants based on the problem statement
  const HRA_RATE = 0.10;
  const TA_RATE = 0.05;
  const PT_RATE = 0.02;

  // Derived values
  const hra = basicPay * HRA_RATE;
  const ta = basicPay * TA_RATE;
  const grossSalary = basicPay + hra + ta;
  const professionalTax = grossSalary * PT_RATE;
  const netSalary = grossSalary - professionalTax;

  return (
    <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 font-mono text-sm max-w-3xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <DollarSign className="text-neon-green" />
        <h3 className="text-xl font-bold text-gray-200">Net Salary Calculator Breakdown</h3>
      </div>

      <div className="bg-dark-900 border border-dark-700 p-6 rounded-lg mb-8">
         <label className="block text-gray-400 mb-4 font-bold text-center">INPUT: Basic Pay (BP)</label>
         <div className="flex justify-center items-center space-x-4">
             <span className="text-2xl text-neon-green">$</span>
             <input 
               type="number" 
               value={basicPay}
               onChange={(e) => setBasicPay(Number(e.target.value) || 0)}
               className="bg-dark-800 border-b-2 border-dark-600 focus:border-neon-green text-3xl font-bold text-white px-2 py-1 bg-transparent outline-none text-center w-48 transition-colors"
               min="0"
               step="1000"
             />
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Allowances (Additions) */}
          <div className="bg-dark-900 border border-dark-700 rounded-lg p-5 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan"></div>
             <h4 className="flex items-center text-neon-cyan font-bold mb-4 border-b border-dark-600 pb-2">
                 <PlusCircle size={16} className="mr-2" /> Allowances (Added)
             </h4>
             
             <div className="space-y-3">
                 <div className="flex justify-between items-center bg-dark-800 p-2 rounded">
                    <div>
                        <span className="text-gray-300">Basic Pay</span>
                    </div>
                    <span className="text-white">${basicPay.toFixed(2)}</span>
                 </div>
                 
                 <div className="flex justify-between items-center bg-dark-800 p-2 rounded">
                    <div>
                        <span className="text-gray-300">HRA</span>
                        <span className="text-xs ml-2 text-neon-cyan bg-neon-cyan/10 px-1 rounded flex-inline items-center w-fit"><Percent size={10} className="inline mr-1"/>10%</span>
                    </div>
                    <span className="text-neon-cyan">+ ${hra.toFixed(2)}</span>
                 </div>

                 <div className="flex justify-between items-center bg-dark-800 p-2 rounded">
                    <div>
                        <span className="text-gray-300">TA</span>
                        <span className="text-xs ml-2 text-neon-cyan bg-neon-cyan/10 px-1 rounded flex-inline items-center w-fit"><Percent size={10} className="inline mr-1"/>5%</span>
                    </div>
                    <span className="text-neon-cyan">+ ${ta.toFixed(2)}</span>
                 </div>
                 
                 <div className="h-[1px] bg-dark-600 my-2"></div>
                 
                 <div className="flex justify-between items-center bg-dark-800 p-2 rounded font-bold">
                    <span className="text-gray-400">Gross Salary (GS)</span>
                    <span className="text-white text-lg">${grossSalary.toFixed(2)}</span>
                 </div>
             </div>
          </div>

          {/* Deductions & Net */}
          <div className="flex flex-col gap-4">
              <div className="bg-dark-900 border border-dark-700 rounded-lg p-5 relative overflow-hidden flex-1">
                 <div className="absolute top-0 left-0 w-1 h-full bg-neon-orange"></div>
                 <h4 className="flex items-center text-neon-orange font-bold mb-4 border-b border-dark-600 pb-2">
                     <MinusCircle size={16} className="mr-2" /> Deductions (Subtracted)
                 </h4>
                 
                 <div className="space-y-3">
                     <div className="flex justify-between items-center bg-dark-800 p-2 rounded">
                        <div>
                            <span className="text-gray-300">Prof. Tax (PT)</span>
                            <span className="text-xs ml-2 text-neon-orange bg-neon-orange/10 px-1 rounded flex-inline items-center w-fit"><Percent size={10} className="inline mr-1"/>2% of GS</span>
                        </div>
                        <span className="text-neon-orange">- ${professionalTax.toFixed(2)}</span>
                     </div>
                 </div>
              </div>

              {/* Final Net Salary */}
              <div className="bg-neon-green/10 border border-neon-green rounded-lg p-6 text-center shadow-[0_0_20px_rgba(76,175,80,0.15)]">
                 <div className="flex items-center justify-center text-neon-green text-sm font-bold mb-2">
                     <Equal size={16} className="mr-2" /> FINAL NET SALARY
                 </div>
                 <div className="text-4xl font-bold text-white tracking-widest text-shadow-sm">
                     ${netSalary.toFixed(2)}
                 </div>
                 <div className="text-neon-green/60 text-xs mt-2 font-mono">
                    GS * (1 - PT)
                 </div>
              </div>
          </div>
      </div>
    </div>
  );
};

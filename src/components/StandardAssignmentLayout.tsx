import React from 'react';
import { Target, FileText, ListChecks, GitBranch, TerminalSquare, Copy, CheckCircle2 } from 'lucide-react';
import { Assignment } from '../data/assignmentData';

interface StandardAssignmentLayoutProps {
  assignment: Assignment;
}

export const StandardAssignmentLayout: React.FC<StandardAssignmentLayoutProps> = ({ assignment }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(assignment.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
      
      {/* Left Column: Theory & Algorithm */}
      <div className="space-y-6">
        
        {/* Objective & PS */}
        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 shadow-lg">
           <h3 className="text-neon-cyan font-bold flex items-center mb-3">
              <Target size={18} className="mr-2" /> Learning Objective
           </h3>
           <p className="text-gray-300 mb-6">{assignment.objective}</p>
           
           <h3 className="text-neon-purple font-bold flex items-center mb-3">
              <FileText size={18} className="mr-2" /> Problem Statement
           </h3>
           <p className="text-gray-400 bg-dark-900 p-4 rounded border border-dark-600 font-mono text-sm">
             {assignment.ps}
           </p>
        </div>

        {/* Algorithm */}
        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 shadow-lg">
           <h3 className="text-white font-bold flex items-center mb-4 border-b border-dark-600 pb-2">
              <ListChecks size={18} className="mr-2 text-neon-orange" /> Algorithm Steps
           </h3>
           <ul className="space-y-3">
             {assignment.algorithm.map((step, idx) => (
               <li key={idx} className="flex">
                  <span className="text-neon-orange font-bold mr-3">{idx + 1}.</span>
                  <span className="text-gray-300">{step}</span>
               </li>
             ))}
           </ul>
        </div>

        {/* I/O and Conclusion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="bg-dark-800 p-5 rounded-xl border border-dark-700">
               <h3 className="text-gray-200 font-bold flex items-center mb-3 text-sm">
                  <TerminalSquare size={16} className="mr-2 text-green-400" /> Expected I/O
               </h3>
               <div className="bg-black p-3 rounded font-mono text-xs text-green-400 border border-dark-600 overflow-x-auto">
                  <div className="text-gray-500 mb-1">Input:</div>
                  <div className="mb-3">{assignment.io.input}</div>
                  <div className="text-gray-500 mb-1">Output:</div>
                  <div>{assignment.io.output}</div>
               </div>
           </div>
           
           <div className="bg-dark-800 p-5 rounded-xl border border-dark-700 flex flex-col justify-between">
               <div>
                 <h3 className="text-gray-200 font-bold flex items-center mb-3 text-sm">
                    <CheckCircle2 size={16} className="mr-2 text-neon-cyan" /> Conclusion
                 </h3>
                 <p className="text-sm text-gray-400 italic">"{assignment.conclusion}"</p>
               </div>
           </div>
        </div>
      </div>

      {/* Right Column: Flowchart & Code */}
      <div className="space-y-6 flex flex-col h-full">
         
         {/* Flowchart Visualizer */}
         <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 shadow-lg hidden md:block">
             <h3 className="text-white font-bold flex items-center mb-4 border-b border-dark-600 pb-2">
                <GitBranch size={18} className="mr-2 text-neon-purple" /> Logic Flow
             </h3>
             <div className="flex flex-col items-center justify-center py-4 relative">
                {/* Simplified CSS Flowchart representing the first 3 steps */}
                <div className="bg-neon-purple/20 border border-neon-purple text-neon-purple px-4 py-2 rounded-full text-xs font-bold mb-2 z-10 relative">START</div>
                <div className="w-0.5 h-4 bg-dark-500 mb-2"></div>
                <div className="bg-dark-900 border border-dark-500 text-gray-300 px-4 py-2 text-center text-xs w-48 rounded mb-2 shadow-sm z-10 relative">{assignment.algorithm[0]}</div>
                <div className="w-0.5 h-4 bg-dark-500 mb-2"></div>
                <div className="bg-dark-900 border border-neon-cyan/50 text-neon-cyan px-4 py-3 transform rotate-0 skew-x-[-10deg] text-center text-xs w-48 mb-2 shadow-sm z-10 relative">
                   <div className="skew-x-[10deg]">{assignment.algorithm[1]}</div>
                </div>
                <div className="w-0.5 h-4 bg-dark-500 mb-2 relative">
                   <div className="absolute top-1/2 -left-[2.1rem] text-[10px] text-gray-500">True</div>
                </div>
                <div className="bg-dark-900 border border-dark-500 text-gray-300 px-4 py-2 text-center text-xs w-48 rounded mb-2 shadow-sm z-10 relative">{assignment.algorithm[assignment.algorithm.length > 2 ? 2 : 1]}</div>
                <div className="w-0.5 h-4 bg-dark-500 mb-2"></div>
                <div className="bg-dark-600 border border-dark-500 text-white px-4 py-2 rounded-full text-xs font-bold z-10 relative shadow-sm">END</div>
             </div>
         </div>

         {/* Source Code Box */}
         <div className="bg-dark-800 p-0 rounded-xl border border-dark-700 shadow-lg flex-1 flex flex-col overflow-hidden relative">
            <div className="bg-dark-900 px-4 py-3 border-b border-dark-700 flex justify-between items-center z-10">
               <div className="flex space-x-2">
                 <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
               </div>
               <span className="font-mono text-xs text-gray-400">{assignment.id.toLowerCase()}_solution.c</span>
               <button 
                   onClick={handleCopy}
                   className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors text-xs ${copied ? 'bg-green-500/20 text-green-400' : 'text-gray-400 hover:text-white'}`}
                >
                   {copied ? <span>COPIED!</span> : <><Copy size={12} /><span>COPY</span></>}
               </button>
            </div>
            <div className="p-4 bg-black/50 flex-1 overflow-y-auto">
               <pre className="font-mono text-sm text-green-400 leading-relaxed">
                 <code>{assignment.code}</code>
               </pre>
            </div>
         </div>
         
      </div>
    </div>
  );
};

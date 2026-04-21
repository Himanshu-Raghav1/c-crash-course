import React, { useState } from 'react';
import { ArrowLeft, Copy, Code, Eye, FileText, BookOpen } from 'lucide-react';
import { assignmentData } from '../data/assignmentData';
import { StandardAssignmentLayout } from './StandardAssignmentLayout';

interface AssignmentViewerProps {
  assignmentId: string;
  onBack: () => void;
}

export const AssignmentViewer: React.FC<AssignmentViewerProps> = ({ assignmentId, onBack }) => {
  const data = assignmentData[assignmentId];
  // Determine if this assignment has a custom simulation (A1-A4)
  const hasSim = !!data?.sim;
  
  // Default tab based on assignment type
  const [activeTab, setActiveTab] = useState<'theory' | 'sim' | 'code'>(hasSim ? 'sim' : 'theory');
  const [copied, setCopied] = useState(false);
  
  if (!data) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-400">
          Assignment {assignmentId} Deep Dive is under construction! 🚧
        </h2>
        <button 
          onClick={onBack}
          className="mt-6 text-neon-cyan hover:text-white transition-colors border border-neon-cyan px-4 py-2 rounded"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(data.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header Area */}
      <div className="flex items-center justify-between border-b border-dark-700 pb-4">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">
          {assignmentId}: {data.title}
        </h2>
      </div>

      {/* View Toggle */}
      <div className="flex justify-center mt-6 mb-8">
        <div className="bg-dark-900 border border-dark-700 rounded-full p-1 flex shadow-lg">
          <button
            onClick={() => setActiveTab('theory')}
            className={`flex items-center space-x-2 px-6 py-2 rounded-full font-bold transition-all duration-300 ${
              activeTab === 'theory' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <BookOpen size={18} /> <span>Standard Layout</span>
          </button>
          
          {hasSim && (
             <button
                onClick={() => setActiveTab('sim')}
                className={`flex items-center space-x-2 px-6 py-2 rounded-full font-bold transition-all duration-300 ${
                  activeTab === 'sim' ? 'bg-neon-purple/20 text-neon-purple' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <Eye size={18} /> <span>Interactive Simulator</span>
              </button>
          )}

          {hasSim && (
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center space-x-2 px-6 py-2 rounded-full font-bold transition-all duration-300 ${
                  activeTab === 'code' ? 'bg-neon-cyan/20 text-neon-cyan' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <Code size={18} /> <span>Raw Source Code</span>
              </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="min-h-[500px]">
        {activeTab === 'theory' && (
          <div className="animate-fade-in">
             <StandardAssignmentLayout assignment={data} />
          </div>
        )}
        
        {activeTab === 'sim' && hasSim && (
          <div className="animate-fade-in">
             {/* Show brief Problem Statement above simulator */}
             <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 shadow-md mb-6 max-w-3xl mx-auto">
                <div className="flex items-center text-neon-cyan mb-2 font-bold">
                   <FileText size={18} className="mr-2" /> Problem Statement
                </div>
                <p className="text-gray-300">{data.ps}</p>
             </div>
             {data.sim}
          </div>
        )}
        
        {activeTab === 'code' && hasSim && (
          <div className="animate-fade-in relative max-w-3xl mx-auto">
             <div className="absolute top-4 right-4 z-10">
                <button 
                   onClick={handleCopy}
                   className={`flex items-center space-x-2 px-3 py-1.5 rounded transition-colors ${copied ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-dark-700 text-gray-300 hover:text-white border border-dark-600'}`}
                >
                   {copied ? <span className="text-xs font-bold shadow-[0_0_10px_rgba(74,222,128,0.3)]">COPIED!</span> : <><Copy size={14} /><span className="text-xs font-bold">COPY</span></>}
                </button>
             </div>
             <pre className="bg-black border border-dark-700 p-6 rounded-lg text-green-400 font-mono text-sm overflow-x-auto shadow-inner leading-relaxed">
               <code>{data.code}</code>
             </pre>
          </div>
        )}
      </div>

    </div>
  );
};

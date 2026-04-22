import React, { useState } from 'react';
import { 
  BookOpen, Terminal, Cpu, GitBranch, Braces, 
  List, BrainCircuit, Layers, FolderOpen, Database, 
  Zap, Copy, Info 
} from 'lucide-react';
import { UnitViewer } from './UnitViewer';
import { AssignmentViewer } from './AssignmentViewer';
import { assignmentsOverview, assignmentData } from '../data/assignmentData';

// --- DATA STRUCTURES ---
interface CourseModule {
  id: string;
  title: string;
  icon: React.ReactNode;
}

// Exactly matching your 11-Unit Syllabus
const learnModules: CourseModule[] = [
  { id: 'U1', title: 'Introduction to C', icon: <BookOpen size={18} /> },
  { id: 'U2', title: 'Basic Syntax & First Program', icon: <Terminal size={18} /> },
  { id: 'U3', title: 'Operators & Expressions', icon: <Cpu size={18} /> },
  { id: 'U4', title: 'Control Statements', icon: <GitBranch size={18} /> },
  { id: 'U5', title: 'Functions', icon: <Braces size={18} /> },
  { id: 'U6', title: 'Arrays & Strings', icon: <List size={18} /> },
  { id: 'U7', title: 'Pointers', icon: <BrainCircuit size={18} /> },
  { id: 'U8', title: 'Structures & Unions', icon: <Layers size={18} /> },
  { id: 'U9', title: 'File Handling', icon: <FolderOpen size={18} /> },
  { id: 'U10', title: 'Dynamic Memory Allocation', icon: <Database size={18} /> },
  { id: 'U11', title: 'Advanced Topics', icon: <Zap size={18} /> },
];

export const Dashboard = () => {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState<'learn' | 'understand' | 'copy' | 'about'>('learn');
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);

  // --- RENDER HELPERS ---
  const renderLetsLearn = () => (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold text-gray-200 mb-6 border-b border-dark-700 pb-2">
        <span className="text-neon-cyan mr-2">/</span> Concept Modules
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {learnModules.map((mod) => (
          <button 
            key={mod.id}
            onClick={() => setSelectedUnit(mod.id)}
            className="flex items-center p-4 bg-dark-800 border border-dark-700 rounded-lg hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all duration-300 text-left group"
          >
            <span className="text-neon-cyan font-mono mr-3 text-sm group-hover:scale-110 transition-transform">{mod.id}</span>
            <span className="font-medium text-gray-200">{mod.title}</span>
            <div className="ml-auto text-gray-500 group-hover:text-neon-cyan transition-colors">
              {mod.icon}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderAssignmentsUnderstanding = () => (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold text-gray-200 mb-6 border-b border-dark-700 pb-2">
        <span className="text-neon-purple mr-2">/</span> Deep Dive: The 22 Assignments
      </h2>
      <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-6 bg-dark-900/50 p-4 rounded-lg border border-neon-purple/20">
          <p className="text-gray-400 text-sm max-w-2xl">
            This section breaks down the logic, edge cases, and algorithmic flowcharts for every single assignment so you actually understand how the code works before the exam.
          </p>
          <a 
            href="https://drive.google.com/file/d/16A9ijLORBwX2a82heDfDTiZODP9hEuZ-/view?usp=drive_link" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-neon-purple/20 text-neon-purple border border-neon-purple/50 rounded-xl hover:bg-neon-purple hover:text-white transition-all duration-300 font-bold text-sm shadow-[0_0_15px_rgba(157,78,221,0.1)] hover:shadow-[0_0_20px_rgba(157,78,221,0.3)] group"
          >
            <FolderOpen size={18} className="group-hover:scale-110 transition-transform" />
            <span>ACCESS FULL SOLUTIONS NOTEBOOK</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {assignmentsOverview.map((item) => (
             <button 
                key={item.id}
                onClick={() => setSelectedAssignment(item.id)}
                className="p-4 border border-dark-700 rounded-lg bg-dark-900 border-l-4 border-l-neon-purple hover:bg-dark-800 hover:border-neon-purple/50 transition-all text-left flex items-start group relative overflow-hidden"
             >
                <div className="flex-1 pr-4">
                   <h3 className="font-bold text-gray-200 group-hover:text-neon-purple transition-colors text-sm">
                     {item.id}: {item.title}
                   </h3>
                </div>
                <div className="text-neon-purple opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all mt-0.5">
                   <BrainCircuit size={16} />
                </div>
                {/* Decorative fade for long titles */}
                <div className="absolute top-0 right-0 h-full w-4 bg-gradient-to-l from-dark-900 to-transparent group-hover:from-dark-800 pointer-events-none"></div>
             </button>
           ))}
        </div>
      </div>
    </div>
  );

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    alert(`${id} Code Copied to Clipboard!`);
  };

  const renderAssignmentCopy = () => (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold text-gray-200 mb-6 border-b border-dark-700 pb-2">
        <span className="text-neon-orange mr-2">/</span> Quick Copy: Assignment Solutions
      </h2>
      <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
        <p className="text-gray-400 mb-6 text-sm italic border-l-2 border-neon-orange pl-3">
          Clean, fully commented, and error-free C code ready to be copied into your IDE.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {assignmentsOverview.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-3 bg-dark-900/50 rounded-lg border border-dark-700 hover:border-neon-orange/30 transition-all group">
              <div className="flex flex-col">
                <span className="text-gray-300 font-mono text-sm group-hover:text-white transition-colors">
                  Assignment_{item.id.replace('A', '').padStart(2, '0')}.c
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">{item.title}</span>
              </div>
              <button 
                onClick={() => handleCopyCode(assignmentData[item.id]?.code || '', item.id)}
                className="flex items-center space-x-2 text-xs font-bold text-neon-orange hover:bg-neon-orange hover:text-white transition-all bg-neon-orange/10 px-4 py-2 rounded-lg border border-neon-orange/20"
              >
                <Copy size={14} /> <span>COPY</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAboutUs = () => (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold text-gray-200 mb-6 border-b border-dark-700 pb-2">
        <span className="text-white mr-2">/</span> Discover More
      </h2>
      <div className="bg-dark-800 p-8 rounded-lg border border-dark-700 text-center">
        <BrainCircuit size={48} className="mx-auto text-neon-cyan mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Built for the Last-Minute Grind</h3>
        <p className="text-gray-400 max-w-lg mx-auto">
          An interactive, scalable crash course designed to bridge the gap between boring textbook theory and actual, executable C code. Ace that exam.
        </p>
      </div>
    </div>
  );

  // --- MAIN COMPONENT RETURN ---
  return (
    <div className="max-w-6xl mx-auto p-6">
      
      {/* Main Header */}
      <header className="mb-8 border-b border-dark-700 pb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
          C Programming Crash Course
        </h1>
        <div className="px-4 py-1 bg-neon-orange/10 text-neon-orange font-bold rounded-full text-sm border border-neon-orange/30 shadow-[0_0_10px_rgba(255,87,34,0.2)]">
          EXAM Comingsoon..
        </div>
      </header>

      {/* Tab Navigation Menu */}
      <nav className="flex space-x-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          onClick={() => setActiveTab('learn')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-md font-bold text-sm transition-all duration-200 whitespace-nowrap ${
            activeTab === 'learn' 
            ? 'bg-neon-cyan/10 text-neon-cyan border-b-2 border-neon-cyan' 
            : 'text-gray-400 hover:bg-dark-800 hover:text-gray-200'
          }`}
        >
          <BookOpen size={16} /> <span>Let's Learn</span>
        </button>

        <button 
          onClick={() => setActiveTab('understand')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-md font-bold text-sm transition-all duration-200 whitespace-nowrap ${
            activeTab === 'understand' 
            ? 'bg-neon-purple/10 text-neon-purple border-b-2 border-neon-purple' 
            : 'text-gray-400 hover:bg-dark-800 hover:text-gray-200'
          }`}
        >
          <BrainCircuit size={16} /> <span>Assignments Understanding</span>
        </button>

        <button 
          onClick={() => setActiveTab('copy')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-md font-bold text-sm transition-all duration-200 whitespace-nowrap ${
            activeTab === 'copy' 
            ? 'bg-neon-orange/10 text-neon-orange border-b-2 border-neon-orange' 
            : 'text-gray-400 hover:bg-dark-800 hover:text-gray-200'
          }`}
        >
          <Copy size={16} /> <span>Assignment Copy</span>
        </button>

        <button 
          onClick={() => setActiveTab('about')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-md font-bold text-sm transition-all duration-200 whitespace-nowrap ${
            activeTab === 'about' 
            ? 'bg-gray-700/30 text-white border-b-2 border-white' 
            : 'text-gray-400 hover:bg-dark-800 hover:text-gray-200'
          }`}
        >
          <Info size={16} /> <span>Discover More</span>
        </button>
      </nav>

      {/* Dynamic Content Area */}
      <main className="min-h-[400px]">
        {selectedUnit ? (
          <UnitViewer unitId={selectedUnit} onBack={() => setSelectedUnit(null)} />
        ) : selectedAssignment ? (
          <AssignmentViewer assignmentId={selectedAssignment} onBack={() => setSelectedAssignment(null)} />
        ) : (
          <>
            {activeTab === 'learn' && renderLetsLearn()}
            {activeTab === 'understand' && renderAssignmentsUnderstanding()}
            {activeTab === 'copy' && renderAssignmentCopy()}
            {activeTab === 'about' && renderAboutUs()}
          </>
        )}
      </main>

    </div>
  );
};
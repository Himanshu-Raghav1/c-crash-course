import React, { useState, useEffect } from 'react';
import { HardDrive, ArrowRight, Save, Database, AlignLeft } from 'lucide-react';

export const FileBufferSimulator: React.FC = () => {
  const [buffer, setBuffer] = useState<string>('');
  const [disk, setDisk] = useState<string>('[Empty File]');
  const [fileOpened, setFileOpened] = useState(false);

  const fprintf = () => {
    if (fileOpened) {
      setBuffer(prev => prev + 'Data chunk\\n');
    }
  };

  const fflush = () => {
    if (buffer) {
      setDisk(prev => (prev === '[Empty File]' ? buffer : prev + buffer));
      setBuffer('');
    }
  };

  const fclose = () => {
    if (fileOpened) {
      fflush();
      setFileOpened(false);
    }
  };

  return (
    <div className="bg-dark-900 rounded-lg border border-dark-700 overflow-hidden text-gray-300 font-sans">
      <div className="p-4 border-b border-dark-700 bg-dark-800 flex items-center">
        <HardDrive size={18} className="mr-2 text-neon-orange" />
        <h4 className="font-bold text-white">File Stream & Buffer Visualizer</h4>
      </div>

      <div className="p-6">
         <p className="text-sm text-gray-400 mb-6 font-mono">
           File operations are expensive. C doesn't write directly to disk; it writes to a temporary <strong>Stream Buffer</strong> in RAM. The buffer only empties into the hard drive when it's full, flushed, or the file is closed.
         </p>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Actions */}
            <div className="flex flex-col space-y-3">
               <button 
                 disabled={fileOpened}
                 onClick={() => {setFileOpened(true); setDisk('[Empty File]'); setBuffer('');}}
                 className="px-4 py-2 border rounded font-mono text-sm bg-dark-800 border-dark-600 hover:border-gray-500 disabled:opacity-50 transition-all flex items-center"
               >
                 <Database size={16} className="mr-2" /> FILE *fp = fopen("t.txt", "w");
               </button>
               <button 
                 disabled={!fileOpened}
                 onClick={fprintf}
                 className="px-4 py-2 border rounded font-mono text-sm bg-neon-cyan/20 border-neon-cyan text-white shadow-[0_0_8px_rgba(0,255,255,0.2)] hover:bg-neon-cyan hover:text-dark-900 disabled:opacity-50 transition-all flex items-center"
               >
                 <AlignLeft size={16} className="mr-2" /> fprintf(fp, "Data chunk\\n");
               </button>
               <button 
                 disabled={!fileOpened || !buffer}
                 onClick={fflush}
                 className="px-4 py-2 border rounded font-mono text-sm bg-neon-purple/20 border-neon-purple text-white shadow-[0_0_8px_rgba(188,0,255,0.2)] hover:bg-neon-purple hover:text-dark-900 disabled:opacity-50 transition-all flex items-center"
               >
                 <Save size={16} className="mr-2" /> fflush(fp);
               </button>
               <button 
                 disabled={!fileOpened}
                 onClick={fclose}
                 className="px-4 py-2 border rounded font-mono text-sm bg-neon-orange/20 border-neon-orange text-white shadow-[0_0_8px_rgba(255,107,0,0.2)] hover:bg-neon-orange hover:text-dark-900 disabled:opacity-50 transition-all flex items-center"
               >
                 <HardDrive size={16} className="mr-2" /> fclose(fp);
               </button>
            </div>

            {/* RAM Buffer */}
            <div className={`p-4 border-2 border-dashed rounded relative flex flex-col ${fileOpened ? 'border-neon-cyan bg-dark-800' : 'border-dark-700 bg-dark-950'}`}>
               <span className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-2">RAM Buffer (Stream)</span>
               <div className="flex-1 bg-dark-900 rounded border border-dark-600 p-2 font-mono text-green-400 text-sm overflow-hidden whitespace-pre-wrap flex flex-col justify-end">
                 {buffer || <span className="text-gray-600 italic">Empty</span>}
               </div>
            </div>

            {/* Disk Storage */}
            <div className={`p-4 border rounded relative flex flex-col ${disk !== '[Empty File]' ? 'border-neon-orange bg-dark-800' : 'border-dark-700 bg-dark-950'}`}>
               <span className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-2">Hard Drive (Disk)</span>
               <div className="flex-1 bg-dark-900 rounded border border-dark-600 p-2 font-mono text-gray-300 text-sm overflow-hidden whitespace-pre-wrap flex flex-col justify-end shadow-inner">
                 {disk}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

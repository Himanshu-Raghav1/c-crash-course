import React, { useState } from 'react';
import { Grid, Type, ToggleLeft } from 'lucide-react';

type ArrayType = 'int' | 'char';

export const ArrayMemoryVisualizer: React.FC = () => {
  const [arrayType, setArrayType] = useState<ArrayType>('int');
  const [intValues, setIntValues] = useState<string[]>(['10', '20', '30', '40', '50']);
  const [charValues, setCharValues] = useState<string>("Hello");

  const baseAddress = 4096; // 0x1000

  const handleIntChange = (index: number, val: string) => {
    const newVals = [...intValues];
    newVals[index] = val;
    setIntValues(newVals);
  };

  const currentLength = arrayType === 'int' ? intValues.length : charValues.length + 1; // +1 for \0

  return (
    <div className="bg-dark-900 rounded-lg border border-dark-700 overflow-hidden text-gray-300 font-sans">
      <div className="p-4 border-b border-dark-700 bg-dark-800 flex items-center justify-between">
        <h4 className="font-bold text-white flex items-center">
          <Grid size={18} className="mr-2 text-neon-cyan" />
          Contiguous Memory Visualizer
        </h4>
        <div className="flex space-x-2 bg-dark-900 rounded p-1 border border-dark-700">
          <button
            onClick={() => setArrayType('int')}
            className={`px-3 py-1 rounded text-xs px-4 font-bold transition-all ${
              arrayType === 'int' ? 'bg-neon-cyan text-dark-900' : 'text-gray-400 hover:text-white'
            }`}
          >
            int array[]
          </button>
          <button
            onClick={() => setArrayType('char')}
            className={`px-3 py-1 rounded text-xs px-4 font-bold transition-all ${
              arrayType === 'char' ? 'bg-neon-purple text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            char str[]
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 font-mono text-sm">Declaration:</span>
            {arrayType === 'int' ? (
              <span className="text-neon-cyan font-mono bg-dark-800 px-3 py-1 rounded border border-dark-600">
                int arr[5] = {'{'}10, 20, 30, 40, 50{'}'};
              </span>
            ) : (
              <span className="text-neon-purple font-mono bg-dark-800 px-3 py-1 rounded border border-dark-600">
                char str[] = "{charValues}";
              </span>
            )}
          </div>
          <div className="ml-auto text-xs text-gray-500">
            {arrayType === 'int' ? 'Each element takes 4 bytes' : 'Each element takes 1 byte'}
          </div>
        </div>

        {/* Input Controls */}
        {arrayType === 'char' && (
          <div className="mb-8 flex items-center">
            <span className="text-sm mr-3 font-mono">Edit String:</span>
            <input 
              type="text" 
              maxLength={8}
              value={charValues}
              onChange={(e) => setCharValues(e.target.value)}
              className="bg-dark-800 border border-dark-600 rounded px-3 py-1 outline-none focus:border-neon-purple font-mono"
            />
          </div>
        )}

        {/* Memory Grid Representation */}
        <div className="space-y-6 overflow-x-auto pb-4">
          <div className="flex space-x-1 min-w-max">
            {Array.from({ length: currentLength }).map((_, i) => {
              const address = baseAddress + (i * (arrayType === 'int' ? 4 : 1));
              const hexAddress = `0x${address.toString(16).toUpperCase()}`;
              
              let displayVal = '';
              let isNullTerm = false;

              if (arrayType === 'int') {
                displayVal = intValues[i] || '0';
              } else {
                if (i === charValues.length) {
                  displayVal = '\\0';
                  isNullTerm = true;
                } else {
                  displayVal = `'${charValues[i]}'`;
                }
              }

              return (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-gray-500 text-xs font-mono mb-2">index [{i}]</div>
                  
                  <div className={`w-20 h-20 flex flex-col justify-center items-center rounded border-2 shadow-sm transition-all ${
                     arrayType === 'int' 
                       ? 'bg-dark-800 border-neon-cyan/50 shadow-[0_0_8px_rgba(0,255,255,0.1)]'
                       : isNullTerm 
                           ? 'bg-neon-orange/20 border-neon-orange text-neon-orange' 
                           : 'bg-dark-800 border-neon-purple/50 shadow-[0_0_8px_rgba(188,0,255,0.1)]'
                  }`}>
                    {arrayType === 'int' ? (
                      <input 
                        type="text" 
                        value={intValues[i]} 
                        onChange={(e) => handleIntChange(i, e.target.value)}
                        className="w-12 bg-transparent text-center text-white font-bold font-mono outline-none border-b border-transparent focus:border-neon-cyan"
                        maxLength={4}
                      />
                    ) : (
                      <span className={`font-mono text-lg font-bold ${isNullTerm ? 'text-neon-orange' : 'text-white'}`}>
                        {displayVal}
                      </span>
                    )}
                  </div>
                  
                  <div className="text-dark-400 text-[10px] font-mono mt-2 bg-dark-800 px-1 rounded">{hexAddress}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 p-4 bg-dark-800 rounded border border-dark-700 text-sm text-gray-400">
          <strong>Key Takeaway:</strong> Arrays allocate <em>contiguous block</em> of memory. 
          The array name (e.g. <code>arr</code> or <code>str</code>) acts as a pointer to the very first element (<code>{arrayType === 'int' ? '0x1000' : '0x1000'}</code>). 
          {arrayType === 'char' && <span> Notice the hidden Null Terminator <code>\0</code> added to mark the end of the string.</span>}
        </div>
      </div>
    </div>
  );
};

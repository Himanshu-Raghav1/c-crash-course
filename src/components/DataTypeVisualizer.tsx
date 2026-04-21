import React, { useState } from 'react';
import { Database, Binary, Hash, Type, Info, CheckCircle2 } from 'lucide-react';

const dataTypes = [
  { 
    id: 'int', 
    name: 'Integer', 
    keyword: 'int',
    bytes: 4, 
    specifier: '%d', 
    icon: Hash, 
    desc: 'Stores whole numbers, without decimals.', 
    example: 'int score = 100;' 
  },
  { 
    id: 'float', 
    name: 'Float', 
    keyword: 'float',
    bytes: 4, 
    specifier: '%f', 
    icon: Binary, 
    desc: 'Stores fractional numbers, containing one or more decimals (approx 6-7 decimal digits precision).', 
    example: 'float price = 19.99;' 
  },
  { 
    id: 'double', 
    name: 'Double', 
    keyword: 'double',
    bytes: 8, 
    specifier: '%lf', 
    icon: Database, 
    desc: 'Stores fractional numbers, with double the precision of float (approx 15 decimal digits precision).', 
    example: 'double pi = 3.14159265359;' 
  },
  { 
    id: 'char', 
    name: 'Character', 
    keyword: 'char',
    bytes: 1, 
    specifier: '%c', 
    icon: Type, 
    desc: 'Stores a single character, letter, number, or ASCII value. Enclosed in single quotes.', 
    example: "char grade = 'A';" 
  },
];

export const DataTypeVisualizer: React.FC = () => {
  const [selectedType, setSelectedType] = useState(dataTypes[0]);

  return (
    <div className="bg-dark-900 rounded-lg border border-dark-700 overflow-hidden text-gray-300">
      <div className="p-4 border-b border-dark-700 bg-dark-800">
        <h4 className="font-bold text-white flex items-center">
          <Info size={18} className="mr-2 text-neon-cyan" />
          Interactive Data Type Explorer
        </h4>
        <p className="text-sm text-gray-400 mt-1">Select a data type to see its memory size, format specifier, and usage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Sidebar Selector */}
        <div className="col-span-1 border-r border-dark-700 bg-dark-900 p-4 space-y-2">
          {dataTypes.map((type) => {
            const isSelected = selectedType.id === type.id;
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type)}
                className={`w-full flex items-center p-3 rounded transition-all duration-200 ${
                  isSelected 
                    ? 'bg-dark-800 border border-neon-cyan shadow-[0_0_10px_rgba(0,255,255,0.1)] text-neon-cyan' 
                    : 'bg-dark-900 border border-dark-700 hover:border-gray-500 text-gray-400 hover:text-white'
                }`}
              >
                <Icon size={18} className="mr-3" />
                <span className="font-mono">{type.keyword}</span>
                {isSelected && <CheckCircle2 size={16} className="ml-auto" />}
              </button>
            );
          })}
        </div>

        {/* Content Viewer */}
        <div className="col-span-2 p-6 bg-dark-800 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">{selectedType.name} <span className="text-neon-purple font-mono font-normal">({selectedType.keyword})</span></h3>
            <p className="text-gray-300">{selectedType.desc}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-dark-900 p-4 rounded border border-dark-700">
              <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Memory Size</span>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-neon-cyan mr-2">{selectedType.bytes}</span>
                <span className="text-gray-400 pb-1">bytes</span>
              </div>
            </div>
            <div className="bg-dark-900 p-4 rounded border border-dark-700">
              <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Format Specifier</span>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-neon-orange font-mono">{selectedType.specifier}</span>
              </div>
            </div>
          </div>

          <div>
            <span className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Example Declaration</span>
            <div className="bg-dark-900 p-3 rounded border border-dark-700 font-mono text-green-400 text-sm">
              {selectedType.example}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

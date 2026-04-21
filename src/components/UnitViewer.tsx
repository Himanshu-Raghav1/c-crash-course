import React, { Suspense } from 'react';
import { Unit1 } from './Unit1';
import { Unit2 } from './Unit2';
import { Unit3 } from './Unit3';
import { Unit4 } from './Unit4';
import { Unit5 } from './Unit5';
import { Unit6 } from './Unit6';
import { Unit7 } from './Unit7';
import { Unit8 } from './Unit8';
import { Unit9 } from './Unit9';
import { Unit10 } from './Unit10';
import { Unit11 } from './Unit11';

interface UnitViewerProps {
  unitId: string;
  onBack: () => void;
}

export const UnitViewer: React.FC<UnitViewerProps> = ({ unitId, onBack }) => {
  
  const renderUnit = () => {
    switch (unitId) {
      case 'U1': return <Unit1 onBack={onBack} />;
      case 'U2': return <Unit2 onBack={onBack} />;
      case 'U3': return <Unit3 onBack={onBack} />;
      case 'U4': return <Unit4 onBack={onBack} />;
      case 'U5': return <Unit5 onBack={onBack} />;
      case 'U6': return <Unit6 onBack={onBack} />;
      case 'U7': return <Unit7 onBack={onBack} />;
      case 'U8': return <Unit8 onBack={onBack} />;
      case 'U9': return <Unit9 onBack={onBack} />;
      case 'U10': return <Unit10 onBack={onBack} />;
      case 'U11': return <Unit11 onBack={onBack} />;
      default:
        return (
          <div className="text-center py-20 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-400">
              Unit {unitId} is under construction! 🚧
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
  };

  return (
    <Suspense fallback={<div className="text-white text-center py-20">Loading Unit...</div>}>
      {renderUnit()}
    </Suspense>
  );
};
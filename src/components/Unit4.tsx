import React, { useState } from 'react';
import { ArrowLeft, Copy, CheckCircle2, Split, Repeat, FastForward } from 'lucide-react';
import { LoopSimulator } from './LoopSimulator';

interface UnitProps {
  onBack: () => void;
}

export const Unit4: React.FC<UnitProps> = ({ onBack }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const decisionCode = `#include <stdio.h>

int main() {
    int score = 85;
    
    // 1. if-else statement
    if (score >= 90) {
        printf("Grade: A\\n");
    } else if (score >= 80) {
        printf("Grade: B\\n");
    } else {
        printf("Grade: C\\n");
    }
    
    // 2. nested if
    int age = 20;
    int has_id = 1;
    
    if (age >= 18) {
        if (has_id) {
            printf("Access Granted.\\n");
        } else {
            printf("ID Required.\\n");
        }
    }
    
    // 3. switch statement (cleaner for exact matches)
    int day = 3;
    switch(day) {
        case 1: printf("Monday\\n"); break;
        case 2: printf("Tuesday\\n"); break;
        case 3: printf("Wednesday\\n"); break;
        default: printf("Other day\\n");
    }
    
    return 0;
}`;

  const jumpsCode = `#include <stdio.h>

int main() {
    // 1. break: completely exits the loop
    printf("Break example:\\n");
    for (int i = 0; i < 5; i++) {
        if (i == 3) {
            break; // Stop completely when i is 3
        }
        printf("%d ", i); // Prints: 0 1 2
    }
    printf("\\n");
    
    // 2. continue: skips the rest of the current iteration
    printf("Continue example:\\n");
    for (int j = 0; j < 5; j++) {
        if (j == 2) {
            continue; // Skip printing 2, go straight to j++
        }
        printf("%d ", j); // Prints: 0 1 3 4
    }
    printf("\\n");
    
    // 3. goto: jumps to a specific label (use sparingly!)
    int count = 0;
    start_label: // This is a label
        printf("Current count: %d\\n", count);
        count++;
        if (count < 2) {
            goto start_label; // Jumps back up!
        }
    
    return 0;
}`;

  return (
    <div className="animate-fade-in pb-20 max-w-4xl mx-auto">
      {/* Navigation */}
      <button 
        onClick={onBack}
        className="flex items-center space-x-2 text-neon-cyan hover:text-white transition-colors mb-6 font-bold"
      >
        <ArrowLeft size={18} /> <span>Back to Dashboard</span>
      </button>

      <h2 className="text-4xl font-bold text-white mb-2">Unit 4: Control Statements</h2>
      <p className="text-gray-400 mb-8 pb-4 border-b border-dark-700">Guide the flow of your program by making decisions and repeating actions.</p>

      {/* Section 1: Decision Making */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-cyan mb-4 flex items-center">
          <Split className="mr-3" size={20} /> Decision Making (if, else, switch)
        </h3>
        <p className="text-gray-300 mb-4">
          Programs need to evaluate conditions to decide what block of code to execute.
        </p>
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden mb-4">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">decision.c</span>
            <button 
              onClick={() => handleCopy(decisionCode, 'decision')}
              className="flex items-center space-x-1 text-xs font-bold text-neon-cyan hover:text-white transition-colors"
            >
              {copied === 'decision' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'decision' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
            <code>{decisionCode}</code>
          </pre>
        </div>
      </section>

      {/* Section 2: Loops */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-purple mb-4 flex items-center">
          <Repeat className="mr-3" size={20} /> Loops (for, while, do-while)
        </h3>
        <p className="text-gray-300 mb-4">
          Loops prevent copying and pasting the same code. They repeatedly execute a block of code as long as a condition is met.
          Step through the visualizer below to see how the three types of loops differ in execution order!
        </p>
        <LoopSimulator />
      </section>

      {/* Section 3: Jump Statements */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-orange mb-4 flex items-center">
          <FastForward className="mr-3" size={20} /> Jump Statements
        </h3>
        <p className="text-gray-300 mb-4">
          Jump statements give you fine-grained control to exit a loop early (<code>break</code>), 
          skip an iteration (<code>continue</code>), or jump to an arbitrary block (<code>goto</code>).
        </p>
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden mb-4">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">jumps.c</span>
            <button 
              onClick={() => handleCopy(jumpsCode, 'jumps')}
              className="flex items-center space-x-1 text-xs font-bold text-neon-orange hover:text-white transition-colors"
            >
              {copied === 'jumps' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'jumps' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
            <code>{jumpsCode}</code>
          </pre>
        </div>
      </section>
    </div>
  );
};

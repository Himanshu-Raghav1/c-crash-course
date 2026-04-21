import React, { useState } from 'react';
import { ArrowLeft, Copy, CheckCircle2, Calculator, ArrowRightLeft, AlignLeft, ToggleLeft, Layers } from 'lucide-react';
import { BitwiseVisualizer } from './BitwiseVisualizer';

interface UnitProps {
  onBack: () => void;
}

export const Unit3: React.FC<UnitProps> = ({ onBack }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const arithmeticCode = `#include <stdio.h>

int main() {
    int a = 10, b = 3;
    
    printf("Addition: %d + %d = %d\\n", a, b, a + b);       // 13
    printf("Subtraction: %d - %d = %d\\n", a, b, a - b);    // 7
    printf("Multiplication: %d * %d = %d\\n", a, b, a * b); // 30
    printf("Division: %d / %d = %d\\n", a, b, a / b);       // 3 (Integer division drops the decimal!)
    printf("Modulo: %d %% %d = %d\\n", a, b, a % b);        // 1 (Returns remainder)
    
    // Increment / Decrement
    int c = 5;
    printf("c starts at %d\\n", c);
    printf("c++ is %d (Post-increment, evaluates THEN adds)\\n", c++); // prints 5, becomes 6
    printf("++c is %d (Pre-increment, adds THEN evaluates)\\n", ++c);   // becomes 7, prints 7
    
    return 0;
}`;

  const logicalCode = `#include <stdio.h>

int main() {
    int age = 22;
    int has_license = 1; // 1 means true, 0 means false
    
    // Logical AND (&&): True only if BOTH conditions are true
    if (age >= 18 && has_license == 1) {
        printf("You can drive.\\n");
    }
    
    // Logical OR (||): True if AT LEAST ONE condition is true
    int has_passport = 0;
    int has_id = 1;
    if (has_passport || has_id) {
        printf("You can enter the building.\\n");
    }
    
    // Logical NOT (!): Reverses the boolean state
    if (!has_passport) {
        printf("You do not have a passport!\\n");
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

      <h2 className="text-4xl font-bold text-white mb-2">Unit 3: Operators & Expressions</h2>
      <p className="text-gray-400 mb-8 pb-4 border-b border-dark-700">Learn how to manipulate data mathematically and logically.</p>

      {/* Section 1: Arithmetic Operators */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-cyan mb-4 flex items-center">
          <Calculator className="mr-3" size={20} /> Arithmetic Operators
        </h3>
        <p className="text-gray-300 mb-4">
          C supports standard mathematical operations including modulo (remainder) and shorthand increments.
        </p>
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden mb-4">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">arithmetic.c</span>
            <button 
              onClick={() => handleCopy(arithmeticCode, 'arithmetic')}
              className="flex items-center space-x-1 text-xs font-bold text-neon-cyan hover:text-white transition-colors"
            >
              {copied === 'arithmetic' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'arithmetic' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
            <code>{arithmeticCode}</code>
          </pre>
        </div>
      </section>

      {/* Section 2: Relational & Logical Operators */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-purple mb-4 flex items-center">
          <ArrowRightLeft className="mr-3" size={20} /> Relational & Logical Operators
        </h3>
        <p className="text-gray-300 mb-4">
          Relational operators (<code>==, !=, &gt;, &lt;, &gt;=, &lt;=</code>) compare two values. 
          Logical operators compose larger conditional expressions. Note that in C, any non-zero number is considered <strong>True</strong>, and zero is <strong>False</strong>.
        </p>
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden mb-4">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">logical.c</span>
            <button 
              onClick={() => handleCopy(logicalCode, 'logical')}
              className="flex items-center space-x-1 text-xs font-bold text-neon-purple hover:text-white transition-colors"
            >
              {copied === 'logical' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'logical' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
            <code>{logicalCode}</code>
          </pre>
        </div>
      </section>

      {/* Section 3: Bitwise Simulator */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-orange mb-4 flex items-center">
          <ToggleLeft className="mr-3" size={20} /> Bitwise Operators
        </h3>
        <p className="text-gray-300 mb-4">
          Bitwise operators perform mathematical operations at the binary digit (bit) level. They are incredibly fast and are a defining feature of systems programming in C.
        </p>
        <BitwiseVisualizer />
      </section>

      {/* Section 4: Precedence */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center">
          <Layers className="mr-3" size={20} /> Operator Precedence & Associativity
        </h3>
        <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 text-gray-300">
          <p className="mb-4">
            Just like PEMDAS in math, C evaluates expressions following a strict hierarchy. If operators have the same precedence, associativity determines if they are evaluated Left-to-Right or Right-to-Left.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-dark-900 text-neon-cyan">
                <tr>
                  <th className="px-4 py-2 border border-dark-700">Precedence</th>
                  <th className="px-4 py-2 border border-dark-700">Operator</th>
                  <th className="px-4 py-2 border border-dark-700">Description</th>
                  <th className="px-4 py-2 border border-dark-700">Associativity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border border-dark-700 font-bold">1 (Highest)</td>
                  <td className="px-4 py-2 border border-dark-700 font-mono">() [] -&gt; .</td>
                  <td className="px-4 py-2 border border-dark-700">Parentheses, Brackets, Struct members</td>
                  <td className="px-4 py-2 border border-dark-700 text-gray-400">Left-to-Right</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-dark-700 font-bold">2</td>
                  <td className="px-4 py-2 border border-dark-700 font-mono">++ -- ! * &</td>
                  <td className="px-4 py-2 border border-dark-700">Unary operators, Pointers, Address of</td>
                  <td className="px-4 py-2 border border-dark-700 text-neon-orange">Right-to-Left</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-dark-700 font-bold">3</td>
                  <td className="px-4 py-2 border border-dark-700 font-mono">* / %</td>
                  <td className="px-4 py-2 border border-dark-700">Multiplication, Division, Modulo</td>
                  <td className="px-4 py-2 border border-dark-700 text-gray-400">Left-to-Right</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-dark-700 font-bold">4</td>
                  <td className="px-4 py-2 border border-dark-700 font-mono">+ -</td>
                  <td className="px-4 py-2 border border-dark-700">Addition, Subtraction</td>
                  <td className="px-4 py-2 border border-dark-700 text-gray-400">Left-to-Right</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-dark-700 font-bold">14 (Lowest)</td>
                  <td className="px-4 py-2 border border-dark-700 font-mono">= += -=</td>
                  <td className="px-4 py-2 border border-dark-700">Assignment</td>
                  <td className="px-4 py-2 border border-dark-700 text-neon-orange">Right-to-Left</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
};

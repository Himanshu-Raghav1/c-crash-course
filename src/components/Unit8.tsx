import React, { useState } from 'react';
import { ArrowLeft, Copy, CheckCircle2, Box, Boxes, Scale, ListOrdered, Tag } from 'lucide-react';
import { StructUnionVisualizer } from './StructUnionVisualizer';

interface UnitProps {
  onBack: () => void;
}

export const Unit8: React.FC<UnitProps> = ({ onBack }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const structCode = `#include <stdio.h>
#include <string.h>

// Define a struct globally
struct Player {
    int id;          // 4 bytes
    char name[20];   // 20 bytes
    float health;    // 4 bytes
};

int main() {
    // 1. Declare and initialize a struct variable
    struct Player p1 = {1, "DragonSlayer", 100.0f};
    
    // 2. Declare and initialize later
    struct Player p2;
    p2.id = 2;
    strcpy(p2.name, "MageMaster");
    p2.health = 85.5f;
    
    // 3. Accessing members with the dot (.) operator
    printf("Player %d: %s has %.1f HP\\n", p1.id, p1.name, p1.health);
    
    // 4. Using Pointers with Structs (use the arrow -> operator)
    struct Player *ptr = &p2;
    printf("Player %d: %s has %.1f HP\\n", ptr->id, ptr->name, ptr->health);
    
    return 0;
}`;

  const unionCode = `#include <stdio.h>

union SensorData {
    int integer_val;
    float float_val;
    char string_val[20];
};

int main() {
    union SensorData data;
    
    printf("Memory size occupied by data: %lu bytes\\n", sizeof(data));
    
    // If we write to integer_val...
    data.integer_val = 10;
    printf("Integer: %d\\n", data.integer_val);
    
    // And then write to float_val...
    data.float_val = 220.5;
    printf("Float: %f\\n", data.float_val);
    
    // The previous integer_val is now corrupted because they share memory!
    printf("Corrupted Integer: %d\\n", data.integer_val); 
    
    return 0;
}`;

  const enumCode = `#include <stdio.h>

// Enums make code readable by replacing magic numbers with names
// By default, MONDAY=0, TUESDAY=1, etc.
enum Day { 
    MONDAY, 
    TUESDAY, 
    WEDNESDAY, 
    THURSDAY, 
    FRIDAY, 
    SATURDAY, 
    SUNDAY 
};

// Typedef creates an alias for a type, preventing you from typing "struct" everywhere
typedef struct {
    int x;
    int y;
} Point;

int main() {
    // Using Enum
    enum Day today = WEDNESDAY;
    if (today == WEDNESDAY) {
        printf("It is Hump Day! (Value: %d)\\n", today); // Outputs 2
    }
    
    // Using Typedef Struct
    Point p1 = {10, 20}; // Notice we don't need "struct Point p1"
    printf("Coordinate: (%d, %d)\\n", p1.x, p1.y);
    
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

      <h2 className="text-4xl font-bold text-white mb-2">Unit 8: Structures & Unions</h2>
      <p className="text-gray-400 mb-8 pb-4 border-b border-dark-700">Group variables of completely DIFFERENT types together to create complex Custom Data Types.</p>

      {/* Section 1: Structs */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-purple mb-4 flex items-center">
          <Box className="mr-3" size={20} /> Structures (struct)
        </h3>
        <p className="text-gray-300 mb-4">
          Arrays can only hold elements of the <em>same</em> data type. A <strong>Struct</strong> allows you to bundle together a completely mixed bag of <code>int</code>, <code>char</code>, <code>float</code>, and arrays into a single package!
        </p>
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden mb-8">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">structs.c</span>
            <button 
              onClick={() => handleCopy(structCode, 'struct')}
              className="flex items-center space-x-1 text-xs font-bold text-neon-purple hover:text-white transition-colors"
            >
              {copied === 'struct' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'struct' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
            <code>{structCode}</code>
          </pre>
        </div>
      </section>

      {/* Section 2: Unions */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-cyan mb-4 flex items-center">
          <Scale className="mr-3" size={20} /> Unions (union)
        </h3>
        <p className="text-gray-300 mb-4">
          A Union looks exactly like a struct in terms of syntax. However, their memory operations are drastically different. Use the visualizer below to see how they differ at the compiled level.
        </p>
        
        <StructUnionVisualizer />
        
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden mb-4 mt-8">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">unions.c</span>
            <button 
              onClick={() => handleCopy(unionCode, 'union')}
              className="flex items-center space-x-1 text-xs font-bold text-neon-cyan hover:text-white transition-colors"
            >
              {copied === 'union' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'union' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
            <code>{unionCode}</code>
          </pre>
        </div>
      </section>

      {/* Section 3: Enum & Typedef */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-neon-orange mb-4 flex items-center">
          <Tag className="mr-3" size={20} /> Enumerations (enum) & typedef
        </h3>
        <p className="text-gray-300 mb-4">
          These two tools make C code exponentially more readable. <code>enum</code> attaches human-readable names to integer constants. <code>typedef</code> allows you to create aliases for complex data types so you don't have to keep writing "struct this" and "struct that".
        </p>
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden mb-4">
          <div className="flex justify-between items-center bg-dark-900 px-4 py-3 border-b border-dark-700">
            <span className="text-xs text-gray-400 font-mono">enum_typedef.c</span>
            <button 
              onClick={() => handleCopy(enumCode, 'enum')}
              className="flex items-center space-x-1 text-xs font-bold text-neon-orange hover:text-white transition-colors"
            >
              {copied === 'enum' ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied === 'enum' ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>
          <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto">
            <code>{enumCode}</code>
          </pre>
        </div>
      </section>
    </div>
  );
};

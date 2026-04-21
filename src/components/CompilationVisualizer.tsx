import React, { useState } from 'react';
import { Settings, Code, FileDigit, PlaySquare } from 'lucide-react';

export const CompilationVisualizer = () => {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      title: '1. Preprocessing',
      icon: <Settings size={18} />,
      extension: 'hello.i',
      desc: 'Removes comments and expands macros (like #include <stdio.h>).',
      code: `// Comments are stripped out!\n// stdio.h is expanded here...\nextern int printf(const char *format, ...);\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`
    },
    {
      title: '2. Compiling',
      icon: <Code size={18} />,
      extension: 'hello.s',
      desc: 'Translates pure C code into lower-level Assembly language.',
      code: `main:\n    push    rbp\n    mov     rbp, rsp\n    lea     rdi, [rip + .LC0]\n    call    printf@PLT\n    mov     eax, 0\n    pop     rbp\n    ret\n.LC0:\n    .string "Hello, World!\\n"`
    },
    {
      title: '3. Assembling',
      icon: <FileDigit size={18} />,
      extension: 'hello.o',
      desc: 'Converts Assembly into raw machine-level binary (object code).',
      code: `01010101 01001000 10001001 11100101\n01001000 10001101 00111101 00000000\n11101000 00000000 00000000 00000000\n10111000 00000000 00000000 00000000`
    },
    {
      title: '4. Linking',
      icon: <PlaySquare size={18} />,
      extension: 'hello.exe',
      desc: 'Links your object code with OS libraries to make a final executable.',
      code: `[EXECUTABLE BINARY HEADER]\n[OS LINKAGE DATA]\n01010101 01001000 10001001 11100101...\n[EOF]`
    }
  ];

  return (
    <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 mt-4">
      <div className="flex flex-wrap gap-2 mb-6">
        {stages.map((stage, index) => (
          <button
            key={index}
            onClick={() => setActiveStage(index)}
            className={`flex items-center space-x-2 px-4 py-2 rounded font-bold text-sm transition-all ${
              activeStage === index 
                ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.2)]' 
                : 'bg-dark-900 text-gray-400 border border-dark-700 hover:border-gray-500'
            }`}
          >
            {stage.icon}
            <span>{stage.title}</span>
          </button>
        ))}
      </div>

      <div className="bg-dark-900 rounded border border-dark-700 overflow-hidden">
        <div className="flex justify-between items-center bg-dark-800 px-4 py-2 border-b border-dark-700">
          <span className="text-xs font-bold text-neon-cyan">{stages[activeStage].extension}</span>
          <span className="text-xs text-gray-400">{stages[activeStage].desc}</span>
        </div>
        <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto min-h-[150px]">
          <code>{stages[activeStage].code}</code>
        </pre>
      </div>
    </div>
  );
};
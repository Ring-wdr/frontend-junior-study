import { AnimatePresence, motion } from 'framer-motion';
import { BadgeCheck, Lock, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

type DecoratorType = 'border' | 'glow' | 'badge' | 'lock';

export const DecoratorVisualizer = () => {
  const [decorators, setDecorators] = useState<Set<DecoratorType>>(new Set());

  const toggleDecorator = (type: DecoratorType) => {
    const next = new Set(decorators);
    if (next.has(type)) {
      next.delete(type);
    } else {
      next.add(type);
    }
    setDecorators(next);
  };

  const has = (type: DecoratorType) => decorators.has(type);

  const generateCode = () => {
    let code = `const base = new Component();`;
    if (has('border')) code += `\nconst bordered = new BorderDecorator(base);`;
    if (has('glow'))
      code += `\nconst glowing = new GlowDecorator(${has('border') ? 'bordered' : 'base'});`;
    if (has('badge'))
      code += `\nconst badged = new BadgeDecorator(${has('glow') ? 'glowing' : has('border') ? 'bordered' : 'base'});`;
    if (has('lock'))
      code += `\nconst locked = new LockProxy(${has('badge') ? 'badged' : has('glow') ? 'glowing' : has('border') ? 'bordered' : 'base'});`;
    return code;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <button
              type="button"
              className="w-full flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
              onClick={() => toggleDecorator('border')}
            >
              <input
                type="checkbox"
                checked={has('border')}
                readOnly
                className="rounded text-blue-600 focus:ring-blue-500 pointer-events-none"
              />
              <span className="text-sm font-medium">Border Decorator</span>
            </button>
            <button
              type="button"
              className="w-full flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
              onClick={() => toggleDecorator('glow')}
            >
              <input
                type="checkbox"
                checked={has('glow')}
                readOnly
                className="rounded text-blue-600 focus:ring-blue-500 pointer-events-none"
              />
              <span className="text-sm font-medium">Glow Decorator</span>
            </button>
            <button
              type="button"
              className="w-full flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
              onClick={() => toggleDecorator('badge')}
            >
              <input
                type="checkbox"
                checked={has('badge')}
                readOnly
                className="rounded text-blue-600 focus:ring-blue-500 pointer-events-none"
              />
              <span className="text-sm font-medium">Badge Decorator</span>
            </button>
            <button
              type="button"
              className="w-full flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
              onClick={() => toggleDecorator('lock')}
            >
              <input
                type="checkbox"
                checked={has('lock')}
                readOnly
                className="rounded text-blue-600 focus:ring-blue-500 pointer-events-none"
              />
              <span className="text-sm font-medium">
                Lock Proxy (Access Control)
              </span>
            </button>
          </div>

          <div className="bg-gray-900 rounded-lg p-3">
            <CodeBlock code={generateCode()} className="text-xs" />
          </div>
        </div>

        <div className="flex-1 min-h-[300px] flex items-center justify-center bg-gray-100 rounded-xl border border-gray-200 relative overflow-hidden">
          <div
            className="absolute inset-0 grid grid-cols-[20px_20px] opacity-20 pointer-events-none"
            style={{
              backgroundSize: '20px 20px',
              backgroundImage:
                'radial-gradient(circle, #000000 1px, transparent 1px)',
            }}
          ></div>

          <motion.div
            layout
            className={cn(
              'relative w-40 h-40 bg-white shadow-sm flex flex-col items-center justify-center transition-all duration-300',
              has('border')
                ? 'border-4 border-blue-500 rounded-xl'
                : 'border border-gray-200 rounded-lg',
              has('glow') && 'shadow-[0_0_30px_rgba(59,130,246,0.6)]',
              has('lock') && 'opacity-80 grayscale',
            )}
          >
            <div className="text-4xl font-black text-gray-800 tracking-tighter">
              BASE
            </div>
            <div className="text-xs text-gray-400 font-mono mt-1">
              Component
            </div>

            {/* Decorator Visuals */}
            <AnimatePresence>
              {has('badge') && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 p-1.5 rounded-full shadow-md z-10"
                >
                  <BadgeCheck className="w-5 h-5" />
                </motion.div>
              )}

              {has('glow') && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute -bottom-6 flex gap-1 items-center bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[10px] font-bold"
                >
                  <Sparkles className="w-3 h-3" /> GLOWING
                </motion.div>
              )}

              {has('lock') && (
                <motion.div
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  className="absolute inset-0 bg-gray-900/10 backdrop-blur-xs flex items-center justify-center z-20 rounded-lg"
                >
                  <Lock className="w-12 h-12 text-gray-700" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Decorators wrap the base component to add features without modifying the
        original class code.
      </div>
    </div>
  );
};

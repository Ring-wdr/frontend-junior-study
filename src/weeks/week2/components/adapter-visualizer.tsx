'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Plug, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { CodeBlock } from '../../../components/ui/code-block';

const PLUG_TRAVEL_OFFSET = 248;
const PLUG_TRAVEL_FALLBACK = 152;

export const AdapterVisualizer = () => {
  const [useAdapter, setUseAdapter] = useState(false);
  const [plugState, setPlugState] = useState<'idle' | 'plugged' | 'failed'>(
    'idle',
  );

  const [travel, setTravel] = useState(PLUG_TRAVEL_FALLBACK);
  const frameRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    for (const timer of timersRef.current) clearTimeout(timer);
    timersRef.current = [];
  };

  useEffect(
    () => () => {
      for (const timer of timersRef.current) clearTimeout(timer);
    },
    [],
  );

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(([entry]) => {
      setTravel(Math.max(0, entry.contentRect.width - PLUG_TRAVEL_OFFSET));
    });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  const tryPlug = () => {
    clearTimers();
    setPlugState('idle');
    timersRef.current.push(
      setTimeout(() => {
        if (useAdapter) {
          setPlugState('plugged');
        } else {
          setPlugState('failed');
          timersRef.current.push(setTimeout(() => setPlugState('idle'), 1000));
        }
      }, 300),
    );
  };

  const generateCode = () => {
    if (!useAdapter) {
      return `const roundPeg = new RoundPeg();
const squareHole = new SquareHole();

// Error: Incompatible interfaces
squareHole.fits(roundPeg); // Fails`;
    }
    return `const roundPeg = new RoundPeg();
const adapter = new RoundToSquareAdapter(roundPeg);

// Success: Adapter bridges the interface
squareHole.fits(adapter); // Works!`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center mb-4">
        <label className="flex items-center gap-2 cursor-pointer p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors select-none">
          <input
            type="checkbox"
            checked={useAdapter}
            onChange={(e) => {
              clearTimers();
              setUseAdapter(e.target.checked);
              setPlugState('idle');
            }}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
          />
          <span className="text-sm font-medium text-gray-700">Use Adapter</span>
        </label>
      </div>

      <div className="h-[180px] bg-gray-100 rounded-xl border border-gray-200 relative overflow-hidden flex items-center justify-center sm:h-[200px]">
        <div
          ref={frameRef}
          className="w-full max-w-[400px] h-full relative mx-auto"
        >
          {/* Wall Socket (Square Hole) - Fixed Position */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center z-10 shadow-lg">
            <div className="w-8 h-8 bg-black rounded-sm shadow-inner" />
          </div>

          {/* Plug (Round Peg) - Animates to socket */}
          <motion.div
            className="absolute left-8 top-1/2 -mt-4 w-32 h-8 flex items-center z-20"
            initial={false}
            animate={{
              x: plugState === 'plugged' || plugState === 'failed' ? travel : 0,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="w-full h-full bg-blue-500 rounded-l-full relative shadow-md">
              <div className="absolute right-0 top-1/2 -mt-1 w-4 h-2 bg-gray-300 rounded-r-md" />

              {/* Adapter Visual */}
              <AnimatePresence>
                {useAdapter && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: -8 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -right-8 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-500 rounded-sm flex items-center justify-center shadow-sm"
                  >
                    <Plug className="w-4 h-4 text-white rotate-90" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Connection Spark (Zap) - Centered on socket */}
          <AnimatePresence>
            {plugState === 'plugged' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.3 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                className="absolute right-10 top-1/2 -translate-y-1/2 z-30 pointer-events-none"
              >
                <Zap className="w-10 h-10 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" />
              </motion.div>
            )}
            {plugState === 'failed' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-red-600 text-xs font-bold bg-red-50 border border-red-200 px-3 py-1 rounded-full shadow-sm whitespace-nowrap"
              >
                ⚠️ INCOMPATIBLE INTERFACE
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={tryPlug}
          disabled={plugState === 'plugged'}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-bold shadow-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          {useAdapter ? 'Connect with Adapter' : 'Try connecting directly'}
        </button>
      </div>

      <CodeBlock code={generateCode()} className="text-xs" />
    </div>
  );
};

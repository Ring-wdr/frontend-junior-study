import { AnimatePresence, motion } from 'framer-motion';
import { Box, XCircle } from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/ui/code-block';

export const MonadVisualizer = () => {
  const [value, setValue] = useState<number | null>(5);
  const [history, setHistory] = useState<(number | null)[]>([]);

  const updateValue = (
    operation: (n: number) => number | null,
    label: string,
  ) => {
    setValue((prev) => {
      const next = prev !== null ? operation(prev) : null;
      setHistory((h) => [...h, next]);
      return next;
    });
  };

  const reset = () => {
    setValue(5);
    setHistory([]);
  };

  const double = () => updateValue((n) => n * 2, 'map(x => x * 2)');
  const addOne = () => updateValue((n) => n + 1, 'map(x => x + 1)');
  const makeNull = () => updateValue(() => null, 'map(x => null)');

  const generateCode = () => {
    return `const Maybe = (val) => ({
  map: (fn) => val === null ? Maybe(null) : Maybe(fn(val)),
  value: val
});

Maybe(5)
${history
  .map((val, i) => {
    // Reconstruct operations based on logic (simplified purely for visual log)
    if (val === null && i > 0 && history[i - 1] !== null)
      return `  .map(() => null) // Becomes Empty`;
    if (val === null) return `  .map(...) // Skipped (Safety)`;
    if (i === 0) return `  .map(...) // Result: ${val}`; // Simplified
    return `  .map(...) // Result: ${val}`;
  })
  .join('\n')}
  .value; // ${value === null ? 'null' : value}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-2">
        <button
          type="button"
          onClick={double}
          disabled={value === null}
          className="px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50 text-xs font-medium"
        >
          * 2
        </button>
        <button
          type="button"
          onClick={addOne}
          disabled={value === null}
          className="px-3 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 disabled:opacity-50 text-xs font-medium"
        >
          + 1
        </button>
        <button
          type="button"
          onClick={makeNull}
          disabled={value === null}
          className="px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50 text-xs font-medium"
        >
          Make Null
        </button>
        <button
          type="button"
          onClick={reset}
          className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-xs font-medium"
        >
          Reset
        </button>
      </div>

      <div className="h-[120px] flex items-center justify-center bg-gray-100 rounded-xl border border-gray-200 overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-10 pointer-events-none">
          <Box className="w-32 h-32" />
        </div>

        <AnimatePresence mode="wait">
          {value !== null ? (
            <motion.div
              key={value}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center border-2 border-indigo-500 text-2xl font-bold text-indigo-700 z-10"
            >
              {value}
            </motion.div>
          ) : (
            <motion.div
              key="null"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-400 z-10"
            >
              <XCircle className="w-8 h-8 text-gray-400" />
            </motion.div>
          )}
        </AnimatePresence>

        {value === null && (
          <div className="absolute bottom-2 text-[10px] text-red-500 font-bold bg-red-50 px-2 py-1 rounded">
            SAFE MODE: Operations ignored
          </div>
        )}
      </div>

      <div className="bg-gray-900 rounded-lg p-3">
        <CodeBlock code={generateCode()} className="text-xs" />
      </div>
    </div>
  );
};

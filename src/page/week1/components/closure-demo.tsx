import { AnimatePresence, motion } from 'framer-motion';
import { Play, Plus } from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/ui/code-block';

export const ClosureDemo = () => {
  const [counters, setCounters] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const createCounter = () => {
    setCounters([...counters, 0]);
    setShowExplanation(true);
  };

  const incrementCounter = (index: number) => {
    const newCounters = [...counters];
    newCounters[index]++;
    setCounters(newCounters);
  };

  const reset = () => {
    setCounters([]);
    setShowExplanation(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-xs overflow-x-auto">
        <CodeBlock
          language="javascript"
          code={`function createCounter() {
  let count = 0; // Private variable (closure)
  
  return function() {
    count++;
    return count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

counter1(); // 1
counter1(); // 2
counter2(); // 1 (separate closure!)`}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={createCounter}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-medium text-sm hover:bg-green-600 transition-all"
        >
          <Plus className="w-4 h-4" />
          Create Counter
        </button>
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg font-medium text-sm hover:bg-gray-600 transition-all"
        >
          Reset
        </button>
      </div>

      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-purple-50 p-4 rounded-xl border border-purple-200"
        >
          <h4 className="font-semibold text-purple-900 mb-2">
            Each counter has its own closure!
          </h4>
          <p className="text-sm text-purple-800">
            Every time you call{' '}
            <code className="bg-purple-100 px-1 rounded">createCounter()</code>,
            a new closure is created with its own private{' '}
            <code className="bg-purple-100 px-1 rounded">count</code> variable.
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnimatePresence>
          {counters.map((value, index) => (
            <motion.div
              // biome-ignore lint/suspicious/noArrayIndexKey: value dont represent unique key
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-linear-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200"
            >
              <div className="text-center">
                <div className="text-xs font-mono text-purple-600 mb-2">
                  counter{index + 1}
                </div>
                <div className="text-4xl font-bold text-purple-900 mb-4">
                  {value}
                </div>
                <button
                  type="button"
                  onClick={() => incrementCounter(index)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg font-medium text-sm hover:bg-purple-600 transition-all"
                >
                  <Play className="w-3 h-3" />
                  Increment
                </button>
              </div>
              <div className="mt-4 pt-4 border-t border-purple-200">
                <div className="text-xs text-purple-700 font-mono">
                  Private scope:
                </div>
                <div className="text-xs bg-purple-900 text-purple-100 p-2 rounded mt-1 font-mono">
                  count = {value}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {counters.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          Click "Create Counter" to see closures in action!
        </div>
      )}

      <div className="bg-green-50 p-4 rounded-xl border border-green-200">
        <h4 className="font-semibold text-green-900 mb-2">Key Concept</h4>
        <p className="text-sm text-green-800">
          A closure is a function that remembers its outer variables and can
          access them even when the outer function has finished executing. Each
          closure maintains its own independent copy of the variables.
        </p>
      </div>
    </div>
  );
};

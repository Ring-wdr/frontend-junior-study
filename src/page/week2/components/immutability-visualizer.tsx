import { AnimatePresence, motion } from 'framer-motion';
import { Copy, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/ui/code-block';

interface DataItem {
  id: string;
  value: number;
  isNew?: boolean;
}

export const ImmutabilityVisualizer = () => {
  const [history, setHistory] = useState<DataItem[][]>([
    [
      { id: '1', value: 1 },
      { id: '2', value: 2 },
      { id: '3', value: 3 },
    ],
  ]);
  const [nextValue, setNextValue] = useState(4);

  const currentArray = history[history.length - 1];

  const pushImmutable = () => {
    const newItem = {
      id: Math.random().toString(36),
      value: nextValue,
      isNew: true,
    };
    const newArray = [...currentArray, newItem]; // Copy spread

    // Remove isNew flag from previous
    // const cleanPrev = currentArray.map((item) => ({ ...item, isNew: false })); // This variable was not used.
    // Ensure strictly new copy references for existing items (simulating shallow copy where refs are shared but array is new)
    // Visually we want to show it's a new "Row"

    setHistory((prev) => {
      // Keep only last 3 for visualization space
      const newHistory = [...prev, newArray];
      if (newHistory.length > 3) return newHistory.slice(1);
      return newHistory;
    });
    setNextValue((v) => v + 1);
  };

  const reset = () => {
    setHistory([
      [
        { id: '1', value: 1 },
        { id: '2', value: 2 },
        { id: '3', value: 3 },
      ],
    ]);
    setNextValue(4);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <button
          type="button"
          onClick={pushImmutable}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium flex items-center gap-2"
        >
          <Copy className="w-4 h-4" />
          Push (Immutable)
        </button>
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Reset
        </button>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {history.map((array, versionIndex) => (
            <motion.div
              key={`hist-${versionIndex + (history.length > 3 ? nextValue : 0)}`} // Unique key hack for simple demo
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4"
            >
              <div className="text-xs font-mono font-bold text-gray-400 w-16">
                v{history.length - history.length + versionIndex}
                {versionIndex === history.length - 1 && (
                  <span className="ml-1 text-green-500">(Latest)</span>
                )}
              </div>
              <div className="flex gap-2">
                <span className="text-gray-400 self-center font-mono">[</span>
                <AnimatePresence>
                  {array.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={item.isNew ? { scale: 0, rotate: -180 } : false}
                      animate={{ scale: 1, rotate: 0 }}
                      layoutId={item.isNew ? undefined : `item-${item.id}`} // layoutId allows visuals to "float" to next version? No, we want distinct copies for immutable feel.
                      // Actually for immutable visualization, showing they are DISTINCT arrays is key.
                      // But demonstrating structure sharing (same memory ref) is advanced.
                      // Let's stick to "Array Reference Changed".
                      className={`w-8 h-8 flex items-center justify-center rounded font-mono font-bold text-sm ${item.isNew ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                    >
                      {item.value}
                    </motion.div>
                  ))}
                </AnimatePresence>
                <span className="text-gray-400 self-center font-mono">]</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="bg-gray-900 rounded-lg p-3">
        <CodeBlock
          code={`// Original array is NOT modified\nconst newArray = [...oldArray, ${nextValue}];`}
          className="text-xs"
          language="javascript"
        />
      </div>
    </div>
  );
};

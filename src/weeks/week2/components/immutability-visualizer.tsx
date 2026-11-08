'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Copy, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/ui/code-block';

interface DataItem {
  id: string;
  value: number;
  isNew?: boolean;
}

interface Version {
  version: number;
  items: DataItem[];
}

const INITIAL_HISTORY: Version[] = [
  {
    version: 0,
    items: [
      { id: '1', value: 1 },
      { id: '2', value: 2 },
      { id: '3', value: 3 },
    ],
  },
];

export const ImmutabilityVisualizer = () => {
  const [history, setHistory] = useState<Version[]>(INITIAL_HISTORY);
  const [nextValue, setNextValue] = useState(4);

  const latest = history[history.length - 1];

  const pushImmutable = () => {
    const newItem = {
      id: `item-${nextValue}`,
      value: nextValue,
      isNew: true,
    };
    const newVersion: Version = {
      version: latest.version + 1,
      items: [
        ...latest.items.map((item) => ({ ...item, isNew: false })),
        newItem,
      ],
    };

    setHistory((prev) => [...prev, newVersion].slice(-3));
    setNextValue((v) => v + 1);
  };

  const reset = () => {
    setHistory(INITIAL_HISTORY);
    setNextValue(4);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-200 sm:gap-4 sm:p-4">
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
        <AnimatePresence mode="popLayout" initial={false}>
          {history.map(({ version, items }, versionIndex) => (
            <motion.div
              key={version}
              layout
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-wrap items-center gap-x-4 gap-y-2 sm:p-4"
            >
              <div className="text-xs font-mono font-bold text-gray-400 w-16 shrink-0">
                v{version}
                {versionIndex === history.length - 1 && (
                  <span className="ml-1 text-green-500">(Latest)</span>
                )}
              </div>
              <div className="flex min-w-0 flex-wrap gap-2">
                <span className="text-gray-400 self-center font-mono">[</span>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={item.isNew ? { scale: 0.5, opacity: 0 } : false}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className={`w-8 h-8 flex items-center justify-center rounded font-mono font-bold text-sm ${item.isNew ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                  >
                    {item.value}
                  </motion.div>
                ))}
                <span className="text-gray-400 self-center font-mono">]</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <CodeBlock
        code={`// Original array is NOT modified\nconst newArray = [...oldArray, ${nextValue}];`}
        className="text-xs"
        language="javascript"
      />
    </div>
  );
};

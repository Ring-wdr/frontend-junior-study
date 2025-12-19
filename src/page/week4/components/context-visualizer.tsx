import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '../../../lib/utils';

export const ContextVisualizer = () => {
  const [mode, setMode] = useState<'drilling' | 'context'>('drilling');

  const Node = ({
    label,
    level,
    active,
  }: {
    label: string;
    level: number;
    active: boolean;
  }) => (
    <div className="flex flex-col items-center">
      <motion.div
        animate={{
          backgroundColor: active
            ? mode === 'drilling'
              ? '#EF4444'
              : '#10B981'
            : '#FFFFFF',
          borderColor: active
            ? mode === 'drilling'
              ? '#B91C1C'
              : '#059669'
            : '#E5E7EB',
          color: active ? '#FFFFFF' : '#374151',
          scale: active ? 1.05 : 1,
        }}
        className="w-32 h-10 rounded-lg border-2 flex items-center justify-center text-xs font-bold shadow-sm z-10"
      >
        {label}
      </motion.div>
      {level < 3 && (
        <div className="h-6 w-0.5 bg-gray-200 my-1 relative">
          {/* Prop Drilling Flow Line */}
          {active && mode === 'drilling' && (
            <motion.div
              layoutId="drill-line"
              className="absolute top-0 left-0 w-full bg-red-500"
              initial={{ height: 0 }}
              animate={{ height: '100%' }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex justify-center mb-8 bg-gray-100 p-1 rounded-lg w-max mx-auto">
        <button
          type="button"
          onClick={() => setMode('drilling')}
          className={cn(
            'px-4 py-1.5 rounded-md text-sm font-medium transition-all',
            mode === 'drilling'
              ? 'bg-white text-red-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-900',
          )}
        >
          Prop Drilling
        </button>
        <button
          type="button"
          onClick={() => setMode('context')}
          className={cn(
            'px-4 py-1.5 rounded-md text-sm font-medium transition-all',
            mode === 'context'
              ? 'bg-white text-green-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-900',
          )}
        >
          Context API
        </button>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Context Teleport Line */}
        {mode === 'context' && (
          <svg className="absolute top-5 left-1/2 ml-[60px] w-24 h-[140px] z-0 overflow-visible">
            <title>Context Value Teleportation Path</title>
            <motion.path
              d="M 0 0 C 60 0, 60 140, 0 140"
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.text
              x="65"
              y="70"
              className="text-[10px] fill-green-600 font-mono"
            >
              Provider Value
            </motion.text>
          </svg>
        )}

        {/* Tree Nodes */}
        <Node label="App (Root)" level={1} active={true} />

        <Node
          label="Layout"
          level={2}
          active={mode === 'drilling'} // Only active in drilling
        />

        <Node
          label="UserProfile"
          level={3}
          active={true} // Destination always active
        />
      </div>

      <div className="mt-8 text-center text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
        {mode === 'drilling' ? (
          <p>
            <strong className="text-red-600">Prop Drilling:</strong> Data must
            be passed through every intermediate component (Layout), even if
            they don't use it.
          </p>
        ) : (
          <p>
            <strong className="text-green-600">Context API:</strong> Data is
            "teleported" directly from the Provider (App) to the Consumer
            (UserProfile), bypassing intermediates.
          </p>
        )}
      </div>
    </div>
  );
};

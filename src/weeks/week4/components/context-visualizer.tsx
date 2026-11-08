'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { cn } from '../../../lib/utils';

type Mode = 'drilling' | 'context';

const TreeNode = ({
  label,
  level,
  active,
  mode,
}: {
  label: string;
  level: number;
  active: boolean;
  mode: Mode;
}) => (
  <div className="flex flex-col items-center">
    <motion.div
      initial={false}
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
      transition={{ duration: 0.25 }}
      className="w-28 h-10 rounded-lg border-2 flex items-center justify-center text-xs font-bold shadow-sm z-10"
    >
      {label}
    </motion.div>
    {level < 3 && (
      <div className="h-6 w-0.5 bg-gray-200 my-1 relative overflow-hidden">
        {active && mode === 'drilling' && (
          <motion.div
            className="absolute top-0 left-0 w-full bg-red-500"
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        )}
      </div>
    )}
  </div>
);

export const ContextVisualizer = () => {
  const [mode, setMode] = useState<Mode>('drilling');

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 overflow-hidden">
      <div className="flex justify-center mb-6 bg-gray-100 p-1 rounded-lg w-max max-w-full mx-auto">
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
        {mode === 'context' && (
          <svg className="absolute top-5 left-1/2 ml-[56px] w-20 h-[140px] z-0 overflow-visible">
            <title>Context Value Teleportation Path</title>
            <motion.path
              d="M 0 0 C 40 0, 40 140, 0 140"
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
            <motion.text
              x="36"
              y="64"
              className="text-[10px] fill-green-600 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <tspan x="36">Provider</tspan>
              <tspan x="36" dy="12">
                Value
              </tspan>
            </motion.text>
          </svg>
        )}

        <TreeNode label="App (Root)" level={1} active={true} mode={mode} />

        <TreeNode
          label="Layout"
          level={2}
          active={mode === 'drilling'}
          mode={mode}
        />

        <TreeNode label="UserProfile" level={3} active={true} mode={mode} />
      </div>

      <div className="mt-6 text-center text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
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

'use client';

import { AlertCircle, Play, RotateCcw, XCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/i18n/client';

type ExecutionState =
  | 'idle'
  | 'js-running'
  | 'js-error'
  | 'ts-compiling'
  | 'ts-error'
  | 'ts-success';

const feedbackTransition = { duration: 0.25, ease: 'easeOut' } as const;

export const TypeErrorDiscoveryVisualizer = () => {
  const { t } = useTranslation('week16');
  const [state, setState] = useState<ExecutionState>('idle');

  const jsCode = `function greet(name) {
  return "Hello, " + name.toUpperCase();
}

// Call with wrong type
greet(123);`;

  const tsCode = `function greet(name: string): string {
  return "Hello, " + name.toUpperCase();
}

// Call with wrong type
greet(123);`;

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const schedule = (next: ExecutionState, delay: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setState(next), delay);
  };

  const runJavaScript = () => {
    setState('js-running');
    schedule('js-error', 1000);
  };

  const runTypeScript = () => {
    setState('ts-compiling');
    schedule('ts-error', 500);
  };

  const reset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setState('idle');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          type="button"
          onClick={runJavaScript}
          disabled={state !== 'idle'}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium text-sm hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Play className="w-4 h-4" />
          {t('whyTypescript.visualizer.runJs')}
        </button>
        <button
          type="button"
          onClick={runTypeScript}
          disabled={state !== 'idle'}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium text-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Play className="w-4 h-4" />
          {t('whyTypescript.visualizer.runTs')}
        </button>
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          {t('whyTypescript.visualizer.reset')}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          className={`relative ${state.startsWith('js') ? 'ring-2 ring-yellow-400 rounded-lg' : ''}`}
        >
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-gray-800">
              <span className="text-xs font-medium text-yellow-400">
                {t('whyTypescript.visualizer.jsCode')}
              </span>
              {state === 'js-running' && (
                <span className="text-xs text-gray-400 animate-pulse">
                  {t('whyTypescript.visualizer.running')}
                </span>
              )}
            </div>
            <pre className="p-3 text-xs text-gray-300 overflow-x-auto">
              <code>{jsCode}</code>
            </pre>
          </div>
          <AnimatePresence>
            {state === 'js-error' && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={feedbackTransition}
                className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <div className="flex items-center gap-2 text-red-700 text-sm font-medium">
                  <XCircle className="w-4 h-4" />
                  {t('whyTypescript.visualizer.runtimeError')}
                </div>
                <p className="mt-1 text-xs text-red-600 font-mono break-words">
                  TypeError: name.toUpperCase is not a function
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className={`relative ${state.startsWith('ts') ? 'ring-2 ring-blue-400 rounded-lg' : ''}`}
        >
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-gray-800">
              <span className="text-xs font-medium text-blue-400">
                {t('whyTypescript.visualizer.tsCode')}
              </span>
              {state === 'ts-compiling' && (
                <span className="text-xs text-gray-400 animate-pulse">
                  {t('whyTypescript.visualizer.compiling')}
                </span>
              )}
            </div>
            <pre className="p-3 text-xs text-gray-300 overflow-x-auto relative">
              <code>{tsCode}</code>
              {state === 'ts-error' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={feedbackTransition}
                  className="absolute bottom-3 left-3 right-3"
                >
                  <div className="bg-red-500/20 border-l-2 border-red-500 px-2 py-1">
                    <span className="text-red-400 text-[10px]">~~~~~~</span>
                  </div>
                </motion.div>
              )}
            </pre>
          </div>
          <AnimatePresence>
            {state === 'ts-error' && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={feedbackTransition}
                className="mt-2 p-3 bg-orange-50 border border-orange-200 rounded-lg"
              >
                <div className="flex items-center gap-2 text-orange-700 text-sm font-medium">
                  <AlertCircle className="w-4 h-4" />
                  {t('whyTypescript.visualizer.compileError')}
                </div>
                <p className="mt-1 text-xs text-orange-600 font-mono break-words">
                  Argument of type 'number' is not assignable to parameter of
                  type 'string'
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-2 bg-gray-100 rounded-2xl sm:rounded-full text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span className="text-gray-600">
              {t('whyTypescript.visualizer.legendJs')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-gray-600">
              {t('whyTypescript.visualizer.legendTs')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

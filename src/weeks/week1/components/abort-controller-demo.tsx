'use client';

import { AnimatePresence, motion } from 'motion/react';
import { AlertCircle, Ban, CheckCircle, Loader2, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

type Status = 'idle' | 'loading' | 'completed' | 'aborted';

export const AbortControllerDemo = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [progress, setProgress] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(
    () => () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      abortControllerRef.current?.abort();
    },
    [],
  );

  const startRequest = () => {
    if (status === 'loading') return;

    // Reset state
    setStatus('loading');
    setProgress(0);

    // Create new AbortController
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const { signal } = controller;

    // Simulate a long request with progress
    let currentProgress = 0;
    stopInterval();
    intervalRef.current = setInterval(() => {
      if (signal.aborted) {
        stopInterval();
        return;
      }

      currentProgress += 10;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        stopInterval();
        setStatus('completed');
        abortControllerRef.current = null;
      }
    }, 300); // 3 seconds total

    // In a real scenario, you would pass 'signal' to fetch:
    // fetch('/api/data', { signal })
  };

  const abortRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      stopInterval();
      setStatus('aborted');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Visualizer */}
        <div className="bg-white p-4 rounded-xl border-2 border-gray-100 relative overflow-hidden min-w-0">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Loader2
              className={cn('w-4 h-4', status === 'loading' && 'animate-spin')}
            />
            Network Request Simulator
          </h4>

          {/* Progress Bar */}
          <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden mb-6 relative">
            <motion.div
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={cn(
                'h-full transition-colors duration-200',
                status === 'aborted'
                  ? 'bg-red-400'
                  : status === 'completed'
                    ? 'bg-green-500'
                    : 'bg-blue-500',
              )}
            />
          </div>

          <div className="flex justify-center items-center h-20 text-center">
            <AnimatePresence mode="wait">
              {status === 'idle' && (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-gray-400 text-sm"
                >
                  Ready to start...
                </motion.p>
              )}
              {status === 'loading' && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col items-center text-blue-600"
                >
                  <span className="font-bold text-lg">{progress}%</span>
                  <span className="text-xs">Fetching data...</span>
                </motion.div>
              )}
              {status === 'completed' && (
                <motion.div
                  key="completed"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 text-green-600 font-bold"
                >
                  <CheckCircle className="w-6 h-6" /> Success!
                </motion.div>
              )}
              {status === 'aborted' && (
                <motion.div
                  key="aborted"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 text-red-500 font-bold"
                >
                  <AlertCircle className="w-6 h-6" /> Request Aborted
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            <button
              type="button"
              onClick={startRequest}
              disabled={status === 'loading'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Play className="w-4 h-4" /> Start Request
            </button>
            <button
              type="button"
              onClick={abortRequest}
              disabled={status !== 'loading'}
              className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Ban className="w-4 h-4" /> Abort
            </button>
          </div>
        </div>

        {/* Code */}
        <div className="min-w-0">
          <CodeBlock
            language="javascript"
            code={`const controller = new AbortController();
const signal = controller.signal;

// Start fetch with signal
fetch('/api/data', { signal })
  .then(res => res.json())
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('Fetch aborted');
    } else {
      console.error('Fetch error', err);
    }
  });

// Cancel anytime
controller.abort();`}
          />
        </div>
      </div>
    </div>
  );
};

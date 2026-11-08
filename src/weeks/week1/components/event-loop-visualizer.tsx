'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Play, RotateCcw, SkipForward } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

const sampleCode = `console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('End');`;

export const EventLoopVisualizer = () => {
  const { t } = useTranslation('week1');
  const [step, setStep] = useState(0);
  const [output, setOutput] = useState<string[]>([]);
  const [callStack, setCallStack] = useState<string[]>([]);
  const [microtaskQueue, setMicrotaskQueue] = useState<string[]>([]);
  const [macrotaskQueue, setMacrotaskQueue] = useState<string[]>([]);
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

  const steps = [
    {
      desc: t('eventLoop.visualizer.steps.execute', {
        code: 'console.log("Start")',
      }),
      action: () => {
        setCallStack(['console.log']);
        setOutput(['Start']);
      },
    },
    {
      desc: t('eventLoop.visualizer.steps.popCallStack'),
      action: () => {
        setCallStack([]);
      },
    },
    {
      desc: t('eventLoop.visualizer.steps.registerTimeout'),
      action: () => {
        setMacrotaskQueue(['setTimeout callback']);
      },
    },
    {
      desc: t('eventLoop.visualizer.steps.registerPromise'),
      action: () => {
        setMicrotaskQueue(['Promise callback']);
      },
    },
    {
      desc: t('eventLoop.visualizer.steps.execute', {
        code: 'console.log("End")',
      }),
      action: () => {
        setCallStack(['console.log']);
        setOutput((prev) => [...prev, 'End']);
      },
    },
    {
      desc: t('eventLoop.visualizer.steps.popCallStack'),
      action: () => {
        setCallStack([]);
      },
    },
    {
      desc: t('eventLoop.visualizer.steps.processMicrotask'),
      action: () => {
        setCallStack(['Promise callback']);
        setMicrotaskQueue([]);
      },
    },
    {
      desc: t('eventLoop.visualizer.steps.execute', {
        code: 'console.log("Promise")',
      }),
      action: () => {
        setOutput((prev) => [...prev, 'Promise']);
      },
    },
    {
      desc: t('eventLoop.visualizer.steps.popCallStack'),
      action: () => {
        setCallStack([]);
      },
    },
    {
      desc: t('eventLoop.visualizer.steps.processMacrotask'),
      action: () => {
        setCallStack(['setTimeout callback']);
        setMacrotaskQueue([]);
      },
    },
    {
      desc: t('eventLoop.visualizer.steps.execute', {
        code: 'console.log("Timeout")',
      }),
      action: () => {
        setOutput((prev) => [...prev, 'Timeout']);
      },
    },
    {
      desc: t('eventLoop.visualizer.steps.popDone'),
      action: () => {
        setCallStack([]);
      },
    },
  ];

  const nextStep = () => {
    clearTimers();
    if (step < steps.length) {
      steps[step].action();
      setStep(step + 1);
    }
  };

  const reset = () => {
    clearTimers();
    setStep(0);
    setOutput([]);
    setCallStack([]);
    setMicrotaskQueue([]);
    setMacrotaskQueue([]);
  };

  const runAll = () => {
    reset();
    timersRef.current = steps.map((current, i) =>
      setTimeout(
        () => {
          current.action();
          setStep(i + 1);
        },
        100 + i * 500,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 text-gray-100 p-1 rounded-xl font-mono text-xs overflow-x-auto">
        <CodeBlock code={sampleCode} showLineNumbers />
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <button
          type="button"
          onClick={nextStep}
          disabled={step >= steps.length}
          data-testid="event-loop-next-step"
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all',
            step >= steps.length
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600',
          )}
        >
          <SkipForward className="w-4 h-4" />
          {t('eventLoop.visualizer.nextStep')}
        </button>
        <button
          type="button"
          onClick={runAll}
          data-testid="event-loop-run-all"
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-medium text-sm hover:bg-green-600 transition-all"
        >
          <Play className="w-4 h-4" />
          {t('eventLoop.visualizer.runAll')}
        </button>
        <button
          type="button"
          onClick={reset}
          data-testid="event-loop-reset"
          className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg font-medium text-sm hover:bg-gray-600 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          {t('eventLoop.visualizer.reset')}
        </button>
      </div>

      <div className="text-center text-sm font-medium text-gray-600 min-h-[24px]">
        {step > 0 && step <= steps.length && (
          <span>
            {t('eventLoop.visualizer.stepProgress', {
              step,
              total: steps.length,
              desc: steps[step - 1].desc,
            })}
          </span>
        )}
        {step === 0 && <span>{t('eventLoop.visualizer.clickToBegin')}</span>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 rounded-xl border border-blue-200 min-w-0">
          <h4 className="font-bold text-blue-900 mb-3 text-sm">Call Stack</h4>
          <div className="space-y-2 min-h-[100px]">
            <AnimatePresence>
              {callStack.map((task) => (
                <motion.div
                  key={task}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white p-2 rounded-lg shadow-sm text-xs font-mono break-all text-blue-900"
                >
                  {task}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="bg-linear-to-br from-purple-50 to-purple-100 p-3 rounded-xl border border-purple-200 min-w-0">
          <h4 className="font-bold text-purple-900 mb-3 text-sm">
            Microtask Queue
          </h4>
          <div className="space-y-2 min-h-[100px]">
            <AnimatePresence>
              {microtaskQueue.map((task) => (
                <motion.div
                  key={task}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white p-2 rounded-lg shadow-sm text-xs font-mono break-all text-purple-900"
                >
                  {task}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="bg-linear-to-br from-orange-50 to-orange-100 p-3 rounded-xl border border-orange-200 min-w-0">
          <h4 className="font-bold text-orange-900 mb-3 text-sm">
            Macrotask Queue
          </h4>
          <div className="space-y-2 min-h-[100px]">
            <AnimatePresence>
              {macrotaskQueue.map((task) => (
                <motion.div
                  key={task}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white p-2 rounded-lg shadow-sm text-xs font-mono break-all text-orange-900"
                >
                  {task}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono text-sm min-h-[120px]">
        <div className="text-gray-500 mb-2">
          {t('eventLoop.visualizer.consoleOutput')}
        </div>
        {output.map((line) => (
          <motion.div
            key={line}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            {line}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

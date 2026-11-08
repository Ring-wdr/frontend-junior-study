'use client';

import { motion } from 'motion/react';
import { ArrowRight, Database, Layout, RefreshCw, Send } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../../lib/utils';

const STEP_CENTERS = [12.5, 37.5, 62.5, 87.5] as const;

export const FluxFlowVisualizer = () => {
  const [activeStep, setActiveStep] = useState<0 | 1 | 2 | 3>(0);
  const [count, setCount] = useState(0);

  const steps = [
    { id: 'view', label: 'View', icon: Layout, color: 'bg-blue-500' },
    { id: 'action', label: 'Action', icon: Send, color: 'bg-green-500' },
    {
      id: 'dispatcher',
      label: 'Dispatcher',
      icon: ArrowRight,
      color: 'bg-yellow-500',
    },
    { id: 'store', label: 'Store', icon: Database, color: 'bg-purple-500' },
  ];

  const handleDispatch = async () => {
    if (activeStep !== 0) return;

    // View -> Action
    setActiveStep(1);
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Action -> Dispatcher
    setActiveStep(2);
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Dispatcher -> Store
    setActiveStep(3);
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Store -> View (Update)
    setCount((c) => c + 1);
    setActiveStep(0);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 overflow-hidden">
      <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
        <h4 className="font-semibold text-gray-900">Flux Data Flow Cycle</h4>
        <div className="text-sm font-mono bg-gray-100 px-3 py-1 rounded-full text-gray-600">
          Store Count:{' '}
          <span className="font-bold text-purple-600">{count}</span>
        </div>
      </div>

      <div className="relative grid grid-cols-4 py-6">
        <div className="absolute top-12 left-[12.5%] right-[12.5%] h-1 -translate-y-1/2 bg-gray-100" />
        <motion.div
          aria-hidden
          className="absolute top-12 -mt-2 -ml-2 w-4 h-4 bg-gray-900 rounded-full z-[5]"
          initial={false}
          animate={{
            left: `${STEP_CENTERS[activeStep]}%`,
            opacity: activeStep === 0 ? 0 : 1,
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {steps.map((step, index) => {
          const isActive = index === activeStep;

          return (
            <div
              key={step.id}
              className="relative flex flex-col items-center gap-2 min-w-0"
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  opacity: isActive || activeStep === 0 ? 1 : 0.4,
                }}
                transition={{ duration: 0.25 }}
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center text-white shadow-sm z-10',
                  step.color,
                )}
              >
                <step.icon size={20} />
              </motion.div>
              <span className="text-[11px] sm:text-xs font-semibold text-gray-600 truncate max-w-full">
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={handleDispatch}
          disabled={activeStep !== 0}
          className="flex items-center gap-2 px-5 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          {activeStep === 0 ? (
            <>
              Click to Dispatch
              <ArrowRight size={16} />
            </>
          ) : (
            <>
              Processing...
              <RefreshCw size={16} className="animate-spin" />
            </>
          )}
        </button>
      </div>

      <p className="text-center text-xs text-gray-500 mt-4 h-4">
        {activeStep === 0 && 'Waiting for user interaction...'}
        {activeStep === 1 && 'View creates an Action payload...'}
        {activeStep === 2 && 'Dispatcher receives Action...'}
        {activeStep === 3 && 'Store updates state & notifies View...'}
      </p>
    </div>
  );
};

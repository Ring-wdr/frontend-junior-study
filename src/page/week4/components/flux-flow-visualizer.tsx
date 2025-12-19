import { motion } from 'framer-motion';
import { ArrowRight, Database, Layout, RefreshCw, Send } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../../lib/utils';

export const FluxFlowVisualizer = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
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
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-semibold text-gray-900">Flux Data Flow Cycle</h4>
        <div className="text-sm font-mono bg-gray-100 px-3 py-1 rounded-full text-gray-600">
          Store Count:{' '}
          <span className="font-bold text-purple-600">{count}</span>
        </div>
      </div>

      <div className="relative flex justify-between items-center px-4 py-8">
        {/* Connecting Lines */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10" />

        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isNext = index === activeStep + 1;

          return (
            <div
              key={step.id}
              className="relative flex flex-col items-center gap-2"
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.2 : 1,
                  opacity: isActive || activeStep === 0 ? 1 : 0.4,
                }}
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg z-10 transition-colors duration-300',
                  step.color,
                )}
              >
                <step.icon size={20} />
              </motion.div>
              <span className="text-xs font-semibold text-gray-600">
                {step.label}
              </span>

              {isActive && index !== 3 && (
                <motion.div
                  layoutId="particle"
                  className="absolute top-4 left-1/2 w-4 h-4 bg-gray-900 rounded-full z-20"
                  initial={{ x: 0 }}
                  animate={{ x: '200%' }} // Rough estimate, visual only
                  transition={{ duration: 0.6, ease: 'linear' }}
                />
              )}
              {/* Special case return particle from Store to View */}
              {activeStep === 3 && index === 3 && (
                <motion.div
                  className="absolute top-4 left-1/2 w-4 h-4 bg-gray-900 rounded-full z-20"
                  initial={{ x: 0, y: 0 }}
                  animate={{ x: -300, y: -50, opacity: 0 }} // Fly back to start visually
                  transition={{ duration: 0.5 }}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={handleDispatch}
          disabled={activeStep !== 0}
          className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
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

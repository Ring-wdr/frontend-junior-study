import {
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Search,
  Shield,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useRef, useState } from 'react';
import { cn } from '../../../lib/utils';

type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
type FlowPhase = 'idle' | 'incoming' | 'analyzing' | 'classified' | 'action';

type ErrorCase = {
  message: string;
  severity: Severity;
  action: string;
};

const ERROR_CASES: ErrorCase[] = [
  {
    message: 'Network timeout on analytics endpoint',
    severity: 'LOW',
    action: 'Log only',
  },
  {
    message: 'Failed to load product thumbnail',
    severity: 'MEDIUM',
    action: 'Show fallback UI',
  },
  {
    message: 'Auth token expired during checkout',
    severity: 'HIGH',
    action: 'Alert + error page',
  },
  {
    message: 'Uncaught exception in root render',
    severity: 'CRITICAL',
    action: 'Emergency rollback',
  },
];

const SEVERITY_COLORS: Record<Severity, string> = {
  LOW: 'border-gray-300 bg-gray-100 text-gray-700',
  MEDIUM: 'border-yellow-300 bg-yellow-100 text-yellow-800',
  HIGH: 'border-orange-300 bg-orange-100 text-orange-800',
  CRITICAL: 'border-red-300 bg-red-100 text-red-800',
};

const SEVERITY_BTN_COLORS: Record<Severity, string> = {
  LOW: 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200',
  MEDIUM: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200',
  HIGH: 'bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200',
  CRITICAL: 'bg-red-100 text-red-700 hover:bg-red-200 border-red-200',
};

const PIPELINE_NODES = [
  { label: 'Error In', icon: AlertCircle, phase: 'incoming' as FlowPhase },
  { label: 'Analysis', icon: Search, phase: 'analyzing' as FlowPhase },
  { label: 'Severity', icon: Shield, phase: 'classified' as FlowPhase },
  { label: 'Action', icon: Zap, phase: 'action' as FlowPhase },
];

const PHASE_ORDER: FlowPhase[] = [
  'incoming',
  'analyzing',
  'classified',
  'action',
];

export const ErrorClassificationVisualizer = () => {
  const [selectedError, setSelectedError] = useState<number | null>(null);
  const [phase, setPhase] = useState<FlowPhase>('idle');
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimeouts = useCallback(() => {
    for (const t of timeoutsRef.current) clearTimeout(t);
    timeoutsRef.current = [];
  }, []);

  const runFlow = useCallback(
    (errorIndex: number) => {
      clearTimeouts();
      setSelectedError(errorIndex);
      setIsAnimating(true);
      setPhase('idle');

      const delays = [100, 700, 1400, 2100];
      const phases: FlowPhase[] = [
        'incoming',
        'analyzing',
        'classified',
        'action',
      ];

      for (let i = 0; i < phases.length; i++) {
        const t = setTimeout(() => {
          setPhase(phases[i]);
          if (i === phases.length - 1) {
            setIsAnimating(false);
          }
        }, delays[i]);
        timeoutsRef.current.push(t);
      }
    },
    [clearTimeouts],
  );

  const reset = () => {
    clearTimeouts();
    setSelectedError(null);
    setPhase('idle');
    setIsAnimating(false);
  };

  const currentError =
    selectedError !== null ? ERROR_CASES[selectedError] : null;
  const currentPhaseIndex = PHASE_ORDER.indexOf(phase);

  return (
    <div className="space-y-5">
      {/* Error Selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        {ERROR_CASES.map((err, i) => (
          <button
            key={err.message}
            type="button"
            onClick={() => runFlow(i)}
            disabled={isAnimating}
            className={cn(
              'px-3 py-2 rounded-lg text-xs font-semibold border transition-all disabled:opacity-50 disabled:cursor-not-allowed',
              SEVERITY_BTN_COLORS[err.severity],
            )}
          >
            {err.severity}: {err.message.split(' ').slice(0, 3).join(' ')}...
          </button>
        ))}
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200 transition-all"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Pipeline */}
      <div className="flex items-center justify-between px-2">
        {PIPELINE_NODES.map((node, i) => {
          const isReached = currentPhaseIndex >= i;
          const isCurrent = phase === node.phase;
          const Icon = node.icon;
          return (
            <div key={node.label} className="flex items-center">
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{
                    scale: isCurrent ? 1.15 : 1,
                    backgroundColor: isReached ? '#3b82f6' : '#e5e7eb',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                >
                  <Icon
                    className={cn(
                      'w-5 h-5',
                      isReached ? 'text-white' : 'text-gray-400',
                    )}
                  />
                </motion.div>
                <span
                  className={cn(
                    'text-[10px] font-semibold mt-1',
                    isReached ? 'text-blue-600' : 'text-gray-400',
                  )}
                >
                  {node.label}
                </span>
              </div>
              {i < PIPELINE_NODES.length - 1 && (
                <ArrowRight
                  className={cn(
                    'w-5 h-5 mx-1',
                    currentPhaseIndex > i ? 'text-blue-400' : 'text-gray-200',
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Detail Card */}
      <AnimatePresence mode="wait">
        {phase !== 'idle' && currentError && (
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl border border-gray-200 bg-white p-4"
          >
            {phase === 'incoming' && (
              <div className="text-center">
                <span className="text-xs font-semibold text-red-500 uppercase tracking-wide">
                  Error Received
                </span>
                <p className="text-sm text-gray-800 mt-1 font-mono">
                  {currentError.message}
                </p>
              </div>
            )}
            {phase === 'analyzing' && (
              <div className="text-center">
                <span className="text-xs font-semibold text-blue-500 uppercase tracking-wide">
                  Analyzing Error...
                </span>
                <div className="flex justify-center gap-1 mt-2">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 1,
                        delay: i * 0.2,
                      }}
                      className="w-2 h-2 rounded-full bg-blue-500"
                    />
                  ))}
                </div>
              </div>
            )}
            {phase === 'classified' && (
              <div className="text-center">
                <span className="text-xs font-semibold text-purple-500 uppercase tracking-wide">
                  Classified
                </span>
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={cn(
                    'inline-block mt-2 px-4 py-1.5 rounded-full border text-sm font-bold',
                    SEVERITY_COLORS[currentError.severity],
                  )}
                >
                  {currentError.severity}
                </motion.div>
              </div>
            )}
            {phase === 'action' && (
              <div className="text-center">
                <span className="text-xs font-semibold text-green-500 uppercase tracking-wide">
                  Action Taken
                </span>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm font-semibold text-gray-800 mt-1"
                >
                  {currentError.action}
                </motion.p>
                <p className="text-xs text-gray-500 mt-1">
                  Error: {currentError.message}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

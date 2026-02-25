import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useRef, useState } from 'react';
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Play,
  RotateCcw,
  Users,
} from 'lucide-react';
import { cn } from '../../../lib/utils';

type Mode = 'with-monitoring' | 'without-monitoring';
type Phase =
  | 'idle'
  | 'error-occurs'
  | 'detecting'
  | 'detected'
  | 'resolving'
  | 'resolved';

const MILESTONES = [
  { phase: 'error-occurs' as Phase, label: 'Error Occurs', icon: AlertTriangle, color: 'red' },
  { phase: 'detected' as Phase, label: 'Alert Fires', icon: Bell, color: 'orange' },
  { phase: 'resolving' as Phase, label: 'Team Responds', icon: Users, color: 'blue' },
  { phase: 'resolved' as Phase, label: 'Resolved', icon: CheckCircle, color: 'green' },
];

const TIMINGS = {
  'with-monitoring': {
    detect: 800,
    respond: 1600,
    resolve: 2400,
    mttd: '2 min',
    mttr: '5 min',
  },
  'without-monitoring': {
    detect: 2500,
    respond: 4500,
    resolve: 6500,
    mttd: '45 min',
    mttr: '3 hours',
  },
};

const PHASE_ORDER: Phase[] = [
  'error-occurs',
  'detecting',
  'detected',
  'resolving',
  'resolved',
];

const DOT_COLORS: Record<string, string> = {
  red: 'bg-red-500',
  orange: 'bg-orange-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
};

const DOT_RING_COLORS: Record<string, string> = {
  red: 'ring-red-200',
  orange: 'ring-orange-200',
  blue: 'ring-blue-200',
  green: 'ring-green-200',
};

export const IncidentTimelineVisualizer = () => {
  const [mode, setMode] = useState<Mode>('with-monitoring');
  const [phase, setPhase] = useState<Phase>('idle');
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimeouts = () => {
    for (const t of timeoutsRef.current) clearTimeout(t);
    timeoutsRef.current = [];
  };

  const triggerError = useCallback(() => {
    clearTimeouts();
    setIsAnimating(true);
    const timing = TIMINGS[mode];

    setPhase('error-occurs');

    const t1 = setTimeout(() => setPhase('detecting'), 400);
    const t2 = setTimeout(() => setPhase('detected'), timing.detect);
    const t3 = setTimeout(() => setPhase('resolving'), timing.respond);
    const t4 = setTimeout(() => {
      setPhase('resolved');
      setIsAnimating(false);
    }, timing.resolve);

    timeoutsRef.current = [t1, t2, t3, t4];
  }, [mode]);

  const reset = () => {
    clearTimeouts();
    setPhase('idle');
    setIsAnimating(false);
  };

  const handleModeChange = (newMode: Mode) => {
    reset();
    setMode(newMode);
  };

  const currentPhaseIndex = PHASE_ORDER.indexOf(phase);
  const timing = TIMINGS[mode];

  return (
    <div className="space-y-5">
      {/* Mode Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1 rounded-lg flex">
          <button
            type="button"
            onClick={() => handleModeChange('with-monitoring')}
            disabled={isAnimating}
            className={cn(
              'px-4 py-1.5 rounded-md text-sm font-medium transition-all disabled:cursor-not-allowed',
              mode === 'with-monitoring'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-900',
            )}
          >
            With Monitoring
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('without-monitoring')}
            disabled={isAnimating}
            className={cn(
              'px-4 py-1.5 rounded-md text-sm font-medium transition-all disabled:cursor-not-allowed',
              mode === 'without-monitoring'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-900',
            )}
          >
            Without Monitoring
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2 justify-center">
        <button
          type="button"
          onClick={triggerError}
          disabled={isAnimating}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-4 h-4" />
          Trigger Error
        </button>
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Timeline */}
      <div className="relative px-4">
        {/* Track */}
        <div className="absolute top-5 left-[calc(12.5%+8px)] right-[calc(12.5%+8px)] h-1 bg-gray-200 rounded-full">
          <motion.div
            className={cn(
              'h-full rounded-full',
              mode === 'with-monitoring' ? 'bg-blue-400' : 'bg-red-400',
            )}
            initial={{ width: '0%' }}
            animate={{
              width:
                phase === 'idle'
                  ? '0%'
                  : `${Math.min(((currentPhaseIndex + 1) / 4) * 100, 100)}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Milestone Nodes */}
        <div className="flex justify-between relative">
          {MILESTONES.map((milestone, i) => {
            const isReached =
              phase !== 'idle' && currentPhaseIndex >= PHASE_ORDER.indexOf(milestone.phase);
            const isCurrent = phase === milestone.phase;
            const Icon = milestone.icon;
            return (
              <div
                key={milestone.label}
                className="flex flex-col items-center w-1/4"
              >
                <motion.div
                  animate={{
                    scale: isCurrent ? 1.2 : 1,
                  }}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors',
                    isReached
                      ? `${DOT_COLORS[milestone.color]} ring-4 ${DOT_RING_COLORS[milestone.color]}`
                      : 'bg-gray-200',
                  )}
                >
                  <Icon
                    className={cn(
                      'w-4 h-4',
                      isReached ? 'text-white' : 'text-gray-400',
                    )}
                  />
                </motion.div>
                <span
                  className={cn(
                    'text-[10px] font-semibold mt-2 text-center',
                    isReached ? 'text-gray-800' : 'text-gray-400',
                  )}
                >
                  {milestone.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* MTTD / MTTR Cards */}
      <AnimatePresence>
        {phase === 'resolved' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-3"
          >
            <div
              className={cn(
                'rounded-xl border p-4 text-center',
                mode === 'with-monitoring'
                  ? 'border-blue-200 bg-blue-50'
                  : 'border-red-200 bg-red-50',
              )}
            >
              <span className="text-xs font-semibold text-gray-500 uppercase">
                MTTD
              </span>
              <motion.p
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={cn(
                  'text-xl font-bold mt-1',
                  mode === 'with-monitoring'
                    ? 'text-blue-700'
                    : 'text-red-700',
                )}
              >
                {timing.mttd}
              </motion.p>
              <span className="text-[10px] text-gray-500">
                Mean Time to Detect
              </span>
            </div>
            <div
              className={cn(
                'rounded-xl border p-4 text-center',
                mode === 'with-monitoring'
                  ? 'border-green-200 bg-green-50'
                  : 'border-orange-200 bg-orange-50',
              )}
            >
              <span className="text-xs font-semibold text-gray-500 uppercase">
                MTTR
              </span>
              <motion.p
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={cn(
                  'text-xl font-bold mt-1',
                  mode === 'with-monitoring'
                    ? 'text-green-700'
                    : 'text-orange-700',
                )}
              >
                {timing.mttr}
              </motion.p>
              <span className="text-[10px] text-gray-500">
                Mean Time to Resolve
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

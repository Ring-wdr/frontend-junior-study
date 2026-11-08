'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useRef, useState } from 'react';
import { AlertTriangle, Bell, BellRing, Hash, RotateCcw } from 'lucide-react';
import { cn } from '../../../lib/utils';

type AlertLevel = 'info' | 'warning' | 'critical';

type AlertNotification = {
  id: number;
  level: AlertLevel;
  message: string;
  channel: string;
};

const MAX_RATE = 15;

const SCALE_TICKS = [
  { value: 0, className: '' },
  { value: 1, className: 'text-green-500' },
  { value: 3, className: 'text-yellow-500' },
  { value: 5, className: 'text-orange-500' },
  { value: 10, className: 'text-red-500' },
  { value: 15, className: '' },
];

const ALERT_RULES: {
  threshold: number;
  level: AlertLevel;
  message: string;
  channel: string;
}[] = [
  {
    threshold: 1,
    level: 'info',
    message: 'Error rate above baseline',
    channel: '#monitoring',
  },
  {
    threshold: 3,
    level: 'warning',
    message: 'Error rate elevated - investigate',
    channel: '#alerts',
  },
  {
    threshold: 5,
    level: 'critical',
    message: 'Error rate critical - immediate action',
    channel: '#incidents',
  },
  {
    threshold: 10,
    level: 'critical',
    message: 'Service degradation - page on-call',
    channel: '#emergency',
  },
];

const LEVEL_STYLES: Record<
  AlertLevel,
  { border: string; bg: string; dot: string; badge: string }
> = {
  info: {
    border: 'border-l-green-500',
    bg: 'bg-green-50',
    dot: 'bg-green-500',
    badge: 'bg-green-100 text-green-700',
  },
  warning: {
    border: 'border-l-yellow-500',
    bg: 'bg-yellow-50',
    dot: 'bg-yellow-500',
    badge: 'bg-yellow-100 text-yellow-700',
  },
  critical: {
    border: 'border-l-red-500',
    bg: 'bg-red-50',
    dot: 'bg-red-500',
    badge: 'bg-red-100 text-red-700',
  },
};

export const AlertRuleVisualizer = () => {
  const [errorRate, setErrorRate] = useState(0.5);
  const [notifications, setNotifications] = useState<AlertNotification[]>([]);
  const nextIdRef = useRef(1);

  const applyRate = () => {
    const newNotifications: AlertNotification[] = [];
    for (const rule of ALERT_RULES) {
      if (errorRate >= rule.threshold) {
        newNotifications.push({
          id: nextIdRef.current++,
          level: rule.level,
          message: rule.message,
          channel: rule.channel,
        });
      }
    }
    setNotifications(newNotifications);
  };

  const reset = () => {
    setErrorRate(0.5);
    setNotifications([]);
  };

  const getSliderColor = () => {
    if (errorRate < 1) return 'accent-green-500';
    if (errorRate < 3) return 'accent-green-500';
    if (errorRate < 5) return 'accent-yellow-500';
    if (errorRate < 10) return 'accent-orange-500';
    return 'accent-red-500';
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700">
            Error Rate
          </span>
          <motion.span
            key={errorRate}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'inline-block text-lg font-bold font-mono tabular-nums',
              errorRate < 1
                ? 'text-green-600'
                : errorRate < 5
                  ? 'text-yellow-600'
                  : 'text-red-600',
            )}
          >
            {errorRate.toFixed(1)}%
          </motion.span>
        </div>
        <input
          type="range"
          min={0}
          max={MAX_RATE}
          step={0.5}
          value={errorRate}
          onChange={(e) => setErrorRate(Number(e.target.value))}
          className={cn(
            'w-full h-2 rounded-lg cursor-pointer',
            getSliderColor(),
          )}
        />
        <div className="relative h-3 text-[10px] text-gray-400 font-mono">
          {SCALE_TICKS.map((tick) => {
            const pct = (tick.value / MAX_RATE) * 100;
            return (
              <span
                key={tick.value}
                className={cn(
                  'absolute top-0',
                  tick.value === 0
                    ? ''
                    : tick.value === MAX_RATE
                      ? '-translate-x-full'
                      : '-translate-x-1/2',
                  tick.className,
                )}
                style={{ left: `${pct}%` }}
              >
                {tick.value}%
              </span>
            );
          })}
        </div>
      </div>

      <div className="flex gap-2 justify-center">
        <button
          type="button"
          onClick={applyRate}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all"
        >
          <BellRing className="w-4 h-4" />
          Check Alerts
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

      <div className="space-y-2">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Alert Rules
        </span>
        {ALERT_RULES.map((rule) => {
          const isActive = errorRate >= rule.threshold;
          const style = LEVEL_STYLES[rule.level];
          return (
            <motion.div
              key={rule.threshold}
              animate={{ opacity: isActive ? 1 : 0.35 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'border-l-4 rounded-r-lg p-3 flex items-center justify-between gap-2 transition-colors',
                isActive ? style.border : 'border-l-gray-200',
                isActive ? style.bg : 'bg-gray-50',
              )}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Bell
                  className={cn(
                    'w-3.5 h-3.5 shrink-0',
                    isActive ? 'text-gray-700' : 'text-gray-300',
                  )}
                />
                <span
                  className={cn(
                    'text-xs font-medium',
                    isActive ? 'text-gray-800' : 'text-gray-400',
                  )}
                >
                  {rule.message}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden sm:flex text-[10px] font-mono text-gray-400 items-center gap-0.5">
                  <Hash className="w-2.5 h-2.5" />
                  {rule.channel.slice(1)}
                </span>
                <span
                  className={cn(
                    'text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap',
                    isActive ? style.badge : 'bg-gray-100 text-gray-400',
                  )}
                >
                  &ge; {rule.threshold}%
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {notifications.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Notification Feed
          </span>
          <AnimatePresence>
            {notifications.map((notif, index) => {
              const style = LEVEL_STYLES[notif.level];
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.1 }}
                  className={cn(
                    'border-l-4 rounded-r-lg p-3 flex items-center gap-3',
                    style.border,
                    style.bg,
                  )}
                >
                  <span
                    className={cn('w-2 h-2 rounded-full shrink-0', style.dot)}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800">
                      {notif.message}
                    </p>
                    <span className="text-[10px] text-gray-500 font-mono">
                      Sent to {notif.channel}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {errorRate > 8 && notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3"
          >
            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
            <p className="text-xs text-red-700">
              <strong>Alert Fatigue Warning:</strong> Too many alerts firing
              simultaneously can desensitize the team. Consider tuning
              thresholds and using escalation policies.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

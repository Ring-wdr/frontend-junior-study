import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Bug, Code, FileWarning, Trash2, Wifi } from 'lucide-react';
import { cn } from '../../../lib/utils';

type ErrorEntry = {
  id: number;
  type: string;
  message: string;
  count: number;
  browser: string;
  release: string;
};

const ERROR_TEMPLATES = [
  {
    type: 'TypeError',
    message: "Cannot read property 'name' of undefined",
    browser: 'Chrome 120',
    release: 'v2.1.0',
    icon: Bug,
    color: 'bg-red-500',
    btnColor: 'bg-red-100 text-red-700 hover:bg-red-200 border-red-200',
  },
  {
    type: 'NetworkError',
    message: 'Failed to fetch /api/users',
    browser: 'Safari 17',
    release: 'v2.1.0',
    icon: Wifi,
    color: 'bg-orange-500',
    btnColor:
      'bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200',
  },
  {
    type: 'ReferenceError',
    message: 'handleClick is not defined',
    browser: 'Firefox 121',
    release: 'v2.0.8',
    icon: FileWarning,
    color: 'bg-yellow-500',
    btnColor:
      'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200',
  },
  {
    type: 'SyntaxError',
    message: 'Unexpected token < in JSON',
    browser: 'Chrome 120',
    release: 'v2.1.0',
    icon: Code,
    color: 'bg-purple-500',
    btnColor:
      'bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200',
  },
];

export const ErrorTrackerVisualizer = () => {
  const [errors, setErrors] = useState<ErrorEntry[]>([]);
  const [nextId, setNextId] = useState(1);

  const triggerError = (index: number) => {
    const template = ERROR_TEMPLATES[index];
    setErrors((prev) => {
      const existing = prev.find((e) => e.type === template.type);
      if (existing) {
        return prev.map((e) =>
          e.type === template.type ? { ...e, count: e.count + 1 } : e,
        );
      }
      return [
        ...prev,
        {
          id: nextId,
          type: template.type,
          message: template.message,
          count: 1,
          browser: template.browser,
          release: template.release,
        },
      ];
    });
    setNextId((prev) => prev + 1);
  };

  const totalErrors = errors.reduce((sum, e) => sum + e.count, 0);
  const maxCount = Math.max(...errors.map((e) => e.count), 1);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {ERROR_TEMPLATES.map((template, i) => {
          const Icon = template.icon;
          return (
            <button
              key={template.type}
              type="button"
              onClick={() => triggerError(i)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all',
                template.btnColor,
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {template.type}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setErrors([])}
          disabled={errors.length === 0}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear
        </button>
      </div>

      <div className="rounded-xl bg-gray-900 p-4 min-h-[180px]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Error Dashboard
          </span>
          {totalErrors > 0 && (
            <span className="text-xs font-mono text-gray-500">
              {totalErrors} total events
            </span>
          )}
        </div>

        {errors.length === 0 ? (
          <div className="flex items-center justify-center h-[120px] text-gray-600 text-sm">
            Trigger errors to see them grouped here
          </div>
        ) : (
          <AnimatePresence>
            <div className="space-y-2">
              {errors.map((error) => {
                const template = ERROR_TEMPLATES.find(
                  (t) => t.type === error.type,
                );
                return (
                  <motion.div
                    key={error.type}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 bg-gray-800 rounded-lg p-3"
                  >
                    <span
                      className={cn(
                        'shrink-0 px-2 py-0.5 rounded text-[10px] font-bold text-white',
                        template?.color,
                      )}
                    >
                      {error.type}
                    </span>
                    <span className="text-xs text-gray-300 truncate flex-1">
                      {error.message}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-gray-500 font-mono">
                        {error.browser}
                      </span>
                      <span className="text-[10px] text-gray-600 font-mono">
                        {error.release}
                      </span>
                      <motion.span
                        key={error.count}
                        initial={{ scale: 1.4 }}
                        animate={{ scale: 1 }}
                        className="bg-gray-700 text-gray-200 text-xs font-bold px-2 py-0.5 rounded-full min-w-[28px] text-center"
                      >
                        {error.count}
                      </motion.span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        )}
      </div>

      {errors.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Error Distribution
          </span>
          {errors.map((error) => {
            const template = ERROR_TEMPLATES.find(
              (t) => t.type === error.type,
            );
            const pct = (error.count / maxCount) * 100;
            return (
              <div key={error.type} className="flex items-center gap-3">
                <span className="text-xs text-gray-600 font-mono w-28 shrink-0">
                  {error.type}
                </span>
                <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                    className={cn('h-full rounded-full', template?.color)}
                  />
                </div>
                <span className="text-xs text-gray-500 font-mono w-8 text-right">
                  {error.count}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

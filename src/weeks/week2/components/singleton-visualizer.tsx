'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Box, RefreshCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { cn } from '../../../lib/utils';

type LogEntry = { kind: 'created' | 'returned'; id: string };

export const SingletonVisualizer = () => {
  const { t } = useTranslation('week2');
  const [instanceId, setInstanceId] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    },
    [],
  );

  const getInstance = () => {
    if (!instanceId) {
      const newId = Math.random().toString(36).substring(7).toUpperCase();
      setInstanceId(newId);
      setLog((prev) => [...prev, { kind: 'created', id: newId }]);
    } else {
      setLog((prev) => [...prev, { kind: 'returned', id: instanceId }]);
      setFlash(true);
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
      flashTimerRef.current = setTimeout(() => setFlash(false), 500);
    }
  };

  const reset = () => {
    setInstanceId(null);
    setLog([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={getInstance}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <Box className="w-4 h-4" />
              {t('creation.singleton.visualizer.getInstance')}
            </button>
            <button
              type="button"
              onClick={reset}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" />
              {t('creation.singleton.visualizer.reset')}
            </button>
          </div>

          <div className="h-32 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center relative overflow-hidden">
            <AnimatePresence>
              {instanceId && (
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{
                    scale: flash ? 1.1 : 1,
                    opacity: 1,
                    borderColor: flash ? '#9333ea' : '#e5e7eb',
                  }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={cn(
                    'w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center border-4',
                    flash
                      ? 'border-purple-500 shadow-purple-200'
                      : 'border-gray-200',
                  )}
                >
                  <Box className="w-8 h-8 text-purple-600" />
                </motion.div>
              )}
            </AnimatePresence>
            {instanceId && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-2 text-xs font-mono text-gray-500"
              >
                ID: {instanceId}
              </motion.div>
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1 h-40 bg-gray-900 sm:h-48 rounded-xl p-3 overflow-y-auto font-mono text-xs text-green-400 border border-gray-800">
          <div className="mb-2 text-gray-500 border-b border-gray-800 pb-1">
            {t('creation.singleton.visualizer.consoleLog')}
          </div>
          {log.map((entry, i) => (
            <div
              key={`${i}-${entry.kind}-${entry.id}`}
              className="mb-1 break-words"
            >
              <span className="text-gray-500 mr-2">{'>'}</span>
              {t(`creation.singleton.visualizer.logs.${entry.kind}`, {
                id: entry.id,
              })}
            </div>
          ))}
          {log.length === 0 && (
            <span className="text-gray-600 italic">
              {t('creation.singleton.visualizer.noActivity')}
            </span>
          )}
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-2">
        {t('creation.singleton.visualizer.note')}
      </div>
    </div>
  );
};

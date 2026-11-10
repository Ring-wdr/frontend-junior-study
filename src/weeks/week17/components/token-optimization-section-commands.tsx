'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { CodeBlock } from '../../../components/ui/code-block';

export const TokenOptimizationCommands = () => {
  const { t, raw } = useTranslation('week17');
  const commands = raw('tokenOptimization.commands');
  const [index, setIndex] = useState(0);
  const current = commands[index];

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-gray-700">
        {t('tokenOptimization.ui.goalLabel')}
      </p>
      <div className="flex flex-wrap gap-2">
        {commands.map((item, idx) => {
          const selected = idx === index;
          return (
            <button
              key={item.goal}
              type="button"
              aria-pressed={selected}
              onClick={() => setIndex(idx)}
              className={`min-w-0 rounded-full border px-3 py-1.5 text-left text-xs font-semibold break-words transition-colors ${
                selected
                  ? 'border-teal-600 bg-teal-600 text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.goal}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className="min-w-0"
        >
          <CodeBlock code={current.code} language="bash" className="text-xs" />
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
        <button
          type="button"
          onClick={() => setIndex(index - 1)}
          disabled={index === 0}
          className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
          {t('tokenOptimization.ui.prev')}
        </button>
        <span className="text-xs tabular-nums text-gray-500">
          {index + 1} / {commands.length}
        </span>
        <button
          type="button"
          onClick={() => setIndex(index + 1)}
          disabled={index === commands.length - 1}
          className="inline-flex items-center gap-1 rounded-md bg-teal-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t('tokenOptimization.ui.next')}
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

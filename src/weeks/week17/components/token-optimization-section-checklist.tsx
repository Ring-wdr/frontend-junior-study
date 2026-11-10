'use client';

import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';

export const TokenOptimizationChecklist = () => {
  const { t, raw } = useTranslation('week17');
  const items = raw('tokenOptimization.contextOptimizationChecklist');
  const [checked, setChecked] = useState<number[]>([]);

  const toggle = (index: number) =>
    setChecked((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  const complete = checked.length === items.length;

  return (
    <div>
      <p className="text-xs text-gray-600">
        {t('tokenOptimization.ui.checklistHint')}
      </p>
      <div className="mt-2 flex items-center justify-between gap-2 text-xs">
        <span className="text-gray-600">
          {t('tokenOptimization.ui.progress')}
        </span>
        <span className="font-bold text-green-700" aria-live="polite">
          {checked.length}/{items.length}
          <span className={complete ? '' : 'invisible'}>
            {' '}
            {t('tokenOptimization.ui.done')}
          </span>
        </span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full border border-green-100 bg-white">
        <motion.div
          initial={false}
          animate={{ width: `${(checked.length / items.length) * 100}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-green-500 to-teal-500"
        />
      </div>
      <ul className="mt-3 space-y-2">
        {items.map((item, index) => {
          const done = checked.includes(index);
          return (
            <li key={item}>
              <button
                type="button"
                aria-pressed={done}
                onClick={() => toggle(index)}
                className={`flex w-full items-start gap-2 rounded-lg border p-2.5 text-left text-sm transition-colors ${
                  done
                    ? 'border-green-300 bg-green-50 text-gray-600'
                    : 'border-gray-200 bg-white text-gray-800 hover:border-green-300'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                    done
                      ? 'border-green-600 bg-green-600 text-white'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {done && <Check className="h-3 w-3" />}
                </span>
                <span
                  className={`min-w-0 break-words ${done ? 'line-through' : ''}`}
                >
                  {item}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

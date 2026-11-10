'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';

interface ChooserProps {
  onGo: (topic: number) => void;
}

export const SkillsHooksChooser = ({ onGo }: ChooserProps) => {
  const { t, raw } = useTranslation('week17');
  const situations = raw('skillsHooks.chooser.situations');
  const [idx, setIdx] = useState(0);
  const current = situations[idx];

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-4">
      <h3 className="font-bold text-base text-gray-900">
        {t('skillsHooks.chooser.title')}
      </h3>
      <p className="mt-1 text-sm text-gray-600 leading-relaxed">
        {t('skillsHooks.chooser.hint')}
      </p>
      <fieldset className="m-0 mt-3 grid min-w-0 grid-cols-1 gap-2 border-0 p-0 sm:grid-cols-2">
        <legend className="sr-only">{t('skillsHooks.chooser.label')}</legend>
        {situations.map((s, i) => {
          const active = i === idx;
          return (
            <button
              key={s.label}
              type="button"
              aria-pressed={active}
              onClick={() => setIdx(i)}
              className={`min-w-0 break-words rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
                active
                  ? 'border-gray-800 bg-white font-bold text-gray-900'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </fieldset>
      <div aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="mt-3 rounded-lg border border-gray-800 bg-white p-3"
          >
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              {t('skillsHooks.chooser.answer')}
            </p>
            <p className="mt-0.5 break-words font-mono text-sm font-bold text-gray-900">
              {current.answer}
            </p>
            <p className="mt-2 break-words text-xs leading-relaxed text-gray-700">
              {current.reason}
            </p>
            <button
              type="button"
              onClick={() => onGo(current.topic)}
              className="mt-3 rounded-md bg-gray-800 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-900"
            >
              {t('skillsHooks.ui.goTo')}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

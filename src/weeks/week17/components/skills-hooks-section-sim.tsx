'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';

export const SkillsHooksSim = () => {
  const { t, raw } = useTranslation('week17');
  const results = raw('skillsHooks.hooks.sim.results');
  const [idx, setIdx] = useState(1);
  const result = results[idx];

  return (
    <div className="mt-4 rounded-xl border border-orange-200 bg-orange-50/40 p-3 sm:p-4">
      <h4 className="font-bold text-sm text-orange-800">
        {t('skillsHooks.hooks.sim.title')}
      </h4>
      <p className="mt-1 break-words text-xs leading-relaxed text-gray-700">
        {t('skillsHooks.hooks.sim.hint')}
      </p>
      <fieldset className="m-0 mt-3 grid min-w-0 grid-cols-1 gap-2 border-0 p-0 sm:grid-cols-3">
        <legend className="sr-only">{t('skillsHooks.hooks.sim.label')}</legend>
        {results.map((r, i) => {
          const active = i === idx;
          return (
            <button
              key={r.code}
              type="button"
              aria-pressed={active}
              onClick={() => setIdx(i)}
              className={`min-w-0 rounded-lg border px-3 py-2 text-left transition-colors ${
                active
                  ? 'border-orange-600 bg-white'
                  : 'border-orange-200 bg-white/60 hover:bg-white'
              }`}
            >
              <span className="block break-words font-mono text-xs font-bold text-gray-900">
                exit {r.code}
              </span>
              {i === 2 && (
                <span className="mt-0.5 block break-words text-[11px] text-gray-500">
                  {t('skillsHooks.hooks.sim.other')}
                </span>
              )}
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
            className={`mt-3 rounded-lg border p-3 ${
              result.blocked
                ? 'border-red-300 bg-red-50'
                : 'border-green-300 bg-green-50'
            }`}
          >
            <p
              className={`text-xs font-bold ${
                result.blocked ? 'text-red-800' : 'text-green-800'
              }`}
            >
              {result.blocked ? '■ ' : '▶ '}
              {t('skillsHooks.hooks.sim.codeWord')} {result.code}
              {' — '}
              {result.status}
            </p>
            <p className="mt-1 break-words text-xs leading-relaxed text-gray-700">
              {result.text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

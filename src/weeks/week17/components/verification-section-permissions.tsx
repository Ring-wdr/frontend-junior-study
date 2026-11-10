'use client';

import { Check, ChevronRight, Minus, RotateCcw } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { CodeBlock } from '../../../components/ui/code-block';

const ORDER = ['deny', 'ask', 'allow'] as const;

const TONES = {
  deny: {
    row: 'border-red-200 bg-red-50',
    chip: 'border-red-300 bg-white text-red-800',
    hit: 'border-red-600 bg-red-600 text-white',
    badge: 'bg-red-600 text-white',
  },
  ask: {
    row: 'border-orange-200 bg-orange-50',
    chip: 'border-orange-300 bg-white text-orange-800',
    hit: 'border-orange-600 bg-orange-600 text-white',
    badge: 'bg-orange-600 text-white',
  },
  allow: {
    row: 'border-green-200 bg-green-50',
    chip: 'border-green-300 bg-white text-green-800',
    hit: 'border-green-600 bg-green-600 text-white',
    badge: 'bg-green-600 text-white',
  },
};

export const VerificationPermissions = () => {
  const { t, raw } = useTranslation('week17');
  const rules = raw('verification.permissions.rules');
  const actions = raw('verification.permissions.sim.actions');
  const status = raw('verification.permissions.sim.status');
  const results = raw('verification.permissions.sim.results');
  const [actionIdx, setActionIdx] = useState(0);
  const [step, setStep] = useState<number>(ORDER.length);

  const action = actions[actionIdx];
  const matchIdx = ORDER.findIndex((group) =>
    rules[group].includes(action.rule),
  );
  const shown = Math.min(step, matchIdx + 1);
  const done = shown >= matchIdx + 1;
  const outcome = ORDER[matchIdx];

  const pick = (idx: number) => {
    setActionIdx(idx);
    setStep(0);
  };

  return (
    <div className="space-y-4">
      <CodeBlock
        code={t('verification.permissions.code')}
        language="json"
        className="text-xs"
      />

      <div className="rounded-lg border border-gray-200 bg-white p-3">
        <p className="mb-2 text-xs font-semibold text-gray-600">
          {t('verification.permissions.sim.actionsLabel')}
        </p>
        <div className="flex flex-wrap gap-2">
          {actions.map((item, idx) => {
            const active = idx === actionIdx;
            return (
              <button
                key={item.label}
                type="button"
                aria-pressed={active}
                onClick={() => pick(idx)}
                className={`min-w-0 break-words rounded-full border px-3 py-1.5 text-left text-xs font-semibold transition-colors ${
                  active
                    ? 'border-gray-800 bg-gray-800 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <p className="mt-3 break-all rounded-md bg-gray-100 px-2 py-1.5 font-mono text-xs text-gray-700">
          {action.rule}
        </p>

        <h4 className="mt-4 mb-2 text-sm font-bold text-gray-800">
          {t('verification.permissions.sim.stepsTitle')}
        </h4>
        <ol className="space-y-2">
          {ORDER.map((group, idx) => {
            const tone = TONES[group];
            const evaluated = idx < shown;
            const hit = evaluated && idx === matchIdx;
            const skipped = done && idx > matchIdx;
            const current = evaluated && idx === shown - 1;
            const label = hit
              ? status.match
              : evaluated
                ? status.noMatch
                : skipped
                  ? status.skipped
                  : status.pending;
            return (
              <li
                key={group}
                aria-current={current ? 'step' : undefined}
                className={`min-w-0 rounded-lg border p-2 transition-all ${tone.row} ${
                  evaluated ? '' : 'opacity-50'
                } ${current ? 'ring-2 ring-gray-800' : ''}`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold tabular-nums border border-current">
                    {idx + 1}
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-xs font-bold ${tone.badge}`}
                  >
                    {group}
                  </span>
                  <span className="inline-flex min-w-0 items-center gap-1 text-xs text-gray-700">
                    {hit ? (
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    <span className="min-w-0 break-words">{label}</span>
                  </span>
                </div>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {rules[group].map((rule) => (
                    <li
                      key={rule}
                      className={`break-all rounded border px-1.5 py-0.5 font-mono text-xs ${
                        hit && rule === action.rule ? tone.hit : tone.chip
                      }`}
                    >
                      {rule}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setStep(shown + 1)}
            disabled={done}
            className="inline-flex items-center gap-1 rounded-md bg-gray-800 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t('verification.permissions.sim.nextStep')}
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setStep(ORDER.length)}
            disabled={done}
            className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t('verification.permissions.sim.showAll')}
          </button>
          <button
            type="button"
            onClick={() => setStep(0)}
            className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            {t('verification.permissions.sim.replay')}
          </button>
        </div>

        <div aria-live="polite" className="mt-3 min-h-12">
          <AnimatePresence mode="wait">
            {done && (
              <motion.div
                key={`${actionIdx}-${outcome}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className={`flex flex-wrap items-center gap-2 rounded-lg border p-3 ${TONES[outcome].row}`}
              >
                <span className="text-xs font-semibold text-gray-700">
                  {t('verification.permissions.sim.resultTitle')}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-bold ${TONES[outcome].badge}`}
                >
                  {results[outcome]}
                </span>
                <span className="min-w-0 break-all font-mono text-xs text-gray-700">
                  {t('verification.permissions.sim.matchedRule')}: {action.rule}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

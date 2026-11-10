'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { StablePanels } from '../../../components/ui/stable-panels';

const SLOT_IDS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'];
const SLOTS = SLOT_IDS.length;

export const TokenOptimizationGauge = () => {
  const { t } = useTranslation('week17');
  const [history, setHistory] = useState(0);
  const [requests, setRequests] = useState(0);

  const send = () => {
    setHistory((prev) => Math.min(prev + 1, SLOTS - 1));
    setRequests((prev) => prev + 1);
  };
  const clear = () => setHistory(0);
  const compact = () => setHistory((prev) => Math.floor(prev / 3));
  const reset = () => {
    setHistory(0);
    setRequests(0);
  };

  const buttonBase =
    'rounded-md px-3 py-1.5 text-xs font-medium transition-colors';

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={send}
          className={`${buttonBase} bg-teal-600 text-white hover:bg-teal-700`}
        >
          {t('tokenOptimization.ui.send')}
        </button>
        <button
          type="button"
          onClick={compact}
          disabled={history === 0}
          className={`${buttonBase} bg-teal-100 font-mono text-teal-800 hover:bg-teal-200 disabled:cursor-not-allowed disabled:opacity-40`}
        >
          {t('tokenOptimization.ui.compact')}
        </button>
        <button
          type="button"
          onClick={clear}
          disabled={history === 0}
          className={`${buttonBase} bg-teal-100 font-mono text-teal-800 hover:bg-teal-200 disabled:cursor-not-allowed disabled:opacity-40`}
        >
          {t('tokenOptimization.ui.clear')}
        </button>
        <button
          type="button"
          onClick={reset}
          className={`${buttonBase} bg-gray-100 text-gray-700 hover:bg-gray-200`}
        >
          {t('tokenOptimization.ui.reset')}
        </button>
        <span className="ml-auto text-xs tabular-nums text-gray-600">
          {t('tokenOptimization.ui.requests')}: {requests}
        </span>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-700">
          {t('tokenOptimization.ui.gaugeName')}
        </p>
        <div
          role="img"
          aria-label={`${t('tokenOptimization.ui.gaugeName')} (${t('tokenOptimization.ui.relative')})`}
          className="mt-1.5 flex h-8 gap-0.5 rounded-md border border-teal-200 bg-white p-1"
        >
          {SLOT_IDS.map((id, slot) => {
            const filled = slot < history;
            const isNew = slot === history;
            let tone = 'bg-gray-100';
            if (filled) tone = 'bg-teal-500';
            else if (isNew) tone = 'bg-amber-400';
            return (
              <motion.div
                key={id}
                initial={false}
                animate={{ opacity: filled || isNew ? 1 : 0.6 }}
                transition={{ duration: 0.2 }}
                className={`min-w-0 flex-1 rounded-sm ${tone}`}
              />
            );
          })}
        </div>
        <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-600">
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-sm bg-teal-500" aria-hidden />
            {t('tokenOptimization.ui.history')}
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-sm bg-amber-400" aria-hidden />
            {t('tokenOptimization.ui.newRequest')}
          </span>
        </div>
      </div>

      <div aria-live="polite" className="space-y-1 text-sm text-gray-700">
        <StablePanels index={history === 0 ? 0 : 1}>
          <p key="empty">{t('tokenOptimization.ui.empty')}</p>
          <p key="resend">{t('tokenOptimization.ui.resend')}</p>
        </StablePanels>
        <p
          className={`text-xs text-gray-600 ${
            history >= SLOTS - 1 ? '' : 'invisible'
          }`}
        >
          {t('tokenOptimization.ui.full')}
        </p>
        <p className="font-semibold text-teal-800">
          {t('tokenOptimization.ui.keepSmall')}
        </p>
        <p className="text-[11px] text-gray-500">
          {t('tokenOptimization.ui.relative')}
        </p>
      </div>
    </div>
  );
};

'use client';

import { Check } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { Pager } from './mcp-servers-section-pager';
import { Rich } from './mcp-servers-section-rich';

export const McpServersStart = () => {
  const { t, raw } = useTranslation('week17');
  const steps = raw('mcpServers.start.steps');
  const [current, setCurrent] = useState(0);

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-700 leading-relaxed">
        {t('mcpServers.start.hint')}
      </p>
      <Pager
        index={current}
        total={steps.length}
        onChange={setCurrent}
        prevLabel={t('mcpServers.ui.prev')}
        nextLabel={t('mcpServers.ui.next')}
      />
      <ol aria-label={t('mcpServers.start.stepsLabel')} className="space-y-2">
        {steps.map((step, idx) => {
          const active = idx === current;
          const done = idx < current;
          return (
            <li key={step}>
              <button
                type="button"
                aria-current={active ? 'step' : undefined}
                onClick={() => setCurrent(idx)}
                className={`flex w-full min-w-0 items-start gap-3 rounded-lg border p-2.5 text-left text-xs font-medium leading-relaxed transition-colors ${
                  active
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                    : done
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                    active
                      ? 'bg-indigo-600 text-white'
                      : done
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {done ? (
                    <Check className="h-3 w-3" aria-hidden="true" />
                  ) : (
                    idx + 1
                  )}
                </span>
                <span className="min-w-0 break-words">
                  <Rich text={step} />
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

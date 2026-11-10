'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { StablePanels } from '../../../components/ui/stable-panels';
import { Pager } from './mcp-servers-section-pager';
import { Rich } from './mcp-servers-section-rich';

export const McpServersShifts = () => {
  const { t, raw } = useTranslation('week17');
  const shifts = raw('mcpServers.shifts.items');
  const [idx, setIdx] = useState(0);

  return (
    <div className="space-y-3">
      <fieldset className="m-0 grid min-w-0 border-0 p-0 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <legend className="sr-only">{t('mcpServers.shifts.pickLabel')}</legend>
        {shifts.map((item, i) => {
          const active = i === idx;
          return (
            <button
              key={item.title}
              type="button"
              aria-pressed={active}
              onClick={() => setIdx(i)}
              className={`flex min-w-0 items-start gap-2 rounded-lg border px-3 py-2 text-left text-xs font-semibold transition-colors ${
                active
                  ? 'border-purple-500 bg-purple-50 text-purple-900'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span
                className={`mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] ${
                  active
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {i + 1}
              </span>
              <span className="min-w-0 break-words">{item.title}</span>
            </button>
          );
        })}
      </fieldset>

      <Pager
        index={idx}
        total={shifts.length}
        onChange={setIdx}
        prevLabel={t('mcpServers.ui.prev')}
        nextLabel={t('mcpServers.ui.next')}
      />

      <div className="rounded-xl border border-purple-200 bg-white p-3 sm:p-4">
        <StablePanels index={idx}>
          {shifts.map((shift) => (
            <div key={shift.title} className="min-w-0">
              <h4 className="font-bold text-sm text-purple-900">
                {shift.title}
              </h4>
              <p className="mt-2 break-words text-sm text-gray-700 leading-relaxed">
                <Rich text={shift.body} />
              </p>
              {shift.bullets.length > 0 && (
                <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-gray-700 leading-relaxed">
                  {shift.bullets.map((bullet) => (
                    <li key={bullet} className="break-words">
                      <Rich text={bullet} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </StablePanels>
      </div>
    </div>
  );
};

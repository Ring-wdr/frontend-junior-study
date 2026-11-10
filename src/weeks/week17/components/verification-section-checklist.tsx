'use client';

import { CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';

export const VerificationChecklist = () => {
  const { t, raw } = useTranslation('week17');
  const items = raw('verification.checklist.items');
  const [checked, setChecked] = useState<string[]>([]);

  const toggle = (item: string) => {
    setChecked((prev) =>
      prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item],
    );
  };

  const count = items.filter((item) => checked.includes(item)).length;
  const complete = count === items.length;

  return (
    <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
      <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-orange-700">
        <CheckCircle className="h-4 w-4" aria-hidden="true" />
        {t('verification.checklist.boxTitle')}
      </h4>

      <div className="mb-3">
        <div className="flex items-center justify-between gap-2 text-xs text-orange-800">
          <span>{t('verification.checklist.progress')}</span>
          <span className="tabular-nums font-semibold">
            {count} / {items.length}
          </span>
        </div>
        <div
          role="progressbar"
          aria-label={t('verification.checklist.progress')}
          aria-valuemin={0}
          aria-valuemax={items.length}
          aria-valuenow={count}
          className="mt-1 h-2 overflow-hidden rounded-full bg-orange-100"
        >
          <div
            className={`h-full rounded-full transition-all ${
              complete ? 'bg-green-600' : 'bg-orange-500'
            }`}
            style={{ width: `${(count / items.length) * 100}%` }}
          />
        </div>
      </div>

      <ul className="space-y-2">
        {items.map((item) => {
          const done = checked.includes(item);
          return (
            <li key={item}>
              <label
                className={`flex min-w-0 cursor-pointer items-start gap-2 rounded-lg border bg-white p-2 text-sm leading-relaxed transition-colors ${
                  done
                    ? 'border-orange-400 text-gray-900'
                    : 'border-orange-200 text-orange-900'
                }`}
              >
                <input
                  type="checkbox"
                  checked={done}
                  onChange={() => toggle(item)}
                  className="mt-1 shrink-0"
                />
                <span
                  className={`min-w-0 break-words ${done ? 'line-through' : ''}`}
                >
                  {item}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <output
          className={`text-xs font-semibold text-green-700 ${
            complete ? '' : 'invisible'
          }`}
        >
          {t('verification.checklist.done')}
        </output>
        <button
          type="button"
          onClick={() => setChecked([])}
          disabled={count === 0}
          className="rounded-md bg-white px-3 py-1.5 text-xs font-medium text-orange-800 border border-orange-200 hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t('verification.checklist.reset')}
        </button>
      </div>
    </div>
  );
};

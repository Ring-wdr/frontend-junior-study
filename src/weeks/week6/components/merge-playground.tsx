'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from '@/i18n/client';
import { cn } from '../../../lib/utils';

const SHEET_ORDER = [
  'bg-blue-500',
  'bg-red-500',
  'p-6',
  'px-2',
  'px-4',
  'px-6',
  'py-2',
] as const;

type Utility = (typeof SHEET_ORDER)[number];
type Property = 'paddingInline' | 'paddingBlock' | 'background';

const EFFECTS: Record<Utility, Partial<Record<Property, string>>> = {
  'bg-blue-500': { background: 'blue-500' },
  'bg-red-500': { background: 'red-500' },
  'p-6': { paddingInline: '24px', paddingBlock: '24px' },
  'px-2': { paddingInline: '8px' },
  'px-4': { paddingInline: '16px' },
  'px-6': { paddingInline: '24px' },
  'py-2': { paddingBlock: '8px' },
};

const BASE: Utility[] = ['px-4', 'py-2', 'bg-red-500'];
const OVERRIDES: Utility[] = ['bg-blue-500', 'p-6', 'px-2', 'px-6'];
const PROPERTIES: Property[] = ['paddingInline', 'paddingBlock', 'background'];

const BACKGROUNDS: Record<string, string> = {
  'blue-500': 'bg-blue-500',
  'red-500': 'bg-red-500',
};

const resolve = (classes: string[]) => {
  const result = {} as Record<Property, string>;
  for (const utility of SHEET_ORDER) {
    if (classes.includes(utility)) Object.assign(result, EFFECTS[utility]);
  }
  return result;
};

const intended = (classes: Utility[]) => {
  const result = {} as Record<Property, string>;
  for (const utility of classes) Object.assign(result, EFFECTS[utility]);
  return result;
};

export const MergePlayground = () => {
  const { t } = useTranslation('week6');
  const [overrides, setOverrides] = useState<Utility[]>([]);

  const toggle = (utility: Utility) => {
    setOverrides(
      overrides.includes(utility)
        ? overrides.filter((item) => item !== utility)
        : [...overrides, utility],
    );
  };

  const concatenated = [...BASE, ...overrides].join(' ');
  const merged = twMerge(BASE.join(' '), overrides.join(' '));
  const goal = intended([...BASE, ...overrides]);
  const strategies = [
    {
      id: 'concat',
      label: t('merging.playground.concat'),
      value: concatenated,
    },
    { id: 'merged', label: t('merging.playground.merged'), value: merged },
  ];

  return (
    <div className="space-y-4" data-testid="merge-playground">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <div className="mb-2 text-xs font-semibold text-gray-500">
            {t('merging.playground.base')}
          </div>
          <code className="block rounded-lg bg-gray-900 px-3 py-2 font-mono text-xs text-gray-100">
            {BASE.join(' ')}
          </code>
        </div>
        <fieldset className="m-0 min-w-0 border-0 p-0">
          <legend className="mb-2 text-xs font-semibold text-gray-500">
            {t('merging.playground.overrides')}
          </legend>
          <div className="flex flex-wrap gap-2">
            {OVERRIDES.map((utility) => {
              const active = overrides.includes(utility);
              return (
                <button
                  key={utility}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggle(utility)}
                  data-testid={`merge-override-${utility}`}
                  className={cn(
                    'rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
                    active
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                  )}
                >
                  {utility}
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      {overrides.length === 0 && (
        <p className="text-sm text-gray-500">{t('merging.playground.none')}</p>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" aria-live="polite">
        {strategies.map((strategy) => {
          const applied = resolve(strategy.value.split(' '));
          const wrong = PROPERTIES.some((key) => applied[key] !== goal[key]);
          return (
            <div
              key={strategy.id}
              data-testid={`merge-result-${strategy.id}`}
              data-correct={!wrong}
              className={cn(
                'min-w-0 space-y-3 rounded-lg border-2 p-3',
                wrong
                  ? 'border-red-300 bg-red-50'
                  : 'border-green-300 bg-green-50',
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold text-gray-900">
                  {strategy.label}
                </span>
                <span
                  className={cn(
                    'rounded px-1.5 py-0.5 text-xs font-semibold',
                    wrong
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800',
                  )}
                >
                  {wrong
                    ? t('merging.playground.ignored')
                    : t('merging.playground.ok')}
                </span>
              </div>
              <div>
                <div className="mb-1 text-xs text-gray-600">
                  {t('merging.playground.classes')}
                </div>
                <code
                  data-testid={`merge-classes-${strategy.id}`}
                  className="block rounded bg-gray-900 px-2 py-1.5 font-mono text-xs break-words text-gray-100"
                >
                  {strategy.value}
                </code>
              </div>
              <dl className="space-y-1 text-xs">
                {PROPERTIES.map((key) => (
                  <div
                    key={key}
                    className="flex flex-wrap justify-between gap-x-2"
                  >
                    <dt className="text-gray-600">
                      {t(`merging.playground.${key}`)}
                    </dt>
                    <dd
                      data-testid={`merge-${strategy.id}-${key}`}
                      className={cn(
                        'font-mono font-semibold',
                        applied[key] === goal[key]
                          ? 'text-gray-900'
                          : 'text-red-700',
                      )}
                    >
                      {applied[key]}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="flex min-h-20 items-center justify-center rounded-md bg-white">
                <span
                  className={cn(
                    'rounded-md text-sm font-semibold text-white transition-all',
                    BACKGROUNDS[applied.background],
                  )}
                  style={{
                    paddingInline: applied.paddingInline,
                    paddingBlock: applied.paddingBlock,
                  }}
                >
                  {t('merging.playground.preview')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-gray-600">
        <span className="font-semibold">
          {t('merging.playground.sheetOrder')}:
        </span>{' '}
        <span className="font-mono">
          {SHEET_ORDER.map((utility) => `.${utility}`).join(' → ')}
        </span>
      </div>
    </div>
  );
};

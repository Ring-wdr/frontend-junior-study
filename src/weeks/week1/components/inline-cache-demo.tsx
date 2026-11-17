'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

const CODE = `function getX(o) {
  return o.x; // one access site, one inline cache
}`;

const SHAPES = [
  { map: 'HC2', shape: '{ x, y }', offset: 0 },
  { map: 'HC1', shape: '{ x }', offset: 0 },
  { map: 'HC4', shape: '{ y, x }', offset: 1 },
  { map: 'HC6', shape: '{ x, y, z }', offset: 0 },
  { map: 'HC8', shape: '{ id, x }', offset: 1 },
  { map: 'HC11', shape: '{ a, b, x }', offset: 2 },
];

const MAX_POLYMORPHIC = 4;

type IcState = 'uninitialized' | 'monomorphic' | 'polymorphic' | 'megamorphic';

const getState = (seen: number): IcState => {
  if (seen === 0) return 'uninitialized';
  if (seen === 1) return 'monomorphic';
  if (seen <= MAX_POLYMORPHIC) return 'polymorphic';
  return 'megamorphic';
};

const stateStyles: Record<IcState, string> = {
  uninitialized: 'border-gray-200 bg-gray-50 text-gray-800',
  monomorphic: 'border-green-200 bg-green-50 text-green-900',
  polymorphic: 'border-orange-200 bg-orange-50 text-orange-900',
  megamorphic: 'border-red-200 bg-red-50 text-red-900',
};

const buttonClass =
  'rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500';

export const InlineCacheDemo = () => {
  const { t } = useTranslation('week1');
  const [seen, setSeen] = useState(0);
  const [calls, setCalls] = useState(0);
  const state = getState(seen);
  const exhausted = seen >= SHAPES.length;

  const callSame = () => {
    setSeen((value) => Math.max(value, 1));
    setCalls((value) => value + 1);
  };

  const callNew = () => {
    setSeen((value) => Math.min(value + 1, SHAPES.length));
    setCalls((value) => value + 1);
  };

  const reset = () => {
    setSeen(0);
    setCalls(0);
  };

  return (
    <div className="space-y-4" data-testid="inline-cache-demo">
      <CodeBlock code={CODE} className="text-xs" />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={callSame}
          data-testid="ic-call-same"
          className={cn(
            buttonClass,
            'bg-green-600 text-white hover:bg-green-700',
          )}
        >
          {t('optimization.inlineCache.callSame')}
        </button>
        <button
          type="button"
          onClick={callNew}
          disabled={exhausted}
          data-testid="ic-call-new"
          className={cn(
            buttonClass,
            exhausted
              ? 'cursor-not-allowed bg-gray-100 text-gray-400'
              : 'bg-orange-600 text-white hover:bg-orange-700',
          )}
        >
          {t('optimization.inlineCache.callNew')}
        </button>
        <button
          type="button"
          onClick={reset}
          data-testid="ic-reset"
          className={cn(
            buttonClass,
            'bg-gray-600 text-white hover:bg-gray-700',
          )}
        >
          {t('optimization.inlineCache.reset')}
        </button>
      </div>

      <div
        aria-live="polite"
        className={cn('rounded-lg border p-3 text-sm', stateStyles[state])}
      >
        <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
          <span className="font-semibold">
            {t('optimization.inlineCache.state')}:{' '}
            <span data-testid="ic-state">
              {t(`optimization.inlineCache.states.${state}.label`)}
            </span>
          </span>
          <span className="text-xs">
            {t('optimization.inlineCache.calls', { count: calls })}
          </span>
        </div>
        <p>{t(`optimization.inlineCache.states.${state}.desc`)}</p>
      </div>

      <div>
        <div className="mb-2 text-xs font-semibold text-gray-500">
          {t('optimization.inlineCache.cache')}
        </div>
        {seen === 0 && (
          <p className="text-xs text-gray-500">
            {t('optimization.inlineCache.cacheEmpty')}
          </p>
        )}
        {state === 'megamorphic' ? (
          <p
            data-testid="ic-overflow"
            className="rounded-lg border border-dashed border-red-300 bg-red-50 px-3 py-2 text-xs text-red-800"
          >
            {t('optimization.inlineCache.overflow')}
          </p>
        ) : (
          <ul className="space-y-1.5" data-testid="ic-entries">
            {SHAPES.slice(0, seen).map((entry) => (
              <li
                key={entry.map}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 font-mono text-xs"
              >
                <span className="font-semibold text-gray-900">
                  {entry.map} {entry.shape}
                </span>
                <span className="text-gray-600">
                  {t('optimization.inlineCache.offset', {
                    offset: entry.offset,
                  })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

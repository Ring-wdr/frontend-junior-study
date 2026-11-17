'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { cn } from '../../../lib/utils';

type ComponentName = 'Button' | 'Card' | 'Badge';

const ATOMS: Record<string, string> = {
  'display: inline-flex': 'x3nfvp2',
  'display: flex': 'x78zum5',
  'align-items: center': 'x6s0dn4',
  'padding-inline: 16px': 'x1hr3lfm',
  'padding-inline: 8px': 'xdqyycr',
  'padding-block: 8px': 'x1vvogim',
  'padding: 16px': 'x1tamke2',
  'border-radius: 8px': 'xur7f20',
  'font-weight: 600': 'x1s688f',
  'color: white': 'x1awj2ng',
  'color: black': 'x1mqxbix',
  'background-color: blue': 'x1t391ir',
  'background-color: white': 'x12peec7',
};

const COMPONENTS: Record<ComponentName, string[]> = {
  Button: [
    'display: inline-flex',
    'align-items: center',
    'padding-inline: 16px',
    'padding-block: 8px',
    'border-radius: 8px',
    'font-weight: 600',
    'color: white',
    'background-color: blue',
  ],
  Card: [
    'display: flex',
    'align-items: center',
    'padding: 16px',
    'border-radius: 8px',
    'color: black',
    'background-color: white',
  ],
  Badge: [
    'display: inline-flex',
    'align-items: center',
    'padding-inline: 8px',
    'border-radius: 8px',
    'font-weight: 600',
    'color: white',
    'background-color: blue',
  ],
};

const NAMES: ComponentName[] = ['Button', 'Card', 'Badge'];

export const AtomicMapDemo = () => {
  const { t } = useTranslation('week6');
  const [selected, setSelected] = useState<ComponentName[]>(['Button']);

  const toggle = (name: ComponentName) => {
    setSelected(
      selected.includes(name)
        ? selected.filter((item) => item !== name)
        : NAMES.filter((item) => item === name || selected.includes(item)),
    );
  };

  const usage = new Map<string, number>();
  for (const name of selected) {
    for (const declaration of COMPONENTS[name]) {
      usage.set(declaration, (usage.get(declaration) ?? 0) + 1);
    }
  }
  const written = selected.reduce(
    (sum, name) => sum + COMPONENTS[name].length,
    0,
  );
  const atomic = usage.size;

  return (
    <div className="space-y-4" data-testid="atomic-map-demo">
      <fieldset className="m-0 flex min-w-0 flex-wrap gap-2 border-0 p-0">
        <legend className="sr-only">{t('merging.atomic.toggleLabel')}</legend>
        {NAMES.map((name) => {
          const active = selected.includes(name);
          return (
            <button
              key={name}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(name)}
              data-testid={`atomic-toggle-${name}`}
              className={cn(
                'rounded-lg px-3 py-1.5 font-mono text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
                active
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
              )}
            >
              {'<'}
              {name}
              {' />'}
            </button>
          );
        })}
      </fieldset>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" aria-live="polite">
        <div className="rounded-lg border border-gray-200 bg-white p-3">
          <div className="text-xs font-semibold text-gray-500">
            {t('merging.atomic.scoped')}
          </div>
          <div className="mt-1 text-sm text-gray-700">
            {t('merging.atomic.rules')}
          </div>
          <div
            className="font-mono text-2xl font-bold text-gray-900"
            data-testid="atomic-scoped-count"
          >
            {written}
          </div>
        </div>
        <div className="rounded-lg border-2 border-green-300 bg-green-50 p-3">
          <div className="text-xs font-semibold text-green-800">
            {t('merging.atomic.atomic')}
          </div>
          <div className="mt-1 text-sm text-green-900">
            {t('merging.atomic.rules')}
          </div>
          <div className="flex flex-wrap items-baseline gap-2">
            <span
              className="font-mono text-2xl font-bold text-green-900"
              data-testid="atomic-count"
            >
              {atomic}
            </span>
            <span className="text-xs text-green-800">
              {t('merging.atomic.saved')}:{' '}
              <span data-testid="atomic-saved">{written - atomic}</span>
            </span>
          </div>
        </div>
      </div>

      {selected.length === 0 ? (
        <p className="text-sm text-gray-500">{t('merging.atomic.empty')}</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div className="min-w-0">
            <div className="mb-2 text-xs font-semibold text-gray-500">
              {t('merging.atomic.map')}
            </div>
            <pre
              data-testid="atomic-map"
              className="not-prose max-h-72 overflow-auto rounded-lg bg-[#1e1e1e] p-3 font-mono text-xs leading-5 text-gray-200"
            >
              {selected
                .map(
                  (name) =>
                    `${name.toLowerCase()}: {\n${COMPONENTS[name]
                      .map(
                        (declaration) =>
                          `  ${declaration.split(':')[0]}: '${ATOMS[declaration]}',`,
                      )
                      .join('\n')}\n}`,
                )
                .join(',\n')}
            </pre>
          </div>
          <div className="min-w-0">
            <div className="mb-2 text-xs font-semibold text-gray-500">
              {t('merging.atomic.sheet')}
            </div>
            <ul
              data-testid="atomic-sheet"
              className="max-h-72 space-y-1 overflow-auto"
            >
              {[...usage].map(([declaration, count]) => (
                <li
                  key={declaration}
                  className={cn(
                    'flex flex-wrap items-center justify-between gap-x-2 rounded-md border px-2 py-1 font-mono text-xs',
                    count > 1
                      ? 'border-green-300 bg-green-50 text-green-900'
                      : 'border-gray-200 bg-white text-gray-800',
                  )}
                >
                  <span>
                    .{ATOMS[declaration]} {'{ '}
                    {declaration}
                    {' }'}
                  </span>
                  {count > 1 && (
                    <span className="font-sans font-semibold">
                      {t('merging.atomic.usedBy', { count })}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-600">{t('merging.atomic.hint')}</p>
    </div>
  );
};

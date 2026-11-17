'use client';

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { cn } from '../../../lib/utils';

type Theme = 'light' | 'dark';
type Primitive = 'white' | 'gray-50' | 'gray-900' | 'blue-600' | 'blue-400';
type Semantic = 'background' | 'foreground' | 'primary';

const PRIMITIVES: Record<Primitive, { swatch: string; text: string }> = {
  white: { swatch: 'bg-white', text: 'text-white' },
  'gray-50': { swatch: 'bg-gray-50', text: 'text-gray-50' },
  'gray-900': { swatch: 'bg-gray-900', text: 'text-gray-900' },
  'blue-600': { swatch: 'bg-blue-600', text: 'text-blue-600' },
  'blue-400': { swatch: 'bg-blue-400', text: 'text-blue-400' },
};

const SEMANTIC: Record<Theme, Record<Semantic, Primitive>> = {
  light: { background: 'white', foreground: 'gray-900', primary: 'blue-600' },
  dark: { background: 'gray-900', foreground: 'gray-50', primary: 'blue-400' },
};

const COMPONENT: [string, Semantic][] = [
  ['card-bg', 'background'],
  ['card-text', 'foreground'],
  ['button-bg', 'primary'],
  ['button-text', 'background'],
];

const THEMES: Theme[] = ['light', 'dark'];
const SEMANTIC_NAMES: Semantic[] = ['background', 'foreground', 'primary'];

const Swatch = ({ name }: { name: Primitive }) => (
  <span
    aria-hidden="true"
    className={cn(
      'inline-block h-3.5 w-3.5 shrink-0 rounded-sm border border-gray-300',
      PRIMITIVES[name].swatch,
    )}
  />
);

export const TokenTierDemo = () => {
  const { t } = useTranslation('week6');
  const [theme, setTheme] = useState<Theme>('light');
  const semantic = SEMANTIC[theme];

  return (
    <div className="space-y-4" data-testid="token-tier-demo">
      <fieldset className="m-0 flex min-w-0 flex-wrap gap-2 border-0 p-0">
        <legend className="sr-only">
          {t('designSystem.tiers.demo.themeLabel')}
        </legend>
        {THEMES.map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={theme === name}
            onClick={() => setTheme(name)}
            data-testid={`token-theme-${name}`}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
              theme === name
                ? 'bg-gray-900 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            )}
          >
            {t(`designSystem.tiers.demo.${name}`)}
          </button>
        ))}
      </fieldset>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-2.5">
          <div className="mb-2 text-xs font-semibold text-gray-500">
            {t('designSystem.tiers.demo.primitive')}
          </div>
          <ul className="space-y-1.5 font-mono text-xs text-gray-800">
            {Object.keys(PRIMITIVES).map((name) => (
              <li key={name} className="flex items-center gap-2">
                <Swatch name={name as Primitive} />
                {name}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border-2 border-blue-300 bg-blue-50 p-2.5">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-blue-900">
            {t('designSystem.tiers.demo.semantic')}
            <span className="rounded bg-blue-100 px-1.5 py-0.5 font-normal">
              {t('designSystem.tiers.demo.changed')}
            </span>
          </div>
          <ul className="space-y-1.5 font-mono text-xs text-gray-800">
            {SEMANTIC_NAMES.map((name) => (
              <li
                key={name}
                data-testid={`token-semantic-${name}`}
                className="flex flex-wrap items-center gap-1.5"
              >
                {name}
                <ArrowRight aria-hidden="true" className="h-3 w-3" />
                <Swatch name={semantic[name]} />
                <span className="font-semibold">{semantic[name]}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-2.5">
          <div className="mb-2 text-xs font-semibold text-gray-500">
            {t('designSystem.tiers.demo.component')}
          </div>
          <ul className="space-y-1.5 font-mono text-xs text-gray-800">
            {COMPONENT.map(([name, target]) => (
              <li key={name} className="flex flex-wrap items-center gap-1.5">
                {name}
                <ArrowRight aria-hidden="true" className="h-3 w-3" />
                {target}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <div className="mb-2 text-xs font-semibold text-gray-500">
          {t('designSystem.tiers.demo.preview')}
        </div>
        <div
          data-testid="token-preview"
          className={cn(
            'flex items-center justify-between gap-3 rounded-lg border border-gray-300 p-3 transition-colors',
            PRIMITIVES[semantic.background].swatch,
            PRIMITIVES[semantic.foreground].text,
          )}
        >
          <span className="text-sm font-medium">card-bg / card-text</span>
          <span
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-semibold transition-colors',
              PRIMITIVES[semantic.primary].swatch,
              PRIMITIVES[semantic.background].text,
            )}
          >
            {t('designSystem.tiers.demo.previewText')}
          </span>
        </div>
      </div>

      <p className="text-xs text-gray-600">
        {t('designSystem.tiers.demo.hint')}
      </p>
    </div>
  );
};

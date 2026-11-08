'use client';

import { Search, User } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { cn } from '../../../lib/utils';

type ThemeColor = 'blue' | 'green' | 'purple' | 'orange';
type BorderRadius = 'rounded-none' | 'rounded-md' | 'rounded-full';

const THEME_COLORS = ['blue', 'green', 'purple', 'orange'] as const;
const RADII = ['rounded-none', 'rounded-md', 'rounded-full'] as const;

const colors: Record<ThemeColor, string> = {
  blue: 'bg-blue-600 hover:bg-blue-700 text-white',
  green: 'bg-green-600 hover:bg-green-700 text-white',
  purple: 'bg-purple-600 hover:bg-purple-700 text-white',
  orange: 'bg-orange-600 hover:bg-orange-700 text-white',
};

const ringColors: Record<ThemeColor, string> = {
  blue: 'focus:ring-blue-500',
  green: 'focus:ring-green-500',
  purple: 'focus:ring-purple-500',
  orange: 'focus:ring-orange-500',
};

interface ThemeProps {
  color: ThemeColor;
  radius: BorderRadius;
}

const ButtonAtom = ({
  children,
  className,
  color,
  radius,
}: ThemeProps & {
  children: ReactNode;
  className?: string;
}) => (
  <button
    type="button"
    className={cn(
      'shrink-0 px-4 py-2 font-medium transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1',
      colors[color],
      radius,
      ringColors[color],
      className,
    )}
  >
    {children}
  </button>
);

const InputAtom = ({
  placeholder,
  color,
  radius,
}: ThemeProps & { placeholder: string }) => (
  <input
    type="text"
    placeholder={placeholder}
    className={cn(
      'min-w-0 px-4 py-2 border border-gray-300 w-full transition-all duration-200 focus:outline-none focus:ring-2',
      radius,
      ringColors[color],
    )}
  />
);

const SearchFormMolecule = (theme: ThemeProps) => {
  const { t } = useTranslation('week3');
  return (
    <div className="flex gap-2 w-full max-w-sm">
      <InputAtom
        placeholder={t('atomic.visualizer.searchPlaceholder')}
        {...theme}
      />
      <ButtonAtom {...theme}>
        <Search className="w-4 h-4" />
      </ButtonAtom>
    </div>
  );
};

const HeaderOrganism = (theme: ThemeProps) => {
  const { t } = useTranslation('week3');
  return (
  <div
    className={cn(
      'w-full p-3 border bg-white shadow-sm flex items-center justify-between gap-3 transition-all duration-200 sm:p-4',
      theme.radius === 'rounded-full' ? 'rounded-2xl' : theme.radius,
    )}
  >
    <div className="font-bold text-gray-800 flex items-center gap-2">
      <div
        className={cn(
          'w-8 h-8 flex items-center justify-center transition-all duration-200',
          colors[theme.color],
          theme.radius,
        )}
      >
        <span className="text-xs">{t('atomic.visualizer.logo')}</span>
      </div>
      <span>MyApp</span>
    </div>
    <div className="hidden lg:block flex-1 max-w-xs">
      <SearchFormMolecule {...theme} />
    </div>
    <div className="flex items-center gap-2">
      <ButtonAtom {...theme} className="text-xs px-3">
        {t('atomic.visualizer.logIn')}
      </ButtonAtom>
      <div
        className={cn(
          'w-8 h-8 bg-gray-200 flex items-center justify-center transition-all duration-200',
          theme.radius,
        )}
      >
        <User className="w-4 h-4 text-gray-500" />
      </div>
    </div>
  </div>
  );
};

export const AtomicDesignVisualizer = () => {
  const { t } = useTranslation('week3');
  const [color, setColor] = useState<ThemeColor>('blue');
  const [radius, setRadius] = useState<BorderRadius>('rounded-md');
  const theme = { color, radius };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white p-3 rounded-xl border border-gray-200 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between sm:p-4">
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">
            {t('atomic.visualizer.controlsTitle')}
          </h4>
          <p className="text-sm text-gray-500">
            {t('atomic.visualizer.controlsDescription')}
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="space-y-1">
            <span className="block text-xs uppercase font-semibold text-gray-500">
              {t('atomic.visualizer.color')}
            </span>
            <div className="flex gap-2">
              {THEME_COLORS.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  className={cn(
                    'w-6 h-6 rounded-full transition-transform hover:scale-110',
                    c === 'blue'
                      ? 'bg-blue-600'
                      : c === 'green'
                        ? 'bg-green-600'
                        : c === 'purple'
                          ? 'bg-purple-600'
                          : 'bg-orange-600',
                    color === c ? 'ring-2 ring-offset-2 ring-gray-400' : '',
                  )}
                />
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <span className="block text-xs uppercase font-semibold text-gray-500">
              {t('atomic.visualizer.radius')}
            </span>
            <div className="flex text-xs bg-gray-100 p-1 rounded-lg">
              {RADII.map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRadius(r)}
                  className={cn(
                    'px-2 py-1 rounded transition-all',
                    radius === r
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700',
                  )}
                >
                  {r.split('-')[1]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Level 1: Atom */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {t('atomic.visualizer.levelAtom')}
          </div>
          <div className="bg-gray-50 border border-dashed border-gray-200 p-4 rounded-xl flex items-center justify-center h-28">
            <ButtonAtom {...theme}>{t('atomic.visualizer.button')}</ButtonAtom>
          </div>
        </div>

        {/* Level 2: Molecule */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {t('atomic.visualizer.levelMolecule')}
          </div>
          <div className="bg-gray-50 border border-dashed border-gray-200 p-4 rounded-xl flex items-center justify-center h-28 w-full">
            <SearchFormMolecule {...theme} />
          </div>
        </div>

        {/* Level 3: Organism */}
        <div className="col-span-1 sm:col-span-2 space-y-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {t('atomic.visualizer.levelOrganism')}
          </div>
          <div className="bg-gray-100 border border-gray-200 p-3 rounded-xl sm:p-6">
            <HeaderOrganism {...theme} />
          </div>
        </div>
      </div>
    </div>
  );
};

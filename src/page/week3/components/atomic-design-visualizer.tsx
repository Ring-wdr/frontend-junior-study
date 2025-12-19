import { AnimatePresence, motion } from 'framer-motion';
import { Search, User } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../../lib/utils';

type ThemeColor = 'blue' | 'green' | 'purple' | 'orange';
type BorderRadius = 'rounded-none' | 'rounded-md' | 'rounded-full';

export const AtomicDesignVisualizer = () => {
  const [color, setColor] = useState<ThemeColor>('blue');
  const [radius, setRadius] = useState<BorderRadius>('rounded-md');

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

  // Atom: Button
  const ButtonAtom = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <motion.button
      layout
      className={cn(
        'px-4 py-2 font-medium transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1',
        colors[color],
        radius,
        ringColors[color],
        className,
      )}
    >
      {children}
    </motion.button>
  );

  // Atom: Input
  const InputAtom = ({ placeholder }: { placeholder: string }) => (
    <motion.input
      layout
      type="text"
      placeholder={placeholder}
      className={cn(
        'px-4 py-2 border border-gray-300 w-full transition-all focus:outline-none focus:ring-2',
        radius,
        ringColors[color],
      )}
    />
  );

  // Molecule: Search Form
  const SearchFormMolecule = () => (
    <div className="flex gap-2 w-full max-w-sm">
      <InputAtom placeholder="Search..." />
      <ButtonAtom>
        <Search className="w-4 h-4" />
      </ButtonAtom>
    </div>
  );

  // Organism: Header
  const HeaderOrganism = () => (
    <div
      className={cn(
        'w-full p-4 border bg-white shadow-sm flex items-center justify-between gap-4',
        radius === 'rounded-full' ? 'rounded-2xl' : radius,
      )}
    >
      <div className="font-bold text-gray-800 flex items-center gap-2">
        <div
          className={cn(
            'w-8 h-8 flex items-center justify-center',
            colors[color],
            radius,
          )}
        >
          <span className="text-xs">Logo</span>
        </div>
        <span>MyApp</span>
      </div>
      <div className="hidden sm:block flex-1 max-w-xs">
        <SearchFormMolecule />
      </div>
      <div className="flex items-center gap-2">
        <ButtonAtom className="text-xs px-3">Log In</ButtonAtom>
        <div
          className={cn(
            'w-8 h-8 bg-gray-200 flex items-center justify-center',
            radius,
          )}
        >
          <User className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">
            Design System Controls
          </h4>
          <p className="text-sm text-gray-500">
            Change Atoms to update the entire UI.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="space-y-1">
            <label className="text-xs uppercase font-semibold text-gray-500">
              Color
            </label>
            <div className="flex gap-2">
              {(Object.keys(colors) as ThemeColor[]).map((c) => (
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
            <label className="text-xs uppercase font-semibold text-gray-500">
              Radius
            </label>
            <div className="flex text-xs bg-gray-100 p-1 rounded-lg">
              {(
                ['rounded-none', 'rounded-md', 'rounded-full'] as BorderRadius[]
              ).map((r) => (
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Level 1: Atom */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Level 1: Atom
          </div>
          <div className="bg-gray-50 border border-gray-200 dashed p-6 rounded-xl flex items-center justify-center h-32">
            <ButtonAtom>Button</ButtonAtom>
          </div>
        </div>

        {/* Level 2: Molecule */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Level 2: Molecule
          </div>
          <div className="bg-gray-50 border border-gray-200 dashed p-6 rounded-xl flex items-center justify-center h-32 w-full">
            <SearchFormMolecule />
          </div>
        </div>

        {/* Level 3: Organism */}
        <div className="col-span-1 md:col-span-3 space-y-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Level 3: Organism
          </div>
          <div className="bg-gray-100 border border-gray-200 p-8 rounded-xl">
            <HeaderOrganism />
          </div>
        </div>
      </div>
    </div>
  );
};

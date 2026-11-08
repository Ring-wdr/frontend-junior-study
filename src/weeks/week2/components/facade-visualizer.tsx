'use client';

import { motion } from 'motion/react';
import { Film, Lightbulb, Moon, Thermometer, Volume2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

const BAR_TRANSITION = { duration: 0.5, ease: 'easeOut' } as const;

export const FacadeVisualizer = () => {
  const { t } = useTranslation('week2');
  const [lights, setLights] = useState(100);
  const [temp, setTemp] = useState(24);
  const [volume, setVolume] = useState(0);

  const activateMovieMode = () => {
    setLights(20);
    setTemp(22);
    setVolume(50);
  };

  const activateSleepMode = () => {
    setLights(0);
    setTemp(20);
    setVolume(0);
  };

  const generateCode = () => {
    return `const smartHome = new SmartHomeFacade();

// One call triggers complex subsystem logic
smartHome.movieMode(); 
// -> Lights dim to 20%
// -> AC set to 22°C
// -> TV Volume up to 50%`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 sm:gap-4">
        <button
          type="button"
          onClick={activateMovieMode}
          className="flex-1 p-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2 text-sm font-medium hover:bg-indigo-700 active:scale-95 transition-all"
        >
          <Film className="w-4 h-4" />{' '}
          {t('structural.facade.visualizer.movieMode')}
        </button>
        <button
          type="button"
          onClick={activateSleepMode}
          className="flex-1 p-3 bg-gray-800 text-white rounded-lg flex items-center justify-center gap-2 text-sm font-medium hover:bg-gray-900 active:scale-95 transition-all"
        >
          <Moon className="w-4 h-4" />{' '}
          {t('structural.facade.visualizer.sleepMode')}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 bg-gray-50 p-3 rounded-xl border border-gray-200 sm:gap-4 sm:p-4">
        {/* Lights */}
        <div className="flex min-w-0 flex-col items-center gap-2">
          <div
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 sm:w-12 sm:h-12',
              lights > 0
                ? 'bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.6)]'
                : 'bg-gray-300',
            )}
          >
            <Lightbulb
              className={cn(
                'w-6 h-6 transition-colors',
                lights > 0 ? 'text-white' : 'text-gray-500',
              )}
            />
          </div>
          <div className="text-xs font-semibold text-gray-600">
            {t('structural.facade.visualizer.lights', { value: lights })}
          </div>
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-yellow-400"
              initial={false}
              transition={BAR_TRANSITION}
              animate={{ width: `${lights}%` }}
            />
          </div>
        </div>

        {/* Temp */}
        <div className="flex min-w-0 flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-blue-100 sm:w-12 sm:h-12 flex items-center justify-center text-blue-600">
            <Thermometer className="w-6 h-6" />
          </div>
          <div className="text-xs font-semibold text-gray-600">
            {t('structural.facade.visualizer.ac', { value: temp })}
          </div>
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500"
              initial={false}
              transition={BAR_TRANSITION}
              animate={{ width: `${(temp / 30) * 100}%` }}
            />
          </div>
        </div>

        {/* Audio */}
        <div className="flex min-w-0 flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-green-100 sm:w-12 sm:h-12 flex items-center justify-center text-green-600">
            <Volume2 className="w-6 h-6" />
          </div>
          <div className="text-xs font-semibold text-gray-600">
            {t('structural.facade.visualizer.volume', { value: volume })}
          </div>
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-green-500"
              initial={false}
              transition={BAR_TRANSITION}
              animate={{ width: `${volume}%` }}
            />
          </div>
        </div>
      </div>

      <CodeBlock code={generateCode()} className="text-xs" />
    </div>
  );
};

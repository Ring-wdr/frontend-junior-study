'use client';

import { AlertTriangle, Image as ImageIcon, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from '@/i18n/client';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

export const OptimizationVisualizer = () => {
  const { t } = useTranslation('week5');
  const [mode, setMode] = useState<'bad' | 'good'>('bad');
  const [loading, setLoading] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [clsScore, setClsScore] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    for (const id of timers.current) clearTimeout(id);
    timers.current = [];
  };

  useEffect(() => {
    const pending = timers.current;
    return () => {
      for (const id of pending) clearTimeout(id);
    };
  }, []);

  const reset = () => {
    clearTimers();
    setLoading(false);
    setContentVisible(false);
    setImageLoaded(false);
    setClsScore(0);
  };

  const startDemo = () => {
    reset();
    setLoading(true);

    timers.current.push(
      setTimeout(() => {
        setContentVisible(true);
      }, 500),
      setTimeout(() => {
        setImageLoaded(true);
        setLoading(false);
        if (mode === 'bad') {
          setClsScore(0.25);
        }
      }, 1500),
    );
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 my-6 space-y-4 sm:space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            {t('optimization.visualizer.title')}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {t('optimization.visualizer.subtitle')}
          </p>
        </div>
        <div className="flex flex-wrap bg-gray-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => {
              setMode('bad');
              reset();
            }}
            className={cn(
              'px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
              mode === 'bad'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-900',
            )}
          >
            {t('optimization.visualizer.unoptimized')}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('good');
              reset();
            }}
            className={cn(
              'px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
              mode === 'good'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-900',
            )}
          >
            {t('optimization.visualizer.optimized')}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={startDemo}
          disabled={loading || imageLoaded}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? t('optimization.visualizer.loading')
            : imageLoaded
              ? t('optimization.visualizer.reloadToTry')
              : t('optimization.visualizer.loadContent')}
        </button>
        {clsScore > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 text-sm text-red-600 font-bold"
          >
            <AlertTriangle className="w-5 h-5" />
            {t('optimization.visualizer.clsDetected', { score: clsScore })}
          </motion.div>
        )}
        {mode === 'good' && imageLoaded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 text-sm text-green-600 font-bold"
          >
            <Zap className="w-5 h-5" />
            {t('optimization.visualizer.stableLayout')}
          </motion.div>
        )}
      </div>

      <div className="border-4 border-gray-800 rounded-xl overflow-hidden bg-gray-50 relative h-[360px] sm:h-[400px] shadow-md">
        <div className="bg-white border-b p-3 sm:p-4 shadow-sm z-10 relative">
          <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 max-w-lg mx-auto">
          {contentVisible && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="space-y-2"
            >
              <div className="text-xl sm:text-2xl font-bold text-gray-900">
                {t('optimization.visualizer.beautifulLandscapes')}
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {t('optimization.visualizer.description1')}
              </p>
            </motion.div>
          )}

          {contentVisible && (
            <div className={cn(mode === 'good' && 'relative')}>
              {mode === 'good' ? (
                <div className="aspect-video w-full bg-gray-200 rounded-lg relative overflow-hidden">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <ImageIcon className="w-8 h-8 animate-pulse" />
                    </div>
                  )}
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670&auto=format&fit=crop"
                    className={cn(
                      'absolute inset-0 w-full h-full object-cover transition-opacity duration-500',
                      imageLoaded ? 'opacity-100' : 'opacity-0',
                    )}
                    alt={t('optimization.visualizer.imageAlt')}
                  />
                </div>
              ) : (
                imageLoaded && (
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670&auto=format&fit=crop"
                    className="w-full rounded-lg shadow-md"
                    alt={t('optimization.visualizer.imageAlt')}
                  />
                )
              )}
            </div>
          )}

          {contentVisible && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
              className="text-sm sm:text-base text-gray-600 leading-relaxed"
            >
              {t('optimization.visualizer.description2')}
            </motion.p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
        <p>
          <Trans t={t} i18nKey="optimization.visualizer.whyItMatters" />
        </p>
      </div>

      <CodeBlock
        code={
          mode === 'bad'
            ? `// ❌ Unoptimized: Causes CLS
<img 
  src="/hero.jpg" 
  alt="Landscape" 
/>`
            : `// ✅ Optimized: Zero CLS
import Image from 'next/image';

<Image 
  src="/hero.jpg" 
  alt="Landscape"
  width={800} 
  height={450} // Aspect ratio reserved
  placeholder="blur" // Optional blur-up
/>`
        }
        className="text-xs"
      />
    </div>
  );
};

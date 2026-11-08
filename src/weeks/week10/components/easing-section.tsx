'use client';

import gsap from 'gsap';
import { Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { SectionCard } from '../../../components/section-card';
import { cn } from '../../../lib/utils';
import { prefersReducedMotion } from '../utils/reduced-motion';

const easings = [
  'none',
  'power1.out',
  'power2.out',
  'power3.out',
  'power4.out',
  'back.out(1.7)',
  'elastic.out(1, 0.3)',
  'bounce.out',
  'steps(5)',
] as const;

type Easing = (typeof easings)[number];

export function EasingSection() {
  const { t } = useTranslation('week10');
  const trackRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [selectedEasing, setSelectedEasing] = useState<Easing>('power2.out');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new ResizeObserver(() => {
      const tween = tweenRef.current;
      if (!tween) return;
      const progress = tween.progress();
      tween.invalidate().progress(progress);
    });
    observer.observe(track);

    return () => {
      observer.disconnect();
      tweenRef.current?.kill();
      tweenRef.current = null;
    };
  }, []);

  const runAnimation = () => {
    const track = trackRef.current;
    const box = boxRef.current;
    if (isPlaying || !track || !box) return;
    setIsPlaying(true);

    tweenRef.current?.kill();
    tweenRef.current = gsap.fromTo(
      box,
      { x: 0 },
      {
        x: () => track.clientWidth - box.offsetWidth,
        duration: prefersReducedMotion() ? 0 : 1.5,
        ease: selectedEasing,
        onComplete: () => setIsPlaying(false),
      },
    );
  };

  return (
    <SectionCard description={t('easing.description')}>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">
            {t('easing.selectEasing')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {easings.map((ease) => (
              <button
                type="button"
                key={ease}
                onClick={() => setSelectedEasing(ease)}
                aria-pressed={selectedEasing === ease}
                className={cn(
                  'px-2.5 py-1 text-xs sm:text-sm rounded-lg border transition-colors duration-150',
                  selectedEasing === ease
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50',
                )}
              >
                {ease}
              </button>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-3 sm:p-4">
          <div className="mb-6 flex justify-end">
            <button
              type="button"
              onClick={runAnimation}
              disabled={isPlaying}
              className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white text-sm rounded-full font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 active:scale-95"
            >
              <Play size={16} fill="currentColor" />
              {isPlaying ? t('easing.animating') : t('easing.runAnimation')}
            </button>
          </div>

          <div
            ref={trackRef}
            className="relative mr-[25%] border-r-2 border-dashed border-gray-300"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgb(0 0 0 / 0.08) 1px, transparent 1px)',
              backgroundSize: '20% 100%',
            }}
          >
            <div
              ref={boxRef}
              className="w-14 h-14 bg-linear-to-br from-indigo-500 to-violet-600 rounded-xl shadow-md flex items-center justify-center text-white font-bold text-xs"
            >
              BOX
            </div>
          </div>

          <div className="mt-4 mr-[25%] flex justify-between text-xs text-gray-400 font-mono">
            <span>{t('easing.start')}</span>
            <span>{t('easing.end')}</span>
          </div>
        </div>

        <pre className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-xl text-xs sm:text-sm overflow-x-auto">
          {`gsap.to(".box", {
  x: 300,
  duration: 1.5,
  ease: "${selectedEasing}"
});`}
        </pre>
      </div>
    </SectionCard>
  );
}

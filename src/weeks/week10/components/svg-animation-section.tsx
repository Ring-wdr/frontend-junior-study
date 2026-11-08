'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RotateCcw } from 'lucide-react';
import { useId, useLayoutEffect, useRef } from 'react';
import { Trans, useTranslation } from '@/i18n/client';
import { REDUCED_MOTION_QUERY } from '../utils/reduced-motion';

gsap.registerPlugin(ScrollTrigger);

const WAVE_PATH = 'M20,75 C20,75 50,20 90,75 S 150,130 190,75 S 260,20 280,75';

export function SvgAnimationSection() {
  const { t } = useTranslation('week10');
  const titleId = useId();
  const stageRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const path = pathRef.current;
    const circle = circleRef.current;
    if (!stage || !path || !circle) return;

    const mm = gsap.matchMedia();
    mm.add(
      {
        reduce: REDUCED_MOTION_QUERY,
        full: '(prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const reduce = Boolean(context.conditions?.reduce);
        const length = path.getTotalLength();

        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        const tl = gsap
          .timeline({ paused: true })
          .to(path, {
            strokeDashoffset: 0,
            duration: reduce ? 0 : 2,
            ease: 'power2.inOut',
          })
          .from(circle, {
            scale: 0,
            opacity: 0,
            transformOrigin: '50% 50%',
            duration: reduce ? 0 : 0.5,
            ease: 'back.out(1.7)',
          });
        timelineRef.current = tl;

        ScrollTrigger.create({
          trigger: stage,
          start: 'top 80%',
          once: true,
          onEnter: () => tl.play(),
        });

        return () => {
          timelineRef.current = null;
        };
      },
    );

    return () => mm.revert();
  }, []);

  const replay = () => {
    timelineRef.current?.restart();
  };

  return (
    <div className="mt-4 space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <p className="text-sm leading-relaxed text-gray-600 sm:text-base min-w-0">
          <Trans
            t={t}
            i18nKey="svg.description"
            components={{ code: <code /> }}
          />
        </p>
        <button
          type="button"
          onClick={replay}
          className="flex shrink-0 items-center gap-2 self-start px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors duration-150 text-sm font-medium"
        >
          <RotateCcw size={16} />
          {t('svg.replay')}
        </button>
      </div>

      <div
        ref={stageRef}
        className="flex justify-center px-3 py-6 sm:py-8 bg-gray-50 rounded-xl border border-gray-100"
      >
        <svg
          viewBox="0 0 300 150"
          className="w-full max-w-[300px] h-auto overflow-visible"
          role="img"
          aria-labelledby={titleId}
        >
          <title id={titleId}>{t('svg.demoTitle')}</title>
          <path
            d={WAVE_PATH}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            ref={pathRef}
            d={WAVE_PATH}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <circle
            ref={circleRef}
            cx="280"
            cy="75"
            r="12"
            fill="#3b82f6"
            stroke="white"
            strokeWidth="3"
          />
        </svg>
      </div>

      <div className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-xl text-xs sm:text-sm overflow-x-auto">
        <pre>{`// Logic
const length = path.getTotalLength();
gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
gsap.to(path, { strokeDashoffset: 0, duration: 2 });`}</pre>
      </div>
    </div>
  );
}

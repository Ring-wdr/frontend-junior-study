'use client';

import gsap from 'gsap';
import { Play, RotateCcw } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTranslation } from '@/i18n/client';
import { SectionCard } from '../../../components/section-card';
import { prefersReducedMotion } from '../utils/reduced-motion';

export function GsapBasicsSection() {
  const { t } = useTranslation('week10');
  const rootRef = useRef<HTMLDivElement>(null);
  const toStageRef = useRef<HTMLDivElement>(null);
  const boxToRef = useRef<HTMLDivElement>(null);
  const boxFromRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {}, rootRef);
    ctxRef.current = ctx;
    return () => {
      ctx.revert();
      ctxRef.current = null;
    };
  }, []);

  const speed = () => (prefersReducedMotion() ? 0 : 1);

  const runTo = () => {
    const stage = toStageRef.current;
    const box = boxToRef.current;
    if (!stage || !box) return;
    const factor = speed();
    ctxRef.current?.add(() => {
      gsap.fromTo(
        box,
        { x: 0, rotation: 0 },
        {
          x: () => {
            const styles = getComputedStyle(stage);
            const inner =
              stage.clientWidth -
              Number.parseFloat(styles.paddingLeft) -
              Number.parseFloat(styles.paddingRight);
            return Math.min(200, Math.max(0, inner - box.offsetWidth));
          },
          rotation: 360,
          duration: 2 * factor,
          ease: 'power2.out',
          overwrite: true,
        },
      );
    });
  };

  const runFrom = () => {
    const box = boxFromRef.current;
    if (!box) return;
    const factor = speed();
    ctxRef.current?.add(() => {
      gsap.fromTo(
        box,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5 * factor,
          ease: 'elastic.out(1, 0.3)',
          overwrite: true,
        },
      );
    });
  };

  const runTimeline = () => {
    const container = timelineRef.current;
    if (!container) return;
    const dots = container.querySelectorAll('.dot');
    if (dots.length < 3) return;
    const factor = speed();
    ctxRef.current?.add(() => {
      gsap.killTweensOf(dots);
      gsap.set(dots, { y: 0 });
      gsap
        .timeline({ defaults: { duration: 0.5 * factor } })
        .to(dots[0], { y: -30 })
        .to(dots[1], { y: -30 }, '-=0.25')
        .to(dots[2], { y: -30 }, '-=0.25')
        .to(dots, { y: 0, ease: 'bounce.out' });
    });
  };

  const reset = () => {
    const targets = [boxToRef.current, boxFromRef.current];
    const dots = timelineRef.current?.querySelectorAll('.dot');
    gsap.killTweensOf(targets);
    gsap.set(targets, { clearProps: 'all' });
    if (dots) {
      gsap.killTweensOf(dots);
      gsap.set(dots, { clearProps: 'all' });
    }
  };

  return (
    <SectionCard>
      <div ref={rootRef} className="space-y-6">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-150"
          >
            <RotateCcw size={16} />
            {t('basics.resetAll')}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-3 min-w-0">
            <div
              ref={toStageRef}
              className="bg-gray-50 rounded-xl p-4 h-36 flex items-center border border-gray-100 relative overflow-hidden"
            >
              <div
                ref={boxToRef}
                className="w-14 h-14 shrink-0 bg-blue-500 rounded-xl shadow-md flex items-center justify-center text-white font-bold"
              >
                TO
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900">
                  {t('basics.to.title')}
                </h3>
                <button
                  type="button"
                  onClick={runTo}
                  aria-label={t('basics.to.title')}
                  className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors duration-150"
                >
                  <Play size={16} fill="currentColor" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-3">
                {t('basics.to.description')}
              </p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto">
                {`gsap.to(".box", {
  x: 200,
  rotation: 360,
  duration: 2
});`}
              </pre>
            </div>
          </div>

          <div className="space-y-3 min-w-0">
            <div className="bg-gray-50 rounded-xl p-4 h-36 flex items-center justify-center border border-gray-100 relative overflow-hidden">
              <div
                ref={boxFromRef}
                className="w-14 h-14 bg-green-500 rounded-xl shadow-md flex items-center justify-center text-white font-bold text-sm"
              >
                FROM
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900">
                  {t('basics.from.title')}
                </h3>
                <button
                  type="button"
                  onClick={runFrom}
                  aria-label={t('basics.from.title')}
                  className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors duration-150"
                >
                  <Play size={16} fill="currentColor" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-3">
                {t('basics.from.description')}
              </p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto">
                {`gsap.from(".box", {
  opacity: 0,
  y: -50,
  duration: 1.5
});`}
              </pre>
            </div>
          </div>

          <div className="space-y-3 min-w-0">
            <div
              ref={timelineRef}
              className="bg-gray-50 rounded-xl p-4 h-36 flex items-center justify-center gap-4 border border-gray-100 relative overflow-hidden"
            >
              <div className="dot w-12 h-12 bg-purple-500 rounded-full shadow-md flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="dot w-12 h-12 bg-purple-500 rounded-full shadow-md flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="dot w-12 h-12 bg-purple-500 rounded-full shadow-md flex items-center justify-center text-white font-bold">
                3
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900">
                  {t('basics.timeline.title')}
                </h3>
                <button
                  type="button"
                  onClick={runTimeline}
                  aria-label={t('basics.timeline.title')}
                  className="p-2 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors duration-150"
                >
                  <Play size={16} fill="currentColor" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-3">
                {t('basics.timeline.description')}
              </p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto">
                {`const tl = gsap.timeline();
tl.to(".d1", { y: -30 })
  .to(".d2", { y: -30 }, "-=0.25")
  .to(".d3", { y: -30 }, "-=0.25");`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

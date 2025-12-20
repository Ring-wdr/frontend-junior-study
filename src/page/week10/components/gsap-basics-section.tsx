import gsap from 'gsap';
import { Play, RotateCcw } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

export function GsapBasicsSection() {
  const { t } = useTranslation('week10');
  const boxToRef = useRef<HTMLDivElement>(null);
  const boxFromRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const runTo = () => {
    gsap.to(boxToRef.current, {
      x: 200,
      rotation: 360,
      duration: 2,
      ease: 'power2.out',
    });
  };

  const runFrom = () => {
    // gsap.from() immediately sets the element to the vars provided, then animates BACK to original
    gsap.from(boxFromRef.current, {
      opacity: 0,
      y: -50,
      duration: 1.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  const runTimeline = () => {
    const tl = gsap.timeline();
    const dots = timelineRef.current?.querySelectorAll('.dot');

    if (dots) {
      tl.to(dots[0], { y: -30, duration: 0.5 })
        .to(dots[1], { y: -30, duration: 0.5 }, '-=0.25') // overlap
        .to(dots[2], { y: -30, duration: 0.5 }, '-=0.25')
        .to(dots, { y: 0, duration: 0.5, ease: 'bounce.out' });
    }
  };

  const reset = () => {
    // Helper to manually reset properties if context revert isn't enough for valid re-run visual
    gsap.set([boxToRef.current, boxFromRef.current], { clearProps: 'all' });
    if (timelineRef.current) {
      gsap.set(timelineRef.current.querySelectorAll('.dot'), {
        clearProps: 'all',
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {t('basics.title')}
          </h2>
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <RotateCcw size={16} />
            {t('basics.resetAll')}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* gsap.to() */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-6 h-64 flex items-center border border-gray-100 relative overflow-hidden">
              <div
                ref={boxToRef}
                className="w-16 h-16 bg-blue-500 rounded-xl shadow-lg flex items-center justify-center text-white font-bold"
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
                  className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
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

          {/* gsap.from() */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-6 h-64 flex items-center justify-center border border-gray-100 relative overflow-hidden">
              <div
                ref={boxFromRef}
                className="w-16 h-16 bg-green-500 rounded-xl shadow-lg flex items-center justify-center text-white font-bold"
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
                  className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
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

          {/* gsap.timeline() */}
          <div className="space-y-4">
            <div
              ref={timelineRef}
              className="bg-gray-50 rounded-xl p-6 h-64 flex items-center justify-center gap-4 border border-gray-100 relative overflow-hidden"
            >
              <div className="dot w-12 h-12 bg-purple-500 rounded-full shadow-lg flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="dot w-12 h-12 bg-purple-500 rounded-full shadow-lg flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="dot w-12 h-12 bg-purple-500 rounded-full shadow-lg flex items-center justify-center text-white font-bold">
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
                  className="p-2 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors"
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
    </div>
  );
}

import gsap from 'gsap';
import { RotateCcw } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

export function SvgAnimationSection() {
  const { t } = useTranslation('week10');
  const pathRef = useRef<SVGPathElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  const [key, setKey] = useState(0);

  useLayoutEffect(() => {
    // We access key to suppress unused dependency warning since we generally rely on it for re-triggering
    void key;
    const ctx = gsap.context(() => {
      if (pathRef.current && circleRef.current) {
        const length = pathRef.current.getTotalLength();

        // Initial state: hidden (offset = length)
        gsap.set(pathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        const tl = gsap.timeline();

        tl.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
        }).from(circleRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'back.out(1.7)',
        });
      }
    });
    return () => ctx.revert();
  }, [key]);

  const replay = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {t('svg.title')}
          </h2>
          <button
            type="button"
            onClick={replay}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors text-sm font-medium"
          >
            <RotateCcw size={16} />
            {t('svg.replay')}
          </button>
        </div>

        <p className="text-gray-600">
          <Trans t={t} i18nKey="svg.description" components={{ code: <code /> }} />
        </p>

        <div className="flex justify-center py-10 bg-gray-50 rounded-xl border border-gray-100">
          <svg
            width="300"
            height="150"
            viewBox="0 0 300 150"
            className="overflow-visible"
            aria-labelledby="svg-title"
          >
            <title id="svg-title">Line drawing animation demo</title>
            {/* Background Path (gray) for reference */}
            <path
              d="M20,75 C20,75 50,20 90,75 S 150,130 190,75 S 260,20 280,75"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Animated Path */}
            <path
              ref={pathRef}
              d="M20,75 C20,75 50,20 90,75 S 150,130 190,75 S 260,20 280,75"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* End Circle */}
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

        <div className="bg-gray-900 text-gray-100 p-4 rounded-xl text-sm overflow-x-auto">
          <pre>{`// Logic
const length = path.getTotalLength();
gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
gsap.to(path, { strokeDashoffset: 0, duration: 2 });`}</pre>
        </div>
      </div>
    </div>
  );
}

import gsap from 'gsap';
import { Play } from 'lucide-react';
import { useRef, useState } from 'react';
import { cn } from '../../../lib/utils';

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

export function EasingSection() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [selectedEasing, setSelectedEasing] = useState<string>('power2.out');
  const [isPlaying, setIsPlaying] = useState(false);

  // We don't rely on state for animation here to avoid re-renders during animation
  // but we use state to trigger the effect if we wanted to change easing dynamically mid-flight (not needed here)

  const runAnimation = () => {
    if (isPlaying) return;
    setIsPlaying(true);

    // Reset first
    gsap.set(boxRef.current, { x: 0 });

    gsap.to(boxRef.current, {
      x: '300%', // simplistic relative movement
      duration: 1.5,
      ease: selectedEasing,
      onComplete: () => setIsPlaying(false),
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Easing (가속도)</h2>
        <p className="text-gray-600">
          애니메이션의 느낌을 결정하는 가장 중요한 요소입니다. "빠르게 시작해서
          부드럽게 멈추는" 것이 UI 모션의 기본 원칙입니다.
        </p>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Controls */}
          <div className="w-full md:w-1/3 space-y-2">
            <h3 className="font-semibold text-gray-700 mb-2">Select Easing</h3>
            <div className="flex flex-wrap gap-2">
              {easings.map((ease) => (
                <button
                  type="button"
                  key={ease}
                  onClick={() => setSelectedEasing(ease)}
                  className={cn(
                    'px-3 py-1.5 text-sm rounded-lg border transition-all',
                    selectedEasing === ease
                      ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50',
                  )}
                >
                  {ease}
                </button>
              ))}
            </div>
            <div className="mt-6">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl text-sm overflow-x-auto">
                {`gsap.to(".box", {
  x: 300,
  duration: 1.5,
  ease: "${selectedEasing}"
});`}
              </pre>
            </div>
          </div>

          {/* Visualizer */}
          <div className="w-full md:w-2/3 bg-gray-50 rounded-xl p-6 h-80 flex flex-col justify-center border border-gray-100 relative overflow-hidden">
            <div className="absolute top-4 right-4 z-10">
              <button
                type="button"
                onClick={runAnimation}
                disabled={isPlaying}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
              >
                <Play size={18} fill="currentColor" />
                {isPlaying ? 'Animating...' : 'Run Animation'}
              </button>
            </div>

            {/* Grid/Ruler effect */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #000 1px, transparent 1px)',
                  backgroundSize: '20% 100%',
                }}
              ></div>
            </div>

            <div className="relative w-full pr-16">
              {' '}
              {/* heavy right padding for destination */}
              <div
                ref={boxRef}
                className="w-16 h-16 bg-linear-to-br from-indigo-500 to-violet-600 rounded-xl shadow-lg flex items-center justify-center text-white font-bold text-xs"
              >
                BOX
              </div>
            </div>

            <div className="mt-8 flex justify-between text-xs text-gray-400 font-mono w-full pr-16">
              <span>Start (0%)</span>
              <span>End (100%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

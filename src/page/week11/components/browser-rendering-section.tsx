import { AlertTriangle, ArrowRight, Cpu, Layers, Zap } from 'lucide-react';
import { useState } from 'react';

const renderingSteps = [
  {
    name: 'JavaScript',
    color: 'bg-yellow-400',
    description: 'JS 실행 및 DOM 조작',
    details: 'JavaScript가 실행되어 DOM을 변경합니다.',
  },
  {
    name: 'Style',
    color: 'bg-purple-400',
    description: 'CSS 계산',
    details: '변경된 DOM에 어떤 CSS 규칙이 적용되는지 계산합니다.',
  },
  {
    name: 'Layout',
    color: 'bg-blue-400',
    description: '위치/크기 계산',
    details: '요소들의 크기와 위치를 계산합니다. (Reflow)',
  },
  {
    name: 'Paint',
    color: 'bg-green-400',
    description: '픽셀 그리기',
    details: '실제 픽셀을 채우는 작업입니다. (배경, 텍스트, 이미지)',
  },
  {
    name: 'Composite',
    color: 'bg-orange-400',
    description: '레이어 합성',
    details: '여러 레이어를 합쳐 최종 화면을 만듭니다. (GPU 활용)',
  },
];

export function BrowserRenderingSection() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Layers size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            브라우저 렌더링 파이프라인
          </h2>
        </div>

        <p className="text-gray-600 leading-relaxed text-lg">
          브라우저가 화면을 그리는 과정을 이해하면, 어떤 코드가 성능을 해치는지
          알 수 있습니다.
        </p>

        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {renderingSteps.map((step, idx) => (
              <div key={step.name} className="flex items-center gap-2">
                <button
                  type="button"
                  className={`${step.color} px-4 py-2 rounded-lg text-white font-medium text-sm shadow-sm hover:shadow-md transition-all cursor-pointer ${
                    hoveredStep === idx ? 'scale-110 ring-2 ring-gray-400' : ''
                  }`}
                  onMouseEnter={() => setHoveredStep(idx)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {step.name}
                </button>
                {idx < renderingSteps.length - 1 && (
                  <ArrowRight className="text-gray-400" size={16} />
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 min-h-[60px] text-center">
            {hoveredStep !== null && (
              <div className="animate-in fade-in duration-200">
                <p className="font-semibold text-gray-900">
                  {renderingSteps[hoveredStep].description}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {renderingSteps[hoveredStep].details}
                </p>
              </div>
            )}
            {hoveredStep === null && (
              <p className="text-sm text-gray-400">
                각 단계를 hover하여 자세히 알아보세요
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-red-200 bg-red-50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="text-red-600" size={20} />
              <h3 className="font-bold text-red-900">Layout Thrashing</h3>
            </div>
            <p className="text-sm text-red-800 mb-3">
              읽기/쓰기를 번갈아 하면 강제 동기 레이아웃 발생
            </p>
            <div className="bg-white/70 rounded-lg p-3 font-mono text-xs text-red-700">
              <pre>{`// Bad: 읽고 쓰기 반복
for (let i = 0; i < 100; i++) {
  el.style.width = el.offsetWidth + 10 + 'px';
}`}</pre>
            </div>
          </div>

          <div className="border border-green-200 bg-green-50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="text-green-600" size={20} />
              <h3 className="font-bold text-green-900">Batch Updates</h3>
            </div>
            <p className="text-sm text-green-800 mb-3">
              읽기 먼저, 쓰기는 나중에 일괄 처리
            </p>
            <div className="bg-white/70 rounded-lg p-3 font-mono text-xs text-green-700">
              <pre>{`// Good: 읽기 먼저, 쓰기 나중
const width = el.offsetWidth;
requestAnimationFrame(() => {
  el.style.width = width + 10 + 'px';
});`}</pre>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="text-amber-600" size={20} />
            <h4 className="font-semibold text-amber-900">
              GPU 가속 (Composite Only)
            </h4>
          </div>
          <p className="text-sm text-amber-800 mb-3">
            아래 속성만 변경하면 Layout/Paint를 건너뛰고 GPU에서 직접
            처리합니다.
          </p>
          <div className="flex flex-wrap gap-2">
            {['transform', 'opacity', 'filter', 'will-change'].map((prop) => (
              <span
                key={prop}
                className="px-3 py-1 bg-white rounded-full text-sm font-mono text-amber-700 border border-amber-300"
              >
                {prop}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import {
  AlertTriangle,
  ArrowRight,
  Cpu,
  Layers,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

const renderingSteps = [
  {
    name: 'JavaScript',
    id: 'js',
    color: 'bg-yellow-400',
    description: 'JS 실행 및 DOM 조작',
    details: 'JavaScript가 실행되어 DOM을 변경합니다.',
  },
  {
    name: 'Style',
    id: 'style',
    color: 'bg-purple-400',
    description: 'CSS 계산',
    details: '변경된 DOM에 어떤 CSS 규칙이 적용되는지 계산합니다.',
  },
  {
    name: 'Layout',
    id: 'layout',
    color: 'bg-blue-400',
    description: '위치/크기 계산',
    details: '요소들의 크기와 위치를 계산합니다. (Reflow)',
    triggers: ['width', 'height', 'margin', 'padding', 'font-size'],
  },
  {
    name: 'Paint',
    id: 'paint',
    color: 'bg-green-400',
    description: '픽셀 그리기',
    details: '실제 픽셀을 채우는 작업입니다. (배경, 텍스트, 이미지)',
    triggers: ['background-color', 'color', 'border-color', 'box-shadow'],
  },
  {
    name: 'Composite',
    id: 'composite',
    color: 'bg-orange-400',
    description: '레이어 합성',
    details: '여러 레이어를 합쳐 최종 화면을 만듭니다. (GPU 활용)',
    triggers: ['transform', 'opacity', 'filter'],
  },
];

export function BrowserRenderingSection() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  // Visualizer States
  const [activeStages, setActiveStages] = useState<string[]>([]);
  const [demoState, setDemoState] = useState({
    width: 100,
    color: '#3b82f6', // blue-500
    rotate: 0,
  });

  const triggerUpdate = (type: 'layout' | 'paint' | 'composite') => {
    // Set active stages based on type
    let stages: string[] = [];
    if (type === 'layout') {
      stages = ['js', 'style', 'layout', 'paint', 'composite'];
      setDemoState((prev) => ({
        ...prev,
        width: prev.width === 100 ? 150 : 100,
      }));
    } else if (type === 'paint') {
      stages = ['js', 'style', 'paint', 'composite'];
      setDemoState((prev) => ({
        ...prev,
        color: prev.color === '#3b82f6' ? '#ef4444' : '#3b82f6',
      }));
    } else if (type === 'composite') {
      stages = ['js', 'style', 'composite'];
      setDemoState((prev) => ({ ...prev, rotate: prev.rotate + 45 }));
    }
    setActiveStages(stages);

    // Reset active stages after animation
    setTimeout(() => setActiveStages([]), 1500);
  };

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

        {/* Visualizer */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <RefreshCw size={18} className="text-gray-500" /> Pixel Pipeline
                Simulator
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Click buttons to see triggered pipeline stages
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => triggerUpdate('layout')}
                disabled={activeStages.length > 0}
                className="px-3 py-1.5 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200 disabled:opacity-50 transition-colors"
              >
                Change Width (Layout)
              </button>
              <button
                type="button"
                onClick={() => triggerUpdate('paint')}
                disabled={activeStages.length > 0}
                className="px-3 py-1.5 bg-green-100 text-green-700 rounded text-sm font-medium hover:bg-green-200 disabled:opacity-50 transition-colors"
              >
                Change Color (Paint)
              </button>
              <button
                type="button"
                onClick={() => triggerUpdate('composite')}
                disabled={activeStages.length > 0}
                className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200 disabled:opacity-50 transition-colors"
              >
                Rotate (Composite)
              </button>
            </div>
          </div>

          {/* Pipeline Visualization */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 relative">
            {renderingSteps.map((step, idx) => {
              const isActive = activeStages.includes(step.id);
              const isSkipped =
                activeStages.length > 0 &&
                !isActive &&
                idx <
                  renderingSteps.findIndex(
                    (s) => s.id === activeStages[activeStages.length - 1],
                  );

              return (
                <div
                  key={step.name}
                  className="flex items-center gap-2 relative"
                >
                  <div
                    role="application"
                    className={cn(
                      'relative px-4 py-3 rounded-lg font-medium text-sm text-white shadow-sm transition-all duration-300',
                      step.color,
                      isActive &&
                        'scale-110 ring-4 ring-offset-2 ring-indigo-300 z-10 brightness-110',
                      isSkipped && 'opacity-30 grayscale',
                      hoveredStep === idx && 'scale-105 ring-2 ring-gray-400',
                    )}
                    onMouseEnter={() => setHoveredStep(idx)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    {step.name}
                    {isActive && (
                      <span className="absolute -top-2 -right-2 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                      </span>
                    )}
                  </div>
                  {idx < renderingSteps.length - 1 && (
                    <ArrowRight
                      className={`transition-colors ${isActive ? 'text-indigo-500 font-bold' : 'text-gray-300'}`}
                      size={16}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-center items-center h-40 bg-white rounded-lg border border-gray-200 mb-4 overflow-hidden">
            <div
              className="flex items-center justify-center text-white font-bold transition-all duration-500 ease-linear shadow-lg"
              style={{
                width: `${demoState.width}px`,
                height: '100px',
                backgroundColor: demoState.color,
                transform: `rotate(${demoState.rotate}deg)`,
              }}
            >
              Box
            </div>
          </div>

          <div className="mt-4 min-h-[60px] text-center">
            {hoveredStep !== null ? (
              <div className="animate-in fade-in duration-200">
                <p className="font-semibold text-gray-900">
                  {renderingSteps[hoveredStep].description}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {renderingSteps[hoveredStep].details}
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  <span className="font-semibold">Triggers: </span>
                  {(
                    renderingSteps[hoveredStep].triggers || ['Script execution']
                  ).join(', ')}
                </div>
              </div>
            ) : activeStages.length > 0 ? (
              <div className="animate-in fade-in duration-200">
                <p className="font-bold text-indigo-600">
                  {activeStages.length === 5
                    ? 'Expensive! Triggers Reflow & Repaint'
                    : activeStages.length === 4
                      ? 'Moderate. Triggers Repaint'
                      : 'Cheap! Composite Only (Best Performance)'}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                각 단계를 hover하거나 버튼을 클릭하여 파이프라인을 확인하세요
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
              <CodeBlock
                language="javascript"
                code={`// Bad: 읽고 쓰기 반복
for (let i = 0; i < 100; i++) {
  el.style.width = el.offsetWidth + 10 + 'px';
}`}
              />
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
              <CodeBlock
                language="javascript"
                code={`// Good: 읽기 먼저, 쓰기 나중
const width = el.offsetWidth;
requestAnimationFrame(() => {
  el.style.width = width + 10 + 'px';
});`}
              />
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

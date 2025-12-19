import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MousePointer,
  Move,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

export function CoreWebVitalsSection() {
  const [selectedMetric, setSelectedMetric] = useState<'lcp' | 'inp' | 'cls'>(
    'lcp',
  );

  const metrics = {
    lcp: {
      name: 'LCP',
      fullName: 'Largest Contentful Paint',
      icon: <Clock className="text-blue-600" size={24} />,
      color: 'blue',
      description:
        '주요 콘텐츠가 화면에 표시되기까지 걸리는 시간. 사용자가 페이지가 "로드되었다"고 느끼는 순간을 측정합니다.',
      good: '2.5초 이하',
      needsImprovement: '2.5초 ~ 4초',
      poor: '4초 초과',
      causes: [
        '큰 히어로 이미지',
        '느린 서버 응답 (TTFB)',
        '렌더링 차단 리소스',
        '느린 폰트 로딩',
      ],
      solutions: [
        'CDN 활용 및 서버 최적화',
        '이미지 최적화 (WebP, AVIF)',
        'preconnect / preload 사용',
        'Critical CSS 인라인화',
      ],
    },
    inp: {
      name: 'INP',
      fullName: 'Interaction to Next Paint',
      icon: <MousePointer className="text-purple-600" size={24} />,
      color: 'purple',
      description:
        '사용자 인터랙션(클릭, 탭, 키보드)에 대한 반응 지연 시간. FID를 대체하는 새로운 지표입니다.',
      good: '200ms 이하',
      needsImprovement: '200ms ~ 500ms',
      poor: '500ms 초과',
      causes: [
        'Long Task (50ms+ 메인 스레드 점유)',
        '과도한 JavaScript 실행',
        '동기적 레이아웃 계산',
        '무거운 이벤트 핸들러',
      ],
      solutions: [
        'Heavy 계산을 Web Worker로 분리',
        'useTransition으로 UI 블로킹 방지',
        '코드 스플리팅으로 JS 번들 축소',
        '이벤트 핸들러 최적화 (debounce/throttle)',
      ],
    },
    cls: {
      name: 'CLS',
      fullName: 'Cumulative Layout Shift',
      icon: <Move className="text-orange-600" size={24} />,
      color: 'orange',
      description:
        '페이지 로드 중 예기치 않은 레이아웃 이동의 총합. 사용자가 의도치 않게 잘못된 요소를 클릭하게 만듭니다.',
      good: '0.1 이하',
      needsImprovement: '0.1 ~ 0.25',
      poor: '0.25 초과',
      causes: [
        '이미지 width/height 미지정',
        '광고/임베드 영역 미예약',
        '동적으로 삽입되는 콘텐츠',
        'FOUT (Flash of Unstyled Text)',
      ],
      solutions: [
        '이미지에 width/height 또는 aspect-ratio 지정',
        '광고 컨테이너에 min-height 설정',
        'Skeleton UI로 공간 예약',
        'font-display: swap + preload',
      ],
    },
  };

  const current = metrics[selectedMetric];
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-600',
      button: 'bg-blue-600',
      hover: 'hover:bg-blue-700',
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-600',
      button: 'bg-purple-600',
      hover: 'hover:bg-purple-700',
    },
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-600',
      button: 'bg-orange-600',
      hover: 'hover:bg-orange-700',
    },
  };
  const colors = colorClasses[current.color as keyof typeof colorClasses];

  // Visualizer States
  const [lcpState, setLcpState] = useState<'initial' | 'loading' | 'loaded'>(
    'initial',
  );
  const [lcpTime, setLcpTime] = useState(0);
  const [lcpMode, setLcpMode] = useState<'good' | 'bad'>('bad');

  const [inpState, setInpState] = useState<'idle' | 'processing' | 'responded'>(
    'idle',
  );
  const [inpTime, setInpTime] = useState(0);
  const [inpMode, setInpMode] = useState<'good' | 'bad'>('bad');

  const [clsItems, setClsItems] = useState<number[]>([1, 2, 3]);
  const [clsScore, setClsScore] = useState(0);
  const [clsMode, setClsMode] = useState<'good' | 'bad'>('bad');

  // LCP Simulator
  const runLcpSim = () => {
    setLcpState('loading');
    setLcpTime(0);
    const startTime = performance.now();
    const duration = lcpMode === 'good' ? 800 : 3500;

    const interval = setInterval(() => {
      setLcpTime(Math.floor(performance.now() - startTime));
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      setLcpTime(duration);
      setLcpState('loaded');
    }, duration);
  };

  // INP Simulator
  const runInpSim = () => {
    setInpState('processing');
    const start = performance.now();

    // Simulate main thread blocking
    if (inpMode === 'bad') {
      const blockUntil = start + 600;
      while (performance.now() < blockUntil) {
        // blocking main thread
      }
      setInpTime(600);
      setInpState('responded');
    } else {
      setTimeout(() => {
        setInpTime(50);
        setInpState('responded');
      }, 50);
    }
  };

  // CLS Simulator
  const runClsSim = () => {
    if (clsMode === 'bad') {
      // Bad: Insert item at top without reserving space
      setClsItems((prev) => [Math.random(), ...prev]);
      setClsScore((prev) => Math.min(prev + 0.15, 0.5));
    } else {
      // Good: Append or insert with reserved space (simulated)
      setClsItems((prev) => [...prev, Math.random()]);
      // No layout shift score increase
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${colors.bg} ${colors.text}`}>
            {current.icon}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Core Web Vitals</h2>
        </div>

        <p className="text-gray-600 leading-relaxed text-lg">
          Google이 정의한 <strong>사용자 경험의 핵심 지표</strong>입니다. 검색
          순위에도 영향을 미치며, 실제 사용자가 느끼는 성능을 측정합니다.
        </p>

        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
          {(['lcp', 'inp', 'cls'] as const).map((metric) => (
            <button
              key={metric}
              type="button"
              onClick={() => setSelectedMetric(metric)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                selectedMetric === metric
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {metrics[metric].name}
            </button>
          ))}
        </div>

        {/* Visualizer Area */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              <Zap size={16} className="text-yellow-500" />
              {current.name} Visualizer
            </h3>
            <div className="flex items-center gap-4 text-sm">
              {selectedMetric === 'lcp' && (
                <div className="flex gap-2 bg-white p-1 rounded-md shadow-sm">
                  <button
                    onClick={() => setLcpMode('good')}
                    className={`px-3 py-1 rounded ${lcpMode === 'good' ? 'bg-green-100 text-green-700 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    Good (0.8s)
                  </button>
                  <button
                    onClick={() => setLcpMode('bad')}
                    className={`px-3 py-1 rounded ${lcpMode === 'bad' ? 'bg-red-100 text-red-700 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    Bad (3.5s)
                  </button>
                </div>
              )}
              {selectedMetric === 'inp' && (
                <div className="flex gap-2 bg-white p-1 rounded-md shadow-sm">
                  <button
                    onClick={() => setInpMode('good')}
                    className={`px-3 py-1 rounded ${inpMode === 'good' ? 'bg-green-100 text-green-700 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    Good (50ms)
                  </button>
                  <button
                    onClick={() => setInpMode('bad')}
                    className={`px-3 py-1 rounded ${inpMode === 'bad' ? 'bg-red-100 text-red-700 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    Bad (600ms)
                  </button>
                </div>
              )}
              {selectedMetric === 'cls' && (
                <div className="flex gap-2 bg-white p-1 rounded-md shadow-sm">
                  <button
                    onClick={() => {
                      setClsMode('good');
                      setClsScore(0);
                      setClsItems([1, 2, 3]);
                    }}
                    className={`px-3 py-1 rounded ${clsMode === 'good' ? 'bg-green-100 text-green-700 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    Good (Fixed)
                  </button>
                  <button
                    onClick={() => {
                      setClsMode('bad');
                      setClsScore(0);
                      setClsItems([1, 2, 3]);
                    }}
                    className={`px-3 py-1 rounded ${clsMode === 'bad' ? 'bg-red-100 text-red-700 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    Bad (Shift)
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-8 bg-gray-100/50 min-h-[300px] flex items-center justify-center relative">
            {selectedMetric === 'lcp' && (
              <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <button
                    onClick={runLcpSim}
                    disabled={lcpState === 'loading'}
                    className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    <RotateCcw size={12} />{' '}
                    {lcpState === 'loading' ? 'Loading...' : 'Reload Page'}
                  </button>
                </div>
                <div className="space-y-3">
                  {/* Skeleton or Content */}
                  <div className="h-4 w-full bg-gray-100 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-100 rounded"></div>

                  {/* LCP Element */}
                  <div className="relative aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
                    {lcpState === 'loaded' ? (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl animate-in zoom-in-95 duration-500">
                        Hero Image
                      </div>
                    ) : (
                      <div className="text-gray-400 text-sm">
                        Loading Large Resource...
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-gray-500">
                      Time:{' '}
                      <span className="font-mono text-gray-900">
                        {lcpTime}ms
                      </span>
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        lcpTime > 2500
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {lcpTime > 2500 ? 'Needs Improvement' : 'Good'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {selectedMetric === 'inp' && (
              <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center gap-6">
                <div className="text-center space-y-2">
                  <h4 className="font-medium text-gray-900">
                    Click Response Test
                  </h4>
                  <p className="text-xs text-gray-500">
                    Test the button responsiveness
                  </p>
                </div>

                <button
                  onClick={runInpSim}
                  className={`px-6 py-3 rounded-lg font-semibold text-white transition-all active:scale-95 ${
                    inpState === 'processing'
                      ? 'bg-gray-400'
                      : inpMode === 'bad'
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {inpState === 'processing' ? 'Processing...' : 'Click Me!'}
                </button>

                {inpState === 'responded' && (
                  <div
                    className={`text-center space-y-1 animate-in slide-in-from-bottom-2`}
                  >
                    <div className="text-2xl font-bold font-mono">
                      {inpTime}ms
                    </div>
                    <div
                      className={`text-xs font-medium ${inpTime > 200 ? 'text-red-500' : 'text-green-500'}`}
                    >
                      {inpTime > 200
                        ? 'Slow (Blocking)'
                        : 'Fast (Non-blocking)'}
                    </div>
                  </div>
                )}

                <div className="text-xs text-center text-gray-400 max-w-[200px]">
                  {inpMode === 'bad'
                    ? 'Simulates heavy Work by looping on main thread.'
                    : 'Simulates lightweight event handler.'}
                </div>
              </div>
            )}

            {selectedMetric === 'cls' && (
              <div className="w-full max-w-sm bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[320px]">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500">
                    Layout View
                  </span>
                  <span
                    className={`text-xs font-mono font-bold ${clsScore > 0.1 ? 'text-red-600' : 'text-green-600'}`}
                  >
                    CLS: {clsScore.toFixed(3)}
                  </span>
                </div>
                <div className="p-4 flex-1 overflow-y-auto relative">
                  {/* Simulated Ad/Content injection */}
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      onClick={runClsSim}
                      className="p-2 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 transition-colors shadow-sm"
                      title="Trigger Content Load"
                    >
                      <Move size={16} />
                    </button>
                  </div>

                  <div className="space-y-4 transition-all duration-300">
                    {clsItems.map((item, idx) => (
                      <div
                        key={item}
                        className="animate-in fade-in slide-in-from-top-2 duration-300"
                      >
                        {/* If it's the newest item in bad mode, it pushes things down */}
                        <div
                          className={`p-4 rounded-lg flex items-center gap-3 ${
                            idx === 0 &&
                            clsMode === 'bad' &&
                            clsItems.length > 3
                              ? 'bg-orange-50 border border-orange-200'
                              : 'bg-gray-50 border border-gray-100'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0"></div>
                          <div className="space-y-2 w-full">
                            <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                            <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-1">
                        Target Content
                      </h4>
                      <p className="text-xs text-blue-700">
                        This is the content the user is trying to read.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={`${colors.bg} ${colors.border} border rounded-xl p-6`}>
          <div className="flex items-center gap-3 mb-4">
            {current.icon}
            <div>
              <h3 className="font-bold text-gray-900">{current.name}</h3>
              <p className="text-sm text-gray-500">{current.fullName}</p>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{current.description}</p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-green-100 rounded-lg">
              <CheckCircle2 className="mx-auto text-green-600 mb-1" size={20} />
              <p className="text-xs text-gray-500">Good</p>
              <p className="font-bold text-green-700">{current.good}</p>
            </div>
            <div className="text-center p-3 bg-yellow-100 rounded-lg">
              <AlertTriangle
                className="mx-auto text-yellow-600 mb-1"
                size={20}
              />
              <p className="text-xs text-gray-500">Needs Work</p>
              <p className="font-bold text-yellow-700">
                {current.needsImprovement}
              </p>
            </div>
            <div className="text-center p-3 bg-red-100 rounded-lg">
              <Zap className="mx-auto text-red-600 mb-1" size={20} />
              <p className="text-xs text-gray-500">Poor</p>
              <p className="font-bold text-red-700">{current.poor}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-red-500">!</span> 주요 원인
              </h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {current.causes.map((cause) => (
                  <li key={cause}>• {cause}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white/50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" /> 개선 방법
              </h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {current.solutions.map((solution) => (
                  <li key={solution}>• {solution}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600">
          <strong>측정 도구:</strong> Lighthouse, PageSpeed Insights, Chrome
          DevTools Performance 탭, Web Vitals 라이브러리, Search Console
        </div>
      </div>
    </div>
  );
}

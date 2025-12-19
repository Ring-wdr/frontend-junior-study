import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MousePointer,
  Move,
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
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-600',
      button: 'bg-purple-600',
    },
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-600',
      button: 'bg-orange-600',
    },
  };
  const colors = colorClasses[current.color as keyof typeof colorClasses];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 text-green-600 rounded-lg">
            <Activity size={24} />
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

import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const WebVitalsSection = () => {
  const [selectedVital, setSelectedVital] = useState(0);

  const vitals = [
    {
      name: 'LCP',
      fullName: 'Largest Contentful Paint',
      icon: '🖼️',
      desc: '가장 큰 콘텐츠가 화면에 그려지는 시간',
      good: '2.5s 이하',
      poor: '4.0s 초과',
      improve: ['이미지 최적화 (WebP, lazy load)', '서버 응답 시간 개선', 'Critical CSS 인라인'],
    },
    {
      name: 'INP',
      fullName: 'Interaction to Next Paint',
      icon: '👆',
      desc: '사용자 인터랙션 후 다음 페인트까지 시간',
      good: '200ms 이하',
      poor: '500ms 초과',
      improve: ['Long Task 분할', '메인 스레드 블로킹 최소화', 'Web Worker 활용'],
    },
    {
      name: 'CLS',
      fullName: 'Cumulative Layout Shift',
      icon: '↔️',
      desc: '예상치 못한 레이아웃 이동량',
      good: '0.1 이하',
      poor: '0.25 초과',
      improve: ['이미지/영상에 크기 속성 지정', '폰트 로드 최적화 (font-display)', '동적 콘텐츠에 공간 예약'],
    },
    {
      name: 'FCP',
      fullName: 'First Contentful Paint',
      icon: '⚡',
      desc: '첫 번째 콘텐츠가 그려지는 시간',
      good: '1.8s 이하',
      poor: '3.0s 초과',
      improve: ['렌더 블로킹 리소스 제거', 'CSS/JS 최적화', 'CDN 활용'],
    },
    {
      name: 'TTFB',
      fullName: 'Time to First Byte',
      icon: '🌐',
      desc: '서버 첫 응답까지 걸리는 시간',
      good: '0.8s 이하',
      poor: '1.8s 초과',
      improve: ['서버 최적화', 'CDN 엣지 캐싱', '데이터베이스 쿼리 최적화'],
    },
  ];

  return (
    <SectionCard
      badge={{ label: 'Vitals', color: 'blue' }}
      title="Web Vitals 수집"
      description="실사용자 환경에서 성능 측정 및 개선"
    >
      <div className="space-y-8">
        <SubSection title="Core Web Vitals란?" icon iconColor="blue">
          <InfoBox variant="blue" title="Google의 성능 지표">
            <p className="text-sm leading-relaxed">
              Core Web Vitals는 <strong>LCP, INP, CLS</strong> 세 가지 지표로 구성됩니다.
              실제 사용자 경험을 측정하며, SEO 랭킹에도 영향을 미칩니다.
            </p>
          </InfoBox>
        </SubSection>

        <SubSection title="지표 상세 분석" icon iconColor="purple">
          <DemoBox label="Web Vitals Explorer">
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {vitals.map((vital, idx) => (
                  <button
                    key={vital.name}
                    type="button"
                    onClick={() => setSelectedVital(idx)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedVital === idx
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {vital.icon} {vital.name}
                  </button>
                ))}
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{vitals[selectedVital].icon}</span>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {vitals[selectedVital].name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {vitals[selectedVital].fullName}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-3">
                  {vitals[selectedVital].desc}
                </p>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-green-50 p-2 rounded text-center">
                    <span className="text-xs text-green-600 font-bold">Good</span>
                    <p className="text-sm text-green-800">{vitals[selectedVital].good}</p>
                  </div>
                  <div className="bg-red-50 p-2 rounded text-center">
                    <span className="text-xs text-red-600 font-bold">Poor</span>
                    <p className="text-sm text-red-800">{vitals[selectedVital].poor}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <h5 className="text-xs font-bold text-gray-700 mb-2">개선 방법</h5>
                  <ul className="space-y-1">
                    {vitals[selectedVital].improve.map((item) => (
                      <li key={item} className="text-xs text-gray-600 flex items-start gap-1">
                        <span className="text-blue-500">→</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Web Vitals 수집 코드" icon iconColor="green">
          <CodeBlock
            code={`// 1. web-vitals 라이브러리 설치
npm install web-vitals

// 2. 측정 및 로깅
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,  // 'good' | 'needs-improvement' | 'poor'
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  });

  // Beacon API로 전송 (페이지 이탈 시에도 전송 보장)
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/analytics', body);
  } else {
    fetch('/analytics', { body, method: 'POST', keepalive: true });
  }
}

// 모든 Core Web Vitals 측정
onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
onFCP(sendToAnalytics);
onTTFB(sendToAnalytics);

// 3. Sentry와 연동
import * as Sentry from '@sentry/react';
import { onLCP, onINP, onCLS } from 'web-vitals';

function sendToSentry(metric) {
  Sentry.setMeasurement(metric.name, metric.value, 'millisecond');
}

onLCP(sendToSentry);
onINP(sendToSentry);
onCLS(sendToSentry);`}
            language="typescript"
            className="text-xs"
          />
        </SubSection>

        <SubSection title="측정 환경의 차이" icon iconColor="orange">
          <InfoBox variant="orange" title="Lab vs Field Data">
            <p className="text-sm">
              <strong>Lab Data</strong> (Lighthouse)는 시뮬레이션 환경이고,
              <strong> Field Data</strong> (RUM)는 실제 사용자 환경입니다.
              두 데이터 모두 중요하지만, Field Data가 실제 사용자 경험을 반영합니다.
            </p>
          </InfoBox>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <h5 className="font-bold text-sm text-blue-800 mb-2">Lab Data (Synthetic)</h5>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Lighthouse / PageSpeed Insights</li>
                <li>• 일관된 환경에서 테스트</li>
                <li>• 개발 중 빠른 피드백</li>
                <li>• CI/CD 파이프라인 통합</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <h5 className="font-bold text-sm text-green-800 mb-2">Field Data (RUM)</h5>
              <ul className="text-xs text-green-700 space-y-1">
                <li>• CrUX Report / web-vitals</li>
                <li>• 실제 사용자 기기/네트워크</li>
                <li>• 다양한 조건 반영</li>
                <li>• SEO 랭킹에 사용됨</li>
              </ul>
            </div>
          </div>
        </SubSection>

        <SubSection title="성능 대시보드 구축" icon iconColor="red">
          <div className="space-y-3">
            {[
              {
                tool: 'Vercel Analytics',
                desc: 'Next.js 통합, 자동 Web Vitals 수집',
                link: 'vercel.com/analytics',
              },
              {
                tool: 'Sentry Performance',
                desc: 'Web Vitals + Transaction 통합 모니터링',
                link: 'sentry.io',
              },
              {
                tool: 'Google Analytics 4',
                desc: 'Web Vitals 이벤트 자동 수집',
                link: 'analytics.google.com',
              },
              {
                tool: 'Custom Dashboard',
                desc: 'Grafana + Prometheus로 자체 구축',
                link: 'grafana.com',
              },
            ].map((item) => (
              <div
                key={item.tool}
                className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between"
              >
                <div>
                  <h5 className="font-bold text-sm text-gray-900">{item.tool}</h5>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <span className="text-xs text-blue-500">{item.link}</span>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="성능 개선 우선순위" icon iconColor="purple">
          <DemoBox label="Optimization Priority">
            <div className="space-y-2">
              {[
                { priority: 1, action: 'LCP 개선: 히어로 이미지 최적화', impact: 'High' },
                { priority: 2, action: 'CLS 개선: 이미지/폰트 크기 지정', impact: 'High' },
                { priority: 3, action: 'INP 개선: Long Task 분할', impact: 'Medium' },
                { priority: 4, action: 'FCP 개선: Critical CSS 인라인', impact: 'Medium' },
                { priority: 5, action: 'TTFB 개선: CDN/캐싱 최적화', impact: 'Low' },
              ].map((item) => (
                <div
                  key={item.priority}
                  className="flex items-center gap-3 bg-gray-50 p-2 rounded"
                >
                  <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {item.priority}
                  </span>
                  <span className="text-sm text-gray-700 flex-1">{item.action}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      item.impact === 'High'
                        ? 'bg-red-100 text-red-700'
                        : item.impact === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {item.impact}
                  </span>
                </div>
              ))}
            </div>
          </DemoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};

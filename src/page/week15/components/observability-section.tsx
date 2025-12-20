import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const ObservabilitySection = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const sentryFeatures = [
    {
      name: 'Error Tracking',
      icon: '🐛',
      desc: 'JS 에러 자동 수집 및 분류',
      details: [
        '스택 트레이스 + 소스맵으로 원본 코드 위치 표시',
        '에러 빈도, 영향받은 사용자 수 집계',
        'Release별 에러 추적으로 회귀 감지',
      ],
    },
    {
      name: 'Breadcrumbs',
      icon: '🍞',
      desc: '에러 발생 전 사용자 행동 기록',
      details: [
        '클릭, 네비게이션, API 호출 등 자동 기록',
        '에러 발생까지의 경로 추적',
        '커스텀 breadcrumb 추가 가능',
      ],
    },
    {
      name: 'Performance',
      icon: '📊',
      desc: '트랜잭션 및 성능 모니터링',
      details: [
        '페이지 로드, API 응답 시간 측정',
        'Apdex 점수로 사용자 경험 수치화',
        '느린 트랜잭션 자동 샘플링',
      ],
    },
    {
      name: 'Session Replay',
      icon: '🎬',
      desc: '사용자 세션 재생 (유료)',
      details: [
        '에러 발생 전후 화면 녹화',
        '마우스 움직임, 클릭 재현',
        '민감 정보 자동 마스킹',
      ],
    },
  ];

  return (
    <SectionCard
      badge={{ label: 'Monitor', color: 'red' }}
      title="Observability (에러 모니터링)"
      description="Sentry로 실서비스 에러 추적 및 성능 모니터링"
    >
      <div className="space-y-8">
        <SubSection title="왜 에러 모니터링이 필수인가?" icon iconColor="red">
          <InfoBox variant="red" title="프론트엔드 에러는 숨는다">
            <p className="text-sm leading-relaxed">
              프론트엔드 에러는 서버 로그에 남지 않습니다.
              사용자가 "안 돼요"라고 할 때 이미 수많은 에러가 발생했을 수 있습니다.
              <strong> 실시간 에러 수집 시스템</strong>은 프로덕션 필수입니다.
            </p>
          </InfoBox>
        </SubSection>

        <SubSection title="Sentry 핵심 기능" icon iconColor="purple">
          <DemoBox label="Feature Explorer">
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {sentryFeatures.map((feature, idx) => (
                  <button
                    key={feature.name}
                    type="button"
                    onClick={() => setActiveFeature(idx)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      activeFeature === idx
                        ? 'bg-red-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {feature.icon} {feature.name}
                  </button>
                ))}
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">
                    {sentryFeatures[activeFeature].icon}
                  </span>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {sentryFeatures[activeFeature].name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {sentryFeatures[activeFeature].desc}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {sentryFeatures[activeFeature].details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="text-red-500 mt-0.5">→</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="React 프로젝트에 Sentry 연동" icon iconColor="blue">
          <CodeBlock
            code={`// 1. 설치
npm install @sentry/react

// 2. 초기화 (main.tsx 또는 index.tsx)
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://xxx@xxx.ingest.sentry.io/xxx",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,  // 성능 모니터링 샘플링
  replaysSessionSampleRate: 0.1,  // 일반 세션 10%
  replaysOnErrorSampleRate: 1.0,  // 에러 세션 100%
});

// 3. Error Boundary 래핑
const root = createRoot(document.getElementById('root')!);
root.render(
  <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
    <App />
  </Sentry.ErrorBoundary>
);

// 4. 수동 에러 캡처
try {
  riskyOperation();
} catch (error) {
  Sentry.captureException(error, {
    tags: { feature: 'checkout' },
    extra: { userId: user.id },
  });
}`}
            language="typescript"
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Source Map 업로드" icon iconColor="green">
          <InfoBox variant="green" title="원본 코드 라인 표시">
            <p className="text-sm">
              프로덕션 빌드는 minify되어 스택 트레이스가 읽기 어렵습니다.
              Source Map을 업로드하면 <strong>원본 파일명과 라인 번호</strong>가 표시됩니다.
            </p>
          </InfoBox>

          <CodeBlock
            code={`// Vite 설정 (vite.config.ts)
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig({
  build: {
    sourcemap: true,  // Source Map 생성
  },
  plugins: [
    sentryVitePlugin({
      org: "your-org",
      project: "your-project",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
});

// Webpack 설정
const SentryWebpackPlugin = require("@sentry/webpack-plugin");

module.exports = {
  devtool: "source-map",
  plugins: [
    new SentryWebpackPlugin({
      include: "./dist",
      release: process.env.RELEASE_VERSION,
    }),
  ],
};`}
            language="typescript"
            className="mt-3 text-xs"
          />
        </SubSection>

        <SubSection title="체계적인 로깅 구조" icon iconColor="orange">
          <CodeBlock
            code={`// Axios Interceptor로 체계적 로깅
import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

// 요청 로깅
api.interceptors.request.use((config) => {
  config.metadata = { startTime: Date.now() };
  console.log(\`[API] \${config.method?.toUpperCase()} \${config.url}\`);
  return config;
});

// 응답 로깅 + 에러 추적
api.interceptors.response.use(
  (response) => {
    const duration = Date.now() - response.config.metadata.startTime;
    console.log(\`[API] \${response.status} in \${duration}ms\`);
    return response;
  },
  (error) => {
    Sentry.captureException(error, {
      tags: {
        api: error.config?.url,
        status: error.response?.status,
      },
    });

    // 자동 재시도 로직
    if (error.response?.status === 503) {
      return retryRequest(error.config);
    }

    return Promise.reject(error);
  }
);`}
            language="typescript"
            className="text-xs"
          />
        </SubSection>

        <SubSection title="모니터링 Best Practices" icon iconColor="purple">
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                title: 'Release 태깅',
                desc: '버전별 에러 추적으로 회귀 감지',
                icon: '🏷️',
              },
              {
                title: '환경 분리',
                desc: 'dev/staging/prod 환경별 필터링',
                icon: '🌍',
              },
              {
                title: '알림 설정',
                desc: 'Slack/Email 알림으로 즉시 대응',
                icon: '🔔',
              },
              {
                title: '샘플링 조정',
                desc: '트래픽에 따라 샘플링 비율 조정',
                icon: '📉',
              },
              {
                title: 'Issue 할당',
                desc: '팀원에게 자동 할당 규칙 설정',
                icon: '👥',
              },
              {
                title: 'PII 마스킹',
                desc: '민감 정보 자동 필터링',
                icon: '🔒',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{item.icon}</span>
                  <h5 className="font-bold text-sm text-gray-900">{item.title}</h5>
                </div>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

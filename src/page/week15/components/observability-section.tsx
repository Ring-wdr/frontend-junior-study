import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const ObservabilitySection = () => {
  const { t } = useTranslation('week15');
  const [activeFeature, setActiveFeature] = useState(0);

  const features = t('observability.sentryFeatures', {
    returnObjects: true,
  }) as any[];
  const sentryFeatures = [
    { ...features[0], icon: '🐛' },
    { ...features[1], icon: '🍞' },
    { ...features[2], icon: '📊' },
    { ...features[3], icon: '🎬' },
  ];

  return (
    <SectionCard
      badge={{ label: t('observability.badge'), color: 'pink' }}
      title={t('observability.title')}
      description={t('observability.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('observability.whyTitle')} icon iconColor="red">
          <InfoBox variant="red" title={t('observability.whyInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('observability.whyInfoDesc')}
            </p>
          </InfoBox>
        </SubSection>

        <SubSection
          title={t('observability.featuresTitle')}
          icon
          iconColor="purple"
        >
          <DemoBox label={t('observability.featuresLabel')}>
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
                  {sentryFeatures[activeFeature].details.map(
                    (detail: string) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <span className="text-red-500 mt-0.5">→</span>
                        {detail}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('observability.integrationTitle')}
          icon
          iconColor="blue"
        >
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

        <SubSection
          title={t('observability.sourcemapTitle')}
          icon
          iconColor="green"
        >
          <InfoBox
            variant="green"
            title={t('observability.sourcemapInfoTitle')}
          >
            <p className="text-sm">{t('observability.sourcemapInfoDesc')}</p>
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

        <SubSection
          title={t('observability.loggingTitle')}
          icon
          iconColor="orange"
        >
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

        <SubSection
          title={t('observability.bestPracticesTitle')}
          icon
          iconColor="purple"
        >
          <div className="grid grid-cols-2 gap-3">
            {(
              t('observability.bestPractices', { returnObjects: true }) as any[]
            ).map((item: any, idx: number) => (
              <div
                key={item.title}
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">
                    {['🏷️', '🌍', '🔔', '📉', '👥', '🔒'][idx]}
                  </span>
                  <h5 className="font-bold text-sm text-gray-900">
                    {item.title}
                  </h5>
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

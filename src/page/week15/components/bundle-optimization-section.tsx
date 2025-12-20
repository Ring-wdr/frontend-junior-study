import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const BundleOptimizationSection = () => {
  const [showAnalyzer, setShowAnalyzer] = useState(false);

  return (
    <SectionCard
      badge={{ label: 'Optimize', color: 'green' }}
      title="번들 최적화 전략"
      description="번들 분석과 최적화로 성능 극대화하기"
    >
      <div className="space-y-8">
        <SubSection title="Bundle Analyzer" icon iconColor="green">
          <InfoBox variant="green" title="번들 분석의 중요성">
            <p className="text-sm leading-relaxed">
              어떤 라이브러리가 번들을 비대하게 만드는지 시각화합니다.
              <strong> moment.js</strong>, <strong>lodash 전체 import</strong> 등
              숨겨진 비용을 발견하세요.
            </p>
          </InfoBox>

          <DemoBox label="Bundle Analyzer Demo">
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setShowAnalyzer(!showAnalyzer)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                {showAnalyzer ? '분석 결과 숨기기' : '번들 분석 시뮬레이션'}
              </button>

              {showAnalyzer && (
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h5 className="font-bold text-sm text-gray-900 mb-3">
                    번들 구성 (Total: 1.2MB)
                  </h5>
                  <div className="space-y-2">
                    {[
                      { name: 'react + react-dom', size: '128KB', percent: 10.7, color: 'bg-blue-500' },
                      { name: 'lodash (전체)', size: '531KB', percent: 44.3, color: 'bg-red-500', issue: true },
                      { name: 'moment.js', size: '288KB', percent: 24, color: 'bg-orange-500', issue: true },
                      { name: 'axios', size: '14KB', percent: 1.2, color: 'bg-green-500' },
                      { name: 'app code', size: '239KB', percent: 19.8, color: 'bg-purple-500' },
                    ].map((item) => (
                      <div key={item.name} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className={item.issue ? 'text-red-600 font-bold' : 'text-gray-600'}>
                            {item.name} {item.issue && '⚠️'}
                          </span>
                          <span className="text-gray-500">{item.size} ({item.percent}%)</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full`}
                            style={{ width: `${item.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 p-2 bg-red-50 rounded text-xs text-red-700">
                    ⚠️ lodash + moment.js가 전체 번들의 68%를 차지합니다!
                  </div>
                </div>
              )}
            </div>
          </DemoBox>

          <CodeBlock
            code={`// webpack-bundle-analyzer 설정
// webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ],
};

// Vite의 경우
// npm install -D rollup-plugin-visualizer
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [visualizer({ open: true })],
});`}
            language="javascript"
            className="mt-4 text-xs"
          />
        </SubSection>

        <SubSection title="라이브러리 최적화" icon iconColor="blue">
          <div className="space-y-3">
            {[
              {
                before: 'import _ from "lodash"',
                after: 'import debounce from "lodash-es/debounce"',
                saving: '~500KB → ~2KB',
                tip: 'lodash-es 사용 + 개별 함수 import',
              },
              {
                before: 'import moment from "moment"',
                after: 'import { format } from "date-fns"',
                saving: '~288KB → ~12KB',
                tip: 'date-fns 또는 dayjs로 교체',
              },
              {
                before: 'import * as Icons from "@heroicons/react"',
                after: 'import { HomeIcon } from "@heroicons/react/24/solid"',
                saving: 'Tree shake 가능',
                tip: '개별 아이콘만 import',
              },
              {
                before: 'import Chart from "chart.js"',
                after: 'import { Chart, registerables } from "chart.js"',
                saving: '필요한 컴포넌트만 등록',
                tip: 'Chart.register() 사용',
              },
            ].map((item) => (
              <div
                key={item.before}
                className="bg-white p-3 rounded-lg border border-gray-200"
              >
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="bg-red-50 p-2 rounded">
                    <span className="text-[10px] text-red-500 font-bold">BEFORE</span>
                    <code className="text-xs block mt-1 text-red-700">{item.before}</code>
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <span className="text-[10px] text-green-500 font-bold">AFTER</span>
                    <code className="text-xs block mt-1 text-green-700">{item.after}</code>
                  </div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-blue-600">💾 {item.saving}</span>
                  <span className="text-gray-500">💡 {item.tip}</span>
                </div>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="Dynamic Import (Code Splitting)" icon iconColor="purple">
          <CodeBlock
            code={`// Route-based Code Splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}

// Component-based Code Splitting
const HeavyChart = lazy(() => import('./components/HeavyChart'));

function Analytics() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}`}
            language="tsx"
            className="text-xs"
          />

          <InfoBox variant="purple" className="mt-3">
            <p className="text-xs">
              <strong>Best Practice:</strong> 라우트별 분할 + 조건부 렌더링 컴포넌트 분할을 조합하세요.
              초기 번들 크기를 줄이고 필요할 때만 코드를 로드합니다.
            </p>
          </InfoBox>
        </SubSection>

        <SubSection title="sideEffects와 Tree Shaking" icon iconColor="orange">
          <InfoBox variant="orange" title="Tree Shaking이 안 되는 경우">
            <p className="text-sm">
              CommonJS 모듈, side effects가 있는 코드, 또는 <code>sideEffects</code> 플래그가 없으면
              Tree shaking이 작동하지 않습니다.
            </p>
          </InfoBox>

          <CodeBlock
            code={`// package.json - sideEffects 설정
{
  "name": "my-library",
  "sideEffects": false,  // 모든 모듈이 순수함
  // 또는 특정 파일만 지정
  "sideEffects": [
    "*.css",
    "*.scss",
    "./src/polyfills.js"
  ]
}

// Tree shaking이 안 되는 패턴
import _ from 'lodash';  // ❌ 전체 import
import { map } from 'lodash';  // ❌ CommonJS라서 안 됨

// Tree shaking이 되는 패턴
import map from 'lodash-es/map';  // ✅ ES Module 개별 import
import { map } from 'lodash-es';  // ✅ ES Module`}
            language="javascript"
            className="mt-3 text-xs"
          />
        </SubSection>

        <SubSection title="최적화 체크리스트" icon iconColor="red">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border border-red-200">
            <div className="space-y-2">
              {[
                'Bundle Analyzer로 큰 의존성 식별',
                'moment.js → date-fns/dayjs 교체',
                'lodash → lodash-es + 개별 import',
                'Dynamic import로 코드 분할',
                'package.json에 sideEffects 설정',
                '이미지/폰트 최적화 (WebP, WOFF2)',
                'gzip/brotli 압축 활성화',
                'Source map은 production에서 비활성화',
              ].map((item, idx) => (
                <label key={item} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const BundleOptimizationSection = () => {
  const { t } = useTranslation('week15');
  const [showAnalyzer, setShowAnalyzer] = useState(false);

  return (
    <SectionCard
      badge={{ label: t('bundleOptimization.badge'), color: 'green' }}
      title={t('bundleOptimization.title')}
      description={t('bundleOptimization.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('bundleOptimization.analyzerTitle')} icon iconColor="green">
          <InfoBox variant="green" title={t('bundleOptimization.analyzerInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('bundleOptimization.analyzerInfoDesc')}
            </p>
          </InfoBox>

          <DemoBox label={t('bundleOptimization.analyzerLabel')}>
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setShowAnalyzer(!showAnalyzer)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                {showAnalyzer ? t('bundleOptimization.analyzerButtonHide') : t('bundleOptimization.analyzerButtonShow')}
              </button>

              {showAnalyzer && (
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h5 className="font-bold text-sm text-gray-900 mb-3">
                    {t('bundleOptimization.analyzerResultTitle')}
                  </h5>
                  <div className="space-y-2">
                    {(t('bundleOptimization.bundleItems', { returnObjects: true }) as any[]).map((item: any) => (
                      <div key={item.name} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className={item.issue ? 'text-red-600 font-bold' : 'text-gray-600'}>
                            {item.name} {item.issue && '⚠️'}
                          </span>
                          <span className="text-gray-500">{item.size} ({item.percent}%)</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.percent > 20 ? 'bg-red-500' : item.percent > 15 ? 'bg-orange-500' : item.percent > 10 ? 'bg-blue-500' : item.percent > 5 ? 'bg-purple-500' : 'bg-green-500'} rounded-full`}
                            style={{ width: `${item.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 p-2 bg-red-50 rounded text-xs text-red-700">
                    {t('bundleOptimization.analyzerWarning')}
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

        <SubSection title={t('bundleOptimization.libraryTitle')} icon iconColor="blue">
          <div className="space-y-3">
            {(t('bundleOptimization.libraryOptimizations', { returnObjects: true }) as any[]).map((item: any) => (
              <div
                key={item.before}
                className="bg-white p-3 rounded-lg border border-gray-200"
              >
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="bg-red-50 p-2 rounded">
                    <span className="text-[10px] text-red-500 font-bold">{t('bundleOptimization.beforeLabel')}</span>
                    <code className="text-xs block mt-1 text-red-700">{item.before}</code>
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <span className="text-[10px] text-green-500 font-bold">{t('bundleOptimization.afterLabel')}</span>
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

        <SubSection title={t('bundleOptimization.dynamicImportTitle')} icon iconColor="purple">
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
              {t('bundleOptimization.dynamicImportInfoDesc')}
            </p>
          </InfoBox>
        </SubSection>

        <SubSection title={t('bundleOptimization.treeShakingTitle')} icon iconColor="orange">
          <InfoBox variant="orange" title={t('bundleOptimization.treeShakingInfoTitle')}>
            <p className="text-sm">
              {t('bundleOptimization.treeShakingInfoDesc')}
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

        <SubSection title={t('bundleOptimization.checklistTitle')} icon iconColor="red">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border border-red-200">
            <div className="space-y-2">
              {(t('bundleOptimization.checklistItems', { returnObjects: true }) as string[]).map((item: string) => (
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

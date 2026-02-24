import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const BundlingSection = () => {
  const { t } = useTranslation('week15');
  const [selectedTool, setSelectedTool] = useState(0);

  const bundlers = t('bundling.bundlers', { returnObjects: true }) as any[];

  return (
    <SectionCard
      badge={{ label: t('bundling.badge'), color: 'orange' }}
      title={t('bundling.title')}
      description={t('bundling.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('bundling.comparisonTitle')}
          icon
          iconColor="orange"
        >
          <DemoBox label={t('bundling.comparisonLabel')}>
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {bundlers.map((bundler, idx) => (
                  <button
                    key={bundler.name}
                    type="button"
                    onClick={() => setSelectedTool(idx)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedTool === idx
                        ? 'bg-orange-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {bundler.icon} {bundler.name}
                  </button>
                ))}
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">
                      {bundlers[selectedTool].icon}
                    </span>
                    <h4 className="font-bold text-gray-900">
                      {bundlers[selectedTool].name}
                    </h4>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                    {bundlers[selectedTool].status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 p-3 rounded">
                    <h5 className="font-bold text-green-700 text-sm mb-2">
                      {t('bundling.prosLabel')}
                    </h5>
                    <ul className="text-xs text-green-800 space-y-1">
                      {bundlers[selectedTool].pros.map((pro: string) => (
                        <li key={pro}>✓ {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <h5 className="font-bold text-red-700 text-sm mb-2">
                      {t('bundling.consLabel')}
                    </h5>
                    <ul className="text-xs text-red-800 space-y-1">
                      {bundlers[selectedTool].cons.map((con: string) => (
                        <li key={con}>✗ {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title={t('bundling.webpackTitle')} icon iconColor="blue">
          <div className="grid grid-cols-2 gap-3">
            {(
              t('bundling.webpackConcepts', { returnObjects: true }) as any[]
            ).map((item: any) => (
              <div
                key={item.concept}
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
              >
                <h5 className="font-bold text-sm text-blue-600">
                  {item.concept}
                </h5>
                <p className="text-xs text-gray-500 mb-1">{item.desc}</p>
                <code className="text-[10px] text-gray-600 bg-white px-1.5 py-0.5 rounded">
                  {item.example}
                </code>
              </div>
            ))}
          </div>

          <CodeBlock
            code={`// webpack.config.js 기본 구조
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      { test: /\\.tsx?$/, use: 'ts-loader' },
      { test: /\\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
  optimization: {
    splitChunks: { chunks: 'all' },
  },
};`}
            language="javascript"
            className="mt-4 text-xs"
          />
        </SubSection>

        <SubSection title={t('bundling.viteTitle')} icon iconColor="green">
          <InfoBox variant="green" title={t('bundling.viteInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('bundling.viteInfoDesc')}
            </p>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h5 className="font-bold text-sm text-gray-900 mb-3">
                {t('bundling.viteDiffTitle')}
              </h5>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h6 className="font-medium text-gray-700 mb-2">
                    {t('bundling.viteDiffWebpack')}
                  </h6>
                  <div className="bg-orange-50 p-2 rounded text-xs">
                    <code>{t('bundling.viteDiffWebpackCode')}</code>
                    <p className="text-orange-600 mt-1">
                      {t('bundling.viteDiffWebpackNote')}
                    </p>
                  </div>
                </div>
                <div>
                  <h6 className="font-medium text-gray-700 mb-2">
                    {t('bundling.viteDiffVite')}
                  </h6>
                  <div className="bg-green-50 p-2 rounded text-xs">
                    <code>{t('bundling.viteDiffViteCode')}</code>
                    <p className="text-green-600 mt-1">
                      {t('bundling.viteDiffViteNote')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <CodeBlock
              code={`// vite.config.ts - 간결한 설정
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
});`}
              language="typescript"
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title={t('bundling.conceptsTitle')} icon iconColor="purple">
          <div className="space-y-3">
            {(
              t('bundling.buildConcepts', { returnObjects: true }) as any[]
            ).map((item: any) => (
              <div
                key={item.term}
                className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-100"
              >
                <div className="flex items-center justify-between mb-1">
                  <h5 className="font-bold text-sm text-purple-700">
                    {item.term}
                  </h5>
                </div>
                <p className="text-xs text-gray-600 mb-1">{item.desc}</p>
                <p className="text-[10px] text-purple-500">💡 {item.tip}</p>
              </div>
            ))}
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

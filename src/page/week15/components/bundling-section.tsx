import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const BundlingSection = () => {
  const [selectedTool, setSelectedTool] = useState(0);

  const bundlers = [
    {
      name: 'Webpack',
      icon: '📦',
      status: '레거시 표준',
      pros: ['풍부한 생태계', '세밀한 설정', '검증된 안정성'],
      cons: ['느린 빌드', '복잡한 설정', '러닝 커브'],
    },
    {
      name: 'Vite',
      icon: '⚡',
      status: '현대 표준',
      pros: ['빠른 dev 서버', 'ES Modules 기반', '간단한 설정'],
      cons: ['CommonJS 호환 이슈', '상대적으로 새로움'],
    },
    {
      name: 'Rollup',
      icon: '🎯',
      status: '라이브러리용',
      pros: ['최적의 tree shaking', '작은 번들', 'ES Module 출력'],
      cons: ['앱 빌드에 부적합', '플러그인 생태계 작음'],
    },
  ];

  return (
    <SectionCard
      badge={{ label: 'Build', color: 'orange' }}
      title="번들링 이해 (Webpack/Vite/Rollup)"
      description="모던 프론트엔드 빌드 도구의 핵심 개념"
    >
      <div className="space-y-8">
        <SubSection title="번들러 비교" icon iconColor="orange">
          <DemoBox label="Bundler Comparison">
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
                    <span className="text-3xl">{bundlers[selectedTool].icon}</span>
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
                    <h5 className="font-bold text-green-700 text-sm mb-2">장점</h5>
                    <ul className="text-xs text-green-800 space-y-1">
                      {bundlers[selectedTool].pros.map((pro) => (
                        <li key={pro}>✓ {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <h5 className="font-bold text-red-700 text-sm mb-2">단점</h5>
                    <ul className="text-xs text-red-800 space-y-1">
                      {bundlers[selectedTool].cons.map((con) => (
                        <li key={con}>✗ {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Webpack 핵심 개념" icon iconColor="blue">
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                concept: 'Entry',
                desc: '번들링 시작점',
                example: 'entry: "./src/index.js"',
              },
              {
                concept: 'Output',
                desc: '번들 출력 경로',
                example: 'output: { path, filename }',
              },
              {
                concept: 'Loaders',
                desc: '파일 변환기',
                example: 'babel-loader, ts-loader',
              },
              {
                concept: 'Plugins',
                desc: '번들 최적화/변환',
                example: 'HtmlWebpackPlugin',
              },
              {
                concept: 'Mode',
                desc: 'development/production',
                example: '자동 최적화 설정',
              },
              {
                concept: 'DevServer',
                desc: '개발 서버 + HMR',
                example: 'webpack-dev-server',
              },
            ].map((item) => (
              <div
                key={item.concept}
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
              >
                <h5 className="font-bold text-sm text-blue-600">{item.concept}</h5>
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

        <SubSection title="Vite - 현대 프론트엔드 표준" icon iconColor="green">
          <InfoBox variant="green" title="왜 Vite인가?">
            <p className="text-sm leading-relaxed">
              Vite는 <strong>ES Modules</strong>를 활용해 번들 없이 개발 서버를 실행합니다.
              Webpack 대비 <strong>10-100배 빠른</strong> Cold Start를 제공하며,
              프로덕션 빌드는 Rollup을 사용합니다.
            </p>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h5 className="font-bold text-sm text-gray-900 mb-3">Vite vs Webpack 차이</h5>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h6 className="font-medium text-gray-700 mb-2">Webpack (Bundle-based)</h6>
                  <div className="bg-orange-50 p-2 rounded text-xs">
                    <code>모든 모듈 → 번들 생성 → 서버 시작</code>
                    <p className="text-orange-600 mt-1">느린 Cold Start</p>
                  </div>
                </div>
                <div>
                  <h6 className="font-medium text-gray-700 mb-2">Vite (ESM-based)</h6>
                  <div className="bg-green-50 p-2 rounded text-xs">
                    <code>서버 시작 → 요청 시 모듈 변환</code>
                    <p className="text-green-600 mt-1">즉각적인 시작</p>
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

        <SubSection title="핵심 빌드 개념" icon iconColor="purple">
          <div className="space-y-3">
            {[
              {
                term: 'Tree Shaking',
                desc: '사용하지 않는 코드를 번들에서 제거',
                tip: 'ES Modules + sideEffects: false 필요',
              },
              {
                term: 'Code Splitting',
                desc: '번들을 여러 청크로 분리',
                tip: 'dynamic import()로 구현',
              },
              {
                term: 'HMR (Hot Module Replacement)',
                desc: '전체 새로고침 없이 모듈만 교체',
                tip: '개발 생산성 향상',
              },
              {
                term: 'Source Maps',
                desc: '번들된 코드를 원본에 매핑',
                tip: '디버깅 필수, production에선 비활성화',
              },
            ].map((item) => (
              <div
                key={item.term}
                className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-100"
              >
                <div className="flex items-center justify-between mb-1">
                  <h5 className="font-bold text-sm text-purple-700">{item.term}</h5>
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

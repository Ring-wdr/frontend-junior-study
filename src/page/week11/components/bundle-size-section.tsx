import {
  AlertTriangle,
  BarChart,
  Code2,
  Package,
  Scissors,
} from 'lucide-react';

export function BundleSizeSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
            <Package size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            번들 사이즈 최적화
          </h2>
        </div>

        <p className="text-gray-600 leading-relaxed text-lg">
          JavaScript 번들 크기는 <strong>파싱, 컴파일, 실행 시간</strong>에
          직접적인 영향을 미칩니다. 불필요한 코드를 제거하고 효율적으로
          패키징해야 합니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-red-200 bg-red-50 rounded-xl p-5">
            <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
              <AlertTriangle size={18} />
              피해야 할 패턴
            </h3>
            <ul className="space-y-2 text-sm text-red-800">
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                <span>
                  <code className="bg-white/70 px-1 rounded">moment.js</code>{' '}
                  (300KB) → day.js (2KB)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                <span>
                  <code className="bg-white/70 px-1 rounded">lodash</code> 전체
                  import
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                <span>사용하지 않는 아이콘 라이브러리 전체 import</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                <span>Polyfill 무분별 포함</span>
              </li>
            </ul>
          </div>

          <div className="border border-green-200 bg-green-50 rounded-xl p-5">
            <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
              <Scissors size={18} />
              권장 패턴
            </h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>
                  Named import:{' '}
                  <code className="bg-white/70 px-1 rounded">
                    {'import { debounce } from "lodash-es"'}
                  </code>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>
                  date-fns:{' '}
                  <code className="bg-white/70 px-1 rounded">
                    {'import { format } from "date-fns"'}
                  </code>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>
                  lucide-react:{' '}
                  <code className="bg-white/70 px-1 rounded">
                    {'import { Home } from "lucide-react"'}
                  </code>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>browserslist 기반 자동 polyfill</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Code2 className="text-cyan-400" size={18} />
            <span className="text-cyan-400 text-sm font-medium">
              Tree Shaking 예시
            </span>
          </div>
          <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
            {`// ❌ Bad: 전체 라이브러리 번들됨
import _ from 'lodash';
_.debounce(fn, 300);

// ✅ Good: debounce만 번들됨
import { debounce } from 'lodash-es';
debounce(fn, 300);

// 또는 경로 직접 지정
import debounce from 'lodash/debounce';`}
          </pre>
        </div>

        <div className="bg-gray-50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart className="text-orange-600" size={20} />
            <h3 className="font-bold text-gray-900">Bundle Analyzer</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            번들의 구성을 시각화하여 어떤 패키지가 용량을 차지하는지 분석합니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">
                webpack-bundle-analyzer
              </h4>
              <div className="bg-gray-900 rounded p-2 overflow-x-auto">
                <pre className="text-xs text-gray-300 font-mono">
                  {`// next.config.js
const withBundleAnalyzer = require(
  '@next/bundle-analyzer'
)({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({});

// 실행
// ANALYZE=true npm run build`}
                </pre>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">분석 포인트</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>가장 큰 청크 식별</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>중복 의존성 확인</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>사용하지 않는 코드 발견</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>node_modules 비중 확인</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: '< 200KB', desc: '초기 JS (gzip)', color: 'green' },
            { label: '< 1s', desc: 'JS 파싱 시간', color: 'green' },
            { label: 'ESM', desc: 'Tree-shake 가능', color: 'blue' },
            { label: 'Side Effects', desc: 'false 명시', color: 'purple' },
          ].map((item) => (
            <div
              key={item.label}
              className={`bg-${item.color}-50 rounded-lg p-3 text-center border border-${item.color}-200`}
            >
              <p className={`text-lg font-bold text-${item.color}-600`}>
                {item.label}
              </p>
              <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <strong>sideEffects:</strong> package.json에{' '}
          <code>"sideEffects": false</code>를 선언하면 번들러가 사용하지 않는
          export를 안전하게 제거할 수 있습니다. CSS import가 있다면{' '}
          <code>"sideEffects": ["*.css"]</code>로 명시하세요.
        </div>
      </div>
    </div>
  );
}

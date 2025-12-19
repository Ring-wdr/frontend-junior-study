import {
  AlertTriangle,
  BarChart,
  Box,
  Code2,
  Package,
  Scissors,
} from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/ui/code-block';

export function BundleSizeSection() {
  const [nodes, setNodes] = useState([
    {
      id: 'root',
      name: 'App Root',
      size: 10,
      used: true,
      type: 'root',
      x: 50,
      y: 10,
    },
    {
      id: 'utils',
      name: 'Utils',
      size: 5,
      used: true,
      type: 'group',
      parent: 'root',
      x: 25,
      y: 40,
    },
    {
      id: 'comps',
      name: 'Components',
      size: 5,
      used: true,
      type: 'group',
      parent: 'root',
      x: 75,
      y: 40,
    },
    // Leaves
    {
      id: 'fmt',
      name: 'formatDate',
      size: 2,
      used: true,
      type: 'leaf',
      parent: 'utils',
      x: 15,
      y: 70,
    },
    {
      id: 'math',
      name: 'heavyMath',
      size: 50,
      used: false,
      type: 'leaf',
      parent: 'utils',
      x: 35,
      y: 70,
    }, // UNUSED
    {
      id: 'head',
      name: 'Header',
      size: 10,
      used: true,
      type: 'leaf',
      parent: 'comps',
      x: 65,
      y: 70,
    },
    {
      id: 'foot',
      name: 'Footer',
      size: 8,
      used: true,
      type: 'leaf',
      parent: 'comps',
      x: 80,
      y: 70,
    },
    {
      id: 'modal',
      name: 'OldModal',
      size: 30,
      used: false,
      type: 'leaf',
      parent: 'comps',
      x: 95,
      y: 70,
    }, // UNUSED
  ]);

  const [shaken, setShaken] = useState(false);

  const totalSize = nodes.reduce(
    (acc, node) => acc + (node.type === 'leaf' ? node.size : 0),
    0,
  );

  const shake = () => {
    setShaken(true);
    setTimeout(() => {
      setNodes((prev) => prev.filter((n) => n.used));
    }, 600); // Animation duration
  };

  const reset = () => {
    setShaken(false);
    setNodes([
      {
        id: 'root',
        name: 'App Root',
        size: 10,
        used: true,
        type: 'root',
        x: 50,
        y: 10,
      },
      {
        id: 'utils',
        name: 'Utils',
        size: 5,
        used: true,
        type: 'group',
        parent: 'root',
        x: 25,
        y: 40,
      },
      {
        id: 'comps',
        name: 'Components',
        size: 5,
        used: true,
        type: 'group',
        parent: 'root',
        x: 75,
        y: 40,
      },
      {
        id: 'fmt',
        name: 'formatDate',
        size: 2,
        used: true,
        type: 'leaf',
        parent: 'utils',
        x: 15,
        y: 70,
      },
      {
        id: 'math',
        name: 'heavyMath',
        size: 50,
        used: false,
        type: 'leaf',
        parent: 'utils',
        x: 35,
        y: 70,
      },
      {
        id: 'head',
        name: 'Header',
        size: 10,
        used: true,
        type: 'leaf',
        parent: 'comps',
        x: 65,
        y: 70,
      },
      {
        id: 'foot',
        name: 'Footer',
        size: 8,
        used: true,
        type: 'leaf',
        parent: 'comps',
        x: 80,
        y: 70,
      },
      {
        id: 'modal',
        name: 'OldModal',
        size: 30,
        used: false,
        type: 'leaf',
        parent: 'comps',
        x: 95,
        y: 70,
      },
    ]);
  };

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

        {/* Visualizer */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl overflow-hidden relative">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-bold text-white flex items-center gap-2">
                <Scissors size={18} className="text-orange-400" /> Tree Shaking
                Simulator
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Remove dead code to reduce bundle size
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold font-mono text-green-400 transition-all duration-500">
                {totalSize} KB
              </div>
              <div className="text-xs text-gray-500">Total Bundle Size</div>
            </div>
          </div>

          <div className="relative h-[300px] bg-gray-800 rounded-lg border border-gray-700 mx-auto w-full max-w-lg mb-6">
            {/* Edges */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {nodes.map((node) => {
                if (!node.parent) return null;
                const parent = nodes.find((n) => n.id === node.parent);
                if (!parent) return null;

                // Simple visual opacity for shaken connection
                const isDying = shaken && !node.used;

                return (
                  <line
                    key={`line-${node.id}`}
                    x1={`${parent.x}%`}
                    y1={`${parent.y}%`}
                    x2={`${node.x}%`}
                    y2={`${node.y}%`}
                    stroke={isDying ? '#ef4444' : '#4b5563'}
                    strokeWidth="2"
                    className={`transition-all duration-500 ${isDying ? 'opacity-0' : 'opacity-50'}`}
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {nodes.map((node) => {
              const isDying = shaken && !node.used;

              return (
                <div
                  key={node.id}
                  className={`
                            absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 transition-all duration-500
                            ${isDying ? 'translate-y-20 opacity-0 scale-50 rotate-12' : ''}
                        `}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <div
                    className={`
                            w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-sm z-10
                            ${
                              node.type === 'root'
                                ? 'bg-indigo-600 border-indigo-400 text-white'
                                : node.type === 'group'
                                  ? 'bg-blue-600 border-blue-400 text-white'
                                  : node.used
                                    ? 'bg-green-600 border-green-400 text-white'
                                    : 'bg-red-900/80 border-red-500 text-red-200'
                            }
                         `}
                  >
                    {node.type === 'root' ? (
                      <Package size={16} />
                    ) : node.type === 'group' ? (
                      <Box size={16} />
                    ) : (
                      <Code2 size={16} />
                    )}
                  </div>
                  <div className="text-[10px] text-gray-300 bg-gray-900/80 px-1.5 rounded whitespace-nowrap">
                    {node.name}{' '}
                    <span className="text-gray-500">({node.size}KB)</span>
                  </div>
                  {!node.used && !shaken && (
                    <div className="text-[8px] text-red-400 font-bold uppercase animate-pulse">
                      Unused
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4">
            {shaken ? (
              <button
                type="button"
                onClick={reset}
                className="px-6 py-2 bg-gray-700 text-white rounded-full font-bold hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                Reset
              </button>
            ) : (
              <button
                type="button"
                onClick={shake}
                className="px-6 py-2 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-colors shadow-lg animate-bounce flex items-center gap-2"
              >
                <Scissors size={16} /> Run Tree Shaking
              </button>
            )}
          </div>
        </div>

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
          <div className="overflow-hidden rounded-lg">
            <CodeBlock
              language="javascript"
              code={`// ❌ Bad: 전체 라이브러리 번들됨
import _ from 'lodash';
_.debounce(fn, 300);

// ✅ Good: debounce만 번들됨
import { debounce } from 'lodash-es';
debounce(fn, 300);

// 또는 경로 직접 지정
import debounce from 'lodash/debounce';`}
            />
          </div>
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
                <div className="overflow-hidden rounded-lg">
                  <CodeBlock
                    language="javascript"
                    code={`// next.config.js
const withBundleAnalyzer = require(
  '@next/bundle-analyzer'
)({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({});

// 실행
// ANALYZE=true npm run build`}
                  />
                </div>
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

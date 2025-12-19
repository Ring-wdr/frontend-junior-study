import {
  Box,
  Code2,
  Download,
  Laptop,
  Layers,
  Package,
  RefreshCw,
  Server,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/ui/code-block';

export function CodeSplittingSection() {
  const [activeTab, setActiveTab] = useState<'react' | 'nextjs'>('react');

  // Visualizer State
  const [mode, setMode] = useState<'monolith' | 'split'>('monolith');
  const [loadingState, setLoadingState] = useState<{
    main: number;
    dashboard: number;
    chart: number;
  }>({ main: 0, dashboard: 0, chart: 0 });
  const [isLoaded, setIsLoaded] = useState<{
    main: boolean; // Initial Load
    dashboard: boolean; // Lazy Loaded
    chart: boolean; // Lazy Loaded
  }>({ main: false, dashboard: false, chart: false });
  const [isSimulating, setIsSimulating] = useState(false);

  const resetSimulation = () => {
    setLoadingState({ main: 0, dashboard: 0, chart: 0 });
    setIsLoaded({ main: false, dashboard: false, chart: false });
    setIsSimulating(false);
  };

  const simulateLoad = (part: 'main' | 'dashboard' | 'chart') => {
    if (isSimulating) return;
    setIsSimulating(true);

    const duration = mode === 'monolith' ? 3000 : part === 'main' ? 800 : 1200;
    const startTime = performance.now();

    const animate = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(100, (elapsed / duration) * 100);

      setLoadingState((prev) => {
        if (mode === 'monolith') {
          // In monolith, everything loads at once (conceptually main bundle includes everything)
          return { main: progress, dashboard: progress, chart: progress };
        } else {
          return { ...prev, [part]: progress };
        }
      });

      if (progress < 100) {
        requestAnimationFrame(animate);
      } else {
        setIsSimulating(false);
        setIsLoaded((prev) => {
          if (mode === 'monolith') {
            return { main: true, dashboard: true, chart: true };
          } else {
            return { ...prev, [part]: true };
          }
        });
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Package size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            코드 스플리팅 (Code Splitting)
          </h2>
        </div>

        <p className="text-gray-600 leading-relaxed text-lg">
          초기 JS 번들을 작게 유지하여 <strong>First Load 속도</strong>를
          개선합니다. 사용자가 실제로 필요할 때 코드를 로드합니다.
        </p>

        {/* Visualizer */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h3 className="font-bold text-white flex items-center gap-2">
                <Download size={18} className="text-indigo-400" /> Bundle Loader
                Simulator
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Compare Initial Load performance
              </p>
            </div>
            <div className="flex bg-slate-800 p-1 rounded-lg">
              <button
                onClick={() => {
                  setMode('monolith');
                  resetSimulation();
                }}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${mode === 'monolith' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Monolithic Bundle (Classic)
              </button>
              <button
                onClick={() => {
                  setMode('split');
                  resetSimulation();
                }}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${mode === 'split' ? 'bg-green-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Code Splitting (Modern)
              </button>
            </div>
          </div>

          <div className="flex gap-8 relative items-start">
            {/* Server Side */}
            <div className="flex flex-col items-center gap-2 w-24 shrink-0">
              <Server size={32} className="text-slate-500" />
              <span className="text-xs text-slate-500 font-mono">Server</span>
            </div>

            {/* Network / Connection */}
            <div className="flex-1 flex flex-col gap-4 py-2">
              {/* Main Bundle Track */}
              <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full bg-indigo-500 transition-all duration-75`}
                  style={{ width: `${loadingState.main}%` }}
                ></div>
              </div>

              {/* Split Tracks (Only visible in Split mode conceptually, but we simulate requests) */}
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>Running Request...</span>
                <span>{isSimulating ? 'Downloading...' : 'Idle'}</span>
              </div>
            </div>

            {/* Client Side */}
            <div className="flex flex-col items-center gap-2 w-24 shrink-0">
              <Laptop size={32} className="text-slate-500" />
              <span className="text-xs text-slate-500 font-mono">Client</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Page / Bundle Visuals */}

            {/* Main App */}
            <div
              className={`
                    border-2 rounded-lg p-4 transition-all duration-300 relative overflow-hidden group
                    ${isLoaded.main ? 'border-indigo-500 bg-indigo-900/20' : 'border-slate-700 bg-slate-800/50'}
                 `}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-white">Main App</span>
                {mode === 'split' && (
                  <span className="text-xs bg-indigo-900 text-indigo-300 px-1.5 py-0.5 rounded">
                    Core chunk
                  </span>
                )}
              </div>
              {isLoaded.main ? (
                <div className="text-xs text-indigo-300">
                  ✓ Loaded
                  <br />
                  Ready to interact
                </div>
              ) : (
                <button
                  onClick={() => simulateLoad('main')}
                  disabled={isSimulating}
                  className="w-full py-1.5 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSimulating && loadingState.main > 0
                    ? 'Loading...'
                    : 'Load App'}
                </button>
              )}

              {mode === 'monolith' && (
                <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="text-xs text-center p-2 text-white">
                    Contains Everything (Huge Size!!)
                  </div>
                </div>
              )}
            </div>

            {/* Dashboard (Lazy) */}
            <div
              className={`
                    border-2 rounded-lg p-4 transition-all duration-300 relative
                    ${isLoaded.dashboard ? 'border-green-500 bg-green-900/20' : 'border-slate-700 bg-slate-800/50'}
                    ${mode === 'monolith' ? 'opacity-100' : ''}
                 `}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-white">Dashboard</span>
                {mode === 'split' && (
                  <span className="text-xs bg-green-900 text-green-300 px-1.5 py-0.5 rounded">
                    Lazy chunk
                  </span>
                )}
              </div>
              {isLoaded.dashboard ? (
                <div className="text-xs text-green-400">
                  ✓ Loaded
                  <br />
                  User requested
                </div>
              ) : mode === 'monolith' ? (
                <div className="text-xs text-slate-500">
                  {isLoaded.main ? 'Bundled with Main' : 'Waiting for Main...'}
                </div>
              ) : (
                <button
                  onClick={() => simulateLoad('dashboard')}
                  disabled={!isLoaded.main || (isSimulating as boolean)}
                  className="w-full py-1.5 bg-slate-700 text-slate-300 text-xs rounded hover:bg-green-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Load Feature
                </button>
              )}
            </div>

            {/* Chart (Lazy) */}
            <div
              className={`
                    border-2 rounded-lg p-4 transition-all duration-300 relative
                    ${isLoaded.chart ? 'border-pink-500 bg-pink-900/20' : 'border-slate-700 bg-slate-800/50'}
                 `}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-white">Heavy Chart</span>
                {mode === 'split' && (
                  <span className="text-xs bg-pink-900 text-pink-300 px-1.5 py-0.5 rounded">
                    Lazy chunk
                  </span>
                )}
              </div>
              {isLoaded.chart ? (
                <div className="text-xs text-pink-400">
                  ✓ Loaded
                  <br />
                  User requested
                </div>
              ) : mode === 'monolith' ? (
                <div className="text-xs text-slate-500">
                  {isLoaded.main ? 'Bundled with Main' : 'Waiting for Main...'}
                </div>
              ) : (
                <button
                  onClick={() => simulateLoad('chart')}
                  disabled={!isLoaded.main || (isSimulating as boolean)}
                  className="w-full py-1.5 bg-slate-700 text-slate-300 text-xs rounded hover:bg-pink-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Load Feature
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 p-3 bg-slate-800 rounded text-xs text-slate-400 font-mono">
            {mode === 'monolith' ? (
              <span>
                <span className="text-red-400">Blocking Time: 3000ms</span> |
                Total Bundle Size: 5MB (Loaded upfront)
              </span>
            ) : (
              <span>
                <span className="text-green-400">Blocking Time: 800ms</span> |
                Initial Bundle: 1.2MB | Other chunks loaded on demand
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('react')}
            className={`py-2 px-4 rounded-md font-medium transition-all ${
              activeTab === 'react'
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            React.lazy
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('nextjs')}
            className={`py-2 px-4 rounded-md font-medium transition-all ${
              activeTab === 'nextjs'
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Next.js dynamic
          </button>
        </div>

        {activeTab === 'react' && (
          <div className="bg-gray-900 rounded-xl p-5 overflow-x-auto">
            <div className="flex items-center gap-2 mb-3">
              <Code2 className="text-cyan-400" size={18} />
              <span className="text-cyan-400 text-sm font-medium">
                React.lazy + Suspense
              </span>
            </div>
            <div className="overflow-hidden rounded-lg">
              <CodeBlock
                language="javascript"
                code={`import { lazy, Suspense } from 'react';

// 동적으로 컴포넌트 import
const HeavyChart = lazy(() => import('./HeavyChart'));
const AdminPanel = lazy(() => import('./AdminPanel'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {showChart && <HeavyChart />}
      {isAdmin && <AdminPanel />}
    </Suspense>
  );
}`}
              />
            </div>
          </div>
        )}

        {activeTab === 'nextjs' && (
          <div className="bg-gray-900 rounded-xl p-5 overflow-x-auto">
            <div className="flex items-center gap-2 mb-3">
              <Code2 className="text-cyan-400" size={18} />
              <span className="text-cyan-400 text-sm font-medium">
                Next.js dynamic import
              </span>
            </div>
            <div className="overflow-hidden rounded-lg">
              <CodeBlock
                language="javascript"
                code={`import dynamic from 'next/dynamic';

// SSR 비활성화 옵션 가능
const HeavyEditor = dynamic(
  () => import('./HeavyEditor'),
  {
    loading: () => <p>Loading editor...</p>,
    ssr: false  // 클라이언트에서만 로드
  }
);

// 페이지 자체도 자동 코드 스플리팅
// pages/admin.tsx → /admin 접근 시에만 로드`}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="p-5 rounded-xl bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <Box className="text-indigo-600" size={20} />
              <h4 className="font-bold text-gray-900">언제 사용해야 할까?</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span>초기 렌더에 필요 없는 대형 페이지</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span>Chart.js, Editor 같은 무거운 라이브러리</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span>관리자 페이지 등 낮은 사용 빈도</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span>모달, 다이얼로그 같은 조건부 UI</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="text-green-600" size={20} />
              <h4 className="font-bold text-gray-900">효과</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>초기 JS 번들 크기 감소</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>TTI (Time to Interactive) 개선</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>LCP 개선 (메인 스레드 여유)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>캐시 효율성 향상</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <Zap className="text-blue-600 shrink-0" size={20} />
          <div className="text-sm text-blue-800">
            <strong>Route-based Splitting:</strong> Next.js App Router나 React
            Router v7+에서는 페이지 단위로 자동 코드 스플리팅이 적용됩니다.
            별도의 설정 없이도 각 라우트가 독립적인 청크로 분리됩니다.
          </div>
        </div>
      </div>
    </div>
  );
}

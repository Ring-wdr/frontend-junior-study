import { Box, Code2, Layers, Package, Zap } from 'lucide-react';
import { useState } from 'react';

export function CodeSplittingSection() {
  const [activeTab, setActiveTab] = useState<'react' | 'nextjs'>('react');

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
            <pre className="text-sm text-gray-300 font-mono">
              {`import { lazy, Suspense } from 'react';

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
            </pre>
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
            <pre className="text-sm text-gray-300 font-mono">
              {`import dynamic from 'next/dynamic';

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
            </pre>
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

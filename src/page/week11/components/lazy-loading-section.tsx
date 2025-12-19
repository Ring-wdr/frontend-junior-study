import { Code2, Eye, Image, Loader2, Monitor } from 'lucide-react';
import { useState } from 'react';

export function LazyLoadingSection() {
  const [visibleItems, setVisibleItems] = useState(3);

  const items = [
    { id: 1, color: 'bg-blue-200' },
    { id: 2, color: 'bg-green-200' },
    { id: 3, color: 'bg-purple-200' },
    { id: 4, color: 'bg-orange-200' },
    { id: 5, color: 'bg-pink-200' },
    { id: 6, color: 'bg-cyan-200' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-100 text-cyan-600 rounded-lg">
            <Eye size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Lazy Loading 전략
          </h2>
        </div>

        <p className="text-gray-600 leading-relaxed text-lg">
          사용자가 <strong>실제로 필요로 할 때</strong> 리소스를 로드합니다.
          초기 로드 시간을 줄이고 불필요한 네트워크 요청을 방지합니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Image className="text-blue-600" size={20} />
                <h4 className="font-bold text-gray-900">이미지 Lazy Loading</h4>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
                <pre className="text-xs text-gray-300 font-mono">
                  {`<!-- Native lazy loading -->
<img
  src="hero.jpg"
  loading="lazy"
  alt="Hero"
/>

<!-- Next.js Image -->
<Image
  src="/hero.jpg"
  alt="Hero"
  loading="lazy"  // 기본값
/>`}
                </pre>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Monitor className="text-purple-600" size={20} />
                <h4 className="font-bold text-gray-900">
                  IntersectionObserver
                </h4>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
                <pre className="text-xs text-gray-300 font-mono">
                  {`const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadContent(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { rootMargin: '100px' }  // 미리 로드
);`}
                </pre>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl p-5 h-full">
              <div className="flex items-center gap-2 mb-3">
                <Loader2 className="text-green-600" size={20} />
                <h4 className="font-bold text-gray-900">Lazy Loading 데모</h4>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                스크롤 시 콘텐츠가 로드되는 것을 시뮬레이션합니다.
              </p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {items.slice(0, visibleItems).map((item) => (
                  <div
                    key={item.id}
                    className={`${item.color} h-12 rounded-lg flex items-center justify-center text-sm font-medium text-gray-600 animate-in fade-in duration-300`}
                  >
                    Item {item.id}
                  </div>
                ))}
                {visibleItems < items.length && (
                  <div className="h-12 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setVisibleItems((prev) => prev + 1)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Load More...
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="text-gray-600" size={20} />
            <h4 className="font-bold text-gray-900">Lazy Loading 유형</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h5 className="font-semibold text-gray-900 mb-2">이미지</h5>
              <p className="text-xs text-gray-500">
                loading="lazy" 속성 또는 IntersectionObserver 사용
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h5 className="font-semibold text-gray-900 mb-2">컴포넌트</h5>
              <p className="text-xs text-gray-500">
                React.lazy() + Suspense로 조건부 로드
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h5 className="font-semibold text-gray-900 mb-2">데이터</h5>
              <p className="text-xs text-gray-500">
                무한 스크롤, 페이지네이션으로 필요한 만큼만 fetch
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
          <strong>주의:</strong> Above the fold (첫 화면에 보이는 영역)
          콘텐츠에는 lazy loading을 적용하지 마세요. LCP 요소가 늦게 로드되면
          점수가 하락합니다.
        </div>
      </div>
    </div>
  );
}

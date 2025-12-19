import {
  ArrowDown,
  CheckCircle2,
  Code2,
  Eye,
  Image,
  Loader2,
  Monitor,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { CodeBlock } from '../../../components/ui/code-block';

export function LazyLoadingSection() {
  const [items, setItems] = useState(
    Array.from({ length: 12 }, (_, i) => ({ id: i + 1, loaded: false })),
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Reset visualizer
  const reset = () => {
    setItems(items.map((i) => ({ ...i, loaded: false })));
  };

  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-id'));

            // Simulate network delay
            setTimeout(() => {
              setItems((prev) =>
                prev.map((item) =>
                  item.id === id ? { ...item, loaded: true } : item,
                ),
              );
            }, 600); // 600ms delay to make it visible

            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        root: containerRef.current,
        rootMargin: '0px',
        threshold: 0.1,
      },
    );

    const elements = containerRef.current.querySelectorAll('.lazy-item');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [items.some((i) => !i.loaded)]); // Re-bind if reset (simplified logic)

  // Re-observe on reset is tricky with just deps, so let's manually re-trigger in a clean way
  // Actually, the simplest way for this demo is just key-forcing the container or checking loaded state in a simpler way.
  // For the demo, let's keep it simple.

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

        {/* Visualizer */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl overflow-hidden flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-white flex items-center gap-2">
                <Monitor size={18} className="text-cyan-400" />{' '}
                IntersectionObserver Simulator
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Scroll down to see images load on demand
              </p>
            </div>
            <button
              onClick={reset}
              className="px-3 py-1.5 bg-slate-700 text-slate-200 text-xs rounded hover:bg-slate-600"
            >
              Reset Demo
            </button>
          </div>

          <div className="relative w-full max-w-sm h-[400px] bg-white rounded-lg overflow-hidden border-4 border-slate-700 shadow-2xl">
            {/* Scrollable Area */}
            <div
              ref={containerRef}
              className="h-full overflow-y-auto p-4 space-y-8 scroll-smooth"
            >
              <div className="text-center p-4 bg-gray-100 rounded-lg mb-8">
                <h4 className="font-bold text-gray-800">Heading Section</h4>
                <p className="text-xs text-gray-500">
                  Above the fold content (Always loaded)
                </p>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  data-id={item.id}
                  className={`lazy-item w-full aspect-video rounded-lg flex items-center justify-center transition-all duration-700 ${
                    item.loaded
                      ? 'bg-gradient-to-br from-cyan-500 to-blue-600 scale-100 opacity-100'
                      : 'bg-gray-100 scale-95 opacity-50'
                  }`}
                >
                  {item.loaded ? (
                    <div className="text-white flex flex-col items-center animate-in zoom-in-50">
                      <Image size={32} />
                      <span className="font-bold">Image {item.id}</span>
                    </div>
                  ) : (
                    <div className="text-gray-400 flex flex-col items-center gap-2">
                      <Loader2 size={24} className="animate-spin" />
                      <span className="text-xs">Waiting for Scroll...</span>
                    </div>
                  )}
                </div>
              ))}

              <div className="text-center p-8 text-gray-400 text-sm">
                End of Content
              </div>
            </div>

            {/* Visual Overlay for "Viewport" */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-[4px] border-cyan-500/30 rounded-lg">
              <div className="absolute top-2 right-2 bg-cyan-500/80 text-white text-[10px] px-2 py-1 rounded font-mono">
                Viewport
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Image className="text-blue-600" size={20} />
                <h4 className="font-bold text-gray-900">이미지 Lazy Loading</h4>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
                <div className="overflow-hidden rounded-lg">
                  <CodeBlock
                    language="html"
                    code={`<!-- Native lazy loading -->
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
                  />
                </div>
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
                <div className="overflow-hidden rounded-lg">
                  <CodeBlock
                    language="javascript"
                    code={`const observer = new IntersectionObserver(
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
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="text-gray-600" size={20} />
              <h4 className="font-bold text-gray-900">Lazy Loading 유형</h4>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h5 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  <Image size={14} /> 이미지
                </h5>
                <p className="text-xs text-gray-500">
                  loading="lazy" 속성 또는 IntersectionObserver 사용
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h5 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  <Code2 size={14} /> 컴포넌트
                </h5>
                <p className="text-xs text-gray-500">
                  React.lazy() + Suspense로 조건부 로드
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h5 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  <ArrowDown size={14} /> 데이터
                </h5>
                <p className="text-xs text-gray-500">
                  무한 스크롤, 페이지네이션으로 필요한 만큼만 fetch
                </p>
              </div>
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

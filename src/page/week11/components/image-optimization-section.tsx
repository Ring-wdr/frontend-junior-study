import { CheckCircle2, Code2, Image, Maximize, Zap } from 'lucide-react';

export function ImageOptimizationSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-pink-100 text-pink-600 rounded-lg">
            <Image size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            이미지 최적화 (가장 효과 큰 영역!)
          </h2>
        </div>

        <p className="text-gray-600 leading-relaxed text-lg">
          이미지는 웹 페이지 용량의 대부분을 차지합니다. 최적화만 잘해도{' '}
          <strong>LCP를 획기적으로 개선</strong>할 수 있습니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Zap className="text-blue-600" size={20} />
              차세대 포맷
            </h3>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">WebP</span>
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded">
                    -25~35%
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  JPEG/PNG 대비 훨씬 작은 용량, 모든 브라우저 지원
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">AVIF</span>
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded">
                    -50%
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  최신 포맷, 가장 작은 용량 (Chrome, Firefox 지원)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Maximize className="text-purple-600" size={20} />
              Responsive Images
            </h3>
            <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
              <pre className="text-xs text-gray-300 font-mono">
                {`<img
  srcset="
    small.jpg 480w,
    medium.jpg 800w,
    large.jpg 1200w
  "
  sizes="
    (max-width: 600px) 480px,
    (max-width: 1000px) 800px,
    1200px
  "
  src="medium.jpg"
  alt="Responsive"
/>`}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Code2 className="text-green-400" size={18} />
            <span className="text-green-400 text-sm font-medium">
              Next.js Image 컴포넌트
            </span>
          </div>
          <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
            {`import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero Image"
  width={1200}
  height={600}
  priority          // LCP 이미지에 사용
  placeholder="blur" // LQIP 적용
  quality={75}       // 압축률 조절
/>

// 자동 기능:
// ✓ 자동 WebP/AVIF 변환
// ✓ 자동 srcset 생성 (DPR 대응)
// ✓ 기본 lazy loading
// ✓ 레이아웃 시프트 방지 (width/height)`}
          </pre>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'preload', desc: 'LCP 이미지 미리 로드' },
            { label: 'preconnect', desc: 'CDN 연결 미리 수립' },
            { label: 'lazy', desc: 'viewport 밖 이미지 지연 로드' },
            { label: 'decoding', desc: 'async로 디코딩 분리' },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-gray-50 rounded-lg p-3 text-center"
            >
              <code className="text-sm text-pink-600 font-medium">
                {item.label}
              </code>
              <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
            <CheckCircle2 size={18} />
            이미지 최적화 체크리스트
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-green-800">
            <li>✓ WebP/AVIF 포맷 사용</li>
            <li>✓ 적절한 크기로 리사이즈</li>
            <li>✓ width/height 또는 aspect-ratio 지정</li>
            <li>✓ LCP 이미지에 priority/preload</li>
            <li>✓ Below the fold에 lazy loading</li>
            <li>✓ CDN 활용</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

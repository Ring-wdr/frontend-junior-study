import {
  CheckCircle2,
  Code2,
  FileImage,
  Image as ImageIcon,
  Maximize,
  Sliders,
  Zap,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CodeBlock } from '../../../components/ui/code-block';

export function ImageOptimizationSection() {
  const { t } = useTranslation('week11');
  const [format, setFormat] = useState<'jpg' | 'webp' | 'avif'>('jpg');
  const [quality, setQuality] = useState(80);
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Constants for simulation
  const originalSize = 1200; // KB
  const formatCoefficients = { jpg: 1, webp: 0.7, avif: 0.5 };

  const optimizedSize = Math.round(
    originalSize * formatCoefficients[format] * (quality / 100),
  );
  const savings = Math.round(
    ((originalSize - optimizedSize) / originalSize) * 100,
  );

  // Slider Mouse Events
  const handleMouseDown = () => (isDragging.current = true);
  const handleMouseUp = () => (isDragging.current = false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  // Touch support
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(e.touches[0].clientX - rect.left, rect.width),
    );
    setSliderPosition((x / rect.width) * 100);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-pink-100 text-pink-600 rounded-lg">
            <ImageIcon size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {t('week11.imageOptimization.title')}
          </h2>
        </div>

        <p className="text-gray-600 leading-relaxed text-lg">
          {t('week11.imageOptimization.description')}
        </p>

        {/* Visualizer */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl overflow-hidden">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="font-bold text-white flex items-center gap-2">
                <Sliders size={18} className="text-pink-400" /> Image
                Optimization Lab
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Simulate compression savings and quality
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">
                -{savings}%
              </div>
              <div className="text-xs text-gray-500">Size Reduction</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Controls */}
            <div className="space-y-4 bg-gray-800 p-4 rounded-lg h-fit">
              <div>
                <label className="text-xs text-gray-400 font-medium mb-2 block">
                  Format
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['jpg', 'webp', 'avif'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFormat(f)}
                      className={`py-1.5 rounded text-xs font-bold uppercase transition-colors ${
                        format === f
                          ? 'bg-pink-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 font-medium mb-2 block flex justify-between">
                  <span>Quality</span>
                  <span>{quality}%</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
              </div>

              <div className="pt-4 border-t border-gray-700 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Original:</span>
                  <span className="text-white font-mono">
                    {originalSize} KB
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-bold">Optimized:</span>
                  <span className="text-green-400 font-mono font-bold">
                    {optimizedSize} KB
                  </span>
                </div>
              </div>
            </div>

            {/* Comparison View */}
            <div
              className="col-span-1 md:col-span-2 relative h-[300px] bg-black rounded-lg overflow-hidden select-none cursor-ew-resize border border-gray-700"
              ref={sliderRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
            >
              {/* Background (Optimized) */}
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=600&auto=format&fit=crop")',
                  filter:
                    quality < 50
                      ? `blur(${(50 - quality) / 10}px) contrast(${1 + (50 - quality) / 100})`
                      : 'none',
                }}
              >
                <div className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
                  Optimized ({format.toUpperCase()})
                </div>
              </div>

              {/* Foreground (Original) - Clipped */}
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center border-r-2 border-white shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                style={{
                  width: `${sliderPosition}%`,
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=600&auto=format&fit=crop")',
                }}
              >
                <div className="absolute top-4 left-4 bg-black/60 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
                  Original (JPEG)
                </div>
              </div>

              {/* Slider Handle */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center z-10 pointer-events-none"
                style={{ left: `calc(${sliderPosition}% - 16px)` }}
              >
                <Sliders size={16} className="text-gray-800 rotate-90" />
              </div>
            </div>
          </div>
        </div>

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
              <div className="overflow-hidden rounded-lg">
                <CodeBlock
                  language="html"
                  code={`<img
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
                />
              </div>
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
          <div className="overflow-hidden rounded-lg">
            <CodeBlock
              language="javascript"
              code={`import Image from 'next/image';

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
            />
          </div>
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

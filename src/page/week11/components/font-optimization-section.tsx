import {
  AlertTriangle,
  Code2,
  Eye,
  EyeOff,
  RefreshCw,
  Type,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/ui/code-block';

export function FontOptimizationSection() {
  const [strategy, setStrategy] = useState<'swap' | 'block'>('swap'); // FOUT vs FOIT
  const [fontStatus, setFontStatus] = useState<'system' | 'loading' | 'custom'>(
    'system',
  );
  const [layoutShift, setLayoutShift] = useState(0);

  const simulateLoad = () => {
    setFontStatus('loading');
    setLayoutShift(0);

    setTimeout(() => {
      setFontStatus('custom');
      // Simulate layout shift if dimensions change significantly (conceptual)
      if (strategy === 'swap') setLayoutShift(0.05);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
            <Type size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">폰트 최적화</h2>
        </div>

        <p className="text-gray-600 leading-relaxed text-lg">
          폰트는 <strong>CLS와 LCP</strong>에 직접적인 영향을 미칩니다. FOUT
          (Flash of Unstyled Text)를 방지하고 빠르게 로드하는 전략이 필요합니다.
        </p>

        {/* Visualizer */}
        <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-amber-900 flex items-center gap-2">
                <Type size={18} className="text-amber-600" /> Font Loading
                Simulator
              </h3>
              <p className="text-xs text-amber-700 mt-1">
                Compare FOUT (Swap) vs FOIT (Block)
              </p>
            </div>
            <div className="flex bg-white p-1 rounded-lg border border-amber-100 shadow-sm">
              <button
                type="button"
                onClick={() => {
                  setStrategy('swap');
                  setFontStatus('system');
                }}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${strategy === 'swap' ? 'bg-amber-100 text-amber-800' : 'text-gray-500 hover:text-gray-800'}`}
              >
                display: swap (FOUT)
              </button>
              <button
                type="button"
                onClick={() => {
                  setStrategy('block');
                  setFontStatus('system');
                }}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${strategy === 'block' ? 'bg-amber-100 text-amber-800' : 'text-gray-500 hover:text-gray-800'}`}
              >
                display: block (FOIT)
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-amber-200 p-8 min-h-[200px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 text-xs font-mono text-gray-400">
              Status:{' '}
              {fontStatus === 'loading'
                ? 'Downloading Font...'
                : fontStatus === 'custom'
                  ? 'Custom Font Applied'
                  : 'Fallback Font'}
            </div>

            <div className={`transition-all duration-300`}>
              <h4
                className={`text-4xl font-bold mb-4
                        ${fontStatus === 'loading' && strategy === 'block' ? 'opacity-0' : 'opacity-100'}
                        ${fontStatus === 'custom' ? 'font-serif' : 'font-sans'}
                     `}
                style={{
                  fontFamily:
                    fontStatus === 'custom'
                      ? '"Playfair Display", serif'
                      : 'sans-serif',
                  transition: 'opacity 0.2s',
                }}
              >
                The Quick Brown Fox
              </h4>
              <p
                className={`text-lg leading-relaxed text-gray-700 max-w-xl
                        ${fontStatus === 'loading' && strategy === 'block' ? 'opacity-0' : 'opacity-100'}
                        ${fontStatus === 'custom' ? 'font-serif' : 'font-sans'}
                     `}
                style={{
                  fontFamily:
                    fontStatus === 'custom'
                      ? '"Playfair Display", serif'
                      : 'sans-serif',
                  transition: 'opacity 0.2s',
                }}
              >
                Web fonts allow designers to use typography that expresses their
                brand. However, incorrectly loading them can cause significant
                layout shifts or invisible text.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
              <button
                type="button"
                onClick={simulateLoad}
                disabled={fontStatus === 'loading' || fontStatus === 'custom'}
                className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm"
              >
                <RefreshCw
                  size={16}
                  className={fontStatus === 'loading' ? 'animate-spin' : ''}
                />
                {fontStatus === 'custom'
                  ? 'Reset to Try Again'
                  : 'Load Custom Font (2s delay)'}
              </button>

              {fontStatus === 'custom' && (
                <div className="flex gap-4">
                  <div className="text-right">
                    <div className="text-xs text-gray-500">UX Impact</div>
                    <div
                      className={`text-sm font-bold flex items-center gap-1 justify-end ${strategy === 'swap' ? 'text-amber-600' : 'text-red-600'}`}
                    >
                      {strategy === 'swap' ? (
                        <>
                          <Eye size={14} /> Text Always Visible
                        </>
                      ) : (
                        <>
                          <EyeOff size={14} /> Text Invisible (3s)
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">CLS Impact</div>
                    <div
                      className={`text-sm font-bold flex items-center gap-1 justify-end ${strategy === 'swap' ? 'text-amber-600' : 'text-green-600'}`}
                    >
                      {strategy === 'swap' ? (
                        <>
                          <AlertTriangle size={14} /> Minor Shift
                        </>
                      ) : (
                        <>
                          <Zap size={14} /> No Shift
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Hack to enable Reset */}
              {fontStatus === 'custom' && (
                <button
                  type="button"
                  onClick={() => setFontStatus('system')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-default"
                />
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-red-200 bg-red-50 rounded-xl p-5">
            <h3 className="font-bold text-red-900 mb-3">FOUT / FOIT</h3>
            <div className="space-y-3 text-sm text-red-800">
              <div className="bg-white/70 rounded-lg p-3">
                <strong>FOUT</strong> (Flash of Unstyled Text)
                <p className="text-xs mt-1">
                  폰트 로드 전 fallback 폰트 → 로드 후 교체 시 깜빡임
                </p>
              </div>
              <div className="bg-white/70 rounded-lg p-3">
                <strong>FOIT</strong> (Flash of Invisible Text)
                <p className="text-xs mt-1">
                  폰트 로드 전까지 텍스트가 보이지 않음
                </p>
              </div>
            </div>
          </div>

          <div className="border border-green-200 bg-green-50 rounded-xl p-5">
            <h3 className="font-bold text-green-900 mb-3">font-display 전략</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <code className="text-xs bg-white px-2 py-1 rounded text-green-700">
                  swap
                </code>
                <span className="text-green-800">
                  fallback 즉시 표시 → 교체 (권장)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <code className="text-xs bg-white px-2 py-1 rounded text-green-700">
                  optional
                </code>
                <span className="text-green-800">
                  캐시된 경우만 사용 (CLS 최소화)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <code className="text-xs bg-white px-2 py-1 rounded text-green-700">
                  fallback
                </code>
                <span className="text-green-800">
                  짧은 block 후 swap (균형)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Code2 className="text-cyan-400" size={18} />
            <span className="text-cyan-400 text-sm font-medium">
              Next.js next/font (권장)
            </span>
          </div>
          <div className="overflow-hidden rounded-lg">
            <CodeBlock
              language="javascript"
              code={`import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// 자동 기능:
// ✓ 빌드 타임에 폰트 다운로드 (외부 요청 제거)
// ✓ 자동 self-hosting
// ✓ size-adjust로 CLS 최소화
// ✓ 자동 preload

export default function RootLayout({ children }) {
  return (
    <html className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}`}
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-5">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="text-amber-600" size={20} />
            폰트 최적화 기법
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">
                Preload 폰트 파일
              </h4>
              <div className="bg-gray-900 rounded p-2 overflow-x-auto">
                <div className="overflow-hidden rounded-lg">
                  <CodeBlock
                    language="html"
                    code={`<link
  rel="preload"
  href="/fonts/inter.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>`}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">
                서브셋 (Subset)
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                사용하는 문자만 포함하여 용량 감소
              </p>
              <div className="flex flex-wrap gap-2">
                {['latin', 'latin-ext', 'korean', 'digits'].map((subset) => (
                  <span
                    key={subset}
                    className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600"
                  >
                    {subset}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">WOFF2 포맷</h4>
              <p className="text-sm text-gray-600">
                가장 압축률이 높은 웹 폰트 포맷. TTF/OTF 대비 30~50% 작음
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">
                Variable Fonts
              </h4>
              <p className="text-sm text-gray-600">
                다양한 weight/style을 하나의 파일로. 여러 폰트 파일 대체
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <AlertTriangle className="text-amber-600 shrink-0" size={20} />
          <div className="text-sm text-amber-800">
            <strong>한글 폰트 주의:</strong> 한글은 글리프가 많아 용량이
            큽니다(2~5MB). 반드시 서브셋을 적용하거나 Google Fonts의 자동 서브셋
            기능을 활용하세요.
          </div>
        </div>
      </div>
    </div>
  );
}

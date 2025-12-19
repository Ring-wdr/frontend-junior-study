import { AlertTriangle, Code2, Type, Zap } from 'lucide-react';

export function FontOptimizationSection() {
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
          <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
            {`import { Inter } from 'next/font/google';

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
          </pre>
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
                <pre className="text-xs text-gray-300 font-mono">
                  {`<link
  rel="preload"
  href="/fonts/inter.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>`}
                </pre>
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

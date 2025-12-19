import { Cloud, Code2, Globe, RefreshCw, Server, Zap } from 'lucide-react';

export function NetworkOptimizationSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-100 text-teal-600 rounded-lg">
            <Globe size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">네트워크 최적화</h2>
        </div>

        <p className="text-gray-600 leading-relaxed text-lg">
          네트워크 레이턴시를 줄이고 캐시를 효과적으로 활용하면 반복 방문 시
          성능이 <strong>극적으로 향상</strong>됩니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-100">
            <div className="flex items-center gap-2 mb-3">
              <Server className="text-blue-600" size={20} />
              <h3 className="font-bold text-gray-900">Resource Hints</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3">
                <code className="text-sm text-blue-600 font-medium">
                  preconnect
                </code>
                <p className="text-xs text-gray-500 mt-1">
                  DNS + TCP + TLS 핸드셰이크 미리 수행
                </p>
                <div className="bg-gray-900 rounded p-2 mt-2 overflow-x-auto">
                  <pre className="text-xs text-gray-300 font-mono">
                    {`<link rel="preconnect"
      href="https://cdn.example.com" />`}
                  </pre>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3">
                <code className="text-sm text-purple-600 font-medium">
                  dns-prefetch
                </code>
                <p className="text-xs text-gray-500 mt-1">
                  DNS 조회만 미리 수행 (preconnect보다 가벼움)
                </p>
              </div>

              <div className="bg-white rounded-lg p-3">
                <code className="text-sm text-green-600 font-medium">
                  preload
                </code>
                <p className="text-xs text-gray-500 mt-1">
                  현재 페이지에서 확실히 사용할 리소스 우선 로드
                </p>
              </div>

              <div className="bg-white rounded-lg p-3">
                <code className="text-sm text-orange-600 font-medium">
                  prefetch
                </code>
                <p className="text-xs text-gray-500 mt-1">
                  다음 페이지에서 사용할 리소스 미리 가져오기
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
            <div className="flex items-center gap-2 mb-3">
              <Cloud className="text-purple-600" size={20} />
              <h3 className="font-bold text-gray-900">CDN & Edge</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Content Delivery Network를 활용하면 사용자와 가까운 서버에서
              콘텐츠를 제공합니다.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="text-green-500" size={16} />
                <span className="text-gray-700">
                  지리적으로 가까운 서버에서 응답
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Zap className="text-green-500" size={16} />
                <span className="text-gray-700">
                  TTFB (Time to First Byte) 감소
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Zap className="text-green-500" size={16} />
                <span className="text-gray-700">정적 자원 자동 캐싱</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Zap className="text-green-500" size={16} />
                <span className="text-gray-700">DDoS 보호 및 로드 밸런싱</span>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Vercel', 'Cloudflare', 'AWS CloudFront', 'Fastly'].map(
                (cdn) => (
                  <span
                    key={cdn}
                    className="px-2 py-1 bg-white rounded text-xs text-purple-600 border border-purple-200"
                  >
                    {cdn}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Code2 className="text-cyan-400" size={18} />
            <span className="text-cyan-400 text-sm font-medium">
              Cache-Control 전략
            </span>
          </div>
          <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
            {`// 정적 자원 (JS, CSS, Images) - 장기 캐시 + 해시
Cache-Control: public, max-age=31536000, immutable

// HTML - 항상 재검증
Cache-Control: no-cache

// API 응답 - stale-while-revalidate
Cache-Control: max-age=60, stale-while-revalidate=3600

// 민감한 데이터 - 캐시 금지
Cache-Control: no-store, private`}
          </pre>
        </div>

        <div className="bg-gray-50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <RefreshCw className="text-teal-600" size={20} />
            <h3 className="font-bold text-gray-900">HTTP/2 & HTTP/3</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">HTTP/2</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 멀티플렉싱 (병렬 요청)</li>
                <li>• 헤더 압축 (HPACK)</li>
                <li>• Server Push</li>
                <li>• 스트림 우선순위</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">HTTP/3</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• QUIC 프로토콜 기반 (UDP)</li>
                <li>• 0-RTT 연결 재사용</li>
                <li>• Head-of-line blocking 해결</li>
                <li>• 더 빠른 연결 수립</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <strong>stale-while-revalidate:</strong> 캐시된 콘텐츠를 즉시
          반환하면서 백그라운드에서 새 데이터를 가져옵니다. 사용자는 즉각적인
          응답을 받고, 다음 요청부터 최신 데이터를 사용합니다.
        </div>
      </div>
    </div>
  );
}

import {
  Cloud,
  Code2,
  Globe,
  Network,
  RefreshCw,
  Server,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

export function NetworkOptimizationSection() {
  const { t } = useTranslation('week11');
  const [protocol, setProtocol] = useState<'h1' | 'h2'>('h1');
  const [requests, setRequests] = useState<
    {
      id: number;
      start: number;
      duration: number;
      status: 'pending' | 'active' | 'done';
    }[]
  >([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  const startSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setTotalTime(0);

    // Create 20 pending requests
    const initialRequests = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      start: 0,
      duration: 500 + Math.random() * 500, // 500-1000ms duration
      status: 'pending' as const,
    }));
    setRequests(initialRequests);
  };

  useEffect(() => {
    if (!isSimulating) return;

    let activeCount = 0;
    const maxConcurrent = protocol === 'h1' ? 6 : 20;
    const startTime = performance.now();

    const interval = setInterval(() => {
      const now = performance.now();
      const elapsed = now - startTime;
      setTotalTime(Math.floor(elapsed));

      setRequests((prev) => {
        const next = [...prev];

        // Count active requests
        activeCount = next.filter((r) => r.status === 'active').length;

        // Should stop?
        const allDone = next.every((r) => r.status === 'done');
        if (allDone) {
          setIsSimulating(false);
          clearInterval(interval);
          return next;
        }

        // Update active requests
        next.forEach((req) => {
          if (req.status === 'active') {
            if (elapsed >= req.start + req.duration) {
              req.status = 'done';
              activeCount--; // Decrement active count immediately for the loop logic
            }
          }
        });

        // Start new requests if slots available
        // Recalculate active count properly
        activeCount = next.filter((r) => r.status === 'active').length;

        next.forEach((req) => {
          if (req.status === 'pending' && activeCount < maxConcurrent) {
            req.status = 'active';
            req.start = elapsed;
            activeCount++;
          }
        });

        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isSimulating, protocol]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-100 text-teal-600 rounded-lg">
            <Globe size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {t('networkOptimization.title')}
          </h2>
        </div>

        <p className="text-gray-600 leading-relaxed text-lg">
          {t('networkOptimization.description')}
        </p>

        {/* Visualizer */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 shadow-xl overflow-hidden">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="font-bold text-white flex items-center gap-2">
                <Network size={18} className="text-teal-400" /> Network
                Waterfall
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                HTTP/1.1 vs HTTP/2 Multiplexing
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-white font-mono">
                  {totalTime}ms
                </div>
                <div className="text-xs text-slate-500">Total Load Time</div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => {
                setProtocol('h1');
                setRequests([]);
                setTotalTime(0);
              }}
              className={cn(
                `flex-1 py-2 rounded text-sm font-bold transition-all`,
                protocol === 'h1'
                  ? 'bg-orange-500 text-white'
                  : 'bg-slate-800 text-slate-400',
              )}
            >
              HTTP/1.1 (Queued)
            </button>
            <button
              type="button"
              onClick={() => {
                setProtocol('h2');
                setRequests([]);
                setTotalTime(0);
              }}
              className={cn(
                `flex-1 py-2 rounded text-sm font-bold transition-all`,
                protocol === 'h2'
                  ? 'bg-teal-500 text-white'
                  : 'bg-slate-800 text-slate-400',
              )}
            >
              HTTP/2 (Multiplexed)
            </button>
            <button
              type="button"
              onClick={startSimulation}
              disabled={isSimulating}
              className="px-4 bg-slate-700 text-white rounded hover:bg-slate-600 disabled:opacity-50"
            >
              <RefreshCw
                size={16}
                className={isSimulating ? 'animate-spin' : ''}
              />
            </button>
          </div>

          <div className="h-[300px] bg-slate-800 rounded-lg relative overflow-y-auto p-4 border border-slate-700">
            <div className="absolute top-0 left-0 w-full h-full flex pointer-events-none">
              <div className="w-[20%] border-r border-slate-700/50 h-full"></div>
              <div className="w-[20%] border-r border-slate-700/50 h-full"></div>
              <div className="w-[20%] border-r border-slate-700/50 h-full"></div>
              <div className="w-[20%] border-r border-slate-700/50 h-full"></div>
            </div>

            <div className="space-y-1">
              {requests.length === 0 && !isSimulating && (
                <div className="text-center text-slate-500 py-20">
                  Click play to start simulation
                </div>
              )}
              {requests.map((req) => {
                let width = 0;
                let left = 0;

                // Simple visual scale logic: 2000ms max width
                const scale = 300 / 2000; // pixels per ms

                if (req.status === 'pending') {
                  width = 0;
                  left = 0;
                } else if (req.status === 'active') {
                  const elapsedActive = totalTime - req.start;
                  width = (Math.min(req.duration, elapsedActive) / 2000) * 100; // %
                  left = (req.start / 2000) * 100; // %
                } else {
                  width = (req.duration / 2000) * 100; // %
                  left = (req.start / 2000) * 100; // %
                }

                return (
                  <div
                    key={req.id}
                    className="h-2 w-full bg-slate-700/30 rounded-full relative overflow-hidden"
                  >
                    {req.status !== 'pending' && (
                      <div
                        className={`absolute h-full rounded-full transition-all duration-75 ${
                          req.status === 'done'
                            ? 'bg-teal-400'
                            : 'bg-orange-400'
                        }`}
                        style={{
                          left: `${left}%`,
                          width: `${width}%`,
                          maxWidth: '100%',
                        }}
                      ></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-2 text-xs text-slate-400 flex justify-between">
            <span>0ms</span>
            <span>1000ms</span>
            <span>2000ms+</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-100">
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
                  <div className="overflow-hidden rounded-lg">
                    <CodeBlock
                      language="html"
                      code={`<link rel="preconnect"
      href="https://cdn.example.com" />`}
                    />
                  </div>
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

          <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
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
          <div className="overflow-hidden rounded-lg">
            <CodeBlock
              language="javascript"
              code={`// 정적 자원 (JS, CSS, Images) - 장기 캐시 + 해시
Cache-Control: public, max-age=31536000, immutable

// HTML - 항상 재검증
Cache-Control: no-cache

// API 응답 - stale-while-revalidate
Cache-Control: max-age=60, stale-while-revalidate=3600

// 민감한 데이터 - 캐시 금지
Cache-Control: no-store, private`}
            />
          </div>
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

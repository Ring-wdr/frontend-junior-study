import { Activity, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

export function PerformanceSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 text-red-600 rounded-lg">
            <Activity size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            성능 최적화 (Performance)
          </h2>
        </div>

        <p className="text-gray-600 leading-relaxed text-lg">
          화려한 애니메이션도 버벅인다면 사용자 경험을 해칩니다. 브라우저의
          렌더링 파이프라인을 이해하고 최적화된 속성만 건드려야 합니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="border border-green-200 bg-green-50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="text-green-600" />
              <h3 className="font-bold text-green-900">
                Good (Cheap Properties)
              </h3>
            </div>
            <ul className="space-y-2 text-green-800 text-sm font-medium">
              <li>✓ transform: translate()</li>
              <li>✓ transform: scale()</li>
              <li>✓ transform: rotate()</li>
              <li>✓ opacity</li>
            </ul>
            <p className="mt-4 text-xs text-green-700">
              GPU 가속을 활용하며 Layout(Reflow)을 유발하지 않습니다.
            </p>
          </div>

          <div className="border border-red-200 bg-red-50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="text-red-600" />
              <h3 className="font-bold text-red-900">
                Bad (Expensive Properties)
              </h3>
            </div>
            <ul className="space-y-2 text-red-800 text-sm font-medium">
              <li>❌ width, height</li>
              <li>❌ top, left, bottom, right</li>
              <li>❌ margin, padding</li>
              <li>❌ fontSize</li>
            </ul>
            <p className="mt-4 text-xs text-red-700">
              Layout 과정을 다시 계산하게 만들어 성능을 급격히 떨어뜨립니다.
            </p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 text-amber-800 text-sm">
          <AlertTriangle className="shrink-0" size={20} />
          <div>
            <strong>DevTools 활용하기:</strong> Performance 탭에서 녹화를 눌러
            FPS가 60 밑으로 떨어지는지, ‘Layout Shift’가 발생하는지 반드시
            체크하세요.
          </div>
        </div>
      </div>
    </div>
  );
}

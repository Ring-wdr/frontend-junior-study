import {
  Activity,
  AlertTriangle,
  BarChart3,
  Clock,
  Eye,
  Play,
  Search,
  Zap,
} from 'lucide-react';

export function DevToolsSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
            <BarChart3 size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            DevTools Performance 프로파일링
          </h2>
        </div>

        <p className="text-gray-600 leading-relaxed text-lg">
          "추측으로 성능 개선하는 것"은 금물입니다.{' '}
          <strong>측정 → 문제 확인 → 개선 → 재측정</strong> 프로세스를 반드시
          익혀야 합니다.
        </p>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Play size={18} /> Performance 탭 사용법
          </h3>
          <ol className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                1
              </span>
              <span>
                Chrome DevTools 열기 (F12) → <strong>Performance</strong> 탭
                선택
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                2
              </span>
              <span>
                <strong>녹화 버튼</strong> 클릭 후 분석할 동작 수행 (스크롤,
                클릭 등)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                3
              </span>
              <span>
                녹화 중지 후 <strong>Flame Chart</strong>에서 병목 지점 분석
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                4
              </span>
              <span>
                <strong>Summary</strong> 탭에서 Scripting, Rendering, Painting
                시간 확인
              </span>
            </li>
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="text-red-500" size={20} />
              <h4 className="font-bold text-gray-900">Long Task 탐색</h4>
            </div>
            <p className="text-sm text-gray-600">
              50ms 이상 메인 스레드를 점유하는 작업. 빨간색 삼각형 표시로
              확인됩니다.
            </p>
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500">
              Long Task는 사용자 인터랙션을 지연시켜 INP에 직접적인 영향을
              줍니다.
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Activity className="text-orange-500" size={20} />
              <h4 className="font-bold text-gray-900">Layout Shift 감지</h4>
            </div>
            <p className="text-sm text-gray-600">
              Experience 섹션에서 Layout Shift 이벤트와 영향을 받은 요소를
              확인합니다.
            </p>
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500">
              어떤 요소가 이동했는지, 얼마나 큰 영향을 미쳤는지 분석 가능합니다.
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Eye className="text-blue-500" size={20} />
              <h4 className="font-bold text-gray-900">FPS 모니터링</h4>
            </div>
            <p className="text-sm text-gray-600">
              상단 FPS 차트에서 프레임 드롭을 확인. 60FPS 이하로 떨어지면 끊김
              발생.
            </p>
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500">
              특히 스크롤이나 애니메이션 중 FPS 하락을 주시하세요.
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Search className="text-green-500" size={20} />
              <h4 className="font-bold text-gray-900">Call Tree 분석</h4>
            </div>
            <p className="text-sm text-gray-600">
              Bottom-Up / Call Tree 탭에서 가장 오래 걸린 함수를 찾습니다.
            </p>
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500">
              Self Time이 높은 함수가 최적화 우선순위입니다.
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <AlertTriangle className="text-amber-600 shrink-0" size={20} />
          <div className="text-sm text-amber-800">
            <strong>Pro Tip:</strong> 녹화 전 "CPU 4x slowdown"을 활성화하면
            저사양 기기에서의 성능을 시뮬레이션할 수 있습니다. 실제 사용자
            환경을 고려한 테스트가 중요합니다.
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="text-purple-600" size={20} />
            <h4 className="font-bold text-gray-900">Lighthouse 자동 분석</h4>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            DevTools → Lighthouse 탭에서 자동으로 Core Web Vitals 및 개선 제안을
            받을 수 있습니다.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              'Performance',
              'Accessibility',
              'Best Practices',
              'SEO',
              'PWA',
            ].map((category) => (
              <span
                key={category}
                className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

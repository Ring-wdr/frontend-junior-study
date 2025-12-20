import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';

export const DevToolsPerformanceMemorySection = () => {
  const [activeMetric, setActiveMetric] = useState(0);

  const performanceMetrics = [
    {
      name: 'FPS',
      icon: '📊',
      color: 'green',
      desc: 'Frames Per Second - 초당 프레임 수',
      target: '60fps 유지',
      issue: '프레임 드롭은 버벅임의 원인',
    },
    {
      name: 'Long Task',
      icon: '⏱️',
      color: 'red',
      desc: '50ms 이상 실행되는 JavaScript 작업',
      target: '50ms 이하로 분할',
      issue: '메인 스레드 블로킹 → 입력 지연',
    },
    {
      name: 'Layout Shift',
      icon: '↔️',
      color: 'orange',
      desc: '레이아웃이 갑자기 변경되는 현상',
      target: 'CLS 0.1 이하',
      issue: '사용자 클릭 실수 유발',
    },
    {
      name: 'Scripting',
      icon: '📜',
      color: 'yellow',
      desc: 'JavaScript 실행 시간',
      target: '전체 시간의 30% 이하',
      issue: '파싱, 컴파일, 실행 비용',
    },
  ];

  return (
    <SectionCard
      badge={{ label: 'Perf', color: 'purple' }}
      title="Performance & Memory 패널"
      description="렌더링 병목 분석과 메모리 누수 탐지"
    >
      <div className="space-y-8">
        <SubSection title="Performance 녹화 분석" icon iconColor="purple">
          <InfoBox variant="purple" title="성능 튜닝의 핵심 도구">
            <p className="text-sm leading-relaxed">
              Performance 패널은 프론트엔드 성능 최적화의 <strong>핵심 도구</strong>입니다.
              프레임 분석, Long Task 탐지, 레이아웃 시프트 확인까지 모든 것이 가능합니다.
            </p>
          </InfoBox>

          <DemoBox label="Key Metrics">
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {performanceMetrics.map((metric, idx) => (
                  <button
                    key={metric.name}
                    type="button"
                    onClick={() => setActiveMetric(idx)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      activeMetric === idx
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {metric.icon} {metric.name}
                  </button>
                ))}
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">
                    {performanceMetrics[activeMetric].icon}
                  </span>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {performanceMetrics[activeMetric].name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {performanceMetrics[activeMetric].desc}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-green-50 p-2 rounded">
                    <span className="text-green-600 font-bold">Target: </span>
                    {performanceMetrics[activeMetric].target}
                  </div>
                  <div className="bg-red-50 p-2 rounded">
                    <span className="text-red-600 font-bold">Issue: </span>
                    {performanceMetrics[activeMetric].issue}
                  </div>
                </div>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Performance 녹화 단계" icon iconColor="blue">
          <div className="space-y-3">
            {[
              { step: 1, title: '녹화 시작', desc: 'Ctrl+E 또는 Record 버튼 클릭', icon: '⏺️' },
              { step: 2, title: '사용자 시나리오 실행', desc: '스크롤, 클릭, 입력 등 테스트할 동작 수행', icon: '👆' },
              { step: 3, title: '녹화 중지', desc: 'Stop 버튼 클릭 (5초 이내 권장)', icon: '⏹️' },
              { step: 4, title: '프레임 차트 분석', desc: 'Main 스레드에서 Long Task 확인', icon: '📈' },
              { step: 5, title: '병목 지점 확대', desc: '빨간색/노란색 영역 클릭하여 상세 확인', icon: '🔍' },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg"
              >
                <span className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {item.step}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <h5 className="font-medium text-gray-900">{item.title}</h5>
                  </div>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="Memory 패널 - 누수 탐지" icon iconColor="red">
          <InfoBox variant="red" title="메모리 누수는 SPA의 적">
            <p className="text-sm leading-relaxed">
              대규모 SPA에서 메모리 누수는 점점 앱을 느리게 만듭니다.
              <strong> Detached DOM nodes</strong>와 <strong>Heap snapshot</strong>으로 누수를 찾으세요.
            </p>
          </InfoBox>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              {
                title: 'Heap Snapshot',
                icon: '📸',
                desc: '현재 메모리 상태 캡처',
                use: '전후 비교로 누수 확인',
              },
              {
                title: 'Allocation Timeline',
                icon: '📊',
                desc: '시간에 따른 할당 추적',
                use: '어떤 동작이 메모리 증가시키는지',
              },
              {
                title: 'Allocation Sampling',
                icon: '🎯',
                desc: '함수별 메모리 할당량',
                use: '비용이 큰 함수 식별',
              },
              {
                title: 'Detached Elements',
                icon: '🔗',
                desc: 'DOM에서 분리된 노드들',
                use: '이벤트 리스너 누수의 원인',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white p-3 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{item.icon}</span>
                  <h5 className="font-bold text-sm text-gray-900">
                    {item.title}
                  </h5>
                </div>
                <p className="text-xs text-gray-500 mb-1">{item.desc}</p>
                <p className="text-xs text-blue-600">{item.use}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="흔한 메모리 누수 패턴" icon iconColor="orange">
          <DemoBox label="Memory Leak Patterns">
            <div className="space-y-3">
              {[
                {
                  pattern: 'Event Listener 미해제',
                  code: 'useEffect(() => { window.addEventListener(...); }, []);',
                  fix: 'cleanup 함수에서 removeEventListener',
                },
                {
                  pattern: 'setInterval 미정리',
                  code: 'setInterval(() => { ... }, 1000);',
                  fix: 'clearInterval in useEffect cleanup',
                },
                {
                  pattern: '클로저가 DOM 참조 유지',
                  code: 'const el = document.getElementById(...);',
                  fix: '필요 없으면 null 할당',
                },
                {
                  pattern: '구독 미해제',
                  code: 'observable.subscribe(...);',
                  fix: 'unsubscribe in cleanup',
                },
              ].map((item) => (
                <div
                  key={item.pattern}
                  className="bg-white p-3 rounded-lg border border-gray-200"
                >
                  <h5 className="font-bold text-sm text-red-600 mb-1">
                    {item.pattern}
                  </h5>
                  <code className="text-xs text-gray-600 block bg-gray-50 p-1.5 rounded mb-1">
                    {item.code}
                  </code>
                  <p className="text-xs text-green-600">✓ Fix: {item.fix}</p>
                </div>
              ))}
            </div>
          </DemoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};

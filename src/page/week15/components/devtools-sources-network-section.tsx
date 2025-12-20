import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';

export const DevToolsSourcesNetworkSection = () => {
  const [selectedBreakpoint, setSelectedBreakpoint] = useState(0);

  const breakpointTypes = [
    {
      name: 'Line Breakpoint',
      icon: '🔴',
      desc: '특정 코드 라인에서 멈춤',
      how: '라인 번호 클릭',
      tip: '가장 기본적인 디버깅 방법',
    },
    {
      name: 'Conditional',
      icon: '🟡',
      desc: '조건이 참일 때만 멈춤',
      how: '우클릭 → Add conditional breakpoint',
      tip: 'i === 5 같은 조건 설정',
    },
    {
      name: 'XHR/Fetch',
      icon: '🌐',
      desc: '특정 URL 요청 시 멈춤',
      how: 'XHR/fetch Breakpoints 섹션',
      tip: 'URL 일부 문자열 매칭',
    },
    {
      name: 'DOM',
      icon: '🔧',
      desc: 'DOM 변경 시 멈춤',
      how: 'Elements → 우클릭 → Break on',
      tip: 'subtree/attribute/removal 선택',
    },
    {
      name: 'Event Listener',
      icon: '👆',
      desc: '특정 이벤트 발생 시 멈춤',
      how: 'Event Listener Breakpoints',
      tip: 'click, scroll, keyboard 등',
    },
  ];

  return (
    <SectionCard
      badge={{ label: 'Debug', color: 'green' }}
      title="Sources & Network 패널"
      description="진짜 디버깅 실력과 네트워크 분석 능력 갖추기"
    >
      <div className="space-y-8">
        <SubSection title="Breakpoint 종류 마스터" icon iconColor="green">
          <InfoBox variant="green" title="디버깅 실력이 곧 실력이다">
            <p className="text-sm leading-relaxed">
              console.log로 디버깅하는 시대는 지났습니다.
              <strong> Breakpoint</strong>와 <strong>Step through</strong>를
              활용하면 버그를 훨씬 빠르게 찾을 수 있습니다.
            </p>
          </InfoBox>

          <DemoBox label="Breakpoint Types">
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {breakpointTypes.map((bp, idx) => (
                  <button
                    key={bp.name}
                    type="button"
                    onClick={() => setSelectedBreakpoint(idx)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedBreakpoint === idx
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {bp.icon} {bp.name}
                  </button>
                ))}
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">
                    {breakpointTypes[selectedBreakpoint].icon}
                  </span>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {breakpointTypes[selectedBreakpoint].name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {breakpointTypes[selectedBreakpoint].desc}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">How:</span>
                    <span className="text-gray-700">
                      {breakpointTypes[selectedBreakpoint].how}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">Tip:</span>
                    <span className="text-gray-700">
                      {breakpointTypes[selectedBreakpoint].tip}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="디버깅 컨트롤" icon iconColor="blue">
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: '▶️', name: 'Resume', shortcut: 'F8', desc: '다음 브레이크포인트까지 실행' },
              { icon: '⏭️', name: 'Step Over', shortcut: 'F10', desc: '현재 라인 실행, 함수 내부 안 들어감' },
              { icon: '⬇️', name: 'Step Into', shortcut: 'F11', desc: '함수 내부로 진입' },
              { icon: '⬆️', name: 'Step Out', shortcut: 'Shift+F11', desc: '현재 함수에서 나감' },
              { icon: '⏸️', name: 'Pause', shortcut: 'F8', desc: '실행 중인 스크립트 일시정지' },
              { icon: '🔄', name: 'Restart', shortcut: 'Ctrl+Shift+F8', desc: '현재 함수 처음부터 다시' },
            ].map((control) => (
              <div
                key={control.name}
                className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-center"
              >
                <span className="text-2xl">{control.icon}</span>
                <p className="font-medium text-sm mt-1">{control.name}</p>
                <kbd className="text-[10px] bg-white px-1.5 py-0.5 rounded border mt-1 inline-block">
                  {control.shortcut}
                </kbd>
                <p className="text-[10px] text-gray-500 mt-1">{control.desc}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="Scope & Watch" icon iconColor="purple">
          <DemoBox label="Debugging Context">
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h5 className="font-bold text-sm text-gray-900 mb-2">
                  Scope 패널
                </h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>Local:</strong> 현재 함수의 지역 변수</li>
                  <li>• <strong>Closure:</strong> 클로저로 캡처된 변수</li>
                  <li>• <strong>Global:</strong> window 객체의 속성들</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h5 className="font-bold text-sm text-gray-900 mb-2">
                  Watch 패널
                </h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 특정 변수/표현식을 지속적으로 모니터링</li>
                  <li>• <code>user.profile?.name</code> 같은 표현식 가능</li>
                  <li>• 배열 길이, 객체 속성 등 실시간 추적</li>
                </ul>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Network 패널 분석" icon iconColor="orange">
          <InfoBox variant="orange" title="네트워크 분석의 핵심">
            <p className="text-sm">
              리소스 병목을 찾을 때 필수! TTFB, 페이로드 크기, 캐싱 정책을 확인하세요.
            </p>
          </InfoBox>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              {
                label: 'Headers',
                desc: '요청/응답 헤더 확인',
                check: ['Cache-Control', 'Content-Type', 'Authorization'],
              },
              {
                label: 'Timing',
                desc: '요청 각 단계 시간 분석',
                check: ['DNS Lookup', 'TTFB', 'Content Download'],
              },
              {
                label: 'Throttling',
                desc: '네트워크 속도 제한 테스트',
                check: ['Slow 3G', 'Fast 3G', 'Offline'],
              },
              {
                label: 'Filter',
                desc: '리소스 타입별 필터링',
                check: ['XHR', 'JS', 'CSS', 'Img', 'Font'],
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white p-3 rounded-lg border border-gray-200"
              >
                <h5 className="font-bold text-sm text-orange-600">
                  {item.label}
                </h5>
                <p className="text-xs text-gray-500 mb-2">{item.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {item.check.map((c) => (
                    <span
                      key={c}
                      className="text-[10px] bg-orange-50 text-orange-700 px-1.5 py-0.5 rounded"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="Async Stack Traces" icon iconColor="red">
          <InfoBox variant="blue">
            <p className="text-sm">
              <strong>Settings → Preferences → Async stack traces</strong>를 활성화하면
              Promise, setTimeout, async/await의 전체 호출 스택을 추적할 수 있습니다.
              비동기 버그 디버깅에 필수!
            </p>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};

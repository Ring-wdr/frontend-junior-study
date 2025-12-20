import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const DevToolsElementsConsoleSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const elementFeatures = [
    {
      title: 'DOM Inspection',
      icon: '🔍',
      description: 'HTML 구조 실시간 검사 및 수정',
      items: [
        'Elements 패널에서 노드 클릭으로 선택',
        '우클릭 → "Edit as HTML"로 직접 수정',
        'Delete 키로 요소 삭제, Ctrl+Z로 복원',
        'Drag & Drop으로 DOM 순서 변경',
      ],
    },
    {
      title: 'CSS Debugging',
      icon: '🎨',
      description: 'CSS 수정 및 우선순위 확인',
      items: [
        'Styles 패널에서 실시간 CSS 수정',
        '취소선 = 무시된 속성 (우선순위 확인)',
        'Computed 탭에서 최종 계산값 확인',
        'Filter로 특정 속성만 검색',
      ],
    },
    {
      title: 'Layout Analysis',
      icon: '📐',
      description: 'Box Model 및 레이아웃 분석',
      items: [
        'Box Model 다이어그램에서 margin/padding 시각화',
        'Grid/Flexbox 오버레이로 레이아웃 디버깅',
        'Layout 탭에서 Grid 트랙 정보 확인',
        '브라우저 뷰포트 크기 조절 테스트',
      ],
    },
    {
      title: 'Accessibility',
      icon: '♿',
      description: '접근성 검사 및 개선',
      items: [
        'Accessibility 탭에서 ARIA 속성 확인',
        'Contrast ratio 검사 (색상 피커)',
        'Accessibility Tree 구조 확인',
        'Role, State, Properties 정보 제공',
      ],
    },
  ];

  return (
    <SectionCard
      badge={{ label: 'DevTools', color: 'blue' }}
      title="Elements & Console 패널"
      description="DOM/CSS 디버깅과 강력한 Console 기능 마스터"
    >
      <div className="space-y-8">
        <SubSection title="Elements 패널 핵심 기능" icon iconColor="blue">
          <DemoBox label="Feature Explorer">
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {elementFeatures.map((feature, idx) => (
                  <button
                    key={feature.title}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      activeTab === idx
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {feature.icon} {feature.title}
                  </button>
                ))}
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">
                    {elementFeatures[activeTab].icon}
                  </span>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {elementFeatures[activeTab].title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {elementFeatures[activeTab].description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {elementFeatures[activeTab].items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="text-blue-500 mt-0.5">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Console 고급 기능" icon iconColor="green">
          <InfoBox variant="green" title="console.log 그 이상의 기능들">
            <p className="text-sm leading-relaxed mb-3">
              Console은 단순 로깅을 넘어 강력한 디버깅 도구입니다.
              <strong> $0, $1</strong>로 최근 선택 요소 참조,
              <strong> debug(fn)</strong>으로 함수 호출 시 자동 브레이크!
            </p>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <CodeBlock
              code={`// console.table - 배열/객체를 테이블로 표시
const users = [
  { name: 'Alice', age: 25, role: 'Developer' },
  { name: 'Bob', age: 30, role: 'Designer' },
];
console.table(users);

// console.dir - DOM 요소의 속성 확인
console.dir(document.body);

// console.trace - 호출 스택 추적
function outer() {
  function inner() {
    console.trace('Call stack');
  }
  inner();
}
outer();

// %c 스타일 로그
console.log('%cWarning!', 'color: red; font-size: 20px');

// console.group - 로그 그룹화
console.group('User Info');
console.log('Name: Alice');
console.log('Age: 25');
console.groupEnd();`}
              language="javascript"
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title="Console 특수 명령어" icon iconColor="purple">
          <DemoBox label="Special Console Commands">
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  cmd: '$0, $1, $2...',
                  desc: 'Elements에서 선택한 최근 요소들',
                  example: '$0.classList',
                },
                {
                  cmd: '$$(selector)',
                  desc: 'querySelectorAll의 축약형',
                  example: '$$("button")',
                },
                {
                  cmd: 'copy(object)',
                  desc: '객체를 클립보드로 복사',
                  example: 'copy($0.outerHTML)',
                },
                {
                  cmd: 'debug(fn)',
                  desc: '함수 호출 시 자동 브레이크',
                  example: 'debug(myFunction)',
                },
                {
                  cmd: 'monitor(fn)',
                  desc: '함수 호출 시 로그 출력',
                  example: 'monitor(onClick)',
                },
                {
                  cmd: 'monitorEvents(el)',
                  desc: '요소의 모든 이벤트 로깅',
                  example: "monitorEvents($0, 'click')",
                },
              ].map((item) => (
                <div
                  key={item.cmd}
                  className="bg-white p-3 rounded-lg border border-gray-200"
                >
                  <code className="text-purple-600 text-sm font-mono font-bold">
                    {item.cmd}
                  </code>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  <code className="text-[10px] text-gray-400 mt-1 block font-mono">
                    {item.example}
                  </code>
                </div>
              ))}
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="단축키 마스터" icon iconColor="orange">
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-200">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                { key: 'Cmd/Ctrl + Shift + C', action: '요소 검사 모드' },
                { key: 'Cmd/Ctrl + Shift + J', action: 'Console 직접 열기' },
                { key: 'Cmd/Ctrl + K', action: 'Console 클리어' },
                { key: 'Cmd/Ctrl + F', action: 'Elements에서 검색' },
                { key: 'H', action: '요소 숨기기 (Elements)' },
                { key: 'Esc', action: 'Drawer 토글' },
              ].map((shortcut) => (
                <div key={shortcut.key} className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-white text-xs font-mono rounded border border-gray-300 shadow-sm">
                    {shortcut.key}
                  </kbd>
                  <span className="text-xs text-gray-600">
                    {shortcut.action}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

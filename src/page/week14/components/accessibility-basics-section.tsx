import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';

export const AccessibilityBasicsSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const wcagPrinciples = [
    {
      title: 'Perceivable',
      icon: '👁️',
      color: 'blue',
      description: '모든 사용자가 콘텐츠를 인지할 수 있어야 함',
      items: [
        '대체 텍스트 제공 (이미지, 비디오 등)',
        '명도 대비(contrast) 4.5:1 이상 준수',
        '텍스트는 선택 가능하고 확대 가능해야 함',
        '자막 및 오디오 설명 제공',
      ],
    },
    {
      title: 'Operable',
      icon: '⌨️',
      color: 'green',
      description: 'UI 컴포넌트와 내비게이션이 조작 가능해야 함',
      items: [
        '모든 기능은 키보드로 접근 가능',
        '포커스가 보이고 이동 흐름이 자연스러움',
        '충분한 시간 제공 (시간 제한 조절)',
        '발작 유발 콘텐츠 금지 (깜빡임)',
      ],
    },
    {
      title: 'Understandable',
      icon: '💡',
      color: 'orange',
      description: '정보와 UI 조작이 이해 가능해야 함',
      items: [
        '폼 라벨 명확히 제공',
        '에러 메시지는 구체적으로',
        '일관된 내비게이션 구조',
        '예측 가능한 동작',
      ],
    },
    {
      title: 'Robust',
      icon: '🛡️',
      color: 'purple',
      description: '다양한 사용자 에이전트가 해석 가능해야 함',
      items: [
        '보조 기술(Screen Reader)이 인식 가능',
        '시맨틱 태그 사용 필수',
        'ARIA는 필요한 곳에서만',
        '표준 준수 마크업',
      ],
    },
  ];

  return (
    <SectionCard
      badge={{ label: 'A11y', color: 'blue' }}
      title="WCAG 웹 접근성 기초"
      description="WCAG 2.1 핵심 4대 원칙과 접근성의 본질적 가치 이해"
    >
      <div className="space-y-8">
        <SubSection title="접근성이란?" icon iconColor="blue">
          <InfoBox variant="blue" title="Web Accessibility (A11y)">
            <p className="text-sm leading-relaxed">
              접근성은 단순히 장애를 위한 것이 아닙니다. 다양한 상황(저조도,
              소음, 터치 제한, 모바일 환경 등)에서 모든 사용자가 제품의 기능을
              <strong>동등하게 활용</strong>할 수 있게 하는 것입니다.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                { icon: '🌓', text: '저조도 환경' },
                { icon: '🔇', text: '소음 환경' },
                { icon: '🤚', text: '일시적 장애' },
                { icon: '📱', text: '모바일 사용' },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 text-xs bg-blue-100 p-2 rounded"
                >
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </InfoBox>
        </SubSection>

        <SubSection title="WCAG 2.1 핵심 4대 원칙" icon iconColor="purple">
          <DemoBox label="POUR Principles">
            <div className="space-y-4">
              {/* Tab Navigation */}
              <div className="flex gap-2 flex-wrap">
                {wcagPrinciples.map((principle, idx) => (
                  <button
                    key={principle.title}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      activeTab === idx
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {principle.icon} {principle.title}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">
                    {wcagPrinciples[activeTab].icon}
                  </span>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {wcagPrinciples[activeTab].title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {wcagPrinciples[activeTab].description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {wcagPrinciples[activeTab].items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="text-green-500 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="명도 대비 체커" icon iconColor="green">
          <DemoBox label="Contrast Ratio Demo">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded border text-center">
                  <div
                    className="text-lg font-bold mb-1"
                    style={{ color: '#767676' }}
                  >
                    Aa
                  </div>
                  <div className="text-xs text-gray-500">
                    #767676 on #FFFFFF
                  </div>
                  <div className="text-xs mt-1 text-green-600 font-medium">
                    ✓ 4.54:1 (WCAG AA)
                  </div>
                </div>
                <div className="bg-white p-3 rounded border text-center">
                  <div
                    className="text-lg font-bold mb-1"
                    style={{ color: '#999999' }}
                  >
                    Aa
                  </div>
                  <div className="text-xs text-gray-500">
                    #999999 on #FFFFFF
                  </div>
                  <div className="text-xs mt-1 text-red-600 font-medium">
                    ✗ 2.85:1 (Fail)
                  </div>
                </div>
              </div>
              <InfoBox variant="gray">
                <p className="text-xs">
                  WCAG AA 기준: 일반 텍스트 4.5:1, 큰 텍스트(18px+) 3:1 이상
                </p>
              </InfoBox>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="접근성 테스트 도구" icon iconColor="orange">
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                name: 'axe DevTools',
                desc: '가장 강력한 자동화 도구',
                badge: 'Essential',
              },
              {
                name: 'Lighthouse',
                desc: 'Chrome 내장 성능/접근성 검사',
                badge: 'Built-in',
              },
              {
                name: 'WAVE',
                desc: '시각적 접근성 평가',
                badge: 'Visual',
              },
              {
                name: 'VoiceOver/NVDA',
                desc: '스크린리더 실제 테스트',
                badge: 'Manual',
              },
            ].map((tool) => (
              <div
                key={tool.name}
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{tool.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">
                    {tool.badge}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{tool.desc}</p>
              </div>
            ))}
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

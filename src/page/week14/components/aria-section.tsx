import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const AriaSection = () => {
  const [expanded, setExpanded] = useState(false);
  const [notification, setNotification] = useState('');

  return (
    <SectionCard
      badge={{ label: 'WAI-ARIA', color: 'purple' }}
      title="ARIA의 올바른 사용"
      description="HTML을 먼저 쓰고, ARIA는 없는 기능을 보완하는 기술"
    >
      <div className="space-y-8">
        <SubSection title="ARIA의 첫 번째 규칙" icon iconColor="red">
          <InfoBox variant="red" title="First Rule of ARIA">
            <p className="text-sm font-medium mb-2">
              "ARIA를 사용하지 않아도 된다면, 사용하지 마세요."
            </p>
            <p className="text-sm">
              네이티브 HTML 요소가 이미 접근성을 제공합니다. ARIA는 HTML로 표현할
              수 없는 기능(예: 커스텀 컴포넌트)에만 사용하세요. ARIA를 남용하면
              접근성이 <strong>악화</strong>됩니다.
            </p>
          </InfoBox>
        </SubSection>

        <SubSection title="자주 쓰는 ARIA 속성" icon iconColor="purple">
          <div className="space-y-3">
            {[
              {
                attr: 'role',
                desc: '요소의 역할 정의',
                example: 'role="dialog", role="alert", role="tablist"',
              },
              {
                attr: 'aria-label',
                desc: '접근 가능한 이름 제공',
                example: 'aria-label="Close menu"',
              },
              {
                attr: 'aria-labelledby',
                desc: '다른 요소의 ID로 이름 참조',
                example: 'aria-labelledby="modal-title"',
              },
              {
                attr: 'aria-describedby',
                desc: '추가 설명 연결',
                example: 'aria-describedby="password-hint"',
              },
              {
                attr: 'aria-expanded',
                desc: '확장/축소 상태',
                example: 'aria-expanded="true"',
              },
              {
                attr: 'aria-live',
                desc: '동적 콘텐츠 알림',
                example: 'aria-live="polite"',
              },
            ].map((item) => (
              <div
                key={item.attr}
                className="bg-purple-50 p-3 rounded-lg border border-purple-100"
              >
                <code className="text-purple-700 font-mono font-bold text-sm">
                  {item.attr}
                </code>
                <p className="text-sm text-purple-800 mt-1">{item.desc}</p>
                <p className="text-xs text-purple-600 font-mono mt-1">
                  {item.example}
                </p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="Interactive: aria-expanded" icon iconColor="blue">
          <DemoBox label="Accordion Pattern">
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
                aria-controls="accordion-content"
                className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition"
              >
                <span className="font-medium">What is aria-expanded?</span>
                <span
                  className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
                >
                  ▼
                </span>
              </button>

              <div
                id="accordion-content"
                className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                  <code>aria-expanded</code>는 스크린리더에게 현재 요소가
                  확장되었는지 축소되었는지 알려줍니다. 토글 버튼, 아코디언,
                  드롭다운 메뉴 등에 필수적입니다.
                </div>
              </div>

              <div className="p-2 bg-gray-100 rounded text-xs font-mono">
                aria-expanded="{expanded.toString()}"
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Interactive: aria-live" icon iconColor="green">
          <DemoBox label="Live Region Demo">
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                버튼을 클릭하면 스크린리더가 알림을 읽어줍니다:
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setNotification('Item added to cart!')}
                  className="px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => setNotification('Form submitted successfully')}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition"
                >
                  Submit Form
                </button>
                <button
                  type="button"
                  onClick={() => setNotification('')}
                  className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition"
                >
                  Clear
                </button>
              </div>

              {/* Live Region */}
              <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className={`p-3 rounded-lg transition-all ${notification ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'}`}
              >
                {notification || 'Notifications will appear here...'}
              </div>

              <CodeBlock
                code={`<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  {notification}
</div>`}
                className="text-xs"
              />
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="모달 다이얼로그 패턴" icon iconColor="orange">
          <CodeBlock
            code={`// Accessible Modal Pattern
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Confirm Delete</h2>
  <p id="modal-description">
    Are you sure you want to delete this item?
  </p>
  <button>Cancel</button>
  <button>Delete</button>
</div>

// Required behaviors:
// 1. Focus trap inside modal
// 2. ESC key closes modal
// 3. Return focus to trigger on close
// 4. Background content hidden from AT`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="ARIA 안티패턴" icon iconColor="red">
          <div className="space-y-2">
            {[
              {
                bad: '<div role="button">Click</div>',
                good: '<button>Click</button>',
                reason: 'Native element already has semantics',
              },
              {
                bad: 'aria-hidden="true" on focusable element',
                good: 'Remove element from tab order first',
                reason: 'Creates invisible but focusable element',
              },
              {
                bad: 'aria-label on <div> without role',
                good: 'Add appropriate role or use native element',
                reason: 'aria-label only works with certain roles',
              },
            ].map((item) => (
              <div
                key={item.bad}
                className="p-3 bg-red-50 rounded-lg border border-red-100"
              >
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-red-500">✗</span>
                  <code className="text-red-700 font-mono text-xs">
                    {item.bad}
                  </code>
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <span className="text-green-500">✓</span>
                  <code className="text-green-700 font-mono text-xs">
                    {item.good}
                  </code>
                </div>
                <p className="text-xs text-gray-600 mt-1">{item.reason}</p>
              </div>
            ))}
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

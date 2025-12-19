import { useEffect, useRef, useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const FocusManagementSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [focusHistory, setFocusHistory] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Focus trap effect
  useEffect(() => {
    if (!modalOpen || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    // Focus first element when modal opens
    firstElement?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
        return;
      }

      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  // Return focus to trigger when modal closes
  useEffect(() => {
    if (!modalOpen && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [modalOpen]);

  const trackFocus = (element: string) => {
    setFocusHistory((prev) => [...prev.slice(-4), element]);
  };

  return (
    <SectionCard
      badge={{ label: 'Focus', color: 'orange' }}
      title="포커스 관리"
      description="React SPA에서 가장 자주 깨지는 접근성 포인트"
    >
      <div className="space-y-8">
        <SubSection title="포커스 관리가 필요한 경우" icon iconColor="orange">
          <InfoBox variant="orange" title="When to Manage Focus">
            <ul className="text-sm space-y-2">
              <li>
                <strong>라우트 이동 시:</strong> 새 페이지의 첫 번째 heading으로
                focus 이동
              </li>
              <li>
                <strong>모달 열릴 때:</strong>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>모달 내부 첫 요소로 focus 이동</li>
                  <li>탭 이동이 모달 밖으로 빠져나가지 않도록 trap</li>
                  <li>닫히면 기존 focus 위치로 복귀</li>
                </ul>
              </li>
              <li>
                <strong>동적 콘텐츠:</strong> 새로 추가된 콘텐츠로 focus 이동
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title="Interactive: Focus Trap Modal" icon iconColor="purple">
          <DemoBox label="Click to Open Modal">
            <div className="space-y-4">
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setModalOpen(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Open Modal
              </button>

              <p className="text-xs text-gray-500">
                모달이 열리면 Tab 키로 탐색해보세요. Focus가 모달 안에
                갇힙니다(trap).
              </p>

              {/* Modal */}
              {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  {/* Backdrop */}
                  <div
                    className="absolute inset-0 bg-black/50"
                    onClick={() => setModalOpen(false)}
                    onKeyDown={(e) => e.key === 'Enter' && setModalOpen(false)}
                    role="button"
                    tabIndex={-1}
                    aria-label="Close modal"
                  />

                  {/* Modal Content */}
                  <div
                    ref={modalRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    className="relative z-10 bg-white rounded-xl p-6 w-80 shadow-2xl"
                  >
                    <h2
                      id="modal-title"
                      className="text-lg font-bold mb-4"
                    >
                      Focus Trap Demo
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                      Tab 키를 눌러보세요. Focus가 이 모달 안에서만 순환합니다.
                      ESC를 누르면 닫힙니다.
                    </p>

                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Input field 1"
                        className="w-full px-3 py-2 border rounded"
                      />
                      <input
                        type="text"
                        placeholder="Input field 2"
                        className="w-full px-3 py-2 border rounded"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setModalOpen(false)}
                          className="flex-1 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => setModalOpen(false)}
                          className="flex-1 px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Focus Indicator Tracker" icon iconColor="blue">
          <DemoBox label="Tab Through These Buttons">
            <div className="space-y-3">
              <div className="flex gap-2 flex-wrap">
                {['Button A', 'Button B', 'Button C', 'Button D'].map((btn) => (
                  <button
                    key={btn}
                    type="button"
                    onFocus={() => trackFocus(btn)}
                    className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg
                             hover:border-blue-300
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                             transition-all"
                  >
                    {btn}
                  </button>
                ))}
              </div>

              <div className="p-3 bg-gray-100 rounded-lg">
                <div className="text-xs font-semibold text-gray-500 mb-2">
                  Focus History:
                </div>
                <div className="flex gap-1 flex-wrap">
                  {focusHistory.length === 0 ? (
                    <span className="text-xs text-gray-400">
                      Tab through buttons...
                    </span>
                  ) : (
                    focusHistory.map((item, idx) => (
                      <span
                        key={`${item}-${idx}`}
                        className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs"
                      >
                        {item}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Focus Trap 구현" icon iconColor="green">
          <CodeBlock
            code={`// React Focus Trap Hook
import { useEffect, useRef } from 'react';

function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const focusable = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0] as HTMLElement;
    const last = focusable[focusable.length - 1] as HTMLElement;

    // Focus first element
    first?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isActive]);

  return containerRef;
}`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="라이브러리 추천" icon iconColor="red">
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                name: 'focus-trap-react',
                desc: '경량 Focus Trap 라이브러리',
                use: 'Modal, Dropdown',
              },
              {
                name: 'React Aria',
                desc: 'Adobe의 접근성 컴포넌트',
                use: 'Full A11y Suite',
              },
              {
                name: 'Radix UI',
                desc: '접근성 내장 컴포넌트',
                use: 'Headless UI',
              },
              {
                name: '@reach/ui',
                desc: '접근성 우선 컴포넌트',
                use: 'Modal, Tabs, etc.',
              },
            ].map((lib) => (
              <div
                key={lib.name}
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
              >
                <code className="text-sm font-mono text-green-700">
                  {lib.name}
                </code>
                <p className="text-xs text-gray-600 mt-1">{lib.desc}</p>
                <span className="text-[10px] px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded mt-2 inline-block">
                  {lib.use}
                </span>
              </div>
            ))}
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

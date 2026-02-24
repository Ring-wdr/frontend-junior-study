import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const FocusManagementSection = () => {
  const { t } = useTranslation('week14');
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
      badge={{ label: t('focus.badge'), color: 'orange' }}
      title={t('focus.title')}
      description={t('focus.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('focus.whenToManage.title')}
          icon
          iconColor="orange"
        >
          <InfoBox variant="orange" title={t('focus.whenToManage.infoTitle')}>
            <ul className="text-sm space-y-2">
              <li>
                <strong>{t('focus.whenToManage.cases.0.title')}</strong>{' '}
                {t('focus.whenToManage.cases.0.desc')}
              </li>
              <li>
                <strong>{t('focus.whenToManage.cases.1.title')}</strong>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  {(
                    t('focus.whenToManage.cases.1.items', {
                      returnObjects: true,
                    }) as string[]
                  ).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </li>
              <li>
                <strong>{t('focus.whenToManage.cases.2.title')}</strong>{' '}
                {t('focus.whenToManage.cases.2.desc')}
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title={t('focus.trapDemo.title')} icon iconColor="purple">
          <DemoBox label={t('focus.trapDemo.label')}>
            <div className="space-y-4">
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setModalOpen(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                {t('focus.trapDemo.openButton')}
              </button>

              <p className="text-xs text-gray-500">
                {t('focus.trapDemo.instructions')}
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
                    <h2 id="modal-title" className="text-lg font-bold mb-4">
                      {t('focus.trapDemo.modalTitle')}
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                      {t('focus.trapDemo.modalDesc')}
                    </p>

                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder={t('focus.trapDemo.input1')}
                        className="w-full px-3 py-2 border rounded"
                      />
                      <input
                        type="text"
                        placeholder={t('focus.trapDemo.input2')}
                        className="w-full px-3 py-2 border rounded"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setModalOpen(false)}
                          className="flex-1 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          {t('focus.trapDemo.cancel')}
                        </button>
                        <button
                          type="button"
                          onClick={() => setModalOpen(false)}
                          className="flex-1 px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                        >
                          {t('focus.trapDemo.confirm')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('focus.indicatorTracker.title')}
          icon
          iconColor="blue"
        >
          <DemoBox label={t('focus.indicatorTracker.label')}>
            <div className="space-y-3">
              <div className="flex gap-2 flex-wrap">
                {(
                  t('focus.indicatorTracker.buttons', {
                    returnObjects: true,
                  }) as string[]
                ).map((btn) => (
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
                  {t('focus.indicatorTracker.historyLabel')}
                </div>
                <div className="flex gap-1 flex-wrap">
                  {focusHistory.length === 0 ? (
                    <span className="text-xs text-gray-400">
                      {t('focus.indicatorTracker.placeholder')}
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

        <SubSection
          title={t('focus.implementation.title')}
          icon
          iconColor="green"
        >
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

        <SubSection title={t('focus.libraries.title')} icon iconColor="red">
          <div className="grid grid-cols-2 gap-3">
            {(
              t('focus.libraries.libs', { returnObjects: true }) as Array<{
                name: string;
                desc: string;
                use: string;
              }>
            ).map((lib) => (
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

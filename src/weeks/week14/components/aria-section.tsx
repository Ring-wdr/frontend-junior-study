'use client';

import { useId, useState } from 'react';
import { Trans, useTranslation } from '@/i18n/client';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const AriaSection = () => {
  const { t, raw } = useTranslation('week14');
  const [expanded, setExpanded] = useState(false);
  const accordionId = useId();
  const [notification, setNotification] = useState('');

  return (
    <SectionCard
      badge={{ label: t('aria.badge'), color: 'purple' }}
      description={t('aria.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('aria.firstRule.title')} icon iconColor="red">
          <InfoBox variant="red" title={t('aria.firstRule.infoTitle')}>
            <p className="text-sm font-medium mb-2">
              {t('aria.firstRule.quote')}
            </p>
            <p className="text-sm">
              <Trans t={t} i18nKey="aria.firstRule.explanation" />
            </p>
          </InfoBox>
        </SubSection>

        <SubSection
          title={t('aria.commonAttributes.title')}
          icon
          iconColor="purple"
        >
          <div className="space-y-3">
            {raw('aria.commonAttributes.attributes').map((item) => (
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

        <SubSection title={t('aria.ariaExpanded.title')} icon iconColor="blue">
          <DemoBox label={t('aria.ariaExpanded.label')}>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
                aria-controls={accordionId}
                className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="font-medium">
                  {t('aria.ariaExpanded.buttonText')}
                </span>
                <span
                  aria-hidden="true"
                  className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                >
                  ▼
                </span>
              </button>

              <div
                id={accordionId}
                inert={!expanded}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                    {t('aria.ariaExpanded.explanation')}
                  </div>
                </div>
              </div>

              <div className="p-2 bg-gray-100 rounded text-xs font-mono">
                aria-expanded="{expanded.toString()}"
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title={t('aria.ariaLive.title')} icon iconColor="green">
          <DemoBox label={t('aria.ariaLive.label')}>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                {t('aria.ariaLive.instructions')}
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setNotification(t('aria.ariaLive.notification1'))
                  }
                  className="px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors duration-200"
                >
                  {t('aria.ariaLive.addToCart')}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setNotification(t('aria.ariaLive.notification2'))
                  }
                  className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors duration-200"
                >
                  {t('aria.ariaLive.submitForm')}
                </button>
                <button
                  type="button"
                  onClick={() => setNotification('')}
                  className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition-colors duration-200"
                >
                  {t('aria.ariaLive.clear')}
                </button>
              </div>

              {/* Live Region */}
              <output
                aria-live="polite"
                aria-atomic="true"
                className={`block p-3 rounded-lg transition-colors duration-200 ${notification ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'}`}
              >
                {notification || t('aria.ariaLive.placeholder')}
              </output>

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

        <SubSection
          title={t('aria.modalPattern.title')}
          icon
          iconColor="orange"
        >
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

        <SubSection title={t('aria.antiPatterns.title')} icon iconColor="red">
          <div className="space-y-2">
            {raw('aria.antiPatterns.patterns').map((item) => (
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

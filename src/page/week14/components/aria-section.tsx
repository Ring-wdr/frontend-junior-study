import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const AriaSection = () => {
  const { t } = useTranslation('week14');
  const [expanded, setExpanded] = useState(false);
  const [notification, setNotification] = useState('');

  return (
    <SectionCard
      badge={{ label: t('aria.badge'), color: 'purple' }}
      title={t('aria.title')}
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

        <SubSection title={t('aria.commonAttributes.title')} icon iconColor="purple">
          <div className="space-y-3">
            {(t('aria.commonAttributes.attributes', { returnObjects: true }) as Array<{ attr: string; desc: string; example: string }>).map((item) => (
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
                aria-controls="accordion-content"
                className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition"
              >
                <span className="font-medium">{t('aria.ariaExpanded.buttonText')}</span>
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
                  {t('aria.ariaExpanded.explanation')}
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

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setNotification(t('aria.ariaLive.notification1'))}
                  className="px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition"
                >
                  {t('aria.ariaLive.addToCart')}
                </button>
                <button
                  type="button"
                  onClick={() => setNotification(t('aria.ariaLive.notification2'))}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition"
                >
                  {t('aria.ariaLive.submitForm')}
                </button>
                <button
                  type="button"
                  onClick={() => setNotification('')}
                  className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition"
                >
                  {t('aria.ariaLive.clear')}
                </button>
              </div>

              {/* Live Region */}
              <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className={`p-3 rounded-lg transition-all ${notification ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'}`}
              >
                {notification || t('aria.ariaLive.placeholder')}
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

        <SubSection title={t('aria.modalPattern.title')} icon iconColor="orange">
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
            {(t('aria.antiPatterns.patterns', { returnObjects: true }) as Array<{ bad: string; good: string; reason: string }>).map((item) => (
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

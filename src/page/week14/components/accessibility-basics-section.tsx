import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';

export const AccessibilityBasicsSection = () => {
  const { t } = useTranslation('week14');
  const [activeTab, setActiveTab] = useState(0);

  const wcagPrinciples = [
    {
      title: 'Perceivable',
      icon: '👁️',
      color: 'blue',
      description: t('wcag.principles.perceivable.description'),
      items: t('wcag.principles.perceivable.items', { returnObjects: true }) as string[],
    },
    {
      title: 'Operable',
      icon: '⌨️',
      color: 'green',
      description: t('wcag.principles.operable.description'),
      items: t('wcag.principles.operable.items', { returnObjects: true }) as string[],
    },
    {
      title: 'Understandable',
      icon: '💡',
      color: 'orange',
      description: t('wcag.principles.understandable.description'),
      items: t('wcag.principles.understandable.items', { returnObjects: true }) as string[],
    },
    {
      title: 'Robust',
      icon: '🛡️',
      color: 'purple',
      description: t('wcag.principles.robust.description'),
      items: t('wcag.principles.robust.items', { returnObjects: true }) as string[],
    },
  ];

  const scenarios = [
    { icon: '🌓', text: t('wcag.whatIsA11y.scenarios.lowLight') },
    { icon: '🔇', text: t('wcag.whatIsA11y.scenarios.noise') },
    { icon: '🤚', text: t('wcag.whatIsA11y.scenarios.temporaryDisability') },
    { icon: '📱', text: t('wcag.whatIsA11y.scenarios.mobile') },
  ];

  return (
    <SectionCard
      badge={{ label: t('wcag.badge'), color: 'blue' }}
      title={t('wcag.title')}
      description={t('wcag.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('wcag.whatIsA11y.title')} icon iconColor="blue">
          <InfoBox variant="blue" title={t('wcag.whatIsA11y.infoTitle')}>
            <p className="text-sm leading-relaxed">
              <Trans t={t} i18nKey="wcag.whatIsA11y.infoText" />
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {scenarios.map((item) => (
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

        <SubSection title={t('wcag.principles.title')} icon iconColor="purple">
          <DemoBox label={t('wcag.principles.label')}>
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

        <SubSection title={t('wcag.contrastChecker.title')} icon iconColor="green">
          <DemoBox label={t('wcag.contrastChecker.label')}>
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
                    {t('wcag.contrastChecker.pass')}
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
                    {t('wcag.contrastChecker.fail')}
                  </div>
                </div>
              </div>
              <InfoBox variant="gray">
                <p className="text-xs">
                  {t('wcag.contrastChecker.guideline')}
                </p>
              </InfoBox>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title={t('wcag.testingTools.title')} icon iconColor="orange">
          <div className="grid grid-cols-2 gap-3">
            {(t('wcag.testingTools.tools', { returnObjects: true }) as Array<{name: string, desc: string, badge: string}>).map((tool) => (
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

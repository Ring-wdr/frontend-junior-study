'use client';

import { useTranslation } from '@/i18n/client';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';
import { AlertRuleVisualizer } from './alert-rule-visualizer';

export const AlertsSection = () => {
  const { t, raw } = useTranslation('week22');
  const rules = raw('alerts.rules');
  const dashboardMetrics = raw('alerts.dashboardMetrics');
  const fatiguePractices = raw('alerts.fatiguePractices');

  return (
    <SectionCard
      badge={{ label: t('alerts.badge'), color: 'pink' }}
      description={t('alerts.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('alerts.slackTitle')} icon iconColor="pink">
          <DemoBox label={t('alerts.slackTitle')}>
            <CodeBlock
              code={t('alerts.slackCode')}
              language="typescript"
              className="text-xs"
            />
          </DemoBox>
        </SubSection>

        <SubSection title={t('alerts.rulesTitle')} icon iconColor="purple">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">
                    {t('alerts.rulesTitle')}
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">
                    Threshold
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {rules.map((r) => (
                  <tr
                    key={r.condition}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="py-2 px-3 font-medium text-gray-800">
                      {r.condition}
                    </td>
                    <td className="py-2 px-3 text-gray-600">{r.threshold}</td>
                    <td className="py-2 px-3 text-pink-700">{r.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title={t('alerts.demoTitle')} icon iconColor="pink">
          <DemoBox label={t('interactiveDemo')}>
            <AlertRuleVisualizer />
          </DemoBox>
        </SubSection>

        <SubSection title={t('alerts.dashboardTitle')} icon iconColor="blue">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {dashboardMetrics.map((dm) => (
              <div
                key={dm.category}
                className="rounded-xl border border-gray-200 bg-gray-50 p-4"
              >
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  {dm.category}
                </h4>
                <ul className="space-y-1">
                  {dm.items.map((item) => (
                    <li
                      key={item}
                      className="text-xs text-gray-600 flex items-start gap-1.5"
                    >
                      <span className="text-pink-400 mt-0.5">&#8226;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title={t('alerts.fatigueTitle')} icon iconColor="orange">
          <ul className="space-y-2">
            {fatiguePractices.map((practice) => (
              <li
                key={practice}
                className="text-sm text-gray-700 flex items-start gap-2"
              >
                <span className="text-orange-400 mt-1 shrink-0">&#9679;</span>
                {practice}
              </li>
            ))}
          </ul>
        </SubSection>

        <InfoBox variant="orange" title={t('alerts.noteTitle')}>
          {t('alerts.note')}
        </InfoBox>
      </div>
    </SectionCard>
  );
};

import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

type EventType = { type: string; desc: string; params: string };

export const AnalyticsSection = () => {
  const { t } = useTranslation('week22');
  const eventTypes = t('analytics.eventTypes', {
    returnObjects: true,
  }) as unknown as EventType[];

  return (
    <SectionCard
      badge={{ label: t('analytics.badge'), color: 'orange' }}
      title={t('analytics.title')}
      description={t('analytics.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('analytics.ga4SetupTitle')}
          icon
          iconColor="orange"
        >
          <DemoBox label={t('analytics.ga4SetupTitle')}>
            <CodeBlock
              code={t('analytics.ga4SetupCode')}
              language="typescript"
              className="text-xs"
            />
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('analytics.eventDesignTitle')}
          icon
          iconColor="blue"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">
                    Event
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">
                    Parameters
                  </th>
                </tr>
              </thead>
              <tbody>
                {eventTypes.map((e) => (
                  <tr
                    key={e.type}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="py-2 px-3 font-mono text-xs text-orange-700">
                      {e.type}
                    </td>
                    <td className="py-2 px-3 text-gray-700">{e.desc}</td>
                    <td className="py-2 px-3 text-gray-500 text-xs">
                      {e.params}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title={t('analytics.routerTitle')} icon iconColor="purple">
          <DemoBox label={t('analytics.routerTitle')}>
            <CodeBlock
              code={t('analytics.routerCode')}
              language="tsx"
              className="text-xs"
            />
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('analytics.customEventTitle')}
          icon
          iconColor="green"
        >
          <DemoBox label={t('analytics.customEventTitle')}>
            <CodeBlock
              code={t('analytics.customEventCode')}
              language="typescript"
              className="text-xs"
            />
          </DemoBox>
        </SubSection>

        <InfoBox variant="orange" title={t('analytics.noteTitle')}>
          {t('analytics.note')}
        </InfoBox>
      </div>
    </SectionCard>
  );
};

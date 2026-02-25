import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

type ComparisonItem = { aspect: string; synthetic: string; rum: string };
type Vital = { metric: string; threshold: string; description: string };

export const RumSection = () => {
  const { t } = useTranslation('week22');
  const comparisonItems = t('rum.comparisonItems', {
    returnObjects: true,
  }) as unknown as ComparisonItem[];
  const vitals = t('rum.vitals', {
    returnObjects: true,
  }) as unknown as Vital[];

  return (
    <SectionCard
      badge={{ label: t('rum.badge'), color: 'green' }}
      title={t('rum.title')}
      description={t('rum.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('rum.comparisonTitle')} icon iconColor="green">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700" />
                  <th className="text-left py-2 px-3 font-semibold text-gray-600">
                    Synthetic
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-green-700">
                    RUM
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonItems.map((c) => (
                  <tr
                    key={c.aspect}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="py-2 px-3 font-medium text-gray-800">
                      {c.aspect}
                    </td>
                    <td className="py-2 px-3 text-gray-600">{c.synthetic}</td>
                    <td className="py-2 px-3 text-green-700">{c.rum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title={t('rum.vitalsTitle')} icon iconColor="blue">
          <div className="space-y-3">
            {vitals.map((v) => (
              <div
                key={v.metric}
                className="rounded-xl border border-green-100 bg-green-50 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
              >
                <div>
                  <h4 className="text-sm font-semibold text-green-900">
                    {v.metric}
                  </h4>
                  <p className="text-sm text-green-800">{v.description}</p>
                </div>
                <span className="text-xs font-mono font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full whitespace-nowrap">
                  {v.threshold}
                </span>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title={t('rum.webVitalsTitle')} icon iconColor="purple">
          <DemoBox label={t('rum.webVitalsTitle')}>
            <CodeBlock
              code={t('rum.webVitalsCode')}
              language="typescript"
              className="text-xs"
            />
          </DemoBox>
        </SubSection>

        <SubSection title={t('rum.customTitle')} icon iconColor="orange">
          <DemoBox label={t('rum.customTitle')}>
            <CodeBlock
              code={t('rum.customCode')}
              language="typescript"
              className="text-xs"
            />
          </DemoBox>
        </SubSection>

        <SubSection title={t('rum.sendingTitle')} icon iconColor="pink">
          <DemoBox label={t('rum.sendingTitle')}>
            <CodeBlock
              code={t('rum.sendingCode')}
              language="typescript"
              className="text-xs"
            />
          </DemoBox>
        </SubSection>

        <InfoBox variant="green" title={t('rum.noteTitle')}>
          {t('rum.note')}
        </InfoBox>
      </div>
    </SectionCard>
  );
};

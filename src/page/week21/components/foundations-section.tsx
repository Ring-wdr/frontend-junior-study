import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';

type Pillar = {
  title: string;
  desc: string;
};

type Metric = {
  title: string;
  value: string;
};

export const CiCdFoundationSection = () => {
  const { t } = useTranslation('week21');
  const pillars = t('foundations.pillars', {
    returnObjects: true,
  }) as unknown as Pillar[];
  const metrics = t('foundations.metrics', {
    returnObjects: true,
  }) as unknown as Metric[];
  const process = t('foundations.process', { returnObjects: true }) as string[];

  return (
    <SectionCard
      badge={{ label: t('foundations.badge'), color: 'blue' }}
      title={t('foundations.title')}
      description={t('foundations.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('foundations.pillarsTitle')} icon iconColor="blue">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-xl border border-blue-100 bg-blue-50 p-4"
              >
                <h4 className="text-sm font-semibold text-blue-900 mb-2">
                  {pillar.title}
                </h4>
                <p className="text-sm text-blue-800">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title={t('foundations.processTitle')} icon iconColor="green">
          <ol className="space-y-2 text-sm text-gray-700 list-decimal pl-5">
            {process.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </SubSection>

        <SubSection title={t('foundations.metricsTitle')} icon iconColor="orange">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {metrics.map((metric) => (
              <div
                key={metric.title}
                className="rounded-xl border border-gray-200 bg-gray-50 p-4"
              >
                <p className="text-xs text-gray-500 mb-1">{metric.title}</p>
                <p className="text-lg font-bold text-gray-900">{metric.value}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <DemoBox label={t('foundations.demoTitle')}>
          <p className="text-sm text-gray-600">{t('foundations.demoText')}</p>
        </DemoBox>

        <InfoBox variant="purple" title={t('foundations.finalNoteTitle')}>
          {t('foundations.finalNote')}
        </InfoBox>
      </div>
    </SectionCard>
  );
};

import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';

type Mode = {
  title: string;
  detail: string;
};

export const CdDeploymentSection = () => {
  const { t } = useTranslation('week21');
  const modes = t('cdPipeline.modes', {
    returnObjects: true,
  }) as unknown as Mode[];
  const rollout = t('cdPipeline.rollout', { returnObjects: true }) as string[];
  const targets = t('cdPipeline.targets', { returnObjects: true }) as string[];

  return (
    <SectionCard
      badge={{ label: t('cdPipeline.badge'), color: 'orange' }}
      title={t('cdPipeline.title')}
      description={t('cdPipeline.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('cdPipeline.deployModeTitle')}
          icon
          iconColor="orange"
        >
          <div className="space-y-3">
            {modes.map((mode) => (
              <div
                key={mode.title}
                className="rounded-xl border border-orange-100 bg-orange-50 p-4"
              >
                <h4 className="text-sm font-semibold text-orange-900 mb-1">
                  {mode.title}
                </h4>
                <p className="text-sm text-orange-800">{mode.detail}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title={t('cdPipeline.targetTitle')} icon iconColor="blue">
          <ul className="space-y-1 text-sm text-gray-700 list-disc pl-5">
            {targets.map((target) => (
              <li key={target}>{target}</li>
            ))}
          </ul>
        </SubSection>

        <SubSection title={t('cdPipeline.rolloutTitle')} icon iconColor="green">
          <ol className="space-y-2 text-sm text-gray-700 list-decimal pl-5">
            {rollout.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </SubSection>

        <DemoBox label={t('cdPipeline.workflowLabel')}>
          <p className="text-sm text-gray-600">{t('cdPipeline.workflowText')}</p>
        </DemoBox>

        <InfoBox variant="blue" title={t('cdPipeline.noteTitle')}>
          {t('cdPipeline.note')}
        </InfoBox>
      </div>
    </SectionCard>
  );
};

import { useTranslation } from 'react-i18next';
import { CodeBlock } from '../../../components/ui/code-block';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';

type Stage = {
  name: string;
  detail: string;
};

type Strategy = {
  title: string;
  detail: string;
};

export const CiPipelineSection = () => {
  const { t } = useTranslation('week21');
  const stages = t('ciPipeline.stages', {
    returnObjects: true,
  }) as unknown as Stage[];
  const strategies = t('ciPipeline.strategies', {
    returnObjects: true,
  }) as unknown as Strategy[];

  return (
    <SectionCard
      badge={{ label: t('ciPipeline.badge'), color: 'green' }}
      title={t('ciPipeline.title')}
      description={t('ciPipeline.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('ciPipeline.stagesTitle')} icon iconColor="green">
          <div className="space-y-3">
            {stages.map((stage) => (
              <div
                key={stage.name}
                className="rounded-xl border border-emerald-100 bg-emerald-50 p-4"
              >
                <h4 className="text-sm font-semibold text-emerald-900 mb-1">
                  {stage.name}
                </h4>
                <p className="text-sm text-emerald-800">{stage.detail}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title={t('ciPipeline.strategyTitle')} icon iconColor="blue">
          <div className="space-y-4">
            {strategies.map((strategy) => (
              <div key={strategy.title} className="space-y-1">
                <h4 className="text-sm font-semibold text-gray-900">
                  {strategy.title}
                </h4>
                <p className="text-sm text-gray-600">{strategy.detail}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title={t('ciPipeline.matrixTitle')} icon iconColor="purple">
          <DemoBox label={t('ciPipeline.matrixLabel')}>
            <CodeBlock
              language="yaml"
              code={t('ciPipeline.matrixYaml')}
              className="text-xs"
            />
          </DemoBox>
        </SubSection>

        <InfoBox variant="orange" title={t('ciPipeline.warningTitle')}>
          {t('ciPipeline.warning')}
        </InfoBox>
      </div>
    </SectionCard>
  );
};

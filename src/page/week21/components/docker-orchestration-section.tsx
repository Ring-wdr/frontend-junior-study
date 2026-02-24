import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const DockerSection = () => {
  const { t } = useTranslation('week21');
  const steps = t('docker.steps', { returnObjects: true }) as string[];

  return (
    <SectionCard
      badge={{ label: t('docker.badge'), color: 'pink' }}
      title={t('docker.title')}
      description={t('docker.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('docker.buildTitle')} icon iconColor="red">
          <ul className="space-y-1 text-sm text-gray-700 list-disc pl-5">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </SubSection>

        <SubSection title={t('docker.artifactTitle')} icon iconColor="purple">
          <DemoBox label={t('docker.artifactLabel')}>
            <CodeBlock
              language="dockerfile"
              code={t('docker.dockerfile')}
              className="text-xs"
            />
          </DemoBox>
        </SubSection>

        <SubSection title={t('docker.composeTitle')} icon iconColor="blue">
          <DemoBox label={t('docker.composeLabel')}>
            <CodeBlock
              language="yaml"
              code={t('docker.compose')}
              className="text-xs"
            />
          </DemoBox>
        </SubSection>

        <InfoBox variant="red" title={t('docker.noteTitle')}>
          {t('docker.note')}
        </InfoBox>
      </div>
    </SectionCard>
  );
};

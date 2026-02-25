import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';
import { DataMaskingVisualizer } from './data-masking-visualizer';

type GdprRequirement = { requirement: string; implementation: string };

export const PrivacySection = () => {
  const { t } = useTranslation('week22');
  const gdprRequirements = t('privacy.gdprRequirements', {
    returnObjects: true,
  }) as unknown as GdprRequirement[];

  return (
    <SectionCard
      badge={{ label: t('privacy.badge'), color: 'teal' }}
      title={t('privacy.title')}
      description={t('privacy.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('privacy.maskingTitle')} icon iconColor="blue">
          <DemoBox label={t('privacy.maskingTitle')}>
            <CodeBlock
              code={t('privacy.maskingCode')}
              language="typescript"
              className="text-xs"
            />
          </DemoBox>
        </SubSection>

        <SubSection title="Data Masking Demo" icon iconColor="blue">
          <DemoBox label="Interactive Demo">
            <DataMaskingVisualizer />
          </DemoBox>
        </SubSection>

        <SubSection title={t('privacy.gdprTitle')} icon iconColor="purple">
          <div className="space-y-3">
            {gdprRequirements.map((r) => (
              <div
                key={r.requirement}
                className="rounded-xl border border-teal-100 bg-teal-50 p-4"
              >
                <h4 className="text-sm font-semibold text-teal-900 mb-1">
                  {r.requirement}
                </h4>
                <p className="text-sm text-teal-800">{r.implementation}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title={t('privacy.consentTitle')} icon iconColor="green">
          <DemoBox label={t('privacy.consentTitle')}>
            <CodeBlock
              code={t('privacy.consentCode')}
              language="typescript"
              className="text-xs"
            />
          </DemoBox>
        </SubSection>

        <SubSection title={t('privacy.deletionTitle')} icon iconColor="orange">
          <DemoBox label={t('privacy.deletionTitle')}>
            <CodeBlock
              code={t('privacy.deletionCode')}
              language="typescript"
              className="text-xs"
            />
          </DemoBox>
        </SubSection>

        <InfoBox variant="purple" title={t('privacy.noteTitle')}>
          {t('privacy.note')}
        </InfoBox>
      </div>
    </SectionCard>
  );
};

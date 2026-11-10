'use client';

import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const WorkflowsSection = () => {
  const { t, raw } = useTranslation('week17');
  const tips = raw('workflows.tips');

  return (
    <SectionCard
      badge={{ label: t('workflows.badge'), color: 'teal' }}
      description={t('workflows.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('workflows.featureDevTitle')}
          icon
          iconColor="blue"
        >
          <InfoBox variant="blue" title={t('workflows.featureDevInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('workflows.featureDevInfoDesc')}
            </p>
          </InfoBox>

          <CodeBlock
            code={t('workflows.featureDevCode')}
            language="bash"
            className="mt-4 text-xs"
          />
        </SubSection>

        <SubSection title={t('workflows.bugFixTitle')} icon iconColor="orange">
          <InfoBox variant="orange" title={t('workflows.bugFixInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('workflows.bugFixInfoDesc')}
            </p>
          </InfoBox>

          <CodeBlock
            code={t('workflows.bugFixCode')}
            language="bash"
            className="mt-4 text-xs"
          />
        </SubSection>

        <SubSection
          title={t('workflows.codeReviewTitle')}
          icon
          iconColor="purple"
        >
          <CodeBlock
            code={t('workflows.codeReviewCode')}
            language="bash"
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('workflows.automationTitle')}
          icon
          iconColor="green"
        >
          <InfoBox variant="blue" title={t('workflows.automationInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('workflows.automationInfoDesc')}
            </p>
          </InfoBox>

          <CodeBlock
            code={t('workflows.automationCode')}
            language="bash"
            className="mt-4 text-xs"
          />

          <InfoBox variant="green" title={t('workflows.automationTips')}>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};

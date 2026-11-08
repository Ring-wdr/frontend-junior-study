'use client';

import { Trans, useTranslation } from '@/i18n/client';
import {
  DemoBox,
  InfoBox,
  SectionCard,
  SectionDivider,
  SubSection,
} from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { ConceptAVisualizer } from './concept-a-visualizer';
import { ConceptBVisualizer } from './concept-b-visualizer';

const CONCEPT_A_CODE = `const conceptA = () => {
  return 'A';
};`;

const CONCEPT_B_CODE = `const conceptB = () => {
  return 'B';
};`;

export const MultipleSubsectionsSection = () => {
  const { t } = useTranslation('weekN');

  return (
    <SectionCard
      badge={{ label: t('related.badge'), color: 'purple' }}
      description={t('related.description')}
      testId="related-section"
    >
      <div className="space-y-8">
        <SubSection title={t('related.conceptA.title')} icon iconColor="purple">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans
                t={t}
                i18nKey="related.conceptA.body"
                components={{ code: <code /> }}
              />
            </p>
            <DemoBox>
              <ConceptAVisualizer />
            </DemoBox>
            <CodeBlock code={CONCEPT_A_CODE} language="ts" className="text-xs" />
            <InfoBox variant="purple" title={t('related.conceptA.whenTitle')}>
              {t('related.conceptA.when')}
            </InfoBox>
          </div>
        </SubSection>

        <SectionDivider />

        <SubSection title={t('related.conceptB.title')} icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">{t('related.conceptB.body')}</p>
            <DemoBox>
              <ConceptBVisualizer />
            </DemoBox>
            <CodeBlock code={CONCEPT_B_CODE} language="ts" className="text-xs" />
            <InfoBox variant="blue" title={t('related.conceptB.whenTitle')}>
              {t('related.conceptB.when')}
            </InfoBox>
          </div>
        </SubSection>

        <InfoBox variant="gray" title={t('related.summary.title')}>
          {t('related.summary.body')}
        </InfoBox>
      </div>
    </SectionCard>
  );
};

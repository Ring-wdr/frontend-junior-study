'use client';

import { useTranslation } from '@/i18n/client';
import {
  ContentGrid,
  DemoBox,
  InfoBox,
  SectionCard,
  SubSection,
} from '../../../components';
import { HoistingDemo } from './hoisting-demo';

export const ExecutionContextSection = () => {
  const { t, raw } = useTranslation('week1');

  return (
    <SectionCard
      badge={{ label: t('executionContext.badge'), color: 'purple' }}
      description={t('executionContext.description')}
      testId="execution-context-section"
    >
      <div className="space-y-8">
        <SubSection
          title={t('executionContext.structure.title')}
          icon
          iconColor="purple"
        >
          <p className="text-sm text-gray-700">
            {t('executionContext.structure.body')}
          </p>
          <ContentGrid items={raw('executionContext.structure.items')} />
        </SubSection>

        <SubSection
          title={t('executionContext.records.title')}
          icon
          iconColor="purple"
        >
          <p className="text-sm text-gray-700">
            {t('executionContext.records.body')}
          </p>
          <ContentGrid items={raw('executionContext.records.items')} />
        </SubSection>

        <SubSection
          title={t('executionContext.phases.title')}
          icon
          iconColor="purple"
        >
          <p className="mb-4 text-sm text-gray-700">
            {t('executionContext.phases.body')}
          </p>
          <DemoBox>
            <HoistingDemo />
          </DemoBox>
        </SubSection>

        <InfoBox variant="purple" title={t('executionContext.takeaway.title')}>
          {t('executionContext.takeaway.content')}
        </InfoBox>
      </div>
    </SectionCard>
  );
};

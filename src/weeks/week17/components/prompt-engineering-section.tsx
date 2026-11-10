'use client';

import { useTranslation } from '@/i18n/client';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { PromptEngineeringConstraints } from './prompt-engineering-section-constraints';
import { PromptEngineeringContext } from './prompt-engineering-section-context';
import { PromptEngineeringGoal } from './prompt-engineering-section-goal';
import { PromptEngineeringIterative } from './prompt-engineering-section-iterative';

export const PromptEngineeringSection = () => {
  const { t } = useTranslation('week17');

  return (
    <SectionCard
      badge={{ label: t('promptEngineering.badge'), color: 'pink' }}
      description={t('promptEngineering.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('promptEngineering.goal.title')}
          icon
          iconColor="pink"
        >
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            {t('promptEngineering.goal.desc')}
          </p>
          <PromptEngineeringGoal />
        </SubSection>

        <SubSection
          title={t('promptEngineering.context.title')}
          icon
          iconColor="purple"
        >
          <PromptEngineeringContext />
        </SubSection>

        <SubSection
          title={t('promptEngineering.constraints.title')}
          icon
          iconColor="orange"
        >
          <PromptEngineeringConstraints />
        </SubSection>

        <SubSection
          title={t('promptEngineering.iterative.title')}
          icon
          iconColor="blue"
        >
          <PromptEngineeringIterative />
        </SubSection>
      </div>
    </SectionCard>
  );
};

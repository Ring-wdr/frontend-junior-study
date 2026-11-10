'use client';

import { motion } from 'motion/react';
import { useTranslation } from '@/i18n/client';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { AiAgentsSectionEra } from './ai-agents-section-era';
import { AiAgentsSectionLoop } from './ai-agents-section-loop';
import { AiAgentsSectionPicker } from './ai-agents-section-picker';
import { AiAgentsSectionQuiz } from './ai-agents-section-quiz';

export const AiAgentsSection = () => {
  const { t, raw } = useTranslation('week17');
  const tools = raw('aiAgents.tools.items');
  const standards = raw('aiAgents.standards.items');

  return (
    <SectionCard
      badge={{ label: t('aiAgents.badge'), color: 'purple' }}
      description={t('aiAgents.description')}
      testId="ai-agents-section"
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="space-y-8"
      >
        <SubSection title={t('aiAgents.era.title')} icon iconColor="purple">
          <DemoBox label={t('aiAgents.era.title')}>
            <AiAgentsSectionEra />
          </DemoBox>
        </SubSection>

        <SubSection title={t('aiAgents.tools.title')} icon iconColor="blue">
          <DemoBox label={t('aiAgents.tools.title')}>
            <AiAgentsSectionPicker
              items={tools}
              pickLabel={t('aiAgents.tools.pickLabel')}
              prevLabel={t('aiAgents.tools.prev')}
              nextLabel={t('aiAgents.tools.next')}
            />
          </DemoBox>
          <p className="mt-3 text-xs text-gray-600 leading-relaxed">
            {t('aiAgents.tools.note')}
          </p>
        </SubSection>

        <SubSection
          title={t('aiAgents.standards.title')}
          icon
          iconColor="purple"
        >
          <p className="mb-4 text-sm text-gray-700 leading-relaxed">
            {t('aiAgents.standards.intro')}
          </p>
          <DemoBox label={t('aiAgents.standards.title')}>
            <AiAgentsSectionPicker
              items={standards}
              pickLabel={t('aiAgents.standards.pickLabel')}
              prevLabel={t('aiAgents.standards.prev')}
              nextLabel={t('aiAgents.standards.next')}
            />
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('aiAgents.capabilities.title')}
          icon
          iconColor="green"
        >
          <DemoBox label={t('aiAgents.capabilities.title')}>
            <AiAgentsSectionQuiz />
          </DemoBox>
          <InfoBox
            variant="orange"
            title={t('aiAgents.capabilities.importantNote')}
          >
            <p className="text-sm leading-relaxed">
              {t('aiAgents.capabilities.importantNoteDesc')}
            </p>
          </InfoBox>
        </SubSection>

        <SubSection title={t('aiAgents.example.title')} icon iconColor="blue">
          <AiAgentsSectionLoop />
        </SubSection>
      </motion.div>
    </SectionCard>
  );
};

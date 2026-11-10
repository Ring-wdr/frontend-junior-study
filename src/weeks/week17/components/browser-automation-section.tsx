'use client';

import { motion } from 'motion/react';
import { useTranslation } from '@/i18n/client';
import { DemoBox } from '../../../components/demo-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { BrowserAutomationDuo } from './browser-automation-duo';
import { BrowserAutomationExample } from './browser-automation-example';
import { BrowserAutomationExplorer } from './browser-automation-explorer';
import { BrowserAutomationGuide } from './browser-automation-guide';

export const BrowserAutomationSection = () => {
  const { t, raw } = useTranslation('week17');
  const axes = raw('browserAutomation.overview.axes');

  return (
    <SectionCard
      badge={{ label: t('browserAutomation.badge'), color: 'blue' }}
      description={t('browserAutomation.description')}
      testId="browser-automation-section"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="space-y-8"
      >
        <SubSection
          title={t('browserAutomation.overview.title')}
          icon
          iconColor="blue"
        >
          <p className="text-sm leading-relaxed text-gray-700">
            {t('browserAutomation.overview.lead')}
          </p>
          <ol className="mt-2 list-decimal pl-5 space-y-1 text-sm text-gray-700">
            {axes.map((axis) => (
              <li key={axis}>{axis}</li>
            ))}
          </ol>
          <p className="mt-3 mb-4 text-sm leading-relaxed text-gray-700">
            {t('browserAutomation.overview.tableLead')}
          </p>
          <DemoBox label={t('browserAutomation.explorer.pickLabel')}>
            <BrowserAutomationExplorer />
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('browserAutomation.duo.title')}
          icon
          iconColor="green"
        >
          <DemoBox label={t('browserAutomation.duo.title')}>
            <BrowserAutomationDuo />
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('browserAutomation.guide.title')}
          icon
          iconColor="blue"
        >
          <DemoBox label={t('browserAutomation.guide.pickLabel')}>
            <BrowserAutomationGuide />
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('browserAutomation.example.title')}
          icon
          iconColor="green"
        >
          <BrowserAutomationExample />
        </SubSection>
      </motion.div>
    </SectionCard>
  );
};

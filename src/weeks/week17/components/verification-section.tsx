'use client';

import { motion } from 'motion/react';
import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { VerificationChecklist } from './verification-section-checklist';
import { VerificationGuidelines } from './verification-section-guidelines';
import { VerificationHook } from './verification-section-hook';
import { VerificationPermissions } from './verification-section-permissions';

export const VerificationSection = () => {
  const { t } = useTranslation('week17');

  return (
    <SectionCard
      badge={{ label: t('verification.badge'), color: 'orange' }}
      description={t('verification.description')}
      testId="verification-section"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
      >
        <SubSection title={t('verification.hook.title')} icon iconColor="blue">
          <VerificationHook />
        </SubSection>

        <SubSection
          title={t('verification.checklist.title')}
          icon
          iconColor="orange"
        >
          <VerificationChecklist />
        </SubSection>

        <SubSection
          title={t('verification.permissions.title')}
          icon
          iconColor="red"
        >
          <InfoBox
            variant="blue"
            title={t('verification.permissions.infoTitle')}
          >
            <p className="text-sm leading-relaxed">
              {t('verification.permissions.infoDesc')}
            </p>
          </InfoBox>
          <div className="mt-4">
            <VerificationPermissions />
          </div>
          <InfoBox variant="red" title={t('verification.injection.title')}>
            <p className="text-sm leading-relaxed">
              {t('verification.injection.desc')}
            </p>
          </InfoBox>
        </SubSection>

        <SubSection
          title={t('verification.guidelines.title')}
          icon
          iconColor="purple"
        >
          <VerificationGuidelines />
          <InfoBox
            variant="orange"
            title={t('verification.guidelines.noteTitle')}
          >
            <p className="text-sm leading-relaxed">
              {t('verification.guidelines.noteDesc')}
            </p>
          </InfoBox>
        </SubSection>
      </motion.div>
    </SectionCard>
  );
};

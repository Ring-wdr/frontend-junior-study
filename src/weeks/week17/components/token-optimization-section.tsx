'use client';

import { useTranslation } from '@/i18n/client';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { TokenOptimizationChecklist } from './token-optimization-section-checklist';
import { TokenOptimizationCommands } from './token-optimization-section-commands';
import { TokenOptimizationGauge } from './token-optimization-section-gauge';

export const TokenOptimizationSection = () => {
  const { t } = useTranslation('week17');

  return (
    <SectionCard
      badge={{ label: t('tokenOptimization.badge'), color: 'teal' }}
      description={t('tokenOptimization.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('tokenOptimization.contextOptimizationTitle')}
          icon
          iconColor="green"
        >
          <InfoBox
            variant="green"
            title={t('tokenOptimization.contextOptimizationInfoTitle')}
          >
            <p className="text-sm leading-relaxed">
              {t('tokenOptimization.contextOptimizationInfoDesc')}
            </p>
          </InfoBox>

          <div className="mt-4 space-y-4">
            <DemoBox label={t('tokenOptimization.ui.gaugeLabel')}>
              <TokenOptimizationGauge />
            </DemoBox>
            <TokenOptimizationCommands />
            <TokenOptimizationChecklist />
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

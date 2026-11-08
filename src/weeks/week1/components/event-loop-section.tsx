'use client';

import { useTranslation } from '@/i18n/client';
import { InfoBox, SectionCard } from '../../../components';
import { EventLoopVisualizer } from './event-loop-visualizer';

export const EventLoopSection = () => {
  const { t } = useTranslation('week1');

  return (
    <SectionCard
      badge={{ label: t('eventLoop.badge'), color: 'blue' }}
      description={t('eventLoop.description')}
      testId="event-loop-section"
    >
      <EventLoopVisualizer />

      <div className="mt-6">
        <InfoBox variant="blue" title={t('eventLoop.keyRule.title')}>
          {t('eventLoop.keyRule.content')}
        </InfoBox>
      </div>
    </SectionCard>
  );
};

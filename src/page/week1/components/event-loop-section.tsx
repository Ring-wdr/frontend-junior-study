import { useTranslation } from 'react-i18next';
import { InfoBox, SectionCard } from '../../../components';
import { EventLoopVisualizer } from './event-loop-visualizer';

export const EventLoopSection = () => {
  const { t } = useTranslation('week1');

  return (
    <SectionCard
      badge={{ label: t('eventLoop.badge'), color: 'blue' }}
      title={t('eventLoop.title')}
      description={t('eventLoop.description')}
      testId="event-loop-section"
    >
      <EventLoopVisualizer />

      <div className="mt-8">
        <InfoBox variant="blue" title={t('eventLoop.keyRule.title')}>
          {t('eventLoop.keyRule.content', {
            interpolation: { escapeValue: false },
          })}
        </InfoBox>
      </div>
    </SectionCard>
  );
};

import { Trans, useTranslation } from 'react-i18next';
import { InfoBox, SectionCard } from '../../../components';
import { V8HiddenClassDemo } from './v8-hidden-class-demo';

export const OptimizationSection = () => {
  const { t } = useTranslation('week1');

  return (
    <SectionCard
      badge={{ label: t('optimization.badge'), color: 'blue' }}
      title={t('optimization.title')}
      description={t('optimization.description')}
      testId="optimization-section"
    >
      <V8HiddenClassDemo />

      <div className="mt-6">
        <InfoBox variant="blue" title={t('optimization.keyTakeaway.title')}>
          <Trans t={t} i18nKey="optimization.keyTakeaway.content" />
        </InfoBox>
      </div>
    </SectionCard>
  );
};

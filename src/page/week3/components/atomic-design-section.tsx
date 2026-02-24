import { useTranslation } from 'react-i18next';
import { InfoBox, SectionCard } from '../../../components';
import { AtomicDesignVisualizer } from './atomic-design-visualizer';

export const AtomicDesignSection = () => {
  const { t } = useTranslation('week3');

  return (
    <SectionCard
      badge={{ label: t('atomic.badge'), color: 'purple' }}
      title={t('atomic.title')}
      description={t('atomic.description')}
    >
      <div className="space-y-6">
        <AtomicDesignVisualizer />

        <InfoBox variant="blue" title={t('atomic.whatIs.title')}>
          <p className="text-sm text-gray-700">{t('atomic.whatIs.content')}</p>
        </InfoBox>

        <InfoBox variant="gray" title={t('atomic.fiveLevels.title')}>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li>
              <strong>{t('atomic.fiveLevels.atoms.label')}</strong>{' '}
              {t('atomic.fiveLevels.atoms.description')}
            </li>
            <li>
              <strong>{t('atomic.fiveLevels.molecules.label')}</strong>{' '}
              {t('atomic.fiveLevels.molecules.description')}
            </li>
            <li>
              <strong>{t('atomic.fiveLevels.organisms.label')}</strong>{' '}
              {t('atomic.fiveLevels.organisms.description')}
            </li>
            <li>
              <strong>{t('atomic.fiveLevels.templates.label')}</strong>{' '}
              {t('atomic.fiveLevels.templates.description')}
            </li>
            <li>
              <strong>{t('atomic.fiveLevels.pages.label')}</strong>{' '}
              {t('atomic.fiveLevels.pages.description')}
            </li>
          </ul>
        </InfoBox>
      </div>
    </SectionCard>
  );
};

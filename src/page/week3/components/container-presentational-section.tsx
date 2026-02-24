import { useTranslation } from 'react-i18next';
import { InfoBox, SectionCard } from '../../../components';
import { ContainerPresentationalVisualizer } from './container-presentational-visualizer';

export const ContainerPresentationalSection = () => {
  const { t } = useTranslation('week3');

  return (
    <SectionCard
      badge={{ label: t('container.badge'), color: 'indigo' }}
      title={t('container.title')}
      description={t('container.description')}
    >
      <div className="space-y-6">
        <ContainerPresentationalVisualizer />

        <InfoBox variant="gray" title={t('container.coreConcept.title')}>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <strong>{t('container.coreConcept.presentational.label')}</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>{t('container.coreConcept.presentational.item1')}</li>
                <li>{t('container.coreConcept.presentational.item2')}</li>
                <li>{t('container.coreConcept.presentational.item3')}</li>
                <li>{t('container.coreConcept.presentational.item4')}</li>
              </ul>
            </div>
            <div>
              <strong>{t('container.coreConcept.container.label')}</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>{t('container.coreConcept.container.item1')}</li>
                <li>{t('container.coreConcept.container.item2')}</li>
                <li>{t('container.coreConcept.container.item3')}</li>
              </ul>
            </div>
          </div>
        </InfoBox>

        <InfoBox
          variant="orange"
          title={t('container.evolutionWithHooks.title')}
        >
          <p className="text-sm text-gray-700">
            {t('container.evolutionWithHooks.content')}
          </p>
        </InfoBox>
      </div>
    </SectionCard>
  );
};

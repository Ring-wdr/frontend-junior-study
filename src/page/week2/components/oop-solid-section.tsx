import { useTranslation } from 'react-i18next';
import { InfoBox, SectionCard } from '../../../components';

export const OopSolidSection = () => {
  const { t } = useTranslation('week2');
  return (
    <SectionCard
      badge={{ label: t('oop.badge'), color: 'blue' }}
      title={t('oop.title')}
      description={t('oop.description')}
    >
      <div className="space-y-6">
        <InfoBox variant="gray" title={t('oop.coreConcepts.title')}>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>
              <strong>{t('oop.coreConcepts.encapsulation.label')}</strong>{' '}
              {t('oop.coreConcepts.encapsulation.description')}
            </li>
            <li>
              <strong>{t('oop.coreConcepts.inheritance.label')}</strong>{' '}
              {t('oop.coreConcepts.inheritance.description')}
            </li>
            <li>
              <strong>{t('oop.coreConcepts.polymorphism.label')}</strong>{' '}
              {t('oop.coreConcepts.polymorphism.description')}
            </li>
          </ul>
        </InfoBox>

        <InfoBox variant="gray" title={t('oop.solidPrinciples.title')}>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <strong className="text-blue-700">S</strong>
              {t('oop.solidPrinciples.single')}
            </li>
            <li>
              <strong className="text-blue-700">O</strong>
              {t('oop.solidPrinciples.open')}
            </li>
            <li>
              <strong className="text-blue-700">L</strong>
              {t('oop.solidPrinciples.liskov')}
            </li>
            <li>
              <strong className="text-blue-700">I</strong>
              {t('oop.solidPrinciples.interface')}
            </li>
            <li>
              <strong className="text-blue-700">D</strong>
              {t('oop.solidPrinciples.dependency')}
            </li>
          </ul>
        </InfoBox>
      </div>
    </SectionCard>
  );
};

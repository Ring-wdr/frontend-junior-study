import { useTranslation } from 'react-i18next';
import { SectionCard } from '../../../components';
import { ThisBindingDemo } from './this-binding-demo';

export const ThisBindingSection = () => {
  const { t } = useTranslation('week1');

  return (
    <SectionCard
      badge={{ label: t('thisBinding.badge'), color: 'purple' }}
      title={t('thisBinding.title')}
      description={t('thisBinding.description')}
      testId="this-binding-section"
    >
      <ThisBindingDemo />
    </SectionCard>
  );
};

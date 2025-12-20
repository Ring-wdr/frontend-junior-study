import { useTranslation } from 'react-i18next';
import { SectionCard } from '../../../components';
import { ClosureDemo } from './closure-demo';

export const ScopeClosureSection = () => {
  const { t } = useTranslation('week1');

  return (
    <SectionCard
      badge={{ label: t('scopeClosure.badge'), color: 'green' }}
      title={t('scopeClosure.title')}
      description={t('scopeClosure.description')}
      testId="scope-closure-section"
    >
      <ClosureDemo />
    </SectionCard>
  );
};

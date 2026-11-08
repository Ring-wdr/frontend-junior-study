'use client';

import { useTranslation } from '@/i18n/client';
import { SectionCard } from '../../../components';
import { ClosureDemo } from './closure-demo';

export const ScopeClosureSection = () => {
  const { t } = useTranslation('week1');

  return (
    <SectionCard
      badge={{ label: t('scopeClosure.badge'), color: 'green' }}
      description={t('scopeClosure.description')}
      testId="scope-closure-section"
    >
      <ClosureDemo />
    </SectionCard>
  );
};

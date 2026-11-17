'use client';

import { useTranslation } from '@/i18n/client';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { TextList } from './text-list';

const LAYER_CODE = `@layer reset, base, components, utilities;

@layer components {
  .card .title { color: black; } /* specificity 0,2,0 */
}

@layer utilities {
  .text-red { color: red; }      /* specificity 0,1,0, later layer: wins */
}

.title { color: green; }         /* unlayered: beats every layer */`;

export const CascadeSection = () => {
  const { t, raw } = useTranslation('week6');

  return (
    <SectionCard
      badge={{ label: t('cascade.badge'), color: 'blue' }}
      description={t('cascade.description')}
      testId="cascade-section"
    >
      <div className="space-y-8">
        <SubSection title={t('cascade.order.title')} icon iconColor="blue">
          <p className="mb-3 text-sm text-gray-700">
            {t('cascade.order.body')}
          </p>
          <TextList items={raw('cascade.order.items')} ordered />
        </SubSection>

        <SubSection title={t('cascade.layers.title')} icon iconColor="blue">
          <div className="space-y-3">
            <CodeBlock code={LAYER_CODE} language="css" className="text-xs" />
            <p className="text-sm text-gray-700">{t('cascade.layers.body')}</p>
          </div>
        </SubSection>

        <InfoBox variant="blue" title={t('cascade.why.title')}>
          {t('cascade.why.content')}
        </InfoBox>
      </div>
    </SectionCard>
  );
};

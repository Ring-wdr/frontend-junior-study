'use client';

import { useTranslation } from '@/i18n/client';
import { DemoBox, InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { ComparisonVisualizer } from './comparison-visualizer';

const APPROACH_CODE = [
  `const data = fetch('/api/data');
return process(data);`,
  `const data = await cache.get('/api/data');
return processAsync(data);`,
];

export const ComparisonSection = () => {
  const { t, raw } = useTranslation('weekN');
  const approaches = raw('comparison.approaches');

  return (
    <SectionCard
      badge={{ label: t('comparison.badge'), color: 'green' }}
      description={t('comparison.description')}
      testId="comparison-section"
    >
      <div className="space-y-8">
        <p className="text-sm text-gray-700">{t('comparison.intro')}</p>

        <SubSection title={t('comparison.demo.title')} icon iconColor="green">
          <DemoBox>
            <ComparisonVisualizer />
          </DemoBox>
        </SubSection>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {approaches.map((approach, index) => (
            <div key={approach.name} className="min-w-0 space-y-3">
              <h4 className="font-semibold text-gray-900">{approach.name}</h4>
              <p className="text-sm text-gray-700">{approach.summary}</p>
              <CodeBlock
                code={APPROACH_CODE[index]}
                language="ts"
                className="text-xs"
              />
            </div>
          ))}
        </div>

        <InfoBox variant="green" title={t('comparison.when.title')}>
          <ul className="list-disc space-y-1 pl-5">
            {approaches.map((approach) => (
              <li key={approach.name}>
                <strong>{approach.name}:</strong> {approach.when}
              </li>
            ))}
          </ul>
        </InfoBox>

        <InfoBox variant="orange" title={t('comparison.tradeoffs.title')}>
          {t('comparison.tradeoffs.body')}
        </InfoBox>
      </div>
    </SectionCard>
  );
};

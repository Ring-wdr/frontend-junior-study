'use client';

import { useTranslation } from '@/i18n/client';
import { DemoBox, InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { TopicVisualizer } from './topic-visualizer';

const TOPIC_CODE = `const instance = createTopic();
instance.setup();
instance.run();`;

export const BasicSection = () => {
  const { t, raw } = useTranslation('weekN');

  return (
    <SectionCard
      badge={{ label: t('basic.badge'), color: 'blue' }}
      description={t('basic.description')}
      testId="basic-section"
    >
      <div className="space-y-8">
        <p className="text-sm text-gray-700">{t('basic.intro')}</p>

        <SubSection title={t('basic.demo.title')} icon iconColor="blue">
          <DemoBox>
            <TopicVisualizer />
          </DemoBox>
        </SubSection>

        <InfoBox variant="blue" title={t('basic.keyPoints.title')}>
          <ul className="list-disc space-y-1 pl-5">
            {raw('basic.keyPoints.items').map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </InfoBox>

        <SubSection title={t('basic.code.title')} icon iconColor="purple">
          <CodeBlock code={TOPIC_CODE} language="ts" className="text-xs" />
        </SubSection>
      </div>
    </SectionCard>
  );
};

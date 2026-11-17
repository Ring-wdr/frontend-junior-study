'use client';

import { useTranslation } from '@/i18n/client';
import {
  ContentGrid,
  DemoBox,
  InfoBox,
  SectionCard,
  SubSection,
} from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { GenerationalGcDemo } from './generational-gc-demo';

const FINALIZATION_CODE = `const cache = new Map();
const registry = new FinalizationRegistry((key) => {
  cache.delete(key); // runs some time after the value was collected
});

function remember(key, value) {
  cache.set(key, new WeakRef(value));
  registry.register(value, key);
}

function recall(key) {
  return cache.get(key)?.deref(); // undefined once collected
}`;

const TRACE_GC_OUTPUT = `$ node --trace-gc app.js
[804]  19 ms: Scavenge 4.4 (5.1) -> 3.8 (6.1) MB, 1.81 / 0.00 ms  allocation failure;
[804]  21 ms: Scavenge 4.4 (6.1) -> 4.1 (6.6) MB, 0.76 / 0.00 ms  allocation failure;
[804]  25 ms: Scavenge 6.0 (8.6) -> 4.9 (8.9) MB, 1.16 / 0.00 ms  allocation failure;`;

export const MemoryGcSection = () => {
  const { t, raw } = useTranslation('week1');

  return (
    <SectionCard
      badge={{ label: t('memoryGc.badge'), color: 'pink' }}
      description={t('memoryGc.description')}
      testId="memory-gc-section"
    >
      <div className="space-y-8">
        <SubSection title={t('memoryGc.model.title')} icon iconColor="pink">
          <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
            {raw('memoryGc.model.points').map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </SubSection>

        <SubSection
          title={t('memoryGc.reachability.title')}
          icon
          iconColor="pink"
        >
          <p className="text-sm text-gray-700">
            {t('memoryGc.reachability.body')}
          </p>
        </SubSection>

        <SubSection
          title={t('memoryGc.generational.title')}
          icon
          iconColor="pink"
        >
          <p className="mb-4 text-sm text-gray-700">
            {t('memoryGc.generational.body')}
          </p>
          <DemoBox>
            <GenerationalGcDemo />
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('memoryGc.algorithms.title')}
          icon
          iconColor="pink"
        >
          <ContentGrid items={raw('memoryGc.algorithms.items')} />
        </SubSection>

        <SubSection title={t('memoryGc.leaks.title')} icon iconColor="pink">
          <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
            {raw('memoryGc.leaks.items').map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SubSection>

        <SubSection
          title={t('memoryGc.finalization.title')}
          icon
          iconColor="pink"
        >
          <div className="space-y-3 text-sm text-gray-700">
            <p>{t('memoryGc.finalization.body')}</p>
            <CodeBlock code={FINALIZATION_CODE} className="text-xs" />
            <InfoBox variant="orange">
              {t('memoryGc.finalization.warning')}
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title={t('memoryGc.practice.title')} icon iconColor="pink">
          <div className="space-y-3 text-sm text-gray-700">
            <CodeBlock
              code={TRACE_GC_OUTPUT}
              language="text"
              className="text-xs"
            />
            <p>{t('memoryGc.practice.note')}</p>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

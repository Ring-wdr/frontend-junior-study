'use client';

import { Trans, useTranslation } from '@/i18n/client';
import {
  ContentGrid,
  DemoBox,
  InfoBox,
  SectionCard,
  SubSection,
} from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { InlineCacheDemo } from './inline-cache-demo';
import { V8HiddenClassDemo } from './v8-hidden-class-demo';

const ELEMENTS_CODE = `const list = [1, 2, 3]; // PACKED_SMI_ELEMENTS
list.push(4.5);         // PACKED_DOUBLE_ELEMENTS
list.push('x');         // PACKED_ELEMENTS
list[9] = 1;            // HOLEY_ELEMENTS (holes at 5..8)

new Array(3);                       // HOLEY from the start
Array.from({ length: 3 }, () => 0); // PACKED`;

const PRACTICE_CODE = `const a = { x: 1, y: 2 };
const b = { x: 3, y: 4 };
const c = { y: 1, x: 2 };

%HaveSameMap(a, b); // true
%HaveSameMap(a, c); // false: same keys, different order

function Point(x, y) { this.x = x; this.y = y; }
const p = new Point(1, 2);
%HasFastProperties(p); // true
delete p.x;
%HasFastProperties(p); // false: dictionary mode

%DebugPrint(a); // prints the Map, its descriptors and transitions`;

export const OptimizationSection = () => {
  const { t, raw } = useTranslation('week1');

  return (
    <SectionCard
      badge={{ label: t('optimization.badge'), color: 'blue' }}
      description={t('optimization.description')}
      testId="optimization-section"
    >
      <div className="space-y-8">
        <SubSection
          title={t('optimization.shapes.title')}
          icon
          iconColor="blue"
        >
          <p className="mb-4 text-sm text-gray-700">
            {t('optimization.shapes.body')}
          </p>
          <DemoBox>
            <V8HiddenClassDemo />
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('optimization.inlineCache.title')}
          icon
          iconColor="blue"
        >
          <p className="mb-4 text-sm text-gray-700">
            {t('optimization.inlineCache.body')}
          </p>
          <DemoBox>
            <InlineCacheDemo />
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('optimization.storage.title')}
          icon
          iconColor="blue"
        >
          <ContentGrid items={raw('optimization.storage.items')} />
        </SubSection>

        <SubSection
          title={t('optimization.elements.title')}
          icon
          iconColor="blue"
        >
          <div className="space-y-3 text-sm text-gray-700">
            <p>{t('optimization.elements.body')}</p>
            <CodeBlock code={ELEMENTS_CODE} className="text-xs" />
            <p>{t('optimization.elements.numbers')}</p>
          </div>
        </SubSection>

        <SubSection
          title={t('optimization.practice.title')}
          icon
          iconColor="blue"
        >
          <div className="space-y-3 text-sm text-gray-700">
            <CodeBlock code={PRACTICE_CODE} className="text-xs" />
            <p>{t('optimization.practice.note')}</p>
          </div>
        </SubSection>

        <InfoBox variant="blue" title={t('optimization.keyTakeaway.title')}>
          <Trans t={t} i18nKey="optimization.keyTakeaway.content" />
        </InfoBox>
      </div>
    </SectionCard>
  );
};

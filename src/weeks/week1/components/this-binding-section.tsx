'use client';

import { useTranslation } from '@/i18n/client';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeTabs } from './code-tabs';
import { ThisBindingDemo } from './this-binding-demo';

const PITFALL_CODES = [
  `const user = {
  name: 'Kim',
  hi() { return this.name; },
};

const hi = user.hi;
hi();                   // TypeError in strict mode: this is undefined
setTimeout(user.hi, 0); // this is not user: only the function was passed

setTimeout(() => user.hi(), 0);    // OK: called as a method
setTimeout(user.hi.bind(user), 0); // OK: this is fixed`,
  `class Button {
  label = 'Save';
  handleA() { return this.label; } // on the prototype, depends on the call
  handleB = () => this.label;      // per instance, fixed lexically
}

const { handleA, handleB } = new Button();
handleA(); // TypeError: this is undefined (class bodies are strict)
handleB(); // 'Save'`,
  `function Point(x) { this.x = x; }

const Bound = Point.bind({ x: 'ignored' });
const point = new Bound(1);
point.x; // 1: new wins over bind

const arrow = () => this;
arrow.call({ a: 1 }); // still the outer this: call cannot rebind an arrow`,
];

export const ThisBindingSection = () => {
  const { t, raw } = useTranslation('week1');

  return (
    <SectionCard
      badge={{ label: t('thisBinding.badge'), color: 'purple' }}
      description={t('thisBinding.description')}
      testId="this-binding-section"
    >
      <div className="space-y-8">
        <ThisBindingDemo />

        <SubSection
          title={t('thisBinding.precedence.title')}
          icon
          iconColor="purple"
        >
          <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-700">
            {raw('thisBinding.precedence.items').map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <InfoBox variant="purple" className="mt-4">
            {t('thisBinding.precedence.arrowNote')}
          </InfoBox>
        </SubSection>

        <SubSection
          title={t('thisBinding.pitfalls.title')}
          icon
          iconColor="purple"
        >
          <CodeTabs
            items={raw('thisBinding.pitfalls.items')}
            codes={PITFALL_CODES}
            ariaLabel={t('thisBinding.pitfalls.ariaLabel')}
            testId="this-pitfalls"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};

'use client';

import { useTranslation } from '@/i18n/client';
import { DemoBox, InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { CodeTabs } from '../../../components/ui/code-tabs';
import { ClosureDemo } from './closure-demo';
import { EnvRecordVisualizer } from './env-record-visualizer';

const PITFALL_CODES = [
  `function createAccount() {
  let balance = 0;
  return {
    deposit: (amount) => { balance += amount; },
    getBalance: () => balance,
  };
}

const account = createAccount();
account.deposit(100);
account.getBalance(); // 100: both closures see the same binding`,
  `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i)); // 3 3 3
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j)); // 0 1 2
}`,
  `function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // always 0 + 1: the first render's count
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Fix: setCount((previous) => previous + 1);
  return <p>{count}</p>;
}`,
];

const LEAK_CODE = `function setup() {
  const big = new Array(1_000_000).fill('x');
  const useBig = () => big.length; // captures big
  return () => 'small';            // captures nothing, shares the Context
}

const keep = setup(); // big stays alive as long as keep does`;

export const ScopeClosureSection = () => {
  const { t, raw } = useTranslation('week1');

  return (
    <SectionCard
      badge={{ label: t('scopeClosure.badge'), color: 'green' }}
      description={t('scopeClosure.description')}
      testId="scope-closure-section"
    >
      <div className="space-y-8">
        <SubSection
          title={t('scopeClosure.mechanism.title')}
          icon
          iconColor="green"
        >
          <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-700">
            {raw('scopeClosure.mechanism.points').map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ol>
        </SubSection>

        <SubSection
          title={t('scopeClosure.visualizer.title')}
          icon
          iconColor="green"
        >
          <DemoBox>
            <EnvRecordVisualizer />
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('scopeClosure.practice.title')}
          icon
          iconColor="green"
        >
          <ClosureDemo />
        </SubSection>

        <SubSection
          title={t('scopeClosure.pitfalls.title')}
          icon
          iconColor="green"
        >
          <CodeTabs
            items={raw('scopeClosure.pitfalls.items')}
            codes={PITFALL_CODES}
            ariaLabel={t('scopeClosure.pitfalls.ariaLabel')}
            testId="closure-pitfalls"
            language="jsx"
          />
        </SubSection>

        <SubSection
          title={t('scopeClosure.engine.title')}
          icon
          iconColor="green"
        >
          <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
            {raw('scopeClosure.engine.points').map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <InfoBox
            variant="red"
            title={t('scopeClosure.engine.leakTitle')}
            className="mt-4"
          >
            <CodeBlock code={LEAK_CODE} className="mb-3 text-xs" />
            {t('scopeClosure.engine.leakBody')}
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};

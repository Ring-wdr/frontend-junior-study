import { useTranslation } from 'react-i18next';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { ModernStateVisualizer } from './modern-state-visualizer';

export const ModernStateSection = () => {
  const { t } = useTranslation('week4');

  return (
    <SectionCard
      badge={{ label: t('modern.badge'), color: 'purple' }}
      title={t('modern.title')}
      description={t('modern.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('modern.evolution.title')} icon iconColor="purple">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('modern.evolution.description')}
            </p>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <ModernStateVisualizer />
            </div>

            <InfoBox variant="blue" title={t('modern.evolution.commonGoals.title')}>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>{t('modern.evolution.commonGoals.reduceBoilerplate')}</li>
                <li>{t('modern.evolution.commonGoals.betterIntegration')}</li>
                <li>{t('modern.evolution.commonGoals.improvedDX')}</li>
                <li>{t('modern.evolution.commonGoals.smallerBundle')}</li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title={t('modern.mobx.title')} icon iconColor="orange">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('modern.mobx.description')}
            </p>

            <InfoBox variant="orange" title={t('modern.mobx.philosophy.title')}>
              <p className="text-sm text-gray-700 mb-2">
                {t('modern.mobx.philosophy.quote')}
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>{t('modern.mobx.philosophy.observableState')}</li>
                <li>{t('modern.mobx.philosophy.computedValues')}</li>
                <li>{t('modern.mobx.philosophy.reactions')}</li>
              </ul>
            </InfoBox>

            <CodeBlock
              code={`import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';

// State definition with MobX
class CounterStore {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment() {
    this.count++;
  }

  get doubled() {
    return this.count * 2;
  }
}

// React component with observer
const Counter = observer(({ store }) => (
  <div>
    <p>Count: {store.count}</p>
    <p>Doubled: {store.doubled}</p>
    <button onClick={() => store.increment()}>Increment</button>
  </div>
));`}
              className="text-xs"
            />

            <InfoBox variant="gray" title={t('modern.mobx.prosAndCons.title')}>
              <div className="space-y-2 text-sm text-gray-700">
                <p>{t('modern.mobx.prosAndCons.pros')}</p>
                <p>{t('modern.mobx.prosAndCons.cons')}</p>
              </div>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title={t('modern.recoil.title')} icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('modern.recoil.description')}
            </p>

            <InfoBox variant="blue" title={t('modern.recoil.coreConcepts.title')}>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>{t('modern.recoil.coreConcepts.atoms')}</li>
                <li>{t('modern.recoil.coreConcepts.selectors')}</li>
                <li>{t('modern.recoil.coreConcepts.hooksFirst')}</li>
              </ul>
            </InfoBox>

            <CodeBlock
              code={`import { atom, selector, useRecoilState } from 'recoil';

// Define atoms
const countAtom = atom({
  key: 'count',
  default: 0,
});

// Define selectors (derived state)
const doubledSelector = selector({
  key: 'doubled',
  get: ({ get }) => {
    const count = get(countAtom);
    return count * 2;
  },
});

// Use in components
function Counter() {
  const [count, setCount] = useRecoilState(countAtom);
  const doubled = useRecoilValue(doubledSelector);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Doubled: {doubled}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`}
              className="text-xs"
            />

            <InfoBox variant="gray" title={t('modern.recoil.prosAndCons.title')}>
              <div className="space-y-2 text-sm text-gray-700">
                <p>{t('modern.recoil.prosAndCons.pros')}</p>
                <p>{t('modern.recoil.prosAndCons.cons')}</p>
              </div>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title={t('modern.zustand.title')} icon iconColor="green">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('modern.zustand.description')}
            </p>

            <InfoBox variant="green" title={t('modern.zustand.why.title')}>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>{t('modern.zustand.why.minimal')}</li>
                <li>{t('modern.zustand.why.noProvider')}</li>
                <li>{t('modern.zustand.why.hookBased')}</li>
                <li>{t('modern.zustand.why.small')}</li>
                <li>{t('modern.zustand.why.typescript')}</li>
              </ul>
            </InfoBox>

            <CodeBlock
              code={`import create from 'zustand';

// Create a store
const useCounterStore = create((set, get) => ({
  count: 0,

  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),

  // Derived state
  get doubled() {
    return get().count * 2;
  },
}));

// Use in components (no Provider needed!)
function Counter() {
  const count = useCounterStore((state) => state.count);
  const doubled = useCounterStore((state) => state.doubled);
  const increment = useCounterStore((state) => state.increment);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Doubled: {doubled}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}`}
              className="text-xs"
            />

            <InfoBox variant="gray" title={t('modern.zustand.prosAndCons.title')}>
              <div className="space-y-2 text-sm text-gray-700">
                <p>{t('modern.zustand.prosAndCons.pros')}</p>
                <p>{t('modern.zustand.prosAndCons.cons')}</p>
              </div>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title={t('modern.comparison.title')} icon iconColor="blue">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left p-2 font-semibold">{t('modern.comparison.table.feature')}</th>
                    <th className="text-left p-2 font-semibold">{t('modern.comparison.table.redux')}</th>
                    <th className="text-left p-2 font-semibold">{t('modern.comparison.table.mobx')}</th>
                    <th className="text-left p-2 font-semibold">{t('modern.comparison.table.recoil')}</th>
                    <th className="text-left p-2 font-semibold">{t('modern.comparison.table.zustand')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 font-medium">{t('modern.comparison.table.learningCurve')}</td>
                    <td className="p-2">{t('modern.comparison.table.steep')}</td>
                    <td className="p-2">{t('modern.comparison.table.moderate')}</td>
                    <td className="p-2">{t('modern.comparison.table.moderate')}</td>
                    <td className="p-2">{t('modern.comparison.table.easy')}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 font-medium">{t('modern.comparison.table.boilerplate')}</td>
                    <td className="p-2">{t('modern.comparison.table.high')}</td>
                    <td className="p-2">{t('modern.comparison.table.low')}</td>
                    <td className="p-2">{t('modern.comparison.table.low')}</td>
                    <td className="p-2">{t('modern.comparison.table.minimal')}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 font-medium">{t('modern.comparison.table.bundleSize')}</td>
                    <td className="p-2">{t('modern.comparison.table.large')}</td>
                    <td className="p-2">{t('modern.comparison.table.medium')}</td>
                    <td className="p-2">{t('modern.comparison.table.medium')}</td>
                    <td className="p-2">{t('modern.comparison.table.small')}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 font-medium">{t('modern.comparison.table.devtools')}</td>
                    <td className="p-2">{t('modern.comparison.table.excellent')}</td>
                    <td className="p-2">{t('modern.comparison.table.good')}</td>
                    <td className="p-2">{t('modern.comparison.table.good')}</td>
                    <td className="p-2">{t('modern.comparison.table.decent')}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">{t('modern.comparison.table.bestFor')}</td>
                    <td className="p-2">{t('modern.comparison.table.largeApps')}</td>
                    <td className="p-2">{t('modern.comparison.table.reactiveApps')}</td>
                    <td className="p-2">{t('modern.comparison.table.reactNative')}</td>
                    <td className="p-2">{t('modern.comparison.table.simpleApps')}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox variant="gray" title={t('modern.comparison.selectionGuide.title')}>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>{t('modern.comparison.selectionGuide.redux')}</li>
                <li>{t('modern.comparison.selectionGuide.mobx')}</li>
                <li>{t('modern.comparison.selectionGuide.recoil')}</li>
                <li>{t('modern.comparison.selectionGuide.zustand')}</li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

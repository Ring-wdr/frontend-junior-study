import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { ModernStateVisualizer } from './modern-state-visualizer';

export const ModernStateSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Modern Libraries', color: 'purple' }}
      title="Modern State Management"
      description="Exploring lighter, more reactive alternatives to Redux: MobX, Recoil, and Zustand."
    >
      <div className="space-y-8">
        <SubSection title="Evolution Beyond Redux" icon iconColor="purple">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              While Redux is powerful and predictable, its heavy boilerplate and
              strict patterns led to the rise of alternatives focusing on
              <strong> developer experience</strong>, <strong>less code</strong>
              , and <strong>better React integration</strong>. These libraries
              offer different philosophies and approaches to state management.
            </p>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <ModernStateVisualizer />
            </div>

            <InfoBox variant="blue" title="Common Goals">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>Reduce boilerplate compared to Redux</li>
                <li>Better React integration and hooks support</li>
                <li>Improved developer experience</li>
                <li>Smaller bundle size</li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="MobX" icon iconColor="orange">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              MobX uses <strong>Observable state</strong> and decorators to
              create reactive, automatically updating components. It embraces
              mutable state rather than immutability.
            </p>

            <InfoBox variant="orange" title="Philosophy">
              <p className="text-sm text-gray-700 mb-2">
                "Anything that can be derived from the application state, should
                be derived automatically."
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>
                  <strong>Observable State:</strong> Reactive, mutable data
                </li>
                <li>
                  <strong>Computed Values:</strong> Automatically update when
                  state changes
                </li>
                <li>
                  <strong>Reactions:</strong> Side effects that respond to state
                  changes
                </li>
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

            <InfoBox variant="gray" title="Pros & Cons">
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>✓ Pros:</strong> Very intuitive, automatic reactivity,
                  minimal boilerplate
                </p>
                <p>
                  <strong>✗ Cons:</strong> Mutable state can be confusing for
                  Redux developers, decorators require Babel setup
                </p>
              </div>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="Recoil" icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Created by Facebook, Recoil brings a more{' '}
              <strong>React-native</strong> approach to state management using
              Atoms and Selectors. Designed for Concurrent Mode compatibility.
            </p>

            <InfoBox variant="blue" title="Core Concepts">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Atoms:</strong> Reusable units of state that can be
                  subscribed to
                </li>
                <li>
                  <strong>Selectors:</strong> Pure functions that derive state
                  from atoms
                </li>
                <li>
                  <strong>Hooks-first:</strong> Uses React hooks for everything
                </li>
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

            <InfoBox variant="gray" title="Pros & Cons">
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>✓ Pros:</strong> Very React-friendly, Concurrent Mode
                  ready, clean API
                </p>
                <p>
                  <strong>✗ Cons:</strong> Still in experimental phase, API may
                  change
                </p>
              </div>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="Zustand" icon iconColor="green">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              A lightweight, simple state management solution that uses a
              hook-based API. <strong>No Provider required</strong>, making it
              extremely straightforward to set up and use.
            </p>

            <InfoBox variant="green" title="Why Zustand?">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>Minimal boilerplate</li>
                <li>No Provider Hell</li>
                <li>Hook-based API (familiar to React developers)</li>
                <li>Small bundle size (~1KB)</li>
                <li>TypeScript support built-in</li>
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

            <InfoBox variant="gray" title="Pros & Cons">
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>✓ Pros:</strong> Simplest API, no Provider, great for
                  small to medium apps
                </p>
                <p>
                  <strong>✗ Cons:</strong> Fewer features than Redux/Recoil for
                  very complex state
                </p>
              </div>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="Comparison Guide" icon iconColor="blue">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left p-2 font-semibold">Feature</th>
                    <th className="text-left p-2 font-semibold">Redux</th>
                    <th className="text-left p-2 font-semibold">MobX</th>
                    <th className="text-left p-2 font-semibold">Recoil</th>
                    <th className="text-left p-2 font-semibold">Zustand</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 font-medium">Learning Curve</td>
                    <td className="p-2">Steep</td>
                    <td className="p-2">Moderate</td>
                    <td className="p-2">Moderate</td>
                    <td className="p-2">Easy</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 font-medium">Boilerplate</td>
                    <td className="p-2">High</td>
                    <td className="p-2">Low</td>
                    <td className="p-2">Low</td>
                    <td className="p-2">Minimal</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 font-medium">Bundle Size</td>
                    <td className="p-2">Large</td>
                    <td className="p-2">Medium</td>
                    <td className="p-2">Medium</td>
                    <td className="p-2">Small (~1KB)</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 font-medium">DevTools</td>
                    <td className="p-2">Excellent</td>
                    <td className="p-2">Good</td>
                    <td className="p-2">Good</td>
                    <td className="p-2">Decent</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Best For</td>
                    <td className="p-2">Large apps</td>
                    <td className="p-2">Reactive apps</td>
                    <td className="p-2">React-native</td>
                    <td className="p-2">Simple apps</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox variant="gray" title="Selection Guide">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Redux:</strong> Large apps needing excellent devtools
                  and middleware
                </li>
                <li>
                  <strong>MobX:</strong> Apps needing automatic reactivity and
                  mutable patterns
                </li>
                <li>
                  <strong>Recoil:</strong> React-concurrent-mode-ready apps with
                  granular state
                </li>
                <li>
                  <strong>Zustand:</strong> Simple to medium apps prioritizing
                  simplicity
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

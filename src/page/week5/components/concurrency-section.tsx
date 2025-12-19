import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { ConcurrencyVisualizer } from './concurrency-visualizer';

export const ConcurrencySection = () => {
  return (
    <SectionCard
      badge={{ label: 'React 18', color: 'blue' }}
      title="React 18 Concurrency"
      description="Understanding Concurrent Rendering, Automatic Batching, and Transitions."
    >
      <div className="space-y-8">
        <SubSection title="What is Concurrent Rendering?" icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              React 18 introduces <strong>Concurrent Rendering</strong>, the
              ability for React to interrupt a rendering task, handle a
              higher-priority event, and then resume rendering. This foundation
              enables features like <strong>Transitions</strong>,{' '}
              <strong>Suspense for data fetching</strong>, and better{' '}
              <strong>Server-Side Rendering</strong>.
            </p>

            <InfoBox variant="blue" title="Why Concurrency Matters">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Responsiveness:</strong> User input like typing is
                  never blocked by background rendering
                </li>
                <li>
                  <strong>Interruptible:</strong> React can pause rendering and
                  prioritize user events
                </li>
                <li>
                  <strong>Seamless UX:</strong> Apps feel smoother without janky
                  frames
                </li>
              </ul>
            </InfoBox>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700">
                <strong>Before React 18:</strong> Rendering was an
                all-or-nothing operation. Once React started rendering, it
                couldn't stop until the entire render was complete, blocking
                user input.
              </p>
              <p className="text-sm text-gray-700 mt-2">
                <strong>React 18:</strong> Rendering is interruptible. React can
                pause rendering to handle higher-priority updates (like user
                input) and resume later.
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection title="useTransition & Transitions" icon iconColor="purple">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <strong>Transitions</strong> let you mark state updates as
              non-urgent. React will prioritize urgent updates (like user input)
              while processing transitions in the background. Use the{' '}
              <code>useTransition</code> hook to implement this pattern.
            </p>

            <InfoBox variant="purple" title="useTransition API">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>isPending:</strong> Boolean indicating if a transition
                  is in progress
                </li>
                <li>
                  <strong>startTransition:</strong> Function to wrap state
                  updates as non-urgent transitions
                </li>
              </ul>
            </InfoBox>

            <CodeBlock
              code={`import { useTransition, useState } from 'react';

export function SearchUsers() {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;

    // Urgent: Update input immediately for responsiveness
    setInput(value);

    // Non-urgent: Filter large list in background
    startTransition(() => {
      const filtered = largeUserList.filter(user =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    });
  };

  return (
    <div>
      <input
        value={input}
        onChange={handleChange}
        placeholder="Search users..."
      />

      {isPending && <p>Searching...</p>}

      <ul>
        {results.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}`}
              className="text-xs"
            />

            <InfoBox variant="gray" title="Real-World Example">
              <p className="text-sm text-gray-700">
                When filtering a list of 10,000+ items: typing in the input
                (urgent) updates instantly, while the filtered results render in
                the background (transition). Users see the input respond
                immediately without janky UI.
              </p>
            </InfoBox>
          </div>
        </SubSection>

        <ConcurrencyVisualizer />

        <SubSection title="useDeferredValue" icon iconColor="purple">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <code>useDeferredValue</code> lets you defer re-rendering of a
              non-urgent part of the tree. It defers a value you pass to it and
              returns the deferred version.
            </p>

            <InfoBox variant="purple" title="When to Use useDeferredValue">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>You have an expensive component that depends on a value</li>
                <li>You want to prioritize the value itself updating</li>
                <li>
                  You can't wrap the update in a transition (like in event
                  handlers)
                </li>
              </ul>
            </InfoBox>

            <CodeBlock
              code={`import { useDeferredValue, useState } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  return (
    <>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />

      {/* Results component with expensive rendering */}
      <ExpensiveResultsList query={deferredQuery} />
    </>
  );
}

// The input updates immediately (query),
// while the results update with deferred value (deferredQuery)`}
              className="text-xs"
            />

            <InfoBox variant="gray" title="useTransition vs useDeferredValue">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>
                  <strong>useTransition:</strong> Wrap setState, you control
                  when updates happen
                </li>
                <li>
                  <strong>useDeferredValue:</strong> Defer a value, React
                  automatically defers it
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="Automatic Batching" icon iconColor="green">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              React 18 automatically <strong>batches</strong> state updates that
              happen within event handlers, promises, and timers. This means
              multiple setState calls result in a single re-render instead of
              multiple re-renders.
            </p>

            <CodeBlock
              code={`// React 17: 2 re-renders
function handleClick() {
  setCount(c => c + 1);  // Re-render 1
  setFlag(f => !f);       // Re-render 2
}

// React 18: 1 re-render (Batched!)
function handleClick() {
  setCount(c => c + 1);  // Batched
  setFlag(f => !f);       // Batched - single re-render
}

// Also works in promises and timers
Promise.resolve().then(() => {
  setCount(c => c + 1);  // Batched
  setFlag(f => !f);       // Batched - single re-render
});

setTimeout(() => {
  setCount(c => c + 1);  // Batched
  setFlag(f => !f);       // Batched - single re-render
}, 1000);`}
              className="text-xs"
            />

            <InfoBox variant="green" title="Performance Benefits">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>Fewer re-renders = better performance</li>
                <li>Automatic - no code changes needed</li>
                <li>Applies to promises, timers, and native events</li>
                <li>
                  Use <code>flushSync</code> if you need synchronous updates
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="Other React 18 Features" icon iconColor="orange">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <InfoBox variant="blue" title="useId">
                <p className="text-sm text-gray-700 mb-2">
                  Generates stable unique IDs on both client and server.
                  Essential for accessibility and hydration mismatches.
                </p>
                <CodeBlock
                  code={`const id = useId();
return <label htmlFor={id}>Name</label>;`}
                  className="text-xs"
                />
              </InfoBox>

              <InfoBox variant="purple" title="Suspense for Data Fetching">
                <p className="text-sm text-gray-700 mb-2">
                  React 18 extends Suspense to work with promises and data
                  fetching. Enable async rendering on the server.
                </p>
              </InfoBox>

              <InfoBox variant="green" title="Streaming HTML">
                <p className="text-sm text-gray-700 mb-2">
                  Server can stream HTML chunks as they are generated, enabling
                  faster First Contentful Paint (FCP).
                </p>
              </InfoBox>
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

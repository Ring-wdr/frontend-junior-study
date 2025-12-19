import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const ConcurrencySection = () => {
  return (
    <SectionCard
      badge={{ label: 'React 18', color: 'blue' }}
      title="React 18 Concurrency"
      description="Understanding Concurrent Rendering, Automatic Batching, and Transitions."
    >
      <div className="space-y-8">
        <SubSection title="Concurrent Rendering" icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              React 18 introduces <strong>Concurrent Rendering</strong>. It
              allows React to interrupt a rendering task to handle
              higher-priority events (like user input) and then resume the
              rendering. This greatly improves responsiveness.
            </p>
            <InfoBox variant="blue" title="Key Features">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Interruptible Rendering:</strong> React can pause and
                  resume rendering work.
                </li>
                <li>
                  <strong>Transitions:</strong> Mark updates as non-urgent
                  transitions.
                </li>
                <li>
                  <strong>Streaming Server Rendering:</strong> Send HTML in
                  chunks as they are generated.
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="useTransition Hook" icon iconColor="purple">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <code>useTransition</code> allows you to mark state updates as
              "transitions" (non-urgent). React will prioritize urgent updates
              (like typing) over transitions (like rendering a large list).
            </p>
            <CodeBlock
              code={`const [isPending, startTransition] = useTransition();
const [input, setInput] = useState('');
const [list, setList] = useState([]);

const handleChange = (e) => {
  // Urgent: Update input field immediately
  setInput(e.target.value);

  // Transition: Filter list in background
  startTransition(() => {
    setList(largeList.filter(item => item.includes(e.target.value)));
  });
};

return (
  <div>
    <input value={input} onChange={handleChange} />
    {isPending ? 'Loading...' : <List items={list} />}
  </div>
);`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title="Automatic Batching" icon iconColor="green">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              React 18 automatically batches state updates that happen inside
              promises, setTimeouts, native event handlers, etc., resulting in
              fewer re-renders.
            </p>
            <CodeBlock
              code={`// Before React 18: 2 re-renders
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
}, 1000);

// React 18: 1 re-render (Batched!)
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
}, 1000);`}
              className="text-xs"
            />
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

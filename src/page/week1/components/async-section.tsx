import { ContentGrid, SectionCard, SectionDivider } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { AbortControllerDemo } from './abort-controller-demo';
import { PromiseVisualizer } from './promise-visualizer';

export const AsyncSection = () => (
  <SectionCard
    badge={{ label: 'Async', color: 'orange' }}
    title="Promise Visualizer"
    description="Interactively explore how different Promise combinators handle multiple asynchronous tasks."
    testId="async-section"
  >
    <PromiseVisualizer />

    <SectionDivider variant="line" className="my-6 border-t border-gray-100" />

    <ContentGrid
      columns={2}
      items={[
        {
          title: 'Promise.all',
          description: 'Wait for all to fulfill. Rejects immediately if any rejects.',
        },
        {
          title: 'Promise.allSettled',
          description: 'Wait for all to finish, regardless of status. Never rejects.',
        },
        {
          title: 'Promise.race',
          description: 'First settled promise (resolve OR reject) determines the result.',
        },
        {
          title: 'Promise.any',
          description: 'Wait for first fulfilled. Rejects only if ALL reject.',
        },
      ]}
    />

    <div className="mt-8">
      <h4 className="font-bold text-gray-900 mb-3">Promise.withResolvers (ES2024)</h4>
      <p className="text-sm text-gray-600 mb-3">
        Returns an object with a new Promise and its resolve/reject functions. Useful
        for creating promises that are resolved externally.
      </p>
      <CodeBlock
        code={`const { promise, resolve, reject } = Promise.withResolvers();

// Resolve from outside
setTimeout(() => resolve('Done!'), 1000);

promise.then(console.log); // 'Done!' after 1s`}
      />
    </div>

    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h4 className="font-bold text-gray-900 text-sm mb-2">Promise.resolve</h4>
        <p className="text-xs text-gray-500 mb-2">
          Creates an immediately fulfilled promise.
        </p>
        <CodeBlock
          code={`Promise.resolve(42)
  .then(x => x * 2)
  .then(console.log); // 84`}
        />
      </div>
      <div>
        <h4 className="font-bold text-gray-900 text-sm mb-2">Promise.reject</h4>
        <p className="text-xs text-gray-500 mb-2">Creates an immediately rejected promise.</p>
        <CodeBlock
          code={`Promise.reject('Error!')
  .catch(console.error);
// 'Error!'`}
        />
      </div>
    </div>

    <SectionDivider variant="line" className="my-8 border-t border-gray-100" />

    <div>
      <h4 className="font-bold text-gray-900 mb-3 text-red-600">
        AbortController (Cancel Async Tasks)
      </h4>
      <p className="text-sm text-gray-600 mb-6">
        Fetch requests (and other async tasks) can be cancelled using{' '}
        <code>AbortController</code>.
      </p>
      <AbortControllerDemo />
    </div>
  </SectionCard>
);

import { Badge } from '../../../components/ui/badge';
import { Card } from '../../../components/ui/card';
import { CodeBlock } from '../../../components/ui/code-block';
import { PromiseVisualizer } from './promise-visualizer';

export const AsyncSection = () => (
  <Card className="p-6">
    <div className="flex justify-between items-start mb-6 text-left">
      <div>
        <Badge color="orange">Async</Badge>
        <h3 className="text-xl font-bold mt-2 text-gray-900">
          Promise Visualizer
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          Interactively explore how different Promise combinators handle
          multiple asynchronous tasks.
        </p>
      </div>
    </div>

    <PromiseVisualizer />

    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-left border-t border-gray-100 pt-6">
      <div className="p-3">
        <h4 className="font-bold text-gray-900 text-sm mb-1">Promise.all</h4>
        <p className="text-xs text-gray-500">
          Wait for all to fulfill. Rejects immediately if any rejects.
        </p>
      </div>
      <div className="p-3">
        <h4 className="font-bold text-gray-900 text-sm mb-1">
          Promise.allSettled
        </h4>
        <p className="text-xs text-gray-500">
          Wait for all to finish, regardless of status. Never rejects.
        </p>
      </div>
      <div className="p-3">
        <h4 className="font-bold text-gray-900 text-sm mb-1">Promise.race</h4>
        <p className="text-xs text-gray-500">
          First settled promise (resolve OR reject) determines the result.
        </p>
      </div>
      <div className="p-3">
        <h4 className="font-bold text-gray-900 text-sm mb-1">Promise.any</h4>
        <p className="text-xs text-gray-500">
          Wait for first fulfilled. Rejects only if ALL reject.
        </p>
      </div>
    </div>

    <div className="mt-8 border-t border-gray-100 pt-6">
      <h4 className="font-bold text-gray-900 mb-3">
        Promise.withResolvers (ES2024)
      </h4>
      <p className="text-sm text-gray-600 mb-3">
        Returns an object with a new Promise and its resolve/reject functions.
        Useful for creating promises that are resolved externally.
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
        <h4 className="font-bold text-gray-900 text-sm mb-2">
          Promise.resolve
        </h4>
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
        <p className="text-xs text-gray-500 mb-2">
          Creates an immediately rejected promise.
        </p>
        <CodeBlock
          code={`Promise.reject('Error!')
  .catch(console.error);
// 'Error!'`}
        />
      </div>
    </div>
  </Card>
);

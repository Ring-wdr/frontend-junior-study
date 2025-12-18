import { Badge } from '../../../components/ui/badge';
import { Card } from '../../../components/ui/card';
import { CodeBlock } from '../../../components/ui/code-block';

export const EventLoopSection = () => (
  <Card className="p-6">
    <div className="flex justify-between items-start mb-4 text-left">
      <div>
        <Badge color="blue">Runtime</Badge>
        <h3 className="text-xl font-bold mt-2 text-gray-900">
          Event Loop & Concurrency
        </h3>
      </div>
    </div>
    <p className="text-gray-600 mb-4 text-left">
      JavaScript gets its single-threaded non-blocking nature from the Event
      Loop. It processes the <strong>Call Stack</strong>,{' '}
      <strong>Task Queue</strong> (Macrotasks), and{' '}
      <strong>Microtask Queue</strong> (Promises).
    </p>
    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-left">
      <h4 className="font-semibold text-blue-900 mb-2">Key Rule</h4>
      <p className="text-sm text-blue-800">
        Microtasks (Promises, queueMicrotask) calls are processed{' '}
        <em>immediately</em> after the current script and before any new
        Macrotask (setTimeout, I/O).
      </p>
    </div>
    <CodeBlock
      code={`console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('End');

// Output:
// Start
// End
// Promise
// Timeout`}
    />
  </Card>
);

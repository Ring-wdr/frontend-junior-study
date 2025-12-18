import { Badge } from '../../../components/ui/badge';
import { Card } from '../../../components/ui/card';
import { EventLoopVisualizer } from './event-loop-visualizer';

export const EventLoopSection = () => (
  <Card className="p-6" data-testid="event-loop-section">
    <div className="flex justify-between items-start mb-4 text-left">
      <div>
        <Badge color="blue">Runtime</Badge>
        <h3 className="text-xl font-bold mt-2 text-gray-900">
          Event Loop Visualizer
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          Step through the Event Loop to understand how JavaScript handles async
          code.
        </p>
      </div>
    </div>

    <EventLoopVisualizer />

    <div className="mt-8 bg-blue-50 p-4 rounded-xl border border-blue-100 text-left">
      <h4 className="font-semibold text-blue-900 mb-2">Key Rule</h4>
      <p className="text-sm text-blue-800">
        Microtasks (Promises, queueMicrotask) are processed <em>immediately</em>{' '}
        after the current script and before any new Macrotask (setTimeout, I/O).
      </p>
    </div>
  </Card>
);

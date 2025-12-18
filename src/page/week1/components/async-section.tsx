import { Badge } from '../../../components/ui/badge';
import { Card } from '../../../components/ui/card';
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
  </Card>
);

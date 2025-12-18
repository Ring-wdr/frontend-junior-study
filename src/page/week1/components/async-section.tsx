import { Badge } from '../../../components/ui/badge';
import { Card } from '../../../components/ui/card';

export const AsyncSection = () => (
  <Card className="p-6">
    <div className="flex justify-between items-start mb-4 text-left">
      <div>
        <Badge color="orange">Async</Badge>
        <h3 className="text-xl font-bold mt-2 text-gray-900">
          Promise & Async/Await
        </h3>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
      <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
        <h4 className="font-bold text-orange-900 mb-1">Promise.all</h4>
        <p className="text-xs text-orange-800">Fails if ANY element fails.</p>
      </div>
      <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
        <h4 className="font-bold text-orange-900 mb-1">Promise.allSettled</h4>
        <p className="text-xs text-orange-800">
          Waits for ALL to finish, regardless of status.
        </p>
      </div>
      <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
        <h4 className="font-bold text-orange-900 mb-1">Promise.race</h4>
        <p className="text-xs text-orange-800">
          First settled (resolve OR reject) wins.
        </p>
      </div>
      <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
        <h4 className="font-bold text-orange-900 mb-1">Promise.any</h4>
        <p className="text-xs text-orange-800">First FULFILLED wins.</p>
      </div>
    </div>
  </Card>
);

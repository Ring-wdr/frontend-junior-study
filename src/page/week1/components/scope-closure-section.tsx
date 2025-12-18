import { Badge } from '../../../components/ui/badge';
import { Card } from '../../../components/ui/card';
import { ClosureDemo } from './closure-demo';

export const ScopeClosureSection = () => (
  <Card className="p-6" data-testid="scope-closure-section">
    <div className="flex justify-between items-start mb-4 text-left">
      <div>
        <Badge color="green">Scope</Badge>
        <h3 className="text-xl font-bold mt-2 text-gray-900">Closures</h3>
        <p className="text-gray-500 text-sm mt-1">
          Create multiple counters to see how closures maintain independent
          state.
        </p>
      </div>
    </div>

    <ClosureDemo />
  </Card>
);

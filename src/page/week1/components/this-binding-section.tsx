import { Badge } from '../../../components/ui/badge';
import { Card } from '../../../components/ui/card';
import { ThisBindingDemo } from './this-binding-demo';

export const ThisBindingSection = () => (
  <Card className="p-6">
    <div className="flex justify-between items-start mb-4 text-left">
      <div>
        <Badge color="purple">Core</Badge>
        <h3 className="text-xl font-bold mt-2 text-gray-900">
          5 Rules of 'this'
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          Explore how 'this' binding works in different contexts.
        </p>
      </div>
    </div>

    <ThisBindingDemo />
  </Card>
);

import { Badge } from '../../../components/ui/badge';
import { Card } from '../../../components/ui/card';
import { V8HiddenClassDemo } from './v8-hidden-class-demo';

export const OptimizationSection = () => (
  <Card className="p-6">
    <div className="flex justify-between items-start mb-4 text-left">
      <div>
        <Badge color="blue">Advanced</Badge>
        <h3 className="text-xl font-bold mt-2 text-gray-900">
          V8 Hidden Classes
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          Visualize how V8 optimizes objects with consistent shapes.
        </p>
      </div>
    </div>

    <V8HiddenClassDemo />

    <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-100 text-left">
      <h4 className="font-semibold text-blue-900 mb-2">Key Takeaway</h4>
      <p className="text-sm text-blue-800">
        Always initialize properties in the <strong>exact same order</strong> to
        help V8 share hidden classes and optimize property access
        (Monomorphism).
      </p>
    </div>
  </Card>
);

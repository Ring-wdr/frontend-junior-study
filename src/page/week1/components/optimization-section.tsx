import { Badge } from '../../../components/ui/badge';
import { Card } from '../../../components/ui/card';
import { CodeBlock } from '../../../components/ui/code-block';

export const OptimizationSection = () => (
  <Card className="p-6">
    <div className="flex justify-between items-start mb-4 text-left">
      <div>
        <Badge color="blue">Advanced</Badge>
        <h3 className="text-xl font-bold mt-2 text-gray-900">
          V8 Hidden Classes
        </h3>
      </div>
    </div>
    <p className="text-gray-600 mb-4 text-left">
      V8 optimizes object property access by creating "Hidden Classes" (Shapes).
      <strong>Always initialize properties in the exact same order</strong> to
      help the engine share these hidden classes (Monomorphism).
    </p>
    <CodeBlock
      code={`// Good (Same Shape)
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// Bad (Different Shapes)
const p1 = { x: 1 };
p1.y = 2; // Shape transition`}
    />
  </Card>
);

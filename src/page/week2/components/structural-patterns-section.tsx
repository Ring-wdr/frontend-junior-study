import { Badge } from '../../../components/ui/badge';
import { Card } from '../../../components/ui/card';
import { CodeBlock } from '../../../components/ui/code-block';

export const StructuralPatternsSection = () => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
            Design Patterns
          </Badge>
          <h3 className="text-xl font-bold mt-2 text-gray-900">
            Structural Patterns
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Patterns concerned with how classes and objects are composed to form
            larger structures.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Decorator</h4>
          <p className="text-sm text-gray-700 mb-2">
            Attaches additional responsibilities to an object dynamically.
            Flexible alternative to subclassing.
          </p>
          <CodeBlock
            code={`function readonly(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

class Example {
  @readonly
  name = "Fixed";
}`}
            className="text-xs"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">Adapter</h4>
            <p className="text-sm text-gray-700">
              Allows objects with incompatible interfaces to collaborate. Acts
              as a bridge between two interfaces.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">Proxy</h4>
            <p className="text-sm text-gray-700">
              A placeholder for another object to control access, often used for
              lazy initialization, logging, or access control.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">Facade</h4>
            <p className="text-sm text-gray-700">
              Provides a simplified interface to a library, a framework, or any
              other complex set of classes.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">Bridge</h4>
            <p className="text-sm text-gray-700">
              Splits a large class or a set of closely related classes into two
              separate hierarchies (abstraction and implementation).
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

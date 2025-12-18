import { Badge } from '../../../components/ui/badge';
import { Card } from '../../../components/ui/card';
import { CodeBlock } from '../../../components/ui/code-block';

export const CreationPatternsSection = () => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
            Design Patterns
          </Badge>
          <h3 className="text-xl font-bold mt-2 text-gray-900">
            Creation Patterns
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Patterns focused on object creation mechanisms.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Singleton</h4>
            <p className="text-sm text-gray-700 mb-2">
              Ensures a class has only one instance and provides a global point
              of access to it.
            </p>
            <CodeBlock
              code={`const Singleton = (function() {
  let instance;
  function createInstance() {
    return new Object("I am the instance");
  }
  return {
    getInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();`}
              className="text-xs"
            />
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-1">
                Factory Method
              </h4>
              <p className="text-sm text-gray-700">
                Defines an interface for creating an object, but let subclasses
                decide which class to instantiate.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-1">
                Abstract Factory
              </h4>
              <p className="text-sm text-gray-700">
                Provides an interface for creating families of related or
                dependent objects without specifying their concrete classes.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-1">Builder</h4>
              <p className="text-sm text-gray-700">
                Separates the construction of a complex object from its
                representation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

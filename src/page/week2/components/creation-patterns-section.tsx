import { Badge } from '../../../components/ui/badge';
import { Card } from '../../../components/ui/card';
import { CodeBlock } from '../../../components/ui/code-block';
import { BuilderVisualizer } from './builder-visualizer';
import { FactoryVisualizer } from './factory-visualizer';
import { SingletonVisualizer } from './singleton-visualizer';

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

      <div className="space-y-8">
        {/* Singleton Section */}
        <section>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            Singleton Pattern
          </h4>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-700">
                Ensures a class has only one instance and provides a global
                point of access to it.
              </p>
              <CodeBlock
                code={`const Singleton = (function() {
  let instance;
  // ...
  return {
    getInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance; // Always returns same object
    }
  };
})();`}
                className="text-xs"
              />
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                Interactive Demo
              </div>
              <SingletonVisualizer />
            </div>
          </div>
        </section>

        <div className="h-px bg-gray-100" />

        {/* Factory Section */}
        <section>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Factory Pattern
          </h4>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-1">
                  Factory Method
                </h5>
                <p className="text-sm text-gray-700 mb-2">
                  Defines an interface for creating an object, but let
                  subclasses decide which class to instantiate.
                </p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-1">
                  Abstract Factory
                </h5>
                <p className="text-sm text-gray-700">
                  Provides an interface for creating families of related or
                  dependent objects.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                Interactive Demo
              </div>
              <FactoryVisualizer />
            </div>
          </div>
        </section>

        {/* Builder Section */}
        <section className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
            <h4 className="font-semibold text-gray-900">Builder Pattern</h4>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <p className="text-sm text-gray-700">
              Separates the construction of a complex object from its
              representation, allowing you to create different representations
              with the same construction process.
            </p>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                Interactive Demo
              </div>
              <BuilderVisualizer />
            </div>
          </div>
        </section>
      </div>
    </Card>
  );
};

import { Badge } from '../../../components/ui/badge';
import { Card } from '../../../components/ui/card';
import { CodeBlock } from '../../../components/ui/code-block';
import { AdapterVisualizer } from './adapter-visualizer';
import { BridgeVisualizer } from './bridge-visualizer';
import { DecoratorVisualizer } from './decorator-visualizer';
import { FacadeVisualizer } from './facade-visualizer';
import { ProxyVisualizer } from './proxy-visualizer';

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

      <div className="space-y-8">
        <section>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Decorator Pattern
          </h4>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <p className="text-sm text-gray-700 mb-4">
                Attaches additional responsibilities to an object dynamically.
                Flexible alternative to subclassing.
              </p>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                  Interactive Demo
                </div>
                <DecoratorVisualizer />
              </div>
            </div>
            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-900">Concept</h5>
              <div className="bg-indigo-50 p-3 rounded text-sm text-indigo-900">
                Modern TypeScript & ES: <strong>@Decorators</strong>.
                <br />
                <br />
                We annotate classes or methods with `@DecoratorName`. Under the
                hood, this "wraps" the original class/method with new logic
                (logging, validation, etc.).
              </div>
              <CodeBlock
                code={`@Component
class UserProfile {
    @readonly
    email: string;

    @LogExecution
    updateEmail(newEmail: string) {
        this.email = newEmail;
    }
}`}
                className="text-xs"
              />
            </div>
          </div>
        </section>

        <div className="h-px bg-gray-100" />

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Adapter Pattern
            </h4>
            <p className="text-xs text-gray-600 mb-4">
              Collaborate with incompatible interfaces (Plug Adapter).
            </p>
            <AdapterVisualizer />
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Proxy Pattern
            </h4>
            <p className="text-xs text-gray-600 mb-4">
              A placeholder to control access (security, lazy loading).
            </p>
            <ProxyVisualizer />
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Facade Pattern
            </h4>
            <p className="text-xs text-gray-600 mb-4">
              Simplified interface for complex subsystems (Smart Home).
            </p>
            <FacadeVisualizer />
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Bridge Pattern
            </h4>
            <p className="text-xs text-gray-600 mb-4">
              Connecting Abstractions (Remote) to Implementations (Device).
            </p>
            <BridgeVisualizer />
          </div>
        </div>
      </div>
    </Card>
  );
};

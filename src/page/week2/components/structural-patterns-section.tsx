import {
  DemoBox,
  SectionCard,
  SectionDivider,
  SubSection,
} from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { AdapterVisualizer } from './adapter-visualizer';
import { BridgeVisualizer } from './bridge-visualizer';
import { DecoratorVisualizer } from './decorator-visualizer';
import { FacadeVisualizer } from './facade-visualizer';
import { ProxyVisualizer } from './proxy-visualizer';

export const StructuralPatternsSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Design Patterns', color: 'indigo' }}
      title="Structural Patterns"
      description="Patterns concerned with how classes and objects are composed to form larger structures."
    >
      <div className="space-y-8">
        <SubSection title="Decorator Pattern" icon iconColor="purple">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <p className="text-sm text-gray-700 mb-4">
                Attaches additional responsibilities to an object dynamically.
                Flexible alternative to subclassing.
              </p>
              <DemoBox>
                <DecoratorVisualizer />
              </DemoBox>
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
        </SubSection>

        <SectionDivider variant="line" />

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
    </SectionCard>
  );
};

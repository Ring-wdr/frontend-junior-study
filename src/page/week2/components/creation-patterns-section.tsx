import {
  DemoBox,
  SectionCard,
  SectionDivider,
  SubSection,
} from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { BuilderVisualizer } from './builder-visualizer';
import { FactoryVisualizer } from './factory-visualizer';
import { SingletonVisualizer } from './singleton-visualizer';

export const CreationPatternsSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Design Patterns', color: 'purple' }}
      title="Creation Patterns"
      description="Patterns focused on object creation mechanisms."
    >
      <div className="space-y-8">
        <SubSection title="Singleton Pattern" icon iconColor="purple">
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
            <DemoBox>
              <SingletonVisualizer />
            </DemoBox>
          </div>
        </SubSection>

        <SectionDivider variant="line" />

        <SubSection
          title="Factory Pattern"
          icon
          iconColor="blue"
          divider={false}
        >
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
            <DemoBox>
              <FactoryVisualizer />
            </DemoBox>
          </div>
        </SubSection>

        <SubSection
          title="Builder Pattern"
          icon
          iconColor="pink"
          divider={false}
          className="bg-gray-50 p-4 rounded-lg border border-gray-200"
        >
          <div className="grid grid-cols-1 gap-6">
            <p className="text-sm text-gray-700">
              Separates the construction of a complex object from its
              representation, allowing you to create different representations
              with the same construction process.
            </p>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <DemoBox>
                <BuilderVisualizer />
              </DemoBox>
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

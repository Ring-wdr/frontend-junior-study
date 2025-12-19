import { DemoBox, SectionCard, SectionDivider, SubSection } from '../../../components';
import { ObserverVisualizer } from './observer-visualizer';
import { StrategyVisualizer } from './strategy-visualizer';

export const BehavioralPatternsSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Design Patterns', color: 'green' }}
      title="Behavioral Patterns"
      description="Patterns concerned with algorithms and the assignment of responsibilities between objects."
    >
      <div className="space-y-8">
        <SubSection title="Observer Pattern" icon iconColor="green">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-700 mb-2">
                  Lets you define a subscription mechanism to notify multiple
                  objects about any events that happen to the object they're
                  observing.
                </p>
                <div className="text-sm text-gray-600 italic bg-gray-50 p-2 rounded">
                  Common in JS: Event Listeners, RxJS, Redux (Flux).
                </div>
              </div>
            </div>
            <DemoBox>
              <ObserverVisualizer />
            </DemoBox>
          </div>
        </SubSection>

        <SectionDivider variant="line" />

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Strategy Pattern
            </h4>
            <p className="text-xs text-gray-600 mb-4">
              Interchangeable algorithms (Payment Methods).
            </p>
            <StrategyVisualizer />
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">State</h4>
            <p className="text-sm text-gray-700">
              Lets an object alter its behavior when its internal state changes.
              It appears as if the object changed its class.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">Command</h4>
            <p className="text-sm text-gray-700">
              Turns a request into a stand-alone object that contains all
              information about the request.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">
              Template Method
            </h4>
            <p className="text-sm text-gray-700">
              Defines the skeleton of an algorithm in the superclass but lets
              subclasses override specific steps.
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

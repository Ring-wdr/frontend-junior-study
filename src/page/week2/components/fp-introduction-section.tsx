import {
  DemoBox,
  InfoBox,
  SectionCard,
  SectionDivider,
  SubSection,
} from '../../../components';
import { CurryingVisualizer } from './currying-visualizer';
import { ImmutabilityVisualizer } from './immutability-visualizer';
import { MonadVisualizer } from './monad-visualizer';

export const FpIntroductionSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Functional Programming', color: 'orange' }}
      title="Introduction to FP"
      description="Programming paradigm where programs are constructed by applying and composing functions."
    >
      <div className="space-y-8">
        <SubSection title="Immutability" icon iconColor="orange">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <p className="text-sm text-gray-700 mb-4">
                Data is never modified; instead, a new copy with changes is
                created. This leads to predictable state changes (Redux style).
              </p>
              <DemoBox>
                <ImmutabilityVisualizer />
              </DemoBox>
            </div>
            <div className="space-y-4">
              <InfoBox variant="orange" title="Core Concepts">
                <ul className="list-disc pl-5 space-y-1 text-sm text-orange-800">
                  <li>
                    <strong>Pure Functions:</strong> Given the same input,
                    always return the same output and has no side effects.
                  </li>
                  <li>
                    <strong>Immutability:</strong> Avoid shared mutable state.
                  </li>
                  <li>
                    <strong>Higher-Order Functions:</strong> Functions that take
                    others as args.
                  </li>
                </ul>
              </InfoBox>
            </div>
          </div>
        </SubSection>

        <SectionDivider variant="line" />

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Currying
            </h4>
            <p className="text-xs text-gray-600 mb-4">
              Function taking multiple args to Sequence of functions.
            </p>
            <CurryingVisualizer />
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Monads (Maybe)
            </h4>
            <p className="text-xs text-gray-600 mb-4">
              Safe chainable computations (Handling Nulls).
            </p>
            <MonadVisualizer />
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

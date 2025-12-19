import { InfoBox, SectionCard } from '../../../components';
import { V8HiddenClassDemo } from './v8-hidden-class-demo';

export const OptimizationSection = () => (
  <SectionCard
    badge={{ label: 'Advanced', color: 'blue' }}
    title="V8 Hidden Classes"
    description="Visualize how V8 optimizes objects with consistent shapes."
    testId="optimization-section"
  >
    <V8HiddenClassDemo />

    <div className="mt-6">
      <InfoBox variant="blue" title="Key Takeaway">
        Always initialize properties in the <strong>exact same order</strong> to help V8
        share hidden classes and optimize property access (Monomorphism).
      </InfoBox>
    </div>
  </SectionCard>
);

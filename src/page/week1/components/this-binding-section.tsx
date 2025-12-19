import { SectionCard } from '../../../components';
import { ThisBindingDemo } from './this-binding-demo';

export const ThisBindingSection = () => (
  <SectionCard
    badge={{ label: 'Core', color: 'purple' }}
    title="5 Rules of 'this'"
    description="Explore how 'this' binding works in different contexts."
    testId="this-binding-section"
  >
    <ThisBindingDemo />
  </SectionCard>
);

import { SectionCard } from '../../../components';
import { ClosureDemo } from './closure-demo';

export const ScopeClosureSection = () => (
  <SectionCard
    badge={{ label: 'Scope', color: 'green' }}
    title="Closures"
    description="Create multiple counters to see how closures maintain independent state."
    testId="scope-closure-section"
  >
    <ClosureDemo />
  </SectionCard>
);

import { InfoBox, SectionCard } from '../../../components';
import { EventLoopVisualizer } from './event-loop-visualizer';

export const EventLoopSection = () => (
  <SectionCard
    badge={{ label: 'Runtime', color: 'blue' }}
    title="Event Loop Visualizer"
    description="Step through the Event Loop to understand how JavaScript handles async code."
    testId="event-loop-section"
  >
    <EventLoopVisualizer />

    <div className="mt-8">
      <InfoBox variant="blue" title="Key Rule">
        Microtasks (Promises, queueMicrotask) are processed <em>immediately</em>{' '}
        after the current script and before any new Macrotask (setTimeout, I/O).
      </InfoBox>
    </div>
  </SectionCard>
);

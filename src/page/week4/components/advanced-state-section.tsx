import { InfoBox, SectionCard } from '../../../components';

export const AdvancedStateSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Advanced Concepts', color: 'indigo' }}
      title="Advanced State Patterns"
      description="Handling complex async streams with RxJS and modeling state with State Machines (XState)."
    >
      <div className="space-y-6">
        <InfoBox variant="blue" title="RxJS & Observables">
          <p className="text-sm text-gray-700">
            Treats state as a stream of events.{' '}
            <strong>Redux Observable</strong> is a middleware that allows you to
            handle actions as streams using RxJS operators (filter, map,
            debounce). Powerful for complex async logic but has a steep learning
            curve.
          </p>
        </InfoBox>

        <InfoBox variant="purple" title="XState & State Machines">
          <p className="text-sm text-gray-700">
            Uses <strong>Finite State Machines (FSM)</strong> and Statecharts to
            model application logic visually.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-700">
            <li>Prevents impossible states.</li>
            <li>Visualizes application logic.</li>
            <li>Highly predictable and testable.</li>
          </ul>
        </InfoBox>
      </div>
    </SectionCard>
  );
};

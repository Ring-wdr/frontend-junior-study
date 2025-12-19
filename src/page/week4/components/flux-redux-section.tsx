import { InfoBox, SectionCard } from '../../../components';
import { FluxFlowVisualizer } from './flux-flow-visualizer';

export const FluxReduxSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Architecture & Library', color: 'blue' }}
      title="Flux Architecture & Redux"
      description="Understanding the unidirectional data flow and the most popular state management library."
    >
      <div className="space-y-6">
        <FluxFlowVisualizer />

        <InfoBox variant="blue" title="Flux Architecture">
          <p className="text-sm text-gray-700">
            Flux enforces a <strong>unidirectional data flow</strong>: Action
            &gt; Dispatcher &gt; Store &gt; View. This cycle ensures predictable
            state updates.
          </p>
        </InfoBox>

        <InfoBox variant="gray" title="Redux Core Concepts">
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li>
              <strong>Store:</strong> The single source of truth for your
              application state.
            </li>
            <li>
              <strong>Action:</strong> An object describing "what happened".
            </li>
            <li>
              <strong>Reducer:</strong> A pure function that calculates the next
              state based on the previous state and an action.
            </li>
            <li>
              <strong>Dispatch:</strong> The only way to update the state is to
              dispatch an action.
            </li>
          </ul>
        </InfoBox>

        <InfoBox variant="green" title="Redux Toolkit (RTK)">
          <p className="text-sm text-gray-700">
            The official, opinionated, batteries-included toolset for efficient
            Redux development. It simplifies store setup with{' '}
            <code>configureStore</code> and reduces boilerplate with{' '}
            <code>createSlice</code>.
          </p>
        </InfoBox>
      </div>
    </SectionCard>
  );
};

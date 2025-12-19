import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { FluxFlowVisualizer } from './flux-flow-visualizer';

export const FluxReduxSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Architecture & Library', color: 'blue' }}
      title="Flux Architecture & Redux"
      description="Understanding the unidirectional data flow and the most popular state management library."
    >
      <div className="space-y-8">
        <SubSection title="Flux Architecture" icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Flux is a design pattern for managing data flow in applications,
              proposed by Facebook. It enforces a{' '}
              <strong>unidirectional data flow</strong>:{' '}
              <strong>Action → Dispatcher → Store → View</strong>. This cycle
              ensures predictable state updates and makes it easier to trace
              where changes originate.
            </p>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <FluxFlowVisualizer />
            </div>

            <InfoBox variant="blue" title="Key Principles">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Single Direction:</strong> Data flows in one direction
                  only, preventing circular dependencies.
                </li>
                <li>
                  <strong>Centralized Store:</strong> All application state
                  lives in a single store.
                </li>
                <li>
                  <strong>Pure Functions:</strong> Reducers must be pure
                  functions without side effects.
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="Redux Core Concepts" icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Redux is the most popular implementation of the Flux pattern. It
              provides a predictable state management solution with powerful
              developer tools.
            </p>

            <div className="grid grid-cols-1 gap-4">
              <InfoBox variant="gray" title="Store">
                <p className="text-sm text-gray-700">
                  The single source of truth for your application state. It
                  holds the entire state tree in one object.
                </p>
                <CodeBlock
                  code={`const store = createStore(rootReducer);
const state = store.getState(); // Get current state`}
                  className="text-xs mt-2"
                />
              </InfoBox>

              <InfoBox variant="gray" title="Action">
                <p className="text-sm text-gray-700">
                  A plain object describing "what happened" in the application.
                  Actions are dispatched to trigger state changes.
                </p>
                <CodeBlock
                  code={`const incrementAction = {
  type: 'INCREMENT',
  payload: 1
};`}
                  className="text-xs mt-2"
                />
              </InfoBox>

              <InfoBox variant="gray" title="Reducer">
                <p className="text-sm text-gray-700">
                  A pure function that takes the previous state and an action,
                  then returns the next state. Must be deterministic.
                </p>
                <CodeBlock
                  code={`const counterReducer = (state = 0, action) => {
  if (action.type === 'INCREMENT') {
    return state + action.payload;
  }
  return state;
};`}
                  className="text-xs mt-2"
                />
              </InfoBox>

              <InfoBox variant="gray" title="Dispatch">
                <p className="text-sm text-gray-700">
                  The only way to update the state. Dispatch sends an action to
                  the store, which passes it to the reducer.
                </p>
                <CodeBlock
                  code={`store.dispatch({ type: 'INCREMENT', payload: 1 });`}
                  className="text-xs mt-2"
                />
              </InfoBox>
            </div>
          </div>
        </SubSection>

        <SubSection title="Redux Toolkit (RTK)" icon iconColor="green">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Redux Toolkit is the official, recommended way to write Redux
              logic. It provides utilities to simplify common Redux patterns and
              reduce boilerplate significantly.
            </p>

            <InfoBox variant="green" title="Key Benefits">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <code>configureStore</code> - Preconfigured store with good
                  defaults
                </li>
                <li>
                  <code>createSlice</code> - Combines actions and reducers into
                  one definition
                </li>
                <li>
                  <code>createAsyncThunk</code> - Handles async operations
                  elegantly
                </li>
                <li>
                  Immer integration - Write "mutating" code that's actually
                  immutable
                </li>
              </ul>
            </InfoBox>

            <CodeBlock
              code={`import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  }
});

const store = configureStore({
  reducer: counterSlice.reducer
});

export const { increment, decrement } = counterSlice.actions;`}
              className="text-xs"
            />
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

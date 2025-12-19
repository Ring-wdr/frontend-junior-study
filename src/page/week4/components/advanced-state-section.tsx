import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const AdvancedStateSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Advanced Concepts', color: 'purple' }}
      title="Advanced State Patterns"
      description="Handling complex async streams with RxJS and modeling state with State Machines (XState)."
    >
      <div className="space-y-8">
        <SubSection title="RxJS & Redux Observable" icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              RxJS treats state and events as <strong>streams</strong> that can be
              manipulated using powerful functional operators. <strong>Redux Observable</strong>{' '}
              integrates RxJS with Redux to handle complex async workflows elegantly.
            </p>

            <InfoBox variant="blue" title="Key Concepts">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Observables:</strong> Streams of values over time
                </li>
                <li>
                  <strong>Operators:</strong> Pure functions to transform streams
                  (map, filter, debounce, etc.)
                </li>
                <li>
                  <strong>Epics:</strong> Redux Observable's middleware layer for
                  handling effects
                </li>
              </ul>
            </InfoBox>

            <CodeBlock
              code={`import { ofType } from 'redux-observable';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// Epic - a middleware-like function
const fetchUserEpic = (action$) =>
  action$.pipe(
    // Listen for FETCH_USER actions
    ofType('FETCH_USER'),
    // Make the API call
    mergeMap((action) =>
      fetchUser(action.payload.userId).pipe(
        // Map success to action
        map((user) => ({ type: 'FETCH_USER_SUCCESS', payload: user })),
        // Catch errors
        catchError((error) =>
          of({ type: 'FETCH_USER_ERROR', payload: error.message })
        )
      )
    )
  );`}
              className="text-xs"
            />

            <InfoBox variant="gray" title="Pros & Cons">
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>✓ Pros:</strong> Extremely powerful for complex async
                  patterns, composition-friendly
                </p>
                <p>
                  <strong>✗ Cons:</strong> Steep learning curve, RxJS knowledge
                  required, complex to debug
                </p>
              </div>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="State Machines with XState" icon iconColor="purple">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              XState uses <strong>Finite State Machines (FSM)</strong> and
              Statecharts to model application logic. It helps prevent
              <strong> impossible states</strong> by explicitly defining which
              state transitions are valid.
            </p>

            <InfoBox variant="purple" title="Core Concepts">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>States:</strong> Discrete application states (idle,
                  loading, success, error)
                </li>
                <li>
                  <strong>Events:</strong> Actions that trigger state transitions
                </li>
                <li>
                  <strong>Transitions:</strong> Rules defining which events cause
                  which state changes
                </li>
                <li>
                  <strong>Context:</strong> Extended state data associated with
                  the state
                </li>
              </ul>
            </InfoBox>

            <CodeBlock
              code={`import { createMachine, interpret } from 'xstate';

// Define a state machine
const fetchMachine = createMachine(
  {
    id: 'fetchUser',
    initial: 'idle',
    states: {
      idle: {
        on: { FETCH: 'loading' }
      },
      loading: {
        on: {
          SUCCESS: 'success',
          ERROR: 'error'
        }
      },
      success: {
        on: { FETCH: 'loading' }
      },
      error: {
        on: { FETCH: 'loading' }
      }
    }
  },
  {
    services: {
      fetchUser: async (context, event) => {
        const response = await fetch(\`/api/users/\${event.userId}\`);
        return response.json();
      }
    }
  }
);

// Use in React
function UserFetcher() {
  const [state, send] = useMachine(fetchMachine);

  if (state.matches('idle')) {
    return <button onClick={() => send('FETCH')}>Fetch User</button>;
  }
  if (state.matches('loading')) {
    return <div>Loading...</div>;
  }
  if (state.matches('success')) {
    return <div>Success!</div>;
  }
  if (state.matches('error')) {
    return <div>Error fetching user</div>;
  }
}`}
              className="text-xs"
            />

            <InfoBox variant="gray" title="Benefits">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Prevents Invalid States:</strong> State machine
                  explicitly defines valid transitions
                </li>
                <li>
                  <strong>Self-Documenting:</strong> State diagram serves as
                  documentation
                </li>
                <li>
                  <strong>Testability:</strong> Pure logic makes testing simple
                </li>
                <li>
                  <strong>Visualization:</strong> XState provides visual tools to
                  see state flows
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="When to Use Advanced Patterns" icon iconColor="orange">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <InfoBox variant="orange" title="Use RxJS Observable when...">
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>Handling complex, interconnected async operations</li>
                  <li>Needing to debounce, throttle, or batch requests</li>
                  <li>Managing streams of real-time data</li>
                  <li>Your team is comfortable with reactive programming</li>
                </ul>
              </InfoBox>

              <InfoBox variant="purple" title="Use XState when...">
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>State has many complex transitions</li>
                  <li>Preventing impossible states is critical</li>
                  <li>You need clear documentation of state flows</li>
                  <li>Testing state logic is a priority</li>
                </ul>
              </InfoBox>

              <InfoBox variant="red" title="Warning">
                <p className="text-sm text-gray-700">
                  These are <strong>advanced patterns</strong> with significant
                  learning curves. Use them only when simpler solutions
                  (Redux Thunk, Zustand) prove insufficient.
                </p>
              </InfoBox>
            </div>
          </div>
        </SubSection>

        <SubSection title="Comparison: All Async Approaches" icon iconColor="blue">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-300 bg-gray-50">
                    <th className="text-left p-2 font-semibold">Approach</th>
                    <th className="text-left p-2 font-semibold">Complexity</th>
                    <th className="text-left p-2 font-semibold">Best For</th>
                    <th className="text-left p-2 font-semibold">Learning Curve</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 font-medium">Redux Thunk</td>
                    <td className="p-2">Low</td>
                    <td className="p-2">Simple async tasks</td>
                    <td className="p-2">Easy</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 font-medium">Redux Saga</td>
                    <td className="p-2">Medium-High</td>
                    <td className="p-2">Complex async flows</td>
                    <td className="p-2">Moderate</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 font-medium">RxJS Observable</td>
                    <td className="p-2">High</td>
                    <td className="p-2">Stream manipulation</td>
                    <td className="p-2">Steep</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">XState</td>
                    <td className="p-2">Medium</td>
                    <td className="p-2">Complex state logic</td>
                    <td className="p-2">Moderate</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

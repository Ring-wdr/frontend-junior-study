import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { MiddlewareVisualizer } from './middleware-visualizer';

export const MiddlewareSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Asynchronous State', color: 'purple' }}
      title="Redux Middleware"
      description="Handling side effects and asynchronous logic in Redux applications."
    >
      <div className="space-y-8">
        <SubSection
          title="Understanding Redux Middleware"
          icon
          iconColor="purple"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Redux by itself is <strong>synchronous</strong>. Middleware
              provides a third-party extension point between dispatching an
              action and the moment it reaches the reducer. This enables
              handling of side effects like API calls, logging, and complex
              async workflows.
            </p>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <MiddlewareVisualizer />
            </div>

            <InfoBox variant="purple" title="Middleware Flow">
              <p className="text-sm text-gray-700">
                When an action is dispatched, it flows through the middleware
                chain before reaching the reducer. Each middleware can
                intercept, modify, or delay actions.
              </p>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="Redux Thunk" icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Redux Thunk is the simplest and most commonly used middleware for
              handling async operations. It allows action creators to return a
              function instead of an action object. This function receives{' '}
              <code>dispatch</code> and <code>getState</code> as arguments.
            </p>

            <InfoBox variant="blue" title="How It Works">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Normal actions:</strong> Return a plain action object
                </li>
                <li>
                  <strong>Thunks:</strong> Return a function that gets{' '}
                  <code>dispatch</code> and <code>getState</code>
                </li>
                <li>
                  Inside the thunk, perform async tasks and manually dispatch
                  actions
                </li>
              </ul>
            </InfoBox>

            <CodeBlock
              code={`// Basic thunk example
const fetchUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: 'USER_FETCH_START' });

  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const user = await response.json();

    dispatch({
      type: 'USER_FETCH_SUCCESS',
      payload: user
    });
  } catch (error) {
    dispatch({
      type: 'USER_FETCH_ERROR',
      payload: error.message
    });
  }
};

// Dispatch the thunk
store.dispatch(fetchUser(123));`}
              className="text-xs"
            />

            <InfoBox variant="gray" title="Pros & Cons">
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>✓ Pros:</strong> Simple, minimal setup, good for
                  straightforward async tasks
                </p>
                <p>
                  <strong>✗ Cons:</strong> Can lead to complex logic inside
                  thunks, harder to test complex async flows
                </p>
              </div>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="Redux Saga" icon iconColor="purple">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Redux Saga uses Generator functions to handle side effects in a
              more declarative way. It's more powerful and testable than thunk,
              making it ideal for complex async workflows.
            </p>

            <InfoBox variant="purple" title="Key Concepts">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Generators:</strong> Functions that can pause and
                  resume
                </li>
                <li>
                  <strong>Effects:</strong> Plain objects describing side
                  effects (<code>call</code>, <code>put</code>,{' '}
                  <code>select</code>, etc.)
                </li>
                <li>
                  <strong>Watcher Saga:</strong> Monitors actions and triggers
                  worker sagas
                </li>
              </ul>
            </InfoBox>

            <CodeBlock
              code={`import { call, put, takeEvery } from 'redux-saga/effects';

// Worker saga - handles the actual async logic
function* fetchUserSaga(action) {
  try {
    const user = yield call(api.getUser, action.payload.userId);
    yield put({ type: 'USER_FETCH_SUCCESS', payload: user });
  } catch (error) {
    yield put({ type: 'USER_FETCH_ERROR', payload: error.message });
  }
}

// Watcher saga - listens for actions
function* watchUserFetch() {
  yield takeEvery('USER_FETCH_REQUEST', fetchUserSaga);
}

// Root saga
function* rootSaga() {
  yield fork(watchUserFetch);
}`}
              className="text-xs"
            />

            <InfoBox variant="gray" title="Pros & Cons">
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>✓ Pros:</strong> Highly testable, handles race
                  conditions, cancellation, and complex flows elegantly
                </p>
                <p>
                  <strong>✗ Cons:</strong> Steeper learning curve, more
                  boilerplate
                </p>
              </div>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="Other Middleware" icon iconColor="orange">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <InfoBox variant="gray" title="Redux Observable">
                <p className="text-sm text-gray-700 mb-2">
                  Built on RxJS, it treats actions as streams and handles side
                  effects using reactive operators. Perfect for complex event
                  handling.
                </p>
                <p className="text-xs text-gray-600 italic">
                  Use when you need powerful stream manipulation and are
                  comfortable with reactive programming.
                </p>
              </InfoBox>

              <InfoBox variant="gray" title="Redux Promise">
                <p className="text-sm text-gray-700 mb-2">
                  Simple middleware that resolves Promise-based actions
                  automatically. Useful when you want a lightweight alternative
                  to Thunk.
                </p>
              </InfoBox>
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

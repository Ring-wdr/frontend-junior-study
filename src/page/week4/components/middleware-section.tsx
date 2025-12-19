import { InfoBox, SectionCard } from '../../../components';
import { MiddlewareVisualizer } from './middleware-visualizer';

export const MiddlewareSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Asynchronous State', color: 'purple' }}
      title="Redux Middleware"
      description="Handling side effects and asynchronous logic in Redux applications."
    >
      <div className="space-y-6">
        <MiddlewareVisualizer />

        <InfoBox variant="blue" title="Why Middleware?">
          <p className="text-sm text-gray-700">
            Redux by itself is synchronous. Middleware sits between dispatching
            an action and the moment it reaches the reducer, allowing for async
            tasks like API calls.
          </p>
        </InfoBox>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoBox variant="gray" title="Redux Thunk">
            <p className="text-sm text-gray-700 mb-2">
              Allows action creators to return a function instead of an action
              object. This function can perform async operations and dispatch
              regular actions when done.
            </p>
            <div className="bg-gray-100 p-2 rounded text-xs font-mono">
              {`const fetchUser = () => async (dispatch) => {
  const user = await api.getUser();
  dispatch({ type: 'USER_LOADED', payload: user });
};`}
            </div>
          </InfoBox>

          <InfoBox variant="gray" title="Redux Saga">
            <p className="text-sm text-gray-700 mb-2">
              Uses Generator functions to make async flows easier to read,
              write, and test. It handles complex side effects like race
              conditions and cancellation effectively.
            </p>
            <div className="bg-gray-100 p-2 rounded text-xs font-mono">
              {`function* fetchUserSaga() {
  const user = yield call(api.getUser);
  yield put({ type: 'USER_LOADED', payload: user });
}`}
            </div>
          </InfoBox>
        </div>
      </div>
    </SectionCard>
  );
};

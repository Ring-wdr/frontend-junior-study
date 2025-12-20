import { useTranslation } from 'react-i18next';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { MiddlewareVisualizer } from './middleware-visualizer';

export const MiddlewareSection = () => {
  const { t } = useTranslation('week4');

  return (
    <SectionCard
      badge={{ label: t('middleware.badge'), color: 'purple' }}
      title={t('middleware.title')}
      description={t('middleware.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('middleware.understanding.title')}
          icon
          iconColor="purple"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('middleware.understanding.description')}
            </p>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <MiddlewareVisualizer />
            </div>

            <InfoBox variant="purple" title={t('middleware.understanding.flow.title')}>
              <p className="text-sm text-gray-700">
                {t('middleware.understanding.flow.description')}
              </p>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title={t('middleware.thunk.title')} icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('middleware.thunk.description')}
            </p>

            <InfoBox variant="blue" title={t('middleware.thunk.howItWorks.title')}>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>{t('middleware.thunk.howItWorks.normalActions')}</li>
                <li>{t('middleware.thunk.howItWorks.thunks')}</li>
                <li>{t('middleware.thunk.howItWorks.inside')}</li>
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

            <InfoBox variant="gray" title={t('middleware.thunk.prosAndCons.title')}>
              <div className="space-y-2 text-sm text-gray-700">
                <p>{t('middleware.thunk.prosAndCons.pros')}</p>
                <p>{t('middleware.thunk.prosAndCons.cons')}</p>
              </div>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title={t('middleware.saga.title')} icon iconColor="purple">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('middleware.saga.description')}
            </p>

            <InfoBox variant="purple" title={t('middleware.saga.keyConcepts.title')}>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>{t('middleware.saga.keyConcepts.generators')}</li>
                <li>{t('middleware.saga.keyConcepts.effects')}</li>
                <li>{t('middleware.saga.keyConcepts.watcher')}</li>
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

            <InfoBox variant="gray" title={t('middleware.saga.prosAndCons.title')}>
              <div className="space-y-2 text-sm text-gray-700">
                <p>{t('middleware.saga.prosAndCons.pros')}</p>
                <p>{t('middleware.saga.prosAndCons.cons')}</p>
              </div>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title={t('middleware.other.title')} icon iconColor="orange">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <InfoBox variant="gray" title={t('middleware.other.observable.title')}>
                <p className="text-sm text-gray-700 mb-2">
                  {t('middleware.other.observable.description')}
                </p>
                <p className="text-xs text-gray-600 italic">
                  {t('middleware.other.observable.useCase')}
                </p>
              </InfoBox>

              <InfoBox variant="gray" title={t('middleware.other.promise.title')}>
                <p className="text-sm text-gray-700 mb-2">
                  {t('middleware.other.promise.description')}
                </p>
              </InfoBox>
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

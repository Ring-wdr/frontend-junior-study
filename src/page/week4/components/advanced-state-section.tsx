import { useTranslation } from 'react-i18next';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const AdvancedStateSection = () => {
  const { t } = useTranslation('week4');

  return (
    <SectionCard
      badge={{ label: t('advanced.badge'), color: 'purple' }}
      title={t('advanced.title')}
      description={t('advanced.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('advanced.rxjs.title')} icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('advanced.rxjs.description')}
            </p>

            <InfoBox variant="blue" title={t('advanced.rxjs.keyConcepts.title')}>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>{t('advanced.rxjs.keyConcepts.observables')}</li>
                <li>{t('advanced.rxjs.keyConcepts.operators')}</li>
                <li>{t('advanced.rxjs.keyConcepts.epics')}</li>
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

            <InfoBox variant="gray" title={t('advanced.rxjs.prosAndCons.title')}>
              <div className="space-y-2 text-sm text-gray-700">
                <p>{t('advanced.rxjs.prosAndCons.pros')}</p>
                <p>{t('advanced.rxjs.prosAndCons.cons')}</p>
              </div>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title={t('advanced.xstate.title')} icon iconColor="purple">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('advanced.xstate.description')}
            </p>

            <InfoBox variant="purple" title={t('advanced.xstate.coreConcepts.title')}>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>{t('advanced.xstate.coreConcepts.states')}</li>
                <li>{t('advanced.xstate.coreConcepts.events')}</li>
                <li>{t('advanced.xstate.coreConcepts.transitions')}</li>
                <li>{t('advanced.xstate.coreConcepts.context')}</li>
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

            <InfoBox variant="gray" title={t('advanced.xstate.benefits.title')}>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>{t('advanced.xstate.benefits.preventsInvalid')}</li>
                <li>{t('advanced.xstate.benefits.selfDocumenting')}</li>
                <li>{t('advanced.xstate.benefits.testability')}</li>
                <li>{t('advanced.xstate.benefits.visualization')}</li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection
          title={t('advanced.when.title')}
          icon
          iconColor="orange"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <InfoBox variant="orange" title={t('advanced.when.rxjs.title')}>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>{t('advanced.when.rxjs.complex')}</li>
                  <li>{t('advanced.when.rxjs.debounce')}</li>
                  <li>{t('advanced.when.rxjs.streams')}</li>
                  <li>{t('advanced.when.rxjs.team')}</li>
                </ul>
              </InfoBox>

              <InfoBox variant="purple" title={t('advanced.when.xstate.title')}>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>{t('advanced.when.xstate.complex')}</li>
                  <li>{t('advanced.when.xstate.preventing')}</li>
                  <li>{t('advanced.when.xstate.documentation')}</li>
                  <li>{t('advanced.when.xstate.testing')}</li>
                </ul>
              </InfoBox>

              <InfoBox variant="red" title={t('advanced.when.warning.title')}>
                <p className="text-sm text-gray-700">
                  {t('advanced.when.warning.description')}
                </p>
              </InfoBox>
            </div>
          </div>
        </SubSection>

        <SubSection
          title={t('advanced.comparisonTable.title')}
          icon
          iconColor="blue"
        >
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-300 bg-gray-50">
                    <th className="text-left p-2 font-semibold">{t('advanced.comparisonTable.approach')}</th>
                    <th className="text-left p-2 font-semibold">{t('advanced.comparisonTable.complexity')}</th>
                    <th className="text-left p-2 font-semibold">{t('advanced.comparisonTable.bestFor')}</th>
                    <th className="text-left p-2 font-semibold">{t('advanced.comparisonTable.learningCurve')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 font-medium">{t('advanced.comparisonTable.thunk.name')}</td>
                    <td className="p-2">{t('advanced.comparisonTable.thunk.complexity')}</td>
                    <td className="p-2">{t('advanced.comparisonTable.thunk.bestFor')}</td>
                    <td className="p-2">{t('advanced.comparisonTable.thunk.learningCurve')}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 font-medium">{t('advanced.comparisonTable.saga.name')}</td>
                    <td className="p-2">{t('advanced.comparisonTable.saga.complexity')}</td>
                    <td className="p-2">{t('advanced.comparisonTable.saga.bestFor')}</td>
                    <td className="p-2">{t('advanced.comparisonTable.saga.learningCurve')}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 font-medium">{t('advanced.comparisonTable.observable.name')}</td>
                    <td className="p-2">{t('advanced.comparisonTable.observable.complexity')}</td>
                    <td className="p-2">{t('advanced.comparisonTable.observable.bestFor')}</td>
                    <td className="p-2">{t('advanced.comparisonTable.observable.learningCurve')}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">{t('advanced.comparisonTable.xstate.name')}</td>
                    <td className="p-2">{t('advanced.comparisonTable.xstate.complexity')}</td>
                    <td className="p-2">{t('advanced.comparisonTable.xstate.bestFor')}</td>
                    <td className="p-2">{t('advanced.comparisonTable.xstate.learningCurve')}</td>
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

import { useTranslation } from 'react-i18next';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { FluxFlowVisualizer } from './flux-flow-visualizer';

export const FluxReduxSection = () => {
  const { t } = useTranslation('week4');

  return (
    <SectionCard
      badge={{ label: t('fluxRedux.badge'), color: 'blue' }}
      title={t('fluxRedux.title')}
      description={t('fluxRedux.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('fluxRedux.fluxArchitecture.title')} icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('fluxRedux.fluxArchitecture.description')}
            </p>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <FluxFlowVisualizer />
            </div>

            <InfoBox variant="blue" title={t('fluxRedux.fluxArchitecture.keyPrinciples.title')}>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>{t('fluxRedux.fluxArchitecture.keyPrinciples.singleDirection')}</li>
                <li>{t('fluxRedux.fluxArchitecture.keyPrinciples.centralizedStore')}</li>
                <li>{t('fluxRedux.fluxArchitecture.keyPrinciples.pureFunctions')}</li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title={t('fluxRedux.reduxCore.title')} icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('fluxRedux.reduxCore.description')}
            </p>

            <div className="grid grid-cols-1 gap-4">
              <InfoBox variant="gray" title={t('fluxRedux.reduxCore.store.title')}>
                <p className="text-sm text-gray-700">
                  {t('fluxRedux.reduxCore.store.description')}
                </p>
                <CodeBlock
                  code={`const store = createStore(rootReducer);
const state = store.getState(); // Get current state`}
                  className="text-xs mt-2"
                />
              </InfoBox>

              <InfoBox variant="gray" title={t('fluxRedux.reduxCore.action.title')}>
                <p className="text-sm text-gray-700">
                  {t('fluxRedux.reduxCore.action.description')}
                </p>
                <CodeBlock
                  code={`const incrementAction = {
  type: 'INCREMENT',
  payload: 1
};`}
                  className="text-xs mt-2"
                />
              </InfoBox>

              <InfoBox variant="gray" title={t('fluxRedux.reduxCore.reducer.title')}>
                <p className="text-sm text-gray-700">
                  {t('fluxRedux.reduxCore.reducer.description')}
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

              <InfoBox variant="gray" title={t('fluxRedux.reduxCore.dispatch.title')}>
                <p className="text-sm text-gray-700">
                  {t('fluxRedux.reduxCore.dispatch.description')}
                </p>
                <CodeBlock
                  code={`store.dispatch({ type: 'INCREMENT', payload: 1 });`}
                  className="text-xs mt-2"
                />
              </InfoBox>
            </div>
          </div>
        </SubSection>

        <SubSection title={t('fluxRedux.reduxToolkit.title')} icon iconColor="green">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('fluxRedux.reduxToolkit.description')}
            </p>

            <InfoBox variant="green" title={t('fluxRedux.reduxToolkit.keyBenefits.title')}>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>{t('fluxRedux.reduxToolkit.keyBenefits.configureStore')}</li>
                <li>{t('fluxRedux.reduxToolkit.keyBenefits.createSlice')}</li>
                <li>{t('fluxRedux.reduxToolkit.keyBenefits.createAsyncThunk')}</li>
                <li>{t('fluxRedux.reduxToolkit.keyBenefits.immer')}</li>
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

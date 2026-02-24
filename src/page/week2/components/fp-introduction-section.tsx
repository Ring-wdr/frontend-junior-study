import { useTranslation } from 'react-i18next';
import {
  DemoBox,
  InfoBox,
  SectionCard,
  SectionDivider,
  SubSection,
} from '../../../components';
import { CurryingVisualizer } from './currying-visualizer';
import { ImmutabilityVisualizer } from './immutability-visualizer';
import { MonadVisualizer } from './monad-visualizer';

export const FpIntroductionSection = () => {
  const { t } = useTranslation('week2');
  return (
    <SectionCard
      badge={{ label: t('fp.badge'), color: 'orange' }}
      title={t('fp.title')}
      description={t('fp.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('fp.immutability.title')} icon iconColor="orange">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <p className="text-sm text-gray-700 mb-4">
                {t('fp.immutability.description')}
              </p>
              <DemoBox>
                <ImmutabilityVisualizer />
              </DemoBox>
            </div>
            <div className="space-y-4">
              <InfoBox
                variant="orange"
                title={t('fp.immutability.coreConcepts.title')}
              >
                <ul className="list-disc pl-5 space-y-1 text-sm text-orange-800">
                  <li>
                    <strong>
                      {t('fp.immutability.coreConcepts.pureFunctions.label')}
                    </strong>{' '}
                    {t(
                      'fp.immutability.coreConcepts.pureFunctions.description',
                    )}
                  </li>
                  <li>
                    <strong>
                      {t('fp.immutability.coreConcepts.immutability.label')}
                    </strong>{' '}
                    {t('fp.immutability.coreConcepts.immutability.description')}
                  </li>
                  <li>
                    <strong>
                      {t(
                        'fp.immutability.coreConcepts.higherOrderFunctions.label',
                      )}
                    </strong>{' '}
                    {t(
                      'fp.immutability.coreConcepts.higherOrderFunctions.description',
                    )}
                  </li>
                </ul>
              </InfoBox>
            </div>
          </div>
        </SubSection>

        <SectionDivider variant="line" />

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              {t('fp.currying.title')}
            </h4>
            <p className="text-xs text-gray-600 mb-4">
              {t('fp.currying.description')}
            </p>
            <CurryingVisualizer />
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              {t('fp.monads.title')}
            </h4>
            <p className="text-xs text-gray-600 mb-4">
              {t('fp.monads.description')}
            </p>
            <MonadVisualizer />
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

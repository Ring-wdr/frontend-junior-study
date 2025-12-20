import { useTranslation } from 'react-i18next';
import {
  DemoBox,
  SectionCard,
  SectionDivider,
  SubSection,
} from '../../../components';
import { ObserverVisualizer } from './observer-visualizer';
import { StrategyVisualizer } from './strategy-visualizer';

export const BehavioralPatternsSection = () => {
  const { t } = useTranslation('week2');
  return (
    <SectionCard
      badge={{ label: t('behavioral.badge'), color: 'green' }}
      title={t('behavioral.title')}
      description={t('behavioral.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('behavioral.observer.title')} icon iconColor="green">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-700 mb-2">
                  {t('behavioral.observer.description')}
                </p>
                <div className="text-sm text-gray-600 italic bg-gray-50 p-2 rounded">
                  {t('behavioral.observer.note')}
                </div>
              </div>
            </div>
            <DemoBox>
              <ObserverVisualizer />
            </DemoBox>
          </div>
        </SubSection>

        <SectionDivider variant="line" />

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              {t('behavioral.strategy.title')}
            </h4>
            <p className="text-xs text-gray-600 mb-4">
              {t('behavioral.strategy.description')}
            </p>
            <StrategyVisualizer />
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">{t('behavioral.state.title')}</h4>
            <p className="text-sm text-gray-700">
              {t('behavioral.state.description')}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">{t('behavioral.command.title')}</h4>
            <p className="text-sm text-gray-700">
              {t('behavioral.command.description')}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">
              {t('behavioral.templateMethod.title')}
            </h4>
            <p className="text-sm text-gray-700">
              {t('behavioral.templateMethod.description')}
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

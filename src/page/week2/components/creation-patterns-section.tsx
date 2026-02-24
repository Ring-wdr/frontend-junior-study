import { useTranslation } from 'react-i18next';
import {
  DemoBox,
  SectionCard,
  SectionDivider,
  SubSection,
} from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { BuilderVisualizer } from './builder-visualizer';
import { FactoryVisualizer } from './factory-visualizer';
import { SingletonVisualizer } from './singleton-visualizer';

export const CreationPatternsSection = () => {
  const { t } = useTranslation('week2');
  return (
    <SectionCard
      badge={{ label: t('creation.badge'), color: 'purple' }}
      title={t('creation.title')}
      description={t('creation.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('creation.singleton.title')}
          icon
          iconColor="purple"
        >
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-700">
                {t('creation.singleton.description')}
              </p>
              <CodeBlock
                code={`const Singleton = (function() {
  let instance;
  // ...
  return {
    getInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance; // Always returns same object
    }
  };
})();`}
                className="text-xs"
              />
            </div>
            <DemoBox>
              <SingletonVisualizer />
            </DemoBox>
          </div>
        </SubSection>

        <SectionDivider variant="line" />

        <SubSection
          title={t('creation.factory.title')}
          icon
          iconColor="blue"
          divider={false}
        >
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-1">
                  {t('creation.factory.method.title')}
                </h5>
                <p className="text-sm text-gray-700 mb-2">
                  {t('creation.factory.method.description')}
                </p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-1">
                  {t('creation.factory.abstract.title')}
                </h5>
                <p className="text-sm text-gray-700">
                  {t('creation.factory.abstract.description')}
                </p>
              </div>
            </div>
            <DemoBox>
              <FactoryVisualizer />
            </DemoBox>
          </div>
        </SubSection>

        <SubSection
          title={t('creation.builder.title')}
          icon
          iconColor="pink"
          divider={false}
          className="bg-gray-50 p-4 rounded-lg border border-gray-200"
        >
          <div className="grid grid-cols-1 gap-6">
            <p className="text-sm text-gray-700">
              {t('creation.builder.description')}
            </p>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <DemoBox>
                <BuilderVisualizer />
              </DemoBox>
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

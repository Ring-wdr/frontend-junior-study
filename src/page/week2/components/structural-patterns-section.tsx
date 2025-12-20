import { useTranslation } from 'react-i18next';
import {
  DemoBox,
  SectionCard,
  SectionDivider,
  SubSection,
} from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { AdapterVisualizer } from './adapter-visualizer';
import { BridgeVisualizer } from './bridge-visualizer';
import { DecoratorVisualizer } from './decorator-visualizer';
import { FacadeVisualizer } from './facade-visualizer';
import { ProxyVisualizer } from './proxy-visualizer';

export const StructuralPatternsSection = () => {
  const { t } = useTranslation('week2');
  return (
    <SectionCard
      badge={{ label: t('structural.badge'), color: 'indigo' }}
      title={t('structural.title')}
      description={t('structural.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('structural.decorator.title')} icon iconColor="purple">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <p className="text-sm text-gray-700 mb-4">
                {t('structural.decorator.description')}
              </p>
              <DemoBox>
                <DecoratorVisualizer />
              </DemoBox>
            </div>
            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-900">{t('structural.decorator.concept.title')}</h5>
              <div className="bg-indigo-50 p-3 rounded text-sm text-indigo-900" style={{ whiteSpace: 'pre-line' }}>
                {t('structural.decorator.concept.description')}
              </div>
              <CodeBlock
                code={`@Component
class UserProfile {
    @readonly
    email: string;

    @LogExecution
    updateEmail(newEmail: string) {
        this.email = newEmail;
    }
}`}
                className="text-xs"
              />
            </div>
          </div>
        </SubSection>

        <SectionDivider variant="line" />

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              {t('structural.adapter.title')}
            </h4>
            <p className="text-xs text-gray-600 mb-4">
              {t('structural.adapter.description')}
            </p>
            <AdapterVisualizer />
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              {t('structural.proxy.title')}
            </h4>
            <p className="text-xs text-gray-600 mb-4">
              {t('structural.proxy.description')}
            </p>
            <ProxyVisualizer />
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              {t('structural.facade.title')}
            </h4>
            <p className="text-xs text-gray-600 mb-4">
              {t('structural.facade.description')}
            </p>
            <FacadeVisualizer />
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              {t('structural.bridge.title')}
            </h4>
            <p className="text-xs text-gray-600 mb-4">
              {t('structural.bridge.description')}
            </p>
            <BridgeVisualizer />
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

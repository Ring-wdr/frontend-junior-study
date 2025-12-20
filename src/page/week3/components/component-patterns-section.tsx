import { useTranslation } from 'react-i18next';
import { InfoBox, SectionCard } from '../../../components';
import { ComponentPatternsVisualizer } from './component-patterns-visualizer';

export const ComponentPatternsSection = () => {
  const { t } = useTranslation('week3');

  return (
    <SectionCard
      badge={{ label: t('patterns.badge'), color: 'pink' }}
      title={t('patterns.title')}
      description={t('patterns.description')}
    >
      <div className="space-y-8">
        <ComponentPatternsVisualizer />

        <InfoBox variant="gray" title={t('patterns.compoundComponents.title')}>
          <p className="text-sm text-gray-700 mb-2">
            {t('patterns.compoundComponents.description')}
          </p>
          <div className="bg-gray-100 p-2 rounded font-mono text-xs">
            {`<Select>\n  <Select.Option value="1">Option 1</Select.Option>\n  <Select.Option value="2">Option 2</Select.Option>\n</Select>`}
          </div>
        </InfoBox>

        <InfoBox variant="gray" title={t('patterns.renderProps.title')}>
          <p className="text-sm text-gray-700 mb-2">
            {t('patterns.renderProps.description')}
          </p>
          <div className="bg-gray-100 p-2 rounded font-mono text-xs">
            {`<DataProvider render={data => (\n  <h1>Hello {data.target}</h1>\n)}/>`}
          </div>
        </InfoBox>

        <InfoBox variant="gray" title={t('patterns.hoc.title')}>
          <p className="text-sm text-gray-700 mb-2">
            {t('patterns.hoc.description')}
          </p>
        </InfoBox>
      </div>
    </SectionCard>
  );
};

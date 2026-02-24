import { useTranslation } from 'react-i18next';
import { InfoBox, SectionCard } from '../../../components';
import { PerformanceVisualizer } from './performance-visualizer';

export const PerformanceSection = () => {
  const { t } = useTranslation('week3');

  return (
    <SectionCard
      badge={{ label: t('performance.badge'), color: 'green' }}
      title={t('performance.title')}
      description={t('performance.description')}
    >
      <div className="space-y-8">
        <PerformanceVisualizer />

        <InfoBox variant="gray" title={t('performance.memoization.title')}>
          <p className="text-sm text-gray-700 mb-2">
            {t('performance.memoization.description')}
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>
              <code>React.memo</code>: {t('performance.memoization.reactMemo')}
            </li>
            <li>
              <code>useMemo</code>: {t('performance.memoization.useMemo')}
            </li>
            <li>
              <code>useCallback</code>:{' '}
              {t('performance.memoization.useCallback')}
            </li>
          </ul>
        </InfoBox>

        <InfoBox variant="gray" title={t('performance.virtualization.title')}>
          <p className="text-sm text-gray-700">
            {t('performance.virtualization.description')}
          </p>
        </InfoBox>
      </div>
    </SectionCard>
  );
};

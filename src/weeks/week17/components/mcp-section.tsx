'use client';

import { useTranslation } from '@/i18n/client';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { McpArchitectureVisualizer } from './mcp-architecture-visualizer';

export const McpSection = () => {
  const { t, raw } = useTranslation('week17');
  const specChanges = raw('mcp.specChanges');

  return (
    <SectionCard
      badge={{ label: t('mcp.badge'), color: 'blue' }}
      description={t('mcp.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('mcp.whatIsTitle')} icon iconColor="blue">
          <InfoBox variant="blue" title={t('mcp.conceptTitle')}>
            <p className="text-sm leading-relaxed">{t('mcp.conceptDesc')}</p>
          </InfoBox>

          <DemoBox label={t('mcp.architectureLabel')}>
            <McpArchitectureVisualizer />
          </DemoBox>
        </SubSection>

        <SubSection title={t('mcp.specTitle')} icon iconColor="orange">
          <p className="text-sm text-gray-700 leading-relaxed">
            {t('mcp.specIntro')}
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-gray-700">
            {specChanges.map((change) => (
              <li key={change}>{change}</li>
            ))}
          </ul>
        </SubSection>
      </div>
    </SectionCard>
  );
};

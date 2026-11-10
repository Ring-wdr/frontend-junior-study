'use client';

import { useTranslation } from '@/i18n/client';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { McpArchitectureVisualizer } from './mcp-architecture-visualizer';
import { McpSectionSpec } from './mcp-section-spec';

export const McpSection = () => {
  const { t } = useTranslation('week17');

  return (
    <SectionCard
      badge={{ label: t('mcp.badge'), color: 'blue' }}
      description={t('mcp.description')}
      testId="mcp-section"
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
          <div className="mt-4">
            <McpSectionSpec />
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

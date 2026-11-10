'use client';

import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { McpServersExplorer } from './mcp-servers-section-explorer';
import { McpServersInstall } from './mcp-servers-section-install';
import { Rich } from './mcp-servers-section-rich';
import { McpServersSafety } from './mcp-servers-section-safety';
import { McpServersShifts } from './mcp-servers-section-shifts';
import { McpServersStart } from './mcp-servers-section-start';

export const McpServersSection = () => {
  const { t } = useTranslation('week17');

  return (
    <SectionCard
      badge={{ label: t('mcpServers.badge'), color: 'indigo' }}
      description={t('mcpServers.description')}
      testId="mcp-servers-section"
    >
      <div className="space-y-8">
        <SubSection title={t('mcpServers.intro.title')} icon iconColor="blue">
          <p className="text-sm text-gray-700 leading-relaxed">
            <Rich text={t('mcpServers.intro.body')} />
          </p>
          <p className="mt-2 text-sm text-gray-700 leading-relaxed">
            <Rich text={t('mcpServers.intro.limitNote')} />
          </p>
          <InfoBox variant="gray" title={t('mcpServers.intro.basisTitle')}>
            <p className="text-sm leading-relaxed">
              <Rich text={t('mcpServers.intro.basisBody')} />
            </p>
          </InfoBox>
        </SubSection>

        <McpServersExplorer />

        <SubSection
          title={t('mcpServers.install.title')}
          icon
          iconColor="green"
        >
          <McpServersInstall />
        </SubSection>

        <SubSection
          title={t('mcpServers.shifts.title')}
          icon
          iconColor="purple"
        >
          <McpServersShifts />
        </SubSection>

        <SubSection title={t('mcpServers.security.title')} icon iconColor="red">
          <McpServersSafety />
        </SubSection>

        <SubSection title={t('mcpServers.start.title')} icon iconColor="blue">
          <McpServersStart />
        </SubSection>
      </div>
    </SectionCard>
  );
};

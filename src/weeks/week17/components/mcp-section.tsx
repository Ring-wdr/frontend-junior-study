'use client';

import { Database, FileSearch, GitBranch, Globe, Server } from 'lucide-react';
import { useTranslation } from '@/i18n/client';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';
import { McpArchitectureVisualizer } from './mcp-architecture-visualizer';

const serverIconMap = {
  database: Database,
  globe: Globe,
  'git-branch': GitBranch,
  'file-search': FileSearch,
  server: Server,
};

export const McpSection = () => {
  const { t, raw } = useTranslation('week17');
  const servers = raw('mcp.servers');
  const specChanges = raw('mcp.specChanges');
  const tips = raw('mcp.tips');

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

        <SubSection title={t('mcp.serversTitle')} icon iconColor="purple">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {servers.map((server) => {
              const IconComponent =
                serverIconMap[server.icon as keyof typeof serverIconMap] ||
                Server;
              return (
                <div
                  key={server.name}
                  className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <IconComponent className="w-5 h-5 text-purple-600" />
                    <h5 className="font-bold text-sm text-purple-800">
                      {server.name}
                    </h5>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{server.desc}</p>
                  <code className="text-xs bg-purple-100 px-2 py-0.5 rounded text-purple-700 break-all">
                    {server.example}
                  </code>
                </div>
              );
            })}
          </div>
        </SubSection>

        <SubSection title={t('mcp.configTitle')} icon iconColor="green">
          <InfoBox variant="green" title={t('mcp.configInfoTitle')}>
            <p className="text-sm leading-relaxed">{t('mcp.configInfoDesc')}</p>
          </InfoBox>
          <CodeBlock
            code={t('mcp.addCode')}
            language="bash"
            className="mt-4 text-xs"
          />
          <CodeBlock
            code={t('mcp.configCode')}
            language="json"
            className="mt-4 text-xs"
          />
        </SubSection>

        <SubSection title={t('mcp.usageTitle')} icon iconColor="orange">
          <CodeBlock
            code={t('mcp.usageCode')}
            language="bash"
            className="text-xs"
          />

          <InfoBox variant="green" title={t('mcp.tipsTitle')}>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};

import { useTranslation } from 'react-i18next';
import { Database, Globe, GitBranch, FileSearch, Server } from 'lucide-react';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';
import { DemoBox } from '../../../components/demo-box';
import { McpArchitectureVisualizer } from './mcp-architecture-visualizer';

const serverIconMap = {
  database: Database,
  globe: Globe,
  'git-branch': GitBranch,
  'file-search': FileSearch,
  server: Server,
};

export const McpSection = () => {
  const { t } = useTranslation('week17');
  const servers = t('mcp.servers', { returnObjects: true }) as any[];

  return (
    <SectionCard
      badge={{ label: t('mcp.badge'), color: 'blue' }}
      title={t('mcp.title')}
      description={t('mcp.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('mcp.whatIsTitle')} icon iconColor="blue">
          <InfoBox variant="blue" title={t('mcp.conceptTitle')}>
            <p className="text-sm leading-relaxed">
              {t('mcp.conceptDesc')}
            </p>
          </InfoBox>

          <DemoBox label={t('mcp.architectureLabel')}>
            <McpArchitectureVisualizer />
          </DemoBox>
        </SubSection>

        <SubSection title={t('mcp.serversTitle')} icon iconColor="purple">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {servers.map((server: any) => {
              const IconComponent = serverIconMap[server.icon as keyof typeof serverIconMap] || Server;
              return (
                <div
                  key={server.name}
                  className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <IconComponent className="w-5 h-5 text-purple-600" />
                    <h5 className="font-bold text-sm text-purple-800">{server.name}</h5>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{server.desc}</p>
                  <code className="text-xs bg-purple-100 px-2 py-0.5 rounded text-purple-700">
                    {server.example}
                  </code>
                </div>
              );
            })}
          </div>
        </SubSection>

        <SubSection title={t('mcp.configTitle')} icon iconColor="green">
          <CodeBlock
            code={`// ~/.claude/settings.json 또는 .claude/settings.json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost:5432/mydb"
      }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_xxxx"
      }
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-playwright"]
    }
  }
}`}
            language="json"
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('mcp.usageTitle')} icon iconColor="orange">
          <CodeBlock
            code={`# DB 쿼리 실행
claude "users 테이블에서 최근 7일간 가입한 사용자 통계를 조회해줘"
# → AI가 직접 DB 쿼리 실행

# 브라우저 테스트
claude "localhost:3000에서 로그인 플로우를 테스트하고 스크린샷 찍어줘"
# → AI가 브라우저 열고 직접 테스트

# GitHub 연동
claude "이 브랜치로 PR 만들고, 관련 이슈에 코멘트 달아줘"
# → AI가 GitHub API 직접 호출

# 문서 검색
claude "Next.js 15의 새로운 캐싱 동작에 대해 공식 문서를 참고해서 설명해줘"
# → AI가 최신 문서 검색 후 답변`}
            language="bash"
            className="text-xs"
          />

          <InfoBox variant="green" title={t('mcp.tipsTitle')}>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>{t('mcp.tips.tip1')}</li>
              <li>{t('mcp.tips.tip2')}</li>
              <li>{t('mcp.tips.tip3')}</li>
            </ul>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};

import { Bot, Brain, GitBranch, User, Wrench, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

const toolIconMap = {
  bot: Bot,
  zap: Zap,
  brain: Brain,
  'git-branch': GitBranch,
  wrench: Wrench,
  user: User,
};

export const AiAgentsSection = () => {
  const { t } = useTranslation('week17');
  const tools = t('aiAgents.tools', { returnObjects: true }) as any[];
  const strengths = t('aiAgents.strengths', {
    returnObjects: true,
  }) as string[];
  const humanTasks = t('aiAgents.humanTasks', {
    returnObjects: true,
  }) as string[];

  return (
    <SectionCard
      badge={{ label: t('aiAgents.badge'), color: 'purple' }}
      title={t('aiAgents.title')}
      description={t('aiAgents.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('aiAgents.evolutionTitle')}
          icon
          iconColor="purple"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold text-sm text-gray-700 mb-2">
                {t('aiAgents.toolsEra')}
              </h4>
              <ul className="space-y-1 text-xs text-gray-600">
                <li>• {t('aiAgents.toolsFeatures.autocomplete')}</li>
                <li>• {t('aiAgents.toolsFeatures.singleFile')}</li>
                <li>• {t('aiAgents.toolsFeatures.manualPrompt')}</li>
                <li>• {t('aiAgents.toolsFeatures.limitedContext')}</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-bold text-sm text-purple-700 mb-2">
                {t('aiAgents.agentsEra')}
              </h4>
              <ul className="space-y-1 text-xs text-purple-600">
                <li>• {t('aiAgents.agentsFeatures.autonomous')}</li>
                <li>• {t('aiAgents.agentsFeatures.multiFile')}</li>
                <li>• {t('aiAgents.agentsFeatures.toolIntegration')}</li>
                <li>• {t('aiAgents.agentsFeatures.selfCorrection')}</li>
              </ul>
            </div>
          </div>
        </SubSection>

        <SubSection
          title={t('aiAgents.toolsComparisonTitle')}
          icon
          iconColor="blue"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {tools.map((tool: any) => {
              const IconComponent =
                toolIconMap[tool.icon as keyof typeof toolIconMap] || Bot;
              return (
                <div
                  key={tool.name}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <IconComponent className="w-4 h-4 text-blue-600" />
                    <h5 className="font-bold text-xs text-blue-800">
                      {tool.name}
                    </h5>
                  </div>
                  <p className="text-xs text-gray-600">{tool.desc}</p>
                </div>
              );
            })}
          </div>
        </SubSection>

        <SubSection
          title={t('aiAgents.capabilitiesTitle')}
          icon
          iconColor="green"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-bold text-sm text-green-700 mb-2 flex items-center gap-2">
                <Bot className="w-4 h-4" />
                {t('aiAgents.aiGoodAt')}
              </h4>
              <ul className="space-y-1">
                {strengths.map((item: string) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-xs text-green-700"
                  >
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-bold text-sm text-orange-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                {t('aiAgents.humanRequired')}
              </h4>
              <ul className="space-y-1">
                {humanTasks.map((item: string) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-xs text-orange-700"
                  >
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <InfoBox variant="orange" title={t('aiAgents.importantNote')}>
            <p className="text-sm leading-relaxed">
              {t('aiAgents.importantNoteDesc')}
            </p>
          </InfoBox>
        </SubSection>

        <CodeBlock
          code={`// AI 에이전트에게 태스크 요청 예시
claude "사용자 인증 기능을 구현해줘:
       - JWT 기반 인증
       - 리프레시 토큰 구현
       - 로그인/로그아웃 API
       - 프론트엔드 컴포넌트"

// AI가 자동으로 수행:
// 1. 프로젝트 구조 분석
// 2. 기존 패턴에 맞춰 코드 생성
// 3. 필요한 파일들 생성/수정
// 4. 테스트 코드 작성
// 5. 결과 검증`}
          language="bash"
          className="text-xs"
        />
      </div>
    </SectionCard>
  );
};

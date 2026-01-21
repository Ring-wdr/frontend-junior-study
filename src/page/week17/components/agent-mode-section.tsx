import { useTranslation } from 'react-i18next';
import { FileSearch } from 'lucide-react';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const AgentModeSection = () => {
  const { t } = useTranslation('week17');
  const subAgents = t('agentMode.subAgents', { returnObjects: true }) as any[];

  return (
    <SectionCard
      badge={{ label: t('agentMode.badge'), color: 'purple' }}
      title={t('agentMode.title')}
      description={t('agentMode.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('agentMode.basicUsageTitle')} icon iconColor="purple">
          <CodeBlock
            code={`# 단순 질문
claude "이 함수가 뭘 하는지 설명해줘"

# 에이전트 태스크
claude "사용자 인증 기능을 구현해줘" --agent

# 백그라운드 실행
claude "테스트 전체 실행하고 실패하면 수정해줘" --background`}
            language="bash"
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('agentMode.planModeTitle')} icon iconColor="purple">
          <InfoBox variant="purple" title={t('agentMode.planModeInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('agentMode.planModeInfoDesc')}
            </p>
          </InfoBox>

          <CodeBlock
            code={`claude "대규모 리팩토링이 필요해" --plan

# AI가 먼저 계획을 세우고 승인을 요청:
# 1. 영향받는 파일 목록
# 2. 변경 순서
# 3. 예상 위험도
# 사용자 승인 후 실행`}
            language="bash"
            className="mt-4 text-xs"
          />
        </SubSection>

        <SubSection title={t('agentMode.subAgentsTitle')} icon iconColor="blue">
          <div className="grid grid-cols-2 gap-3">
            {subAgents.map((agent: any) => (
              <div
                key={agent.name}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100"
              >
                <div className="flex items-center gap-2 mb-1">
                  <FileSearch className="w-4 h-4 text-blue-600" />
                  <h5 className="font-bold text-xs text-blue-800">{agent.name}</h5>
                </div>
                <p className="text-xs text-gray-600">{agent.desc}</p>
              </div>
            ))}
          </div>

          <CodeBlock
            code={`claude "이 프로젝트의 성능을 분석하고 개선해줘"

# 메인 에이전트가 서브에이전트 생성:
# - Explore 에이전트: 코드베이스 분석
# - Bash 에이전트: 벤치마크 실행
# - Plan 에이전트: 개선 계획 수립
# 결과를 종합하여 최적화 수행`}
            language="bash"
            className="mt-4 text-xs"
          />
        </SubSection>

        <SubSection title={t('agentMode.cursorTitle')} icon iconColor="pink">
          <InfoBox variant="purple" title={t('agentMode.cursorInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('agentMode.cursorInfoDesc')}
            </p>
          </InfoBox>

          <CodeBlock
            code={`// .cursor/rules
## 코드 스타일
- 항상 TypeScript strict 모드 준수
- 함수형 컴포넌트만 사용
- any 타입 금지

## 자동 작업
- 파일 생성 시 테스트 파일도 함께 생성
- import 정리는 항상 실행

## 금지 사항
- console.log 프로덕션 코드에 금지
- inline 스타일 금지`}
            language="markdown"
            className="mt-4 text-xs"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};

import { useTranslation } from 'react-i18next';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const WorkflowsSection = () => {
  const { t } = useTranslation('week17');

  return (
    <SectionCard
      badge={{ label: t('workflows.badge'), color: 'teal' }}
      title={t('workflows.title')}
      description={t('workflows.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('workflows.featureDevTitle')} icon iconColor="blue">
          <InfoBox variant="blue" title={t('workflows.featureDevInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('workflows.featureDevInfoDesc')}
            </p>
          </InfoBox>

          <CodeBlock
            code={`# 1. 요구사항 분석
claude "PRD.md를 읽고 필요한 기술적 작업 목록을 만들어줘"

# 2. 설계
claude "작업 목록을 바탕으로 구현 계획을 세워줘" --plan

# 3. 구현
claude "승인된 계획대로 구현해줘"

# 4. 테스트
claude "구현한 기능에 대한 테스트를 작성하고 실행해줘"

# 5. 리뷰
claude "변경사항을 리뷰하고 개선점을 제안해줘"

# 6. 커밋
claude "/commit"  # skill 사용`}
            language="bash"
            className="mt-4 text-xs"
          />
        </SubSection>

        <SubSection title={t('workflows.bugFixTitle')} icon iconColor="orange">
          <CodeBlock
            code={`# 에러 정보와 함께 요청
claude "이 에러를 수정해줘:

       Error: Cannot read property 'user' of undefined
       at AuthGuard (src/guards/auth.guard.ts:15)

       재현 조건: 로그아웃 후 보호된 페이지 접근"

# AI가 수행하는 작업:
# 1. 에러 위치 파악
# 2. 관련 코드 분석
# 3. 원인 진단
# 4. 수정 적용
# 5. 테스트로 검증`}
            language="bash"
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('workflows.codeReviewTitle')} icon iconColor="purple">
          <CodeBlock
            code={`# PR 리뷰 요청
claude "현재 브랜치의 변경사항을 main과 비교해서 리뷰해줘.
       특히 확인해줄 것:
       - 보안 취약점
       - 성능 이슈
       - 타입 안정성
       - 테스트 커버리지"

# MCP로 GitHub 연동 시
claude "PR #123을 리뷰하고 코멘트를 달아줘"`}
            language="bash"
            className="text-xs"
          />

          <InfoBox variant="green" title={t('workflows.automationTips')}>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>{t('workflows.tips.tip1')}</li>
              <li>{t('workflows.tips.tip2')}</li>
              <li>{t('workflows.tips.tip3')}</li>
            </ul>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};

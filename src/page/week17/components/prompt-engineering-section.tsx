import { useTranslation } from 'react-i18next';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const PromptEngineeringSection = () => {
  const { t } = useTranslation('week17');

  return (
    <SectionCard
      badge={{ label: t('promptEngineering.badge'), color: 'pink' }}
      title={t('promptEngineering.title')}
      description={t('promptEngineering.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('promptEngineering.goalOrientedTitle')}
          icon
          iconColor="pink"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-bold text-sm text-red-700 mb-2">
                {t('promptEngineering.badExample')}
              </h4>
              <CodeBlock
                code={`// 단계별 지시 (비추천)
"1. 먼저 파일을 읽어
 2. 그 다음 함수를 찾아
 3. 타입을 추가해"`}
                language="text"
                className="text-xs"
              />
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-bold text-sm text-green-700 mb-2">
                {t('promptEngineering.goodExample')}
              </h4>
              <CodeBlock
                code={`// 목표 중심 (추천)
"이 모듈의 모든 함수에
TypeScript 타입을 추가해줘.
기존 동작은 변경하지 말고,
타입 추론이 가능한 곳은
명시하지 않아도 돼."`}
                language="text"
                className="text-xs"
              />
            </div>
          </div>
        </SubSection>

        <SubSection
          title={t('promptEngineering.contextTitle')}
          icon
          iconColor="purple"
        >
          <InfoBox
            variant="purple"
            title={t('promptEngineering.contextInfoTitle')}
          >
            <p className="text-sm leading-relaxed">
              {t('promptEngineering.contextInfoDesc')}
            </p>
          </InfoBox>

          <CodeBlock
            code={`# 파일 직접 참조
claude "src/utils/validation.ts 파일의 함수들을 리팩토링해줘"

# 패턴 참조
claude "@src/components/Button 과 같은 패턴으로 Input 컴포넌트 만들어줘"

# 문서 참조
claude "README의 API 문서를 보고 클라이언트 코드 생성해줘"`}
            language="bash"
            className="mt-4 text-xs"
          />
        </SubSection>

        <SubSection
          title={t('promptEngineering.constraintsTitle')}
          icon
          iconColor="orange"
        >
          <CodeBlock
            code={`claude "인증 미들웨어를 구현해줘.
       제약:
       - 외부 라이브러리 사용 금지 (jose만 허용)
       - 기존 User 타입 활용
       - 에러는 커스텀 AppError로 throw"`}
            language="bash"
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('promptEngineering.iterativeTitle')}
          icon
          iconColor="blue"
        >
          <InfoBox
            variant="blue"
            title={t('promptEngineering.iterativeInfoTitle')}
          >
            <p className="text-sm leading-relaxed">
              {t('promptEngineering.iterativeInfoDesc')}
            </p>
          </InfoBox>

          <CodeBlock
            code={`# 1차: 큰 그림
claude "결제 시스템 아키텍처를 설계해줘"

# 2차: 세부 구현
claude "방금 설계한 아키텍처에서
       PaymentService 클래스를 구현해줘"

# 3차: 엣지 케이스
claude "결제 실패 시 재시도 로직과
       부분 환불 케이스를 추가해줘"

# 피드백 기반 수정
claude "방금 만든 코드에서:
       - 에러 핸들링이 너무 단순해
       - 로깅이 없어
       - 타입이 any로 되어있는 부분 수정해줘"`}
            language="bash"
            className="mt-4 text-xs"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};

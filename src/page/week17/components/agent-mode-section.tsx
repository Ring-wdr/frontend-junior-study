import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  FileSearch,
  FileText,
  LayoutGrid,
  MessageSquare,
  Play,
  RotateCcw,
  Send,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const AgentModeSection = () => {
  const { t } = useTranslation('week17');
  const subAgents = t('agentMode.subAgents', { returnObjects: true }) as any[];
  const withGenerative = t('agentMode.teamsWithGenerative', {
    returnObjects: true,
  }) as string[];
  const withoutGenerative = t('agentMode.teamsWithoutGenerative', {
    returnObjects: true,
  }) as string[];
  const teamsVsSubAgentsParallelItems = t(
    'agentMode.teamsVsSubAgentsParallelItems',
    {
      returnObjects: true,
    },
  ) as string[];
  const teamsVsSubAgentsTeamsItems = t('agentMode.teamsVsSubAgentsTeamsItems', {
    returnObjects: true,
  }) as string[];
  const scenarioMaxStep = Math.max(
    teamsVsSubAgentsParallelItems.length,
    teamsVsSubAgentsTeamsItems.length,
  );
  const [scenarioStep, setScenarioStep] = useState(0);

  const nextStep = () => {
    setScenarioStep((prev) => Math.min(prev + 1, scenarioMaxStep));
  };

  const [teamsEnabled, setTeamsEnabled] = useState(true);

  const resetScenario = () => {
    setScenarioStep(0);
  };

  const progressWidth =
    scenarioMaxStep > 0 ? (scenarioStep / scenarioMaxStep) * 100 : 0;

  return (
    <SectionCard
      badge={{ label: t('agentMode.badge'), color: 'purple' }}
      title={t('agentMode.title')}
      description={t('agentMode.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('agentMode.basicUsageTitle')}
          icon
          iconColor="purple"
        >
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

        <SubSection
          title={t('agentMode.planModeTitle')}
          icon
          iconColor="purple"
        >
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

        <SubSection
          title={t('agentMode.interviewModeTitle')}
          icon
          iconColor="blue"
        >
          <InfoBox variant="blue" title={t('agentMode.interviewModeInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('agentMode.interviewModeInfoDesc')}
            </p>
          </InfoBox>

          <CodeBlock
            code={`claude "현재 로그인 테스트 커버리지를 점검해줘"

# Interview mode (대화형) 실행
claude --interview "로그인 플로우를 리팩토링했어. 아래 항목을 단계별로 검토해줘:
1) 실패 재현 조건
2) 원인 후보
3) 수정 제안
4) 적용 후 검증 스텝"`}
            language="bash"
            className="mt-4 text-xs"
          />

          <InfoBox variant="green" title={t('agentMode.interviewModeTipTitle')}>
            <p className="text-sm leading-relaxed">
              {t('agentMode.interviewModeTipDesc')}
            </p>
          </InfoBox>
        </SubSection>

        <SubSection title={t('agentMode.teamsTitle')} icon iconColor="purple">
          <InfoBox variant="purple" title={t('agentMode.teamsCompareTitle')}>
            <p className="text-sm leading-relaxed">
              {t('agentMode.teamsDescription')}
            </p>
          </InfoBox>

          <DemoBox label={t('agentMode.teamsCompareTitle')}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-700">
                  {t('agentMode.teamsSharedPrompt')}
                </p>
                <div className="inline-flex rounded-md border border-indigo-200 bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setTeamsEnabled(true)}
                    className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                      teamsEnabled
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 hover:bg-indigo-50'
                    }`}
                  >
                    {t('agentMode.teamsWithGenerativeBadge')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setTeamsEnabled(false)}
                    className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                      !teamsEnabled
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 hover:bg-indigo-50'
                    }`}
                  >
                    {t('agentMode.teamsWithoutGenerativeBadge')}
                  </button>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700">
                {t('agentMode.teamsSharedPromptText')}
              </div>

              <div className="rounded-xl border border-indigo-200 bg-white p-4">
                <div className="flex items-center gap-2 mb-3">
                  <LayoutGrid className="w-4 h-4 text-indigo-700" />
                  <h5 className="font-bold text-sm text-indigo-900">
                    {teamsEnabled
                      ? t('agentMode.teamsWithGenerativeTitle')
                      : t('agentMode.teamsWithoutGenerativeTitle')}
                  </h5>
                  <span
                    className={`ml-auto text-[11px] px-2 py-0.5 rounded-full ${
                      teamsEnabled
                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                        : 'bg-orange-100 text-orange-700 border border-orange-200'
                    }`}
                  >
                    {teamsEnabled
                      ? t('agentMode.teamsWithGenerativeBadge')
                      : t('agentMode.teamsWithoutGenerativeBadge')}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={teamsEnabled ? 'teams-on' : 'teams-off'}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    <p className="text-[11px] font-semibold text-indigo-700 uppercase tracking-wide">
                      {teamsEnabled
                        ? t('agentMode.teamsVisualOutputTitle')
                        : t('agentMode.teamsTextOutputTitle')}
                    </p>

                    <div className="rounded-lg border border-indigo-200/80 bg-white p-3">
                      {(teamsEnabled ? withGenerative : withoutGenerative).map(
                        (item: string, index: number) => (
                          <div
                            key={item}
                            className="relative flex gap-3 py-2 first:pt-0 last:pb-0"
                          >
                            <div className="relative flex-shrink-0">
                              <div className="w-7 h-7 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 flex items-center justify-center">
                                {index === 0 && (
                                  <MessageSquare className="w-4 h-4" />
                                )}
                                {index === 1 &&
                                  (teamsEnabled ? (
                                    <Send className="w-4 h-4" />
                                  ) : (
                                    <FileText className="w-4 h-4" />
                                  ))}
                                {index === 2 &&
                                  (teamsEnabled ? (
                                    <FileText className="w-4 h-4" />
                                  ) : (
                                    <Send className="w-4 h-4" />
                                  ))}
                                {index >= 3 && (
                                  <CheckCircle2 className="w-4 h-4" />
                                )}
                              </div>
                              {index !==
                                (teamsEnabled
                                  ? withGenerative
                                  : withoutGenerative
                                ).length -
                                  1 && (
                                <div className="absolute left-1/2 top-7 h-4 -translate-x-1/2 border-l-2 border-dashed border-indigo-200" />
                              )}
                            </div>
                            <p className="text-xs leading-relaxed text-gray-800 pt-1.5">
                              <span className="font-bold mr-1">
                                {index + 1}.
                              </span>
                              {item}
                            </p>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-[11px] text-indigo-700">
                      <ArrowRight className="w-4 h-4" />
                      <span>
                        {teamsEnabled
                          ? t('agentMode.teamsWithGenerativeToken')
                          : t('agentMode.teamsWithoutGenerativeToken')}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </DemoBox>
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
                  <h5 className="font-bold text-xs text-blue-800">
                    {agent.name}
                  </h5>
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

        <SubSection
          title={t('agentMode.teamsVsSubAgentsTitle')}
          icon
          iconColor="blue"
        >
          <InfoBox
            variant="blue"
            title={t('agentMode.teamsVsSubAgentsCompareTitle')}
          >
            <p className="text-sm leading-relaxed">
              {t('agentMode.teamsVsSubAgentsIntro')}
            </p>
            <p className="text-sm leading-relaxed mt-3 text-gray-700">
              {t('agentMode.teamsVsSubAgentsPrompt')}
            </p>
          </InfoBox>

          <DemoBox label={t('agentMode.teamsVsSubAgentsCompareTitle')}>
            <div className="rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-indigo-900">
                    {t('agentMode.teamsVsSubAgentsPrompt')}
                  </p>
                  <p className="text-xs text-indigo-700 mt-1">
                    {scenarioStep === 0
                      ? t('agentMode.teamsVsSubAgentsReadyHint')
                      : `${t('agentMode.teamsVsSubAgentsStepLabel')} ${scenarioStep}/${scenarioMaxStep}`}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={scenarioStep >= scenarioMaxStep}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium bg-indigo-600 text-white disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Play className="w-3.5 h-3.5" />
                    {t('agentMode.teamsVsSubAgentsNextStep')}
                  </button>
                  <button
                    type="button"
                    onClick={resetScenario}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {t('agentMode.teamsVsSubAgentsReset')}
                  </button>
                </div>
              </div>

              <div className="mt-3 h-1.5 bg-white rounded-full overflow-hidden border border-indigo-100">
                <motion.div
                  initial={false}
                  animate={{ width: `${progressWidth}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-blue-500"
                />
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3">
                <div className="rounded-xl border border-indigo-200 bg-white p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="w-4 h-4 text-indigo-700" />
                    <h5 className="font-semibold text-sm text-indigo-800">
                      {t('agentMode.teamsVsSubAgentsParallelTitle')}
                    </h5>
                  </div>

                  <ul className="space-y-2">
                    {teamsVsSubAgentsParallelItems.map((item, index) => {
                      const isDone = scenarioStep > index + 1;
                      const isActive = scenarioStep === index + 1;
                      return (
                        <motion.li
                          key={`parallel-${item}`}
                          initial={{ opacity: 0.5, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 }}
                          className={`rounded-lg border p-2.5 text-xs leading-relaxed ${
                            isActive
                              ? 'border-indigo-300 bg-indigo-50 text-indigo-900'
                              : isDone
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                                : 'border-gray-200 bg-white text-gray-600'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                            ) : isActive ? (
                              <ArrowRight className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                            ) : (
                              <span className="w-4 h-4 text-[11px] rounded-full border border-gray-300 text-gray-400 flex items-center justify-center mt-0.5 shrink-0">
                                {index + 1}
                              </span>
                            )}
                            <span className="font-medium">{item}</span>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>

                  <p className="mt-3 text-[11px] text-indigo-700">
                    {t('agentMode.teamsVsSubAgentsParallelToken')}
                  </p>
                </div>

                <div className="hidden md:flex items-center justify-center">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                    VS
                  </span>
                </div>

                <div className="rounded-xl border border-purple-200 bg-white p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Send className="w-4 h-4 text-purple-700" />
                    <h5 className="font-semibold text-sm text-purple-800">
                      {t('agentMode.teamsVsSubAgentsTeamsTitle')}
                    </h5>
                  </div>

                  <ul className="space-y-2">
                    {teamsVsSubAgentsTeamsItems.map((item, index) => {
                      const isDone = scenarioStep > index + 1;
                      const isActive = scenarioStep === index + 1;
                      return (
                        <motion.li
                          key={`teams-${item}`}
                          initial={{ opacity: 0.5, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 }}
                          className={`rounded-lg border p-2.5 text-xs leading-relaxed ${
                            isActive
                              ? 'border-purple-300 bg-purple-50 text-purple-900'
                              : isDone
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                                : 'border-gray-200 bg-white text-gray-600'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                            ) : isActive ? (
                              <ArrowRight className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                            ) : (
                              <span className="w-4 h-4 text-[11px] rounded-full border border-gray-300 text-gray-400 flex items-center justify-center mt-0.5 shrink-0">
                                {index + 1}
                              </span>
                            )}
                            <span className="font-medium">{item}</span>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>

                  <p className="mt-3 text-[11px] text-purple-700">
                    {t('agentMode.teamsVsSubAgentsTeamsToken')}
                  </p>
                </div>
              </div>
            </div>
          </DemoBox>

          <CodeBlock
            code={`claude "로그인 회복 시나리오를 설계하고 3개 대안을 비교해줘"

# 병렬형(Sub-Agent)
claude "성능/테스트/코드 안정성 관점에서 3가지 점검 항목만 제안"

# 의사결정형(Teams)
claude "요구사항 변화 기반으로 UX/우선순위 관점에서 대안을 비교하고 최종 선택 기준을 제시해줘"`}
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

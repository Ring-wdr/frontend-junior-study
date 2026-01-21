import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const SkillsHooksSection = () => {
  const { t } = useTranslation('week17');
  const hooks = t('skillsHooks.hookTypes', { returnObjects: true }) as any[];
  const skills = t('skillsHooks.skillExamples', { returnObjects: true }) as any[];

  return (
    <SectionCard
      badge={{ label: t('skillsHooks.badge'), color: 'green' }}
      title={t('skillsHooks.title')}
      description={t('skillsHooks.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('skillsHooks.skillsTitle')} icon iconColor="green">
          <InfoBox variant="green" title={t('skillsHooks.skillsInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('skillsHooks.skillsInfoDesc')}
            </p>
          </InfoBox>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {skills.map((skill: any) => (
              <div
                key={skill.name}
                className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-green-600" />
                  <code className="text-xs font-bold text-green-700">{skill.name}</code>
                </div>
                <p className="text-xs text-gray-600">{skill.desc}</p>
              </div>
            ))}
          </div>

          <CodeBlock
            code={`<!-- .claude/skills/create-component/SKILL.md -->
# Create Component Skill

## 트리거
사용자가 "컴포넌트 만들어줘" 또는 "/component" 입력 시

## 워크플로우
1. 컴포넌트 이름과 위치 확인
2. 프로젝트의 기존 컴포넌트 패턴 분석
3. 동일한 패턴으로 새 컴포넌트 생성:
   - TypeScript 인터페이스
   - 스타일 파일 (CSS Modules / Tailwind)
   - 테스트 파일
   - Storybook 스토리
4. barrel export 업데이트`}
            language="markdown"
            className="mt-4 text-xs"
          />
        </SubSection>

        <SubSection title={t('skillsHooks.hooksTitle')} icon iconColor="orange">
          <InfoBox variant="orange" title={t('skillsHooks.hooksInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('skillsHooks.hooksInfoDesc')}
            </p>
          </InfoBox>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-orange-50">
                  <th className="px-3 py-2 text-left font-semibold text-orange-800 border-b border-orange-200">Hook</th>
                  <th className="px-3 py-2 text-left font-semibold text-orange-800 border-b border-orange-200">{t('skillsHooks.table.timing')}</th>
                  <th className="px-3 py-2 text-left font-semibold text-orange-800 border-b border-orange-200">{t('skillsHooks.table.usage')}</th>
                </tr>
              </thead>
              <tbody>
                {hooks.map((hook: any, idx: number) => (
                  <tr key={hook.name} className={idx % 2 === 0 ? 'bg-white' : 'bg-orange-50/50'}>
                    <td className="px-3 py-2 font-mono text-orange-700 border-b border-orange-100">{hook.name}</td>
                    <td className="px-3 py-2 text-gray-600 border-b border-orange-100">{hook.timing}</td>
                    <td className="px-3 py-2 text-gray-600 border-b border-orange-100">{hook.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <CodeBlock
            code={`// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          { "type": "command", "command": "prettier --write $FILE_PATH" },
          { "type": "command", "command": "eslint --fix $FILE_PATH" }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "if echo '$TOOL_INPUT' | grep -q 'rm -rf /'; then exit 1; fi"
          }
        ]
      }
    ]
  }
}`}
            language="json"
            className="mt-4 text-xs"
          />
        </SubSection>

        <SubSection title={t('skillsHooks.claudeMdTitle')} icon iconColor="blue">
          <InfoBox variant="blue" title={t('skillsHooks.claudeMdInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('skillsHooks.claudeMdInfoDesc')}
            </p>
          </InfoBox>

          <CodeBlock
            code={`<!-- CLAUDE.md -->
# 프로젝트: E-commerce Platform

## 기술 스택
- Next.js 15 (App Router)
- TypeScript 5.x
- Tailwind CSS + shadcn/ui
- Prisma + PostgreSQL

## 코드 컨벤션
- 컴포넌트: PascalCase, 폴더별 index.ts barrel export
- 훅: use 접두사, src/hooks 폴더
- 타입: src/types 폴더, interface 선호

## 중요 규칙
- 서버 컴포넌트 기본, 클라이언트는 'use client' 명시
- API 라우트는 src/app/api 하위에 구성

## 자주 사용하는 명령어
- \`pnpm dev\`: 개발 서버
- \`pnpm test\`: 테스트 실행`}
            language="markdown"
            className="mt-4 text-xs"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};

import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const VerificationSection = () => {
  const { t } = useTranslation('week17');
  const checklist = t('verification.checklist', {
    returnObjects: true,
  }) as string[];
  const guidelines = t('verification.teamGuidelines', {
    returnObjects: true,
  }) as any;

  return (
    <SectionCard
      badge={{ label: t('verification.badge'), color: 'orange' }}
      title={t('verification.title')}
      description={t('verification.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('verification.autoVerifyTitle')}
          icon
          iconColor="blue"
        >
          <InfoBox variant="blue" title={t('verification.autoVerifyInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('verification.autoVerifyInfoDesc')}
            </p>
          </InfoBox>

          <CodeBlock
            code={`// Hook으로 자동 검증 설정
{
  "PostToolUse": [
    {
      "matcher": "Write|Edit",
      "hooks": [
        { "type": "command", "command": "npx tsc --noEmit" },
        { "type": "command", "command": "npx eslint $FILE_PATH" },
        { "type": "command", "command": "npx jest --findRelatedTests $FILE_PATH" }
      ]
    }
  ]
}`}
            language="json"
            className="mt-4 text-xs"
          />
        </SubSection>

        <SubSection
          title={t('verification.manualCheckTitle')}
          icon
          iconColor="orange"
        >
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-bold text-sm text-orange-700 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {t('verification.checklistTitle')}
            </h4>
            <ul className="space-y-2">
              {checklist.map((item: string) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-orange-800"
                >
                  <input
                    type="checkbox"
                    className="mt-0.5 rounded border-orange-300"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </SubSection>

        <SubSection
          title={t('verification.permissionsTitle')}
          icon
          iconColor="red"
        >
          <CodeBlock
            code={`// .claude/settings.json
{
  "permissions": {
    "allowedTools": ["Read", "Write", "Edit", "Glob", "Grep"],
    "deniedTools": ["Bash"],  // 위험한 명령 차단
    "allowedPaths": ["src/**", "tests/**"],
    "deniedPaths": [".env*", "secrets/**"]
  }
}

// MCP 서버 권한 제한
{
  "mcpServers": {
    "postgres": {
      "command": "...",
      "env": {
        "DATABASE_URL": "...",
        "READONLY": "true"  // 읽기 전용 모드
      }
    }
  }
}`}
            language="json"
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('verification.teamGuidelinesTitle')}
          icon
          iconColor="purple"
        >
          <div className="space-y-3">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-bold text-sm text-green-700 mb-2">
                {guidelines.allowed.title}
              </h4>
              <ul className="space-y-1">
                {guidelines.allowed.items.map((item: string) => (
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
              <h4 className="font-bold text-sm text-orange-700 mb-2">
                {guidelines.required.title}
              </h4>
              <ul className="space-y-1">
                {guidelines.required.items.map((item: string) => (
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

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-bold text-sm text-red-700 mb-2">
                {guidelines.prohibited.title}
              </h4>
              <ul className="space-y-1">
                {guidelines.prohibited.items.map((item: string) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-xs text-red-700"
                  >
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <InfoBox variant="orange" title={t('verification.importantNote')}>
            <p className="text-sm leading-relaxed">
              {t('verification.importantNoteDesc')}
            </p>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};

'use client';

import { useTranslation } from '@/i18n/client';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const GitHubActionsSection = () => {
  const { t, raw } = useTranslation('week21');
  const triggers = raw('githubActions.triggers');
  const options = raw('githubActions.security');

  return (
    <SectionCard
      badge={{ label: t('githubActions.badge'), color: 'indigo' }}
      description={t('githubActions.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('githubActions.triggersTitle')}
          icon
          iconColor="blue"
        >
          <div className="space-y-2">
            {triggers.map((trigger) => (
              <div
                key={trigger.label}
                className="rounded-lg border border-indigo-100 bg-indigo-50 p-3"
              >
                <p className="font-medium text-indigo-900">{trigger.label}</p>
                <p className="text-sm text-indigo-800 mt-1">{trigger.detail}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection
          title={t('githubActions.syntaxTitle')}
          icon
          iconColor="purple"
        >
          <DemoBox label={t('githubActions.workflowLabel')}>
            <CodeBlock
              language="yaml"
              code={t('githubActions.workflowYaml')}
              className="text-xs"
            />
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('githubActions.securityTitle')}
          icon
          iconColor="orange"
        >
          <ul className="space-y-1 text-sm text-gray-700 list-disc pl-5">
            {options.map((option) => (
              <li key={option}>{option}</li>
            ))}
          </ul>
        </SubSection>

        <InfoBox variant="blue" title={t('githubActions.noteTitle')}>
          {t('githubActions.note')}
        </InfoBox>
      </div>
    </SectionCard>
  );
};

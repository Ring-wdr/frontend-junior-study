import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

type Trigger = {
  label: string;
  detail: string;
};

export const GitHubActionsSection = () => {
  const { t } = useTranslation('week21');
  const triggers = t('githubActions.triggers', {
    returnObjects: true,
  }) as unknown as Trigger[];
  const options = t('githubActions.security', {
    returnObjects: true,
  }) as string[];

  return (
    <SectionCard
      badge={{ label: t('githubActions.badge'), color: 'indigo' }}
      title={t('githubActions.title')}
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

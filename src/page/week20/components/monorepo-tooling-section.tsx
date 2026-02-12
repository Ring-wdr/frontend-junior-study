import { useTranslation } from 'react-i18next';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

type Tooling = {
  name: string;
  strength: string;
  complexity: string;
  fit: string;
};

export const MonorepoToolingSection = () => {
  const { t } = useTranslation('week20');
  const toolings = t('monorepoTooling.tools', {
    returnObjects: true,
  }) as unknown as Tooling[];

  return (
    <SectionCard
      badge={{ label: t('monorepoTooling.badge'), color: 'pink' }}
      title={t('monorepoTooling.title')}
      description={t('monorepoTooling.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('monorepoTooling.compareTitle')}
          icon
          iconColor="pink"
        >
          <div className="space-y-3">
            {toolings.map((tool) => (
              <div
                key={tool.name}
                className="rounded-xl border border-pink-100 bg-pink-50 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-sm font-bold text-pink-900">
                    {tool.name}
                  </h4>
                  <span className="rounded-md bg-white px-2 py-1 text-[11px] font-medium text-pink-800">
                    {tool.complexity}
                  </span>
                </div>
                <p className="text-xs text-pink-800 mt-2">{tool.strength}</p>
                <p className="text-xs text-pink-700 mt-1">{tool.fit}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection
          title={t('monorepoTooling.workspaceTitle')}
          icon
          iconColor="blue"
        >
          <CodeBlock
            language="yaml"
            code={`# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'`}
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('monorepoTooling.turboTitle')}
          icon
          iconColor="green"
        >
          <CodeBlock
            language="json"
            code={`{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {}
  }
}`}
            className="text-xs"
          />
        </SubSection>

        <InfoBox variant="gray" title={t('monorepoTooling.tipTitle')}>
          <p>{t('monorepoTooling.tip')}</p>
        </InfoBox>
      </div>
    </SectionCard>
  );
};

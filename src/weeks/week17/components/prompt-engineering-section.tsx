'use client';

import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const PromptEngineeringSection = () => {
  const { t } = useTranslation('week17');

  return (
    <SectionCard
      badge={{ label: t('promptEngineering.badge'), color: 'pink' }}
      description={t('promptEngineering.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('promptEngineering.goalOrientedTitle')}
          icon
          iconColor="pink"
        >
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            {t('promptEngineering.goalOrientedDesc')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-bold text-sm text-red-700 mb-2">
                {t('promptEngineering.badExample')}
              </h4>
              <CodeBlock
                code={t('promptEngineering.badCode')}
                language="text"
                className="text-xs"
              />
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-bold text-sm text-green-700 mb-2">
                {t('promptEngineering.goodExample')}
              </h4>
              <CodeBlock
                code={t('promptEngineering.goodCode')}
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
            code={t('promptEngineering.contextCode')}
            language="bash"
            className="mt-4 text-xs"
          />
        </SubSection>

        <SubSection
          title={t('promptEngineering.constraintsTitle')}
          icon
          iconColor="orange"
        >
          <InfoBox
            variant="orange"
            title={t('promptEngineering.constraintsInfoTitle')}
          >
            <p className="text-sm leading-relaxed">
              {t('promptEngineering.constraintsInfoDesc')}
            </p>
          </InfoBox>

          <CodeBlock
            code={t('promptEngineering.constraintsCode')}
            language="bash"
            className="mt-4 text-xs"
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
            code={t('promptEngineering.iterativeCode')}
            language="bash"
            className="mt-4 text-xs"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};

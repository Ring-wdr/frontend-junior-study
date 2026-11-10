'use client';

import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const TokenOptimizationSection = () => {
  const { t, raw } = useTranslation('week17');
  const checklist = raw('tokenOptimization.contextOptimizationChecklist');

  return (
    <SectionCard
      badge={{ label: t('tokenOptimization.badge'), color: 'teal' }}
      description={t('tokenOptimization.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('tokenOptimization.contextOptimizationTitle')}
          icon
          iconColor="green"
        >
          <InfoBox
            variant="green"
            title={t('tokenOptimization.contextOptimizationInfoTitle')}
          >
            <p className="text-sm leading-relaxed">
              {t('tokenOptimization.contextOptimizationInfoDesc')}
            </p>
          </InfoBox>

          <CodeBlock
            code={t('tokenOptimization.contextOptimizationCode')}
            language="bash"
            className="mt-4 text-xs"
          />

          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                {item}
              </li>
            ))}
          </ul>
        </SubSection>
      </div>
    </SectionCard>
  );
};

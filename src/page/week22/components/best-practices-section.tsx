import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';
import { ErrorClassificationVisualizer } from './error-classification-visualizer';

type Classification = {
  severity: string;
  description: string;
  examples: string;
  handling: string;
};

const severityColors: Record<string, string> = {
  LOW: 'border-gray-200 bg-gray-50 text-gray-700',
  MEDIUM: 'border-yellow-200 bg-yellow-50 text-yellow-800',
  HIGH: 'border-orange-200 bg-orange-50 text-orange-800',
  CRITICAL: 'border-red-200 bg-red-50 text-red-800',
};

export const BestPracticesSection = () => {
  const { t } = useTranslation('week22');
  const classifications = t('bestPractices.classifications', {
    returnObjects: true,
  }) as unknown as Classification[];

  return (
    <SectionCard
      badge={{ label: t('bestPractices.badge'), color: 'blue' }}
      title={t('bestPractices.title')}
      description={t('bestPractices.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('bestPractices.globalTitle')}
          icon
          iconColor="blue"
        >
          <DemoBox label={t('bestPractices.globalTitle')}>
            <CodeBlock
              code={t('bestPractices.globalCode')}
              language="typescript"
              className="text-xs"
            />
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('bestPractices.boundaryTitle')}
          icon
          iconColor="purple"
        >
          <DemoBox label={t('bestPractices.boundaryTitle')}>
            <CodeBlock
              code={t('bestPractices.boundaryCode')}
              language="tsx"
              className="text-xs"
            />
          </DemoBox>
          <div className="mt-4">
            <DemoBox label="Usage">
              <CodeBlock
                code={t('bestPractices.boundaryUsage')}
                language="tsx"
                className="text-xs"
              />
            </DemoBox>
          </div>
        </SubSection>

        <SubSection
          title={t('bestPractices.classificationTitle')}
          icon
          iconColor="green"
        >
          <div className="space-y-3">
            {classifications.map((c) => (
              <div
                key={c.severity}
                className={`rounded-xl border p-4 ${severityColors[c.severity] || 'border-gray-200 bg-gray-50'}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-white/60">
                    {c.severity}
                  </span>
                  <span className="text-sm font-semibold">{c.description}</span>
                </div>
                <p className="text-xs mb-1">
                  <strong>Examples:</strong> {c.examples}
                </p>
                <p className="text-xs">
                  <strong>Handling:</strong> {c.handling}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <DemoBox label={t('bestPractices.classificationTitle')}>
              <CodeBlock
                code={t('bestPractices.classificationCode')}
                language="typescript"
                className="text-xs"
              />
            </DemoBox>
          </div>
        </SubSection>

        <SubSection title="Classification Flow Simulator" icon iconColor="green">
          <DemoBox label="Interactive Demo">
            <ErrorClassificationVisualizer />
          </DemoBox>
        </SubSection>

        <InfoBox variant="blue" title={t('bestPractices.noteTitle')}>
          {t('bestPractices.note')}
        </InfoBox>
      </div>
    </SectionCard>
  );
};

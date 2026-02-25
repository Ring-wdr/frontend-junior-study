import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

type Feature = { title: string; desc: string };

export const SentrySection = () => {
  const { t } = useTranslation('week22');
  const features = t('sentry.features', {
    returnObjects: true,
  }) as unknown as Feature[];

  return (
    <SectionCard
      badge={{ label: t('sentry.badge'), color: 'orange' }}
      title={t('sentry.title')}
      description={t('sentry.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('sentry.featuresTitle')} icon iconColor="blue">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-red-100 bg-red-50 p-4"
              >
                <h4 className="text-sm font-semibold text-red-900 mb-2">
                  {f.title}
                </h4>
                <p className="text-sm text-red-800">{f.desc}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title={t('sentry.setupTitle')} icon iconColor="purple">
          <DemoBox label={t('sentry.setupTitle')}>
            <CodeBlock
              code={t('sentry.setupCode')}
              language="typescript"
              className="text-xs"
            />
          </DemoBox>
        </SubSection>

        <SubSection title={t('sentry.captureTitle')} icon iconColor="green">
          <DemoBox label={t('sentry.captureTitle')}>
            <CodeBlock
              code={t('sentry.captureCode')}
              language="typescript"
              className="text-xs"
            />
          </DemoBox>
        </SubSection>

        <SubSection title={t('sentry.reactTitle')} icon iconColor="orange">
          <DemoBox label={t('sentry.reactTitle')}>
            <CodeBlock
              code={t('sentry.reactCode')}
              language="tsx"
              className="text-xs"
            />
          </DemoBox>
        </SubSection>

        <SubSection title={t('sentry.sourceMapTitle')} icon iconColor="pink">
          <DemoBox label={t('sentry.sourceMapTitle')}>
            <CodeBlock
              code={t('sentry.sourceMapCode')}
              language="typescript"
              className="text-xs"
            />
          </DemoBox>
        </SubSection>

        <InfoBox variant="red" title={t('sentry.noteTitle')}>
          {t('sentry.note')}
        </InfoBox>
      </div>
    </SectionCard>
  );
};

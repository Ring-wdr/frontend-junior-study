import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';
import { SessionReplayVisualizer } from './session-replay-visualizer';

type WhatIsItem = { label: string; desc: string };
type PrivacyItem = { concern: string; solution: string };

export const SessionReplaySection = () => {
  const { t } = useTranslation('week22');
  const whatIsItems = t('sessionReplay.whatIsItems', {
    returnObjects: true,
  }) as unknown as WhatIsItem[];
  const privacyItems = t('sessionReplay.privacyItems', {
    returnObjects: true,
  }) as unknown as PrivacyItem[];

  return (
    <SectionCard
      badge={{ label: t('sessionReplay.badge'), color: 'purple' }}
      title={t('sessionReplay.title')}
      description={t('sessionReplay.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('sessionReplay.whatIsTitle')}
          icon
          iconColor="purple"
        >
          <div className="space-y-3">
            {whatIsItems.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-purple-100 bg-purple-50 p-4"
              >
                <p className="text-sm font-semibold text-purple-900 mb-1">
                  {item.label}
                </p>
                <p className="text-sm text-purple-800">{item.desc}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="Session Replay Demo" icon iconColor="purple">
          <DemoBox label="Interactive Demo">
            <SessionReplayVisualizer />
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('sessionReplay.sentryReplayTitle')}
          icon
          iconColor="blue"
        >
          <DemoBox label={t('sessionReplay.sentryReplayTitle')}>
            <CodeBlock
              code={t('sessionReplay.sentryReplayCode')}
              language="typescript"
              className="text-xs"
            />
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('sessionReplay.logRocketTitle')}
          icon
          iconColor="green"
        >
          <DemoBox label={t('sessionReplay.logRocketTitle')}>
            <CodeBlock
              code={t('sessionReplay.logRocketCode')}
              language="typescript"
              className="text-xs"
            />
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('sessionReplay.integrationTitle')}
          icon
          iconColor="orange"
        >
          <DemoBox label={t('sessionReplay.integrationTitle')}>
            <CodeBlock
              code={t('sessionReplay.integrationCode')}
              language="typescript"
              className="text-xs"
            />
          </DemoBox>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {privacyItems.map((item) => (
              <div
                key={item.concern}
                className="rounded-xl border border-orange-100 bg-orange-50 p-4"
              >
                <p className="text-sm font-semibold text-orange-900 mb-1">
                  {item.concern}
                </p>
                <p className="text-sm text-orange-800">{item.solution}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <InfoBox variant="purple" title={t('sessionReplay.noteTitle')}>
          {t('sessionReplay.note')}
        </InfoBox>
      </div>
    </SectionCard>
  );
};

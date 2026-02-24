import { Trans, useTranslation } from 'react-i18next';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const TailwindSection = () => {
  const { t } = useTranslation('week6');
  return (
    <SectionCard
      badge={{ label: t('tailwind.badge'), color: 'blue' }}
      title={t('tailwind.title')}
      description={t('tailwind.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('tailwind.utilityFirst.title')}
          icon
          iconColor="blue"
        >
          <p className="text-sm text-gray-700 mb-4">
            {t('tailwind.utilityFirst.content')}
          </p>
          <CodeBlock
            code={`<!-- Traditional CSS -->
<div class="chat-notification">
  <div class="chat-notification-logo-wrapper">
    <img class="chat-notification-logo" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div class="chat-notification-content">
    <h4 class="chat-notification-title">ChitChat</h4>
    <p class="chat-notification-message">You have a new message!</p>
  </div>
</div>

<!-- Tailwind CSS -->
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div class="shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-slate-500">You have a new message!</p>
  </div>
</div>`}
            language="html"
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('tailwind.keyFeatures.title')}
          icon
          iconColor="blue"
        >
          <InfoBox variant="blue" title={t('tailwind.keyFeatures.infoTitle')}>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                <strong>{t('tailwind.keyFeatures.jit')}</strong>{' '}
                {t('tailwind.keyFeatures.jitDesc')}
              </li>
              <li>
                <strong>{t('tailwind.keyFeatures.standardization')}</strong>{' '}
                {t('tailwind.keyFeatures.standardizationDesc')}
              </li>
              <li>
                <strong>{t('tailwind.keyFeatures.responsiveness')}</strong>{' '}
                <Trans
                  t={t}
                  i18nKey="tailwind.keyFeatures.responsivenessDesc"
                  components={{ code: <code /> }}
                />
              </li>
              <li>
                <strong>{t('tailwind.keyFeatures.darkMode')}</strong>{' '}
                <Trans
                  t={t}
                  i18nKey="tailwind.keyFeatures.darkModeDesc"
                  components={{ code: <code /> }}
                />
              </li>
            </ul>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};

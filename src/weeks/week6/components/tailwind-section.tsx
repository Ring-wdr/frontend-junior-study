'use client';

import { Trans, useTranslation } from '@/i18n/client';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { TextList } from './text-list';

const ENGINE_CODE = `/* Source: class="p-4 p-2 flex md:flex text-red-500" and class="p-4 px-2" */
@layer theme, base, components, utilities;

@layer utilities {
  .flex { display: flex; }
  .p-2 { padding: calc(var(--spacing) * 2); }
  .p-4 { padding: calc(var(--spacing) * 4); }
  .px-2 { padding-inline: calc(var(--spacing) * 2); }
  .text-red-500 { color: var(--color-red-500); }
  @media (width >= 48rem) {
    .md\\:flex { display: flex; }
  }
}`;

const MERGE_CODE = `import { twMerge } from 'tailwind-merge';

twMerge('p-2 p-4');           // 'p-4'
twMerge('px-2 py-1 p-4');     // 'p-4': the shorthand removes both
twMerge('p-4 px-2');          // 'p-4 px-2': a refinement is kept
twMerge('text-red-500 text-lg text-blue-500');
// 'text-lg text-blue-500': color and size are different groups
twMerge('hover:bg-red-500 bg-blue-500 hover:bg-green-500');
// 'bg-blue-500 hover:bg-green-500': variants are compared separately`;

export const TailwindSection = () => {
  const { t, raw } = useTranslation('week6');
  return (
    <SectionCard
      badge={{ label: t('tailwind.badge'), color: 'blue' }}
      description={t('tailwind.description')}
      testId="tailwind-section"
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

        <SubSection title={t('tailwind.engine.title')} icon iconColor="blue">
          <div className="space-y-3">
            <TextList items={raw('tailwind.engine.steps')} ordered />
            <CodeBlock code={ENGINE_CODE} language="css" className="text-xs" />
            <p className="text-sm text-gray-700">{t('tailwind.engine.note')}</p>
          </div>
        </SubSection>

        <SubSection title={t('tailwind.conflict.title')} icon iconColor="blue">
          <div className="space-y-3 text-sm text-gray-700">
            <p>{t('tailwind.conflict.body')}</p>
            <p>{t('tailwind.conflict.mergeBody')}</p>
            <CodeBlock code={MERGE_CODE} className="text-xs" />
            <InfoBox variant="green">{t('tailwind.conflict.note')}</InfoBox>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

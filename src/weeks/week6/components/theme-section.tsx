'use client';

import { Trans, useTranslation } from '@/i18n/client';
import { SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

const FLASH_CODE = `<head>
  <script>
    const saved = localStorage.getItem('theme');
    const dark = saved
      ? saved === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  </script>
</head>`;

export const ThemeSection = () => {
  const { t } = useTranslation('week6');
  return (
    <SectionCard
      badge={{ label: t('theme.badge'), color: 'purple' }}
      description={t('theme.description')}
      testId="theme-section"
    >
      <div className="space-y-8">
        <SubSection
          title={t('theme.cssVariables.title')}
          icon
          iconColor="purple"
        >
          <p className="text-sm text-gray-700 mb-4">
            <Trans
              t={t}
              i18nKey="theme.cssVariables.content"
              components={{ code: <code /> }}
            />
          </p>

          <CodeBlock
            code={`/* globals.css */
:root {
  --bg-primary: #ffffff;
  --text-primary: #000000;
}

[data-theme='dark'] {
  --bg-primary: #1a1a1a;
  --text-primary: #ffffff;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}`}
            language="css"
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('theme.tailwindDarkMode.title')}
          icon
          iconColor="purple"
        >
          <p className="text-sm text-gray-700 mb-4">
            <Trans
              t={t}
              i18nKey="theme.tailwindDarkMode.content"
              components={{ code: <code /> }}
            />
          </p>

          <CodeBlock
            code={`/* app.css (Tailwind v4) */
@import "tailwindcss";

/* dark: now applies under class="dark" on <html> */
@custom-variant dark (&:where(.dark, .dark *));`}
            language="css"
            className="text-xs"
          />
          <CodeBlock
            code={`<div class="bg-white dark:bg-slate-800 rounded-lg p-6 ring-1 ring-slate-900/5 shadow-xl">
  <h3 class="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">Writes Upside-Down</h3>
  <p class="text-slate-500 dark:text-slate-400 mt-2 text-sm">
    The Zero Gravity Pen can be used to write in any orientation, including upside-down.
  </p>
</div>`}
            language="html"
            className="text-xs mt-4"
          />
        </SubSection>

        <SubSection title={t('theme.flash.title')} icon iconColor="purple">
          <div className="space-y-3">
            <p className="text-sm text-gray-700">{t('theme.flash.body')}</p>
            <CodeBlock code={FLASH_CODE} language="html" className="text-xs" />
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

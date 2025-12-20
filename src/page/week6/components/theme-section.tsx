import { useTranslation } from 'react-i18next';
import { SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const ThemeSection = () => {
  const { t } = useTranslation('week6');
  return (
    <SectionCard
      badge={{ label: t('theme.badge'), color: 'purple' }}
      title={t('theme.title')}
      description={t('theme.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('theme.cssVariables.title')} icon iconColor="purple">
          <p className="text-sm text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: t('theme.cssVariables.content') }} />

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

        <SubSection title={t('theme.tailwindDarkMode.title')} icon iconColor="purple">
          <p className="text-sm text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: t('theme.tailwindDarkMode.content') }} />

          <CodeBlock
            code={`// tailwind.config.js
module.exports = {
  darkMode: 'class', // manually toggle via class="dark" on html
  // ...
}`}
            language="javascript"
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
      </div>
    </SectionCard>
  );
};

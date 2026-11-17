'use client';

import { Trans, useTranslation } from '@/i18n/client';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { TextList } from './text-list';

const COMPILE_INPUT = `/* Button.module.css */
.button { color: white; }
.icon { margin-right: 8px; }
.primary { composes: button; background: blue; }
:global(.dark) .button { color: black; }`;

const COMPILE_OUTPUT = `// What \`import styles from './Button.module.css'\` receives
{
  button: 'Button-module_button__yrx1x',
  icon: 'Button-module_icon__8HSa0',
  primary: 'Button-module_primary__X49dh Button-module_button__yrx1x',
}

/* Emitted stylesheet */
.Button-module_button__yrx1x { color: white; }
.Button-module_icon__8HSa0 { margin-right: 8px; }
.Button-module_primary__X49dh { background: blue; }
.dark .Button-module_button__yrx1x { color: black; }`;

export const CssModulesSection = () => {
  const { t, raw } = useTranslation('week6');
  return (
    <SectionCard
      badge={{ label: t('cssModules.badge'), color: 'green' }}
      description={t('cssModules.description')}
      testId="css-modules-section"
    >
      <div className="space-y-8">
        <SubSection
          title={t('cssModules.scopedStyles.title')}
          icon
          iconColor="green"
        >
          <p className="text-sm text-gray-700 mb-4">
            <Trans
              t={t}
              i18nKey="cssModules.scopedStyles.content"
              components={{ code: <code /> }}
            />
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="min-w-0">
              <h4 className="text-xs font-semibold mb-2">Button.module.css</h4>
              <CodeBlock
                code={`.button {
  background: blue;
  color: white;
  padding: 10px 20px;
}

.icon {
  margin-right: 8px;
}`}
                language="css"
                className="text-xs"
              />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-semibold mb-2">Button.tsx</h4>
              <CodeBlock
                code={`import styles from './Button.module.css';

export function Button() {
  // Becomes something like: Button_button__3abc
  return (
    <button className={styles.button}>
      Click me
    </button>
  );
}`}
                language="tsx"
                className="text-xs"
              />
            </div>
          </div>
        </SubSection>

        <SubSection
          title={t('cssModules.benefits.title')}
          icon
          iconColor="green"
        >
          <InfoBox variant="green" title={t('cssModules.benefits.infoTitle')}>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                <strong>{t('cssModules.benefits.localScope')}</strong>{' '}
                <Trans
                  t={t}
                  i18nKey="cssModules.benefits.localScopeDesc"
                  components={{ code: <code /> }}
                />
              </li>
              <li>
                <strong>{t('cssModules.benefits.reuse')}</strong>{' '}
                {t('cssModules.benefits.reuseDesc')}
              </li>
              <li>
                <strong>{t('cssModules.benefits.learning')}</strong>{' '}
                {t('cssModules.benefits.learningDesc')}
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection
          title={t('cssModules.compile.title')}
          icon
          iconColor="green"
        >
          <div className="space-y-3">
            <TextList items={raw('cssModules.compile.steps')} ordered />
            <CodeBlock
              code={COMPILE_INPUT}
              language="css"
              className="text-xs"
            />
            <CodeBlock code={COMPILE_OUTPUT} className="text-xs" />
            <p className="text-sm text-gray-700">
              {t('cssModules.compile.note')}
            </p>
          </div>
        </SubSection>

        <SubSection title={t('cssModules.dedupe.title')} icon iconColor="green">
          <TextList items={raw('cssModules.dedupe.points')} />
        </SubSection>
      </div>
    </SectionCard>
  );
};

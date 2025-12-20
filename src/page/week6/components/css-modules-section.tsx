import { Trans, useTranslation } from 'react-i18next';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const CssModulesSection = () => {
  const { t } = useTranslation('week6');
  return (
    <SectionCard
      badge={{ label: t('cssModules.badge'), color: 'green' }}
      title={t('cssModules.title')}
      description={t('cssModules.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('cssModules.scopedStyles.title')} icon iconColor="green">
          <p className="text-sm text-gray-700 mb-4"><Trans t={t} i18nKey="cssModules.scopedStyles.content" components={{ code: <code /> }} /></p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
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
            <div>
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

        <SubSection title={t('cssModules.benefits.title')} icon iconColor="green">
          <InfoBox variant="green" title={t('cssModules.benefits.infoTitle')}>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                <strong>{t('cssModules.benefits.localScope')}</strong> <Trans t={t} i18nKey="cssModules.benefits.localScopeDesc" components={{ code: <code /> }} />
              </li>
              <li>
                <strong>{t('cssModules.benefits.reuse')}</strong> {t('cssModules.benefits.reuseDesc')}
              </li>
              <li>
                <strong>{t('cssModules.benefits.learning')}</strong> {t('cssModules.benefits.learningDesc')}
              </li>
            </ul>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};

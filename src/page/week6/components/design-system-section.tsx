import { useTranslation } from 'react-i18next';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const DesignSystemSection = () => {
  const { t } = useTranslation('week6');
  return (
    <SectionCard
      badge={{ label: t('designSystem.badge'), color: 'blue' }}
      title={t('designSystem.title')}
      description={t('designSystem.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('designSystem.whatAreTokens.title')}
          icon
          iconColor="blue"
        >
          <p className="text-sm text-gray-700 mb-4">
            {t('designSystem.whatAreTokens.content')}
          </p>
          <CodeBlock
            code={`:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-text: #1f2937;
  
  /* Spacing */
  --space-sm: 0.5rem;
  --space-md: 1rem;
  
  /* Usage */
  --radius-default: 4px;
}`}
            language="css"
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('designSystem.whyUse.title')}
          icon
          iconColor="purple"
        >
          <InfoBox variant="gray" title={t('designSystem.whyUse.infoTitle')}>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                <strong>{t('designSystem.whyUse.consistency')}</strong>{' '}
                {t('designSystem.whyUse.consistencyDesc')}
              </li>
              <li>
                <strong>{t('designSystem.whyUse.maintainability')}</strong>{' '}
                {t('designSystem.whyUse.maintainabilityDesc')}
              </li>
              <li>
                <strong>{t('designSystem.whyUse.communication')}</strong>{' '}
                {t('designSystem.whyUse.communicationDesc')}
              </li>
            </ul>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};

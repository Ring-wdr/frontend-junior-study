import { Trans, useTranslation } from 'react-i18next';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const ResponsiveSection = () => {
  const { t } = useTranslation('week6');
  return (
    <SectionCard
      badge={{ label: t('responsive.badge'), color: 'orange' }}
      title={t('responsive.title')}
      description={t('responsive.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('responsive.mobileFirst.title')} icon iconColor="orange">
          <p className="text-sm text-gray-700 mb-4"><Trans t={t} i18nKey="responsive.mobileFirst.content" components={{ code: <code /> }} /></p>

          <CodeBlock
            code={`<!-- 
  Default: block (mobile)
  md (768px): flex (tablet)
-->
<div class="block md:flex">
  <div class="w-full md:w-1/2">Sidebar</div>
  <div class="w-full md:w-1/2">Content</div>
</div>`}
            language="html"
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('responsive.toolsTechniques.title')} icon iconColor="orange">
          <div className="grid grid-cols-1 gap-4">
            <InfoBox variant="orange" title={t('responsive.toolsTechniques.infoTitle')}>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>{t('responsive.toolsTechniques.breakpoints')}</strong> {t('responsive.toolsTechniques.breakpointsDesc')}
                </li>
                <li>
                  <strong>{t('responsive.toolsTechniques.fluidTypography')}</strong> <Trans t={t} i18nKey="responsive.toolsTechniques.fluidTypographyDesc" components={{ code: <code /> }} />
                </li>
                <li>
                  <strong>{t('responsive.toolsTechniques.artDirection')}</strong> <Trans t={t} i18nKey="responsive.toolsTechniques.artDirectionDesc" components={{ code: <code /> }} />
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

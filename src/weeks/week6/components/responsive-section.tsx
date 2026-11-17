'use client';

import { Trans, useTranslation } from '@/i18n/client';
import {
  ContentGrid,
  InfoBox,
  SectionCard,
  SubSection,
} from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

const MODERN_CODE = `.card-list { container-type: inline-size; }

@container (width >= 28rem) {
  .card { display: grid; grid-template-columns: 8rem 1fr; }
}

.hero { min-height: 100dvh; }
.title { margin-inline-start: 1rem; }

/* Tailwind: class="@container" on the parent, class="@md:grid" on the child */`;

export const ResponsiveSection = () => {
  const { t, raw } = useTranslation('week6');
  return (
    <SectionCard
      badge={{ label: t('responsive.badge'), color: 'orange' }}
      description={t('responsive.description')}
      testId="responsive-section"
    >
      <div className="space-y-8">
        <SubSection
          title={t('responsive.mobileFirst.title')}
          icon
          iconColor="orange"
        >
          <p className="text-sm text-gray-700 mb-4">
            <Trans
              t={t}
              i18nKey="responsive.mobileFirst.content"
              components={{ code: <code /> }}
            />
          </p>

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

        <SubSection
          title={t('responsive.toolsTechniques.title')}
          icon
          iconColor="orange"
        >
          <div className="grid grid-cols-1 gap-4">
            <InfoBox
              variant="orange"
              title={t('responsive.toolsTechniques.infoTitle')}
            >
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>{t('responsive.toolsTechniques.breakpoints')}</strong>{' '}
                  {t('responsive.toolsTechniques.breakpointsDesc')}
                </li>
                <li>
                  <strong>
                    {t('responsive.toolsTechniques.fluidTypography')}
                  </strong>{' '}
                  <Trans
                    t={t}
                    i18nKey="responsive.toolsTechniques.fluidTypographyDesc"
                    components={{ code: <code /> }}
                  />
                </li>
                <li>
                  <strong>
                    {t('responsive.toolsTechniques.artDirection')}
                  </strong>{' '}
                  <Trans
                    t={t}
                    i18nKey="responsive.toolsTechniques.artDirectionDesc"
                    components={{ code: <code /> }}
                  />
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection
          title={t('responsive.modern.title')}
          icon
          iconColor="orange"
        >
          <ContentGrid items={raw('responsive.modern.items')} columns={1} />
          <CodeBlock code={MODERN_CODE} language="css" className="text-xs" />
        </SubSection>
      </div>
    </SectionCard>
  );
};

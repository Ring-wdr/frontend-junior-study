import { useTranslation } from 'react-i18next';
import { InfoBox, SectionCard, SubSection } from '../../../components';

export const AccessibilitySection = () => {
  const { t } = useTranslation('week6');
  return (
    <SectionCard
      badge={{ label: t('accessibility.badge'), color: 'orange' }}
      title={t('accessibility.title')}
      description={t('accessibility.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('accessibility.checklist.title')} icon iconColor="red">
          <InfoBox variant="red" title={t('accessibility.checklist.infoTitle')}>
            <ul className="list-disc pl-5 space-y-3 text-sm text-gray-700">
              <li>
                <strong>{t('accessibility.checklist.focusRings')}</strong> <span dangerouslySetInnerHTML={{ __html: t('accessibility.checklist.focusRingsDesc') }} />
                <br />
                <code className="bg-red-50 px-1 rounded text-red-600 text-xs mt-1 block w-fit">
                  focus-visible:ring-2
                </code>
              </li>
              <li>
                <strong>{t('accessibility.checklist.contrast')}</strong> {t('accessibility.checklist.contrastDesc')}
              </li>
              <li>
                <strong>{t('accessibility.checklist.reducedMotion')}</strong> {t('accessibility.checklist.reducedMotionDesc')}
                <br />
                <code className="bg-gray-100 px-1 rounded text-xs mt-1 block w-fit">
                  @media (prefers-reduced-motion: reduce) &#123; * &#123;
                  animation: none !important; &#125; &#125;
                </code>
              </li>
              <li>
                <strong>{t('accessibility.checklist.colorAlone')}</strong> {t('accessibility.checklist.colorAloneDesc')}
              </li>
            </ul>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};

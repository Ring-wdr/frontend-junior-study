import { useTranslation } from 'react-i18next';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';

export const CiCdGovernanceSection = () => {
  const { t } = useTranslation('week21');
  const checks = t('governance.checklist', { returnObjects: true }) as string[];
  const security = t('governance.security', { returnObjects: true }) as string[];

  return (
    <SectionCard
      badge={{ label: t('governance.badge'), color: 'purple' }}
      title={t('governance.title')}
      description={t('governance.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('governance.checklistTitle')}
          icon
          iconColor="purple"
        >
          <ul className="space-y-1 text-sm text-gray-700 list-disc pl-5">
            {checks.map((check) => (
              <li key={check}>{check}</li>
            ))}
          </ul>
        </SubSection>

        <SubSection title={t('governance.securityTitle')} icon iconColor="blue">
          <ul className="space-y-1 text-sm text-gray-700 list-disc pl-5">
            {security.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SubSection>

        <InfoBox variant="green" title={t('governance.noteTitle')}>
          {t('governance.note')}
        </InfoBox>
      </div>
    </SectionCard>
  );
};

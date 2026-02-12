import { Check, Puzzle, ShieldCheck, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';

type Principle = {
  title: string;
  desc: string;
};

type AdoptionCase = {
  yes: string[];
  no: string[];
};

const iconMap = [Users, Puzzle, ShieldCheck];

export const MfeIntroSection = () => {
  const { t } = useTranslation('week20');
  const principles = t('mfeIntro.principles', {
    returnObjects: true,
  }) as unknown as Principle[];
  const adoption = t('mfeIntro.adoption', {
    returnObjects: true,
  }) as unknown as AdoptionCase;

  return (
    <SectionCard
      badge={{ label: t('mfeIntro.badge'), color: 'purple' }}
      title={t('mfeIntro.title')}
      description={t('mfeIntro.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('mfeIntro.principlesTitle')}
          icon
          iconColor="purple"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {principles.map((item, index) => {
              const Icon = iconMap[index] ?? Check;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-purple-100 bg-purple-50 p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-purple-700" />
                    <h4 className="text-sm font-semibold text-purple-900">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-purple-800 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </SubSection>

        <SubSection title={t('mfeIntro.whenToUseTitle')} icon iconColor="blue">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoBox variant="green" title={t('mfeIntro.recommendedTitle')}>
              <ul className="list-disc pl-5 space-y-1">
                {adoption.yes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </InfoBox>
            <InfoBox variant="red" title={t('mfeIntro.notRecommendedTitle')}>
              <ul className="list-disc pl-5 space-y-1">
                {adoption.no.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <InfoBox variant="blue" title={t('mfeIntro.keyPointTitle')}>
          <p className="leading-relaxed">{t('mfeIntro.keyPoint')}</p>
        </InfoBox>
      </div>
    </SectionCard>
  );
};

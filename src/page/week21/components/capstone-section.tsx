import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

type Outcome = {
  day: string;
  title: string;
  detail: string;
};

export const CiCdCapstoneSection = () => {
  const { t } = useTranslation('week21');
  const outcomes = t('capstone.outcomes', {
    returnObjects: true,
  }) as unknown as Outcome[];

  return (
    <SectionCard
      badge={{ label: t('capstone.badge'), color: 'green' }}
      title={t('capstone.title')}
      description={t('capstone.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('capstone.outcomeTitle')} icon iconColor="green">
          <div className="space-y-3">
            {outcomes.map((outcome) => (
              <div
                key={outcome.day}
                className="rounded-xl border border-green-100 bg-green-50 p-4"
              >
                <h4 className="text-sm font-semibold text-green-900 mb-1">
                  {outcome.title}
                </h4>
                <p className="text-sm text-green-800">{outcome.detail}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title={t('capstone.rolloutTitle')} icon iconColor="blue">
          <DemoBox label={t('capstone.planTitle')}>
            <CodeBlock
              language="yaml"
              code={t('capstone.planYaml')}
              className="text-xs"
            />
          </DemoBox>
        </SubSection>

        <SubSection title={t('capstone.checkTitle')} icon iconColor="orange">
          <p className="text-sm text-gray-600">{t('capstone.finalTip')}</p>
        </SubSection>
      </div>
    </SectionCard>
  );
};

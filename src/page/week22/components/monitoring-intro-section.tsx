import { useTranslation } from 'react-i18next';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';

type Principle = { title: string; desc: string };
type Comparison = { aspect: string; local: string; production: string };
type Problem = { problem: string; result: string };
type Framework = { term: string; definition: string; example: string };

export const MonitoringIntroSection = () => {
  const { t } = useTranslation('week22');
  const principles = t('monitoringIntro.principles', {
    returnObjects: true,
  }) as unknown as Principle[];
  const comparison = t('monitoringIntro.comparison', {
    returnObjects: true,
  }) as unknown as Comparison[];
  const problems = t('monitoringIntro.problems', {
    returnObjects: true,
  }) as unknown as Problem[];
  const framework = t('monitoringIntro.framework', {
    returnObjects: true,
  }) as unknown as Framework[];

  return (
    <SectionCard
      badge={{ label: t('monitoringIntro.badge'), color: 'blue' }}
      title={t('monitoringIntro.title')}
      description={t('monitoringIntro.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('monitoringIntro.principlesTitle')}
          icon
          iconColor="blue"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {principles.map((p) => (
              <div
                key={p.title}
                className="rounded-xl border border-blue-100 bg-blue-50 p-4"
              >
                <h4 className="text-sm font-semibold text-blue-900 mb-2">
                  {p.title}
                </h4>
                <p className="text-sm text-blue-800">{p.desc}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection
          title={t('monitoringIntro.comparisonTitle')}
          icon
          iconColor="purple"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700" />
                  <th className="text-left py-2 px-3 font-semibold text-green-700">
                    Local
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-red-700">
                    Production
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((c) => (
                  <tr
                    key={c.aspect}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="py-2 px-3 font-medium text-gray-800">
                      {c.aspect}
                    </td>
                    <td className="py-2 px-3 text-green-700">{c.local}</td>
                    <td className="py-2 px-3 text-red-700">{c.production}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection
          title={t('monitoringIntro.problemsTitle')}
          icon
          iconColor="orange"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {problems.map((p) => (
              <div
                key={p.problem}
                className="rounded-xl border border-orange-100 bg-orange-50 p-4"
              >
                <p className="text-sm font-semibold text-orange-900 mb-1">
                  {p.problem}
                </p>
                <p className="text-sm text-orange-800">{p.result}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection
          title={t('monitoringIntro.sliSloSlaTitle')}
          icon
          iconColor="green"
        >
          <div className="space-y-3">
            {framework.map((f) => (
              <div
                key={f.term}
                className="rounded-xl border border-green-100 bg-green-50 p-4"
              >
                <h4 className="text-sm font-semibold text-green-900 mb-1">
                  {f.term}
                </h4>
                <p className="text-sm text-green-800 mb-2">{f.definition}</p>
                <p className="text-xs text-green-600 italic">{f.example}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <InfoBox variant="blue" title={t('monitoringIntro.noteTitle')}>
          {t('monitoringIntro.note')}
        </InfoBox>
      </div>
    </SectionCard>
  );
};

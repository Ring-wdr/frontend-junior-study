import { GitBranch, Package, Repeat } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';

type Benefit = {
  title: string;
  desc: string;
};

type Comparison = {
  item: string;
  polyrepo: string;
  monorepo: string;
};

const icons = [GitBranch, Package, Repeat];

export const MonorepoBasicsSection = () => {
  const { t } = useTranslation('week20');
  const benefits = t('monorepoBasics.benefits', {
    returnObjects: true,
  }) as unknown as Benefit[];
  const comparison = t('monorepoBasics.comparison', {
    returnObjects: true,
  }) as unknown as Comparison[];

  return (
    <SectionCard
      badge={{ label: t('monorepoBasics.badge'), color: 'orange' }}
      title={t('monorepoBasics.title')}
      description={t('monorepoBasics.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('monorepoBasics.benefitsTitle')}
          icon
          iconColor="orange"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {benefits.map((benefit, index) => {
              const Icon = icons[index] ?? Package;
              return (
                <div
                  key={benefit.title}
                  className="rounded-xl border border-orange-100 bg-orange-50 p-4"
                >
                  <Icon className="h-4 w-4 text-orange-700 mb-2" />
                  <h4 className="text-sm font-semibold text-orange-900 mb-1">
                    {benefit.title}
                  </h4>
                  <p className="text-xs text-orange-800">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </SubSection>

        <SubSection
          title={t('monorepoBasics.compareTitle')}
          icon
          iconColor="red"
        >
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[520px] text-left text-xs">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">
                    {t('monorepoBasics.table.item')}
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    {t('monorepoBasics.table.polyrepo')}
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    {t('monorepoBasics.table.monorepo')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr
                    key={row.item}
                    className="border-t border-gray-200 bg-white"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {row.item}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{row.polyrepo}</td>
                    <td className="px-4 py-3 text-gray-700">{row.monorepo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SubSection>

        <InfoBox variant="orange" title={t('monorepoBasics.warningTitle')}>
          <p>{t('monorepoBasics.warning')}</p>
        </InfoBox>
      </div>
    </SectionCard>
  );
};

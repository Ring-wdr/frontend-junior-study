'use client';

import { useTranslation } from '@/i18n/client';
import { DemoBox, InfoBox, SectionCard, SubSection } from '../../../components';
import { AtomicMapDemo } from './atomic-map-demo';
import { MergePlayground } from './merge-playground';

export const MergingSection = () => {
  const { t, raw } = useTranslation('week6');
  const rows = raw('merging.table.rows');

  return (
    <SectionCard
      badge={{ label: t('merging.badge'), color: 'purple' }}
      description={t('merging.description')}
      testId="merging-section"
    >
      <div className="space-y-8">
        <SubSection title={t('merging.table.title')} icon iconColor="purple">
          <div className="not-prose overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full min-w-[36rem] border-collapse text-left text-xs">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    {t('merging.table.headers.approach')}
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    {t('merging.table.headers.map')}
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    {t('merging.table.headers.dedupe')}
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    {t('merging.table.headers.conflict')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.approach}
                    className="border-t border-gray-200 align-top text-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-3 py-2 font-semibold text-gray-900"
                    >
                      {row.approach}
                    </th>
                    <td className="px-3 py-2">{row.map}</td>
                    <td className="px-3 py-2">{row.dedupe}</td>
                    <td className="px-3 py-2">{row.conflict}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title={t('merging.atomic.title')} icon iconColor="purple">
          <p className="mb-4 text-sm text-gray-700">
            {t('merging.atomic.body')}
          </p>
          <DemoBox>
            <AtomicMapDemo />
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('merging.playground.title')}
          icon
          iconColor="purple"
        >
          <p className="mb-4 text-sm text-gray-700">
            {t('merging.playground.body')}
          </p>
          <DemoBox>
            <MergePlayground />
          </DemoBox>
        </SubSection>

        <InfoBox variant="purple" title={t('merging.takeaway.title')}>
          {t('merging.takeaway.content')}
        </InfoBox>
      </div>
    </SectionCard>
  );
};

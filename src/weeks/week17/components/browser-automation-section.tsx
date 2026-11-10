'use client';

import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

interface DataTableProps {
  columns: string[];
  rows: string[][];
}

const DataTable = ({ columns, rows }: DataTableProps) => (
  <div className="mt-4 overflow-x-auto">
    <table className="w-full text-xs">
      <thead>
        <tr className="bg-blue-50">
          {columns.map((column) => (
            <th
              key={column}
              className="px-3 py-2 text-left font-semibold text-blue-800 border-b border-blue-200"
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr
            key={row[0]}
            className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50/50'}
          >
            {row.map((cell, cellIdx) => (
              <td
                key={`${row[0]}-${columns[cellIdx]}`}
                className={
                  cellIdx === 0
                    ? 'px-3 py-2 font-semibold text-gray-800 border-b border-blue-100'
                    : 'px-3 py-2 text-gray-600 border-b border-blue-100'
                }
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const BrowserAutomationSection = () => {
  const { t, raw } = useTranslation('week17');
  const axes = raw('browserAutomation.overview.axes');
  const overviewHead = raw('browserAutomation.overview.head');
  const overviewRows = raw('browserAutomation.overview.rows');
  const egoItems = raw('browserAutomation.duo.egoItems');
  const egoHow = raw('browserAutomation.duo.egoHow');
  const egoAfter = raw('browserAutomation.duo.egoAfter');
  const asideItems = raw('browserAutomation.duo.asideItems');
  const compareItems = raw('browserAutomation.duo.compareItems');
  const categories = raw('browserAutomation.others.categories');
  const securityItems = raw('browserAutomation.security.items');
  const guideHead = raw('browserAutomation.guide.head');
  const guideRows = raw('browserAutomation.guide.rows');
  const habits = raw('browserAutomation.example.habits');

  return (
    <SectionCard
      badge={{ label: t('browserAutomation.badge'), color: 'blue' }}
      description={t('browserAutomation.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('browserAutomation.overview.title')}
          icon
          iconColor="blue"
        >
          <p className="text-sm leading-relaxed text-gray-700">
            {t('browserAutomation.overview.lead')}
          </p>
          <ol className="mt-2 list-decimal pl-5 space-y-1 text-sm text-gray-700">
            {axes.map((axis) => (
              <li key={axis}>{axis}</li>
            ))}
          </ol>
          <p className="mt-3 text-sm leading-relaxed text-gray-700">
            {t('browserAutomation.overview.tableLead')}
          </p>
          <DataTable
            columns={[
              overviewHead.category,
              overviewHead.tools,
              overviewHead.browser,
              overviewHead.view,
            ]}
            rows={overviewRows.map((row) => [
              row.category,
              row.tools,
              row.browser,
              row.view,
            ])}
          />
        </SubSection>

        <SubSection
          title={t('browserAutomation.duo.title')}
          icon
          iconColor="green"
        >
          <h4 className="font-bold text-sm text-green-800">
            {t('browserAutomation.duo.egoTitle')}
          </h4>
          <ul className="mt-2 space-y-2 text-sm text-gray-700">
            {egoItems.map((item) => (
              <li key={item.label}>
                <span className="font-bold text-green-700">{item.label}</span>
                {': '}
                {item.body}
              </li>
            ))}
          </ul>
          <CodeBlock
            code={t('browserAutomation.duo.egoCode')}
            language="bash"
            className="mt-4 text-xs"
          />
          <InfoBox
            variant="green"
            title={t('browserAutomation.duo.egoHowTitle')}
          >
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {egoHow.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </InfoBox>
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            {egoAfter.map((item) => (
              <li key={item.label}>
                <span className="font-bold text-green-700">{item.label}</span>
                {': '}
                {item.body}
              </li>
            ))}
          </ul>

          <h4 className="mt-8 font-bold text-sm text-green-800">
            {t('browserAutomation.duo.asideTitle')}
          </h4>
          <ul className="mt-2 space-y-2 text-sm text-gray-700">
            {asideItems.map((item) => (
              <li key={item.label}>
                <span className="font-bold text-green-700">{item.label}</span>
                {': '}
                {item.body}
              </li>
            ))}
          </ul>
          <CodeBlock
            code={t('browserAutomation.duo.asideCode')}
            language="bash"
            className="mt-4 text-xs"
          />
          <p className="mt-3 text-sm leading-relaxed text-gray-700">
            {t('browserAutomation.duo.asideMcp')}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            {t('browserAutomation.duo.asideExtra')}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            <span className="font-bold text-green-700">
              {t('browserAutomation.duo.asideCautionLabel')}
            </span>
            {': '}
            {t('browserAutomation.duo.asideCaution')}
          </p>

          <InfoBox
            variant="blue"
            title={t('browserAutomation.duo.compareTitle')}
          >
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {compareItems.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection
          title={t('browserAutomation.others.title')}
          icon
          iconColor="purple"
        >
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category.title}>
                <h4 className="font-bold text-sm text-purple-800">
                  {category.title}
                </h4>
                <ul className="mt-2 space-y-2 text-sm text-gray-700">
                  {category.items.map((item) => (
                    <li key={item.name}>
                      <span className="font-bold text-purple-700">
                        {item.name}
                      </span>
                      {': '}
                      {item.desc}
                    </li>
                  ))}
                </ul>
                {category.note !== '' && (
                  <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                    {category.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection
          title={t('browserAutomation.security.title')}
          icon
          iconColor="orange"
        >
          <InfoBox
            variant="orange"
            title={t('browserAutomation.security.title')}
          >
            <ul className="space-y-2 text-sm">
              {securityItems.map((item) => (
                <li key={item.name}>
                  <span className="font-bold">{item.name}</span>
                  {': '}
                  {item.desc}
                </li>
              ))}
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection
          title={t('browserAutomation.guide.title')}
          icon
          iconColor="blue"
        >
          <DataTable
            columns={[guideHead.situation, guideHead.pick, guideHead.reason]}
            rows={guideRows.map((row) => [row.situation, row.pick, row.reason])}
          />
        </SubSection>

        <SubSection
          title={t('browserAutomation.example.title')}
          icon
          iconColor="green"
        >
          <h4 className="font-bold text-sm text-green-800">
            {t('browserAutomation.example.promptTitle')}
          </h4>
          <CodeBlock
            code={t('browserAutomation.example.prompt')}
            language="text"
            className="mt-2 text-xs"
          />
          <h4 className="mt-4 font-bold text-sm text-green-800">
            {t('browserAutomation.example.egoTitle')}
          </h4>
          <p className="mt-1 text-xs text-gray-600 leading-relaxed">
            {t('browserAutomation.example.egoNote')}
          </p>
          <CodeBlock
            code={t('browserAutomation.example.egoCode')}
            language="bash"
            className="mt-2 text-xs"
          />
          <InfoBox
            variant="green"
            title={t('browserAutomation.example.habitsTitle')}
          >
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {habits.map((habit) => (
                <li key={habit}>{habit}</li>
              ))}
            </ul>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};

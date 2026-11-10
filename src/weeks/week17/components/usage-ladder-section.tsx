'use client';

import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

const Label = ({ children }: { children: string }) => (
  <h4 className="mt-4 font-bold text-sm text-gray-800">{children}</h4>
);

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-gray-700">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

const Para = ({ children }: { children: string }) => (
  <p className="mt-3 text-sm leading-relaxed text-gray-700">{children}</p>
);

const Code = ({ code, language }: { code: string; language: string }) => (
  <CodeBlock code={code} language={language} className="mt-3 text-xs" />
);

const DataTable = ({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) => (
  <div className="mt-3 overflow-x-auto">
    <table className="w-full text-xs">
      <thead>
        <tr className="bg-blue-50">
          {headers.map((header) => (
            <th
              key={header}
              className="px-3 py-2 text-left font-semibold text-blue-800 border-b border-blue-200"
            >
              {header}
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
                key={`${row[0]}-${headers[cellIdx]}`}
                className={
                  cellIdx === 0
                    ? 'px-3 py-2 font-semibold text-blue-700 border-b border-blue-100 align-top'
                    : 'px-3 py-2 text-gray-600 border-b border-blue-100 align-top'
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

export const UsageLadderSection = () => {
  const { t, raw } = useTranslation('week17');
  const overview = raw('usageLadder.overview');
  const labels = raw('usageLadder.labels');
  const s1 = raw('usageLadder.s1');
  const s2 = raw('usageLadder.s2');
  const s3 = raw('usageLadder.s3');
  const s4 = raw('usageLadder.s4');
  const s5 = raw('usageLadder.s5');
  const s6 = raw('usageLadder.s6');
  const herdr = raw('usageLadder.herdr');
  const orca = raw('usageLadder.orca');
  const compare = raw('usageLadder.compare');
  const s6end = raw('usageLadder.s6end');
  const wrap = raw('usageLadder.wrap');

  return (
    <SectionCard
      badge={{ label: t('usageLadder.badge'), color: 'indigo' }}
      description={t('usageLadder.description')}
    >
      <div className="space-y-8">
        <InfoBox variant="gray">
          <p className="text-sm leading-relaxed">{t('usageLadder.notice')}</p>
        </InfoBox>

        <SubSection
          title={t('usageLadder.overviewTitle')}
          icon
          iconColor="blue"
        >
          <InfoBox variant="blue" title={t('usageLadder.principleTitle')}>
            <p className="text-sm leading-relaxed">
              {t('usageLadder.principleBody')}
            </p>
          </InfoBox>
          <DataTable headers={overview.headers} rows={overview.rows} />
        </SubSection>

        <SubSection title={s1.title} icon iconColor="blue">
          <Label>{labels.does}</Label>
          <Para>{s1.does}</Para>
          <Label>{labels.command}</Label>
          <Code code={s1.code} language="bash" />
          <Label>{labels.habits}</Label>
          <Bullets items={s1.habits} />
          <Label>{labels.whenUp}</Label>
          <Para>{s1.when}</Para>
          <Label>{labels.mistakes}</Label>
          <Bullets items={s1.mistakes} />
        </SubSection>

        <SubSection title={s2.title} icon iconColor="green">
          <Label>{labels.does}</Label>
          <Para>{s2.rulesLead}</Para>
          <DataTable
            headers={s2.rulesTable.headers}
            rows={s2.rulesTable.rows}
          />
          <Para>{s2.rulesNote}</Para>
          <InfoBox variant="green" title={s2.claudeAgentsTitle}>
            <p className="text-sm leading-relaxed">{s2.claudeAgentsBody}</p>
          </InfoBox>
          <Label>{labels.command}</Label>
          <Code code={s2.claudeImportCode} language="markdown" />
          <Para>{s2.skillsLead}</Para>
          <Code code={s2.skillPathsCode} language="text" />
          <Code code={s2.skillFileCode} language="yaml" />
          <Para>{s2.skillUse}</Para>
          <Label>{labels.whenUp}</Label>
          <Para>{s2.when}</Para>
          <Label>{labels.mistakes}</Label>
          <Bullets items={s2.mistakes} />
        </SubSection>

        <SubSection title={s3.title} icon iconColor="orange">
          <Label>{labels.does}</Label>
          <Para>{s3.planLead}</Para>
          <Label>{labels.command}</Label>
          <Code code={s3.planCode} language="bash" />
          <Para>{s3.planNote}</Para>
          <Para>{s3.verifyLead}</Para>
          <Code code={s3.verifyCode} language="text" />
          <Para>{s3.headlessLead}</Para>
          <Code code={s3.headlessCode} language="bash" />
          <Para>{s3.hookNote}</Para>
          <Label>{labels.whenUp}</Label>
          <Para>{s3.when}</Para>
          <Label>{labels.mistakes}</Label>
          <Bullets items={s3.mistakes} />
        </SubSection>

        <SubSection title={s4.title} icon iconColor="purple">
          <Label>{labels.does}</Label>
          <Para>{s4.lead}</Para>
          <Code code={s4.promptCode} language="text" />
          <Label>{labels.command}</Label>
          <Para>{s4.locationsLead}</Para>
          <DataTable
            headers={s4.locationsTable.headers}
            rows={s4.locationsTable.rows}
          />
          <Para>{s4.exampleLead}</Para>
          <Code code={s4.exampleCode} language="markdown" />
          <Para>{s4.notes}</Para>
          <Label>{labels.whenUp}</Label>
          <Para>{s4.when}</Para>
          <Label>{labels.mistakes}</Label>
          <Bullets items={s4.mistakes} />
        </SubSection>

        <SubSection title={s5.title} icon iconColor="pink">
          <Label>{s5.worktreeTitle}</Label>
          <Para>{s5.worktreeLead}</Para>
          <Code code={s5.worktreeCode} language="bash" />
          <Para>{s5.toolLead}</Para>
          <Code code={s5.toolCode} language="bash" />
          <Para>{s5.cursorNote}</Para>
          <div className="mt-4">
            <InfoBox variant="orange" title={s5.cautionTitle}>
              <p className="text-sm leading-relaxed">{s5.caution}</p>
            </InfoBox>
          </div>
          <Label>{s5.bgTitle}</Label>
          <Para>{s5.bgLead}</Para>
          <Code code={s5.bgCode} language="bash" />
          <Para>{s5.bgStates}</Para>
          <Label>{s5.cloudTitle}</Label>
          <Bullets items={s5.cloud} />
          <Label>{labels.whenUp}</Label>
          <Para>{s5.when}</Para>
          <Label>{labels.mistakes}</Label>
          <Bullets items={s5.mistakes} />
        </SubSection>

        <SubSection title={s6.title} icon iconColor="red">
          <Para>{s6.lead}</Para>
          <ol className="mt-2 list-decimal pl-5 space-y-1 text-sm text-gray-700">
            {s6.kinds.map((kind) => (
              <li key={kind}>{kind}</li>
            ))}
          </ol>
          <Label>{s6.teamsTitle}</Label>
          <Para>{s6.teamsLead}</Para>
          <Code code={s6.teamsCode} language="json" />
          <Para>{s6.teamsNote}</Para>
        </SubSection>

        <SubSection title={herdr.title} icon iconColor="blue">
          <Bullets items={herdr.about} />
          <Label>{herdr.installTitle}</Label>
          <Code code={herdr.installCode} language="bash" />
          <Label>{herdr.usageTitle}</Label>
          <Para>{herdr.usage}</Para>
          <DataTable
            headers={herdr.keysTable.headers}
            rows={herdr.keysTable.rows}
          />
          <Label>{herdr.cliTitle}</Label>
          <Para>{herdr.cliLead}</Para>
          <Code code={herdr.cliCode} language="bash" />
          <Para>{herdr.cliNote}</Para>
          <Code code={herdr.skillCode} language="bash" />
          <Para>{herdr.skillNote}</Para>
          <Label>{herdr.remoteTitle}</Label>
          <Para>{herdr.remote}</Para>
        </SubSection>

        <SubSection title={orca.title} icon iconColor="green">
          <Bullets items={orca.about} />
          <Label>{orca.installTitle}</Label>
          <Code code={orca.installCode} language="bash" />
          <Para>{orca.installWarn}</Para>
          <Label>{orca.usageTitle}</Label>
          <Para>{orca.usage}</Para>
          <Label>{orca.cliTitle}</Label>
          <Para>{orca.cliLead}</Para>
          <Code code={orca.cliCode} language="bash" />
          <Para>{orca.skillNote}</Para>
          <Code code={orca.skillCode} language="bash" />
        </SubSection>

        <SubSection title={compare.title} icon iconColor="orange">
          <DataTable
            headers={compare.table.headers}
            rows={compare.table.rows}
          />
          <Para>{compare.note}</Para>
        </SubSection>

        <SubSection
          title={t('usageLadder.google.title')}
          icon
          iconColor="purple"
        >
          <InfoBox variant="gray">
            <p className="text-sm leading-relaxed">
              {t('usageLadder.google.body')}
            </p>
          </InfoBox>
        </SubSection>

        <SubSection title={s6end.title} icon iconColor="red">
          <Label>{s6end.whenLabel}</Label>
          <Bullets items={s6end.when} />
          <Label>{labels.mistakes}</Label>
          <Bullets items={s6end.mistakes} />
        </SubSection>

        <SubSection title={wrap.title} icon iconColor="green">
          <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
            {wrap.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </SubSection>
      </div>
    </SectionCard>
  );
};

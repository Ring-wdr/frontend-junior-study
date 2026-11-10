'use client';

import { Fragment } from 'react';
import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

const categoryStyles = [
  {
    iconColor: 'blue',
    head: 'bg-blue-50 text-blue-800 border-blue-200',
    stripe: 'bg-blue-50/50',
    name: 'text-blue-700',
    border: 'border-blue-100',
  },
  {
    iconColor: 'orange',
    head: 'bg-orange-50 text-orange-800 border-orange-200',
    stripe: 'bg-orange-50/50',
    name: 'text-orange-700',
    border: 'border-orange-100',
  },
  {
    iconColor: 'green',
    head: 'bg-green-50 text-green-800 border-green-200',
    stripe: 'bg-green-50/50',
    name: 'text-green-700',
    border: 'border-green-100',
  },
  {
    iconColor: 'purple',
    head: 'bg-purple-50 text-purple-800 border-purple-200',
    stripe: 'bg-purple-50/50',
    name: 'text-purple-700',
    border: 'border-purple-100',
  },
] as const;

const shiftVariants = [
  'blue',
  'purple',
  'green',
  'orange',
  'blue',
  'gray',
  'purple',
] as const;

const Rich = ({ text }: { text: string }) => {
  const parts = text.split('`');
  return (
    <>
      {parts.map((part, idx) =>
        idx % 2 === 1 ? (
          <code
            // biome-ignore lint/suspicious/noArrayIndexKey: static split of a string
            key={idx}
            className="rounded bg-gray-100 px-1 py-0.5 font-mono text-[0.9em] text-gray-800 break-all"
          >
            {part}
          </code>
        ) : (
          // biome-ignore lint/suspicious/noArrayIndexKey: static split of a string
          <Fragment key={idx}>{part}</Fragment>
        ),
      )}
    </>
  );
};

export const McpServersSection = () => {
  const { t, raw } = useTranslation('week17');
  const categories = raw('mcpServers.catalog.categories');
  const retiredRows = raw('mcpServers.retired.rows');
  const agents = raw('mcpServers.agents.items');
  const shifts = raw('mcpServers.shifts.items');
  const securityItems = raw('mcpServers.security.items');
  const practices = raw('mcpServers.security.practices');
  const steps = raw('mcpServers.start.steps');

  return (
    <SectionCard
      badge={{ label: t('mcpServers.badge'), color: 'indigo' }}
      description={t('mcpServers.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('mcpServers.intro.title')} icon iconColor="blue">
          <p className="text-sm text-gray-700 leading-relaxed">
            <Rich text={t('mcpServers.intro.body')} />
          </p>
          <p className="mt-2 text-sm text-gray-700 leading-relaxed">
            <Rich text={t('mcpServers.intro.limitNote')} />
          </p>
          <InfoBox variant="gray" title={t('mcpServers.intro.basisTitle')}>
            <p className="text-sm leading-relaxed">
              <Rich text={t('mcpServers.intro.basisBody')} />
            </p>
          </InfoBox>
        </SubSection>

        <div className="space-y-8">
          <div>
            <h3 className="font-bold text-base text-gray-900">
              {t('mcpServers.catalog.title')}
            </h3>
            <p className="mt-1 text-sm text-gray-600 leading-relaxed">
              <Rich text={t('mcpServers.catalog.hint')} />
            </p>
          </div>

          {categories.map((category, idx) => {
            const style = categoryStyles[idx % categoryStyles.length];
            return (
              <SubSection
                key={category.title}
                title={category.title}
                icon
                iconColor={style.iconColor}
              >
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-xs">
                    <thead>
                      <tr className={style.head}>
                        <th
                          className={`px-3 py-2 text-left font-semibold border-b ${style.head}`}
                        >
                          {t('mcpServers.catalog.headers.name')}
                        </th>
                        <th
                          className={`px-3 py-2 text-left font-semibold border-b ${style.head}`}
                        >
                          {t('mcpServers.catalog.headers.provider')}
                        </th>
                        <th
                          className={`px-3 py-2 text-left font-semibold border-b ${style.head}`}
                        >
                          {t('mcpServers.catalog.headers.what')}
                        </th>
                        <th
                          className={`px-3 py-2 text-left font-semibold border-b ${style.head}`}
                        >
                          {t('mcpServers.catalog.headers.address')}
                        </th>
                        <th
                          className={`px-3 py-2 text-left font-semibold border-b ${style.head}`}
                        >
                          {t('mcpServers.catalog.headers.when')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.rows.map((row, rowIdx) => (
                        <tr
                          key={row.name}
                          className={
                            rowIdx % 2 === 0 ? 'bg-white' : style.stripe
                          }
                        >
                          <td
                            className={`px-3 py-2 align-top font-bold ${style.name} border-b ${style.border}`}
                          >
                            {row.name}
                          </td>
                          <td
                            className={`px-3 py-2 align-top text-gray-600 border-b ${style.border}`}
                          >
                            {row.provider}
                          </td>
                          <td
                            className={`px-3 py-2 align-top text-gray-600 border-b ${style.border}`}
                          >
                            <Rich text={row.what} />
                          </td>
                          <td
                            className={`px-3 py-2 align-top text-gray-600 border-b ${style.border}`}
                          >
                            <Rich text={row.address} />
                          </td>
                          <td
                            className={`px-3 py-2 align-top text-gray-600 border-b ${style.border}`}
                          >
                            {row.when}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 space-y-2">
                  {category.notes.map((note) => (
                    <p
                      key={note}
                      className="text-xs text-gray-600 leading-relaxed"
                    >
                      <Rich text={note} />
                    </p>
                  ))}
                </div>
              </SubSection>
            );
          })}
        </div>

        <SubSection title={t('mcpServers.retired.title')} icon iconColor="red">
          <p className="text-sm text-gray-700 leading-relaxed">
            <Rich text={t('mcpServers.retired.refServers')} />
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[480px] text-xs">
              <thead>
                <tr className="bg-red-50">
                  <th className="px-3 py-2 text-left font-semibold text-red-800 border-b border-red-200">
                    {t('mcpServers.retired.headers.old')}
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-red-800 border-b border-red-200">
                    {t('mcpServers.retired.headers.status')}
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-red-800 border-b border-red-200">
                    {t('mcpServers.retired.headers.instead')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {retiredRows.map((row, idx) => (
                  <tr
                    key={row.old}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-red-50/50'}
                  >
                    <td className="px-3 py-2 align-top font-bold text-red-700 border-b border-red-100">
                      {row.old}
                    </td>
                    <td className="px-3 py-2 align-top text-gray-600 border-b border-red-100">
                      {row.status}
                    </td>
                    <td className="px-3 py-2 align-top text-gray-600 border-b border-red-100">
                      <Rich text={row.instead} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <InfoBox variant="red" title={t('mcpServers.retired.warnTitle')}>
            <p className="text-sm leading-relaxed">
              {t('mcpServers.retired.warnBody')}
            </p>
          </InfoBox>
        </SubSection>

        <SubSection title={t('mcpServers.agents.title')} icon iconColor="green">
          <p className="text-sm text-gray-700 leading-relaxed">
            {t('mcpServers.agents.hint')}
          </p>
          <div className="mt-4 space-y-6">
            {agents.map((agent) => (
              <div key={agent.name}>
                <h4 className="font-bold text-sm text-green-800">
                  {agent.name}
                </h4>
                {agent.intro && (
                  <p className="mt-2 text-xs text-gray-700 leading-relaxed">
                    <Rich text={agent.intro} />
                  </p>
                )}
                {agent.blocks.map((block) => (
                  <div key={block.code} className="mt-2">
                    {block.note && (
                      <p className="mb-2 text-xs text-gray-700 leading-relaxed">
                        <Rich text={block.note} />
                      </p>
                    )}
                    <CodeBlock
                      code={block.code}
                      language={block.language}
                      className="text-xs"
                    />
                  </div>
                ))}
                {agent.bullets.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 space-y-1 text-xs text-gray-700 leading-relaxed">
                    {agent.bullets.map((bullet) => (
                      <li key={bullet}>
                        <Rich text={bullet} />
                      </li>
                    ))}
                  </ul>
                )}
                {agent.outro && (
                  <p className="mt-2 text-xs text-gray-700 leading-relaxed">
                    <Rich text={agent.outro} />
                  </p>
                )}
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection
          title={t('mcpServers.shifts.title')}
          icon
          iconColor="purple"
        >
          <div className="space-y-4">
            {shifts.map((shift, idx) => (
              <InfoBox
                key={shift.title}
                variant={shiftVariants[idx % shiftVariants.length]}
                title={shift.title}
              >
                <p className="text-sm leading-relaxed">
                  <Rich text={shift.body} />
                </p>
                {shift.bullets.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
                    {shift.bullets.map((bullet) => (
                      <li key={bullet}>
                        <Rich text={bullet} />
                      </li>
                    ))}
                  </ul>
                )}
              </InfoBox>
            ))}
          </div>
        </SubSection>

        <SubSection title={t('mcpServers.security.title')} icon iconColor="red">
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 leading-relaxed">
            {securityItems.map((item) => (
              <li key={item}>
                <Rich text={item} />
              </li>
            ))}
          </ul>
          <InfoBox
            variant="orange"
            title={t('mcpServers.security.incidentsTitle')}
          >
            <p className="text-sm leading-relaxed">
              <Rich text={t('mcpServers.security.incidentsBody')} />
            </p>
          </InfoBox>
          <InfoBox
            variant="green"
            title={t('mcpServers.security.practicesTitle')}
          >
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              {practices.map((practice) => (
                <li key={practice}>
                  <Rich text={practice} />
                </li>
              ))}
            </ol>
          </InfoBox>
        </SubSection>

        <SubSection title={t('mcpServers.start.title')} icon iconColor="blue">
          <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700 leading-relaxed">
            {steps.map((step) => (
              <li key={step}>
                <Rich text={step} />
              </li>
            ))}
          </ol>
        </SubSection>
      </div>
    </SectionCard>
  );
};

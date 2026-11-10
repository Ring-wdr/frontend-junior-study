'use client';

import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import { StablePanels } from '../../../components/ui/stable-panels';
import { Pager } from './mcp-servers-section-pager';
import { Rich } from './mcp-servers-section-rich';
import { panelId, TabList, tabId } from './mcp-servers-section-tabs';

interface Field {
  label: string;
  value: string;
  danger?: boolean;
}

interface Entry {
  name: string;
  sub: string;
  fields: Field[];
}

interface Group {
  chip: string;
  title: string;
  danger: boolean;
  entries: Entry[];
  notes: string[];
}

const ID_PREFIX = 'mcp-explorer';

export const McpServersExplorer = () => {
  const { t, raw } = useTranslation('week17');
  const categories = raw('mcpServers.catalog.categories');
  const retiredRows = raw('mcpServers.retired.rows');
  const [catIdx, setCatIdx] = useState(0);
  const [entryIdxs, setEntryIdxs] = useState<number[]>([]);

  const groups: Group[] = [
    ...categories.map((category) => ({
      chip: category.chip,
      title: category.title,
      danger: false,
      notes: category.notes,
      entries: category.rows.map((row) => ({
        name: row.name,
        sub: row.provider,
        fields: [
          {
            label: t('mcpServers.catalog.fields.provider'),
            value: row.provider,
          },
          { label: t('mcpServers.catalog.fields.what'), value: row.what },
          { label: t('mcpServers.catalog.fields.address'), value: row.address },
          { label: t('mcpServers.catalog.fields.when'), value: row.when },
        ],
      })),
    })),
    {
      chip: t('mcpServers.retired.chip'),
      title: t('mcpServers.retired.title'),
      danger: true,
      notes: [],
      entries: retiredRows.map((row) => ({
        name: row.old,
        sub: row.status,
        fields: [
          {
            label: t('mcpServers.retired.fields.status'),
            value: row.status,
            danger: true,
          },
          { label: t('mcpServers.retired.fields.instead'), value: row.instead },
        ],
      })),
    },
  ];

  const setEntryIdx = (groupIdx: number, idx: number) => {
    setEntryIdxs((prev) => {
      const next = groups.map((_, i) => prev[i] ?? 0);
      next[groupIdx] = idx;
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-bold text-base text-gray-900">
          {t('mcpServers.catalog.title')}
        </h3>
        <p className="mt-1 text-sm text-gray-600 leading-relaxed">
          <Rich text={t('mcpServers.catalog.hint')} />
        </p>
      </div>

      <TabList
        idPrefix={ID_PREFIX}
        ariaLabel={t('mcpServers.catalog.chipsLabel')}
        selected={catIdx}
        onSelect={setCatIdx}
        items={groups.map((g) => ({
          label: g.chip,
          danger: g.danger,
          icon: g.danger ? (
            <AlertTriangle
              className="h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
            />
          ) : undefined,
        }))}
      />

      <div
        role="tabpanel"
        id={panelId(ID_PREFIX)}
        aria-labelledby={tabId(ID_PREFIX, catIdx)}
      >
        <StablePanels index={catIdx}>
          {groups.map((group, groupIdx) => {
            const entryIdx = entryIdxs[groupIdx] ?? 0;
            return (
              <div
                key={group.chip}
                className={`rounded-xl border p-3 sm:p-4 ${
                  group.danger
                    ? 'border-red-300 bg-red-50/40'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <h4
                  className={`font-bold text-sm ${group.danger ? 'text-red-800' : 'text-gray-900'}`}
                >
                  {group.title}
                </h4>

                {group.danger && (
                  <div className="mt-3 space-y-3">
                    <p className="text-xs text-gray-700 leading-relaxed">
                      <Rich text={t('mcpServers.retired.refServers')} />
                    </p>
                    <InfoBox
                      variant="red"
                      title={t('mcpServers.retired.warnTitle')}
                    >
                      <p className="flex items-start gap-2 text-sm leading-relaxed">
                        <AlertTriangle
                          className="mt-0.5 h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{t('mcpServers.retired.warnBody')}</span>
                      </p>
                    </InfoBox>
                  </div>
                )}

                <fieldset className="m-0 mt-3 grid min-w-0 grid-cols-1 gap-2 border-0 p-0 sm:grid-cols-2">
                  <legend className="sr-only">
                    {t('mcpServers.catalog.cardsLabel')}
                  </legend>
                  {group.entries.map((item, idx) => {
                    const active = idx === entryIdx;
                    const tone = group.danger
                      ? active
                        ? 'border-red-600 bg-red-100'
                        : 'border-red-200 bg-white hover:bg-red-50'
                      : active
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 bg-white hover:bg-gray-50';
                    return (
                      <button
                        key={item.name}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setEntryIdx(groupIdx, idx)}
                        className={`min-w-0 rounded-lg border px-3 py-2 text-left transition-colors ${tone}`}
                      >
                        <span
                          className={`block break-words text-xs font-bold ${
                            group.danger ? 'text-red-800' : 'text-gray-900'
                          }`}
                        >
                          {item.name}
                        </span>
                        <span className="mt-0.5 block break-words text-[11px] text-gray-500">
                          {item.sub}
                        </span>
                      </button>
                    );
                  })}
                </fieldset>

                <div className="mt-4">
                  <Pager
                    index={entryIdx}
                    total={group.entries.length}
                    onChange={(idx) => setEntryIdx(groupIdx, idx)}
                    prevLabel={t('mcpServers.ui.prev')}
                    nextLabel={t('mcpServers.ui.next')}
                  />
                </div>

                <div
                  className={`mt-3 rounded-lg border p-3 ${
                    group.danger
                      ? 'border-red-200 bg-white'
                      : 'border-indigo-100 bg-indigo-50/40'
                  }`}
                >
                  <StablePanels index={entryIdx}>
                    {group.entries.map((entry) => (
                      <div key={entry.name} className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          {group.danger && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-red-300 bg-red-100 px-2 py-0.5 text-[11px] font-semibold text-red-800">
                              <AlertTriangle
                                className="h-3 w-3"
                                aria-hidden="true"
                              />
                              {t('mcpServers.retired.tag')}
                            </span>
                          )}
                          <h5 className="min-w-0 break-words text-sm font-bold text-gray-900">
                            {entry.name}
                          </h5>
                        </div>
                        <dl className="mt-3 space-y-3">
                          {entry.fields.map((field) => (
                            <div key={field.label}>
                              <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                {field.label}
                              </dt>
                              <dd
                                className={`mt-0.5 break-words text-xs leading-relaxed ${
                                  field.danger
                                    ? 'font-semibold text-red-700'
                                    : 'text-gray-800'
                                }`}
                              >
                                <Rich text={field.value} />
                              </dd>
                            </div>
                          ))}
                        </dl>
                        {group.notes.length > 0 && (
                          <div className="mt-4 border-t border-gray-200 pt-3">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                              {t('mcpServers.catalog.fields.notes')}
                            </p>
                            <div className="mt-1 space-y-2">
                              {group.notes.map((note) => (
                                <p
                                  key={note}
                                  className="break-words text-xs leading-relaxed text-gray-700"
                                >
                                  <Rich text={note} />
                                </p>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </StablePanels>
                </div>
              </div>
            );
          })}
        </StablePanels>
      </div>
    </div>
  );
};

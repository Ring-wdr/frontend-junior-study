'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import { CodeBlock } from '../../../components/ui/code-block';
import { Chip, Panel, PrevNext } from './browser-automation-controls';

type ToolId = 'ego' | 'aside';

const toolIds: ToolId[] = ['ego', 'aside'];

export const BrowserAutomationDuo = () => {
  const { t, raw } = useTranslation('week17');
  const tools = raw('browserAutomation.duo.tools');
  const criteria = raw('browserAutomation.duo.criteria');
  const compareItems = raw('browserAutomation.duo.compareItems');
  const [tool, setTool] = useState<ToolId>('ego');
  const [side, setSide] = useState(false);
  const [criterion, setCriterion] = useState(0);

  const current = tools[tool];
  const sectionOf = (id: ToolId) => tools[id].sections[criterion] ?? [];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <div
          role="tablist"
          aria-label={t('browserAutomation.duo.toolLabel')}
          className="inline-flex overflow-hidden rounded-md border border-green-300 bg-white"
        >
          {toolIds.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`ba-duo-tab-${id}`}
              aria-selected={tool === id}
              aria-controls="ba-duo-panel"
              onClick={() => setTool(id)}
              className={`px-4 py-1.5 text-xs font-semibold transition-colors ${
                tool === id
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:bg-green-50'
              }`}
            >
              {tools[id].title}
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-pressed={side}
          onClick={() => setSide((prev) => !prev)}
          className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${
            side
              ? 'border-green-600 bg-green-600 text-white'
              : 'border-green-300 bg-white text-green-800 hover:bg-green-50'
          }`}
        >
          {side && <span aria-hidden="true">{'✓ '}</span>}
          {t('browserAutomation.duo.sideBySide')}
        </button>
      </div>

      <p className="mt-4 text-sm font-semibold text-gray-700">
        {t('browserAutomation.duo.criterionLabel')}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {criteria.map((label, i) => (
          <Chip
            key={label}
            selected={i === criterion}
            onSelect={() => setCriterion(i)}
          >
            {label}
          </Chip>
        ))}
      </div>

      <div
        role="tabpanel"
        id="ba-duo-panel"
        aria-labelledby={`ba-duo-tab-${tool}`}
        className="mt-4 rounded-xl border border-green-200 bg-white p-3 sm:p-4"
      >
        <Panel
          panelKey={`${side ? 'side' : tool}-${criterion}`}
          className={
            side ? 'grid grid-cols-1 gap-3 sm:grid-cols-2' : 'space-y-2'
          }
        >
          {(side ? toolIds : [tool]).map((id) => (
            <div key={id} className="min-w-0">
              <h4 className="font-bold text-sm text-green-800">
                {tools[id].title}
                <span className="font-normal text-gray-500">
                  {' / '}
                  {criteria[criterion]}
                </span>
              </h4>
              <ul className="mt-2 space-y-2 text-sm leading-relaxed text-gray-700">
                {sectionOf(id).map((line) => (
                  <li key={line} className="break-words">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Panel>

        <PrevNext
          index={criterion}
          total={criteria.length}
          onChange={setCriterion}
          prevLabel={t('browserAutomation.duo.prev')}
          nextLabel={t('browserAutomation.duo.next')}
        />
      </div>

      <p className="mt-4 text-xs font-semibold text-gray-600">
        {t('browserAutomation.duo.codeLabel')}
        {': '}
        {current.title}
      </p>
      <CodeBlock code={current.code} language="bash" className="mt-2 text-xs" />

      <InfoBox variant="blue" title={t('browserAutomation.duo.compareTitle')}>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {compareItems.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </InfoBox>
    </div>
  );
};

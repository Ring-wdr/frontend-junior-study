'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import { CodeBlock } from '../../../components/ui/code-block';
import { StablePanels } from '../../../components/ui/stable-panels';
import { Chip, PrevNext } from './browser-automation-controls';

type ToolId = 'ego' | 'aside';

const toolIds: ToolId[] = ['ego', 'aside'];

interface CriterionLinesProps {
  title: string;
  criterion: string;
  lines: string[];
}

const CriterionLines = ({ title, criterion, lines }: CriterionLinesProps) => (
  <div className="min-w-0">
    <h4 className="font-bold text-sm text-green-800">
      {title}
      <span className="font-normal text-gray-500">
        {' / '}
        {criterion}
      </span>
    </h4>
    <ul className="mt-2 space-y-2 text-sm leading-relaxed text-gray-700">
      {lines.map((line) => (
        <li key={line} className="break-words">
          {line}
        </li>
      ))}
    </ul>
  </div>
);

export const BrowserAutomationDuo = () => {
  const { t, raw } = useTranslation('week17');
  const tools = raw('browserAutomation.duo.tools');
  const criteria = raw('browserAutomation.duo.criteria');
  const compareItems = raw('browserAutomation.duo.compareItems');
  const [tool, setTool] = useState<ToolId>('ego');
  const [side, setSide] = useState(false);
  const [criterion, setCriterion] = useState(0);

  const modeIndex = side ? toolIds.length : toolIds.indexOf(tool);

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
          <span aria-hidden="true" className={side ? '' : 'invisible'}>
            {'✓ '}
          </span>
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

      <PrevNext
        index={criterion}
        total={criteria.length}
        onChange={setCriterion}
        prevLabel={t('browserAutomation.duo.prev')}
        nextLabel={t('browserAutomation.duo.next')}
      />

      <div
        role="tabpanel"
        id="ba-duo-panel"
        aria-labelledby={`ba-duo-tab-${tool}`}
        className="mt-3 rounded-xl border border-green-200 bg-white p-3 sm:p-4"
      >
        <StablePanels index={criterion}>
          {criteria.map((label, criterionIndex) => (
            <StablePanels key={label} index={modeIndex}>
              {toolIds.map((id) => (
                <CriterionLines
                  key={id}
                  title={tools[id].title}
                  criterion={label}
                  lines={tools[id].sections[criterionIndex] ?? []}
                />
              ))}
              <div key="side" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {toolIds.map((id) => (
                  <CriterionLines
                    key={id}
                    title={tools[id].title}
                    criterion={label}
                    lines={tools[id].sections[criterionIndex] ?? []}
                  />
                ))}
              </div>
            </StablePanels>
          ))}
        </StablePanels>
      </div>

      <p className="mt-4 text-xs font-semibold text-gray-600">
        {t('browserAutomation.duo.codeLabel')}
      </p>
      <StablePanels index={toolIds.indexOf(tool)} className="mt-2">
        {toolIds.map((id) => (
          <div key={id} className="min-w-0">
            <p className="text-xs font-semibold text-gray-600">
              {tools[id].title}
            </p>
            <CodeBlock
              code={tools[id].code}
              language="bash"
              className="mt-2 text-xs"
            />
          </div>
        ))}
      </StablePanels>

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

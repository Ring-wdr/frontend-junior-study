'use client';

import { useState } from 'react';
import { cn } from '../../lib/utils';
import { CodeBlock } from './code-block';
import { StablePanels } from './stable-panels';

interface CodeTabItem {
  label: string;
  note: string;
}

interface CodeTabsProps {
  items: CodeTabItem[];
  codes: string[];
  ariaLabel: string;
  testId: string;
  language?: string | string[];
}

export const CodeTabs = ({
  items,
  codes,
  ariaLabel,
  testId,
  language = 'javascript',
}: CodeTabsProps) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-3" data-testid={testId}>
      <fieldset className="m-0 flex min-w-0 flex-wrap gap-2 border-0 p-0">
        <legend className="sr-only">{ariaLabel}</legend>
        {items.map((item, index) => (
          <button
            key={item.label}
            type="button"
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
            data-testid={`${testId}-tab-${index}`}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
              selected === index
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            )}
          >
            {item.label}
          </button>
        ))}
      </fieldset>
      <StablePanels index={selected} scroll={false}>
        {items.map((item, index) => (
          <div
            key={item.label}
            className="space-y-3"
            data-testid={`${testId}-panel-${index}`}
          >
            <CodeBlock
              code={codes[index]}
              language={
                typeof language === 'string' ? language : language[index]
              }
              className="text-xs"
            />
            <p className="text-sm text-gray-700">{item.note}</p>
          </div>
        ))}
      </StablePanels>
    </div>
  );
};

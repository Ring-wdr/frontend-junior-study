'use client';

import { cn } from '../../../lib/utils';

interface HighlightedCodeProps {
  code: string;
  activeLine: number | null;
  testId?: string;
}

export const HighlightedCode = ({
  code,
  activeLine,
  testId,
}: HighlightedCodeProps) => {
  const lines = code.split('\n');

  return (
    <pre
      data-testid={testId}
      className="not-prose max-w-full overflow-x-auto rounded-lg bg-[#1e1e1e] py-3 font-mono text-xs leading-6 text-gray-200"
    >
      {lines.map((line, index) => {
        const lineNumber = index + 1;
        const active = lineNumber === activeLine;
        return (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: lines are static and may repeat
            key={index}
            data-active={active}
            className={cn(
              'flex min-w-max border-l-2 px-3',
              active
                ? 'border-yellow-400 bg-yellow-400/15 text-white'
                : 'border-transparent',
            )}
          >
            <span className="w-6 shrink-0 select-none text-right text-gray-500">
              {lineNumber}
            </span>
            <span className="whitespace-pre pl-3">{line}</span>
          </div>
        );
      })}
    </pre>
  );
};

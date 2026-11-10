'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { CodeBlock } from '../../../components/ui/code-block';
import { StablePanels } from '../../../components/ui/stable-panels';

export const TokenOptimizationCommands = () => {
  const { t, raw } = useTranslation('week17');
  const commands = raw('tokenOptimization.commands');
  const [index, setIndex] = useState(0);

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-gray-700">
        {t('tokenOptimization.ui.goalLabel')}
      </p>
      <div className="flex flex-wrap gap-2">
        {commands.map((item, idx) => {
          const selected = idx === index;
          return (
            <button
              key={item.goal}
              type="button"
              aria-pressed={selected}
              onClick={() => setIndex(idx)}
              className={`min-w-0 rounded-full border px-3 py-1.5 text-left text-xs font-semibold break-words transition-colors ${
                selected
                  ? 'border-teal-600 bg-teal-600 text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.goal}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setIndex(index - 1)}
          disabled={index === 0}
          className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
          {t('tokenOptimization.ui.prev')}
        </button>
        <span className="text-xs tabular-nums text-gray-500">
          {index + 1} / {commands.length}
        </span>
        <button
          type="button"
          onClick={() => setIndex(index + 1)}
          disabled={index === commands.length - 1}
          className="inline-flex items-center gap-1 rounded-md bg-teal-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t('tokenOptimization.ui.next')}
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      <StablePanels index={index}>
        {commands.map((item) => (
          <CodeBlock
            key={item.goal}
            code={item.code}
            language="bash"
            className="text-xs"
          />
        ))}
      </StablePanels>
    </div>
  );
};

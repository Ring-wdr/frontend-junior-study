'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { CodeBlock } from '../../../components/ui/code-block';
import { StablePanels } from '../../../components/ui/stable-panels';

export const PromptEngineeringContext = () => {
  const { t, raw } = useTranslation('week17');
  const techniques = raw('promptEngineering.context.techniques');
  const [index, setIndex] = useState(0);

  return (
    <div className="space-y-4">
      <InfoBox
        variant="purple"
        title={t('promptEngineering.context.infoTitle')}
      >
        <p className="text-sm leading-relaxed">
          {t('promptEngineering.context.infoDesc')}
        </p>
      </InfoBox>

      <DemoBox label={t('promptEngineering.ui.techniqueLabel')}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {techniques.map((item, i) => {
              const selected = i === index;
              return (
                <button
                  key={item.name}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setIndex(i)}
                  className={`min-w-0 rounded-lg border px-3 py-2 text-left text-xs break-words transition-colors ${
                    selected
                      ? 'border-purple-600 bg-purple-50 font-semibold text-purple-900 ring-1 ring-purple-600'
                      : 'border-gray-200 bg-white font-semibold text-gray-700 hover:border-purple-300'
                  }`}
                >
                  {i + 1}. {item.name}
                </button>
              );
            })}
          </div>

          <div className="min-w-0 rounded-xl border border-purple-200 bg-white p-3 sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <button
                type="button"
                onClick={() => setIndex(index - 1)}
                disabled={index === 0}
                className="inline-flex items-center gap-1 rounded-md bg-purple-100 px-3 py-1.5 text-xs font-medium text-purple-700 hover:bg-purple-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                {t('promptEngineering.ui.prev')}
              </button>
              <span className="text-xs font-bold tabular-nums text-purple-700">
                {index + 1}/{techniques.length}
              </span>
              <button
                type="button"
                onClick={() => setIndex(index + 1)}
                disabled={index === techniques.length - 1}
                className="inline-flex items-center gap-1 rounded-md bg-purple-600 px-3 py-1.5 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t('promptEngineering.ui.next')}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <StablePanels index={index}>
              {techniques.map((item) => (
                <div key={item.name}>
                  <h3 className="text-sm font-bold text-purple-900 break-words">
                    {item.label}
                  </h3>
                  <CodeBlock
                    code={item.code}
                    language="bash"
                    className="mt-3 text-xs"
                  />
                </div>
              ))}
            </StablePanels>
          </div>
        </div>
      </DemoBox>
    </div>
  );
};

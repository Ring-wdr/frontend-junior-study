'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { CodeBlock } from '../../../components/ui/code-block';
import { Chip } from './ai-agents-section-controls';

export const AiAgentsSectionLoop = () => {
  const { t, raw } = useTranslation('week17');
  const steps = raw('aiAgents.example.steps');
  const [step, setStep] = useState(1);

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-1 text-xs font-semibold text-gray-600">
          {t('aiAgents.example.promptLabel')}
        </p>
        <CodeBlock
          code={t('aiAgents.example.promptCode')}
          language="bash"
          className="text-xs"
        />
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-600">
          {t('aiAgents.example.pickLabel')}
        </p>
        <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
          <Chip selected={step === 0} onSelect={() => setStep(0)}>
            {t('aiAgents.example.start')}
          </Chip>
          {steps.map((text, i) => (
            <Chip
              key={text}
              selected={step === i + 1}
              onSelect={() => setStep(i + 1)}
            >
              {`${t('aiAgents.example.stepLabel')} ${i + 1}`}
            </Chip>
          ))}
        </div>

        <div className="mt-3 overflow-x-auto rounded-lg bg-[#1e1e1e] p-3 font-mono text-xs text-gray-400">
          <p className="mb-1 break-words">{t('aiAgents.example.loopHeader')}</p>
          <ol className="space-y-1">
            {steps.map((text, i) => {
              const active = step === i + 1;
              return (
                <li
                  key={text}
                  aria-current={active ? 'step' : undefined}
                  className={`rounded px-2 py-1 break-words transition-colors ${
                    active
                      ? 'bg-purple-600 font-semibold text-white'
                      : step > i + 1
                        ? 'text-gray-300'
                        : 'text-gray-500'
                  }`}
                >
                  {`# ${i + 1}. ${text}`}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            disabled={step <= 0}
            className="rounded-md border border-purple-200 bg-white px-3 py-1.5 text-xs font-medium text-purple-700 hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {'← '}
            {t('aiAgents.example.prev')}
          </button>
          <button
            type="button"
            onClick={() => setStep(0)}
            disabled={step === 0}
            className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t('aiAgents.example.reset')}
          </button>
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            disabled={step >= steps.length}
            className="rounded-md bg-purple-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t('aiAgents.example.next')}
            {' →'}
          </button>
        </div>
      </div>
    </div>
  );
};

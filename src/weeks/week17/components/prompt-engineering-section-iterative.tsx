'use client';

import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { CodeBlock } from '../../../components/ui/code-block';
import { StablePanels } from '../../../components/ui/stable-panels';

export const PromptEngineeringIterative = () => {
  const { t, raw } = useTranslation('week17');
  const steps = raw('promptEngineering.iterative.steps');
  const [step, setStep] = useState(0);

  return (
    <div className="space-y-4">
      <InfoBox
        variant="blue"
        title={t('promptEngineering.iterative.infoTitle')}
      >
        <p className="text-sm leading-relaxed">
          {t('promptEngineering.iterative.infoDesc')}
        </p>
      </InfoBox>

      <DemoBox label={t('promptEngineering.ui.stepsLabel')}>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {steps.map((item, i) => {
              const selected = i === step;
              const done = i < step;
              return (
                <button
                  key={item.name}
                  type="button"
                  aria-pressed={selected}
                  aria-current={selected ? 'step' : undefined}
                  onClick={() => setStep(i)}
                  className={`inline-flex min-w-0 items-center gap-1 rounded-lg border px-3 py-1.5 text-xs break-words transition-colors ${
                    selected
                      ? 'border-blue-600 bg-blue-50 font-medium text-blue-900 ring-1 ring-blue-600'
                      : done
                        ? 'border-blue-200 bg-blue-50 font-medium text-blue-800'
                        : 'border-gray-200 bg-white font-medium text-gray-700 hover:border-blue-300'
                  }`}
                >
                  <Check
                    className={`h-3.5 w-3.5 ${done ? '' : 'invisible'}`}
                    aria-hidden="true"
                  />
                  {item.name}
                </button>
              );
            })}
          </div>

          <div>
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="text-gray-600">
                {t('promptEngineering.ui.progress')}
              </span>
              <span className="font-bold tabular-nums text-blue-700">
                {step + 1}/{steps.length}
              </span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full border border-blue-100 bg-white">
              <motion.div
                initial={false}
                animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
              />
            </div>
          </div>

          <div className="min-w-0 rounded-xl border border-blue-200 bg-white p-3 sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                disabled={step === 0}
                className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                {t('promptEngineering.ui.prev')}
              </button>
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={step === steps.length - 1}
                className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t('promptEngineering.ui.next')}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <StablePanels index={step}>
              {steps.map((item) => (
                <div key={item.name}>
                  <h3 className="text-sm font-bold text-blue-900 break-words">
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

'use client';

import { ChevronRight, Undo2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { cn } from '../../../lib/utils';
import { HighlightedCode } from './highlighted-code';
import { StepControls } from './step-controls';

const CODE = `function add(a, b) {
  return a + b;
}

for (let i = 0; i < 100000; i++) add(i, 1);
add('a', 'b');`;

const TIERS = ['Parser', 'Ignition', 'Sparkplug', 'Maglev', 'TurboFan'];

type Feedback = 'feedbackNone' | 'feedbackSmi' | 'feedbackMixed';

interface PipelineStep {
  line: number;
  tier: number;
  feedback: Feedback;
  deopt?: boolean;
}

const STEPS: PipelineStep[] = [
  { line: 1, tier: 0, feedback: 'feedbackNone' },
  { line: 2, tier: 1, feedback: 'feedbackNone' },
  { line: 2, tier: 1, feedback: 'feedbackSmi' },
  { line: 5, tier: 2, feedback: 'feedbackSmi' },
  { line: 5, tier: 3, feedback: 'feedbackSmi' },
  { line: 5, tier: 4, feedback: 'feedbackSmi' },
  { line: 6, tier: 1, feedback: 'feedbackMixed', deopt: true },
];

export const V8PipelineVisualizer = () => {
  const { t, raw } = useTranslation('week1');
  const [step, setStep] = useState(0);
  const stages = raw('v8Pipeline.visualizer.stages');
  const current = STEPS[step];
  const stage = stages[step];

  return (
    <div className="space-y-4" data-testid="v8-pipeline-visualizer">
      <HighlightedCode code={CODE} activeLine={current.line} />

      <StepControls
        step={step}
        total={STEPS.length}
        onChange={setStep}
        testId="v8-pipeline"
      />

      <ol className="flex flex-wrap items-center gap-1.5">
        {TIERS.map((tier, index) => {
          const active = index === current.tier;
          const left = current.deopt && index === 4;
          return (
            <li key={tier} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight
                  aria-hidden="true"
                  className="h-4 w-4 text-gray-400"
                />
              )}
              <span
                data-testid={`v8-tier-${index}`}
                data-active={active}
                className={cn(
                  'rounded-lg border-2 px-2.5 py-1.5 font-mono text-xs font-semibold transition-colors',
                  active && 'border-blue-600 bg-blue-600 text-white',
                  left &&
                    'border-dashed border-red-400 bg-red-50 text-red-700 line-through',
                  !active && !left && 'border-gray-200 bg-white text-gray-500',
                )}
              >
                {tier}
              </span>
            </li>
          );
        })}
      </ol>

      <div
        aria-live="polite"
        className={cn(
          'space-y-2 rounded-lg border p-3 text-sm',
          current.deopt
            ? 'border-red-200 bg-red-50 text-red-900'
            : 'border-blue-100 bg-blue-50 text-blue-900',
        )}
      >
        <div className="flex flex-wrap items-center gap-2 font-semibold">
          {current.deopt && <Undo2 aria-hidden="true" className="h-4 w-4" />}
          <span data-testid="v8-pipeline-stage-title">{stage.title}</span>
          {current.deopt && (
            <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs">
              {t('v8Pipeline.visualizer.deopt')}: TurboFan → Ignition
            </span>
          )}
        </div>
        <p>{stage.desc}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-gray-900 px-3 py-2 font-mono text-xs">
        <span className="text-gray-400">
          {t('v8Pipeline.visualizer.feedback')}
        </span>
        <span
          data-testid="v8-pipeline-feedback"
          className={cn(
            'font-semibold',
            current.feedback === 'feedbackNone' && 'text-gray-500',
            current.feedback === 'feedbackSmi' && 'text-green-400',
            current.feedback === 'feedbackMixed' && 'text-orange-300',
          )}
        >
          {t(`v8Pipeline.visualizer.${current.feedback}`)}
        </span>
      </div>
    </div>
  );
};

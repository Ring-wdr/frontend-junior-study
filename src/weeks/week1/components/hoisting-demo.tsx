'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { cn } from '../../../lib/utils';
import { HighlightedCode } from './highlighted-code';
import { StepControls } from './step-controls';

type BindingState = 'uninitialized' | 'undefined' | 'value';

interface Binding {
  name: string;
  kind: 'var' | 'let' | 'function';
  state: BindingState;
  value: string;
}

interface HoistingStep {
  line: number | null;
  bindings: Binding[];
  output: string[];
}

const CODE = `function demo() {
  console.log(a);
  console.log(fn());
  var a = 1;
  // console.log(b);
  let b = 2;
  console.log(a + b);
  function fn() { return 'ok'; }
}`;

const binding = (
  name: string,
  kind: Binding['kind'],
  state: BindingState,
  value = '',
): Binding => ({ name, kind, state, value });

const fn = binding('fn', 'function', 'value', 'ƒ fn()');
const aUndefined = binding('a', 'var', 'undefined', 'undefined');
const aOne = binding('a', 'var', 'value', '1');
const bUninitialized = binding('b', 'let', 'uninitialized');
const bTwo = binding('b', 'let', 'value', '2');

const STEPS: HoistingStep[] = [
  { line: null, bindings: [aUndefined, bUninitialized, fn], output: [] },
  {
    line: 2,
    bindings: [aUndefined, bUninitialized, fn],
    output: ['undefined'],
  },
  {
    line: 3,
    bindings: [aUndefined, bUninitialized, fn],
    output: ['undefined', 'ok'],
  },
  {
    line: 4,
    bindings: [aOne, bUninitialized, fn],
    output: ['undefined', 'ok'],
  },
  {
    line: 5,
    bindings: [aOne, bUninitialized, fn],
    output: ['undefined', 'ok'],
  },
  { line: 6, bindings: [aOne, bTwo, fn], output: ['undefined', 'ok'] },
  { line: 7, bindings: [aOne, bTwo, fn], output: ['undefined', 'ok', '3'] },
];

const stateStyles: Record<BindingState, string> = {
  uninitialized: 'border-red-200 bg-red-50 text-red-800',
  undefined: 'border-orange-200 bg-orange-50 text-orange-800',
  value: 'border-green-200 bg-green-50 text-green-800',
};

export const HoistingDemo = () => {
  const { t, raw } = useTranslation('week1');
  const [step, setStep] = useState(0);
  const descriptions = raw('executionContext.phases.steps');
  const current = STEPS[step];

  return (
    <div className="space-y-4" data-testid="hoisting-demo">
      <HighlightedCode code={CODE} activeLine={current.line} />

      <StepControls
        step={step}
        total={STEPS.length}
        onChange={setStep}
        testId="hoisting"
      />

      <div
        aria-live="polite"
        className="rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-blue-900"
      >
        <span className="mr-2 rounded bg-blue-100 px-1.5 py-0.5 text-xs font-semibold">
          {current.line === null
            ? t('executionContext.phases.creationPhase')
            : t('executionContext.phases.currentLine', { line: current.line })}
        </span>
        <span data-testid="hoisting-description">{descriptions[step]}</span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <div className="mb-2 text-xs font-semibold text-gray-500">
            {t('executionContext.phases.bindings')}
          </div>
          <ul className="space-y-1.5">
            {current.bindings.map((item) => (
              <li
                key={item.name}
                data-testid={`hoisting-binding-${item.name}`}
                className={cn(
                  'flex items-center justify-between gap-2 rounded-lg border px-3 py-1.5 font-mono text-xs',
                  stateStyles[item.state],
                )}
              >
                <span>
                  <span className="opacity-70">{item.kind}</span> {item.name}
                </span>
                <span className="font-semibold">
                  {item.state === 'uninitialized'
                    ? t('executionContext.phases.uninitialized')
                    : item.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-2 text-xs font-semibold text-gray-500">
            {t('executionContext.phases.output')}
          </div>
          <div
            data-testid="hoisting-output"
            className="min-h-24 rounded-lg bg-gray-900 p-3 font-mono text-xs text-green-400"
          >
            {current.output.length === 0 ? (
              <span className="text-gray-500">
                {t('executionContext.phases.noOutput')}
              </span>
            ) : (
              current.output.map((line, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: output lines are append-only
                <div key={index}>&gt; {line}</div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

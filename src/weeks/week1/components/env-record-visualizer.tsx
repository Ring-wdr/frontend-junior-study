'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { cn } from '../../../lib/utils';
import { HighlightedCode } from './highlighted-code';
import { StepControls } from './step-controls';

const UNINITIALIZED = Symbol('uninitialized');

type BindingValue = string | typeof UNINITIALIZED;

interface EnvRecord {
  id: 'global' | 'createCounter' | 'increment';
  name: string;
  bindings: [string, BindingValue][];
  closure?: string;
  retained?: boolean;
}

interface EnvStep {
  line: number | null;
  callStack: string[];
  records: EnvRecord[];
}

const CODE = `function createCounter() {
  let count = 0;
  return function increment() {
    count++;
    return count;
  };
}

const counter = createCounter();
counter(); // 1
counter(); // 2`;

const globalRecord = (counter: BindingValue): EnvRecord => ({
  id: 'global',
  name: 'Global',
  bindings: [
    ['createCounter', 'ƒ createCounter()'],
    ['counter', counter],
  ],
});

const counterRecord = (
  count: number,
  extra: Pick<EnvRecord, 'closure' | 'retained'> = {},
): EnvRecord => ({
  id: 'createCounter',
  name: 'createCounter()',
  bindings: [['count', String(count)]],
  ...extra,
});

const incrementRecord: EnvRecord = {
  id: 'increment',
  name: 'increment()',
  bindings: [],
};

const kept = { closure: 'counter.[[Environment]]', retained: true };

const STEPS: EnvStep[] = [
  {
    line: null,
    callStack: ['Global'],
    records: [globalRecord(UNINITIALIZED)],
  },
  {
    line: 2,
    callStack: ['Global', 'createCounter()'],
    records: [globalRecord(UNINITIALIZED), counterRecord(0)],
  },
  {
    line: 3,
    callStack: ['Global', 'createCounter()'],
    records: [
      globalRecord(UNINITIALIZED),
      counterRecord(0, { closure: 'increment.[[Environment]]' }),
    ],
  },
  {
    line: 9,
    callStack: ['Global'],
    records: [globalRecord('ƒ increment()'), counterRecord(0, kept)],
  },
  {
    line: 4,
    callStack: ['Global', 'increment()'],
    records: [
      globalRecord('ƒ increment()'),
      counterRecord(1, kept),
      incrementRecord,
    ],
  },
  {
    line: 10,
    callStack: ['Global'],
    records: [globalRecord('ƒ increment()'), counterRecord(1, kept)],
  },
  {
    line: 4,
    callStack: ['Global', 'increment()'],
    records: [
      globalRecord('ƒ increment()'),
      counterRecord(2, kept),
      incrementRecord,
    ],
  },
  {
    line: 11,
    callStack: ['Global'],
    records: [globalRecord('ƒ increment()'), counterRecord(2, kept)],
  },
];

const recordStyles: Record<EnvRecord['id'], string> = {
  global: 'border-gray-300 bg-white',
  createCounter: 'border-green-300 bg-green-50',
  increment: 'border-blue-300 bg-blue-50',
};

export const EnvRecordVisualizer = () => {
  const { t, raw } = useTranslation('week1');
  const [step, setStep] = useState(0);
  const descriptions = raw('scopeClosure.visualizer.steps');
  const current = STEPS[step];

  const renderRecord = (index: number) => {
    const record = current.records[index];
    if (!record) return null;
    const outer = current.records[index - 1];

    return (
      <motion.div
        key={record.id}
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        data-testid={`env-record-${record.id}`}
        className={cn(
          'space-y-2 rounded-lg border-2 p-2.5',
          recordStyles[record.id],
          record.retained && 'border-dashed border-green-600',
        )}
      >
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-mono text-xs font-bold text-gray-900">
            {record.name}
          </span>
          {outer && (
            <span className="font-mono text-[11px] text-gray-500">
              {t('scopeClosure.visualizer.outer')} → {outer.name}
            </span>
          )}
        </div>
        {record.bindings.length === 0 ? (
          <div className="text-xs text-gray-500">
            {t('scopeClosure.visualizer.empty')}
          </div>
        ) : (
          <ul className="space-y-1">
            {record.bindings.map(([name, value]) => (
              <li
                key={name}
                className="flex flex-wrap justify-between gap-x-2 rounded bg-white/70 px-2 py-1 font-mono text-xs"
              >
                <span className="text-gray-600">{name}</span>
                <span
                  className={cn(
                    'font-semibold',
                    value === UNINITIALIZED ? 'text-red-700' : 'text-gray-900',
                  )}
                >
                  {value === UNINITIALIZED
                    ? t('executionContext.phases.uninitialized')
                    : value}
                </span>
              </li>
            ))}
          </ul>
        )}
        {record.closure && (
          <div className="font-mono text-[11px] font-semibold text-green-800">
            ← {record.closure}
            {record.retained && (
              <span className="ml-1 font-sans font-normal">
                ({t('scopeClosure.visualizer.retained')})
              </span>
            )}
          </div>
        )}
        <AnimatePresence initial={false}>
          {renderRecord(index + 1)}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="space-y-4" data-testid="env-record-visualizer">
      <HighlightedCode code={CODE} activeLine={current.line} />

      <StepControls
        step={step}
        total={STEPS.length}
        onChange={setStep}
        testId="env-record"
      />

      <p
        aria-live="polite"
        data-testid="env-record-description"
        className="rounded-lg border border-green-100 bg-green-50 p-3 text-sm text-green-900"
      >
        {descriptions[step]}
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div>
          <div className="mb-2 text-xs font-semibold text-gray-500">
            {t('scopeClosure.visualizer.callStack')}
          </div>
          <ol
            className="flex flex-col-reverse gap-1.5"
            data-testid="env-record-call-stack"
          >
            {current.callStack.map((frame) => (
              <li
                key={frame}
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-center font-mono text-xs font-semibold text-gray-800"
              >
                {frame}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <div className="mb-2 text-xs font-semibold text-gray-500">
            {t('scopeClosure.visualizer.records')}
          </div>
          {renderRecord(0)}
        </div>
      </div>
    </div>
  );
};

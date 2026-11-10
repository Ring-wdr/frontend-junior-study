'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';

type Mode = 'all' | 'constraints' | 'verify';

const Line = ({
  text,
  tag,
  mode,
  kind,
}: {
  text: string;
  tag: string;
  mode: Mode;
  kind: 'constraints' | 'verify';
}) => {
  const lit = mode === kind;
  const dim = mode !== 'all' && !lit;
  const tone =
    kind === 'constraints'
      ? 'border-orange-500 bg-orange-100 text-orange-900'
      : 'border-green-600 bg-green-100 text-green-900';
  return (
    <div
      className={`flex flex-wrap items-baseline gap-2 border-l-4 py-0.5 pl-2 ${
        lit ? tone : 'border-transparent'
      } ${dim ? 'opacity-40' : ''}`}
    >
      <span className="break-words">{`  - ${text}`}</span>
      <span
        aria-hidden={!lit}
        className={`rounded bg-white px-1.5 text-[10px] font-bold ${
          lit ? '' : 'invisible'
        }`}
      >
        {tag}
      </span>
    </div>
  );
};

export const PromptEngineeringConstraints = () => {
  const { t, raw } = useTranslation('week17');
  const constraintsLines = raw(
    'promptEngineering.constraints.constraintsLines',
  );
  const verifyLines = raw('promptEngineering.constraints.verifyLines');
  const [mode, setMode] = useState<Mode>('all');

  const options: { id: Mode; label: string }[] = [
    { id: 'all', label: t('promptEngineering.ui.highlightAll') },
    {
      id: 'constraints',
      label: t('promptEngineering.ui.highlightConstraints'),
    },
    { id: 'verify', label: t('promptEngineering.ui.highlightVerify') },
  ];

  return (
    <div className="space-y-4">
      <InfoBox
        variant="orange"
        title={t('promptEngineering.constraints.infoTitle')}
      >
        <p className="text-sm leading-relaxed">
          {t('promptEngineering.constraints.infoDesc')}
        </p>
      </InfoBox>

      <DemoBox label={t('promptEngineering.ui.highlightLabel')}>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={mode === option.id}
                onClick={() => setMode(option.id)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  mode === option.id
                    ? 'border-orange-600 bg-orange-600 text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-orange-400'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="min-w-0 rounded-lg bg-gray-900 p-3 font-mono text-xs leading-relaxed text-gray-100">
            <div className="break-words">{`> ${t('promptEngineering.constraints.task')}`}</div>
            <div className="mt-1 break-words">{`  ${t('promptEngineering.constraints.constraintsLabel')}`}</div>
            {constraintsLines.map((line) => (
              <Line
                key={line}
                text={line}
                tag={t('promptEngineering.ui.constraintTag')}
                mode={mode}
                kind="constraints"
              />
            ))}
            <div className="mt-1 break-words">{`  ${t('promptEngineering.constraints.verifyLabel')}`}</div>
            {verifyLines.map((line) => (
              <Line
                key={line}
                text={line}
                tag={t('promptEngineering.ui.verifyTag')}
                mode={mode}
                kind="verify"
              />
            ))}
          </div>
        </div>
      </DemoBox>
    </div>
  );
};

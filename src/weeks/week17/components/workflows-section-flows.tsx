'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import { CodeBlock } from '../../../components/ui/code-block';
import { StablePanels } from '../../../components/ui/stable-panels';
import { Chip, PrevNext } from './workflows-section-controls';

interface CodeItem {
  title: string;
  code: string;
}

interface CodeStepperProps {
  label: string;
  items: CodeItem[];
}

const CodeStepper = ({ label, items }: CodeStepperProps) => {
  const { t } = useTranslation('week17');
  const [index, setIndex] = useState(0);

  return (
    <div>
      <p className="text-sm font-semibold text-gray-700">{label}</p>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((entry, i) => (
          <Chip
            key={entry.title}
            selected={i === index}
            onSelect={() => setIndex(i)}
          >
            {`${i + 1}. ${entry.title}`}
          </Chip>
        ))}
      </div>
      <PrevNext
        index={index}
        total={items.length}
        onChange={setIndex}
        prevLabel={t('workflows.prev')}
        nextLabel={t('workflows.next')}
      />
      <div className="mt-3 rounded-xl border border-teal-200 bg-white p-3 sm:p-4">
        <StablePanels index={index}>
          {items.map((entry) => (
            <div key={entry.title} className="min-w-0">
              <h4 className="mb-2 text-sm font-bold text-teal-900 break-words">
                {entry.title}
              </h4>
              <CodeBlock
                code={entry.code}
                language="bash"
                className="text-xs"
              />
            </div>
          ))}
        </StablePanels>
      </div>
    </div>
  );
};

export const FeatureDevFlow = () => {
  const { t, raw } = useTranslation('week17');
  const steps = raw('workflows.featureDev.steps');

  return (
    <div className="space-y-4">
      <InfoBox variant="blue" title={t('workflows.featureDev.infoTitle')}>
        <p className="text-sm leading-relaxed">
          {t('workflows.featureDev.infoDesc')}
        </p>
      </InfoBox>
      <CodeStepper label={t('workflows.stepsLabel')} items={steps} />
    </div>
  );
};

export const BugFixFlow = () => {
  const { t, raw } = useTranslation('week17');
  const agentSteps = raw('workflows.bugFix.agentSteps');
  const [index, setIndex] = useState(0);

  return (
    <div className="space-y-4">
      <InfoBox variant="orange" title={t('workflows.bugFix.infoTitle')}>
        <p className="text-sm leading-relaxed">
          {t('workflows.bugFix.infoDesc')}
        </p>
      </InfoBox>
      <div>
        <p className="mb-2 text-sm font-semibold text-gray-700">
          {t('workflows.bugFix.inputLabel')}
        </p>
        <CodeBlock
          code={t('workflows.bugFix.inputCode')}
          language="bash"
          className="text-xs"
        />
      </div>
      <div className="rounded-xl border border-teal-200 bg-white p-3 sm:p-4">
        <p className="text-sm font-semibold text-gray-700">
          {t('workflows.bugFix.agentLabel')}
        </p>
        <PrevNext
          index={index}
          total={agentSteps.length}
          onChange={setIndex}
          prevLabel={t('workflows.prev')}
          nextLabel={t('workflows.next')}
        />
        <ol className="mt-3 space-y-2">
          {agentSteps.map((step, i) => (
            <li key={step}>
              <button
                type="button"
                aria-pressed={i === index}
                aria-current={i === index ? 'step' : undefined}
                onClick={() => setIndex(i)}
                className={`flex w-full min-w-0 items-start gap-2 rounded-lg border px-3 py-2 text-left text-xs font-semibold leading-snug break-words transition-colors ${
                  i === index
                    ? 'border-teal-600 bg-teal-600 text-white'
                    : i < index
                      ? 'border-teal-200 bg-teal-50 text-teal-900'
                      : 'border-gray-200 bg-white text-gray-500 hover:bg-teal-50'
                }`}
              >
                <span
                  aria-hidden="true"
                  className="grid shrink-0 justify-items-start tabular-nums"
                >
                  <span
                    className={`col-start-1 row-start-1 ${i < index ? '' : 'invisible'}`}
                  >
                    {'✓'}
                  </span>
                  <span
                    className={`col-start-1 row-start-1 ${i < index ? 'invisible' : ''}`}
                  >
                    {`${i + 1}.`}
                  </span>
                </span>
                <span className="min-w-0">{step}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export const CodeReviewFlow = () => {
  const { t, raw } = useTranslation('week17');
  const methods = raw('workflows.codeReview.methods');

  return <CodeStepper label={t('workflows.methodsLabel')} items={methods} />;
};

export const AutomationFlow = () => {
  const { t, raw } = useTranslation('week17');
  const cases = raw('workflows.automation.cases');
  const tips = raw('workflows.automation.tips');

  return (
    <div className="space-y-4">
      <InfoBox variant="blue" title={t('workflows.automation.infoTitle')}>
        <p className="text-sm leading-relaxed">
          {t('workflows.automation.infoDesc')}
        </p>
      </InfoBox>
      <CodeStepper label={t('workflows.casesLabel')} items={cases} />
      <div className="rounded-lg border border-green-200 bg-green-50 p-3">
        <p className="text-xs font-bold text-green-900">
          {t('workflows.automation.tipsTitle')}
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-xs text-green-900">
          {tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

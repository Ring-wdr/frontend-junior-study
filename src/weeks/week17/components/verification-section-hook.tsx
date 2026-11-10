'use client';

import { AlertTriangle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import { CodeBlock } from '../../../components/ui/code-block';
import { StablePanels } from '../../../components/ui/stable-panels';
import { panelId, TabList, tabId } from './verification-section-tabs';

const ID_PREFIX = 'verification-hook';
const ACTIVE = 'border-blue-600 bg-blue-600 text-white';

export const VerificationHook = () => {
  const { t, raw } = useTranslation('week17');
  const [tab, setTab] = useState(0);
  const [failed, setFailed] = useState(false);
  const passSteps = raw('verification.hook.pass.steps');
  const failSteps = raw('verification.hook.fail.steps');

  const tabs = [
    { label: t('verification.hook.tabConfig'), activeClass: ACTIVE },
    { label: t('verification.hook.tabScript'), activeClass: ACTIVE },
  ];
  return (
    <div className="space-y-4">
      <InfoBox variant="blue" title={t('verification.hook.infoTitle')}>
        <p className="text-sm leading-relaxed">
          {t('verification.hook.infoDesc')}
        </p>
      </InfoBox>

      <div>
        <TabList
          items={tabs}
          selected={tab}
          onSelect={setTab}
          ariaLabel={t('verification.hook.tabsLabel')}
          idPrefix={ID_PREFIX}
        />
        <div
          role="tabpanel"
          id={panelId(ID_PREFIX)}
          aria-labelledby={tabId(ID_PREFIX, tab)}
          className="mt-3"
        >
          <StablePanels index={tab}>
            <CodeBlock
              key="config"
              code={t('verification.hook.configCode')}
              language="json"
              className="text-xs"
            />
            <CodeBlock
              key="script"
              code={t('verification.hook.scriptCode')}
              language="json"
              className="text-xs"
            />
          </StablePanels>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-sm font-bold text-gray-800">
            {t('verification.hook.flowTitle')}
          </h4>
          <fieldset
            aria-label={t('verification.hook.flowLabel')}
            className="m-0 min-w-0 inline-flex rounded-full border border-gray-200 p-0.5"
          >
            <button
              type="button"
              aria-pressed={!failed}
              onClick={() => setFailed(false)}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                failed ? 'text-gray-600' : 'bg-green-600 text-white'
              }`}
            >
              <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {t('verification.hook.pass.label')}
            </button>
            <button
              type="button"
              aria-pressed={failed}
              onClick={() => setFailed(true)}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                failed ? 'bg-red-600 text-white' : 'text-gray-600'
              }`}
            >
              <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
              {t('verification.hook.fail.label')}
            </button>
          </fieldset>
        </div>

        <StablePanels index={failed ? 1 : 0} className="mt-3">
          {[passSteps, failSteps].map((steps, flowIdx) => (
            <ol
              key={flowIdx === 0 ? 'pass' : 'fail'}
              aria-label={t('verification.hook.stepsLabel')}
              className="space-y-2"
            >
              {steps.map((step, idx) => {
                const last = idx === steps.length - 1;
                const tone = !last
                  ? 'border-gray-200 bg-gray-50 text-gray-800'
                  : flowIdx === 1
                    ? 'border-red-300 bg-red-50 text-red-800'
                    : 'border-green-300 bg-green-50 text-green-800';
                return (
                  <li
                    key={step}
                    className={`flex min-w-0 items-start gap-2 rounded-lg border p-2 text-sm leading-relaxed ${tone}`}
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current bg-white text-xs font-bold tabular-nums">
                      {idx + 1}
                    </span>
                    <span className="min-w-0 break-words">{step}</span>
                  </li>
                );
              })}
            </ol>
          ))}
        </StablePanels>
      </div>
    </div>
  );
};

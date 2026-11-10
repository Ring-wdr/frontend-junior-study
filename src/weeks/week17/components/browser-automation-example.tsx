'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import { CodeBlock } from '../../../components/ui/code-block';
import { StablePanels } from '../../../components/ui/stable-panels';

type TabId = 'prompt' | 'ego' | 'habits';

const tabIds: TabId[] = ['prompt', 'ego', 'habits'];

export const BrowserAutomationExample = () => {
  const { t, raw } = useTranslation('week17');
  const habits = raw('browserAutomation.example.habits');
  const [tab, setTab] = useState<TabId>('prompt');

  const labels: Record<TabId, string> = {
    prompt: t('browserAutomation.example.tabPrompt'),
    ego: t('browserAutomation.example.tabEgo'),
    habits: t('browserAutomation.example.tabHabits'),
  };

  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-2">
        {tabIds.map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`ba-example-tab-${id}`}
            aria-selected={tab === id}
            aria-controls="ba-example-panel"
            onClick={() => setTab(id)}
            className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${
              tab === id
                ? 'border-green-600 bg-green-600 text-white'
                : 'border-green-300 bg-white text-green-800 hover:bg-green-50'
            }`}
          >
            {labels[id]}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id="ba-example-panel"
        aria-labelledby={`ba-example-tab-${tab}`}
        className="mt-3"
      >
        <StablePanels index={tabIds.indexOf(tab)}>
          <div key="prompt">
            <h4 className="font-bold text-sm text-green-800">
              {t('browserAutomation.example.promptTitle')}
            </h4>
            <CodeBlock
              code={t('browserAutomation.example.prompt')}
              language="text"
              className="mt-2 text-xs"
            />
          </div>
          <div key="ego">
            <h4 className="font-bold text-sm text-green-800">
              {t('browserAutomation.example.egoTitle')}
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-gray-600">
              {t('browserAutomation.example.egoNote')}
            </p>
            <CodeBlock
              code={t('browserAutomation.example.egoCode')}
              language="bash"
              className="mt-2 text-xs"
            />
          </div>
          <InfoBox
            key="habits"
            variant="green"
            title={t('browserAutomation.example.habitsTitle')}
          >
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {habits.map((habit) => (
                <li key={habit}>{habit}</li>
              ))}
            </ul>
          </InfoBox>
        </StablePanels>
      </div>
    </div>
  );
};

'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { Chip, Panel } from './ai-agents-section-controls';

export const AiAgentsSectionEra = () => {
  const { t, raw } = useTranslation('week17');
  const toolsFeatures = raw('aiAgents.era.toolsFeatures');
  const agentsFeatures = raw('aiAgents.era.agentsFeatures');
  const [agents, setAgents] = useState(false);
  const features = agents ? agentsFeatures : toolsFeatures;
  const label = agents
    ? t('aiAgents.era.agentsEra')
    : t('aiAgents.era.toolsEra');

  return (
    <div>
      <p className="text-sm font-semibold text-gray-700">
        {t('aiAgents.era.pickLabel')}
      </p>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Chip selected={!agents} onSelect={() => setAgents(false)}>
          {t('aiAgents.era.toolsEra')}
        </Chip>
        <Chip selected={agents} onSelect={() => setAgents(true)}>
          {t('aiAgents.era.agentsEra')}
        </Chip>
      </div>
      <div
        className={`mt-4 rounded-xl border p-3 sm:p-4 ${
          agents ? 'border-purple-200 bg-purple-50' : 'border-gray-200 bg-white'
        }`}
      >
        <Panel panelKey={label}>
          <h4
            className={`text-sm font-bold break-words ${
              agents ? 'text-purple-800' : 'text-gray-700'
            }`}
          >
            {label}
          </h4>
          <ul className="mt-2 space-y-1.5 text-sm text-gray-700">
            {features.map((item) => (
              <li key={item} className="flex gap-2 break-words">
                <span aria-hidden="true">•</span>
                <span className="min-w-0">{item}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
};

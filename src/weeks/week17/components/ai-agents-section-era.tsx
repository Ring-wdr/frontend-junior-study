'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { StablePanels } from '../../../components/ui/stable-panels';
import { Chip } from './ai-agents-section-controls';

export const AiAgentsSectionEra = () => {
  const { t, raw } = useTranslation('week17');
  const toolsFeatures = raw('aiAgents.era.toolsFeatures');
  const agentsFeatures = raw('aiAgents.era.agentsFeatures');
  const [agents, setAgents] = useState(false);

  const eras = [
    {
      id: 'tools',
      label: t('aiAgents.era.toolsEra'),
      features: toolsFeatures,
      box: 'border-gray-200 bg-white',
      title: 'text-gray-700',
    },
    {
      id: 'agents',
      label: t('aiAgents.era.agentsEra'),
      features: agentsFeatures,
      box: 'border-purple-200 bg-purple-50',
      title: 'text-purple-800',
    },
  ];

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
      <StablePanels index={agents ? 1 : 0} className="mt-4">
        {eras.map((era) => (
          <div
            key={era.id}
            className={`h-full rounded-xl border p-3 sm:p-4 ${era.box}`}
          >
            <h4 className={`text-sm font-bold break-words ${era.title}`}>
              {era.label}
            </h4>
            <ul className="mt-2 space-y-1.5 text-sm text-gray-700">
              {era.features.map((item) => (
                <li key={item} className="flex gap-2 break-words">
                  <span aria-hidden="true">•</span>
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </StablePanels>
    </div>
  );
};

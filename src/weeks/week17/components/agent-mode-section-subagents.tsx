'use client';

import { FileSearch } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import { CodeBlock } from '../../../components/ui/code-block';

export const AgentModeSubAgents = () => {
  const { t, raw } = useTranslation('week17');
  const agents = raw('agentMode.subAgents');
  const [selected, setSelected] = useState(0);
  const agent = agents[selected];
  const isCustom = selected === agents.length - 1;

  return (
    <div className="space-y-4">
      <InfoBox variant="blue" title={t('agentMode.subAgentsInfoTitle')}>
        <p className="text-sm leading-relaxed">
          {t('agentMode.subAgentsInfoDesc')}
        </p>
      </InfoBox>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {agents.map((item, index) => {
          const active = index === selected;
          return (
            <button
              key={item.name}
              type="button"
              aria-pressed={active}
              onClick={() => setSelected(index)}
              className={`min-w-0 rounded-lg border p-3 text-left transition-colors ${
                active
                  ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <FileSearch
                  className="h-4 w-4 shrink-0 text-blue-600"
                  aria-hidden="true"
                />
                <span
                  className={`text-xs break-words ${
                    active ? 'font-bold text-blue-800' : 'font-semibold'
                  }`}
                >
                  {item.name}
                </span>
              </span>
              <span className="mt-1 block text-xs text-gray-600 break-words">
                {item.desc}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={agent.name}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          {isCustom && (
            <>
              <p className="text-xs font-semibold text-gray-600">
                {t('agentMode.ui.exampleLabel')}
              </p>
              <CodeBlock
                code={t('agentMode.subAgentCode')}
                language="markdown"
                className="mt-2 text-xs"
              />
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

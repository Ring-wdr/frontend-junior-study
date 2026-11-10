'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { CodeBlock } from '../../../components/ui/code-block';
import { Rich } from './mcp-servers-section-rich';
import { panelId, TabList, tabId } from './mcp-servers-section-tabs';

const ID_PREFIX = 'mcp-install';

export const McpServersInstall = () => {
  const { t, raw } = useTranslation('week17');
  const agents = raw('mcpServers.install.items');
  const [idx, setIdx] = useState(0);
  const agent = agents[idx];

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-700 leading-relaxed">
        {t('mcpServers.install.hint')}
      </p>
      <TabList
        idPrefix={ID_PREFIX}
        ariaLabel={t('mcpServers.install.tabsLabel')}
        selected={idx}
        onSelect={setIdx}
        items={agents.map((item) => ({ label: item.name }))}
      />
      <div
        role="tabpanel"
        id={panelId(ID_PREFIX)}
        aria-labelledby={tabId(ID_PREFIX, idx)}
        className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="min-w-0 space-y-3"
          >
            <h4 className="font-bold text-sm text-green-800">{agent.name}</h4>
            {agent.intro && (
              <p className="text-xs text-gray-700 leading-relaxed">
                <Rich text={agent.intro} />
              </p>
            )}
            {agent.blocks.map((block) => (
              <div key={block.code} className="space-y-2">
                {block.note && (
                  <p className="text-xs text-gray-700 leading-relaxed">
                    <Rich text={block.note} />
                  </p>
                )}
                <CodeBlock
                  code={block.code}
                  language={block.language}
                  className="text-xs"
                />
              </div>
            ))}
            {agent.bullets.length > 0 && (
              <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700 leading-relaxed">
                {agent.bullets.map((bullet) => (
                  <li key={bullet} className="break-words">
                    <Rich text={bullet} />
                  </li>
                ))}
              </ul>
            )}
            {agent.outro && (
              <p className="text-xs text-gray-700 leading-relaxed">
                <Rich text={agent.outro} />
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

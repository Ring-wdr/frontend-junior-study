'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { SectionCard } from '../../../components/section-card';
import { AgentModeBasics } from './agent-mode-section-basics';
import { AgentModeCompare } from './agent-mode-section-compare';
import { AgentModePermissions } from './agent-mode-section-permissions';
import {
  AgentModeCursor,
  AgentModeInterview,
  AgentModePlan,
} from './agent-mode-section-simple';
import { AgentModeSubAgents } from './agent-mode-section-subagents';
import { Pager, panelId, TabList, tabId } from './agent-mode-section-tabs';
import { AgentModeTeams } from './agent-mode-section-teams';

const ID_PREFIX = 'agent-mode-topic';

const TopicPanel = ({ index }: { index: number }) => {
  switch (index) {
    case 0:
      return <AgentModeBasics />;
    case 1:
      return <AgentModePermissions />;
    case 2:
      return <AgentModePlan />;
    case 3:
      return <AgentModeInterview />;
    case 4:
      return <AgentModeSubAgents />;
    case 5:
      return <AgentModeTeams />;
    case 6:
      return <AgentModeCompare />;
    default:
      return <AgentModeCursor />;
  }
};

export const AgentModeSection = () => {
  const { t, raw } = useTranslation('week17');
  const tabs = raw('agentMode.tabs');
  const titles = [
    t('agentMode.basicUsageTitle'),
    t('agentMode.permissionModesTitle'),
    t('agentMode.planModeTitle'),
    t('agentMode.interviewModeTitle'),
    t('agentMode.subAgentsTitle'),
    t('agentMode.teamsTitle'),
    t('agentMode.teamsVsSubAgentsTitle'),
    t('agentMode.cursorTitle'),
  ];
  const [topic, setTopic] = useState(0);

  return (
    <SectionCard
      badge={{ label: t('agentMode.badge'), color: 'purple' }}
      description={t('agentMode.description')}
    >
      <div>
        <div className="space-y-4">
          <TabList
            items={tabs}
            selected={topic}
            onSelect={setTopic}
            ariaLabel={t('agentMode.ui.tabsLabel')}
            idPrefix={ID_PREFIX}
          />

          <div
            role="tabpanel"
            id={panelId(ID_PREFIX)}
            aria-labelledby={tabId(ID_PREFIX, topic)}
            className="min-w-0 rounded-xl border border-purple-200 bg-white p-3 sm:p-4"
          >
            <h3 className="mb-3 text-base font-bold break-words text-purple-900">
              {titles[topic]}
            </h3>
            <AnimatePresence mode="wait">
              <motion.div
                key={topic}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              >
                <TopicPanel index={topic} />
              </motion.div>
            </AnimatePresence>

            <Pager
              index={topic}
              total={tabs.length}
              onChange={setTopic}
              prevLabel={t('agentMode.ui.prev')}
              nextLabel={t('agentMode.ui.next')}
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

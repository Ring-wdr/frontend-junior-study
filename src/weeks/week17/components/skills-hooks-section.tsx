'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { SectionCard } from '../../../components/section-card';
import { StablePanels } from '../../../components/ui/stable-panels';
import { SkillsHooksChooser } from './skills-hooks-section-chooser';
import { SkillsHooksClaudeMd } from './skills-hooks-section-claude-md';
import { SkillsHooksHooks } from './skills-hooks-section-hooks';
import { SkillsHooksSkills } from './skills-hooks-section-skills';
import { panelId, TabList, tabId } from './skills-hooks-section-tabs';

const ID_PREFIX = 'skills-hooks-topic';
const TONES = ['green', 'orange', 'blue'] as const;

export const SkillsHooksSection = () => {
  const { t, raw } = useTranslation('week17');
  const topics = raw('skillsHooks.topics');
  const [topic, setTopic] = useState(0);

  return (
    <SectionCard
      badge={{ label: t('skillsHooks.badge'), color: 'green' }}
      description={t('skillsHooks.description')}
      testId="skills-hooks-section"
    >
      <div className="space-y-6">
        <TabList
          idPrefix={ID_PREFIX}
          ariaLabel={t('skillsHooks.ui.topicsLabel')}
          selected={topic}
          onSelect={setTopic}
          tone={TONES[topic]}
          items={topics}
        />

        <div
          role="tabpanel"
          id={panelId(ID_PREFIX)}
          aria-labelledby={tabId(ID_PREFIX, topic)}
          className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4"
        >
          <StablePanels index={topic}>
            <div key="skills">
              <h3 className="mb-3 break-words font-bold text-base text-gray-900">
                {t('skillsHooks.skills.title')}
              </h3>
              <SkillsHooksSkills />
            </div>
            <div key="hooks">
              <h3 className="mb-3 break-words font-bold text-base text-gray-900">
                {t('skillsHooks.hooks.title')}
              </h3>
              <SkillsHooksHooks />
            </div>
            <div key="claude-md">
              <h3 className="mb-3 break-words font-bold text-base text-gray-900">
                {t('skillsHooks.claudeMd.title')}
              </h3>
              <SkillsHooksClaudeMd />
            </div>
          </StablePanels>
        </div>

        <SkillsHooksChooser onGo={setTopic} />
      </div>
    </SectionCard>
  );
};

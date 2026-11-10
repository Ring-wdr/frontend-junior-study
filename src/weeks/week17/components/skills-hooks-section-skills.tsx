'use client';

import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import { CodeBlock } from '../../../components/ui/code-block';
import { StablePanels } from '../../../components/ui/stable-panels';
import { Pager } from './skills-hooks-section-pager';
import { panelId, TabList, tabId } from './skills-hooks-section-tabs';

const SUB_PREFIX = 'skills-hooks-skills-sub';

interface Item {
  name: string;
  desc: string;
}

interface PickerProps {
  title: string;
  label: string;
  items: Item[];
  icon: boolean;
  prevLabel: string;
  nextLabel: string;
}

const Picker = ({
  title,
  label,
  items,
  icon,
  prevLabel,
  nextLabel,
}: PickerProps) => {
  const [idx, setIdx] = useState(0);

  return (
    <div className="mt-4">
      <h4 className="font-bold text-sm text-green-800">{title}</h4>
      <fieldset className="m-0 mt-2 flex min-w-0 flex-wrap gap-2 border-0 p-0">
        <legend className="sr-only">{label}</legend>
        {items.map((it, i) => {
          const active = i === idx;
          return (
            <button
              key={it.name}
              type="button"
              aria-pressed={active}
              onClick={() => setIdx(i)}
              className={`inline-flex min-w-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? 'border-green-600 bg-green-600 text-white'
                  : 'border-green-200 bg-white text-green-800 hover:bg-green-50'
              }`}
            >
              {icon && (
                <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              )}
              <code className="break-all">{it.name}</code>
            </button>
          );
        })}
      </fieldset>
      <Pager
        index={idx}
        total={items.length}
        onChange={setIdx}
        prevLabel={prevLabel}
        nextLabel={nextLabel}
      />
      <div className="mt-3">
        <StablePanels index={idx}>
          {items.map((it) => (
            <div
              key={it.name}
              className="rounded-lg border border-green-200 bg-green-50/50 p-3"
            >
              <code className="break-all text-sm font-bold text-green-700">
                {it.name}
              </code>
              <p className="mt-1 break-words text-xs leading-relaxed text-gray-700">
                {it.desc}
              </p>
            </div>
          ))}
        </StablePanels>
      </div>
    </div>
  );
};

export const SkillsHooksSkills = () => {
  const { t, raw } = useTranslation('week17');
  const examples = raw('skillsHooks.skills.examples');
  const fields = raw('skillsHooks.skills.fields');
  const [sub, setSub] = useState(0);

  return (
    <div>
      <InfoBox variant="green" title={t('skillsHooks.skills.infoTitle')}>
        <p className="text-sm leading-relaxed">
          {t('skillsHooks.skills.infoDesc')}
        </p>
      </InfoBox>
      <div className="mt-4">
        <TabList
          idPrefix={SUB_PREFIX}
          ariaLabel={t('skillsHooks.ui.topicsLabel')}
          selected={sub}
          onSelect={setSub}
          tone="green"
          items={[
            t('skillsHooks.skills.examplesTitle'),
            t('skillsHooks.skills.fieldsTitle'),
            t('skillsHooks.ui.codeSkill'),
          ]}
        />
      </div>
      <div
        role="tabpanel"
        id={panelId(SUB_PREFIX)}
        aria-labelledby={tabId(SUB_PREFIX, sub)}
      >
        <StablePanels index={sub}>
          <Picker
            key="examples"
            title={t('skillsHooks.skills.examplesTitle')}
            label={t('skillsHooks.ui.skillsLabel')}
            items={examples}
            icon
            prevLabel={t('skillsHooks.ui.prev')}
            nextLabel={t('skillsHooks.ui.next')}
          />
          <Picker
            key="fields"
            title={t('skillsHooks.skills.fieldsTitle')}
            label={t('skillsHooks.ui.fieldsLabel')}
            items={fields}
            icon={false}
            prevLabel={t('skillsHooks.ui.prev')}
            nextLabel={t('skillsHooks.ui.next')}
          />
          <div key="code" className="mt-4">
            <p className="mb-2 font-mono text-[11px] font-semibold text-gray-500">
              {t('skillsHooks.ui.codeSkill')}
            </p>
            <CodeBlock
              code={t('skillsHooks.skills.code')}
              language="markdown"
              className="text-xs"
            />
          </div>
        </StablePanels>
      </div>
    </div>
  );
};

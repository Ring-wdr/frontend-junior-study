'use client';

import { Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import { CodeBlock } from '../../../components/ui/code-block';
import { Pager } from './skills-hooks-section-pager';

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
  const item = items[idx];

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
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="mt-3 rounded-lg border border-green-200 bg-green-50/50 p-3"
        >
          <code className="break-all text-sm font-bold text-green-700">
            {item.name}
          </code>
          <p className="mt-1 break-words text-xs leading-relaxed text-gray-700">
            {item.desc}
          </p>
          <Pager
            index={idx}
            total={items.length}
            onChange={setIdx}
            prevLabel={prevLabel}
            nextLabel={nextLabel}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export const SkillsHooksSkills = () => {
  const { t, raw } = useTranslation('week17');
  const examples = raw('skillsHooks.skills.examples');
  const fields = raw('skillsHooks.skills.fields');

  return (
    <div>
      <InfoBox variant="green" title={t('skillsHooks.skills.infoTitle')}>
        <p className="text-sm leading-relaxed">
          {t('skillsHooks.skills.infoDesc')}
        </p>
      </InfoBox>
      <Picker
        title={t('skillsHooks.skills.examplesTitle')}
        label={t('skillsHooks.ui.skillsLabel')}
        items={examples}
        icon
        prevLabel={t('skillsHooks.ui.prev')}
        nextLabel={t('skillsHooks.ui.next')}
      />
      <Picker
        title={t('skillsHooks.skills.fieldsTitle')}
        label={t('skillsHooks.ui.fieldsLabel')}
        items={fields}
        icon={false}
        prevLabel={t('skillsHooks.ui.prev')}
        nextLabel={t('skillsHooks.ui.next')}
      />
      <p className="mt-4 mb-2 font-mono text-[11px] font-semibold text-gray-500">
        {t('skillsHooks.ui.codeSkill')}
      </p>
      <CodeBlock
        code={t('skillsHooks.skills.code')}
        language="markdown"
        className="text-xs"
      />
    </div>
  );
};

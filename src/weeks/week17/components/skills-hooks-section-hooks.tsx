'use client';

import { ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import { CodeBlock } from '../../../components/ui/code-block';
import { Pager } from './skills-hooks-section-pager';
import { SkillsHooksSim } from './skills-hooks-section-sim';
import { panelId, TabList, tabId } from './skills-hooks-section-tabs';

const CODE_PREFIX = 'skills-hooks-code';

export const SkillsHooksHooks = () => {
  const { t, raw } = useTranslation('week17');
  const events = raw('skillsHooks.hooks.events');
  const [eventIdx, setEventIdx] = useState(0);
  const [codeIdx, setCodeIdx] = useState(0);
  const event = events[eventIdx];

  return (
    <div>
      <InfoBox variant="orange" title={t('skillsHooks.hooks.infoTitle')}>
        <p className="text-sm leading-relaxed">
          {t('skillsHooks.hooks.infoDesc')}
        </p>
      </InfoBox>

      <fieldset className="m-0 mt-4 flex min-w-0 flex-wrap items-center gap-y-2 border-0 p-0">
        <legend className="sr-only">{t('skillsHooks.ui.eventsLabel')}</legend>
        {events.map((e, i) => {
          const active = i === eventIdx;
          return (
            <span key={e.name} className="inline-flex items-center">
              <button
                type="button"
                aria-pressed={active}
                onClick={() => setEventIdx(i)}
                className={`inline-flex min-w-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? 'border-orange-600 bg-orange-600 text-white'
                    : 'border-orange-200 bg-white text-orange-800 hover:bg-orange-50'
                }`}
              >
                <span className="tabular-nums">{i + 1}</span>
                <code className="break-all">{e.name}</code>
              </button>
              {i < events.length - 1 && (
                <ChevronRight
                  className="mx-0.5 h-3.5 w-3.5 shrink-0 text-orange-300"
                  aria-hidden="true"
                />
              )}
            </span>
          );
        })}
      </fieldset>

      <AnimatePresence mode="wait">
        <motion.div
          key={eventIdx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="mt-3 rounded-lg border border-orange-200 bg-orange-50/50 p-3"
        >
          <code className="break-all text-sm font-bold text-orange-700">
            {event.name}
          </code>
          <dl className="mt-2 space-y-2">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                {t('skillsHooks.hooks.labels.timing')}
              </dt>
              <dd className="mt-0.5 break-words text-xs leading-relaxed text-gray-800">
                {event.timing}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                {t('skillsHooks.hooks.labels.usage')}
              </dt>
              <dd className="mt-0.5 break-words text-xs leading-relaxed text-gray-800">
                {event.usage}
              </dd>
            </div>
          </dl>
          <Pager
            index={eventIdx}
            total={events.length}
            onChange={setEventIdx}
            prevLabel={t('skillsHooks.ui.prev')}
            nextLabel={t('skillsHooks.ui.next')}
          />
        </motion.div>
      </AnimatePresence>
      <p className="mt-2 break-words text-xs text-gray-600 leading-relaxed">
        {t('skillsHooks.hooks.note')}
      </p>

      <SkillsHooksSim />

      <div className="mt-4 space-y-2">
        <TabList
          idPrefix={CODE_PREFIX}
          ariaLabel={t('skillsHooks.ui.codeTabsLabel')}
          selected={codeIdx}
          onSelect={setCodeIdx}
          tone="orange"
          items={[
            t('skillsHooks.ui.codeConfig'),
            t('skillsHooks.ui.codeScript'),
          ]}
        />
        <div
          role="tabpanel"
          id={panelId(CODE_PREFIX)}
          aria-labelledby={tabId(CODE_PREFIX, codeIdx)}
        >
          {codeIdx === 0 ? (
            <CodeBlock
              code={t('skillsHooks.hooks.configCode')}
              language="json"
              className="text-xs"
            />
          ) : (
            <CodeBlock
              code={t('skillsHooks.hooks.scriptCode')}
              language="bash"
              className="text-xs"
            />
          )}
        </div>
      </div>
    </div>
  );
};

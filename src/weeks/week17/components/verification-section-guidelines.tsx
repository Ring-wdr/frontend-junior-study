'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { Pager, panelId, TabList, tabId } from './verification-section-tabs';

const ID_PREFIX = 'verification-guidelines';

const STYLES = [
  {
    active: 'border-green-600 bg-green-600 text-white',
    box: 'border-green-200 bg-green-50 text-green-800',
    dot: 'bg-green-500',
  },
  {
    active: 'border-orange-600 bg-orange-600 text-white',
    box: 'border-orange-200 bg-orange-50 text-orange-800',
    dot: 'bg-orange-500',
  },
  {
    active: 'border-red-600 bg-red-600 text-white',
    box: 'border-red-200 bg-red-50 text-red-800',
    dot: 'bg-red-500',
  },
];

export const VerificationGuidelines = () => {
  const { t, raw } = useTranslation('week17');
  const groups = raw('verification.guidelines.groups');
  const [selected, setSelected] = useState(0);
  const group = groups[selected];
  const style = STYLES[selected];

  return (
    <div>
      <TabList
        items={groups.map((g, idx) => ({
          label: g.title,
          activeClass: STYLES[idx].active,
        }))}
        selected={selected}
        onSelect={setSelected}
        ariaLabel={t('verification.guidelines.tabsLabel')}
        idPrefix={ID_PREFIX}
      />

      <div
        role="tabpanel"
        id={panelId(ID_PREFIX)}
        aria-labelledby={tabId(ID_PREFIX, selected)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`mt-4 rounded-lg border p-4 ${style.box}`}
          >
            <h4 className="mb-2 text-sm font-bold">{group.title}</h4>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex min-w-0 items-start gap-2 text-sm leading-relaxed"
                >
                  <span
                    className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 break-words">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      <Pager
        index={selected}
        total={groups.length}
        onChange={setSelected}
        prevLabel={t('verification.guidelines.prev')}
        nextLabel={t('verification.guidelines.next')}
      />
    </div>
  );
};

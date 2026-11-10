'use client';

import { motion } from 'motion/react';
import { type KeyboardEvent, useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { StablePanels } from '../../../components/ui/stable-panels';
import {
  AutomationFlow,
  BugFixFlow,
  CodeReviewFlow,
  FeatureDevFlow,
} from './workflows-section-flows';

const FLOWS = [
  { id: 'featureDev', Flow: FeatureDevFlow },
  { id: 'bugFix', Flow: BugFixFlow },
  { id: 'codeReview', Flow: CodeReviewFlow },
  { id: 'automation', Flow: AutomationFlow },
] as const;

export const WorkflowsSection = () => {
  const { t, raw } = useTranslation('week17');
  const tabs = raw('workflows.tabs');
  const [index, setIndex] = useState(0);
  const titles = {
    featureDev: t('workflows.featureDev.title'),
    bugFix: t('workflows.bugFix.title'),
    codeReview: t('workflows.codeReview.title'),
    automation: t('workflows.automation.title'),
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = FLOWS.length - 1;
    const next =
      e.key === 'ArrowRight'
        ? Math.min(index + 1, last)
        : e.key === 'ArrowLeft'
          ? Math.max(index - 1, 0)
          : index;
    if (next !== index) {
      e.preventDefault();
      setIndex(next);
      document.getElementById(`workflows-tab-${next}`)?.focus();
    }
  };

  return (
    <SectionCard
      badge={{ label: t('workflows.badge'), color: 'teal' }}
      description={t('workflows.description')}
      testId="workflows-section"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="space-y-4"
      >
        <div
          role="tablist"
          aria-label={t('workflows.pickLabel')}
          className="flex flex-wrap gap-2"
        >
          {tabs.map((label, i) => (
            <button
              key={label}
              id={`workflows-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-controls="workflows-panel"
              tabIndex={i === index ? 0 : -1}
              onClick={() => setIndex(i)}
              onKeyDown={onKeyDown}
              className={`min-w-0 rounded-lg border px-3 py-2 text-xs font-semibold break-words transition-colors ${
                i === index
                  ? 'border-teal-600 bg-teal-600 text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-teal-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id="workflows-panel"
          aria-labelledby={`workflows-tab-${index}`}
        >
          <StablePanels index={index}>
            {FLOWS.map(({ id, Flow }) => (
              <SubSection key={id} title={titles[id]} icon iconColor="blue">
                <Flow />
              </SubSection>
            ))}
          </StablePanels>
        </div>
      </motion.div>
    </SectionCard>
  );
};

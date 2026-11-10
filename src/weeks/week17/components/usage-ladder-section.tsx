'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { StablePanels } from '../../../components/ui/stable-panels';
import { Checklist } from './usage-ladder-parts';
import { UsageLadderStepContent } from './usage-ladder-steps';

export const UsageLadderSection = () => {
  const { t, raw } = useTranslation('week17');
  const steps = raw('usageLadder.steps');
  const wrap = raw('usageLadder.wrap');
  const titles = [
    t('usageLadder.s1.title'),
    t('usageLadder.s2.title'),
    t('usageLadder.s3.title'),
    t('usageLadder.s4.title'),
    t('usageLadder.s5.title'),
    t('usageLadder.s6.title'),
  ];
  const [step, setStep] = useState(0);
  const [tab, setTab] = useState('does');

  return (
    <SectionCard
      badge={{ label: t('usageLadder.badge'), color: 'indigo' }}
      description={t('usageLadder.description')}
    >
      <div className="space-y-8">
        <InfoBox variant="gray">
          <p className="text-sm leading-relaxed">{t('usageLadder.notice')}</p>
        </InfoBox>

        <InfoBox variant="blue" title={t('usageLadder.principleTitle')}>
          <p className="text-sm leading-relaxed">
            {t('usageLadder.principleBody')}
          </p>
        </InfoBox>

        <DemoBox label={t('usageLadder.ui.stepsLabel')}>
          <div className="space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-6">
              {steps.map((item, index) => {
                const selected = index === step;
                return (
                  <button
                    key={item.name}
                    type="button"
                    aria-pressed={selected}
                    aria-current={selected ? 'step' : undefined}
                    onClick={() => setStep(index)}
                    className={`min-w-0 shrink-0 basis-40 rounded-lg border p-2.5 text-left transition-colors sm:basis-auto ${
                      selected
                        ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600'
                        : 'border-gray-200 bg-white hover:border-indigo-300'
                    }`}
                  >
                    <span
                      className={`block text-xs font-semibold break-words ${
                        selected ? 'text-indigo-800' : 'text-gray-800'
                      }`}
                    >
                      {item.name}
                    </span>
                    <span className="mt-1 block text-[11px] leading-snug text-gray-600 break-words">
                      {item.summary}
                    </span>
                  </button>
                );
              })}
            </div>

            <div>
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="text-gray-600">
                  {t('usageLadder.ui.progress')}
                </span>
                <span className="font-bold tabular-nums text-indigo-700">
                  {step + 1}/{steps.length}
                </span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full border border-indigo-100 bg-white">
                <motion.div
                  initial={false}
                  animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                disabled={step === 0}
                className="inline-flex items-center gap-1 rounded-md bg-indigo-100 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                {t('usageLadder.ui.prev')}
              </button>
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={step === steps.length - 1}
                className="inline-flex items-center gap-1 rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t('usageLadder.ui.next')}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="min-w-0 rounded-xl border border-indigo-200 bg-white p-3 sm:p-4">
              <StablePanels index={step}>
                {titles.map((title, index) => (
                  <div key={title} className="min-w-0">
                    <h3 className="text-base font-bold text-indigo-900 break-words">
                      {title}
                    </h3>
                    <div className="mt-3">
                      <UsageLadderStepContent
                        step={index}
                        tab={tab}
                        onTabChange={setTab}
                      />
                    </div>
                  </div>
                ))}
              </StablePanels>
            </div>
          </div>
        </DemoBox>

        <SubSection title={wrap.title} icon iconColor="green">
          <Checklist
            items={wrap.steps}
            hint={t('usageLadder.ui.checklistHint')}
            doneLabel={t('usageLadder.ui.done')}
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};

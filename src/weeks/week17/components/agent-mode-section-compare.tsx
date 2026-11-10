'use client';

import {
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Play,
  RotateCcw,
  Send,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';

interface LaneProps {
  title: string;
  items: string[];
  token: string;
  step: number;
  tone: 'indigo' | 'purple';
}

const tones = {
  indigo: {
    card: 'border-indigo-200',
    title: 'text-indigo-800',
    icon: 'text-indigo-700',
    active: 'border-indigo-300 bg-indigo-50 text-indigo-900',
    arrow: 'text-indigo-600',
    token: 'text-indigo-700',
  },
  purple: {
    card: 'border-purple-200',
    title: 'text-purple-800',
    icon: 'text-purple-700',
    active: 'border-purple-300 bg-purple-50 text-purple-900',
    arrow: 'text-purple-600',
    token: 'text-purple-700',
  },
};

const Lane = ({ title, items, token, step, tone }: LaneProps) => {
  const c = tones[tone];
  const Icon = tone === 'indigo' ? MessageSquare : Send;
  return (
    <div className={`min-w-0 rounded-xl border bg-white p-3 sm:p-4 ${c.card}`}>
      <div className="mb-3 flex items-center gap-2">
        <Icon className={`h-4 w-4 shrink-0 ${c.icon}`} />
        <h5 className={`min-w-0 text-sm font-semibold ${c.title}`}>{title}</h5>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => {
          const isDone = step > index + 1;
          const isActive = step === index + 1;
          return (
            <li
              key={item}
              aria-current={isActive ? 'step' : undefined}
              className={`rounded-lg border p-2.5 text-xs leading-relaxed transition-colors duration-200 ${
                isActive
                  ? c.active
                  : isDone
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                    : 'border-gray-200 bg-white text-gray-600'
              }`}
            >
              <div className="flex items-start gap-2">
                {isDone ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                ) : isActive ? (
                  <ArrowRight
                    className={`mt-0.5 h-4 w-4 shrink-0 ${c.arrow}`}
                  />
                ) : (
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-gray-300 text-[11px] text-gray-400">
                    {index + 1}
                  </span>
                )}
                <span className="min-w-0 font-medium break-words">{item}</span>
              </div>
            </li>
          );
        })}
      </ul>
      <p className={`mt-3 text-[11px] ${c.token}`}>{token}</p>
    </div>
  );
};

export const AgentModeCompare = () => {
  const { t, raw } = useTranslation('week17');
  const parallelItems = raw('agentMode.teamsVsSubAgentsParallelItems');
  const teamsItems = raw('agentMode.teamsVsSubAgentsTeamsItems');
  const guide = raw('agentMode.teamsGuide');
  const maxStep = Math.max(parallelItems.length, teamsItems.length);
  const [step, setStep] = useState(0);
  const progress = maxStep > 0 ? (step / maxStep) * 100 : 0;

  return (
    <div className="space-y-4">
      <InfoBox
        variant="blue"
        title={t('agentMode.teamsVsSubAgentsCompareTitle')}
      >
        <p className="text-sm leading-relaxed">
          {t('agentMode.teamsVsSubAgentsIntro')}
        </p>
      </InfoBox>

      <DemoBox label={t('agentMode.teamsVsSubAgentsCompareTitle')}>
        <div className="rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50 p-3 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-indigo-900">
                {t('agentMode.teamsVsSubAgentsPrompt')}
              </p>
              <p className="mt-1 text-xs text-indigo-700" aria-live="polite">
                {step === 0
                  ? t('agentMode.teamsVsSubAgentsReadyHint')
                  : `${t('agentMode.teamsVsSubAgentsStepLabel')} ${step}/${maxStep}`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
                disabled={step <= 0}
                className="inline-flex items-center gap-2 rounded-md bg-indigo-100 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t('agentMode.ui.prevStep')}
              </button>
              <button
                type="button"
                onClick={() => setStep((prev) => Math.min(prev + 1, maxStep))}
                disabled={step >= maxStep}
                className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Play className="h-3.5 w-3.5" />
                {t('agentMode.teamsVsSubAgentsNextStep')}
              </button>
              <button
                type="button"
                onClick={() => setStep(0)}
                className="inline-flex items-center gap-2 rounded-md bg-indigo-100 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {t('agentMode.teamsVsSubAgentsReset')}
              </button>
            </div>
          </div>

          <div className="mt-3 h-1.5 overflow-hidden rounded-full border border-indigo-100 bg-white">
            <motion.div
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-indigo-500 to-blue-500"
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_1fr]">
            <Lane
              title={t('agentMode.teamsVsSubAgentsParallelTitle')}
              items={parallelItems}
              token={t('agentMode.teamsVsSubAgentsParallelToken')}
              step={step}
              tone="indigo"
            />
            <div className="hidden items-center justify-center md:flex">
              <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                VS
              </span>
            </div>
            <Lane
              title={t('agentMode.teamsVsSubAgentsTeamsTitle')}
              items={teamsItems}
              token={t('agentMode.teamsVsSubAgentsTeamsToken')}
              step={step}
              tone="purple"
            />
          </div>
        </div>
      </DemoBox>

      <InfoBox variant="green" title={t('agentMode.teamsGuideTitle')}>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          {guide.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </InfoBox>
    </div>
  );
};

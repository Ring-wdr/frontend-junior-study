'use client';

import {
  ArrowRight,
  CheckCircle2,
  FileText,
  LayoutGrid,
  MessageSquare,
  Send,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { CodeBlock } from '../../../components/ui/code-block';

const StepIcon = ({ index, enabled }: { index: number; enabled: boolean }) => {
  if (index === 0) return <MessageSquare className="h-4 w-4" />;
  if (index === 1)
    return enabled ? (
      <Send className="h-4 w-4" />
    ) : (
      <FileText className="h-4 w-4" />
    );
  if (index === 2)
    return enabled ? (
      <FileText className="h-4 w-4" />
    ) : (
      <Send className="h-4 w-4" />
    );
  return <CheckCircle2 className="h-4 w-4" />;
};

export const AgentModeTeams = () => {
  const { t, raw } = useTranslation('week17');
  const withTeam = raw('agentMode.teamsWithGenerative');
  const withoutTeam = raw('agentMode.teamsWithoutGenerative');
  const [enabled, setEnabled] = useState(true);
  const items = enabled ? withTeam : withoutTeam;

  return (
    <div className="space-y-4">
      <InfoBox variant="purple" title={t('agentMode.teamsCompareTitle')}>
        <p className="text-sm leading-relaxed">
          {t('agentMode.teamsDescription')}
        </p>
      </InfoBox>

      <DemoBox label={t('agentMode.teamsCompareTitle')}>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-gray-700">
              {t('agentMode.teamsSharedPrompt')}
            </p>
            <div className="inline-flex overflow-hidden rounded-md border border-indigo-200 bg-white">
              <button
                type="button"
                aria-pressed={enabled}
                onClick={() => setEnabled(true)}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                  enabled
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-indigo-50'
                }`}
              >
                {t('agentMode.teamsWithGenerativeBadge')}
              </button>
              <button
                type="button"
                aria-pressed={!enabled}
                onClick={() => setEnabled(false)}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                  !enabled
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-indigo-50'
                }`}
              >
                {t('agentMode.teamsWithoutGenerativeBadge')}
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs break-words text-gray-700">
            {t('agentMode.teamsSharedPromptText')}
          </div>

          <div className="rounded-xl border border-indigo-200 bg-white p-3 sm:p-4">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <LayoutGrid className="h-4 w-4 shrink-0 text-indigo-700" />
              <h5 className="min-w-0 text-sm font-bold text-indigo-900">
                {enabled
                  ? t('agentMode.teamsWithGenerativeTitle')
                  : t('agentMode.teamsWithoutGenerativeTitle')}
              </h5>
              <span
                className={`ml-auto rounded-full px-2 py-0.5 text-[11px] ${
                  enabled
                    ? 'border border-indigo-200 bg-indigo-100 text-indigo-700'
                    : 'border border-orange-200 bg-orange-100 text-orange-700'
                }`}
              >
                {enabled
                  ? t('agentMode.teamsWithGenerativeBadge')
                  : t('agentMode.teamsWithoutGenerativeBadge')}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={enabled ? 'teams-on' : 'teams-off'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="space-y-2"
              >
                <p className="text-[11px] font-semibold tracking-wide text-indigo-700 uppercase">
                  {enabled
                    ? t('agentMode.teamsVisualOutputTitle')
                    : t('agentMode.teamsTextOutputTitle')}
                </p>

                <div className="rounded-lg border border-indigo-200/80 bg-white p-3">
                  {items.map((item, index) => (
                    <div
                      key={item}
                      className="relative flex gap-3 py-2 first:pt-0 last:pb-0"
                    >
                      <div className="relative shrink-0">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700">
                          <StepIcon index={index} enabled={enabled} />
                        </div>
                        {index !== items.length - 1 && (
                          <div className="absolute top-7 left-1/2 h-4 -translate-x-1/2 border-l-2 border-dashed border-indigo-200" />
                        )}
                      </div>
                      <p className="min-w-0 pt-1.5 text-xs leading-relaxed break-words text-gray-800">
                        <span className="mr-1 font-bold">{index + 1}.</span>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-2 flex items-start gap-2 text-[11px] text-indigo-700">
                  <ArrowRight className="h-4 w-4 shrink-0" />
                  <span>
                    {enabled
                      ? t('agentMode.teamsWithGenerativeToken')
                      : t('agentMode.teamsWithoutGenerativeToken')}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </DemoBox>

      <CodeBlock
        code={t('agentMode.teamsCode')}
        language="bash"
        className="text-xs"
      />
    </div>
  );
};

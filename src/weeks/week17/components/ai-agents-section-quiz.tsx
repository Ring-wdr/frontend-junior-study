'use client';

import { Bot, User } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { StablePanels } from '../../../components/ui/stable-panels';

type Side = 'ai' | 'human';

const toSide = (value: string): Side => (value === 'ai' ? 'ai' : 'human');

export const AiAgentsSectionQuiz = () => {
  const { t, raw } = useTranslation('week17');
  const tasks = raw('aiAgents.capabilities.tasks');
  const [answers, setAnswers] = useState<Record<number, Side>>({});
  const labels: Record<Side, string> = {
    ai: t('aiAgents.capabilities.aiShort'),
    human: t('aiAgents.capabilities.humanShort'),
  };
  const correctCount = tasks.filter(
    (task, i) => answers[i] === toSide(task.side),
  ).length;
  const answered = Object.keys(answers).length;

  const answer = (i: number, side: Side) =>
    setAnswers((prev) => (prev[i] ? prev : { ...prev, [i]: side }));

  const revealAll = () =>
    setAnswers(
      Object.fromEntries(tasks.map((task, i) => [i, toSide(task.side)])),
    );

  return (
    <div>
      <p className="text-sm text-gray-700">{t('aiAgents.capabilities.lead')}</p>
      <ul className="mt-3 space-y-2">
        {tasks.map((task, i) => {
          const picked = answers[i];
          const isRight = picked === toSide(task.side);
          return (
            <li
              key={task.text}
              className={`rounded-lg border p-3 ${
                picked
                  ? isRight
                    ? 'border-green-300 bg-green-50'
                    : 'border-orange-300 bg-orange-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <p className="text-sm text-gray-800 break-words">{task.text}</p>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {(['ai', 'human'] as const).map((side) => (
                  <button
                    key={side}
                    type="button"
                    aria-pressed={picked === side}
                    disabled={Boolean(picked)}
                    onClick={() => answer(i, side)}
                    className={`flex min-w-0 items-center gap-2 rounded-md border px-3 py-1.5 text-left text-xs font-semibold break-words transition-colors ${
                      picked === side
                        ? 'border-purple-600 bg-purple-600 text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-purple-50'
                    } disabled:cursor-default`}
                  >
                    {side === 'ai' ? (
                      <Bot className="h-4 w-4 shrink-0" aria-hidden="true" />
                    ) : (
                      <User className="h-4 w-4 shrink-0" aria-hidden="true" />
                    )}
                    {labels[side]}
                  </button>
                ))}
              </div>
              <StablePanels index={picked ? (isRight ? 1 : 2) : 0}>
                <p className="mt-2 text-xs font-semibold" aria-hidden="true">
                  {'\u00a0'}
                </p>
                <p className="mt-2 text-xs font-semibold text-green-700">
                  {`✓ ${t('aiAgents.capabilities.correct')}`}
                </p>
                <p className="mt-2 text-xs font-semibold text-orange-700">
                  {`✗ ${t('aiAgents.capabilities.wrong')}: ${labels[toSide(task.side)]}`}
                </p>
              </StablePanels>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold tabular-nums text-gray-600">
          {`${t('aiAgents.capabilities.score')}: ${correctCount} / ${tasks.length}`}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={revealAll}
            disabled={answered === tasks.length}
            className="rounded-md border border-purple-200 bg-white px-3 py-1.5 text-xs font-medium text-purple-700 hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t('aiAgents.capabilities.reveal')}
          </button>
          <button
            type="button"
            onClick={() => setAnswers({})}
            disabled={answered === 0}
            className="rounded-md bg-purple-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t('aiAgents.capabilities.reset')}
          </button>
        </div>
      </div>
    </div>
  );
};

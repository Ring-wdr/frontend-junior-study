'use client';

import { ArrowRight, Bot, Check, RotateCcw, User, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { StablePanels } from '../../../components/ui/stable-panels';

type Side = 'ai' | 'human';

const sides: Side[] = ['ai', 'human'];

const toSide = (value: string): Side => (value === 'ai' ? 'ai' : 'human');

export const AiAgentsSectionQuiz = () => {
  const { t, raw } = useTranslation('week17');
  const tasks = raw('aiAgents.capabilities.tasks');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Side>>({});
  const total = tasks.length;
  const finished = step >= total;
  const labels: Record<Side, string> = {
    ai: t('aiAgents.capabilities.aiShort'),
    human: t('aiAgents.capabilities.humanShort'),
  };
  const correctCount = tasks.filter(
    (task, i) => answers[i] === toSide(task.side),
  ).length;
  const answeredCount = Object.keys(answers).length;

  const answer = (i: number, side: Side) =>
    setAnswers((prev) => (prev[i] ? prev : { ...prev, [i]: side }));

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold tabular-nums text-gray-600">
          {finished
            ? t('aiAgents.capabilities.resultTitle')
            : `${step + 1} / ${total}`}
        </span>
        <span className="text-xs font-semibold tabular-nums text-purple-700">
          {`${t('aiAgents.capabilities.score')}: ${correctCount} / ${total}`}
        </span>
      </div>
      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-200"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={answeredCount}
        aria-label={t('aiAgents.capabilities.score')}
      >
        <div
          className="h-full rounded-full bg-purple-600 transition-[width] duration-300"
          style={{ width: `${(answeredCount / total) * 100}%` }}
        />
      </div>

      <StablePanels index={Math.min(step, total)} className="mt-4">
        {tasks.map((task, i) => {
          const picked = answers[i];
          const correctSide = toSide(task.side);
          const isRight = picked === correctSide;
          return (
            <div
              key={task.text}
              className="mx-auto flex h-full max-w-xl flex-col justify-center py-2"
            >
              <p className="text-center text-xs text-gray-500">
                {t('aiAgents.capabilities.lead')}
              </p>
              <p className="mt-3 break-words text-center text-lg font-bold text-gray-900 sm:text-xl">
                {task.text}
              </p>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {sides.map((side) => {
                  const chosen = picked === side;
                  const reveal = Boolean(picked) && side === correctSide;
                  return (
                    <button
                      key={side}
                      type="button"
                      aria-pressed={chosen}
                      disabled={Boolean(picked)}
                      onClick={() => answer(i, side)}
                      className={`flex min-w-0 items-center justify-center gap-2 rounded-xl border-2 px-4 py-4 text-sm font-semibold break-words transition-colors disabled:cursor-default ${
                        reveal
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : chosen
                            ? 'border-orange-400 bg-orange-50 text-orange-800'
                            : picked
                              ? 'border-gray-200 bg-white text-gray-400'
                              : 'border-gray-200 bg-white text-gray-800 hover:border-purple-400 hover:bg-purple-50'
                      }`}
                    >
                      {side === 'ai' ? (
                        <Bot className="h-5 w-5 shrink-0" aria-hidden="true" />
                      ) : (
                        <User className="h-5 w-5 shrink-0" aria-hidden="true" />
                      )}
                      {labels[side]}
                    </button>
                  );
                })}
              </div>
              <StablePanels
                index={picked ? (isRight ? 1 : 2) : 0}
                className="mt-4 text-center text-sm font-semibold"
              >
                <p aria-hidden="true">{' '}</p>
                <p className="text-green-700">
                  {`✓ ${t('aiAgents.capabilities.correct')}`}
                </p>
                <p className="text-orange-700">
                  {`✗ ${t('aiAgents.capabilities.wrong')}: ${labels[correctSide]}`}
                </p>
              </StablePanels>
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => setStep(i + 1)}
                  disabled={!picked}
                  className="inline-flex items-center gap-2 rounded-md bg-purple-600 px-5 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {i === total - 1
                    ? t('aiAgents.capabilities.seeResult')
                    : t('aiAgents.capabilities.next')}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          );
        })}
        <div className="flex h-full flex-col justify-center py-2">
          <p className="text-center text-lg font-bold tabular-nums text-gray-900">
            {`${t('aiAgents.capabilities.score')}: ${correctCount} / ${total}`}
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {sides.map((side) => (
              <div
                key={side}
                className={`rounded-lg border p-3 ${
                  side === 'ai'
                    ? 'border-green-200 bg-green-50'
                    : 'border-orange-200 bg-orange-50'
                }`}
              >
                <h4
                  className={`flex items-center gap-2 text-sm font-bold ${
                    side === 'ai' ? 'text-green-800' : 'text-orange-800'
                  }`}
                >
                  {side === 'ai' ? (
                    <Bot className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <User className="h-4 w-4" aria-hidden="true" />
                  )}
                  {labels[side]}
                </h4>
                <ul className="mt-2 space-y-1">
                  {tasks.map((task, i) =>
                    toSide(task.side) === side ? (
                      <li
                        key={task.text}
                        className="flex items-start gap-2 text-xs text-gray-800"
                      >
                        {answers[i] === side ? (
                          <Check
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-600"
                            aria-label={t('aiAgents.capabilities.correct')}
                          />
                        ) : (
                          <X
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-600"
                            aria-label={t('aiAgents.capabilities.wrong')}
                          />
                        )}
                        <span className="min-w-0 break-words">{task.text}</span>
                      </li>
                    ) : null,
                  )}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={restart}
              className="inline-flex items-center gap-2 rounded-md border border-purple-200 bg-white px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              {t('aiAgents.capabilities.reset')}
            </button>
          </div>
        </div>
      </StablePanels>
    </div>
  );
};

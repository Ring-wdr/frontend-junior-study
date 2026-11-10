'use client';

import { Check } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { DemoBox } from '../../../components/demo-box';
import { CodeBlock } from '../../../components/ui/code-block';

export const PromptEngineeringGoal = () => {
  const { t, raw } = useTranslation('week17');
  const badItems = raw('promptEngineering.goal.badItems');
  const pieces = raw('promptEngineering.goal.pieces');
  const [good, setGood] = useState(false);
  const [on, setOn] = useState([true, true, true]);

  const toggle = (index: number) => {
    setOn((prev) => prev.map((value, i) => (i === index ? !value : value)));
  };

  const active = pieces.filter((_, index) => on[index]);
  const assembled = active.length
    ? `"${active.map((piece) => piece.text).join('\n')}"`
    : '';

  return (
    <DemoBox label={t('promptEngineering.ui.assembleLabel')}>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={!good}
            onClick={() => setGood(false)}
            className={`min-w-0 rounded-lg border px-3 py-2 text-left text-xs font-semibold break-words transition-colors ${
              good
                ? 'border-gray-200 bg-white text-gray-700 hover:border-red-300'
                : 'border-red-500 bg-red-50 text-red-800 ring-1 ring-red-500'
            }`}
          >
            {t('promptEngineering.goal.badLabel')}
          </button>
          <button
            type="button"
            aria-pressed={good}
            onClick={() => setGood(true)}
            className={`min-w-0 rounded-lg border px-3 py-2 text-left text-xs font-semibold break-words transition-colors ${
              good
                ? 'border-green-600 bg-green-50 text-green-800 ring-1 ring-green-600'
                : 'border-gray-200 bg-white text-gray-700 hover:border-green-300'
            }`}
          >
            {t('promptEngineering.goal.goodLabel')}
          </button>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {good ? (
            <motion.div
              key="good"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="min-w-0 space-y-3 rounded-xl border border-green-200 bg-green-50 p-3 sm:p-4"
            >
              <p className="text-xs text-gray-600">
                {t('promptEngineering.ui.piecesHint')}
              </p>
              <div className="flex flex-wrap gap-2">
                {pieces.map((piece, index) => (
                  <button
                    key={piece.name}
                    type="button"
                    aria-pressed={on[index]}
                    onClick={() => toggle(index)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      on[index]
                        ? 'border-green-600 bg-green-600 text-white'
                        : 'border-gray-300 bg-white text-gray-600 hover:border-green-400'
                    }`}
                  >
                    {on[index] && <Check className="h-3.5 w-3.5" />}
                    {piece.name}
                    <span className="sr-only">
                      {on[index]
                        ? t('promptEngineering.ui.pieceOn')
                        : t('promptEngineering.ui.pieceOff')}
                    </span>
                  </button>
                ))}
              </div>
              <div>
                <h4 className="mb-1 text-xs font-bold text-green-800">
                  {t('promptEngineering.ui.assembledLabel')}
                </h4>
                {assembled ? (
                  <CodeBlock
                    code={assembled}
                    language="text"
                    className="text-xs"
                  />
                ) : (
                  <p className="rounded-md border border-dashed border-gray-300 bg-white p-3 text-xs text-gray-600">
                    {t('promptEngineering.ui.emptyPrompt')}
                  </p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="bad"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="min-w-0 space-y-3 rounded-xl border border-red-200 bg-red-50 p-3 sm:p-4"
            >
              {badItems.map((item) => (
                <div key={item.label}>
                  <h4 className="mb-1 text-xs font-bold text-red-700">
                    {item.label}
                  </h4>
                  <CodeBlock
                    code={item.text}
                    language="text"
                    className="text-xs"
                  />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DemoBox>
  );
};

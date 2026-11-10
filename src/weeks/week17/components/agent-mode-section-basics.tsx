'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { CodeBlock } from '../../../components/ui/code-block';

export const AgentModeBasics = () => {
  const { t, raw } = useTranslation('week17');
  const tasks = raw('agentMode.basicTasks');
  const [selected, setSelected] = useState(0);
  const task = tasks[selected];

  return (
    <div>
      <p className="text-xs font-semibold text-gray-600">
        {t('agentMode.ui.taskLabel')}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {tasks.map((item, index) => {
          const active = index === selected;
          return (
            <button
              key={item.label}
              type="button"
              aria-pressed={active}
              onClick={() => setSelected(index)}
              className={`min-w-0 rounded-lg border px-3 py-1.5 text-left text-xs break-words transition-colors ${
                active
                  ? 'border-purple-600 bg-purple-50 font-bold text-purple-800 ring-1 ring-purple-600'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs font-semibold text-gray-600">
        {t('agentMode.ui.commandLabel')}
      </p>
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="mt-2"
        >
          <CodeBlock code={task.code} language="bash" className="text-xs" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

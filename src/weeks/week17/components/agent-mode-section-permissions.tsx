'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';

export const AgentModePermissions = () => {
  const { t, raw } = useTranslation('week17');
  const modes = raw('agentMode.permissionModes');
  const [selected, setSelected] = useState(0);
  const mode = modes[selected];

  return (
    <div className="space-y-4">
      <InfoBox variant="orange" title={t('agentMode.permissionModesInfoTitle')}>
        <p className="text-sm leading-relaxed">
          {t('agentMode.permissionModesInfoDesc')}
        </p>
      </InfoBox>

      <div>
        <div className="flex items-center justify-between gap-2 text-[11px] text-gray-500">
          <span>{t('agentMode.ui.modeLow')}</span>
          <span className="font-semibold text-gray-700">
            {t('agentMode.ui.modeLabel')}
          </span>
          <span>{t('agentMode.ui.modeHigh')}</span>
        </div>
        <div className="mt-1 h-1.5 rounded-full bg-gradient-to-r from-green-300 via-orange-300 to-red-400" />
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {modes.map((item, index) => {
            const active = index === selected;
            return (
              <button
                key={item.name}
                type="button"
                aria-pressed={active}
                onClick={() => setSelected(index)}
                className={`min-w-0 rounded-lg border p-2 text-left transition-colors ${
                  active
                    ? 'border-orange-600 bg-orange-50 ring-1 ring-orange-600'
                    : 'border-gray-200 bg-white hover:border-orange-300'
                }`}
              >
                <span className="block text-[11px] tabular-nums text-gray-500">
                  {index + 1}/{modes.length}
                </span>
                <code
                  className={`block text-xs break-all ${
                    active ? 'font-bold text-orange-800' : 'text-gray-800'
                  }`}
                >
                  {item.name}
                </code>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode.name}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="rounded-lg border border-orange-200 bg-orange-50 p-3"
        >
          <code className="text-sm font-bold break-all text-orange-800">
            {mode.name}
          </code>
          <p className="mt-1 text-sm text-gray-700">{mode.desc}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

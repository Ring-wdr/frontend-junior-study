'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { Chip, Panel, PrevNext } from './browser-automation-controls';

export const BrowserAutomationGuide = () => {
  const { t, raw } = useTranslation('week17');
  const rows = raw('browserAutomation.guide.rows');
  const [index, setIndex] = useState(0);
  const row = rows[index] ?? rows[0];

  if (!row) {
    return null;
  }

  return (
    <div>
      <p className="text-sm font-semibold text-gray-700">
        {t('browserAutomation.guide.pickLabel')}
      </p>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {rows.map((item, i) => (
          <Chip
            key={item.situation}
            selected={i === index}
            onSelect={() => setIndex(i)}
          >
            {item.situation}
          </Chip>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-blue-200 bg-white p-3 sm:p-4">
        <Panel panelKey={row.situation} className="space-y-3">
          <h4 className="font-bold text-sm text-blue-900 break-words">
            {row.situation}
          </h4>
          <div className="rounded-lg bg-blue-50 p-3">
            <p className="text-[11px] font-semibold text-blue-700">
              {t('browserAutomation.guide.pickHead')}
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-800 break-words">
              {row.pick}
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-[11px] font-semibold text-gray-600">
              {t('browserAutomation.guide.reasonHead')}
            </p>
            <p className="mt-1 text-sm text-gray-700 break-words">
              {row.reason}
            </p>
          </div>
        </Panel>
        <PrevNext
          index={index}
          total={rows.length}
          onChange={setIndex}
          prevLabel={t('browserAutomation.explorer.prev')}
          nextLabel={t('browserAutomation.explorer.next')}
        />
      </div>
    </div>
  );
};

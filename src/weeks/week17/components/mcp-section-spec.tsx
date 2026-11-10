'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { StablePanels } from '../../../components/ui/stable-panels';
import { McpChip, McpPrevNext } from './mcp-section-controls';

export const McpSectionSpec = () => {
  const { t, raw } = useTranslation('week17');
  const items = raw('mcp.spec.items');
  const [index, setIndex] = useState(0);

  return (
    <div>
      <p className="text-sm font-semibold text-gray-700">
        {t('mcp.spec.pickLabel')}
      </p>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((entry, i) => (
          <McpChip
            key={entry.title}
            selected={i === index}
            onSelect={() => setIndex(i)}
          >
            {entry.title}
          </McpChip>
        ))}
      </div>

      <McpPrevNext
        index={index}
        total={items.length}
        onChange={setIndex}
        prevLabel={t('mcp.spec.prev')}
        nextLabel={t('mcp.spec.next')}
      />

      <div className="mt-3 rounded-xl border border-orange-200 bg-white p-3 sm:p-4">
        <StablePanels index={index}>
          {items.map((entry) => (
            <div key={entry.title} className="space-y-3">
              <h4 className="font-bold text-sm text-orange-900 break-words">
                {entry.title}
              </h4>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="min-w-0 rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <p className="text-[11px] font-semibold text-gray-600">
                    {t('mcp.spec.beforeLabel')}
                  </p>
                  <p className="mt-1 text-sm text-gray-700 break-words">
                    {entry.before}
                  </p>
                </div>
                <div className="min-w-0 rounded-lg border border-orange-300 bg-orange-50 p-3">
                  <p className="text-[11px] font-semibold text-orange-700">
                    {'→ '}
                    {t('mcp.spec.afterLabel')}
                  </p>
                  <p className="mt-1 text-sm text-gray-800 break-words">
                    {entry.after}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </StablePanels>
      </div>
    </div>
  );
};

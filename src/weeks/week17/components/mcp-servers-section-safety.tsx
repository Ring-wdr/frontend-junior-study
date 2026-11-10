'use client';

import { Check, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import { Rich } from './mcp-servers-section-rich';

export const McpServersSafety = () => {
  const { t, raw } = useTranslation('week17');
  const items = raw('mcpServers.security.items');
  const practices = raw('mcpServers.security.practices');
  const [checked, setChecked] = useState<string[]>([]);

  const toggle = (practice: string) => {
    setChecked((prev) =>
      prev.includes(practice)
        ? prev.filter((p) => p !== practice)
        : [...prev, practice],
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item}
            className="flex min-w-0 items-start gap-2 rounded-lg border border-red-100 bg-red-50/60 p-3"
          >
            <ShieldAlert
              className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
              aria-hidden="true"
            />
            <p className="break-words text-xs text-gray-800 leading-relaxed">
              <Rich text={item} />
            </p>
          </div>
        ))}
      </div>

      <InfoBox variant="orange" title={t('mcpServers.security.incidentsTitle')}>
        <p className="break-words text-sm leading-relaxed">
          <Rich text={t('mcpServers.security.incidentsBody')} />
        </p>
      </InfoBox>

      <InfoBox variant="green" title={t('mcpServers.security.practicesTitle')}>
        <p className="text-xs">{t('mcpServers.security.practicesHint')}</p>
        <ul className="mt-2 space-y-2">
          {practices.map((practice) => {
            const done = checked.includes(practice);
            return (
              <li key={practice}>
                <label
                  className={`flex min-w-0 cursor-pointer items-start gap-2 rounded-lg border p-2 text-sm leading-relaxed transition-colors ${
                    done
                      ? 'border-green-400 bg-white'
                      : 'border-green-200 bg-white/60'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={done}
                    onChange={() => toggle(practice)}
                    className="mt-1 h-4 w-4 shrink-0 accent-green-600"
                  />
                  <span className="min-w-0 break-words">
                    <Rich text={practice} />
                  </span>
                  <Check
                    className={`mt-1 h-4 w-4 shrink-0 text-green-600 ${done ? '' : 'invisible'}`}
                    aria-hidden="true"
                  />
                </label>
              </li>
            );
          })}
        </ul>
        <p
          className="mt-2 text-xs font-semibold tabular-nums"
          aria-live="polite"
        >
          {t('mcpServers.security.progressLabel')}: {checked.length} /{' '}
          {practices.length}
        </p>
      </InfoBox>
    </div>
  );
};

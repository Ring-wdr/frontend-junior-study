'use client';

import {
  ArrowRight,
  Bot,
  Database,
  GitBranch,
  Globe,
  Server,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { McpPanel, McpPrevNext } from './mcp-section-controls';

const serverParts = ['tools', 'resources', 'prompts'];
const transports = ['stdio', 'http'];

const externals = [
  { id: 'database', icon: Database },
  { id: 'browser', icon: Globe },
  { id: 'github', icon: GitBranch },
] as const;

const stateClass = (active: boolean) =>
  active
    ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-300'
    : 'border-gray-200 bg-white hover:bg-gray-50';

export const McpArchitectureVisualizer = () => {
  const { t, raw } = useTranslation('week17');
  const items = raw('mcp.visualizer.items');
  const [index, setIndex] = useState(0);
  const current = items[index] ?? items[0];

  if (!current) {
    return null;
  }

  const select = (id: string) => {
    const next = items.findIndex((entry) => entry.id === id);
    if (next >= 0) {
      setIndex(next);
    }
  };

  const id = current.id;
  const labelOf = (target: string) =>
    items.find((entry) => entry.id === target)?.label ?? target;
  const serverActive = id === 'server' || serverParts.includes(id);
  const transportActive = transports.includes(id);

  const arrowClass = `h-6 w-6 rotate-90 sm:rotate-0 ${
    transportActive ? 'text-blue-600' : 'text-gray-400'
  }`;

  return (
    <div>
      <p className="text-sm font-semibold text-gray-700">
        {t('mcp.visualizer.pickLabel')}
      </p>

      <div className="mt-3 grid grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <button
          type="button"
          aria-pressed={id === 'agent'}
          onClick={() => select('agent')}
          className={`flex min-w-0 flex-col items-center gap-2 rounded-xl border p-3 transition-colors ${stateClass(id === 'agent')}`}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600">
            <Bot className="h-6 w-6 text-white" aria-hidden="true" />
          </span>
          <span className="text-xs font-medium text-gray-700 break-words">
            {t('mcp.visualizer.agent')}
          </span>
        </button>

        <div className="flex flex-col items-center gap-1">
          <p className="text-[11px] text-gray-500">
            {t('mcp.visualizer.transportLabel')}
          </p>
          <div className="flex flex-wrap justify-center gap-1 sm:flex-col">
            {transports.map((tid) => (
              <button
                key={tid}
                type="button"
                aria-pressed={id === tid}
                onClick={() => select(tid)}
                className={`rounded-md border px-2 py-1 text-[11px] font-semibold break-words transition-colors ${stateClass(id === tid)}`}
              >
                {labelOf(tid)}
              </button>
            ))}
          </div>
          <ArrowRight className={arrowClass} aria-hidden="true" />
        </div>

        <div className="min-w-0 space-y-2">
          <button
            type="button"
            aria-pressed={id === 'server'}
            onClick={() => select('server')}
            className={`flex w-full min-w-0 flex-col items-center gap-2 rounded-xl border p-3 transition-colors ${stateClass(serverActive)}`}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600">
              <Server className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <span className="text-xs font-medium text-gray-700 break-words">
              {t('mcp.visualizer.server')}
            </span>
          </button>
          <div className="flex flex-wrap justify-center gap-1">
            {serverParts.map((pid) => (
              <button
                key={pid}
                type="button"
                aria-pressed={id === pid}
                onClick={() => select(pid)}
                className={`rounded-md border px-2 py-1 text-[11px] font-semibold break-all transition-colors ${stateClass(id === pid)}`}
              >
                {labelOf(pid)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowRight
            className="h-6 w-6 rotate-90 text-gray-400 sm:rotate-0"
            aria-hidden="true"
          />
        </div>

        <button
          type="button"
          aria-pressed={id === 'external'}
          onClick={() => select('external')}
          className={`flex min-w-0 flex-col gap-2 rounded-xl border p-3 text-left transition-colors ${stateClass(id === 'external')}`}
        >
          <span className="text-[11px] font-semibold text-gray-600">
            {t('mcp.visualizer.externalLabel')}
          </span>
          {externals.map((ext) => {
            const Icon = ext.icon;
            return (
              <span
                key={ext.id}
                className="flex items-center gap-2 text-xs text-gray-700"
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="break-words">
                  {t(`mcp.visualizer.servers.${ext.id}`)}
                </span>
              </span>
            );
          })}
        </button>
      </div>

      <div className="mt-4 rounded-xl border border-blue-200 bg-white p-3 sm:p-4">
        <McpPanel panelKey={id} className="space-y-1">
          <h4 className="font-bold text-sm text-blue-900 break-words">
            {current.label}
          </h4>
          <p className="text-sm leading-relaxed text-gray-700">
            {current.desc}
          </p>
        </McpPanel>
        <McpPrevNext
          index={index}
          total={items.length}
          onChange={setIndex}
          prevLabel={t('mcp.visualizer.prev')}
          nextLabel={t('mcp.visualizer.next')}
        />
      </div>
    </div>
  );
};

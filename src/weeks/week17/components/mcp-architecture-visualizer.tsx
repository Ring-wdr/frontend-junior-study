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

type ServerId = (typeof servers)[number]['id'];

const servers = [
  {
    id: 'database',
    icon: Database,
    activeClass: 'bg-blue-100 border-blue-300',
    activeIconClass: 'text-blue-600',
    activeTextClass: 'text-blue-700',
  },
  {
    id: 'browser',
    icon: Globe,
    activeClass: 'bg-green-100 border-green-300',
    activeIconClass: 'text-green-600',
    activeTextClass: 'text-green-700',
  },
  {
    id: 'github',
    icon: GitBranch,
    activeClass: 'bg-purple-100 border-purple-300',
    activeIconClass: 'text-purple-600',
    activeTextClass: 'text-purple-700',
  },
] as const;

export const McpArchitectureVisualizer = () => {
  const { t } = useTranslation('week17');
  const [activeServer, setActiveServer] = useState<ServerId | null>(null);

  const arrowClass = `w-6 h-6 sm:w-8 sm:h-8 rotate-90 sm:rotate-0 transition-colors duration-200 ${
    activeServer ? 'text-blue-500' : 'text-gray-400'
  }`;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
            <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <span className="mt-2 text-sm font-medium text-gray-700">
            {t('mcp.visualizer.agent')}
          </span>
        </div>

        <div className="flex sm:flex-col items-center gap-1">
          <ArrowRight className={arrowClass} aria-hidden="true" />
          <span className="text-xs text-gray-500">MCP</span>
        </div>

        <div className="flex flex-col items-center">
          <button
            type="button"
            aria-pressed={activeServer !== null}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center shadow-md transition-colors duration-200 ${
              activeServer
                ? 'bg-gradient-to-br from-blue-500 to-cyan-600'
                : 'bg-gradient-to-br from-gray-400 to-gray-500'
            }`}
            onClick={() => setActiveServer(activeServer ? null : 'database')}
          >
            <Server className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </button>
          <span className="mt-2 text-sm font-medium text-gray-700">
            {t('mcp.visualizer.server')}
          </span>
        </div>

        <ArrowRight className={arrowClass} aria-hidden="true" />

        <div className="flex flex-row flex-wrap justify-center sm:flex-col gap-2">
          {servers.map((server) => {
            const Icon = server.icon;
            const isActive = activeServer === server.id;
            return (
              <button
                key={server.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveServer(isActive ? null : server.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors duration-200 ${
                  isActive
                    ? server.activeClass
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${isActive ? server.activeIconClass : 'text-gray-500'}`}
                />
                <span
                  className={`text-xs font-medium ${isActive ? server.activeTextClass : 'text-gray-600'}`}
                >
                  {t(`mcp.visualizer.servers.${server.id}`)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 p-3 sm:p-4 bg-white rounded-lg border border-gray-100">
        <p className="text-sm text-gray-600 text-center">
          {t('mcp.visualizer.description')}
        </p>
      </div>
    </div>
  );
};

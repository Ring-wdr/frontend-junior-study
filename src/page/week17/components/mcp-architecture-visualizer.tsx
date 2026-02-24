import {
  ArrowRight,
  Bot,
  Database,
  GitBranch,
  Globe,
  Server,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const McpArchitectureVisualizer = () => {
  const { t } = useTranslation('week17');
  const [activeServer, setActiveServer] = useState<string | null>(null);

  const servers = [
    { id: 'database', icon: Database, label: 'Database', color: 'blue' },
    { id: 'browser', icon: Globe, label: 'Browser', color: 'green' },
    { id: 'github', icon: GitBranch, label: 'GitHub', color: 'purple' },
  ];

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {/* AI Agent */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Bot className="w-10 h-10 text-white" />
          </div>
          <span className="mt-2 text-sm font-medium text-gray-700">
            AI Agent
          </span>
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center gap-1">
          <ArrowRight className="w-8 h-8 text-gray-400" />
          <span className="text-xs text-gray-500">MCP</span>
        </div>

        {/* MCP Server */}
        <div className="flex flex-col items-center">
          <div
            className={`w-20 h-20 rounded-xl flex items-center justify-center shadow-lg transition-all cursor-pointer ${
              activeServer
                ? 'bg-gradient-to-br from-blue-500 to-cyan-600'
                : 'bg-gradient-to-br from-gray-400 to-gray-500'
            }`}
            onClick={() => setActiveServer(activeServer ? null : 'database')}
          >
            <Server className="w-10 h-10 text-white" />
          </div>
          <span className="mt-2 text-sm font-medium text-gray-700">
            MCP Server
          </span>
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center gap-1">
          <ArrowRight className="w-8 h-8 text-gray-400" />
        </div>

        {/* External Services */}
        <div className="flex flex-col gap-2">
          {servers.map((server) => {
            const Icon = server.icon;
            const isActive = activeServer === server.id;
            return (
              <button
                key={server.id}
                onClick={() => setActiveServer(isActive ? null : server.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                  isActive
                    ? `bg-${server.color}-100 border-${server.color}-300`
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${isActive ? `text-${server.color}-600` : 'text-gray-500'}`}
                />
                <span
                  className={`text-xs font-medium ${isActive ? `text-${server.color}-700` : 'text-gray-600'}`}
                >
                  {server.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Description */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 text-center">
          {t('mcp.visualizer.description')}
        </p>
      </div>
    </div>
  );
};

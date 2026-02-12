import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CodeBlock } from '../../../components/ui/code-block';

type DeployMode = 'build-time' | 'federation' | 'single-spa';

const hostByMode: Record<DeployMode, string> = {
  'build-time': 'npm package integration',
  federation: 'module federation host',
  'single-spa': 'single-spa root config',
};

export const ArchitectureGenerator = () => {
  const { t } = useTranslation('week20');

  const [teamCount, setTeamCount] = useState(3);
  const [domainPrefix, setDomainPrefix] = useState('commerce');
  const [sharedStore, setSharedStore] = useState(true);
  const [deployMode, setDeployMode] = useState<DeployMode>('federation');

  const teams = useMemo(
    () =>
      Array.from({ length: teamCount }, (_, idx) => ({
        name: `team-${idx + 1}`,
        domain: `${domainPrefix}-${idx + 1}`,
        remote: `${domainPrefix}${idx + 1}`,
      })),
    [domainPrefix, teamCount],
  );

  const code = useMemo(() => {
    const remotes = teams
      .map(
        (team) =>
          `    ${team.remote}: '${team.remote}@https://cdn.example.com/${team.domain}/remoteEntry.js',`,
      )
      .join('\n');

    const shared = [
      "    react: { singleton: true, requiredVersion: '^19.0.0' },",
      "    'react-dom': { singleton: true, requiredVersion: '^19.0.0' },",
    ];

    if (sharedStore) {
      shared.push("    '@org/shared-store': { singleton: true },");
    }

    return `new ModuleFederationPlugin({
  name: 'host',
  remotes: {
${remotes}
  },
  shared: {
${shared.join('\n')}
  },
});`;
  }, [sharedStore, teams]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="rounded-lg border border-gray-200 bg-white p-3">
          <span className="text-xs font-medium text-gray-600">
            {t('playbook.generator.teamCount')}
          </span>
          <input
            type="range"
            min={2}
            max={6}
            value={teamCount}
            onChange={(e) => setTeamCount(Number(e.target.value))}
            className="mt-2 w-full"
          />
          <p className="text-xs text-gray-500 mt-1">{teamCount}</p>
        </label>

        <label className="rounded-lg border border-gray-200 bg-white p-3">
          <span className="text-xs font-medium text-gray-600">
            {t('playbook.generator.domainPrefix')}
          </span>
          <input
            type="text"
            value={domainPrefix}
            onChange={(e) =>
              setDomainPrefix(e.target.value.toLowerCase() || 'app')
            }
            className="mt-2 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
          />
        </label>

        <label className="rounded-lg border border-gray-200 bg-white p-3">
          <span className="text-xs font-medium text-gray-600">
            {t('playbook.generator.deployMode')}
          </span>
          <select
            value={deployMode}
            onChange={(e) => setDeployMode(e.target.value as DeployMode)}
            className="mt-2 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm bg-white"
          >
            <option value="build-time">Build-time</option>
            <option value="federation">Module Federation</option>
            <option value="single-spa">single-spa</option>
          </select>
        </label>

        <label className="rounded-lg border border-gray-200 bg-white p-3 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-600">
            {t('playbook.generator.sharedStore')}
          </span>
          <button
            type="button"
            onClick={() => setSharedStore((prev) => !prev)}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
              sharedStore
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {sharedStore
              ? t('playbook.generator.on')
              : t('playbook.generator.off')}
          </button>
        </label>
      </div>

      <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4 space-y-3">
        <h5 className="text-sm font-semibold text-indigo-900">
          {t('playbook.generator.outputTitle')}
        </h5>
        <p className="text-xs text-indigo-800">
          {t('playbook.generator.outputSummary', {
            teamCount,
            host: hostByMode[deployMode],
          })}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {teams.map((team) => (
            <div
              key={team.name}
              className="rounded-lg bg-white border border-indigo-100 p-3"
            >
              <p className="text-xs text-gray-500">{team.name}</p>
              <p className="text-sm font-semibold text-gray-900">
                {team.domain}
              </p>
              <p className="text-xs text-indigo-700 mt-1">
                remote: {team.remote}
              </p>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock code={code} language="javascript" className="text-xs" />
    </div>
  );
};

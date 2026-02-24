import { useTranslation } from 'react-i18next';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const TokenOptimizationSection = () => {
  const { t } = useTranslation('week17');
  const mcpVsCdpRows = t('tokenOptimization.mcpVsCdpRows', {
    returnObjects: true,
  }) as Array<{ dimension: string; mcp: string; cdp: string; note: string }>;
  const checklist = t('tokenOptimization.contextOptimizationChecklist', {
    returnObjects: true,
  }) as string[];

  return (
    <SectionCard
      badge={{ label: t('tokenOptimization.badge'), color: 'teal' }}
      title={t('tokenOptimization.title')}
      description={t('tokenOptimization.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('tokenOptimization.playwrightMigrationTitle')}
          icon
          iconColor="blue"
        >
          <InfoBox
            variant="blue"
            title={t('tokenOptimization.playwrightMigrationInfoTitle')}
          >
            <p className="text-sm leading-relaxed">
              {t('tokenOptimization.playwrightMigrationInfoDesc')}
            </p>
          </InfoBox>

          <CodeBlock
            code={t('tokenOptimization.playwrightBefore')}
            language="json"
            className="mt-4 text-xs"
          />

          <CodeBlock
            code={t('tokenOptimization.playwrightAfter')}
            language="bash"
            className="mt-4 text-xs"
          />

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="font-bold text-sm text-blue-700 mb-2">
                MCP + AI 액션
              </h4>
              <p className="text-xs text-blue-700">
                {t('tokenOptimization.playwrightTip1')}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h4 className="font-bold text-sm text-green-700 mb-2">
                Playwright CLI
              </h4>
              <p className="text-xs text-green-700">
                {t('tokenOptimization.playwrightTip2')}
              </p>
            </div>
          </div>

          <InfoBox
            variant="orange"
            title={t('tokenOptimization.playwrightTipTitle')}
          >
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>{t('tokenOptimization.playwrightTip3')}</li>
              <li>{t('tokenOptimization.playwrightTip4')}</li>
              <li>{t('tokenOptimization.playwrightTip5')}</li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection
          title={t('tokenOptimization.mcpVsCdpTitle')}
          icon
          iconColor="purple"
        >
          <InfoBox
            variant="purple"
            title={t('tokenOptimization.mcpVsCdpIntroTitle')}
          >
            <p className="text-sm leading-relaxed">
              {t('tokenOptimization.mcpVsCdpIntro')}
            </p>
          </InfoBox>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-purple-50">
                  <th className="px-3 py-2 text-left font-semibold text-purple-800 border-b border-purple-200">
                    {t('tokenOptimization.dimension')}
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-purple-800 border-b border-purple-200">
                    MCP
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-purple-800 border-b border-purple-200">
                    CDP(Chrome DevTools)
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-purple-800 border-b border-purple-200">
                    {t('tokenOptimization.whenToUse')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {mcpVsCdpRows.map((row, idx) => (
                  <tr
                    key={row.dimension}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-purple-50/40'}
                  >
                    <td className="px-3 py-2 font-medium text-purple-700 border-b border-purple-100">
                      {row.dimension}
                    </td>
                    <td className="px-3 py-2 text-gray-700 border-b border-purple-100">
                      {row.mcp}
                    </td>
                    <td className="px-3 py-2 text-gray-700 border-b border-purple-100">
                      {row.cdp}
                    </td>
                    <td className="px-3 py-2 text-gray-700 border-b border-purple-100">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection
          title={t('tokenOptimization.contextOptimizationTitle')}
          icon
          iconColor="green"
        >
          <InfoBox
            variant="green"
            title={t('tokenOptimization.contextOptimizationInfoTitle')}
          >
            <p className="text-sm leading-relaxed">
              {t('tokenOptimization.contextOptimizationInfoDesc')}
            </p>
          </InfoBox>

          <CodeBlock
            code={t('tokenOptimization.contextOptimizationCode')}
            language="bash"
            className="mt-4 text-xs"
          />

          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                {item}
              </li>
            ))}
          </ul>
        </SubSection>
      </div>
    </SectionCard>
  );
};

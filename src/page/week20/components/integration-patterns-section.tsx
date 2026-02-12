import { useTranslation } from 'react-i18next';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

type Pattern = {
  name: string;
  pros: string;
  cons: string;
};

export const IntegrationPatternsSection = () => {
  const { t } = useTranslation('week20');
  const patterns = t('integration.patterns', {
    returnObjects: true,
  }) as unknown as Pattern[];

  return (
    <SectionCard
      badge={{ label: t('integration.badge'), color: 'blue' }}
      title={t('integration.title')}
      description={t('integration.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('integration.matrixTitle')} icon iconColor="blue">
          <div className="space-y-3">
            {patterns.map((pattern) => (
              <div
                key={pattern.name}
                className="rounded-xl border border-blue-100 bg-blue-50 p-4"
              >
                <h4 className="text-sm font-bold text-blue-900 mb-2">
                  {pattern.name}
                </h4>
                <p className="text-xs text-blue-800">+ {pattern.pros}</p>
                <p className="text-xs text-blue-700 mt-1">- {pattern.cons}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection
          title={t('integration.moduleFederationTitle')}
          icon
          iconColor="green"
        >
          <CodeBlock
            language="javascript"
            code={`new ModuleFederationPlugin({
  name: 'host',
  remotes: {
    header: 'header@http://localhost:3001/remoteEntry.js',
    checkout: 'checkout@http://localhost:3002/remoteEntry.js',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^19.0.0' },
    'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
  },
});`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('integration.viteTitle')} icon iconColor="orange">
          <CodeBlock
            language="typescript"
            code={`import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    federation({
      name: 'host',
      remotes: {
        catalog: 'http://localhost:5001/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
});`}
            className="text-xs"
          />
        </SubSection>

        <InfoBox variant="orange" title={t('integration.recommendationTitle')}>
          <p>{t('integration.recommendation')}</p>
        </InfoBox>
      </div>
    </SectionCard>
  );
};

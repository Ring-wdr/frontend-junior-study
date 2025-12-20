import { useTranslation } from 'react-i18next';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { ContextVisualizer } from './context-visualizer';

export const ContextSection = () => {
  const { t } = useTranslation('week4');

  return (
    <SectionCard
      badge={{ label: t('context.badge'), color: 'blue' }}
      title={t('context.title')}
      description={t('context.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('context.what.title')} icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('context.what.description')}
            </p>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <ContextVisualizer />
            </div>

            <InfoBox variant="blue" title={t('context.what.keyComponents.title')}>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>{t('context.what.keyComponents.createContext')}</li>
                <li>{t('context.what.keyComponents.provider')}</li>
                <li>{t('context.what.keyComponents.useContext')}</li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title={t('context.howToUse.title')} icon iconColor="green">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('context.howToUse.description')}
            </p>

            <CodeBlock
              code={`// 1. Create a context
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

// 2. Create a Provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Consume context in components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// 4. Use in your app
function App() {
  return (
    <ThemeProvider>
      <Header />
      <MainContent />
    </ThemeProvider>
  );
}

function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333' }}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title={t('context.bestUseCases.title')} icon iconColor="green">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('context.bestUseCases.description')}
            </p>

            <div className="grid grid-cols-1 gap-4">
              <InfoBox variant="green" title={t('context.bestUseCases.good.title')}>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>{t('context.bestUseCases.good.theme')}</li>
                  <li>{t('context.bestUseCases.good.language')}</li>
                  <li>{t('context.bestUseCases.good.auth')}</li>
                  <li>{t('context.bestUseCases.good.modal')}</li>
                  <li>{t('context.bestUseCases.good.featureFlags')}</li>
                </ul>
              </InfoBox>

              <InfoBox variant="orange" title={t('context.bestUseCases.poor.title')}>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>{t('context.bestUseCases.poor.frequently')}</li>
                  <li>{t('context.bestUseCases.poor.complex')}</li>
                  <li>{t('context.bestUseCases.poor.async')}</li>
                  <li>{t('context.bestUseCases.poor.caching')}</li>
                </ul>
              </InfoBox>
            </div>
          </div>
        </SubSection>

        <SubSection title={t('context.performance.title')} icon iconColor="red">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('context.performance.description')}
            </p>

            <InfoBox variant="red" title={t('context.performance.mainProblem.title')}>
              <p className="text-sm text-gray-700 mb-3">
                {t('context.performance.mainProblem.description')}
              </p>

              <CodeBlock
                code={`// Problem: Changing any part causes full re-render
const ThemeContext = createContext();

// Even if a component only uses \`theme\`,
// changing \`toggleTheme\` will cause it to re-render
<ThemeContext.Provider value={{ theme, toggleTheme }}>
  {children}
</ThemeContext.Provider>`}
                className="text-xs"
              />
            </InfoBox>

            <InfoBox variant="purple" title={t('context.performance.optimization.title')}>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>{t('context.performance.optimization.split')}</li>
                <li>{t('context.performance.optimization.memoize')}</li>
                <li>{t('context.performance.optimization.customHooks')}</li>
                <li>{t('context.performance.optimization.selectors')}</li>
              </ul>
            </InfoBox>

            <CodeBlock
              code={`// Better: Split contexts to avoid unnecessary re-renders
const ThemeContext = createContext();
const ThemeActionsContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // Memoize the action object so it doesn't change
  const actions = useMemo(() => ({ toggleTheme }), [toggleTheme]);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeActionsContext.Provider value={actions}>
        {children}
      </ThemeActionsContext.Provider>
    </ThemeContext.Provider>
  );
}`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection
          title={t('context.vsGlobalState.title')}
          icon
          iconColor="purple"
        >
          <div className="space-y-4">
            <InfoBox variant="blue" title={t('context.vsGlobalState.decisionFramework.title')}>
              <p className="text-sm text-gray-700 mb-3">
                <strong>{t('context.vsGlobalState.decisionFramework.useContext')}</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mb-3">
                <li>{t('context.vsGlobalState.decisionFramework.contextWhen.simple')}</li>
                <li>{t('context.vsGlobalState.decisionFramework.contextWhen.infrequent')}</li>
                <li>{t('context.vsGlobalState.decisionFramework.contextWhen.noAsync')}</li>
                <li>{t('context.vsGlobalState.decisionFramework.contextWhen.small')}</li>
              </ul>

              <p className="text-sm text-gray-700 mb-3">
                <strong>{t('context.vsGlobalState.decisionFramework.useLibrary')}</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>{t('context.vsGlobalState.decisionFramework.libraryWhen.complex')}</li>
                <li>{t('context.vsGlobalState.decisionFramework.libraryWhen.frequent')}</li>
                <li>{t('context.vsGlobalState.decisionFramework.libraryWhen.middleware')}</li>
                <li>{t('context.vsGlobalState.decisionFramework.libraryWhen.devtools')}</li>
              </ul>
            </InfoBox>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-300 bg-gray-50">
                    <th className="text-left p-2 font-semibold">{t('context.vsGlobalState.comparisonTable.aspect')}</th>
                    <th className="text-left p-2 font-semibold">{t('context.vsGlobalState.comparisonTable.contextApi')}</th>
                    <th className="text-left p-2 font-semibold">{t('context.vsGlobalState.comparisonTable.redux')}</th>
                    <th className="text-left p-2 font-semibold">{t('context.vsGlobalState.comparisonTable.zustand')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 font-medium">{t('context.vsGlobalState.comparisonTable.setup')}</td>
                    <td className="p-2">{t('context.vsGlobalState.comparisonTable.simple')}</td>
                    <td className="p-2">{t('context.vsGlobalState.comparisonTable.complex')}</td>
                    <td className="p-2">{t('context.vsGlobalState.comparisonTable.verySimple')}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 font-medium">{t('context.vsGlobalState.comparisonTable.performance')}</td>
                    <td className="p-2">{t('context.vsGlobalState.comparisonTable.requiresCare')}</td>
                    <td className="p-2">{t('context.vsGlobalState.comparisonTable.excellent')}</td>
                    <td className="p-2">{t('context.vsGlobalState.comparisonTable.excellent')}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 font-medium">{t('context.vsGlobalState.comparisonTable.devtools')}</td>
                    <td className="p-2">{t('context.vsGlobalState.comparisonTable.none')}</td>
                    <td className="p-2">{t('context.vsGlobalState.comparisonTable.excellent')}</td>
                    <td className="p-2">{t('context.vsGlobalState.comparisonTable.good')}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">{t('context.vsGlobalState.comparisonTable.for')}</td>
                    <td className="p-2">{t('context.vsGlobalState.comparisonTable.simpleApps')}</td>
                    <td className="p-2">{t('context.vsGlobalState.comparisonTable.complexApps')}</td>
                    <td className="p-2">{t('context.vsGlobalState.comparisonTable.mostApps')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </SubSection>

        <SubSection title={t('context.patterns.title')} icon iconColor="orange">
          <div className="space-y-4">
            <InfoBox variant="orange" title={t('context.patterns.providerHell.title')}>
              <p className="text-sm text-gray-700 mb-2">
                {t('context.patterns.providerHell.description')}
              </p>
              <CodeBlock
                code={`// Bad: Provider Hell
<ThemeProvider>
  <AuthProvider>
    <NotificationProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </NotificationProvider>
  </AuthProvider>
</ThemeProvider>`}
                className="text-xs"
              />
              <p className="text-xs text-gray-600 mt-2">
                {t('context.patterns.providerHell.solution')}
              </p>
            </InfoBox>

            <InfoBox variant="red" title={t('context.patterns.missingProvider.title')}>
              <p className="text-sm text-gray-700 mb-2">
                {t('context.patterns.missingProvider.description')}
              </p>
              <CodeBlock
                code={`export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeProvider component'
    );
  }

  return context;
}`}
                className="text-xs"
              />
            </InfoBox>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { ContextVisualizer } from './context-visualizer';

export const ContextSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Built-in', color: 'blue' }}
      title="Context API"
      description="React's built-in solution for avoiding prop-drilling and managing global state."
    >
      <div className="space-y-8">
        <SubSection title="What is Context API?" icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Context provides a way to pass data through the component tree
              without manually passing props down at every level. It's React's
              built-in mechanism for <strong>prop drilling</strong> avoidance and
              is perfect for <strong>low-frequency state updates</strong>.
            </p>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <ContextVisualizer />
            </div>

            <InfoBox variant="blue" title="Key Components">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>React.createContext():</strong> Creates a context object
                </li>
                <li>
                  <strong>Provider:</strong> Wraps components that need access to
                  the context value
                </li>
                <li>
                  <strong>useContext() hook:</strong> Consumes the context value in
                  functional components
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="How to Use Context" icon iconColor="green">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Context usage involves three main steps: creating the context,
              providing values, and consuming them in components.
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

        <SubSection title="Best Use Cases" icon iconColor="green">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Context API excels when your global state is <strong>simple</strong>,{' '}
              <strong>infrequently updated</strong>, and doesn't require complex
              synchronization logic.
            </p>

            <div className="grid grid-cols-1 gap-4">
              <InfoBox variant="green" title="Good Use Cases">
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>Theme preferences (light/dark mode)</li>
                  <li>Language/localization settings</li>
                  <li>Authentication status and user info</li>
                  <li>Modal/dialog state</li>
                  <li>Feature flags (static configuration)</li>
                </ul>
              </InfoBox>

              <InfoBox variant="orange" title="Poor Use Cases">
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>Frequently changing data (form inputs, real-time updates)</li>
                  <li>Complex state with many reducers</li>
                  <li>State requiring async middleware</li>
                  <li>App-wide caching needs</li>
                </ul>
              </InfoBox>
            </div>
          </div>
        </SubSection>

        <SubSection title="Performance Considerations" icon iconColor="red">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Context has <strong>important limitations</strong> that can lead to
              performance issues if not handled carefully.
            </p>

            <InfoBox variant="red" title="The Main Problem">
              <p className="text-sm text-gray-700 mb-3">
                When a Context value changes, <strong>all consuming components re-render</strong>,
                regardless of whether they use the changed part of the value.
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

            <InfoBox variant="purple" title="Optimization Strategies">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Split contexts:</strong> Separate your context into
                  multiple contexts for different concerns
                </li>
                <li>
                  <strong>Memoize values:</strong> Use useMemo to prevent
                  unnecessary re-renders
                </li>
                <li>
                  <strong>Use custom hooks:</strong> Create specific hooks that
                  only select needed values
                </li>
                <li>
                  <strong>Implement selectors:</strong> Use React.memo on child
                  components
                </li>
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

        <SubSection title="Context vs Global State Libraries" icon iconColor="purple">
          <div className="space-y-4">
            <InfoBox variant="blue" title="Decision Framework">
              <p className="text-sm text-gray-700 mb-3">
                <strong>Use Context API when:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mb-3">
                <li>State is simple and hierarchical</li>
                <li>Updates are infrequent</li>
                <li>No complex async logic needed</li>
                <li>Project is small to medium</li>
              </ul>

              <p className="text-sm text-gray-700 mb-3">
                <strong>Use Redux/Zustand/Recoil when:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>State is complex with many relationships</li>
                <li>Updates are frequent</li>
                <li>Need middleware for async operations</li>
                <li>DevTools and time-travel debugging needed</li>
              </ul>
            </InfoBox>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-300 bg-gray-50">
                    <th className="text-left p-2 font-semibold">Aspect</th>
                    <th className="text-left p-2 font-semibold">Context API</th>
                    <th className="text-left p-2 font-semibold">Redux</th>
                    <th className="text-left p-2 font-semibold">Zustand</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 font-medium">Setup</td>
                    <td className="p-2">Simple</td>
                    <td className="p-2">Complex</td>
                    <td className="p-2">Very Simple</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 font-medium">Performance</td>
                    <td className="p-2">Requires care</td>
                    <td className="p-2">Excellent</td>
                    <td className="p-2">Excellent</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 font-medium">DevTools</td>
                    <td className="p-2">None</td>
                    <td className="p-2">Excellent</td>
                    <td className="p-2">Good</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">For</td>
                    <td className="p-2">Simple apps</td>
                    <td className="p-2">Complex apps</td>
                    <td className="p-2">Most apps</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </SubSection>

        <SubSection title="Common Patterns & Gotchas" icon iconColor="orange">
          <div className="space-y-4">
            <InfoBox variant="orange" title="Provider Hell">
              <p className="text-sm text-gray-700 mb-2">
                Multiple context providers can lead to deeply nested JSX:
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
                Solution: Create a custom root provider that composes all contexts.
              </p>
            </InfoBox>

            <InfoBox variant="red" title="Missing Provider Error">
              <p className="text-sm text-gray-700 mb-2">
                Always add a check when consuming context to provide helpful errors:
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

import { useTranslation } from 'react-i18next';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const MockingBestPracticesSection = () => {
  const { t } = useTranslation('week8');

  return (
    <SectionCard
      badge={{ label: t('bestPractices.badge'), color: 'purple' }}
      title={t('bestPractices.title')}
      description={t('bestPractices.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('bestPractices.mockTypes.title')}
          icon
          iconColor="purple"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('bestPractices.mockTypes.description')}
            </p>

            <CodeBlock
              code={`// 1. Function mocks - using vi.fn()
const mockCallback = vi.fn();
button.click();
expect(mockCallback).toHaveBeenCalled();

// 2. Module mocks - mocking entire modules
vi.mock('axios', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: { id: 1 } })),
  },
}));

// 3. Partial mocks - mocking only some exports
vi.mock('./utils', async () => {
  const actual = await vi.importActual('./utils');
  return {
    ...actual,
    slowFunction: vi.fn(() => 'mocked'),
  };
});

// 4. Spy mocks - spying on real functions
const spy = vi.spyOn(console, 'log');
console.log('test');
expect(spy).toHaveBeenCalledWith('test');
spy.mockRestore();`}
              className="text-xs"
            />

            <InfoBox
              variant="purple"
              title={t('bestPractices.mockTypes.summary.title')}
            >
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>vi.fn():</strong>{' '}
                  {t('bestPractices.mockTypes.summary.fn')}
                </li>
                <li>
                  <strong>vi.mock():</strong>{' '}
                  {t('bestPractices.mockTypes.summary.mock')}
                </li>
                <li>
                  <strong>vi.spyOn():</strong>{' '}
                  {t('bestPractices.mockTypes.summary.spy')}
                </li>
                <li>
                  <strong>MSW:</strong>{' '}
                  {t('bestPractices.mockTypes.summary.msw')}
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection
          title={t('bestPractices.whenToMock.title')}
          icon
          iconColor="blue"
        >
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
              <p className="text-sm font-semibold text-gray-800 mb-2">
                ✅ {t('bestPractices.whenToMock.doMock')}
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>{t('bestPractices.whenToMock.doMockList.apis')}</li>
                <li>{t('bestPractices.whenToMock.doMockList.slowOps')}</li>
                <li>{t('bestPractices.whenToMock.doMockList.browserApis')}</li>
                <li>{t('bestPractices.whenToMock.doMockList.externalDeps')}</li>
                <li>{t('bestPractices.whenToMock.doMockList.sideEffects')}</li>
              </ul>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-sm font-semibold text-gray-800 mb-2">
                ❌ {t('bestPractices.whenToMock.dontMock')}
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>{t('bestPractices.whenToMock.dontMockList.ownCode')}</li>
                <li>
                  {t('bestPractices.whenToMock.dontMockList.businessLogic')}
                </li>
                <li>
                  {t('bestPractices.whenToMock.dontMockList.reactComponents')}
                </li>
                <li>
                  {t('bestPractices.whenToMock.dontMockList.simpleUtils')}
                </li>
                <li>
                  {t('bestPractices.whenToMock.dontMockList.unrealistic')}
                </li>
              </ul>
            </div>
          </div>
        </SubSection>

        <SubSection
          title={t('bestPractices.antipatterns.title')}
          icon
          iconColor="red"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('bestPractices.antipatterns.description')}
            </p>

            <CodeBlock
              code={`// ❌ ANTIPATTERN 1: Testing implementation details
test('sets isLoading state to true', () => {
  const { rerender } = render(<Component />);
  // This tests internal state, not behavior
  expect(component.state.isLoading).toBe(true);
});

// ✅ CORRECT: Test what user sees
test('shows loading spinner while fetching', async () => {
  render(<Component />);
  expect(screen.getByRole('status')).toHaveTextContent('Loading');
});`}
              className="text-xs"
            />

            <CodeBlock
              code={`// ❌ ANTIPATTERN 2: Over-mocking
test('component renders', () => {
  vi.mock('./utils', () => ({
    calculate: vi.fn(() => 42),
  }));
  vi.mock('./api', () => ({
    fetchData: vi.fn(() => Promise.resolve({})),
  }));
  // Now we're testing mocks, not real logic
  render(<Component />);
});

// ✅ CORRECT: Mock external dependencies, test real logic
test('component calculates correctly', async () => {
  server.use(
    http.get('/api/data', () => HttpResponse.json({ result: 42 }))
  );
  render(<Component />);
  await waitFor(() => {
    expect(screen.getByText(/42/)).toBeInTheDocument();
  });
});`}
              className="text-xs"
            />

            <CodeBlock
              code={`// ❌ ANTIPATTERN 3: Snapshot testing
test('renders component', () => {
  const { container } = render(<Component />);
  // Snapshots are too sensitive to UI changes
  expect(container).toMatchSnapshot();
});

// ✅ CORRECT: Test specific behavior
test('renders correct heading', () => {
  render(<Component />);
  expect(screen.getByRole('heading')).toHaveTextContent('Welcome');
});`}
              className="text-xs"
            />

            <CodeBlock
              code={`// ❌ ANTIPATTERN 4: Unnecessary waitFor
test('message appears', async () => {
  render(<Component />);
  // Don't use waitFor if element is already there
  await waitFor(() => {
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
  });
});

// ✅ CORRECT: Use findBy for async operations
test('message appears', async () => {
  render(<Component />);
  // findBy waits automatically
  expect(await screen.findByText(/hello/i)).toBeInTheDocument();
});`}
              className="text-xs"
            />

            <CodeBlock
              code={`// ❌ ANTIPATTERN 5: Timing-dependent tests
test('updates after delay', (done) => {
  render(<Component />);
  setTimeout(() => {
    expect(screen.getByText(/updated/i)).toBeInTheDocument();
    done();
  }, 100);
});

// ✅ CORRECT: Use async utilities
test('updates after action', async () => {
  const user = userEvent.setup();
  render(<Component />);
  await user.click(screen.getByRole('button'));
  expect(await screen.findByText(/updated/i)).toBeInTheDocument();
});`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection
          title={t('bestPractices.mockingBestPractices.title')}
          icon
          iconColor="green"
        >
          <div className="space-y-4">
            <InfoBox
              variant="green"
              title={t('bestPractices.mockingBestPractices.goldenRules.title')}
            >
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Mock at the boundary:</strong>{' '}
                  {t('bestPractices.mockingBestPractices.goldenRules.boundary')}
                </li>
                <li>
                  <strong>Keep mocks simple:</strong>{' '}
                  {t(
                    'bestPractices.mockingBestPractices.goldenRules.keepSimple',
                  )}
                </li>
                <li>
                  <strong>Use MSW for HTTP:</strong>{' '}
                  {t('bestPractices.mockingBestPractices.goldenRules.useMSW')}
                </li>
                <li>
                  <strong>Test behavior, not implementation:</strong>{' '}
                  {t(
                    'bestPractices.mockingBestPractices.goldenRules.testBehavior',
                  )}
                </li>
                <li>
                  <strong>Reset mocks between tests:</strong>{' '}
                  {t(
                    'bestPractices.mockingBestPractices.goldenRules.resetMocks',
                  )}
                </li>
              </ol>
            </InfoBox>

            <CodeBlock
              code={`// Good mock setup with cleanup
describe('UserProfile', () => {
  const mockUser = { id: 1, name: 'John', email: 'john@example.com' };

  afterEach(() => {
    // Clean up after each test
    server.resetHandlers();
    vi.clearAllMocks();
  });

  test('loads user data on mount', async () => {
    server.use(
      http.get('/api/user/1', () => HttpResponse.json(mockUser))
    );

    render(<UserProfile userId="1" />);
    expect(await screen.findByText('john@example.com')).toBeInTheDocument();
  });

  test('shows error on failed request', async () => {
    server.use(
      http.get('/api/user/1', () => {
        return HttpResponse.json({ error: 'Not found' }, { status: 404 });
      })
    );

    render(<UserProfile userId="1" />);
    expect(await screen.findByText(/not found/i)).toBeInTheDocument();
  });
});`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection
          title={t('bestPractices.commonScenarios.title')}
          icon
          iconColor="blue"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('bestPractices.commonScenarios.description')}
            </p>

            <CodeBlock
              code={`// Mocking localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

global.localStorage = localStorageMock;

// Mocking window.matchMedia (for responsive tests)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mocking timers
test('shows notification after delay', async () => {
  vi.useFakeTimers();
  render(<NotificationComponent />);

  expect(screen.queryByRole('alert')).not.toBeInTheDocument();

  vi.advanceTimersByTime(3000);

  expect(screen.getByRole('alert')).toBeInTheDocument();

  vi.useRealTimers();
});`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection
          title={t('bestPractices.testOrganization.title')}
          icon
          iconColor="purple"
        >
          <div className="space-y-4">
            <InfoBox
              variant="purple"
              title={t('bestPractices.testOrganization.keepMaintainable.title')}
            >
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>One concept per test:</strong>{' '}
                  {t(
                    'bestPractices.testOrganization.keepMaintainable.oneConcept',
                  )}
                </li>
                <li>
                  <strong>Clear test names:</strong>{' '}
                  {t(
                    'bestPractices.testOrganization.keepMaintainable.clearNames',
                  )}
                </li>
                <li>
                  <strong>Arrange-Act-Assert pattern:</strong>{' '}
                  {t(
                    'bestPractices.testOrganization.keepMaintainable.arrangeActAssert',
                  )}
                </li>
                <li>
                  <strong>Reusable test utilities:</strong>{' '}
                  {t(
                    'bestPractices.testOrganization.keepMaintainable.reusableUtils',
                  )}
                </li>
                <li>
                  <strong>Run tests frequently:</strong>{' '}
                  {t(
                    'bestPractices.testOrganization.keepMaintainable.runFrequently',
                  )}
                </li>
              </ul>
            </InfoBox>

            <CodeBlock
              code={`// Good test structure - Arrange, Act, Assert
describe('TodoForm', () => {
  test('submits form with todo text', async () => {
    // Arrange
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<TodoForm onSubmit={handleSubmit} />);

    // Act
    const input = screen.getByRole('textbox');
    await user.type(input, 'Learn testing');
    await user.click(screen.getByRole('button', { name: /add/i }));

    // Assert
    expect(handleSubmit).toHaveBeenCalledWith('Learn testing');
  });
});`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection
          title={t('bestPractices.strategy.title')}
          icon
          iconColor="orange"
        >
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-purple-200">
              <p className="text-sm font-semibold text-gray-800 mb-3">
                {t('bestPractices.strategy.yourStrategy')}
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong>60-70% Unit Tests:</strong>{' '}
                  {t('bestPractices.strategy.unitTests')}
                </li>
                <li>
                  <strong>20-30% Integration Tests:</strong>{' '}
                  {t('bestPractices.strategy.integrationTests')}
                </li>
                <li>
                  <strong>5-10% E2E Tests:</strong>{' '}
                  {t('bestPractices.strategy.e2eTests')}
                </li>
                <li>
                  <strong>Mock strategically:</strong>{' '}
                  {t('bestPractices.strategy.mockStrategically')}
                </li>
                <li>
                  <strong>Test behavior:</strong>{' '}
                  {t('bestPractices.strategy.testBehavior')}
                </li>
              </ul>
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

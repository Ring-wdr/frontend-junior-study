import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const MockingBestPracticesSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Mocking & Best Practices', color: 'purple' }}
      title="Mocking Strategies & Testing Antipatterns"
      description="How to mock effectively and avoid common testing pitfalls."
    >
      <div className="space-y-8">
        <SubSection title="Types of Mocks" icon iconColor="purple">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Mocking is essential for testing, but too much mocking can make
              tests unrealistic. Use mocks strategically.
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

            <InfoBox variant="purple" title="Mock Types Summary">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>vi.fn():</strong> Create mock functions to track calls
                </li>
                <li>
                  <strong>vi.mock():</strong> Replace entire modules with mocks
                </li>
                <li>
                  <strong>vi.spyOn():</strong> Spy on real functions without
                  replacing them
                </li>
                <li>
                  <strong>MSW:</strong> Mock HTTP requests at the network level
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="When to Mock" icon iconColor="blue">
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
              <p className="text-sm font-semibold text-gray-800 mb-2">
                ✅ DO mock these:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>External APIs and network requests (use MSW)</li>
                <li>
                  Slow operations (database, file system, crypto functions)
                </li>
                <li>Browser APIs (localStorage, geolocation)</li>
                <li>External dependencies you don't control</li>
                <li>Side effects you want to verify (analytics, logging)</li>
              </ul>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-sm font-semibold text-gray-800 mb-2">
                ❌ DON'T mock these:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>Your own application code</li>
                <li>Core business logic</li>
                <li>React components you're testing</li>
                <li>Simple utilities like date formatting</li>
                <li>Things that would make your test unrealistic</li>
              </ul>
            </div>
          </div>
        </SubSection>

        <SubSection title="Testing Antipatterns to Avoid" icon iconColor="red">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Common mistakes that make tests brittle and unreliable.
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

        <SubSection title="Mocking Best Practices" icon iconColor="green">
          <div className="space-y-4">
            <InfoBox variant="green" title="Golden Rules of Mocking">
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Mock at the boundary:</strong> Mock network calls,
                  file I/O, not business logic
                </li>
                <li>
                  <strong>Keep mocks simple:</strong> Complex mocks indicate
                  complex dependencies
                </li>
                <li>
                  <strong>Use MSW for HTTP:</strong> It's the most realistic way
                  to mock APIs
                </li>
                <li>
                  <strong>Test behavior, not implementation:</strong> Change
                  implementation without changing tests
                </li>
                <li>
                  <strong>Reset mocks between tests:</strong> Prevent test
                  pollution
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

        <SubSection title="Testing Common Scenarios" icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Practical examples for common testing situations.
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
          title="Test Organization & Maintenance"
          icon
          iconColor="purple"
        >
          <div className="space-y-4">
            <InfoBox variant="purple" title="Keeping Tests Maintainable">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>One concept per test:</strong> Test should have a
                  single assertion idea
                </li>
                <li>
                  <strong>Clear test names:</strong> Describe what's being
                  tested
                </li>
                <li>
                  <strong>Arrange-Act-Assert pattern:</strong> Organize tests
                  clearly
                </li>
                <li>
                  <strong>Reusable test utilities:</strong> Extract common test
                  setup
                </li>
                <li>
                  <strong>Run tests frequently:</strong> Catch issues early
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

        <SubSection title="Testing Strategy Summary" icon iconColor="orange">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-purple-200">
              <p className="text-sm font-semibold text-gray-800 mb-3">
                Your Testing Strategy:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong>60-70% Unit Tests:</strong> Test pure functions and
                  components in isolation
                </li>
                <li>
                  <strong>20-30% Integration Tests:</strong> Use RTL + MSW to
                  test component interactions
                </li>
                <li>
                  <strong>5-10% E2E Tests:</strong> Use Playwright for critical
                  user journeys
                </li>
                <li>
                  <strong>Mock strategically:</strong> External APIs and slow
                  operations only
                </li>
                <li>
                  <strong>Test behavior:</strong> Not implementation details or
                  internals
                </li>
              </ul>
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

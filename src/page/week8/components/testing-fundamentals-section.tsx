import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const TestingFundamentalsSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Testing Pyramid', color: 'blue' }}
      title="Testing Fundamentals"
      description="Understanding the three levels of testing and why they matter."
    >
      <div className="space-y-8">
        <SubSection title="The Testing Pyramid" icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              The testing pyramid illustrates the relationship between different
              types of tests. It emphasizes writing more{' '}
              <strong>unit tests</strong>, a moderate amount of{' '}
              <strong>integration tests</strong>, and fewer{' '}
              <strong>E2E tests</strong>.
            </p>

            <div className="bg-gradient-to-b from-green-50 to-blue-50 p-8 rounded-lg border border-blue-200 flex flex-col items-center">
              <div className="w-full max-w-xs">
                {/* E2E Test (Top) */}
                <div className="text-center mb-1">
                  <div className="bg-red-100 border border-red-300 p-3 rounded mx-auto w-20">
                    <p className="text-xs font-bold text-red-800">E2E (10%)</p>
                  </div>
                </div>

                {/* Integration Test (Middle) */}
                <div className="text-center mb-1">
                  <div className="bg-yellow-100 border border-yellow-300 p-4 rounded mx-auto w-40">
                    <p className="text-xs font-bold text-yellow-800">
                      Integration (30%)
                    </p>
                  </div>
                </div>

                {/* Unit Test (Bottom) */}
                <div className="text-center">
                  <div className="bg-green-100 border border-green-300 p-6 rounded mx-auto w-64">
                    <p className="text-xs font-bold text-green-800">
                      Unit (60%)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <InfoBox variant="blue" title="Why This Pyramid?">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Unit Tests:</strong> Fast, cheap, and easy to write.
                  Perfect for testing pure functions and isolated components.
                </li>
                <li>
                  <strong>Integration Tests:</strong> Verify that different
                  modules work together (e.g., API → state → UI).
                </li>
                <li>
                  <strong>E2E Tests:</strong> Expensive and slow, but catch
                  real-world scenarios. Use sparingly for critical paths.
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="Unit Testing" icon iconColor="green">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Unit tests isolate a single function or component and test it in
              isolation. They're the fastest and cheapest form of testing.
            </p>

            <CodeBlock
              code={`// Pure function - easiest to test
function sum(a: number, b: number): number {
  return a + b;
}

// Test
describe('sum', () => {
  it('adds two numbers correctly', () => {
    expect(sum(2, 3)).toBe(5);
  });
});`}
              className="text-xs"
            />

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-gray-700">
                <strong>Best Unit Test Targets:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mt-2">
                <li>Pure functions (utilities, helpers, calculations)</li>
                <li>React components with minimal dependencies</li>
                <li>Custom hooks with simple logic</li>
              </ul>
            </div>
          </div>
        </SubSection>

        <SubSection title="Integration Testing" icon iconColor="orange">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Integration tests verify that multiple components and modules work
              together correctly. Typically, they test the full flow: API call →
              state update → UI render.
            </p>

            <CodeBlock
              code={`// Example: Component that fetches and displays data
describe('TodoList Integration', () => {
  it('fetches todos and renders them', async () => {
    render(<TodoList />);

    // Wait for data to load
    const todoItems = await screen.findAllByRole('listitem');

    expect(todoItems).toHaveLength(3);
  });
});`}
              className="text-xs"
            />

            <InfoBox variant="orange" title="Common Integration Test Scenario">
              <p className="text-sm text-gray-700">
                User clicks a button → Component makes API request → MSW
                intercepts and responds → Component updates state → New content
                appears on screen
              </p>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="End-to-End (E2E) Testing" icon iconColor="red">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              E2E tests run in a real browser and simulate user actions. They're
              the slowest and most expensive, but they catch issues that unit
              and integration tests might miss.
            </p>

            <CodeBlock
              code={`// Playwright E2E test
test('user can login and view dashboard', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.fill('input[type="email"]', 'user@example.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button:has-text("Sign In")');

  // Verify we're on dashboard
  await expect(page).toHaveURL(/\\/dashboard/);
  await expect(page.locator('h1')).toContainText('Dashboard');
});`}
              className="text-xs"
            />

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-sm text-gray-700">
                <strong>When to use E2E tests:</strong> Critical user journeys
                like login, checkout, or critical workflows. Avoid testing every
                interaction; focus on happy paths and key error cases.
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection title="Test Ratio in Practice" icon iconColor="purple">
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-sm font-semibold text-gray-800 mb-3">
                Recommended Test Distribution:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Unit Tests: 60-70%</strong> - Validate logic in
                  isolation
                </li>
                <li>
                  <strong>Integration Tests: 20-30%</strong> - Verify component
                  interactions
                </li>
                <li>
                  <strong>E2E Tests: 5-10%</strong> - Test critical user flows
                </li>
              </ul>
            </div>

            <p className="text-sm text-gray-700">
              This ratio ensures fast feedback (unit tests run instantly),
              reasonable coverage (integration tests catch real issues), and
              confidence in critical paths (E2E tests verify the whole system).
            </p>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

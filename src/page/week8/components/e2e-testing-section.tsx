import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const E2ETestingSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Playwright & Cypress', color: 'orange' }}
      title="End-to-End (E2E) Testing"
      description="Testing complete user journeys in a real browser environment."
    >
      <div className="space-y-8">
        <SubSection title="What is E2E Testing?" icon iconColor="red">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              End-to-End tests run your application in a real browser and
              simulate real user interactions. They test the complete flow from
              entry point to exit, catching issues that unit and integration
              tests might miss.
            </p>

            <InfoBox variant="red" title="E2E Testing Use Cases">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Critical user journeys:</strong> Login, checkout,
                  payment
                </li>
                <li>
                  <strong>Cross-browser compatibility:</strong> Ensure app works
                  on Chrome, Firefox, Safari
                </li>
                <li>
                  <strong>Visual regression:</strong> Detect unintended UI
                  changes
                </li>
                <li>
                  <strong>Real-world scenarios:</strong> Network issues, slow
                  connections
                </li>
              </ul>
            </InfoBox>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-sm text-gray-700 font-semibold mb-2">
                ⚠️ Important: E2E Tests Are Slow
              </p>
              <p className="text-sm text-gray-700">
                E2E tests are slow and brittle because they depend on real
                browser behavior. Use them sparingly (5-10% of your test suite)
                for critical paths only.
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection
          title="Playwright: Enterprise-Grade Testing"
          icon
          iconColor="blue"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Playwright is built by Microsoft and is optimized for modern web
              applications. It's fast, reliable, and CI-friendly.
            </p>

            <InfoBox variant="blue" title="Playwright Strengths">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>⚡ Fast:</strong> Optimized execution and parallel
                  testing
                </li>
                <li>
                  <strong>🌐 Cross-browser:</strong> Chromium, Firefox, WebKit
                  out of the box
                </li>
                <li>
                  <strong>CI-friendly:</strong> Works great in headless mode
                </li>
                <li>
                  <strong>Developer experience:</strong> Great UI for debugging
                  and recording tests
                </li>
              </ul>
            </InfoBox>

            <CodeBlock
              code={`// Installation
npm install -D @playwright/test

// Basic test setup
import { test, expect } from '@playwright/test';

test('user can login and see dashboard', async ({ page }) => {
  // Navigate to app
  await page.goto('http://localhost:3000');

  // Find and click login button
  await page.click('text=Login');

  // Fill in form
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'password123');

  // Submit form
  await page.click('button:has-text("Sign In")');

  // Wait for navigation and verify
  await page.waitForURL('**/dashboard');
  await expect(page.locator('h1')).toContainText('Dashboard');
});`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection
          title="Cypress: Developer Experience Champion"
          icon
          iconColor="green"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Cypress prioritizes developer experience with an interactive
              interface, excellent debugging tools, and test recording.
            </p>

            <InfoBox variant="green" title="Cypress Strengths">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>🎨 Best DX:</strong> Interactive test runner with
                  visual feedback
                </li>
                <li>
                  <strong>📹 Recording:</strong> Built-in test recording
                </li>
                <li>
                  <strong>⏱️ Debugging:</strong> Time-travel debugging, console
                  access
                </li>
                <li>
                  <strong>📊 Dashboard:</strong> Cloud recording and analytics
                </li>
              </ul>
            </InfoBox>

            <InfoBox variant="red" title="Cypress Limitations">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Single browser:</strong> Limited cross-browser support
                </li>
                <li>
                  <strong>JavaScript only:</strong> Can't test multi-tab or
                  mobile
                </li>
              </ul>
            </InfoBox>

            <CodeBlock
              code={`// cypress/e2e/login.cy.ts
describe('Login Flow', () => {
  it('should login successfully', () => {
    cy.visit('http://localhost:3000');

    cy.contains('Login').click();

    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button:contains("Sign In")').click();

    cy.url().should('include', '/dashboard');
    cy.get('h1').should('contain', 'Dashboard');
  });
});`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title="Playwright vs Cypress" icon iconColor="purple">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="px-4 py-2 text-left font-semibold text-gray-800">
                      Feature
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-800">
                      Playwright
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-800">
                      Cypress
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700">
                      Speed
                    </td>
                    <td className="px-4 py-2 text-gray-600">⚡ Very Fast</td>
                    <td className="px-4 py-2 text-gray-600">🟡 Moderate</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700">
                      Browsers
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      3 (Chromium, FF, WebKit)
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      1 (Chrome-based)
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700">DX</td>
                    <td className="px-4 py-2 text-gray-600">Good</td>
                    <td className="px-4 py-2 text-gray-600">🌟 Excellent</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700">
                      CI Setup
                    </td>
                    <td className="px-4 py-2 text-gray-600">✅ Easy</td>
                    <td className="px-4 py-2 text-gray-600">🟡 Moderate</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700">
                      Learning Curve
                    </td>
                    <td className="px-4 py-2 text-gray-600">Moderate</td>
                    <td className="px-4 py-2 text-gray-600">🟢 Easy</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </SubSection>

        <SubSection title="Best Practices for E2E Tests" icon iconColor="blue">
          <div className="space-y-4">
            <InfoBox variant="blue" title="E2E Testing Guidelines">
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Test critical user paths:</strong> Login, checkout,
                  core features
                </li>
                <li>
                  <strong>Avoid testing details:</strong> Don't test every
                  button and input
                </li>
                <li>
                  <strong>Use meaningful waits:</strong> Wait for elements by
                  role, not arbitrary delays
                </li>
                <li>
                  <strong>Keep tests isolated:</strong> Each test should be
                  independent
                </li>
                <li>
                  <strong>Use test data carefully:</strong> Reset database
                  between tests
                </li>
              </ol>
            </InfoBox>

            <CodeBlock
              code={`// ✅ Good E2E test - tests critical path
test('complete checkout flow', async ({ page }) => {
  await page.goto('/shop');

  // Browse and add item
  await page.click('button:has-text("Add to Cart")');

  // Go to checkout
  await page.click('text=Proceed to Checkout');

  // Fill in shipping
  await page.fill('input[name="address"]', '123 Main St');

  // Complete purchase
  await page.click('button:has-text("Complete Order")');

  // Verify success
  await expect(page).toHaveURL('**/order-confirmation');
});

// ❌ Bad E2E test - too detailed
test('form has email input field', async ({ page }) => {
  await page.goto('/checkout');
  const emailInput = page.locator('input[type="email"]');
  await expect(emailInput).toBeVisible();
});`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title="Running E2E Tests in CI" icon iconColor="orange">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Configure your CI/CD pipeline to run E2E tests on every push.
            </p>

            <CodeBlock
              code={`# .github/workflows/e2e-tests.yml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - run: npm ci
      - run: npm run build
      - run: npx playwright install --with-deps

      # Start dev server in background
      - name: Start dev server
        run: npm run dev &

      # Run E2E tests
      - run: npx playwright test

      # Upload test results on failure
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30`}
              className="text-xs"
            />
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

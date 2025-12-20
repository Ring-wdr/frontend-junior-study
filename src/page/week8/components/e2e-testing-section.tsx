import { useTranslation } from 'react-i18next';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const E2ETestingSection = () => {
  const { t } = useTranslation('week8');

  return (
    <SectionCard
      badge={{ label: t('e2e.badge'), color: 'orange' }}
      title={t('e2e.title')}
      description={t('e2e.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('e2e.whatIsE2E.title')} icon iconColor="red">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('e2e.whatIsE2E.description')}
            </p>

            <InfoBox variant="red" title={t('e2e.whatIsE2E.useCases.title')}>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Critical user journeys:</strong> {t('e2e.whatIsE2E.useCases.criticalJourneys')}
                </li>
                <li>
                  <strong>Cross-browser compatibility:</strong> {t('e2e.whatIsE2E.useCases.crossBrowser')}
                </li>
                <li>
                  <strong>Visual regression:</strong> {t('e2e.whatIsE2E.useCases.visualRegression')}
                </li>
                <li>
                  <strong>Real-world scenarios:</strong> {t('e2e.whatIsE2E.useCases.realWorld')}
                </li>
              </ul>
            </InfoBox>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-sm text-gray-700 font-semibold mb-2">
                ⚠️ {t('e2e.whatIsE2E.warning')}
              </p>
              <p className="text-sm text-gray-700">
                {t('e2e.whatIsE2E.warningDescription')}
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection
          title={t('e2e.playwright.title')}
          icon
          iconColor="blue"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('e2e.playwright.description')}
            </p>

            <InfoBox variant="blue" title={t('e2e.playwright.strengths.title')}>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>⚡ Fast:</strong> {t('e2e.playwright.strengths.fast')}
                </li>
                <li>
                  <strong>🌐 Cross-browser:</strong> {t('e2e.playwright.strengths.crossBrowser')}
                </li>
                <li>
                  <strong>CI-friendly:</strong> {t('e2e.playwright.strengths.ciFriendly')}
                </li>
                <li>
                  <strong>Developer experience:</strong> {t('e2e.playwright.strengths.dx')}
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
          title={t('e2e.cypress.title')}
          icon
          iconColor="green"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('e2e.cypress.description')}
            </p>

            <InfoBox variant="green" title={t('e2e.cypress.strengths.title')}>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>🎨 Best DX:</strong> {t('e2e.cypress.strengths.bestDX')}
                </li>
                <li>
                  <strong>📹 Recording:</strong> {t('e2e.cypress.strengths.recording')}
                </li>
                <li>
                  <strong>⏱️ Debugging:</strong> {t('e2e.cypress.strengths.debugging')}
                </li>
                <li>
                  <strong>📊 Dashboard:</strong> {t('e2e.cypress.strengths.dashboard')}
                </li>
              </ul>
            </InfoBox>

            <InfoBox variant="red" title={t('e2e.cypress.limitations.title')}>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Single browser:</strong> {t('e2e.cypress.limitations.singleBrowser')}
                </li>
                <li>
                  <strong>JavaScript only:</strong> {t('e2e.cypress.limitations.jsOnly')}
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

        <SubSection title={t('e2e.comparison.title')} icon iconColor="purple">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="px-4 py-2 text-left font-semibold text-gray-800">
                      {t('e2e.comparison.feature')}
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-800">
                      {t('e2e.comparison.playwright')}
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-800">
                      {t('e2e.comparison.cypress')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700">
                      {t('e2e.comparison.speed')}
                    </td>
                    <td className="px-4 py-2 text-gray-600">⚡ {t('e2e.comparison.veryFast')}</td>
                    <td className="px-4 py-2 text-gray-600">🟡 {t('e2e.comparison.moderate')}</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700">
                      {t('e2e.comparison.browsers')}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {t('e2e.comparison.threeBrowsers')}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {t('e2e.comparison.oneBrowser')}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700">{t('e2e.comparison.dx')}</td>
                    <td className="px-4 py-2 text-gray-600">{t('e2e.comparison.good')}</td>
                    <td className="px-4 py-2 text-gray-600">🌟 {t('e2e.comparison.excellent')}</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700">
                      {t('e2e.comparison.ciSetup')}
                    </td>
                    <td className="px-4 py-2 text-gray-600">✅ {t('e2e.comparison.easy')}</td>
                    <td className="px-4 py-2 text-gray-600">🟡 {t('e2e.comparison.moderate')}</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700">
                      {t('e2e.comparison.learningCurve')}
                    </td>
                    <td className="px-4 py-2 text-gray-600">{t('e2e.comparison.moderateCurve')}</td>
                    <td className="px-4 py-2 text-gray-600">🟢 {t('e2e.comparison.easyCurve')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </SubSection>

        <SubSection title={t('e2e.bestPractices.title')} icon iconColor="blue">
          <div className="space-y-4">
            <InfoBox variant="blue" title={t('e2e.bestPractices.guidelines.title')}>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Test critical user paths:</strong> {t('e2e.bestPractices.guidelines.criticalPaths')}
                </li>
                <li>
                  <strong>Avoid testing details:</strong> {t('e2e.bestPractices.guidelines.avoidDetails')}
                </li>
                <li>
                  <strong>Use meaningful waits:</strong> {t('e2e.bestPractices.guidelines.meaningfulWaits')}
                </li>
                <li>
                  <strong>Keep tests isolated:</strong> {t('e2e.bestPractices.guidelines.keepIsolated')}
                </li>
                <li>
                  <strong>Use test data carefully:</strong> {t('e2e.bestPractices.guidelines.testData')}
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

        <SubSection title={t('e2e.ci.title')} icon iconColor="orange">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('e2e.ci.description')}
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

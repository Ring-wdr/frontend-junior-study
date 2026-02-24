import { useTranslation } from 'react-i18next';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const TestingFundamentalsSection = () => {
  const { t } = useTranslation('week8');

  return (
    <SectionCard
      badge={{ label: t('fundamentals.badge'), color: 'blue' }}
      title={t('fundamentals.title')}
      description={t('fundamentals.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('fundamentals.pyramid.title')}
          icon
          iconColor="blue"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('fundamentals.pyramid.description')}
            </p>

            <div className="bg-gradient-to-b from-green-50 to-blue-50 p-8 rounded-lg border border-blue-200 flex flex-col items-center">
              <div className="w-full max-w-xs">
                {/* E2E Test (Top) */}
                <div className="text-center mb-1">
                  <div className="bg-red-100 border border-red-300 p-3 rounded mx-auto w-20">
                    <p className="text-xs font-bold text-red-800">
                      {t('fundamentals.pyramid.e2e')}
                    </p>
                  </div>
                </div>

                {/* Integration Test (Middle) */}
                <div className="text-center mb-1">
                  <div className="bg-yellow-100 border border-yellow-300 p-4 rounded mx-auto w-40">
                    <p className="text-xs font-bold text-yellow-800">
                      {t('fundamentals.pyramid.integration')}
                    </p>
                  </div>
                </div>

                {/* Unit Test (Bottom) */}
                <div className="text-center">
                  <div className="bg-green-100 border border-green-300 p-6 rounded mx-auto w-64">
                    <p className="text-xs font-bold text-green-800">
                      {t('fundamentals.pyramid.unit')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <InfoBox
              variant="blue"
              title={t('fundamentals.pyramid.whyPyramid.title')}
            >
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Unit Tests:</strong>{' '}
                  {t('fundamentals.pyramid.whyPyramid.unitTests')}
                </li>
                <li>
                  <strong>Integration Tests:</strong>{' '}
                  {t('fundamentals.pyramid.whyPyramid.integrationTests')}
                </li>
                <li>
                  <strong>E2E Tests:</strong>{' '}
                  {t('fundamentals.pyramid.whyPyramid.e2eTests')}
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection
          title={t('fundamentals.unitTesting.title')}
          icon
          iconColor="green"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('fundamentals.unitTesting.description')}
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
                <strong>{t('fundamentals.unitTesting.bestTargets')}</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mt-2">
                <li>
                  {t('fundamentals.unitTesting.targetList.pureFunctions')}
                </li>
                <li>{t('fundamentals.unitTesting.targetList.components')}</li>
                <li>{t('fundamentals.unitTesting.targetList.hooks')}</li>
              </ul>
            </div>
          </div>
        </SubSection>

        <SubSection
          title={t('fundamentals.integrationTesting.title')}
          icon
          iconColor="orange"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('fundamentals.integrationTesting.description')}
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

            <InfoBox
              variant="orange"
              title={t('fundamentals.integrationTesting.commonScenario.title')}
            >
              <p className="text-sm text-gray-700">
                {t(
                  'fundamentals.integrationTesting.commonScenario.description',
                )}
              </p>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection
          title={t('fundamentals.e2eTesting.title')}
          icon
          iconColor="red"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('fundamentals.e2eTesting.description')}
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
                <strong>When to use E2E tests:</strong>{' '}
                {t('fundamentals.e2eTesting.whenToUse')}
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection
          title={t('fundamentals.testRatio.title')}
          icon
          iconColor="purple"
        >
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-sm font-semibold text-gray-800 mb-3">
                {t('fundamentals.testRatio.recommendedDistribution')}
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Unit Tests: 60-70%</strong> -{' '}
                  {t('fundamentals.testRatio.unitTests')}
                </li>
                <li>
                  <strong>Integration Tests: 20-30%</strong> -{' '}
                  {t('fundamentals.testRatio.integrationTests')}
                </li>
                <li>
                  <strong>E2E Tests: 5-10%</strong> -{' '}
                  {t('fundamentals.testRatio.e2eTests')}
                </li>
              </ul>
            </div>

            <p className="text-sm text-gray-700">
              {t('fundamentals.testRatio.conclusion')}
            </p>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

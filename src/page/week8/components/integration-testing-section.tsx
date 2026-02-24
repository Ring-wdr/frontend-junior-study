import { useTranslation } from 'react-i18next';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const IntegrationTestingSection = () => {
  const { t } = useTranslation('week8');

  return (
    <SectionCard
      badge={{ label: t('integrationTesting.badge'), color: 'orange' }}
      title={t('integrationTesting.title')}
      description={t('integrationTesting.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('integrationTesting.whatIsMSW.title')}
          icon
          iconColor="orange"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('integrationTesting.whatIsMSW.description')}
            </p>

            <InfoBox
              variant="orange"
              title={t('integrationTesting.whatIsMSW.whyMSW.title')}
            >
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>No backend dependency:</strong>{' '}
                  {t('integrationTesting.whatIsMSW.whyMSW.noBackend')}
                </li>
                <li>
                  <strong>Realistic scenarios:</strong>{' '}
                  {t('integrationTesting.whatIsMSW.whyMSW.realistic')}
                </li>
                <li>
                  <strong>Deterministic tests:</strong>{' '}
                  {t('integrationTesting.whatIsMSW.whyMSW.deterministic')}
                </li>
                <li>
                  <strong>Fast execution:</strong>{' '}
                  {t('integrationTesting.whatIsMSW.whyMSW.fast')}
                </li>
              </ul>
            </InfoBox>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <p className="text-sm text-gray-700">
                <strong>Flow:</strong> {t('integrationTesting.whatIsMSW.flow')}
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection
          title={t('integrationTesting.setup.title')}
          icon
          iconColor="blue"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('integrationTesting.setup.description')}
            </p>

            <CodeBlock
              code={`// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock GET /api/todos
  http.get('/api/todos', () => {
    return HttpResponse.json([
      { id: 1, title: 'Learn testing', completed: false },
      { id: 2, title: 'Build an app', completed: true },
    ]);
  }),

  // Mock POST /api/todos
  http.post('/api/todos', async ({ request }) => {
    const data = await request.json();
    return HttpResponse.json(
      { id: 3, ...data, completed: false },
      { status: 201 }
    );
  }),
];`}
              className="text-xs"
            />

            <CodeBlock
              code={`// src/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);`}
              className="text-xs"
            />

            <CodeBlock
              code={`// vitest.config.ts setup or test setup file
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mocks/server';

// Start server before tests
beforeAll(() => server.listen());

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Clean up after all tests
afterAll(() => server.close());`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection
          title={t('integrationTesting.loadingSuccess.title')}
          icon
          iconColor="green"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('integrationTesting.loadingSuccess.description')}
            </p>

            <CodeBlock
              code={`import { render, screen, waitFor } from '@testing-library/react';
import { TodoList } from './TodoList';

test('displays loading state then todos', async () => {
  render(<TodoList />);

  // Initially shows loading
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // Wait for todos to appear
  const todos = await screen.findAllByRole('listitem');

  expect(todos).toHaveLength(2);
  expect(screen.getByText(/learn testing/i)).toBeInTheDocument();
  expect(screen.getByText(/build an app/i)).toBeInTheDocument();
});`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection
          title={t('integrationTesting.errorScenarios.title')}
          icon
          iconColor="red"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('integrationTesting.errorScenarios.description')}
            </p>

            <CodeBlock
              code={`import { http, HttpResponse } from 'msw';
import { server } from './mocks/server';

test('displays error message when API fails', async () => {
  // Override the default handler for this test
  server.use(
    http.get('/api/todos', () => {
      return HttpResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    })
  );

  render(<TodoList />);

  // Error message should appear
  const error = await screen.findByText(/failed to load todos/i);
  expect(error).toBeInTheDocument();
});`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection
          title={t('integrationTesting.userInteractions.title')}
          icon
          iconColor="blue"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('integrationTesting.userInteractions.description')}
            </p>

            <CodeBlock
              code={`test('creates a new todo when user submits form', async () => {
  const user = userEvent.setup();
  render(<TodoForm />);

  // User fills in the input
  const input = screen.getByRole('textbox', { name: /new todo/i });
  await user.type(input, 'New task');

  // User clicks submit
  const submitBtn = screen.getByRole('button', { name: /add/i });
  await user.click(submitBtn);

  // API was called and response rendered
  const newTodo = await screen.findByText(/new task/i);
  expect(newTodo).toBeInTheDocument();

  // Input was cleared
  expect(input).toHaveValue('');
});`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection
          title={t('integrationTesting.delays.title')}
          icon
          iconColor="purple"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('integrationTesting.delays.description')}
            </p>

            <CodeBlock
              code={`import { delay } from 'msw';

test('shows loading spinner during slow requests', async () => {
  server.use(
    http.get('/api/todos', async () => {
      // Simulate 2 second delay
      await delay(2000);
      return HttpResponse.json([]);
    })
  );

  render(<TodoList />);

  // Loading should be visible initially
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // After delay, should complete
  await waitFor(
    () => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    },
    { timeout: 3000 }
  );
});`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection
          title={t('integrationTesting.bestPractices.title')}
          icon
          iconColor="blue"
        >
          <div className="space-y-4">
            <InfoBox
              variant="blue"
              title={t('integrationTesting.bestPractices.guidelines.title')}
            >
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Test the happy path:</strong>{' '}
                  {t('integrationTesting.bestPractices.guidelines.happyPath')}
                </li>
                <li>
                  <strong>Test error cases:</strong>{' '}
                  {t('integrationTesting.bestPractices.guidelines.errorCases')}
                </li>
                <li>
                  <strong>Test edge cases:</strong>{' '}
                  {t('integrationTesting.bestPractices.guidelines.edgeCases')}
                </li>
                <li>
                  <strong>Use MSW:</strong>{' '}
                  {t('integrationTesting.bestPractices.guidelines.useMSW')}
                </li>
                <li>
                  <strong>Don't mock components:</strong>{' '}
                  {t(
                    'integrationTesting.bestPractices.guidelines.dontMockComponents',
                  )}
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

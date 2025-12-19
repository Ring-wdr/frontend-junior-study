import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const IntegrationTestingSection = () => {
  return (
    <SectionCard
      badge={{ label: 'MSW + RTL', color: 'orange' }}
      title="Integration Testing with MSW"
      description="Testing component interactions with mocked API responses."
    >
      <div className="space-y-8">
        <SubSection title="What is MSW?" icon iconColor="orange">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <strong>Mock Service Worker (MSW)</strong> is a library that
              intercepts HTTP requests at the browser level and returns mock
              responses. It's perfect for testing how your components handle API
              calls without depending on a real backend.
            </p>

            <InfoBox variant="orange" title="Why MSW for Integration Tests?">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>No backend dependency:</strong> Test frontend logic
                  independently
                </li>
                <li>
                  <strong>Realistic scenarios:</strong> Simulate API errors,
                  delays, and edge cases
                </li>
                <li>
                  <strong>Deterministic tests:</strong> Same responses every
                  time
                </li>
                <li>
                  <strong>Fast execution:</strong> No network delays
                </li>
              </ul>
            </InfoBox>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <p className="text-sm text-gray-700">
                <strong>Flow:</strong> Component → fetch() → MSW intercepts →
                Mock response returned → Component updates UI
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection title="Setting Up MSW in Tests" icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Create a test setup file that initializes MSW handlers for your
              tests.
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
          title="Testing Loading & Success States"
          icon
          iconColor="green"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Write tests that verify your component handles loading, success,
              and error states correctly.
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

        <SubSection title="Testing Error Scenarios" icon iconColor="red">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Override MSW handlers in specific tests to simulate API errors.
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
          title="Testing User Interactions with API"
          icon
          iconColor="blue"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Test the full flow: user action → API call → state update → UI
              change.
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

        <SubSection title="Mocking Request Delays" icon iconColor="purple">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Simulate network delays to test loading states and timeouts.
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
          title="Best Practices for Integration Tests"
          icon
          iconColor="blue"
        >
          <div className="space-y-4">
            <InfoBox variant="blue" title="Integration Testing Guidelines">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Test the happy path:</strong> Main user flow should
                  work
                </li>
                <li>
                  <strong>Test error cases:</strong> API errors, network issues,
                  timeouts
                </li>
                <li>
                  <strong>Test edge cases:</strong> Empty states, large
                  responses, slow networks
                </li>
                <li>
                  <strong>Use MSW:</strong> Mock APIs, not fetch directly
                </li>
                <li>
                  <strong>Don't mock components:</strong> Test real component
                  integration
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

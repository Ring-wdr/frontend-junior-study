import { useTranslation } from 'react-i18next';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const UnitTestingSection = () => {
  const { t } = useTranslation('week8');

  return (
    <SectionCard
      badge={{ label: t('unitTesting.badge'), color: 'green' }}
      title={t('unitTesting.title')}
      description={t('unitTesting.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('unitTesting.philosophy.title')}
          icon
          iconColor="green"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('unitTesting.philosophy.description')}
            </p>

            <InfoBox
              variant="green"
              title={t('unitTesting.philosophy.corePhilosophy.title')}
            >
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Don't test state:</strong>{' '}
                  {t('unitTesting.philosophy.corePhilosophy.dontTestState')}
                </li>
                <li>
                  <strong>Don't test implementation:</strong>{' '}
                  {t(
                    'unitTesting.philosophy.corePhilosophy.dontTestImplementation',
                  )}
                </li>
                <li>
                  <strong>Test what users see:</strong>{' '}
                  {t('unitTesting.philosophy.corePhilosophy.testWhatUsersSee')}
                </li>
                <li>
                  <strong>Simulate user interactions:</strong>{' '}
                  {t(
                    'unitTesting.philosophy.corePhilosophy.simulateUserInteractions',
                  )}
                </li>
              </ul>
            </InfoBox>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-sm text-gray-700 font-semibold">
                {t('unitTesting.philosophy.dontDoThis')}
              </p>
              <CodeBlock
                code={`// BAD: Testing implementation details
expect(component.state.isLoading).toBe(false);
expect(component.instance().handleClick).toBeDefined();`}
                className="text-xs mt-2"
              />
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-gray-700 font-semibold">
                {t('unitTesting.philosophy.doThisInstead')}
              </p>
              <CodeBlock
                code={`// GOOD: Testing user-visible behavior
const button = screen.getByRole('button', { name: /click me/i });
expect(button).toBeInTheDocument();
await userEvent.click(button);`}
                className="text-xs mt-2"
              />
            </div>
          </div>
        </SubSection>

        <SubSection
          title={t('unitTesting.queries.title')}
          icon
          iconColor="blue"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('unitTesting.queries.description')}
            </p>

            <CodeBlock
              code={`import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with correct text', () => {
  render(<Button>Click me</Button>);

  // getByRole is the most accessible query
  const button = screen.getByRole('button', { name: /click me/i });
  expect(button).toBeInTheDocument();
});`}
              className="text-xs"
            />

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-gray-800 mb-2">
                {t('unitTesting.queries.commonRoles')}
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                <div>
                  <code className="bg-white px-2 py-1 rounded border border-blue-200">
                    button
                  </code>
                </div>
                <div>
                  <code className="bg-white px-2 py-1 rounded border border-blue-200">
                    textbox
                  </code>
                </div>
                <div>
                  <code className="bg-white px-2 py-1 rounded border border-blue-200">
                    link
                  </code>
                </div>
                <div>
                  <code className="bg-white px-2 py-1 rounded border border-blue-200">
                    heading
                  </code>
                </div>
                <div>
                  <code className="bg-white px-2 py-1 rounded border border-blue-200">
                    listitem
                  </code>
                </div>
                <div>
                  <code className="bg-white px-2 py-1 rounded border border-blue-200">
                    checkbox
                  </code>
                </div>
              </div>
            </div>
          </div>
        </SubSection>

        <SubSection
          title={t('unitTesting.userInteractions.title')}
          icon
          iconColor="blue"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('unitTesting.userInteractions.description')}
            </p>

            <CodeBlock
              code={`import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

test('increments counter on button click', async () => {
  const user = userEvent.setup();
  render(<Counter />);

  const button = screen.getByRole('button', { name: /increment/i });
  const counter = screen.getByText(/count: 0/i);

  await user.click(button);

  // Counter should now show 1
  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});`}
              className="text-xs"
            />

            <InfoBox
              variant="blue"
              title={t('unitTesting.userInteractions.comparison.title')}
            >
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>userEvent:</strong>{' '}
                  {t('unitTesting.userInteractions.comparison.userEvent')}
                </li>
                <li>
                  <strong>fireEvent:</strong>{' '}
                  {t('unitTesting.userInteractions.comparison.fireEvent')}
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection
          title={t('unitTesting.asyncTesting.title')}
          icon
          iconColor="purple"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('unitTesting.asyncTesting.description')}
            </p>

            <CodeBlock
              code={`test('loads and displays user data', async () => {
  render(<UserProfile userId="123" />);

  // findBy waits for element to appear (up to 1000ms by default)
  const userName = await screen.findByText(/john doe/i);
  expect(userName).toBeInTheDocument();
});

// Or use waitFor for more control
test('shows error message on failed request', async () => {
  render(<UserProfile userId="invalid" />);

  await waitFor(() => {
    expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
  });
});`}
              className="text-xs"
            />

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-sm text-gray-700 font-semibold mb-2">
                {t('unitTesting.asyncTesting.queryPriority.title')}
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
                <li>
                  <strong>getBy*:</strong>{' '}
                  {t('unitTesting.asyncTesting.queryPriority.getBy')}
                </li>
                <li>
                  <strong>findBy*:</strong>{' '}
                  {t('unitTesting.asyncTesting.queryPriority.findBy')}
                </li>
                <li>
                  <strong>queryBy*:</strong>{' '}
                  {t('unitTesting.asyncTesting.queryPriority.queryBy')}
                </li>
              </ol>
            </div>
          </div>
        </SubSection>

        <SubSection
          title={t('unitTesting.formExample.title')}
          icon
          iconColor="blue"
        >
          <div className="space-y-4">
            <CodeBlock
              code={`import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

test('submits form with email and password', async () => {
  const user = userEvent.setup();
  const handleSubmit = vi.fn();

  render(<LoginForm onSubmit={handleSubmit} />);

  // Get input fields
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /sign in/i });

  // Fill in the form
  await user.type(emailInput, 'user@example.com');
  await user.type(passwordInput, 'password123');

  // Submit the form
  await user.click(submitButton);

  // Wait for the submit handler to be called
  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password123',
    });
  });
});`}
              className="text-xs"
            />
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

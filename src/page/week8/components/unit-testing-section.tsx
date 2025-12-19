import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const UnitTestingSection = () => {
  return (
    <SectionCard
      badge={{ label: 'React Testing Library', color: 'green' }}
      title="Unit Testing with React Testing Library"
      description="Testing React components the way users interact with them."
    >
      <div className="space-y-8">
        <SubSection
          title="React Testing Library Philosophy"
          icon
          iconColor="green"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              React Testing Library's guiding principle is:{' '}
              <strong>"Test the behavior, not the implementation."</strong> This
              means writing tests from the user's perspective, not based on how
              the component is coded.
            </p>

            <InfoBox
              variant="green"
              title="Core Philosophy: User-Centric Testing"
            >
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Don't test state:</strong> Users don't see state; they
                  see rendered output
                </li>
                <li>
                  <strong>Don't test implementation:</strong> How the component
                  works shouldn't matter
                </li>
                <li>
                  <strong>Test what users see:</strong> Focus on DOM elements,
                  buttons, text, and accessibility
                </li>
                <li>
                  <strong>Simulate user interactions:</strong> Click, type,
                  submit forms
                </li>
              </ul>
            </InfoBox>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-sm text-gray-700 font-semibold">
                ❌ DON'T do this:
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
                ✅ DO this instead:
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

        <SubSection title="Core Queries: getByRole" icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              The most recommended query is <strong>getByRole</strong>, as it
              aligns with how assistive technologies interact with the DOM. It
              also encourages semantic HTML.
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
                Common Roles:
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

        <SubSection title="User Interactions" icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Use <strong>userEvent</strong> (not fireEvent) to simulate user
              interactions. userEvent is more realistic and triggers all the
              events a real user would trigger.
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

            <InfoBox variant="blue" title="userEvent vs fireEvent">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>userEvent:</strong> Simulates real user behavior
                  (setup(), click(), type(), etc.)
                </li>
                <li>
                  <strong>fireEvent:</strong> Directly triggers DOM events
                  (older approach, less realistic)
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="Async Testing Patterns" icon iconColor="purple">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Use <strong>findBy</strong> or <strong>waitFor</strong> when
              testing asynchronous operations like API calls.
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
                Query Priority:
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
                <li>
                  <strong>getBy*:</strong> Throws if not found (immediate)
                </li>
                <li>
                  <strong>findBy*:</strong> Returns promise (waits for element)
                </li>
                <li>
                  <strong>queryBy*:</strong> Returns null if not found
                </li>
              </ol>
            </div>
          </div>
        </SubSection>

        <SubSection title="Example: Testing a Form" icon iconColor="blue">
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

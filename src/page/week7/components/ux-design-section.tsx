import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const UXDesignSection = () => {
  return (
    <SectionCard
      badge={{ label: 'User Experience', color: 'blue' }}
      title="UX-Focused Form Design"
      description="Creating forms that delight users and reduce friction"
    >
      <div className="space-y-8">
        <SubSection title="Error Message Design" icon iconColor="red">
          <InfoBox variant="red" title="Common Mistakes">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <strong>Generic errors:</strong> "Invalid input" (not helpful)
              </li>
              <li>
                <strong>Too technical:</strong> "Field regex validation failed"
              </li>
              <li>
                <strong>Blaming the user:</strong> "You entered wrong data"
              </li>
              <li>
                <strong>Appearing too early:</strong> Showing errors while user
                is typing
              </li>
              <li>
                <strong>Poor visibility:</strong> Error text same color as
                normal text
              </li>
            </ul>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              Error Message Best Practices:
            </p>
            <CodeBlock
              code={`// ❌ BAD error messages
- "Invalid email"
- "Password too weak"
- "Field required"

// ✅ GOOD error messages
- "Please enter a valid email address (example@domain.com)"
- "Password must contain: 1 uppercase, 1 number, 8+ characters"
- "Please enter your full name to continue"

// ✅ Component implementation
const FormField = ({ label, error, children }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-sm font-medium text-red-600 flex items-center gap-1">
          <span className="text-base">⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
};

// In form
const RegistrationForm = () => {
  const { register, formState: { errors } } = useForm();

  return (
    <form>
      <FormField
        label="Email Address"
        error={errors.email?.message}
      >
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^@]+@[^@]+\\.[^@]+$/,
              message: 'Please enter a valid email address',
            },
          })}
          className={errors.email ? 'border-red-500' : 'border-gray-300'}
        />
      </FormField>
    </form>
  );
};`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title="Validation Timing" icon iconColor="orange">
          <div className="space-y-3">
            <div className="bg-orange-50 p-4 rounded border border-orange-200">
              <p className="font-semibold text-sm text-orange-900 mb-2">
                onChange (Real-Time)
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Best for:</strong> Password strength, character count
              </p>
              <p className="text-sm text-gray-700">
                <strong>Downside:</strong> Can be annoying, especially with slow
                debounce
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded border border-purple-200">
              <p className="font-semibold text-sm text-purple-900 mb-2">
                onBlur (Recommended)
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Best for:</strong> Email validation, username
                availability
              </p>
              <p className="text-sm text-gray-700">
                <strong>Advantage:</strong> Validates when user leaves field,
                clean UX
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded border border-green-200">
              <p className="font-semibold text-sm text-green-900 mb-2">
                onSubmit
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Best for:</strong> Cross-field validation, final checks
              </p>
              <p className="text-sm text-gray-700">
                <strong>Advantage:</strong> No premature errors, user-initiated
                action
              </p>
            </div>
          </div>

          <InfoBox variant="blue" title="Recommended Strategy">
            <p className="text-sm">
              <strong>onBlur + onSubmit:</strong> Validate when user leaves
              field (catches most errors), then validate on submit (catches
              remaining issues). This is the best UX balance.
            </p>
          </InfoBox>
        </SubSection>

        <SubSection
          title="Form Reset & Focus Management"
          icon
          iconColor="green"
        >
          <CodeBlock
            code={`const ContactForm = () => {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const onSubmit = async (data: any) => {
    try {
      await submitToServer(data);

      // Show success message
      toast.success('Message sent successfully!');

      // Reset form to initial state
      reset();

      // Return focus to submit button
      submitButtonRef.current?.focus();
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register('name', { required: 'Name is required' })}
        placeholder="Your name"
        autoFocus // Focus first field on page load
      />

      <input
        {...register('email', { required: 'Email is required' })}
        type="email"
        placeholder="Your email"
      />

      <textarea
        {...register('message', { required: 'Message is required' })}
        placeholder="Your message"
        rows={5}
      />

      <button
        ref={submitButtonRef}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Optimistic UI Updates" icon iconColor="purple">
          <InfoBox variant="purple" title="What is Optimistic UI?">
            <p className="text-sm">
              Display the result immediately before server confirms, then revert
              if it fails. Creates a snappy, responsive feel without actual
              instant confirmation.
            </p>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              useOptimistic Example (React 19):
            </p>
            <CodeBlock
              code={`import { useOptimistic } from 'react';

const TodoForm = ({ todos, addTodo }) => {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  );

  const handleSubmit = async (formData: FormData) => {
    const newTodo = { id: Date.now(), text: formData.get('text') };

    // Immediately show the todo (optimistic)
    addOptimisticTodo(newTodo);

    try {
      // Send to server
      const result = await addTodo(newTodo);
      // If successful, server will re-render with real data
    } catch (error) {
      // If fails, optimisticTodos reverts automatically
      toast.error('Failed to add todo');
    }
  };

  return (
    <form action={handleSubmit}>
      <input name="text" placeholder="Add a todo" required />
      <button type="submit">Add</button>

      <ul>
        {optimisticTodos.map((todo) => (
          <li key={todo.id} className={todo.pending ? 'opacity-50' : ''}>
            {todo.text}
            {todo.pending && <span> (Sending...)</span>}
          </li>
        ))}
      </ul>
    </form>
  );
};

// Server action (Next.js)
async function addTodo(todo) {
  const newTodo = await db.todos.create(todo);
  revalidatePath('/todos');
  return newTodo;
}`}
              className="text-xs"
            />
          </div>

          <CodeBlock
            code={`// For older React versions, use manual state:
const TodoForm = ({ todos, onAdd }) => {
  const [pending, setPending] = useState(false);
  const [localTodos, setLocalTodos] = useState(todos);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get('text') as string;

    // Optimistic update
    const tempId = Date.now();
    setLocalTodos([...localTodos, { id: tempId, text, pending: true }]);
    setPending(true);

    try {
      const newTodo = await onAdd(text);
      // Replace temp with real
      setLocalTodos((prev) =>
        prev.map((t) => (t.id === tempId ? newTodo : t))
      );
      e.currentTarget.reset();
    } catch (error) {
      // Revert optimistic update
      setLocalTodos((prev) => prev.filter((t) => t.id !== tempId));
      toast.error('Failed to add todo');
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="text" placeholder="Add todo" required disabled={pending} />
      <button type="submit" disabled={pending}>
        {pending ? 'Adding...' : 'Add'}
      </button>
      <ul>
        {localTodos.map((todo) => (
          <li key={todo.id} className={todo.pending ? 'opacity-50' : ''}>
            {todo.text}
          </li>
        ))}
      </ul>
    </form>
  );
};`}
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title="Accessibility Best Practices"
          icon
          iconColor="purple"
        >
          <InfoBox variant="purple" title="Accessible Form Requirements">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <strong>Labels:</strong> Always associate label with input using
                htmlFor
              </li>
              <li>
                <strong>ARIA:</strong> aria-label, aria-describedby for errors
              </li>
              <li>
                <strong>Keyboard:</strong> Tab order, Enter to submit, Escape to
                cancel
              </li>
              <li>
                <strong>Screen readers:</strong> Announce errors and required
                fields
              </li>
              <li>
                <strong>Color:</strong> Don't rely only on color to show errors
              </li>
            </ul>
          </InfoBox>

          <CodeBlock
            code={`const AccessibleForm = () => {
  const { register, formState: { errors } } = useForm();

  return (
    <form>
      {/* Proper label association */}
      <div className="mb-4">
        <label htmlFor="email" className="block font-medium">
          Email Address
          <span className="text-red-500" aria-label="required">*</span>
        </label>
        <input
          id="email"
          {...register('email', { required: true })}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby="email-error"
          type="email"
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600">
            {/* Icon + text = accessible error */}
            ⚠️ Email is required
          </p>
        )}
      </div>

      {/* Keyboard friendly submit */}
      <button type="submit">
        Submit
      </button>
    </form>
  );
};

// Form wrapper with better semantics
const FormSection = ({ title, children }) => (
  <fieldset>
    <legend>{title}</legend>
    {children}
  </fieldset>
);`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Mobile & Touch Optimization" icon iconColor="blue">
          <CodeBlock
            code={`// Optimize for touch and mobile
const MobileForm = () => {
  const { register } = useForm();

  return (
    <form className="space-y-6">
      {/* Large touch targets (min 44x44px) */}
      <input
        {...register('email')}
        type="email"
        placeholder="Email"
        className="w-full px-4 py-3 text-base" // text-base prevents zoom on iOS
        // Proper input types for mobile keyboards
        inputMode="email"
      />

      <input
        {...register('phone')}
        type="tel"
        placeholder="Phone"
        inputMode="tel"
      />

      <input
        {...register('age')}
        type="number"
        placeholder="Age"
        inputMode="numeric"
        // Prevent mobile zoom on input focus
        style={{ fontSize: '16px' }}
      />

      {/* Large button for mobile */}
      <button
        type="submit"
        className="w-full py-3 px-4 font-semibold text-base"
      >
        Submit
      </button>

      {/* Prevent form zoom on iOS */}
      <style>{\`
input:focus { font-size: 16px; }
\`}</style>
    </form>
  );
};`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="UX Checklist" icon iconColor="green">
          <div className="space-y-2">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded border border-green-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">Error messages are specific and helpful</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded border border-green-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                Form validates on blur (not aggressive on change)
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded border border-green-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">Submit button shows loading state</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded border border-green-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">Form resets after successful submission</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded border border-green-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                Focus is managed (first field on load, button after submit)
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded border border-green-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                Success/error feedback is clear (toast, modal, or text)
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded border border-green-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                Labels are properly associated with inputs
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded border border-green-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                Form is accessible to keyboard and screen readers
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded border border-green-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">Touch targets are at least 44x44px</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded border border-green-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">Form works on mobile and desktop</p>
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';
import { useTranslation } from 'react-i18next';

export const UXDesignSection = () => {
  const { t } = useTranslation('week7');

  return (
    <SectionCard
      badge={{ label: t('uxDesign.badge'), color: 'blue' }}
      title={t('uxDesign.title')}
      description={t('uxDesign.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('uxDesign.errorMessageDesign.title')} icon iconColor="red">
          <InfoBox variant="red" title={t('uxDesign.errorMessageDesign.commonMistakes.title')}>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                {t('uxDesign.errorMessageDesign.commonMistakes.generic')}
              </li>
              <li>
                {t('uxDesign.errorMessageDesign.commonMistakes.tooTechnical')}
              </li>
              <li>
                {t('uxDesign.errorMessageDesign.commonMistakes.blaming')}
              </li>
              <li>
                {t('uxDesign.errorMessageDesign.commonMistakes.tooEarly')}
              </li>
              <li>
                {t('uxDesign.errorMessageDesign.commonMistakes.poorVisibility')}
              </li>
            </ul>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              {t('uxDesign.errorMessageDesign.bestPractices')}
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

        <SubSection title={t('uxDesign.validationTiming.title')} icon iconColor="orange">
          <div className="space-y-3">
            <div className="bg-orange-50 p-4 rounded border border-orange-200">
              <p className="font-semibold text-sm text-orange-900 mb-2">
                {t('uxDesign.validationTiming.onChange.title')}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                {t('uxDesign.validationTiming.onChange.bestFor')}
              </p>
              <p className="text-sm text-gray-700">
                {t('uxDesign.validationTiming.onChange.downside')}
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded border border-purple-200">
              <p className="font-semibold text-sm text-purple-900 mb-2">
                {t('uxDesign.validationTiming.onBlur.title')}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                {t('uxDesign.validationTiming.onBlur.bestFor')}
              </p>
              <p className="text-sm text-gray-700">
                {t('uxDesign.validationTiming.onBlur.advantage')}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded border border-green-200">
              <p className="font-semibold text-sm text-green-900 mb-2">
                {t('uxDesign.validationTiming.onSubmit.title')}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                {t('uxDesign.validationTiming.onSubmit.bestFor')}
              </p>
              <p className="text-sm text-gray-700">
                {t('uxDesign.validationTiming.onSubmit.advantage')}
              </p>
            </div>
          </div>

          <InfoBox variant="blue" title={t('uxDesign.validationTiming.recommendedStrategy.title')}>
            <p className="text-sm">
              {t('uxDesign.validationTiming.recommendedStrategy.description')}
            </p>
          </InfoBox>
        </SubSection>

        <SubSection
          title={t('uxDesign.formResetFocus.title')}
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

        <SubSection title={t('uxDesign.optimisticUI.title')} icon iconColor="purple">
          <InfoBox variant="purple" title={t('uxDesign.optimisticUI.whatIsOptimistic.title')}>
            <p className="text-sm">
              {t('uxDesign.optimisticUI.whatIsOptimistic.description')}
            </p>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              {t('uxDesign.optimisticUI.useOptimisticExample')}
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
          title={t('uxDesign.a11yBestPractices.title')}
          icon
          iconColor="purple"
        >
          <InfoBox variant="purple" title={t('uxDesign.a11yBestPractices.requirements.title')}>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                {t('uxDesign.a11yBestPractices.requirements.labels')}
              </li>
              <li>
                {t('uxDesign.a11yBestPractices.requirements.aria')}
              </li>
              <li>
                {t('uxDesign.a11yBestPractices.requirements.keyboard')}
              </li>
              <li>
                {t('uxDesign.a11yBestPractices.requirements.screenReaders')}
              </li>
              <li>
                {t('uxDesign.a11yBestPractices.requirements.color')}
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

        <SubSection title={t('uxDesign.mobileTouchOptimization.title')} icon iconColor="blue">
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

        <SubSection title={t('uxDesign.uxChecklist.title')} icon iconColor="green">
          <div className="space-y-2">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded border border-green-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">{t('uxDesign.uxChecklist.specificErrors')}</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded border border-green-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                {t('uxDesign.uxChecklist.validateOnBlur')}
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded border border-green-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">{t('uxDesign.uxChecklist.loadingState')}</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded border border-green-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">{t('uxDesign.uxChecklist.resetsAfterSubmit')}</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded border border-green-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                {t('uxDesign.uxChecklist.focusManaged')}
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded border border-green-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                {t('uxDesign.uxChecklist.clearFeedback')}
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded border border-green-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                {t('uxDesign.uxChecklist.properLabels')}
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded border border-green-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                {t('uxDesign.uxChecklist.accessible')}
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded border border-green-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">{t('uxDesign.uxChecklist.touchTargets')}</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded border border-green-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">{t('uxDesign.uxChecklist.worksEverywhere')}</p>
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

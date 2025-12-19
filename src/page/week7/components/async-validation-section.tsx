import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const AsyncValidationSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Server Integration', color: 'pink' }}
      title="Async Validation"
      description="Server-side validation checks like duplicate email, username availability"
    >
      <div className="space-y-8">
        <SubSection
          title="The Problem with Real-Time Validation"
          icon
          iconColor="red"
        >
          <InfoBox variant="red" title="Common Issues">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <strong>Too many API calls:</strong> Calling API on every
                keystroke wastes bandwidth
              </li>
              <li>
                <strong>UX noise:</strong> Validation errors flickering on every
                character
              </li>
              <li>
                <strong>Race conditions:</strong> Out-of-order API responses
                causing incorrect state
              </li>
              <li>
                <strong>Performance:</strong> Too many requests slows down
                server and client
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title="Debounce Strategy" icon iconColor="purple">
          <InfoBox variant="purple" title="What is Debouncing?">
            <p className="text-sm">
              Debouncing waits for user to stop typing (usually 300-500ms)
              before making the API call. This dramatically reduces requests
              while maintaining good UX.
            </p>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              Debounce Implementation:
            </p>
            <CodeBlock
              code={`// Custom debounce hook
const useDebounce = <T,>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

// In form component
const CheckUsernameForm = () => {
  const { register, watch } = useForm();
  const username = watch('username');
  const debouncedUsername = useDebounce(username, 500);
  const [isAvailable, setIsAvailable] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (!debouncedUsername) return;

    setIsChecking(true);
    fetch(\`/api/check-username?username=\${debouncedUsername}\`)
      .then((res) => res.json())
      .then((data) => {
        setIsAvailable(data.available);
        setIsChecking(false);
      });
  }, [debouncedUsername]);

  return (
    <>
      <input {...register('username')} placeholder="Choose username" />
      {isChecking && <p>Checking availability...</p>}
      {isAvailable === true && <p className="text-green-600">✓ Available</p>}
      {isAvailable === false && <p className="text-red-600">✗ Already taken</p>}
    </>
  );
};`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title="RHF Async Validation" icon iconColor="blue">
          <p className="text-sm text-gray-700 mb-3">
            React Hook Form supports async validation through the validate
            option or async validator functions.
          </p>

          <CodeBlock
            code={`import { useForm } from 'react-hook-form';

const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
});

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors, isValidating } } = useForm({
    resolver: async (data) => {
      // First validate schema
      const schemaValidation = await registerSchema.parseAsync(data).catch((err) => err);

      if (schemaValidation.errors) {
        return { values: {}, errors: schemaValidation.errors };
      }

      // Then do async checks
      const [emailExists, usernameExists] = await Promise.all([
        fetch(\`/api/check-email?email=\${data.email}\`).then(r => r.json()),
        fetch(\`/api/check-username?username=\${data.username}\`).then(r => r.json()),
      ]);

      const errors = {};
      if (emailExists.exists) {
        errors.email = { message: 'Email already registered' };
      }
      if (usernameExists.exists) {
        errors.username = { message: 'Username taken' };
      }

      return { values: data, errors };
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register('username')} />
      {errors.username && <span>{errors.username.message}</span>}

      {isValidating && <p>Validating...</p>}
      <button type="submit" disabled={isValidating}>Register</button>
    </form>
  );
};`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Timing Strategies" icon iconColor="orange">
          <div className="space-y-3">
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="font-semibold text-sm text-blue-900 mb-2">
                Debounce on Change (onChange)
              </p>
              <p className="text-sm text-gray-700">
                <strong>Best for:</strong> Checking availability, real-time
                suggestions
              </p>
              <p className="text-sm text-gray-700 mt-1">
                <strong>UX:</strong> Immediate feedback, may feel expensive
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="font-semibold text-sm text-purple-900 mb-2">
                Validate on Blur (onBlur)
              </p>
              <p className="text-sm text-gray-700">
                <strong>Best for:</strong> Email/username duplicate checks
              </p>
              <p className="text-sm text-gray-700 mt-1">
                <strong>UX:</strong> Cleaner, validates when user leaves field
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="font-semibold text-sm text-green-900 mb-2">
                Validate on Submit
              </p>
              <p className="text-sm text-gray-700">
                <strong>Best for:</strong> Final server-side validation
              </p>
              <p className="text-sm text-gray-700 mt-1">
                <strong>UX:</strong> Cleanest, but delayed feedback
              </p>
            </div>
          </div>

          <InfoBox variant="green" title="Best Practice">
            <p className="text-sm">
              Combine strategies: <strong>Sync validation on submit</strong> +
              <strong>Async validation on blur</strong> (debounced) for optimal
              UX. This catches errors early without bothering the user.
            </p>
          </InfoBox>
        </SubSection>

        <SubSection title="Handling Race Conditions" icon iconColor="orange">
          <InfoBox variant="orange" title="The Problem">
            <p className="text-sm">
              If user types "john@example.com", then deletes and types
              "jane@example.com", the first request might resolve AFTER the
              second, causing wrong validation state.
            </p>
          </InfoBox>

          <CodeBlock
            code={`// Solution: Use AbortController to cancel old requests
const CheckEmailForm = () => {
  const [email, setEmail] = useState('');
  const [isAvailable, setIsAvailable] = useState(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!email) return;

    // Cancel previous request
    abortControllerRef.current?.abort();

    // Create new controller
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const timer = setTimeout(() => {
      fetch(\`/api/check-email?email=\${email}\`, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((data) => {
          if (!controller.signal.aborted) {
            setIsAvailable(data.available);
          }
        })
        .catch((err) => {
          if (err.name !== 'AbortError') console.error(err);
        });
    }, 500);

    return () => clearTimeout(timer);
  }, [email]);

  return (
    <>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      {isAvailable === true && <p className="text-green-600">Available</p>}
      {isAvailable === false && <p className="text-red-600">Already registered</p>}
    </>
  );
};`}
            className="text-xs"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};

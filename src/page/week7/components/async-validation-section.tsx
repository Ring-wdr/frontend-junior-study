import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';
import { useTranslation } from 'react-i18next';

export const AsyncValidationSection = () => {
  const { t } = useTranslation('week7');

  return (
    <SectionCard
      badge={{ label: t('asyncValidation.badge'), color: 'pink' }}
      title={t('asyncValidation.title')}
      description={t('asyncValidation.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('asyncValidation.problem.title')}
          icon
          iconColor="red"
        >
          <InfoBox variant="red" title={t('asyncValidation.problem.commonIssues.title')}>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                {t('asyncValidation.problem.commonIssues.tooManyCalls')}
              </li>
              <li>
                {t('asyncValidation.problem.commonIssues.uxNoise')}
              </li>
              <li>
                {t('asyncValidation.problem.commonIssues.raceConditions')}
              </li>
              <li>
                {t('asyncValidation.problem.commonIssues.performance')}
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title={t('asyncValidation.debounceStrategy.title')} icon iconColor="purple">
          <InfoBox variant="purple" title={t('asyncValidation.debounceStrategy.whatIsDebouncing.title')}>
            <p className="text-sm">
              {t('asyncValidation.debounceStrategy.whatIsDebouncing.description')}
            </p>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              {t('asyncValidation.debounceStrategy.implementation')}
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

        <SubSection title={t('asyncValidation.rhfAsyncValidation.title')} icon iconColor="blue">
          <p className="text-sm text-gray-700 mb-3">
            {t('asyncValidation.rhfAsyncValidation.description')}
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

        <SubSection title={t('asyncValidation.timingStrategies.title')} icon iconColor="orange">
          <div className="space-y-3">
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="font-semibold text-sm text-blue-900 mb-2">
                {t('asyncValidation.timingStrategies.onChange.title')}
              </p>
              <p className="text-sm text-gray-700">
                {t('asyncValidation.timingStrategies.onChange.bestFor')}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                {t('asyncValidation.timingStrategies.onChange.ux')}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="font-semibold text-sm text-purple-900 mb-2">
                {t('asyncValidation.timingStrategies.onBlur.title')}
              </p>
              <p className="text-sm text-gray-700">
                {t('asyncValidation.timingStrategies.onBlur.bestFor')}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                {t('asyncValidation.timingStrategies.onBlur.ux')}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="font-semibold text-sm text-green-900 mb-2">
                {t('asyncValidation.timingStrategies.onSubmit.title')}
              </p>
              <p className="text-sm text-gray-700">
                {t('asyncValidation.timingStrategies.onSubmit.bestFor')}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                {t('asyncValidation.timingStrategies.onSubmit.ux')}
              </p>
            </div>
          </div>

          <InfoBox variant="green" title={t('asyncValidation.timingStrategies.bestPractice.title')}>
            <p className="text-sm">
              {t('asyncValidation.timingStrategies.bestPractice.description')}
            </p>
          </InfoBox>
        </SubSection>

        <SubSection title={t('asyncValidation.raceConditions.title')} icon iconColor="orange">
          <InfoBox variant="orange" title={t('asyncValidation.raceConditions.problem.title')}>
            <p className="text-sm">
              {t('asyncValidation.raceConditions.problem.description')}
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

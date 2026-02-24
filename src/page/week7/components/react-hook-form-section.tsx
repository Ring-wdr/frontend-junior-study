import { useTranslation } from 'react-i18next';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const ReactHookFormSection = () => {
  const { t } = useTranslation('week7');

  return (
    <SectionCard
      badge={{ label: t('reactHookForm.badge'), color: 'purple' }}
      title={t('reactHookForm.title')}
      description={t('reactHookForm.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('reactHookForm.whyRHF.title')}
          icon
          iconColor="purple"
        >
          <InfoBox
            variant="purple"
            title={t('reactHookForm.whyRHF.keyAdvantages.title')}
          >
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <strong>Uncontrolled-based:</strong>{' '}
                {t('reactHookForm.whyRHF.keyAdvantages.uncontrolled')}
              </li>
              <li>
                <strong>Small bundle:</strong>{' '}
                {t('reactHookForm.whyRHF.keyAdvantages.smallBundle')}
              </li>
              <li>
                <strong>Type-safe:</strong>{' '}
                {t('reactHookForm.whyRHF.keyAdvantages.typeSafe')}
              </li>
              <li>
                <strong>Register API:</strong>{' '}
                {t('reactHookForm.whyRHF.keyAdvantages.registerAPI')}
              </li>
              <li>
                <strong>formState object:</strong>{' '}
                {t('reactHookForm.whyRHF.keyAdvantages.formState')}
              </li>
              <li>
                <strong>Watch, setValue:</strong>{' '}
                {t('reactHookForm.whyRHF.keyAdvantages.watchSetValue')}
              </li>
              <li>
                <strong>Controller:</strong>{' '}
                {t('reactHookForm.whyRHF.keyAdvantages.controller')}
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection
          title={t('reactHookForm.basicSetup.title')}
          icon
          iconColor="blue"
        >
          <CodeBlock
            code={`import { useForm } from 'react-hook-form';

const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    // Send to API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^@]+@[^@]+\\.[^@]+$/,
            message: 'Invalid email format',
          },
        })}
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        {...register('password', {
          required: 'Password is required',
          minLength: { value: 8, message: 'Min 8 characters' },
        })}
        type="password"
        placeholder="Password"
      />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Sign In</button>
    </form>
  );
};`}
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('reactHookForm.coreMethods.title')}
          icon
          iconColor="green"
        >
          <div className="space-y-3">
            <div className="bg-green-50 p-4 rounded border border-green-200">
              <p className="font-semibold text-sm mb-2">
                {t('reactHookForm.coreMethods.register.title')}
              </p>
              <p className="text-sm text-gray-700">
                {t('reactHookForm.coreMethods.register.description')}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded border border-green-200">
              <p className="font-semibold text-sm mb-2">
                {t('reactHookForm.coreMethods.handleSubmit.title')}
              </p>
              <p className="text-sm text-gray-700">
                {t('reactHookForm.coreMethods.handleSubmit.description')}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded border border-green-200">
              <p className="font-semibold text-sm mb-2">
                {t('reactHookForm.coreMethods.watch.title')}
              </p>
              <p className="text-sm text-gray-700">
                {t('reactHookForm.coreMethods.watch.description')}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded border border-green-200">
              <p className="font-semibold text-sm mb-2">
                {t('reactHookForm.coreMethods.setValue.title')}
              </p>
              <p className="text-sm text-gray-700">
                {t('reactHookForm.coreMethods.setValue.description')}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded border border-green-200">
              <p className="font-semibold text-sm mb-2">
                {t('reactHookForm.coreMethods.reset.title')}
              </p>
              <p className="text-sm text-gray-700">
                {t('reactHookForm.coreMethods.reset.description')}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded border border-green-200">
              <p className="font-semibold text-sm mb-2">
                {t('reactHookForm.coreMethods.controller.title')}
              </p>
              <p className="text-sm text-gray-700">
                {t('reactHookForm.coreMethods.controller.description')}
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection
          title={t('reactHookForm.controllerForCustom.title')}
          icon
          iconColor="pink"
        >
          <CodeBlock
            code={`import { Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';

const MyForm = () => {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Standard input with register */}
      <input {...register('name')} />

      {/* Custom component with Controller */}
      <Controller
        name="birthDate"
        control={control}
        rules={{ required: 'Date is required' }}
        render={({ field, fieldState: { error } }) => (
          <>
            <DatePicker
              value={field.value}
              onChange={field.onChange}
            />
            {error && <span>{error.message}</span>}
          </>
        )}
      />

      <button type="submit">Submit</button>
    </form>
  );
};`}
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('reactHookForm.formStateObject.title')}
          icon
          iconColor="orange"
        >
          <InfoBox
            variant="orange"
            title={t('reactHookForm.formStateObject.importantProps.title')}
          >
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <strong>isDirty:</strong>{' '}
                {t('reactHookForm.formStateObject.importantProps.isDirty')}
              </li>
              <li>
                <strong>isTouched:</strong>{' '}
                {t('reactHookForm.formStateObject.importantProps.isTouched')}
              </li>
              <li>
                <strong>errors:</strong>{' '}
                {t('reactHookForm.formStateObject.importantProps.errors')}
              </li>
              <li>
                <strong>isSubmitting:</strong>{' '}
                {t('reactHookForm.formStateObject.importantProps.isSubmitting')}
              </li>
              <li>
                <strong>isValidating:</strong>{' '}
                {t('reactHookForm.formStateObject.importantProps.isValidating')}
              </li>
              <li>
                <strong>isValid:</strong>{' '}
                {t('reactHookForm.formStateObject.importantProps.isValid')}
              </li>
              <li>
                <strong>dirtyFields:</strong>{' '}
                {t('reactHookForm.formStateObject.importantProps.dirtyFields')}
              </li>
              <li>
                <strong>touchedFields:</strong>{' '}
                {t(
                  'reactHookForm.formStateObject.importantProps.touchedFields',
                )}
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection
          title={t('reactHookForm.formStateTracking.title')}
          icon
          iconColor="blue"
        >
          <CodeBlock
            code={`const MyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}

      {/* Disable submit if form is pristine or submitting */}
      <button
        type="submit"
        disabled={!isDirty || isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>

      {/* Show unsaved changes indicator */}
      {isDirty && <p className="warning">You have unsaved changes</p>}
    </form>
  );
};`}
            className="text-xs"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};

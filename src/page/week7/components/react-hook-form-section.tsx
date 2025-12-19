import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const ReactHookFormSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Modern Standard', color: 'purple' }}
      title="React Hook Form"
      description="Uncontrolled, high-performance form state management"
    >
      <div className="space-y-8">
        <SubSection title="Why React Hook Form?" icon iconColor="purple">
          <InfoBox variant="purple" title="Key Advantages">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <strong>Uncontrolled-based:</strong> Minimal re-renders (only on
                changes)
              </li>
              <li>
                <strong>Small bundle:</strong> ~9KB minified
              </li>
              <li>
                <strong>Type-safe:</strong> Excellent TypeScript support
              </li>
              <li>
                <strong>Register API:</strong> Simple input field registration
              </li>
              <li>
                <strong>formState object:</strong> Tracks isDirty, isTouched,
                errors, etc.
              </li>
              <li>
                <strong>Watch, setValue:</strong> Programmatic value access
              </li>
              <li>
                <strong>Controller:</strong> Works with custom/3rd-party inputs
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title="Basic Setup" icon iconColor="blue">
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

        <SubSection title="Core Methods" icon iconColor="green">
          <div className="space-y-3">
            <div className="bg-green-50 p-4 rounded border border-green-200">
              <p className="font-semibold text-sm mb-2">
                register(name, options)
              </p>
              <p className="text-sm text-gray-700">
                Registers an input field with validation rules. Returns object
                to spread on input element.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded border border-green-200">
              <p className="font-semibold text-sm mb-2">
                handleSubmit(callback)
              </p>
              <p className="text-sm text-gray-700">
                Validates form on submit and calls callback with validated data.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded border border-green-200">
              <p className="font-semibold text-sm mb-2">watch(fieldName?)</p>
              <p className="text-sm text-gray-700">
                Watches field value(s) and triggers re-renders on change. Useful
                for conditional logic.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded border border-green-200">
              <p className="font-semibold text-sm mb-2">
                setValue(name, value)
              </p>
              <p className="text-sm text-gray-700">
                Programmatically set field value without re-registering.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded border border-green-200">
              <p className="font-semibold text-sm mb-2">
                reset(defaultValues?)
              </p>
              <p className="text-sm text-gray-700">
                Reset form to initial state or provided default values.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded border border-green-200">
              <p className="font-semibold text-sm mb-2">Controller</p>
              <p className="text-sm text-gray-700">
                Wrap custom/3rd-party input components to integrate with React
                Hook Form.
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection title="Controller for Custom Inputs" icon iconColor="pink">
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

        <SubSection title="formState Object" icon iconColor="orange">
          <InfoBox variant="orange" title="Important formState Properties">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <strong>isDirty:</strong> Has user modified any field?
              </li>
              <li>
                <strong>isTouched:</strong> Has user interacted with this field?
              </li>
              <li>
                <strong>errors:</strong> Object containing field validation
                errors
              </li>
              <li>
                <strong>isSubmitting:</strong> Is form currently being
                submitted?
              </li>
              <li>
                <strong>isValidating:</strong> Is async validation running?
              </li>
              <li>
                <strong>isValid:</strong> Is form valid according to rules?
              </li>
              <li>
                <strong>dirtyFields:</strong> Which fields have been modified?
              </li>
              <li>
                <strong>touchedFields:</strong> Which fields have been
                interacted with?
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title="Form State Tracking Example" icon iconColor="blue">
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

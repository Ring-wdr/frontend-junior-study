import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const ValidationLibrariesSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Schema Validation', color: 'green' }}
      title="Validation Libraries: Zod & Formik"
      description="Schema-based validation approaches for type-safe forms"
    >
      <div className="space-y-8">
        <SubSection
          title="Zod — Modern TypeScript Validation"
          icon
          iconColor="green"
        >
          <InfoBox variant="green" title="Why Choose Zod?">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <strong>TypeScript Native:</strong> Schema = Type definition
              </li>
              <li>
                <strong>Tree-shakeable:</strong> Smaller bundle than Yup
              </li>
              <li>
                <strong>RHF Integration:</strong> Seamless with zodResolver
              </li>
              <li>
                <strong>Chainable API:</strong> Elegant schema composition
              </li>
              <li>
                <strong>Custom validators:</strong> Easy to extend
              </li>
            </ul>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              Basic Zod Schema:
            </p>
            <CodeBlock
              code={`import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[A-Z])(?=.*\\d)/,
      'Password must contain uppercase and number'
    ),
});

// Extract TypeScript type automatically
type LoginFormData = z.infer<typeof loginSchema>;`}
              className="text-xs"
            />
          </div>

          <div className="mt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              RHF + Zod Integration:
            </p>
            <CodeBlock
              code={`import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur', // Validate on blur
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Valid data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Login</button>
    </form>
  );
};`}
              className="text-xs"
            />
          </div>

          <InfoBox variant="blue" title="Advanced Zod Features">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <strong>Refinement:</strong> Custom validation logic
              </li>
              <li>
                <strong>Superrefine:</strong> More control over error messages
              </li>
              <li>
                <strong>Discriminated Unions:</strong> Type-safe conditional
                validation
              </li>
              <li>
                <strong>Transform:</strong> Modify values during validation
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title="Formik — Historical Context" icon iconColor="orange">
          <InfoBox variant="orange" title="What is Formik?">
            <p className="text-sm mb-3">
              Formik was React's first major form library, established in 2017.
              It provided structured form state management before React Hook
              Form existed.
            </p>
            <p className="text-sm">
              <strong>Note:</strong> While still used in legacy projects, RHF is
              now the community standard due to better performance and simpler
              API.
            </p>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              Formik vs RHF Comparison:
            </p>
            <CodeBlock
              code={`// FORMIK (Controlled Component Approach)
const LoginForm = () => {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup.string().min(8).required(),
    }),
    onSubmit: (values) => console.log(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.email && formik.errors.email && (
        <span>{formik.errors.email}</span>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

// REACT HOOK FORM (Uncontrolled Approach)
const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      <button type="submit">Submit</button>
    </form>
  );
};

// RHF is shorter, cleaner, and has fewer re-renders! ✅`}
              className="text-xs"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 mt-4">
            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              <p className="text-sm font-semibold text-gray-800 mb-2">
                Formik Pros
              </p>
              <p className="text-sm text-gray-700">
                Familiar for React ecosystem veterans, extensive documentation
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded border border-red-200">
              <p className="text-sm font-semibold text-red-800 mb-2">
                Formik Cons
              </p>
              <p className="text-sm text-gray-700">
                More re-renders (controlled), verbose code, larger bundle
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection title="Custom Validation Rules" icon iconColor="purple">
          <CodeBlock
            code={`// Zod Refinement Example
const passwordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // Field where error appears
  });

// Complex validation with multiple errors
const advancedSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscore'),
  age: z
    .number()
    .min(18, 'Must be 18+')
    .max(120, 'Invalid age'),
  email: z.string().email(),
})
  .superRefine((data, ctx) => {
    // Custom async-friendly validation
    if (data.age < 21 && data.username.includes('adult')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['username'],
        message: 'Username contains restricted word for age < 21',
      });
    }
  });`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="When to Use Which" icon iconColor="blue">
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-blue-50 p-4 rounded border border-blue-200">
              <p className="font-semibold text-sm mb-2 text-blue-900">
                Use Zod + RHF
              </p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>New projects with TypeScript</li>
                <li>Need type-safe validation</li>
                <li>Performance is critical</li>
                <li>Want clean, minimal code</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded border border-orange-200">
              <p className="font-semibold text-sm mb-2 text-orange-900">
                Use Formik
              </p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Maintaining legacy projects</li>
                <li>Team already familiar with Formik</li>
                <li>Need specific Formik plugins</li>
                <li>Large existing codebase to migrate</li>
              </ul>
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

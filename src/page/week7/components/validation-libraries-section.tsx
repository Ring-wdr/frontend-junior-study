import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';
import { useTranslation } from 'react-i18next';

export const ValidationLibrariesSection = () => {
  const { t } = useTranslation('week7');

  return (
    <SectionCard
      badge={{ label: t('validationLibraries.badge'), color: 'green' }}
      title={t('validationLibraries.title')}
      description={t('validationLibraries.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('validationLibraries.zod.title')}
          icon
          iconColor="green"
        >
          <InfoBox variant="green" title={t('validationLibraries.zod.whyChoose.title')}>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                {t('validationLibraries.zod.whyChoose.tsNative')}
              </li>
              <li>
                {t('validationLibraries.zod.whyChoose.treeShakeable')}
              </li>
              <li>
                {t('validationLibraries.zod.whyChoose.rhfIntegration')}
              </li>
              <li>
                {t('validationLibraries.zod.whyChoose.chainableAPI')}
              </li>
              <li>
                {t('validationLibraries.zod.whyChoose.customValidators')}
              </li>
            </ul>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              {t('validationLibraries.zod.basicSchema')}
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
              {t('validationLibraries.zod.rhfIntegration')}
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

          <InfoBox variant="blue" title={t('validationLibraries.zod.advancedFeatures.title')}>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                {t('validationLibraries.zod.advancedFeatures.refinement')}
              </li>
              <li>
                {t('validationLibraries.zod.advancedFeatures.superrefine')}
              </li>
              <li>
                {t('validationLibraries.zod.advancedFeatures.discriminatedUnions')}
              </li>
              <li>
                {t('validationLibraries.zod.advancedFeatures.transform')}
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title={t('validationLibraries.formik.title')} icon iconColor="orange">
          <InfoBox variant="orange" title={t('validationLibraries.formik.whatIsFormik.title')}>
            <p className="text-sm mb-3">
              {t('validationLibraries.formik.whatIsFormik.description')}
            </p>
            <p className="text-sm">
              {t('validationLibraries.formik.whatIsFormik.note')}
            </p>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              {t('validationLibraries.formik.comparison')}
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
                {t('validationLibraries.formik.pros.title')}
              </p>
              <p className="text-sm text-gray-700">
                {t('validationLibraries.formik.pros.description')}
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded border border-red-200">
              <p className="text-sm font-semibold text-red-800 mb-2">
                {t('validationLibraries.formik.cons.title')}
              </p>
              <p className="text-sm text-gray-700">
                {t('validationLibraries.formik.cons.description')}
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection title={t('validationLibraries.customValidation.title')} icon iconColor="purple">
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

        <SubSection title={t('validationLibraries.whenToUse.title')} icon iconColor="blue">
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-blue-50 p-4 rounded border border-blue-200">
              <p className="font-semibold text-sm mb-2 text-blue-900">
                {t('validationLibraries.whenToUse.useZodRHF.title')}
              </p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>{t('validationLibraries.whenToUse.useZodRHF.newProjects')}</li>
                <li>{t('validationLibraries.whenToUse.useZodRHF.typeSafe')}</li>
                <li>{t('validationLibraries.whenToUse.useZodRHF.performance')}</li>
                <li>{t('validationLibraries.whenToUse.useZodRHF.cleanCode')}</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded border border-orange-200">
              <p className="font-semibold text-sm mb-2 text-orange-900">
                {t('validationLibraries.whenToUse.useFormik.title')}
              </p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>{t('validationLibraries.whenToUse.useFormik.legacy')}</li>
                <li>{t('validationLibraries.whenToUse.useFormik.teamFamiliar')}</li>
                <li>{t('validationLibraries.whenToUse.useFormik.plugins')}</li>
                <li>{t('validationLibraries.whenToUse.useFormik.largeCodebase')}</li>
              </ul>
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};

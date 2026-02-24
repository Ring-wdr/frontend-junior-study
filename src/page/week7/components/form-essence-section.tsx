import { useTranslation } from 'react-i18next';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const FormEssenceSection = () => {
  const { t } = useTranslation('week7');

  return (
    <SectionCard
      badge={{ label: t('formEssence.badge'), color: 'blue' }}
      title={t('formEssence.title')}
      description={t('formEssence.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('formEssence.whatIsForm.title')}
          icon
          iconColor="blue"
        >
          <InfoBox
            variant="blue"
            title={t('formEssence.whatIsForm.definition.title')}
          >
            <p className="text-sm leading-relaxed">
              {t('formEssence.whatIsForm.definition.intro')}
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
              <li>
                <strong>UI:</strong> {t('formEssence.whatIsForm.definition.ui')}
              </li>
              <li>
                <strong>State:</strong>{' '}
                {t('formEssence.whatIsForm.definition.state')}
              </li>
              <li>
                <strong>Validation:</strong>{' '}
                {t('formEssence.whatIsForm.definition.validation')}
              </li>
              <li>
                <strong>Error Handling:</strong>{' '}
                {t('formEssence.whatIsForm.definition.errorHandling')}
              </li>
              <li>
                <strong>Submission:</strong>{' '}
                {t('formEssence.whatIsForm.definition.submission')}
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection
          title={t('formEssence.controlledVsUncontrolled.title')}
          icon
          iconColor="purple"
        >
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-sm mb-2 text-blue-900">
                {t('formEssence.controlledVsUncontrolled.controlled.title')}
              </h4>
              <CodeBlock
                code={`// React state controls input value
const [email, setEmail] = useState('');

<input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

// ✅ Predictable state management
// ✅ Real-time validation possible
// ⚠️ More re-renders`}
                className="text-xs"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-sm mb-2 text-purple-900">
                {t('formEssence.controlledVsUncontrolled.uncontrolled.title')}
              </h4>
              <CodeBlock
                code={`// DOM controls input value (via ref)
const emailRef = useRef(null);

<input ref={emailRef} />

// Read value on submit:
const email = emailRef.current.value;

// ✅ Fewer re-renders
// ✅ Simpler for simple forms
// ⚠️ Harder to validate in real-time`}
                className="text-xs"
              />
            </div>
          </div>

          <InfoBox
            variant="green"
            title={t('formEssence.controlledVsUncontrolled.bestPractice.title')}
          >
            <p className="text-sm">
              {t(
                'formEssence.controlledVsUncontrolled.bestPractice.description',
              )}
            </p>
          </InfoBox>
        </SubSection>

        <SubSection
          title={t('formEssence.whyFormsAreComplex.title')}
          icon
          iconColor="orange"
        >
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm">
                <strong>Performance:</strong>{' '}
                {t('formEssence.whyFormsAreComplex.performance')}
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm">
                <strong>State Management:</strong>{' '}
                {t('formEssence.whyFormsAreComplex.stateManagement')}
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm">
                <strong>Validation:</strong>{' '}
                {t('formEssence.whyFormsAreComplex.validation')}
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm">
                <strong>Error Messages:</strong>{' '}
                {t('formEssence.whyFormsAreComplex.errorMessages')}
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm">
                <strong>Edge Cases:</strong>{' '}
                {t('formEssence.whyFormsAreComplex.edgeCases')}
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection
          title={t('formEssence.commonRequirements.title')}
          icon
          iconColor="pink"
        >
          <CodeBlock
            code={`// Typical form lifecycle
1. Initialize form state & validation schema
2. Render input fields with validation rules
3. Listen to user input (onChange, onBlur, onSubmit)
4. Validate values (real-time or on submit)
5. Display error messages
6. Handle async validation (API checks)
7. Submit data safely
8. Handle success/error responses
9. Reset form or redirect

// Each step requires careful state management!`}
            className="text-xs"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};

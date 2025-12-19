import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const FormEssenceSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Fundamentals', color: 'blue' }}
      title="Form Management Essence"
      description="Understanding the core principles of form handling in React"
    >
      <div className="space-y-8">
        <SubSection title="What is a Form?" icon iconColor="blue">
          <InfoBox variant="blue" title="Form Definition">
            <p className="text-sm leading-relaxed">
              A form is a complex system that combines:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
              <li>
                <strong>UI:</strong> Input elements, labels, buttons
              </li>
              <li>
                <strong>State:</strong> Current input values
              </li>
              <li>
                <strong>Validation:</strong> Rules and error checking
              </li>
              <li>
                <strong>Error Handling:</strong> Displaying validation errors
              </li>
              <li>
                <strong>Submission:</strong> Processing and API integration
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title="Controlled vs Uncontrolled" icon iconColor="purple">
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-sm mb-2 text-blue-900">
                Controlled Components
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
                Uncontrolled Components
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

          <InfoBox variant="green" title="Best Practice">
            <p className="text-sm">
              Modern libraries like <strong>React Hook Form</strong> use a
              hybrid approach: minimal controlled components for better
              performance while maintaining predictability.
            </p>
          </InfoBox>
        </SubSection>

        <SubSection title="Why Forms Are Complex" icon iconColor="orange">
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm">
                <strong>Performance:</strong> Too many re-renders with fully
                controlled components
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm">
                <strong>State Management:</strong> Tracking multiple input
                states is tedious
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm">
                <strong>Validation:</strong> Real-time + submit-time + async
                validation coordination
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm">
                <strong>Error Messages:</strong> Displaying and clearing errors
                appropriately
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm">
                <strong>Edge Cases:</strong> Emoji handling, Unicode
                normalization, XSS prevention
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection title="Common Form Requirements" icon iconColor="pink">
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

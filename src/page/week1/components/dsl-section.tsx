import { InfoBox, SectionCard } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const DslSection = () => (
  <SectionCard
    badge={{ label: 'DSL', color: 'teal' }}
    title="Domain-Specific Language"
    description="Mini-languages tailored for specific problem domains."
    testId="dsl-section"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
      <div>
        <InfoBox variant="blue" className="bg-teal-50 border-teal-100 h-full">
          <div>
            <h4 className="font-bold text-teal-900 mb-2">What is a DSL?</h4>
            <p className="text-sm text-teal-800 mb-4">
              Unlike General Purpose Languages (GPL) like Java or Python, DSLs
              are focused on specific tasks.
            </p>
            <ul className="list-disc list-inside text-sm text-teal-800 space-y-2">
              <li>
                <strong>Internal DSL:</strong> Using host language features
                (e.g., jQuery, React JSX, builder patterns).
              </li>
              <li>
                <strong>External DSL:</strong> Separate syntax/parser (e.g.,
                SQL, CSS, Regex, Markdown).
              </li>
            </ul>
          </div>
        </InfoBox>
      </div>

      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Example: React JSX (Internal DSL)
          </span>
          <CodeBlock
            language="jsx"
            code={`// JSX is a DSL for defining UI structure
// It gets transpiled to regular JS calls:
// React.createElement('div', ...)`}
          />
        </div>
        <div>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Example: SQL (External DSL)
          </span>
          <CodeBlock
            language="sql"
            code={`SELECT id, name FROM users
WHERE active = true;`}
          />
        </div>
      </div>
    </div>
  </SectionCard>
);

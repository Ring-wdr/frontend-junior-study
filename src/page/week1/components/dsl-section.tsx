import { Badge } from '../../../components/ui/badge';
import { Card } from '../../../components/ui/card';
import { CodeBlock } from '../../../components/ui/code-block';

export const DslSection = () => (
  <Card className="p-6" data-testid="dsl-section">
    <div className="flex justify-between items-start mb-6 text-left">
      <div>
        <Badge color="teal">DSL</Badge>
        <h3 className="text-xl font-bold mt-2 text-gray-900">
          Domain-Specific Language
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          Mini-languages tailored for specific problem domains.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
      <div>
        <div className="bg-teal-50 p-4 rounded-xl border border-teal-100 mb-4 h-full">
          <h4 className="font-bold text-teal-900 mb-2">What is a DSL?</h4>
          <p className="text-sm text-teal-800 mb-4">
            Unlike General Purpose Languages (GPL) like Java or Python, DSLs are
            focused on specific tasks.
          </p>
          <ul className="list-disc list-inside text-sm text-teal-800 space-y-2">
            <li>
              <strong>Internal DSL:</strong> Using host language features (e.g.,
              jQuery, React JSX, builder patterns).
            </li>
            <li>
              <strong>External DSL:</strong> Separate syntax/parser (e.g., SQL,
              CSS, Regex, Markdown).
            </li>
          </ul>
        </div>
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
  </Card>
);

import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const CssModulesSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Maintainability', color: 'green' }}
      title="CSS Modules"
      description="A CSS file in which all class names are scoped locally by default."
    >
      <div className="space-y-8">
        <SubSection title="Scoped Styles" icon iconColor="green">
          <p className="text-sm text-gray-700 mb-4">
            CSS Modules generate unique class names for each file, preventing
            global namespace collision. Files typically end with{' '}
            <code>.module.css</code>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-semibold mb-2">Button.module.css</h4>
              <CodeBlock
                code={`.button {
  background: blue;
  color: white;
  padding: 10px 20px;
}

.icon {
  margin-right: 8px;
}`}
                language="css"
                className="text-xs"
              />
            </div>
            <div>
              <h4 className="text-xs font-semibold mb-2">Button.tsx</h4>
              <CodeBlock
                code={`import styles from './Button.module.css';

export function Button() {
  // Becomes something like: Button_button__3abc
  return (
    <button className={styles.button}>
      Click me
    </button>
  );
}`}
                language="tsx"
                className="text-xs"
              />
            </div>
          </div>
        </SubSection>

        <SubSection title="Benefits" icon iconColor="green">
          <InfoBox variant="green" title="Why CSS Modules?">
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                <strong>Local Scope:</strong> No more worry about breaking other
                pages when changing a class (e.g., <code>.container</code>).
              </li>
              <li>
                <strong>Reuse:</strong> Can compose styles from other files.
              </li>
              <li>
                <strong>Zero Learning Curve:</strong> It's just standard CSS
                syntax.
              </li>
            </ul>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};

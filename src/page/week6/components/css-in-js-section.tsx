import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const CssInJsSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Dynamic', color: 'pink' }}
      title="CSS-in-JS (Emotion / Styled-components)"
      description="Writing CSS styles directly within JavaScript files, enabling powerful dynamic styling."
    >
      <div className="space-y-8">
        <SubSection title="Emotion / Styled-components" icon iconColor="pink">
          <p className="text-sm text-gray-700 mb-4">
            Leverage tagged template literals to write CSS. This allows using
            JavaScript variables and logic directly in styles.
          </p>
          <CodeBlock
            code={`import styled from '@emotion/styled';

type ButtonProps = {
  primary?: boolean;
};

const Button = styled.button<ButtonProps>\`
  padding: 10px 20px;
  border-radius: 4px;
  /* Dynamic styling based on props */
  background: \${props => props.primary ? 'hotpink' : 'white'};
  color: \${props => props.primary ? 'white' : 'hotpink'};
  border: 2px solid hotpink;

  &:hover {
    opacity: 0.8;
  }
\`;

render(<Button primary>Primary Button</Button>);`}
            language="tsx"
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Pros & Cons" icon iconColor="pink">
          <InfoBox variant="red" title="Trade-offs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <strong>Pros:</strong>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Dynamic styling with JS props</li>
                  <li>Critical CSS automatic extraction</li>
                  <li>Component-level isolation</li>
                  <li>Theming support (ThemeProvider)</li>
                </ul>
              </div>
              <div>
                <strong>Cons:</strong>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>
                    <strong>Runtime Overhead:</strong> Library must parse styles
                    at runtime.
                  </li>
                  <li>Larger bundle size compared to utility classes.</li>
                  <li>Setup needed for SSR (Next.js App Router limitation).</li>
                </ul>
              </div>
            </div>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};

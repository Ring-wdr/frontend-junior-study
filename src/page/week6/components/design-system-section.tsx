import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const DesignSystemSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Foundation', color: 'blue' }}
      title="Design Systems & Design Tokens"
      description="The standardization of UI values (colors, spacing, typography) is the first step in scalable styling."
    >
      <div className="space-y-8">
        <SubSection title="What are Design Tokens?" icon iconColor="blue">
          <p className="text-sm text-gray-700 mb-4">
            Design tokens are the atomic parts of a design system: colors,
            spacing, typography, radii, etc. They replace hard-coded values with
            meaningful names, ensuring consistency across the product.
          </p>
          <CodeBlock
            code={`:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-text: #1f2937;
  
  /* Spacing */
  --space-sm: 0.5rem;
  --space-md: 1rem;
  
  /* Usage */
  --radius-default: 4px;
}`}
            language="css"
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Why use them?" icon iconColor="purple">
          <InfoBox variant="gray" title="Collaboration & Maintenance">
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                <strong>Consistency:</strong> Ensures the same 'blue' is used
                everywhere.
              </li>
              <li>
                <strong>Maintainability:</strong> Change one token value to
                update the entire app (e.g., Rebranding).
              </li>
              <li>
                <strong>Communication:</strong> Common language between
                designers and developers.
              </li>
            </ul>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};

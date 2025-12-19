import { InfoBox, SectionCard } from '../../../components';

export const ComponentPatternsSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Advanced Patterns', color: 'pink' }}
      title="Component Architecture Patterns"
      description="Advanced patterns for component composition and reusability."
    >
      <div className="space-y-6">
        <InfoBox variant="gray" title="Compound Components">
          <p className="text-sm text-gray-700 mb-2">
            Components that work together to form a complete UI, often sharing
            state implicitly (e.g., via Context API). Users can arrange the
            sub-components flexibly.
          </p>
          <div className="bg-gray-100 p-2 rounded font-mono text-xs">
            {`<Select>\n  <Select.Option value="1">Option 1</Select.Option>\n  <Select.Option value="2">Option 2</Select.Option>\n</Select>`}
          </div>
        </InfoBox>

        <InfoBox variant="gray" title="Render Props">
          <p className="text-sm text-gray-700 mb-2">
            A technique for sharing code between React components using a prop
            whose value is a function.
          </p>
          <div className="bg-gray-100 p-2 rounded font-mono text-xs">
            {`<DataProvider render={data => (\n  <h1>Hello {data.target}</h1>\n)}/>`}
          </div>
        </InfoBox>

        <InfoBox variant="gray" title="Higher-Order Components (HOC)">
          <p className="text-sm text-gray-700 mb-2">
            A function that takes a component and returns a new component,
            typically to inject props or logic. Popular in the past (e.g., Redux{' '}
            <code>connect</code>), but often replaced by Hooks today to avoid
            "Wrapper Hell".
          </p>
        </InfoBox>
      </div>
    </SectionCard>
  );
};

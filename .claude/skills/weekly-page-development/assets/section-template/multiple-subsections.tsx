import { SectionCard, InfoBox, DemoBox, SubSection, SectionDivider } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
// import { VisualizerA, VisualizerB, VisualizerC } from './visualizers';

/**
 * Template: Multiple Related Concepts Section
 *
 * Use this template when teaching several related concepts:
 * - Each concept gets a SubSection
 * - Visual separators between concepts
 * - Each subsection follows same structure (description, demo, code)
 */
export const MultipleSubsectionsSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Pattern Category', color: 'purple' }}
      title="Related Concepts"
      description="Learn about multiple related concepts in this category"
    >
      <div className="space-y-8">
        {/* Concept A */}
        <SubSection title="Concept A" icon iconColor="purple">
          <div className="grid grid-cols-1 gap-6">
            <p className="text-sm text-gray-700">
              Description of Concept A. Explain what it is, how it works, and why
              it matters. This should be a clear, concise overview.
            </p>

            <DemoBox>
              {/* <VisualizerA /> */}
              <div className="p-8 bg-white rounded border border-gray-200">
                <p className="text-center text-gray-500">Visualizer A</p>
              </div>
            </DemoBox>

            <CodeBlock
              code={`// Concept A implementation example
const conceptA = () => {
  // Your code here
};`}
              className="text-xs"
            />

            <InfoBox variant="purple" title="When to Use">
              Use Concept A when you need to... (explain typical use cases)
            </InfoBox>
          </div>
        </SubSection>

        <SectionDivider variant="line" />

        {/* Concept B */}
        <SubSection title="Concept B" icon iconColor="blue">
          <div className="grid grid-cols-1 gap-6">
            <p className="text-sm text-gray-700">
              Description of Concept B. Explain what it is, how it works, and how
              it differs from Concept A.
            </p>

            <DemoBox>
              {/* <VisualizerB /> */}
              <div className="p-8 bg-white rounded border border-gray-200">
                <p className="text-center text-gray-500">Visualizer B</p>
              </div>
            </DemoBox>

            <CodeBlock
              code={`// Concept B implementation example
const conceptB = () => {
  // Your code here
};`}
              className="text-xs"
            />

            <InfoBox variant="blue" title="When to Use">
              Use Concept B when you need to... (explain typical use cases)
            </InfoBox>
          </div>
        </SubSection>

        <SectionDivider variant="line" />

        {/* Concept C */}
        <SubSection title="Concept C" icon iconColor="pink">
          <div className="grid grid-cols-1 gap-6">
            <p className="text-sm text-gray-700">
              Description of Concept C. Explain what it is, how it works, and how
              it complements A and B.
            </p>

            <DemoBox>
              {/* <VisualizerC /> */}
              <div className="p-8 bg-white rounded border border-gray-200">
                <p className="text-center text-gray-500">Visualizer C</p>
              </div>
            </DemoBox>

            <CodeBlock
              code={`// Concept C implementation example
const conceptC = () => {
  // Your code here
};`}
              className="text-xs"
            />

            <InfoBox variant="pink" title="When to Use">
              Use Concept C when you need to... (explain typical use cases)
            </InfoBox>
          </div>
        </SubSection>

        {/* Summary */}
        <InfoBox variant="gray" title="Comparison Summary">
          <div className="space-y-2 text-sm">
            <p>
              <strong>Concept A:</strong> Best for situations X, Y. Strengths: A1,
              A2.
            </p>
            <p>
              <strong>Concept B:</strong> Best for situations Z. Strengths: B1,
              B2.
            </p>
            <p>
              <strong>Concept C:</strong> Advanced option. Strengths: C1, C2.
            </p>
          </div>
        </InfoBox>
      </div>
    </SectionCard>
  );
};

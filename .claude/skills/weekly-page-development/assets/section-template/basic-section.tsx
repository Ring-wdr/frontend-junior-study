import { DemoBox, InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
// import { YourVisualizer } from './your-visualizer';

/**
 * Template: Basic Single Concept Section
 *
 * Use this template when teaching a single concept with:
 * - Brief introduction
 * - Interactive visualization
 * - Key takeaways
 * - Code example
 */
export const BasicSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Concept Category', color: 'blue' }}
      title="Concept Name"
      description="Brief description of what this concept is and why it matters"
    >
      <div className="space-y-8">
        {/* Introduction */}
        <p className="text-sm text-gray-700">
          Start with a clear explanation of the concept. This paragraph should
          answer: What is this? Why is it important? What problem does it solve?
          Keep it concise and accessible to someone new to the topic.
        </p>

        {/* Interactive Demonstration */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Live Example</h4>
          <DemoBox>
            {/* <YourVisualizer /> */}
            <div className="p-8 bg-white rounded-lg border border-gray-200">
              <p className="text-center text-gray-500">
                Replace with your visualizer component
              </p>
            </div>
          </DemoBox>
        </div>

        {/* Key Takeaways */}
        <InfoBox variant="blue" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-1 text-sm text-blue-800">
            <li>
              <strong>Point 1:</strong> Explain the first key concept or rule
            </li>
            <li>
              <strong>Point 2:</strong> Explain the second key concept or rule
            </li>
            <li>
              <strong>Point 3:</strong> Explain the third key concept or rule
            </li>
          </ul>
        </InfoBox>

        {/* Code Example */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">
            Implementation Example
          </h4>
          <CodeBlock
            code={`// Example code showing how to use this concept
const example = () => {
  // Step 1: Initialize
  const instance = new Concept();

  // Step 2: Configure
  instance.setup();

  // Step 3: Execute
  instance.run();
};`}
            className="text-xs"
          />
        </div>
      </div>
    </SectionCard>
  );
};

import { SectionCard, InfoBox, DemoBox } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
// import { ComparisionVisualizer } from './comparison-visualizer';

/**
 * Template: Comparison Section
 *
 * Use this template when comparing different approaches:
 * - Side-by-side code examples
 * - Pros/cons of each approach
 * - Visual comparison
 * - When to use each
 */
export const ComparisonSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Comparison', color: 'green' }}
      title="Approaches Compared"
      description="Compare different solutions to the same problem"
    >
      <div className="space-y-8">
        {/* Overview */}
        <p className="text-sm text-gray-700">
          This section compares different approaches to solving [the problem]. Each
          approach has different trade-offs. Understanding when to use each is
          important for choosing the right tool for your situation.
        </p>

        {/* Visual Comparison */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Visual Comparison</h4>
          <DemoBox>
            {/* <ComparisonVisualizer /> */}
            <div className="p-8 bg-white rounded border border-gray-200">
              <p className="text-center text-gray-500">
                Comparison visualizer
              </p>
            </div>
          </DemoBox>
        </div>

        {/* Side-by-Side Code Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900">Approach A</h5>
            <p className="text-sm text-gray-700">
              Brief description of Approach A. When you might choose this approach
              and its main characteristics.
            </p>
            <CodeBlock
              code={`// Approach A: Description
const approachA = () => {
  // Simple, straightforward
  const data = fetch('/api/data');
  return processData(data);
};`}
              className="text-xs"
            />
          </div>

          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900">Approach B</h5>
            <p className="text-sm text-gray-700">
              Brief description of Approach B. When you might choose this approach
              and its main characteristics.
            </p>
            <CodeBlock
              code={`// Approach B: Description
const approachB = async () => {
  // More advanced, better performance
  const data = await cacheManager.get('/api/data');
  return processDataAsync(data);
};`}
              className="text-xs"
            />
          </div>
        </div>

        {/* Approach C (Optional) */}
        <div className="space-y-3">
          <h5 className="font-semibold text-gray-900">Approach C</h5>
          <div className="grid grid-cols-1 gap-6">
            <p className="text-sm text-gray-700">
              Brief description of Approach C. Advanced approach with specific use
              cases.
            </p>
            <CodeBlock
              code={`// Approach C: Description
const approachC = () => {
  // Most flexible, most complex
  return new DataManager()
    .cache()
    .validate()
    .transform()
    .execute();
};`}
              className="text-xs"
            />
          </div>
        </div>

        {/* Detailed Comparison */}
        <InfoBox variant="blue" title="Detailed Comparison">
          <div className="space-y-3 text-sm text-blue-800">
            <div>
              <strong className="block mb-1">Approach A</strong>
              <p className="mb-2">
                <strong>Pros:</strong> Simple, easy to understand, good for
                learning
              </p>
              <p>
                <strong>Cons:</strong> Inefficient with large datasets, no
                caching
              </p>
            </div>

            <div className="border-t border-blue-200 pt-3">
              <strong className="block mb-1">Approach B</strong>
              <p className="mb-2">
                <strong>Pros:</strong> Better performance, caching support, async
              </p>
              <p>
                <strong>Cons:</strong> More complex, harder to debug, larger
                bundle size
              </p>
            </div>

            <div className="border-t border-blue-200 pt-3">
              <strong className="block mb-1">Approach C</strong>
              <p className="mb-2">
                <strong>Pros:</strong> Maximum flexibility, extensive features,
                highly optimized
              </p>
              <p>
                <strong>Cons:</strong> Steep learning curve, overkill for simple
                cases
              </p>
            </div>
          </div>
        </InfoBox>

        {/* Decision Guide */}
        <InfoBox variant="green" title="When to Use Each">
          <ul className="list-disc pl-5 space-y-2 text-sm text-green-800">
            <li>
              <strong>Use Approach A</strong> when learning the concept,
              prototyping, or building simple features
            </li>
            <li>
              <strong>Use Approach B</strong> when you need better performance and
              caching, in production applications
            </li>
            <li>
              <strong>Use Approach C</strong> when building complex systems with
              many requirements, or leading a team
            </li>
          </ul>
        </InfoBox>

        {/* Performance Metrics */}
        <InfoBox variant="orange" title="Performance Considerations">
          <div className="space-y-2 text-sm text-orange-800">
            <p>
              <strong>Speed:</strong> Approach A: ~2ms | Approach B: ~0.5ms |
              Approach C: ~0.2ms
            </p>
            <p>
              <strong>Memory:</strong> Approach A: ~10MB | Approach B: ~15MB |
              Approach C: ~20MB
            </p>
            <p>
              <strong>Bundle Size:</strong> Approach A: 5KB | Approach B: 12KB |
              Approach C: 25KB
            </p>
          </div>
        </InfoBox>
      </div>
    </SectionCard>
  );
};

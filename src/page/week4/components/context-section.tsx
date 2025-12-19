import { InfoBox, SectionCard } from '../../../components';
import { ContextVisualizer } from './context-visualizer';

export const ContextSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Built-in', color: 'teal' }}
      title="Context API"
      description="React's built-in solution for avoiding prop-drilling."
    >
      <div className="space-y-6">
        <ContextVisualizer />

        <InfoBox variant="blue" title="When to use Context">
          <p className="text-sm text-gray-700">
            Ideal for low-frequency updates like global theme, language
            settings, or user authentication status.
          </p>
        </InfoBox>

        <InfoBox variant="red" title="Limitations">
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li>
              <strong>Performance:</strong> Updating a Context value causes all
              consumers to re-render. Not suitable for rapidly changing data
              without careful optimization (splitting contexts, memoization).
            </li>
            <li>
              <strong>Complexity:</strong> "Provider Hell" can occur if you have
              too many separate providers wrapping your app.
            </li>
          </ul>
        </InfoBox>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            Comparison Rule of Thumb
          </h4>
          <p className="text-sm text-gray-600 italic">
            "If the state is simple and doesn't update often, use Context. If
            you need complex caching, async handling, or frequent updates, reach
            for Redux, Zustand, or Recoil."
          </p>
        </div>
      </div>
    </SectionCard>
  );
};

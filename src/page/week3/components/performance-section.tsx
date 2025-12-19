import { InfoBox, SectionCard } from '../../../components';

export const PerformanceSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Optimization', color: 'green' }}
      title="Performance Patterns"
      description="Techniques to optimize rendering and application performance."
    >
      <div className="space-y-6">
        <InfoBox variant="gray" title="Memoization">
          <p className="text-sm text-gray-700 mb-2">
            Caching the result of an expensive function call and returning the
            cached result when the inputs occur again.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>
              <code>React.memo</code>: HOC to skip re-rendering a component if
              its props haven't changed.
            </li>
            <li>
              <code>useMemo</code>: Hook to memoize a computed value.
            </li>
            <li>
              <code>useCallback</code>: Hook to memoize a callback function
              definition.
            </li>
          </ul>
        </InfoBox>

        <InfoBox variant="gray" title="Virtualization (Windowing)">
          <p className="text-sm text-gray-700">
            Rendering only the items in a list that are currently visible (plus
            a small buffer) instead of the entire list. This significantly
            improves performance for large datasets. Libraries like{' '}
            <code>react-window</code> or <code>react-virtualized</code> are
            commonly used.
          </p>
        </InfoBox>
      </div>
    </SectionCard>
  );
};

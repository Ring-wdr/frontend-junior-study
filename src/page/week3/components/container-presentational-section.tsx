import { InfoBox, SectionCard } from '../../../components';

export const ContainerPresentationalSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Design Pattern', color: 'indigo' }}
      title="Container vs Presentational"
      description="A pattern for separating business logic/data fetching from UI rendering."
    >
      <div className="space-y-6">
        <InfoBox variant="gray" title="Core Concept">
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <strong>Presentational Components:</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>
                  Concerned with how things <em>look</em>.
                </li>
                <li>Receive data and callbacks via props.</li>
                <li>Rarely have their own state (except for UI state).</li>
                <li>Often written as functional components.</li>
              </ul>
            </div>
            <div>
              <strong>Container Components:</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>
                  Concerned with how things <em>work</em>.
                </li>
                <li>
                  Provide data and behavior to presentational or other container
                  components.
                </li>
                <li>Often stateful, serving as data sources.</li>
              </ul>
            </div>
          </div>
        </InfoBox>

        <InfoBox variant="orange" title="Evolution with Hooks">
          <p className="text-sm text-gray-700">
            In modern React, this pattern involves <strong>Custom Hooks</strong>
            . Instead of wrapping a component in a Container, we can extract the
            business logic into a hook (e.g., <code>useDogImages</code>) and use
            it directly within the component. This achieves the same separation
            of concerns with less nesting.
          </p>
        </InfoBox>
      </div>
    </SectionCard>
  );
};

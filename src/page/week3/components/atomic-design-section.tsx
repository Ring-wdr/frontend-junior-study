import { InfoBox, SectionCard } from '../../../components';

export const AtomicDesignSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Front-end Architecture', color: 'purple' }}
      title="Atomic Design"
      description="A methodology for creating design systems by breaking them down into five distinct levels."
    >
      <div className="space-y-6">
        <InfoBox variant="blue" title="What is Atomic Design?">
          <p className="text-sm text-gray-700">
            Atomic Design is a methodology composed of five distinct stages
            working together to create interface design systems in a more
            deliberate and hierarchical manner.
          </p>
        </InfoBox>

        <InfoBox variant="gray" title="The Five Levels">
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li>
              <strong>Atoms:</strong> The basic building blocks of matter (e.g.,
              Buttons, Inputs, Labels).
            </li>
            <li>
              <strong>Molecules:</strong> Groups of atoms bonded together to be
              the smallest fundamental units of the compound (e.g., Search Form
              combining Input and Button).
            </li>
            <li>
              <strong>Organisms:</strong> Groups of molecules joined together to
              form a relatively complex, distinct section of an interface (e.g.,
              Header).
            </li>
            <li>
              <strong>Templates:</strong> Page-level objects that place
              components into a layout and articulate the design's underlying
              content structure.
            </li>
            <li>
              <strong>Pages:</strong> Specific instances of templates that show
              what a UI looks like with real representative content in place.
            </li>
          </ul>
        </InfoBox>
      </div>
    </SectionCard>
  );
};

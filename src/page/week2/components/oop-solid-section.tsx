import { InfoBox, SectionCard } from '../../../components';

export const OopSolidSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Object-Oriented Programming', color: 'blue' }}
      title="OOP & SOLID Principles"
      description="Core concepts of Object-Oriented Programming and design principles."
    >
      <div className="space-y-6">
        <InfoBox variant="gray" title="Core Concepts">
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>
              <strong>Encapsulation:</strong> Bundling data and methods that
              work on that data within one unit.
            </li>
            <li>
              <strong>Inheritance:</strong> Mechanism where a new class derives
              properties and characteristics from an existing class.
            </li>
            <li>
              <strong>Polymorphism:</strong> The ability of different classes to
              respond to function calls with the same name in a way specific to
              each class.
            </li>
          </ul>
        </InfoBox>

        <InfoBox variant="gray" title="SOLID Principles">
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <strong className="text-blue-700">S</strong>ingle Responsibility
              Principle: A class should have one and only one reason to change.
            </li>
            <li>
              <strong className="text-blue-700">O</strong>pen-Closed Principle:
              Objects or entities should be open for extension but closed for
              modification.
            </li>
            <li>
              <strong className="text-blue-700">L</strong>iskov Substitution
              Principle: Objects of a superclass shall be replaceable with
              objects of its subclasses.
            </li>
            <li>
              <strong className="text-blue-700">I</strong>nterface Segregation
              Principle: A client should never be forced to implement an
              interface that it doesn't use.
            </li>
            <li>
              <strong className="text-blue-700">D</strong>ependency Inversion
              Principle: Depend on abstractions, not on concretions.
            </li>
          </ul>
        </InfoBox>
      </div>
    </SectionCard>
  );
};

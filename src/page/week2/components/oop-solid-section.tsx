import { Badge } from '../../../components/ui/badge';
import { Card } from '../../../components/ui/card';

export const OopSolidSection = () => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            Object-Oriented Programming
          </Badge>
          <h3 className="text-xl font-bold mt-2 text-gray-900">
            OOP & SOLID Principles
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Core concepts of Object-Oriented Programming and design principles.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Core Concepts</h4>
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
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">SOLID Principles</h4>
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
        </div>
      </div>
    </Card>
  );
};

import { Badge } from '../../../components/ui/badge';
import { Card } from '../../../components/ui/card';

export const FpIntroductionSection = () => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
            Functional Programming
          </Badge>
          <h3 className="text-xl font-bold mt-2 text-gray-900">
            Introduction to FP
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Programming paradigm where programs are constructed by applying and
            composing functions.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
          <h4 className="font-semibold text-orange-900 mb-2">Core Concepts</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-orange-800">
            <li>
              <strong>Pure Functions:</strong> Given the same input, always
              return the same output and has no side effects.
            </li>
            <li>
              <strong>Immutability:</strong> Data is never modified; instead, a
              new copy with changes is created.
            </li>
            <li>
              <strong>Higher-Order Functions:</strong> Functions that take other
              functions as arguments or return them.
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">Currying</h4>
            <p className="text-sm text-gray-700">
              Translating a function that takes multiple arguments into a
              sequence of functions each taking a single argument.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">Monads</h4>
            <p className="text-sm text-gray-700">
              A design pattern used to describe computations as a series of
              steps. (Think of it as a container with map/flatMap).
            </p>
          </div>
        </div>

        <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg italic">
          "Object-Oriented Programming makes code understandable by
          encapsulating moving parts. Functional Programming makes code
          understandable by minimizing moving parts." — Michael Feathers
        </div>
      </div>
    </Card>
  );
};

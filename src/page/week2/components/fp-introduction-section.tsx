import { Badge } from '../../../components/ui/badge';
import { Card } from '../../../components/ui/card';
import { CurryingVisualizer } from './currying-visualizer';
import { ImmutabilityVisualizer } from './immutability-visualizer';
import { MonadVisualizer } from './monad-visualizer';

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

      <div className="space-y-8">
        <section>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            Immutability
          </h4>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <p className="text-sm text-gray-700 mb-4">
                Data is never modified; instead, a new copy with changes is
                created. This leads to predictable state changes (Redux style).
              </p>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                  Interactive Demo
                </div>
                <ImmutabilityVisualizer />
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <h4 className="font-semibold text-orange-900 mb-2">
                  Core Concepts
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-orange-800">
                  <li>
                    <strong>Pure Functions:</strong> Given the same input,
                    always return the same output and has no side effects.
                  </li>
                  <li>
                    <strong>Immutability:</strong> Avoid shared mutable state.
                  </li>
                  <li>
                    <strong>Higher-Order Functions:</strong> Functions that take
                    others as args.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-gray-100" />

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Currying
            </h4>
            <p className="text-xs text-gray-600 mb-4">
              Function taking multiple args to Sequence of functions.
            </p>
            <CurryingVisualizer />
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Monads (Maybe)
            </h4>
            <p className="text-xs text-gray-600 mb-4">
              Safe chainable computations (Handling Nulls).
            </p>
            <MonadVisualizer />
          </div>
        </div>
      </div>
    </Card>
  );
};

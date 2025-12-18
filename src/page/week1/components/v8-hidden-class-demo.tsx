import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Play } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../../lib/utils';

interface ObjectShape {
  id: string;
  properties: string[];
  hiddenClass: string;
  color: string;
}

export const V8HiddenClassDemo = () => {
  const [objects, setObjects] = useState<ObjectShape[]>([]);
  const [mode, setMode] = useState<'good' | 'bad'>('good');

  const createGoodObjects = () => {
    setObjects([
      {
        id: 'obj1',
        properties: ['x', 'y'],
        hiddenClass: 'HC1',
        color: 'green',
      },
      {
        id: 'obj2',
        properties: ['x', 'y'],
        hiddenClass: 'HC1',
        color: 'green',
      },
      {
        id: 'obj3',
        properties: ['x', 'y'],
        hiddenClass: 'HC1',
        color: 'green',
      },
    ]);
  };

  const createBadObjects = () => {
    setObjects([
      {
        id: 'obj1',
        properties: ['x', 'y'],
        hiddenClass: 'HC1',
        color: 'red',
      },
      {
        id: 'obj2',
        properties: ['y', 'x'],
        hiddenClass: 'HC2',
        color: 'red',
      },
      {
        id: 'obj3',
        properties: ['x'],
        hiddenClass: 'HC3',
        color: 'orange',
      },
    ]);
  };

  const reset = () => {
    setObjects([]);
  };

  const sharedHiddenClass = objects.every((obj) => obj.hiddenClass === 'HC1');

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            setMode('good');
            createGoodObjects();
          }}
          data-testid="v8-good-pattern"
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all',
            mode === 'good'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          )}
        >
          <CheckCircle className="w-4 h-4" />
          Good Pattern
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('bad');
            createBadObjects();
          }}
          data-testid="v8-bad-pattern"
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all',
            mode === 'bad'
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          )}
        >
          <AlertCircle className="w-4 h-4" />
          Bad Pattern
        </button>
        <button
          type="button"
          onClick={reset}
          data-testid="v8-reset"
          className="px-4 py-2 bg-gray-500 text-white rounded-lg font-medium text-sm hover:bg-gray-600 transition-all"
        >
          Reset
        </button>
      </div>

      {mode === 'good' && (
        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Monomorphic (Optimized)
          </h4>
          <p className="text-sm text-green-800">
            All objects share the same hidden class. V8 can optimize property
            access.
          </p>
          <pre className="mt-2 text-xs bg-green-900 text-green-100 p-2 rounded">
            {`class Point {
  constructor(x, y) {
    this.x = x; // Always same order
    this.y = y;
  }
}`}
          </pre>
        </div>
      )}

      {mode === 'bad' && (
        <div className="bg-red-50 p-4 rounded-xl border border-red-200">
          <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Polymorphic (Slow)
          </h4>
          <p className="text-sm text-red-800">
            Different property orders create different hidden classes. V8 cannot
            optimize.
          </p>
          <pre className="mt-2 text-xs bg-red-900 text-red-100 p-2 rounded">
            {`const p1 = { x: 1, y: 2 };
const p2 = { y: 2, x: 1 }; // Different order!
const p3 = { x: 1 }; // Missing property!`}
          </pre>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnimatePresence>
          {objects.map((obj, idx) => (
            <motion.div
              key={obj.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                'p-4 rounded-xl border-2',
                obj.color === 'green' && 'bg-green-50 border-green-300',
                obj.color === 'red' && 'bg-red-50 border-red-300',
                obj.color === 'orange' && 'bg-orange-50 border-orange-300',
              )}
            >
              <div className="font-mono text-xs font-bold mb-2">{obj.id}</div>
              <div className="space-y-1">
                {obj.properties.map((prop) => (
                  <div
                    key={prop}
                    className="bg-white px-2 py-1 rounded text-xs font-mono"
                  >
                    {prop}: ...
                  </div>
                ))}
              </div>
              <div
                className={cn(
                  'mt-3 px-2 py-1 rounded text-xs font-bold text-center',
                  obj.color === 'green' && 'bg-green-200 text-green-900',
                  obj.color === 'red' && 'bg-red-200 text-red-900',
                  obj.color === 'orange' && 'bg-orange-200 text-orange-900',
                )}
              >
                {obj.hiddenClass}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {objects.length > 0 && (
        <div
          className={cn(
            'p-4 rounded-xl border-2 text-center font-semibold',
            sharedHiddenClass
              ? 'bg-green-50 border-green-300 text-green-900'
              : 'bg-red-50 border-red-300 text-red-900',
          )}
        >
          {sharedHiddenClass
            ? '✓ All objects share the same Hidden Class (Fast!)'
            : '✗ Different Hidden Classes (Slow!)'}
        </div>
      )}
    </div>
  );
};

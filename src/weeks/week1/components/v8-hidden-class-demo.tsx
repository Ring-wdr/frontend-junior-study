'use client';

import { AlertCircle, CheckCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

const TRANSITION_TREE = [
  [
    { id: 'HC0', shape: '{}', via: null },
    { id: 'HC1', shape: '{ x }', via: '+x' },
    { id: 'HC2', shape: '{ x, y }', via: '+y' },
  ],
  [
    { id: 'HC0', shape: '{}', via: null },
    { id: 'HC3', shape: '{ y }', via: '+y' },
    { id: 'HC4', shape: '{ y, x }', via: '+x' },
  ],
];

interface ObjectShape {
  id: string;
  properties: string[];
  hiddenClass: string;
  color: string;
}

export const V8HiddenClassDemo = () => {
  const { t } = useTranslation('week1');
  const [objects, setObjects] = useState<ObjectShape[]>([]);
  const [mode, setMode] = useState<'good' | 'bad'>('good');

  const createGoodObjects = () => {
    setObjects([
      {
        id: 'obj1',
        properties: ['x', 'y'],
        hiddenClass: 'HC2',
        color: 'green',
      },
      {
        id: 'obj2',
        properties: ['x', 'y'],
        hiddenClass: 'HC2',
        color: 'green',
      },
      {
        id: 'obj3',
        properties: ['x', 'y'],
        hiddenClass: 'HC2',
        color: 'green',
      },
    ]);
  };

  const createBadObjects = () => {
    setObjects([
      {
        id: 'obj1',
        properties: ['x', 'y'],
        hiddenClass: 'HC2',
        color: 'red',
      },
      {
        id: 'obj2',
        properties: ['y', 'x'],
        hiddenClass: 'HC4',
        color: 'red',
      },
      {
        id: 'obj3',
        properties: ['x'],
        hiddenClass: 'HC1',
        color: 'orange',
      },
    ]);
  };

  const reset = () => {
    setObjects([]);
  };

  const sharedHiddenClass = objects.every(
    (obj) => obj.hiddenClass === objects[0].hiddenClass,
  );
  const usedClasses = new Set(objects.map((obj) => obj.hiddenClass));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
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
          {t('optimization.demo.goodPattern')}
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
          {t('optimization.demo.badPattern')}
        </button>
        <button
          type="button"
          onClick={reset}
          data-testid="v8-reset"
          className="px-4 py-2 bg-gray-500 text-white rounded-lg font-medium text-sm hover:bg-gray-600 transition-all"
        >
          {t('optimization.demo.reset')}
        </button>
      </div>

      {mode === 'good' && (
        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {t('optimization.demo.monomorphic.title')}
          </h4>
          <p className="text-sm text-green-800">
            {t('optimization.demo.monomorphic.description')}
          </p>
          <CodeBlock
            code={`class Point {
  constructor(x, y) {
    this.x = x; // Always same order
    this.y = y;
  }
}`}
            className="mt-2 text-xs"
          />
        </div>
      )}

      {mode === 'bad' && (
        <div className="bg-red-50 p-4 rounded-xl border border-red-200">
          <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {t('optimization.demo.polymorphic.title')}
          </h4>
          <p className="text-sm text-red-800">
            {t('optimization.demo.polymorphic.description')}
          </p>
          <CodeBlock
            code={`const p1 = { x: 1, y: 2 };
const p2 = { y: 2, x: 1 }; // Different order!
const p3 = { x: 1 }; // Missing property!`}
            className="mt-2 text-xs"
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <AnimatePresence mode="popLayout">
          {objects.map((obj, idx) => (
            <motion.div
              key={obj.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
              className={cn(
                'p-3 rounded-xl border-2',
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

      <div className="rounded-xl border border-gray-200 bg-white p-3">
        <div className="mb-2 text-xs font-semibold text-gray-500">
          {t('optimization.demo.tree')}
        </div>
        <div className="space-y-2">
          {TRANSITION_TREE.map((branch) => (
            <ol
              key={branch[2].id}
              className="flex flex-wrap items-center gap-1.5 font-mono text-xs"
            >
              {branch.map((node) => (
                <li key={node.id} className="flex items-center gap-1.5">
                  {node.via && (
                    <span className="text-gray-500">— {node.via} →</span>
                  )}
                  <span
                    data-testid={`v8-tree-${branch[2].id}-${node.id}`}
                    data-used={usedClasses.has(node.id)}
                    className={cn(
                      'rounded-lg border-2 px-2 py-1 transition-colors',
                      usedClasses.has(node.id)
                        ? 'border-blue-600 bg-blue-50 font-bold text-blue-900'
                        : 'border-gray-200 bg-gray-50 text-gray-600',
                    )}
                  >
                    {node.id} {node.shape}
                  </span>
                </li>
              ))}
            </ol>
          ))}
        </div>
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
            ? t('optimization.demo.shared')
            : t('optimization.demo.different')}
        </div>
      )}
    </div>
  );
};

import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { InfoBox, SectionCard } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';
import { GcDemo } from './gc-demo';
import { MapObjectComparison } from './map-object-comparison';

export const AdvancedDataStructureSection = () => {
  const [activeTab, setActiveTab] = useState<'map' | 'set' | 'weak'>('map');

  return (
    <SectionCard
      badge={{ label: 'Data Structures', color: 'pink' }}
      title="Advanced Data Structures"
      description="Map, Set, WeakMap, WeakSet, and WeakRef."
      testId="advanced-data-structure-section"
    >

      <div className="flex space-x-2 mb-6 border-b border-gray-100 pb-2">
        {(['map', 'set', 'weak'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize',
              activeTab === tab
                ? 'bg-pink-100/50 text-pink-700'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50',
            )}
          >
            {tab === 'weak' ? 'WeakMap/Ref' : tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'map' && (
          <motion.div
            key="map"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4 text-left"
          >
            <InfoBox variant="blue" className="bg-pink-50 border-pink-100">
              <h4 className="font-bold text-pink-900 mb-2 flex items-center gap-2">
                <Search className="w-4 h-4" /> Map vs Object
              </h4>
              <ul className="list-disc list-inside text-sm text-pink-800 space-y-1">
                <li>
                  Keys can be <strong>any type</strong> (objects, functions,
                  primitives).
                </li>
                <li>Maintains insertion order.</li>
                <li>Size property is built-in.</li>
                <li>Better performance for frequent additions/removals.</li>
              </ul>
            </InfoBox>
            <div className="mt-6">
              <MapObjectComparison />
            </div>
          </motion.div>
        )}

        {activeTab === 'set' && (
          <motion.div
            key="set"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4 text-left"
          >
            <InfoBox variant="purple" className="bg-purple-50 border-purple-100">
              <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                <Plus className="w-4 h-4" /> Set (Unique Collection)
              </h4>
              <p className="text-sm text-purple-800 mb-2">
                Stores unique values of any type. Useful for removing duplicates.
              </p>
            </InfoBox>
            <CodeBlock
              language="javascript"
              code={`const set = new Set([1, 2, 2, 3]);

console.log(set.size); // 3 (duplicates removed)
console.log(set.has(2)); // true

set.add(4);
set.delete(1);`}
            />
          </motion.div>
        )}

        {activeTab === 'weak' && (
          <motion.div
            key="weak"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4 text-left"
          >
            <InfoBox variant="orange" className="bg-orange-50 border-orange-100">
              <h4 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                <Trash2 className="w-4 h-4" /> Weak References (GC Friendly)
              </h4>
              <p className="text-sm text-orange-800 mb-2">
                <strong>WeakMap/WeakSet:</strong> Keys must be objects. They are
                held "weakly", meaning if there are no other references to the
                object, it can be garbage collected. Not iterable.
              </p>
              <p className="text-sm text-orange-800 mt-2 border-t border-orange-200 pt-2">
                <strong>WeakRef (ES2021):</strong> advanced feature to hold a weak
                reference to an object.
              </p>
            </InfoBox>

            <div className="mt-8">
              <h5 className="font-bold text-gray-800 mb-4 px-2 border-l-4 border-orange-400">
                Garbage Collection Visualizer
              </h5>
              <GcDemo />
            </div>

            <CodeBlock
              language="javascript"
              code={`let user = { name: 'John' };
const weakMap = new WeakMap();

weakMap.set(user, 'metadata');

user = null; 
// The user object (and the map entry) 
// can now be garbage collected.`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </SectionCard>
  );
};

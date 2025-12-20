import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Plus } from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/ui/code-block';

type Entry = {
  keyDisplay: string;
  value: string;
  isCollision?: boolean;
};

export const MapObjectComparison = () => {
  const [objEntries, setObjEntries] = useState<Entry[]>([]);
  const [mapEntries, setMapEntries] = useState<Entry[]>([]);
  const [step, setStep] = useState(0);

  const addEntry = () => {
    const nextId = step + 1;
    const keyName = `keyObj${nextId}`;
    const value = `Value ${nextId}`;

    // Simulate Object behavior
    // Object keys are stringified. {} -> "[object Object]"
    // So every new object key overwrites the previous one if they all stringify to same thing
    setObjEntries([
      {
        keyDisplay: '"[object Object]"',
        value: value,
        isCollision: step > 0, // Collision if not the first one
      },
    ]);

    // Simulate Map behavior
    // Map keeps keys distinct
    setMapEntries((prev) => [
      ...prev,
      { keyDisplay: keyName, value: value, isCollision: false },
    ]);

    setStep(nextId);
  };

  const reset = () => {
    setObjEntries([]);
    setMapEntries([]);
    setStep(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="text-sm text-gray-600">
          <span className="font-bold text-gray-900">Scenario:</span> Adding
          distinct object keys <code>{`{id:1}`}</code>, <code>{`{id:2}`}</code>
          ...
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={addEntry}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Key
          </button>
          <button
            type="button"
            onClick={reset}
            className="text-gray-500 hover:text-gray-900 px-3 py-1.5 text-sm font-medium"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Object Side */}
        <div className="border-2 border-dashed border-red-200 bg-red-50/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <h4 className="font-bold text-red-900">Plain Object</h4>
            <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded-full">
              String Keys Only
            </span>
          </div>

          <div className="space-y-2 min-h-[120px]">
            <AnimatePresence mode="popLayout">
              {objEntries.length === 0 && (
                <div className="text-sm text-gray-400 italic text-center py-8">
                  Empty Object
                </div>
              )}
              {objEntries.map((entry) => (
                <motion.div
                  key={step} // Force re-render on step to animate collision
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-red-200 p-2 rounded shadow-sm flex items-center justify-between"
                >
                  <code className="text-xs text-red-600 font-bold">
                    {entry.keyDisplay}:
                  </code>
                  <span className="text-sm text-gray-700">{entry.value}</span>
                  {entry.isCollision && (
                    <div className="flex items-center gap-1 text-xs text-red-600 font-bold animate-pulse">
                      <AlertTriangle className="w-3 h-3" /> Overwritten!
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="mt-4 text-xs text-red-700">
            <strong>Issue:</strong> Objects stringify keys. <br />
            <code>{`{id:1}.toString()`}</code> is <code>"[object Object]"</code>
            .
          </div>
        </div>

        {/* Map Side */}
        <div className="border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <h4 className="font-bold text-blue-900">Map</h4>
            <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">
              Any Key Type
            </span>
          </div>

          <div className="space-y-2 min-h-[120px]">
            <AnimatePresence initial={false}>
              {mapEntries.length === 0 && (
                <div className="text-sm text-gray-400 italic text-center py-8">
                  Empty Map
                </div>
              )}
              {mapEntries.map((entry) => (
                <motion.div
                  key={entry.keyDisplay}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white border border-blue-200 p-2 rounded shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-blue-100 text-blue-700 px-1 rounded border border-blue-200">
                      {entry.keyDisplay}
                    </code>
                    <span className="text-xs text-gray-400">→</span>
                  </div>
                  <span className="text-sm text-gray-700">{entry.value}</span>
                  <CheckCircle className="w-3 h-3 text-green-500" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="mt-4 text-xs text-blue-700">
            <strong>Solved:</strong> Map keeps object references distinct.
            <br />
            <code>keyObj1 !== keyObj2</code>
          </div>
        </div>
      </div>

      <CodeBlock
        language="javascript"
        code={`const obj = {};
const map = new Map();

// Adding two different objects
const key1 = {id: 1};
const key2 = {id: 2};

// Object behavior:
obj[key1] = "Value 1"; 
obj[key2] = "Value 2"; 
console.log(obj); 
// { "[object Object]": "Value 2" } (Collision!)

// Map behavior:
map.set(key1, "Value 1");
map.set(key2, "Value 2");
console.log(map.size); // 2 (Distinct keys)`}
      />
    </div>
  );
};

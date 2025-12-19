import { AnimatePresence, motion } from 'framer-motion';
import { Box, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../../lib/utils';

export const SingletonVisualizer = () => {
  const [instanceId, setInstanceId] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const getInstance = () => {
    if (!instanceId) {
      const newId = Math.random().toString(36).substring(7).toUpperCase();
      setInstanceId(newId);
      setLog((prev) => [...prev, `Created new instance: ${newId}`]);
    } else {
      setLog((prev) => [...prev, `Returning existing instance: ${instanceId}`]);
      setFlash(true);
      setTimeout(() => setFlash(false), 500);
    }
  };

  const reset = () => {
    setInstanceId(null);
    setLog([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-start">
        <div className="flex-1 space-y-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={getInstance}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <Box className="w-4 h-4" />
              Get Instance
            </button>
            <button
              type="button"
              onClick={reset}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          <div className="h-32 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center relative overflow-hidden">
            <AnimatePresence>
              {instanceId && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{
                    scale: flash ? 1.2 : 1,
                    rotate: 0,
                    borderColor: flash ? '#9333ea' : '#e5e7eb', // purple-600 vs gray-200
                  }}
                  exit={{ scale: 0, rotate: 180 }}
                  className={cn(
                    'w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center border-4 transition-colors duration-300',
                    flash
                      ? 'border-purple-500 shadow-purple-200'
                      : 'border-gray-200',
                  )}
                >
                  <Box className="w-8 h-8 text-purple-600" />
                </motion.div>
              )}
            </AnimatePresence>
            {instanceId && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-2 text-xs font-mono text-gray-500"
              >
                ID: {instanceId}
              </motion.div>
            )}
          </div>
        </div>

        <div className="flex-1 h-48 bg-gray-900 rounded-xl p-3 overflow-y-auto font-mono text-xs text-green-400 border border-gray-800">
          <div className="mb-2 text-gray-500 border-b border-gray-800 pb-1">
            Console Log
          </div>
          {log.map((entry, i) => (
            <div key={`${i}-${entry}`} className="mb-1">
              <span className="text-gray-500 mr-2">{'>'}</span>
              {entry}
            </div>
          ))}
          {log.length === 0 && (
            <span className="text-gray-600 italic">No activity yet...</span>
          )}
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-2">
        Notice how the ID remains the same regardless of how many times you
        request the instance.
      </div>
    </div>
  );
};

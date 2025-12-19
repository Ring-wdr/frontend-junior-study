import { motion } from 'framer-motion';
import { Clock, Zap } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../../lib/utils';

export const MiddlewareVisualizer = () => {
  const [log, setLog] = useState<
    { id: number; msg: string; type: 'sync' | 'async' }[]
  >([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addLog = (msg: string, type: 'sync' | 'async') => {
    setLog((prev) => [{ id: Date.now(), msg, type }, ...prev].slice(0, 5));
  };

  const handleSyncDispatch = () => {
    setIsProcessing(true);
    addLog('Dispatch: INCREMENT (Sync)', 'sync');
    setTimeout(() => {
      addLog('Reducer: State updated immediately', 'sync');
      setIsProcessing(false);
    }, 500);
  };

  const handleAsyncThunk = async () => {
    setIsProcessing(true);
    addLog('Dispatch: FETCH_USER_REQUEST (Thunk)', 'async');

    // Simulate Middleware Delay
    await new Promise((r) => setTimeout(r, 1000));

    addLog('Middleware: API Call Complete...', 'async');

    // Simulate Reducer Update
    await new Promise((r) => setTimeout(r, 500));
    addLog('Reducer: FETCH_USER_SUCCESS', 'async');
    setIsProcessing(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900 border-b pb-2">
            Action Types
          </h4>

          <button
            type="button"
            onClick={handleSyncDispatch}
            disabled={isProcessing}
            className="w-full flex items-center justify-between p-3 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors disabled:opacity-50 text-left"
          >
            <div>
              <div className="font-bold text-sm">Standard Action</div>
              <div className="text-xs opacity-75">Directly reaches reducer</div>
            </div>
            <Zap size={18} />
          </button>

          <button
            type="button"
            onClick={handleAsyncThunk}
            disabled={isProcessing}
            className="w-full flex items-center justify-between p-3 rounded-lg border border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors disabled:opacity-50 text-left"
          >
            <div>
              <div className="font-bold text-sm">Thunk (Async)</div>
              <div className="text-xs opacity-75">Paused by middleware</div>
            </div>
            <Clock size={18} />
          </button>
        </div>

        {/* Console / Timeline */}
        <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-green-400 min-h-[200px] flex flex-col">
          <div className="text-gray-500 border-b border-gray-700 pb-2 mb-2 uppercase tracking-wide">
            Redux DevTools Log
          </div>
          <div className="flex-1 space-y-2 overflow-hidden">
            {log.length === 0 && (
              <div className="text-gray-600 italic text-center mt-8">
                No actions dispatched yet.
              </div>
            )}
            {log.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  'flex gap-2',
                  item.type === 'async' ? 'text-purple-400' : 'text-blue-400',
                )}
              >
                <span className="opacity-50">
                  [{new Date(item.id).toLocaleTimeString().split(' ')[0]}]
                </span>
                <span>{item.msg}</span>
              </motion.div>
            ))}
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-gray-500 animate-pulse"
              >
                ... processing ...
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded text-xs text-gray-500 text-center">
        Middleware intercepts dispatched actions before they reach the reducer,
        enabling side effects like API calls and delays.
      </div>
    </div>
  );
};

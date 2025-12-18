import { CheckCircle2, Play, RefreshCw, XCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';

type PromiseStatus = 'idle' | 'pending' | 'resolved' | 'rejected';
type CombinatorType = 'all' | 'allSettled' | 'race' | 'any';

interface PromiseItem {
  id: number;
  status: PromiseStatus;
  duration: number;
}

export const PromiseVisualizer = () => {
  const [combinator, setCombinator] = useState<CombinatorType>('all');
  const [promises, setPromises] = useState<PromiseItem[]>([
    { id: 1, status: 'idle', duration: 0 },
    { id: 2, status: 'idle', duration: 0 },
    { id: 3, status: 'idle', duration: 0 },
  ]);
  const [globalStatus, setGlobalStatus] = useState<PromiseStatus>('idle');
  const [globalResult, setGlobalResult] = useState<string>('');

  const reset = () => {
    setPromises((p) => p.map((item) => ({ ...item, status: 'idle' })));
    setGlobalStatus('idle');
    setGlobalResult('');
  };

  const updatePromise = (id: number, status: PromiseStatus) => {
    setPromises((prev) => {
      const newPromises = prev.map((p) => (p.id === id ? { ...p, status } : p));
      checkCombinator(newPromises, combinator);
      return newPromises;
    });
  };

  const checkCombinator = useCallback(
    (currentPromises: PromiseItem[], type: CombinatorType) => {
      const statuses = currentPromises.map((p) => p.status);

      let result: PromiseStatus = 'pending';
      let message = 'Waiting...';

      if (statuses.every((s) => s === 'idle')) {
        setGlobalStatus('idle');
        setGlobalResult('Ready to start');
        return;
      }

      switch (type) {
        case 'all':
          if (statuses.some((s) => s === 'rejected')) {
            result = 'rejected';
            message = 'Rejected (One failed)';
          } else if (statuses.every((s) => s === 'resolved')) {
            result = 'resolved';
            message = 'Resolved (All succeeded)';
          } else {
            result = 'pending';
          }
          break;
        case 'allSettled':
          if (statuses.every((s) => s === 'resolved' || s === 'rejected')) {
            result = 'resolved';
            message = 'Resolved (All settled)';
          } else {
            result = 'pending';
          }
          break;
        case 'race': {
          const firstSettled = statuses.find(
            (s) => s === 'resolved' || s === 'rejected',
          );
          if (firstSettled) {
            result = firstSettled;
            message = `Settled as ${firstSettled} (First one wins)`;
          } else {
            result = 'pending';
          }
          break;
        }
        case 'any':
          if (statuses.some((s) => s === 'resolved')) {
            result = 'resolved';
            message = 'Resolved (One succeeded)';
          } else if (statuses.every((s) => s === 'rejected')) {
            result = 'rejected';
            message = 'Rejected (All failed)';
          } else {
            result = 'pending';
          }
          break;
      }

      setGlobalStatus(result);
      setGlobalResult(message);
    },
    [],
  );

  useEffect(() => {
    checkCombinator(promises, combinator);
  }, [combinator, checkCombinator, promises]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 justify-center bg-gray-50 p-2 rounded-xl border border-gray-100">
        {(['all', 'allSettled', 'race', 'any'] as const).map((type) => (
          <button
            type="button"
            key={type}
            onClick={() => {
              setCombinator(type);
              reset();
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              combinator === type
                ? 'bg-white text-orange-600 shadow-sm border border-orange-100 ring-2 ring-orange-50'
                : 'text-gray-500 hover:bg-gray-200'
            }`}
          >
            Promise.{type}
          </button>
        ))}
      </div>

      {/* Global Status Display */}
      <div
        className={`p-4 rounded-xl border-2 transition-colors flex items-center justify-between mx-auto max-w-sm ${
          globalStatus === 'resolved'
            ? 'border-green-100 bg-green-50'
            : globalStatus === 'rejected'
              ? 'border-red-100 bg-red-50'
              : globalStatus === 'pending'
                ? 'border-orange-100 bg-orange-50'
                : 'border-gray-100 bg-gray-50'
        }`}
      >
        <span className="font-semibold text-gray-700">Result:</span>
        <div className="flex items-center gap-2">
          {globalStatus === 'resolved' && (
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          )}
          {globalStatus === 'rejected' && (
            <XCircle className="w-5 h-5 text-red-600" />
          )}
          {globalStatus === 'pending' && (
            <RefreshCw className="w-5 h-5 text-orange-600 animate-spin" />
          )}
          <span
            className={`font-bold ${
              globalStatus === 'resolved'
                ? 'text-green-700'
                : globalStatus === 'rejected'
                  ? 'text-red-700'
                  : globalStatus === 'pending'
                    ? 'text-orange-700'
                    : 'text-gray-500'
            }`}
          >
            {globalResult || 'Idle'}
          </span>
        </div>
      </div>
      <div className="grid gap-3">
        {promises.map((p) => (
          <div
            key={p.id}
            className="relative bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-between shadow-sm overflow-hidden group"
          >
            <div
              className={`absolute left-0 top-0 bottom-0 w-1 ${
                p.status === 'resolved'
                  ? 'bg-green-500'
                  : p.status === 'rejected'
                    ? 'bg-red-500'
                    : p.status === 'pending'
                      ? 'bg-orange-400'
                      : 'bg-gray-200'
              }`}
            />

            <div className="flex items-center gap-3 z-10 pl-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-sm ${
                  p.status === 'resolved'
                    ? 'bg-green-100 text-green-700'
                    : p.status === 'rejected'
                      ? 'bg-red-100 text-red-700'
                      : p.status === 'pending'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-gray-100 text-gray-500'
                }`}
              >
                P{p.id}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {p.status === 'idle' && 'Idle'}
                {p.status === 'pending' && 'Pending...'}
                {p.status === 'resolved' && 'Resolved'}
                {p.status === 'rejected' && 'Rejected'}
              </div>
            </div>

            <div className="flex gap-2 z-10">
              {p.status === 'idle' && (
                <button
                  type="button"
                  onClick={() => updatePromise(p.id, 'pending')}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-blue-600 transition-colors"
                  title="Start"
                >
                  <Play className="w-4 h-4" />
                </button>
              )}
              {p.status === 'pending' && (
                <>
                  <button
                    type="button"
                    onClick={() => updatePromise(p.id, 'resolved')}
                    className="px-3 py-1 bg-green-50 hover:bg-green-100 text-green-700 text-xs rounded-md font-medium transition-colors border border-green-200"
                  >
                    Resolve
                  </button>
                  <button
                    type="button"
                    onClick={() => updatePromise(p.id, 'rejected')}
                    className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 text-xs rounded-md font-medium transition-colors border border-red-200"
                  >
                    Reject
                  </button>
                </>
              )}
              {(p.status === 'resolved' || p.status === 'rejected') && (
                <button
                  type="button"
                  onClick={() => updatePromise(p.id, 'idle')}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                  title="Reset"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Animations */}
            {p.status === 'pending' && (
              <motion.div
                layoutId={`loading-${p.id}`}
                className="absolute inset-0 bg-orange-50/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          Reset All
        </button>
      </div>
    </div>
  );
};

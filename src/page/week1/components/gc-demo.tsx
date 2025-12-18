import { AnimatePresence, motion } from 'framer-motion';
import { Box, Key, RefreshCw, Trash2 } from 'lucide-react';
import { useReducer } from 'react';
import { Badge } from '../../../components/ui/badge';
import { cn } from '../../../lib/utils';

type State = {
  mode: 'Map' | 'WeakMap';
  hasReference: boolean;
  gcRunning: boolean;
  entryExists: boolean;
};

type Action =
  | { type: 'SET_MODE'; payload: 'Map' | 'WeakMap' }
  | { type: 'TOGGLE_REFERENCE' }
  | { type: 'START_GC' }
  | { type: 'GC_COMPLETE' };

const initialState: State = {
  mode: 'Map',
  hasReference: true,
  gcRunning: false,
  entryExists: true,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_MODE':
      return {
        ...initialState,
        mode: action.payload,
      };
    case 'TOGGLE_REFERENCE':
      return {
        ...state,
        hasReference: !state.hasReference,
      };
    case 'START_GC':
      return {
        ...state,
        gcRunning: true,
      };
    case 'GC_COMPLETE':
      return {
        ...state,
        gcRunning: false,
        entryExists:
          state.mode === 'WeakMap' && !state.hasReference
            ? false
            : state.entryExists,
      };
    default:
      return state;
  }
}

export const GcDemo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mode, hasReference, gcRunning, entryExists } = state;

  const runGc = () => {
    dispatch({ type: 'START_GC' });
    setTimeout(() => {
      dispatch({ type: 'GC_COMPLETE' });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center space-x-4">
        <button
          type="button"
          onClick={() => dispatch({ type: 'SET_MODE', payload: 'Map' })}
          className={cn(
            'px-4 py-2 rounded-lg font-bold transition-all',
            mode === 'Map'
              ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200',
          )}
        >
          Map (Strong)
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: 'SET_MODE', payload: 'WeakMap' })}
          className={cn(
            'px-4 py-2 rounded-lg font-bold transition-all',
            mode === 'WeakMap'
              ? 'bg-orange-100 text-orange-700 ring-2 ring-orange-500'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200',
          )}
        >
          WeakMap (Weak)
        </button>
      </div>

      <div className="relative h-[300px] bg-slate-50 rounded-xl border-2 border-slate-200 p-6 overflow-hidden">
        {/* External Reference Block */}
        <div className="absolute top-6 left-6 z-10">
          <div className="flex flex-col items-center gap-2">
            <div
              className={cn(
                'p-3 rounded-lg border-2 font-mono text-xs font-bold transition-all duration-500',
                hasReference
                  ? 'bg-green-100 border-green-500 text-green-700'
                  : 'bg-gray-100 border-gray-300 text-gray-400',
              )}
            >
              {hasReference ? 'const key = {id: 1}' : 'key = null'}
            </div>
            {hasReference && <div className="h-8 w-0.5 bg-green-500"></div>}
          </div>
        </div>

        {/* The Key Object in Heap */}
        <motion.div
          animate={{
            opacity: entryExists ? 1 : 0.3,
            scale: entryExists ? 1 : 0.9,
          }}
          className="absolute top-24 left-10"
        >
          <div className="w-16 h-16 bg-yellow-100 border-2 border-yellow-400 rounded-lg flex items-center justify-center shadow-md relative z-20">
            <Key className="w-8 h-8 text-yellow-600" />
            <span className="absolute -bottom-6 text-xs font-bold text-gray-500">
              Key Object
            </span>
          </div>
        </motion.div>

        {/* The Map/WeakMap Structure */}
        <div className="absolute top-20 right-10 w-48 h-48 border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center bg-white/50">
          <Badge color={mode === 'Map' ? 'blue' : 'orange'}>{mode}</Badge>

          <AnimatePresence>
            {entryExists && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0, rotate: 10 }}
                transition={{ duration: 0.5 }}
                className="mt-6 w-full p-2 bg-white border border-gray-200 rounded shadow-sm flex items-center gap-2 relative"
              >
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="h-0.5 w-4 bg-gray-300"></div>
                <Box className="w-4 h-4 text-purple-500" />
                <span className="text-xs text-gray-500">Value</span>

                {/* Connection Line from Map to Key */}
                <svg className="absolute -left-20 top-1/2 -translate-y-1/2 w-20 h-10 pointer-events-none overflow-visible">
                  <title>Connection Line</title>
                  <path
                    d="M 80 5 L 0 5"
                    stroke={mode === 'Map' ? '#3b82f6' : '#f97316'}
                    strokeWidth="2"
                    strokeDasharray={mode === 'Map' ? '0' : '4 2'}
                    fill="none"
                    markerEnd="url(#arrow)"
                  />
                  <defs>
                    <marker
                      id="arrow"
                      markerWidth="10"
                      markerHeight="10"
                      refX="0"
                      refY="3"
                      orient="auto"
                      markerUnits="strokeWidth"
                    >
                      <path
                        d="M0,0 L0,6 L9,3 z"
                        fill={mode === 'Map' ? '#3b82f6' : '#f97316'}
                      />
                    </marker>
                  </defs>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
          {!entryExists && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-10 text-xs text-gray-400 text-center"
            >
              Entry Collected
            </motion.div>
          )}
        </div>

        {/* GC Animation Overlay */}
        <AnimatePresence>
          {gcRunning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-green-500/10 flex items-center justify-center z-30 backdrop-blur-[1px]"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              >
                <RefreshCw className="w-16 h-16 text-green-600" />
              </motion.div>
              <div className="absolute mt-24 font-bold text-green-700 bg-white/80 px-3 py-1 rounded-full">
                Garbage Collector Running...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => dispatch({ type: 'TOGGLE_REFERENCE' })}
          type="button"
          disabled={gcRunning}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all',
            hasReference
              ? 'bg-red-100 text-red-700 hover:bg-red-200'
              : 'bg-green-100 text-green-700 hover:bg-green-200',
            gcRunning && 'opacity-50 cursor-not-allowed',
          )}
        >
          {hasReference ? (
            <Trash2 className="w-4 h-4" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          {hasReference ? 'Remove Reference (key = null)' : 'Restore Reference'}
        </button>

        <button
          onClick={runGc}
          type="button"
          disabled={gcRunning}
          className={cn(
            'flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all',
            gcRunning && 'opacity-50 cursor-not-allowed',
          )}
        >
          <RefreshCw className={cn('w-4 h-4', gcRunning && 'animate-spin')} />
          Run Garbage Collector
        </button>
      </div>

      {/* Explanation */}
      <div
        className={cn(
          'p-4 rounded-xl border text-sm transition-colors',
          mode === 'Map'
            ? 'bg-blue-50 border-blue-200 text-blue-900'
            : 'bg-orange-50 border-orange-200 text-orange-900',
        )}
      >
        <h4 className="font-bold mb-2 flex items-center gap-2">
          {mode === 'Map' ? 'Strong Reference' : 'Weak Reference'}
        </h4>
        <p>
          {mode === 'Map'
            ? 'Map holds a STRONG reference to its keys. Even if you remove the external reference (key = null), the Map still prevents the object from being garbage collected. Potentially causing memory leaks if not careful.'
            : 'WeakMap holds a WEAK reference. If the key object has no other STRONG references (i.e., key = null), the Garbage Collector sees it as unreachable and removes both the key and the value from the WeakMap automatically.'}
        </p>
      </div>
    </div>
  );
};

import { useState } from 'react';

const ZustandDemo = () => {
  const [bears, setBears] = useState(0); // Simulating store
  return (
    <div className="space-y-2">
      <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg flex justify-between items-center">
        <span className="text-sm font-semibold text-orange-900">
          Bears: {bears}
        </span>
        <button
          type="button"
          onClick={() => setBears((b) => b + 1)}
          className="px-3 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600"
        >
          Add Bear
        </button>
      </div>
      <div className="bg-gray-800 p-3 rounded-lg text-xs font-mono text-gray-200 overflow-x-auto">
        <div className="text-gray-500 mb-1">// store.js</div>
        <div className="text-purple-400">
          const useStore = create((set) ={'>'} ({'{'}
        </div>
        <div className="pl-4">
          bears: <span className="text-yellow-400">{bears}</span>,
        </div>
        <div className="pl-4">
          increase: () ={'>'} set(state ={'>'} (state.bears + 1))
        </div>
        <div>{'}'}))</div>
      </div>
    </div>
  );
};

const RecoilDemo = () => {
  const [count, setCount] = useState(0); // Simulating atom
  return (
    <div className="space-y-2">
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex justify-between items-center">
        <span className="text-sm font-semibold text-blue-900">
          Count: {count}
        </span>
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
        >
          Increment
        </button>
      </div>
      <div className="bg-gray-800 p-3 rounded-lg text-xs font-mono text-gray-200 overflow-x-auto">
        <div className="text-gray-500 mb-1">// atoms.js</div>
        <div className="text-purple-400">const countState = atom({'{'}</div>
        <div className="pl-4">key: 'countState',</div>
        <div className="pl-4">
          default: <span className="text-yellow-400">{count}</span>
        </div>
        <div>{'}'});</div>
      </div>
    </div>
  );
};

export const ModernStateVisualizer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border border-gray-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-gray-800 flex items-center gap-2">
            🐻 Zustand
          </h4>
          <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
            Simple Hooks
          </span>
        </div>
        <ZustandDemo />
      </div>

      <div className="border border-gray-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-gray-800 flex items-center gap-2">
            ⚛️ Recoil
          </h4>
          <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
            Atoms & Selectors
          </span>
        </div>
        <RecoilDemo />
      </div>
    </div>
  );
};

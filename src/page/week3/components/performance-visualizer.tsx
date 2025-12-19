import { motion } from 'framer-motion';
import { memo, type UIEvent, useState } from 'react';
import { cn } from '../../../lib/utils';

// ==========================================
// 1. Memoization Demo
// ==========================================

const NonMemoizedItem = ({ count }: { count: number }) => (
  <motion.div
    key={Math.random()}
    initial={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
    animate={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
    className="p-3 border rounded-lg flex justify-between text-sm"
  >
    <span>I re-render every time parent updates!</span>
    <span className="text-red-500 font-mono">Rendered</span>
  </motion.div>
);

const MemoizedItem = memo(({ label }: { label: string }) => (
  <motion.div
    // No random key here, we want it TO update only when it actually updates
    initial={{ backgroundColor: 'rgba(34, 197, 94, 0.2)' }}
    animate={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
    className="p-3 border rounded-lg flex justify-between text-sm"
  >
    <span>I only render when MY props change.</span>
    <span className="text-green-600 font-mono">Stable</span>
  </motion.div>
));

const MemoizationDemo = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-4 border p-4 rounded-xl bg-gray-50">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Trigger Parent Update (Count: {count})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="font-semibold text-red-600 text-sm">
            Without Memoization
          </h4>
          <NonMemoizedItem count={count} />
          <NonMemoizedItem count={count} />
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold text-green-600 text-sm">
            With React.memo
          </h4>
          <MemoizedItem label="Static Prop" />
          <MemoizedItem label="Static Prop" />
        </div>
      </div>
      <p className="text-xs text-gray-400">
        *Colored backgrounds flash on render. Notice red side flashes on every
        button click.
      </p>
    </div>
  );
};

// ==========================================
// 2. Virtualization Demo
// ==========================================

const VirtualizationDemo = () => {
  const [isVirtual, setIsVirtual] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);

  // Config
  const itemHeight = 40;
  const windowHeight = 200;
  const totalItems = 1000;
  const items = Array.from({ length: totalItems }, (_, i) => `Item ${i + 1}`);

  // Virtualization Logic
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    totalItems - 1,
    Math.floor((scrollTop + windowHeight) / itemHeight) + 3, // + buffer
  );

  const visibleItems = isVirtual
    ? items.slice(startIndex, endIndex + 1).map((item, index) => ({
        item,
        index: startIndex + index,
        style: {
          position: 'absolute' as const,
          top: (startIndex + index) * itemHeight,
          height: itemHeight,
          width: '100%',
        },
      }))
    : items.map((item, index) => ({
        item,
        index,
        style: {
          height: itemHeight,
        },
      }));

  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div className="space-y-4 border p-4 rounded-xl bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isVirtual}
              onChange={(e) => setIsVirtual(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-900">
              Enable Virtualization
            </span>
          </label>
        </div>
        <div className="text-xs font-mono bg-gray-200 px-2 py-1 rounded">
          DOM Nodes: <strong>{visibleItems.length}</strong> / {totalItems}
        </div>
      </div>

      <div
        className="border bg-white h-[200px] overflow-auto rounded-lg relative"
        onScroll={onScroll}
      >
        {/* 
                   In virtual mode, we need a "fake" height container to ensure scrolling works 
                   even though we don't render content.
                */}
        <div
          style={{
            height: isVirtual ? totalItems * itemHeight : 'auto',
            position: 'relative',
          }}
        >
          {visibleItems.map(({ item, index, style }) => (
            <div
              key={index}
              style={isVirtual ? style : undefined}
              className={cn(
                'border-b px-4 flex items-center text-sm',
                !isVirtual && 'h-[40px]',
              )}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-500">
        {isVirtual
          ? 'Currently rendering only visible items + buffer. Fast!'
          : 'Rendering ALL 1000 items. Check the DOM node count!'}
      </p>
    </div>
  );
};

export const PerformanceVisualizer = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-gray-900">Memoization</h3>
        <p className="text-sm text-gray-600">
          Preventing unnecessary re-renders.
        </p>
        <MemoizationDemo />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-gray-900">Virtualization</h3>
        <p className="text-sm text-gray-600">Rendering only what is visible.</p>
        <VirtualizationDemo />
      </div>
    </div>
  );
};

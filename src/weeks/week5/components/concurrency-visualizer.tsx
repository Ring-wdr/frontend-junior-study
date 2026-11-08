'use client';

import { RefreshCw, Zap } from 'lucide-react';
import { useInView } from 'motion/react';
import type React from 'react';
import { memo, useEffect, useRef, useState, useTransition } from 'react';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

const SlowItem = ({ text }: { text: string }) => {
  const startTime = performance.now();
  while (performance.now() - startTime < 1) {}
  return (
    <div className="p-2 mb-1 text-sm bg-white rounded border border-gray-100 shadow-sm">
      Item: {text}
    </div>
  );
};

const SlowList = memo(
  ({ text, count = 50 }: { text: string; count?: number }) => {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push(<SlowItem key={i} text={`${text} #${i + 1}`} />);
    }
    return (
      <div className="h-48 overflow-y-auto border rounded-md p-2 bg-gray-50">
        {text ? (
          items
        ) : (
          <div className="text-gray-400 text-center p-4">Start typing...</div>
        )}
      </div>
    );
  },
);
SlowList.displayName = 'SlowList';

const MainThreadSpinner = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);

  useEffect(() => {
    if (!isInView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let angle = 0;
    let last = performance.now();
    const tick = (now: number) => {
      angle = (angle + (now - last) * 0.36) % 360;
      last = now;
      if (spinnerRef.current) {
        spinnerRef.current.style.transform = `rotate(${angle}deg)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center gap-3 p-3 sm:p-4 bg-gray-100 rounded-lg"
    >
      <div
        ref={spinnerRef}
        className="w-8 h-8 shrink-0 border-4 border-blue-500 border-t-transparent rounded-full"
      />
      <span className="text-sm font-medium text-gray-600">
        UI Responsiveness Indicator (Spinning = Good)
      </span>
    </div>
  );
};

export const ConcurrencyVisualizer = () => {
  const [inputVal, setInputVal] = useState('');
  const [mode, setMode] = useState<'blocking' | 'concurrent'>('blocking');
  const [isPending, startTransition] = useTransition();
  const [listText, setListText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setInputVal(newVal);

    if (mode === 'blocking') {
      setListText(newVal);
    } else {
      startTransition(() => {
        setListText(newVal);
      });
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 my-6 space-y-4 sm:space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            Blocking vs Concurrent Rendering
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Type quickly below to see how React 18 keeps the UI responsive.
          </p>
        </div>
        <div className="flex flex-wrap bg-gray-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => {
              setMode('blocking');
              setInputVal('');
              setListText('');
            }}
            className={cn(
              'px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
              mode === 'blocking'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-900',
            )}
          >
            Blocking (Old)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('concurrent');
              setInputVal('');
              setListText('');
            }}
            className={cn(
              'px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
              mode === 'concurrent'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-900',
            )}
          >
            Concurrent (New)
          </button>
        </div>
      </div>

      <MainThreadSpinner />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-4 min-w-0">
          <div className="relative">
            <input
              type="text"
              value={inputVal}
              onChange={handleChange}
              placeholder="Type fast here..."
              className={cn(
                'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors',
                mode === 'concurrent'
                  ? 'border-blue-200 focus:ring-blue-500 focus:border-blue-500'
                  : 'border-red-200 focus:ring-red-500 focus:border-red-500',
              )}
            />
            {isPending && (
              <div className="absolute right-3 top-2.5">
                <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-3 rounded-md text-xs text-gray-600 space-y-2">
            <div className="flex items-center justify-between">
              <span>Input Status:</span>
              <span className="font-semibold text-green-600">
                Updated Immediately
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>List Render:</span>
              <span
                className={cn(
                  'font-semibold',
                  mode === 'concurrent' && isPending
                    ? 'text-blue-500'
                    : mode === 'concurrent'
                      ? 'text-blue-600'
                      : 'text-red-600',
                )}
              >
                {mode === 'concurrent' && isPending
                  ? 'Pending (Background)...'
                  : 'Updated'}
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            {mode === 'blocking'
              ? "Notice how the 'Spinner' stutters while you type. The main thread is blocked by rendering the list."
              : "Notice the 'Spinner' stays smooth. The list acts efficiently in the background without freezing the UI."}
          </p>
        </div>

        <div className="space-y-2 min-w-0">
          <h4 className="text-xs font-semibold uppercase text-gray-400">
            Heavy Render Output (50 items x 1ms)
          </h4>
          <SlowList text={listText} count={50} />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <h4 className="text-sm font-semibold mb-2">Code Pattern</h4>
        <CodeBlock
          code={
            mode === 'blocking'
              ? `// Blocking Mode
const handleChange = (e) => {
  const value = e.target.value;
  setInput(value);
  // ❌ Re-renders heavy list immediately, blocking UI
  setList(value); 
};`
              : `// Concurrent Mode
const [original, setOriginal] = useState();
const [isPending, startTransition] = useTransition();

const handleChange = (e) => {
  const value = e.target.value;
  setInput(value); // ✅ Urgent update
  
  startTransition(() => {
    // ✅ Low priority update
    setList(value); 
  });
};`
          }
        />
      </div>
    </div>
  );
};

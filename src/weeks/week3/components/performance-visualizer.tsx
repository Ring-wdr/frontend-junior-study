'use client';

import { motion } from 'motion/react';
import { memo, type UIEvent, useState } from 'react';
import { Trans, useTranslation } from '@/i18n/client';
import { cn } from '../../../lib/utils';

const NonMemoizedItem = ({ count }: { count: number }) => {
  const { t } = useTranslation('week3');
  return (
    <motion.div
      key={count}
      initial={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
      animate={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="p-3 border rounded-lg flex justify-between gap-2 text-sm"
    >
      <span>{t('performance.visualizer.nonMemoized')}</span>
      <span className="text-red-500 font-mono">
        {t('performance.visualizer.rendered')}
      </span>
    </motion.div>
  );
};

const MemoizedItem = memo(({ label }: { label: string }) => {
  const { t } = useTranslation('week3');
  return (
    <motion.div
      initial={{ backgroundColor: 'rgba(34, 197, 94, 0.2)' }}
      animate={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="p-3 border rounded-lg flex justify-between gap-2 text-sm"
    >
      <span>{t('performance.visualizer.memoized')}</span>
      <span className="text-green-600 font-mono">{label}</span>
    </motion.div>
  );
});

const MemoizationDemo = () => {
  const { t } = useTranslation('week3');
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-4 border p-3 rounded-xl bg-gray-50 sm:p-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {t('performance.visualizer.triggerUpdate', { count })}
        </button>
        <button
          type="button"
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          {t('performance.visualizer.reset')}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="font-semibold text-red-600 text-sm">
            {t('performance.visualizer.withoutMemo')}
          </h4>
          <NonMemoizedItem count={count} />
          <NonMemoizedItem count={count} />
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold text-green-600 text-sm">
            {t('performance.visualizer.withMemo')}
          </h4>
          <MemoizedItem label={t('performance.visualizer.stable')} />
          <MemoizedItem label={t('performance.visualizer.stable')} />
        </div>
      </div>
      <p className="text-xs text-gray-400">
        {t('performance.visualizer.flashNote')}
      </p>
    </div>
  );
};

const VirtualizationDemo = () => {
  const { t } = useTranslation('week3');
  const [isVirtual, setIsVirtual] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);

  // Config
  const itemHeight = 40;
  const windowHeight = 200;
  const totalItems = 1000;
  const items = Array.from({ length: totalItems }, (_, i) =>
    t('performance.visualizer.item', { n: i + 1 }),
  );

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
    <div className="space-y-4 border p-3 rounded-xl bg-gray-50 sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isVirtual}
              onChange={(e) => setIsVirtual(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-900">
              {t('performance.visualizer.enableVirtualization')}
            </span>
          </label>
        </div>
        <div className="text-xs font-mono bg-gray-200 px-2 py-1 rounded">
          <Trans
            t={t}
            i18nKey="performance.visualizer.domNodes"
            values={{ visible: visibleItems.length, total: totalItems }}
          />
        </div>
      </div>

      <div
        className="border bg-white h-[200px] overflow-auto rounded-lg relative"
        onScroll={onScroll}
      >
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
          ? t('performance.visualizer.virtualOn')
          : t('performance.visualizer.virtualOff')}
      </p>
    </div>
  );
};

export const PerformanceVisualizer = () => {
  const { t } = useTranslation('week3');
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-gray-900">Memoization</h3>
        <p className="text-sm text-gray-600">
          {t('performance.visualizer.memoDescription')}
        </p>
        <MemoizationDemo />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-gray-900">Virtualization</h3>
        <p className="text-sm text-gray-600">
          {t('performance.visualizer.virtualDescription')}
        </p>
        <VirtualizationDemo />
      </div>
    </div>
  );
};

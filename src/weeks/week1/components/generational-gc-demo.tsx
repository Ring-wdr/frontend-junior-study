'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { cn } from '../../../lib/utils';

type Space = 'nursery' | 'intermediate' | 'old';

interface HeapObject {
  id: number;
  space: Space;
  reachable: boolean;
}

type Status =
  | { key: 'idle' | 'allocated' | 'full' | 'toggled' }
  | { key: 'scavenged'; collected: number; moved: number; promoted: number }
  | { key: 'major'; collected: number };

const SPACES: Space[] = ['nursery', 'intermediate', 'old'];
const NURSERY_CAPACITY = 6;
const ALLOCATION_SIZE = 3;

const spaceStyles: Record<Space, string> = {
  nursery: 'border-blue-200 bg-blue-50',
  intermediate: 'border-purple-200 bg-purple-50',
  old: 'border-gray-300 bg-gray-100',
};

const buttonClass =
  'rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500';

export const GenerationalGcDemo = () => {
  const { t } = useTranslation('week1');
  const [objects, setObjects] = useState<HeapObject[]>([]);
  const [nextId, setNextId] = useState(1);
  const [status, setStatus] = useState<Status>({ key: 'idle' });

  const nurseryCount = objects.filter((o) => o.space === 'nursery').length;
  const nurseryFull = nurseryCount + ALLOCATION_SIZE > NURSERY_CAPACITY;

  const allocate = () => {
    const created = Array.from({ length: ALLOCATION_SIZE }, (_, index) => ({
      id: nextId + index,
      space: 'nursery' as const,
      reachable: true,
    }));
    setObjects([...objects, ...created]);
    setNextId(nextId + ALLOCATION_SIZE);
    setStatus({
      key:
        nurseryCount + ALLOCATION_SIZE >= NURSERY_CAPACITY
          ? 'full'
          : 'allocated',
    });
  };

  const toggle = (id: number) => {
    setObjects(
      objects.map((o) => (o.id === id ? { ...o, reachable: !o.reachable } : o)),
    );
    setStatus({ key: 'toggled' });
  };

  const scavenge = () => {
    let collected = 0;
    let moved = 0;
    let promoted = 0;
    const survivors: HeapObject[] = [];
    for (const object of objects) {
      if (object.space === 'old') {
        survivors.push(object);
      } else if (!object.reachable) {
        collected += 1;
      } else if (object.space === 'nursery') {
        moved += 1;
        survivors.push({ ...object, space: 'intermediate' });
      } else {
        promoted += 1;
        survivors.push({ ...object, space: 'old' });
      }
    }
    setObjects(survivors);
    setStatus({ key: 'scavenged', collected, moved, promoted });
  };

  const majorGc = () => {
    const survivors = objects.filter((o) => o.reachable);
    setStatus({ key: 'major', collected: objects.length - survivors.length });
    setObjects(survivors);
  };

  const reset = () => {
    setObjects([]);
    setNextId(1);
    setStatus({ key: 'idle' });
  };

  const statusText =
    status.key === 'scavenged' || status.key === 'major'
      ? t(`memoryGc.generational.demo.status.${status.key}`, { ...status })
      : t(`memoryGc.generational.demo.status.${status.key}`);

  return (
    <div className="space-y-4" data-testid="generational-gc-demo">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={allocate}
          disabled={nurseryFull}
          data-testid="gc-allocate"
          className={cn(
            buttonClass,
            nurseryFull
              ? 'cursor-not-allowed bg-gray-100 text-gray-400'
              : 'bg-blue-600 text-white hover:bg-blue-700',
          )}
        >
          {t('memoryGc.generational.demo.allocate')}
        </button>
        <button
          type="button"
          onClick={scavenge}
          data-testid="gc-scavenge"
          className={cn(
            buttonClass,
            'bg-purple-600 text-white hover:bg-purple-700',
          )}
        >
          {t('memoryGc.generational.demo.scavenge')}
        </button>
        <button
          type="button"
          onClick={majorGc}
          data-testid="gc-major"
          className={cn(
            buttonClass,
            'bg-gray-800 text-white hover:bg-gray-900',
          )}
        >
          {t('memoryGc.generational.demo.major')}
        </button>
        <button
          type="button"
          onClick={reset}
          data-testid="gc-reset"
          className={cn(
            buttonClass,
            'bg-gray-200 text-gray-800 hover:bg-gray-300',
          )}
        >
          {t('memoryGc.generational.demo.reset')}
        </button>
      </div>

      <p
        aria-live="polite"
        data-testid="gc-status"
        className="rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-blue-900"
      >
        {statusText}
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {SPACES.map((space) => {
          const items = objects.filter((o) => o.space === space);
          return (
            <div
              key={space}
              data-testid={`gc-space-${space}`}
              className={cn(
                'min-h-28 rounded-lg border-2 p-2.5',
                spaceStyles[space],
              )}
            >
              <div className="mb-2 flex items-center justify-between text-xs font-semibold text-gray-700">
                <span>{t(`memoryGc.generational.demo.${space}`)}</span>
                <span className="font-mono">
                  {space === 'nursery'
                    ? `${items.length}/${NURSERY_CAPACITY}`
                    : items.length}
                </span>
              </div>
              {items.length === 0 && (
                <p className="text-xs text-gray-500">
                  {t('memoryGc.generational.demo.empty')}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5">
                <AnimatePresence initial={false}>
                  {items.map((object) => (
                    <motion.button
                      key={object.id}
                      type="button"
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => toggle(object.id)}
                      aria-pressed={!object.reachable}
                      aria-label={t(
                        object.reachable
                          ? 'memoryGc.generational.demo.reachable'
                          : 'memoryGc.generational.demo.unreachable',
                        { id: object.id },
                      )}
                      data-testid={`gc-object-${object.id}`}
                      className={cn(
                        'h-8 w-8 rounded-md border-2 font-mono text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
                        object.reachable
                          ? 'border-green-600 bg-green-500 text-white'
                          : 'border-dashed border-gray-400 bg-white text-gray-400 line-through',
                      )}
                    >
                      {object.id}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm border-2 border-green-600 bg-green-500" />
          {t('memoryGc.generational.demo.legendReachable')}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm border-2 border-dashed border-gray-400 bg-white" />
          {t('memoryGc.generational.demo.legendUnreachable')}
        </span>
        <span>{t('memoryGc.generational.demo.hint')}</span>
      </div>
    </div>
  );
};

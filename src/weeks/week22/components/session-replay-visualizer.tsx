'use client';

import { AnimatePresence, motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowDown,
  Globe,
  MousePointer,
  Pause,
  Play,
  RotateCcw,
  Type,
} from 'lucide-react';
import { useTranslation } from '@/i18n/client';
import { cn } from '../../../lib/utils';

type EventType = 'click' | 'scroll' | 'navigation' | 'error' | 'input';

type SessionEvent = {
  time: number;
  type: EventType;
  label:
    | 'pageLoad'
    | 'scrollDown'
    | 'clickProduct'
    | 'navigate'
    | 'addToCart'
    | 'formInput'
    | 'checkout'
    | 'error';
  detail: string;
};

const SESSION_EVENTS: SessionEvent[] = [
  { time: 0, type: 'navigation', label: 'pageLoad', detail: '/products' },
  { time: 2, type: 'scroll', label: 'scrollDown', detail: 'scrollY: 450px' },
  {
    time: 4,
    type: 'click',
    label: 'clickProduct',
    detail: 'Product #42 card',
  },
  { time: 5, type: 'navigation', label: 'navigate', detail: '/products/42' },
  {
    time: 7,
    type: 'click',
    label: 'addToCart',
    detail: 'Button: Add to Cart',
  },
  { time: 9, type: 'navigation', label: 'navigate', detail: '/cart' },
  { time: 11, type: 'input', label: 'formInput', detail: 'Email field' },
  {
    time: 13,
    type: 'click',
    label: 'checkout',
    detail: 'Button: Pay Now',
  },
  {
    time: 14,
    type: 'error',
    label: 'error',
    detail: "TypeError: Cannot read property 'id' of null",
  },
];

const TOTAL_DURATION = 16;

const EVENT_ICONS: Record<EventType, typeof MousePointer> = {
  click: MousePointer,
  scroll: ArrowDown,
  navigation: Globe,
  error: AlertCircle,
  input: Type,
};

const EVENT_COLORS: Record<
  EventType,
  { dot: string; bg: string; text: string }
> = {
  click: { dot: 'bg-blue-500', bg: 'bg-blue-50', text: 'text-blue-700' },
  scroll: { dot: 'bg-gray-400', bg: 'bg-gray-50', text: 'text-gray-700' },
  navigation: {
    dot: 'bg-green-500',
    bg: 'bg-green-50',
    text: 'text-green-700',
  },
  error: { dot: 'bg-red-500', bg: 'bg-red-50', text: 'text-red-700' },
  input: { dot: 'bg-purple-500', bg: 'bg-purple-50', text: 'text-purple-700' },
};

export const SessionReplayVisualizer = () => {
  const { t } = useTranslation('week22');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 2>(1);

  const isRunning = isPlaying && currentTime < TOTAL_DURATION;

  useEffect(() => {
    if (!isRunning || !isInView) return;
    const id = setInterval(() => {
      setCurrentTime((prev) =>
        Math.min(prev + 0.1 * playbackSpeed, TOTAL_DURATION),
      );
    }, 100);
    return () => clearInterval(id);
  }, [isRunning, isInView, playbackSpeed]);

  const togglePlayback = () => {
    if (isRunning) {
      setIsPlaying(false);
      return;
    }
    if (currentTime >= TOTAL_DURATION) {
      setCurrentTime(0);
    }
    setIsPlaying(true);
  };

  const seek = (time: number) => {
    setIsPlaying(false);
    setCurrentTime(time);
  };

  const reset = () => seek(0);

  const currentEventIndex = SESSION_EVENTS.reduce(
    (latest, event, i) => (event.time <= currentTime ? i : latest),
    -1,
  );
  const currentEvent =
    currentEventIndex >= 0 ? SESSION_EVENTS[currentEventIndex] : null;

  return (
    <div ref={containerRef} className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 justify-center">
        <button
          type="button"
          onClick={togglePlayback}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-all"
        >
          {isRunning ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          {isRunning
            ? t('sessionReplay.replayVisualizer.pause')
            : t('sessionReplay.replayVisualizer.play')}
        </button>
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <div className="bg-gray-100 p-0.5 rounded-lg flex">
          <button
            type="button"
            onClick={() => setPlaybackSpeed(1)}
            className={cn(
              'px-2.5 py-1 rounded-md text-xs font-semibold transition-all',
              playbackSpeed === 1
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-500',
            )}
          >
            1x
          </button>
          <button
            type="button"
            onClick={() => setPlaybackSpeed(2)}
            className={cn(
              'px-2.5 py-1 rounded-md text-xs font-semibold transition-all',
              playbackSpeed === 2
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-500',
            )}
          >
            2x
          </button>
        </div>
        <span className="text-xs font-mono text-gray-400 tabular-nums">
          {currentTime.toFixed(1)}s / {TOTAL_DURATION}s
        </span>
      </div>

      <div className="relative px-2">
        <div className="h-2 bg-gray-200 rounded-full relative overflow-hidden">
          <div
            className="h-full bg-purple-500 rounded-full"
            style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
          />
        </div>

        <div className="relative h-4 mt-1">
          {SESSION_EVENTS.map((event) => {
            const leftPct = (event.time / TOTAL_DURATION) * 100;
            const colors = EVENT_COLORS[event.type];
            return (
              <button
                key={`${event.time}-${event.type}`}
                type="button"
                onClick={() => seek(event.time)}
                className={cn(
                  'absolute w-3 h-3 rounded-full -translate-x-1/2 cursor-pointer transition-transform hover:scale-150',
                  colors.dot,
                  event.type === 'error' && 'w-3.5 h-3.5 ring-2 ring-red-200',
                )}
                style={{ left: `${leftPct}%`, top: '2px' }}
                title={t(
                  `sessionReplay.replayVisualizer.events.${event.label}`,
                )}
              />
            );
          })}
        </div>

        <input
          type="range"
          min={0}
          max={TOTAL_DURATION}
          step={0.1}
          value={currentTime}
          onChange={(e) => seek(Number(e.target.value))}
          className="w-full h-1 mt-1 cursor-pointer accent-purple-500 opacity-0 hover:opacity-100 transition-opacity"
        />
      </div>

      <AnimatePresence mode="wait">
        {currentEvent && (
          <motion.div
            key={currentEventIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'rounded-xl border p-3 sm:p-4 flex items-center gap-3 min-h-[72px]',
              EVENT_COLORS[currentEvent.type].bg,
              currentEvent.type === 'error'
                ? 'border-red-200'
                : 'border-gray-200',
            )}
          >
            {(() => {
              const Icon = EVENT_ICONS[currentEvent.type];
              return (
                <Icon
                  className={cn(
                    'w-5 h-5 shrink-0',
                    EVENT_COLORS[currentEvent.type].text,
                  )}
                />
              );
            })()}
            <div className="min-w-0">
              <p
                className={cn(
                  'text-sm font-semibold',
                  EVENT_COLORS[currentEvent.type].text,
                )}
              >
                {t(
                  `sessionReplay.replayVisualizer.events.${currentEvent.label}`,
                )}
              </p>
              <p className="text-xs text-gray-600 font-mono break-words">
                {currentEvent.detail}
              </p>
            </div>
            <span className="ml-auto shrink-0 text-xs font-mono text-gray-400">
              {currentEvent.time.toFixed(1)}s
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-1 max-h-[200px] overflow-y-auto">
        {SESSION_EVENTS.map((event, i) => {
          const isPast = i <= currentEventIndex;
          const isCurrent = i === currentEventIndex;
          const colors = EVENT_COLORS[event.type];
          return (
            <div
              key={`${event.time}-${event.type}`}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-opacity',
                isCurrent && 'ring-2 ring-purple-300',
                event.type === 'error' && isPast && 'bg-red-50',
                !isPast && 'opacity-30',
              )}
            >
              <span
                className={cn('w-1.5 h-1.5 rounded-full shrink-0', colors.dot)}
              />
              <span className="font-mono text-gray-400 w-10 shrink-0">
                {event.time.toFixed(1)}s
              </span>
              <span
                className={cn(
                  'font-medium shrink-0',
                  isPast ? 'text-gray-800' : 'text-gray-400',
                )}
              >
                {t(`sessionReplay.replayVisualizer.events.${event.label}`)}
              </span>
              <span className="text-gray-400 truncate min-w-0">
                {event.detail}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

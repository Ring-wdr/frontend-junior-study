import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
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
import { cn } from '../../../lib/utils';

type EventType = 'click' | 'scroll' | 'navigation' | 'error' | 'input';

type SessionEvent = {
  time: number;
  type: EventType;
  label: string;
  detail: string;
};

const SESSION_EVENTS: SessionEvent[] = [
  { time: 0, type: 'navigation', label: 'Page Load', detail: '/products' },
  { time: 2, type: 'scroll', label: 'Scroll Down', detail: 'scrollY: 450px' },
  {
    time: 4,
    type: 'click',
    label: 'Click Product',
    detail: 'Product #42 card',
  },
  { time: 5, type: 'navigation', label: 'Navigate', detail: '/products/42' },
  {
    time: 7,
    type: 'click',
    label: 'Add to Cart',
    detail: 'Button: Add to Cart',
  },
  { time: 9, type: 'navigation', label: 'Navigate', detail: '/cart' },
  { time: 11, type: 'input', label: 'Form Input', detail: 'Email field' },
  {
    time: 13,
    type: 'click',
    label: 'Checkout',
    detail: 'Button: Pay Now',
  },
  {
    time: 14,
    type: 'error',
    label: 'Error!',
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

const EVENT_COLORS: Record<EventType, { dot: string; bg: string; text: string }> = {
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 2>(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPlayback = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const startPlayback = useCallback(() => {
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + 0.1 * playbackSpeed;
        if (next >= TOTAL_DURATION) {
          stopPlayback();
          return TOTAL_DURATION;
        }
        return next;
      });
    }, 100);
  }, [playbackSpeed, stopPlayback]);

  const togglePlayback = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      if (currentTime >= TOTAL_DURATION) {
        setCurrentTime(0);
      }
      startPlayback();
    }
  };

  const reset = () => {
    stopPlayback();
    setCurrentTime(0);
  };

  // Restart interval when speed changes while playing
  useEffect(() => {
    if (isPlaying) {
      stopPlayback();
      startPlayback();
    }
  }, [playbackSpeed]); // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const currentEventIndex = SESSION_EVENTS.reduce(
    (latest, event, i) => (event.time <= currentTime ? i : latest),
    -1,
  );
  const currentEvent =
    currentEventIndex >= 0 ? SESSION_EVENTS[currentEventIndex] : null;

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center gap-2 justify-center">
        <button
          type="button"
          onClick={togglePlayback}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-all"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          {isPlaying ? 'Pause' : 'Play'}
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
        <span className="text-xs font-mono text-gray-400 ml-2">
          {currentTime.toFixed(1)}s / {TOTAL_DURATION}s
        </span>
      </div>

      {/* Timeline Track */}
      <div className="relative px-2">
        <div className="h-2 bg-gray-200 rounded-full relative overflow-hidden">
          <motion.div
            className="h-full bg-purple-500 rounded-full"
            style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
          />
        </div>

        {/* Event Markers */}
        <div className="relative h-4 mt-1">
          {SESSION_EVENTS.map((event) => {
            const leftPct = (event.time / TOTAL_DURATION) * 100;
            const colors = EVENT_COLORS[event.type];
            return (
              <button
                key={`${event.time}-${event.type}`}
                type="button"
                onClick={() => {
                  stopPlayback();
                  setCurrentTime(event.time);
                }}
                className={cn(
                  'absolute w-3 h-3 rounded-full -translate-x-1/2 cursor-pointer transition-transform hover:scale-150',
                  colors.dot,
                  event.type === 'error' && 'w-3.5 h-3.5 ring-2 ring-red-200',
                )}
                style={{ left: `${leftPct}%`, top: '2px' }}
                title={event.label}
              />
            );
          })}
        </div>

        {/* Scrubber */}
        <input
          type="range"
          min={0}
          max={TOTAL_DURATION}
          step={0.1}
          value={currentTime}
          onChange={(e) => {
            stopPlayback();
            setCurrentTime(Number(e.target.value));
          }}
          className="w-full h-1 mt-1 cursor-pointer accent-purple-500 opacity-0 hover:opacity-100 transition-opacity"
        />
      </div>

      {/* Current Event Card */}
      <AnimatePresence mode="wait">
        {currentEvent && (
          <motion.div
            key={currentEventIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              'rounded-xl border p-4 flex items-center gap-3',
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
            <div>
              <p
                className={cn(
                  'text-sm font-semibold',
                  EVENT_COLORS[currentEvent.type].text,
                )}
              >
                {currentEvent.label}
              </p>
              <p className="text-xs text-gray-600 font-mono">
                {currentEvent.detail}
              </p>
            </div>
            <span className="ml-auto text-xs font-mono text-gray-400">
              {currentEvent.time.toFixed(1)}s
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Event Log */}
      <div className="space-y-1 max-h-[200px] overflow-y-auto">
        {SESSION_EVENTS.map((event, i) => {
          const isPast = i <= currentEventIndex;
          const isCurrent = i === currentEventIndex;
          const colors = EVENT_COLORS[event.type];
          return (
            <div
              key={`${event.time}-${event.type}`}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all',
                isCurrent && 'ring-2 ring-purple-300',
                event.type === 'error' && isPast && 'bg-red-50',
                !isPast && 'opacity-30',
              )}
            >
              <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', colors.dot)} />
              <span className="font-mono text-gray-400 w-10 shrink-0">
                {event.time.toFixed(1)}s
              </span>
              <span
                className={cn(
                  'font-medium',
                  isPast ? 'text-gray-800' : 'text-gray-400',
                )}
              >
                {event.label}
              </span>
              <span className="text-gray-400 truncate">{event.detail}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

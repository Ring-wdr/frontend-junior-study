import { AnimatePresence, motion } from 'motion/react';
import { useRef, useState } from 'react';
import {
  Activity,
  ExternalLink,
  Search,
  ShoppingCart,
  Trash2,
  UserPlus,
} from 'lucide-react';

type AnalyticsEvent = {
  id: number;
  name: string;
  params: Record<string, string>;
  timestamp: string;
};

const EVENT_COLORS: Record<string, string> = {
  purchase_click: 'bg-blue-500',
  link_click: 'bg-purple-500',
  search: 'bg-green-500',
  signup_click: 'bg-orange-500',
};

export const EventStreamVisualizer = () => {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const nextIdRef = useRef(1);
  const [searchValue, setSearchValue] = useState('');

  const fireEvent = (name: string, params: Record<string, string>) => {
    const newEvent: AnalyticsEvent = {
      id: nextIdRef.current++,
      name,
      params,
      timestamp: new Date().toLocaleTimeString(),
    };
    setEvents((prev) => [newEvent, ...prev].slice(0, 20));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Mock Website Panel */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <div className="bg-gray-100 px-3 py-2 flex items-center gap-2 border-b border-gray-200">
          <div className="flex gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <span className="text-[10px] text-gray-400 font-mono ml-2">
            mystore.com
          </span>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search products..."
              className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button
              type="button"
              onClick={() => {
                fireEvent('search', {
                  query: searchValue || 'shoes',
                  results: '42',
                });
                setSearchValue('');
              }}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold bg-green-600 text-white hover:bg-green-700 transition-all"
            >
              <Search className="w-3 h-3" />
            </button>
          </div>

          <div className="rounded-lg border border-gray-100 p-3 space-y-3">
            <div className="h-16 bg-gray-50 rounded-lg flex items-center justify-center text-xs text-gray-400">
              Product Image
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  fireEvent('purchase_click', {
                    item: 'Product #1',
                    value: '$29.99',
                  })
                }
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all"
              >
                <ShoppingCart className="w-3 h-3" />
                Buy Now
              </button>
              <button
                type="button"
                onClick={() =>
                  fireEvent('link_click', {
                    target: '/about',
                    position: 'hero',
                  })
                }
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold text-purple-600 hover:bg-purple-50 border border-purple-200 transition-all"
              >
                <ExternalLink className="w-3 h-3" />
                Learn More
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              fireEvent('signup_click', { location: 'header' })
            }
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-orange-600 text-white hover:bg-orange-700 transition-all"
          >
            <UserPlus className="w-3 h-3" />
            Sign Up Free
          </button>
        </div>
      </div>

      {/* Event Stream Panel */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-xs font-semibold text-gray-700">
              Event Stream
            </span>
            {events.length > 0 && (
              <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                {events.length}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setEvents([])}
            disabled={events.length === 0}
            className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <Trash2 className="w-3 h-3" />
            Clear
          </button>
        </div>

        <div className="max-h-[280px] overflow-y-auto p-2 space-y-1.5">
          {events.length === 0 ? (
            <div className="flex items-center justify-center h-[200px] text-gray-400 text-xs">
              Interact with the website to see events
            </div>
          ) : (
            <AnimatePresence>
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-lg border border-gray-100 p-2.5"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${EVENT_COLORS[event.name] || 'bg-gray-400'}`}
                      />
                      <span className="text-xs font-mono font-semibold text-gray-800">
                        {event.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400">
                      {event.timestamp}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(event.params).map(([key, val]) => (
                      <span
                        key={key}
                        className="text-[10px] font-mono text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded"
                      >
                        {key}={val}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

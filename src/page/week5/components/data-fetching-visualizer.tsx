import { Database, RefreshCw, Server } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '../../../lib/utils';

type CacheStrategy = 'force-cache' | 'no-store' | 'revalidate';

export const DataFetchingVisualizer = () => {
  const [serverTime, setServerTime] = useState(Date.now());
  const [clientData, setClientData] = useState<{
    time: number;
    source: 'MISS' | 'HIT' | 'STALE' | null;
  } | null>(null);
  const [lastFetchTime, setLastFetchTime] = useState<number | null>(null);
  const [cachedTime, setCachedTime] = useState<number | null>(null);
  const [revalidateTime, setRevalidateTime] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Simulate Server Time Ticking
  useEffect(() => {
    const interval = setInterval(() => {
      setServerTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async (strategy: CacheStrategy) => {
    setLoading(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 600));

    if (strategy === 'force-cache') {
      if (cachedTime) {
        setClientData({ time: cachedTime, source: 'HIT' });
      } else {
        const now = serverTime;
        setCachedTime(now);
        setClientData({ time: now, source: 'MISS' });
      }
    } else if (strategy === 'no-store') {
      const now = serverTime;
      setClientData({ time: now, source: 'MISS' });
    } else if (strategy === 'revalidate') {
      // Revalidate logic: if cached time exists AND it's less than 5 seconds old, return HIT. Else MISS & Set New.
      const now = serverTime;
      if (revalidateTime && now - revalidateTime < 5000) {
        // 5s revalidate window
        setClientData({ time: cachedTime || now, source: 'HIT' });
      } else {
        setRevalidateTime(now);
        setCachedTime(now); // Update cache
        setClientData({ time: now, source: 'STALE' }); // Simulating Revalidate (Stale-While-Revalidate often serves stale then updates, here we just show Fresh for simplicity or Stale logic)
        // For simplicity in this demo: Fresh fetch
        setClientData({ time: now, source: 'MISS' });
      }
    }

    setLastFetchTime(Date.now());
    setLoading(false);
  };

  const formatTime = (ts: number) =>
    new Date(ts).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm my-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-500" />
            Next.js Caching Visualizer
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Simulate <code>fetch()</code> caching strategies in Next.js 13+.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-gray-900 text-green-400 px-3 py-1.5 rounded-md">
          <Server className="w-3 h-3" />
          <span>Server Time: {formatTime(serverTime)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Controls */}
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase text-gray-500">
            Fetch Strategy
          </div>

          <button
            type="button"
            onClick={() => fetchData('force-cache')}
            disabled={loading}
            className="w-full flex items-center justify-between px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm border border-blue-200 transition-colors"
          >
            <span>force-cache</span>
            <span className="text-[10px] bg-blue-200 px-1.5 rounded text-blue-800">
              Default
            </span>
          </button>

          <button
            onClick={() => fetchData('no-store')}
            disabled={loading}
            className="w-full flex items-center justify-between px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm border border-red-200 transition-colors"
          >
            <span>no-store</span>
            <span className="text-[10px] bg-red-200 px-1.5 rounded text-red-800">
              SSR
            </span>
          </button>

          <button
            onClick={() => fetchData('revalidate')}
            disabled={loading}
            className="w-full flex items-center justify-between px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm border border-purple-200 transition-colors"
          >
            <span>next: &#123; revalidate: 5 &#125;</span>
            <span className="text-[10px] bg-purple-200 px-1.5 rounded text-purple-800">
              ISR
            </span>
          </button>
        </div>

        {/* Network / Middle */}
        <div className="flex flex-col items-center justify-center p-4 border-x border-gray-100 relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
              <div className="flex flex-col items-center">
                <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
                <span className="text-xs font-semibold mt-2 text-indigo-500">
                  Fetching...
                </span>
              </div>
            </div>
          )}
          <div className="w-full h-1 bg-gray-100 my-4 relative">
            <div
              className={cn(
                'absolute left-0 top-0 bottom-0 bg-indigo-500 transition-all duration-500',
                loading ? 'w-full' : 'w-0',
              )}
            />
          </div>

          {clientData && (
            <div
              className={cn(
                'px-3 py-1 rounded-full text-xs font-bold animate-in zoom-in',
                clientData.source === 'HIT'
                  ? 'bg-green-100 text-green-700'
                  : clientData.source === 'MISS'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-purple-100 text-purple-700',
              )}
            >
              {clientData.source}
            </div>
          )}
        </div>

        {/* Result */}
        <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center text-center space-y-2 border border-gray-200">
          <div className="text-xs font-semibold uppercase text-gray-500">
            Client Data
          </div>
          {clientData ? (
            <>
              <div className="text-2xl font-mono font-bold text-gray-800">
                {formatTime(clientData.time)}
              </div>
              <div className="text-[10px] text-gray-400">
                Fetched at {lastFetchTime && formatTime(lastFetchTime)}
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-400 italic">
              No data fetched yet
            </div>
          )}
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600">
        <ul className="list-disc pl-4 space-y-1">
          <li>
            <strong>force-cache:</strong> Caches data indefinitely. Time won't
            update on subsequent clicks.
          </li>
          <li>
            <strong>no-store:</strong> Fetches fresh data every time. Time
            matches server time.
          </li>
          <li>
            <strong>revalidate (5s):</strong> Caches for 5 seconds. Updates only
            if cache is stale.
          </li>
        </ul>
      </div>
    </div>
  );
};

import { Database, RefreshCw, Server } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { cn } from '../../../lib/utils';

type Library = 'native' | 'swr' | 'react-query';

export const DataFetchingVisualizer = () => {
  const { t } = useTranslation('week5');
  const [library, setLibrary] = useState<Library>('native');
  const [serverTime, setServerTime] = useState(Date.now());
  const [clientData, setClientData] = useState<{
    time: number;
    source: string;
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

  // Reset state when library changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: Reset state on library change
  useEffect(() => {
    setClientData(null);
    setCachedTime(null);
    setRevalidateTime(null);
  }, [library]);

  const fetchData = async (action: string) => {
    setLoading(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, library === 'native' ? 600 : 300));

    const now = serverTime;

    if (library === 'native') {
      if (action === 'force-cache') {
        if (cachedTime) {
          setClientData({
            time: cachedTime,
            source: `${t('dataFetching.visualizer.hit')} (Cache)`,
          });
        } else {
          setCachedTime(now);
          setClientData({
            time: now,
            source: `${t('dataFetching.visualizer.miss')} (Network)`,
          });
        }
      } else if (action === 'no-store') {
        setClientData({
          time: now,
          source: `${t('dataFetching.visualizer.miss')} (Network)`,
        });
      } else if (action === 'revalidate') {
        if (revalidateTime && now - revalidateTime < 5000) {
          setClientData({
            time: cachedTime || now,
            source: `${t('dataFetching.visualizer.hit')} (ISR)`,
          });
        } else {
          setRevalidateTime(now);
          setCachedTime(now);
          setClientData({
            time: now,
            source: `${t('dataFetching.visualizer.miss')} (Regenerated)`,
          });
        }
      }
    } else if (library === 'swr' || library === 'react-query') {
      // SWR / React Query Simulation
      // In this simplified demo, we assume they act similarly:
      // Stale-While-Revalidate: Return cached immediately (re-render), then fetch fresh.

      if (action === 'focus' || action === 'mount') {
        // Simulate SWR/RQ behavior:
        // 1. If cache exists, serve it (optimistic/stale)
        // 2. Fetch background (loading)
        // 3. Update data

        if (cachedTime) {
          // Immediate stale return
          setClientData({
            time: cachedTime,
            source: `${t('dataFetching.visualizer.stale')} (Cache)`,
          });
          // Then fetch
          setTimeout(() => {
            setCachedTime(now);
            setClientData({
              time: now,
              source: `${t('dataFetching.visualizer.hit')} (Refetched)`,
            });
            setLastFetchTime(Date.now());
          }, 500);
        } else {
          // First load
          setCachedTime(now);
          setClientData({
            time: now,
            source: `${t('dataFetching.visualizer.miss')} (First Load)`,
          });
        }
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
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-500" />
            {t('dataFetching.visualizer.title')}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            <Trans
              t={t}
              i18nKey="dataFetching.visualizer.intro"
              components={{ code: <code /> }}
            />
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-gray-900 text-green-400 px-3 py-1.5 rounded-md">
          <Server className="w-3 h-3" />
          <span>
            {t('dataFetching.visualizer.serverTime')} {formatTime(serverTime)}
          </span>
        </div>
      </div>

      {/* Library Toggles */}
      <div className="flex gap-2 p-1 bg-gray-100/50 rounded-lg w-fit">
        {(['native', 'swr', 'react-query'] as const).map((lib) => (
          <button
            type="button"
            key={lib}
            onClick={() => setLibrary(lib)}
            className={cn(
              'text-xs font-bold px-3 py-1.5 rounded transition-all shadow-sm',
              library === lib
                ? 'bg-white text-indigo-600 ring-1 ring-gray-200'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50',
            )}
          >
            {lib === 'native'
              ? t('dataFetching.visualizer.nativeFetch')
              : lib === 'swr'
                ? t('dataFetching.visualizer.swr')
                : t('dataFetching.visualizer.reactQuery')}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Controls */}
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase text-gray-500">
            {t('dataFetching.visualizer.triggers')}
          </div>

          {library === 'native' ? (
            <>
              <button
                type="button"
                onClick={() => fetchData('force-cache')}
                disabled={loading}
                className="w-full flex items-center justify-between px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm border border-blue-200 transition-colors"
              >
                <span>force-cache</span>
                <span className="text-[10px] bg-blue-200 px-1.5 rounded text-blue-800">
                  {t('dataFetching.visualizer.static')}
                </span>
              </button>

              <button
                type="button"
                onClick={() => fetchData('no-store')}
                disabled={loading}
                className="w-full flex items-center justify-between px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm border border-red-200 transition-colors"
              >
                <span>no-store</span>
                <span className="text-[10px] bg-red-200 px-1.5 rounded text-red-800">
                  {t('dataFetching.visualizer.dynamic')}
                </span>
              </button>

              <button
                type="button"
                onClick={() => fetchData('revalidate')}
                disabled={loading}
                className="w-full flex items-center justify-between px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm border border-purple-200 transition-colors"
              >
                <span>revalidate: 5</span>
                <span className="text-[10px] bg-purple-200 px-1.5 rounded text-purple-800">
                  {t('dataFetching.visualizer.isr')}
                </span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => fetchData('mount')}
                disabled={loading}
                className="w-full flex items-center justify-between px-3 py-2 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-lg text-sm border border-teal-200 transition-colors"
              >
                <span>{t('dataFetching.visualizer.componentMount')}</span>
              </button>
              <button
                type="button"
                onClick={() => fetchData('focus')}
                disabled={loading}
                className="w-full flex items-center justify-between px-3 py-2 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-lg text-sm border border-teal-200 transition-colors"
              >
                <span>{t('dataFetching.visualizer.windowFocus')}</span>
                <span className="text-[10px] bg-teal-200 px-1.5 rounded text-teal-800">
                  {t('dataFetching.visualizer.autoReval')}
                </span>
              </button>
            </>
          )}
        </div>

        {/* Network / Middle */}
        <div className="flex flex-col items-center justify-center p-4 border-x border-gray-100 relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
              <div className="flex flex-col items-center">
                <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
                <span className="text-xs font-semibold mt-2 text-indigo-500">
                  {t('dataFetching.visualizer.revalidating')}
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
                clientData.source.includes(t('dataFetching.visualizer.hit'))
                  ? 'bg-green-100 text-green-700'
                  : clientData.source.includes(
                        t('dataFetching.visualizer.miss'),
                      )
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-purple-100 text-purple-700',
              )}
            >
              {clientData.source}
            </div>
          )}

          {/* Library Icon Badge */}
          <div className="absolute bottom-2 right-2">
            {library === 'native' && (
              <span className="text-[10px] bg-gray-100 text-gray-500 px-1 rounded">
                {t('dataFetching.visualizer.server')}
              </span>
            )}
            {library === 'swr' && (
              <span className="text-[10px] bg-purple-100 text-purple-500 px-1 rounded">
                {t('dataFetching.visualizer.clientStale')}
              </span>
            )}
          </div>
        </div>

        {/* Result */}
        <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center text-center space-y-2 border border-gray-200">
          <div className="text-xs font-semibold uppercase text-gray-500">
            {t('dataFetching.visualizer.clientData')}
          </div>
          {clientData ? (
            <>
              <div className="text-2xl font-mono font-bold text-gray-800">
                {formatTime(clientData.time)}
              </div>
              <div className="text-[10px] text-gray-400">
                {t('dataFetching.visualizer.lastUpdate')}:{' '}
                {lastFetchTime && formatTime(lastFetchTime)}
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-400 italic">
              {t('dataFetching.visualizer.noData')}
            </div>
          )}
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600">
        {library === 'native' ? (
          <ul className="list-disc pl-4 space-y-1">
            <li>{t('dataFetching.visualizer.serverCache')}</li>
            <li>
              <Trans
                t={t}
                i18nKey="dataFetching.visualizer.manualControl"
                components={{ code: <code /> }}
              />
            </li>
          </ul>
        ) : (
          <ul className="list-disc pl-4 space-y-1">
            <li>{t('dataFetching.visualizer.clientCache')}</li>
            <li>{t('dataFetching.visualizer.autoRevalDesc')}</li>
            <li>
              <Trans t={t} i18nKey="dataFetching.visualizer.optimisticUI" />
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
